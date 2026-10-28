import { SectionHeading } from "@/components/ui/SectionHeading";

const ENGINE_ROWS = [
  { label: "CONFIGURATION", value: "TWIN AFTERBURNING TURBOFAN" },
  { label: "PUBLIC DESIGNATION", value: "AL-41F1 / IZD. 117" },
  { label: "THRUST VECTORING", value: "3D // REPORTED" },
  { label: "SUPERCRUISE", value: "REPORTED CAPABILITY" },
];

export function Propulsion() {
  return (
    <section
      id="propulsion"
      data-section
      className="dossier-section relative min-h-[140svh]"
      aria-labelledby="propulsion-title"
    >
      <div className="section-sticky content-rail">
        <div className="w-full max-w-[540px]">
          <div className="content-panel">
            <SectionHeading
              code="04 // PROPULSION"
              kicker="TWIN ENGINE / VECTORED THRUST"
              title="HEAT, HELD IN THE SHADOW."
              titleId="propulsion-title"
            />

            <p className="section-sub mt-6" data-reveal>
              Two afterburning turbofans sit deep in the fuselage, their nozzles canted
              and vectorable. The design trades exposed mechanical detail for a narrower
              rear signature and sustained control at high angle of attack.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2" data-reveal>
              <div className="engine-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="micro">ENG 01</p>
                    <p className="mt-1 font-display text-[22px] font-semibold uppercase leading-none tracking-[0.04em] text-ink">
                      PORT
                    </p>
                  </div>
                  <span className="micro text-status-bright">ONLINE</span>
                </div>
                <div className="engine-meter mt-4" aria-hidden="true">
                  <span style={{ width: "82%" }} />
                </div>
                <p className="mt-2 text-[9px] uppercase tracking-[0.1em] text-dim">
                  VECTOR / PITCH + YAW
                </p>
              </div>

              <div className="engine-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="micro">ENG 02</p>
                    <p className="mt-1 font-display text-[22px] font-semibold uppercase leading-none tracking-[0.04em] text-ink">
                      STARBOARD
                    </p>
                  </div>
                  <span className="micro text-status-bright">ONLINE</span>
                </div>
                <div className="engine-meter mt-4" aria-hidden="true">
                  <span style={{ width: "82%" }} />
                </div>
                <p className="mt-2 text-[9px] uppercase tracking-[0.1em] text-dim">
                  VECTOR / PITCH + YAW
                </p>
              </div>
            </div>

            <dl className="mt-5" data-reveal>
              {ENGINE_ROWS.map((row, index) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-3"
                >
                  <dt className="flex items-center gap-3">
                    <span className="text-[8px] tabular-nums text-dim">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="data-label">{row.label}</span>
                  </dt>
                  <dd className="text-right font-mono text-[10px] uppercase tracking-[0.06em] text-ink">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex items-start gap-3 border-l border-accent bg-accent-soft px-4 py-3" data-reveal>
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
              <p className="text-[10px] leading-relaxed text-muted">
                Engine and supercruise claims are approximate / publicly reported.
                Production and prototype aircraft differ. No exhaust temperatures or
                thrust settings are represented as operational data.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-8 top-28 hidden 2xl:block" aria-hidden="true">
        <div className="text-right">
          <p className="micro">AFTERBURNER CHANNEL</p>
          <p className="mt-1 font-display text-3xl font-semibold tracking-[0.06em] text-accent">
            ARMED
          </p>
          <p className="mt-1 micro">SIMULATED INDICATOR</p>
        </div>
      </div>
    </section>
  );
}
