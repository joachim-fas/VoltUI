/**
 * QuellenMethodenSection – Volt UI
 * Zwei Gruppen: 12 Datenquellen-Icons + 6 Analyse-Methoden-Icons
 * Alle Icons: 32×32 viewBox, stroke-basiert, konsistente Linienstärken
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ══════════════════════════════════════════════════════════════════════
   DATENQUELLEN-ICONS (12 SVG)
══════════════════════════════════════════════════════════════════════ */

const NewsMedianIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="3" y="5" width="20" height="22" rx="2" stroke={color} strokeWidth="2" />
    <rect x="23" y="9" width="6" height="14" rx="1.5" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.06" />
    <rect x="6" y="9" width="14" height="2.5" rx="1" fill={color} fillOpacity="0.7" />
    <rect x="6" y="14" width="8" height="7" rx="1" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.4" />
    <line x1="6" y1="21" x2="14" y2="14" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <line x1="16" y1="15" x2="21" y2="15" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="16" y1="18" x2="21" y2="18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="16" y1="21" x2="19" y2="21" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="6" y1="24" x2="21" y2="24" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    <line x1="6" y1="27" x2="17" y2="27" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.35" />
    <circle cx="6.5" cy="7.5" r="0.9" fill={color} />
    <circle cx="9.5" cy="7.5" r="0.9" fill={color} />
    <circle cx="12.5" cy="7.5" r="0.9" fill={color} />
  </svg>
);

const DatenStatistikIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="4" y1="28" x2="28" y2="28" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="4" y1="4" x2="4" y2="28" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <rect x="7" y="20" width="4" height="8" rx="1" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.4" />
    <rect x="13" y="14" width="4" height="14" rx="1" fill={color} fillOpacity="0.45" stroke={color} strokeWidth="1.4" />
    <rect x="19" y="8" width="4" height="20" rx="1" fill={color} fillOpacity="0.65" stroke={color} strokeWidth="1.4" />
    <rect x="25" y="5" width="3" height="23" rx="1" fill={color} fillOpacity="0.85" stroke={color} strokeWidth="1.4" />
    <polyline points="9,19 15,13 21,7 26.5,4.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
    <circle cx="9" cy="19" r="2" fill={color} />
    <circle cx="15" cy="13" r="2" fill={color} />
    <circle cx="21" cy="7" r="2" fill={color} />
    <circle cx="26.5" cy="4.5" r="2" fill={color} />
  </svg>
);

const WissenschaftForschungIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M12 4 L12 16 L5 26 L27 26 L20 16 L20 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="9" y1="4" x2="23" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 22 L24 22 L27 26 L5 26 Z" fill={color} fillOpacity="0.18" />
    <circle cx="12" cy="22" r="2.2" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1.2" />
    <circle cx="18" cy="20" r="1.6" fill={color} fillOpacity="0.65" stroke={color} strokeWidth="1.2" />
    <circle cx="15" cy="24" r="1.2" fill={color} fillOpacity="0.4" />
    <line x1="14" y1="9" x2="18" y2="9" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <line x1="14" y1="13" x2="18" y2="13" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const GeopolitikKonflikteIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" fill="none" />
    <ellipse cx="16" cy="16" rx="5" ry="12" stroke={color} strokeWidth="1.4" fill="none" opacity="0.55" />
    <line x1="4" y1="16" x2="28" y2="16" stroke={color} strokeWidth="1.2" opacity="0.5" />
    <line x1="6.5" y1="10" x2="25.5" y2="10" stroke={color} strokeWidth="1" opacity="0.35" />
    <line x1="6.5" y1="22" x2="25.5" y2="22" stroke={color} strokeWidth="1" opacity="0.35" />
    <circle cx="20" cy="12" r="3" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.6" />
    <circle cx="20" cy="12" r="1.2" fill={color} fillOpacity="0.8" />
    <circle cx="20" cy="12" r="5" stroke={color} strokeWidth="1" strokeDasharray="2.5 2.5" opacity="0.4" />
  </svg>
);

const FinanzenMaerkteIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="4" y1="28" x2="28" y2="28" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    <rect x="6" y="14" width="4" height="8" rx="0.5" fill={color} fillOpacity="0.7" stroke={color} strokeWidth="1.3" />
    <line x1="8" y1="10" x2="8" y2="14" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <line x1="8" y1="22" x2="8" y2="25" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <rect x="13" y="10" width="4" height="10" rx="0.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.3" />
    <line x1="15" y1="6" x2="15" y2="10" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <line x1="15" y1="20" x2="15" y2="24" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <rect x="20" y="8" width="4" height="12" rx="0.5" fill={color} fillOpacity="0.7" stroke={color} strokeWidth="1.3" />
    <line x1="22" y1="5" x2="22" y2="8" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <line x1="22" y1="20" x2="22" y2="23" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M5 22 Q12 16 20 10" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.5" strokeDasharray="3 2" />
  </svg>
);

const UmfragenIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="3" y="4" width="26" height="18" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
    <path d="M10 22 L10 26 M22 22 L22 26 M8 26 L24 26" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="11" r="2.2" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.4" />
    <circle cx="13" cy="11" r="2.2" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1.4" />
    <circle cx="18" cy="11" r="2.2" fill={color} fillOpacity="0.7" stroke={color} strokeWidth="1.4" />
    <circle cx="23" cy="11" r="2.2" fill={color} fillOpacity="0.9" stroke={color} strokeWidth="1.4" />
    <line x1="8" y1="11" x2="23" y2="11" stroke={color} strokeWidth="1.2" opacity="0.3" />
    <line x1="6" y1="17" x2="20" y2="17" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const PredictionMarketsIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" fill="none" />
    <line x1="16" y1="5" x2="16" y2="7.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="27" y1="16" x2="24.5" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="5" y1="16" x2="7.5" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="27" x2="16" y2="24.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="23.5" y1="8.5" x2="22" y2="10" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <line x1="8.5" y1="8.5" x2="10" y2="10" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <line x1="16" y1="16" x2="22" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="16" x2="13" y2="21" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    <circle cx="16" cy="16" r="2.5" fill={color} />
    <path d="M8 22 Q10 26 16 26 Q22 26 24 22" stroke={color} strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
  </svg>
);

const InnovationPatenteIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 4 Q24 7 24 15 Q24 21 20 23 L20 26 L12 26 L12 23 Q8 21 8 15 Q8 7 16 4 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <line x1="12" y1="26" x2="20" y2="26" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="12" y1="29" x2="20" y2="29" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M13 18 L14.5 15 L16 18 L17.5 15 L19 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
    <line x1="16" y1="1" x2="16" y2="3" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    <line x1="26" y1="5" x2="24.5" y2="6.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
    <line x1="6" y1="5" x2="7.5" y2="6.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
    <line x1="29" y1="15" x2="27" y2="15" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
    <line x1="3" y1="15" x2="5" y2="15" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const SocialCommunityIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="9" r="4.5" stroke={color} strokeWidth="2" fill="none" />
    <path d="M9 28 Q9 22 16 22 Q23 22 23 28" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="6" cy="13" r="3" stroke={color} strokeWidth="1.6" fill="none" />
    <path d="M1 28 Q1 23 6 23" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.7" />
    <circle cx="26" cy="13" r="3" stroke={color} strokeWidth="1.6" fill="none" />
    <path d="M31 28 Q31 23 26 23" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.7" />
    <line x1="9.5" y1="11" x2="12" y2="11" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.45" strokeDasharray="2 1.5" />
    <line x1="20" y1="11" x2="22.5" y2="11" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.45" strokeDasharray="2 1.5" />
  </svg>
);

const KlimaUmweltIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 3 Q26 8 26 18 Q26 27 16 30 Q6 27 6 18 Q6 8 16 3 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <line x1="16" y1="30" x2="16" y2="12" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    <path d="M16 22 Q12 19 8 19" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M16 17 Q13 14 10 13" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45" />
    <path d="M16 22 Q20 19 24 19" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M16 17 Q19 14 22 13" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45" />
    <circle cx="16" cy="12" r="1.8" fill={color} fillOpacity="0.5" />
  </svg>
);

const GesundheitBevoelkerungIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 27 Q5 20 5 12 Q5 6 11 6 Q14 6 16 9 Q18 6 21 6 Q27 6 27 12 Q27 20 16 27 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <line x1="16" y1="11" x2="16" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    <line x1="12" y1="15" x2="20" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    <path d="M6 20 L9 20 L11 17 L13 23 L15 19 L17 21 L19 20 L26 20" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
  </svg>
);

const ForesightSzenarienIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="1.2" strokeDasharray="3.5 3" fill="none" opacity="0.35" />
    <circle cx="16" cy="16" r="9" stroke={color} strokeWidth="1.6" fill="none" opacity="0.6" />
    <circle cx="16" cy="16" r="5" stroke={color} strokeWidth="2" fill="none" />
    <line x1="16" y1="3" x2="16" y2="8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="24" x2="16" y2="29" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="3" y1="16" x2="8" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="24" y1="16" x2="29" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="16" cy="16" r="2.5" fill={color} fillOpacity="0.7" />
    <line x1="7" y1="7" x2="10" y2="10" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <line x1="22" y1="22" x2="25" y2="25" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <line x1="25" y1="7" x2="22" y2="10" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <line x1="10" y1="22" x2="7" y2="25" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════
   ANALYSE-METHODEN-ICONS (6 SVG)
══════════════════════════════════════════════════════════════════════ */

const MarktanalyseIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="2" y="2" width="28" height="28" rx="2.5" stroke={color} strokeWidth="1.6" fill="none" />
    <line x1="16" y1="2" x2="16" y2="30" stroke={color} strokeWidth="1.4" opacity="0.4" />
    <line x1="2" y1="16" x2="30" y2="16" stroke={color} strokeWidth="1.4" opacity="0.4" />
    <path d="M9 6 L9.8 8.5 L12.5 8.5 L10.4 10 L11.2 12.5 L9 11 L6.8 12.5 L7.6 10 L5.5 8.5 L8.2 8.5 Z" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="0.8" />
    <line x1="23" y1="12" x2="23" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <polyline points="20,9 23,6 26,9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="9" y1="20" x2="9" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <polyline points="6,23 9,26 12,23" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
    <path d="M23 20 L26 26 L20 26 Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" fill={color} fillOpacity="0.2" />
    <line x1="23" y1="22.5" x2="23" y2="24" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="23" cy="25.2" r="0.7" fill={color} />
  </svg>
);

const WarGamingIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <polygon points="16,2 29,9.5 29,24.5 16,30 3,24.5 3,9.5" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <polygon points="16,8 24,12.5 24,21.5 16,26 8,21.5 8,12.5" stroke={color} strokeWidth="1.3" fill="none" strokeLinejoin="round" opacity="0.4" />
    <polygon points="16,12 20,14.5 20,19.5 16,22 12,19.5 12,14.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="16" y1="2" x2="16" y2="8" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    <line x1="29" y1="9.5" x2="24" y2="12.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    <line x1="3" y1="9.5" x2="8" y2="12.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    <line x1="16" y1="17" x2="16" y2="12.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <polyline points="14,14.5 16,12.5 18,14.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="16" cy="17" r="1.8" fill={color} />
  </svg>
);

const PreMortemIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 3 L30 28 L2 28 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M16 3 L30 28 L2 28 Z" fill={color} fillOpacity="0.07" />
    <line x1="16" y1="11" x2="16" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="16" cy="24" r="1.8" fill={color} />
    <line x1="6" y1="22" x2="6" y2="26" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <line x1="26" y1="22" x2="26" y2="26" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <line x1="3" y1="18" x2="6" y2="18" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    <line x1="26" y1="18" x2="29" y2="18" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
  </svg>
);

const PostMortemIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="13" cy="13" r="9" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="13" cy="13" r="5.5" stroke={color} strokeWidth="1.3" fill="none" opacity="0.4" />
    <line x1="20" y1="20" x2="29" y2="29" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="10" y1="10" x2="16" y2="16" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    <line x1="16" y1="10" x2="10" y2="16" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    <circle cx="13" cy="13" r="2" fill={color} fillOpacity="0.5" />
    <line x1="13" y1="2" x2="13" y2="4.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
    <line x1="24" y1="13" x2="21.5" y2="13" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const TrendDeepDiveIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="13" cy="13" r="9" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="13" cy="13" r="6" stroke={color} strokeWidth="1.2" fill="none" opacity="0.45" />
    <circle cx="13" cy="13" r="3" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
    <polyline points="7,16 10,11 13,14 16,9" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="16" cy="9" r="1.5" fill={color} />
    <line x1="20" y1="20" x2="29" y2="29" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="13" y1="22" x2="13" y2="27" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    <polyline points="10.5,25 13,27 15.5,25" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
  </svg>
);

const StakeholderIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="8" r="4" stroke={color} strokeWidth="2" fill="none" />
    <path d="M10 26 Q10 20 16 20 Q22 20 22 26" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="5" cy="13" r="3" stroke={color} strokeWidth="1.6" fill="none" opacity="0.75" />
    <path d="M1 28 Q1 23 5 23" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.75" />
    <circle cx="27" cy="13" r="3" stroke={color} strokeWidth="1.6" fill="none" opacity="0.75" />
    <path d="M31 28 Q31 23 27 23" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.75" />
    <line x1="8" y1="11" x2="12" y2="10" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.5" strokeDasharray="2 1.5" />
    <line x1="20" y1="10" x2="24" y2="11" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.5" strokeDasharray="2 1.5" />
    <path d="M7 17 Q10 19 12 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45" />
    <path d="M25 17 Q22 19 20 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════
   DATEN-LISTEN
══════════════════════════════════════════════════════════════════════ */

const QUELLEN_LIST = [
  { label: "News & Medien",               sublabel: "Nachrichten, Presse, Broadcast",          Icon: NewsMedianIcon,              color: "#7AB8F5" },
  { label: "Daten & Statistik",           sublabel: "Kennzahlen, Indikatoren, Berichte",        Icon: DatenStatistikIcon,          color: "#6DDBA0" },
  { label: "Wissenschaft & Forschung",    sublabel: "Papers, Studien, Experimente",             Icon: WissenschaftForschungIcon,   color: "#D98AE8" },
  { label: "Geopolitik & Konflikte",      sublabel: "Regionen, Akteure, Ereignisse",            Icon: GeopolitikKonflikteIcon,     color: "#F4A0B5" },
  { label: "Finanzen & Märkte",           sublabel: "Kurse, Indizes, Makroökonomie",            Icon: FinanzenMaerkteIcon,         color: "#F5C87A" },
  { label: "Umfragen & Meinungsforschung",sublabel: "Surveys, Panels, Sentiment",               Icon: UmfragenIcon,                color: "#F0956A" },
  { label: "Prediction Markets",          sublabel: "Wetten, Prognosen, Wahrscheinlichkeiten",  Icon: PredictionMarketsIcon,       color: "#5ECECE" },
  { label: "Innovation & Patente",        sublabel: "Technologien, Erfindungen, Trends",        Icon: InnovationPatenteIcon,       color: "#E8C840" },
  { label: "Social & Community",          sublabel: "Netzwerke, Diskurse, Gruppen",             Icon: SocialCommunityIcon,         color: "#7AB8F5" },
  { label: "Klima & Umwelt",              sublabel: "Klimadaten, Ökosysteme, ESG",              Icon: KlimaUmweltIcon,             color: "#6DDBA0" },
  { label: "Gesundheit & Bevölkerung",    sublabel: "Epidemiologie, Demografie",                Icon: GesundheitBevoelkerungIcon,  color: "#F4A0B5" },
  { label: "Foresight & Szenarien",       sublabel: "Zukunftsbilder, Strategien",               Icon: ForesightSzenarienIcon,      color: "#D98AE8" },
];

const METHODEN_LIST = [
  { label: "Marktanalyse",    sublabel: "4 Quadranten SWOT",      Icon: MarktanalyseIcon,  color: "#7AB8F5", desc: "Stärken, Schwächen, Chancen und Risiken systematisch in vier Quadranten erfassen." },
  { label: "War-Gaming",      sublabel: "3 Szenarien + Strategie", Icon: WarGamingIcon,     color: "#F5C87A", desc: "Gegnerische Strategien simulieren und eigene Reaktionen im Voraus durchspielen." },
  { label: "Pre-Mortem",      sublabel: "Was könnte schiefgehen?", Icon: PreMortemIcon,     color: "#F4A0B5", desc: "Vor dem Start imaginär scheitern – um Risiken frühzeitig zu identifizieren." },
  { label: "Post-Mortem",     sublabel: "Ursachen-Analyse",        Icon: PostMortemIcon,    color: "#6DDBA0", desc: "Nach einem Ereignis die Ursachenkette systematisch rekonstruieren." },
  { label: "Trend Deep-Dive", sublabel: "Trend von allen Seiten",  Icon: TrendDeepDiveIcon, color: "#D98AE8", desc: "Einen Trend aus technologischer, sozialer, wirtschaftlicher und politischer Sicht durchleuchten." },
  { label: "Stakeholder",     sublabel: "Akteure & Einfluss",      Icon: StakeholderIcon,   color: "#5ECECE", desc: "Alle relevanten Akteure kartieren und ihre Interessen sowie Einflussmöglichkeiten bewerten." },
];

/* ══════════════════════════════════════════════════════════════════════
   KARTEN-KOMPONENTEN
══════════════════════════════════════════════════════════════════════ */

const QuellenCard: React.FC<{ item: typeof QUELLEN_LIST[0] }> = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col rounded-2xl border bg-card transition-all duration-200 cursor-default overflow-hidden"
      style={{
        borderColor: hovered ? `${item.color}60` : "var(--border)",
        boxShadow: hovered ? `0 6px 24px ${item.color}22` : "none",
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className="flex items-center justify-center transition-all duration-200"
        style={{
          height: 96,
          background: hovered ? `${item.color}20` : `${item.color}0D`,
          borderBottom: `1px solid ${item.color}${hovered ? "35" : "18"}`,
        }}
      >
        <item.Icon color={item.color} />
      </div>
      <div className="p-4">
        <p className="text-[13px] font-semibold text-foreground leading-tight mb-1">{item.label}</p>
        <p className="text-[10px] font-mono text-muted-foreground leading-tight">{item.sublabel}</p>
      </div>
    </motion.div>
  );
};

const MethodenCard: React.FC<{
  item: typeof METHODEN_LIST[0];
  isSelected: boolean;
  onClick: () => void;
}> = ({ item, isSelected, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="flex items-center gap-4 rounded-2xl border bg-card transition-all duration-200 text-left w-full"
      style={{
        padding: "18px 20px",
        borderColor: isSelected ? item.color : hovered ? `${item.color}55` : "var(--border)",
        boxShadow: isSelected ? `0 0 0 2px ${item.color}40, 0 6px 24px ${item.color}22` : hovered ? `0 4px 16px ${item.color}18` : "none",
      }}
    >
      <div
        className="flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-200"
        style={{
          width: 56, height: 56,
          background: isSelected || hovered ? `${item.color}22` : `${item.color}12`,
          border: `1px solid ${item.color}${isSelected ? "60" : hovered ? "40" : "22"}`,
        }}
      >
        <item.Icon color={item.color} />
      </div>
      <div>
        <p className="text-[14px] font-semibold text-foreground leading-tight mb-1">{item.label}</p>
        <p className="text-[10px] font-mono text-muted-foreground leading-tight">{item.sublabel}</p>
      </div>
    </button>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   HAUPT-SECTION
══════════════════════════════════════════════════════════════════════ */

export default function QuellenMethodenSection() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const selected = METHODEN_LIST.find(m => m.label === selectedMethod) ?? null;

  return (
    <section className="space-y-12">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Icon-Sets · Quellen & Methoden</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">Quellen & Methoden</h2>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Zwei spezialisierte Icon-Sets: zwölf Datenquellen-Icons für semantische Kategorisierung
          und sechs Analyse-Methoden-Icons für strategische Frameworks.
        </p>
      </div>

      {/* Datenquellen */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-base font-semibold text-foreground">Datenquellen</h3>
          <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-muted text-muted-foreground border border-border">{QUELLEN_LIST.length} Icons</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {QUELLEN_LIST.map(item => <QuellenCard key={item.label} item={item} />)}
        </div>
      </div>

      {/* Analyse-Methoden */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-base font-semibold text-foreground">Analyse-Methoden</h3>
          <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-muted text-muted-foreground border border-border">{METHODEN_LIST.length} Methoden</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {METHODEN_LIST.map(item => (
            <MethodenCard
              key={item.label}
              item={item}
              isSelected={selectedMethod === item.label}
              onClick={() => setSelectedMethod(selectedMethod === item.label ? null : item.label)}
            />
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="mt-4 rounded-2xl border bg-card overflow-hidden"
              style={{ borderColor: `${selected.color}40` }}
            >
              <div className="grid md:grid-cols-2">
                <div
                  className="flex flex-col items-center justify-center gap-8 p-10 border-b md:border-b-0 md:border-r border-border"
                  style={{ background: `${selected.color}08` }}
                >
                  <div className="flex items-end gap-8">
                    {[64, 48, 32, 24].map(sz => (
                      <div key={sz} className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center rounded-xl" style={{ width: sz + 16, height: sz + 16, background: `${selected.color}15`, border: `1px solid ${selected.color}30` }}>
                          <selected.Icon color={selected.color} />
                        </div>
                        <span className="font-mono text-[9px] text-muted-foreground">{sz}px</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Analyse-Methode</p>
                    <h3 className="font-display font-bold text-xl tracking-tight">{selected.label}</h3>
                    <p className="text-[11px] font-mono text-muted-foreground mt-1">{selected.sublabel}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.desc}</p>
                  <div className="rounded-xl p-4" style={{ background: `${selected.color}10`, border: `1px solid ${selected.color}25` }}>
                    <p className="font-mono text-[11px]" style={{ color: selected.color }}>
                      {`<${selected.label.replace(/[- ]/g, "")}Icon color="${selected.color}" />`}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
