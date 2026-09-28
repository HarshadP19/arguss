import { o as nodeByCode } from "./_ssr/nodes-D6HkLfIW.mjs";
import { M as notFound, m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_shell.live._nodeCode-D_grJwlW.js
var $$splitComponentImporter = () => import("./_shell.live._nodeCode-DR4CWu9X.mjs");
var Route = createFileRoute("/_shell/live/$nodeCode")({
	head: ({ params }) => ({ meta: [
		{ title: `${params.nodeCode} — Node Detail · ARGUSS` },
		{
			name: "description",
			content: `Telemetry history, anomaly score, mesh neighbours and event log for ARGUSS sensor node ${params.nodeCode}.`
		},
		{
			property: "og:title",
			content: `${params.nodeCode} — Node Detail · ARGUSS`
		},
		{
			property: "og:description",
			content: `Anomaly score and telemetry trends for node ${params.nodeCode}.`
		}
	] }),
	loader: ({ params }) => {
		if (!nodeByCode(params.nodeCode)) throw notFound();
		return null;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
