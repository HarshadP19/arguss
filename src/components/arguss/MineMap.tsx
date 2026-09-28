import { useState } from "react";
import { ChevronDown, Layers, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { GATEWAY, MESH_LINKS, NODES, ZONE_BOUNDS } from "@/lib/arguss/nodes";
import { useDemo } from "@/lib/arguss/store";
import type { NodeState } from "@/lib/arguss/engine";

const RISK_FILL: Record<string, string> = {
  normal: "oklch(0.606 0.152 149)",
  warning: "oklch(0.769 0.166 70)",
  high: "oklch(0.577 0.216 27.3)",
};

export interface MapLayers {
  nodes: boolean;
  zones: boolean;
  tilt: boolean;
  displacement: boolean;
}

export function MineMap({
  onSelect,
  selected,
  compact,
  overrideStates,
}: {
  onSelect?: (code: string) => void;
  selected?: string | null;
  compact?: boolean;
  overrideStates?: NodeState[];
}) {
  const demo = useDemo();
  const nodes = overrideStates ?? demo.nodes;
  const { meta } = demo;
  const [layers, setLayers] = useState<MapLayers>({ nodes: true, zones: true, tilt: false, displacement: false });
  const [open, setOpen] = useState(!compact);

  const stateOf = (code: string) => nodes.find((n) => n.code === code)!;

  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded bg-[oklch(0.155_0.006_265)]">
      <svg viewBox="0 0 1000 700" className="h-full w-full" role="img" aria-label="Mine site map">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M50 0H0V50" fill="none" stroke="oklch(0.24 0.008 265)" strokeWidth="1" />
          </pattern>
          <radialGradient id="tiltHeat">
            <stop offset="0%" stopColor="oklch(0.769 0.166 70)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.769 0.166 70)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="dispHeat">
            <stop offset="0%" stopColor="oklch(0.577 0.216 27.3)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.577 0.216 27.3)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1000" height="700" fill="url(#grid)" />

        {/* surface context */}
        <path d="M0 655 L1000 620" stroke="oklch(0.33 0.01 265)" strokeWidth="7" fill="none" />
        <text x="16" y="645" className="num" fontSize="11" fill="oklch(0.55 0.02 258)">
          NH-32 HAUL ROAD
        </text>
        <rect x="60" y="30" width="52" height="26" fill="none" stroke="oklch(0.33 0.01 265)" strokeWidth="1.5" />
        <text x="60" y="24" fontSize="10" fill="oklch(0.55 0.02 258)">
          Colliery office
        </text>
        <rect x="800" y="26" width="120" height="30" fill="none" stroke="oklch(0.33 0.01 265)" strokeWidth="1.5" />
        <text x="800" y="20" fontSize="10" fill="oklch(0.55 0.02 258)">
          Bastacolla village
        </text>

        {/* panel boundary */}
        <rect
          x="70"
          y="60"
          width="870"
          height="620"
          fill="none"
          stroke="oklch(0.42 0.012 265)"
          strokeWidth="2"
          strokeDasharray="10 6"
        />
        <text x="78" y="52" fontSize="11" fill="oklch(0.62 0.017 258)">
          UNDERGROUND PANEL 7 — EXTRACTION FOOTPRINT
        </text>

        {/* risk zones */}
        {layers.zones &&
          Object.entries(ZONE_BOUNDS).map(([zone, b]) => {
            const risk = meta.zoneRisk[zone] ?? "normal";
            return (
              <g key={zone}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  fill={RISK_FILL[risk]}
                  fillOpacity={risk === "normal" ? 0.05 : risk === "warning" ? 0.16 : 0.24}
                  stroke={RISK_FILL[risk]}
                  strokeOpacity={risk === "normal" ? 0.25 : 0.7}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => onSelect?.(zone)}
                />
                <text x={b.x + 8} y={b.y + 16} className="num" fontSize="11" fill={RISK_FILL[risk]}>
                  {zone.toUpperCase()}
                </text>
              </g>
            );
          })}

        {/* heatmaps */}
        {(layers.tilt || layers.displacement) &&
          nodes
            .filter((n) => n.anomaly > 40)
            .map((n) => {
              const def = NODES.find((d) => d.code === n.code)!;
              return (
                <circle
                  key={`heat-${n.code}`}
                  cx={def.x}
                  cy={def.y}
                  r={110}
                  fill={layers.displacement ? "url(#dispHeat)" : "url(#tiltHeat)"}
                />
              );
            })}

        {/* mesh links */}
        {MESH_LINKS.map((l, i) => {
          const a = NODES.find((n) => n.code === l.a)!;
          const b = NODES.find((n) => n.code === l.b)!;
          const sa = stateOf(l.a);
          const sb = stateOf(l.b);
          const down = !sa.online || !sb.online;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={down ? "oklch(0.45 0.015 265)" : "oklch(0.52 0.05 250)"}
              strokeWidth={l.type === "direct" ? 1.4 : 1}
              strokeDasharray={down ? "3 4" : l.type === "relay" ? "6 3" : undefined}
              strokeOpacity={down ? 0.5 : 0.8}
            />
          );
        })}
        {/* gateway uplinks */}
        {["SG-15", "SG-19", "SG-20"].map((c) => {
          const d = NODES.find((n) => n.code === c)!;
          return (
            <line
              key={c}
              x1={d.x}
              y1={d.y}
              x2={GATEWAY.x}
              y2={GATEWAY.y}
              stroke="oklch(0.546 0.226 264)"
              strokeWidth="1.2"
              strokeDasharray="2 4"
              strokeOpacity="0.8"
            />
          );
        })}
        <g>
          <rect
            x={GATEWAY.x - 14}
            y={GATEWAY.y - 14}
            width="28"
            height="28"
            rx="4"
            fill="oklch(0.32 0.058 250)"
            stroke="oklch(0.546 0.226 264)"
          />
          <text x={GATEWAY.x} y={GATEWAY.y + 4} fontSize="11" textAnchor="middle" fill="oklch(0.9 0 0)">
            GW
          </text>
          <text x={GATEWAY.x + 20} y={GATEWAY.y + 4} className="num" fontSize="10" fill="oklch(0.62 0.017 258)">
            {GATEWAY.label} · LoRa 865 MHz
          </text>
        </g>

        {/* nodes */}
        {layers.nodes &&
          NODES.map((def) => {
            const s = stateOf(def.code);
            const fill = s.online ? RISK_FILL[s.risk]! : "oklch(0.45 0.015 265)";
            const isSel = selected === def.code;
            return (
              <g
                key={def.code}
                className="cursor-pointer"
                onClick={() => onSelect?.(def.code)}
                role="button"
                aria-label={def.code}
              >
                {(s.risk !== "normal" || isSel) && (
                  <circle cx={def.x} cy={def.y} r={isSel ? 20 : 16} fill={fill} fillOpacity={0.18} />
                )}
                <circle
                  cx={def.x}
                  cy={def.y}
                  r={9}
                  fill={fill}
                  stroke={isSel ? "oklch(0.93 0 0)" : "oklch(0.18 0.008 265)"}
                  strokeWidth={isSel ? 2 : 1.5}
                  className="transition-all duration-300"
                />
                {!s.online && (
                  <path
                    d={`M${def.x - 5} ${def.y - 5} L${def.x + 5} ${def.y + 5} M${def.x + 5} ${def.y - 5} L${def.x - 5} ${def.y + 5}`}
                    stroke="oklch(0.2 0 0)"
                    strokeWidth="1.6"
                  />
                )}
                <text
                  x={def.x}
                  y={def.y - 15}
                  className="num"
                  fontSize="10"
                  textAnchor="middle"
                  fill="oklch(0.75 0.01 258)"
                >
                  {def.code}
                </text>
              </g>
            );
          })}
      </svg>

      {/* docked layer panel */}
      <div className="absolute bottom-2 left-2 w-44 rounded border border-border bg-surface/95">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-1.5 border-b border-border px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em]"
        >
          <Layers className="size-3.5" /> Layers
          <ChevronDown className={cn("ml-auto size-3.5 transition-transform", open && "rotate-180")} />
        </button>
        {open && (
          <div className="flex flex-col gap-1 p-2">
            {(
              [
                ["nodes", "Sensor Nodes"],
                ["zones", "Risk Zones"],
                ["tilt", "Tilt Heatmap"],
                ["displacement", "Displacement Heatmap"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center gap-2 text-[11px] text-muted-foreground">
                <input
                  type="checkbox"
                  checked={layers[key]}
                  onChange={(e) => setLayers((l) => ({ ...l, [key]: e.target.checked }))}
                  className="size-3 accent-[oklch(0.546_0.226_264)]"
                />
                {label}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="absolute right-2 top-2 flex items-center gap-3 rounded border border-border bg-surface/95 px-2 py-1 text-[10px] text-muted-foreground">
        <Radio className="size-3.5" />
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-normal" /> Normal
        </span>
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-warning" /> Warning
        </span>
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-danger" /> High
        </span>
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-muted-foreground" /> Offline
        </span>
      </div>
    </div>
  );
}
