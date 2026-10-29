/**
 * SVG-based aesthetic romantic placeholder photo illustrations.
 * Provides high-quality, self-contained SVG data URIs with romantic warmth,
 * film grain feel, and clear Phase 1 placeholder labels.
 */

interface PlaceholderConfig {
  title: string;
  subtitle: string;
  theme: 'sunset' | 'coffee' | 'stars' | 'roadtrip' | 'fairylights' | 'park' | 'seaside' | 'rainy';
}

export function createRomanticPlaceholderSvg({ title, subtitle, theme }: PlaceholderConfig): string {
  const themes = {
    sunset: {
      bgGrad1: '#FCE7D2',
      bgGrad2: '#E78C87',
      bgGrad3: '#9E5B74',
      accent: '#FFD3A5',
      elements: `
        <circle cx="200" cy="180" r="70" fill="url(#sunGlow)" opacity="0.85" />
        <path d="M0 260 Q 100 240, 200 255 T 400 250 L 400 320 L 0 320 Z" fill="#7A4259" opacity="0.9" />
        <path d="M0 275 Q 120 265, 240 280 T 400 270 L 400 320 L 0 320 Z" fill="#542B3F" />
        <!-- Gentle birds in distance -->
        <path d="M120 120 Q126 114 132 120 Q138 114 144 120" stroke="#FFF" stroke-width="2" fill="none" opacity="0.6"/>
        <path d="M148 110 Q152 106 156 110 Q160 106 164 110" stroke="#FFF" stroke-width="1.5" fill="none" opacity="0.5"/>
      `,
    },
    coffee: {
      bgGrad1: '#F5ECE1',
      bgGrad2: '#DEC4A9',
      bgGrad3: '#A88060',
      accent: '#83553C',
      elements: `
        <!-- Wooden table texture lines -->
        <line x1="0" y1="230" x2="400" y2="230" stroke="#D3B89B" stroke-width="2" opacity="0.4"/>
        <line x1="0" y1="280" x2="400" y2="280" stroke="#C4A88B" stroke-width="2" opacity="0.3"/>
        <!-- Two ceramic cups -->
        <ellipse cx="160" cy="190" rx="42" ry="22" fill="#E8D1BE" />
        <ellipse cx="160" cy="188" rx="36" ry="17" fill="#6B3E26" />
        <ellipse cx="160" cy="187" rx="28" ry="12" fill="#845034" />
        <path d="M160 180 Q160 150 155 130" stroke="#FFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5" />
        
        <ellipse cx="240" cy="205" rx="44" ry="24" fill="#F0DDD0" />
        <ellipse cx="240" cy="203" rx="38" ry="18" fill="#5C341F" />
        <ellipse cx="240" cy="202" rx="30" ry="13" fill="#75442A" />
        <!-- Latte art heart -->
        <path d="M240 204 C236 198, 226 200, 228 206 C230 210, 240 215, 240 215 C240 215, 250 210, 252 206 C254 200, 244 198, 240 204 Z" fill="#EBD2BF" opacity="0.9" />
        <path d="M240 195 Q245 165 240 145" stroke="#FFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.5" />
      `,
    },
    stars: {
      bgGrad1: '#1F1B3C',
      bgGrad2: '#2F2755',
      bgGrad3: '#4F356B',
      accent: '#FFDF9E',
      elements: `
        <!-- Big romantic glowing moon -->
        <circle cx="280" cy="110" r="45" fill="#FFF8E7" opacity="0.9" />
        <circle cx="280" cy="110" r="55" fill="#FFEBB8" opacity="0.2" />
        <!-- Twinkling stars -->
        <g fill="#FFF" opacity="0.8">
          <circle cx="80" cy="60" r="2"/>
          <circle cx="140" cy="90" r="2.5"/>
          <circle cx="50" cy="130" r="1.5"/>
          <circle cx="210" cy="50" r="2"/>
          <circle cx="340" cy="70" r="2"/>
          <circle cx="110" cy="170" r="1.5"/>
          <circle cx="360" cy="150" r="2.5"/>
          <circle cx="180" cy="130" r="3"/>
          <path d="M180 120 L180 140 M170 130 L190 130" stroke="#FFE7AA" stroke-width="1.5" />
        </g>
        <!-- Silhouette pine trees / hill -->
        <path d="M0 240 Q 150 210, 400 230 L 400 320 L 0 320 Z" fill="#15122B" />
        <polygon points="60,240 75,170 90,240" fill="#0E0C1C" />
        <polygon points="120,250 140,160 160,250" fill="#0E0C1C" />
        <polygon points="290,245 305,185 320,245" fill="#0E0C1C" />
      `,
    },
    fairylights: {
      bgGrad1: '#2E222D',
      bgGrad2: '#533749',
      bgGrad3: '#7D475C',
      accent: '#FFE29A',
      elements: `
        <!-- String lights swags -->
        <path d="M0 70 Q 100 120, 200 80 T 400 90" stroke="#7A6858" stroke-width="2" fill="none" />
        <path d="M0 130 Q 120 180, 240 140 T 400 150" stroke="#7A6858" stroke-width="2" fill="none" />
        <!-- Glowing fairy light bulbs -->
        <g>
          <circle cx="60" cy="95" r="12" fill="#FFEAA7" opacity="0.3"/>
          <circle cx="60" cy="95" r="6" fill="#FFF5D0"/>
          <circle cx="130" cy="106" r="14" fill="#FFEAA7" opacity="0.3"/>
          <circle cx="130" cy="106" r="7" fill="#FFFDF0"/>
          <circle cx="210" cy="84" r="12" fill="#FFEAA7" opacity="0.3"/>
          <circle cx="210" cy="84" r="6" fill="#FFF5D0"/>
          <circle cx="310" cy="94" r="15" fill="#FFEAA7" opacity="0.3"/>
          <circle cx="310" cy="94" r="7" fill="#FFFDF0"/>
          
          <circle cx="80" cy="155" r="13" fill="#FFC996" opacity="0.35"/>
          <circle cx="80" cy="155" r="6" fill="#FFF2DF"/>
          <circle cx="180" cy="168" r="16" fill="#FFC996" opacity="0.35"/>
          <circle cx="180" cy="168" r="8" fill="#FFFDF0"/>
          <circle cx="290" cy="148" r="14" fill="#FFC996" opacity="0.35"/>
          <circle cx="290" cy="148" r="6.5" fill="#FFF2DF"/>
        </g>
        <!-- Bokeh circles -->
        <circle cx="50" cy="240" r="30" fill="#FFB088" opacity="0.1" />
        <circle cx="320" cy="230" r="45" fill="#FFD494" opacity="0.12" />
        <circle cx="200" cy="260" r="25" fill="#FFB088" opacity="0.08" />
      `,
    },
    roadtrip: {
      bgGrad1: '#9BC5D4',
      bgGrad2: '#E7BD9D',
      bgGrad3: '#DF8B74',
      accent: '#FFF1D0',
      elements: `
        <!-- Rolling mountains in sunset glow -->
        <polygon points="0,210 110,130 220,210" fill="#846B84" opacity="0.6"/>
        <polygon points="150,220 270,110 390,220" fill="#6B536B" opacity="0.7"/>
        <!-- Winding scenic road -->
        <path d="M190 200 L 210 200 L 320 320 L 80 320 Z" fill="#4A4143" />
        <path d="M200 200 L 200 215 M200 230 L 200 250 M200 270 L 200 300" stroke="#FFE9A0" stroke-width="3" stroke-dasharray="8 8" />
        <!-- Scenic hills -->
        <path d="M0 240 Q 90 200, 190 240 L 0 320 Z" fill="#698A62" opacity="0.8"/>
        <path d="M210 240 Q 310 200, 400 240 L 400 320 Z" fill="#5A7A54" opacity="0.8"/>
      `,
    },
    park: {
      bgGrad1: '#E9F1DF',
      bgGrad2: '#C9DCB3',
      bgGrad3: '#98B682',
      accent: '#F38181',
      elements: `
        <!-- Sun rays -->
        <circle cx="340" cy="60" r="80" fill="#FFF7D6" opacity="0.5" />
        <!-- Park bench silhouette -->
        <path d="M140 240 L 260 240 M 150 240 L 150 270 M 250 240 L 250 270" stroke="#4F3824" stroke-width="4" stroke-linecap="round"/>
        <path d="M145 220 L 255 220" stroke="#5D432C" stroke-width="4" stroke-linecap="round"/>
        <!-- Falling autumn / cherry blossom petals -->
        <g fill="#F28B82" opacity="0.75">
          <ellipse cx="120" cy="140" rx="6" ry="3" transform="rotate(25 120 140)" />
          <ellipse cx="200" cy="110" rx="7" ry="4" transform="rotate(-15 200 110)" />
          <ellipse cx="270" cy="160" rx="5" ry="3" transform="rotate(45 270 160)" />
          <ellipse cx="170" cy="180" rx="6" ry="3" transform="rotate(-30 170 180)" />
          <ellipse cx="230" cy="210" rx="6" ry="3.5" transform="rotate(20 230 210)" />
        </g>
      `,
    },
    seaside: {
      bgGrad1: '#E2F1F8',
      bgGrad2: '#A7D7E8',
      bgGrad3: '#5C9EAD',
      accent: '#EFC9AF',
      elements: `
        <!-- Gentle waves -->
        <path d="M0 190 Q 50 180, 100 190 T 200 190 T 300 190 T 400 190 L 400 320 L 0 320 Z" fill="#4A8B9C" opacity="0.7"/>
        <path d="M0 220 Q 60 210, 120 220 T 240 220 T 360 220 T 400 220 L 400 320 L 0 320 Z" fill="#3D7887" opacity="0.85"/>
        <path d="M0 250 Q 80 240, 160 250 T 320 250 T 400 250 L 400 320 L 0 320 Z" fill="#E8CDA8" />
        <!-- Sand details -->
        <circle cx="140" cy="285" r="4" fill="#C9A67A" opacity="0.6"/>
        <circle cx="280" cy="275" r="5" fill="#C9A67A" opacity="0.6"/>
        <!-- Two little seashells -->
        <path d="M210 280 Q215 270 220 280 Z" fill="#FFF2E0" stroke="#C9A67A" stroke-width="1"/>
      `,
    },
    rainy: {
      bgGrad1: '#6E7D8A',
      bgGrad2: '#4B5864',
      bgGrad3: '#313A42',
      accent: '#FFD166',
      elements: `
        <!-- Cozy warm window reflection with rain -->
        <rect x="70" y="50" width="260" height="190" rx="12" fill="#E5AA70" opacity="0.15" />
        <line x1="200" y1="50" x2="200" y2="240" stroke="#FFF" stroke-width="2" opacity="0.3"/>
        <line x1="70" y1="145" x2="330" y2="145" stroke="#FFF" stroke-width="2" opacity="0.3"/>
        <!-- Rain streaks -->
        <g stroke="#A6C0D0" stroke-width="1.5" opacity="0.45" stroke-linecap="round">
          <line x1="90" y1="70" x2="80" y2="95"/>
          <line x1="150" y1="110" x2="140" y2="135"/>
          <line x1="230" y1="80" x2="220" y2="105"/>
          <line x1="280" y1="130" x2="270" y2="155"/>
          <line x1="120" y1="160" x2="110" y2="185"/>
          <line x1="250" y1="170" x2="240" y2="195"/>
        </g>
        <!-- Warm yellow light glowing inside -->
        <circle cx="200" cy="145" r="60" fill="#FFDB8B" opacity="0.25" />
      `,
    },
  }[theme];

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${themes.bgGrad1}" />
      <stop offset="60%" stop-color="${themes.bgGrad2}" />
      <stop offset="100%" stop-color="${themes.bgGrad3}" />
    </linearGradient>
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF5E4" stop-opacity="0.95" />
      <stop offset="60%" stop-color="#FFD699" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#E78C87" stop-opacity="0" />
    </radialGradient>
    <!-- Paper texture grain filter -->
    <filter id="filmGrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.07 0" />
      <feBlend mode="multiply" in="SourceGraphic" result="blend" />
    </filter>
  </defs>

  <!-- Background Base with warm gradient -->
  <rect width="400" height="320" fill="url(#bgGrad)" />

  <!-- Thematic vector illustration elements -->
  ${themes.elements}

  <!-- Film grain overlay -->
  <rect width="400" height="320" fill="#000" opacity="0.05" filter="url(#filmGrain)" />

  <!-- Polaroid Inner Vignette / Soft Border -->
  <rect x="0" y="0" width="400" height="320" fill="none" stroke="#FFFFFF" stroke-width="8" opacity="0.35" />

  <!-- Phase 1 Placeholder Badge Ribbon in corner -->
  <g transform="translate(14, 14)">
    <rect x="0" y="0" width="148" height="24" rx="6" fill="#2C2623" opacity="0.75" />
    <text x="74" y="16" fill="#FFFDF9" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="600" letter-spacing="0.5" text-anchor="middle">
      📷 PHASE 1 PLACEHOLDER
    </text>
  </g>

  <!-- Title & Subtitle Badge -->
  <g transform="translate(200, 280)">
    <rect x="-140" y="-22" width="280" height="34" rx="17" fill="#FFFDF9" opacity="0.88" />
    <text x="0" y="-3" fill="#2C2623" font-family="'Playfair Display', serif" font-size="13" font-weight="600" text-anchor="middle">
      ${title}
    </text>
    <text x="0" y="9" fill="#7A6858" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" text-anchor="middle">
      ${subtitle}
    </text>
  </g>
</svg>
`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
