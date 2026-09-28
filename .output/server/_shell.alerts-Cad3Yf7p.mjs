import { i as __toESM } from "./_runtime.mjs";
import { n as AnimatePresence, t as motion } from "./_libs/framer-motion+[...].mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { O as CircleSlash, j as Check, p as Radio, v as MapPin } from "./_libs/lucide-react.mjs";
import { a as cn, c as useDemo, i as PageHeader } from "./_ssr/AppShell-B9CTOc9N.mjs";
import { r as Panel } from "./_ssr/bits-D2vcYkUv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_shell.alerts-Cad3Yf7p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Alerts() {
	const { alerts, step, meta } = useDemo();
	const [overrides, setOverrides] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => setOverrides({}), [step]);
	const rows = (0, import_react.useMemo)(() => alerts.map((a) => ({
		...a,
		status: overrides[a.id] ?? a.status
	})), [alerts, overrides]);
	const timeline = [
		{
			t: "T-27 min",
			text: "Fusion engine flagged correlated deformation on SG-06 / SG-07 / SG-08",
			show: step >= 2
		},
		{
			t: "T-14 min",
			text: "WARNING alert AL-1044 raised for Zone B",
			show: step >= 2
		},
		{
			t: "T-03 min",
			text: "HIGH RISK alert AL-1045 raised — 4-node correlation, 5/5 sensor agreement",
			show: step >= 3
		},
		{
			t: "T-00 min",
			text: "Alerts acknowledged by Safety Officer · incident opened · surface exclusion advised",
			show: step >= 4
		}
	].filter((e) => e.show);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Alerts & Incidents",
			subtitle: `${rows.filter((r) => r.status === "active").length} active · ${rows.length} in queue · ${meta.title}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Alert queue",
				bodyClassName: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[900px] text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-border",
							children: [
								"Severity",
								"Zone",
								"Node(s)",
								"Timestamp",
								"Trigger",
								"Anomaly",
								"Status",
								"Actions"
							].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "label-xs px-3 py-2",
								children: h
							}, h))
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							initial: false,
							children: rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
								initial: {
									opacity: 0,
									y: -6
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: { opacity: 0 },
								className: "border-b border-border align-top last:border-b-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("num rounded border px-1.5 py-0.5 text-[9px] font-semibold uppercase", a.severity === "high" ? "border-danger/50 bg-danger/12 text-danger" : a.severity === "warning" ? "border-warning/50 bg-warning/12 text-warning" : "border-info/50 bg-info/12 text-info"),
											children: a.severity
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "num px-3 py-2.5 text-[12px]",
										children: a.zone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "num px-3 py-2.5 text-[12px]",
										children: a.nodeCode
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "num px-3 py-2.5 text-[11px] text-muted-foreground",
										children: [
											"T-",
											String(a.minutesAgo).padStart(2, "0"),
											" min"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "max-w-[340px] px-3 py-2.5 text-[12px]",
										children: [a.trigger, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 flex items-center gap-1.5",
											children: a.kind === "comms" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 text-[10px] text-info",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3" }), " classified as comms failure, not subsidence"]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 text-[10px] text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }), " ground anomaly · spatially correlated"]
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "num px-3 py-2.5 text-[12px]",
										children: a.anomaly || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "num px-3 py-2.5 text-[11px] capitalize",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn(a.status === "active" ? "text-danger" : a.status === "acknowledged" ? "text-warning" : "text-normal"),
											children: a.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													disabled: a.status !== "active",
													onClick: () => setOverrides((o) => ({
														...o,
														[a.id]: "acknowledged"
													})),
													className: "flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] disabled:opacity-40",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Acknowledge"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													disabled: a.status === "resolved",
													onClick: () => setOverrides((o) => ({
														...o,
														[a.id]: "resolved"
													})),
													className: "flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] disabled:opacity-40",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleSlash, { className: "size-3" }), " Resolve"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/map",
													className: "rounded border border-info/40 bg-info/10 px-1.5 py-0.5 text-[10px] text-info",
													children: "View on map"
												})
											]
										})
									})
								]
							}, a.id))
						}) })]
					})
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 px-3 pb-3 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Incident timeline",
				hint: "Zone B subsidence event",
				bodyClassName: "p-0",
				children: [timeline.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-3 py-3 text-[12px] text-muted-foreground",
					children: "No open incident. Baseline conditions."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: timeline.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 px-3 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num w-20 shrink-0 text-[11px] text-muted-foreground",
							children: e.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[12px]",
							children: e.text
						})]
					}, e.t))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Fault vs ground anomaly",
				hint: "PS requirement",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[12.5px] leading-relaxed text-muted-foreground",
					children: [
						"A missing node and a moving node look identical to a threshold alarm. ARGUSS separates them: loss of telemetry, flat-lined channels, battery collapse and RSSI drop-out are routed to a",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-info",
							children: "comms failure"
						}),
						" class, which never contributes to ground-risk escalation. Only spatially correlated, multi-channel, persistent deformation can raise a subsidence alert."
					]
				})
			})]
		})
	] });
}
//#endregion
export { Alerts as component };
