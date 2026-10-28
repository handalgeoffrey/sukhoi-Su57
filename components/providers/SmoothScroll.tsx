"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, scrollToId, setLenis } from "@/lib/scroll";
import { useSiteStore } from "@/lib/store";
import { clamp } from "@/lib/utils";

/**
 * Owns smooth scrolling and the scroll → camera mapping.
 * Lenis drives ScrollTrigger; ScrollTrigger reports a single global progress,
 * which is remapped across section-center anchors into camera-keyframe space.
 */
export function SmoothScroll() {
  const booted = useSiteStore((s) => s.booted);
  const reducedMotion = useSiteStore((s) => s.reducedMotion);
  const freeView = useSiteStore((s) => s.freeView);

  useEffect(() => {
    if (!booted) return;

    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    const triggers: ScrollTrigger[] = [];
    let anchors: number[] = [];

    if (!reducedMotion) {
      lenis = new Lenis({
        lerp: 0.09,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.4,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tickerFn = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    const measureAnchors = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0 || sections.length < 2) {
        anchors = [];
        return;
      }

      anchors = sections.map((section) => {
        const center = section.offsetTop + section.offsetHeight / 2 - window.innerHeight / 2;
        return clamp(center / maxScroll);
      });

      anchors[0] = 0;
      anchors[anchors.length - 1] = 1;

      // Keep the mapping monotonic even if sections overlap or are very short.
      for (let i = 1; i < anchors.length; i++) {
        if (anchors[i] <= anchors[i - 1]) {
          anchors[i] = Math.min(1, anchors[i - 1] + 0.0001);
        }
      }
    };

    const applyProgress = (progress: number) => {
      if (anchors.length < 2) return;
      let index = 0;
      while (index < anchors.length - 2 && progress > anchors[index + 1]) {
        index += 1;
      }
      const span = anchors[index + 1] - anchors[index];
      const t = span > 0 ? clamp((progress - anchors[index]) / span) : 0;
      const cameraProgress = index + t;
      const activeSection = Math.round(cameraProgress);
      useSiteStore.getState().setScroll(progress, cameraProgress, activeSection);
    };

    const globalTrigger = ScrollTrigger.create({
      id: "felon-scroll-progress",
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => applyProgress(self.progress),
      onRefresh: () => measureAnchors(),
    });
    triggers.push(globalTrigger);

    // Section reveals; initial styles are applied only after JS is running.
    if (!reducedMotion) {
      const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      revealItems.forEach((el) => {
        if (el.closest("#hero")) return;
        gsap.set(el, { opacity: 0, y: 16 });
        const st = ScrollTrigger.create({
          id: "felon-reveal",
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });
        triggers.push(st);
      });
    }

    // Intercept section anchors so Lenis handles the motion.
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href === "#main") return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      event.preventDefault();
      scrollToId(href);
    };

    document.addEventListener("click", onAnchorClick);

    const initialise = () => {
      measureAnchors();
      ScrollTrigger.refresh();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      applyProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    const raf = requestAnimationFrame(() => requestAnimationFrame(initialise));
    const delayedRefresh = window.setTimeout(() => {
      ScrollTrigger.refresh();
      measureAnchors();
    }, 600);

    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(delayedRefresh);
      document.removeEventListener("click", onAnchorClick);
      triggers.forEach((trigger) => trigger.kill());
      if (tickerFn) gsap.ticker.remove(tickerFn);
      gsap.ticker.lagSmoothing(500, 33);
      if (lenis) {
        lenis.destroy();
        setLenis(null);
      }
    };
  }, [booted, reducedMotion]);

  // Pause scrolling while the user orbits in free view.
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (freeView) lenis.stop();
    else lenis.start();
  }, [freeView, booted]);

  return null;
}
