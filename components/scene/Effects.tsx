"use client";

import { useMemo } from "react";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import { useSiteStore } from "@/lib/store";

export function Effects({ mobile }: { mobile: boolean }) {
  const reducedMotion = useSiteStore((state) => state.reducedMotion);
  const chromaticOffset = useMemo(() => new Vector2(0.00035, 0.00035), []);

  if (reducedMotion) return null;

  return (
    <EffectComposer
      multisampling={mobile ? 0 : 4}
      enableNormalPass={false}
      resolutionScale={mobile ? 0.85 : 1}
    >
      <Bloom
        intensity={mobile ? 0.42 : 0.34}
        luminanceThreshold={0.82}
        luminanceSmoothing={0.28}
        mipmapBlur
      />
      <Vignette offset={0.26} darkness={0.72} eskil={false} />
      {!mobile ? (
        <>
          <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.033} />
          <ChromaticAberration offset={chromaticOffset} radialModulation={false} modulationOffset={0} />
        </>
      ) : null}
    </EffectComposer>
  );
}
