// Vector SVG Vehicle Renders with High-End Metallic Maximalist Aesthetics
export function getVehicleSVG(type, subCategory, color = '#FF6B00') {
  if (subCategory === 'Minibus' || subCategory === 'Executive Van') {
    // Luxury Executive Van / Tempo Traveller
    return `
    <svg viewBox="0 0 420 180" class="vehicle-silhouette-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="van-grad-${color.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="60%" stop-color="#1E2235" />
          <stop offset="100%" stop-color="#0A0D1A" />
        </linearGradient>
        <linearGradient id="glass-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#0284C7" stop-opacity="0.2" />
        </linearGradient>
        <filter id="shadow-van">
          <feDropShadow dx="0" dy="12" stdDeviation="8" flood-color="rgba(0,0,0,0.6)"/>
        </filter>
      </defs>
      <!-- Shadow -->
      <ellipse cx="210" cy="165" rx="180" ry="12" fill="rgba(0,0,0,0.5)" filter="blur(6px)" />
      <!-- Van Body Outline -->
      <path d="M 40 140 L 40 85 Q 45 45 90 40 L 360 40 Q 395 45 400 70 L 400 140 Z" fill="url(#van-grad-${color.replace('#','')})" stroke="#FFB703" stroke-width="1.5" />
      <!-- Aerodynamic Front -->
      <path d="M 40 85 Q 55 45 90 40 L 140 40 L 140 100 L 40 105 Z" fill="#111827" opacity="0.4" />
      <!-- Windows Strip -->
      <rect x="55" y="52" width="65" height="42" rx="6" fill="url(#glass-grad)" stroke="#38BDF8" stroke-width="1" />
      <rect x="130" y="52" width="70" height="42" rx="4" fill="url(#glass-grad)" stroke="#38BDF8" stroke-width="1" />
      <rect x="210" y="52" width="70" height="42" rx="4" fill="url(#glass-grad)" stroke="#38BDF8" stroke-width="1" />
      <rect x="290" y="52" width="85" height="42" rx="6" fill="url(#glass-grad)" stroke="#38BDF8" stroke-width="1" />
      <!-- Character Lines -->
      <line x1="40" y1="112" x2="395" y2="112" stroke="#FF6B00" stroke-width="3" stroke-dasharray="12 4" />
      <!-- Headlight / Taillight -->
      <polygon points="40,95 48,92 48,108 40,105" fill="#00F59B" filter="drop-shadow(0 0 8px #00F59B)" />
      <polygon points="398,90 402,90 402,115 398,115" fill="#FF2E63" filter="drop-shadow(0 0 8px #FF2E63)" />
      <!-- Wheels -->
      <g transform="translate(95, 140)">
        <circle cx="0" cy="0" r="26" fill="#111" stroke="#4B5563" stroke-width="4" />
        <circle cx="0" cy="0" r="15" fill="#1F2937" stroke="#FFB703" stroke-width="2" />
        <circle cx="0" cy="0" r="6" fill="#D1D5DB" />
      </g>
      <g transform="translate(335, 140)">
        <circle cx="0" cy="0" r="26" fill="#111" stroke="#4B5563" stroke-width="4" />
        <circle cx="0" cy="0" r="15" fill="#1F2937" stroke="#FFB703" stroke-width="2" />
        <circle cx="0" cy="0" r="6" fill="#D1D5DB" />
      </g>
    </svg>
    `;
  } else if (subCategory === 'Minivan') {
    // MPV / Toyota Innova
    return `
    <svg viewBox="0 0 420 180" class="vehicle-silhouette-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mpv-grad-${color.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="60%" stop-color="#1E2540" />
          <stop offset="100%" stop-color="#0B0F24" />
        </linearGradient>
        <linearGradient id="mpv-glass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#67E8F9" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#0E7490" stop-opacity="0.3" />
        </linearGradient>
      </defs>
      <ellipse cx="210" cy="165" rx="175" ry="12" fill="rgba(0,0,0,0.5)" filter="blur(6px)" />
      <!-- MPV Swept Aerodynamic Silhouette -->
      <path d="M 35 140 L 40 108 Q 65 95 105 82 L 175 48 Q 210 45 320 48 L 385 68 Q 395 85 395 140 Z" fill="url(#mpv-grad-${color.replace('#','')})" stroke="#FFB703" stroke-width="1.5" />
      <!-- Windows Arch -->
      <path d="M 115 80 L 172 54 Q 195 52 260 54 L 260 82 L 125 84 Z" fill="url(#mpv-glass)" stroke="#38BDF8" stroke-width="1" />
      <path d="M 270 54 L 340 56 Q 365 65 375 82 L 270 82 Z" fill="url(#mpv-glass)" stroke="#38BDF8" stroke-width="1" />
      <!-- Body Crease -->
      <path d="M 45 110 Q 180 102 385 112" stroke="#FF6B00" stroke-width="2.5" />
      <!-- Front Grille & Headlamp -->
      <polygon points="35,108 55,104 55,116 35,118" fill="#00F59B" filter="drop-shadow(0 0 8px #00F59B)" />
      <polygon points="392,100 396,100 396,118 392,118" fill="#FF2E63" filter="drop-shadow(0 0 8px #FF2E63)" />
      <!-- Wheels -->
      <g transform="translate(95, 140)">
        <circle cx="0" cy="0" r="25" fill="#111" stroke="#4B5563" stroke-width="4" />
        <circle cx="0" cy="0" r="14" fill="#1F2937" stroke="#FFB703" stroke-width="2" />
        <circle cx="0" cy="0" r="5" fill="#E5E7EB" />
      </g>
      <g transform="translate(325, 140)">
        <circle cx="0" cy="0" r="25" fill="#111" stroke="#4B5563" stroke-width="4" />
        <circle cx="0" cy="0" r="14" fill="#1F2937" stroke="#FFB703" stroke-width="2" />
        <circle cx="0" cy="0" r="5" fill="#E5E7EB" />
      </g>
    </svg>
    `;
  } else if (subCategory === 'SUV') {
    // Rugged High Clearance SUV / Fortuner / Scorpio
    return `
    <svg viewBox="0 0 420 180" class="vehicle-silhouette-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="suv-grad-${color.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="50%" stop-color="#232B45" />
          <stop offset="100%" stop-color="#0E1326" />
        </linearGradient>
        <linearGradient id="suv-glass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#0369A1" stop-opacity="0.25" />
        </linearGradient>
      </defs>
      <ellipse cx="210" cy="165" rx="175" ry="12" fill="rgba(0,0,0,0.5)" filter="blur(6px)" />
      <!-- Roof Rails -->
      <line x1="160" y1="42" x2="330" y2="42" stroke="#D1D5DB" stroke-width="4" stroke-linecap="round" />
      <!-- Bold SUV Silhouette -->
      <path d="M 30 135 L 35 98 Q 50 88 95 86 L 155 52 Q 185 48 335 48 L 380 75 Q 395 90 395 135 Z" fill="url(#suv-grad-${color.replace('#','')})" stroke="#FFB703" stroke-width="1.5" />
      <!-- Aggressive Windows -->
      <path d="M 105 84 L 155 56 Q 175 54 240 54 L 240 84 Z" fill="url(#suv-glass)" stroke="#38BDF8" stroke-width="1" />
      <path d="M 250 54 L 325 54 Q 355 64 365 84 L 250 84 Z" fill="url(#suv-glass)" stroke="#38BDF8" stroke-width="1" />
      <!-- Muscular Wheel Arches -->
      <path d="M 30 115 Q 160 108 395 115" stroke="#FF6B00" stroke-width="2.5" />
      <!-- LED DRL Headlights -->
      <polygon points="32,96 58,92 58,104 32,106" fill="#00F59B" filter="drop-shadow(0 0 10px #00F59B)" />
      <polygon points="390,92 395,92 395,110 390,110" fill="#FF2E63" filter="drop-shadow(0 0 8px #FF2E63)" />
      <!-- Large Offroad Wheels -->
      <g transform="translate(95, 135)">
        <circle cx="0" cy="0" r="28" fill="#111" stroke="#374151" stroke-width="5" />
        <circle cx="0" cy="0" r="16" fill="#1F2937" stroke="#FFB703" stroke-width="2.5" />
        <circle cx="0" cy="0" r="6" fill="#9CA3AF" />
      </g>
      <g transform="translate(325, 135)">
        <circle cx="0" cy="0" r="28" fill="#111" stroke="#374151" stroke-width="5" />
        <circle cx="0" cy="0" r="16" fill="#1F2937" stroke="#FFB703" stroke-width="2.5" />
        <circle cx="0" cy="0" r="6" fill="#9CA3AF" />
      </g>
    </svg>
    `;
  } else if (subCategory === 'Luxury' || subCategory === 'Sedan') {
    // Sleek Luxury Fastback / Executive Sedan
    return `
    <svg viewBox="0 0 420 180" class="vehicle-silhouette-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sedan-grad-${color.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="60%" stop-color="#1C2138" />
          <stop offset="100%" stop-color="#080C1B" />
        </linearGradient>
        <linearGradient id="sedan-glass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#0C4A6E" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <ellipse cx="210" cy="165" rx="175" ry="10" fill="rgba(0,0,0,0.5)" filter="blur(6px)" />
      <!-- Low Aerodynamic Silhouette -->
      <path d="M 25 140 L 35 110 Q 75 96 115 88 L 175 52 Q 225 48 290 52 L 355 85 Q 385 96 395 140 Z" fill="url(#sedan-grad-${color.replace('#','')})" stroke="#FFB703" stroke-width="1.5" />
      <!-- Coupe Arc Windows -->
      <path d="M 125 86 L 175 58 Q 220 54 280 58 L 280 84 Z" fill="url(#sedan-glass)" stroke="#38BDF8" stroke-width="1" />
      <path d="M 288 58 Q 325 64 345 84 L 288 84 Z" fill="url(#sedan-glass)" stroke="#38BDF8" stroke-width="1" />
      <!-- Elegant Side Sweep -->
      <path d="M 35 112 Q 200 102 385 112" stroke="#FFB703" stroke-width="2" />
      <!-- Sharp Projector Headlamps -->
      <polygon points="28,110 52,102 52,114 28,116" fill="#00F59B" filter="drop-shadow(0 0 10px #00F59B)" />
      <polygon points="390,105 395,105 395,118 390,118" fill="#FF2E63" filter="drop-shadow(0 0 8px #FF2E63)" />
      <!-- Alloy Wheels -->
      <g transform="translate(85, 140)">
        <circle cx="0" cy="0" r="24" fill="#0F172A" stroke="#475569" stroke-width="4" />
        <circle cx="0" cy="0" r="14" fill="#1E293B" stroke="#00F59B" stroke-width="1.5" />
        <circle cx="0" cy="0" r="5" fill="#E2E8F0" />
      </g>
      <g transform="translate(330, 140)">
        <circle cx="0" cy="0" r="24" fill="#0F172A" stroke="#475569" stroke-width="4" />
        <circle cx="0" cy="0" r="14" fill="#1E293B" stroke="#00F59B" stroke-width="1.5" />
        <circle cx="0" cy="0" r="5" fill="#E2E8F0" />
      </g>
    </svg>
    `;
  } else {
    // Economy Hatchback (Maruti Swift / WagonR / Eeco)
    return `
    <svg viewBox="0 0 420 180" class="vehicle-silhouette-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hatch-grad-${color.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="60%" stop-color="#1E2238" />
          <stop offset="100%" stop-color="#0A0D1B" />
        </linearGradient>
        <linearGradient id="hatch-glass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#0369A1" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <ellipse cx="210" cy="165" rx="165" ry="10" fill="rgba(0,0,0,0.5)" filter="blur(6px)" />
      <!-- Compact Hatchback Body -->
      <path d="M 40 140 L 45 110 Q 75 98 110 90 L 165 56 Q 205 52 300 52 L 360 85 Q 380 95 380 140 Z" fill="url(#hatch-grad-${color.replace('#','')})" stroke="#FFB703" stroke-width="1.5" />
      <!-- Windows -->
      <path d="M 120 88 L 168 62 Q 200 58 250 58 L 250 86 Z" fill="url(#hatch-glass)" stroke="#38BDF8" stroke-width="1" />
      <path d="M 260 58 L 305 60 Q 335 70 345 86 L 260 86 Z" fill="url(#hatch-glass)" stroke="#38BDF8" stroke-width="1" />
      <!-- Sporty Swirl -->
      <path d="M 45 114 Q 180 106 375 116" stroke="#FF6B00" stroke-width="2" />
      <!-- Lamps -->
      <polygon points="42,108 62,104 62,115 42,116" fill="#00F59B" filter="drop-shadow(0 0 8px #00F59B)" />
      <polygon points="375,104 380,104 380,120 375,120" fill="#FF2E63" filter="drop-shadow(0 0 8px #FF2E63)" />
      <!-- Wheels -->
      <g transform="translate(95, 140)">
        <circle cx="0" cy="0" r="23" fill="#111" stroke="#475569" stroke-width="4" />
        <circle cx="0" cy="0" r="13" fill="#1E293B" stroke="#FFB703" stroke-width="1.5" />
        <circle cx="0" cy="0" r="5" fill="#E2E8F0" />
      </g>
      <g transform="translate(315, 140)">
        <circle cx="0" cy="0" r="23" fill="#111" stroke="#475569" stroke-width="4" />
        <circle cx="0" cy="0" r="13" fill="#1E293B" stroke="#FFB703" stroke-width="1.5" />
        <circle cx="0" cy="0" r="5" fill="#E2E8F0" />
      </g>
    </svg>
    `;
  }
}
