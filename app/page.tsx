import { BootLoader } from "@/components/ui/BootLoader";
import { CrosshairCursor } from "@/components/ui/CrosshairCursor";
import { FreeViewBanner } from "@/components/ui/FreeViewBanner";
import { MobileBar } from "@/components/ui/MobileBar";
import { Scanlines } from "@/components/ui/Scanlines";
import { SectionRail } from "@/components/ui/SectionRail";
import { TelemetryRail } from "@/components/ui/TelemetryRail";
import { TopBar } from "@/components/ui/TopBar";
import { ClientEnv } from "@/components/providers/ClientEnv";
import { KeyboardShortcuts } from "@/components/providers/KeyboardShortcuts";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SceneMount } from "@/components/scene/SceneMount";
import { Hero } from "@/components/sections/Hero";
import { Overview } from "@/components/sections/Overview";
import { Airframe } from "@/components/sections/Airframe";
import { Propulsion } from "@/components/sections/Propulsion";
import { Weapons } from "@/components/sections/Weapons";
import { Specs } from "@/components/sections/Specs";
import { XRay } from "@/components/sections/XRay";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Page() {
  return (
    <>
      <ClientEnv />
      <SmoothScroll />
      <KeyboardShortcuts />

      <SceneMount />
      <Scanlines />
      <CrosshairCursor />
      <FreeViewBanner />

      <TopBar />
      <SectionRail />
      <TelemetryRail />
      <MobileBar />

      <main id="main" className="relative z-10">
        <Hero />
        <Overview />
        <Airframe />
        <Propulsion />
        <Weapons />
        <Specs />
        <XRay />
      </main>

      {/* Portalled drei HTML labels sit above the content but below the HUD. */}
      <div id="hotspot-layer" className="hotspot-layer" />

      <FooterSection />

      <BootLoader />
    </>
  );
}
