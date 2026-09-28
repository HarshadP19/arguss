import { i as __toESM } from "../_runtime.mjs";
import { i as ZONE_BOUNDS, n as MESH_LINKS, r as NODES, t as GATEWAY } from "./nodes-D6HkLfIW.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { A as ChevronDown, p as Radio, x as Layers } from "../_libs/lucide-react.mjs";
import { a as cn, c as useDemo } from "./AppShell-B9CTOc9N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MineMap-ByzmV7Zb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RISK_FILL = {
	normal: "oklch(0.606 0.152 149)",
	warning: "oklch(0.769 0.166 70)",
	high: "oklch(0.577 0.216 27.3)"
};
function MineMap({ onSelect, selected, compact, overrideStates }) {
	const demo = useDemo();
	const nodes = overrideStates ?? demo.nodes;
	const { meta } = demo;
	const [layers, setLayers] = (0, import_react.useState)({
		nodes: true,
		zones: true,
		tilt: false,
		displacement: false
	});
	const [open, setOpen] = (0, import_react.useState)(!compact);
	const stateOf = (code) => nodes.find((n) => n.code === code);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full min-h-[320px] w-full overflow-hidden rounded bg-[oklch(0.155_0.006_265)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 1000 700",
				className: "h-full w-full",
				role: "img",
				"aria-label": "Mine site map",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
							id: "grid",
							width: "50",
							height: "50",
							patternUnits: "userSpaceOnUse",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M50 0H0V50",
								fill: "none",
								stroke: "oklch(0.24 0.008 265)",
								strokeWidth: "1"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
							id: "tiltHeat",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "oklch(0.769 0.166 70)",
								stopOpacity: "0.55"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "oklch(0.769 0.166 70)",
								stopOpacity: "0"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
							id: "dispHeat",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "oklch(0.577 0.216 27.3)",
								stopOpacity: "0.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "oklch(0.577 0.216 27.3)",
								stopOpacity: "0"
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "1000",
						height: "700",
						fill: "url(#grid)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0 655 L1000 620",
						stroke: "oklch(0.33 0.01 265)",
						strokeWidth: "7",
						fill: "none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "16",
						y: "645",
						className: "num",
						fontSize: "11",
						fill: "oklch(0.55 0.02 258)",
						children: "NH-32 HAUL ROAD"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "60",
						y: "30",
						width: "52",
						height: "26",
						fill: "none",
						stroke: "oklch(0.33 0.01 265)",
						strokeWidth: "1.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "60",
						y: "24",
						fontSize: "10",
						fill: "oklch(0.55 0.02 258)",
						children: "Colliery office"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "800",
						y: "26",
						width: "120",
						height: "30",
						fill: "none",
						stroke: "oklch(0.33 0.01 265)",
						strokeWidth: "1.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "800",
						y: "20",
						fontSize: "10",
						fill: "oklch(0.55 0.02 258)",
						children: "Bastacolla village"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "70",
						y: "60",
						width: "870",
						height: "620",
						fill: "none",
						stroke: "oklch(0.42 0.012 265)",
						strokeWidth: "2",
						strokeDasharray: "10 6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "78",
						y: "52",
						fontSize: "11",
						fill: "oklch(0.62 0.017 258)",
						children: "UNDERGROUND PANEL 7 — EXTRACTION FOOTPRINT"
					}),
					layers.zones && Object.entries(ZONE_BOUNDS).map(([zone, b]) => {
						const risk = meta.zoneRisk[zone] ?? "normal";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: b.x,
							y: b.y,
							width: b.w,
							height: b.h,
							fill: RISK_FILL[risk],
							fillOpacity: risk === "normal" ? .05 : risk === "warning" ? .16 : .24,
							stroke: RISK_FILL[risk],
							strokeOpacity: risk === "normal" ? .25 : .7,
							strokeWidth: "1.5",
							className: "cursor-pointer transition-all duration-300",
							onClick: () => onSelect?.(zone)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: b.x + 8,
							y: b.y + 16,
							className: "num",
							fontSize: "11",
							fill: RISK_FILL[risk],
							children: zone.toUpperCase()
						})] }, zone);
					}),
					(layers.tilt || layers.displacement) && nodes.filter((n) => n.anomaly > 40).map((n) => {
						const def = NODES.find((d) => d.code === n.code);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: def.x,
							cy: def.y,
							r: 110,
							fill: layers.displacement ? "url(#dispHeat)" : "url(#tiltHeat)"
						}, `heat-${n.code}`);
					}),
					MESH_LINKS.map((l, i) => {
						const a = NODES.find((n) => n.code === l.a);
						const b = NODES.find((n) => n.code === l.b);
						const sa = stateOf(l.a);
						const sb = stateOf(l.b);
						const down = !sa.online || !sb.online;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: a.x,
							y1: a.y,
							x2: b.x,
							y2: b.y,
							stroke: down ? "oklch(0.45 0.015 265)" : "oklch(0.52 0.05 250)",
							strokeWidth: l.type === "direct" ? 1.4 : 1,
							strokeDasharray: down ? "3 4" : l.type === "relay" ? "6 3" : void 0,
							strokeOpacity: down ? .5 : .8
						}, i);
					}),
					[
						"SG-15",
						"SG-19",
						"SG-20"
					].map((c) => {
						const d = NODES.find((n) => n.code === c);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: d.x,
							y1: d.y,
							x2: GATEWAY.x,
							y2: GATEWAY.y,
							stroke: "oklch(0.546 0.226 264)",
							strokeWidth: "1.2",
							strokeDasharray: "2 4",
							strokeOpacity: "0.8"
						}, c);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: GATEWAY.x - 14,
							y: GATEWAY.y - 14,
							width: "28",
							height: "28",
							rx: "4",
							fill: "oklch(0.32 0.058 250)",
							stroke: "oklch(0.546 0.226 264)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: GATEWAY.x,
							y: GATEWAY.y + 4,
							fontSize: "11",
							textAnchor: "middle",
							fill: "oklch(0.9 0 0)",
							children: "GW"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							x: GATEWAY.x + 20,
							y: GATEWAY.y + 4,
							className: "num",
							fontSize: "10",
							fill: "oklch(0.62 0.017 258)",
							children: [GATEWAY.label, " · LoRa 865 MHz"]
						})
					] }),
					layers.nodes && NODES.map((def) => {
						const s = stateOf(def.code);
						const fill = s.online ? RISK_FILL[s.risk] : "oklch(0.45 0.015 265)";
						const isSel = selected === def.code;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "cursor-pointer",
							onClick: () => onSelect?.(def.code),
							role: "button",
							"aria-label": def.code,
							children: [
								(s.risk !== "normal" || isSel) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: def.x,
									cy: def.y,
									r: isSel ? 20 : 16,
									fill,
									fillOpacity: .18
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: def.x,
									cy: def.y,
									r: 9,
									fill,
									stroke: isSel ? "oklch(0.93 0 0)" : "oklch(0.18 0.008 265)",
									strokeWidth: isSel ? 2 : 1.5,
									className: "transition-all duration-300"
								}),
								!s.online && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: `M${def.x - 5} ${def.y - 5} L${def.x + 5} ${def.y + 5} M${def.x + 5} ${def.y - 5} L${def.x - 5} ${def.y + 5}`,
									stroke: "oklch(0.2 0 0)",
									strokeWidth: "1.6"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: def.x,
									y: def.y - 15,
									className: "num",
									fontSize: "10",
									textAnchor: "middle",
									fill: "oklch(0.75 0.01 258)",
									children: def.code
								})
							]
						}, def.code);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-2 left-2 w-44 rounded border border-border bg-surface/95",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setOpen((v) => !v),
					className: "flex w-full items-center gap-1.5 border-b border-border px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }),
						" Layers",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("ml-auto size-3.5 transition-transform", open && "rotate-180") })
					]
				}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-1 p-2",
					children: [
						["nodes", "Sensor Nodes"],
						["zones", "Risk Zones"],
						["tilt", "Tilt Heatmap"],
						["displacement", "Displacement Heatmap"]
					].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-center gap-2 text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: layers[key],
							onChange: (e) => setLayers((l) => ({
								...l,
								[key]: e.target.checked
							})),
							className: "size-3 accent-[oklch(0.546_0.226_264)]"
						}), label]
					}, key))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-2 top-2 flex items-center gap-3 rounded border border-border bg-surface/95 px-2 py-1 text-[10px] text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3.5" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-normal" }), " Normal"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-warning" }), " Warning"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-danger" }), " High"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-muted-foreground" }), " Offline"]
					})
				]
			})
		]
	});
}
//#endregion
export { MineMap as t };
