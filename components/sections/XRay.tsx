import { SectionHeading } from "@/components/ui/SectionHeading";
import { WireframeToggle } from "@/components/ui/ModeToggles";

const LAYERS = [
  { index: "01", label: "COMPOSITE SKIN", note: "Public claims" },
  { index: "02", label: "LOAD-BEARING STRUCTURE", note: "Illustrative" },
  { index: "03", label: "INTERNAL VOLUMES", note: "Illustrative" },
  { index: "04", label: "RAM / EDGE ALIGNMENT", note: "Public claims" },
];

export function XRay() {
  return (
    <section
      id="xray"
      data-section
      className="dossier-section relative min-h-[120svh]"
      aria-labelledby="xray-title"
    >
      <div className="section-sticky content-rail">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)] lg:items-center">
          <div className="content-panel">
            <SectionHeading
              code="07 // X-RAY"
              kicker="MATERIAL / WIREFRAME"
              title="STRIPPED / TO THE EDGES."
              titleId="xray-title"
            />

            <p className="section-sub mt-6" data-reveal>
              The wireframe pass exposes the silhouette that the coating is meant to
              protect. It is an illustrative structural view — not engineering data,
              material specification or a claim about internal systems.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2" data-reveal>
              <div className="border border-line bg-surface p-4">
                <p className="micro text-accent">AUTO CHANNEL</p>
                <p className="mt-2 text-[11px] leading-relaxed text-muted">
                  Weapons and X-Ray enter wireframe automatically. W toggles a global
                  override; the HUD reflects the effective state.
                </p>
              </div>
              <div className="border border-line bg-surface p-4">
                <p className="micro text-accent">CONTROL</p>
                <p className="mt-2 text-[11px] leading-relaxed text-muted">
                  Press <kbd className="border border-line px-1 py-0.5 text-[8px] text-ink">W</kbd>{" "}
                  or use the display control below. Free view remains available with{" "}
                  <kbd className="border border-line px-1 py-0.5 text-[8px] text-ink">F</kbd>.
                </p>
              </div>
            </div>

            <div className="mt-5" data-reveal>
              <WireframeToggle />
            </div>

            <div className="mt-6" data-reveal>
              <div className="panel-heading">
                <span className="micro text-muted">LAYER INDEX</span>
                <span className="micro">04 / ILLUSTRATIVE</span>
              </div>
              <ul>
                {LAYERS.map((layer) => (
                  <li
                    key={layer.index}
                    className="flex items-center justify-between gap-4 border-b border-line py-2.5"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[8px] text-dim">{layer.index}</span>
                      <span className="text-[9px] uppercase tracking-[0.12em] text-muted">
                        {layer.label}
                      </span>
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.08em] text-dim">
                      {layer.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hidden lg:block" data-reveal>
            <div className="ml-auto max-w-[260px] border border-accent/60 bg-base/60 p-4">
              <p className="micro text-accent">X-RAY // ACTIVE</p>
              <p className="mt-2 font-display text-4xl font-semibold uppercase leading-[0.86] tracking-[0.03em] text-ink">
                Skin
                <br />
                off.
              </p>
              <p className="mt-3 text-[9px] leading-relaxed tracking-[0.08em] text-dim">
                ILLUSTRATIVE MATERIAL VIEW
                <br />
                NOT ENGINEERING DATA
              </p>
              <div className="mt-4 h-10 w-full border border-line">
                <div className="h-full w-[62%] bg-accent/15" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
