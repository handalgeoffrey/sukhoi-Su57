"use client";

import { useEffect, useRef } from "react";
import { useSiteStore } from "@/lib/store";

/** Crosshair cursor with a live screen-coordinate readout. Fine pointers only. */
export function CrosshairCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useSiteStore((s) => s.reducedMotion);
  const isMobile = useSiteStore((s) => s.isMobile);

  useEffect(() => {
    if (reducedMotion || isMobile) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const cursor = cursorRef.current;
    const coords = coordsRef.current;
    if (!cursor || !coords) return;

    document.body.classList.add("has-custom-cursor");
    cursor.style.opacity = "0";

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let hasMoved = false;

    const render = () => {
      x += (targetX - x) * 0.55;
      y += (targetY - y) * 0.55;
      cursor.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      coords.textContent = `X ${Math.round(x).toString().padStart(4, "0")}  Y ${Math.round(y)
        .toString()
        .padStart(4, "0")}`;
      cursor.dataset.edgeX = x > window.innerWidth - 180 ? "left" : "right";
      cursor.dataset.edgeY = y > window.innerHeight - 48 ? "top" : "bottom";
      frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasMoved) {
        x = targetX;
        y = targetY;
        hasMoved = true;
        cursor.style.opacity = "1";
      }
    };

    const onLeave = () => {
      cursor.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [reducedMotion, isMobile]);

  return (
    <div ref={cursorRef} className="cursor-crosshair" aria-hidden="true">
      <span className="cursor-dot" />
      <span className="cursor-coords" ref={coordsRef}>
        X 0000 Y 0000
      </span>
    </div>
  );
}
