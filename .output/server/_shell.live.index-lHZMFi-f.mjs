import { i as __toESM } from "./_runtime.mjs";
import { o as nodeByCode } from "./_ssr/nodes-D6HkLfIW.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { P as Battery, l as Signal, m as OctagonAlert, v as MapPin } from "./_libs/lucide-react.mjs";
import { a as cn, c as useDemo, i as PageHeader } from "./_ssr/AppShell-B9CTOc9N.mjs";
import { i as RiskBadge, n as Metric, r as Panel } from "./_ssr/bits-D2vcYkUv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_shell.live.index-lHZMFi-f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LiveMonitoring() {
	const { nodes } = useDemo();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const shown = filter === "all" ? nodes : nodes.filter((n) => n.risk !== "normal" || !n.online);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Live Monitoring",
		subtitle: "SG-01 → SG-20 · 2 s sampling · values shown against surveyed baseline",
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex rounded border border-border",
			children: ["all", "attention"].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setFilter(f),
				className: cn("px-2.5 py-1 text-[11px] capitalize", filter === f ? "bg-surface-raised font-semibold" : "text-muted-foreground"),
				children: f === "all" ? "All nodes" : "Needs attention"
			}, f))
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 p-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
		children: shown.map((n) => {
			const def = nodeByCode(n.code);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/live/$nodeCode",
				params: { nodeCode: n.code },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: cn("h-full transition-colors hover:border-border-strong", n.risk === "warning" && "border-warning/40", n.risk === "high" && "border-danger/50", !n.online && "opacity-80"),
					title: n.code,
					hint: `${n.zone} · ${def.positionType === "fixed_surveyed" ? "Fixed" : "GPS"}`,
					actions: n.online ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { risk: n.risk }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num rounded border border-border px-1.5 py-0.5 text-[9px] uppercase text-muted-foreground",
						children: "Offline"
					}),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-y-2.5",
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
									label: "Displ.",
									value: n.displacement.toFixed(2),
									unit: "mm",
									tone: n.displacement > 8 ? "danger" : n.displacement > 3 ? "warning" : void 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Crack",
									value: n.crackWidth.toFixed(2),
									unit: "mm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Vibration",
									value: n.vibration.toFixed(3),
									unit: "g"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Anomaly",
									value: n.anomaly,
									unit: "/100",
									tone: n.anomaly > 70 ? "danger" : n.anomaly > 44 ? "warning" : void 0
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 border-t border-border pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "label-xs",
								children: ["Inter-node distance → ", n.nearestNeighbour]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "num mt-1 flex items-baseline gap-2 text-[12px]",
								children: [
									n.interNodeDistance.toFixed(3),
									" m",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-muted-foreground",
										children: [
											"base ",
											n.baselineDistance.toFixed(2),
											" m"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("text-[10px]", n.driftPct > .2 ? "text-danger" : n.driftPct > 0 ? "text-warning" : "text-muted-foreground"),
										children: [
											"drift ",
											n.driftPct > 0 ? "+" : "",
											n.driftPct.toFixed(3),
											"%"
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "num mt-2 flex items-center gap-3 border-t border-border pt-2 text-[10px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "size-3.5" }),
										" ",
										n.battery,
										"%"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, { className: "size-3.5" }),
										" ",
										n.signal,
										" dBm"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
										" ",
										def.lat.toFixed(4),
										", ",
										def.lon.toFixed(4)
									]
								}),
								!n.online && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-auto flex items-center gap-1 text-info",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, { className: "size-3.5" }), " comms fault"]
								})
							]
						})
					]
				})
			}, n.code);
		})
	})] });
}
//#endregion
export { LiveMonitoring as component };
