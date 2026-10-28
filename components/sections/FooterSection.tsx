import { DISCLAIMER, SPEC_DISCLAIMER } from "@/lib/content";
import { JetMark } from "@/components/ui/JetMark";

const INDEX_LINKS = [
  { href: "#overview", label: "OVERVIEW", index: "02" },
  { href: "#airframe", label: "AIRFRAME", index: "03" },
  { href: "#weapons", label: "WEAPONS", index: "05" },
  { href: "#specs", label: "SPECS", index: "06" },
  { href: "#xray", label: "X-RAY", index: "07" },
];

export function FooterSection() {
  return (
    <footer
      id="footer"
      data-section
      className="dossier-section relative z-10 flex min-h-[100svh] flex-col justify-between border-t border-line bg-base/75 pt-24"
      aria-labelledby="footer-title"
    >
      <div className="content-rail">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <span className="section-code">
            <span className="bracket">[</span>
            08 <span className="text-dim">//</span> END
            <span className="bracket">]</span>
            <span className="tick" aria-hidden="true" />
          </span>
          <span className="micro text-dim">END OF DOSSIER // PUBLIC ARCHIVE</span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <h2 id="footer-title" className="footer-wordmark">
              <span>SU-57</span>
              <span className="footer-wordmark-outline">FELON</span>
            </h2>
            <p className="mt-5 max-w-[56ch] text-[12px] leading-[1.8] text-muted" data-reveal>
              A fan-built study of a public airframe. Geometry, materials and interface
              are interpretive. All figures are approximate, configuration-dependent and
              drawn from public reporting.
            </p>
          </div>

          <nav aria-label="Dossier index" className="lg:pb-2" data-reveal>
            <p className="micro mb-2 text-dim">INDEX // RETURN</p>
            {INDEX_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex min-h-11 items-center justify-between border-b border-line text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[8px] text-dim">{link.index}</span>
                  {link.label}
                </span>
                <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 grid gap-6 border-t border-line pt-6 md:grid-cols-3" data-reveal>
          <div>
            <p className="micro text-accent">DISCLAIMER</p>
            <p className="mt-2 max-w-[42ch] text-[10px] leading-relaxed text-muted">
              {DISCLAIMER}
            </p>
          </div>
          <div>
            <p className="micro text-accent">DATA BASIS</p>
            <p className="mt-2 max-w-[42ch] text-[10px] leading-relaxed text-muted">
              {SPEC_DISCLAIMER}
            </p>
          </div>
          <div>
            <p className="micro text-accent">BUILD</p>
            <p className="mt-2 text-[10px] leading-relaxed text-muted">
              NEXT.JS / REACT THREE FIBER / THREE.JS
              <br />
              JETBRAINS MONO / OSWALD
              <br />
              MODEL // LOCAL SU-57 GLB
            </p>
          </div>
        </div>
      </div>

      <div className="content-rail mt-14">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-5">
          <div className="flex items-center gap-3">
            <JetMark className="h-5 w-5 text-accent" />
            <span className="micro text-dim">UNOFFICIAL FAN PROJECT // 2026</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="micro hidden text-dim sm:inline">NO CLASSIFIED DATA</span>
            <a
              href="#hero"
              className="group inline-flex min-h-11 items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
            >
              Return to start
              <span className="text-accent transition-transform group-hover:-translate-y-0.5" aria-hidden="true">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
