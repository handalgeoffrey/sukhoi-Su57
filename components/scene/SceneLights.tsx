"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * Warm rim from the rear-left, cool fill from the front-right. A procedural
 * environment keeps the metal reading without shipping an HDR file.
 */
export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.16} />
      <hemisphereLight args={["#9db9d8", "#0a0b0a", 0.32]} />

      <directionalLight
        position={[-9, 7, 10]}
        intensity={2.1}
        color="#ffcf9a"
      />
      <directionalLight
        position={[9, 4, -10]}
        intensity={1.3}
        color="#9fc3e6"
      />
      <directionalLight
        position={[0, 12, -2]}
        intensity={0.7}
        color="#ffffff"
      />

      <Environment resolution={128} frames={1} background={false}>
        <color attach="background" args={["#050605"]} />
        <Lightformer
          form="rect"
          intensity={1.8}
          color="#fff3dd"
          position={[0, 7, 0]}
          scale={[12, 3, 1]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.25}
          color="#a9c9ea"
          position={[-7, 3, -5]}
          scale={[6, 2.4, 1]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          color="#ffb000"
          position={[7, 2.8, 6]}
          scale={[4, 1.4, 1]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Lightformer
          form="ring"
          intensity={0.85}
          color="#dfe8f3"
          position={[-3, 5, 8]}
          scale={3}
        />
      </Environment>
    </>
  );
}
