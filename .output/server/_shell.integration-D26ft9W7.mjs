import { i as __toESM } from "./_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { D as Copy, a as Terminal, j as Check, p as Radio, u as ShieldCheck } from "./_libs/lucide-react.mjs";
import { a as cn, c as useDemo, i as PageHeader } from "./_ssr/AppShell-B9CTOc9N.mjs";
import { r as Panel } from "./_ssr/bits-D2vcYkUv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_shell.integration-D26ft9W7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ENDPOINT = "POST /api/public/ingest-reading";
var FIELDS = [
	[
		"node_code",
		"string",
		"required",
		"Registered node identifier, e.g. SG-07. Rejected with 404 if not commissioned."
	],
	[
		"recorded_at",
		"string (ISO 8601)",
		"optional",
		"Sample timestamp from the node. Defaults to server receive time."
	],
	[
		"tilt_x",
		"number (deg)",
		"required",
		"Inclinometer X axis, −90 … 90."
	],
	[
		"tilt_y",
		"number (deg)",
		"required",
		"Inclinometer Y axis, −90 … 90."
	],
	[
		"displacement",
		"number (mm)",
		"required",
		"Cumulative surface displacement since baseline."
	],
	[
		"crack_width",
		"number (mm)",
		"required",
		"Crack gauge width, 0 … 1000."
	],
	[
		"vibration",
		"number (g)",
		"required",
		"Peak ground acceleration in the sampling window."
	],
	[
		"inter_node_distance",
		"number (m)",
		"optional",
		"Ranged distance to nearest neighbour; drift is derived server-side."
	],
	[
		"temperature",
		"number (°C)",
		"optional",
		"Enclosure temperature, used for thermal compensation."
	],
	[
		"battery_pct",
		"number",
		"optional",
		"State of charge, 0 … 100."
	],
	[
		"signal_strength",
		"number (dBm)",
		"optional",
		"LoRa RSSI at the receiving hop."
	]
];
var CODES = [
	["201 Created", "Reading stored. Response echoes node_code and is_simulated: false."],
	["400 invalid_json", "Body was not parseable JSON."],
	["401 unauthorized", "Missing or incorrect x-arguss-key header."],
	["404 unknown_node_code", "node_code is not present in sensor_nodes — commission the node first."],
	["422 invalid_payload", "Schema validation failed. issues[] lists the offending fields."],
	["500 insert_failed", "Database write failed; the gateway should retry with backoff."]
];
function Code({ label, body }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded border border-border bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border px-2.5 py-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "label-xs flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-3" }),
					" ",
					label
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					navigator.clipboard?.writeText(body);
					setCopied(true);
					window.setTimeout(() => setCopied(false), 1400);
				},
				className: "flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground hover:text-foreground",
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }), copied ? "Copied" : "Copy"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "num overflow-x-auto px-2.5 py-2 text-[11px] leading-relaxed text-foreground/90",
			children: body
		})]
	});
}
function Integration() {
	const { dataMode } = useDemo();
	const origin = typeof window === "undefined" ? "https://<your-arguss-host>" : window.location.origin;
	const curl = `curl -X POST "${origin}/api/public/ingest-reading" \\
  -H "content-type: application/json" \\
  -H "x-arguss-key: $ARGUSS_INGEST_KEY" \\
  -d '{
    "node_code": "SG-07",
    "recorded_at": "2026-09-14T04:58:12Z",
    "tilt_x": 0.42,
    "tilt_y": -0.19,
    "displacement": 3.85,
    "crack_width": 1.20,
    "vibration": 0.031,
    "inter_node_distance": 41.86,
    "temperature": 33.4,
    "battery_pct": 91.5,
    "signal_strength": -84
  }'`;
	const response = `HTTP/1.1 201 Created
content-type: application/json

{ "ok": true, "node_code": "SG-07", "is_simulated": false }`;
	const esp32 = `// ESP32 gateway — forward one decoded LoRa mesh frame
HTTPClient http;
http.begin(client, "${origin}/api/public/ingest-reading");
http.addHeader("content-type", "application/json");
http.addHeader("x-arguss-key", ARGUSS_INGEST_KEY);   // stored in NVS, never in source

StaticJsonDocument<320> doc;
doc["node_code"]    = frame.nodeCode;      // "SG-07"
doc["tilt_x"]       = frame.tiltX;
doc["tilt_y"]       = frame.tiltY;
doc["displacement"] = frame.displacementMm;
doc["crack_width"]  = frame.crackMm;
doc["vibration"]    = frame.vibrationG;
doc["inter_node_distance"] = frame.rangeM;
doc["battery_pct"]  = frame.batteryPct;
doc["signal_strength"] = frame.rssi;

String body; serializeJson(doc, body);
int status = http.POST(body);               // expect 201`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "API & Hardware Integration",
		subtitle: "Telemetry ingestion contract for LoRa gateways — the same path the simulator replays through",
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("num rounded border px-2 py-0.5 text-[10px]", dataMode === "live" ? "border-info/50 bg-info/10 text-info" : "border-warning/50 bg-warning/10 text-warning"),
			children: dataMode === "live" ? "LIVE HARDWARE DATA" : "SIMULATED DATA"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 px-4 pb-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Endpoint",
					hint: "Single write path — no other route may insert readings",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num rounded border border-info/50 bg-info/10 px-2 py-0.5 text-[11px] text-info",
								children: "POST"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "num text-sm text-foreground",
								children: [origin, "/api/public/ingest-reading"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs leading-relaxed text-muted-foreground",
							children: [
								ENDPOINT,
								" validates the payload, resolves ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num",
									children: "node_code"
								}),
								" against the commissioned node registry and inserts one row into ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num",
									children: "sensor_readings"
								}),
								" with",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num",
									children: "is_simulated = false"
								}),
								". That flag is the only switch the platform needs: as soon as a non-simulated reading lands within the last 5 minutes, every screen relabels itself LIVE HARDWARE DATA. No code change, no redeploy."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid gap-2 sm:grid-cols-3",
							children: [
								["Transport", "HTTPS, TLS 1.3"],
								["Content type", "application/json"],
								["Rate guidance", "1 frame / node / 2 s"]
							].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded border border-border bg-background px-2.5 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-xs",
									children: k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "num mt-0.5 text-xs text-foreground",
									children: v
								})]
							}, k))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Request example",
					hint: "curl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, {
						label: "curl",
						body: curl
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, {
							label: "response",
							body: response
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Gateway firmware snippet",
					hint: "ESP32 + LoRa (SX1276) mesh gateway",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, {
						label: "gateway.ino",
						body: esp32
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Payload schema",
					bodyClassName: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[640px] text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "label-xs px-3 py-2",
										children: "Field"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "label-xs px-3 py-2",
										children: "Type"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "label-xs px-3 py-2",
										children: "Req."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "label-xs px-3 py-2",
										children: "Notes"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: FIELDS.map(([f, t, r, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border/60 last:border-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "num px-3 py-2 text-foreground",
										children: f
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "num px-3 py-2 text-muted-foreground",
										children: t
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("rounded border px-1.5 py-0.5 text-[10px]", r === "required" ? "border-danger/40 bg-danger/10 text-danger" : "border-border text-muted-foreground"),
											children: r
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-muted-foreground",
										children: n
									})
								]
							}, f)) })]
						})
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Authentication",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-info" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: [
								"Every request carries a shared gateway key in the",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-foreground",
									children: "x-arguss-key"
								}),
								" header. The key is held server-side as",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-foreground",
									children: "ARGUSS_INGEST_KEY"
								}),
								" and compared inside the handler — it is never shipped to the browser and never printed on this page. Client-side keys cannot write: table policies allow read-only public access, and inserts run under a service-role identity reachable only from the endpoint."
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1.5 text-xs text-muted-foreground",
						children: [
							"Rotate per gateway by issuing a new key and reflashing NVS.",
							"Unauthorised requests are refused before any database contact.",
							"Reject-then-log: payloads never reach storage until they validate."
						].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" }), l]
						}, l))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Response codes",
					bodyClassName: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
						className: "w-full text-left text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: CODES.map(([c, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/60 last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "num w-40 px-3 py-2 align-top text-foreground",
								children: c
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 text-muted-foreground",
								children: d
							})]
						}, c)) })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Field wiring",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "mt-0.5 size-4 shrink-0 text-info" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: "Field nodes never call this endpoint directly. Each node relays its frame hop-by-hop through the LoRa mesh until it reaches the gateway; the gateway is the only device with an uplink and the only holder of the ingest key. That keeps radio power low, survives single-node loss, and means adding a node is a commissioning row — not a firmware change."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "num mt-3 rounded border border-border bg-background px-2.5 py-2 text-[11px] leading-relaxed text-foreground/80",
						children: "SG-07 → SG-08 → SG-12 → GW-01 → HTTPS → ingest-reading → sensor_readings"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Prototype status",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs leading-relaxed text-muted-foreground",
						children: [
							"The endpoint is live and writes real rows today. For the judged walkthrough all readings are generated by the scripted simulator and flagged",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num text-foreground",
								children: "is_simulated = true"
							}),
							", so nothing on screen is presented as hardware output. Connecting an ESP32 gateway requires no application change."
						]
					})
				})
			]
		})]
	})] });
}
//#endregion
export { Integration as component };
