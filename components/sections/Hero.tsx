import { DecodeText } from "@/components/ui/DecodeText";
import { JetMark } from "@/components/ui/JetMark";

const HERO_META = [
  { label: "PROGRAM", value: "T-50 / PAK FA" },
  { label: "FIRST FLIGHT", value: "29 JAN 2010" },
  { label: "ROLE", value: "MULTIROLE" },
  { label: "DATA BASIS", value: "PUBLIC / APPROX." },
];

export function Hero() {
  return (
    <section
      id="hero"
      data-section
      className="dossier-section relative min-h-[100svh]"
      aria-labelledby="hero-title"
    >
      <div className="content-rail flex min-h-[100svh] flex-col justify-end pb-10 pt-24 md:pb-14 md:pt-28">
        <div className="hero-copy w-full max-w-[980px]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="section-code">
              <span className="bracket">[</span>
              01 <span className="text-dim">//</span> FELON
              <span className="bracket">]</span>
              <span className="tick" aria-hidden="true" />
            </span>
            <span className="micro hidden md:inline">AIRFRAME DOSSIER // PUBLIC ARCHIVE</span>
            <span className="h-1 w-1 bg-accent" aria-hidden="true" />
            <span className="micro text-accent">SIGNAL ACQUIRED</span>
          </div>

          <h1 id="hero-title" className="hero-title mt-5">
            <span className="hero-title-solid">SU-57</span>
            <span className="hero-title-outline">
              <DecodeText text="FELON" />
            </span>
          </h1>

          <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12">
            <div>
              <p className="max-w-[54ch] text-[13px] leading-[1.8] text-muted md:text-sm">
                A cinematic 3D dossier of the Sukhoi Su-57 — Russia&apos;s twin-engine,
                thrust-vectoring fifth-generation fighter. Built from public reporting,
                open imagery and an approximate airframe study.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="hud-chip">5TH GEN // PUBLIC STUDY</span>
                <span className="hud-chip">LOW OBSERVABLE // REPORTED</span>
                <span className="hud-chip text-status-bright">UNOFFICIAL</span>
              </div>
            </div>

            <div className="hidden items-center gap-3 md:flex" aria-hidden="true">
              <JetMark className="h-12 w-12 text-accent/85" />
              <div className="border-l border-line pl-3">
                <p className="micro text-dim">NATO REPORTING NAME</p>
                <p className="font-display text-lg font-semibold uppercase leading-none tracking-[0.08em] text-accent">
                  Felon
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-9">
            <a className="btn btn-primary" href="#overview">
              Begin inspection <span aria-hidden="true">→</span>
            </a>
            <a className="btn" href="#specs">
              Read specifications
            </a>
          </div>
        </div>

        <div className="hero-meta mt-10 grid grid-cols-2 border-y border-line md:mt-14 md:grid-cols-4">
          {HERO_META.map((item, index) => (
            <div
              key={item.label}
              className={`hero-meta-cell ${index === 0 ? "md:border-l-0" : ""}`}
            >
              <p className="micro">{item.label}</p>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-cue hidden lg:flex" aria-hidden="true">
        <span className="micro">SCROLL TO ADVANCE</span>
        <span className="scroll-cue-line" />
        <span className="text-accent">↓</span>
      </div>

      <div className="pointer-events-none absolute right-6 top-20 hidden items-center gap-2 xl:flex" aria-hidden="true">
        <span className="micro text-dim">CAM.01</span>
        <span className="h-px w-10 bg-accent/60" />
        <span className="micro text-accent">LIVE</span>
      </div>
    </section>
  );
}
