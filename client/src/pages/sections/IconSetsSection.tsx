/**
 * IconSetsSection – Kategorie-Icons & Analyse-Methoden
 * ─────────────────────────────────────────────────────────────────────────────
 * Zwei Icon-Sets:
 *   1. Kategorie-Icons (13): Thematische Datenquellen-Kategorien
 *   2. Analyse-Methoden (6): Karten mit Icon, Titel und Beschreibung
 */

import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

/* ══════════════════════════════════════════════════════════════════════
   SVG-ICONS: Kategorie-Icons
══════════════════════════════════════════════════════════════════════ */

const CategoryIcons = {
  NewsMedian: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="3" y="5" width="22" height="18" rx="2.5" stroke={color} strokeWidth="1.6" />
      <line x1="3" y1="10" x2="25" y2="10" stroke={color} strokeWidth="1.4" />
      <rect x="6" y="13" width="8" height="7" rx="1" fill={color} opacity="0.25" stroke={color} strokeWidth="1.2" />
      <line x1="17" y1="13" x2="22" y2="13" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="17" y1="16" x2="22" y2="16" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="17" y1="19" x2="20" y2="19" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="6.5" cy="7.5" r="1" fill={color} />
      <circle cx="9.5" cy="7.5" r="1" fill={color} />
      <circle cx="12.5" cy="7.5" r="1" fill={color} />
    </svg>
  ),

  DatenStatistik: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="4" y="16" width="4" height="8" rx="1" fill={color} opacity="0.35" stroke={color} strokeWidth="1.3" />
      <rect x="10" y="11" width="4" height="13" rx="1" fill={color} opacity="0.55" stroke={color} strokeWidth="1.3" />
      <rect x="16" y="7" width="4" height="17" rx="1" fill={color} opacity="0.75" stroke={color} strokeWidth="1.3" />
      <rect x="22" y="4" width="4" height="20" rx="1" fill={color} opacity="0.90" stroke={color} strokeWidth="1.3" />
      <polyline points="4,15 10,10 16,6 22,3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
      <circle cx="4" cy="15" r="1.5" fill={color} />
      <circle cx="10" cy="10" r="1.5" fill={color} />
      <circle cx="16" cy="6" r="1.5" fill={color} />
      <circle cx="22" cy="3" r="1.5" fill={color} />
    </svg>
  ),

  WissenschaftForschung: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M10 4 L10 14 L4 22 L24 22 L18 14 L18 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="8" y1="4" x2="20" y2="4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="11" cy="18" r="2" fill={color} opacity="0.5" />
      <circle cx="17" cy="16" r="1.5" fill={color} opacity="0.7" />
      <circle cx="14" cy="20" r="1" fill={color} opacity="0.4" />
      <line x1="13" y1="8" x2="15" y2="8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="13" y1="11" x2="15" y2="11" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),

  GeopolitikKonflikte: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="1.6" fill="none" />
      <ellipse cx="14" cy="14" rx="4.5" ry="10" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
      <line x1="4" y1="14" x2="24" y2="14" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <line x1="6" y1="9" x2="22" y2="9" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="6" y1="19" x2="22" y2="19" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M14 4 Q18 8 18 14 Q18 20 14 24" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
      <circle cx="14" cy="14" r="2.5" fill={color} opacity="0.3" stroke={color} strokeWidth="1.2" />
    </svg>
  ),

  FinanzenMaerkte: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <polyline points="3,20 8,13 12,16 17,8 22,11 25,6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="3" y1="24" x2="25" y2="24" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="3" y1="24" x2="3" y2="4" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="7" y="16" width="3" height="8" rx="0.5" fill={color} opacity="0.25" />
      <rect x="12" y="14" width="3" height="10" rx="0.5" fill={color} opacity="0.4" />
      <rect x="17" y="11" width="3" height="13" rx="0.5" fill={color} opacity="0.6" />
    </svg>
  ),

  UmfragenMeinungsforschung: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="3" y="3" width="22" height="16" rx="2.5" stroke={color} strokeWidth="1.6" fill="none" />
      <path d="M8 22 L8 19 L20 19 L20 22" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="14" y1="22" x2="14" y2="25" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="9" r="1.5" fill={color} opacity="0.5" />
      <circle cx="14" cy="9" r="1.5" fill={color} opacity="0.7" />
      <circle cx="19" cy="9" r="1.5" fill={color} opacity="0.9" />
      <line x1="7" y1="13" x2="11" y2="13" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="12" y1="13" x2="16" y2="13" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="17" y1="13" x2="21" y2="13" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),

  PredictionMarkets: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="1.6" fill="none" />
      <path d="M14 4 L14 14 L21 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="14" cy="14" r="2" fill={color} />
      <line x1="14" y1="4" x2="14" y2="6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="24" y1="14" x2="22" y2="14" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="4" y1="14" x2="6" y2="14" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14" y1="24" x2="14" y2="22" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 19 Q11 22 14 22 Q17 22 20 19" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
    </svg>
  ),

  InnovationPatente: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 3 Q20 6 20 12 Q20 17 17 19 L17 22 L11 22 L11 19 Q8 17 8 12 Q8 6 14 3 Z" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <line x1="11" y1="22" x2="17" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="25" x2="17" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="7" x2="14" y2="15" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <line x1="10" y1="11" x2="18" y2="11" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <circle cx="14" cy="11" r="1.5" fill={color} opacity="0.4" />
    </svg>
  ),

  SocialCommunity: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="9" r="4" stroke={color} strokeWidth="1.6" fill="none" />
      <circle cx="6" cy="19" r="3" stroke={color} strokeWidth="1.4" fill="none" opacity="0.7" />
      <circle cx="22" cy="19" r="3" stroke={color} strokeWidth="1.4" fill="none" opacity="0.7" />
      <path d="M10 14 Q8 15 6 16" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M18 14 Q20 15 22 16" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M10 14 Q14 17 18 14" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  ),

  KlimaUmwelt: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 3 Q20 8 20 15 Q20 22 14 25 Q8 22 8 15 Q8 8 14 3 Z" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <path d="M14 25 L14 12" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      <path d="M14 18 Q11 15 8 15" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M14 14 Q17 11 20 11" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
      <circle cx="14" cy="10" r="1.5" fill={color} opacity="0.5" />
    </svg>
  ),

  GesundheitBevoelkerung: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 22 Q6 17 6 11 Q6 6 11 6 Q13 6 14 8 Q15 6 17 6 Q22 6 22 11 Q22 17 14 22 Z" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <line x1="14" y1="10" x2="14" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="11" y1="13" x2="17" y2="13" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  ),

  ForesightSzenarien: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="4" stroke={color} strokeWidth="1.6" fill="none" />
      <circle cx="14" cy="14" r="8" stroke={color} strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="3 3" />
      <line x1="14" y1="3" x2="14" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="21" x2="14" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="14" x2="7" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="14" x2="25" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6.5" y1="6.5" x2="9.3" y2="9.3" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <line x1="18.7" y1="18.7" x2="21.5" y2="21.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <line x1="21.5" y1="6.5" x2="18.7" y2="9.3" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <line x1="9.3" y1="18.7" x2="6.5" y2="21.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <circle cx="14" cy="14" r="2" fill={color} opacity="0.6" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════════════════════
   SVG-ICONS: Analyse-Methoden
══════════════════════════════════════════════════════════════════════ */

const MethodIcons = {
  Marktanalyse: ({ size = 32, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="4" y="4" width="11" height="11" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
      <rect x="17" y="4" width="11" height="11" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
      <rect x="4" y="17" width="11" height="11" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
      <rect x="17" y="17" width="11" height="11" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
      <line x1="16" y1="2" x2="16" y2="30" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <line x1="2" y1="16" x2="30" y2="16" stroke={color} strokeWidth="1.2" opacity="0.35" />
    </svg>
  ),

  WarGaming: ({ size = 32, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <polygon points="16,3 29,10 29,22 16,29 3,22 3,10" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <polygon points="16,9 23,13 23,19 16,23 9,19 9,13" stroke={color} strokeWidth="1.2" fill="none" strokeLinejoin="round" opacity="0.5" />
      <circle cx="16" cy="16" r="3" fill={color} opacity="0.4" stroke={color} strokeWidth="1.3" />
      <line x1="16" y1="3" x2="16" y2="9" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      <line x1="29" y1="10" x2="23" y2="13" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      <line x1="29" y1="22" x2="23" y2="19" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),

  PreMortem: ({ size = 32, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4 L28 26 L4 26 Z" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <line x1="16" y1="12" x2="16" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="22.5" r="1.5" fill={color} />
    </svg>
  ),

  PostMortem: ({ size = 32, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="11" stroke={color} strokeWidth="1.6" fill="none" />
      <circle cx="16" cy="16" r="4" stroke={color} strokeWidth="1.4" fill="none" opacity="0.5" />
      <line x1="16" y1="5" x2="16" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="16" y1="20" x2="16" y2="27" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="5" y1="16" x2="12" y2="16" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="20" y1="16" x2="27" y2="16" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),

  TrendDeepDive: ({ size = 32, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="14" cy="14" r="9" stroke={color} strokeWidth="1.6" fill="none" />
      <circle cx="14" cy="14" r="5" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" />
      <circle cx="14" cy="14" r="2" fill={color} opacity="0.6" />
      <line x1="20.5" y1="20.5" x2="27" y2="27" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  Stakeholder: ({ size = 32, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="10" r="4" stroke={color} strokeWidth="1.6" fill="none" />
      <path d="M8 26 Q8 20 16 20 Q24 20 24 26" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="7" cy="13" r="3" stroke={color} strokeWidth="1.3" fill="none" opacity="0.65" />
      <path d="M2 26 Q2 21 7 21" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.65" />
      <circle cx="25" cy="13" r="3" stroke={color} strokeWidth="1.3" fill="none" opacity="0.65" />
      <path d="M30 26 Q30 21 25 21" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.65" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════════════════════
   KATEGORIE-ICON-KARTE
══════════════════════════════════════════════════════════════════════ */

interface CategoryIconItem {
  label: string;
  sublabel: string;
  Icon: React.FC<{ size?: number; color?: string }>;
  color: string;
}

const CATEGORY_ICON_LIST: CategoryIconItem[] = [
  { label: "News & Medien",             sublabel: "Nachrichten, Presse, Broadcast",   Icon: CategoryIcons.NewsMedian,                color: "#7AB8F5" },
  { label: "Daten & Statistik",         sublabel: "Kennzahlen, Indikatoren, Berichte", Icon: CategoryIcons.DatenStatistik,            color: "#6DDBA0" },
  { label: "Wissenschaft & Forschung",  sublabel: "Papers, Studien, Experimente",      Icon: CategoryIcons.WissenschaftForschung,     color: "#D98AE8" },
  { label: "Geopolitik & Konflikte",    sublabel: "Regionen, Akteure, Ereignisse",     Icon: CategoryIcons.GeopolitikKonflikte,       color: "#F4A0B5" },
  { label: "Finanzen & Märkte",         sublabel: "Kurse, Indizes, Makroökonomie",     Icon: CategoryIcons.FinanzenMaerkte,           color: "#F5C87A" },
  { label: "Umfragen & Meinungsforschung", sublabel: "Surveys, Panels, Sentiment",    Icon: CategoryIcons.UmfragenMeinungsforschung, color: "#F0956A" },
  { label: "Prediction Markets",        sublabel: "Wetten, Prognosen, Wahrscheinlichkeiten", Icon: CategoryIcons.PredictionMarkets,   color: "#5ECECE" },
  { label: "Innovation & Patente",      sublabel: "Technologien, Erfindungen, Trends", Icon: CategoryIcons.InnovationPatente,         color: "#E8C840" },
  { label: "Social & Community",        sublabel: "Netzwerke, Diskurse, Gruppen",      Icon: CategoryIcons.SocialCommunity,           color: "#7AB8F5" },
  { label: "Klima & Umwelt",            sublabel: "Klimadaten, Ökosysteme, ESG",       Icon: CategoryIcons.KlimaUmwelt,               color: "#6DDBA0" },
  { label: "Gesundheit & Bevölkerung",  sublabel: "Epidemiologie, Demografie",         Icon: CategoryIcons.GesundheitBevoelkerung,    color: "#F4A0B5" },
  { label: "Foresight & Szenarien",     sublabel: "Zukunftsbilder, Strategien",        Icon: CategoryIcons.ForesightSzenarien,        color: "#D98AE8" },
];

/* ══════════════════════════════════════════════════════════════════════
   METHODEN-KARTE
══════════════════════════════════════════════════════════════════════ */

interface MethodItem {
  label: string;
  sublabel: string;
  Icon: React.FC<{ size?: number; color?: string }>;
  color: string;
}

const METHOD_LIST: MethodItem[] = [
  { label: "Marktanalyse",    sublabel: "4 Quadranten SWOT",     Icon: MethodIcons.Marktanalyse,  color: "#7AB8F5" },
  { label: "War-Gaming",      sublabel: "3 Szenarien + Strategie", Icon: MethodIcons.WarGaming,   color: "#F5C87A" },
  { label: "Pre-Mortem",      sublabel: "Was könnte schiefgehen?", Icon: MethodIcons.PreMortem,   color: "#F4A0B5" },
  { label: "Post-Mortem",     sublabel: "Ursachen-Analyse",       Icon: MethodIcons.PostMortem,   color: "#6DDBA0" },
  { label: "Trend Deep-Dive", sublabel: "Trend von allen Seiten", Icon: MethodIcons.TrendDeepDive, color: "#D98AE8" },
  { label: "Stakeholder",     sublabel: "Akteure & Einfluss",     Icon: MethodIcons.Stakeholder,  color: "#5ECECE" },
];

/* ══════════════════════════════════════════════════════════════════════
   HAUPT-SECTION
══════════════════════════════════════════════════════════════════════ */

export default function IconSetsSection() {
  const { darkMode } = useTheme();
  const isDark = darkMode === "dark";
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const cardBg      = isDark ? "#111111" : "#FAFAFA";
  const cardHoverBg = isDark ? "#1A1A1A" : "#F0F0F0";
  const labelColor  = isDark ? "#FFFFFF" : "#0A0A0A";
  const subColor    = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.42)";

  return (
    <div className="space-y-12">
      {/* ── Sektion-Header ── */}
      <div>
        <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-2">Icon-Sets</p>
        <h2 className="font-display font-bold text-2xl text-foreground leading-tight">
          Kategorie-Icons & Analyse-Methoden
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Zwei spezialisierte Icon-Sets für Datenquellen-Kategorien und strategische Analyse-Methoden.
          Alle Icons als SVG – skalierbar, theme-aware, konsistent im Volt-Stil.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SET 1: Kategorie-Icons
      ══════════════════════════════════════════════════════════════════ */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <h3 className="font-display font-bold text-base text-foreground">Kategorie-Icons</h3>
          <span
            className="px-2 py-0.5 rounded text-[10px] font-mono font-medium"
            style={{
              background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
              color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
              border: `1px solid ${borderColor}`,
            }}
          >
            {CATEGORY_ICON_LIST.length} Icons
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {CATEGORY_ICON_LIST.map(item => {
            const isHovered = hoveredCat === item.label;
            return (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredCat(item.label)}
                onMouseLeave={() => setHoveredCat(null)}
                style={{
                  background: isHovered ? cardHoverBg : cardBg,
                  border: `1px solid ${isHovered ? item.color + "55" : borderColor}`,
                  borderRadius: 12,
                  padding: "14px 14px 12px",
                  cursor: "default",
                  transition: "background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
                  boxShadow: isHovered
                    ? `0 4px 16px ${item.color}22`
                    : "none",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                    transition: "background 0.15s ease",
                    ...(isHovered ? { background: `${item.color}28` } : {}),
                  }}
                >
                  <item.Icon
                    size={24}
                    color={isHovered ? item.color : (isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)")}
                  />
                </div>

                {/* Label */}
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    color: isHovered ? labelColor : (isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.80)"),
                    lineHeight: 1.35,
                    marginBottom: 3,
                  }}
                >
                  {item.label}
                </div>

                {/* Sublabel */}
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: '"DM Mono", monospace',
                    color: subColor,
                    lineHeight: 1.4,
                  }}
                >
                  {item.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SET 2: Analyse-Methoden-Karten
      ══════════════════════════════════════════════════════════════════ */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <h3 className="font-display font-bold text-base text-foreground">Analyse-Methoden</h3>
          <span
            className="px-2 py-0.5 rounded text-[10px] font-mono font-medium"
            style={{
              background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
              color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
              border: `1px solid ${borderColor}`,
            }}
          >
            {METHOD_LIST.length} Methoden
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {METHOD_LIST.map(item => {
            const isHovered = hoveredMethod === item.label;
            return (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredMethod(item.label)}
                onMouseLeave={() => setHoveredMethod(null)}
                style={{
                  background: isHovered ? cardHoverBg : cardBg,
                  border: `1px solid ${isHovered ? item.color + "60" : borderColor}`,
                  borderRadius: 14,
                  padding: "18px 18px 16px",
                  cursor: "default",
                  transition: "background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
                  boxShadow: isHovered
                    ? `0 6px 24px ${item.color}28`
                    : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                {/* Icon-Container */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: isHovered ? `${item.color}28` : `${item.color}15`,
                    border: `1px solid ${item.color}${isHovered ? "50" : "25"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.15s ease, border-color 0.15s ease",
                  }}
                >
                  <item.Icon
                    size={28}
                    color={isHovered ? item.color : (isDark ? "rgba(255,255,255,0.60)" : "rgba(0,0,0,0.50)")}
                  />
                </div>

                {/* Text */}
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      color: labelColor,
                      lineHeight: 1.3,
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: '"DM Mono", monospace',
                      color: subColor,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Icon-Export-Hinweis ── */}
      <div
        style={{
          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          border: `1px solid ${borderColor}`,
          borderRadius: 12,
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 32, height: 32, borderRadius: 8,
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="14" height="14" rx="2" stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)"} strokeWidth="1.2" />
            <path d="M5 8 L8 5 L11 8" stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="8" y1="5" x2="8" y2="12" stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)"} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, fontFamily: '"DM Sans", system-ui, sans-serif', color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)", marginBottom: 2 }}>
            SVG-Export
          </div>
          <div style={{ fontSize: 11, fontFamily: '"DM Mono", monospace', color: subColor }}>
            Alle Icons als React-Komponenten · Skalierbar · Theme-aware · Volt Design System
          </div>
        </div>
      </div>
    </div>
  );
}
