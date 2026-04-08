/**
 * Strategic Intelligence System – Volt UI Template
 *
 * Struktur (nach Original):
 * 1. Navbar: Logo + Tabs + Modell-Badge + User-Aktionen
 * 2. Query-Input: Suchfeld + Quellen-Filter-Pills
 * 3. Analyse-Ergebnis-Header: Frage-Titel + Konfidenz + Export
 * 4. Partei-Analyse-Karten: SPÖ / ÖVP / FPÖ mit Prozentwert + Argumente
 * 5. Argumentationskette: Nummerierte Analyse-Blöcke mit Quellen-Tags
 * 6. Strategische Einschätzung: Koalitionsoptionen mit Wahrscheinlichkeit
 * 7. Zweiter Analyse-Run (zweite Frage)
 *
 * Pastell-Segmente:
 * - Query-Bereich      → --pastel-butter  (#FFF5BA)
 * - Partei-Karten      → je Partei eigene Pastell-Farbe
 * - Argumentationskette→ --pastel-blue    (#D4E8FF)
 * - Koalitionsoptionen → --pastel-mint    (#C3F4D3)
 * - Strategische Einschätzung → --pastel-orchid (#FDE2FF)
 * - Quellen & Signale  → --pastel-rose    (#FFD6E0)
 *
 * CLAUDE CODE INTEGRATION
 * Prompt-Vorlage:
 * "Erweitere dieses Volt-UI-Template um [Feature]. Verwende ausschließlich
 *  Komponenten aus @/components/volt/. Halte dich an die bestehende
 *  Typografie (font-display, font-body, font-mono) und das Farbsystem
 *  (CSS-Variablen: --primary, --pastel-*, --signal-positive-*)."
 */

import React, { useState } from "react";
import { Link } from "wouter";
import {
  Settings, Search, Filter, ChevronDown, ChevronRight,
  ArrowLeft, Download, Share2, Star, TrendingUp, TrendingDown,
  Minus, BookOpen, ExternalLink, MessageSquare, Zap, BarChart3,
  Lightbulb, Target, AlertTriangle, CheckCircle, Info,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   TYPEN
   ───────────────────────────────────────────────────────────────────────── */

interface PartyCard {
  party: string;
  shortName: string;
  percent: number;
  color: string;
  pastelBg: string;
  trend: "up" | "down" | "neutral";
  trendLabel: string;
  title: string;
  arguments: string[];
  highlight?: string;
}

interface AnalysisBlock {
  type: "finding" | "context" | "risk" | "opportunity";
  text: string;
  sources: string[];
}

interface CoalitionOption {
  name: string;
  parties: string[];
  probability: number;
  stars: number;
  description: string;
  pastelBg: string;
}

interface AnalysisRun {
  id: string;
  question: string;
  confidence: number;
  filterActive: string;
  parties: PartyCard[];
  analysisBlocks: AnalysisBlock[];
  coalitions: CoalitionOption[];
  strategicNote: string;
}

/* ─────────────────────────────────────────────────────────────────────────
   MOCK-DATEN
   ───────────────────────────────────────────────────────────────────────── */

const ANALYSIS_RUNS: AnalysisRun[] = [
  {
    id: "run-1",
    question: "Zu\"was neigt die Zukunft der Sozialdemokratie in Österreich aus? — Richtungsweiser-Brei...",
    confidence: 74,
    filterActive: "Überblick",
    parties: [
      {
        party: "SPÖ",
        shortName: "SPÖ",
        percent: 15,
        color: "#E4003A",
        pastelBg: "#FFD6E0",
        trend: "down",
        trendLabel: "−3 Pkt.",
        title: "SPÖ und Bewegungsplattform",
        arguments: [
          "Mit 2024 Bundeswahl erreicht die SPÖ 21% und versucht mit dem neuen Vorsitzenden Babler eine Linkswende.",
          "Zielgruppe: Junge Wähler, Arbeitnehmer, Migranten – Fokus auf Wohnungspolitik.",
          "Wähleranteile in Arbeiterschaft von 40% (2000) auf 18% (2024) gesunken.",
          "Parteiinterne Spannungen zwischen Reformern und Traditionalisten halten an.",
        ],
        highlight: "Rückgang in klassischer Stammwählerschaft trotz Linkswende-Versuch",
      },
      {
        party: "ÖVP",
        shortName: "ÖVP",
        percent: 40,
        color: "#3B82F6",
        pastelBg: "#D4E8FF",
        trend: "up",
        trendLabel: "+2 Pkt.",
        title: "Demokratische Absorption der ÖVP-Themen",
        arguments: [
          "Die ÖVP hat 2019–2024 viele Themen der SPÖ absorbiert (Mindestlohn, Pflegereform).",
          "Türkis-Grüne Koalition hat soziale Agenda teilweise umgesetzt.",
          "Wählerabwanderung zur FPÖ bei Arbeiterschicht beschleunigt sich.",
          "Wirtschaftsliberaler Kurs schränkt sozialpolitischen Spielraum ein.",
        ],
        highlight: "Themenabsorption schwächt SPÖ-Alleinstellungsmerkmal",
      },
      {
        party: "FPÖ",
        shortName: "FPÖ",
        percent: 20,
        color: "#1A3A6B",
        pastelBg: "#E8EEFF",
        trend: "up",
        trendLabel: "+8 Pkt.",
        title: "Rechtspopulismus spaltet die SPÖ",
        arguments: [
          "FPÖ gewinnt massiv Stimmen aus der Arbeiterschicht – klassische SPÖ-Klientel.",
          "Kickl positioniert sich als Anti-Establishment-Kraft mit sozialen Versprechen.",
          "Migrationsfrage spaltet SPÖ-Wähler: linke Basis vs. traditionelle Arbeiter.",
          "Soziale Medien-Dominanz der FPÖ verdrängt SPÖ-Botschaften.",
        ],
        highlight: "Stimmenverluste an FPÖ gefährden Koalitionsfähigkeit",
      },
    ],
    analysisBlocks: [
      {
        type: "finding",
        text: "Das Bewegungsmodell (vgl. Mélenchon, Sanders 2014–) unterläuft die SPÖ-organisatorisch. Transformation ohne Massenorganisation bleibt strukturell schwach – die Mitgliederzahlen sinken trotz Medienaufmerksamkeit.",
        sources: ["Politikwissenschaft.at", "Standard 2024", "APA"],
      },
      {
        type: "context",
        text: "Nachdem in Österreich die Arbeitslosigkeit trotz des wirtschaftlichen Rückgangs – mit +0,5% unter dem EU-Schnitt – bleibt, entsteht kein Mobilisierungsdruck. Klassische Gewerkschafts-Themen wie Lohnerhöhung und Arbeitszeitverkürzung finden wenig Resonanz.",
        sources: ["WKO", "AMS Österreich"],
      },
      {
        type: "risk",
        text: "Innerparteiliche Gemeinschaft: Charismatische Führerschaft ohne institutionelle Rückbindung ist historisch instabil – die Personalisierung auf Babler birgt Risiken bei Niederlagen (Wahl 2025, Parteitag).",
        sources: ["Profil", "Der Spiegel"],
      },
      {
        type: "opportunity",
        text: "LAUT ORF (Mai 2024): Die Sozialdemokratie verzeichnet rekordverdächtige Mitgliederzuwächse bei der Jugend (+47% vs. Vorjahr) – ein möglicher Generationenwechsel zeichnet sich ab.",
        sources: ["ORF", "SPÖ Pressedienst"],
      },
    ],
    coalitions: [
      {
        name: "Programmatik & Profil",
        parties: ["SPÖ"],
        probability: 28,
        stars: 2,
        description: "Klare Positionierung links der Mitte mit sozialer Wohnungspolitik",
        pastelBg: "#C3F4D3",
      },
      {
        name: "Wahlbündnisse & Allianzen",
        parties: ["SPÖ", "Grüne"],
        probability: 30,
        stars: 3,
        description: "Rot-Grünes Bündnis mit Fokus auf Klimaschutz und Soziales",
        pastelBg: "#FFF5BA",
      },
      {
        name: "Neos/Parteien & Koalition",
        parties: ["SPÖ", "Neos"],
        probability: 26,
        stars: 2,
        description: "Progressives Reformbündnis mit wirtschaftsliberalen Elementen",
        pastelBg: "#D4E8FF",
      },
      {
        name: "Oppositionsstrategie & Basis",
        parties: ["SPÖ"],
        probability: 42,
        stars: 4,
        description: "Starke Opposition als Vorbereitung auf nächste Bundeswahl",
        pastelBg: "#FFD6E0",
      },
    ],
    strategicNote: "Die SPÖ steht vor einem fundamentalen Dilemma: Entweder sie positioniert sich klar links und riskiert Verluste in der Mitte, oder sie versucht eine Volkspartei-Strategie und verliert ihre Identität. Der Babler-Kurs ist ein Experiment mit offenem Ausgang.",
  },
  {
    id: "run-2",
    question: "was steht die Zukunft der Sozialdemokratie in Österreich aus?",
    confidence: 71,
    filterActive: "Überblick",
    parties: [
      {
        party: "SPÖ",
        shortName: "SPÖ",
        percent: 20,
        color: "#E4003A",
        pastelBg: "#FFD6E0",
        trend: "up",
        trendLabel: "+5 Pkt.",
        title: "Soziale Transformation & Chancen",
        arguments: [
          "Digitalisierungsagenda bietet neue Mobilisierungschancen für junge Wähler.",
          "Klimaschutz als soziale Frage positioniert die SPÖ neu.",
          "Europäische Vernetzung mit anderen sozialdemokratischen Parteien stärkt Programmatik.",
          "Basisdemokratische Elemente erhöhen Mitgliederbindung.",
        ],
        highlight: undefined,
      },
      {
        party: "ÖVP",
        shortName: "ÖVP",
        percent: 45,
        color: "#3B82F6",
        pastelBg: "#D4E8FF",
        trend: "neutral",
        trendLabel: "stabil",
        title: "Stagflation bei der ÖVP",
        arguments: [
          "ÖVP verliert Stammwähler an FPÖ, gewinnt aber Mitte-Links-Wähler.",
          "Koalitionsdruck zwingt zu sozialpolitischen Kompromissen.",
          "Wirtschaftskrise schwächt Kernbotschaft der Wirtschaftskompetenz.",
          "Generationenwechsel in der Führung steht bevor.",
        ],
        highlight: undefined,
      },
      {
        party: "FPÖ",
        shortName: "FPÖ",
        percent: 20,
        color: "#1A3A6B",
        pastelBg: "#E8EEFF",
        trend: "up",
        trendLabel: "+12 Pkt.",
        title: "Struktureller Absturz unter 15%",
        arguments: [
          "FPÖ-Regierungsbeteiligung könnte Protestpotenzial dämpfen.",
          "Soziale Versprechen der FPÖ sind langfristig nicht finanzierbar.",
          "Europäische Isolation schwächt außenpolitische Glaubwürdigkeit.",
          "Innere Widersprüche zwischen Wirtschafts- und Sozialpolitik nehmen zu.",
        ],
        highlight: undefined,
      },
    ],
    analysisBlocks: [
      {
        type: "finding",
        text: "Regierungsbeteiligung wirft für die SPÖ die Frage auf, ob sie 2030 Bundeswahlen gewinnen kann – Umfragen zeigen 22–25% als realistisches Ziel, wenn Babler-Kurs konsolidiert wird.",
        sources: ["SORA", "OGM", "Unique Research"],
      },
      {
        type: "context",
        text: "Die Frage der SPÖ-Führung nach Babler ist offen. Potenzielle Nachfolger positionieren sich bereits, was die Partei in einer Phase der Konsolidierung schwächt.",
        sources: ["Kurier", "Falter"],
      },
    ],
    coalitions: [
      {
        name: "Programmatik & Profil",
        parties: ["SPÖ"],
        probability: 28,
        stars: 3,
        description: "Schärfung des sozialen Profils mit klarer Abgrenzung",
        pastelBg: "#C3F4D3",
      },
      {
        name: "Wahlbündnisse & Allianzen",
        parties: ["SPÖ", "Grüne"],
        probability: 30,
        stars: 2,
        description: "Progressives Bündnis mit Fokus auf Klimagerechtigkeit",
        pastelBg: "#FFF5BA",
      },
      {
        name: "Neos/Parteien & Koalition",
        parties: ["SPÖ", "Neos"],
        probability: 26,
        stars: 2,
        description: "Reformkoalition mit wirtschaftsliberalem Korrektiv",
        pastelBg: "#D4E8FF",
      },
      {
        name: "Oppositionsstrategie & Basis",
        parties: ["SPÖ"],
        probability: 42,
        stars: 4,
        description: "Konstruktive Opposition als Stärke nutzen",
        pastelBg: "#FFD6E0",
      },
    ],
    strategicNote: "Mittelfristig ist eine Erholung auf 25–28% möglich, wenn die SPÖ ihre Kernthemen Wohnen, Pflege und Mindestlohn konsequent besetzt und die innerparteilichen Konflikte überwindet.",
  },
];

const SOURCE_FILTERS = ["Überblick", "Speziell", "Strukturell", "Referenzpunkte"];

/* ─────────────────────────────────────────────────────────────────────────
   HILFS-KOMPONENTEN
   ───────────────────────────────────────────────────────────────────────── */

function IconBox({
  children,
  bg = "#E4FF97",
  color = "#0A0A0A",
  size = "md",
}: {
  children: React.ReactNode;
  bg?: string;
  color?: string;
  size?: "sm" | "md";
}) {
  const cls = size === "sm"
    ? "w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
    : "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0";
  return (
    <div className={cls} style={{ backgroundColor: bg, color }}>
      {children}
    </div>
  );
}

function SectionHeader({
  icon,
  label,
  iconBg = "#0A0A0A",
  iconColor = "#E4FF97",
}: {
  icon: React.ReactNode;
  label: string;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <IconBox bg={iconBg} color={iconColor}>
        {icon}
      </IconBox>
      <span className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function TrendBadge({ trend, label }: { trend: "up" | "down" | "neutral"; label: string }) {
  if (trend === "up")
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-mono font-semibold text-emerald-700">
        <TrendingUp className="w-3 h-3" />{label}
      </span>
    );
  if (trend === "down")
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-mono font-semibold text-rose-600">
        <TrendingDown className="w-3 h-3" />{label}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-mono text-muted-foreground">
      <Minus className="w-3 h-3" />{label}
    </span>
  );
}

function BlockTypeIcon({ type }: { type: AnalysisBlock["type"] }) {
  const map = {
    finding:     { Icon: CheckCircle,   color: "#1A9E5A" },
    context:     { Icon: Info,          color: "#3B82F6" },
    risk:        { Icon: AlertTriangle, color: "#F59E0B" },
    opportunity: { Icon: Zap,           color: "#8B5CF6" },
  };
  const { Icon, color } = map[type];
  return <Icon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color }} />;
}

function StarRating({ stars, max = 5 }: { stars: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className="w-3 h-3"
          fill={i < stars ? "#F59E0B" : "none"}
          stroke={i < stars ? "#F59E0B" : "#D1D5DB"}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PARTEI-KARTE
   ───────────────────────────────────────────────────────────────────────── */

function PartyCard({ card }: { card: PartyCard }) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3 border border-black/10"
      style={{ backgroundColor: card.pastelBg }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div
            className="text-xs font-mono font-bold uppercase tracking-widest mb-1"
            style={{ color: card.color }}
          >
            {card.shortName}
          </div>
          <div className="font-display font-bold text-2xl leading-none">
            {card.percent}%
          </div>
        </div>
        <TrendBadge trend={card.trend} label={card.trendLabel} />
      </div>

      {/* Titel */}
      <div className="text-xs font-semibold leading-snug border-l-2 pl-2" style={{ borderColor: card.color }}>
        {card.title}
      </div>

      {/* Argumente */}
      <ul className="space-y-1.5">
        {card.arguments.map((arg, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground leading-relaxed">
            <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: card.color }} />
            {arg}
          </li>
        ))}
      </ul>

      {/* Highlight */}
      {card.highlight && (
        <div
          className="text-xs font-semibold px-2 py-1.5 rounded-lg bg-white/60 border-l-2"
          style={{ borderColor: card.color, color: card.color }}
        >
          {card.highlight}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ANALYSE-RUN
   ───────────────────────────────────────────────────────────────────────── */

function AnalysisRunSection({ run }: { run: AnalysisRun }) {
  const [activeFilter, setActiveFilter] = useState(run.filterActive);

  return (
    <div className="space-y-5">

      {/* Frage-Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-bold text-xl leading-snug truncate">
            {run.question}
          </h2>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-mono text-muted-foreground">Konfidenz</span>
          <span className="font-display font-bold text-lg">{run.confidence}%</span>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Download className="w-3.5 h-3.5" />
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quellen-Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {SOURCE_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1 text-xs font-mono rounded-lg border transition-colors ${
              activeFilter === f
                ? "bg-foreground text-background border-foreground font-semibold"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
            }`}
          >
            {f}
          </button>
        ))}
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1 text-xs font-mono border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors">
          <Filter className="w-3 h-3" />
          Filtern
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Partei-Karten */}
      <section className="rounded-2xl p-5" style={{ backgroundColor: "#F8F8F8" }}>
        <SectionHeader
          icon={<BarChart3 className="w-4 h-4" />}
          label="Partei-Analyse"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {run.parties.map((card) => (
            <PartyCard key={card.party} card={card} />
          ))}
        </div>
      </section>

      {/* Argumentationskette – Pastell Blue */}
      <section className="rounded-2xl p-5" style={{ backgroundColor: "#D4E8FF" }}>
        <SectionHeader
          icon={<BookOpen className="w-4 h-4" />}
          label="Argumentationskette"
        />
        <div className="space-y-3">
          {run.analysisBlocks.map((block, i) => (
            <div key={i} className="bg-white/70 rounded-xl p-4">
              <div className="flex items-start gap-2.5">
                <BlockTypeIcon type={block.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-relaxed text-foreground mb-2">{block.text}</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {block.sources.map((src) => (
                      <span
                        key={src}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-secondary rounded-md text-muted-foreground"
                      >
                        <ExternalLink className="w-2.5 h-2.5" />
                        {src}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Koalitionsoptionen – Pastell Mint */}
      <section className="rounded-2xl p-5" style={{ backgroundColor: "#C3F4D3" }}>
        <SectionHeader
          icon={<Target className="w-4 h-4" />}
          label="Strategische Einschätzungen"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {run.coalitions.map((c, i) => (
            <div key={i} className="rounded-xl p-4 border border-black/10" style={{ backgroundColor: c.pastelBg }}>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="font-display font-semibold text-sm leading-snug">{c.name}</div>
                <span className="font-mono text-sm font-bold text-muted-foreground flex-shrink-0">
                  {c.probability}%
                </span>
              </div>
              <StarRating stars={c.stars} />
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>

        {/* Strategische Notiz */}
        <div className="bg-white/70 rounded-xl p-4 border-l-4 border-foreground">
          <div className="flex items-start gap-2">
            <IconBox bg="#0A0A0A" color="#E4FF97" size="sm">
              <Lightbulb className="w-3 h-3" />
            </IconBox>
            <p className="text-xs leading-relaxed text-muted-foreground">{run.strategicNote}</p>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HAUPT-KOMPONENTE
   ───────────────────────────────────────────────────────────────────────── */

export default function StrategicIntelligenceTemplate() {
  const [activeTab, setActiveTab] = useState<"fragen" | "verstehen" | "workspace">("workspace");
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center h-12 px-5 gap-6">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-background leading-none">&gt;_</span>
            </div>
            <span className="font-display font-bold text-sm tracking-tight">Strategic Intelligence System</span>
          </div>

          <div className="w-px h-5 bg-border" />

          {/* Modell-Badge */}
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-muted-foreground">Standard</span>
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-1">
            {(["fragen", "verstehen", "workspace"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-foreground text-background font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          <div className="flex-1" />

          <div className="flex items-center gap-1.5">
            <button className="px-3 py-1.5 text-xs font-mono border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors">
              Versuchen
            </button>
            <button className="px-3 py-1.5 text-xs font-mono border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors">
              Archivieren
            </button>
            <button className="px-3 py-1.5 text-xs font-mono border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors">
              Einstellungen
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Query-Bereich – Pastell Butter ── */}
      <div className="border-b border-border px-6 py-4" style={{ backgroundColor: "#FFF5BA" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-white/80 border border-black/15 rounded-xl px-4 py-2.5 shadow-sm">
            <IconBox bg="#0A0A0A" color="#E4FF97" size="sm">
              <Search className="w-3 h-3" />
            </IconBox>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Frage stellen oder Thema eingeben …"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground font-body"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">↵ Analysieren</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Analyse-Ergebnisse ── */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-12">
          {ANALYSIS_RUNS.map((run, i) => (
            <div key={run.id}>
              {i > 0 && <div className="border-t border-border pt-12" />}
              <AnalysisRunSection run={run} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer-Nav ── */}
      <div className="border-t border-border px-6 py-3 flex items-center justify-between bg-secondary/20">
        <Link
          href="/showcase"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Zurück zum Showcase
        </Link>
        <span className="text-xs font-mono text-muted-foreground">&gt;_ volt ui · Strategic Intelligence</span>
      </div>

    </div>
  );
}
