"use client";

import { useEffect } from "react";
import { isWireframeActive, useSiteStore } from "@/lib/store";

/** Global keyboard shortcuts: W = wireframe / X-ray, F = free view, Esc = exit. */
export function KeyboardShortcuts() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target?.closest(
          'input, textarea, select, button[contenteditable="true"], [contenteditable="true"]',
        )
      ) {
        return;
      }

      const state = useSiteStore.getState();
      const key = event.key.toLowerCase();

      if (key === "w") {
        event.preventDefault();
        state.setWireframeOverride(!isWireframeActive(state));
      } else if (key === "f") {
        event.preventDefault();
        state.setFreeView(!state.freeView);
      } else if (key === "escape") {
        if (state.freeView) state.setFreeView(false);
        if (state.activeHotspot) state.setActiveHotspot(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}
