import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CircleSlash, MapPin, Radio } from "lucide-react";
import { PageHeader } from "@/components/arguss/AppShell";
import { Panel } from "@/components/arguss/bits";
import { useDemo } from "@/lib/arguss/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts & Incidents — ARGUSS" },
      {
        name: "description",
        content:
          "Subsidence alert queue with acknowledge and resolve actions, and explicit separation of comms/sensor faults from genuine ground anomalies.",
      },
      { property: "og:title", content: "Alerts & Incidents — ARGUSS" },
      { property: "og:description", content: "Alert queue with ground anomaly vs sensor fault classification." },
    ],
  }),
  component: Alerts,
});

function Alerts() {
  const { alerts, step, meta } = useDemo();
  const [overrides, setOverrides] = useState<Record<string, "acknowledged" | "resolved">>({});
  useEffect(() => setOverrides({}), [step]);

  const rows = useMemo(
    () => alerts.map((a) => ({ ...a, status: overrides[a.id] ?? a.status })),
    [alerts, overrides],
  );

  const timeline = [
    { t: "T-27 min", text: "Fusion engine flagged correlated deformation on SG-06 / SG-07 / SG-08", show: step >= 2 },
    { t: "T-14 min", text: "WARNING alert AL-1044 raised for Zone B", show: step >= 2 },
    { t: "T-03 min", text: "HIGH RISK alert AL-1045 raised — 4-node correlation, 5/5 sensor agreement", show: step >= 3 },
    { t: "T-00 min", text: "Alerts acknowledged by Safety Officer · incident opened · surface exclusion advised", show: step >= 4 },
  ].filter((e) => e.show);

  return (
    <div>
      <PageHeader
        title="Alerts & Incidents"
        subtitle={`${rows.filter((r) => r.status === "active").length} active · ${rows.length} in queue · ${meta.title}`}
      />

      <div className="p-3">
        <Panel title="Alert queue" bodyClassName="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-border">
                  {["Severity", "Zone", "Node(s)", "Timestamp", "Trigger", "Anomaly", "Status", "Actions"].map((h) => (
                    <th key={h} className="label-xs px-3 py-2">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {rows.map((a) => (
                    <motion.tr
                      key={a.id}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-border align-top last:border-b-0"
                    >
                      <td className="px-3 py-2.5">
                        <span
                          className={cn(
                            "num rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase",
                            a.severity === "high"
                              ? "border-danger/50 bg-danger/12 text-danger"
                              : a.severity === "warning"
                                ? "border-warning/50 bg-warning/12 text-warning"
                                : "border-info/50 bg-info/12 text-info",
                          )}
                        >
                          {a.severity}
                        </span>
                      </td>
                      <td className="num px-3 py-2.5 text-[12px]">{a.zone}</td>
                      <td className="num px-3 py-2.5 text-[12px]">{a.nodeCode}</td>
                      <td className="num px-3 py-2.5 text-[11px] text-muted-foreground">T-{String(a.minutesAgo).padStart(2, "0")} min</td>
                      <td className="max-w-[340px] px-3 py-2.5 text-[12px]">
                        {a.trigger}
                        <div className="mt-1 flex items-center gap-1.5">
                          {a.kind === "comms" ? (
                            <span className="flex items-center gap-1 text-[10px] text-info">
                              <Radio className="size-3" /> classified as comms failure, not subsidence
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <MapPin className="size-3" /> ground anomaly · spatially correlated
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="num px-3 py-2.5 text-[12px]">{a.anomaly || "—"}</td>
                      <td className="num px-3 py-2.5 text-[11px] capitalize">
                        <span
                          className={cn(
                            a.status === "active" ? "text-danger" : a.status === "acknowledged" ? "text-warning" : "text-normal",
                          )}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            disabled={a.status !== "active"}
                            onClick={() => setOverrides((o) => ({ ...o, [a.id]: "acknowledged" }))}
                            className="flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] disabled:opacity-40"
                          >
                            <Check className="size-3" /> Acknowledge
                          </button>
                          <button
                            disabled={a.status === "resolved"}
                            onClick={() => setOverrides((o) => ({ ...o, [a.id]: "resolved" }))}
                            className="flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] disabled:opacity-40"
                          >
                            <CircleSlash className="size-3" /> Resolve
                          </button>
                          <Link
                            to="/map"
                            className="rounded border border-info/40 bg-info/10 px-1.5 py-0.5 text-[10px] text-info"
                          >
                            View on map
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <div className="grid gap-3 px-3 pb-3 md:grid-cols-2">
        <Panel title="Incident timeline" hint="Zone B subsidence event" bodyClassName="p-0">
          {timeline.length === 0 && (
            <p className="px-3 py-3 text-[12px] text-muted-foreground">No open incident. Baseline conditions.</p>
          )}
          <div className="divide-y divide-border">
            {timeline.map((e) => (
              <div key={e.t} className="flex gap-3 px-3 py-2.5">
                <span className="num w-20 shrink-0 text-[11px] text-muted-foreground">{e.t}</span>
                <span className="text-[12px]">{e.text}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Fault vs ground anomaly" hint="PS requirement">
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">
            A missing node and a moving node look identical to a threshold alarm. ARGUSS separates them: loss of
            telemetry, flat-lined channels, battery collapse and RSSI drop-out are routed to a{" "}
            <span className="text-info">comms failure</span> class, which never contributes to ground-risk
            escalation. Only spatially correlated, multi-channel, persistent deformation can raise a subsidence
            alert.
          </p>
        </Panel>
      </div>
    </div>
  );
}
