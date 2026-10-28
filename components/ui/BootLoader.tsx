"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { BOOT_LINES, BUILD_TAG, COORD_TAG, DISCLAIMER } from "@/lib/content";
import { useSiteStore } from "@/lib/store";
import { JetMark } from "@/components/ui/JetMark";

export function BootLoader() {
  const progress = useProgress((state) => state.progress);
  const loaded = useProgress((state) => state.loaded);
  const total = useProgress((state) => state.total);
  const active = useProgress((state) => state.active);

  const booted = useSiteStore((s) => s.booted);
  const modelReady = useSiteStore((s) => s.modelReady);
  const sceneError = useSiteStore((s) => s.sceneError);
  const reducedMotion = useSiteStore((s) => s.reducedMotion);
  const setBooted = useSiteStore((s) => s.setBooted);

  const [visible, setVisible] = useState(!booted);
  const [leaving, setLeaving] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [step, setStep] = useState(0);
  const [clock, setClock] = useState("--:--:--");
  const leavingRef = useRef(false);
  const finishTimer = useRef<number | null>(null);

  const finish = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    finishTimer.current = window.setTimeout(
      () => {
        setBooted(true);
        setVisible(false);
      },
      reducedMotion ? 20 : 620,
    );
  }, [reducedMotion, setBooted]);

  useEffect(() => {
    if (!visible) {
      document.documentElement.classList.remove("is-booting");
      return;
    }
    document.documentElement.classList.add("is-booting");
    return () => document.documentElement.classList.remove("is-booting");
  }, [visible]);

  useEffect(() => {
    const timer = window.setTimeout(() => setMinElapsed(true), reducedMotion ? 300 : 1900);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setStep(BOOT_LINES.length);
      return;
    }
    const timer = window.setInterval(() => {
      setStep((current) => {
        if (current >= BOOT_LINES.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 150);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    const updateClock = () => {
      const stamp = new Intl.DateTimeFormat("en-GB", {
        timeZone: "UTC",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());
      setClock(stamp);
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!modelReady || !minElapsed || sceneError || leavingRef.current) return;
    const timer = window.setTimeout(finish, 450);
    return () => window.clearTimeout(timer);
  }, [modelReady, minElapsed, sceneError, finish]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && (modelReady || sceneError) && !leavingRef.current) {
        event.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modelReady, sceneError, finish]);

  useEffect(
    () => () => {
      if (finishTimer.current) window.clearTimeout(finishTimer.current);
    },
    [],
  );

  if (!visible || booted) return null;

  const percent = modelReady ? 100 : Math.min(100, Math.round(progress));
  const streamCount =
    total > 0
      ? `${String(loaded).padStart(2, "0")} / ${String(total).padStart(2, "0")} ITEMS`
      : "AWAITING STREAM";
  const linkState = sceneError ? "RENDER LINK FAILED" : modelReady ? "RENDER LINK ESTABLISHED" : active ? "STREAMING" : "STANDBY";
  const slow = !modelReady && !sceneError && minElapsed;

  return (
    <div
      className="boot-overlay"
      data-leaving={leaving}
      role="dialog"
      aria-modal="true"
      aria-label="Loading the SU-57 Felon dossier"
      aria-busy={!modelReady && !sceneError}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="display-title text-outline whitespace-nowrap opacity-[0.035]">SU-57</span>
      </div>

      <div className="boot-panel brackets relative z-10">
        <div className="flex items-start justify-between gap-4 border-b border-line pb-3">
          <div className="flex items-center gap-3">
            <JetMark className="h-8 w-8 text-accent" />
            <div>
              <p className="font-display text-lg font-bold uppercase tracking-[0.18em] text-ink">
                Felon Boot
              </p>
              <p className="micro mt-0.5">{BUILD_TAG}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="micro">UNOFFICIAL // ARCHIVE</p>
            <p className="micro mt-1 text-dim">UTC {clock}</p>
          </div>
        </div>

        <div className="boot-log mt-4" aria-hidden="true">
          {BOOT_LINES.slice(0, Math.max(1, step)).map((line) => (
            <div className="boot-line" key={line.label}>
              <span className="t">[{line.t}]</span>
              <span className="w-[104px] text-muted">{line.label}</span>
              <span className="flex-1 -translate-y-[3px] border-b border-dotted border-line" />
              <span className={line.state === "OK" ? "ok" : "sys"}>{line.state}</span>
              <span className="w-[132px] truncate text-dim">{line.detail}</span>
            </div>
          ))}
          <div className="boot-line">
            <span className="t">[LIVE]</span>
            <span className="w-[104px] text-muted">LOADING MESH</span>
            <span className="flex-1 -translate-y-[3px] border-b border-dotted border-line" />
            <span className="sys">{percent}%</span>
            <span className="w-[132px] truncate text-dim">{streamCount}</span>
          </div>
          <div className="boot-line">
            <span className="t">[SYS ]</span>
            <span className="w-[104px] text-muted">RENDER</span>
            <span className="flex-1 -translate-y-[3px] border-b border-dotted border-line" />
            <span className={modelReady ? "ok" : sceneError ? "text-danger" : "sys"}>
              {sceneError ? "FAIL" : modelReady ? "READY" : "LINK"}
            </span>
            <span className="w-[132px] truncate text-dim">{linkState}</span>
          </div>
          {slow && !sceneError ? (
            <div className="text-[10px] text-accent">
              [WARN] LINK TIME HIGH — PROGRESS IS REAL, NOT A PLACEHOLDER
            </div>
          ) : null}
        </div>

        <div
          className="boot-bar mt-5"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label="3D model loading progress"
        >
          <div className="boot-bar-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between gap-4">
          <span className="micro" aria-live="polite">
            {sceneError ? "STATIC DOSSIER AVAILABLE" : modelReady ? "RENDER READY" : "REAL-TIME ASSET LINK"}
          </span>
          <span className="micro">{percent.toString().padStart(3, "0")} / 100</span>
        </div>

        {sceneError ? (
          <div className="mt-5 border border-danger/50 bg-danger/5 p-3">
            <p className="text-[11px] uppercase tracking-[0.12em] text-danger">
              Render subsystem offline
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-muted">
              {sceneError === "webgl"
                ? "WebGL is unavailable in this browser or has been disabled. The static dossier and specifications are still accessible."
                : "The 3D asset could not be loaded. The static dossier and specifications are still accessible."}
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <div className="flex items-center gap-2">
            <span
              className={`h-1 w-1 ${sceneError ? "bg-danger" : modelReady ? "bg-status-bright" : "bg-accent"}`}
              aria-hidden="true"
            />
            <span className="micro">{sceneError ? "STATIC MODE" : modelReady ? "SYS.ONLINE" : "SYS.LINKING"}</span>
            <span className="micro text-dim">// {COORD_TAG}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="micro hidden sm:inline">
              {modelReady || sceneError ? "ENTER TO CONTINUE" : "STANDBY"}
            </span>
            <button type="button" className="btn btn-primary btn-sm" onClick={finish}>
              {sceneError ? "Enter static dossier" : modelReady ? "Enter dossier" : "Skip boot"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <p className="absolute bottom-4 left-1/2 w-full max-w-[620px] -translate-x-1/2 px-5 text-center text-[8px] uppercase tracking-[0.14em] text-dim">
        {DISCLAIMER}
      </p>
    </div>
  );
}
