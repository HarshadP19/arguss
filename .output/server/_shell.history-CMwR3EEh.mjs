import { i as __toESM } from "./_runtime.mjs";
import { r as NODES } from "./_ssr/nodes-D6HkLfIW.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { a as cn, c as useDemo, i as PageHeader, o as nodeStates, s as timeline } from "./_ssr/AppShell-B9CTOc9N.mjs";
import { n as Metric, r as Panel, t as DataTag } from "./_ssr/bits-D2vcYkUv.mjs";
import { c as ResponsiveContainer, i as XAxis, l as Tooltip, n as LineChart, o as Line, r as YAxis, s as CartesianGrid, u as Legend } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_shell.history-CMwR3EEh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PARAMS = [
	{
		key: "displacement",
		label: "Displacement (mm)",
		color: "oklch(0.546 0.226 264)"
	},
	{
		key: "tilt",
		label: "Tilt (°)",
		color: "oklch(0.606 0.152 149)"
	},
	{
		key: "crack",
		label: "Crack width (mm)",
		color: "oklch(0.769 0.166 70)"
	},
	{
		key: "vibration",
		label: "Vibration (g)",
		color: "oklch(0.577 0.216 27.3)"
	},
	{
		key: "anomaly",
		label: "Anomaly score",
		color: "oklch(0.7 0.02 258)"
	}
];
function History() {
	const { step, dataMode } = useDemo();
	const [range, setRange] = (0, import_react.useState)("24h");
	const [zone, setZone] = (0, import_react.useState)("All zones");
	const [param, setParam] = (0, import_react.useState)("displacement");
	const [overlay, setOverlay] = (0, import_react.useState)([
		"SG-07",
		"SG-06",
		"SG-12"
	]);
	const data = timeline(step).map((p, i) => {
		const row = { t: p.t };
		overlay.forEach((code) => {
			const scale = .35 + nodeStates(step).find((n) => n.code === code).anomaly / 70;
			row[code] = Number((p[param] * scale + i % 4 * .01).toFixed(3));
		});
		return row;
	});
	const before = nodeStates(0);
	const after = nodeStates(step);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Historical Analysis",
			subtitle: "Trend comparison across nodes, zones and parameters"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end gap-3 border-b border-border px-4 py-3",
			children: [
				[{
					label: "Date range",
					value: range,
					set: setRange,
					options: [
						"6h",
						"24h",
						"7d",
						"30d"
					]
				}, {
					label: "Zone",
					value: zone,
					set: setZone,
					options: [
						"All zones",
						"Zone A",
						"Zone B",
						"Zone C",
						"Zone D"
					]
				}].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "label-xs",
					children: f.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: f.value,
					onChange: (e) => f.set(e.target.value),
					className: "num mt-1 rounded border border-border bg-surface px-2 py-1 text-[12px]",
					children: f.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
				})] }, f.label)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "label-xs",
					children: "Parameter"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: param,
					onChange: (e) => setParam(e.target.value),
					className: "num mt-1 rounded border border-border bg-surface px-2 py-1 text-[12px]",
					children: PARAMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: p.key,
						children: p.label
					}, p.key))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-xs",
						children: "Overlay nodes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 flex flex-wrap gap-1",
						children: NODES.filter((n) => zone === "All zones" || n.zone === zone).slice(0, 12).map((n) => {
							const on = overlay.includes(n.code);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setOverlay((o) => on ? o.filter((c) => c !== n.code) : [...o, n.code]),
								className: cn("num rounded border px-1.5 py-0.5 text-[10px]", on ? "border-info/50 bg-info/12 text-info" : "border-border text-muted-foreground"),
								children: n.code
							}, n.code);
						})
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: `${PARAMS.find((p) => p.key === param).label} — ${range}`,
				hint: `${overlay.length} nodes overlaid`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data,
							margin: {
								top: 4,
								right: 12,
								left: -18,
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 11 } }),
								overlay.map((code, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: code,
									dot: false,
									strokeWidth: 1.5,
									stroke: PARAMS[i % PARAMS.length].color
								}, code))
							]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTag, { mode: dataMode })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-3 pb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Before / after comparison",
				hint: "baseline (T-90 min) vs current state",
				bodyClassName: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[760px] text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-border",
							children: [
								"Node",
								"Zone",
								"Displacement Δ",
								"Tilt X Δ",
								"Crack Δ",
								"Anomaly Δ"
							].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "label-xs px-3 py-2",
								children: h
							}, h))
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: after.filter((n) => zone === "All zones" || n.zone === zone).map((a) => {
							const b = before.find((x) => x.code === a.code);
							const d = (x, y, dp = 2) => {
								const v = x - y;
								return `${v > 0 ? "+" : ""}${v.toFixed(dp)}`;
							};
							const changed = a.anomaly - b.anomaly > 10;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: cn("border-b border-border last:border-b-0", changed && "bg-warning/5"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "num px-3 py-2 text-[12px]",
										children: a.code
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "num px-3 py-2 text-[12px] text-muted-foreground",
										children: a.zone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "num px-3 py-2 text-[12px]",
										children: [d(a.displacement, b.displacement), " mm"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "num px-3 py-2 text-[12px]",
										children: [d(a.tiltX, b.tiltX, 3), " °"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "num px-3 py-2 text-[12px]",
										children: [d(a.crackWidth, b.crackWidth), " mm"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: cn("num px-3 py-2 text-[12px]", changed && "text-warning"),
										children: d(a.anomaly, b.anomaly, 0)
									})
								]
							}, a.code);
						}) })]
					})
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 px-3 pb-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Peak anomaly (24 h)",
					value: Math.max(...after.map((n) => n.anomaly)),
					unit: "/100"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Max displacement",
					value: Math.max(...after.map((n) => n.displacement)).toFixed(2),
					unit: "mm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Max crack width",
					value: Math.max(...after.map((n) => n.crackWidth)).toFixed(2),
					unit: "mm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Nodes changed state",
					value: after.filter((n, i) => n.risk !== before[i].risk).length
				})
			]
		})
	] });
}
//#endregion
export { History as component };
