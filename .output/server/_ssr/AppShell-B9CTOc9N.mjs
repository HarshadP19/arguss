import { i as __toESM } from "../_runtime.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion+[...].mjs";
import { a as neighboursOf, r as NODES } from "./nodes-D6HkLfIW.mjs";
import { t as supabase } from "./client-BsCRKWye.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ChevronDown, C as History, M as Brain, N as Bell, R as Activity, _ as Map, a as Terminal, b as LayoutDashboard, c as SkipBack, d as Settings, f as RotateCcw, g as Menu, i as TriangleAlert, k as ChevronUp, s as SkipForward, t as X, w as FlaskConical } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-B9CTOc9N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var EPICENTRE = "SG-07";
var COMMS_FAULT_NODE = "SG-18";
var DISTURBANCE_NODE = "SG-14";
/** deterministic 0..1 from a string */
function hash01(s, salt = 0) {
	let h = 2166136261 ^ salt;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return (h >>> 0) % 1e4 / 1e4;
}
var r2 = (v, d = 2) => Math.round(v * 10 ** d) / 10 ** d;
/** escalation weight per step for each involved node */
function escalation(code, step) {
	const joinsAt = {
		"SG-07": 1,
		"SG-06": 2,
		"SG-08": 2,
		"SG-12": 3
	}[code];
	if (!joinsAt) return 0;
	if (step < 1) return 0;
	if (code === "SG-07") return [
		0,
		.35,
		.7,
		1,
		1
	][step] ?? 0;
	if (step < joinsAt) return 0;
	return joinsAt === 2 ? step === 2 ? .45 : .75 : .6;
}
function nodeStates(step) {
	return NODES.map((n) => {
		const h = hash01(n.code);
		const h2 = hash01(n.code, 91);
		const e = escalation(n.code, step);
		const offline = n.code === COMMS_FAULT_NODE;
		const disturbance = n.code === "SG-14" && step >= 1;
		const baseTilt = .02 + h * .05;
		const tiltX = r2(baseTilt + e * 1.55, 3);
		const tiltY = r2(baseTilt * .8 + e * 1.1, 3);
		const displacement = r2(.6 + h2 * 1.1 + e * 21.5, 2);
		const crackWidth = r2(.1 + h * .4 + (step >= 3 ? e * 3.6 : e * .4), 2);
		const vibration = r2(.04 + h2 * .07 + (step >= 3 ? e * .9 : e * .12) + (disturbance ? .62 : 0), 3);
		const baselineDistance = r2(38 + h * 9, 2);
		const drift = e * .42;
		const interNodeDistance = r2(baselineDistance * (1 + drift / 100), 3);
		let anomaly = Math.round(6 + h * 8 + e * 82);
		if (disturbance) anomaly = Math.round(anomaly + 18);
		if (offline) anomaly = 0;
		anomaly = Math.min(anomaly, 97);
		const risk = offline ? "normal" : anomaly >= 72 && step >= 3 && e > 0 ? "high" : anomaly >= 45 && step >= 2 && e > 0 ? "warning" : "normal";
		return {
			code: n.code,
			zone: n.zone,
			risk,
			online: !offline,
			tiltX,
			tiltY,
			displacement,
			crackWidth,
			vibration,
			baselineDistance,
			interNodeDistance,
			driftPct: r2(drift, 3),
			battery: Math.round(78 + h * 21 - (offline ? 34 : 0)),
			signal: Math.round(-64 - h2 * 24 - (offline ? 22 : 0)),
			temperature: r2(28.5 + h * 6, 1),
			anomaly,
			nearestNeighbour: neighboursOf(n.code)[0] ?? "—",
			lastCommsSec: offline ? 372 : 2 + Math.round(h * 4)
		};
	});
}
var F = (label, met) => ({
	label,
	met
});
function stepMeta(step) {
	const common = {
		index: step,
		zoneRisk: {
			"Zone A": "normal",
			"Zone B": "normal",
			"Zone C": "normal",
			"Zone D": "normal"
		}
	};
	switch (step) {
		case 0: return {
			...common,
			title: "Baseline — all systems nominal",
			insight: "All 20 nodes reporting within surveyed baseline tolerance. No deformation signature detected across Panel 7.",
			anomalyScore: 11,
			deformationTrend: "Flat",
			spatialCorrelation: "None",
			sensorAgreement: "1 / 5 sensors",
			persistenceMinutes: 0,
			risk: "normal",
			correlatedNodes: [],
			factors: [
				F("Magnitude above baseline threshold", false),
				F("Sustained deformation trend", false),
				F("Spatial correlation across ≥3 neighbouring nodes", false),
				F("Multi-sensor agreement (tilt + displacement + crack)", false),
				F("Persistence beyond 10 minutes", false)
			],
			reasoning: "No risk escalation: every channel is inside surveyed baseline tolerance and no neighbouring node shows a correlated signature."
		};
		case 1: return {
			...common,
			title: "Sub-threshold tilt uptick near Zone B",
			insight: "SG-07 tilt has risen 0.54° above baseline but remains sub-threshold. Neighbouring nodes show no correlated movement yet.",
			anomalyScore: 34,
			deformationTrend: "Slow rise (SG-07)",
			spatialCorrelation: "1 node only",
			sensorAgreement: "2 / 5 sensors",
			persistenceMinutes: 4,
			risk: "normal",
			correlatedNodes: [EPICENTRE],
			factors: [
				F("Magnitude above baseline threshold", true),
				F("Sustained deformation trend", false),
				F("Spatial correlation across ≥3 neighbouring nodes", false),
				F("Multi-sensor agreement (tilt + displacement + crack)", false),
				F("Persistence beyond 10 minutes", false)
			],
			reasoning: "Escalation withheld: the signature is not yet spatially correlated or persistent enough, even where magnitude has risen."
		};
		case 2: return {
			...common,
			zoneRisk: {
				...common.zoneRisk,
				"Zone B": "warning"
			},
			title: "WARNING — correlated deformation, Zone B",
			insight: "Zone B escalated to WARNING: tilt and displacement rising on SG-07 with correlated movement now confirmed on SG-06 and SG-08 over 14 minutes.",
			anomalyScore: 61,
			deformationTrend: "Rising (14 min)",
			spatialCorrelation: "3 neighbouring nodes",
			sensorAgreement: "3 / 5 sensors",
			persistenceMinutes: 14,
			risk: "warning",
			correlatedNodes: [
				EPICENTRE,
				"SG-06",
				"SG-08"
			],
			factors: [
				F("Magnitude above baseline threshold", true),
				F("Sustained deformation trend", true),
				F("Spatial correlation across ≥3 neighbouring nodes", true),
				F("Multi-sensor agreement (tilt + displacement + crack)", false),
				F("Persistence beyond 10 minutes", true)
			],
			reasoning: "Escalated to WARNING: rising tilt and displacement are now spatially correlated across three neighbouring nodes and persistent for 14 minutes. Crack and vibration channels have not yet agreed, so HIGH RISK is withheld."
		};
		case 3:
		case 4: return {
			...common,
			zoneRisk: {
				...common.zoneRisk,
				"Zone B": "high"
			},
			title: step === 3 ? "HIGH RISK — multi-sensor fusion confirmed, Zone B" : "HIGH RISK acknowledged — incident open, Zone B",
			insight: step === 3 ? "Zone B at HIGH RISK: crack width and vibration now agree with tilt and displacement, and a fourth node (SG-12) has correlated. Surface subsidence probable within the Zone B footprint." : "Zone B HIGH RISK acknowledged by Safety Officer. Incident timeline open; surface exclusion recommended around SG-06 / SG-07 / SG-08 / SG-12.",
			anomalyScore: 88,
			deformationTrend: "Accelerating (27 min)",
			spatialCorrelation: "4 neighbouring nodes",
			sensorAgreement: "5 / 5 sensors",
			persistenceMinutes: 27,
			risk: "high",
			correlatedNodes: [
				EPICENTRE,
				"SG-06",
				"SG-08",
				"SG-12"
			],
			factors: [
				F("Magnitude above baseline threshold", true),
				F("Sustained deformation trend", true),
				F("Spatial correlation across ≥3 neighbouring nodes", true),
				F("Multi-sensor agreement (tilt + displacement + crack)", true),
				F("Persistence beyond 10 minutes", true)
			],
			reasoning: "Escalated to HIGH RISK: all five fusion criteria are satisfied — accelerating deformation, agreement across five sensor channels, four spatially correlated nodes, and 27 minutes of persistence."
		};
		default: return stepMeta(0);
	}
}
function alertsFor(step) {
	const out = [];
	out.push({
		id: "AL-1042",
		nodeCode: COMMS_FAULT_NODE,
		severity: "info",
		zone: "Zone D",
		trigger: "No telemetry for 6 min · classified as comms failure, not subsidence",
		anomaly: 0,
		status: "active",
		kind: "comms",
		minutesAgo: 6
	});
	if (step >= 1) out.push({
		id: "AL-1043",
		nodeCode: DISTURBANCE_NODE,
		severity: "info",
		zone: "Zone C",
		trigger: "Single-node vibration spike · uncorrelated, suppressed as surface traffic",
		anomaly: 31,
		status: "resolved",
		kind: "comms",
		minutesAgo: 18
	});
	if (step >= 2) out.push({
		id: "AL-1044",
		nodeCode: EPICENTRE,
		severity: "warning",
		zone: "Zone B",
		trigger: "Correlated tilt + displacement rise across SG-06 / SG-07 / SG-08",
		anomaly: 61,
		status: step >= 4 ? "acknowledged" : "active",
		kind: "ground",
		minutesAgo: 14
	});
	if (step >= 3) out.push({
		id: "AL-1045",
		nodeCode: EPICENTRE,
		severity: "high",
		zone: "Zone B",
		trigger: "Multi-sensor fusion confirmed · crack growth + vibration + 4-node correlation",
		anomaly: 88,
		status: step >= 4 ? "acknowledged" : "active",
		kind: "ground",
		minutesAgo: 3
	});
	return out.reverse();
}
/** deterministic 24h series; the tail bends with the demo step */
function timeline(step, points = 48) {
	const target = [
		12,
		34,
		61,
		88,
		88
	][step] ?? 12;
	return Array.from({ length: points }, (_, i) => {
		const wobble = Math.sin(i / 3.1) * 2.2 + Math.cos(i / 1.7) * 1.4;
		const ramp = i < points - 12 ? 0 : (i - (points - 13)) / 12;
		const anomaly = Math.max(4, 10 + wobble + (target - 10) * ramp ** 1.6);
		return {
			t: `${String(i * 30 / 60 | 0).padStart(2, "0")}:${i % 2 ? "30" : "00"}`,
			anomaly: r2(anomaly, 1),
			displacement: r2(1 + wobble * .1 + ramp * (target / 4), 2),
			tilt: r2(.05 + ramp * (target / 55), 3),
			crack: r2(.2 + ramp * (step >= 3 ? 3.4 : .3), 2),
			vibration: r2(.06 + ramp * (step >= 3 ? .8 : .08), 3)
		};
	});
}
var DemoContext = (0, import_react.createContext)(null);
function DemoProvider({ children }) {
	const [step, setStep] = (0, import_react.useState)(0);
	const [dataMode, setDataMode] = (0, import_react.useState)("simulated");
	const [lastSync, setLastSync] = (0, import_react.useState)("--:--:--");
	(0, import_react.useEffect)(() => {
		const tick = () => setLastSync((/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB", { hour12: false }));
		tick();
		const id = setInterval(tick, 2e3);
		return () => clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const check = async () => {
			const since = (/* @__PURE__ */ new Date(Date.now() - 3e5)).toISOString();
			const { count } = await supabase.from("sensor_readings").select("id", {
				count: "exact",
				head: true
			}).eq("is_simulated", false).gte("recorded_at", since);
			if (!cancelled) setDataMode((count ?? 0) > 0 ? "live" : "simulated");
		};
		check();
		const id = setInterval(check, 2e4);
		const channel = supabase.channel("arguss-readings").on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "sensor_readings"
		}, () => void check()).subscribe();
		return () => {
			cancelled = true;
			clearInterval(id);
			supabase.removeChannel(channel);
		};
	}, []);
	const nodes = (0, import_react.useMemo)(() => nodeStates(step), [step]);
	const value = {
		step,
		meta: (0, import_react.useMemo)(() => stepMeta(step), [step]),
		nodes,
		alerts: (0, import_react.useMemo)(() => alertsFor(step), [step]),
		series: (0, import_react.useMemo)(() => timeline(step), [step]),
		next: (0, import_react.useCallback)(() => setStep((s) => Math.min(4, s + 1)), []),
		back: (0, import_react.useCallback)(() => setStep((s) => Math.max(0, s - 1)), []),
		reset: (0, import_react.useCallback)(() => setStep(0), []),
		dataMode,
		lastSync,
		nodeByCode: (0, import_react.useCallback)((code) => nodes.find((n) => n.code === code), [nodes])
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoContext.Provider, {
		value,
		children
	});
}
function useDemo() {
	const ctx = (0, import_react.useContext)(DemoContext);
	if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
	return ctx;
}
var NAV = [
	{
		to: "/overview",
		label: "Overview",
		icon: LayoutDashboard
	},
	{
		to: "/live",
		label: "Live Monitoring",
		icon: Activity
	},
	{
		to: "/map",
		label: "Mine Map",
		icon: Map
	},
	{
		to: "/ai-risk",
		label: "AI & Risk Analysis",
		icon: Brain
	},
	{
		to: "/alerts",
		label: "Alerts & Incidents",
		icon: TriangleAlert
	},
	{
		to: "/validation",
		label: "Validation Lab",
		icon: FlaskConical
	},
	{
		to: "/history",
		label: "Historical Analysis",
		icon: History
	},
	{
		to: "/integration",
		label: "API & Hardware",
		icon: Terminal
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function Logo({ compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			className: "size-6 shrink-0",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "1",
					y: "1",
					width: "22",
					height: "22",
					rx: "4",
					fill: "oklch(0.32 0.058 250)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M12 5.5 19 18.5H5L12 5.5Z",
					fill: "none",
					stroke: "oklch(0.86 0.002 265)",
					strokeWidth: "1.6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "14.5",
					r: "2.1",
					fill: "oklch(0.606 0.152 149)"
				})
			]
		}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[15px] font-bold tracking-[0.14em] text-foreground",
			children: "ARGUSS"
		})]
	});
}
function AppShell({ children }) {
	const { dataMode, lastSync, alerts, step, meta, next, back, reset } = useDemo();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [drawer, setDrawer] = (0, import_react.useState)(false);
	const [barOpen, setBarOpen] = (0, import_react.useState)(true);
	const activeAlerts = alerts.filter((a) => a.status === "active").length;
	const nav = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-0.5 p-2",
		children: NAV.map(({ to, label, icon: Icon }) => {
			const active = pathname === to || pathname.startsWith(`${to}/`);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				onClick: () => setDrawer(false),
				className: cn("flex items-center gap-2.5 rounded border border-transparent px-2.5 py-2 text-[13px] transition-colors", active ? "border-border-strong bg-surface-raised font-semibold text-foreground" : "text-muted-foreground hover:bg-surface-raised hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-4 shrink-0",
					strokeWidth: 1.9
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: label
				})]
			}, to);
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "fixed inset-x-0 top-0 z-30 flex h-12 items-center gap-3 border-b border-border bg-surface px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "lg:hidden",
						onClick: () => setDrawer(true),
						"aria-label": "Open navigation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/overview",
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden h-6 items-center gap-2 rounded border border-border bg-surface-raised px-2 md:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-xs",
								children: "Site"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[12px] font-medium",
								children: "Jharia Coalfield — Panel 7"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5 text-muted-foreground" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("num rounded border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]", dataMode === "live" ? "border-info/50 bg-info/12 text-info" : "border-warning/50 bg-warning/12 text-warning"),
								children: dataMode === "live" ? "● Live Hardware Data" : "● Simulated Data"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden items-baseline gap-1.5 sm:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-xs",
									children: "Last sync"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-[11px]",
									children: lastSync
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/alerts",
								className: "relative",
								"aria-label": "Alerts",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4 text-muted-foreground" }), activeAlerts > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num absolute -right-1.5 -top-1.5 rounded-full bg-danger px-1 text-[9px] font-semibold text-white",
									children: activeAlerts
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border-l border-border pl-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-7 items-center justify-center rounded border border-border bg-surface-raised text-[10px] font-semibold",
									children: "SO"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden leading-tight sm:block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-medium",
										children: "Demo Operator"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-muted-foreground",
										children: "Safety Officer"
									})]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed left-0 top-12 z-20 hidden h-[calc(100vh-3rem)] w-56 flex-col border-r border-border bg-surface lg:flex",
				children: [nav, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto border-t border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-xs",
						children: "Prototype Environment"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "num mt-1 text-[10px] text-muted-foreground",
						children: "SIH 2026 · SIH26025"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: drawer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-40 bg-black/60 lg:hidden",
				onClick: () => setDrawer(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
					initial: { x: -260 },
					animate: { x: 0 },
					exit: { x: -260 },
					transition: { duration: .18 },
					className: "h-full w-60 border-r border-border bg-surface",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDrawer(false),
							"aria-label": "Close navigation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}), nav]
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-w-0 pb-24 pl-0 pt-12 lg:pl-56",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-warning/40 bg-[oklch(0.24_0.03_70)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num rounded border border-warning/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-warning",
							children: "Demo Controls"
						}),
						barOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: back,
										disabled: step === 0,
										className: "flex items-center gap-1 rounded border border-border-strong bg-surface px-2 py-1 text-[11px] font-medium disabled:opacity-40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { className: "size-3.5" }), " Back"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: next,
										disabled: step === 4,
										className: "flex items-center gap-1 rounded border border-info/50 bg-info/15 px-2.5 py-1 text-[11px] font-semibold text-info disabled:opacity-40",
										children: ["Next Step ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "size-3.5" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: reset,
										className: "flex items-center gap-1 rounded border border-border-strong bg-surface px-2 py-1 text-[11px] font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Reset"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "num shrink-0 text-[11px] text-warning/90",
								children: [
									"Step ",
									step,
									" / ",
									4
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden min-w-0 truncate text-[11px] text-foreground/80 sm:block",
								children: meta.title
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setBarOpen((v) => !v),
							className: "ml-auto flex items-center gap-1 text-[11px] text-warning/80",
							children: [barOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-3.5" }), barOpen ? "Collapse" : "Expand"]
						})
					]
				})
			})
		]
	});
}
function PageHeader({ title, subtitle, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-end justify-between gap-3 border-b border-border px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-[17px] font-semibold tracking-tight",
			children: title
		}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-[12px] text-muted-foreground",
			children: subtitle
		})] }), right]
	});
}
//#endregion
export { cn as a, useDemo as c, PageHeader as i, DemoProvider as n, nodeStates as o, Logo as r, timeline as s, AppShell as t };
