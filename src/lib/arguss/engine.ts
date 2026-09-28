import { NODES, MESH_LINKS, neighboursOf, type Risk } from "./nodes";

export const TOTAL_STEPS = 5;
export const EPICENTRE = "SG-07";
export const COMMS_FAULT_NODE = "SG-18";
export const DISTURBANCE_NODE = "SG-14";

export interface NodeState {
  code: string;
  zone: string;
  risk: Risk;
  online: boolean;
  tiltX: number;
  tiltY: number;
  displacement: number;
  crackWidth: number;
  vibration: number;
  baselineDistance: number;
  interNodeDistance: number;
  driftPct: number;
  battery: number;
  signal: number;
  temperature: number;
  anomaly: number;
  nearestNeighbour: string;
  lastCommsSec: number;
}

export interface AlertRecord {
  id: string;
  nodeCode: string;
  severity: "high" | "warning" | "info";
  zone: string;
  trigger: string;
  anomaly: number;
  status: "active" | "acknowledged" | "resolved";
  kind: "ground" | "comms";
  minutesAgo: number;
}

export interface StepMeta {
  index: number;
  title: string;
  insight: string;
  zoneRisk: Record<string, Risk>;
  anomalyScore: number;
  deformationTrend: string;
  spatialCorrelation: string;
  sensorAgreement: string;
  persistenceMinutes: number;
  risk: Risk;
  factors: { label: string; met: boolean }[];
  reasoning: string;
  correlatedNodes: string[];
}

/** deterministic 0..1 from a string */
function hash01(s: string, salt = 0): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

const r2 = (v: number, d = 2) => Math.round(v * 10 ** d) / 10 ** d;

/** escalation weight per step for each involved node */
function escalation(code: string, step: number): number {
  const order: Record<string, number> = { "SG-07": 1, "SG-06": 2, "SG-08": 2, "SG-12": 3 };
  const joinsAt = order[code];
  if (!joinsAt) return 0;
  if (step < 1) return 0;
  if (code === EPICENTRE) return [0, 0.35, 0.7, 1, 1][step] ?? 0;
  if (step < joinsAt) return 0;
  return joinsAt === 2 ? (step === 2 ? 0.45 : 0.75) : 0.6;
}

export function nodeStates(step: number): NodeState[] {
  return NODES.map((n) => {
    const h = hash01(n.code);
    const h2 = hash01(n.code, 91);
    const e = escalation(n.code, step);
    const offline = n.code === COMMS_FAULT_NODE;
    const disturbance = n.code === DISTURBANCE_NODE && step >= 1;

    const baseTilt = 0.02 + h * 0.05;
    const tiltX = r2(baseTilt + e * 1.55, 3);
    const tiltY = r2(baseTilt * 0.8 + e * 1.1, 3);
    const displacement = r2(0.6 + h2 * 1.1 + e * 21.5, 2);
    const crackWidth = r2(0.1 + h * 0.4 + (step >= 3 ? e * 3.6 : e * 0.4), 2);
    const vibration = r2(0.04 + h2 * 0.07 + (step >= 3 ? e * 0.9 : e * 0.12) + (disturbance ? 0.62 : 0), 3);
    const baselineDistance = r2(38 + h * 9, 2);
    const drift = e * 0.42;
    const interNodeDistance = r2(baselineDistance * (1 + drift / 100), 3);

    let anomaly = Math.round(6 + h * 8 + e * 82);
    if (disturbance) anomaly = Math.round(anomaly + 18);
    if (offline) anomaly = 0;
    anomaly = Math.min(anomaly, 97);

    const risk: Risk = offline
      ? "normal"
      : anomaly >= 72 && step >= 3 && e > 0
        ? "high"
        : anomaly >= 45 && step >= 2 && e > 0
          ? "warning"
          : "normal";

    return {
      code: n.code,
      zone: n.zone,
      risk,
      online: !offline,
      tiltX,
      tiltY,
      displacement,
      crackWidth,
      vibration,
      baselineDistance,
      interNodeDistance,
      driftPct: r2(drift, 3),
      battery: Math.round(78 + h * 21 - (offline ? 34 : 0)),
      signal: Math.round(-64 - h2 * 24 - (offline ? 22 : 0)),
      temperature: r2(28.5 + h * 6, 1),
      anomaly,
      nearestNeighbour: neighboursOf(n.code)[0] ?? "—",
      lastCommsSec: offline ? 372 : 2 + Math.round(h * 4),
    };
  });
}

const F = (label: string, met: boolean) => ({ label, met });

export function stepMeta(step: number): StepMeta {
  const common = {
    index: step,
    zoneRisk: { "Zone A": "normal", "Zone B": "normal", "Zone C": "normal", "Zone D": "normal" } as Record<string, Risk>,
  };
  switch (step) {
    case 0:
      return {
        ...common,
        title: "Baseline — all systems nominal",
        insight:
          "All 20 nodes reporting within surveyed baseline tolerance. No deformation signature detected across Panel 7.",
        anomalyScore: 11,
        deformationTrend: "Flat",
        spatialCorrelation: "None",
        sensorAgreement: "1 / 5 sensors",
        persistenceMinutes: 0,
        risk: "normal",
        correlatedNodes: [],
        factors: [
          F("Magnitude above baseline threshold", false),
          F("Sustained deformation trend", false),
          F("Spatial correlation across ≥3 neighbouring nodes", false),
          F("Multi-sensor agreement (tilt + displacement + crack)", false),
          F("Persistence beyond 10 minutes", false),
        ],
        reasoning:
          "No risk escalation: every channel is inside surveyed baseline tolerance and no neighbouring node shows a correlated signature.",
      };
    case 1:
      return {
        ...common,
        title: "Sub-threshold tilt uptick near Zone B",
        insight:
          "SG-07 tilt has risen 0.54° above baseline but remains sub-threshold. Neighbouring nodes show no correlated movement yet.",
        anomalyScore: 34,
        deformationTrend: "Slow rise (SG-07)",
        spatialCorrelation: "1 node only",
        sensorAgreement: "2 / 5 sensors",
        persistenceMinutes: 4,
        risk: "normal",
        correlatedNodes: [EPICENTRE],
        factors: [
          F("Magnitude above baseline threshold", true),
          F("Sustained deformation trend", false),
          F("Spatial correlation across ≥3 neighbouring nodes", false),
          F("Multi-sensor agreement (tilt + displacement + crack)", false),
          F("Persistence beyond 10 minutes", false),
        ],
        reasoning:
          "Escalation withheld: the signature is not yet spatially correlated or persistent enough, even where magnitude has risen.",
      };
    case 2:
      return {
        ...common,
        zoneRisk: { ...common.zoneRisk, "Zone B": "warning" },
        title: "WARNING — correlated deformation, Zone B",
        insight:
          "Zone B escalated to WARNING: tilt and displacement rising on SG-07 with correlated movement now confirmed on SG-06 and SG-08 over 14 minutes.",
        anomalyScore: 61,
        deformationTrend: "Rising (14 min)",
        spatialCorrelation: "3 neighbouring nodes",
        sensorAgreement: "3 / 5 sensors",
        persistenceMinutes: 14,
        risk: "warning",
        correlatedNodes: [EPICENTRE, "SG-06", "SG-08"],
        factors: [
          F("Magnitude above baseline threshold", true),
          F("Sustained deformation trend", true),
          F("Spatial correlation across ≥3 neighbouring nodes", true),
          F("Multi-sensor agreement (tilt + displacement + crack)", false),
          F("Persistence beyond 10 minutes", true),
        ],
        reasoning:
          "Escalated to WARNING: rising tilt and displacement are now spatially correlated across three neighbouring nodes and persistent for 14 minutes. Crack and vibration channels have not yet agreed, so HIGH RISK is withheld.",
      };
    case 3:
    case 4:
      return {
        ...common,
        zoneRisk: { ...common.zoneRisk, "Zone B": "high" },
        title:
          step === 3
            ? "HIGH RISK — multi-sensor fusion confirmed, Zone B"
            : "HIGH RISK acknowledged — incident open, Zone B",
        insight:
          step === 3
            ? "Zone B at HIGH RISK: crack width and vibration now agree with tilt and displacement, and a fourth node (SG-12) has correlated. Surface subsidence probable within the Zone B footprint."
            : "Zone B HIGH RISK acknowledged by Safety Officer. Incident timeline open; surface exclusion recommended around SG-06 / SG-07 / SG-08 / SG-12.",
        anomalyScore: 88,
        deformationTrend: "Accelerating (27 min)",
        spatialCorrelation: "4 neighbouring nodes",
        sensorAgreement: "5 / 5 sensors",
        persistenceMinutes: 27,
        risk: "high",
        correlatedNodes: [EPICENTRE, "SG-06", "SG-08", "SG-12"],
        factors: [
          F("Magnitude above baseline threshold", true),
          F("Sustained deformation trend", true),
          F("Spatial correlation across ≥3 neighbouring nodes", true),
          F("Multi-sensor agreement (tilt + displacement + crack)", true),
          F("Persistence beyond 10 minutes", true),
        ],
        reasoning:
          "Escalated to HIGH RISK: all five fusion criteria are satisfied — accelerating deformation, agreement across five sensor channels, four spatially correlated nodes, and 27 minutes of persistence.",
      };
    default:
      return stepMeta(0);
  }
}

export function alertsFor(step: number): AlertRecord[] {
  const out: AlertRecord[] = [];
  out.push({
    id: "AL-1042",
    nodeCode: COMMS_FAULT_NODE,
    severity: "info",
    zone: "Zone D",
    trigger: "No telemetry for 6 min · classified as comms failure, not subsidence",
    anomaly: 0,
    status: "active",
    kind: "comms",
    minutesAgo: 6,
  });
  if (step >= 1) {
    out.push({
      id: "AL-1043",
      nodeCode: DISTURBANCE_NODE,
      severity: "info",
      zone: "Zone C",
      trigger: "Single-node vibration spike · uncorrelated, suppressed as surface traffic",
      anomaly: 31,
      status: "resolved",
      kind: "comms",
      minutesAgo: 18,
    });
  }
  if (step >= 2) {
    out.push({
      id: "AL-1044",
      nodeCode: EPICENTRE,
      severity: "warning",
      zone: "Zone B",
      trigger: "Correlated tilt + displacement rise across SG-06 / SG-07 / SG-08",
      anomaly: 61,
      status: step >= 4 ? "acknowledged" : "active",
      kind: "ground",
      minutesAgo: 14,
    });
  }
  if (step >= 3) {
    out.push({
      id: "AL-1045",
      nodeCode: EPICENTRE,
      severity: "high",
      zone: "Zone B",
      trigger: "Multi-sensor fusion confirmed · crack growth + vibration + 4-node correlation",
      anomaly: 88,
      status: step >= 4 ? "acknowledged" : "active",
      kind: "ground",
      minutesAgo: 3,
    });
  }
  return out.reverse();
}

export interface TimelinePoint {
  t: string;
  anomaly: number;
  displacement: number;
  tilt: number;
  crack: number;
  vibration: number;
}

/** deterministic 24h series; the tail bends with the demo step */
export function timeline(step: number, points = 48): TimelinePoint[] {
  const target = [12, 34, 61, 88, 88][step] ?? 12;
  return Array.from({ length: points }, (_, i) => {
    const wobble = Math.sin(i / 3.1) * 2.2 + Math.cos(i / 1.7) * 1.4;
    const ramp = i < points - 12 ? 0 : (i - (points - 13)) / 12;
    const anomaly = Math.max(4, 10 + wobble + (target - 10) * ramp ** 1.6);
    return {
      t: `${String((i * 30) / 60 | 0).padStart(2, "0")}:${i % 2 ? "30" : "00"}`,
      anomaly: r2(anomaly, 1),
      displacement: r2(1 + wobble * 0.1 + ramp * (target / 4), 2),
      tilt: r2(0.05 + ramp * (target / 55), 3),
      crack: r2(0.2 + ramp * (step >= 3 ? 3.4 : 0.3), 2),
      vibration: r2(0.06 + ramp * (step >= 3 ? 0.8 : 0.08), 3),
    };
  });
}

export const zoneOf = (code: string) => NODES.find((n) => n.code === code)?.zone ?? "—";
export { MESH_LINKS };
