globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/bits-BxEn0WOZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"936-sGureTPOgrk3ChZhVzjA46pRsss\"",
		"mtime": "2026-09-14T08:27:35.358Z",
		"size": 2358,
		"path": "../public/assets/bits-BxEn0WOZ.js"
	},
	"/assets/arrow-right-puPQL7yf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-Mjqrug39kg3PGTIPjAcBYaq5Y2c\"",
		"mtime": "2026-09-14T08:27:35.357Z",
		"size": 157,
		"path": "../public/assets/arrow-right-puPQL7yf.js"
	},
	"/assets/check-D9GTCduv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"74-fwvpycX66bBiIqFlPicU3yGk6gc\"",
		"mtime": "2026-09-14T08:27:35.358Z",
		"size": 116,
		"path": "../public/assets/check-D9GTCduv.js"
	},
	"/assets/AppShell-BZojA95q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a06a-rW8kauwf1b9SHbnazIK6/BzvZes\"",
		"mtime": "2026-09-14T08:27:35.346Z",
		"size": 172138,
		"path": "../public/assets/AppShell-BZojA95q.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-14T08:10:45.271Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-14T08:10:45.349Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/LineChart-CkOcDbvn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2aff-2Zy65KRoxxQjqaMydg+e3AaymEM\"",
		"mtime": "2026-09-14T08:27:35.346Z",
		"size": 11007,
		"path": "../public/assets/LineChart-CkOcDbvn.js"
	},
	"/assets/MineMap-Bf1onfJs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b0e-ZIvXzg9H6i71zpp/2KJrZa8gMK4\"",
		"mtime": "2026-09-14T08:27:35.347Z",
		"size": 6926,
		"path": "../public/assets/MineMap-Bf1onfJs.js"
	},
	"/assets/routes-BYwYsdG4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1238-Z2niT/q+bxoIZszC8lWDsyyVLXQ\"",
		"mtime": "2026-09-14T08:27:35.361Z",
		"size": 4664,
		"path": "../public/assets/routes-BYwYsdG4.js"
	},
	"/assets/generateCategoricalChart-puq4UkQz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59d3d-+ZNyeyMdWI3s4mgXliPHsMifTgY\"",
		"mtime": "2026-09-14T08:27:35.359Z",
		"size": 367933,
		"path": "../public/assets/generateCategoricalChart-puq4UkQz.js"
	},
	"/assets/map-pin-CcvETzVw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-/YFPUzSNG3xhQMD7REKryhkocWs\"",
		"mtime": "2026-09-14T08:27:35.360Z",
		"size": 251,
		"path": "../public/assets/map-pin-CcvETzVw.js"
	},
	"/assets/shield-check-BVrTQbKg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"138-CriXRh6LkTQcaP9LxV/qYtEQqgo\"",
		"mtime": "2026-09-14T08:27:35.361Z",
		"size": 312,
		"path": "../public/assets/shield-check-BVrTQbKg.js"
	},
	"/assets/signal-BjUgJvrh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104-0redw6WeK8TMDrRu7rX17Hfo1fM\"",
		"mtime": "2026-09-14T08:27:35.362Z",
		"size": 260,
		"path": "../public/assets/signal-BjUgJvrh.js"
	},
	"/assets/_shell-BNkm8o0q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9-ur4MKIJdEvYIMx+IaCQSh/4FvSA\"",
		"mtime": "2026-09-14T08:27:35.347Z",
		"size": 249,
		"path": "../public/assets/_shell-BNkm8o0q.js"
	},
	"/assets/radio-DqLvGVBz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16e-elStV4eKE+VRerTNWE7al12ZsrE\"",
		"mtime": "2026-09-14T08:27:35.360Z",
		"size": 366,
		"path": "../public/assets/radio-DqLvGVBz.js"
	},
	"/assets/_shell.ai-risk-C1QlNI5R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"194b-HhST4UaKK/TUTiQ6FCkz3wB3XdY\"",
		"mtime": "2026-09-14T08:27:35.348Z",
		"size": 6475,
		"path": "../public/assets/_shell.ai-risk-C1QlNI5R.js"
	},
	"/assets/useStore-C8ED_6ec.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6dd4-8UcoQpUBUmG2unhYOGUNWUwKjIE\"",
		"mtime": "2026-09-14T08:27:35.362Z",
		"size": 28116,
		"path": "../public/assets/useStore-C8ED_6ec.js"
	},
	"/assets/_shell.alerts-YhdoQqlW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1557-LP3knS8SwAVP8QcZF/bwgIlsu9Y\"",
		"mtime": "2026-09-14T08:27:35.349Z",
		"size": 5463,
		"path": "../public/assets/_shell.alerts-YhdoQqlW.js"
	},
	"/assets/_shell.integration-BLD_v5TE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a9d-fFS3tmGGxt857K4iioMnlU82CdE\"",
		"mtime": "2026-09-14T08:27:35.350Z",
		"size": 10909,
		"path": "../public/assets/_shell.integration-BLD_v5TE.js"
	},
	"/assets/_shell.history-6JkPHwSW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1544-IAZiwopDEWH50amEqN2JtFtm7pc\"",
		"mtime": "2026-09-14T08:27:35.349Z",
		"size": 5444,
		"path": "../public/assets/_shell.history-6JkPHwSW.js"
	},
	"/assets/_shell.live.index-BeR2BykV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8d-KwxTSS+n23ZMcZmM/VZw2F6spoU\"",
		"mtime": "2026-09-14T08:27:35.353Z",
		"size": 3981,
		"path": "../public/assets/_shell.live.index-BeR2BykV.js"
	},
	"/assets/_shell.live-D6HTbOQE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-uxDyKBqLdkM9xOnbe+3JnUuyazQ\"",
		"mtime": "2026-09-14T08:27:35.350Z",
		"size": 138,
		"path": "../public/assets/_shell.live-D6HTbOQE.js"
	},
	"/assets/styles-wU4_0jmE.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"14942-8rFgiP3UJReqUNfhYt/Nq1C+Bbo\"",
		"mtime": "2026-09-14T08:27:35.363Z",
		"size": 84290,
		"path": "../public/assets/styles-wU4_0jmE.css"
	},
	"/assets/index-z_ZOmuU9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d532-zavsLPncXZHAKQ3UFwwrox3yr/8\"",
		"mtime": "2026-09-14T08:27:35.345Z",
		"size": 578866,
		"path": "../public/assets/index-z_ZOmuU9.js"
	},
	"/assets/_shell.live._nodeCode-b7wllqr1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1766-z1lhCFED+MudCnqZOFV8LIIWc6o\"",
		"mtime": "2026-09-14T08:27:35.351Z",
		"size": 5990,
		"path": "../public/assets/_shell.live._nodeCode-b7wllqr1.js"
	},
	"/assets/_shell.map-C4p5ky6j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103d-VLF3vRMAw+FbBNUDZVMSsnO7j70\"",
		"mtime": "2026-09-14T08:27:35.354Z",
		"size": 4157,
		"path": "../public/assets/_shell.map-C4p5ky6j.js"
	},
	"/assets/_shell.settings-Bs5q8kJJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1811-iJ/pOAzVbkiH8HX67B8FJq6cmxI\"",
		"mtime": "2026-09-14T08:27:35.356Z",
		"size": 6161,
		"path": "../public/assets/_shell.settings-Bs5q8kJJ.js"
	},
	"/assets/_shell.validation-UOO4QXiA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b87-hed/W2VuaysJJeQ05ooxgPDEVYQ\"",
		"mtime": "2026-09-14T08:27:35.357Z",
		"size": 15239,
		"path": "../public/assets/_shell.validation-UOO4QXiA.js"
	},
	"/assets/_shell.overview-BT8_DW9W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c1e-X47X64yeIH7dUjMIcz39ZNYIQoM\"",
		"mtime": "2026-09-14T08:27:35.356Z",
		"size": 19486,
		"path": "../public/assets/_shell.overview-BT8_DW9W.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_y6na4n = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_y6na4n
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
