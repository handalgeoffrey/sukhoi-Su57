"use client";

import { useSiteStore } from "@/lib/store";

type ToggleProps = {
  compact?: boolean;
  showKey?: boolean;
  className?: string;
};

export function WireframeToggle({ compact = false, showKey = true, className = "" }: ToggleProps) {
  const activeSection = useSiteStore((s) => s.activeSection);
  const override = useSiteStore((s) => s.wireframeOverride);
  const setOverride = useSiteStore((s) => s.setWireframeOverride);

  const automatic = activeSection === 4 || activeSection === 6;
  const effective = override ?? automatic;
  const isAuto = override === null && automatic;

  return (
    <button
      type="button"
      className={`mode-toggle ${className}`}
      aria-pressed={effective}
      aria-keyshortcuts="W"
      aria-label={`Wireframe / X-ray mode: ${effective ? "on" : "off"}${
        isAuto ? " (automatic)" : ""
      }`}
      onClick={() => setOverride(!effective)}
    >
      <span className="flex items-center gap-2">
        <span>{compact ? "X-RAY" : "WIREFRAME"}</span>
        {isAuto ? <span className="text-[7px] text-dim">AUTO</span> : null}
      </span>
      <span className="flex items-center gap-2">
        <span>{effective ? "[ON]" : "[OFF]"}</span>
        {showKey ? <kbd aria-hidden="true">W</kbd> : null}
      </span>
    </button>
  );
}

export function FreeViewToggle({ compact = false, showKey = true, className = "" }: ToggleProps) {
  const freeView = useSiteStore((s) => s.freeView);
  const setFreeView = useSiteStore((s) => s.setFreeView);

  return (
    <button
      type="button"
      className={`mode-toggle ${className}`}
      aria-pressed={freeView}
      aria-keyshortcuts="F"
      aria-label={`Free view drag-to-orbit mode: ${freeView ? "on" : "off"}`}
      onClick={() => setFreeView(!freeView)}
    >
      <span>{compact ? "FREE" : "FREE VIEW"}</span>
      <span className="flex items-center gap-2">
        <span>{freeView ? "[ON]" : "[OFF]"}</span>
        {showKey ? <kbd aria-hidden="true">F</kbd> : null}
      </span>
    </button>
  );
}
