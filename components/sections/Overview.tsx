import { SectionHeading } from "@/components/ui/SectionHeading";

const STATS = [
  { label: "Length", value: "20.1", unit: "M" },
  { label: "Wingspan", value: "14.1", unit: "M" },
  { label: "Max speed", value: "2.0", unit: "MACH" },
  { label: "Crew", value: "01", unit: "PILOT" },
];

export function Overview() {
  return (
    <section
      id="overview"
      data-section
      className="dossier-section relative min-h-[120svh]"
      aria-labelledby="overview-title"
    >
      <div className="section-sticky content-rail">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,580px)_minmax(0,1fr)] lg:items-end">
          <div className="content-panel">
            <SectionHeading
              code="02 // OVERVIEW"
              kicker="PROGRAM CONTEXT"
              title="A shape built to disappear."
              titleId="overview-title"
            />

            <div className="mt-7 space-y-5 text-[13px] leading-[1.8] text-muted md:max-w-[58ch]">
              <p data-reveal>
                The Su-57 is a twin-engine multirole fighter designed around reduced
                radar signature, internal weapons carriage and high-agility flight
                control. It is the production result of the PAK FA programme, first
                flown as the T-50 in 2010.
              </p>
              <p data-reveal>
                Public accounts describe a blended airframe, composite structures,
                thrust-vectoring engines and an integrated sensor-fusion suite. Exact
                performance and signature figures are not public. Everything in this
                dossier is approximate and configuration-dependent.
              </p>
            </div>

            <div className="mt-7 flex items-center gap-3" data-reveal>
              <span className="status-dot" aria-hidden="true" />
              <span className="micro">PUBLIC DATA // APPROXIMATE FIGURES</span>
            </div>
          </div>

          <div className="lg:pb-2">
            <div className="stat-strip" data-reveal>
              {STATS.map((stat) => (
                <div className="stat-cell" key={stat.label}>
                  <p className="micro">{stat.label}</p>
                  <p className="stat-value">
                    {stat.value}
                    <span className="stat-unit">{stat.unit}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-line bg-base/70 px-4 py-3">
              <div>
                <p className="micro">DESIGNATION</p>
                <p className="mt-1 font-display text-[22px] font-semibold uppercase leading-none tracking-[0.05em] text-ink">
                  SU-57 // FELON
                </p>
              </div>
              <div className="text-right">
                <p className="micro">ORIGIN</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted">
                  RUSSIAN FEDERATION
                </p>
              </div>
            </div>

            <p className="mt-3 max-w-[46ch] text-[9px] leading-relaxed tracking-[0.08em] text-dim">
              Programme names and figures are drawn from public sources. No operational
              or classified data is represented here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
