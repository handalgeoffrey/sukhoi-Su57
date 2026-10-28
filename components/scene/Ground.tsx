"use client";

import { Grid } from "@react-three/drei";

/** Infinite survey grid and a single landing-pad reticle under the aircraft. */
export function Ground() {
  return (
    <group position={[0, -2.6, 0]}>
      <Grid
        args={[90, 90]}
        cellSize={1}
        cellThickness={0.45}
        cellColor="#1a1e1a"
        sectionSize={5}
        sectionThickness={0.75}
        sectionColor="#2d332d"
        fadeDistance={46}
        fadeStrength={2.4}
        followCamera={false}
        infiniteGrid
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[8.4, 8.45, 128]} />
        <meshBasicMaterial color="#FFB000" transparent opacity={0.16} depthWrite={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <ringGeometry args={[10.7, 10.72, 128]} />
        <meshBasicMaterial color="#FFB000" transparent opacity={0.08} depthWrite={false} />
      </mesh>

      {[0, 90, 180, 270].map((angle) => (
        <mesh
          key={angle}
          rotation={[-Math.PI / 2, 0, (angle * Math.PI) / 180]}
          position={[0, 0.015, 0]}
        >
          <planeGeometry args={[0.03, 2.4]} />
          <meshBasicMaterial color="#FFB000" transparent opacity={0.34} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
