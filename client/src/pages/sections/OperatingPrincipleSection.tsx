/**
 * OperatingPrincipleSection - Flux UI
 * Vollstaendige inhaltliche Ausarbeitung des Operating Principle
 * Quelle: Notion - "Idee -- Eingabe &rarr; Ausgabe (Operating Principle)"
 * Design: Weiss/Hell, Lime+Schwarz System, Pastell-Farbzuordnung
 */

import { useState } from "react";
import { GrainCursor } from "@/components/grain/GrainCursor";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle } from "@/components/grain/GrainCard";
import { GrainBadge } from "@/components/grain/GrainBadge";
import { cn } from "@/lib/utils";
import {
  ArrowRight, Layers, Cpu, FileText, BarChart2,
  Users, Shield, BookOpen, CheckCircle2, AlertCircle,
  Copy, ChevronDown, ChevronUp, Zap, Target, RefreshCw,
  GitBranch, Package, Settings, TrendingUp, MessageSquare,
  Search, Lightbulb, ShoppingCart, Code2, Megaphone, Wrench,
  DollarSign, Briefcase
} from "lucide-react";

/* ══════════════════════════════════════════════
   DATEN
══════════════════════════════════════════════ */

const PHASE_COLORS = {
  input:   { bg: "#D4E8FF", border: "#A8CEFF", label: "Eingang",  sub: "Input"    },
  process: { bg: "#FFF5BA", border: "#FFE87A", label: "Ablauf",   sub: "Workflow" },
  output:  { bg: "#C3F4D3", border: "#7ADEA0", label: "Ergebnis", sub: "Output"   },
  proof:   { bg: "#E4FF97", border: "#C8F060", label: "Wirkung",  sub: "Proof"    },
};

const GLOSSARY = [
  { term: "Eingang",    en: "Input",    desc: "Das Rohmaterial, das wir akzeptieren. Kontext, Constraints, Qualitaetskriterien." },
  { term: "Ablauf",     en: "Workflow", desc: "Die Regeln + Schritte, die aus Input verlaesslich Output machen." },
  { term: "Ergebnis",   en: "Output",   desc: "Das Artefakt, das im Alltag eine Konsequenz hat." },
  { term: "Wirkung",    en: "Proof",    desc: "Das Signal, dass Output wirklich nuetzt und ankam." },
  { term: "Hand-off",   en: "Hand-off", desc: "Uebergabe/Weiterfuehrung - wie fuehrt man es ohne mich weiter?" },
  { term: "DoD",        en: "Done",     desc: "Definition of Done - woran erkennt man, dass es fertig ist?" },
  { term: "Guardrails", en: "Rules",    desc: "Qualitaet, Tonalitaet, Datenschutz, Grenzen - was gilt immer?" },
  { term: "Log",        en: "Log",      desc: "Kurze Evidenzzeile / Change-Log - Entscheidungen dokumentiert." },
  { term: "Owner",      en: "Owner",    desc: "Verantwortung - Output ohne Owner ist unfertig." },
];

const OUTPUT_TYPES = [
  { type: "Entscheidung", icon: <Target size={14} />, desc: "Inkl. Begruendung + naechster Schritt", color: "#D4E8FF" },
  { type: "Dokument",     icon: <FileText size={14} />, desc: "Brief, Spec, SOP, Pitch, Angebot", color: "#FFF5BA" },
  { type: "Asset",        icon: <Package size={14} />, desc: "Text / Visual / Template / Component", color: "#C3F4D3" },
  { type: "System-Baustein", icon: <Settings size={14} />, desc: "Workflow, Automation, Agent, Datenmodell", color: "#E4D4FF" },
  { type: "Update",       icon: <RefreshCw size={14} />, desc: "Status, Change-Log, Release Note", color: "#FFD4E8" },
];

const GUARDRAILS = [
  { n: "01", title: "Kein Input ohne Output",         desc: "Wenn der Output unklar ist: stoppen, praezisieren." },
  { n: "02", title: "Output ist pruefbar",             desc: "Eine andere Person kann erkennen, ob er fertig ist (DoD)." },
  { n: "03", title: "Workflow ist wiederholbar",      desc: "Einmalig ist erlaubt, aber die Default-Frage: 'Wie wird's ein Standard?'" },
  { n: "04", title: "Wenige Pflichtfelder, hohe Konsequenz", desc: "Lieber 5 klare Felder als 20 optionale." },
  { n: "05", title: "Human-in-the-loop ist explizit", desc: "Wo muss Freigabe/Review passieren?" },
  { n: "06", title: "Logging statt Diskussion",       desc: "Entscheidungen werden dokumentiert (kurz), damit Systeme wachsen." },
  { n: "07", title: "Value visible ist Pflicht",      desc: "Jeder Workflow produziert sichtbare Evidenz (Logline, Zaehler, Mini-Dashboard)." },
  { n: "08", title: "Alltagssprache vor Tech-Sprache", desc: "Wir reden ueber 'Ablaeufe' und 'Routinen', nicht ueber 'Agenten'." },
  { n: "09", title: "Ownership ist Teil des Outputs", desc: "Output ohne Owner/Uebergabe ist unfertig." },
];

const E2E_CRITERIA = [
  "Kann eine andere Expert:in in 3 Minuten sagen, was Eingang/Ablauf/Ergebnis ist?",
  "Kann die Person den Output ohne Meeting weiterverwenden?",
  "Ist klar, was als 'fertig' gilt (DoD) und wer uebernimmt (Owner)?",
];

const E2E_PRINCIPLES = [
  { title: "Specs, nicht Stories",         desc: "Kurze, klare Inputs/Outputs, DoD, Owner. Kein Storytelling." },
  { title: "Kontextfaehigkeit voraussetzen", desc: "Weniger Einleitung, mehr Substanz. Gegenueber ist kompetent." },
  { title: "Annahmen explizit machen",     desc: "Wenn etwas unklar ist: als Annahme markieren, nicht ausschmuecken." },
  { title: "Anschlussfaehigkeit bauen",     desc: "Outputs sind so strukturiert, dass sie in bestehenden Systemen weiterlaufen." },
  { title: "Buzzwords vermeiden",          desc: "Alltagssprache im Interface, technische Tiefe im Build-Layer." },
];

const ALL_WORKFLOWS = [
  {
    id: "meeting",
    icon: <MessageSquare size={16} />,
    title: "Meeting / Call",
    description: "Gespraeche sind kein Selbstzweck - jedes Meeting produziert ein Artefakt.",
    steps: [
      { phase: "input" as const,   label: "Agenda + Teilnehmer + Transcript", owner: "Initiator",  status: "done" as const,    content: "Ziele des Meetings, Teilnehmerliste, Notizen oder Aufzeichnung." },
      { phase: "process" as const, label: "Verdichten &rarr; Entscheidungen markieren &rarr; Tasks extrahieren", owner: "Moderator", status: "active" as const, content: "Rohmaterial wird strukturiert: Entscheidungen markiert, Next Actions mit Owner und Datum." },
      { phase: "output" as const,  label: "Summary + Decisions + Next Actions", dod: "Alle Actions haben Owner + Datum", handoff: "Slack / Notion / Ticket-System", status: "pending" as const, content: "5 Bullets Summary, Decisions mit Owner, Next Actions mit Datum." },
      { phase: "proof" as const,   label: "Weniger Pingpong, klare Owners", status: "pending" as const, content: "Signal: naechste Schritte laufen ohne Nachfrage an." },
    ],
  },
  {
    id: "research",
    icon: <Search size={16} />,
    title: "Research / Scan",
    description: "Schnellere Entscheidungen durch strukturierte Evidenz statt Bauchgefuehl.",
    steps: [
      { phase: "input" as const,   label: "5-20 Quellen + Fragestellung + Zeitfenster", owner: "Researcher", status: "done" as const, content: "Rohmaterial: Links, Dokumente, Signale. Klare Fragestellung und Zeitrahmen." },
      { phase: "process" as const, label: "Clustern &rarr; Muster &rarr; Interpretation &rarr; Implikationen", owner: "Analyst", status: "done" as const, content: "Quellen werden geclustert, Muster identifiziert, Implikationen abgeleitet." },
      { phase: "output" as const,  label: "1 Insight-Note + 3 Hypothesen + 1 Empfehlung", dod: "Empfehlung ist umsetzbar ohne Meeting", handoff: "Decision Log / Produktteam", status: "active" as const, content: "Kompaktes Dokument: Kerninsight, testbare Hypothesen, klare Handlungsempfehlung." },
      { phase: "proof" as const,   label: "Schnellere Entscheidungen, mehr Evidenz", status: "pending" as const, content: "Signal: Entscheidungen werden in < 24h getroffen, nicht in Meetings diskutiert." },
    ],
  },
  {
    id: "idea",
    icon: <Lightbulb size={16} />,
    title: "Idee &rarr; Konzept",
    description: "Rohe Ideen werden zu strukturierten Konzepten mit naechsten Schritten.",
    steps: [
      { phase: "input" as const,   label: "Rohidee + Kontext + Zielgruppe", owner: "Ideengeber", status: "done" as const, content: "Unstrukturierte Gedanken, Marktbeobachtung, Problem-Hypothese." },
      { phase: "process" as const, label: "Validieren &rarr; Strukturieren &rarr; Priorisieren", owner: "Stratege", status: "active" as const, content: "Idee wird gegen Markt, Ressourcen und Strategie geprueft. Scope wird definiert." },
      { phase: "output" as const,  label: "Idea Page + naechste 3 Schritte", dod: "Naechste Schritte sind konkret und zugewiesen", handoff: "Projektteam / Notion", status: "pending" as const, content: "1-seitige Ideen-Dokumentation mit Vision, Scope, Risiken und Next Actions." },
      { phase: "proof" as const,   label: "Idee ist entscheidbar", status: "pending" as const, content: "Signal: Entscheidung Ja/Nein in < 1 Woche moeglich." },
    ],
  },
  {
    id: "offer",
    icon: <DollarSign size={16} />,
    title: "Angebot / Service",
    description: "Aus Kundenbedarf wird ein konkretes, verkaufbares Angebot.",
    steps: [
      { phase: "input" as const,   label: "Kundenbedarf + Budget + Zeitrahmen", owner: "Sales", status: "done" as const, content: "Briefing, Erstgespraech-Notizen, Rahmenbedingungen." },
      { phase: "process" as const, label: "Scope definieren &rarr; Deliverables &rarr; Preis", owner: "Lead", status: "active" as const, content: "Leistungsumfang wird praezisiert, Deliverables definiert, Preis kalkuliert." },
      { phase: "output" as const,  label: "1 Pager + Scope + Deliverables", dod: "Kunde kann Ja/Nein sagen ohne Rueckfragen", handoff: "Kunde / CRM", status: "pending" as const, content: "Klares Angebot: Was, Wie, Wann, Wieviel. Keine Interpretationsspielraeume." },
      { phase: "proof" as const,   label: "Conversion Rate steigt", status: "pending" as const, content: "Signal: Angebote werden haeufiger ohne Nachverhandlung angenommen." },
    ],
  },
  {
    id: "brand",
    icon: <Megaphone size={16} />,
    title: "Brand / Copy",
    description: "Konsistente Markenkommunikation durch klare Regeln und Templates.",
    steps: [
      { phase: "input" as const,   label: "Zielgruppe + Tonalitaet + Kontext", owner: "Stratege", status: "done" as const, content: "Brand-Briefing, bestehende Assets, Wettbewerbsanalyse." },
      { phase: "process" as const, label: "Rules definieren &rarr; Templates bauen &rarr; Beispiele", owner: "Creative", status: "active" as const, content: "Sprachregeln werden festgelegt, Templates fuer haeufige Formate erstellt." },
      { phase: "output" as const,  label: "Rules + Templates + Beispiele", dod: "Jedes Teammitglied kann konsistent kommunizieren", handoff: "Team / Brand Guide", status: "pending" as const, content: "Dokumentiertes Brand-System: Tonalitaet, Vokabular, Formatvorlagen." },
      { phase: "proof" as const,   label: "Konsistente Aussenwirkung", status: "pending" as const, content: "Signal: Externe erkennen die Marke ohne Logo." },
    ],
  },
  {
    id: "decision",
    icon: <GitBranch size={16} />,
    title: "Produktentscheidung",
    description: "Komplexe Entscheidungen werden durch strukturierte Evidenz entscheidbar.",
    steps: [
      { phase: "input" as const,   label: "Optionen + Kriterien + Stakeholder", owner: "PM", status: "done" as const, content: "Alle relevanten Optionen, Entscheidungskriterien, betroffene Personen." },
      { phase: "process" as const, label: "Bewerten &rarr; Abwaegen &rarr; Experiment planen", owner: "Team", status: "active" as const, content: "Optionen werden gegen Kriterien bewertet, Risiken abgewogen, Test-Hypothese formuliert." },
      { phase: "output" as const,  label: "Decision Log + Experiment Plan", dod: "Entscheidung ist dokumentiert und kommuniziert", handoff: "Entwicklung / Stakeholder", status: "pending" as const, content: "Klare Entscheidung mit Begruendung, Alternativen und Experiment-Setup." },
      { phase: "proof" as const,   label: "Weniger Reverts, mehr Lernen", status: "pending" as const, content: "Signal: Entscheidungen werden selten revidiert, Learnings werden dokumentiert." },
    ],
  },
  {
    id: "content",
    icon: <FileText size={16} />,
    title: "Content-Produktion",
    description: "Von Briefing bis Publishing - reproduzierbar und skalierbar.",
    steps: [
      { phase: "input" as const,   label: "Briefing + Zielgruppe + Format + Kanal", owner: "Editor", status: "done" as const, content: "Thema, Ziel, Zielgruppe, Format (Artikel/Video/Post), Kanal und Deadline." },
      { phase: "process" as const, label: "Varianten erstellen &rarr; Review &rarr; Freigabe", owner: "Creator", status: "active" as const, content: "Inhalt wird produziert, Varianten erstellt, intern reviewed und freigegeben." },
      { phase: "output" as const,  label: "Briefing + Varianten + Publishing-Paket", dod: "Alle Assets sind publish-ready", handoff: "Publishing / Social", status: "pending" as const, content: "Fertiges Content-Paket: Hauptstueck + Varianten + Metadaten + Publishing-Plan." },
      { phase: "proof" as const,   label: "Reichweite und Engagement steigen", status: "pending" as const, content: "Signal: Content performt messbar besser als ohne Briefing-Prozess." },
    ],
  },
  {
    id: "build",
    icon: <Code2 size={16} />,
    title: "Build / Dev",
    description: "Von Spec bis Release - strukturiert, dokumentiert, uebergabefaehig.",
    steps: [
      { phase: "input" as const,   label: "Spec + Akzeptanzkriterien + Prioritaet", owner: "PM", status: "done" as const, content: "Technische Anforderungen, User Stories, Akzeptanzkriterien, Prioritaet." },
      { phase: "process" as const, label: "Ticket-Backlog &rarr; Entwicklung &rarr; Review", owner: "Dev", status: "active" as const, content: "Spec wird in Tickets zerlegt, entwickelt, code-reviewed und getestet." },
      { phase: "output" as const,  label: "Spec + Ticket-Backlog + Release-Notes", dod: "Feature ist deployed und dokumentiert", handoff: "Ops / Kunde", status: "pending" as const, content: "Fertiges Feature mit Dokumentation, Release Notes und Uebergabe-Protokoll." },
      { phase: "proof" as const,   label: "Weniger Bugs, schnellere Releases", status: "pending" as const, content: "Signal: Cycle Time sinkt, Bug-Rate nach Release sinkt." },
    ],
  },
  {
    id: "sales",
    icon: <TrendingUp size={16} />,
    title: "Sales / Lead",
    description: "Leads werden systematisch qualifiziert und weitergefuehrt.",
    steps: [
      { phase: "input" as const,   label: "Lead-Info + Quelle + Erstkontext", owner: "Sales", status: "done" as const, content: "Kontaktdaten, Herkunft des Leads, erster Kontext und Bedarf." },
      { phase: "process" as const, label: "Qualifizieren &rarr; Pitch &rarr; Next Step definieren", owner: "Sales", status: "active" as const, content: "Lead wird gegen ICP geprueft, Pitch angepasst, konkreter naechster Schritt vereinbart." },
      { phase: "output" as const,  label: "Qualifizierung + Next Step + Follow-up", dod: "Naechster Schritt ist terminiert", handoff: "CRM / Account Manager", status: "pending" as const, content: "Qualifiziertes Lead-Profil mit klarem Next Step und Follow-up-Datum." },
      { phase: "proof" as const,   label: "Conversion Rate steigt", status: "pending" as const, content: "Signal: Mehr Leads werden zu Kunden, Cycle Time sinkt." },
    ],
  },
  {
    id: "ops",
    icon: <Wrench size={16} />,
    title: "Ops / Backoffice",
    description: "Wiederkehrende Aufgaben werden zu Standards - einmal dokumentiert, immer reproduzierbar.",
    steps: [
      { phase: "input" as const,   label: "Aufgabe + Haeufigkeit + Verantwortlicher", owner: "Ops", status: "done" as const, content: "Beschreibung der Aufgabe, wie oft sie vorkommt, wer sie ausfuehrt." },
      { phase: "process" as const, label: "SOP schreiben &rarr; Checkliste &rarr; Testen", owner: "Ops", status: "active" as const, content: "Standard Operating Procedure wird dokumentiert, Checkliste erstellt, einmal durchgespielt." },
      { phase: "output" as const,  label: "SOP + Checkliste + Uebergabe", dod: "Neue Person kann Aufgabe ohne Rueckfragen ausfuehren", handoff: "Team / Notion", status: "pending" as const, content: "Dokumentierter Standard: Schritt-fuer-Schritt-Anleitung, Checkliste, Uebergabe-Protokoll." },
      { phase: "proof" as const,   label: "Weniger Fehler, weniger Rueckfragen", status: "pending" as const, content: "Signal: Aufgabe laeuft ohne Eskalation, neue Mitarbeitende onboarden schneller." },
    ],
  },
];

const TEMPLATE_TEXT = `### Eingang
- Kontext:
- Rohmaterial/Quellen:
- Constraints:
- Qualitaetskriterien:

### Ablauf
- Schritte:
- Checks/Reviews:
- Tools/Automationen:
- Owner:

### Ergebnis
- Artefakte/Links:
- DoD:

### Wirkung
- Erwartetes Signal:
- Messung/Beobachtung:

### Hand-off
- Wie fuehrt man es ohne mich weiter?
- Update-Rhythmus:`;

/* ══════════════════════════════════════════════
   HILFS-KOMPONENTEN
══════════════════════════════════════════════ */

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4 flex items-center gap-2">
    {children}
  </p>
);

const PhaseChip: React.FC<{ phase: keyof typeof PHASE_COLORS }> = ({ phase }) => {
  const c = PHASE_COLORS[phase];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider"
      style={{ background: c.bg, color: "#0A0A0A", border: `1px solid ${c.border}` }}
    >
      {c.label}
    </span>
  );
};

const WorkflowStep: React.FC<{
  phase: keyof typeof PHASE_COLORS;
  label: string;
  content: string;
  owner?: string;
  dod?: string;
  handoff?: string;
  status: "done" | "active" | "pending";
  isLast?: boolean;
}> = ({ phase, label, content, owner, dod, handoff, status, isLast }) => {
  const c = PHASE_COLORS[phase];
  const statusColors = {
    done:    { dot: "#1A9E5A", text: "Abgeschlossen" },
    active:  { dot: "#E8A020", text: "In Bearbeitung" },
    pending: { dot: "#BEBEBE", text: "Ausstehend"    },
  };
  const s = statusColors[status];

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: c.bg, borderColor: c.border }}>
          <div className="w-2 h-2 rounded-full" style={{ background: s.dot }} />
        </div>
        {!isLast && <div className="w-0.5 flex-1 mt-1" style={{ background: c.border }} />}
      </div>
      <div className={cn("pb-6 flex-1", isLast && "pb-0")}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <PhaseChip phase={phase} />
            {owner && <span className="text-[10px] font-mono text-[#6B7A9A]">Owner: {owner}</span>}
          </div>
          <span className="text-[9px] font-mono text-[#BEBEBE] shrink-0">{s.text}</span>
        </div>
        <p className="font-display font-bold text-sm text-[#0A0A0A] mb-1">{label}</p>
        <p className="text-xs text-[#4A4A4A] leading-relaxed mb-2">{content}</p>
        {(dod || handoff) && (
          <div className="flex gap-3 flex-wrap">
            {dod && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#1A9E5A]">
                <CheckCircle2 size={10} /> DoD: {dod}
              </span>
            )}
            {handoff && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#6B7A9A]">
                <ArrowRight size={10} /> {handoff}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded border border-[#E8E8E8] text-[#6B6B6B] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-all"
    >
      <Copy size={10} />
      {copied ? "✓ kopiert" : "kopieren"}
    </button>
  );
};

/* ══════════════════════════════════════════════
   HAUPT-KOMPONENTE
══════════════════════════════════════════════ */

export default function OperatingPrincipleSection() {
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [expandedGlossary, setExpandedGlossary] = useState(false);

  return (
    <div className="space-y-20">

      {/* ── HEADER ── */}
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 mt-1">
          <GrainCursor size="xl" color="black" animated />
        </div>
        <div>
          <SectionLabel>Operating Principle</SectionLabel>
          <h1 className="font-display font-bold text-4xl text-[#0A0A0A] mb-4 leading-tight">
            Eingabe &rarr; Workflow &rarr; Ausgabe
          </h1>
          <p className="text-[#4A4A4A] text-lg max-w-2xl leading-relaxed mb-4">
            Ein universelles Schema, nach dem jede Aktivitaet bei Free-Agents.io gedacht,
            geplant und dokumentiert wird. Kein Input ohne Output. Kein Output ohne Owner.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E4FF97] border border-[#C8F060]">
            <Zap size={12} className="text-[#0A0A0A]" />
            <span className="text-[11px] font-mono font-semibold text-[#0A0A0A] uppercase tracking-wider">
              Merksatz: Weniger Abstimmung. Mehr Ergebnis.
            </span>
          </div>
        </div>
      </div>

      {/* ── FUeR KUND:INNEN ── */}
      <div>
        <SectionLabel><Users size={12} /> Fuer Kund:innen (einfach erklaert)</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 rounded-2xl bg-[#0A0A0A] p-8 text-white">
            <p className="font-display font-bold text-xl mb-4 leading-tight">
              Unsere Zusammenarbeit folgt einer simplen Regel:
            </p>
            <p className="text-[#E4FF97] text-2xl font-display font-bold mb-6">
              Du gibst uns Input.<br />Wir machen daraus ein klares Ergebnis.
            </p>
            <div className="space-y-2">
              {[
                "Du musst keine AI verstehen.",
                "Du musst nichts 'richtig prompten'.",
                "Du musst nur sagen, was wichtig ist und was am Ende stehen soll.",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#E4FF97] mt-0.5 shrink-0">›</span>
                  <p className="text-sm text-white/80">{t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-3">Was du bekommst (immer)</p>
            {[
              { icon: <FileText size={14} />, label: "Konkretes Ergebnis", sub: "Dokument / Entscheidung / Entwurf / System" },
              { icon: <ArrowRight size={14} />, label: "Klare naechste Schritte", sub: "Mit Owner und Datum" },
              { icon: <BookOpen size={14} />, label: "Transparenz", sub: "Annahmen + offene Punkte sichtbar" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-[#E8E8E8] bg-white">
                <span className="text-[#0A0A0A] mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-[#0A0A0A]">{item.label}</p>
                  <p className="text-[10px] text-[#6B7A9A]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DIE BRUeCKE: OS <-> OP ── */}
      <div>
        <SectionLabel><Cpu size={12} /> Die Bruecke: Digitales OS vs. Menschliches OP</SectionLabel>
        <div className="rounded-2xl border border-[#E8E8E8] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 bg-[#0A0A0A] text-white">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-3">Digitales OS</p>
              <p className="font-display font-bold text-lg mb-4 text-[#E4FF97]">Betriebssystem</p>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center gap-2"><span className="text-[#D4E8FF] font-mono text-xs">INPUT</span><span>Events, Files, Requests</span></div>
                <div className="flex items-center gap-2 pl-4"><ArrowRight size={12} className="text-[#6B7A9A]" /></div>
                <div className="flex items-center gap-2"><span className="text-[#FFF5BA] font-mono text-xs">PROCESS</span><span>Scheduler, Regeln, Prozesse</span></div>
                <div className="flex items-center gap-2 pl-4"><ArrowRight size={12} className="text-[#6B7A9A]" /></div>
                <div className="flex items-center gap-2"><span className="text-[#C3F4D3] font-mono text-xs">OUTPUT</span><span>Zustaende, Dateien, Responses</span></div>
              </div>
            </div>
            <div className="p-6 bg-[#F9F9F9]">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-3">Menschliches OP</p>
              <p className="font-display font-bold text-lg mb-4 text-[#0A0A0A]">Operating Principle</p>
              <div className="space-y-2 text-sm text-[#4A4A4A]">
                <div className="flex items-center gap-2"><span className="font-mono text-xs" style={{color:"#A8CEFF"}}>EINGANG</span><span>Rohmaterial, Kontext, Constraints</span></div>
                <div className="flex items-center gap-2 pl-4"><ArrowRight size={12} className="text-[#BEBEBE]" /></div>
                <div className="flex items-center gap-2"><span className="font-mono text-xs" style={{color:"#FFE87A"}}>ABLAUF</span><span>Routinen, Guardrails, Schritte</span></div>
                <div className="flex items-center gap-2 pl-4"><ArrowRight size={12} className="text-[#BEBEBE]" /></div>
                <div className="flex items-center gap-2"><span className="font-mono text-xs" style={{color:"#7ADEA0"}}>ERGEBNIS</span><span>Artefakte, Entscheidungen</span></div>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 bg-[#E4FF97] border-t border-[#C8F060]">
            <p className="text-xs font-mono text-[#0A0A0A] text-center">
              <strong>Wichtig:</strong> Das OP ist kein „Framework", sondern eine <strong>Betriebsart</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* ── KERN-SCHEMA ── */}
      <div>
        <SectionLabel><Layers size={12} /> Das Kern-Schema</SectionLabel>
        <div className="flex items-stretch gap-0 rounded-2xl overflow-hidden border border-[#E8E8E8]">
          {(["input","process","output","proof"] as const).map((phase, i, arr) => {
            const c = PHASE_COLORS[phase];
            const icons = [<Layers size={20} />, <Cpu size={20} />, <FileText size={20} />, <BarChart2 size={20} />];
            const descs = [
              "Rohmaterial, Kontext, Constraints, Qualitaetskriterien",
              "Regeln + Schritte, die aus Input verlaesslich Output machen",
              "Das Artefakt, das im Alltag eine Konsequenz hat",
              "Das Signal, dass Output wirklich nuetzt",
            ];
            return (
              <div key={phase} className="flex-1 relative">
                <div className="h-full p-5 flex flex-col gap-3" style={{ backgroundColor: c.bg }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[#0A0A0A]">{icons[i]}</span>
                    <span className="text-[10px] font-mono text-[#6B7A9A] uppercase tracking-widest">{c.sub}</span>
                  </div>
                  <p className="font-display font-bold text-[#0A0A0A] text-base">{c.label}</p>
                  <p className="text-[#4A4A4A] text-xs leading-relaxed">{descs[i]}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-6 h-6 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center">
                    <ArrowRight size={12} className="text-[#0A0A0A]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── OUTPUT-TYPEN ── */}
      <div>
        <SectionLabel><Package size={12} /> Output-Typen</SectionLabel>
        <p className="text-sm text-[#4A4A4A] mb-4 max-w-xl">
          Damit „Output" nicht schwammig bleibt - jeder Output gehoert zu einem dieser fuenf Typen.
        </p>
        <div className="flex gap-3 flex-wrap">
          {OUTPUT_TYPES.map((ot, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E8E8E8] bg-white hover:border-[#0A0A0A] transition-colors cursor-default group"
            >
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: ot.color }}>
                <span className="text-[#0A0A0A]">{ot.icon}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0A0A0A]">{ot.type}</p>
                <p className="text-[10px] text-[#6B7A9A] hidden group-hover:block">{ot.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3 KOMMUNIKATIONSRICHTUNGEN ── */}
      <div>
        <SectionLabel><MessageSquare size={12} /> 3 Kommunikationsrichtungen</SectionLabel>
        <p className="text-sm text-[#4A4A4A] mb-4 max-w-xl">
          Dieses OP ist eine einfache Regel fuer <em>jede</em> Interaktion:{" "}
          <strong>Wenn etwas reingeht, muss etwas Verwendbares rauskommen.</strong>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { dir: "Mensch ↔ Mensch", icon: <Users size={16} />, bg: "#D4E8FF", border: "#A8CEFF",
              rule: "Gespraeche sind kein Selbstzweck.",
              input: "Frage + Kontext",
              output: "Entscheidung / naechster Schritt / kurzes Artefakt" },
            { dir: "Mensch &rarr; Maschine", icon: <Cpu size={16} />, bg: "#FFF5BA", border: "#FFE87A",
              rule: "Gute Outputs brauchen gute Inputs.",
              input: "Ziel + Beispiele/Daten + Grenzen + Format",
              output: "Draft / Struktur / Code, der sich weiterverwenden laesst" },
            { dir: "Maschine &rarr; Mensch", icon: <FileText size={16} />, bg: "#C3F4D3", border: "#7ADEA0",
              rule: "KI liefert Arbeitsstuecke, keine Texte.",
              input: "Anfrage + Kontext",
              output: "Format + Annahmen + offene Punkte + Next Actions" },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border p-5 space-y-3" style={{ backgroundColor: item.bg + "40", borderColor: item.border }}>
              <div className="flex items-center gap-2">
                <span className="text-[#0A0A0A]">{item.icon}</span>
                <span className="font-display font-bold text-[#0A0A0A] text-sm">{item.dir}</span>
              </div>
              <p className="text-xs text-[#6B7A9A] italic">{item.rule}</p>
              <div className="space-y-2">
                <div className="flex gap-2 items-start">
                  <GrainBadge variant="muted" size="sm">IN</GrainBadge>
                  <span className="text-xs text-[#4A4A4A]">{item.input}</span>
                </div>
                <div className="flex gap-2 items-start">
                  <GrainBadge variant="default" size="sm">OUT</GrainBadge>
                  <span className="text-xs text-[#4A4A4A]">{item.output}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 px-4 py-3 rounded-xl bg-[#0A0A0A] text-center">
            <p className="text-sm font-mono text-[#E4FF97]">
              Kein Pingpong. Kein Nebel. <strong>Input mit Konsequenz.</strong>
            </p>
        </div>
      </div>

      {/* ── EXPERT-TO-EXPERT ── */}
      <div>
        <SectionLabel><Zap size={12} /> Expert-to-Expert (E2E)</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
              Der OP-Ansatz ist nicht „Erklaerbaer". Er ist <strong>Expert-to-Expert</strong>:
              Wir behandeln Gegenueber als kompetent, sprechen praezise und liefern Artefakte,
              die Expert:innen sofort weiterverwenden koennen.
            </p>
            <div className="space-y-3">
              {E2E_PRINCIPLES.map((p, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl border border-[#E8E8E8] bg-white hover:border-[#0A0A0A] transition-colors">
                  <span className="font-mono text-[10px] text-[#BEBEBE] shrink-0 mt-0.5">{String(i+1).padStart(2,"0")}</span>
                  <div>
                    <p className="text-xs font-semibold text-[#0A0A0A] mb-0.5">{p.title}</p>
                    <p className="text-[11px] text-[#6B7A9A] leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-3">E2E Quick-Check</p>
            <div className="rounded-2xl border border-[#E8E8E8] overflow-hidden">
              <div className="px-4 py-3 bg-[#F7F7F7] border-b border-[#E8E8E8]">
                <p className="text-xs font-semibold text-[#0A0A0A]">3 Fragen, die jeder Output beantworten muss:</p>
              </div>
              {E2E_CRITERIA.map((c, i) => (
                <div key={i} className="flex gap-3 px-4 py-3 border-b border-[#E8E8E8] last:border-0 bg-white">
                  <CheckCircle2 size={14} className="text-[#1A9E5A] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#0A0A0A] leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 10 KERN-WORKFLOWS ── */}
      <div>
        <SectionLabel><GitBranch size={12} /> 10 Kern-Workflows</SectionLabel>
        <div className="flex gap-2 mb-6 flex-wrap">
          {ALL_WORKFLOWS.map((wf, i) => (
            <button
              key={i}
              onClick={() => setActiveWorkflow(i)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
                activeWorkflow === i
                  ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                  : "bg-white text-[#0A0A0A] border-[#E8E8E8] hover:border-[#0A0A0A]"
              )}
            >
              {wf.icon}
              {wf.title}
            </button>
          ))}
        </div>
        <GrainCard>
          <GrainCardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[#0A0A0A]">{ALL_WORKFLOWS[activeWorkflow].icon}</span>
              <GrainCardTitle>{ALL_WORKFLOWS[activeWorkflow].title}</GrainCardTitle>
            </div>
            <p className="text-xs text-[#6B7A9A] mt-1">{ALL_WORKFLOWS[activeWorkflow].description}</p>
          </GrainCardHeader>
          <GrainCardContent>
            <div className="space-y-0">
              {ALL_WORKFLOWS[activeWorkflow].steps.map((step, i, arr) => (
                <WorkflowStep
                  key={i}
                  phase={step.phase}
                  label={step.label}
                  content={step.content}
                  owner={"owner" in step ? step.owner : undefined}
                  dod={"dod" in step ? step.dod : undefined}
                  handoff={"handoff" in step ? step.handoff : undefined}
                  status={step.status}
                  isLast={i === arr.length - 1}
                />
              ))}
            </div>
          </GrainCardContent>
        </GrainCard>
      </div>

      {/* ── GUARDRAILS ── */}
      <div>
        <SectionLabel><Shield size={12} /> Design-Regeln (Guardrails)</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {GUARDRAILS.map((g, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-xl border border-[#E8E8E8] bg-white hover:border-[#0A0A0A] transition-colors">
              <span className="font-mono text-[10px] text-[#BEBEBE] shrink-0 mt-0.5">{g.n}</span>
              <div>
                <p className="text-xs font-semibold text-[#0A0A0A] mb-0.5">{g.title}</p>
                <p className="text-[11px] text-[#6B7A9A] leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── GLOSSAR ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <SectionLabel><BookOpen size={12} /> Standard-Vokabular</SectionLabel>
          <button
            onClick={() => setExpandedGlossary(!expandedGlossary)}
            className="flex items-center gap-1 text-[10px] font-mono text-[#6B7A9A] hover:text-[#0A0A0A] transition-colors"
          >
            {expandedGlossary ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {expandedGlossary ? "weniger" : "alle zeigen"}
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(expandedGlossary ? GLOSSARY : GLOSSARY.slice(0, 6)).map((g, i) => (
            <div key={i} className="p-3 rounded-xl border border-[#E8E8E8] bg-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display font-bold text-sm text-[#0A0A0A]">{g.term}</span>
                <span className="text-[9px] font-mono text-[#BEBEBE] uppercase">{g.en}</span>
              </div>
              <p className="text-[11px] text-[#6B7A9A] leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TEMPLATE ── */}
      <div>
        <SectionLabel><Copy size={12} /> Template (copy/paste)</SectionLabel>
        <GrainCard>
          <GrainCardHeader>
            <div className="flex items-center justify-between">
              <GrainCardTitle>Standard-Template</GrainCardTitle>
              <CopyButton text={TEMPLATE_TEXT} />
            </div>
            <p className="text-xs text-[#6B7A9A] mt-1">
              Fuer jeden Workflow, jedes Projekt, jede Uebergabe - einmal ausfuellen, immer verwenden.
            </p>
          </GrainCardHeader>
          <GrainCardContent>
            <pre className="text-[11px] font-mono text-[#0A0A0A] leading-relaxed whitespace-pre-wrap bg-[#F7F7F7] rounded-xl p-4 border border-[#E8E8E8]">
              {TEMPLATE_TEXT}
            </pre>
          </GrainCardContent>
        </GrainCard>
      </div>

    </div>
  );
}
