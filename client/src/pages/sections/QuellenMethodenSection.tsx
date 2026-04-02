/**
 * QuellenMethodenSection – Volt UI
 * Zwei Gruppen: 12 Datenquellen + 6 Analyse-Methoden
 * Jede Kategorie hat 3-5 thematische Sub-Icons
 * Stil: stroke-basiert, 32×32 viewBox, konsistente Linienstärken
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════
   SVG ICON KOMPONENTEN
══════════════════════════════════════════════════════════════════════ */

// ── NEWS & MEDIEN ──────────────────────────────────────────────────────
const ZeitungIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="3" y="5" width="20" height="22" rx="2" stroke={color} strokeWidth="2" />
    <rect x="23" y="9" width="6" height="14" rx="1.5" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.06" />
    <rect x="6" y="9" width="14" height="2.5" rx="1" fill={color} fillOpacity="0.7" />
    <rect x="6" y="14" width="8" height="7" rx="1" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.4" />
    <line x1="16" y1="15" x2="21" y2="15" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="16" y1="18" x2="21" y2="18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="6" y1="24" x2="21" y2="24" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const MikrofonIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="11" y="3" width="10" height="16" rx="5" stroke={color} strokeWidth="2" fill="none" />
    <path d="M6 17 Q6 26 16 26 Q26 26 26 17" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <line x1="16" y1="26" x2="16" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="11" y1="30" x2="21" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="13" y1="9" x2="19" y2="9" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    <line x1="13" y1="13" x2="19" y2="13" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const TVBildschirmIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="2" y="5" width="28" height="18" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
    <rect x="5" y="8" width="22" height="12" rx="1" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.2" />
    <line x1="10" y1="23" x2="8" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="23" x2="24" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="28" x2="24" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <polygon points="13,11 13,17 20,14" fill={color} fillOpacity="0.5" />
  </svg>
);

const AntenneIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="16" y1="14" x2="16" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="30" x2="22" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="10" r="4" stroke={color} strokeWidth="2" fill="none" />
    <path d="M8 6 Q4 10 8 14" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M24 6 Q28 10 24 14" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M5 3 Q0 10 5 17" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.35" />
    <path d="M27 3 Q32 10 27 17" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.35" />
  </svg>
);

const PodcastIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="12" r="6" stroke={color} strokeWidth="2" fill="none" />
    <line x1="16" y1="18" x2="16" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M10 24 Q10 28 16 28 Q22 28 22 24" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <circle cx="16" cy="12" r="2.5" fill={color} fillOpacity="0.6" />
    <path d="M9 7 Q6 12 9 17" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55" />
    <path d="M23 7 Q26 12 23 17" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55" />
  </svg>
);

// ── DATEN & STATISTIK ──────────────────────────────────────────────────
const BalkendiagrammIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="4" y1="28" x2="28" y2="28" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="4" y1="4" x2="4" y2="28" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <rect x="7" y="20" width="4" height="8" rx="1" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.4" />
    <rect x="13" y="14" width="4" height="14" rx="1" fill={color} fillOpacity="0.45" stroke={color} strokeWidth="1.4" />
    <rect x="19" y="8" width="4" height="20" rx="1" fill={color} fillOpacity="0.65" stroke={color} strokeWidth="1.4" />
    <rect x="25" y="5" width="3" height="23" rx="1" fill={color} fillOpacity="0.85" stroke={color} strokeWidth="1.4" />
  </svg>
);

const LiniendiagrammIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="4" y1="28" x2="28" y2="28" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    <line x1="4" y1="4" x2="4" y2="28" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    <polyline points="5,24 9,18 13,20 18,10 22,14 27,6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="5" cy="24" r="2" fill={color} />
    <circle cx="9" cy="18" r="2" fill={color} />
    <circle cx="13" cy="20" r="2" fill={color} />
    <circle cx="18" cy="10" r="2" fill={color} />
    <circle cx="22" cy="14" r="2" fill={color} />
    <circle cx="27" cy="6" r="2" fill={color} />
  </svg>
);

const TabelleIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="3" y="5" width="26" height="22" rx="2" stroke={color} strokeWidth="2" fill="none" />
    <line x1="3" y1="12" x2="29" y2="12" stroke={color} strokeWidth="1.6" />
    <line x1="3" y1="19" x2="29" y2="19" stroke={color} strokeWidth="1.2" opacity="0.5" />
    <line x1="12" y1="5" x2="12" y2="27" stroke={color} strokeWidth="1.2" opacity="0.5" />
    <line x1="21" y1="5" x2="21" y2="27" stroke={color} strokeWidth="1.2" opacity="0.5" />
    <rect x="4" y="6" width="7" height="5" rx="0.5" fill={color} fillOpacity="0.2" />
    <rect x="13" y="6" width="7" height="5" rx="0.5" fill={color} fillOpacity="0.2" />
    <rect x="22" y="6" width="6" height="5" rx="0.5" fill={color} fillOpacity="0.2" />
  </svg>
);

const KPIIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M4 24 Q4 4 16 4 Q28 4 28 24" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M4 24 Q4 16 16 16 Q28 16 28 24" fill={color} fillOpacity="0.1" />
    <line x1="16" y1="24" x2="22" y2="12" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="16" cy="24" r="3" fill={color} />
    <line x1="4" y1="24" x2="28" y2="24" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const DatenbankIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="8" rx="12" ry="4" stroke={color} strokeWidth="2" fill="none" />
    <line x1="4" y1="8" x2="4" y2="24" stroke={color} strokeWidth="2" />
    <line x1="28" y1="8" x2="28" y2="24" stroke={color} strokeWidth="2" />
    <ellipse cx="16" cy="16" rx="12" ry="4" stroke={color} strokeWidth="1.4" fill="none" opacity="0.55" />
    <ellipse cx="16" cy="24" rx="12" ry="4" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
  </svg>
);

// ── WISSENSCHAFT & FORSCHUNG ───────────────────────────────────────────
const ReagenzglasIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M12 4 L12 16 L5 26 L27 26 L20 16 L20 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="9" y1="4" x2="23" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 22 L24 22 L27 26 L5 26 Z" fill={color} fillOpacity="0.18" />
    <circle cx="12" cy="22" r="2.2" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1.2" />
    <circle cx="18" cy="20" r="1.6" fill={color} fillOpacity="0.65" stroke={color} strokeWidth="1.2" />
    <circle cx="15" cy="24" r="1.2" fill={color} fillOpacity="0.4" />
  </svg>
);

const MikroskopIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="6" y1="28" x2="26" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="22" x2="16" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="16" cy="16" r="2.5" fill={color} fillOpacity="0.4" />
    <line x1="16" y1="10" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <rect x="12" y="3" width="8" height="4" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
    <path d="M10 22 Q6 22 6 26" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.5" />
    <path d="M22 22 Q26 22 26 26" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.5" />
  </svg>
);

const PaperIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M6 4 L22 4 L28 10 L28 28 L6 28 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M22 4 L22 10 L28 10" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <line x1="10" y1="14" x2="24" y2="14" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="10" y1="18" x2="24" y2="18" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="10" y1="22" x2="18" y2="22" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="10" y1="10" x2="16" y2="10" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const AtomIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke={color} strokeWidth="1.6" fill="none" />
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke={color} strokeWidth="1.6" fill="none" transform="rotate(60 16 16)" />
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke={color} strokeWidth="1.6" fill="none" transform="rotate(120 16 16)" />
    <circle cx="16" cy="16" r="3" fill={color} fillOpacity="0.7" />
  </svg>
);

// ── GEOPOLITIK & KONFLIKTE ─────────────────────────────────────────────
const GlobeIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" fill="none" />
    <ellipse cx="16" cy="16" rx="5" ry="12" stroke={color} strokeWidth="1.4" fill="none" opacity="0.55" />
    <line x1="4" y1="16" x2="28" y2="16" stroke={color} strokeWidth="1.2" opacity="0.5" />
    <line x1="6.5" y1="10" x2="25.5" y2="10" stroke={color} strokeWidth="1" opacity="0.35" />
    <line x1="6.5" y1="22" x2="25.5" y2="22" stroke={color} strokeWidth="1" opacity="0.35" />
  </svg>
);

const KarteIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M4 6 L12 4 L20 8 L28 6 L28 26 L20 28 L12 24 L4 26 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <line x1="12" y1="4" x2="12" y2="24" stroke={color} strokeWidth="1.4" opacity="0.5" />
    <line x1="20" y1="8" x2="20" y2="28" stroke={color} strokeWidth="1.4" opacity="0.5" />
    <circle cx="18" cy="14" r="3" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.6" />
    <circle cx="18" cy="14" r="1.2" fill={color} fillOpacity="0.8" />
  </svg>
);

const FlaggeIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="6" y1="4" x2="6" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M6 6 L26 6 L22 14 L26 22 L6 22 Z" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15" strokeLinejoin="round" />
    <line x1="10" y1="11" x2="20" y2="11" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    <line x1="10" y1="16" x2="18" y2="16" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const NetzwerkIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="6" r="3.5" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="5" cy="24" r="3.5" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="27" cy="24" r="3.5" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="16" cy="18" r="3" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.6" />
    <line x1="16" y1="9.5" x2="16" y2="15" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="13.5" y1="20" x2="7.5" y2="22" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="18.5" y1="20" x2="24.5" y2="22" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ── FINANZEN & MÄRKTE ──────────────────────────────────────────────────
const CandlestickIcon = ({ color = "currentColor" }: { color?: string }) => (
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
  </svg>
);

const MünzeIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="16" cy="16" r="8" stroke={color} strokeWidth="1.2" fill="none" opacity="0.4" />
    <text x="16" y="21" textAnchor="middle" fontSize="11" fontWeight="bold" fill={color} fillOpacity="0.75" fontFamily="serif">€</text>
  </svg>
);

const TrendPfeilIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <polyline points="3,24 10,16 16,20 24,8 29,8" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <polyline points="24,4 29,8 24,12" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="3" y1="28" x2="29" y2="28" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const IndexIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="3" y="3" width="26" height="26" rx="3" stroke={color} strokeWidth="2" fill="none" />
    <line x1="3" y1="12" x2="29" y2="12" stroke={color} strokeWidth="1.4" opacity="0.4" />
    <line x1="3" y1="20" x2="29" y2="20" stroke={color} strokeWidth="1.4" opacity="0.4" />
    <line x1="12" y1="3" x2="12" y2="29" stroke={color} strokeWidth="1.4" opacity="0.4" />
    <line x1="20" y1="3" x2="20" y2="29" stroke={color} strokeWidth="1.4" opacity="0.4" />
    <polyline points="5,22 9,17 13,19 17,12 21,15 27,7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// ── UMFRAGEN & MEINUNGSFORSCHUNG ───────────────────────────────────────
const FragebogenIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="3" width="24" height="26" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="9" cy="11" r="2" stroke={color} strokeWidth="1.4" fill="none" />
    <line x1="14" y1="11" x2="24" y2="11" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="9" cy="17" r="2" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.6" />
    <line x1="14" y1="17" x2="24" y2="17" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="9" cy="23" r="2" stroke={color} strokeWidth="1.4" fill="none" />
    <line x1="14" y1="23" x2="24" y2="23" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="9" y1="6" x2="23" y2="6" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const SentimentIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="11" cy="13" r="2" fill={color} fillOpacity="0.7" />
    <circle cx="21" cy="13" r="2" fill={color} fillOpacity="0.7" />
    <path d="M10 20 Q16 26 22 20" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M7 9 Q5 7 7 5" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
    <path d="M25 9 Q27 7 25 5" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
  </svg>
);

const PanelIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="2" y="4" width="28" height="18" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
    <path d="M10 22 L10 26 M22 22 L22 26 M8 26 L24 26" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="11" r="2.2" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.4" />
    <circle cx="13" cy="11" r="2.2" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1.4" />
    <circle cx="18" cy="11" r="2.2" fill={color} fillOpacity="0.7" stroke={color} strokeWidth="1.4" />
    <circle cx="23" cy="11" r="2.2" fill={color} fillOpacity="0.9" stroke={color} strokeWidth="1.4" />
    <line x1="6" y1="17" x2="20" y2="17" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const SkalaIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="3" y1="16" x2="29" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="3" y1="12" x2="3" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="29" y1="12" x2="29" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="13" x2="9" y2="19" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="16" y1="12" x2="16" y2="20" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="23" y1="13" x2="23" y2="19" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="20" cy="16" r="4" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
    <circle cx="20" cy="16" r="1.5" fill={color} />
    <line x1="9" y1="24" x2="9" y2="26" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <line x1="16" y1="24" x2="16" y2="26" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <line x1="23" y1="24" x2="23" y2="26" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

// ── PREDICTION MARKETS ─────────────────────────────────────────────────
const WahrscheinlichkeitIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" fill="none" />
    <path d="M16 16 L16 4 A12 12 0 0 1 27.6 22 Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
    <path d="M16 16 L27.6 22 A12 12 0 0 1 4 22 Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.2" />
    <circle cx="16" cy="16" r="2.5" fill={color} />
    <line x1="16" y1="4" x2="16" y2="7" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    <line x1="28" y1="16" x2="25" y2="16" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const WettenIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="3" y="8" width="26" height="16" rx="3" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="16" cy="16" r="5" stroke={color} strokeWidth="1.6" fill="none" />
    <circle cx="16" cy="16" r="2" fill={color} fillOpacity="0.6" />
    <circle cx="5" cy="16" r="2.5" stroke={color} strokeWidth="1.4" fill="none" opacity="0.6" />
    <circle cx="27" cy="16" r="2.5" stroke={color} strokeWidth="1.4" fill="none" opacity="0.6" />
    <line x1="3" y1="12" x2="29" y2="12" stroke={color} strokeWidth="1" opacity="0.3" />
    <line x1="3" y1="20" x2="29" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
  </svg>
);

const PrognoseIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="4" y1="28" x2="28" y2="28" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    <polyline points="4,22 9,18 14,20 19,12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M19 12 Q22 8 25 6 Q27 5 28 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2.5" fill="none" opacity="0.7" />
    <path d="M19 12 Q22 14 25 18 Q27 21 28 23" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 2.5" fill="none" opacity="0.4" />
    <circle cx="19" cy="12" r="2.5" fill={color} />
  </svg>
);

const UhrIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" fill="none" />
    <line x1="16" y1="5" x2="16" y2="7.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="27" y1="16" x2="24.5" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="5" y1="16" x2="7.5" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="27" x2="16" y2="24.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="16" x2="22" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="16" x2="13" y2="21" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    <circle cx="16" cy="16" r="2.5" fill={color} />
  </svg>
);

// ── INNOVATION & PATENTE ───────────────────────────────────────────────
const GlühbirneIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 4 Q24 7 24 15 Q24 21 20 23 L20 26 L12 26 L12 23 Q8 21 8 15 Q8 7 16 4 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <line x1="12" y1="26" x2="20" y2="26" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="12" y1="29" x2="20" y2="29" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M13 18 L14.5 15 L16 18 L17.5 15 L19 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
    <line x1="16" y1="1" x2="16" y2="3" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    <line x1="26" y1="5" x2="24.5" y2="6.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
    <line x1="6" y1="5" x2="7.5" y2="6.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const PatentIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M6 4 L22 4 L28 10 L28 28 L6 28 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M22 4 L22 10 L28 10" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <path d="M11 14 Q11 10 15 10 Q19 10 19 14 Q19 17 16 18 L16 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <circle cx="16" cy="23" r="1.5" fill={color} />
    <line x1="10" y1="25" x2="22" y2="25" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const TechnologieIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="3" y="6" width="26" height="16" rx="2" stroke={color} strokeWidth="2" fill="none" />
    <line x1="10" y1="22" x2="8" y2="27" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="22" y1="22" x2="24" y2="27" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="7" y1="27" x2="25" y2="27" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <polyline points="7,17 11,12 15,15 19,9 25,13" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const RaketeIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 3 Q24 3 26 16 L26 24 L16 28 L6 24 L6 16 Q8 3 16 3 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <circle cx="16" cy="14" r="4" stroke={color} strokeWidth="1.6" fill="none" />
    <circle cx="16" cy="14" r="1.8" fill={color} fillOpacity="0.5" />
    <path d="M6 22 L3 26 L6 26 Z" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M26 22 L29 26 L26 26 Z" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M13 28 Q14 30 16 30 Q18 30 19 28" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.5" />
  </svg>
);

// ── SOCIAL & COMMUNITY ─────────────────────────────────────────────────
const PersonenIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="9" r="4.5" stroke={color} strokeWidth="2" fill="none" />
    <path d="M9 28 Q9 22 16 22 Q23 22 23 28" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="6" cy="13" r="3" stroke={color} strokeWidth="1.6" fill="none" />
    <path d="M1 28 Q1 23 6 23" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.7" />
    <circle cx="26" cy="13" r="3" stroke={color} strokeWidth="1.6" fill="none" />
    <path d="M31 28 Q31 23 26 23" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.7" />
  </svg>
);

const SprechblaseIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M4 5 Q4 3 6 3 L26 3 Q28 3 28 5 L28 19 Q28 21 26 21 L12 21 L6 27 L6 21 Q4 21 4 19 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <line x1="9" y1="10" x2="23" y2="10" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="9" y1="15" x2="19" y2="15" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const HashtagIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="10" y1="4" x2="7" y2="28" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="22" y1="4" x2="19" y2="28" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="4" y1="12" x2="28" y2="12" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="4" y1="20" x2="28" y2="20" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const TeileIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="6" cy="16" r="4" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="26" cy="7" r="4" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="26" cy="25" r="4" stroke={color} strokeWidth="2" fill="none" />
    <line x1="10" y1="14.5" x2="22" y2="8.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="10" y1="17.5" x2="22" y2="23.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// ── KLIMA & UMWELT ─────────────────────────────────────────────────────
const BlattIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 3 Q26 8 26 18 Q26 27 16 30 Q6 27 6 18 Q6 8 16 3 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <line x1="16" y1="30" x2="16" y2="12" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    <path d="M16 22 Q12 19 8 19" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M16 17 Q13 14 10 13" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.45" />
    <path d="M16 22 Q20 19 24 19" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6" />
    <circle cx="16" cy="12" r="1.8" fill={color} fillOpacity="0.5" />
  </svg>
);

const WolkeIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M8 22 Q4 22 4 18 Q4 14 8 13 Q8 8 13 7 Q17 6 20 9 Q22 7 25 8 Q29 9 29 14 Q32 15 30 19 Q29 22 26 22 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <line x1="12" y1="26" x2="12" y2="29" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
    <line x1="16" y1="25" x2="16" y2="28" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
    <line x1="20" y1="26" x2="20" y2="29" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const TemperaturIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="13" y="4" width="6" height="18" rx="3" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="16" cy="24" r="5" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2" />
    <line x1="16" y1="22" x2="16" y2="10" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    <line x1="19" y1="8" x2="23" y2="8" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    <line x1="19" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    <line x1="19" y1="16" x2="23" y2="16" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const CO2Icon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M8 10 Q4 10 4 16 Q4 22 8 22 Q10 22 11 20" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M11 12 Q12 10 14 10 Q18 10 18 16 Q18 22 14 22 Q10 22 10 16" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="24" cy="16" r="6" stroke={color} strokeWidth="2" fill="none" />
    <text x="24" y="20" textAnchor="middle" fontSize="7" fontWeight="bold" fill={color} fillOpacity="0.8" fontFamily="monospace">2</text>
    <path d="M4 6 Q8 3 12 5" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" strokeDasharray="2 2" />
    <path d="M20 6 Q24 3 28 5" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" strokeDasharray="2 2" />
  </svg>
);

// ── GESUNDHEIT & BEVÖLKERUNG ───────────────────────────────────────────
const HerzIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 27 Q5 20 5 12 Q5 6 11 6 Q14 6 16 9 Q18 6 21 6 Q27 6 27 12 Q27 20 16 27 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <line x1="16" y1="11" x2="16" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    <line x1="12" y1="15" x2="20" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
  </svg>
);

const EKGIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="3" y1="16" x2="7" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <polyline points="7,16 10,16 12,8 14,24 16,12 18,20 20,16 25,16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="25" y1="16" x2="29" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="3" y1="24" x2="29" y2="24" stroke={color} strokeWidth="1" opacity="0.3" />
    <line x1="3" y1="8" x2="29" y2="8" stroke={color} strokeWidth="1" opacity="0.3" />
  </svg>
);

const BevölkerungIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="4" y1="28" x2="28" y2="28" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    <rect x="5" y="16" width="5" height="12" rx="1" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.4" />
    <rect x="12" y="10" width="5" height="18" rx="1" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1.4" />
    <rect x="19" y="6" width="5" height="22" rx="1" fill={color} fillOpacity="0.7" stroke={color} strokeWidth="1.4" />
    <circle cx="7.5" cy="13" r="2.5" stroke={color} strokeWidth="1.4" fill="none" />
    <circle cx="14.5" cy="7" r="2.5" stroke={color} strokeWidth="1.4" fill="none" />
    <circle cx="21.5" cy="3" r="2.5" stroke={color} strokeWidth="1.4" fill="none" />
  </svg>
);

const VaccineIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="20" y1="4" x2="28" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <rect x="10" y="10" width="12" height="6" rx="1.5" stroke={color} strokeWidth="2" fill="none" transform="rotate(45 16 13)" />
    <line x1="8" y1="18" x2="4" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="4" y1="28" x2="8" y2="28" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="14" y1="12" x2="18" y2="16" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    <line x1="24" y1="8" x2="27" y2="5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// ── FORESIGHT & SZENARIEN ──────────────────────────────────────────────
const FernrohrIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M3 8 L14 12 L14 22 L3 26 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M14 12 L28 8 L28 18 L14 22 Z" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" strokeLinejoin="round" />
    <line x1="14" y1="17" x2="28" y2="13" stroke={color} strokeWidth="1" opacity="0.3" />
    <circle cx="28" cy="13" r="3" stroke={color} strokeWidth="1.6" fill="none" />
    <line x1="8" y1="26" x2="10" y2="30" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="6" y1="30" x2="12" y2="30" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const TrichterIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M3 5 L29 5 L19 16 L19 27 L13 24 L13 16 Z" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" strokeLinejoin="round" />
    <line x1="5" y1="9" x2="27" y2="9" stroke={color} strokeWidth="1.2" opacity="0.4" />
    <line x1="8" y1="13" x2="24" y2="13" stroke={color} strokeWidth="1.2" opacity="0.4" />
  </svg>
);

const SzenarioIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="8" cy="16" r="3" fill={color} fillOpacity="0.8" />
    <line x1="11" y1="16" x2="16" y2="10" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="11" y1="16" x2="16" y2="16" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="11" y1="16" x2="16" y2="22" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="19" cy="10" r="3" stroke={color} strokeWidth="1.6" fill="none" />
    <line x1="22" y1="10" x2="27" y2="7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="22" y1="10" x2="27" y2="13" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="19" cy="16" r="3" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.3" />
    <line x1="22" y1="16" x2="27" y2="16" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="19" cy="22" r="3" stroke={color} strokeWidth="1.6" fill="none" />
    <line x1="22" y1="22" x2="27" y2="19" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="22" y1="22" x2="27" y2="25" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ZielscheibIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="1.2" fill="none" opacity="0.35" />
    <circle cx="16" cy="16" r="9" stroke={color} strokeWidth="1.6" fill="none" opacity="0.6" />
    <circle cx="16" cy="16" r="5" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="16" cy="16" r="2.5" fill={color} fillOpacity="0.7" />
    <line x1="16" y1="3" x2="16" y2="8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="24" x2="16" y2="29" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="3" y1="16" x2="8" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="24" y1="16" x2="29" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// ── ANALYSE-METHODEN ───────────────────────────────────────────────────
// Marktanalyse
const SWOTIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="2" y="2" width="28" height="28" rx="2.5" stroke={color} strokeWidth="1.6" fill="none" />
    <line x1="16" y1="2" x2="16" y2="30" stroke={color} strokeWidth="1.4" opacity="0.4" />
    <line x1="2" y1="16" x2="30" y2="16" stroke={color} strokeWidth="1.4" opacity="0.4" />
    <line x1="6" y1="9" x2="13" y2="9" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    <line x1="6" y1="12" x2="11" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    <line x1="19" y1="6" x2="19" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <polyline points="17,8 19,6 21,8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="9" y1="19" x2="9" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <polyline points="7,24 9,26 11,24" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
    <path d="M23 20 L26 26 L20 26 Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" fill={color} fillOpacity="0.2" />
  </svg>
);

const QuadrantIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="16" y1="3" x2="16" y2="29" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="3" y1="16" x2="29" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8" cy="10" r="3" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.4" />
    <circle cx="22" cy="8" r="4" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1.4" />
    <circle cx="10" cy="22" r="2" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.4" />
    <circle cx="24" cy="22" r="3" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.4" />
  </svg>
);

const WettbewerbIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15" />
    <circle cx="8" cy="10" r="4" stroke={color} strokeWidth="1.6" fill="none" />
    <circle cx="24" cy="10" r="4" stroke={color} strokeWidth="1.6" fill="none" />
    <circle cx="8" cy="24" r="4" stroke={color} strokeWidth="1.6" fill="none" />
    <circle cx="24" cy="24" r="4" stroke={color} strokeWidth="1.6" fill="none" />
    <line x1="12" y1="12" x2="14" y2="14" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <line x1="20" y1="12" x2="18" y2="14" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <line x1="12" y1="20" x2="14" y2="18" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <line x1="20" y1="20" x2="18" y2="18" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// War-Gaming
const HexagonIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <polygon points="16,2 29,9.5 29,24.5 16,30 3,24.5 3,9.5" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    <polygon points="16,8 24,12.5 24,21.5 16,26 8,21.5 8,12.5" stroke={color} strokeWidth="1.3" fill="none" strokeLinejoin="round" opacity="0.4" />
    <polygon points="16,12 20,14.5 20,19.5 16,22 12,19.5 12,14.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    <circle cx="16" cy="17" r="1.8" fill={color} />
  </svg>
);

const SchachIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="3" y="3" width="26" height="26" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
    <rect x="3" y="3" width="6.5" height="6.5" fill={color} fillOpacity="0.3" />
    <rect x="16" y="3" width="6.5" height="6.5" fill={color} fillOpacity="0.3" />
    <rect x="9.5" y="9.5" width="6.5" height="6.5" fill={color} fillOpacity="0.3" />
    <rect x="22.5" y="9.5" width="6.5" height="6.5" fill={color} fillOpacity="0.3" />
    <rect x="3" y="16" width="6.5" height="6.5" fill={color} fillOpacity="0.3" />
    <rect x="16" y="16" width="6.5" height="6.5" fill={color} fillOpacity="0.3" />
    <rect x="9.5" y="22.5" width="6.5" height="6.5" fill={color} fillOpacity="0.3" />
    <rect x="22.5" y="22.5" width="6.5" height="6.5" fill={color} fillOpacity="0.3" />
  </svg>
);

const SzenarioZweigIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="6" cy="16" r="3.5" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1.6" />
    <line x1="9.5" y1="16" x2="14" y2="10" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="9.5" y1="16" x2="14" y2="22" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="17.5" cy="10" r="3" stroke={color} strokeWidth="1.6" fill="none" />
    <line x1="20.5" y1="10" x2="25" y2="7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="20.5" y1="10" x2="25" y2="13" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="17.5" cy="22" r="3" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.25" />
    <line x1="20.5" y1="22" x2="25" y2="19" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="20.5" y1="22" x2="25" y2="25" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// Pre-Mortem
const WarndreieckIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 3 L30 28 L2 28 Z" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.07" strokeLinejoin="round" />
    <line x1="16" y1="11" x2="16" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="16" cy="24" r="1.8" fill={color} />
  </svg>
);

const RisikoIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="3" y="3" width="26" height="26" rx="2" stroke={color} strokeWidth="1.6" fill="none" />
    <line x1="3" y1="16" x2="29" y2="16" stroke={color} strokeWidth="1.2" opacity="0.35" />
    <line x1="16" y1="3" x2="16" y2="29" stroke={color} strokeWidth="1.2" opacity="0.35" />
    <rect x="17" y="4" width="11" height="11" rx="1" fill={color} fillOpacity="0.5" />
    <rect x="4" y="17" width="11" height="11" rx="1" fill={color} fillOpacity="0.2" />
    <rect x="17" y="17" width="11" height="11" rx="1" fill={color} fillOpacity="0.1" />
    <rect x="4" y="4" width="11" height="11" rx="1" fill={color} fillOpacity="0.3" />
  </svg>
);

const ChecklistIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="3" width="24" height="26" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
    <polyline points="9,11 11,13 15,9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="18" y1="11" x2="24" y2="11" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <polyline points="9,18 11,20 15,16" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="18" y1="18" x2="24" y2="18" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="9" y1="25" x2="15" y2="25" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    <line x1="18" y1="25" x2="24" y2="25" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// Post-Mortem
const LupeIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="13" cy="13" r="9" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="13" cy="13" r="5.5" stroke={color} strokeWidth="1.3" fill="none" opacity="0.4" />
    <line x1="20" y1="20" x2="29" y2="29" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="10" y1="10" x2="16" y2="16" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    <line x1="16" y1="10" x2="10" y2="16" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
  </svg>
);

const UrsacheIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="4" y1="16" x2="28" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="28" cy="16" r="3" fill={color} fillOpacity="0.7" />
    <line x1="10" y1="16" x2="10" y2="10" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="10" y1="10" x2="7" y2="7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="10" y1="10" x2="13" y2="7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="16" y1="16" x2="16" y2="8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="16" y1="8" x2="13" y2="5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="16" y1="8" x2="19" y2="5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="22" y1="16" x2="22" y2="10" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="22" y1="10" x2="19" y2="7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <line x1="22" y1="10" x2="25" y2="7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ZeitlinienIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <line x1="4" y1="16" x2="28" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="16" r="3" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="16" cy="16" r="3" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1.8" />
    <circle cx="24" cy="16" r="3" stroke={color} strokeWidth="1.8" fill="none" />
    <line x1="8" y1="13" x2="8" y2="8" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    <line x1="16" y1="13" x2="16" y2="8" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    <line x1="24" y1="13" x2="24" y2="8" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    <line x1="5" y1="8" x2="11" y2="8" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <line x1="13" y1="8" x2="19" y2="8" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <line x1="21" y1="8" x2="27" y2="8" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

// Trend Deep-Dive
const TrendSuchIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="13" cy="13" r="9" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="13" cy="13" r="6" stroke={color} strokeWidth="1.2" fill="none" opacity="0.45" />
    <polyline points="7,16 10,11 13,14 16,9" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="16" cy="9" r="1.5" fill={color} />
    <line x1="20" y1="20" x2="29" y2="29" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const SignalIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M4 22 Q4 10 16 10 Q28 10 28 22" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M8 22 Q8 14 16 14 Q24 14 24 22" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M12 22 Q12 18 16 18 Q20 18 20 22" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.5" />
    <circle cx="16" cy="22" r="3" fill={color} fillOpacity="0.7" />
  </svg>
);

const MusterIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="8" cy="8" r="3" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.4" />
    <circle cx="16" cy="6" r="3" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1.4" />
    <circle cx="24" cy="10" r="3" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.4" />
    <circle cx="10" cy="18" r="3" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1.4" />
    <circle cx="22" cy="20" r="3" fill={color} fillOpacity="0.7" stroke={color} strokeWidth="1.4" />
    <circle cx="14" cy="26" r="3" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.4" />
    <line x1="8" y1="8" x2="16" y2="6" stroke={color} strokeWidth="1" opacity="0.3" />
    <line x1="16" y1="6" x2="24" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
    <line x1="8" y1="8" x2="10" y2="18" stroke={color} strokeWidth="1" opacity="0.3" />
    <line x1="24" y1="10" x2="22" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
    <line x1="10" y1="18" x2="14" y2="26" stroke={color} strokeWidth="1" opacity="0.3" />
    <line x1="22" y1="20" x2="14" y2="26" stroke={color} strokeWidth="1" opacity="0.3" />
  </svg>
);

// Stakeholder
const PersonIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="10" r="6" stroke={color} strokeWidth="2" fill="none" />
    <path d="M6 30 Q6 22 16 22 Q26 22 26 30" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const EinflussIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="5" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2" />
    <circle cx="16" cy="16" r="9" stroke={color} strokeWidth="1.4" fill="none" opacity="0.5" strokeDasharray="3 2" />
    <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3 2" />
    <circle cx="16" cy="16" r="2" fill={color} fillOpacity="0.8" />
    <line x1="16" y1="3" x2="16" y2="5" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    <line x1="29" y1="16" x2="27" y2="16" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    <line x1="3" y1="16" x2="5" y2="16" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    <line x1="16" y1="29" x2="16" y2="27" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const InteressenIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="10" cy="10" r="5" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.15" />
    <circle cx="22" cy="10" r="5" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.15" />
    <circle cx="16" cy="22" r="5" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.3" />
    <path d="M14 8 Q16 5 18 8" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" />
    <path d="M12 14 Q10 17 13 19" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" />
    <path d="M20 14 Q22 17 19 19" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════
   DATEN-LISTEN
══════════════════════════════════════════════════════════════════════ */

type IconDef = { name: string; Icon: React.FC<{ color?: string }> };

const QUELLEN_LIST: {
  label: string;
  sublabel: string;
  color: string;
  icons: IconDef[];
}[] = [
  {
    label: "News & Medien",
    sublabel: "Nachrichten, Presse, Broadcast",
    color: "#7AB8F5",
    icons: [
      { name: "Zeitung", Icon: ZeitungIcon },
      { name: "Mikrofon", Icon: MikrofonIcon },
      { name: "TV", Icon: TVBildschirmIcon },
      { name: "Antenne", Icon: AntenneIcon },
      { name: "Podcast", Icon: PodcastIcon },
    ],
  },
  {
    label: "Daten & Statistik",
    sublabel: "Kennzahlen, Indikatoren, Berichte",
    color: "#6DDBA0",
    icons: [
      { name: "Balken", Icon: BalkendiagrammIcon },
      { name: "Linien", Icon: LiniendiagrammIcon },
      { name: "Tabelle", Icon: TabelleIcon },
      { name: "KPI", Icon: KPIIcon },
      { name: "Datenbank", Icon: DatenbankIcon },
    ],
  },
  {
    label: "Wissenschaft & Forschung",
    sublabel: "Papers, Studien, Experimente",
    color: "#D98AE8",
    icons: [
      { name: "Reagenzglas", Icon: ReagenzglasIcon },
      { name: "Mikroskop", Icon: MikroskopIcon },
      { name: "Paper", Icon: PaperIcon },
      { name: "Atom", Icon: AtomIcon },
    ],
  },
  {
    label: "Geopolitik & Konflikte",
    sublabel: "Regionen, Akteure, Ereignisse",
    color: "#F4A0B5",
    icons: [
      { name: "Globus", Icon: GlobeIcon },
      { name: "Karte", Icon: KarteIcon },
      { name: "Flagge", Icon: FlaggeIcon },
      { name: "Netzwerk", Icon: NetzwerkIcon },
    ],
  },
  {
    label: "Finanzen & Märkte",
    sublabel: "Kurse, Indizes, Makroökonomie",
    color: "#F5C87A",
    icons: [
      { name: "Candlestick", Icon: CandlestickIcon },
      { name: "Münze", Icon: MünzeIcon },
      { name: "Trend", Icon: TrendPfeilIcon },
      { name: "Index", Icon: IndexIcon },
    ],
  },
  {
    label: "Umfragen & Meinungsforschung",
    sublabel: "Surveys, Panels, Sentiment",
    color: "#F0956A",
    icons: [
      { name: "Fragebogen", Icon: FragebogenIcon },
      { name: "Sentiment", Icon: SentimentIcon },
      { name: "Panel", Icon: PanelIcon },
      { name: "Skala", Icon: SkalaIcon },
    ],
  },
  {
    label: "Prediction Markets",
    sublabel: "Wetten, Prognosen, Wahrscheinlichkeiten",
    color: "#5ECECE",
    icons: [
      { name: "Wahrscheinlichkeit", Icon: WahrscheinlichkeitIcon },
      { name: "Wetten", Icon: WettenIcon },
      { name: "Prognose", Icon: PrognoseIcon },
      { name: "Uhr", Icon: UhrIcon },
    ],
  },
  {
    label: "Innovation & Patente",
    sublabel: "Technologien, Erfindungen, Trends",
    color: "#E8C840",
    icons: [
      { name: "Glühbirne", Icon: GlühbirneIcon },
      { name: "Patent", Icon: PatentIcon },
      { name: "Technologie", Icon: TechnologieIcon },
      { name: "Rakete", Icon: RaketeIcon },
    ],
  },
  {
    label: "Social & Community",
    sublabel: "Netzwerke, Diskurse, Gruppen",
    color: "#7AB8F5",
    icons: [
      { name: "Personen", Icon: PersonenIcon },
      { name: "Chat", Icon: SprechblaseIcon },
      { name: "Hashtag", Icon: HashtagIcon },
      { name: "Teilen", Icon: TeileIcon },
    ],
  },
  {
    label: "Klima & Umwelt",
    sublabel: "Klimadaten, Ökosysteme, ESG",
    color: "#6DDBA0",
    icons: [
      { name: "Blatt", Icon: BlattIcon },
      { name: "Wolke", Icon: WolkeIcon },
      { name: "Temperatur", Icon: TemperaturIcon },
      { name: "CO₂", Icon: CO2Icon },
    ],
  },
  {
    label: "Gesundheit & Bevölkerung",
    sublabel: "Epidemiologie, Demografie",
    color: "#F4A0B5",
    icons: [
      { name: "Herz", Icon: HerzIcon },
      { name: "EKG", Icon: EKGIcon },
      { name: "Bevölkerung", Icon: BevölkerungIcon },
      { name: "Impfung", Icon: VaccineIcon },
    ],
  },
  {
    label: "Foresight & Szenarien",
    sublabel: "Zukunftsbilder, Strategien",
    color: "#D98AE8",
    icons: [
      { name: "Fernrohr", Icon: FernrohrIcon },
      { name: "Trichter", Icon: TrichterIcon },
      { name: "Szenario", Icon: SzenarioIcon },
      { name: "Ziel", Icon: ZielscheibIcon },
    ],
  },
];

const METHODEN_LIST: {
  label: string;
  sublabel: string;
  color: string;
  desc: string;
  icons: IconDef[];
}[] = [
  {
    label: "Marktanalyse",
    sublabel: "4 Quadranten SWOT",
    color: "#7AB8F5",
    desc: "Stärken, Schwächen, Chancen und Risiken systematisch in vier Quadranten erfassen.",
    icons: [
      { name: "SWOT", Icon: SWOTIcon },
      { name: "Quadrant", Icon: QuadrantIcon },
      { name: "Wettbewerb", Icon: WettbewerbIcon },
    ],
  },
  {
    label: "War-Gaming",
    sublabel: "3 Szenarien + Strategie",
    color: "#F5C87A",
    desc: "Gegnerische Strategien simulieren und eigene Reaktionen im Voraus durchspielen.",
    icons: [
      { name: "Hexagon", Icon: HexagonIcon },
      { name: "Schach", Icon: SchachIcon },
      { name: "Zweige", Icon: SzenarioZweigIcon },
    ],
  },
  {
    label: "Pre-Mortem",
    sublabel: "Was könnte schiefgehen?",
    color: "#F4A0B5",
    desc: "Vor dem Start imaginär scheitern – um Risiken frühzeitig zu identifizieren.",
    icons: [
      { name: "Warnung", Icon: WarndreieckIcon },
      { name: "Risiko", Icon: RisikoIcon },
      { name: "Checkliste", Icon: ChecklistIcon },
    ],
  },
  {
    label: "Post-Mortem",
    sublabel: "Ursachen-Analyse",
    color: "#6DDBA0",
    desc: "Nach einem Ereignis die Ursachenkette systematisch rekonstruieren.",
    icons: [
      { name: "Lupe", Icon: LupeIcon },
      { name: "Ursache", Icon: UrsacheIcon },
      { name: "Zeitlinie", Icon: ZeitlinienIcon },
    ],
  },
  {
    label: "Trend Deep-Dive",
    sublabel: "Trend von allen Seiten",
    color: "#D98AE8",
    desc: "Einen Trend aus technologischer, sozialer, wirtschaftlicher und politischer Sicht durchleuchten.",
    icons: [
      { name: "Suche", Icon: TrendSuchIcon },
      { name: "Signal", Icon: SignalIcon },
      { name: "Muster", Icon: MusterIcon },
    ],
  },
  {
    label: "Stakeholder",
    sublabel: "Akteure & Einfluss",
    color: "#5ECECE",
    desc: "Alle relevanten Akteure kartieren und ihre Interessen sowie Einflussmöglichkeiten bewerten.",
    icons: [
      { name: "Person", Icon: PersonIcon },
      { name: "Einfluss", Icon: EinflussIcon },
      { name: "Interessen", Icon: InteressenIcon },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════════════
   KARTEN-KOMPONENTEN
══════════════════════════════════════════════════════════════════════ */

const QuellenCard: React.FC<{ item: typeof QUELLEN_LIST[0] }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const FirstIcon = item.icons[0].Icon;

  return (
    <div
      className="rounded-2xl border bg-card overflow-hidden transition-all duration-200"
      style={{
        borderColor: open ? `${item.color}50` : "var(--border)",
        boxShadow: open ? `0 4px 20px ${item.color}18` : "none",
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-200"
          style={{ width: 52, height: 52, background: `${item.color}15`, border: `1px solid ${item.color}30` }}
        >
          <FirstIcon color={item.color} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-foreground leading-tight">{item.label}</p>
          <p className="text-[10px] font-mono text-muted-foreground leading-tight mt-0.5">{item.sublabel}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg border" style={{ color: item.color, borderColor: `${item.color}35`, background: `${item.color}0D` }}>
            {item.icons.length} Icons
          </span>
          <ChevronDown
            className="w-4 h-4 text-muted-foreground transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t" style={{ borderColor: `${item.color}20` }}>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-4">
                {item.icons.map(({ name, Icon }) => (
                  <button
                    key={name}
                    onClick={() => setActiveIcon(activeIcon === name ? null : name)}
                    className="flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-150 border"
                    style={{
                      background: activeIcon === name ? `${item.color}20` : `${item.color}08`,
                      borderColor: activeIcon === name ? `${item.color}50` : `${item.color}20`,
                    }}
                  >
                    <Icon color={item.color} />
                    <span className="text-[9px] font-mono text-center leading-tight" style={{ color: item.color }}>{name}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {activeIcon && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 2 }}
                    className="mt-3 rounded-xl p-4 flex items-center gap-6"
                    style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}
                  >
                    <div className="flex items-end gap-4">
                      {[48, 32, 24, 16].map(sz => {
                        const ic = item.icons.find(i => i.name === activeIcon);
                        if (!ic) return null;
                        return (
                          <div key={sz} className="flex flex-col items-center gap-1.5">
                            <div className="flex items-center justify-center rounded-lg" style={{ width: sz + 12, height: sz + 12, background: `${item.color}15` }}>
                              <ic.Icon color={item.color} />
                            </div>
                            <span className="font-mono text-[8px] text-muted-foreground">{sz}px</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[10px] font-semibold" style={{ color: item.color }}>{activeIcon}</p>
                      <p className="font-mono text-[10px] text-muted-foreground mt-1 break-all">{`<${activeIcon.replace(/[- &äöü]/g, "")}Icon color="${item.color}" />`}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MethodenCard: React.FC<{ item: typeof METHODEN_LIST[0] }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const FirstIcon = item.icons[0].Icon;

  return (
    <div
      className="rounded-2xl border bg-card overflow-hidden transition-all duration-200"
      style={{
        borderColor: open ? item.color : "var(--border)",
        boxShadow: open ? `0 0 0 1px ${item.color}30, 0 6px 24px ${item.color}18` : "none",
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ width: 52, height: 52, background: `${item.color}15`, border: `1px solid ${item.color}30` }}
        >
          <FirstIcon color={item.color} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-foreground leading-tight">{item.label}</p>
          <p className="text-[10px] font-mono text-muted-foreground leading-tight mt-0.5">{item.sublabel}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg border" style={{ color: item.color, borderColor: `${item.color}35`, background: `${item.color}0D` }}>
            {item.icons.length} Icons
          </span>
          <ChevronDown
            className="w-4 h-4 text-muted-foreground transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t" style={{ borderColor: `${item.color}25` }}>
              <p className="text-[12px] text-muted-foreground leading-relaxed pt-4 pb-3">{item.desc}</p>
              <div className="grid grid-cols-3 gap-2">
                {item.icons.map(({ name, Icon }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-2 rounded-xl p-4 border"
                    style={{ background: `${item.color}0A`, borderColor: `${item.color}25` }}
                  >
                    <Icon color={item.color} />
                    <span className="text-[9px] font-mono text-center leading-tight" style={{ color: item.color }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   HAUPT-SECTION
══════════════════════════════════════════════════════════════════════ */

export default function QuellenMethodenSection() {
  const totalIcons = QUELLEN_LIST.reduce((s, c) => s + c.icons.length, 0)
    + METHODEN_LIST.reduce((s, c) => s + c.icons.length, 0);

  return (
    <section className="space-y-12">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Icon-Sets · Quellen & Methoden</p>
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-display font-bold text-3xl text-foreground tracking-tight">Quellen & Methoden</h2>
          <span className="px-2.5 py-1 rounded-xl text-[11px] font-mono bg-muted text-muted-foreground border border-border">{totalIcons} Icons</span>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Zwei spezialisierte Icon-Sets: zwölf Datenquellen-Kategorien und sechs Analyse-Methoden –
          jeweils mit 3–5 thematischen Icons. Kategorie anklicken zum Aufklappen.
        </p>
      </div>

      {/* Datenquellen */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-base font-semibold text-foreground">Datenquellen</h3>
          <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-muted text-muted-foreground border border-border">
            {QUELLEN_LIST.length} Kategorien · {QUELLEN_LIST.reduce((s, c) => s + c.icons.length, 0)} Icons
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {QUELLEN_LIST.map(item => <QuellenCard key={item.label} item={item} />)}
        </div>
      </div>

      {/* Analyse-Methoden */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-base font-semibold text-foreground">Analyse-Methoden</h3>
          <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-muted text-muted-foreground border border-border">
            {METHODEN_LIST.length} Methoden · {METHODEN_LIST.reduce((s, c) => s + c.icons.length, 0)} Icons
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {METHODEN_LIST.map(item => <MethodenCard key={item.label} item={item} />)}
        </div>
      </div>
    </section>
  );
}
