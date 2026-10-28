"use client";

import { HOTSPOTS } from "@/lib/content";
import { useSiteStore } from "@/lib/store";

/** Mirror of the 3D hotspot markers for keyboard and mobile users. */
export function HotspotSelector() {
  const activeHotspot = useSiteStore((state) => state.activeHotspot);
  const setActiveHotspot = useSiteStore((state) => state.setActiveHotspot);
  const active = HOTSPOTS.find((hotspot) => hotspot.id === activeHotspot) ?? null;

  return (
    <div className="mt-7 border border-line bg-base/85" data-reveal>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="micro text-muted">INDEXED NODES</span>
        <span className="micro">04 // 04</span>
      </div>

      <ul>
        {HOTSPOTS.map((hotspot) => {
          const open = activeHotspot === hotspot.id;
          return (
            <li className="hotspot-list-item" key={hotspot.id}>
              <button
                type="button"
                className="hotspot-list-button px-4"
                aria-expanded={open}
                aria-controls="hotspot-detail"
                onClick={() => setActiveHotspot(open ? null : hotspot.id)}
              >
                <span className="flex items-center gap-3">
                  <span className="hotspot-list-index">{hotspot.index}</span>
                  <span>{hotspot.label}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="hidden text-[8px] tracking-[0.1em] text-dim sm:inline">
                    {hotspot.kicker}
                  </span>
                  <span className="text-accent" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        id="hotspot-detail"
        className="hotspot-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        {active ? (
          <>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="micro text-accent">
                  NODE {active.index} // {active.kicker}
                </p>
                <p className="mt-1 font-display text-xl font-semibold uppercase tracking-[0.04em] text-ink">
                  {active.label}
                </p>
              </div>
              <button
                type="button"
                className="flex min-h-11 min-w-11 items-center justify-center border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                onClick={() => setActiveHotspot(null)}
                aria-label={`Close ${active.label} details`}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <p className="mt-2.5 text-[11px] leading-[1.7] text-muted">
              {active.description}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-2.5">
              {active.meta.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[8px] uppercase tracking-[0.1em] text-dim">
                  <span className="h-px w-2 bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <span className="hotspot-dot shrink-0" aria-hidden="true" />
            <p className="text-[10px] leading-relaxed tracking-[0.08em] text-muted">
              SELECT A NODE — or tap a marker on the airframe — to expose the detail
              channel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
