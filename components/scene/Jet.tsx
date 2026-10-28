"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  DoubleSide,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from "three";
import {
  MODEL_PITCH,
  MODEL_ROLL,
  MODEL_YAW,
  sampleSectionValues,
} from "@/lib/content";
import { pointer } from "@/lib/pointer";
import { useSiteStore } from "@/lib/store";
import { basePath } from "@/lib/site-config";
import { Afterburner } from "@/components/scene/Afterburner";
import { Hotspots } from "@/components/scene/Hotspots";

const MODEL_URL = `${basePath}/models/su57.glb`;
useGLTF.preload(MODEL_URL, false, true);

type SolidEntry = {
  material: MeshStandardMaterial;
  baseOpacity: number;
  baseTransparent: boolean;
  baseDepthWrite: boolean;
};

export function Jet() {
  const { scene } = useGLTF(MODEL_URL, false, true);
  const setModelReady = useSiteStore((s) => s.setModelReady);
  const setSceneError = useSiteStore((s) => s.setSceneError);

  const clone = useMemo(() => scene.clone(true), [scene]);
  const group = useRef<Group>(null);
  const solidEntries = useRef<SolidEntry[]>([]);
  const wireLines = useRef<LineSegments[]>([]);
  const wireMix = useRef(0);
  const xrayPrepared = useRef(false);

  const wireMaterial = useMemo(
    () =>
      new LineBasicMaterial({
        color: "#FFB000",
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
        toneMapped: false,
      }),
    [],
  );

  useEffect(() => {
    const entries: SolidEntry[] = [];
    const lines: LineSegments[] = [];

    try {
      clone.traverse((object) => {
        const mesh = object as Mesh;
        if (!mesh.isMesh) return;

        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.frustumCulled = true;

        const sourceMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        const clonedMaterials = sourceMaterials.map((source) => {
          const material = source.clone() as MeshStandardMaterial;
          const name = (material.name || "").toLowerCase();

          if (name.includes("glass")) {
            material.transparent = true;
            material.opacity = 0.38;
            material.roughness = 0.12;
            material.metalness = 0.45;
            material.envMapIntensity = 1.05;
            material.depthWrite = false;
            material.side = DoubleSide;
            material.color.set("#0d1719");
          } else if (name === "material") {
            material.envMapIntensity = 1.05;
            material.color.multiplyScalar(0.86);
            if (material.emissive) {
              material.emissive.set("#ffb000");
              material.emissiveIntensity = 0.55;
            }
          } else {
            material.envMapIntensity = 0.75;
            material.color.multiplyScalar(0.78);
            material.metalness = Math.min(material.metalness ?? 1, 0.58);
            material.roughness = Math.max(material.roughness ?? 0.5, 0.62);
          }

          material.needsUpdate = true;
          entries.push({
            material,
            baseOpacity: material.opacity,
            baseTransparent: material.transparent,
            baseDepthWrite: material.depthWrite,
          });
          return material;
        });

        mesh.material = Array.isArray(mesh.material) ? clonedMaterials : clonedMaterials[0];

        // Amber structural edges for the wireframe / X-ray pass.
        const edges = new EdgesGeometry(mesh.geometry, 26);
        const line = new LineSegments(edges, wireMaterial);
        line.renderOrder = 6;
        line.frustumCulled = false;
        line.visible = false;
        line.raycast = () => undefined;
        mesh.add(line);
        lines.push(line);
      });

      solidEntries.current = entries;
      wireLines.current = lines;

      if (group.current) {
        group.current.rotation.y = MODEL_YAW[0];
      }

      setModelReady(true);
      setSceneError(null);
    } catch (error) {
      console.error("[SU-57] Model preparation failed", error);
      setSceneError("model");
    }

    return () => {
      lines.forEach((line) => {
        line.parent?.remove(line);
        line.geometry.dispose();
      });
      entries.forEach((entry) => entry.material.dispose());
      solidEntries.current = [];
      wireLines.current = [];
      setModelReady(false);
    };
  }, [clone, wireMaterial, setModelReady, setSceneError]);

  useFrame((_state, delta) => {
    const site = useSiteStore.getState();
    const activeSection = site.activeSection;
    const wireframe =
      site.wireframeOverride ?? (activeSection === 4 || activeSection === 6);
    const targetMix = wireframe ? 1 : 0;
    wireMix.current = MathUtils.damp(wireMix.current, targetMix, 6, delta);

    const prepareXray = wireMix.current > 0.02;
    if (prepareXray !== xrayPrepared.current) {
      xrayPrepared.current = prepareXray;
      solidEntries.current.forEach((entry) => {
        entry.material.transparent = prepareXray ? true : entry.baseTransparent;
        entry.material.depthWrite = prepareXray ? false : entry.baseDepthWrite;
        entry.material.needsUpdate = true;
      });
    }

    solidEntries.current.forEach((entry) => {
      entry.material.opacity = MathUtils.lerp(entry.baseOpacity, 0.055, wireMix.current);
    });

    wireMaterial.opacity = wireMix.current * 0.88;
    wireLines.current.forEach((line) => {
      line.visible = wireMix.current > 0.004;
    });

    if (!group.current) return;
    const time = performance.now() / 1000;
    const reduced = site.reducedMotion;
    const heroWeight = Math.max(0, 1 - site.cameraProgress / 1.2);

    const yaw =
      sampleSectionValues(MODEL_YAW, site.cameraProgress) +
      (reduced ? 0 : Math.sin(time * 0.34) * 0.012) +
      (reduced ? 0 : pointer.x * 0.035 * heroWeight);
    const pitch =
      sampleSectionValues(MODEL_PITCH, site.cameraProgress) +
      (reduced ? 0 : Math.sin(time * 0.27) * 0.004);
    const roll =
      sampleSectionValues(MODEL_ROLL, site.cameraProgress) +
      (reduced ? 0 : Math.cos(time * 0.23) * 0.005);

    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, yaw, 3.2, delta);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, pitch, 3.2, delta);
    group.current.rotation.z = MathUtils.damp(group.current.rotation.z, roll, 3.2, delta);
    group.current.position.y = MathUtils.damp(
      group.current.position.y,
      reduced ? 0 : Math.sin(time * 0.55) * 0.03,
      2,
      delta,
    );
  });

  return (
    <group ref={group}>
      <primitive object={clone} />
      <Afterburner />
      <Hotspots />
    </group>
  );
}
