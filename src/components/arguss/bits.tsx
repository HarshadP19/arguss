import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Risk } from "@/lib/arguss/nodes";

export const riskLabel: Record<Risk, string> = { normal: "Normal", warning: "Warning", high: "High Risk" };

export const riskText: Record<Risk, string> = {
  normal: "text-normal",
  warning: "text-warning",
  high: "text-danger",
};

export const riskBorder: Record<Risk, string> = {
  normal: "border-normal/40 bg-normal/10 text-normal",
  warning: "border-warning/45 bg-warning/10 text-warning",
  high: "border-danger/50 bg-danger/12 text-danger",
};

export function RiskBadge({ risk, size = "sm" }: { risk: Risk; size?: "sm" | "lg" }) {
  return (
    <motion.span
      key={risk}
      initial={{ opacity: 0.4, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded border font-semibold uppercase tracking-wider",
        riskBorder[risk],
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
      )}
    >
      <span className={cn("size-1.5 rounded-full", risk === "normal" ? "bg-normal" : risk === "warning" ? "bg-warning" : "bg-danger")} />
      {riskLabel[risk]}
    </motion.span>
  );
}

export function Panel({
  title,
  hint,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  hint?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("flex min-w-0 flex-col rounded-lg border border-border bg-surface", className)}>
      {title && (
        <header className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
          <div className="flex min-w-0 items-baseline gap-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.09em] text-foreground/85">{title}</h2>
            {hint && <span className="truncate text-[10px] text-muted-foreground">{hint}</span>}
          </div>
          {actions}
        </header>
      )}
      <div className={cn("min-w-0 flex-1 p-3", bodyClassName)}>{children}</div>
    </section>
  );
}

export function Metric({
  label,
  value,
  unit,
  sub,
  tone,
}: {
  label: string;
  value: string | number;
  unit?: string;
  sub?: string;
  tone?: "normal" | "warning" | "danger" | "info" | undefined;
}) {
  return (
    <div className="min-w-0">
      <div className="label-xs">{label}</div>
      <div
        className={cn(
          "num mt-0.5 truncate text-sm text-foreground",
          tone === "normal" && "text-normal",
          tone === "warning" && "text-warning",
          tone === "danger" && "text-danger",
          tone === "info" && "text-info",
        )}
      >
        {value}
        {unit && <span className="ml-0.5 text-[10px] text-muted-foreground">{unit}</span>}
      </div>
      {sub && <div className="num mt-0.5 text-[10px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

export function StatusDot({ risk, offline }: { risk: Risk; offline?: boolean }) {
  return (
    <span
      className={cn(
        "size-2 rounded-full",
        offline ? "bg-muted-foreground" : risk === "high" ? "bg-danger" : risk === "warning" ? "bg-warning" : "bg-normal",
      )}
    />
  );
}

export function DataTag({ mode }: { mode: "simulated" | "live" }) {
  return (
    <span className="text-[10px] text-muted-foreground">
      Based on {mode === "live" ? "live hardware data" : "simulated data"}
    </span>
  );
}
