import { t as motion } from "./_libs/framer-motion+[...].mjs";
import { r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as Cpu, F as BatteryMedium, l as Signal, o as Sparkles, p as Radio } from "./_libs/lucide-react.mjs";
import { a as cn, c as useDemo, i as PageHeader } from "./_ssr/AppShell-B9CTOc9N.mjs";
import { a as StatusDot, i as RiskBadge, r as Panel, t as DataTag } from "./_ssr/bits-D2vcYkUv.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, r as YAxis, s as CartesianGrid, t as AreaChart } from "./_libs/recharts+[...].mjs";
import { t as MineMap } from "./_ssr/MineMap-ByzmV7Zb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_shell.overview-FxMLkY7D.js
var import_jsx_runtime = require_jsx_runtime();
function Overview() {
	const { nodes, alerts, meta, series, dataMode, lastSync } = useDemo();
	const navigate = useNavigate();
	const online = nodes.filter((n) => n.online).length;
	const warn = nodes.filter((n) => n.risk === "warning").length;
	const high = nodes.filter((n) => n.risk === "high").length;
	const active = alerts.filter((a) => a.status === "active").length;
	const normal = nodes.length - warn - high;
	const kpis = [
		{
			label: "Total Nodes",
			value: nodes.length,
			to: "/live",
			tone: ""
		},
		{
			label: "Online Nodes",
			value: `${online}/${nodes.length}`,
			to: "/live",
			tone: online < nodes.length ? "text-warning" : "text-normal"
		},
		{
			label: "Warning Zones",
			value: warn,
			to: "/map",
			tone: warn ? "text-warning" : ""
		},
		{
			label: "High-Risk Zones",
			value: high,
			to: "/map",
			tone: high ? "text-danger" : ""
		},
		{
			label: "Active Alerts",
			value: active,
			to: "/alerts",
			tone: active ? "text-danger" : ""
		},
		{
			label: "Last Sync",
			value: lastSync,
			to: "/live",
			tone: ""
		}
	];
	const summary = [
		{
			label: "Normal",
			count: normal,
			cls: "bg-normal"
		},
		{
			label: "Warning",
			count: warn,
			cls: "bg-warning"
		},
		{
			label: "High Risk",
			count: high,
			cls: "bg-danger"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Overview",
			subtitle: "Jharia Coalfield — Panel 7 · 20-node LoRa mesh · 2 s sampling interval",
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, {
				risk: meta.risk,
				size: "lg"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 border-b border-border sm:grid-cols-3 lg:grid-cols-6",
			children: kpis.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: k.to,
				className: "border-b border-r border-border px-4 py-3 transition-colors last:border-r-0 hover:bg-surface-raised",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "label-xs",
					children: k.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("num mt-1 text-xl", k.tone),
					children: k.value
				})]
			}, k.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 p-3 lg:grid-cols-[3fr_2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Live Mine Risk Map",
				hint: "Mesh topology · click a node for detail",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/map",
					className: "text-[10px] text-info hover:underline",
					children: "Open full map →"
				}),
				bodyClassName: "p-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[360px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MineMap, {
						compact: true,
						onSelect: (code) => code.startsWith("SG-") && navigate({
							to: "/live/$nodeCode",
							params: { nodeCode: code }
						})
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Current Risk Summary",
					hint: `${nodes.length} nodes assessed`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-3 w-full overflow-hidden rounded border border-border",
							children: summary.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								layout: true,
								transition: { duration: .3 },
								className: s.cls,
								style: { width: `${s.count / nodes.length * 100}%` }
							}, s.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 divide-y divide-border",
							children: summary.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2 text-[12px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", s.cls) }),
										" ",
										s.label
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "num text-[13px]",
									children: [s.count, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-1 text-[10px] text-muted-foreground",
										children: [Math.round(s.count / nodes.length * 100), "%"]
									})]
								})]
							}, s.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-4 gap-2 border-t border-border pt-2",
							children: Object.entries(meta.zoneRisk).map(([zone, risk]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded border border-border px-1.5 py-1.5 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "num text-[10px] text-muted-foreground",
									children: zone.replace("Zone ", "")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 flex justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { risk })
								})]
							}, zone))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "AI Insight",
					hint: meta.title,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							className: "mt-0.5 size-4 shrink-0 text-info",
							strokeWidth: 1.9
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13px] leading-relaxed",
							children: meta.insight
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTag, { mode: dataMode }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ai-risk",
								className: "text-[10px] text-info hover:underline",
								children: "Why this risk level? →"
							})]
						})] })]
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 px-3 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Recent Alerts",
				hint: `${active} active`,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/alerts",
					className: "text-[10px] text-info hover:underline",
					children: "All alerts →"
				}),
				bodyClassName: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: alerts.slice(0, 4).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2.5 px-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("num mt-0.5 rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase", a.severity === "high" ? "border-danger/50 bg-danger/12 text-danger" : a.severity === "warning" ? "border-warning/50 bg-warning/12 text-warning" : "border-info/50 bg-info/12 text-info"),
								children: a.severity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "num text-[11px]",
									children: [
										a.nodeCode,
										" · ",
										a.zone,
										" · ",
										a.minutesAgo,
										"m ago"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 truncate text-[12px] text-muted-foreground",
									children: a.trigger
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num ml-auto text-[10px] text-muted-foreground",
								children: a.status
							})
						]
					}, a.id))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "System Health",
				hint: "Mesh · power · uplink",
				bodyClassName: "p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 divide-x divide-y divide-border",
					children: [
						{
							icon: Radio,
							label: "Mesh links up",
							value: `${94 - (nodes.length - online) * 3}%`
						},
						{
							icon: Signal,
							label: "Mean RSSI",
							value: `${Math.round(nodes.reduce((s, n) => s + n.signal, 0) / nodes.length)} dBm`
						},
						{
							icon: BatteryMedium,
							label: "Min battery",
							value: `${Math.min(...nodes.map((n) => n.battery))}%`
						},
						{
							icon: Cpu,
							label: "Gateway uplink",
							value: "GW-01 · OK"
						}
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, {
							className: "size-4 shrink-0 text-muted-foreground",
							strokeWidth: 1.9
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-xs",
							children: r.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "num mt-0.5 text-[13px]",
							children: r.value
						})] })]
					}, r.label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border px-3 py-2 text-[11px] text-muted-foreground",
					children: [
						"SG-18 has not reported for 6 min —",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-info",
							children: "classified as comms failure, not subsidence."
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Risk Timeline — last 24 h",
				hint: "Fused anomaly score (0–100)",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-48",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: series,
							margin: {
								top: 4,
								right: 8,
								left: -18,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "anomalyFill",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "oklch(0.546 0.226 264)",
										stopOpacity: .5
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "oklch(0.546 0.226 264)",
										stopOpacity: .02
									})]
								}) }),
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									domain: [0, 100],
									tick: {
										fontSize: 10,
										fill: "oklch(0.62 0.017 258)"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "oklch(0.208 0.008 265)",
									border: "1px solid oklch(0.288 0.009 265)",
									borderRadius: 8,
									fontSize: 11
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "anomaly",
									stroke: "oklch(0.546 0.226 264)",
									strokeWidth: 1.6,
									fill: "url(#anomalyFill)"
								})
							]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTag, { mode: dataMode })
				})]
			})
		})
	] });
}
//#endregion
export { Overview as component };
