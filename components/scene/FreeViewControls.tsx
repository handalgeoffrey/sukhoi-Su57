"use client";

import { useCallback, useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useSiteStore } from "@/lib/store";
import { cameraState } from "@/lib/camera-state";

const IDLE_RETURN_MS = 6000;

/**
 * Drag-to-orbit is opt-in. On activation the orbit pivot is seeded from the
 * scroll camera's current look target so the hand-off does not jump.
 */
export function FreeViewControls() {
  const freeView = useSiteStore((state) => state.freeView);
  const setFreeView = useSiteStore((state) => state.setFreeView);
  const controls = useRef<OrbitControlsImpl>(null);
  const timer = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const scheduleReturn = useCallback(() => {
    clearTimer();
    timer.current = window.setTimeout(() => {
      setFreeView(false);
    }, IDLE_RETURN_MS);
  }, [clearTimer, setFreeView]);

  useEffect(() => {
    if (!freeView) {
      clearTimer();
      return;
    }

    const orbit = controls.current;
    if (orbit) {
      orbit.target.set(cameraState.look[0], cameraState.look[1], cameraState.look[2]);
      orbit.update();
    }
    scheduleReturn();

    return clearTimer;
  }, [freeView, clearTimer, scheduleReturn]);

  useEffect(
    () => () => {
      clearTimer();
    },
    [clearTimer],
  );

  return (
    <OrbitControls
      ref={controls}
      enabled={freeView}
      makeDefault={false}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.075}
      rotateSpeed={0.52}
      minPolarAngle={0.32}
      maxPolarAngle={Math.PI / 2 - 0.035}
      minDistance={7}
      maxDistance={46}
      onStart={() => {
        clearTimer();
      }}
      onEnd={() => {
        scheduleReturn();
      }}
    />
  );
}
