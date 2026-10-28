"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  CanvasTexture,
  MathUtils,
  PointLight,
  SRGBColorSpace,
  SpriteMaterial,
} from "three";
import { useSiteStore } from "@/lib/store";

function createGlowTexture(): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255, 255, 240, 1)");
    gradient.addColorStop(0.14, "rgba(255, 208, 120, 0.95)");
    gradient.addColorStop(0.42, "rgba(255, 128, 26, 0.36)");
    gradient.addColorStop(1, "rgba(255, 72, 0, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

const NOZZLES: [number, number, number][] = [
  [-1.8, -0.04, 10.2],
  [1.8, -0.04, 10.2],
];

/** Additive exhaust bloom at the twin nozzles. Reads the camera progress. */
export function Afterburner() {
  const glowTexture = useMemo(() => createGlowTexture(), []);
  const glowMaterial = useMemo(
    () =>
      new SpriteMaterial({
        map: glowTexture,
        color: "#ff9d2e",
        transparent: true,
        opacity: 0.04,
        depthWrite: false,
        blending: AdditiveBlending,
        toneMapped: false,
      }),
    [glowTexture],
  );
  const light = useRef<PointLight>(null);
  const glowOpacity = useRef(0.04);

  useFrame((_state, delta) => {
    const site = useSiteStore.getState();
    const heat = Math.max(0, 1 - Math.abs(site.cameraProgress - 3) / 1.35);
    const active = site.activeSection === 3;
    const time = performance.now() / 1000;
    const flicker = site.reducedMotion ? 0 : Math.sin(time * 15) * 0.05 + Math.sin(time * 31) * 0.025;
    const target = 0.035 + heat * (0.72 + flicker) + (active ? 0.1 : 0);

    glowOpacity.current = MathUtils.damp(glowOpacity.current, target, 4, delta);
    glowMaterial.opacity = glowOpacity.current;

    if (light.current) {
      const targetIntensity = 1 + heat * 16;
      light.current.intensity = MathUtils.damp(light.current.intensity, targetIntensity, 4, delta);
    }
  });

  return (
    <group>
      {NOZZLES.map((position, index) => (
        <sprite
          key={index}
          position={position}
          scale={[1.65, 1.65, 1]}
          material={glowMaterial}
        />
      ))}
      <pointLight
        ref={light}
        position={[0, -0.05, 10.8]}
        color="#ff7a12"
        intensity={1}
        distance={11}
        decay={2}
      />
    </group>
  );
}
