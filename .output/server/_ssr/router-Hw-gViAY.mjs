import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, n as QueryClientProvider, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$14 } from "../_shell.live._nodeCode-D_grJwlW.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Hw-gViAY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-wU4_0jmE.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ARGUSS — Mine Subsidence Surveillance" },
			{
				name: "description",
				content: "ARGUSS: AI-enabled real-time ground subsidence monitoring over underground coal mine panels using a LoRa sensor mesh."
			},
			{
				name: "author",
				content: "Team HackTech Elites"
			},
			{
				property: "og:title",
				content: "ARGUSS — Mine Subsidence Surveillance"
			},
			{
				property: "og:description",
				content: "Sense the Ground. Predict the Risk. Protect the Surface."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$11 = () => import("./routes-DnfrkxEk.mjs");
var Route$12 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "ARGUSS — Adaptive Remote Ground Subsidence Surveillance" },
		{
			name: "description",
			content: "ARGUSS monitors ground subsidence above underground coal mine panels in real time with a LoRa sensor mesh and an explainable AI risk engine."
		},
		{
			property: "og:title",
			content: "ARGUSS — Ground Subsidence Surveillance"
		},
		{
			property: "og:description",
			content: "Sense the Ground. Predict the Risk. Protect the Surface. SIH 2026 · SIH26025."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("../_shell-B1-Keyi-.mjs");
var Route$11 = createFileRoute("/_shell")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("../_shell.ai-risk-Br3y-Dqh.mjs");
var Route$10 = createFileRoute("/_shell/ai-risk")({
	head: () => ({ meta: [
		{ title: "AI & Risk Analysis — ARGUSS" },
		{
			name: "description",
			content: "The ARGUSS risk engine: Isolation Forest anomaly detection, spatial and temporal correlation, multi-sensor fusion and explainable risk classification."
		},
		{
			property: "og:title",
			content: "AI & Risk Analysis — ARGUSS"
		},
		{
			property: "og:description",
			content: "Explainable subsidence risk classification with a full reasoning trail."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_shell.alerts-Cad3Yf7p.mjs");
var Route$9 = createFileRoute("/_shell/alerts")({
	head: () => ({ meta: [
		{ title: "Alerts & Incidents — ARGUSS" },
		{
			name: "description",
			content: "Subsidence alert queue with acknowledge and resolve actions, and explicit separation of comms/sensor faults from genuine ground anomalies."
		},
		{
			property: "og:title",
			content: "Alerts & Incidents — ARGUSS"
		},
		{
			property: "og:description",
			content: "Alert queue with ground anomaly vs sensor fault classification."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_shell.history-CMwR3EEh.mjs");
var Route$8 = createFileRoute("/_shell/history")({
	head: () => ({ meta: [
		{ title: "Historical Analysis — ARGUSS" },
		{
			name: "description",
			content: "Compare displacement, tilt, crack growth, vibration and anomaly-score history across ARGUSS nodes and zones, with before/after comparison."
		},
		{
			property: "og:title",
			content: "Historical Analysis — ARGUSS"
		},
		{
			property: "og:description",
			content: "Trend history and before/after comparison across nodes and zones."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_shell.integration-D26ft9W7.mjs");
var Route$7 = createFileRoute("/_shell/integration")({
	head: () => ({ meta: [
		{ title: "API & Hardware Integration — ARGUSS" },
		{
			name: "description",
			content: "Ingestion API reference for ARGUSS: authenticated POST endpoint for LoRa gateway telemetry, payload schema, error codes and field-node wiring notes."
		},
		{
			property: "og:title",
			content: "API & Hardware Integration — ARGUSS"
		},
		{
			property: "og:description",
			content: "Authenticated telemetry ingestion endpoint for ESP32 + LoRa gateways."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_shell.live-pACiIl1f.mjs");
var Route$6 = createFileRoute("/_shell/live")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("../_shell.map-bswnz1DI.mjs");
var Route$5 = createFileRoute("/_shell/map")({
	head: () => ({ meta: [
		{ title: "Mine Map — ARGUSS" },
		{
			name: "description",
			content: "Top-down GIS view of Jharia Coalfield Panel 7 with the LoRa mesh topology, risk zones and deformation time slider."
		},
		{
			property: "og:title",
			content: "Mine Map — ARGUSS"
		},
		{
			property: "og:description",
			content: "Mesh topology, risk zones and deformation replay for Panel 7."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_shell.overview-FxMLkY7D.mjs");
var Route$4 = createFileRoute("/_shell/overview")({
	head: () => ({ meta: [
		{ title: "Overview — ARGUSS Subsidence Console" },
		{
			name: "description",
			content: "Control-room overview of Jharia Coalfield Panel 7: node health, zone risk, active alerts and the 24-hour anomaly timeline."
		},
		{
			property: "og:title",
			content: "Overview — ARGUSS Subsidence Console"
		},
		{
			property: "og:description",
			content: "Live node health, zone risk and anomaly timeline for Panel 7."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_shell.settings-KTK_7Dya.mjs");
var Route$3 = createFileRoute("/_shell/settings")({
	head: () => ({ meta: [
		{ title: "Settings — ARGUSS" },
		{
			name: "description",
			content: "ARGUSS role-based access levels, transport security posture and node commissioning / baseline calibration register for Panel 7."
		},
		{
			property: "og:title",
			content: "Settings — ARGUSS"
		},
		{
			property: "og:description",
			content: "Roles, security posture and baseline calibration register."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_shell.validation-KvtqveAP.mjs");
var Route$2 = createFileRoute("/_shell/validation")({
	head: () => ({ meta: [
		{ title: "Validation Lab — ARGUSS" },
		{
			name: "description",
			content: "Five replayed test scenarios with precision, recall, F1, false alarm rate and detection time for the ARGUSS subsidence risk engine."
		},
		{
			property: "og:title",
			content: "Validation Lab — ARGUSS"
		},
		{
			property: "og:description",
			content: "Prototype validation results including negative test cases."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_shell.live.index-lHZMFi-f.mjs");
var Route$1 = createFileRoute("/_shell/live/")({
	head: () => ({ meta: [
		{ title: "Live Monitoring — ARGUSS" },
		{
			name: "description",
			content: "Live telemetry from all 20 ARGUSS sensor nodes: tilt, displacement, crack width, vibration, inter-node distance drift, battery and signal."
		},
		{
			property: "og:title",
			content: "Live Monitoring — ARGUSS"
		},
		{
			property: "og:description",
			content: "Per-node tilt, displacement, crack and mesh telemetry at 2 s sampling."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var payloadSchema = objectType({
	node_code: stringType().min(3).max(16),
	recorded_at: stringType().datetime().optional(),
	tilt_x: numberType().min(-90).max(90),
	tilt_y: numberType().min(-90).max(90),
	displacement: numberType().min(-1e3).max(1e3),
	crack_width: numberType().min(0).max(1e3),
	vibration: numberType().min(0).max(1e4),
	inter_node_distance: numberType().min(0).max(1e5).optional(),
	temperature: numberType().min(-60).max(120).optional(),
	battery_pct: numberType().min(0).max(100).optional(),
	signal_strength: numberType().min(-200).max(200).optional()
});
var cors = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "content-type, x-arguss-key",
	"Access-Control-Allow-Methods": "POST, OPTIONS"
};
function json(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json",
			...cors
		}
	});
}
var Route = createFileRoute("/api/public/ingest-reading")({ server: { handlers: {
	OPTIONS: async () => new Response(null, {
		status: 204,
		headers: cors
	}),
	POST: async ({ request }) => {
		const expected = processModule.env["ARGUSS_INGEST_KEY"];
		const provided = request.headers.get("x-arguss-key");
		if (!expected || !provided || provided !== expected) return json({
			ok: false,
			error: "unauthorized"
		}, 401);
		let raw;
		try {
			raw = await request.json();
		} catch {
			return json({
				ok: false,
				error: "invalid_json"
			}, 400);
		}
		const parsed = payloadSchema.safeParse(raw);
		if (!parsed.success) return json({
			ok: false,
			error: "invalid_payload",
			issues: parsed.error.issues
		}, 422);
		const p = parsed.data;
		const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
		const { data: node, error: nodeError } = await supabaseAdmin.from("sensor_nodes").select("id, node_code").eq("node_code", p.node_code).maybeSingle();
		if (nodeError) return json({
			ok: false,
			error: "lookup_failed"
		}, 500);
		if (!node) return json({
			ok: false,
			error: "unknown_node_code"
		}, 404);
		const { error: insertError } = await supabaseAdmin.from("sensor_readings").insert({
			node_id: node.id,
			recorded_at: p.recorded_at ?? (/* @__PURE__ */ new Date()).toISOString(),
			tilt_x: p.tilt_x,
			tilt_y: p.tilt_y,
			displacement: p.displacement,
			crack_width: p.crack_width,
			vibration: p.vibration,
			inter_node_distance: p.inter_node_distance ?? null,
			temperature: p.temperature ?? null,
			battery_pct: p.battery_pct ?? null,
			signal_strength: p.signal_strength ?? null,
			is_simulated: false
		});
		if (insertError) return json({
			ok: false,
			error: "insert_failed"
		}, 500);
		return json({
			ok: true,
			node_code: node.node_code,
			is_simulated: false
		}, 201);
	}
} } });
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var ShellRoute = Route$11.update({
	id: "/_shell",
	getParentRoute: () => Route$13
});
var ShellAiRiskRoute = Route$10.update({
	id: "/ai-risk",
	path: "/ai-risk",
	getParentRoute: () => ShellRoute
});
var ShellAlertsRoute = Route$9.update({
	id: "/alerts",
	path: "/alerts",
	getParentRoute: () => ShellRoute
});
var ShellHistoryRoute = Route$8.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => ShellRoute
});
var ShellIntegrationRoute = Route$7.update({
	id: "/integration",
	path: "/integration",
	getParentRoute: () => ShellRoute
});
var ShellLiveRoute = Route$6.update({
	id: "/live",
	path: "/live",
	getParentRoute: () => ShellRoute
});
var ShellMapRoute = Route$5.update({
	id: "/map",
	path: "/map",
	getParentRoute: () => ShellRoute
});
var ShellOverviewRoute = Route$4.update({
	id: "/overview",
	path: "/overview",
	getParentRoute: () => ShellRoute
});
var ShellSettingsRoute = Route$3.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => ShellRoute
});
var ShellValidationRoute = Route$2.update({
	id: "/validation",
	path: "/validation",
	getParentRoute: () => ShellRoute
});
var ShellLiveIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => ShellLiveRoute
});
var ShellLiveNodeCodeRoute = Route$14.update({
	id: "/$nodeCode",
	path: "/$nodeCode",
	getParentRoute: () => ShellLiveRoute
});
var ApiPublicIngestReadingRoute = Route.update({
	id: "/api/public/ingest-reading",
	path: "/api/public/ingest-reading",
	getParentRoute: () => Route$13
});
var ShellLiveRouteChildren = {
	ShellLiveNodeCodeRoute,
	ShellLiveIndexRoute
};
var ShellRouteChildren = {
	ShellAiRiskRoute,
	ShellAlertsRoute,
	ShellHistoryRoute,
	ShellIntegrationRoute,
	ShellLiveRoute: ShellLiveRoute._addFileChildren(ShellLiveRouteChildren),
	ShellMapRoute,
	ShellOverviewRoute,
	ShellSettingsRoute,
	ShellValidationRoute
};
var rootRouteChildren = {
	IndexRoute,
	ShellRoute: ShellRoute._addFileChildren(ShellRouteChildren),
	ApiPublicIngestReadingRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
