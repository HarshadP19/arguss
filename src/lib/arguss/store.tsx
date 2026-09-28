import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { alertsFor, nodeStates, stepMeta, timeline, TOTAL_STEPS, type AlertRecord, type NodeState, type StepMeta } from "./engine";

interface Ctx {
  step: number;
  meta: StepMeta;
  nodes: NodeState[];
  alerts: AlertRecord[];
  series: ReturnType<typeof timeline>;
  next: () => void;
  back: () => void;
  reset: () => void;
  dataMode: "simulated" | "live";
  lastSync: string;
  nodeByCode: (code: string) => NodeState | undefined;
}

const DemoContext = createContext<Ctx | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(0);
  const [dataMode, setDataMode] = useState<"simulated" | "live">("simulated");
  const [lastSync, setLastSync] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setLastSync(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, []);

  // Auto demo/live switching: any non-simulated reading in the last 5 minutes flips the banner.
  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      const since = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { count } = await supabase
        .from("sensor_readings")
        .select("id", { count: "exact", head: true })
        .eq("is_simulated", false)
        .gte("recorded_at", since);
      if (!cancelled) setDataMode((count ?? 0) > 0 ? "live" : "simulated");
    };
    void check();
    const id = setInterval(check, 20000);
    const channel = supabase
      .channel("arguss-readings")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "sensor_readings" }, () => void check())
      .subscribe();
    return () => {
      cancelled = true;
      clearInterval(id);
      void supabase.removeChannel(channel);
    };
  }, []);

  const nodes = useMemo(() => nodeStates(step), [step]);
  const value: Ctx = {
    step,
    meta: useMemo(() => stepMeta(step), [step]),
    nodes,
    alerts: useMemo(() => alertsFor(step), [step]),
    series: useMemo(() => timeline(step), [step]),
    next: useCallback(() => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1)), []),
    back: useCallback(() => setStep((s) => Math.max(0, s - 1)), []),
    reset: useCallback(() => setStep(0), []),
    dataMode,
    lastSync,
    nodeByCode: useCallback((code: string) => nodes.find((n) => n.code === code), [nodes]),
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
