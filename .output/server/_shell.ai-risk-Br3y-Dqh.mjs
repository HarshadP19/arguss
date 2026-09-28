import { t as motion } from "./_libs/framer-motion+[...].mjs";
import { r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { I as ArrowRight, S as Info, j as Check, t as X } from "./_libs/lucide-react.mjs";
import { a as cn, c as useDemo, i as PageHeader } from "./_ssr/AppShell-B9CTOc9N.mjs";
import { i as RiskBadge, n as Metric, r as Panel, t as DataTag } from "./_ssr/bits-D2vcYkUv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_shell.ai-risk-Br3y-Dqh.js
var import_jsx_runtime = require_jsx_runtime();
var PIPELINE = [
	{
		label: "Sensor Data",
		detail: "20 nodes · 2 s"
	},
	{
		label: "Feature Engineering",
		detail: "rate, drift, ratio"
	},
	{
		label: "Anomaly Detection",
		detail: "Isolation Forest"
	},
	{
		label: "Temporal + Spatial Correlation",
		detail: "mesh neighbours"
	},
	{
		label: "Multi-Sensor Fusion",
		detail: "5 channels"
	},
	{
		label: "Risk Classification",
		detail: "Normal / Warning / High"
	}
];
function AiRisk() {
	const { meta, dataMode, nodes } = useDemo();
	const gauge = meta.anomalyScore;
	const tone = gauge > 70 ? "danger" : gauge > 44 ? "warning" : "normal";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "AI & Risk Analysis",
			subtitle: meta.title,
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, {
				risk: meta.risk,
				size: "lg"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Risk engine pipeline",
				hint: "every stage runs on each 2 s frame",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: PIPELINE.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("rounded border px-2.5 py-1.5", i === 2 || i === 4 ? "border-info/50 bg-info/10" : "border-border bg-surface-raised"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-semibold",
								children: p.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "num text-[10px] text-muted-foreground",
								children: p.detail
							})]
						}), i < PIPELINE.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 text-muted-foreground" })]
					}, p.label))
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 px-3 lg:grid-cols-[1fr_1.35fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Fused anomaly score",
				hint: "0–100",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative size-28 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 100 100",
							className: "size-full -rotate-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "50",
								cy: "50",
								r: "42",
								fill: "none",
								stroke: "oklch(0.288 0.009 265)",
								strokeWidth: "9"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
								cx: "50",
								cy: "50",
								r: "42",
								fill: "none",
								strokeWidth: "9",
								strokeLinecap: "round",
								stroke: tone === "danger" ? "oklch(0.577 0.216 27.3)" : tone === "warning" ? "oklch(0.769 0.166 70)" : "oklch(0.606 0.152 149)",
								strokeDasharray: 264,
								animate: { strokeDashoffset: 264 - 264 * gauge / 100 },
								transition: { duration: .45 }
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 flex flex-col items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num text-2xl",
								children: gauge
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-xs",
								children: "score"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid flex-1 grid-cols-2 gap-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Deformation trend",
								value: meta.deformationTrend
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Spatial correlation",
								value: meta.spatialCorrelation
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Sensor agreement",
								value: meta.sensorAgreement
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Persistence",
								value: meta.persistenceMinutes,
								unit: "min"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 border-t border-border pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-xs",
						children: "Correlated nodes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "num mt-1 flex flex-wrap gap-1.5 text-[11px]",
						children: [meta.correlatedNodes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "none"
						}), meta.correlatedNodes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded border border-border-strong bg-surface-raised px-1.5 py-0.5",
							children: c
						}, c))]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Why this risk level?",
				hint: "fusion criteria audit",
				className: "border-info/40",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { risk: meta.risk }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border",
						children: meta.factors.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2.5 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex size-4 shrink-0 items-center justify-center rounded border", f.met ? "border-normal/50 bg-normal/15 text-normal" : "border-border text-muted-foreground"),
								children: f.met ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-3",
									strokeWidth: 3
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									className: "size-3",
									strokeWidth: 3
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-[12.5px]", f.met ? "text-foreground" : "text-muted-foreground"),
								children: f.label
							})]
						}, f.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 rounded border border-info/40 bg-info/8 p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								className: "mt-0.5 size-4 shrink-0 text-info",
								strokeWidth: 2
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12.5px] leading-relaxed",
								children: meta.reasoning
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTag, { mode: dataMode })
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 p-3 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Model info",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Model",
								value: "Isolation Forest",
								sub: "unsupervised"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Contamination",
								value: "0.04"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Estimators",
								value: "200"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Window",
								value: "30",
								unit: "min"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-border pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-xs",
							children: "Input features"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num mt-1 text-[11px] leading-relaxed text-muted-foreground",
							children: "tilt_x · tilt_y · tilt_rate · displacement · displacement_rate · crack_width · crack_growth · vibration_rms · inter_node_distance_drift · neighbour_correlation · persistence_minutes · battery_pct · signal_strength"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 rounded border border-warning/40 bg-warning/8 p-2.5 text-[11.5px] leading-relaxed text-warning",
						children: "Prototype Model — trained on synthetic + open subsidence datasets. Not trained on real proprietary mine data."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Per-node anomaly ranking",
				hint: "top 8 by fused score",
				bodyClassName: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: [...nodes].sort((a, b) => b.anomaly - a.anomaly).slice(0, 8).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 px-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num w-14 text-[12px]",
								children: n.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 flex-1 overflow-hidden rounded bg-surface-raised",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									animate: { width: `${n.anomaly}%` },
									transition: { duration: .35 },
									className: cn("h-full", n.anomaly > 70 ? "bg-danger" : n.anomaly > 44 ? "bg-warning" : "bg-normal")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num w-10 text-right text-[11px]",
								children: n.anomaly
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { risk: n.risk })
						]
					}, n.code))
				})
			})]
		})
	] });
}
//#endregion
export { AiRisk as component };
