"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSiteStore } from "@/lib/store";
import { SceneFallback } from "@/components/scene/SceneFallback";

const SceneCanvas = dynamic(
  () => import("@/components/scene/SceneCanvas").then((module) => module.SceneCanvas),
  { ssr: false, loading: () => null },
);

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!context) return false;
    const extension = (context as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    extension?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * Client-only scene shell. WebGL support is checked before the lazy chunk is
 * requested; failures fall through to a static blueprint.
 */
export function SceneMount() {
  const [mounted, setMounted] = useState(false);
  const freeView = useSiteStore((state) => state.freeView);
  const sceneError = useSiteStore((state) => state.sceneError);
  const setSceneError = useSiteStore((state) => state.setSceneError);

  useEffect(() => {
    if (!supportsWebGL()) {
      setSceneError("webgl");
      return;
    }
    setMounted(true);
  }, [setSceneError]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-freeview", freeView);
    return () => document.documentElement.classList.remove("is-freeview");
  }, [freeView]);

  const showScene = mounted && !sceneError;

  return (
    <div className="scene-layer" data-freeview={freeView} data-ready={showScene}>
      {showScene ? <SceneCanvas /> : null}
      {sceneError ? <SceneFallback /> : null}
    </div>
  );
}
