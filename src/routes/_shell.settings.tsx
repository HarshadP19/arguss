import { createFileRoute } from "@tanstack/react-router";
import { Lock, ShieldCheck, UserCog } from "lucide-react";
import { PageHeader } from "@/components/arguss/AppShell";
import { Panel } from "@/components/arguss/bits";
import { NODES } from "@/lib/arguss/nodes";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/settings")({
  head: () => ({
    meta: [
      { title: "Settings — ARGUSS" },
      {
        name: "description",
        content:
          "ARGUSS role-based access levels, transport security posture and node commissioning / baseline calibration register for Panel 7.",
      },
      { property: "og:title", content: "Settings — ARGUSS" },
      { property: "og:description", content: "Roles, security posture and baseline calibration register." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Settings,
});

const ROLES: Array<{ name: string; scope: string; caps: string[]; active?: boolean }> = [
  {
    name: "Admin",
    scope: "Full platform control",
    caps: ["Commission / decommission nodes", "Set baselines and thresholds", "Manage users and gateway keys"],
  },
  {
    name: "Safety Officer",
    scope: "Operational response",
    caps: ["Acknowledge and resolve alerts", "Annotate incidents", "Export validation and shift reports"],
    active: true,
  },
  {
    name: "Viewer",
    scope: "Read-only",
    caps: ["View dashboards, map and history", "No acknowledge, no configuration", "No data export"],
  },
];

const CAL_DATES = ["2026-08-04", "2026-08-04", "2026-08-05", "2026-08-05", "2026-08-06"];

function calibration(index: number) {
  const pending = index === 13 || index === 17;
  return {
    date: pending ? "—" : CAL_DATES[index % CAL_DATES.length]!,
    tilt: pending ? "—" : (0.02 + ((index * 7) % 11) * 0.004).toFixed(3),
    disp: pending ? "—" : (0.1 + ((index * 5) % 9) * 0.05).toFixed(2),
    vib: pending ? "—" : (0.004 + ((index * 3) % 7) * 0.001).toFixed(3),
    pending,
  };
}

function Settings() {
  const pendingCount = NODES.filter((_, i) => calibration(i).pending).length;

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Access model, security posture and baseline calibration register"
        right={<span className="num rounded border border-border px-2 py-0.5 text-[10px] text-muted-foreground">PROTOTYPE STUB</span>}
      />

      <div className="grid gap-3 px-4 pb-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="flex min-w-0 flex-col gap-3">
          <Panel title="Role-based access" hint="Displayed model — enforcement not wired in this prototype">
            <div className="flex flex-col gap-2">
              {ROLES.map((r) => (
                <div
                  key={r.name}
                  className={cn(
                    "rounded border bg-background px-2.5 py-2",
                    r.active ? "border-info/50" : "border-border",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <UserCog className="size-3.5 text-muted-foreground" />
                      {r.name}
                    </span>
                    {r.active ? (
                      <span className="num rounded border border-info/50 bg-info/10 px-1.5 py-0.5 text-[10px] text-info">
                        CURRENT SESSION
                      </span>
                    ) : (
                      <span className="label-xs">{r.scope}</span>
                    )}
                  </div>
                  <ul className="mt-1.5 space-y-1 text-[11px] text-muted-foreground">
                    {r.caps.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Security">
            <div className="flex flex-col gap-2">
              {[
                ["Transport", "TLS-encrypted (Supabase managed)", ShieldCheck],
                ["Data access", "Row-level security — public read, writes service-role only", Lock],
                ["Gateway auth", "Shared ingest key, held server-side, never exposed to the browser", Lock],
              ].map(([label, value, Icon]) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <div key={label as string} className="flex items-start gap-2 rounded border border-border bg-background px-2.5 py-2">
                    <I className="mt-0.5 size-3.5 shrink-0 text-normal" />
                    <div className="min-w-0">
                      <div className="label-xs">{label as string}</div>
                      <div className="mt-0.5 text-xs text-foreground/90">{value as string}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        <Panel
          title="Node commissioning & baseline calibration"
          hint={`20 nodes · ${20 - pendingCount} calibrated · ${pendingCount} pending`}
          bodyClassName="p-0"
        >
          <div className="max-h-[640px] overflow-auto">
            <table className="w-full min-w-[620px] text-left text-xs">
              <thead className="sticky top-0 bg-surface">
                <tr className="border-b border-border">
                  <th className="label-xs px-3 py-2">Node ID</th>
                  <th className="label-xs px-3 py-2">Zone</th>
                  <th className="label-xs px-3 py-2">Calibration date</th>
                  <th className="label-xs px-3 py-2">Baseline tilt (°)</th>
                  <th className="label-xs px-3 py-2">Baseline disp. (mm)</th>
                  <th className="label-xs px-3 py-2">Baseline vib. (g)</th>
                  <th className="label-xs px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {NODES.map((n, i) => {
                  const c = calibration(i);
                  return (
                    <tr key={n.code} className="border-b border-border/60 last:border-0">
                      <td className="num px-3 py-2 text-foreground">{n.code}</td>
                      <td className="px-3 py-2 text-muted-foreground">{n.zone}</td>
                      <td className="num px-3 py-2 text-muted-foreground">{c.date}</td>
                      <td className="num px-3 py-2 text-muted-foreground">{c.tilt}</td>
                      <td className="num px-3 py-2 text-muted-foreground">{c.disp}</td>
                      <td className="num px-3 py-2 text-muted-foreground">{c.vib}</td>
                      <td className="px-3 py-2">
                        <span
                          className={cn(
                            "num rounded border px-1.5 py-0.5 text-[10px]",
                            c.pending
                              ? "border-warning/50 bg-warning/10 text-warning"
                              : "border-normal/40 bg-normal/10 text-normal",
                          )}
                        >
                          {c.pending ? "PENDING" : "CALIBRATED"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
            Baselines follow the documented “Set the Baseline” step: 30 minutes of quiet-period samples per node are averaged
            after installation, and every later reading is interpreted as drift from that reference — not as an absolute value.
          </div>
        </Panel>
      </div>
    </div>
  );
}
