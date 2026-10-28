import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SPECS, SPEC_DISCLAIMER } from "@/lib/content";

export function Specs() {
  return (
    <section
      id="specs"
      data-section
      className="dossier-section relative min-h-[130svh]"
      aria-labelledby="specs-title"
    >
      <div className="section-sticky content-rail">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,620px)_minmax(0,1fr)] lg:items-end">
          <div className="content-panel">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <SectionHeading
                code="06 // SPECS"
                kicker="PUBLIC FIGURES / APPROXIMATE"
                title="THE PUBLIC NUMBERS."
                titleId="specs-title"
              />
              <span className="mt-1 shrink-0 border border-accent px-2.5 py-1.5 text-[8px] uppercase tracking-[0.14em] text-accent">
                APPROX.
              </span>
            </div>

            <p className="section-sub mt-6" data-reveal>
              A compact read-out of commonly cited figures. Sources disagree on
              details, prototypes differ from production aircraft, and no figure here
              is presented as an official specification.
            </p>

            <div className="mt-7 border-t border-line" data-reveal>
              {SPECS.map((spec, index) => (
                <div className="spec-row" key={spec.label}>
                  <div className="flex items-baseline gap-3">
                    <span className="w-5 shrink-0 font-mono text-[8px] tabular-nums text-dim">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="data-label">{spec.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="spec-value">
                      {typeof spec.value === "number" ? (
                        <CountUp value={spec.value} decimals={spec.decimals ?? 0} />
                      ) : (
                        spec.display
                      )}
                    </span>
                    <span className="spec-unit">{spec.unit}</span>
                    {spec.note ? <p className="mt-1 text-[8px] tracking-[0.05em] text-dim">{spec.note}</p> : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-3 border-l border-line-strong pl-3" data-reveal>
              <span className="mt-0.5 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
              <p className="text-[9px] leading-relaxed tracking-[0.04em] text-dim">
                {SPEC_DISCLAIMER}
              </p>
            </div>
          </div>

          <div className="hidden lg:block lg:pb-2" data-reveal>
            <div className="ml-auto max-w-[280px] border border-line bg-base/65 p-4">
              <p className="micro text-accent">PROFILE // STARBOARD</p>
              <p className="mt-2 font-display text-2xl font-semibold uppercase leading-none tracking-[0.04em] text-ink">
                Su-57
              </p>
              <div className="mt-4 space-y-2 border-t border-line pt-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="micro">LENGTH</span>
                  <span className="font-mono text-[10px] tabular-nums text-muted">20.1 M</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="micro">SPAN</span>
                  <span className="font-mono text-[10px] tabular-nums text-muted">14.1 M</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="micro">MAX MACH</span>
                  <span className="font-mono text-[10px] tabular-nums text-muted">2.0</span>
                </div>
              </div>
              <div className="tick-rule mt-4" aria-hidden="true" />
              <p className="mt-2 text-[8px] leading-relaxed tracking-[0.08em] text-dim">
                PUBLIC DATA ONLY
                <br />
                CONFIGURATION DEPENDENT
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
