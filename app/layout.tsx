import type { Metadata, Viewport } from "next";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/oswald";
import "./globals.css";

export const metadata: Metadata = {
  title: "SU-57 FELON — Airframe Dossier",
  description:
    "A cinematic, scroll-driven 3D dossier of the Sukhoi Su-57 fifth-generation fighter. Unofficial fan project — specs approximate / publicly reported.",
  applicationName: "SU-57 FELON // Airframe Dossier",
  authors: [{ name: "Unofficial fan project" }],
  keywords: [
    "Su-57",
    "Felon",
    "Sukhoi",
    "fifth-generation fighter",
    "3D",
    "WebGL",
    "aircraft",
  ],
  openGraph: {
    title: "SU-57 FELON — Airframe Dossier",
    description:
      "Cinematic 3D airframe dossier. Unofficial fan project, not affiliated with Sukhoi / UAC / Rostec.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0B0A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to dossier
        </a>
        {children}
        <noscript>
          <style>{`
            .boot-overlay, .scene-layer, .scanlines, .cursor-crosshair, .skip-link { display: none !important; }
            .mobile-bar { display: none !important; }
            [data-reveal] { opacity: 1 !important; transform: none !important; }
          `}</style>
          <div
            style={{
              position: "fixed",
              left: 16,
              bottom: 16,
              zIndex: 60,
              maxWidth: 360,
              border: "1px solid #2A2D2A",
              background: "#0A0B0A",
              padding: 12,
              fontFamily: "monospace",
              fontSize: 10,
              lineHeight: 1.6,
              color: "#8A8F8A",
            }}
          >
            3D RENDER OFFLINE — JavaScript is required for the interactive airframe.
            The dossier text and public specifications remain available below.
          </div>
        </noscript>
      </body>
    </html>
  );
}
