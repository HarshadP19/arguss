import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/arguss/AppShell";
import { Metric, Panel, RiskBadge } from "@/components/arguss/bits";
import { useDemo } from "@/lib/arguss/store";
import { neighboursOf, nodeByCode } from "@/lib/arguss/nodes";
import { cn } from "@/lib/utils";

const RANGES = ["1h", "6h", "24h", "7d"] as const;

export const Route = createFileRoute("/_shell/live/$nodeCode")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.nodeCode} — Node Detail · ARGUSS` },
      {
        name: "description",
        content: `Telemetry history, anomaly score, mesh neighbours and event log for ARGUSS sensor node ${params.nodeCode}.`,
      },
      { property: "og:title", content: `${params.nodeCode} — Node Detail · ARGUSS` },
      { property: "og:description", content: `Anomaly score and telemetry trends for node ${params.nodeCode}.` },
    ],
  }),
  loader: ({ params }) => {
    if (!nodeByCode(params.nodeCode)) throw notFound();
    return null;
  },
  component: NodeDetail,
});

function NodeDetail() {
  const { nodeCode } = Route.useParams();
  const { nodeByCode: state, series, meta, alerts } = useDemo();
  const [range, setRange] = useState<(typeof RANGES)[number]>("24h");
  const def = nodeByCode(nodeCode)!;
  const n = state(nodeCode);
  if (!n) return null;

  const factor = range === "1h" ? 0.25 : range === "6h" ? 0.6 : range === "24h" ? 1 : 1.4;
  const data = series.map((p, i) => ({
    t: p.t,
    displacement: Number((p.displacement * factor * (0.4 + n.anomaly / 90)).toFixed(2)),
    tilt: Number((p.tilt * factor * (0.4 + n.anomaly / 80)).toFixed(3)),
    anomaly: Math.min(100, Math.round(p.anomaly * (0.4 + n.anomaly / 60) + (i % 3))),
  }));

  const events = [
    { t: "T-27 min", text: `Baseline drift check passed · ${def.positionType === "fixed_surveyed" ? "surveyed" : "GPS"} reference` },
    ...(n.anomaly > 44 ? [{ t: "T-14 min", text: "Correlated tilt + displacement rise flagged by fusion engine" }] : []),
    ...(n.anomaly > 70 ? [{ t: "T-3 min", text: "Crack width and vibration channels agreed → HIGH RISK" }] : []),
    ...(!n.online ? [{ t: "T-6 min", text: "Telemetry lost — classified as comms failure, not subsidence" }] : []),
  ];

  return (
    <div>
      <PageHeader
        title={`Node ${n.code}`}
        subtitle={`${n.zone} · ${def.lat.toFixed(5)}, ${def.lon.toFixed(5)} · last comms ${n.lastCommsSec}s ago`}
        right={
          <div className="flex items-center gap-2">
            <span className="num rounded border border-info/40 bg-info/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-info">
              Position: {def.positionType === "fixed_surveyed" ? "Fixed — surveyed" : "GPS-referenced"}
            </span>
            <RiskBadge risk={n.risk} size="lg" />
            <Link to="/live" className="flex items-center gap-1 rounded border border-border px-2 py-1 text-[11px]">
              <ArrowLeft className="size-3.5" /> All nodes
            </Link>
          </div>
        }
      />

      <div className="grid gap-3 p-3 lg:grid-cols-[2fr_1fr]">
        <Panel
          title="Telemetry history"
          hint="displacement (mm) · tilt (°) · anomaly (0–100)"
          actions={
            <div className="flex rounded border border-border">
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={cn("num px-2 py-0.5 text-[10px]", range === r ? "bg-surface-raised text-foreground" : "text-muted-foreground")}
                >
                  {r}
                </button>
              ))}
            </div>
          }
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
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
                <Line type="monotone" dataKey="displacement" dot={false} strokeWidth={1.6} stroke="oklch(0.546 0.226 264)" />
                <Line type="monotone" dataKey="anomaly" dot={false} strokeWidth={1.4} stroke="oklch(0.769 0.166 70)" />
                <Line type="monotone" dataKey="tilt" dot={false} strokeWidth={1.4} stroke="oklch(0.606 0.152 149)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="grid gap-3">
          <Panel title="Current readings">
            <div className="grid grid-cols-3 gap-y-3">
              <Metric label="Tilt X" value={n.tiltX.toFixed(3)} unit="°" />
              <Metric label="Tilt Y" value={n.tiltY.toFixed(3)} unit="°" />
              <Metric label="Displacement" value={n.displacement.toFixed(2)} unit="mm" />
              <Metric label="Crack width" value={n.crackWidth.toFixed(2)} unit="mm" />
              <Metric label="Vibration" value={n.vibration.toFixed(3)} unit="g" />
              <Metric label="Temperature" value={n.temperature.toFixed(1)} unit="°C" />
              <Metric label="Battery" value={n.battery} unit="%" />
              <Metric label="Signal" value={n.signal} unit="dBm" />
              <Metric label="Anomaly" value={n.anomaly} unit="/100" tone={n.anomaly > 70 ? "danger" : n.anomaly > 44 ? "warning" : "normal"} />
            </div>
          </Panel>

          <Panel title="Mesh neighbours" hint={`${neighboursOf(n.code).length} links`} bodyClassName="p-0">
            <div className="divide-y divide-border">
              {neighboursOf(n.code).map((c) => {
                const nb = state(c);
                return (
                  <Link key={c} to="/live/$nodeCode" params={{ nodeCode: c }} className="flex items-center justify-between px-3 py-2 hover:bg-surface-raised">
                    <span className="num text-[12px]">{c}</span>
                    <span className="num text-[10px] text-muted-foreground">
                      {nb?.interNodeDistance.toFixed(3)} m · {nb?.signal} dBm
                    </span>
                    {nb && <RiskBadge risk={nb.risk} />}
                  </Link>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-3 px-3 pb-3 md:grid-cols-2">
        <Panel title="Event history" bodyClassName="p-0">
          <div className="divide-y divide-border">
            {events.map((e) => (
              <div key={e.t} className="flex gap-3 px-3 py-2">
                <span className="num w-20 shrink-0 text-[11px] text-muted-foreground">{e.t}</span>
                <span className="text-[12px]">{e.text}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Alerts referencing this node" bodyClassName="p-0">
          <div className="divide-y divide-border">
            {alerts.filter((a) => a.nodeCode === n.code).length === 0 && (
              <p className="px-3 py-3 text-[12px] text-muted-foreground">No alerts raised for this node.</p>
            )}
            {alerts
              .filter((a) => a.nodeCode === n.code)
              .map((a) => (
                <div key={a.id} className="px-3 py-2">
                  <div className="num text-[11px] text-muted-foreground">
                    {a.id} · {a.severity} · {a.status}
                  </div>
                  <p className="mt-0.5 text-[12px]">{a.trigger}</p>
                </div>
              ))}
          </div>
        </Panel>
      </div>

      <div className="px-3 pb-3">
        <Panel title="Fusion context" hint={meta.title}>
          <p className="text-[12px] leading-relaxed text-muted-foreground">{meta.reasoning}</p>
        </Panel>
      </div>
    </div>
  );
}
