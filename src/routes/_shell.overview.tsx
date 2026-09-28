import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Cpu, Radio, Signal, Sparkles, BatteryMedium } from "lucide-react";
import { PageHeader } from "@/components/arguss/AppShell";
import { MineMap } from "@/components/arguss/MineMap";
import { DataTag, Panel, RiskBadge, StatusDot } from "@/components/arguss/bits";
import { useDemo } from "@/lib/arguss/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/overview")({
  head: () => ({
    meta: [
      { title: "Overview — ARGUSS Subsidence Console" },
      {
        name: "description",
        content:
          "Control-room overview of Jharia Coalfield Panel 7: node health, zone risk, active alerts and the 24-hour anomaly timeline.",
      },
      { property: "og:title", content: "Overview — ARGUSS Subsidence Console" },
      { property: "og:description", content: "Live node health, zone risk and anomaly timeline for Panel 7." },
    ],
  }),
  component: Overview,
});

function Overview() {
  const { nodes, alerts, meta, series, dataMode, lastSync } = useDemo();
  const navigate = useNavigate();
  const online = nodes.filter((n) => n.online).length;
  const warn = nodes.filter((n) => n.risk === "warning").length;
  const high = nodes.filter((n) => n.risk === "high").length;
  const active = alerts.filter((a) => a.status === "active").length;
  const normal = nodes.length - warn - high;

  const kpis = [
    { label: "Total Nodes", value: nodes.length, to: "/live" as const, tone: "" },
    { label: "Online Nodes", value: `${online}/${nodes.length}`, to: "/live" as const, tone: online < nodes.length ? "text-warning" : "text-normal" },
    { label: "Warning Zones", value: warn, to: "/map" as const, tone: warn ? "text-warning" : "" },
    { label: "High-Risk Zones", value: high, to: "/map" as const, tone: high ? "text-danger" : "" },
    { label: "Active Alerts", value: active, to: "/alerts" as const, tone: active ? "text-danger" : "" },
    { label: "Last Sync", value: lastSync, to: "/live" as const, tone: "" },
  ];

  const summary = [
    { label: "Normal", count: normal, cls: "bg-normal" },
    { label: "Warning", count: warn, cls: "bg-warning" },
    { label: "High Risk", count: high, cls: "bg-danger" },
  ];

  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="Jharia Coalfield — Panel 7 · 20-node LoRa mesh · 2 s sampling interval"
        right={<RiskBadge risk={meta.risk} size="lg" />}
      />

      <div className="grid grid-cols-2 border-b border-border sm:grid-cols-3 lg:grid-cols-6">
        {kpis.map((k) => (
          <Link
            key={k.label}
            to={k.to}
            className="border-b border-r border-border px-4 py-3 transition-colors last:border-r-0 hover:bg-surface-raised"
          >
            <div className="label-xs">{k.label}</div>
            <div className={cn("num mt-1 text-xl", k.tone)}>{k.value}</div>
          </Link>
        ))}
      </div>

      <div className="grid gap-3 p-3 lg:grid-cols-[3fr_2fr]">
        <Panel
          title="Live Mine Risk Map"
          hint="Mesh topology · click a node for detail"
          actions={
            <Link to="/map" className="text-[10px] text-info hover:underline">
              Open full map →
            </Link>
          }
          bodyClassName="p-2"
        >
          <div className="h-[360px]">
            <MineMap compact onSelect={(code) => code.startsWith("SG-") && navigate({ to: "/live/$nodeCode", params: { nodeCode: code } })} />
          </div>
        </Panel>

        <div className="grid gap-3">
          <Panel title="Current Risk Summary" hint={`${nodes.length} nodes assessed`}>
            <div className="flex h-3 w-full overflow-hidden rounded border border-border">
              {summary.map((s) => (
                <motion.div
                  key={s.label}
                  layout
                  transition={{ duration: 0.3 }}
                  className={s.cls}
                  style={{ width: `${(s.count / nodes.length) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-3 divide-y divide-border">
              {summary.map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2 text-[12px]">
                    <span className={cn("size-2 rounded-full", s.cls)} /> {s.label}
                  </span>
                  <span className="num text-[13px]">
                    {s.count}
                    <span className="ml-1 text-[10px] text-muted-foreground">
                      {Math.round((s.count / nodes.length) * 100)}%
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-4 gap-2 border-t border-border pt-2">
              {Object.entries(meta.zoneRisk).map(([zone, risk]) => (
                <div key={zone} className="rounded border border-border px-1.5 py-1.5 text-center">
                  <div className="num text-[10px] text-muted-foreground">{zone.replace("Zone ", "")}</div>
                  <div className="mt-1 flex justify-center">
                    <StatusDot risk={risk} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="AI Insight" hint={meta.title}>
            <div className="flex gap-2.5">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-info" strokeWidth={1.9} />
              <div>
                <p className="text-[13px] leading-relaxed">{meta.insight}</p>
                <div className="mt-2 flex items-center gap-2">
                  <DataTag mode={dataMode} />
                  <Link to="/ai-risk" className="text-[10px] text-info hover:underline">
                    Why this risk level? →
                  </Link>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-3 px-3 md:grid-cols-2">
        <Panel
          title="Recent Alerts"
          hint={`${active} active`}
          actions={
            <Link to="/alerts" className="text-[10px] text-info hover:underline">
              All alerts →
            </Link>
          }
          bodyClassName="p-0"
        >
          <div className="divide-y divide-border">
            {alerts.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-start gap-2.5 px-3 py-2">
                <span
                  className={cn(
                    "num mt-0.5 rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase",
                    a.severity === "high"
                      ? "border-danger/50 bg-danger/12 text-danger"
                      : a.severity === "warning"
                        ? "border-warning/50 bg-warning/12 text-warning"
                        : "border-info/50 bg-info/12 text-info",
                  )}
                >
                  {a.severity}
                </span>
                <div className="min-w-0">
                  <div className="num text-[11px]">
                    {a.nodeCode} · {a.zone} · {a.minutesAgo}m ago
                  </div>
                  <p className="mt-0.5 truncate text-[12px] text-muted-foreground">{a.trigger}</p>
                </div>
                <span className="num ml-auto text-[10px] text-muted-foreground">{a.status}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="System Health" hint="Mesh · power · uplink" bodyClassName="p-0">
          <div className="grid grid-cols-2 divide-x divide-y divide-border">
            {[
              { icon: Radio, label: "Mesh links up", value: `${94 - (nodes.length - online) * 3}%` },
              { icon: Signal, label: "Mean RSSI", value: `${Math.round(nodes.reduce((s, n) => s + n.signal, 0) / nodes.length)} dBm` },
              { icon: BatteryMedium, label: "Min battery", value: `${Math.min(...nodes.map((n) => n.battery))}%` },
              { icon: Cpu, label: "Gateway uplink", value: "GW-01 · OK" },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-2.5 px-3 py-3">
                <r.icon className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.9} />
                <div>
                  <div className="label-xs">{r.label}</div>
                  <div className="num mt-0.5 text-[13px]">{r.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
            SG-18 has not reported for 6 min —{" "}
            <span className="text-info">classified as comms failure, not subsidence.</span>
          </div>
        </Panel>
      </div>

      <div className="p-3">
        <Panel title="Risk Timeline — last 24 h" hint="Fused anomaly score (0–100)">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="anomalyFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.546 0.226 264)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.546 0.226 264)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.288 0.009 265)" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: "oklch(0.62 0.017 258)" }} interval={7} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "oklch(0.62 0.017 258)" }} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.208 0.008 265)",
                    border: "1px solid oklch(0.288 0.009 265)",
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="anomaly"
                  stroke="oklch(0.546 0.226 264)"
                  strokeWidth={1.6}
                  fill="url(#anomalyFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1">
            <DataTag mode={dataMode} />
          </div>
        </Panel>
      </div>
    </div>
  );
}
