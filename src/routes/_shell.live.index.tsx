import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertOctagon, Battery, MapPin, Signal } from "lucide-react";
import { PageHeader } from "@/components/arguss/AppShell";
import { Metric, Panel, RiskBadge } from "@/components/arguss/bits";
import { useDemo } from "@/lib/arguss/store";
import { cn } from "@/lib/utils";
import { nodeByCode } from "@/lib/arguss/nodes";

export const Route = createFileRoute("/_shell/live/")({
  head: () => ({
    meta: [
      { title: "Live Monitoring — ARGUSS" },
      {
        name: "description",
        content:
          "Live telemetry from all 20 ARGUSS sensor nodes: tilt, displacement, crack width, vibration, inter-node distance drift, battery and signal.",
      },
      { property: "og:title", content: "Live Monitoring — ARGUSS" },
      { property: "og:description", content: "Per-node tilt, displacement, crack and mesh telemetry at 2 s sampling." },
    ],
  }),
  component: LiveMonitoring,
});

function LiveMonitoring() {
  const { nodes } = useDemo();
  const [filter, setFilter] = useState<"all" | "attention">("all");
  const shown = filter === "all" ? nodes : nodes.filter((n) => n.risk !== "normal" || !n.online);

  return (
    <div>
      <PageHeader
        title="Live Monitoring"
        subtitle="SG-01 → SG-20 · 2 s sampling · values shown against surveyed baseline"
        right={
          <div className="flex rounded border border-border">
            {(["all", "attention"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-2.5 py-1 text-[11px] capitalize",
                  filter === f ? "bg-surface-raised font-semibold" : "text-muted-foreground",
                )}
              >
                {f === "all" ? "All nodes" : "Needs attention"}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid gap-3 p-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {shown.map((n) => {
          const def = nodeByCode(n.code)!;
          return (
            <Link key={n.code} to="/live/$nodeCode" params={{ nodeCode: n.code }}>
              <Panel
                className={cn(
                  "h-full transition-colors hover:border-border-strong",
                  n.risk === "warning" && "border-warning/40",
                  n.risk === "high" && "border-danger/50",
                  !n.online && "opacity-80",
                )}
                title={n.code}
                hint={`${n.zone} · ${def.positionType === "fixed_surveyed" ? "Fixed" : "GPS"}`}
                actions={n.online ? <RiskBadge risk={n.risk} /> : <span className="num rounded border border-border px-1.5 py-0.5 text-[9px] uppercase text-muted-foreground">Offline</span>}
              >
                <div className="grid grid-cols-3 gap-y-2.5">
                  <Metric label="Tilt X" value={n.tiltX.toFixed(3)} unit="°" />
                  <Metric label="Tilt Y" value={n.tiltY.toFixed(3)} unit="°" />
                  <Metric
                    label="Displ."
                    value={n.displacement.toFixed(2)}
                    unit="mm"
                    tone={n.displacement > 8 ? "danger" : n.displacement > 3 ? "warning" : undefined}
                  />
                  <Metric label="Crack" value={n.crackWidth.toFixed(2)} unit="mm" />
                  <Metric label="Vibration" value={n.vibration.toFixed(3)} unit="g" />
                  <Metric label="Anomaly" value={n.anomaly} unit="/100" tone={n.anomaly > 70 ? "danger" : n.anomaly > 44 ? "warning" : undefined} />
                </div>
                <div className="mt-3 border-t border-border pt-2">
                  <div className="label-xs">Inter-node distance → {n.nearestNeighbour}</div>
                  <div className="num mt-1 flex items-baseline gap-2 text-[12px]">
                    {n.interNodeDistance.toFixed(3)} m
                    <span className="text-[10px] text-muted-foreground">base {n.baselineDistance.toFixed(2)} m</span>
                    <span className={cn("text-[10px]", n.driftPct > 0.2 ? "text-danger" : n.driftPct > 0 ? "text-warning" : "text-muted-foreground")}>
                      drift {n.driftPct > 0 ? "+" : ""}
                      {n.driftPct.toFixed(3)}%
                    </span>
                  </div>
                </div>
                <div className="num mt-2 flex items-center gap-3 border-t border-border pt-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Battery className="size-3.5" /> {n.battery}%
                  </span>
                  <span className="flex items-center gap-1">
                    <Signal className="size-3.5" /> {n.signal} dBm
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" /> {def.lat.toFixed(4)}, {def.lon.toFixed(4)}
                  </span>
                  {!n.online && (
                    <span className="ml-auto flex items-center gap-1 text-info">
                      <AlertOctagon className="size-3.5" /> comms fault
                    </span>
                  )}
                </div>
              </Panel>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
