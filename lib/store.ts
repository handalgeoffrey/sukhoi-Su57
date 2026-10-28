"use client";

import { create } from "zustand";
import type { HotspotId } from "@/lib/content";

type SiteState = {
  booted: boolean;
  modelReady: boolean;
  sceneError: string | null;
  scrollProgress: number;
  cameraProgress: number;
  activeSection: number;
  activeHotspot: HotspotId | null;
  /** null = automatic (wireframe in Weapons / X-Ray), true/false = user override */
  wireframeOverride: boolean | null;
  freeView: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  setBooted: (booted: boolean) => void;
  setModelReady: (ready: boolean) => void;
  setSceneError: (error: string | null) => void;
  setScroll: (scrollProgress: number, cameraProgress: number, activeSection: number) => void;
  setActiveSection: (index: number) => void;
  setActiveHotspot: (hotspot: HotspotId | null) => void;
  setWireframeOverride: (value: boolean | null) => void;
  setFreeView: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  setIsMobile: (value: boolean) => void;
};

export const useSiteStore = create<SiteState>((set) => ({
  booted: false,
  modelReady: false,
  sceneError: null,
  scrollProgress: 0,
  cameraProgress: 0,
  activeSection: 0,
  activeHotspot: null,
  wireframeOverride: null,
  freeView: false,
  reducedMotion: false,
  isMobile: false,
  setBooted: (booted) => set({ booted }),
  setModelReady: (modelReady) => set({ modelReady }),
  setSceneError: (sceneError) => set({ sceneError }),
  setScroll: (scrollProgress, cameraProgress, activeSection) =>
    set({ scrollProgress, cameraProgress, activeSection }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setActiveHotspot: (activeHotspot) => set({ activeHotspot }),
  setWireframeOverride: (wireframeOverride) => set({ wireframeOverride }),
  setFreeView: (freeView) => set({ freeView }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setIsMobile: (isMobile) => set({ isMobile }),
}));

/** Effective wireframe state: user override wins, otherwise auto in Weapons/X-Ray. */
export function isWireframeActive(
  state: Pick<SiteState, "wireframeOverride" | "activeSection">,
): boolean {
  return state.wireframeOverride ?? (state.activeSection === 4 || state.activeSection === 6);
}
