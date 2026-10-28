"use client";

import { useEffect, useRef } from "react";
import { SECTIONS } from "@/lib/content";
import { useSiteStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";
import { FreeViewToggle, WireframeToggle } from "@/components/ui/ModeToggles";

function Compass() {
  const rotorRef = useRef<SVGGElement>(null);
  const headingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const render = () => {
      const { cameraProgress } = useSiteStore.getState();
      const heading = (271 + cameraProgress * 11.7) % 360;
      if (rotorRef.current) rotorRef.current.setAttribute("transform", `rotate(${-heading} 50 50)`);
      if (headingRef.current) headingRef.current.textContent = `${Math.round(heading).toString().padStart(3, "0")}°`;
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="instrument" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="micro">HDG</span>
        <span className="micro text-dim">MAG</span>
      </div>
      <div className="relative mt-1">
        <svg viewBox="0 0 100 100" className="compass-svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="var(--border)" strokeOpacity="0.5" />
          <g ref={rotorRef} className="compass-rotor">
            {Array.from({ length: 72 }).map((_, index) => {
              const major = index % 6 === 0;
              return (
                <line
                  key={index}
                  x1="50"
                  y1={major ? 6 : 8}
                  x2="50"
                  y2="11"
                  stroke={major ? "var(--border-strong)" : "var(--border)"}
                  strokeWidth={major ? 1 : 0.5}
                  transform={`rotate(${index * 5} 50 50)`}
                />
              );
            })}
            <text x="50" y="19" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="monospace">
              N
            </text>
            <text x="81" y="53" textAnchor="middle" fill="var(--text-dim)" fontSize="4.5" fontFamily="monospace">
              E
            </text>
            <text x="50" y="85" textAnchor="middle" fill="var(--text-dim)" fontSize="4.5" fontFamily="monospace">
              S
            </text>
            <text x="19" y="53" textAnchor="middle" fill="var(--text-dim)" fontSize="4.5" fontFamily="monospace">
              W
            </text>
          </g>
          <path d="M50 1.5 47.5 7h5L50 1.5Z" fill="var(--accent)" />
          <path d="M50 98.5 47.5 93h5L50 98.5Z" fill="var(--border-strong)" />
          <circle cx="50" cy="50" r="1.4" fill="var(--accent)" />
          <path d="M50 40v7M50 53v7M40 50h7M53 50h7" stroke="var(--border-strong)" strokeWidth="0.6" />
        </svg>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <span
            ref={headingRef}
            className="bg-base/70 px-1 font-display text-[16px] font-semibold leading-none tracking-[0.04em] text-ink tabular-nums"
          >
            271°
          </span>
        </div>
      </div>
    </div>
  );
}

function Radar() {
  return (
    <div className="instrument hud-radar" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="micro">RDR</span>
        <span className="micro text-status-bright">SWEEP</span>
      </div>
      <div className="relative mx-auto mt-2 aspect-square w-[72%]">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="var(--border)" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="var(--border)" strokeOpacity="0.65" />
          <circle cx="50" cy="50" r="16" fill="none" stroke="var(--border)" strokeOpacity="0.5" />
          <path d="M50 2v96M2 50h96" stroke="var(--border)" strokeWidth="0.5" strokeOpacity="0.6" />
          <path d="M50 50 88 18" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.5" />
          <rect x="63" y="29" width="2" height="2" fill="var(--accent)" />
          <rect x="30" y="65" width="1.5" height="1.5" fill="var(--accent)" opacity="0.7" />
          <rect x="58" y="72" width="1.5" height="1.5" fill="var(--status-bright)" opacity="0.8" />
          <circle cx="50" cy="50" r="1.5" fill="var(--accent)" />
        </svg>
        <div className="radar-sweep" />
      </div>
      <div className="mt-1 flex justify-between">
        <span className="micro text-dim">360</span>
        <span className="micro text-dim">SIM</span>
      </div>
    </div>
  );
}

export function TelemetryRail() {
  const activeSection = useSiteStore((s) => s.activeSection);
  const altRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLSpanElement>(null);
  const altBarRef = useRef<HTMLSpanElement>(null);
  const speedBarRef = useRef<HTMLSpanElement>(null);
  const headingBarRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const render = () => {
      const { cameraProgress } = useSiteStore.getState();
      const t = performance.now() / 1000;
      const altitude = 10500 + cameraProgress * 1100 + Math.sin(t * 0.6) * 18;
      const speed = 0.62 + cameraProgress * 0.028 + Math.sin(t * 0.5) * 0.003;
      const heading = (271 + cameraProgress * 11.7) % 360;
      const progress = Math.min(1, cameraProgress / 7);

      if (altRef.current) altRef.current.textContent = formatNumber(Math.round(altitude));
      if (speedRef.current) speedRef.current.textContent = speed.toFixed(2);
      if (headingRef.current) headingRef.current.textContent = `${Math.round(heading).toString().padStart(3, "0")}°`;
      if (altBarRef.current) altBarRef.current.style.width = `${28 + progress * 58}%`;
      if (speedBarRef.current) speedBarRef.current.style.width = `${34 + progress * 46}%`;
      if (headingBarRef.current) headingBarRef.current.style.width = `${(heading / 360) * 100}%`;

      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, []);

  const section = SECTIONS[activeSection] ?? SECTIONS[0];

  return (
    <aside
      className="hud-rail hidden xl:flex"
      aria-label="Simulated telemetry and display controls"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="hud-label">SIM.TELEMETRY</span>
        <span className="micro text-dim">R3F // 60</span>
      </div>

      <div className="border border-line px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="micro">SECTOR</span>
          <span className="font-display text-sm tracking-[0.1em] text-accent">
            {section.index} // {section.code}
          </span>
        </div>
        <div className="mt-2 h-px w-full bg-line">
          <span className="block h-px bg-accent" style={{ width: `${((activeSection + 1) / 8) * 100}%` }} />
        </div>
      </div>

      <div className="telemetry" aria-hidden="true">
        <div>
          <div className="telemetry-row">
            <span className="hud-label">ALT</span>
            <span className="telemetry-value">
              <span ref={altRef}>11,600</span>
              <span className="ml-1 text-dim">M</span>
            </span>
          </div>
          <div className="telemetry-bar">
            <span ref={altBarRef} style={{ width: "34%" }} />
          </div>
        </div>
        <div>
          <div className="telemetry-row">
            <span className="hud-label">SPD</span>
            <span className="telemetry-value">
              <span ref={speedRef}>0.81</span>
              <span className="ml-1 text-dim">MACH</span>
            </span>
          </div>
          <div className="telemetry-bar">
            <span ref={speedBarRef} style={{ width: "52%" }} />
          </div>
        </div>
        <div>
          <div className="telemetry-row">
            <span className="hud-label">HDG</span>
            <span className="telemetry-value">
              <span ref={headingRef}>285°</span>
            </span>
          </div>
          <div className="telemetry-bar">
            <span ref={headingBarRef} style={{ width: "79%" }} />
          </div>
        </div>
      </div>

      <Compass />
      <Radar />

      <div className="mt-auto space-y-2">
        <WireframeToggle />
        <FreeViewToggle />
        <p className="micro leading-relaxed text-dim">
          SIMULATED VALUES // NOT FLIGHT DATA
          <br />
          W / F SHORTCUTS // ESC EXIT
        </p>
      </div>
    </aside>
  );
}
