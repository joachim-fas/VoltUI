// OperatingPrincipleSection – Operating Principle: Eingabe → Workflow → Ausgabe
// Design: Weiß/Hell, Lime+Schwarz System, Pastell-Farbzuordnung
// Basiert auf: https://www.notion.so/ea52062dee2c4e5eb4ca6de5481fd1d2

import { useState } from "react";
import { GrainWorkflowCard, GrainOPBadge } from "@/components/grain/GrainWorkflowCard";
import { ArrowRight, Layers, Cpu, FileText, BarChart2, Users, Shield, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const EXAMPLE_WORKFLOWS = [
  {
    id: "meeting",
    title: "Meeting / Call",
    description: "Gespräche sind kein Selbstzweck – jedes Meeting produziert ein Artefakt.",
    steps: [
      {
        phase: "input" as const,
        label: "Agenda + Teilnehmer + Transcript",
        content: "Ziele des Meetings, Teilnehmerliste, Notizen oder Aufzeichnung.",
        owner: "Initiator",
        status: "done" as const,
      },
      {
        phase: "process" as const,
        label: "Verdichten → Entscheidungen markieren → Tasks extrahieren",
        content: "Rohmaterial wird strukturiert: Entscheidungen werden markiert, Next Actions mit Owner und Datum versehen.",
        owner: "Moderator",
        status: "active" as const,
      },
      {
        phase: "output" as const,
        label: "Summary + Decisions + Next Actions",
        content: "5 Bullets Summary, Decisions mit Owner, Next Actions mit Datum.",
        dod: "Alle Actions haben Owner + Datum",
        handoff: "Slack / Notion / Ticket-System",
        status: "pending" as const,
      },
      {
        phase: "proof" as const,
        label: "Weniger Pingpong, klare Owners",
        content: "Signal: nächste Schritte laufen ohne Nachfrage an.",
        status: "pending" as const,
      },
    ],
  },
  {
    id: "research",
    title: "Research / Scan",
    description: "Schnellere Entscheidungen durch strukturierte Evidenz statt Bauchgefühl.",
    steps: [
      {
        phase: "input" as const,
        label: "5–20 Quellen + Fragestellung + Zeitfenster",
        content: "Rohmaterial: Links, Dokumente, Signale. Klare Fragestellung und Zeitrahmen.",
        owner: "Researcher",
        status: "done" as const,
      },
      {
        phase: "process" as const,
        label: "Clustern → Muster → Interpretation → Implikationen",
        content: "Quellen werden geclustert, Muster identifiziert, Implikationen abgeleitet, offene Fragen markiert.",
        owner: "Analyst",
        status: "done" as const,
      },
      {
        phase: "output" as const,
        label: "1 Insight-Note + 3 Hypothesen + 1 Empfehlung",
        content: "Kompaktes Dokument: Kerninsight, testbare Hypothesen, klare Handlungsempfehlung.",
        dod: "Empfehlung ist umsetzbar ohne Meeting",
        handoff: "Decision Log / Produktteam",
        status: "active" as const,
      },
      {
        phase: "proof" as const,
        label: "Schnellere Entscheidungen, mehr Evidenz",
        content: "Signal: Entscheidungen werden in < 24h getroffen, nicht in Meetings diskutiert.",
        status: "pending" as const,
      },
    ],
  },
  {
    id: "build",
    title: "Build / Dev",
    description: "Technische Arbeit mit klarer Spec, Ticket-Backlog und Release-Notes.",
    steps: [
      {
        phase: "input" as const,
        label: "Anforderung + Kontext + Constraints",
        content: "User Story oder Spec, technische Rahmenbedingungen, Abhängigkeiten.",
        owner: "Product Owner",
        status: "done" as const,
      },
      {
        phase: "process" as const,
        label: "Spec → Ticket-Backlog → Implementierung → Review",
        content: "Spec wird in Tickets übersetzt, implementiert und reviewed. Human-in-the-loop bei Freigaben explizit.",
        owner: "Dev",
        status: "active" as const,
      },
      {
        phase: "output" as const,
        label: "Spec + Ticket-Backlog + Release-Notes",
        content: "Fertige Implementierung mit Dokumentation, Release-Notes und Übergabe-Anleitung.",
        dod: "Tests grün, Release-Notes vorhanden, Owner definiert",
        handoff: "Ops / QA / Nutzer",
        status: "pending" as const,
      },
      {
        phase: "proof" as const,
        label: "Feature läuft stabil, Nutzer können es ohne Anleitung verwenden",
        content: "Signal: keine Support-Anfragen in den ersten 48h nach Release.",
        status: "pending" as const,
      },
    ],
  },
];

const GUARDRAILS = [
  { number: "01", text: "Kein Input ohne Output. Wenn der Output unklar ist: stoppen, präzisieren." },
  { number: "02", text: "Output ist prüfbar. Eine andere Person kann erkennen, ob er fertig ist (DoD)." },
  { number: "03", text: "Workflow ist wiederholbar. Die Default-Frage lautet: Wie wird's ein Standard?" },
  { number: "04", text: "Wenige Pflichtfelder, hohe Konsequenz. Lieber 5 klare Felder als 20 optionale." },
  { number: "05", text: "Human-in-the-loop ist explizit. Wo muss Freigabe/Review passieren?" },
  { number: "06", text: "Logging statt Diskussion. Entscheidungen werden dokumentiert, damit Systeme wachsen." },
  { number: "07", text: "Value visible ist Pflicht. Jeder Workflow produziert sichtbare Evidenz." },
  { number: "08", text: "Alltagssprache vor Tech-Sprache. Abläufe und Routinen, nicht Agenten/Automationen." },
  { number: "09", text: "Ownership ist Teil des Outputs. Output ohne Owner/Übergabe ist unfertig." },
];

const VOCAB = [
  { term: "Eingang", sub: "Input", color: "#D4E8FF" },
  { term: "Ablauf", sub: "Workflow", color: "#FFF5BA" },
  { term: "Ergebnis", sub: "Output", color: "#C3F4D3" },
  { term: "Wirkung", sub: "Proof", color: "#E4FF97" },
  { term: "Hand-off", sub: "Übergabe", color: "#FFE0CC" },
  { term: "DoD", sub: "Definition of Done", color: "#FDE2FF" },
  { term: "Guardrails", sub: "Qualität & Grenzen", color: "#FFD6E0" },
  { term: "Log", sub: "Evidenzzeile", color: "#D6F5F5" },
  { term: "Owner", sub: "Verantwortung", color: "#C3F4D3" },
];

export default function OperatingPrincipleSection() {
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  return (
    <div className="space-y-16">
      {/* Header */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[#6B7A9A] mb-2">Operating Principle</p>
        <h1 className="text-4xl font-black text-[#0A0A0A] mb-4 leading-tight">
          Eingabe → Workflow → Ausgabe
        </h1>
        <p className="text-[#4A4A4A] text-lg max-w-2xl leading-relaxed">
          Ein universelles Schema, nach dem jede Aktivität gedacht, geplant und dokumentiert wird.
          Kein Input ohne Output. Kein Output ohne Owner.
        </p>
      </div>

      {/* Core Principle – visuelle Darstellung */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Das Prinzip</p>
        <div className="flex items-stretch gap-0 rounded-2xl overflow-hidden border border-[#E8E8E8]">
          {[
            { phase: "Eingang", sub: "Input", bg: "#D4E8FF", icon: <Layers size={20} />, desc: "Rohmaterial, Kontext, Constraints, Qualitätskriterien" },
            { phase: "Ablauf", sub: "Workflow", bg: "#FFF5BA", icon: <Cpu size={20} />, desc: "Regeln + Schritte, die aus Input verlässlich Output machen" },
            { phase: "Ergebnis", sub: "Output", bg: "#C3F4D3", icon: <FileText size={20} />, desc: "Das Artefakt, das im Alltag eine Konsequenz hat" },
            { phase: "Wirkung", sub: "Proof", bg: "#E4FF97", icon: <BarChart2 size={20} />, desc: "Das Signal, dass Output wirklich nützt" },
          ].map((item, i, arr) => (
            <div key={i} className="flex-1 relative">
              <div
                className="h-full p-5 flex flex-col gap-3"
                style={{ backgroundColor: item.bg }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#0A0A0A]">{item.icon}</span>
                  <span className="text-[10px] font-mono text-[#6B7A9A] uppercase tracking-widest">{item.sub}</span>
                </div>
                <p className="font-bold text-[#0A0A0A] text-base">{item.phase}</p>
                <p className="text-[#4A4A4A] text-xs leading-relaxed">{item.desc}</p>
              </div>
              {i < arr.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-6 h-6 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center">
                  <ArrowRight size={12} className="text-[#0A0A0A]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Kommunikationsrichtungen */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">3 Kommunikationsrichtungen</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              dir: "Mensch ↔ Mensch",
              icon: <Users size={16} />,
              bg: "#D4E8FF",
              border: "#A8CEFF",
              input: "Frage + Kontext",
              output: "Entscheidung / nächster Schritt / kurzes Artefakt",
              rule: "Gespräche sind kein Selbstzweck.",
            },
            {
              dir: "Mensch → Maschine",
              icon: <Cpu size={16} />,
              bg: "#FFF5BA",
              border: "#FFE87A",
              input: "Ziel + Beispiele/Daten + Grenzen + Format",
              output: "Draft / Struktur / Code, der sich weiterverwenden lässt",
              rule: "Gute Outputs brauchen gute Inputs.",
            },
            {
              dir: "Maschine → Mensch",
              icon: <FileText size={16} />,
              bg: "#C3F4D3",
              border: "#7ADEA0",
              input: "Anfrage + Kontext",
              output: "Format + Annahmen + offene Punkte + Next Actions",
              rule: "KI liefert Arbeitsstücke, keine Texte.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl border p-5 space-y-3"
              style={{ backgroundColor: item.bg + "40", borderColor: item.border }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#0A0A0A]">{item.icon}</span>
                <span className="font-bold text-[#0A0A0A] text-sm">{item.dir}</span>
              </div>
              <p className="text-xs text-[#6B7A9A] italic">{item.rule}</p>
              <div className="space-y-2">
                <div className="flex gap-2 items-start">
                  <GrainOPBadge type="input" />
                  <span className="text-xs text-[#4A4A4A]">{item.input}</span>
                </div>
                <div className="flex gap-2 items-start">
                  <GrainOPBadge type="output" />
                  <span className="text-xs text-[#4A4A4A]">{item.output}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow-Beispiele */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Workflow-Beispiele</p>
        <div className="flex gap-2 mb-6 flex-wrap">
          {EXAMPLE_WORKFLOWS.map((wf, i) => (
            <button
              key={i}
              onClick={() => setActiveWorkflow(i)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                activeWorkflow === i
                  ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                  : "bg-white text-[#0A0A0A] border-[#E8E8E8] hover:border-[#0A0A0A]"
              )}
            >
              {wf.title}
            </button>
          ))}
        </div>
        <GrainWorkflowCard
          title={EXAMPLE_WORKFLOWS[activeWorkflow].title}
          description={EXAMPLE_WORKFLOWS[activeWorkflow].description}
          steps={EXAMPLE_WORKFLOWS[activeWorkflow].steps}
        />
      </div>

      {/* Guardrails */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">
          <Shield size={12} className="inline mr-1" />
          Design-Regeln (Guardrails)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {GUARDRAILS.map((g, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-xl border border-[#E8E8E8] bg-white hover:border-[#0A0A0A] transition-colors">
              <span className="font-mono text-[10px] text-[#BEBEBE] shrink-0 mt-0.5">{g.number}</span>
              <p className="text-sm text-[#0A0A0A] leading-relaxed">{g.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Standard-Vokabular */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">
          <BookOpen size={12} className="inline mr-1" />
          Standard-Vokabular
        </p>
        <div className="flex flex-wrap gap-2">
          {VOCAB.map((v, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E8E8E8]"
              style={{ backgroundColor: v.color + "60" }}
            >
              <span className="font-bold text-[#0A0A0A] text-sm">{v.term}</span>
              <span className="text-[#6B7A9A] text-xs">({v.sub})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Template */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Template (copy/paste)</p>
        <div className="bg-[#0A0A0A] rounded-2xl p-6 font-mono text-sm text-[#E4FF97] leading-relaxed">
          <pre className="whitespace-pre-wrap text-xs">{`### Eingang
- Kontext:
- Rohmaterial/Quellen:
- Constraints:
- Qualitätskriterien:

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
- Wie führt man es ohne mich weiter?
- Update-Rhythmus:`}</pre>
        </div>
      </div>

      {/* GrainOPBadge Showcase */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">GrainOPBadge – Metadaten-Labels</p>
        <div className="p-5 border border-[#E8E8E8] rounded-2xl bg-white">
          <div className="flex flex-wrap gap-2 mb-4">
            <GrainOPBadge type="input" />
            <GrainOPBadge type="process" />
            <GrainOPBadge type="output" />
            <GrainOPBadge type="proof" />
            <GrainOPBadge type="dod" value="Tests grün" />
            <GrainOPBadge type="owner" value="Design Lead" />
            <GrainOPBadge type="handoff" value="Dev-Team" />
            <GrainOPBadge type="guardrail" value="Datenschutz" />
            <GrainOPBadge type="log" value="v1.2 · 27.03.26" />
          </div>
          <p className="text-xs text-[#6B7A9A]">
            Verwendung: <code className="bg-[#F0F2F7] px-1 rounded text-[#0A0A0A]">{"<GrainOPBadge type=\"owner\" value=\"Max Müller\" />"}</code>
          </p>
        </div>
      </div>

      {/* Compact Workflow Demo */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">GrainWorkflowCard – Compact Mode</p>
        <GrainWorkflowCard
          title="Content-Produktion"
          description="Briefing → Varianten → Publishing-Paket"
          compact
          steps={[
            { phase: "input", label: "Briefing + Ziel", content: "" },
            { phase: "process", label: "Varianten erstellen", content: "" },
            { phase: "output", label: "Publishing-Paket", content: "" },
            { phase: "proof", label: "Reichweite / Engagement", content: "" },
          ]}
        />
      </div>
    </div>
  );
}
