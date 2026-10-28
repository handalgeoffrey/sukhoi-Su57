# SU-57 FELON — MASTER DESIGN SYSTEM

> **Project:** Cinematic scroll-driven 3D showcase — Sukhoi Su-57 "Felon"
> **Product type:** Aerospace / defense product showcase
> **Style keywords:** Military HUD, tactical, brutalist, developer-raw, dark mode, monospace
> **System version:** 5.7 // FELON-BUILD
> **Generated:** 2026-10-25
> **Status:** LOCKED — all UI must use these tokens and rules.

---

## 01 // CONCEPT

A declassified tech manual rendered as a live terminal. Near-black void, one signal
amber accent, raw 1px structure, monospace data everywhere. The jet is the only
"photographic" element; UI stays flat, honest and typographic. No cards floating on
soft shadows, no rounded corners, no gradients except light falling on the aircraft.

**Design principles**

1. **The aircraft is the hero.** UI frames the model; it never competes with it.
2. **Data is decoration.** Coordinates, build tags and counters make the interface
   feel instrumented — but every displayed spec is publicly reported and labelled.
3. **Raw over polished.** Visible borders, grid lines, crosshairs, corner brackets.
4. **One accent.** Signal amber `#FFB000` for interaction, focus and HUD emphasis.
   Muted radar green is reserved for tiny "system online" indicators.
5. **Negative space is a feature.** Large quiet areas, sparse labels, deliberate rhythm.
6. **Motion is physical.** Damped cameras, smooth scroll, no jitter, no cartoon easing.

---

## 02 // COLOR TOKENS

| Token | Hex | Usage |
|---|---|---|
| `--base` | `#0A0B0A` | Page background, 3D void, loader |
| `--surface` | `#111311` | Panels, terminal blocks, table backgrounds |
| `--surface-raised` | `#161816` | Hovered rows, active hotspot panel |
| `--border` | `#2A2D2A` | All 1px borders, grid lines, dividers |
| `--border-strong` | `#3D423D` | Emphasis borders, active states |
| `--text` | `#E8E8E8` | Primary text (contrast 15.3:1 on base) |
| `--text-muted` | `#8A8F8A` | Secondary labels (contrast 5.4:1 on base) |
| `--text-dim` | `#5E635E` | Decorative microcopy only (not body) |
| `--accent` | `#FFB000` | Signal amber — CTAs, focus, active states, wireframe |
| `--accent-soft` | `rgba(255, 176, 0, 0.14)` | Hotspot fill, active row tint |
| `--accent-glow` | `rgba(255, 176, 0, 0.35)` | Bloom source, HUD glow |
| `--status` | `#5C8A5C` | Muted radar green — status dots only |
| `--status-bright` | `#7BAE7B` | Status text on dark (contrast 6.9:1) |
| `--danger` | `#FF3B30` | Error states only (sparingly) |

**Rules**

- Never use more than one accent hue. `--status` is a status indicator, not a theme color.
- No gradients in UI. Gradients are allowed only inside the 3D render (light, fog, afterburner).
- Body text must never go below `--text-muted`. `--text-dim` is labels/decorative only.
- Interactive amber on base = 8.9:1. Focus ring = 2px `--accent` with 2px offset.

```css
:root {
  --base: #0A0B0A;
  --surface: #111311;
  --surface-raised: #161816;
  --border: #2A2D2A;
  --border-strong: #3D423D;
  --text: #E8E8E8;
  --text-muted: #8A8F8A;
  --text-dim: #5E635E;
  --accent: #FFB000;
  --accent-soft: rgba(255, 176, 0, 0.14);
  --accent-glow: rgba(255, 176, 0, 0.35);
  --status: #5C8A5C;
  --status-bright: #7BAE7B;
  --danger: #FF3B30;
}
```

---

## 03 // TYPOGRAPHY

**Families**

| Role | Family | Fallback stack |
|---|---|---|
| Data / body / labels | **JetBrains Mono** (variable) | `ui-monospace, SFMono-Regular, Menlo, monospace` |
| Headings / display | **Barlow Condensed** (variable, 700–900) | `"Arial Narrow", Impact, sans-serif` |

No system UI fonts for visible text. Self-hosted via Fontsource variable packages.

**Scale**

| Token | Size | Line-height | Tracking | Usage |
|---|---|---|---|---|
| `--text-2xs` | `0.6875rem` (11px) | 1.3 | `0.08em` | HUD micro labels, coordinates |
| `--text-xs` | `0.75rem` (12px) | 1.4 | `0.06em` | Section codes, table labels |
| `--text-sm` | `0.875rem` (14px) | 1.55 | `0.02em` | Body copy, panel text |
| `--text-base` | `1rem` (16px) | 1.6 | `0` | Long-form body |
| `--text-lg` | `1.125rem` (18px) | 1.5 | `0` | Lead paragraph |
| `--text-xl` | `1.25rem` (20px) | 1.4 | `0` | Panel titles |
| `--heading-3` | `clamp(1.5rem, 2.5vw, 2rem)` | 1.05 | `-0.01em` | Sub-section headings |
| `--heading-2` | `clamp(2rem, 4vw, 3.25rem)` | 1.0 | `-0.015em` | Section headings |
| `--heading-1` | `clamp(3rem, 8vw, 6.5rem)` | 0.92 | `-0.02em` | Hero display |
| `--display` | `clamp(4rem, 13vw, 11rem)` | 0.85 | `-0.03em` | Hero wordmark |

**Rules**

- Headings: Barlow Condensed, 700–900, uppercase, `font-stretch: condensed`.
- Data: JetBrains Mono, tabular numerals (`font-variant-numeric: tabular-nums`).
- Section codes: `[01 // OVERVIEW]` — mono, 12px, letter-spaced, amber bracket glyphs.
- Max body line length: 62ch. No centered paragraphs except hero sub-line.
- Microcopy minimum 11px and only for ancillary data, never essential content.

---

## 04 // SPACING & LAYOUT

Base grid: **4px**. Tailwind spacing scale maps 1:1 (1 = 4px).

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Hairline gaps |
| `--space-2` | 8px | Inline gaps, icon offsets |
| `--space-3` | 12px | Label-to-value gaps |
| `--space-4` | 16px | Component padding (compact) |
| `--space-5` | 20px | Panel padding |
| `--space-6` | 24px | Panel padding (large), stack gap |
| `--space-8` | 32px | Section inner rhythm |
| `--space-10` | 40px | Block spacing |
| `--space-12` | 48px | Section spacing (mobile) |
| `--space-16` | 64px | Section spacing |
| `--space-20` | 80px | Section spacing (desktop) |
| `--space-28` | 112px | Hero breathing room |

**Layout**

- Full-bleed fixed 3D canvas; HTML scrolls above it.
- Content rails: max width `1440px`, gutter `clamp(20px, 5vw, 80px)`.
- 12-column grid on desktop; content usually occupies 4–5 columns leaving the jet clear.
- Sections are at least `100svh`; hero and footer exactly `100svh`.
- Fixed HUD safe area: `24px` desktop, `12px` mobile; respect `env(safe-area-inset-*)`.
- Z-layers: canvas `0`, content `10`, HUD `20`, cursor `40`, scanlines `45`, loader `50`.

---

## 05 // SHAPE, BORDERS, ELEVATION

- **Border radius: 0 everywhere.** Buttons, panels, inputs, toggles.
- **Borders:** `1px solid var(--border)`. Active/selected: `1px solid var(--accent)`.
- **No box-shadows.** Depth comes from borders, contrast and the 3D scene.
- **Corner brackets:** 8–12px L-shapes at panel corners, 1px accent or border color.
- **Crosshair markers:** `+` marks at section corners/grid intersections, `--text-dim`.
- **Hairline divisions:** 1px lines only; never 2px except focus rings.
- **Clipping:** no rounded clip paths. Diagonal cuts allowed only in the weapons schematic.

**Panel recipe**

```
background: var(--surface)
border: 1px solid var(--border)
padding: 20px
corner brackets top-left + bottom-right (accent, 10px arms)
label: mono 11px, letter-spacing .12em, --text-muted
```

---

## 06 // COMPONENT SPECS

### Buttons (`Button`)
- Height 48px desktop / 48px mobile (touch target ≥ 44px). Padding `0 20px`.
- Primary: amber background, `--base` text, 1px amber border, mono 12px uppercase, letter-spacing .14em.
- Secondary: transparent, 1px `--border-strong`, `--text`; hover border amber + text amber.
- Ghost: no border until hover, underline offset 4px.
- Icon slot 16px; arrow `→` / `↗`.
- Focus-visible: 2px amber outline, 2px offset.
- Active: translateY(1px) only; no scale.

### Section header (`SectionHeading`)
- Section code line: `[02 // AIRFRAME]` mono 12px amber brackets, muted text.
- Heading: Barlow Condensed 900 uppercase, `--heading-2`, max 3 lines.
- Optional rule: 1px line 64px + label.
- Decode-in animation on first intersection (350–700ms), disabled with reduced motion.

### Stat strip (`StatStrip`)
- 3–4 cells, 1px top/bottom borders, vertical 1px separators.
- Label mono 11px muted uppercase; value Barlow Condensed 700 or mono 20px off-white.
- Optional unit suffix mono 11px muted.
- Count-up on reveal (specs table), 900ms, ease-out; reduced motion shows final value.

### HUD counter (`HudCounter`)
- Label mono 10–11px `--text-dim`; value mono 13–14px `--text` with tabular nums.
- Amber tick marks on left; updates via rAF, not React state.
- Altitude / speed / heading values derived from scroll progress, clamped.
- Mobile: only speed + altitude, 11px, stacked; radar/compass hidden.

### Hotspot (`Hotspot`)
- Anchor: 10px square rotated 45° (diamond) or 8px dot; amber fill, base border.
- Ring pulse: 1px amber ring expanding 1.0→1.8, 1.6s loop (disabled reduced motion).
- Label: mono 11px uppercase on base chip with 1px border; hidden on mobile until tap.
- Active: filled amber, label inverted (base text on amber).
- ARIA: `button`, `aria-label="Hotspot: canopy — show details"`, `aria-pressed`.
- Leader line: 1px amber line, 64–120px, with a 4px cross tick at the anchor end.
- Info panel: fixed side panel (desktop) / bottom sheet (mobile), 1px border, no radius,
  close button 44px, arrow keys move between hotspots.

### Toggle (`Toggle`)
- 1px border rectangle, 36px height (row) / 48px touch.
- State: `[ OFF ]` / `[ ON ]` mono; active amber border + amber text.
- Global toggles: `WIREFRAME [W]`, `FREE VIEW [F]`.
- `aria-pressed`, keyboard operable, visible focus.

### Data table (`SpecTable`)
- Mono 12px; uppercase 11px headers, `--text-muted`.
- Row height 56px desktop / 52px mobile; 1px bottom borders.
- Values right-aligned, off-white; units muted; hover row `--surface-raised`.
- Count-up on first reveal; values remain selectable text.

### Terminal loader (`BootLoader`)
- Full-screen base, centered 640px terminal block, 1px border.
- Log lines mono 12px; timestamps `[00.000]`; states `OK` green, `SYS` muted, `>>` amber.
- Real model progress line: `LOADING MESH ... 64%` + 1px progress bar (amber fill).
- Skip control visible after 800ms; loading/error states designed.
- At completion: 400ms hold → 600ms fade cut into hero.

### Scanline overlay (`ScanlineOverlay`)
- Fixed, pointer-events none, z-45. Repeating 1px line every 3px at 1.5–2% opacity.
- Vignette via radial gradient max 12% edge darkening (CSS overlay only).
- Disabled entirely for `prefers-reduced-motion` and on mobile low-power profile.

### Cursor (`CrosshairCursor`)
- Fine pointers only. Native cursor hidden on body; custom crosshair 20px with 1px lines.
- Coordinate readout mono 9–10px near bottom-right of crosshair: `X 1024 Y 0577`.
- Amber center dot 2px. Mix-blend not used (readability). Hidden on touch.

### Compass + radar
- Compass: 96px SVG ring, 1px ticks every 15°, cardinal letters 8px mono, rotating
  group based on heading; center amber heading value.
- Radar: 120px circle, 1px rings, rotating conic sweep at 8% opacity, 2–3 static blips.
- Both pointer-events none, aria-hidden, decorative only. Hidden on mobile.

---

## 07 // MOTION

| Token | Value | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | UI reveals, panels |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Camera, large transitions |
| `--dur-fast` | 160ms | Hover, focus |
| `--dur-base` | 280ms | Panels, toggles |
| `--dur-slow` | 600ms | Section reveals, boot cut |
| `--dur-cinematic` | 1200ms | Camera settles, hero title |

**Scroll system**

- Lenis smooth scroll (lerp 0.09, wheelMultiplier 0.9) integrated with GSAP ScrollTrigger.
- One fixed 3D scene. Camera follows a Catmull-Rom spline through per-section keyframes;
  virtual progress = `(sectionIndex + easedSectionProgress) / (sectionCount - 1)`.
- Damping: exponential (`lambda ≈ 4.5`) per frame on camera position, look target, model rotation.
- Per-section active state from ScrollTrigger; progress 0–1 within each section.
- Idle life: ±0.15 rad slow jet yaw sine, tiny camera drift; no jitter.
- Mouse parallax: ±0.35 units camera offset, damped, hero only (amplitude fades after hero).
- Free view: OrbitControls, auto-return after 6s idle or explicit button; scroll camera resumes smoothly.
- Wireframe/X-ray: material + line opacity crossfade 600ms; auto-wireframe while in Weapons section.
- Afterburner: additive glow + point light, intensity driven by propulsion section progress/active state.

**Transitions per section** (see page blueprint for camera keys)

1. Boot → Hero: loader pulls back, 600ms fade cut.
2. Hero → Overview: arc from 3/4 front-left to 3/4 front-right.
3. Overview → Airframe: orbit around the left wing; hotspot lines draw in.
4. Airframe → Propulsion: push to rear 3/4; afterburner warms up.
5. Propulsion → Weapons: crane up to top-down; wireframe overlay fades in.
6. Weapons → Specs: sweep down to side profile; counters count up.
7. Specs → Wireframe: front view crossfades solid → X-ray/blueprint.
8. Wireframe → Footer: camera retreats; jet recedes into fog.

**Reduced motion**

- No Lenis hijack (native scroll), no glitch/decode, no scanlines, no crosshair animation,
  no idle rotation, no parallax, no count-up, no auto-wireframe pulse.
- Camera still follows sections but with direct (non-animated) updates.
- All essential content remains visible without animation.

---

## 08 // 3D ART DIRECTION

- **Void:** near-black `#0A0B0A`, fog 30→90, faint infinite ground grid at y = -3.
- **Lighting:** one strong warm rim light (rear-left), one cool soft fill (front-right),
  procedural environment map (Lightformers: overhead softbox, side strips, amber kicker).
- **Material:** matte metal, envMapIntensity ~0.65, roughness tuned to 0.55–0.75,
  metalness 0.35–0.6. Glass canopy kept dark with a slight amber reflection.
- **Camera:** 32–40° FOV, always moving, never below ground; front 3/4 hero, orbit for
  airframe, rear close-up for propulsion, near-top for weapons, side profile for specs.
- **Postprocessing:** Bloom (0.25–0.4, threshold 0.8), Vignette (offset .25, darkness .7),
  Noise (2.5–4%), ChromaticAberration (offset 0.0004, very light). Mobile: bloom+vignette only,
  lower dpr.
- **Hotspots:** amber dot + 1px leader line; labels never baked into canvas; real DOM text.
- **Weapons schematic:** amber 1px wireframe diagram overlay, dashed bay outlines, mono labels.
- **Performance:** ≤ 120k render triangles, textures ≤ 2048 (ship 1024), one env map,
  no per-frame allocations, `dpr [1, 2]`, frameloop always but cheap scene.

---

## 09 // PAGE BLUEPRINT

| # | Section | Scroll height | Camera | Key content |
|---|---|---|---|---|
| 00 | Boot | overlay | hero pose | terminal boot log, real progress |
| 01 | Hero | 100svh | front 3/4 left, close | SU-57 FELON, sub-line, 2 CTAs |
| 02 | Overview | 120svh | front 3/4 right | intro 2–3 lines, 4-stat strip |
| 03 | Airframe / Stealth | 150svh | left orbit | hotspots: canopy, intakes, LEVCON, tails |
| 04 | Propulsion | 140svh | rear 3/4 close | twin engines, thrust vectoring, afterburner |
| 05 | Weapons | 150svh | top-down + wireframe | internal bay schematic overlay |
| 06 | Specs | 130svh | side profile | 7-row data table, count-up |
| 07 | Wireframe / X-Ray | 120svh | front | wireframe toggle, blueprint mode |
| 08 | Footer | 100svh | retreat | terminal links, disclaimer, credits |

Copy rules: short factual lines; publicly reported specs labelled approximate;
disclaimer "Unofficial fan project. Not affiliated with Sukhoi / UAC / Rostec."

---

## 10 // RESPONSIVE

Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.

- **Mobile (<768):** single column, content at bottom of each section, jet positioned
  upper 55% of viewport; camera keys re-composed (not scaled desktop); hide compass/radar
  and most HUD; 2 stats max; hotspots become tappable diamonds with bottom-sheet detail;
  drag-to-orbit enabled via explicit "FREE VIEW" touch toggle; dpr max 1.5; no CRT scanlines;
  postprocessing reduced to bloom + vignette.
- **Tablet:** 8-col grid, HUD counters reduced to 2, hotspot labels visible.
- **Desktop:** full 12-col composition, all HUD widgets, cursor crosshair.
- **Ultra-wide:** content max 1440px; camera fov adjusted to keep jet within 60% width.

---

## 11 // ACCESSIBILITY CHECKLIST

- [x] Body text contrast ≥ 4.5:1 (`--text` 15.3:1, `--text-muted` 5.4:1 on base).
- [x] Amber on base 8.9:1; base on amber 8.9:1 for primary buttons.
- [x] Visible `:focus-visible` 2px amber outline, offset 2px, on every interactive element.
- [x] Logical tab order: skip link → header brand → hero CTAs → section controls → hotspots → footer.
- [x] Semantic landmarks: header/nav, main, sections with unique headings, footer.
- [x] Hotspots are real buttons with descriptive `aria-label`, `aria-pressed`, keyboard operable.
- [x] Toggle buttons use `aria-pressed`; keyboard shortcuts W/F documented in UI.
- [x] All content is real DOM text; canvas is `aria-hidden` decorative.
- [x] Touch targets ≥ 44×44px.
- [x] `prefers-reduced-motion` disables scroll hijack, glitch, scanlines, idle motion, counts.
- [x] Loading, empty (no hotspots selected) and error (WebGL/model fail) states designed.
- [x] WebGL fallback: static poster + specs + notice.
- [x] Canvas does not trap keyboard; free view has escape/return.

---

## 12 // PERFORMANCE BUDGET

| Asset | Budget |
|---|---|
| Compressed GLB | ≤ 5 MB (target ~2–3 MB) |
| Geometry | ≤ 120k rendered vertices (model ~96k) |
| Textures | 1024² max, WebP/KTX2 |
| JS initial | keep scene chunk lazy; fonts subset self-hosted |
| FPS | 60 desktop mid-laptop, ≥ 30 mobile |
| DPR | clamp [1, 2] desktop, [1, 1.5] mobile |
| Postprocessing | 4 effects desktop, 2 mobile |
| Lighthouse | ≥ 85 desktop performance target |

Rules: no per-frame React state updates (refs/rAF), no per-frame allocations,
preload model, `frameloop="always"` only while visible, pause rendering when tab hidden
(drei Canvas handles), suspense + designed fallback.

---

## 13 // PRE-DELIVERY CHECKLIST

**Visual**
- [ ] Every component uses tokens from this file; no off-system colors/sizes.
- [ ] Accent used only for interaction/emphasis; radar green only for status.
- [ ] No rounded corners, no soft shadows, no UI gradients.
- [ ] 1px borders, corner brackets, crosshair/grid details present but restrained.
- [ ] Typography: JetBrains Mono + Barlow Condensed only.
- [ ] Hero has negative space; jet unobstructed.
- [ ] Scanlines ≤ 2% opacity; text remains crisp.

**Interaction**
- [ ] Scroll camera continuous/damped; no jitter at section boundaries.
- [ ] All 8 section transitions implemented.
- [ ] Mouse parallax subtle; hotspots clickable with leader lines.
- [ ] Wireframe toggle (button + W), Free View drag-orbit + auto-return.
- [ ] Loader shows real progress; error/skip states; clean cut to hero.
- [ ] Custom crosshair cursor with coordinates; hidden on touch.

**Quality**
- [ ] `npm run build` clean, no console errors, no hydration warnings.
- [ ] Tested scroll flow end-to-end at 1440×900 and 390×844.
- [ ] Reduced-motion pass: no Lenis, glitch, scanlines or idle animation.
- [ ] Keyboard pass: skip link, CTAs, toggles, hotspots, footer links.
- [ ] WebGL fallback poster + specs.
- [ ] README setup/customization; model audit documented; specs disclaimer in footer.

---

## 14 // COPY / VOICE

- Terse, factual, instrument-panel tone. No marketing hyperbole, no classified claims.
- Numbers always with units and "approx." where public figures vary.
- Section codes, timestamps and build tags are decorative fiction (build IDs only), never
  presented as real specifications.
- Required disclaimer in footer: **"Unofficial fan project. Not affiliated with Sukhoi /
  UAC / Rostec."**
- Specs footer note: **"Specifications approximate / publicly reported."**
