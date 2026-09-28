import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, Info, X } from "lucide-react";
import { PageHeader } from "@/components/arguss/AppShell";
import { DataTag, Metric, Panel, RiskBadge } from "@/components/arguss/bits";
import { useDemo } from "@/lib/arguss/store";
import { cn } from "@/lib/utils";

const PIPELINE = [
  { label: "Sensor Data", detail: "20 nodes · 2 s" },
  { label: "Feature Engineering", detail: "rate, drift, ratio" },
  { label: "Anomaly Detection", detail: "Isolation Forest" },
  { label: "Temporal + Spatial Correlation", detail: "mesh neighbours" },
  { label: "Multi-Sensor Fusion", detail: "5 channels" },
  { label: "Risk Classification", detail: "Normal / Warning / High" },
];

export const Route = createFileRoute("/_shell/ai-risk")({
  head: () => ({
    meta: [
      { title: "AI & Risk Analysis — ARGUSS" },
      {
        name: "description",
        content:
          "The ARGUSS risk engine: Isolation Forest anomaly detection, spatial and temporal correlation, multi-sensor fusion and explainable risk classification.",
      },
      { property: "og:title", content: "AI & Risk Analysis — ARGUSS" },
      { property: "og:description", content: "Explainable subsidence risk classification with a full reasoning trail." },
    ],
  }),
  component: AiRisk,
});

function AiRisk() {
  const { meta, dataMode, nodes } = useDemo();
  const gauge = meta.anomalyScore;
  const tone = gauge > 70 ? "danger" : gauge > 44 ? "warning" : "normal";

  return (
    <div>
      <PageHeader title="AI & Risk Analysis" subtitle={meta.title} right={<RiskBadge risk={meta.risk} size="lg" />} />

      <div className="p-3">
        <Panel title="Risk engine pipeline" hint="every stage runs on each 2 s frame">
          <div className="flex flex-wrap items-center gap-2">
            {PIPELINE.map((p, i) => (
              <div key={p.label} className="flex items-center gap-2">
                <div
                  className={cn(
                    "rounded border px-2.5 py-1.5",
                    i === 2 || i === 4 ? "border-info/50 bg-info/10" : "border-border bg-surface-raised",
                  )}
                >
                  <div className="text-[11px] font-semibold">{p.label}</div>
                  <div className="num text-[10px] text-muted-foreground">{p.detail}</div>
                </div>
                {i < PIPELINE.length - 1 && <ArrowRight className="size-3.5 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-3 px-3 lg:grid-cols-[1fr_1.35fr]">
        <Panel title="Fused anomaly score" hint="0–100">
          <div className="flex items-center gap-4">
            <div className="relative size-28 shrink-0">
              <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.288 0.009 265)" strokeWidth="9" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  strokeWidth="9"
                  strokeLinecap="round"
                  stroke={
                    tone === "danger"
                      ? "oklch(0.577 0.216 27.3)"
                      : tone === "warning"
                        ? "oklch(0.769 0.166 70)"
                        : "oklch(0.606 0.152 149)"
                  }
                  strokeDasharray={264}
                  animate={{ strokeDashoffset: 264 - (264 * gauge) / 100 }}
                  transition={{ duration: 0.45 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="num text-2xl">{gauge}</span>
                <span className="label-xs">score</span>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-y-3">
              <Metric label="Deformation trend" value={meta.deformationTrend} />
              <Metric label="Spatial correlation" value={meta.spatialCorrelation} />
              <Metric label="Sensor agreement" value={meta.sensorAgreement} />
              <Metric label="Persistence" value={meta.persistenceMinutes} unit="min" />
            </div>
          </div>
          <div className="mt-3 border-t border-border pt-2">
            <div className="label-xs">Correlated nodes</div>
            <div className="num mt-1 flex flex-wrap gap-1.5 text-[11px]">
              {meta.correlatedNodes.length === 0 && <span className="text-muted-foreground">none</span>}
              {meta.correlatedNodes.map((c) => (
                <span key={c} className="rounded border border-border-strong bg-surface-raised px-1.5 py-0.5">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Panel>

        <Panel
          title="Why this risk level?"
          hint="fusion criteria audit"
          className="border-info/40"
          actions={<RiskBadge risk={meta.risk} />}
        >
          <ul className="divide-y divide-border">
            {meta.factors.map((f) => (
              <li key={f.label} className="flex items-center gap-2.5 py-2">
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded border",
                    f.met ? "border-normal/50 bg-normal/15 text-normal" : "border-border text-muted-foreground",
                  )}
                >
                  {f.met ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" strokeWidth={3} />}
                </span>
                <span className={cn("text-[12.5px]", f.met ? "text-foreground" : "text-muted-foreground")}>{f.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 rounded border border-info/40 bg-info/8 p-3">
            <div className="flex gap-2">
              <Info className="mt-0.5 size-4 shrink-0 text-info" strokeWidth={2} />
              <p className="text-[12.5px] leading-relaxed">{meta.reasoning}</p>
            </div>
          </div>
          <div className="mt-2">
            <DataTag mode={dataMode} />
          </div>
        </Panel>
      </div>

      <div className="grid gap-3 p-3 md:grid-cols-2">
        <Panel title="Model info">
          <div className="grid grid-cols-2 gap-y-3">
            <Metric label="Model" value="Isolation Forest" sub="unsupervised" />
            <Metric label="Contamination" value="0.04" />
            <Metric label="Estimators" value="200" />
            <Metric label="Window" value="30" unit="min" />
          </div>
          <div className="mt-3 border-t border-border pt-2">
            <div className="label-xs">Input features</div>
            <p className="num mt-1 text-[11px] leading-relaxed text-muted-foreground">
              tilt_x · tilt_y · tilt_rate · displacement · displacement_rate · crack_width · crack_growth ·
              vibration_rms · inter_node_distance_drift · neighbour_correlation · persistence_minutes ·
              battery_pct · signal_strength
            </p>
          </div>
          <p className="mt-3 rounded border border-warning/40 bg-warning/8 p-2.5 text-[11.5px] leading-relaxed text-warning">
            Prototype Model — trained on synthetic + open subsidence datasets. Not trained on real proprietary
            mine data.
          </p>
        </Panel>

        <Panel title="Per-node anomaly ranking" hint="top 8 by fused score" bodyClassName="p-0">
          <div className="divide-y divide-border">
            {[...nodes]
              .sort((a, b) => b.anomaly - a.anomaly)
              .slice(0, 8)
              .map((n) => (
                <div key={n.code} className="flex items-center gap-3 px-3 py-2">
                  <span className="num w-14 text-[12px]">{n.code}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded bg-surface-raised">
                    <motion.div
                      animate={{ width: `${n.anomaly}%` }}
                      transition={{ duration: 0.35 }}
                      className={cn(
                        "h-full",
                        n.anomaly > 70 ? "bg-danger" : n.anomaly > 44 ? "bg-warning" : "bg-normal",
                      )}
                    />
                  </div>
                  <span className="num w-10 text-right text-[11px]">{n.anomaly}</span>
                  <RiskBadge risk={n.risk} />
                </div>
              ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
