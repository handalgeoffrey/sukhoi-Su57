export type Vec3 = readonly [number, number, number];

export type CameraKey = {
  pos: Vec3;
  target: Vec3;
  yaw: number;
  pitch: number;
  roll: number;
  fov: number;
};

/** Desktop camera keys — one pose per section, sampled along a Catmull-Rom spline. */
export const CAMERA_KEYS_DESKTOP: CameraKey[] = [
  // 01 — HERO: low front three-quarter, full airframe held in the right third.
  { pos: [10.0, 5.0, -27.0], target: [-4.8, 0.5, -0.6], yaw: 0.08, pitch: 0.0, roll: -0.015, fov: 35 },
  // 02 — OVERVIEW: swing across the nose to the port three-quarter.
  { pos: [-10.0, 4.8, -30.0], target: [-5.0, 0.3, -0.4], yaw: -0.22, pitch: 0.0, roll: 0.012, fov: 35 },
  // 03 — AIRFRAME: orbit around the left wing, elevated for hotspot clarity.
  { pos: [-30.0, 8.0, -18.0], target: [-5.0, 0.6, -1.0], yaw: 0.48, pitch: 0.01, roll: -0.03, fov: 36 },
  // 04 — PROPULSION: rear three-quarter, nozzles toward the lens.
  { pos: [12.0, 5.0, 28.0], target: [-5.0, 0.8, 3.0], yaw: 0.12, pitch: 0.0, roll: 0.0, fov: 35 },
  // 05 — WEAPONS: crane up to near-top-down.
  { pos: [0.2, 34.0, 8.0], target: [0.4, -0.4, 0.2], yaw: 0.0, pitch: 0.0, roll: 0.0, fov: 36 },
  // 06 — SPECS: side profile from the starboard side.
  { pos: [30.0, 4.0, 4.0], target: [-6.5, 0.3, 0.0], yaw: -0.08, pitch: 0.0, roll: 0.0, fov: 34 },
  // 07 — X-RAY: return to the front three-quarter for the material reveal.
  { pos: [10.0, 5.0, -30.0], target: [-4.8, 0.4, -0.5], yaw: 0.16, pitch: 0.0, roll: 0.0, fov: 34 },
  // 08 — FOOTER: retreat into the fog.
  { pos: [0.0, 11.0, -38.0], target: [0.0, 0.8, -1.0], yaw: 0.42, pitch: 0.0, roll: 0.0, fov: 40 },
];

/** Mobile camera keys — recomposed for portrait, content sits low, jet high. */
export const CAMERA_KEYS_MOBILE: CameraKey[] = [
  { pos: [3.2, 2.4, -29.0], target: [0, -0.8, -0.5], yaw: 0.05, pitch: 0.0, roll: 0.0, fov: 50 },
  { pos: [-2.5, 2.0, -30.5], target: [0, -1.0, 0], yaw: -0.2, pitch: 0.0, roll: 0.01, fov: 50 },
  { pos: [-9.0, 4.0, -20.0], target: [0, -0.6, -1.5], yaw: 0.45, pitch: 0.01, roll: -0.02, fov: 50 },
  { pos: [5.0, 2.2, 16.0], target: [0, 0.4, 3.0], yaw: 0.1, pitch: 0.0, roll: 0.0, fov: 50 },
  { pos: [0.2, 31.0, 8.0], target: [0, -0.5, 0], yaw: 0.0, pitch: 0.0, roll: 0.0, fov: 50 },
  { pos: [0, 6.0, 30.0], target: [0, 0.2, 0], yaw: 0.1, pitch: 0.0, roll: 0.0, fov: 50 },
  { pos: [3.0, 2.6, -28.0], target: [0, -0.7, 0], yaw: 0.15, pitch: 0.0, roll: 0.0, fov: 50 },
  { pos: [0, 7.5, -36.0], target: [0, 0.5, 0], yaw: 0.4, pitch: 0.0, roll: 0.0, fov: 52 },
];

export type SectionMeta = {
  id: string;
  index: string;
  code: string;
  label: string;
};

export const SECTIONS: SectionMeta[] = [
  { id: "hero", index: "01", code: "FELON", label: "FELON" },
  { id: "overview", index: "02", code: "OVERVIEW", label: "OVERVIEW" },
  { id: "airframe", index: "03", code: "AIRFRAME", label: "AIRFRAME" },
  { id: "propulsion", index: "04", code: "PROPULSION", label: "PROPULSION" },
  { id: "weapons", index: "05", code: "WEAPONS", label: "WEAPONS" },
  { id: "specs", index: "06", code: "SPECS", label: "SPECS" },
  { id: "xray", index: "07", code: "X-RAY", label: "X-RAY" },
  { id: "footer", index: "08", code: "END", label: "END" },
];

export type HotspotId = "canopy" | "intakes" | "levcon" | "tails";

export type Hotspot = {
  id: HotspotId;
  index: string;
  label: string;
  kicker: string;
  description: string;
  meta: string[];
  position: Vec3;
  direction: "left" | "right";
};

export const HOTSPOTS: Hotspot[] = [
  {
    id: "canopy",
    index: "01",
    label: "CANOPY",
    kicker: "CREW STATION",
    description:
      "A single-piece canopy with a radar-absorbent coating. The frame and coating are a deliberate trade between signature and pilot visibility.",
    meta: ["RAM COATING", "SINGLE SEAT", "PUBLIC SHAPING"],
    position: [0, 0.95, -6.0],
    direction: "right",
  },
  {
    id: "intakes",
    index: "02",
    label: "INTAKES",
    kicker: "INLET DUCTS",
    description:
      "S-shaped inlet ducts hide the engine faces from radar. Variable ramps manage airflow through high-alpha and supersonic flight.",
    meta: ["S-DUCT", "VARIABLE RAMP", "SIGNATURE TRADE"],
    position: [-2.35, -0.35, -4.9],
    direction: "left",
  },
  {
    id: "levcon",
    index: "03",
    label: "LEVCON",
    kicker: "ROOT EXTENSION",
    description:
      "Leading-edge root extensions add lift and yaw authority without the signature penalty of a larger vertical surface.",
    meta: ["LIFT / YAW", "DEFLECTING ROOT", "FLIGHT CONTROL"],
    position: [-5.5, 0.05, -0.6],
    direction: "left",
  },
  {
    id: "tails",
    index: "04",
    label: "TAILS",
    kicker: "CONTROL SURFACES",
    description:
      "Canted, all-moving vertical tails work with differential horizontal surfaces to retain control authority across the envelope.",
    meta: ["ALL-MOVING", "CANTED", "LOW OBSERVABLE"],
    position: [-3.0, 1.35, 6.8],
    direction: "right",
  },
];

export type SpecRow = {
  label: string;
  value?: number;
  decimals?: number;
  display?: string;
  unit: string;
  note?: string;
};

/** Publicly reported / approximate figures. Not operational data. */
export const SPECS: SpecRow[] = [
  { label: "Length", value: 20.1, decimals: 1, unit: "m" },
  { label: "Wingspan", value: 14.1, decimals: 1, unit: "m" },
  { label: "Max speed", value: 2.0, decimals: 1, unit: "Mach", note: "≈ 2,120 km/h at altitude" },
  { label: "Range", value: 3500, decimals: 0, unit: "km", note: "subsonic, internal fuel" },
  { label: "Service ceiling", value: 20000, decimals: 0, unit: "m" },
  { label: "Crew", display: "01", unit: "pilot" },
  { label: "First flight", display: "29 JAN 2010", unit: "T-50-1" },
];

export const BOOT_LINES = [
  { t: "00.000", label: "POST", state: "OK", detail: "CORE BUS" },
  { t: "00.041", label: "AVIONICS", state: "OK", detail: "HUD LINK" },
  { t: "00.108", label: "SENSOR FUSION", state: "OK", detail: "NOMINAL" },
  { t: "00.220", label: "ASSET", state: "SYS", detail: "/models/su57.glb" },
];

/** Linearly sample an array of per-section values at a fractional section index. */
export function sampleSectionValues(values: readonly number[], progress: number): number {
  if (values.length === 0) return 0;
  const clamped = Math.min(values.length - 1, Math.max(0, progress));
  const index = Math.min(values.length - 2, Math.floor(clamped));
  const t = clamped - index;
  return values[index] + (values[index + 1] - values[index]) * t;
}

export const MODEL_YAW = CAMERA_KEYS_DESKTOP.map((key) => key.yaw);
export const MODEL_PITCH = CAMERA_KEYS_DESKTOP.map((key) => key.pitch);
export const MODEL_ROLL = CAMERA_KEYS_DESKTOP.map((key) => key.roll);

export const BUILD_TAG = "v5.7 // FELON-BUILD";
export const COORD_TAG = "41.6°N 60.5°E";
export const DISCLAIMER =
  "Unofficial fan project. Not affiliated with Sukhoi / UAC / Rostec.";
export const SPEC_DISCLAIMER =
  "Specifications approximate / publicly reported. Figures vary by source and configuration.";
