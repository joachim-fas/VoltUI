/**
 * SkeuomorphicIcons – Volt UI
 * 18 skeuomorphische Icons im 3D-Plastik-Grau-Stil
 * viewBox: 0 0 64 64 · Lichtquelle: oben-links · Monochrom Grau
 * Technik: linearGradient, radialGradient, feDropShadow
 */

import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

/* ─────────────────────────────────────────────
   HILFSFUNKTION: Eindeutige IDs pro Instanz
───────────────────────────────────────────── */
let _idCounter = 0;
function uid(prefix: string) {
  return `${prefix}-${++_idCounter}`;
}

/* ─────────────────────────────────────────────
   1. FINDER (Smiley-App-Icon)
───────────────────────────────────────────── */
export const IconFinder: React.FC<IconProps> = ({ size = 64, className }) => {
  const bg = uid("fi-bg");
  const sh = uid("fi-sh");
  const sd = uid("fi-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bg} x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EBEBEB" />
          <stop offset="55%" stopColor="#CCCCCC" />
          <stop offset="100%" stopColor="#AAAAAA" />
        </linearGradient>
        <linearGradient id={sh} x1="32" y1="4" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.28" />
        </filter>
      </defs>
      {/* Körper */}
      <rect x="6" y="6" width="52" height="52" rx="12" fill={`url(#${bg})`} filter={`url(#${sd})`} />
      {/* Linke Hälfte dunkler */}
      <path d="M6 18 Q6 6 18 6 L32 6 L32 58 L18 58 Q6 58 6 46 Z" fill="#999" opacity="0.22" />
      {/* Glanzlicht */}
      <rect x="6" y="6" width="52" height="26" rx="12" fill={`url(#${sh})`} />
      {/* Augen */}
      <ellipse cx="23" cy="26" rx="4" ry="5" fill="#3A3A3A" />
      <ellipse cx="41" cy="26" rx="4" ry="5" fill="#3A3A3A" />
      <ellipse cx="24" cy="25" rx="1.5" ry="2" fill="white" opacity="0.55" />
      <ellipse cx="42" cy="25" rx="1.5" ry="2" fill="white" opacity="0.55" />
      {/* Lächeln */}
      <path d="M19 40 Q32 52 45 40" stroke="#3A3A3A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Rand */}
      <rect x="6" y="6" width="52" height="52" rx="12" stroke="white" strokeWidth="1.2" strokeOpacity="0.35" fill="none" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   2. DOKUMENT
───────────────────────────────────────────── */
export const IconDocument: React.FC<IconProps> = ({ size = 64, className }) => {
  const p1 = uid("do-p1");
  const p2 = uid("do-p2");
  const sd = uid("do-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={p1} x1="32" y1="6" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4F4F4" />
          <stop offset="100%" stopColor="#D4D4D4" />
        </linearGradient>
        <linearGradient id={p2} x1="32" y1="6" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#C4C4C4" />
        </linearGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>
      {/* Hinteres Blatt */}
      <rect x="17" y="10" width="34" height="44" rx="3" fill={`url(#${p2})`}
        transform="rotate(-5 34 32)" filter={`url(#${sd})`} />
      {/* Vorderes Blatt */}
      <rect x="13" y="8" width="36" height="48" rx="3" fill={`url(#${p1})`} />
      {/* Eselsohren-Ecke */}
      <path d="M37 8 L49 8 L49 20 Z" fill="#C0C0C0" />
      <path d="M37 8 L49 20 L37 20 Z" fill="#D8D8D8" />
      {/* Linien */}
      <line x1="19" y1="26" x2="43" y2="26" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="33" x2="43" y2="33" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="40" x2="35" y2="40" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round" />
      {/* Glanzlicht */}
      <rect x="13" y="8" width="36" height="18" rx="3" fill="white" opacity="0.3" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   3. ORDNER
───────────────────────────────────────────── */
export const IconFolder: React.FC<IconProps> = ({ size = 64, className }) => {
  const bk = uid("fo-bk");
  const fr = uid("fo-fr");
  const sd = uid("fo-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bk} x1="32" y1="14" x2="32" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D0D0D0" />
          <stop offset="100%" stopColor="#A0A0A0" />
        </linearGradient>
        <linearGradient id={fr} x1="32" y1="26" x2="32" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E4E4E4" />
          <stop offset="100%" stopColor="#BEBEBE" />
        </linearGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      {/* Rückwand */}
      <path d="M8 26 L8 52 Q8 56 12 56 L52 56 Q56 56 56 52 L56 26 Z" fill={`url(#${bk})`} filter={`url(#${sd})`} />
      {/* Tab */}
      <path d="M8 26 L8 20 Q8 16 12 16 L26 16 Q30 16 32 20 L36 26 Z" fill={`url(#${bk})`} />
      {/* Vorderwand */}
      <path d="M8 32 L8 52 Q8 56 12 56 L52 56 Q56 56 56 52 L56 32 Z" fill={`url(#${fr})`} />
      {/* Glanzlicht */}
      <path d="M8 32 L56 32 L56 42 Q32 47 8 42 Z" fill="white" opacity="0.22" />
      {/* Rand */}
      <path d="M8 32 L8 52 Q8 56 12 56 L52 56 Q56 56 56 52 L56 32 Z" stroke="white" strokeWidth="1" strokeOpacity="0.3" fill="none" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   4. PAPIERKORB
───────────────────────────────────────────── */
export const IconTrash: React.FC<IconProps> = ({ size = 64, className }) => {
  const bd = uid("tr-bd");
  const sd = uid("tr-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bd} x1="32" y1="14" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DEDEDE" />
          <stop offset="100%" stopColor="#ABABAB" />
        </linearGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      {/* Deckel */}
      <rect x="10" y="14" width="44" height="7" rx="3.5" fill="#C8C8C8" filter={`url(#${sd})`} />
      {/* Griff */}
      <rect x="24" y="8" width="16" height="8" rx="4" fill="#C0C0C0" />
      <rect x="26" y="10" width="12" height="4" rx="2" fill="#D8D8D8" />
      {/* Körper */}
      <path d="M14 21 L16 54 Q16 58 20 58 L44 58 Q48 58 48 54 L50 21 Z" fill={`url(#${bd})`} />
      {/* Streifen */}
      <line x1="26" y1="28" x2="25" y2="51" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="28" x2="32" y2="51" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="28" x2="39" y2="51" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" />
      {/* Glanzlicht */}
      <path d="M14 21 L50 21 L49 32 Q32 36 15 32 Z" fill="white" opacity="0.25" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   5. EINSTELLUNGEN (Zahnrad)
───────────────────────────────────────────── */
export const IconSettings: React.FC<IconProps> = ({ size = 64, className }) => {
  const bd = uid("se-bd");
  const rg = uid("se-rg");
  const sd = uid("se-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bd} x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DEDEDE" />
          <stop offset="100%" stopColor="#A8A8A8" />
        </linearGradient>
        <radialGradient id={rg} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#EEEEEE" />
          <stop offset="100%" stopColor="#B8B8B8" />
        </radialGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.28" />
        </filter>
      </defs>
      {/* Zahnrad-Körper */}
      <path d="
        M32 4
        L36 4 L38 10 Q42 11 45 13 L51 10 L54 13 L51 19 Q53 22 54 26 L60 28 L60 32 L60 36
        L54 38 Q53 42 51 45 L54 51 L51 54 L45 51 Q42 53 38 54 L36 60 L32 60 L28 60
        L26 54 Q22 53 19 51 L13 54 L10 51 L13 45 Q11 42 10 38 L4 36 L4 32 L4 28
        L10 26 Q11 22 13 19 L10 13 L13 10 L19 13 Q22 11 26 10 L28 4 Z
      " fill={`url(#${bd})`} filter={`url(#${sd})`} />
      {/* Innerer Kreis */}
      <circle cx="32" cy="32" r="11" fill={`url(#${rg})`} />
      <circle cx="32" cy="32" r="11" stroke="#AAAAAA" strokeWidth="1" fill="none" />
      {/* Glanzlicht */}
      <ellipse cx="28" cy="26" rx="6" ry="4" fill="white" opacity="0.35" transform="rotate(-30 28 26)" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   6. LUPE / SUCHE
───────────────────────────────────────────── */
export const IconSearch: React.FC<IconProps> = ({ size = 64, className }) => {
  const gl = uid("sr-gl");
  const rg = uid("sr-rg");
  const sd = uid("sr-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={gl} x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0E0E0" />
          <stop offset="100%" stopColor="#B0B0B0" />
        </linearGradient>
        <radialGradient id={rg} cx="38%" cy="32%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(200,220,255,0.15)" />
        </radialGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* Griff */}
      <rect x="42" y="44" width="16" height="9" rx="4.5" fill="#BBBBBB"
        transform="rotate(45 50 48.5)" filter={`url(#${sd})`} />
      {/* Linsenring */}
      <circle cx="25" cy="25" r="18" fill={`url(#${gl})`} filter={`url(#${sd})`} />
      <circle cx="25" cy="25" r="18" stroke="#AAAAAA" strokeWidth="1.5" fill="none" />
      {/* Glas */}
      <circle cx="25" cy="25" r="13" fill={`url(#${rg})`} />
      {/* Glanzlicht */}
      <ellipse cx="20" cy="19" rx="5" ry="3.5" fill="white" opacity="0.55" transform="rotate(-20 20 19)" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   7. CLOUD
───────────────────────────────────────────── */
export const IconCloud: React.FC<IconProps> = ({ size = 64, className }) => {
  const bd = uid("cl-bd");
  const sh = uid("cl-sh");
  const sd = uid("cl-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bd} x1="32" y1="10" x2="32" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F0F0F0" />
          <stop offset="100%" stopColor="#C4C4C4" />
        </linearGradient>
        <linearGradient id={sh} x1="32" y1="10" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.65" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>
      {/* Wolke */}
      <path d="M46 42 C52 42 57 37 57 31 C57 25 52 20 46 20 C44 14 38 10 31 10 C23 10 17 15 16 23 C11 24 7 28 7 34 C7 40 11 44 17 44 Z"
        fill={`url(#${bd})`} filter={`url(#${sd})`} />
      {/* Glanzlicht */}
      <path d="M20 22 C23 16 29 12 36 12 C41 12 45 14 48 18 C43 17 38 19 35 23 C32 19 26 18 20 22 Z"
        fill={`url(#${sh})`} />
      {/* Pfeil nach oben */}
      <line x1="32" y1="54" x2="32" y2="36" stroke="#999" strokeWidth="3.5" strokeLinecap="round" />
      <polyline points="25,43 32,36 39,43" stroke="#999" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Rand */}
      <path d="M46 42 C52 42 57 37 57 31 C57 25 52 20 46 20 C44 14 38 10 31 10 C23 10 17 15 16 23 C11 24 7 28 7 34 C7 40 11 44 17 44 Z"
        stroke="white" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   8. DOWNLOAD
───────────────────────────────────────────── */
export const IconDownload: React.FC<IconProps> = ({ size = 64, className }) => {
  const fc = uid("dl-fc");
  const sd = uid("dl-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={fc} x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E4E4E4" />
          <stop offset="100%" stopColor="#B4B4B4" />
        </linearGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="3" stdDeviation="3.5" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* Schaft */}
      <rect x="26" y="8" width="12" height="30" rx="2" fill={`url(#${fc})`} filter={`url(#${sd})`} />
      {/* Pfeilkopf */}
      <path d="M14 36 L32 54 L50 36 Z" fill={`url(#${fc})`} filter={`url(#${sd})`} />
      {/* Basis */}
      <rect x="10" y="54" width="44" height="6" rx="3" fill={`url(#${fc})`} filter={`url(#${sd})`} />
      {/* Glanzlicht Schaft */}
      <rect x="26" y="8" width="12" height="14" rx="2" fill="white" opacity="0.35" />
      {/* Glanzlicht Pfeil */}
      <path d="M14 36 L32 36 L32 54 Z" fill="white" opacity="0.18" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   9. NETZWERK / HUB
───────────────────────────────────────────── */
export const IconNetwork: React.FC<IconProps> = ({ size = 64, className }) => {
  const nd = uid("nw-nd");
  const sd = uid("nw-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id={nd} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#AAAAAA" />
        </radialGradient>
        <filter id={sd} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      {/* Verbindungslinien */}
      <line x1="32" y1="32" x2="12" y2="14" stroke="#C0C0C0" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="32" x2="52" y2="14" stroke="#C0C0C0" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="32" x2="10" y2="44" stroke="#C0C0C0" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="32" x2="54" y2="44" stroke="#C0C0C0" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="32" x2="32" y2="56" stroke="#C0C0C0" strokeWidth="2.5" strokeLinecap="round" />
      {/* Satelliten-Knoten */}
      <circle cx="12" cy="14" r="6" fill={`url(#${nd})`} filter={`url(#${sd})`} />
      <circle cx="52" cy="14" r="6" fill={`url(#${nd})`} filter={`url(#${sd})`} />
      <circle cx="10" cy="44" r="6" fill={`url(#${nd})`} filter={`url(#${sd})`} />
      <circle cx="54" cy="44" r="6" fill={`url(#${nd})`} filter={`url(#${sd})`} />
      <circle cx="32" cy="56" r="6" fill={`url(#${nd})`} filter={`url(#${sd})`} />
      {/* Zentrum */}
      <circle cx="32" cy="32" r="10" fill={`url(#${nd})`} filter={`url(#${sd})`} />
      <circle cx="32" cy="32" r="10" stroke="#BBBBBB" strokeWidth="1" fill="none" />
      {/* Glanzlichter */}
      <ellipse cx="29" cy="29" rx="3.5" ry="2.5" fill="white" opacity="0.5" transform="rotate(-30 29 29)" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   10. MAIL / BRIEF
───────────────────────────────────────────── */
export const IconMail: React.FC<IconProps> = ({ size = 64, className }) => {
  const bd = uid("ma-bd");
  const sd = uid("ma-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bd} x1="32" y1="12" x2="32" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#BBBBBB" />
        </linearGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      {/* Umschlag-Körper */}
      <rect x="6" y="16" width="52" height="36" rx="4" fill={`url(#${bd})`} filter={`url(#${sd})`} />
      {/* V-Falz */}
      <path d="M6 16 L32 36 L58 16" stroke="#AAAAAA" strokeWidth="2" fill="none" strokeLinejoin="round" />
      {/* Innenfläche */}
      <path d="M6 20 L6 52 Q6 52 10 52 L54 52 Q58 52 58 48 L58 20 L32 38 Z" fill="#D8D8D8" opacity="0.4" />
      {/* Glanzlicht */}
      <rect x="6" y="16" width="52" height="16" rx="4" fill="white" opacity="0.28" />
      {/* Rand */}
      <rect x="6" y="16" width="52" height="36" rx="4" stroke="white" strokeWidth="1" strokeOpacity="0.35" fill="none" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   11. KALENDER
───────────────────────────────────────────── */
export const IconCalendar: React.FC<IconProps> = ({ size = 64, className }) => {
  const bd = uid("ca-bd");
  const hd = uid("ca-hd");
  const sd = uid("ca-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bd} x1="32" y1="18" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ECECEC" />
          <stop offset="100%" stopColor="#C4C4C4" />
        </linearGradient>
        <linearGradient id={hd} x1="32" y1="8" x2="32" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4D4D4" />
          <stop offset="100%" stopColor="#AAAAAA" />
        </linearGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      {/* Körper */}
      <rect x="6" y="18" width="52" height="40" rx="5" fill={`url(#${bd})`} filter={`url(#${sd})`} />
      {/* Kopfzeile */}
      <rect x="6" y="8" width="52" height="18" rx="5" fill={`url(#${hd})`} />
      {/* Ringe */}
      <rect x="18" y="5" width="5" height="12" rx="2.5" fill="#BBBBBB" />
      <rect x="41" y="5" width="5" height="12" rx="2.5" fill="#BBBBBB" />
      {/* Trennlinie */}
      <line x1="6" y1="26" x2="58" y2="26" stroke="#C0C0C0" strokeWidth="1.5" />
      {/* Tage-Grid */}
      {[0,1,2,3,4,5].map(col => [0,1,2].map(row => (
        <rect key={`${col}-${row}`}
          x={12 + col * 7} y={31 + row * 8}
          width="5" height="5" rx="1.5"
          fill={col === 0 && row === 0 ? "#888" : "#C8C8C8"}
        />
      )))}
      {/* Glanzlicht */}
      <rect x="6" y="8" width="52" height="10" rx="5" fill="white" opacity="0.3" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   12. KAMERA
───────────────────────────────────────────── */
export const IconCamera: React.FC<IconProps> = ({ size = 64, className }) => {
  const bd = uid("cm-bd");
  const ln = uid("cm-ln");
  const rg = uid("cm-rg");
  const sd = uid("cm-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bd} x1="32" y1="14" x2="32" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DEDEDE" />
          <stop offset="100%" stopColor="#ABABAB" />
        </linearGradient>
        <linearGradient id={ln} x1="32" y1="20" x2="32" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8C8C8" />
          <stop offset="100%" stopColor="#888888" />
        </linearGradient>
        <radialGradient id={rg} cx="38%" cy="35%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(160,180,200,0.1)" />
        </radialGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* Gehäuse */}
      <rect x="6" y="18" width="52" height="36" rx="6" fill={`url(#${bd})`} filter={`url(#${sd})`} />
      {/* Sucher-Buckel */}
      <rect x="22" y="12" width="20" height="10" rx="4" fill="#CCCCCC" />
      {/* Linsen-Ring */}
      <circle cx="32" cy="36" r="14" fill={`url(#${ln})`} />
      <circle cx="32" cy="36" r="14" stroke="#999" strokeWidth="1.5" fill="none" />
      {/* Linse Glas */}
      <circle cx="32" cy="36" r="10" fill={`url(#${rg})`} />
      {/* Blende-Ringe */}
      <circle cx="32" cy="36" r="7" stroke="#AAAAAA" strokeWidth="1" fill="none" />
      <circle cx="32" cy="36" r="4" stroke="#AAAAAA" strokeWidth="0.8" fill="none" />
      {/* Glanzlicht Linse */}
      <ellipse cx="28" cy="31" rx="3.5" ry="2.5" fill="white" opacity="0.6" transform="rotate(-25 28 31)" />
      {/* Auslöser */}
      <circle cx="50" cy="24" r="4" fill="#C0C0C0" />
      {/* Glanzlicht Gehäuse */}
      <rect x="6" y="18" width="52" height="12" rx="6" fill="white" opacity="0.22" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   13. MUSIK / NOTE
───────────────────────────────────────────── */
export const IconMusic: React.FC<IconProps> = ({ size = 64, className }) => {
  const bd = uid("mu-bd");
  const sd = uid("mu-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bd} x1="32" y1="6" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0E0E0" />
          <stop offset="100%" stopColor="#ABABAB" />
        </linearGradient>
        <filter id={sd} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      {/* Notenhals */}
      <rect x="30" y="8" width="5" height="36" rx="2.5" fill={`url(#${bd})`} filter={`url(#${sd})`} />
      {/* Fähnchen */}
      <path d="M35 8 Q52 14 48 28 Q42 22 35 24 Z" fill={`url(#${bd})`} />
      {/* Notenkopf */}
      <ellipse cx="24" cy="46" rx="9" ry="7" fill={`url(#${bd})`} filter={`url(#${sd})`} transform="rotate(-15 24 46)" />
      <ellipse cx="24" cy="46" rx="9" ry="7" stroke="#AAAAAA" strokeWidth="1" fill="none" transform="rotate(-15 24 46)" />
      {/* Glanzlicht Kopf */}
      <ellipse cx="20" cy="43" rx="3.5" ry="2" fill="white" opacity="0.45" transform="rotate(-15 20 43)" />
      {/* Glanzlicht Hals */}
      <rect x="30" y="8" width="5" height="14" rx="2.5" fill="white" opacity="0.3" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   14. BROWSER / FENSTER
───────────────────────────────────────────── */
export const IconBrowser: React.FC<IconProps> = ({ size = 64, className }) => {
  const bd = uid("br-bd");
  const tb = uid("br-tb");
  const sd = uid("br-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bd} x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EEEEEE" />
          <stop offset="100%" stopColor="#C8C8C8" />
        </linearGradient>
        <linearGradient id={tb} x1="32" y1="8" x2="32" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D8D8D8" />
          <stop offset="100%" stopColor="#B8B8B8" />
        </linearGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      {/* Fenster */}
      <rect x="6" y="8" width="52" height="48" rx="6" fill={`url(#${bd})`} filter={`url(#${sd})`} />
      {/* Toolbar */}
      <rect x="6" y="8" width="52" height="18" rx="6" fill={`url(#${tb})`} />
      <rect x="6" y="20" width="52" height="6" fill={`url(#${tb})`} />
      {/* Buttons */}
      <circle cx="17" cy="17" r="4" fill="#C0C0C0" />
      <circle cx="17" cy="17" r="4" stroke="#AAAAAA" strokeWidth="0.8" fill="none" />
      <circle cx="28" cy="17" r="4" fill="#C8C8C8" />
      <circle cx="28" cy="17" r="4" stroke="#AAAAAA" strokeWidth="0.8" fill="none" />
      <circle cx="39" cy="17" r="4" fill="#D0D0D0" />
      <circle cx="39" cy="17" r="4" stroke="#AAAAAA" strokeWidth="0.8" fill="none" />
      {/* URL-Bar */}
      <rect x="46" y="12" width="8" height="10" rx="3" fill="#CCCCCC" />
      {/* Content-Linien */}
      <rect x="12" y="32" width="40" height="4" rx="2" fill="#D4D4D4" />
      <rect x="12" y="40" width="32" height="4" rx="2" fill="#DCDCDC" />
      <rect x="12" y="48" width="24" height="4" rx="2" fill="#E0E0E0" />
      {/* Glanzlicht */}
      <rect x="6" y="8" width="52" height="10" rx="6" fill="white" opacity="0.3" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   15. NOTIZEN / NOTEPAD
───────────────────────────────────────────── */
export const IconNotes: React.FC<IconProps> = ({ size = 64, className }) => {
  const bd = uid("no-bd");
  const ln = uid("no-ln");
  const sd = uid("no-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bd} x1="32" y1="6" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F2F2F2" />
          <stop offset="100%" stopColor="#D0D0D0" />
        </linearGradient>
        <linearGradient id={ln} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D0D0D0" />
          <stop offset="100%" stopColor="#B0B0B0" />
        </linearGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>
      {/* Körper */}
      <rect x="10" y="6" width="44" height="52" rx="4" fill={`url(#${bd})`} filter={`url(#${sd})`} />
      {/* Spiralbindung links */}
      <rect x="10" y="6" width="8" height="52" rx="4" fill={`url(#${ln})`} />
      {[14, 22, 30, 38, 46].map(y => (
        <circle key={y} cx="14" cy={y} r="3" fill="#EEEEEE" stroke="#C0C0C0" strokeWidth="1" />
      ))}
      {/* Linien */}
      <line x1="24" y1="18" x2="50" y2="18" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="26" x2="50" y2="26" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="34" x2="50" y2="34" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="42" x2="42" y2="42" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
      {/* Glanzlicht */}
      <rect x="18" y="6" width="36" height="16" rx="4" fill="white" opacity="0.28" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   16. KONTAKTE / PERSON
───────────────────────────────────────────── */
export const IconContacts: React.FC<IconProps> = ({ size = 64, className }) => {
  const bd = uid("co-bd");
  const av = uid("co-av");
  const sd = uid("co-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bd} x1="32" y1="6" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EBEBEB" />
          <stop offset="100%" stopColor="#C4C4C4" />
        </linearGradient>
        <radialGradient id={av} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#E0E0E0" />
          <stop offset="100%" stopColor="#AAAAAA" />
        </radialGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      {/* Karte */}
      <rect x="8" y="10" width="48" height="44" rx="5" fill={`url(#${bd})`} filter={`url(#${sd})`} />
      {/* Avatar-Kreis */}
      <circle cx="24" cy="28" r="10" fill={`url(#${av})`} />
      <circle cx="24" cy="25" r="5" fill="#C0C0C0" />
      <path d="M14 38 Q14 32 24 32 Q34 32 34 38" fill="#C0C0C0" />
      {/* Linien rechts */}
      <line x1="38" y1="22" x2="52" y2="22" stroke="#C8C8C8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="30" x2="52" y2="30" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="37" x2="48" y2="37" stroke="#D4D4D4" strokeWidth="2" strokeLinecap="round" />
      {/* Glanzlicht */}
      <rect x="8" y="10" width="48" height="16" rx="5" fill="white" opacity="0.28" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   17. TERMINAL / KONSOLE
───────────────────────────────────────────── */
export const IconTerminal: React.FC<IconProps> = ({ size = 64, className }) => {
  const bd = uid("te-bd");
  const tb = uid("te-tb");
  const sd = uid("te-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bd} x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2D3748" />
          <stop offset="100%" stopColor="#1A202C" />
        </linearGradient>
        <linearGradient id={tb} x1="32" y1="8" x2="32" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4A5568" />
          <stop offset="100%" stopColor="#2D3748" />
        </linearGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>
      {/* Fenster mit sichtbarem Rahmen */}
      <rect x="6" y="8" width="52" height="48" rx="6" fill={`url(#${bd})`} filter={`url(#${sd})`} />
      <rect x="6" y="8" width="52" height="48" rx="6" stroke="#718096" strokeWidth="1.5" fill="none" />
      {/* Toolbar */}
      <rect x="6" y="8" width="52" height="16" rx="6" fill={`url(#${tb})`} />
      <rect x="6" y="18" width="52" height="6" fill={`url(#${tb})`} />
      {/* Traffic-Lights – farbig für bessere Sichtbarkeit */}
      <circle cx="17" cy="16" r="3.5" fill="#FC8181" />
      <circle cx="27" cy="16" r="3.5" fill="#F6E05E" />
      <circle cx="37" cy="16" r="3.5" fill="#68D391" />
      {/* Prompt-Zeilen – heller */}
      <text x="12" y="36" fontFamily="monospace" fontSize="8" fill="#E4FF97">$ volt run</text>
      <text x="12" y="46" fontFamily="monospace" fontSize="8" fill="#A0AEC0">→ ready</text>
      {/* Cursor */}
      <rect x="12" y="50" width="6" height="7" rx="1" fill="#E4FF97" opacity="0.85" />
      {/* Glanzlicht */}
      <rect x="6" y="8" width="52" height="10" rx="6" fill="white" opacity="0.10" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   18. SCHLOSS / SICHERHEIT
───────────────────────────────────────────── */
export const IconLock: React.FC<IconProps> = ({ size = 64, className }) => {
  const bd = uid("lk-bd");
  const bx = uid("lk-bx");
  const sd = uid("lk-sd");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={bd} x1="32" y1="6" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DEDEDE" />
          <stop offset="100%" stopColor="#AAAAAA" />
        </linearGradient>
        <linearGradient id={bx} x1="32" y1="28" x2="32" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0E0E0" />
          <stop offset="100%" stopColor="#B8B8B8" />
        </linearGradient>
        <filter id={sd} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>
      {/* Bügel */}
      <path d="M18 30 L18 20 Q18 8 32 8 Q46 8 46 20 L46 30"
        stroke={`url(#${bd})`} strokeWidth="8" strokeLinecap="round" fill="none" filter={`url(#${sd})`} />
      {/* Körper */}
      <rect x="10" y="28" width="44" height="30" rx="6" fill={`url(#${bx})`} filter={`url(#${sd})`} />
      {/* Schlüsselloch */}
      <circle cx="32" cy="40" r="5" fill="#AAAAAA" />
      <rect x="29" y="43" width="6" height="8" rx="3" fill="#AAAAAA" />
      {/* Glanzlicht Körper */}
      <rect x="10" y="28" width="44" height="12" rx="6" fill="white" opacity="0.28" />
      {/* Glanzlicht Bügel */}
      <path d="M18 30 L18 20 Q18 8 32 8 Q46 8 46 20 L46 30"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.3" fill="none" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   EXPORT-MAP
───────────────────────────────────────────── */
export const SKEU_ICONS = [
  { id: "finder",    label: "Finder",     Component: IconFinder },
  { id: "document",  label: "Dokument",   Component: IconDocument },
  { id: "folder",    label: "Ordner",     Component: IconFolder },
  { id: "trash",     label: "Papierkorb", Component: IconTrash },
  { id: "settings",  label: "Einstellungen", Component: IconSettings },
  { id: "search",    label: "Suche",      Component: IconSearch },
  { id: "cloud",     label: "Cloud",      Component: IconCloud },
  { id: "download",  label: "Download",   Component: IconDownload },
  { id: "network",   label: "Netzwerk",   Component: IconNetwork },
  { id: "mail",      label: "Mail",       Component: IconMail },
  { id: "calendar",  label: "Kalender",   Component: IconCalendar },
  { id: "camera",    label: "Kamera",     Component: IconCamera },
  { id: "music",     label: "Musik",      Component: IconMusic },
  { id: "browser",   label: "Browser",    Component: IconBrowser },
  { id: "notes",     label: "Notizen",    Component: IconNotes },
  { id: "contacts",  label: "Kontakte",   Component: IconContacts },
  { id: "terminal",  label: "Terminal",   Component: IconTerminal },
  { id: "lock",      label: "Schloss",    Component: IconLock },
] as const;
