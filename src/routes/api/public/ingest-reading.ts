import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const payloadSchema = z.object({
  node_code: z.string().min(3).max(16),
  recorded_at: z.string().datetime().optional(),
  tilt_x: z.number().min(-90).max(90),
  tilt_y: z.number().min(-90).max(90),
  displacement: z.number().min(-1000).max(1000),
  crack_width: z.number().min(0).max(1000),
  vibration: z.number().min(0).max(10000),
  inter_node_distance: z.number().min(0).max(100000).optional(),
  temperature: z.number().min(-60).max(120).optional(),
  battery_pct: z.number().min(0).max(100).optional(),
  signal_strength: z.number().min(-200).max(200).optional(),
});

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, x-arguss-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...cors },
  });
}

export const Route = createFileRoute("/api/public/ingest-reading")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: cors }),
      POST: async ({ request }) => {
        const expected = process.env["ARGUSS_INGEST_KEY"];
        const provided = request.headers.get("x-arguss-key");
        if (!expected || !provided || provided !== expected) {
          return json({ ok: false, error: "unauthorized" }, 401);
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ ok: false, error: "invalid_json" }, 400);
        }

        const parsed = payloadSchema.safeParse(raw);
        if (!parsed.success) {
          return json({ ok: false, error: "invalid_payload", issues: parsed.error.issues }, 422);
        }
        const p = parsed.data;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: node, error: nodeError } = await supabaseAdmin
          .from("sensor_nodes")
          .select("id, node_code")
          .eq("node_code", p.node_code)
          .maybeSingle();

        if (nodeError) return json({ ok: false, error: "lookup_failed" }, 500);
        if (!node) return json({ ok: false, error: "unknown_node_code" }, 404);

        const { error: insertError } = await supabaseAdmin.from("sensor_readings").insert({
          node_id: node.id,
          recorded_at: p.recorded_at ?? new Date().toISOString(),
          tilt_x: p.tilt_x,
          tilt_y: p.tilt_y,
          displacement: p.displacement,
          crack_width: p.crack_width,
          vibration: p.vibration,
          inter_node_distance: p.inter_node_distance ?? null,
          temperature: p.temperature ?? null,
          battery_pct: p.battery_pct ?? null,
          signal_strength: p.signal_strength ?? null,
          is_simulated: false,
        });

        if (insertError) return json({ ok: false, error: "insert_failed" }, 500);

        return json({ ok: true, node_code: node.node_code, is_simulated: false }, 201);
      },
    },
  },
});
