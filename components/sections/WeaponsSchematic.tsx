const GRID_LINES = Array.from({ length: 18 }, (_, index) => 40 + index * 40);

export function WeaponsSchematic() {
  return (
    <div className="schematic-shell">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="micro text-accent">FIG. 05-W // PLAN VIEW</span>
        <span className="micro">SCHEMATIC / NOT TO SCALE</span>
      </div>

      <svg
        className="schematic-svg"
        viewBox="0 0 720 440"
        role="img"
        aria-labelledby="weapons-schematic-title weapons-schematic-desc"
      >
        <title id="weapons-schematic-title">Su-57 internal weapons carriage schematic</title>
        <desc id="weapons-schematic-desc">
          Approximate top-down diagram showing two forward fuselage bays and two
          wing-root bays. Layout is illustrative and not an engineering drawing.
        </desc>

        <defs>
          <pattern id="schematic-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="var(--border)" strokeWidth="0.5" opacity="0.55" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="720" height="440" fill="url(#schematic-grid)" className="schematic-grid" />

        {GRID_LINES.map((value) => (
          <line
            key={`v-${value}`}
            x1={value}
            y1="0"
            x2={value}
            y2="440"
            stroke="var(--border)"
            strokeWidth="0.35"
            opacity="0.16"
          />
        ))}
        {GRID_LINES.map((value) => (
          <line
            key={`h-${value}`}
            x1="0"
            y1={value}
            x2="720"
            y2={value}
            stroke="var(--border)"
            strokeWidth="0.35"
            opacity="0.16"
          />
        ))}

        <g className="schematic-airframe">
          {/* central fuselage */}
          <path d="M360 32 C367 66 373 106 379 148 L386 190 L384 268 L392 320 L380 376 L360 398 L340 376 L328 320 L336 268 L334 190 L341 148 C347 106 353 66 360 32 Z" />
          {/* left wing and LERX */}
          <path d="M337 148 L260 170 L144 206 L91 228 L103 246 L214 245 L319 231 L339 247 L344 300 L323 314 L307 266 L336 204 Z" />
          {/* right wing and LERX */}
          <path d="M383 148 L460 170 L576 206 L629 228 L617 246 L506 245 L401 231 L381 247 L376 300 L397 314 L413 266 L384 204 Z" />
          {/* horizontal stabilisers */}
          <path d="M337 330 L258 344 L212 360 L220 374 L334 361" />
          <path d="M383 330 L462 344 L508 360 L500 374 L386 361" />
          {/* canted vertical tails, plan projection */}
          <path d="M326 312 L307 344 L314 363 L336 344" />
          <path d="M394 312 L413 344 L406 363 L384 344" />
          {/* canopy */}
          <path d="M352 80 C357 101 361 119 361 139 L359 151 L361 151 L361 139 C361 119 365 101 370 80" />
        </g>

        {/* forward fuselage bays */}
        <rect className="schematic-bay" x="344" y="198" width="16" height="94" />
        <rect className="schematic-bay" x="360" y="198" width="16" height="94" />

        {/* wing-root bays */}
        <rect className="schematic-bay" x="304" y="188" width="26" height="72" />
        <rect className="schematic-bay" x="390" y="188" width="26" height="72" />

        {/* main-bay missiles */}
        <g className="schematic-missile">
          <path d="M348 282 L351 294 L354 282 L354 224 L351 214 L348 224 Z" />
          <path d="M366 282 L369 294 L372 282 L372 224 L369 214 L366 224 Z" />
          <path d="M344 238 L354 232 M344 246 L354 240" />
          <path d="M366 238 L376 232 M366 246 L376 240" />
        </g>

        {/* short-range missiles in side bays */}
        <g className="schematic-missile">
          <path d="M308 238 L311 250 L314 238 L314 204 L311 196 L308 204 Z" />
          <path d="M406 238 L409 250 L412 238 L412 204 L409 196 L406 204 Z" />
          <path d="M304 218 L314 210 M304 226 L314 218" />
          <path d="M406 218 L416 210 M406 226 L416 218" />
        </g>

        {/* leader lines */}
        <g className="schematic-leader">
          <path d="M302 211 L268 200 L198 200" />
          <path d="M344 224 L296 224 L198 224" />
          <path d="M418 211 L452 200 L522 200" />
          <path d="M376 224 L424 224 L522 224" />
          <path d="M360 398 L360 422" />
        </g>

        <text className="schematic-label schematic-label-amber" x="194" y="197" textAnchor="end">
          WING-ROOT BAY // SHORT-RANGE
        </text>
        <text className="schematic-label" x="194" y="221" textAnchor="end">
          FORWARD BAY // LONG-RANGE
        </text>
        <text className="schematic-label schematic-label-amber" x="526" y="197">
          INTERNAL CARRIAGE // DASHED
        </text>
        <text className="schematic-label" x="526" y="221">
          R-77 / R-74 CLASS // REPORTED
        </text>
        <text className="schematic-label" x="360" y="432" textAnchor="middle">
          APPROXIMATE PUBLIC LAYOUT // NO OPERATIONAL LOADOUT
        </text>

        {/* centre mark and axis ticks */}
        <g stroke="var(--text-dim)" strokeWidth="0.5" opacity="0.7">
          <path d="M360 176v-10M360 306v10M328 210h-10M392 210h10" />
        </g>
        <circle cx="360" cy="210" r="2" fill="var(--accent)" />

        {/* corner brackets */}
        <g stroke="var(--accent)" strokeWidth="1" opacity="0.75">
          <path d="M14 14h20M14 14v20" />
          <path d="M706 14h-20M706 14v20" />
          <path d="M14 426h20M14 426v-20" />
          <path d="M706 426h-20M706 426v-20" />
        </g>
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-2.5">
        <span className="micro text-dim">04 BAYS // 06 STORES // ILLUSTRATIVE</span>
        <span className="micro text-accent">CARRIAGE / LOW OBSERVABLE</span>
      </div>
    </div>
  );
}
