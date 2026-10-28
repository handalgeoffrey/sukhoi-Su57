import { SectionHeading } from "@/components/ui/SectionHeading";
import { HotspotSelector } from "@/components/sections/HotspotSelector";

export function Airframe() {
  return (
    <section
      id="airframe"
      data-section
      className="dossier-section relative min-h-[150svh]"
      aria-labelledby="airframe-title"
    >
      <div className="section-sticky content-rail">
        <div className="w-full max-w-[540px]">
          <div className="content-panel">
            <SectionHeading
              code="03 // AIRFRAME"
              kicker="LOW OBSERVABLE / FLIGHT CONTROL"
              title="AIRFRAME"
              titleId="airframe-title"
            />

            <p className="section-sub mt-6" data-reveal>
              Signature shaping is not a coating applied at the end. It is the
              airframe: blended surfaces, aligned edges, buried engines and inlets that
              hide the fan face. Four public points of interest are indexed here.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2" data-reveal>
              <span className="micro text-accent">FIG. 03-A // LEFT ASPECT</span>
              <span className="micro">HOTSPOT LINK ACTIVE</span>
              <span className="status-dot" aria-hidden="true" />
            </div>

            <HotspotSelector />
          </div>

          <div className="mt-3 flex items-center justify-between border border-line bg-base/60 px-3 py-2">
            <span className="micro">RAM / GEOMETRY / INTERNAL CARRIAGE</span>
            <span className="micro text-dim">APPROX. PUBLIC DATA</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-8 top-28 hidden 2xl:block" aria-hidden="true">
        <div className="flex items-center gap-3">
          <span className="h-px w-14 bg-line-strong" />
          <div className="text-right">
            <p className="micro">AIRFRAME AXIS</p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.1em] text-muted">
              X 00.00 / Y 00.39 / Z −06.22
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
