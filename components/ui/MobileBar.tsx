"use client";

import { SECTIONS } from "@/lib/content";
import { useSiteStore } from "@/lib/store";
import { FreeViewToggle, WireframeToggle } from "@/components/ui/ModeToggles";

export function MobileBar() {
  const activeSection = useSiteStore((s) => s.activeSection);
  const modelReady = useSiteStore((s) => s.modelReady);
  const section = SECTIONS[activeSection] ?? SECTIONS[0];

  return (
    <div className="mobile-bar md:hidden" role="region" aria-label="Display controls">
      <div className="flex w-[76px] shrink-0 items-center gap-2 px-1">
        <span
          className={`h-1 w-1 shrink-0 ${modelReady ? "bg-status-bright" : "bg-accent"}`}
          aria-hidden="true"
        />
        <div className="leading-none">
          <p className="micro text-dim">SEC</p>
          <p className="mt-1 font-display text-[12px] tracking-[0.08em] text-ink">
            {section.index} {section.code}
          </p>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 gap-2">
        <WireframeToggle compact showKey={false} className="flex-1 px-2" />
        <FreeViewToggle compact showKey={false} className="flex-1 px-2" />
      </div>
    </div>
  );
}
