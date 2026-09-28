import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { PageHeader } from "@/components/arguss/AppShell";
import { MineMap } from "@/components/arguss/MineMap";
import { Metric, Panel, RiskBadge } from "@/components/arguss/bits";
import { useDemo } from "@/lib/arguss/store";
import { nodeStates } from "@/lib/arguss/engine";
import { nodeByCode } from "@/lib/arguss/nodes";

const HISTORY = [
  { label: "T-90 min", step: 0 },
  { label: "T-45 min", step: 1 },
  { label: "T-27 min", step: 2 },
  { label: "T-08 min", step: 3 },
  { label: "Now", step: -1 },
];

export const Route = createFileRoute("/_shell/map")({
  head: () => ({
    meta: [
      { title: "Mine Map — ARGUSS" },
      {
        name: "description",
        content:
          "Top-down GIS view of Jharia Coalfield Panel 7 with the LoRa mesh topology, risk zones and deformation time slider.",
      },
      { property: "og:title", content: "Mine Map — ARGUSS" },
      { property: "og:description", content: "Mesh topology, risk zones and deformation replay for Panel 7." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const { step, meta, nodeByCode: state } = useDemo();
  const [selected, setSelected] = useState<string | null>(null);
  const [slider, setSlider] = useState(4);
  const histStep = HISTORY[slider]!.step === -1 ? step : HISTORY[slider]!.step;
  const states = nodeStates(histStep);

  const node = selected?.startsWith("SG-") ? states.find((n) => n.code === selected) : undefined;
  const zone = selected?.startsWith("Zone") ? selected : undefined;
  const zoneNodes = zone ? states.filter((n) => n.zone === zone) : [];

  return (
    <div>
      <PageHeader
        title="Mine Map"
        subtitle="Panel 7 surface footprint · 20-node LoRa mesh (relay topology) · gateway GW-01"
        right={<RiskBadge risk={meta.risk} size="lg" />}
      />
      <div className="grid gap-3 p-3 lg:grid-cols-[1fr_320px]">
        <Panel bodyClassName="p-2">
          <div className="h-[520px]">
            <MineMap selected={selected} onSelect={setSelected} overrideStates={states} />
          </div>
          <div className="mt-3 border-t border-border px-1 pt-3">
            <div className="flex items-center justify-between">
              <span className="label-xs">Deformation time slider</span>
              <span className="num text-[11px] text-info">{HISTORY[slider]!.label}</span>
            </div>
            <input
              type="range"
              min={0}
              max={4}
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              className="mt-2 w-full accent-[oklch(0.546_0.226_264)]"
            />
            <div className="num mt-1 flex justify-between text-[10px] text-muted-foreground">
              {HISTORY.map((h) => (
                <span key={h.label}>{h.label}</span>
              ))}
            </div>
          </div>
        </Panel>

        <Panel
          title={node ? `Node ${node.code}` : zone ? zone : "Selection"}
          hint={node ? node.zone : zone ? `${zoneNodes.length} nodes` : "Click a node or risk zone"}
          actions={
            selected && (
              <button onClick={() => setSelected(null)} aria-label="Clear selection">
                <X className="size-3.5 text-muted-foreground" />
              </button>
            )
          }
        >
          {!selected && (
            <p className="text-[12px] leading-relaxed text-muted-foreground">
              Select a sensor node or a risk zone on the map to inspect its telemetry, anomaly score and the
              reasoning behind its current classification. Thin lines are LoRa mesh hops between neighbouring
              nodes; dashed blue lines are gateway uplinks.
            </p>
          )}
          {node && (
            <div className="space-y-3">
              <RiskBadge risk={node.risk} size="lg" />
              <div className="grid grid-cols-2 gap-y-3">
                <Metric label="Anomaly score" value={node.anomaly} unit="/100" tone={node.anomaly > 70 ? "danger" : node.anomaly > 44 ? "warning" : "normal"} />
                <Metric label="Displacement" value={node.displacement.toFixed(2)} unit="mm" />
                <Metric label="Tilt X / Y" value={`${node.tiltX.toFixed(2)} / ${node.tiltY.toFixed(2)}`} unit="°" />
                <Metric label="Crack width" value={node.crackWidth.toFixed(2)} unit="mm" />
                <Metric label="Inter-node drift" value={`${node.driftPct.toFixed(3)}`} unit="%" />
                <Metric label="Coordinates" value={`${nodeByCode(node.code)!.lat.toFixed(4)}`} sub={`${nodeByCode(node.code)!.lon.toFixed(4)} E`} />
              </div>
              <p className="border-t border-border pt-2 text-[12px] leading-relaxed text-muted-foreground">
                {node.online
                  ? meta.reasoning
                  : "Telemetry absent for 6 minutes. Fusion engine classified this as a comms failure, not subsidence — no ground-risk escalation raised."}
              </p>
              <Link to="/live/$nodeCode" params={{ nodeCode: node.code }} className="block text-[11px] text-info hover:underline">
                Open full node detail →
              </Link>
            </div>
          )}
          {zone && (
            <div className="space-y-3">
              <RiskBadge risk={meta.zoneRisk[zone] ?? "normal"} size="lg" />
              <div className="divide-y divide-border">
                {zoneNodes.map((z) => (
                  <button
                    key={z.code}
                    onClick={() => setSelected(z.code)}
                    className="flex w-full items-center justify-between py-1.5 text-left"
                  >
                    <span className="num text-[12px]">{z.code}</span>
                    <span className="num text-[11px] text-muted-foreground">{z.anomaly}/100</span>
                    <RiskBadge risk={z.risk} />
                  </button>
                ))}
              </div>
              <p className="border-t border-border pt-2 text-[12px] leading-relaxed text-muted-foreground">
                {meta.reasoning}
              </p>
            </div>
          )}
        </Panel>
      </div>
      {(() => {
        const s = state("SG-07");
        return s ? null : null;
      })()}
    </div>
  );
}
