"use client";

import { useEffect, useRef, useState } from "react";
import { useSiteStore } from "@/lib/store";

const GLYPHS = "01<>/\\[]#%&*+=ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Phase = "idle" | "running" | "done";

type DecodeTextProps = {
  text: string;
  className?: string;
  start?: boolean;
  caret?: boolean;
};

/**
 * Decode-in heading effect. The final text is always present for layout, SEO
 * and screen readers; the scrambled layer is purely decorative.
 */
export function DecodeText({ text, className = "", start = true, caret = false }: DecodeTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const reducedMotion = useSiteStore((s) => s.reducedMotion);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!start || reducedMotion || startedRef.current) return;
    const root = rootRef.current;
    if (!root) return;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      setPhase("running");

      const startedAt = performance.now();
      const duration = 560;

      const tick = (now: number) => {
        const elapsed = now - startedAt;
        const total = text.length;
        const revealed = Math.min(total, Math.floor((elapsed / duration) * total * 1.35));
        let out = "";

        for (let i = 0; i < total; i++) {
          const char = text[i];
          if (char === " " || char === "\n") {
            out += char;
          } else if (i < revealed) {
            out += char;
          } else {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        if (scrambleRef.current) scrambleRef.current.textContent = out;

        if (elapsed < duration) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          if (scrambleRef.current) scrambleRef.current.textContent = text;
          setPhase("done");
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [start, reducedMotion, text]);

  return (
    <span
      ref={rootRef}
      className={`decode ${className}`}
      data-ready={phase === "running" ? "false" : "true"}
      data-run={phase === "running" ? "true" : "false"}
    >
      <span className="decode-final" aria-hidden="true">
        {text}
      </span>
      <span className="decode-scramble" aria-hidden="true" ref={scrambleRef}>
        {text}
      </span>
      <span className="sr-only">{text}</span>
      {caret ? <span className="decode-caret" aria-hidden="true" /> : null}
    </span>
  );
}
