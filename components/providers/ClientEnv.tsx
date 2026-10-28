"use client";

import { useEffect } from "react";
import { useSiteStore } from "@/lib/store";

/** Syncs media-query state into the shared store and restores scroll on reload. */
export function ClientEnv() {
  const setReducedMotion = useSiteStore((s) => s.setReducedMotion);
  const setIsMobile = useSiteStore((s) => s.setIsMobile);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setReducedMotion(motionQuery.matches);
      setIsMobile(mobileQuery.matches);
    };

    update();
    motionQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    return () => {
      motionQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
    };
  }, [setReducedMotion, setIsMobile]);

  return null;
}
