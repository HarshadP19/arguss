import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, Radio, ShieldCheck, Terminal } from "lucide-react";
import { PageHeader } from "@/components/arguss/AppShell";
import { Panel } from "@/components/arguss/bits";
import { useDemo } from "@/lib/arguss/store";
import { cn } from "@/lib/utils";


const ENDPOINT = "POST /api/public/ingest-reading";

const FIELDS: Array<[string, string, string, string]> = [
  ["node_code", "string", "required", "Registered node identifier, e.g. SG-07. Rejected with 404 if not commissioned."],
  ["recorded_at", "string (ISO 8601)", "optional", "Sample timestamp from the node. Defaults to server receive time."],
  ["tilt_x", "number (deg)", "required", "Inclinometer X axis, −90 … 90."],
  ["tilt_y", "number (deg)", "required", "Inclinometer Y axis, −90 … 90."],
  ["displacement", "number (mm)", "required", "Cumulative surface displacement since baseline."],
  ["crack_width", "number (mm)", "required", "Crack gauge width, 0 … 1000."],
  ["vibration", "number (g)", "required", "Peak ground acceleration in the sampling window."],
  ["inter_node_distance", "number (m)", "optional", "Ranged distance to nearest neighbour; drift is derived server-side."],
  ["temperature", "number (°C)", "optional", "Enclosure temperature, used for thermal compensation."],
  ["battery_pct", "number", "optional", "State of charge, 0 … 100."],
  ["signal_strength", "number (dBm)", "optional", "LoRa RSSI at the receiving hop."],
];

const CODES: Array<[string, string]> = [
  ["201 Created", "Reading stored. Response echoes node_code and is_simulated: false."],
  ["400 invalid_json", "Body was not parseable JSON."],
  ["401 unauthorized", "Missing or incorrect x-arguss-key header."],
  ["404 unknown_node_code", "node_code is not present in sensor_nodes — commission the node first."],
  ["422 invalid_payload", "Schema validation failed. issues[] lists the offending fields."],
  ["500 insert_failed", "Database write failed; the gateway should retry with backoff."],
];

function Code({ label, body }: { label: string; body: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-2.5 py-1.5">
        <span className="label-xs flex items-center gap-1.5">
          <Terminal className="size-3" /> {label}
        </span>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard?.writeText(body);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
          }}
          className="flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="num overflow-x-auto px-2.5 py-2 text-[11px] leading-relaxed text-foreground/90">{body}</pre>
    </div>
  );
}

function Integration() {
  const { dataMode } = useDemo();
  const origin = typeof window === "undefined" ? "https://<your-arguss-host>" : window.location.origin;

  const curl = `curl -X POST "${origin}/api/public/ingest-reading" \\
  -H "content-type: application/json" \\
  -H "x-arguss-key: $ARGUSS_INGEST_KEY" \\
  -d '{
    "node_code": "SG-07",
    "recorded_at": "2026-09-14T04:58:12Z",
    "tilt_x": 0.42,
    "tilt_y": -0.19,
    "displacement": 3.85,
    "crack_width": 1.20,
    "vibration": 0.031,
    "inter_node_distance": 41.86,
    "temperature": 33.4,
    "battery_pct": 91.5,
    "signal_strength": -84
  }'`;

  const response = `HTTP/1.1 201 Created
content-type: application/json

{ "ok": true, "node_code": "SG-07", "is_simulated": false }`;

  const esp32 = `// ESP32 gateway — forward one decoded LoRa mesh frame
HTTPClient http;
http.begin(client, "${origin}/api/public/ingest-reading");
http.addHeader("content-type", "application/json");
http.addHeader("x-arguss-key", ARGUSS_INGEST_KEY);   // stored in NVS, never in source

StaticJsonDocument<320> doc;
doc["node_code"]    = frame.nodeCode;      // "SG-07"
doc["tilt_x"]       = frame.tiltX;
doc["tilt_y"]       = frame.tiltY;
doc["displacement"] = frame.displacementMm;
doc["crack_width"]  = frame.crackMm;
doc["vibration"]    = frame.vibrationG;
doc["inter_node_distance"] = frame.rangeM;
doc["battery_pct"]  = frame.batteryPct;
doc["signal_strength"] = frame.rssi;

String body; serializeJson(doc, body);
int status = http.POST(body);               // expect 201`;

  return (

      <div className="grid gap-3 px-4 pb-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-3">
          <Panel title="Endpoint" hint="Single write path — no other route may insert readings">
            <div className="flex flex-wrap items-center gap-2">
              <span className="num rounded border border-info/50 bg-info/10 px-2 py-0.5 text-[11px] text-info">POST</span>
              <span className="num text-sm text-foreground">{origin}/api/public/ingest-reading</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {ENDPOINT} validates the payload, resolves <span className="num">node_code</span> against the commissioned node
              registry and inserts one row into <span className="num">sensor_readings</span> with{" "}
              <span className="num">is_simulated = false</span>. That flag is the only switch the platform needs: as soon as a
              non-simulated reading lands within the last 5 minutes, every screen relabels itself LIVE HARDWARE DATA. No code
              change, no redeploy.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                ["Transport", "HTTPS, TLS 1.3"],
                ["Content type", "application/json"],
                ["Rate guidance", "1 frame / node / 2 s"],
              ].map(([k, v]) => (
                <div key={k} className="rounded border border-border bg-background px-2.5 py-2">
                  <div className="label-xs">{k}</div>
                  <div className="num mt-0.5 text-xs text-foreground">{v}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Request example" hint="curl">
            <Code label="curl" body={curl} />
            <div className="mt-3">
              <Code label="response" body={response} />
            </div>
          </Panel>

          <Panel title="Gateway firmware snippet" hint="ESP32 + LoRa (SX1276) mesh gateway">
            <Code label="gateway.ino" body={esp32} />
          </Panel>

          <Panel title="Payload schema" bodyClassName="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="label-xs px-3 py-2">Field</th>
                    <th className="label-xs px-3 py-2">Type</th>
                    <th className="label-xs px-3 py-2">Req.</th>
                    <th className="label-xs px-3 py-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {FIELDS.map(([f, t, r, n]) => (
                    <tr key={f} className="border-b border-border/60 last:border-0">
                      <td className="num px-3 py-2 text-foreground">{f}</td>
                      <td className="num px-3 py-2 text-muted-foreground">{t}</td>
                      <td className="px-3 py-2">
                        <span
                          className={cn(
                            "rounded border px-1.5 py-0.5 text-[10px]",
                            r === "required"
                              ? "border-danger/40 bg-danger/10 text-danger"
                              : "border-border text-muted-foreground",
                          )}
                        >
                          {r}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <Panel title="Authentication">
            <div className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-info" />
              <div className="text-xs leading-relaxed text-muted-foreground">
                Every request carries a shared gateway key in the{" "}
                <span className="num text-foreground">x-arguss-key</span> header. The key is held server-side as{" "}
                <span className="num text-foreground">ARGUSS_INGEST_KEY</span> and compared inside the handler — it is never
                shipped to the browser and never printed on this page. Client-side keys cannot write: table policies allow
                read-only public access, and inserts run under a service-role identity reachable only from the endpoint.
              </div>
            </div>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              {[
                "Rotate per gateway by issuing a new key and reflashing NVS.",
                "Unauthorised requests are refused before any database contact.",
                "Reject-then-log: payloads never reach storage until they validate.",
              ].map((l) => (
                <li key={l} className="flex gap-2">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
                  {l}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Response codes" bodyClassName="p-0">
            <table className="w-full text-left text-xs">
              <tbody>
                {CODES.map(([c, d]) => (
                  <tr key={c} className="border-b border-border/60 last:border-0">
                    <td className="num w-40 px-3 py-2 align-top text-foreground">{c}</td>
                    <td className="px-3 py-2 text-muted-foreground">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title="Field wiring">
            <div className="flex items-start gap-2">
              <Radio className="mt-0.5 size-4 shrink-0 text-info" />
              <div className="text-xs leading-relaxed text-muted-foreground">
                Field nodes never call this endpoint directly. Each node relays its frame hop-by-hop through the LoRa mesh
                until it reaches the gateway; the gateway is the only device with an uplink and the only holder of the ingest
                key. That keeps radio power low, survives single-node loss, and means adding a node is a commissioning row —
                not a firmware change.
              </div>
            </div>
            <div className="num mt-3 rounded border border-border bg-background px-2.5 py-2 text-[11px] leading-relaxed text-foreground/80">
              SG-07 → SG-08 → SG-12 → GW-01 → HTTPS → ingest-reading → sensor_readings
            </div>
          </Panel>

          <Panel title="Prototype status">
            <p className="text-xs leading-relaxed text-muted-foreground">
              The endpoint is live and writes real rows today. For the judged walkthrough all readings are generated by the
              scripted simulator and flagged{" "}
              <span className="num text-foreground">is_simulated = true</span>, so nothing on screen is presented as hardware
              output. Connecting an ESP32 gateway requires no application change.
            </p>
          </Panel>
        </div>
      </div>
  );
}
