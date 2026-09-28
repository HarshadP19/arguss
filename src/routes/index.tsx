import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Network, ShieldCheck, Waypoints } from "lucide-react";
import { Logo } from "@/components/arguss/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARGUSS — Adaptive Remote Ground Subsidence Surveillance" },
      {
        name: "description",
        content:
          "ARGUSS monitors ground subsidence above underground coal mine panels in real time with a LoRa sensor mesh and an explainable AI risk engine.",
      },
      { property: "og:title", content: "ARGUSS — Ground Subsidence Surveillance" },
      {
        property: "og:description",
        content: "Sense the Ground. Predict the Risk. Protect the Surface. SIH 2026 · SIH26025.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const BULLETS = [
  {
    icon: Network,
    title: "Self-healing LoRa mesh",
    body: "20 surface nodes relay tilt, displacement, crack and vibration telemetry node-to-node — no cellular dependency underground-adjacent.",
  },
  {
    icon: Waypoints,
    title: "Spatially correlated AI fusion",
    body: "No single sensor can raise an alarm. Risk escalates only when neighbouring nodes, multiple channels and time all agree.",
  },
  {
    icon: ShieldCheck,
    title: "Explainable early warning",
    body: "Every risk level carries its reasoning — including why an escalation was deliberately withheld.",
  },
];

function Landing() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
      <section className="flex flex-col justify-between border-b border-border bg-surface px-8 py-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-14">
        <div>
          <Logo />
          <h1 className="mt-10 max-w-xl text-3xl font-semibold leading-tight tracking-tight lg:text-[38px]">
            Adaptive Remote Ground Subsidence Surveillance
          </h1>
          <p className="num mt-3 text-[13px] uppercase tracking-[0.18em] text-muted-foreground">
            Sense the Ground · Predict the Risk · Protect the Surface
          </p>
          <ul className="mt-10 max-w-xl space-y-5">
            {BULLETS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3 border-t border-border pt-5">
                <Icon className="mt-0.5 size-4 shrink-0 text-info" strokeWidth={1.9} />
                <div>
                  <h2 className="text-[13px] font-semibold">{title}</h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="num mt-10 text-[11px] text-muted-foreground">
          Prototype Environment · SIH 2026 · SIH26025 · Team HackTech Elites
        </p>
      </section>

      <section className="flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          <h2 className="text-[15px] font-semibold">Sign in to the monitoring console</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Credential sign-in is disabled in this prototype environment.
          </p>
          <div className="mt-7 space-y-4">
            <div>
              <label className="label-xs" htmlFor="email">
                Operator email
              </label>
              <input
                id="email"
                disabled
                placeholder="operator@arguss.in"
                className="num mt-1.5 w-full rounded border border-border bg-surface px-3 py-2 text-[13px] text-muted-foreground"
              />
            </div>
            <div>
              <label className="label-xs" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                disabled
                placeholder="••••••••"
                className="num mt-1.5 w-full rounded border border-border bg-surface px-3 py-2 text-[13px]"
              />
            </div>
            <button
              disabled
              className="w-full rounded border border-border bg-surface px-3 py-2 text-[13px] text-muted-foreground"
            >
              Sign in
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="label-xs">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Link
            to="/overview"
            className="flex w-full items-center justify-center gap-2 rounded border border-info/60 bg-info/15 px-3 py-2.5 text-[13px] font-semibold text-info transition-colors hover:bg-info/25"
          >
            Enter Demo Mode <ArrowRight className="size-4" />
          </Link>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            Loads the seeded Jharia Coalfield — Panel 7 site with the full 20-node mesh and the scripted
            demo sequence. No setup required.
          </p>
        </div>
      </section>
    </div>
  );
}
