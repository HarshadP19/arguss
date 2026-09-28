create table public.mine_sites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  panel_label text,
  created_at timestamptz default now()
);
create table public.sensor_nodes (
  id uuid primary key default gen_random_uuid(),
  node_code text unique not null,
  mine_site_id uuid references public.mine_sites(id),
  zone_label text,
  latitude float,
  longitude float,
  position_type text default 'fixed_surveyed',
  installed_at timestamptz default now(),
  status text default 'normal'
);
create table public.mesh_links (
  id uuid primary key default gen_random_uuid(),
  node_a_id uuid references public.sensor_nodes(id),
  node_b_id uuid references public.sensor_nodes(id),
  link_type text default 'direct',
  rssi float,
  last_seen timestamptz default now()
);
create table public.sensor_readings (
  id bigint generated always as identity primary key,
  node_id uuid references public.sensor_nodes(id),
  recorded_at timestamptz default now(),
  tilt_x float, tilt_y float, displacement float, crack_width float,
  vibration float, inter_node_distance float, temperature float,
  battery_pct float, signal_strength float,
  is_simulated boolean default true
);
create table public.risk_assessments (
  id bigint generated always as identity primary key,
  node_id uuid references public.sensor_nodes(id),
  assessed_at timestamptz default now(),
  anomaly_score float,
  deformation_trend text,
  spatial_correlation text,
  sensor_agreement text,
  persistence_minutes int,
  risk_level text,
  contributing_factors jsonb
);
create table public.alerts (
  id uuid primary key default gen_random_uuid(),
  node_id uuid references public.sensor_nodes(id),
  severity text,
  trigger_reason text,
  zone_label text,
  status text default 'active',
  created_at timestamptz default now(),
  acknowledged_at timestamptz,
  resolved_at timestamptz
);
create table public.validation_tests (
  id uuid primary key default gen_random_uuid(),
  test_name text,
  expected_result text,
  detected_result text,
  detection_time_seconds float,
  false_alarm boolean,
  passed boolean,
  run_at timestamptz default now()
);

grant select on public.mine_sites to anon, authenticated;
grant select on public.sensor_nodes to anon, authenticated;
grant select on public.mesh_links to anon, authenticated;
grant select on public.sensor_readings to anon, authenticated;
grant select on public.risk_assessments to anon, authenticated;
grant select on public.alerts to anon, authenticated;
grant select on public.validation_tests to anon, authenticated;
grant all on public.mine_sites to service_role;
grant all on public.sensor_nodes to service_role;
grant all on public.mesh_links to service_role;
grant all on public.sensor_readings to service_role;
grant all on public.risk_assessments to service_role;
grant all on public.alerts to service_role;
grant all on public.validation_tests to service_role;

alter table public.mine_sites enable row level security;
alter table public.sensor_nodes enable row level security;
alter table public.mesh_links enable row level security;
alter table public.sensor_readings enable row level security;
alter table public.risk_assessments enable row level security;
alter table public.alerts enable row level security;
alter table public.validation_tests enable row level security;

create policy "public read mine_sites" on public.mine_sites for select to anon, authenticated using (true);
create policy "public read sensor_nodes" on public.sensor_nodes for select to anon, authenticated using (true);
create policy "public read mesh_links" on public.mesh_links for select to anon, authenticated using (true);
create policy "public read sensor_readings" on public.sensor_readings for select to anon, authenticated using (true);
create policy "public read risk_assessments" on public.risk_assessments for select to anon, authenticated using (true);
create policy "public read alerts" on public.alerts for select to anon, authenticated using (true);
create policy "public read validation_tests" on public.validation_tests for select to anon, authenticated using (true);

insert into public.mine_sites (name, panel_label) values ('Jharia Coalfield', 'Panel 7');

insert into public.sensor_nodes (node_code, mine_site_id, zone_label, latitude, longitude, position_type)
select 'SG-' || lpad(i::text, 2, '0'),
       (select id from public.mine_sites limit 1),
       case when i <= 5 then 'Zone A' when i <= 10 then 'Zone B' when i <= 15 then 'Zone C' else 'Zone D' end,
       23.7400 + (((i - 1) / 5)) * 0.0035,
       86.4100 + (((i - 1) % 5)) * 0.0040,
       case when i % 7 = 0 then 'gps_referenced' else 'fixed_surveyed' end
from generate_series(1, 20) as i;

with n as (
  select id, (substr(node_code, 4)::int - 1) / 5 as r, (substr(node_code, 4)::int - 1) % 5 as c
  from public.sensor_nodes
)
insert into public.mesh_links (node_a_id, node_b_id, link_type, rssi)
select a.id, b.id,
       case when a.r = b.r then 'direct' else 'relay' end,
       -68 - (a.c * 3) - (a.r * 2)
from n a join n b
  on (a.r = b.r and b.c = a.c + 1) or (a.c = b.c and b.r = a.r + 1) or (b.r = a.r + 1 and b.c = a.c + 1);

insert into public.sensor_readings (node_id, tilt_x, tilt_y, displacement, crack_width, vibration, inter_node_distance, temperature, battery_pct, signal_strength, is_simulated)
select id, 0.04, 0.03, 1.2, 0.3, 0.08, 42.0, 31.5, 96, -71, true from public.sensor_nodes;

insert into public.validation_tests (test_name, expected_result, detected_result, detection_time_seconds, false_alarm, passed) values
 ('Stable Surface', 'No alert', 'No alert', 0, false, true),
 ('Gradual Deformation', 'Warning', 'Warning', 96, false, true),
 ('Increasing Deformation', 'High Risk', 'High Risk', 48, false, true),
 ('Single-Node Disturbance', 'No alert (uncorrelated)', 'No alert (uncorrelated)', 0, false, true),
 ('Communication Failure', 'Comms fault alert', 'Comms fault alert', 12, false, true);

alter publication supabase_realtime add table public.sensor_readings;
alter publication supabase_realtime add table public.alerts;
alter publication supabase_realtime add table public.risk_assessments;