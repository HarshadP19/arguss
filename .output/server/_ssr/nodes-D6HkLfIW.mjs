//#region node_modules/.nitro/vite/services/ssr/assets/nodes-D6HkLfIW.js
var jitter = [
	0,
	14,
	-9,
	6,
	-13,
	11,
	-6,
	9,
	-11,
	4,
	13,
	-8,
	7,
	-5,
	10,
	-12,
	5,
	-7,
	12,
	-4
];
var NODES = Array.from({ length: 20 }, (_, i) => {
	const n = i + 1;
	const col = i % 5;
	const row = Math.floor(i / 5);
	const zone = n <= 5 ? "Zone A" : n <= 10 ? "Zone B" : n <= 15 ? "Zone C" : "Zone D";
	return {
		code: `SG-${String(n).padStart(2, "0")}`,
		zone,
		x: 150 + col * 175 + jitter[i],
		y: 130 + row * 150 + jitter[(i + 7) % 20],
		lat: 23.74 + row * .0035,
		lon: 86.41 + col * .004,
		positionType: n % 7 === 0 ? "gps_referenced" : "fixed_surveyed"
	};
});
var nodeByCode = (code) => NODES.find((n) => n.code === code);
/** LoRa mesh adjacency (grid neighbours + one diagonal per cell) → relay mesh, not star. */
var MESH_LINKS = (() => {
	const links = [];
	for (let i = 0; i < 20; i++) {
		const col = i % 5;
		const row = Math.floor(i / 5);
		const code = (idx) => NODES[idx].code;
		if (col < 4) links.push({
			a: code(i),
			b: code(i + 1),
			type: "direct"
		});
		if (row < 3) links.push({
			a: code(i),
			b: code(i + 5),
			type: "relay"
		});
		if (row < 3 && col < 4) links.push({
			a: code(i),
			b: code(i + 6),
			type: "relay"
		});
	}
	return links;
})();
var GATEWAY = {
	x: 880,
	y: 620,
	label: "GW-01"
};
var neighboursOf = (code) => MESH_LINKS.filter((l) => l.a === code || l.b === code).map((l) => l.a === code ? l.b : l.a);
var ZONE_BOUNDS = {
	"Zone A": {
		x: 90,
		y: 70,
		w: 830,
		h: 130
	},
	"Zone B": {
		x: 90,
		y: 215,
		w: 830,
		h: 145
	},
	"Zone C": {
		x: 90,
		y: 375,
		w: 830,
		h: 145
	},
	"Zone D": {
		x: 90,
		y: 535,
		w: 830,
		h: 130
	}
};
//#endregion
export { neighboursOf as a, ZONE_BOUNDS as i, MESH_LINKS as n, nodeByCode as o, NODES as r, GATEWAY as t };
