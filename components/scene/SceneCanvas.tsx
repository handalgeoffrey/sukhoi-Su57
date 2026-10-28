"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { useSiteStore } from "@/lib/store";
import { SceneLights } from "@/components/scene/SceneLights";
import { Ground } from "@/components/scene/Ground";
import { DustField } from "@/components/scene/DustField";
import { Jet } from "@/components/scene/Jet";
import { CameraRig } from "@/components/scene/CameraRig";
import { FreeViewControls } from "@/components/scene/FreeViewControls";
import { Effects } from "@/components/scene/Effects";
import { SceneErrorBoundary } from "@/components/scene/SceneErrorBoundary";

export function SceneCanvas() {
  const isMobile = useSiteStore((state) => state.isMobile);
  const setSceneError = useSiteStore((state) => state.setSceneError);

  return (
    <SceneErrorBoundary onError={setSceneError}>
      <Canvas
        className="scene-canvas"
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [10.0, 5.0, -27.0], fov: 35, near: 0.1, far: 140 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.92;
          gl.setClearColor("#0a0b0a", 1);
          gl.domElement.setAttribute("aria-hidden", "true");
          gl.domElement.setAttribute("tabindex", "-1");
          setSceneError(null);
        }}
      >
        <color attach="background" args={["#0a0b0a"]} />
        <fog attach="fog" args={["#0a0b0a", 28, 92]} />

        <Suspense fallback={null}>
          <SceneLights />
          <Ground />
          <DustField />
          <Jet />
        </Suspense>

        <CameraRig mobile={isMobile} />
        <FreeViewControls />
        <Effects mobile={isMobile} />
      </Canvas>
    </SceneErrorBoundary>
  );
}
