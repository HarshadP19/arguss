# ARGUSS Ground Watch

# ARGUSS — Build Prompt (From Scratch)

**Adaptive Remote Ground Subsidence Surveillance**

Tagline: *"Sense the Ground. Predict the Risk. Protect the Surface."*

Smart India Hackathon 2026 · Problem Statement SIH26025 · Team HackTech Elites

---

## 0. WHAT THIS IS

Build a complete, production-quality web platform for **AI-enabled real-time 

mine subsidence monitoring** above underground coal mine panels. Sensor nodes 

deployed on the surface form a **wireless LoRa mesh network** (node-to-node 

relay, not simple point-to-point), continuously measuring tilt, displacement, 

vibration, crack initiation, and inter-node distance drift. An AI risk engine 

fuses multi-sensor and spatial evidence — never trusting a single sensor 

reading — to classify risk as Normal, Warning, or High Risk, visualized on a 

GIS-style mine map with explainable reasoning and automated alerts.

This is a **hackathon prototype**, not an enterprise SaaS product — optimize 

every decision for looking flawless and coherent in a 5-10 minute live judge 

walkthrough, while still using a real database and real architecture 

(Supabase) so hardware can connect later with zero rework.

---

## 1. NON-NEGOTIABLE DESIGN PRINCIPLES (read this before generating anything)

This must NOT look like a generic AI-generated app. Lovable/v0/Bolt-style 

tools converge on the same visual patterns — explicitly avoid every one of 

these:

**BANNED:**

- Gradient background blobs or mesh gradients behind hero/header sections

- Glassmorphism (frosted-glass, backdrop-blur cards)

- Generic "icon in a colored circle, centered, 3-column feature grid" layout

- Large centered hero heading + subtext + two pill CTA buttons pattern

- Purple-to-blue or purple-to-pink gradients anywhere

- Untouched default shadcn/ui styling (rounded-xl on everything, uniform 

  shadow-sm on every card, no visual hierarchy)

- Emoji used as icons

- Stock illustration-style SVGs (people at laptops, floating abstract shapes)

- Low-density, heavily-whitespaced marketing-page layouts on internal/

  dashboard pages — this is an industrial control-room tool, not a SaaS 

  landing page

- One font family doing every job with no typographic contrast

**REQUIRED — this is what makes it read as professionally engineered:**

- **Two-font typographic system:** Inter or IBM Plex Sans for UI text/labels; 

  **JetBrains Mono or IBM Plex Mono** for every numeric value — sensor 

  readings, timestamps, node IDs, coordinates, anomaly scores. This single 

  choice is the highest-leverage way to make it look like an instrument 

  panel instead of a marketing template.

- **Information-dense, asymmetric dashboard layouts.** The Overview screen 

  should look like a real control-room monitor — packed with real data in a 

  clear grid, not spaced out like a product landing page. Reserve generous 

  whitespace only for the login/landing screen.

- **Restrained, purely semantic color.** Background is near-white (#FAFAFA) 

  or a committed dark slate (#0F1115) — pick one theme and commit, don't mix 

  light-marketing aesthetics with a dark-dashboard feel. Status colors 

  (green/amber/red/blue) appear ONLY on risk badges, alerts, and node status 

  — never decoratively.

- **Hairline 1px borders, not shadows,** to separate dashboard regions — 

  this is how real ops dashboards (Grafana, Datadog, SCADA/mission-control 

  screens, USGS seismic monitoring UI) are actually built. Use this as your 

  visual reference point, not a generic SaaS product.

- **Small, functional, inline icons** next to labels — never large, 

  centered, decorative icons in colored circles.

- **Motion only communicates state change** (a risk badge flipping color, an 

  alert sliding in) — zero ambient/decorative animation, no scroll-triggered 

  fade-ins.

---

## 2. TECH STACK (use exactly this)

- **Frontend:** React + TypeScript + Tailwind CSS + shadcn/ui

- **Charts:** Recharts

- **Map:** Custom SVG/Canvas-rendered top-down mine site — NOT Mapbox/Google 

  Maps (no API keys, no internet dependency, no billing risk at the venue)

- **Animation:** Framer Motion, used only for state-change transitions

- **Backend + Database:** **Supabase** (Postgres, Realtime, Auth, Edge 

  Functions) — see full schema in Section 6

- **Deployment:** Must run reliably with no external dependencies beyond 

  Supabase — assume the venue may have unreliable internet

---

## 3. DESIGN TOKENS

**Colors:**

- Background: `#FAFAFA` (or `#0F1115` if dark theme is chosen — pick one)

- Text primary: `#1A1A1A` (or `#E8E8E8` dark) | Text secondary: `#6B7280`

- Borders: `#E5E7EB` (or `#2A2D35` dark)

- Status Green (Normal): `#16A34A`

- Status Amber (Warning): `#F59E0B`

- Status Red (High Risk): `#DC2626`

- Status Blue (Info/System): `#2563EB`

- Accent (brand, sparingly): deep industrial blue `#1E3A5F` — logo and 

  primary actions only

**Typography:**

- UI text: Inter / IBM Plex Sans, 400-600 weight

- Numeric/data: JetBrains Mono / IBM Plex Mono, tabular-nums, 500-600 weight

**Spacing:** strict 8px grid. **Border-radius:** 8px standard (not 20px+ — 

this is industrial software, not a consumer app).

---

## 4. NAVIGATION & PAGES

Left sidebar (desktop) / drawer (mobile). Top header: ARGUSS logo · Mine/site 

selector (single demo site: "Jharia Coalfield — Panel 7") · persistent 

**SIMULATED DATA** badge (prominent, unmissable pill, not inline text) · 

last sync time · notifications · demo user avatar.

1. **Overview**

2. **Live Monitoring**

3. **Mine Map**

4. **AI & Risk Analysis**

5. **Alerts & Incidents**

6. **Validation Lab**

7. **Historical Analysis**

8. **Settings** *(stub — role/security display only, see Section 7)*

---

## 5. PAGE SPECIFICATIONS

### 5.1 Login / Landing

Split screen. Left: ARGUSS branding, tagline, 3-bullet value prop. Right: 

Email/Password (non-functional, purely visual) + prominent **"Enter Demo 

Mode"** button — the only button that needs to work; loads the full app 

instantly with seeded Supabase demo data. Footer: `Prototype Environment · 

SIH 2026 · SIH26025`.

### 5.2 Overview

Dense control-room layout. KPI row (clickable): Total Nodes · Online Nodes · 

Warning Zones · High-Risk Zones · Active Alerts · Last Sync. 

Main grid: LEFT (60%) embedded Live Mine Risk Map · RIGHT (40%) Current Risk 

Summary (stacked bar, not a busy pie chart).

Below, **two-column** (not stacked): Recent Alerts | System Health — these 

are both glanceable summary widgets and belong side by side, not pushing the 

fold down by stacking.

Also include: Risk Timeline (24h area chart), AI Insight box (dynamically 

generated one-liner, always labeled "Based on simulated data" or "Based on 

live hardware data" — see Section 6 auto-switching logic).

### 5.3 Live Monitoring

Grid of node cards: Node ID (SG-01 through SG-20), status badge, Tilt X/Y, 

Displacement, Crack Width, Vibration, **Inter-node distance to nearest 

neighbour** (with baseline + drift %), Battery, Signal. Click → node detail 

page: 1h/6h/24h/7d tabbed graphs, anomaly score, last comms, nearby nodes, 

event history, and a **Position** badge ("Fixed — surveyed" or 

"GPS-referenced").

### 5.4 Mine Map

Custom SVG top-down rendering of the mine site: panel boundary, ~20 sensor 

nodes as positioned circles (color = status), LoRa mesh links drawn as thin 

connecting lines between neighbouring nodes (showing actual mesh topology, 

not star), gateway icon, road/building/village context for realism.

Layer toggles (Sensor Nodes / Risk Zones / Tilt Heatmap / Displacement 

Heatmap) **docked as a small collapsible panel in the map's corner** — not a 

separate checklist floating above the map.

Click a node or risk zone → side panel with details, anomaly score, 

reasoning. Include a deformation time slider scrubbing through 3-5 pre-baked 

historical states.

### 5.5 AI & Risk Analysis

Visual pipeline: `Sensor Data → Feature Engineering → Anomaly Detection 

(Isolation Forest) → Temporal + Spatial Correlation → Multi-Sensor Fusion → 

Risk Classification`.

Live values: Anomaly Score (0-100 gauge), Deformation Trend, Spatial 

Correlation, Sensor Agreement, Persistence → final Risk badge.

**"Why this risk level?" panel** (this is the platform's core differentiator 

— make it prominent): a checklist of contributing factors (✓/✕), plus a 

plain-language reasoning line, e.g. *"Escalation withheld: the signature is 

not yet spatially correlated or persistent enough, even where magnitude has 

risen."*

**Model Info card:** Model = Isolation Forest (unsupervised), full input 

list, labeled honestly: *"Prototype Model — trained on synthetic + open 

subsidence datasets. Not trained on real proprietary mine data."* Never 

overclaim a model that isn't actually running.

### 5.6 Alerts & Incidents

Table: Severity, Zone, Node(s), Timestamp, Trigger, Anomaly Score, Status. 

Actions: Acknowledge, Resolve, View on Map. Critically, alerts caused by 

sensor/network failure must be explicitly labeled *"classified as comms 

failure, not subsidence"* — this distinction (sensor fault vs. ground 

anomaly) is a named PS requirement, not optional polish.

### 5.7 Validation Lab

**This is your single strongest differentiator — make it visually excellent.**

Table of 5 test scenarios: Stable Surface, Gradual Deformation, Increasing 

Deformation, Single-Node Disturbance, Communication Failure — each with 

Expected / Detected / Detection Time / False Alarm / Result columns.

Summary metrics: Precision, Recall, F1 Score, False Alarm Rate, Avg. 

Detection Time.

**Prominent highlighted callout** (not buried at the bottom): explain *why* 

the negative test cases matter — a system that escalates on any large 

reading is useless in a working mine (blasting, haul traffic, and sensor 

faults all produce large readings); two of the five tests exist purely to 

confirm the system stays quiet when it should.

Test method section: synthetic telemetry replayed through the live ingest 

path, 20-node mesh, 2s sampling interval, 30-minute windows. Label all 

results: *"Prototype validation results — simulated test conditions."*

Include a **"Download Validation Report (PDF)"** button generating a static 

PDF of the current results table.

### 5.8 Historical Analysis

Date range / zone / node / parameter selectors. Trend charts for 

displacement, tilt, crack growth, vibration, anomaly score, risk progression. 

Overlay multiple nodes. Before/after comparison view.

### 5.9 API & Hardware Integration

Document the real Supabase Edge Function ingestion endpoint (schema below) 

with an example curl/POST request and authentication method. This is where 

you prove "hardware-ready" architecture to judges — it should look like real 

API documentation, not a marketing page.

### 5.10 Settings (stub, low effort)

Static display: 

- **Role-Based Access:** Admin / Safety Officer / Viewer (prototype stub — 

  not fully wired, but visually represented)

- **Data Transmission:** "TLS-encrypted (Supabase managed)"

- **Node Commissioning / Baseline Calibration table:** Node ID → Calibration 

  Date → Baseline Tilt/Displacement/Vibration → Status (Calibrated/Pending) 

  — this reflects your own documented methodology step "Set the Baseline."

---

## 6. SUPABASE SCHEMA (build this exactly)

```sql

create table mine_sites (

  id uuid primary key default gen_random_uuid(),

  name text not null,

  panel_label text,

  created_at timestamptz default now()

);

create table sensor_nodes (

  id uuid primary key default gen_random_uuid(),

  node_code text unique not null,

  mine_site_id uuid references mine_sites(id),

  zone_label text,

  latitude float,

  longitude float,

  position_type text default 'fixed_surveyed', -- fixed_surveyed | gps_referenced

  installed_at timestamptz default now(),

  status text default 'normal'

);

create table mesh_links (

  id uuid primary key default gen_random_uuid(),

  node_a_id uuid references sensor_nodes(id),

  node_b_id uuid references sensor_nodes(id),

  link_type text default 'direct', -- direct | relay

  rssi float,

  last_seen timestamptz default now()

);

create table sensor_readings (

  id bigint generated always as identity primary key,

  node_id uuid references sensor_nodes(id),

  recorded_at timestamptz default now(),

  tilt_x float,

  tilt_y float,

  displacement float,

  crack_width float,

  vibration float,

  inter_node_distance float,

  temperature float,

  battery_pct float,

  signal_strength float,

  is_simulated boolean default true

);

create table risk_assessments (

  id bigint generated always as identity primary key,

  node_id uuid references sensor_nodes(id),

  assessed_at timestamptz default now(),

  anomaly_score float,

  deformation_trend text,

  spatial_correlation text,

  sensor_agreement text,

  persistence_minutes int,

  risk_level text,

  contributing_factors jsonb

);

create table alerts (

  id uuid primary key default gen_random_uuid(),

  node_id uuid references sensor_nodes(id),

  severity text,

  trigger_reason text,

  zone_label text,

  status text default 'active',

  created_at timestamptz default now(),

  acknowledged_at timestamptz,

  resolved_at timestamptz

);

create table validation_tests (

  id uuid primary key default gen_random_uuid(),

  test_name text,

  expected_result text,

  detected_result text,

  detection_time_seconds float,

  false_alarm boolean,

  passed boolean,

  run_at timestamptz default now()

);

```

**Realtime:** enable Supabase Realtime on `sensor_readings`, `alerts`, and 

`risk_assessments` so the dashboard updates live via subscription.

**Auto demo/live switching:** if any row in `sensor_readings` from the last 

5 minutes has `is_simulated = false`, switch the global banner from 

"SIMULATED DATA" to "LIVE HARDWARE DATA" automatically — this means the 

exact same app works for the judged demo today and for real ESP32 hardware 

later, with zero code changes.

**Hardware ingestion:** build a Supabase Edge Function `ingest-reading` that 

accepts a POST payload matching `sensor_readings`, validates `node_code` 

exists, inserts with `is_simulated = false`. Document this on the API & 

Hardware Integration page (5.9).

**RLS:** public read is fine for the demo; inserts to `sensor_readings` 

should require a scoped API key/service role (via the Edge Function) — 

structure it as if going to production, not wide open.

---

## 7. SCRIPTED DEMO ENGINE (critical — read carefully)

The live judged demo MUST be a deterministic, scripted state progression — 

never randomized. Build a single shared state store driving every page 

identically.

**Demo controls:** a **fixed, collapsible bottom bar** (visually distinct — 

different background, labeled "DEMO CONTROLS") with Back / Next Step / 

Reset buttons. This must NOT sit inline near the top pushing dashboard 

content down — it's a presenter tool, not part of the product itself.

**Scripted sequence (hardcode exactly this):**

1. `Step 0` — All 20 nodes Normal, dashboard calm, "Baseline — all systems 

   nominal"

2. `Step 1` — Small tilt uptick near "Zone B," still sub-threshold Normal

3. `Step 2` — Displacement/tilt rising, 3rd neighbouring node correlates → 

   anomaly score rises → **WARNING**, map zone turns amber, alert created

4. `Step 3` — Crack/vibration values rise, 4th node correlates → **HIGH 

   RISK**, map zone turns red, high-severity alert fires, AI Insight updates

5. `Step 4` — Operator acknowledges alert → incident timeline entry created

Every page (Overview, Map, Live Monitoring, AI Risk, Alerts) must reflect 

the SAME state simultaneously from one shared state source — this 

consistency across pages is what makes the demo feel real instead of like 

disconnected mockups.

---

## 8. FINAL QUALITY CHECKLIST

- [ ] ARGUSS name used consistently everywhere — zero instances of any 

      other product name

- [ ] "Enter Demo Mode" works with zero setup, loads seeded Supabase data

- [ ] Every nav item works, no dead links

- [ ] Scripted demo plays identically every time via Back/Next/Reset

- [ ] Mesh topology visually shown on the map (lines between neighbouring 

      nodes), not star topology

- [ ] "Why this risk level?" panel populates correctly at each demo stage

- [ ] Sensor/network fault alerts explicitly distinguished from ground 

      anomaly alerts

- [ ] All simulated data clearly, prominently labeled

- [ ] Monospace font used for all numeric data

- [ ] No gradients, no glassmorphism, no generic icon-circle feature grids

- [ ] Responsive down to tablet width minimum

- [ ] Working Supabase Edge Function endpoint for hardware ingestion, 

      documented on its own page

- [ ] Demo/live auto-switching logic works based on `is_simulated` flag

---

## THE ONE-SENTENCE STORY THIS APP MUST TELL

**Real-time sensor mesh network → deformation detection → AI anomaly 

detection → spatial + temporal correlation → explainable risk classification 

→ GIS risk zone → early warning → operator action.**

Every screen must visibly serve this exact chain, styled like a real 

industrial monitoring instrument — not a generic AI-generated SaaS demo.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ff35fd4d-f197-42fd-bf7a-8c2982265f7c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
