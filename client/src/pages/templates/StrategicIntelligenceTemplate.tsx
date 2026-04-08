/**
 * Strategic Intelligence System – Volt UI Template
 *
 * KI-gestützte politische Analyse-Oberfläche.
 * Zeigt: Query-Input, Quellen-Filter, Partei-Analyse-Karten,
 * Argumentations-Ketten, Strategische Einschätzungen, Quellenverzeichnis
 * und Export-Panel mit Claude-Code-Snippets.
 *
 * Volt-UI-Komponenten: VoltNavbar, VoltCommandBar, VoltCard, VoltBadge,
 * VoltStat, VoltProgress, VoltCodeBlock, VoltAlert, VoltTabs
 *
 * ─────────────────────────────────────────────────────────────────────────
 * CLAUDE CODE INTEGRATION
 * ─────────────────────────────────────────────────────────────────────────
 * Dieses Template ist direkt für Claude Code vorbereitet.
 * Alle Komponenten-Importe, Typen und Strukturen sind dokumentiert.
 * Kopiere den gewünschten Abschnitt und übergib ihn direkt an Claude Code.
 *
 * Prompt-Vorlage für Claude Code:
 * "Erweitere dieses Volt-UI-Template um [Feature]. Verwende ausschließlich
 *  Komponenten aus @/components/volt/. Halte dich an die bestehende
 *  Typografie (font-display, font-body, font-mono) und das Farbsystem
 *  (CSS-Variablen: --primary, --signal-positive-*, --signal-negative-*)."
 */

import React, { useState } from "react";
import { TemplateShell } from "./TemplateShell";
import { VoltNavbar } from "@/components/volt/VoltNavbar";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle } from "@/components/volt/VoltCard";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltProgress } from "@/components/volt/VoltProgress";
import { VoltAlert } from "@/components/volt/VoltAlert";
import { VoltCodeBlock } from "@/components/volt/VoltCodeBlock";
import { VoltCommandBar } from "@/components/volt/VoltCommandBar";
import { VoltTabs } from "@/components/volt/VoltTabs";
import {
  Brain,
  Sparkles,
  Globe,
  FileText,
  Database,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Share2,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  BarChart3,
  Users,
  Zap,
  ArrowRight,
  Star,
  ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   DATEN-TYPEN
   ───────────────────────────────────────────────────────────────────────── */

interface Party {
  id: string;
  name: string;
  shortName: string;
  color: string;          // Pastell-Hintergrundfarbe
  accentColor: string;    // Akzentfarbe für Borders / Badges
  textColor: string;      // Textfarbe auf farbigem Hintergrund
  position: number;       // Prozentwert der Zustimmung/Relevanz
  trend: "up" | "down" | "neutral";
  trendValue: number;
  stance: "supportive" | "critical" | "neutral" | "ambivalent";
  stanceLabel: string;
  keyArguments: string[];
  sources: number;
}

interface ArgumentBlock {
  id: string;
  type: "finding" | "context" | "risk" | "opportunity";
  title: string;
  content: string;
  confidence: number;
  sources: string[];
  tags: string[];
}

interface CoalitionOption {
  parties: string[];
  probability: number;
  stability: "high" | "medium" | "low";
  label: string;
}

interface Source {
  id: string;
  title: string;
  outlet: string;
  date: string;
  relevance: number;
  type: "news" | "study" | "official" | "speech";
  url: string;
}

/* ─────────────────────────────────────────────────────────────────────────
   MOCK-DATEN
   ───────────────────────────────────────────────────────────────────────── */

const QUERY = "Wie sieht die Zukunft der Sozialdemokratie in Österreich aus?";

const PARTIES: Party[] = [
  {
    id: "spoe",
    name: "Sozialdemokratische Partei Österreichs",
    shortName: "SPÖ",
    color: "#FFE4E4",
    accentColor: "#E8402A",
    textColor: "#8B1A00",
    position: 15,
    trend: "down",
    trendValue: -3,
    stance: "supportive",
    stanceLabel: "Selbstpositionierung",
    keyArguments: [
      "Soziale Transformation als Kernthema der nächsten Legislaturperiode",
      "Digitale Arbeitswelt erfordert neue Schutzkonzepte",
      "Wohnungspolitik als Mobilisierungsthema",
    ],
    sources: 12,
  },
  {
    id: "oevp",
    name: "Österreichische Volkspartei",
    shortName: "ÖVP",
    color: "#E8F4E8",
    accentColor: "#1A9E5A",
    textColor: "#0F6038",
    position: 40,
    trend: "up",
    trendValue: 5,
    stance: "critical",
    stanceLabel: "Demokratische Absorption",
    keyArguments: [
      "Wirtschaftskompetenz als Gegennarrative zur sozialen Frage",
      "Mittelstand-Fokus verdrängt klassische Arbeitnehmerpolitik",
      "Koalitionsoptionen bestimmen Positionierungsspielraum",
    ],
    sources: 18,
  },
  {
    id: "fpoe",
    name: "Freiheitliche Partei Österreichs",
    shortName: "FPÖ",
    color: "#E4EDFF",
    accentColor: "#2563EB",
    textColor: "#1E3A8A",
    position: 20,
    trend: "up",
    trendValue: 8,
    stance: "critical",
    stanceLabel: "Struktureller Konkurrent",
    keyArguments: [
      "Übernahme sozialer Themen aus populistischer Perspektive",
      "Arbeitermilieu als umkämpftes Wählerreservoir",
      "Systemkritik als Differenzierungsmerkmal",
    ],
    sources: 9,
  },
];

const ARGUMENTS: ArgumentBlock[] = [
  {
    id: "a1",
    type: "finding",
    title: "Strukturelle Erosion der Stammwählerschaft",
    content:
      "Die SPÖ verliert seit den 1980er Jahren kontinuierlich Anteile in der industriellen Arbeiterschaft. Deindustrialisierung und der Aufstieg des Dienstleistungssektors haben die klassische Wählerbasis fragmentiert. Gleichzeitig gelingt es der Partei nicht, neue urbane Mittelschichten dauerhaft zu binden.",
    confidence: 88,
    sources: ["APA, 2024", "Politikwissenschaft Wien, 2023"],
    tags: ["Wählerstruktur", "Deindustrialisierung", "Urbanisierung"],
  },
  {
    id: "a2",
    type: "context",
    title: "Europäischer Vergleich: Sozialdemokratische Erneuerung",
    content:
      "In Dänemark und Portugal zeigen sozialdemokratische Parteien, dass Erneuerung durch programmatische Klarheit und Regierungskompetenz möglich ist. Gemeinsam ist beiden: eine klare Positionierung in der Wohnungs- und Klimapolitik sowie die Überwindung interner Flügelkämpfe.",
    confidence: 72,
    sources: ["Eurobarometer 2024", "FEPS Policy Paper"],
    tags: ["Europa", "Vergleich", "Erneuerung"],
  },
  {
    id: "a3",
    type: "risk",
    title: "Populistische Vereinnahmung sozialer Themen",
    content:
      "Die FPÖ positioniert sich zunehmend als Vertreterin der 'kleinen Leute' und besetzt damit traditionell sozialdemokratisches Terrain. Ohne klare Abgrenzung und eigene Glaubwürdigkeit droht weiterer Wählerverlust im Arbeitermilieu.",
    confidence: 81,
    sources: ["SORA Wahlanalyse 2024", "DerStandard, März 2024"],
    tags: ["FPÖ", "Populismus", "Arbeitermilieu"],
  },
  {
    id: "a4",
    type: "opportunity",
    title: "Wohnungskrise als Mobilisierungsthema",
    content:
      "Die Wohnungskrise trifft überproportional junge Stadtbewohner – eine Gruppe, die für die SPÖ erreichbar ist. Konkrete Mietpreisbremsen und Gemeindebau-Expansion könnten als Alleinstellungsmerkmal dienen und die Partei aus dem Oppositionsmodus herausführen.",
    confidence: 65,
    sources: ["Statistik Austria 2024", "Momentum Institut"],
    tags: ["Wohnen", "Jugend", "Stadtpolitik"],
  },
];

const COALITIONS: CoalitionOption[] = [
  { parties: ["SPÖ", "ÖVP"], probability: 38, stability: "medium", label: "Große Koalition" },
  { parties: ["SPÖ", "Grüne", "NEOS"], probability: 22, stability: "low", label: "Ampel-Variante" },
  { parties: ["ÖVP", "FPÖ"], probability: 30, stability: "high", label: "Rechts-Mitte" },
  { parties: ["SPÖ", "FPÖ"], probability: 10, stability: "low", label: "Rot-Blau" },
];

const SOURCES: Source[] = [
  { id: "s1", title: "Wahlanalyse Nationalratswahl 2024", outlet: "SORA Institut", date: "Okt 2024", relevance: 95, type: "study", url: "#" },
  { id: "s2", title: "SPÖ Parteitag: Programmatische Erneuerung", outlet: "APA", date: "Sep 2024", relevance: 88, type: "news", url: "#" },
  { id: "s3", title: "Soziale Ungleichheit in Österreich", outlet: "Statistik Austria", date: "2024", relevance: 82, type: "official", url: "#" },
  { id: "s4", title: "Europäische Sozialdemokratie im Wandel", outlet: "FEPS", date: "2023", relevance: 79, type: "study", url: "#" },
  { id: "s5", title: "Wohnungspolitik als Wahlkampfthema", outlet: "Momentum Institut", date: "Aug 2024", relevance: 74, type: "study", url: "#" },
];

/* ─────────────────────────────────────────────────────────────────────────
   HILFSFUNKTIONEN
   ───────────────────────────────────────────────────────────────────────── */

const typeConfig = {
  finding: { label: "Befund", color: "bg-[#E4EDFF] text-[#1E3A8A] border-[#BFDBFE]", icon: <BarChart3 className="w-3.5 h-3.5" /> },
  context: { label: "Kontext", color: "bg-[#F5F0FF] text-[#5B21B6] border-[#DDD6FE]", icon: <BookOpen className="w-3.5 h-3.5" /> },
  risk:    { label: "Risiko",  color: "bg-[#FFF0F0] text-[#991B1B] border-[#FECACA]", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
  opportunity: { label: "Chance", color: "bg-[#F0FFF4] text-[#065F46] border-[#A7F3D0]", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
};

const sourceTypeConfig = {
  news:     { label: "Presse",    color: "muted" as const },
  study:    { label: "Studie",    color: "neutral" as const },
  official: { label: "Amtlich",  color: "positive" as const },
  speech:   { label: "Rede",     color: "outline" as const },
};

const stabilityConfig = {
  high:   { label: "Stabil",    color: "positive" as const },
  medium: { label: "Mittel",    color: "neutral" as const },
  low:    { label: "Fragil",    color: "negative" as const },
};

/* ─────────────────────────────────────────────────────────────────────────
   PARTEI-KARTE
   ───────────────────────────────────────────────────────────────────────── */

const PartyCard: React.FC<{ party: Party }> = ({ party }) => {
  const TrendIcon = party.trend === "up" ? TrendingUp : party.trend === "down" ? TrendingDown : Minus;
  const trendColor = party.trend === "up" ? "text-[#1A9E5A]" : party.trend === "down" ? "text-[#E8402A]" : "text-muted-foreground";

  return (
    <VoltCard variant="default" className="overflow-hidden">
      {/* Farbiger Header-Streifen */}
      <div
        className="px-5 pt-5 pb-4"
        style={{ backgroundColor: party.color }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="font-display font-black text-2xl"
                style={{ color: party.accentColor }}
              >
                {party.shortName}
              </span>
              <VoltBadge
                variant="outline"
                size="sm"
                style={{ borderColor: party.accentColor, color: party.textColor }}
              >
                {party.stanceLabel}
              </VoltBadge>
            </div>
            <p className="text-xs text-muted-foreground font-body leading-tight max-w-[180px]">
              {party.name}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="font-display font-black text-3xl" style={{ color: party.accentColor }}>
                {party.position}
              </span>
              <span className="text-sm font-body font-semibold" style={{ color: party.textColor }}>%</span>
            </div>
            <div className={`flex items-center gap-1 justify-end mt-0.5 ${trendColor}`}>
              <TrendIcon className="w-3 h-3" />
              <span className="text-xs font-semibold font-body">
                {party.trend === "up" ? "+" : ""}{party.trendValue}%
              </span>
            </div>
          </div>
        </div>

        {/* Relevanz-Balken */}
        <div className="mt-3">
          <VoltProgress
            value={party.position}
            max={100}
            size="sm"
            showValue={false}
          />
        </div>
      </div>

      {/* Argumente */}
      <VoltCardContent className="pt-4">
        <p className="section-label mb-3">Kernpositionen</p>
        <ul className="space-y-2">
          {party.keyArguments.map((arg, i) => (
            <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/80">
              <ChevronRight
                className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                style={{ color: party.accentColor }}
              />
              <span>{arg}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-body">
            {party.sources} Quellen ausgewertet
          </span>
          <VoltBadge variant="muted" size="sm">
            <Database className="w-3 h-3 mr-1" />
            Analyse
          </VoltBadge>
        </div>
      </VoltCardContent>
    </VoltCard>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   ARGUMENT-BLOCK
   ───────────────────────────────────────────────────────────────────────── */

const ArgumentCard: React.FC<{ block: ArgumentBlock; index: number }> = ({ block, index }) => {
  const cfg = typeConfig[block.type];

  return (
    <div className="flex gap-4">
      {/* Nummerierung */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-xs font-bold mt-0.5">
        {String(index + 1).padStart(2, "0")}
      </div>

      <VoltCard variant="default" className="flex-1">
        <VoltCardContent className="pt-5">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}>
              {cfg.icon}
              {cfg.label}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="font-display font-bold text-base text-foreground leading-tight">
                {block.title}
              </h4>
            </div>
            <div className="flex-shrink-0 text-right">
              <span className="text-xs text-muted-foreground font-body">Konfidenz</span>
              <div className="font-mono font-bold text-sm text-foreground">{block.confidence}%</div>
            </div>
          </div>

          {/* Inhalt */}
          <p className="text-sm font-body text-foreground/80 leading-relaxed mb-4">
            {block.content}
          </p>

          {/* Konfidenz-Balken */}
          <VoltProgress value={block.confidence} max={100} size="sm" showValue={false} className="mb-4" />

          {/* Footer: Quellen + Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {block.sources.map((src, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-xs text-muted-foreground font-body">
                <ExternalLink className="w-3 h-3" />
                {src}
              </span>
            ))}
            <span className="text-muted-foreground/40 mx-1">·</span>
            {block.tags.map((tag, i) => (
              <VoltBadge key={i} variant="muted" size="sm">{tag}</VoltBadge>
            ))}
          </div>
        </VoltCardContent>
      </VoltCard>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   KOALITIONS-KARTE
   ───────────────────────────────────────────────────────────────────────── */

const CoalitionCard: React.FC<{ option: CoalitionOption }> = ({ option }) => {
  const stab = stabilityConfig[option.stability];

  return (
    <VoltCard variant="default">
      <VoltCardContent className="pt-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="font-display font-bold text-base text-foreground">{option.label}</p>
            <p className="text-xs text-muted-foreground font-body mt-0.5">
              {option.parties.join(" · ")}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="font-display font-black text-2xl text-foreground">{option.probability}%</span>
            <div className="mt-1">
              <VoltBadge variant={stab.color} size="sm">{stab.label}</VoltBadge>
            </div>
          </div>
        </div>
        <VoltProgress value={option.probability} max={100} size="sm" showValue={false} />
        </VoltCardContent>
    </VoltCard>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   QUELLEN-ZEILE
   ───────────────────────────────────────────────────────────────────────── */

const SourceRow: React.FC<{ source: Source }> = ({ source }) => {
  const cfg = sourceTypeConfig[source.type];

  return (
    <div className="flex items-center gap-4 py-3 border-b border-border last:border-0">
      <VoltBadge variant={cfg.color} size="sm" className="flex-shrink-0 w-16 justify-center">
        {cfg.label}
      </VoltBadge>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-body font-semibold text-foreground truncate">{source.title}</p>
        <p className="text-xs text-muted-foreground font-body">{source.outlet}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-body">
          <Clock className="w-3 h-3" />
          {source.date}
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-[#E4FF97] fill-[#E4FF97]" />
          <span className="text-xs font-mono font-bold text-foreground">{source.relevance}</span>
        </div>
        <a href={source.url} className="text-muted-foreground hover:text-foreground transition-colors">
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   HAUPTKOMPONENTE
   ───────────────────────────────────────────────────────────────────────── */

export default function StrategicIntelligenceTemplate() {
  const [activeTab, setActiveTab] = useState("analyse");
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState(QUERY);

  const filters = [
    { id: "all",        label: "Überblick" },
    { id: "structural", label: "Strukturell" },
    { id: "specific",   label: "Speziell" },
    { id: "refs",       label: "Referenzpunkte" },
  ];

  return (
    <TemplateShell
      title="Strategic Intelligence System"
      category="App"
    >
      {/* ── Navbar ── */}
      <VoltNavbar
        variant="solid"
        logo={
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <Brain className="w-4 h-4 text-background" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-foreground leading-none block">
                Strategic Intelligence
              </span>
              <span className="font-mono text-[0.6rem] text-muted-foreground leading-none tracking-widest uppercase">
                System
              </span>
            </div>
          </div>
        }
        items={[
          { label: "Versuchen", active: true },
          { label: "Archiv" },
          { label: "Einstellungen" },
        ]}
        rightSlot={
          <div className="flex items-center gap-2">
            <VoltBadge variant="default" size="sm">
              <Sparkles className="w-3 h-3 mr-1" />
              Standard
            </VoltBadge>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold font-mono text-foreground">
              JF
            </div>
          </div>
        }
      />

      {/* ── Query-Bereich ── */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <VoltCommandBar
            value={query}
            onChange={setQuery}
            placeholder="Stelle eine strategische Frage…"
            variant="default"
            size="md"
            leftActions={[
              { icon: <Globe className="w-4 h-4" />, label: "Quellen", active: true },
              { icon: <FileText className="w-4 h-4" />, label: "Dokumente" },
              { icon: <Database className="w-4 h-4" />, label: "Datenbank" },
            ]}
            suggestions={filters.map(f => ({
              label: f.label,
              onClick: () => setActiveFilter(f.id),
            }))}
          />
        </div>
      </div>

      {/* ── Ergebnis-Header ── */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <VoltBadge variant="muted" size="sm">
                <Filter className="w-3 h-3 mr-1" />
                Politische Analyse
              </VoltBadge>
              <VoltBadge variant="positive" size="sm">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Hohe Konfidenz
              </VoltBadge>
            </div>
            <h1 className="font-display font-bold text-xl text-foreground leading-snug">
              {query}
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Share2 className="w-4 h-4" />
              Teilen
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body font-semibold bg-foreground text-background hover:bg-foreground/90 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="max-w-4xl mx-auto px-6 pb-6">
        <VoltTabs
          variant="underline"
          tabs={[
            { id: "analyse",    label: "Analyse",         icon: <Brain className="w-4 h-4" /> },
            { id: "parteien",   label: "Parteien",        icon: <Users className="w-4 h-4" /> },
            { id: "koalition",  label: "Koalitionsoptionen", icon: <BarChart3 className="w-4 h-4" /> },
            { id: "quellen",    label: "Quellen",         icon: <BookOpen className="w-4 h-4" /> },
            { id: "export",     label: "Code & Export",   icon: <Zap className="w-4 h-4" /> },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* ── Inhalt ── */}
      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-8">

        {/* ── TAB: ANALYSE ── */}
        {activeTab === "analyse" && (
          <>
            {/* Partei-Karten (kompakt) */}
            <section>
              <h2 className="font-display font-bold text-base text-foreground mb-4">
                Parteipositionen im Überblick
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PARTIES.map(p => (
                  <PartyCard key={p.id} party={p} />
                ))}
              </div>
            </section>

            {/* Argumentations-Ketten */}
            <section>
              <h2 className="font-display font-bold text-base text-foreground mb-4">
                Analytische Befunde
              </h2>
              <div className="space-y-4">
                {ARGUMENTS.map((block, i) => (
                  <ArgumentCard key={block.id} block={block} index={i} />
                ))}
              </div>
            </section>

            {/* Strategische Einschätzung */}
            <VoltAlert
              variant="info"
              title="Strategische Einschätzung"
            >
              Die SPÖ steht vor einem strukturellen Dilemma: Ohne programmatische Erneuerung und Führungsklarheit droht weiterer Bedeutungsverlust. Die Wohnungskrise bietet ein konkretes Mobilisierungsthema, das jedoch konsequent besetzt werden muss – bevor die FPÖ dieses Terrain vollständig übernimmt.
            </VoltAlert>
          </>
        )}

        {/* ── TAB: PARTEIEN ── */}
        {activeTab === "parteien" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARTIES.map(p => (
              <PartyCard key={p.id} party={p} />
            ))}
          </div>
        )}

        {/* ── TAB: KOALITION ── */}
        {activeTab === "koalition" && (
          <section>
            <h2 className="font-display font-bold text-base text-foreground mb-4">
              Koalitionsoptionen nach Wahrscheinlichkeit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COALITIONS.sort((a, b) => b.probability - a.probability).map((opt, i) => (
                <CoalitionCard key={i} option={opt} />
              ))}
            </div>
            <VoltAlert
              variant="warning"
              title="Hinweis zur Methodik"
              className="mt-6"
            >
              Wahrscheinlichkeiten basieren auf Umfragedaten, historischen Koalitionsmustern und aktuellen Parteiaussagen. Sie sind keine Prognosen, sondern Einschätzungen zum Analysezeitpunkt.
            </VoltAlert>
          </section>
        )}

        {/* ── TAB: QUELLEN ── */}
        {activeTab === "quellen" && (
          <section>
            <h2 className="font-display font-bold text-base text-foreground mb-4">
              Ausgewertete Quellen
            </h2>
            <VoltCard variant="default">
              <VoltCardContent className="pt-5">
                {SOURCES.map(src => (
                  <SourceRow key={src.id} source={src} />
                ))}
              </VoltCardContent>
            </VoltCard>
          </section>
        )}

        {/* ── TAB: CODE & EXPORT ── */}
        {activeTab === "export" && (
          <section className="space-y-6">
            <h2 className="font-display font-bold text-base text-foreground mb-4">
              Claude Code Integration
            </h2>

            <VoltAlert
              variant="info"
              title="Direkt an Claude Code übergeben"
            >
              Die folgenden Snippets sind für die direkte Übergabe an Claude Code optimiert. Kopiere den gewünschten Block und füge ihn als Kontext in deine Claude-Code-Session ein.
            </VoltAlert>

            {/* Komponenten-Import-Snippet */}
            <VoltCard variant="default">
              <VoltCardHeader>
                <VoltCardTitle className="text-base">Komponenten-Imports</VoltCardTitle>
                <p className="text-sm text-muted-foreground font-body">
                  Alle Volt-UI-Komponenten die in diesem Template verwendet werden.
                </p>
              </VoltCardHeader>
              <VoltCardContent className="pt-0">
                <VoltCodeBlock
                  language="tsx"
                  label="imports.tsx"
                  code={`import { VoltNavbar } from "@/components/volt/VoltNavbar";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle } from "@/components/volt/VoltCard";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltProgress } from "@/components/volt/VoltProgress";
import { VoltAlert } from "@/components/volt/VoltAlert";
import { VoltCodeBlock } from "@/components/volt/VoltCodeBlock";
import { VoltCommandBar } from "@/components/volt/VoltCommandBar";
import { VoltTabs } from "@/components/volt/VoltTabs";`}
                />
              </VoltCardContent>
            </VoltCard>

            {/* Farbsystem-Snippet */}
            <VoltCard variant="default">
              <VoltCardHeader>
                <VoltCardTitle className="text-base">Volt-UI Farbsystem</VoltCardTitle>
                <p className="text-sm text-muted-foreground font-body">
                  CSS-Variablen für konsistente Farbgebung – direkt in Tailwind verwendbar.
                </p>
              </VoltCardHeader>
              <VoltCardContent className="pt-0">
                <VoltCodeBlock
                  language="css"
                  label="colors.css"
                  code={`/* Primär: Neon-Lime auf Schwarz */
--primary: #E4FF97;          /* Neon-Lime */
--primary-foreground: #0A0A0A;

/* Pastell-Palette */
--pastel-mint:    #C8F5E0;
--pastel-butter:  #FFF3C4;
--pastel-blue:    #DBEAFE;
--pastel-orchid:  #EDE9FE;
--pastel-peach:   #FFE4CC;
--pastel-rose:    #FFE4E4;

/* Signal-Farben */
--signal-positive-light: #E8F8EF;
--signal-positive-text:  #0F6038;
--signal-negative-light: #FDEEE9;
--signal-negative-text:  #A01A08;
--signal-neutral-light:  #F5F5F5;
--signal-neutral-text:   #3A3A3A;`}
                />
              </VoltCardContent>
            </VoltCard>

            {/* Claude-Code-Prompt */}
            <VoltCard variant="default">
              <VoltCardHeader>
                <VoltCardTitle className="text-base">Claude Code Prompt-Vorlage</VoltCardTitle>
                <p className="text-sm text-muted-foreground font-body">
                  Kopiere diesen Prompt um das Template zu erweitern oder anzupassen.
                </p>
              </VoltCardHeader>
              <VoltCardContent className="pt-0">
                <VoltCodeBlock
                  language="bash"
                  label="prompt.txt"
                  code={`Erweitere dieses Volt-UI-Template um [FEATURE].

Kontext:
- Framework: React 19 + TypeScript + Tailwind CSS 4
- Komponenten: @/components/volt/* (VoltCard, VoltBadge, VoltProgress, etc.)
- Typografie: font-display (Headlines), font-body (Fließtext), font-mono (Code/Zahlen)
- Farbsystem: CSS-Variablen (--primary: #E4FF97, --signal-positive-*, --signal-negative-*)
- Pastell-Palette: #C8F5E0 (Mint), #FFF3C4 (Butter), #DBEAFE (Blue), #EDE9FE (Orchid)

Regeln:
1. Keine neuen Abhängigkeiten einführen
2. Ausschließlich Volt-UI-Komponenten verwenden
3. CSS-Variablen statt hardcodierte Farben (außer Pastell-Hintergründe)
4. Keine Quantifizierungen in UI-Texten
5. Hover-Effekte nur bei interaktiven Elementen (variant="interactive")

Gewünschte Erweiterung: [BESCHREIBUNG]`}
                />
              </VoltCardContent>
            </VoltCard>

            {/* Datenstruktur-Snippet */}
            <VoltCard variant="default">
              <VoltCardHeader>
                <VoltCardTitle className="text-base">Datenstruktur</VoltCardTitle>
                <p className="text-sm text-muted-foreground font-body">
                  TypeScript-Interfaces für die Analyse-Daten – direkt erweiterbar.
                </p>
              </VoltCardHeader>
              <VoltCardContent className="pt-0">
                <VoltCodeBlock
                  language="ts"
                  label="types.ts"
                  code={`interface Party {
  id: string;
  name: string;
  shortName: string;
  color: string;        // Pastell-Hintergrundfarbe (z.B. "#FFE4E4")
  accentColor: string;  // Akzentfarbe für Borders / Badges
  textColor: string;    // Textfarbe auf farbigem Hintergrund
  position: number;     // Prozentwert der Relevanz/Zustimmung
  trend: "up" | "down" | "neutral";
  trendValue: number;
  stance: "supportive" | "critical" | "neutral" | "ambivalent";
  stanceLabel: string;
  keyArguments: string[];
  sources: number;
}

interface ArgumentBlock {
  id: string;
  type: "finding" | "context" | "risk" | "opportunity";
  title: string;
  content: string;
  confidence: number;   // 0–100
  sources: string[];
  tags: string[];
}

interface Source {
  id: string;
  title: string;
  outlet: string;
  date: string;
  relevance: number;    // 0–100
  type: "news" | "study" | "official" | "speech";
  url: string;
}`}
                />
              </VoltCardContent>
            </VoltCard>
          </section>
        )}
      </div>
    </TemplateShell>
  );
}
