import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/arguss/AppShell";
import { DataTag, Metric, Panel } from "@/components/arguss/bits";
import { useDemo } from "@/lib/arguss/store";
import { nodeStates, timeline } from "@/lib/arguss/engine";
import { NODES } from "@/lib/arguss/nodes";
import { cn } from "@/lib/utils";

const PARAMS = [
  { key: "displacement", label: "Displacement (mm)", color: "oklch(0.546 0.226 264)" },
  { key: "tilt", label: "Tilt (°)", color: "oklch(0.606 0.152 149)" },
  { key: "crack", label: "Crack width (mm)", color: "oklch(0.769 0.166 70)" },
  { key: "vibration", label: "Vibration (g)", color: "oklch(0.577 0.216 27.3)" },
  { key: "anomaly", label: "Anomaly score", color: "oklch(0.7 0.02 258)" },
] as const;

export const Route = createFileRoute("/_shell/history")({
  head: () => ({
    meta: [
      { title: "Historical Analysis — ARGUSS" },
      {
        name: "description",
        content:
          "Compare displacement, tilt, crack growth, vibration and anomaly-score history across ARGUSS nodes and zones, with before/after comparison.",
      },
      { property: "og:title", content: "Historical Analysis — ARGUSS" },
      { property: "og:description", content: "Trend history and before/after comparison across nodes and zones." },
    ],
  }),
  component: History,
});

function History() {
  const { step, dataMode } = useDemo();
  const [range, setRange] = useState("24h");
  const [zone, setZone] = useState("All zones");
  const [param, setParam] = useState<(typeof PARAMS)[number]["key"]>("displacement");
  const [overlay, setOverlay] = useState<string[]>(["SG-07", "SG-06", "SG-12"]);

  const base = timeline(step);
  const data = base.map((p, i) => {
    const row: Record<string, number | string> = { t: p.t };
    overlay.forEach((code) => {
      const s = nodeStates(step).find((n) => n.code === code)!;
      const scale = 0.35 + s.anomaly / 70;
      row[code] = Number(((p[param] as number) * scale + (i % 4) * 0.01).toFixed(3));
    });
    return row;
  });

  const before = nodeStates(0);
  const after = nodeStates(step);
  const zones = ["All zones", "Zone A", "Zone B", "Zone C", "Zone D"];

  return (
    <div>
      <PageHeader title="Historical Analysis" subtitle="Trend comparison across nodes, zones and parameters" />

      <div className="flex flex-wrap items-end gap-3 border-b border-border px-4 py-3">
        {[
          { label: "Date range", value: range, set: setRange, options: ["6h", "24h", "7d", "30d"] },
          { label: "Zone", value: zone, set: setZone, options: zones },
        ].map((f) => (
          <div key={f.label}>
            <div className="label-xs">{f.label}</div>
            <select
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              className="num mt-1 rounded border border-border bg-surface px-2 py-1 text-[12px]"
            >
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        ))}
        <div>
          <div className="label-xs">Parameter</div>
          <select
            value={param}
            onChange={(e) => setParam(e.target.value as typeof param)}
            className="num mt-1 rounded border border-border bg-surface px-2 py-1 text-[12px]"
          >
            {PARAMS.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-0">
          <div className="label-xs">Overlay nodes</div>
          <div className="mt-1 flex flex-wrap gap-1">
            {NODES.filter((n) => zone === "All zones" || n.zone === zone)
              .slice(0, 12)
              .map((n) => {
                const on = overlay.includes(n.code);
                return (
                  <button
                    key={n.code}
                    onClick={() => setOverlay((o) => (on ? o.filter((c) => c !== n.code) : [...o, n.code]))}
                    className={cn(
                      "num rounded border px-1.5 py-0.5 text-[10px]",
                      on ? "border-info/50 bg-info/12 text-info" : "border-border text-muted-foreground",
                    )}
                  >
                    {n.code}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      <div className="p-3">
        <Panel title={`${PARAMS.find((p) => p.key === param)!.label} — ${range}`} hint={`${overlay.length} nodes overlaid`}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 4, right: 12, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="oklch(0.288 0.009 265)" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: "oklch(0.62 0.017 258)" }} interval={7} />
                <YAxis tick={{ fontSize: 10, fill: "oklch(0.62 0.017 258)" }} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.208 0.008 265)",
                    border: "1px solid oklch(0.288 0.009 265)",
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {overlay.map((code, i) => (
                  <Line
                    key={code}
                    type="monotone"
                    dataKey={code}
                    dot={false}
                    strokeWidth={1.5}
                    stroke={PARAMS[i % PARAMS.length]!.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1">
            <DataTag mode={dataMode} />
          </div>
        </Panel>
      </div>

      <div className="px-3 pb-3">
        <Panel title="Before / after comparison" hint="baseline (T-90 min) vs current state" bodyClassName="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-border">
                  {["Node", "Zone", "Displacement Δ", "Tilt X Δ", "Crack Δ", "Anomaly Δ"].map((h) => (
                    <th key={h} className="label-xs px-3 py-2">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {after
                  .filter((n) => zone === "All zones" || n.zone === zone)
                  .map((a) => {
                    const b = before.find((x) => x.code === a.code)!;
                    const d = (x: number, y: number, dp = 2) => {
                      const v = x - y;
                      return `${v > 0 ? "+" : ""}${v.toFixed(dp)}`;
                    };
                    const changed = a.anomaly - b.anomaly > 10;
                    return (
                      <tr key={a.code} className={cn("border-b border-border last:border-b-0", changed && "bg-warning/5")}>
                        <td className="num px-3 py-2 text-[12px]">{a.code}</td>
                        <td className="num px-3 py-2 text-[12px] text-muted-foreground">{a.zone}</td>
                        <td className="num px-3 py-2 text-[12px]">{d(a.displacement, b.displacement)} mm</td>
                        <td className="num px-3 py-2 text-[12px]">{d(a.tiltX, b.tiltX, 3)} °</td>
                        <td className="num px-3 py-2 text-[12px]">{d(a.crackWidth, b.crackWidth)} mm</td>
                        <td className={cn("num px-3 py-2 text-[12px]", changed && "text-warning")}>
                          {d(a.anomaly, b.anomaly, 0)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <div className="grid gap-3 px-3 pb-3 sm:grid-cols-4">
        <Metric label="Peak anomaly (24 h)" value={Math.max(...after.map((n) => n.anomaly))} unit="/100" />
        <Metric label="Max displacement" value={Math.max(...after.map((n) => n.displacement)).toFixed(2)} unit="mm" />
        <Metric label="Max crack width" value={Math.max(...after.map((n) => n.crackWidth)).toFixed(2)} unit="mm" />
        <Metric label="Nodes changed state" value={after.filter((n, i) => n.risk !== before[i]!.risk).length} />
      </div>
    </div>
  );
}
