"use client";

import { SECTIONS } from "@/lib/content";
import { useSiteStore } from "@/lib/store";

export function SectionRail() {
  const activeSection = useSiteStore((s) => s.activeSection);

  return (
    <nav
      className="rail hidden lg:block"
      aria-label="Dossier sections"
    >
      <div className="px-3 pb-2">
        <span className="micro">NAV</span>
      </div>
      {SECTIONS.map((section, index) => {
        const active = index === activeSection;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rail-item"
            data-active={active}
            aria-current={active ? "location" : undefined}
          >
            <span className="rail-index tabular-nums">{section.index}</span>
            <span className="rail-label">{section.label}</span>
          </a>
        );
      })}
      <div className="mt-2 border-t border-line px-3 pt-2">
        <span className="micro text-dim">05.7</span>
      </div>
    </nav>
  );
}
