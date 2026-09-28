import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as ArrowRight, h as Network, n as Waypoints, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { r as Logo } from "./AppShell-B9CTOc9N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DnfrkxEk.js
var import_jsx_runtime = require_jsx_runtime();
var BULLETS = [
	{
		icon: Network,
		title: "Self-healing LoRa mesh",
		body: "20 surface nodes relay tilt, displacement, crack and vibration telemetry node-to-node — no cellular dependency underground-adjacent."
	},
	{
		icon: Waypoints,
		title: "Spatially correlated AI fusion",
		body: "No single sensor can raise an alarm. Risk escalates only when neighbouring nodes, multiple channels and time all agree."
	},
	{
		icon: ShieldCheck,
		title: "Explainable early warning",
		body: "Every risk level carries its reasoning — including why an escalation was deliberately withheld."
	}
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen grid-cols-1 lg:grid-cols-[1.15fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col justify-between border-b border-border bg-surface px-8 py-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-10 max-w-xl text-3xl font-semibold leading-tight tracking-tight lg:text-[38px]",
					children: "Adaptive Remote Ground Subsidence Surveillance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "num mt-3 text-[13px] uppercase tracking-[0.18em] text-muted-foreground",
					children: "Sense the Ground · Predict the Risk · Protect the Surface"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-10 max-w-xl space-y-5",
					children: BULLETS.map(({ icon: Icon, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 border-t border-border pt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "mt-0.5 size-4 shrink-0 text-info",
							strokeWidth: 1.9
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[13px] font-semibold",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[13px] leading-relaxed text-muted-foreground",
							children: body
						})] })]
					}, title))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "num mt-10 text-[11px] text-muted-foreground",
				children: "Prototype Environment · SIH 2026 · SIH26025 · Team HackTech Elites"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center px-8 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[15px] font-semibold",
						children: "Sign in to the monitoring console"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[12px] text-muted-foreground",
						children: "Credential sign-in is disabled in this prototype environment."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "label-xs",
								htmlFor: "email",
								children: "Operator email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "email",
								disabled: true,
								placeholder: "operator@arguss.in",
								className: "num mt-1.5 w-full rounded border border-border bg-surface px-3 py-2 text-[13px] text-muted-foreground"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "label-xs",
								htmlFor: "password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "password",
								type: "password",
								disabled: true,
								placeholder: "••••••••",
								className: "num mt-1.5 w-full rounded border border-border bg-surface px-3 py-2 text-[13px]"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: true,
								className: "w-full rounded border border-border bg-surface px-3 py-2 text-[13px] text-muted-foreground",
								children: "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-6 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-xs",
								children: "or"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/overview",
						className: "flex w-full items-center justify-center gap-2 rounded border border-info/60 bg-info/15 px-3 py-2.5 text-[13px] font-semibold text-info transition-colors hover:bg-info/25",
						children: ["Enter Demo Mode ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[11px] leading-relaxed text-muted-foreground",
						children: "Loads the seeded Jharia Coalfield — Panel 7 site with the full 20-node mesh and the scripted demo sequence. No setup required."
					})
				]
			})
		})]
	});
}
//#endregion
export { Landing as component };
