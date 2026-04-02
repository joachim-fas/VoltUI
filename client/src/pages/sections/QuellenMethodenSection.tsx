/**
 * QuellenMethodenSection – Volt UI
 * Datenquellen-Icons + Analyse-Methoden mit Lucide-Icons (identischer Stil wie UI-Icons)
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ChevronDown, CheckCheck } from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════
   TYPEN
══════════════════════════════════════════════════════════════════════ */

type LucideIcon = React.FC<{ className?: string; style?: React.CSSProperties }>;

interface IconEntry {
  name: string;
  label: string;
}

interface CategoryItem {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  bg: string;
  primaryIcon: string;
  icons: IconEntry[];
}

/* ══════════════════════════════════════════════════════════════════════
   DATENQUELLEN – 12 Kategorien mit je 4-6 Lucide-Icons
══════════════════════════════════════════════════════════════════════ */

const QUELLEN_LIST: CategoryItem[] = [
  {
    id: "news",
    label: "News & Medien",
    sublabel: "Nachrichten, Presse, Broadcast",
    color: "#1A3A8A",
    bg: "#D6E4FF",
    primaryIcon: "Newspaper",
    icons: [
      { name: "Newspaper", label: "Zeitung" },
      { name: "Tv", label: "TV" },
      { name: "Radio", label: "Radio" },
      { name: "Rss", label: "RSS-Feed" },
      { name: "Mic", label: "Podcast" },
      { name: "Globe", label: "Online-Medien" },
    ],
  },
  {
    id: "data",
    label: "Daten & Statistik",
    sublabel: "Kennzahlen, Indikatoren, Berichte",
    color: "#0F6038",
    bg: "#C3F4D3",
    primaryIcon: "BarChart2",
    icons: [
      { name: "BarChart2", label: "Balkendiagramm" },
      { name: "LineChart", label: "Liniendiagramm" },
      { name: "Database", label: "Datenbank" },
      { name: "FileSpreadsheet", label: "Tabelle" },
      { name: "TrendingUp", label: "Trend" },
      { name: "Activity", label: "Aktivität" },
    ],
  },
  {
    id: "science",
    label: "Wissenschaft & Forschung",
    sublabel: "Papers, Studien, Experimente",
    color: "#6A1A6A",
    bg: "#F0D6FF",
    primaryIcon: "FlaskConical",
    icons: [
      { name: "FlaskConical", label: "Labor" },
      { name: "Microscope", label: "Mikroskop" },
      { name: "Atom", label: "Atom" },
      { name: "Dna", label: "DNA" },
      { name: "BookOpen", label: "Publikation" },
      { name: "GraduationCap", label: "Akademie" },
    ],
  },
  {
    id: "geopolitics",
    label: "Geopolitik & Konflikte",
    sublabel: "Regionen, Akteure, Ereignisse",
    color: "#3A1A0A",
    bg: "#FFE8D6",
    primaryIcon: "Globe",
    icons: [
      { name: "Globe", label: "Global" },
      { name: "Map", label: "Karte" },
      { name: "Flag", label: "Flagge" },
      { name: "Shield", label: "Sicherheit" },
      { name: "Swords", label: "Konflikt" },
      { name: "Landmark", label: "Institution" },
    ],
  },
  {
    id: "finance",
    label: "Finanzen & Märkte",
    sublabel: "Kurse, Indizes, Makroökonomie",
    color: "#0A4A20",
    bg: "#C3F4D3",
    primaryIcon: "TrendingUp",
    icons: [
      { name: "TrendingUp", label: "Kurs" },
      { name: "DollarSign", label: "Währung" },
      { name: "BarChart3", label: "Index" },
      { name: "Coins", label: "Assets" },
      { name: "Landmark", label: "Zentralbank" },
      { name: "PieChart", label: "Portfolio" },
    ],
  },
  {
    id: "surveys",
    label: "Umfragen & Meinungsforschung",
    sublabel: "Surveys, Panels, Sentiment",
    color: "#8A4A1A",
    bg: "#FFE8D6",
    primaryIcon: "ClipboardList",
    icons: [
      { name: "ClipboardList", label: "Umfrage" },
      { name: "MessageSquare", label: "Feedback" },
      { name: "Users", label: "Panel" },
      { name: "BarChart", label: "Ergebnisse" },
      { name: "Vote", label: "Abstimmung" },
      { name: "Scale", label: "Sentiment" },
    ],
  },
  {
    id: "prediction",
    label: "Prediction Markets",
    sublabel: "Wetten, Prognosen, Wahrscheinlichkeiten",
    color: "#1A6A6A",
    bg: "#D6F5F5",
    primaryIcon: "Gauge",
    icons: [
      { name: "Gauge", label: "Wahrscheinlichkeit" },
      { name: "Target", label: "Prognose" },
      { name: "Percent", label: "Prozent" },
      { name: "Dice6", label: "Zufall" },
      { name: "TrendingDown", label: "Downside" },
      { name: "Activity", label: "Markt" },
    ],
  },
  {
    id: "innovation",
    label: "Innovation & Patente",
    sublabel: "Technologien, Erfindungen, Trends",
    color: "#4A0A7A",
    bg: "#EDD4FF",
    primaryIcon: "Lightbulb",
    icons: [
      { name: "Lightbulb", label: "Idee" },
      { name: "Rocket", label: "Startup" },
      { name: "Cpu", label: "Technologie" },
      { name: "BrainCircuit", label: "KI" },
      { name: "Sparkles", label: "Innovation" },
      { name: "FlaskConical", label: "F&E" },
    ],
  },
  {
    id: "social",
    label: "Social & Community",
    sublabel: "Netzwerke, Diskurse, Gruppen",
    color: "#8A1A3A",
    bg: "#FFD6E0",
    primaryIcon: "Users2",
    icons: [
      { name: "Users2", label: "Community" },
      { name: "Share2", label: "Netzwerk" },
      { name: "MessageCircle", label: "Diskurs" },
      { name: "Heart", label: "Engagement" },
      { name: "Rss", label: "Feed" },
      { name: "Globe2", label: "Plattform" },
    ],
  },
  {
    id: "climate",
    label: "Klima & Umwelt",
    sublabel: "Klimadaten, Ökosysteme, ESG",
    color: "#0F6038",
    bg: "#D6F5F5",
    primaryIcon: "Leaf",
    icons: [
      { name: "Leaf", label: "Nachhaltigkeit" },
      { name: "Thermometer", label: "Temperatur" },
      { name: "Cloud", label: "Atmosphäre" },
      { name: "Droplets", label: "Wasser" },
      { name: "Sun", label: "Energie" },
      { name: "TreePine", label: "Ökosystem" },
    ],
  },
  {
    id: "health",
    label: "Gesundheit & Bevölkerung",
    sublabel: "Epidemiologie, Demografie",
    color: "#8A1A1A",
    bg: "#FFD6D6",
    primaryIcon: "HeartPulse",
    icons: [
      { name: "HeartPulse", label: "Gesundheit" },
      { name: "Stethoscope", label: "Medizin" },
      { name: "Users", label: "Bevölkerung" },
      { name: "Activity", label: "Epidemiologie" },
      { name: "Baby", label: "Demografie" },
      { name: "Pill", label: "Pharma" },
    ],
  },
  {
    id: "foresight",
    label: "Foresight & Szenarien",
    sublabel: "Zukunftsbilder, Strategien",
    color: "#1A1A6A",
    bg: "#D6D6FF",
    primaryIcon: "Telescope",
    icons: [
      { name: "Telescope", label: "Ausblick" },
      { name: "Layers", label: "Szenarien" },
      { name: "Compass", label: "Orientierung" },
      { name: "Clock", label: "Zeithorizont" },
      { name: "Eye", label: "Beobachtung" },
      { name: "Workflow", label: "Strategie" },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════════════
   ANALYSE-METHODEN – 6 Kategorien mit je 4-5 Lucide-Icons
══════════════════════════════════════════════════════════════════════ */

const METHODEN_LIST: CategoryItem[] = [
  {
    id: "marktanalyse",
    label: "Marktanalyse",
    sublabel: "4 Quadranten SWOT",
    color: "#1A3A8A",
    bg: "#D6E4FF",
    primaryIcon: "Grid2x2",
    icons: [
      { name: "Grid2x2", label: "4 Quadranten" },
      { name: "BarChart2", label: "Marktdaten" },
      { name: "TrendingUp", label: "Wachstum" },
      { name: "Target", label: "Positionierung" },
      { name: "Scale", label: "SWOT-Balance" },
    ],
  },
  {
    id: "wargaming",
    label: "War-Gaming",
    sublabel: "3 Szenarien + Strategie",
    color: "#8A1A1A",
    bg: "#FFD6D6",
    primaryIcon: "Swords",
    icons: [
      { name: "Swords", label: "Konflikt" },
      { name: "Shield", label: "Verteidigung" },
      { name: "Crosshair", label: "Ziel" },
      { name: "Layers", label: "Szenarien" },
      { name: "Workflow", label: "Strategie" },
    ],
  },
  {
    id: "premortem",
    label: "Pre-Mortem",
    sublabel: "Was könnte schiefgehen?",
    color: "#8A4A1A",
    bg: "#FFE8D6",
    primaryIcon: "AlertTriangle",
    icons: [
      { name: "AlertTriangle", label: "Risiko" },
      { name: "Bug", label: "Fehler" },
      { name: "ShieldAlert", label: "Warnung" },
      { name: "Eye", label: "Vorausschau" },
      { name: "ClipboardList", label: "Checkliste" },
    ],
  },
  {
    id: "postmortem",
    label: "Post-Mortem",
    sublabel: "Ursachen-Analyse",
    color: "#1A4A6A",
    bg: "#D6F0FF",
    primaryIcon: "Search",
    icons: [
      { name: "Search", label: "Analyse" },
      { name: "GitBranch", label: "Ursachenpfad" },
      { name: "FileText", label: "Bericht" },
      { name: "Wrench", label: "Maßnahmen" },
      { name: "RotateCcw", label: "Lessons Learned" },
    ],
  },
  {
    id: "trendanalysis",
    label: "Trend Deep-Dive",
    sublabel: "Trend von allen Seiten",
    color: "#4A0A7A",
    bg: "#EDD4FF",
    primaryIcon: "Telescope",
    icons: [
      { name: "Telescope", label: "Beobachtung" },
      { name: "TrendingUp", label: "Trend" },
      { name: "Layers", label: "Ebenen" },
      { name: "ScanSearch", label: "Scanning" },
      { name: "Activity", label: "Dynamik" },
    ],
  },
  {
    id: "stakeholder",
    label: "Stakeholder",
    sublabel: "Akteure & Einfluss",
    color: "#0F6038",
    bg: "#C3F4D3",
    primaryIcon: "Users2",
    icons: [
      { name: "Users2", label: "Akteure" },
      { name: "Network", label: "Netzwerk" },
      { name: "Handshake", label: "Interessen" },
      { name: "Building2", label: "Institutionen" },
      { name: "Share2", label: "Einfluss" },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════════════
   ICON-KARTE (identisch zu UIIconsSection)
══════════════════════════════════════════════════════════════════════ */

const IconCard: React.FC<{
  name: string;
  label: string;
  color: string;
  bg: string;
  onCopy: () => void;
  copied: boolean;
}> = ({ name, label, color, bg, onCopy, copied }) => {
  const [hovered, setHovered] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Ic = (LucideIcons as Record<string, any>)[name] as LucideIcon | undefined;
  if (!Ic) return null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onCopy}
      className="relative flex flex-col items-center gap-2 rounded-xl border bg-card transition-all duration-200 cursor-pointer p-3"
      style={{
        borderColor: hovered ? `${color}55` : "var(--border)",
        boxShadow: hovered ? `0 4px 16px ${color}18` : "none",
      }}
    >
      <div
        className="flex items-center justify-center rounded-lg transition-all duration-200"
        style={{ width: 40, height: 40, background: hovered ? bg : `${color}10` }}
      >
        <Ic className="w-5 h-5" style={{ color }} />
      </div>
      <p className="text-[9px] font-mono text-muted-foreground text-center leading-tight break-all">{label}</p>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1"
            style={{ background: `${color}15`, border: `1px solid ${color}40` }}
          >
            <CheckCheck className="w-4 h-4" style={{ color }} />
            <span className="text-[8px] font-mono font-semibold" style={{ color }}>Kopiert</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   KATEGORIE-KARTE (aufklappbar)
══════════════════════════════════════════════════════════════════════ */

const CategoryCard: React.FC<{ item: CategoryItem }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PrimaryIc = (LucideIcons as Record<string, any>)[item.primaryIcon] as LucideIcon | undefined;

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<${name} className="w-5 h-5" />`);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1400);
  };

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
          style={{ width: 52, height: 52, background: open ? item.bg : `${item.color}10`, border: `1px solid ${item.color}30` }}
        >
          {PrimaryIc && <PrimaryIc className="w-6 h-6" style={{ color: item.color }} />}
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
            <div className="px-4 pb-4 pt-1 border-t" style={{ borderColor: `${item.color}20` }}>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-3">
                {item.icons.map(({ name, label }) => (
                  <IconCard
                    key={name}
                    name={name}
                    label={label}
                    color={item.color}
                    bg={item.bg}
                    onCopy={() => handleCopy(name)}
                    copied={copiedName === name}
                  />
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
  const totalQuellenIcons = QUELLEN_LIST.reduce((s, q) => s + q.icons.length, 0);
  const totalMethodenIcons = METHODEN_LIST.reduce((s, m) => s + m.icons.length, 0);

  return (
    <section className="space-y-10">
      {/* Header */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Icon-Sets · Quellen & Methoden</p>
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-display font-bold text-3xl text-foreground tracking-tight">Quellen & Methoden</h2>
          <span className="px-2.5 py-1 rounded-xl text-[11px] font-mono bg-muted text-muted-foreground border border-border">
            {totalQuellenIcons + totalMethodenIcons} Icons
          </span>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Thematische Icons für Datenquellen und Analyse-Frameworks. Klick auf eine Kategorie öffnet das Icon-Set – Klick auf ein Icon kopiert den JSX-Import.
        </p>
      </div>

      {/* Datenquellen */}
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
          <h3 className="text-[12px] font-semibold text-foreground">Datenquellen</h3>
          <span className="text-[10px] font-mono text-muted-foreground">{QUELLEN_LIST.length} Kategorien · {totalQuellenIcons} Icons</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUELLEN_LIST.map(item => (
            <CategoryCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Analyse-Methoden */}
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
          <h3 className="text-[12px] font-semibold text-foreground">Analyse-Methoden</h3>
          <span className="text-[10px] font-mono text-muted-foreground">{METHODEN_LIST.length} Kategorien · {totalMethodenIcons} Icons</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {METHODEN_LIST.map(item => (
            <CategoryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
