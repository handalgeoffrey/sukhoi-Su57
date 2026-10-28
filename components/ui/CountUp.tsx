"use client";

import { useEffect, useRef } from "react";
import { useSiteStore } from "@/lib/store";
import { formatNumber } from "@/lib/utils";

type CountUpProps = {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
};

/** Count-up number that stays final/accessible for screen readers and no-JS. */
export function CountUp({ value, decimals = 0, duration = 900, className = "" }: CountUpProps) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const reducedMotion = useSiteStore((s) => s.reducedMotion);
  const finalValue = formatNumber(value, decimals);

  useEffect(() => {
    const element = valueRef.current;
    if (!element) return;

    if (reducedMotion) {
      element.textContent = finalValue;
      return;
    }

    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || startedRef.current) return;
        observer.disconnect();
        startedRef.current = true;

        const startedAt = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - startedAt) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          element.textContent = formatNumber(value * eased, decimals);
          if (t < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            element.textContent = finalValue;
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.45 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, decimals, duration, reducedMotion, finalValue]);

  return (
    <span className={className}>
      <span ref={valueRef} aria-hidden="true">
        {finalValue}
      </span>
      <span className="sr-only">{finalValue}</span>
    </span>
  );
}
