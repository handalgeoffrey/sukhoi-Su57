"use client";

import { useEffect, useState } from "react";
import { BUILD_TAG, COORD_TAG } from "@/lib/content";
import { useSiteStore } from "@/lib/store";
import { JetMark } from "@/components/ui/JetMark";

export function TopBar() {
  const modelReady = useSiteStore((s) => s.modelReady);
  const sceneError = useSiteStore((s) => s.sceneError);
  const [utc, setUtc] = useState("--:--:--");

  useEffect(() => {
    const update = () => {
      setUtc(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "UTC",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const status = sceneError ? "STATIC" : modelReady ? "SYS.ONLINE" : "LINKING";
  const statusColor = sceneError ? "bg-danger" : modelReady ? "bg-status-bright" : "bg-accent";

  return (
    <header className="fixed inset-x-0 top-0 z-20 h-12 border-b border-line bg-base/90">
      <div className="shell flex h-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <a
            href="#hero"
            className="flex min-h-11 items-center gap-2.5 text-accent transition-colors hover:text-ink"
            aria-label="SU-57 Felon dossier — back to top"
          >
            <JetMark className="h-5 w-5" />
            <span className="font-display text-[13px] font-bold uppercase leading-none tracking-[0.18em] text-ink">
              SU-57 <span className="text-dim">//</span> FELON
            </span>
          </a>
          <span className="hidden h-3 w-px bg-line md:inline-block" aria-hidden="true" />
          <span className="hidden text-[8px] uppercase tracking-[0.18em] text-dim md:inline-block">
            Airframe dossier / public archive
          </span>
        </div>

        <div className="hidden items-center gap-4 lg:flex" aria-hidden="true">
          <span className="micro">{BUILD_TAG}</span>
          <span className="micro text-dim">{COORD_TAG}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2" aria-live="polite">
            <span className={`h-1 w-1 ${statusColor}`} aria-hidden="true" />
            <span className="text-[9px] uppercase tracking-[0.14em] text-muted">{status}</span>
          </div>
          <span className="hidden h-3 w-px bg-line sm:inline-block" aria-hidden="true" />
          <span className="hidden text-[9px] tabular-nums tracking-[0.1em] text-dim sm:inline-block">
            UTC {utc}
          </span>
        </div>
      </div>
    </header>
  );
}
