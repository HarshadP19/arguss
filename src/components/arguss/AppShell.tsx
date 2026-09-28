import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Bell,
  Brain,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  History,
  LayoutDashboard,
  Map as MapIcon,
  Menu,
  RotateCcw,
  Settings as SettingsIcon,
  SkipBack,
  SkipForward,
  Terminal,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useDemo } from "@/lib/arguss/store";
import { TOTAL_STEPS } from "@/lib/arguss/engine";

const NAV = [
  { to: "/overview", label: "Overview", icon: LayoutDashboard },
  { to: "/live", label: "Live Monitoring", icon: Activity },
  { to: "/map", label: "Mine Map", icon: MapIcon },
  { to: "/ai-risk", label: "AI & Risk Analysis", icon: Brain },
  { to: "/alerts", label: "Alerts & Incidents", icon: AlertTriangle },
  { to: "/validation", label: "Validation Lab", icon: FlaskConical },
  { to: "/history", label: "Historical Analysis", icon: History },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
] as const;

export function Logo({ compact }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
        <rect x="1" y="1" width="22" height="22" rx="4" fill="oklch(0.32 0.058 250)" />
        <path d="M12 5.5 19 18.5H5L12 5.5Z" fill="none" stroke="oklch(0.86 0.002 265)" strokeWidth="1.6" />
        <circle cx="12" cy="14.5" r="2.1" fill="oklch(0.606 0.152 149)" />
      </svg>
      {!compact && (
        <span className="text-[15px] font-bold tracking-[0.14em] text-foreground">ARGUSS</span>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { dataMode, lastSync, alerts, step, meta, next, back, reset } = useDemo();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [drawer, setDrawer] = useState(false);
  const [barOpen, setBarOpen] = useState(true);
  const activeAlerts = alerts.filter((a) => a.status === "active").length;

  const nav = (
    <nav className="flex flex-col gap-0.5 p-2">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to || pathname.startsWith(`${to}/`);
        return (
          <Link
            key={to}
            to={to}
            onClick={() => setDrawer(false)}
            className={cn(
              "flex items-center gap-2.5 rounded border border-transparent px-2.5 py-2 text-[13px] transition-colors",
              active
                ? "border-border-strong bg-surface-raised font-semibold text-foreground"
                : "text-muted-foreground hover:bg-surface-raised hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" strokeWidth={1.9} />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-12 items-center gap-3 border-b border-border bg-surface px-3">
        <button className="lg:hidden" onClick={() => setDrawer(true)} aria-label="Open navigation">
          <Menu className="size-5" />
        </button>
        <Link to="/overview" className="shrink-0">
          <Logo />
        </Link>
        <div className="hidden h-6 items-center gap-2 rounded border border-border bg-surface-raised px-2 md:flex">
          <span className="label-xs">Site</span>
          <span className="text-[12px] font-medium">Jharia Coalfield — Panel 7</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          <span
            className={cn(
              "num rounded border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
              dataMode === "live"
                ? "border-info/50 bg-info/12 text-info"
                : "border-warning/50 bg-warning/12 text-warning",
            )}
          >
            {dataMode === "live" ? "● Live Hardware Data" : "● Simulated Data"}
          </span>
          <div className="hidden items-baseline gap-1.5 sm:flex">
            <span className="label-xs">Last sync</span>
            <span className="num text-[11px]">{lastSync}</span>
          </div>
          <Link to="/alerts" className="relative" aria-label="Alerts">
            <Bell className="size-4 text-muted-foreground" />
            {activeAlerts > 0 && (
              <span className="num absolute -right-1.5 -top-1.5 rounded-full bg-danger px-1 text-[9px] font-semibold text-white">
                {activeAlerts}
              </span>
            )}
          </Link>
          <div className="flex items-center gap-2 border-l border-border pl-2.5">
            <div className="flex size-7 items-center justify-center rounded border border-border bg-surface-raised text-[10px] font-semibold">
              SO
            </div>
            <div className="hidden leading-tight sm:block">
              <div className="text-[11px] font-medium">Demo Operator</div>
              <div className="text-[10px] text-muted-foreground">Safety Officer</div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-12 z-20 hidden h-[calc(100vh-3rem)] w-56 flex-col border-r border-border bg-surface lg:flex">
        {nav}
        <div className="mt-auto border-t border-border p-3">
          <div className="label-xs">Prototype Environment</div>
          <div className="num mt-1 text-[10px] text-muted-foreground">SIH 2026 · SIH26025</div>
        </div>
      </aside>

      <AnimatePresence>
        {drawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setDrawer(false)}
          >
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.18 }}
              className="h-full w-60 border-r border-border bg-surface"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border px-3 py-3">
                <Logo />
                <button onClick={() => setDrawer(false)} aria-label="Close navigation">
                  <X className="size-4" />
                </button>
              </div>
              {nav}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-w-0 pb-24 pl-0 pt-12 lg:pl-56">{children}</main>

      {/* Demo controls — presenter tool, docked bottom */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-warning/40 bg-[oklch(0.24_0.03_70)]">
        <div className="flex items-center gap-3 px-3 py-2">
          <span className="num rounded border border-warning/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-warning">
            Demo Controls
          </span>
          {barOpen && (
            <>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="flex items-center gap-1 rounded border border-border-strong bg-surface px-2 py-1 text-[11px] font-medium disabled:opacity-40"
                >
                  <SkipBack className="size-3.5" /> Back
                </button>
                <button
                  onClick={next}
                  disabled={step === TOTAL_STEPS - 1}
                  className="flex items-center gap-1 rounded border border-info/50 bg-info/15 px-2.5 py-1 text-[11px] font-semibold text-info disabled:opacity-40"
                >
                  Next Step <SkipForward className="size-3.5" />
                </button>
                <button
                  onClick={reset}
                  className="flex items-center gap-1 rounded border border-border-strong bg-surface px-2 py-1 text-[11px] font-medium"
                >
                  <RotateCcw className="size-3.5" /> Reset
                </button>
              </div>
              <div className="num shrink-0 text-[11px] text-warning/90">
                Step {step} / {TOTAL_STEPS - 1}
              </div>
              <div className="hidden min-w-0 truncate text-[11px] text-foreground/80 sm:block">{meta.title}</div>
            </>
          )}
          <button
            onClick={() => setBarOpen((v) => !v)}
            className="ml-auto flex items-center gap-1 text-[11px] text-warning/80"
          >
            {barOpen ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
            {barOpen ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border px-4 py-3">
      <div>
        <h1 className="text-[17px] font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[12px] text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
