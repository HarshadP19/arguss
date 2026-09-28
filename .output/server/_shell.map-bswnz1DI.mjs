import { i as __toESM } from "./_runtime.mjs";
import { o as nodeByCode } from "./_ssr/nodes-D6HkLfIW.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as X } from "./_libs/lucide-react.mjs";
import { c as useDemo, i as PageHeader, o as nodeStates } from "./_ssr/AppShell-B9CTOc9N.mjs";
import { i as RiskBadge, n as Metric, r as Panel } from "./_ssr/bits-D2vcYkUv.mjs";
import { t as MineMap } from "./_ssr/MineMap-ByzmV7Zb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_shell.map-bswnz1DI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HISTORY = [
	{
		label: "T-90 min",
		step: 0
	},
	{
		label: "T-45 min",
		step: 1
	},
	{
		label: "T-27 min",
		step: 2
	},
	{
		label: "T-08 min",
		step: 3
	},
	{
		label: "Now",
		step: -1
	}
];
function MapPage() {
	const { step, meta, nodeByCode: state } = useDemo();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [slider, setSlider] = (0, import_react.useState)(4);
	const histStep = HISTORY[slider].step === -1 ? step : HISTORY[slider].step;
	const states = nodeStates(histStep);
	const node = selected?.startsWith("SG-") ? states.find((n) => n.code === selected) : void 0;
	const zone = selected?.startsWith("Zone") ? selected : void 0;
	const zoneNodes = zone ? states.filter((n) => n.zone === zone) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Mine Map",
			subtitle: "Panel 7 surface footprint · 20-node LoRa mesh (relay topology) · gateway GW-01",
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, {
				risk: meta.risk,
				size: "lg"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 p-3 lg:grid-cols-[1fr_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				bodyClassName: "p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[520px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MineMap, {
						selected,
						onSelect: setSelected,
						overrideStates: states
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 border-t border-border px-1 pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-xs",
								children: "Deformation time slider"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num text-[11px] text-info",
								children: HISTORY[slider].label
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 4,
							value: slider,
							onChange: (e) => setSlider(Number(e.target.value)),
							className: "mt-2 w-full accent-[oklch(0.546_0.226_264)]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "num mt-1 flex justify-between text-[10px] text-muted-foreground",
							children: HISTORY.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h.label }, h.label))
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: node ? `Node ${node.code}` : zone ? zone : "Selection",
				hint: node ? node.zone : zone ? `${zoneNodes.length} nodes` : "Click a node or risk zone",
				actions: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSelected(null),
					"aria-label": "Clear selection",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5 text-muted-foreground" })
				}),
				children: [
					!selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] leading-relaxed text-muted-foreground",
						children: "Select a sensor node or a risk zone on the map to inspect its telemetry, anomaly score and the reasoning behind its current classification. Thin lines are LoRa mesh hops between neighbouring nodes; dashed blue lines are gateway uplinks."
					}),
					node && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, {
								risk: node.risk,
								size: "lg"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
										label: "Anomaly score",
										value: node.anomaly,
										unit: "/100",
										tone: node.anomaly > 70 ? "danger" : node.anomaly > 44 ? "warning" : "normal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
										label: "Displacement",
										value: node.displacement.toFixed(2),
										unit: "mm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
										label: "Tilt X / Y",
										value: `${node.tiltX.toFixed(2)} / ${node.tiltY.toFixed(2)}`,
										unit: "°"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
										label: "Crack width",
										value: node.crackWidth.toFixed(2),
										unit: "mm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
										label: "Inter-node drift",
										value: `${node.driftPct.toFixed(3)}`,
										unit: "%"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
										label: "Coordinates",
										value: `${nodeByCode(node.code).lat.toFixed(4)}`,
										sub: `${nodeByCode(node.code).lon.toFixed(4)} E`
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "border-t border-border pt-2 text-[12px] leading-relaxed text-muted-foreground",
								children: node.online ? meta.reasoning : "Telemetry absent for 6 minutes. Fusion engine classified this as a comms failure, not subsidence — no ground-risk escalation raised."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/live/$nodeCode",
								params: { nodeCode: node.code },
								className: "block text-[11px] text-info hover:underline",
								children: "Open full node detail →"
							})
						]
					}),
					zone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, {
								risk: meta.zoneRisk[zone] ?? "normal",
								size: "lg"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y divide-border",
								children: zoneNodes.map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSelected(z.code),
									className: "flex w-full items-center justify-between py-1.5 text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "num text-[12px]",
											children: z.code
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "num text-[11px] text-muted-foreground",
											children: [z.anomaly, "/100"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { risk: z.risk })
									]
								}, z.code))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "border-t border-border pt-2 text-[12px] leading-relaxed text-muted-foreground",
								children: meta.reasoning
							})
						]
					})
				]
			})]
		}),
		(() => {
			return state("SG-07") ? null : null;
		})()
	] });
}
//#endregion
export { MapPage as component };
