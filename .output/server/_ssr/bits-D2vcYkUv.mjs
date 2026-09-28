import { t as motion } from "../_libs/framer-motion+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as cn } from "./AppShell-B9CTOc9N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bits-D2vcYkUv.js
var import_jsx_runtime = require_jsx_runtime();
var riskLabel = {
	normal: "Normal",
	warning: "Warning",
	high: "High Risk"
};
var riskBorder = {
	normal: "border-normal/40 bg-normal/10 text-normal",
	warning: "border-warning/45 bg-warning/10 text-warning",
	high: "border-danger/50 bg-danger/12 text-danger"
};
function RiskBadge({ risk, size = "sm" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
		initial: {
			opacity: .4,
			scale: .96
		},
		animate: {
			opacity: 1,
			scale: 1
		},
		transition: { duration: .22 },
		className: cn("inline-flex items-center gap-1.5 rounded border font-semibold uppercase tracking-wider", riskBorder[risk], size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", risk === "normal" ? "bg-normal" : risk === "warning" ? "bg-warning" : "bg-danger") }), riskLabel[risk]]
	}, risk);
}
function Panel({ title, hint, actions, children, className, bodyClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("flex min-w-0 flex-col rounded-lg border border-border bg-surface", className),
		children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-3 border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-baseline gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[11px] font-semibold uppercase tracking-[0.09em] text-foreground/85",
					children: title
				}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-[10px] text-muted-foreground",
					children: hint
				})]
			}), actions]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("min-w-0 flex-1 p-3", bodyClassName),
			children
		})]
	});
}
function Metric({ label, value, unit, sub, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "label-xs",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("num mt-0.5 truncate text-sm text-foreground", tone === "normal" && "text-normal", tone === "warning" && "text-warning", tone === "danger" && "text-danger", tone === "info" && "text-info"),
				children: [value, unit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-0.5 text-[10px] text-muted-foreground",
					children: unit
				})]
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "num mt-0.5 text-[10px] text-muted-foreground",
				children: sub
			})
		]
	});
}
function StatusDot({ risk, offline }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", offline ? "bg-muted-foreground" : risk === "high" ? "bg-danger" : risk === "warning" ? "bg-warning" : "bg-normal") });
}
function DataTag({ mode }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-[10px] text-muted-foreground",
		children: ["Based on ", mode === "live" ? "live hardware data" : "simulated data"]
	});
}
//#endregion
export { StatusDot as a, RiskBadge as i, Metric as n, Panel as r, DataTag as t };
