"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points } from "three";
import { useSiteStore } from "@/lib/store";

/** Sparse atmospheric particles. Two tiny planes of data dust. */
export function DustField() {
  const points = useRef<Points>(null);
  const reducedMotion = useSiteStore((state) => state.reducedMotion);

  const positions = useMemo(() => {
    const count = 320;
    const array = new Float32Array(count * 3);
    let seed = 41;

    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < count; i++) {
      array[i * 3] = (random() - 0.5) * 42;
      array[i * 3 + 1] = random() * 15 - 1.8;
      array[i * 3 + 2] = (random() - 0.5) * 46;
    }
    return array;
  }, []);

  useFrame((_state, delta) => {
    if (!points.current || reducedMotion) return;
    points.current.rotation.y += delta * 0.007;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffcf9a"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.42}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}
