"use client";

import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/utils";

let lenisInstance: Lenis | null = null;

export function setLenis(lenis: Lenis | null): void {
  lenisInstance = lenis;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/** Smooth-scroll to a section, using Lenis when available. */
export function scrollToId(id: string): void {
  if (typeof window === "undefined") return;
  const target = document.getElementById(id.replace(/^#/, ""));
  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: 0, duration: 1.4 });
  } else {
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }

  if (window.history.state !== null) {
    window.history.replaceState(null, "", `#${id.replace(/^#/, "")}`);
  }
}
