/**
 * SkeuomorphicIcons – Volt UI
 * 9 skeuomorphische Icons im 3D-Plastik-Grau-Stil
 * Vollständig als SVG via Code – keine Bilder, maximale Skalierbarkeit
 * Stil: monochrom grau, weiche Schatten, Glanzlichter, 3D-Tiefe
 */

import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

/* ─────────────────────────────────────────────
   1. FINDER / APP-ICON
───────────────────────────────────────────── */
export const IconFinder: React.FC<IconProps> = ({ size = 80, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="finder-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E8E8E8" />
        <stop offset="50%" stopColor="#C8C8C8" />
        <stop offset="100%" stopColor="#A8A8A8" />
      </linearGradient>
      <linearGradient id="finder-shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <filter id="finder-shadow">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>
    {/* Körper */}
    <rect x="8" y="8" width="64" height="64" rx="14" fill="url(#finder-bg)" filter="url(#finder-shadow)" />
    {/* Glanzlicht oben */}
    <rect x="8" y="8" width="64" height="30" rx="14" fill="url(#finder-shine)" />
    {/* Smiley-Gesicht – linke Hälfte dunkel */}
    <path d="M8 40 Q8 72 22 72 L40 72 L40 8 Q8 8 8 22 Z" fill="#9A9A9A" opacity="0.5" />
    {/* Augen */}
    <ellipse cx="28" cy="32" rx="5" ry="6" fill="#4A4A4A" />
    <ellipse cx="52" cy="32" rx="5" ry="6" fill="#4A4A4A" />
    <ellipse cx="29" cy="31" rx="2" ry="2.5" fill="white" opacity="0.6" />
    <ellipse cx="53" cy="31" rx="2" ry="2.5" fill="white" opacity="0.6" />
    {/* Lächeln */}
    <path d="M24 50 Q40 64 56 50" stroke="#4A4A4A" strokeWidth="4" strokeLinecap="round" fill="none" />
    {/* Rand */}
    <rect x="8" y="8" width="64" height="64" rx="14" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
  </svg>
);

/* ─────────────────────────────────────────────
   2. DOKUMENT / CLIPBOARD
───────────────────────────────────────────── */
export const IconDocument: React.FC<IconProps> = ({ size = 80, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="doc-paper" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#F0F0F0" />
        <stop offset="100%" stopColor="#D8D8D8" />
      </linearGradient>
      <linearGradient id="doc-paper2" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#E8E8E8" />
        <stop offset="100%" stopColor="#C8C8C8" />
      </linearGradient>
      <linearGradient id="doc-clip" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C0C0C0" />
        <stop offset="100%" stopColor="#888" />
      </linearGradient>
      <filter id="doc-shadow">
        <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.2" />
      </filter>
    </defs>
    {/* Hinteres Blatt */}
    <rect x="20" y="14" width="42" height="54" rx="3" fill="url(#doc-paper2)" transform="rotate(-6 41 41)" filter="url(#doc-shadow)" />
    {/* Mittleres Blatt */}
    <rect x="18" y="12" width="42" height="54" rx="3" fill="url(#doc-paper)" transform="rotate(-2 39 39)" />
    {/* Vorderes Blatt */}
    <rect x="16" y="10" width="44" height="56" rx="3" fill="url(#doc-paper)" />
    {/* Linien */}
    <line x1="24" y1="30" x2="52" y2="30" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="38" x2="52" y2="38" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="46" x2="44" y2="46" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" />
    {/* Kleines Diagramm */}
    <rect x="24" y="52" width="12" height="8" rx="1" fill="#C8C8C8" />
    <rect x="38" y="48" width="12" height="12" rx="1" fill="#B8B8B8" />
    {/* Binder-Clip */}
    <path d="M32 6 Q40 2 48 6 L48 14 Q40 10 32 14 Z" fill="url(#doc-clip)" />
    <path d="M36 6 Q40 4 44 6 L44 10 Q40 8 36 10 Z" fill="#AAAAAA" />
    <rect x="38" y="2" width="4" height="10" rx="2" fill="#999" />
    {/* Glanzlicht */}
    <rect x="16" y="10" width="44" height="20" rx="3" fill="white" opacity="0.25" />
  </svg>
);

/* ─────────────────────────────────────────────
   3. CLOUD UPLOAD
───────────────────────────────────────────── */
export const IconCloud: React.FC<IconProps> = ({ size = 80, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="cloud-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F2F2F2" />
        <stop offset="100%" stopColor="#C8C8C8" />
      </linearGradient>
      <linearGradient id="cloud-shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.7" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <filter id="cloud-shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.2" />
      </filter>
    </defs>
    {/* Wolken-Körper */}
    <path d="M58 52 C66 52 72 46 72 38 C72 31 67 25 60 24 C58 17 51 12 43 12 C34 12 27 18 26 27 C20 28 15 33 15 40 C15 47 20 52 27 52 Z"
      fill="url(#cloud-body)" filter="url(#cloud-shadow)" />
    {/* Glanzlicht */}
    <path d="M30 26 C33 19 39 15 46 15 C52 15 57 18 60 23 C55 22 50 24 47 28 C44 24 37 22 30 26 Z"
      fill="url(#cloud-shine)" />
    {/* Pfeil nach oben */}
    <path d="M40 62 L40 38" stroke="#888" strokeWidth="4" strokeLinecap="round" />
    <path d="M32 46 L40 38 L48 46" stroke="#888" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Rand */}
    <path d="M58 52 C66 52 72 46 72 38 C72 31 67 25 60 24 C58 17 51 12 43 12 C34 12 27 18 26 27 C20 28 15 33 15 40 C15 47 20 52 27 52 Z"
      stroke="white" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
  </svg>
);

/* ─────────────────────────────────────────────
   4. DOWNLOAD-PFEIL
───────────────────────────────────────────── */
export const IconDownload: React.FC<IconProps> = ({ size = 80, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="arrow-face" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E0E0E0" />
        <stop offset="100%" stopColor="#B0B0B0" />
      </linearGradient>
      <linearGradient id="arrow-side" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#A0A0A0" />
        <stop offset="100%" stopColor="#888888" />
      </linearGradient>
      <filter id="arrow-shadow">
        <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>
    {/* 3D-Pfeil – Vorderseite */}
    <path d="M40 68 L14 42 L26 42 L26 16 L54 16 L54 42 L66 42 Z"
      fill="url(#arrow-face)" filter="url(#arrow-shadow)" />
    {/* 3D-Pfeil – rechte Seite (Tiefe) */}
    <path d="M54 16 L58 20 L58 46 L66 46 L66 42 L54 42 Z"
      fill="url(#arrow-side)" />
    <path d="M40 68 L44 72 L66 46 L66 42 Z"
      fill="url(#arrow-side)" />
    {/* Glanzlicht oben */}
    <path d="M26 16 L54 16 L54 28 L26 28 Z" fill="white" opacity="0.3" />
    {/* Rand */}
    <path d="M40 68 L14 42 L26 42 L26 16 L54 16 L54 42 L66 42 Z"
      stroke="white" strokeWidth="1" strokeOpacity="0.4" fill="none" />
  </svg>
);

/* ─────────────────────────────────────────────
   5. ORDNER
───────────────────────────────────────────── */
export const IconFolder: React.FC<IconProps> = ({ size = 80, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="folder-back" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D8D8D8" />
        <stop offset="100%" stopColor="#A8A8A8" />
      </linearGradient>
      <linearGradient id="folder-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E8E8E8" />
        <stop offset="100%" stopColor="#C0C0C0" />
      </linearGradient>
      <linearGradient id="folder-badge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D0D0D0" />
        <stop offset="100%" stopColor="#A0A0A0" />
      </linearGradient>
      <filter id="folder-shadow">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.2" />
      </filter>
    </defs>
    {/* Rückwand */}
    <path d="M10 32 L10 66 Q10 70 14 70 L66 70 Q70 70 70 66 L70 32 Z"
      fill="url(#folder-back)" filter="url(#folder-shadow)" />
    {/* Tab */}
    <path d="M10 32 L10 26 Q10 22 14 22 L34 22 Q38 22 40 26 L44 32 Z"
      fill="url(#folder-back)" />
    {/* Vorderwand */}
    <path d="M10 38 L10 66 Q10 70 14 70 L66 70 Q70 70 70 66 L70 38 Z"
      fill="url(#folder-front)" />
    {/* Glanzlicht */}
    <path d="M10 38 L70 38 L70 50 Q40 56 10 50 Z" fill="white" opacity="0.2" />
    {/* User-Badge */}
    <circle cx="40" cy="56" r="10" fill="url(#folder-badge)" />
    <circle cx="40" cy="53" r="4" fill="#B0B0B0" />
    <path d="M30 66 Q30 60 40 60 Q50 60 50 66" fill="#B0B0B0" />
    {/* Rand */}
    <path d="M10 38 L10 66 Q10 70 14 70 L66 70 Q70 70 70 66 L70 38 Z"
      stroke="white" strokeWidth="1" strokeOpacity="0.4" fill="none" />
  </svg>
);

/* ─────────────────────────────────────────────
   6. PAPIERKORB
───────────────────────────────────────────── */
export const IconTrash: React.FC<IconProps> = ({ size = 80, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="trash-metal" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#C8C8C8" />
        <stop offset="30%" stopColor="#E8E8E8" />
        <stop offset="60%" stopColor="#C0C0C0" />
        <stop offset="100%" stopColor="#A8A8A8" />
      </linearGradient>
      <filter id="trash-shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.2" />
      </filter>
    </defs>
    {/* Basis */}
    <ellipse cx="40" cy="68" rx="22" ry="4" fill="#B0B0B0" opacity="0.5" />
    {/* Körper-Silhouette */}
    <path d="M20 28 L24 72 Q24 76 28 76 L52 76 Q56 76 56 72 L60 28 Z"
      fill="url(#trash-metal)" filter="url(#trash-shadow)" />
    {/* Vertikale Stäbe */}
    {[28, 33, 38, 43, 48, 53].map((x, i) => (
      <line key={i} x1={x} y1="32" x2={x - 1} y2="72" stroke="#A0A0A0" strokeWidth="2.5" strokeLinecap="round" />
    ))}
    {/* Horizontale Ringe */}
    <path d="M21 40 Q40 44 59 40" stroke="#B0B0B0" strokeWidth="2" fill="none" />
    <path d="M22 52 Q40 56 58 52" stroke="#B0B0B0" strokeWidth="2" fill="none" />
    <path d="M23 64 Q40 68 57 64" stroke="#B0B0B0" strokeWidth="2" fill="none" />
    {/* Deckel */}
    <rect x="16" y="22" width="48" height="8" rx="3" fill="url(#trash-metal)" />
    <rect x="16" y="22" width="48" height="4" rx="3" fill="white" opacity="0.3" />
    {/* Griff */}
    <rect x="32" y="14" width="16" height="10" rx="3" fill="url(#trash-metal)" />
    <rect x="35" y="14" width="10" height="5" rx="2" fill="#B8B8B8" />
  </svg>
);

/* ─────────────────────────────────────────────
   7. ZAHNRAD / EINSTELLUNGEN
───────────────────────────────────────────── */
export const IconGear: React.FC<IconProps> = ({ size = 80, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="gear-body" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#E0E0E0" />
        <stop offset="60%" stopColor="#B8B8B8" />
        <stop offset="100%" stopColor="#888888" />
      </radialGradient>
      <radialGradient id="gear-inner" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#C8C8C8" />
        <stop offset="100%" stopColor="#909090" />
      </radialGradient>
      <filter id="gear-shadow">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>
    {/* Zahnrad-Zähne */}
    <path d="
      M40 8 L44 14 L50 12 L52 18 L58 18 L58 24 L64 26 L62 32 L68 36 L64 40
      L68 44 L62 48 L64 54 L58 56 L58 62 L52 62 L50 68 L44 66 L40 72
      L36 66 L30 68 L28 62 L22 62 L22 56 L16 54 L18 48 L12 44 L16 40
      L12 36 L18 32 L16 26 L22 24 L22 18 L28 18 L30 12 L36 14 Z"
      fill="url(#gear-body)" filter="url(#gear-shadow)" />
    {/* Glanzlicht */}
    <path d="M40 8 L44 14 L50 12 L52 18 L58 18 L58 24 L64 26 L62 32 L58 28 L54 22 L48 16 L42 10 Z"
      fill="white" opacity="0.35" />
    {/* Innerer Ring */}
    <circle cx="40" cy="40" r="14" fill="url(#gear-inner)" />
    <circle cx="40" cy="40" r="14" stroke="#A0A0A0" strokeWidth="1.5" fill="none" />
    {/* Mittelloch */}
    <circle cx="40" cy="40" r="7" fill="#707070" />
    <circle cx="40" cy="40" r="7" stroke="#606060" strokeWidth="1" fill="none" />
    {/* Highlight im Mittelloch */}
    <circle cx="37" cy="37" r="3" fill="white" opacity="0.2" />
  </svg>
);

/* ─────────────────────────────────────────────
   8. LUPE / SUCHE
───────────────────────────────────────────── */
export const IconSearch: React.FC<IconProps> = ({ size = 80, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="lens-glass" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#F0F0F0" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#D8D8D8" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#B0B0B0" stopOpacity="0.8" />
      </radialGradient>
      <linearGradient id="handle-metal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D8D8D8" />
        <stop offset="50%" stopColor="#E8E8E8" />
        <stop offset="100%" stopColor="#A8A8A8" />
      </linearGradient>
      <linearGradient id="ring-metal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D0D0D0" />
        <stop offset="100%" stopColor="#909090" />
      </linearGradient>
      <filter id="search-shadow">
        <feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.2" />
      </filter>
    </defs>
    {/* Griff */}
    <rect x="52" y="52" width="20" height="10" rx="5" fill="url(#handle-metal)"
      transform="rotate(45 62 57)" filter="url(#search-shadow)" />
    {/* Metallring */}
    <circle cx="32" cy="32" r="20" fill="none" stroke="url(#ring-metal)" strokeWidth="7" filter="url(#search-shadow)" />
    {/* Glas */}
    <circle cx="32" cy="32" r="16" fill="url(#lens-glass)" />
    {/* Glanzlicht */}
    <ellipse cx="26" cy="26" rx="7" ry="5" fill="white" opacity="0.6" transform="rotate(-30 26 26)" />
    {/* Rand */}
    <circle cx="32" cy="32" r="20" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
  </svg>
);

/* ─────────────────────────────────────────────
   9. NETZWERK / COMPUTER
───────────────────────────────────────────── */
export const IconNetwork: React.FC<IconProps> = ({ size = 80, className }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="monitor-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D8D8D8" />
        <stop offset="100%" stopColor="#A8A8A8" />
      </linearGradient>
      <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C8C8C8" />
        <stop offset="100%" stopColor="#909090" />
      </linearGradient>
      <filter id="net-shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
      </filter>
    </defs>

    {/* Oberer Monitor (groß, mittig) */}
    <g filter="url(#net-shadow)">
      <rect x="22" y="8" width="36" height="26" rx="3" fill="url(#monitor-body)" />
      <rect x="25" y="11" width="30" height="18" rx="1" fill="url(#screen)" />
      <rect x="25" y="11" width="30" height="8" rx="1" fill="white" opacity="0.2" />
      <rect x="36" y="34" width="8" height="5" fill="#B8B8B8" />
      <rect x="32" y="38" width="16" height="3" rx="1.5" fill="#B0B0B0" />
    </g>

    {/* Verbindungslinien */}
    <line x1="40" y1="41" x2="18" y2="56" stroke="#B0B0B0" strokeWidth="2" strokeDasharray="3 2" />
    <line x1="40" y1="41" x2="62" y2="56" stroke="#B0B0B0" strokeWidth="2" strokeDasharray="3 2" />

    {/* Linker Monitor (klein) */}
    <g filter="url(#net-shadow)">
      <rect x="4" y="54" width="28" height="20" rx="2" fill="url(#monitor-body)" />
      <rect x="7" y="57" width="22" height="13" rx="1" fill="url(#screen)" />
      <rect x="7" y="57" width="22" height="6" rx="1" fill="white" opacity="0.2" />
      <rect x="14" y="74" width="6" height="3" fill="#B8B8B8" />
      <rect x="11" y="76" width="12" height="2" rx="1" fill="#B0B0B0" />
    </g>

    {/* Rechter Monitor (klein) */}
    <g filter="url(#net-shadow)">
      <rect x="48" y="54" width="28" height="20" rx="2" fill="url(#monitor-body)" />
      <rect x="51" y="57" width="22" height="13" rx="1" fill="url(#screen)" />
      <rect x="51" y="57" width="22" height="6" rx="1" fill="white" opacity="0.2" />
      <rect x="58" y="74" width="6" height="3" fill="#B8B8B8" />
      <rect x="55" y="76" width="12" height="2" rx="1" fill="#B0B0B0" />
    </g>
  </svg>
);

/* ─────────────────────────────────────────────
   EXPORT: Alle Icons als Array für die Sektion
───────────────────────────────────────────── */
export const SKEUOMORPHIC_ICONS = [
  { id: "finder",   label: "Finder",     component: IconFinder },
  { id: "document", label: "Dokument",   component: IconDocument },
  { id: "cloud",    label: "Cloud",      component: IconCloud },
  { id: "download", label: "Download",   component: IconDownload },
  { id: "folder",   label: "Ordner",     component: IconFolder },
  { id: "trash",    label: "Papierkorb", component: IconTrash },
  { id: "gear",     label: "Einstellungen", component: IconGear },
  { id: "search",   label: "Suche",      component: IconSearch },
  { id: "network",  label: "Netzwerk",   component: IconNetwork },
] as const;
