"use client";

import { basePath } from "@/lib/site-config";

export function SceneFallback() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${basePath}/fallback-su57.svg`} alt="" />
      <div className="scene-fallback-tag">
        <span className="h-1 w-1 bg-accent" />
        STATIC RENDER // 3D LINK OFFLINE
      </div>
    </div>
  );
}
