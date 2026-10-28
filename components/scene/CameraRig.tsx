"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { PerspectiveCamera } from "three";
import { CatmullRomCurve3, MathUtils, Vector3 } from "three";
import {
  CAMERA_KEYS_DESKTOP,
  CAMERA_KEYS_MOBILE,
  sampleSectionValues,
} from "@/lib/content";
import { cameraState } from "@/lib/camera-state";
import { pointer } from "@/lib/pointer";
import { useSiteStore } from "@/lib/store";
import { clamp } from "@/lib/utils";

type CameraRigProps = {
  mobile: boolean;
};

/**
 * Samples a single continuous Catmull-Rom spline through the per-section camera
 * poses. Damping lives here so free-view can take over without a jump.
 */
export function CameraRig({ mobile }: CameraRigProps) {
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  const keys = mobile ? CAMERA_KEYS_MOBILE : CAMERA_KEYS_DESKTOP;

  const positionCurve = useMemo(
    () =>
      new CatmullRomCurve3(
        keys.map((key) => new Vector3(key.pos[0], key.pos[1], key.pos[2])),
        false,
        "centripetal",
        0.5,
      ),
    [keys],
  );

  const targetCurve = useMemo(
    () =>
      new CatmullRomCurve3(
        keys.map((key) => new Vector3(key.target[0], key.target[1], key.target[2])),
        false,
        "centripetal",
        0.5,
      ),
    [keys],
  );

  const fovValues = useMemo(() => keys.map((key) => key.fov), [keys]);
  const desiredPosition = useRef(new Vector3());
  const desiredTarget = useRef(new Vector3());
  const currentPosition = useRef(new Vector3());
  const currentTarget = useRef(new Vector3());
  const forward = useRef(new Vector3());
  const initialised = useRef(false);
  const wasFreeView = useRef(false);

  useEffect(() => {
    const first = keys[0];
    camera.position.set(first.pos[0], first.pos[1], first.pos[2]);
    camera.up.set(0, 1, 0);
    currentPosition.current.set(first.pos[0], first.pos[1], first.pos[2]);
    currentTarget.current.set(first.target[0], first.target[1], first.target[2]);
    camera.lookAt(currentTarget.current);
    camera.fov = first.fov;
    camera.updateProjectionMatrix();
    initialised.current = true;
  }, [camera, keys]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
      pointer.active = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  useFrame((_state, delta) => {
    const site = useSiteStore.getState();
    if (site.freeView) {
      wasFreeView.current = true;
      return;
    }

    // Hand the current orbit pose back to the damped scroll rig without a cut.
    if (wasFreeView.current) {
      wasFreeView.current = false;
      currentPosition.current.copy(camera.position);
      camera.getWorldDirection(forward.current).multiplyScalar(12);
      currentTarget.current.copy(camera.position).add(forward.current);
    }

    const maxProgress = keys.length - 1;
    const progress = clamp(site.cameraProgress / maxProgress);
    const time = performance.now() / 1000;

    positionCurve.getPoint(progress, desiredPosition.current);
    targetCurve.getPoint(progress, desiredTarget.current);

    const heroWeight = Math.max(0, 1 - site.cameraProgress / 1.1);
    if (!site.reducedMotion && heroWeight > 0) {
      desiredPosition.current.x += pointer.x * 0.5 * heroWeight;
      desiredPosition.current.y += -pointer.y * 0.24 * heroWeight;
    }

    if (!site.reducedMotion) {
      desiredPosition.current.x += Math.sin(time * 0.17) * 0.1;
      desiredPosition.current.y += Math.cos(time * 0.21) * 0.045;
    }

    if (!initialised.current || site.reducedMotion) {
      currentPosition.current.copy(desiredPosition.current);
      currentTarget.current.copy(desiredTarget.current);
      camera.position.copy(currentPosition.current);
      camera.up.set(0, 1, 0);
      camera.lookAt(currentTarget.current);
      camera.fov = sampleSectionValues(fovValues, site.cameraProgress);
    } else {
      const lambda = 3.4;
      currentPosition.current.x = MathUtils.damp(
        currentPosition.current.x,
        desiredPosition.current.x,
        lambda,
        delta,
      );
      currentPosition.current.y = MathUtils.damp(
        currentPosition.current.y,
        desiredPosition.current.y,
        lambda,
        delta,
      );
      currentPosition.current.z = MathUtils.damp(
        currentPosition.current.z,
        desiredPosition.current.z,
        lambda,
        delta,
      );
      currentTarget.current.x = MathUtils.damp(
        currentTarget.current.x,
        desiredTarget.current.x,
        lambda + 1,
        delta,
      );
      currentTarget.current.y = MathUtils.damp(
        currentTarget.current.y,
        desiredTarget.current.y,
        lambda + 1,
        delta,
      );
      currentTarget.current.z = MathUtils.damp(
        currentTarget.current.z,
        desiredTarget.current.z,
        lambda + 1,
        delta,
      );

      camera.position.copy(currentPosition.current);
      camera.up.set(0, 1, 0);
      camera.lookAt(currentTarget.current);

      const targetFov = sampleSectionValues(fovValues, site.cameraProgress);
      camera.fov = MathUtils.damp(camera.fov, targetFov, 4, delta);
    }

    cameraState.look[0] = currentTarget.current.x;
    cameraState.look[1] = currentTarget.current.y;
    cameraState.look[2] = currentTarget.current.z;

    camera.updateProjectionMatrix();
  });

  return null;
}
