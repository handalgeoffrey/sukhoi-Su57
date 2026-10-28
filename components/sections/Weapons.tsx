import { SectionHeading } from "@/components/ui/SectionHeading";
import { WeaponsSchematic } from "@/components/sections/WeaponsSchematic";

const CARRIAGE_ROWS = [
  {
    index: "01",
    label: "FORWARD FUSELAGE BAYS",
    detail: "Long-range air-to-air / air-to-surface class",
  },
  {
    index: "02",
    label: "WING-ROOT BAYS",
    detail: "Short-range air-to-air class",
  },
  {
    index: "03",
    label: "EXTERNAL STATIONS",
    detail: "Optional stores / signature trade",
  },
];

export function Weapons() {
  return (
    <section
      id="weapons"
      data-section
      className="dossier-section relative min-h-[150svh]"
      aria-labelledby="weapons-title"
    >
      <div className="section-sticky content-rail">
        <div className="w-full">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionHeading
              code="05 // WEAPONS"
              kicker="INTERNAL CARRIAGE / SIGNATURE"
              title="INTERNAL / CARRIAGE."
              titleId="weapons-title"
            />
            <div className="mb-1 flex items-center gap-3 border border-line bg-base/70 px-3 py-2">
              <span className="status-dot" aria-hidden="true" />
              <span className="micro text-accent">AUTO WIREFRAME</span>
              <span className="micro text-dim">PLAN VIEW</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,370px)_minmax(0,1fr)] lg:items-end">
            <div className="content-panel">
              <p className="section-sub" data-reveal>
                Internal carriage keeps stores out of the airstream and away from
                radar. Public reporting describes four principal bay volumes: two
                forward fuselage bays and two wing-root bays, with external stations
                available at a signature cost.
              </p>

              <div className="mt-6" data-reveal>
                {CARRIAGE_ROWS.map((row) => (
                  <div
                    key={row.index}
                    className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-line py-3.5"
                  >
                    <span className="font-mono text-[9px] tracking-[0.12em] text-accent">
                      {row.index}
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-ink">
                        {row.label}
                      </p>
                      <p className="mt-1 text-[10px] leading-relaxed text-muted">
                        {row.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-3 border border-line bg-surface px-4 py-3" data-reveal>
                <span className="mt-1 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                <p className="text-[9px] leading-relaxed tracking-[0.05em] text-dim">
                  Bay arrangement and store classes are approximate / publicly
                  reported. This is not an operational loadout chart and no current
                  deployment is represented.
                </p>
              </div>
            </div>

            <div className="min-w-0" data-reveal>
              <WeaponsSchematic />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
