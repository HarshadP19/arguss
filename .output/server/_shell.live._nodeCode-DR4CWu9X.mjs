import { i as __toESM } from "./_runtime.mjs";
import { a as neighboursOf, o as nodeByCode } from "./_ssr/nodes-D6HkLfIW.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { L as ArrowLeft } from "./_libs/lucide-react.mjs";
import { a as cn, c as useDemo, i as PageHeader } from "./_ssr/AppShell-B9CTOc9N.mjs";
import { i as RiskBadge, n as Metric, r as Panel } from "./_ssr/bits-D2vcYkUv.mjs";
import { c as ResponsiveContainer, i as XAxis, l as Tooltip, n as LineChart, o as Line, r as YAxis, s as CartesianGrid } from "./_libs/recharts+[...].mjs";
import { t as Route } from "./_shell.live._nodeCode-D_grJwlW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_shell.live._nodeCode-DR4CWu9X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RANGES = [
	"1h",
	"6h",
	"24h",
	"7d"
];
function NodeDetail() {
	const { nodeCode } = Route.useParams();
	const { nodeByCode: state, series, meta, alerts } = useDemo();
	const [range, setRange] = (0, import_react.useState)("24h");
	const def = nodeByCode(nodeCode);
	const n = state(nodeCode);
	if (!n) return null;
	const factor = range === "1h" ? .25 : range === "6h" ? .6 : range === "24h" ? 1 : 1.4;
	const data = series.map((p, i) => ({
		t: p.t,
		displacement: Number((p.displacement * factor * (.4 + n.anomaly / 90)).toFixed(2)),
		tilt: Number((p.tilt * factor * (.4 + n.anomaly / 80)).toFixed(3)),
		anomaly: Math.min(100, Math.round(p.anomaly * (.4 + n.anomaly / 60) + i % 3))
	}));
	const events = [
		{
			t: "T-27 min",
			text: `Baseline drift check passed · ${def.positionType === "fixed_surveyed" ? "surveyed" : "GPS"} reference`
		},
		...n.anomaly > 44 ? [{
			t: "T-14 min",
			text: "Correlated tilt + displacement rise flagged by fusion engine"
		}] : [],
		...n.anomaly > 70 ? [{
			t: "T-3 min",
			text: "Crack width and vibration channels agreed → HIGH RISK"
		}] : [],
		...!n.online ? [{
			t: "T-6 min",
			text: "Telemetry lost — classified as comms failure, not subsidence"
		}] : []
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `Node ${n.code}`,
			subtitle: `${n.zone} · ${def.lat.toFixed(5)}, ${def.lon.toFixed(5)} · last comms ${n.lastCommsSec}s ago`,
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "num rounded border border-info/40 bg-info/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-info",
						children: ["Position: ", def.positionType === "fixed_surveyed" ? "Fixed — surveyed" : "GPS-referenced"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, {
						risk: n.risk,
						size: "lg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/live",
						className: "flex items-center gap-1 rounded border border-border px-2 py-1 text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " All nodes"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 p-3 lg:grid-cols-[2fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Telemetry history",
				hint: "displacement (mm) · tilt (°) · anomaly (0–100)",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex rounded border border-border",
					children: RANGES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setRange(r),
						className: cn("num px-2 py-0.5 text-[10px]", range === r ? "bg-surface-raised text-foreground" : "text-muted-foreground"),
						children: r
					}, r))
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data,
							margin: {
								top: 4,
								right: 8,
								left: -20,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "oklch(0.288 0.009 265)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "t",
									tick: {
										fontSize: 10,
										fill: "oklch(0.62 0.017 258)"
									},
									interval: 7
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
									fontSize: 10,
									fill: "oklch(0.62 0.017 258)"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "oklch(0.208 0.008 265)",
									border: "1px solid oklch(0.288 0.009 265)",
									borderRadius: 8,
									fontSize: 11
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "displacement",
									dot: false,
									strokeWidth: 1.6,
									stroke: "oklch(0.546 0.226 264)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "anomaly",
									dot: false,
									strokeWidth: 1.4,
									stroke: "oklch(0.769 0.166 70)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "tilt",
									dot: false,
									strokeWidth: 1.4,
									stroke: "oklch(0.606 0.152 149)"
								})
							]
						})
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Current readings",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Tilt X",
								value: n.tiltX.toFixed(3),
								unit: "°"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Tilt Y",
								value: n.tiltY.toFixed(3),
								unit: "°"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Displacement",
								value: n.displacement.toFixed(2),
								unit: "mm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Crack width",
								value: n.crackWidth.toFixed(2),
								unit: "mm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Vibration",
								value: n.vibration.toFixed(3),
								unit: "g"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Temperature",
								value: n.temperature.toFixed(1),
								unit: "°C"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Battery",
								value: n.battery,
								unit: "%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Signal",
								value: n.signal,
								unit: "dBm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Anomaly",
								value: n.anomaly,
								unit: "/100",
								tone: n.anomaly > 70 ? "danger" : n.anomaly > 44 ? "warning" : "normal"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Mesh neighbours",
					hint: `${neighboursOf(n.code).length} links`,
					bodyClassName: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: neighboursOf(n.code).map((c) => {
							const nb = state(c);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/live/$nodeCode",
								params: { nodeCode: c },
								className: "flex items-center justify-between px-3 py-2 hover:bg-surface-raised",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "num text-[12px]",
										children: c
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "num text-[10px] text-muted-foreground",
										children: [
											nb?.interNodeDistance.toFixed(3),
											" m · ",
											nb?.signal,
											" dBm"
										]
									}),
									nb && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { risk: nb.risk })
								]
							}, c);
						})
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 px-3 pb-3 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Event history",
				bodyClassName: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num w-20 shrink-0 text-[11px] text-muted-foreground",
							children: e.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[12px]",
							children: e.text
						})]
					}, e.t))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Alerts referencing this node",
				bodyClassName: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y divide-border",
					children: [alerts.filter((a) => a.nodeCode === n.code).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 py-3 text-[12px] text-muted-foreground",
						children: "No alerts raised for this node."
					}), alerts.filter((a) => a.nodeCode === n.code).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "num text-[11px] text-muted-foreground",
							children: [
								a.id,
								" · ",
								a.severity,
								" · ",
								a.status
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[12px]",
							children: a.trigger
						})]
					}, a.id))]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-3 pb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Fusion context",
				hint: meta.title,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] leading-relaxed text-muted-foreground",
					children: meta.reasoning
				})
			})
		})
	] });
}
//#endregion
export { NodeDetail as component };
