"use client";

import { useEffect, useMemo, useState, type RefObject } from "react";
import { Html } from "@react-three/drei";
import { HOTSPOTS, type Hotspot } from "@/lib/content";
import { useSiteStore } from "@/lib/store";

function HotspotMarker({ hotspot }: { hotspot: Hotspot }) {
  const activeHotspot = useSiteStore((state) => state.activeHotspot);
  const setActiveHotspot = useSiteStore((state) => state.setActiveHotspot);
  const active = activeHotspot === hotspot.id;

  return (
    <div
      className="hotspot-wrap"
      data-direction={hotspot.direction}
      data-visible="true"
    >
      <div className="hotspot-row" data-direction={hotspot.direction}>
        <button
          type="button"
          className="hotspot-btn"
          aria-label={`Hotspot: ${hotspot.label.toLowerCase()} — ${active ? "hide" : "show"} details`}
          aria-pressed={active}
          onClick={() => setActiveHotspot(active ? null : hotspot.id)}
        >
          <span className="hotspot-pulse" aria-hidden="true" />
          <span className="hotspot-dot" aria-hidden="true" />
        </button>
        <span className="hotspot-line" aria-hidden="true" />
        <span className="hotspot-label">
          <span className="text-accent" aria-hidden="true">
            {hotspot.index}
          </span>
          {hotspot.label}
        </span>
      </div>

      {active ? (
        <div className="hotspot-card" role="dialog" aria-label={`${hotspot.label} details`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="micro text-accent">
                {hotspot.index} // {hotspot.kicker}
              </p>
              <p className="mt-1 font-display text-[19px] font-semibold uppercase leading-none tracking-[0.04em] text-ink">
                {hotspot.label}
              </p>
            </div>
            <button
              type="button"
              className="hotspot-close"
              onClick={() => setActiveHotspot(null)}
              aria-label={`Close ${hotspot.label} details`}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <p>{hotspot.description}</p>
          <ul className="mt-3 space-y-1 border-t border-line pt-2.5">
            {hotspot.meta.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[8px] uppercase tracking-[0.12em] text-dim">
                <span className="h-px w-2 bg-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/** HTML labels anchored to the model. They live inside the rotating Jet group. */
export function Hotspots() {
  const activeSection = useSiteStore((state) => state.activeSection);
  const freeView = useSiteStore((state) => state.freeView);
  const activeHotspot = useSiteStore((state) => state.activeHotspot);
  const setActiveHotspot = useSiteStore((state) => state.setActiveHotspot);
  const visible = activeSection === 2 && !freeView;
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setHost(document.getElementById("hotspot-layer"));
  }, []);

  const portal = useMemo(
    () => ({ current: host as HTMLElement | null }) as RefObject<HTMLElement>,
    [host],
  );

  useEffect(() => {
    if (!visible && activeHotspot) setActiveHotspot(null);
  }, [visible, activeHotspot, setActiveHotspot]);

  if (!visible || !host) return null;

  return (
    <>
      {HOTSPOTS.map((hotspot) => (
        <group key={hotspot.id} position={hotspot.position}>
          <Html
            portal={portal}
            wrapperClass="hotspot-html"
            zIndexRange={[30, 0]}
            style={{ pointerEvents: "none" }}
          >
            <HotspotMarker hotspot={hotspot} />
          </Html>
        </group>
      ))}
    </>
  );
}
