"use client";

import { useSiteStore } from "@/lib/store";

export function FreeViewBanner() {
  const freeView = useSiteStore((s) => s.freeView);
  const setFreeView = useSiteStore((s) => s.setFreeView);

  if (!freeView) return null;

  return (
    <div className="freeview-banner" role="status" aria-live="polite">
      <span className="h-1 w-1 bg-accent" aria-hidden="true" />
      <span className="hidden sm:inline">FREE VIEW // DRAG OR TOUCH TO ORBIT</span>
      <span className="sm:hidden">FREE VIEW // DRAG TO ORBIT</span>
      <span className="text-dim">AUTO-RETURN 6S</span>
      <button
        type="button"
        onClick={() => setFreeView(false)}
        className="min-h-11 border border-accent px-3 text-[9px] tracking-[0.12em] text-accent transition-colors hover:bg-accent hover:text-base"
      >
        RETURN [F]
      </button>
    </div>
  );
}
