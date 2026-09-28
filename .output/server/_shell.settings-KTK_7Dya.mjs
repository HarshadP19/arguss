import { r as NODES } from "./_ssr/nodes-D6HkLfIW.mjs";
import { r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { r as UserCog, u as ShieldCheck, y as Lock } from "./_libs/lucide-react.mjs";
import { a as cn, i as PageHeader } from "./_ssr/AppShell-B9CTOc9N.mjs";
import { r as Panel } from "./_ssr/bits-D2vcYkUv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_shell.settings-KTK_7Dya.js
var import_jsx_runtime = require_jsx_runtime();
var ROLES = [
	{
		name: "Admin",
		scope: "Full platform control",
		caps: [
			"Commission / decommission nodes",
			"Set baselines and thresholds",
			"Manage users and gateway keys"
		]
	},
	{
		name: "Safety Officer",
		scope: "Operational response",
		caps: [
			"Acknowledge and resolve alerts",
			"Annotate incidents",
			"Export validation and shift reports"
		],
		active: true
	},
	{
		name: "Viewer",
		scope: "Read-only",
		caps: [
			"View dashboards, map and history",
			"No acknowledge, no configuration",
			"No data export"
		]
	}
];
var CAL_DATES = [
	"2026-08-04",
	"2026-08-04",
	"2026-08-05",
	"2026-08-05",
	"2026-08-06"
];
function calibration(index) {
	const pending = index === 13 || index === 17;
	return {
		date: pending ? "—" : CAL_DATES[index % CAL_DATES.length],
		tilt: pending ? "—" : (.02 + index * 7 % 11 * .004).toFixed(3),
		disp: pending ? "—" : (.1 + index * 5 % 9 * .05).toFixed(2),
		vib: pending ? "—" : (.004 + index * 3 % 7 * .001).toFixed(3),
		pending
	};
}
function Settings() {
	const pendingCount = NODES.filter((_, i) => calibration(i).pending).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Settings",
		subtitle: "Access model, security posture and baseline calibration register",
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "num rounded border border-border px-2 py-0.5 text-[10px] text-muted-foreground",
			children: "PROTOTYPE STUB"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 px-4 pb-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Role-based access",
				hint: "Displayed model — enforcement not wired in this prototype",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("rounded border bg-background px-2.5 py-2", r.active ? "border-info/50" : "border-border"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5 text-xs font-semibold text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCog, { className: "size-3.5 text-muted-foreground" }), r.name]
							}), r.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num rounded border border-info/50 bg-info/10 px-1.5 py-0.5 text-[10px] text-info",
								children: "CURRENT SESSION"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-xs",
								children: r.scope
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1.5 space-y-1 text-[11px] text-muted-foreground",
							children: r.caps.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" }), c]
							}, c))
						})]
					}, r.name))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Security",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: [
						[
							"Transport",
							"TLS-encrypted (Supabase managed)",
							ShieldCheck
						],
						[
							"Data access",
							"Row-level security — public read, writes service-role only",
							Lock
						],
						[
							"Gateway auth",
							"Shared ingest key, held server-side, never exposed to the browser",
							Lock
						]
					].map(([label, value, Icon]) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2 rounded border border-border bg-background px-2.5 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 size-3.5 shrink-0 text-normal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-xs",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-xs text-foreground/90",
									children: value
								})]
							})]
						}, label);
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Node commissioning & baseline calibration",
			hint: `20 nodes · ${20 - pendingCount} calibrated · ${pendingCount} pending`,
			bodyClassName: "p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[640px] overflow-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[620px] text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "sticky top-0 bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "label-xs px-3 py-2",
									children: "Node ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "label-xs px-3 py-2",
									children: "Zone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "label-xs px-3 py-2",
									children: "Calibration date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "label-xs px-3 py-2",
									children: "Baseline tilt (°)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "label-xs px-3 py-2",
									children: "Baseline disp. (mm)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "label-xs px-3 py-2",
									children: "Baseline vib. (g)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "label-xs px-3 py-2",
									children: "Status"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: NODES.map((n, i) => {
						const c = calibration(i);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/60 last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "num px-3 py-2 text-foreground",
									children: n.code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-muted-foreground",
									children: n.zone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "num px-3 py-2 text-muted-foreground",
									children: c.date
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "num px-3 py-2 text-muted-foreground",
									children: c.tilt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "num px-3 py-2 text-muted-foreground",
									children: c.disp
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "num px-3 py-2 text-muted-foreground",
									children: c.vib
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("num rounded border px-1.5 py-0.5 text-[10px]", c.pending ? "border-warning/50 bg-warning/10 text-warning" : "border-normal/40 bg-normal/10 text-normal"),
										children: c.pending ? "PENDING" : "CALIBRATED"
									})
								})
							]
						}, n.code);
					}) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border px-3 py-2 text-[11px] leading-relaxed text-muted-foreground",
				children: "Baselines follow the documented “Set the Baseline” step: 30 minutes of quiet-period samples per node are averaged after installation, and every later reading is interpreted as drift from that reference — not as an absolute value."
			})]
		})]
	})] });
}
//#endregion
export { Settings as component };
