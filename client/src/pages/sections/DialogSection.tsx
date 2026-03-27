/**
 * DialogSection – Grain UI
 * Das Dialog-Prinzip: Input mit Konsequenz
 * Kein Pingpong. Kein Nebel. Input → Output.
 * Design: Terminal-Ästhetik, Mono-Labels, 3 Kommunikationsrichtungen
 */

import React, { useState, useEffect } from "react";
import { GrainCursor } from "@/components/grain/GrainCursor";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeftRight, User, Cpu, ChevronRight, Copy, Check } from "lucide-react";

/* ══════════════════════════════════════════════
   DATEN
══════════════════════════════════════════════ */

const DIRECTIONS = [
  {
    id: "human-human",
    label: "A",
    title: "Mensch ↔ Mensch",
    subtitle: "Gespräche sind kein Selbstzweck",
    icon: <ArrowLeftRight size={16} />,
    color: "#D4E8FF",
    border: "#A8CEFF",
    input: {
      label: "input:",
      content: "Frage + Kontext",
      detail: "Was brauche ich? Was ist der Hintergrund? Was ist bereits bekannt?",
    },
    transform: {
      label: "transform:",
      content: "Verdichten → Entscheiden → Formulieren",
      detail: "Kein Storytelling. Keine Einleitung. Direkt zur Substanz.",
    },
    output: {
      label: "output:",
      content: "Entscheidung / nächster Schritt / kurzes Artefakt",
      detail: "Etwas Verwendbares. Nicht: 'Wir schauen mal.' Sondern: 'Bis Freitag, Owner: X.'",
    },
    example: {
      prompt: "> Brauche Entscheidung: Soll Workflow A oder B zuerst gebaut werden?",
      response: "_ Workflow B. Begründung: höherer Impact, weniger Abhängigkeiten. Owner: Joachim. Deadline: 15.04.",
    },
  },
  {
    id: "human-machine",
    label: "B",
    title: "Mensch → Maschine",
    subtitle: "Gute Outputs brauchen gute Inputs",
    icon: <Cpu size={16} />,
    color: "#C3F4D3",
    border: "#7ADEA0",
    input: {
      label: "input:",
      content: "Ziel + Beispiele/Daten + Grenzen (Guardrails) + Format",
      detail: "Je klarer der Input, desto verwendbarer der Output. Annahmen explizit machen.",
    },
    transform: {
      label: "transform:",
      content: "Verarbeiten → Strukturieren → Prüfen",
      detail: "Human-in-the-loop an den richtigen Stellen. Nicht alles automatisieren.",
    },
    output: {
      label: "output:",
      content: "Draft / Struktur / Code – sofort weiterverwertbar",
      detail: "Kein roher Text. Ein Artefakt mit Format, das sich in bestehende Systeme einfügt.",
    },
    example: {
      prompt: "> Erstelle Meeting-Summary. Format: 5 Bullets + Decisions + Next Actions. Kontext: [Transcript]",
      response: "_ Summary generiert. 5 Bullets. 3 Decisions (mit Owner). 4 Next Actions (mit Datum). Hand-off-ready.",
    },
  },
  {
    id: "machine-human",
    label: "C",
    title: "Maschine → Mensch",
    subtitle: "KI liefert Arbeitsstücke, keine Texte",
    icon: <User size={16} />,
    color: "#FFF5BA",
    border: "#FFE87A",
    input: {
      label: "input:",
      content: "Verarbeitetes Rohmaterial + Kontext",
      detail: "Die Maschine hat gearbeitet. Jetzt kommt das Ergebnis zurück zum Menschen.",
    },
    transform: {
      label: "transform:",
      content: "Review → Freigabe → Weiterverwendung",
      detail: "Human-in-the-loop: Der Mensch prüft, entscheidet, gibt frei. Nicht blind vertrauen.",
    },
    output: {
      label: "output:",
      content: "Format + Annahmen + offene Punkte + Next Actions",
      detail: "Immer: Was wurde angenommen? Was ist noch offen? Was ist der nächste Schritt?",
    },
    example: {
      prompt: "_ Analyse abgeschlossen. 3 Hypothesen. 1 Empfehlung. Annahme: Datenbasis vollständig.",
      response: "> Freigabe erteilt. Offener Punkt: Quelle 2 prüfen. Next Action: Bericht bis Montag finalisieren.",
    },
  },
];

const MICROCOPY_LABELS = [
  { label: "input:",     desc: "Was reingeht – Rohmaterial, Kontext, Constraints",          color: "#D4E8FF" },
  { label: "transform:", desc: "Was passiert – Schritte, Regeln, Guardrails",                color: "#C3F4D3" },
  { label: "output:",    desc: "Was rauskommt – Artefakt, Entscheidung, Dokument",           color: "#FFF5BA" },
  { label: "guardrails:",desc: "Was nicht passiert – Qualität, Datenschutz, Grenzen",        color: "#FFD4E8" },
  { label: "log:",       desc: "Was dokumentiert wird – Evidenzzeile, Change-Log",           color: "#E4D4FF" },
  { label: "version:",   desc: "Welcher Stand – Versionierung für Artefakte",                color: "#E4FF97" },
  { label: "owner:",     desc: "Wer verantwortlich ist – Ownership ist Teil des Outputs",    color: "#F0F0F0" },
];

const GUARDRAILS = [
  "Kein Input ohne Output.",
  "Output ist prüfbar.",
  "Annahmen sind explizit.",
  "Owner ist Teil des Outputs.",
  "Kein Pingpong. Kein Nebel.",
];

/* ══════════════════════════════════════════════
   TERMINAL-DEMO
══════════════════════════════════════════════ */

const TerminalDemo: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [cursor, setCursor] = useState(true);
  const sequence = [
    { text: "> Mein Team verbringt 10 Stunden/Woche mit Format-Anpassungen.", delay: 600 },
    { text: "_ Analysiere...", delay: 1200 },
    { text: "_ Workflow identifiziert: Content-Repurposing-System.", delay: 800 },
    { text: "_ Baue: Template + Automation + Guardrails.", delay: 1000 },
    { text: "output: System produktiv. Owner: Team. DoD: ✓", delay: 600 },
    { text: "log: 10h/Woche → 1.5h/Woche. Delta: -8.5h.", delay: 400 },
  ];

  useEffect(() => {
    let i = 0;
    const run = () => {
      if (i < sequence.length) {
        const item = sequence[i];
        setTimeout(() => {
          setLines(prev => [...prev, item.text]);
          i++;
          run();
        }, item.delay);
      }
    };
    run();
    const blink = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="rounded-2xl bg-[#0A0A0A] p-5 font-mono text-sm overflow-hidden">
      <div className="flex items-center gap-1.5 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[10px] text-[#555] tracking-widest uppercase">free-agents.io — terminal</span>
      </div>
      <div className="space-y-1.5 min-h-[160px]">
        {lines.map((line, i) => (
          <div key={i} className={cn(
            "text-xs leading-relaxed",
            line.startsWith(">") ? "text-[#E4FF97]" :
            line.startsWith("_") ? "text-[#AAAAAA]" :
            line.startsWith("output:") ? "text-[#C3F4D3]" :
            line.startsWith("log:") ? "text-[#D4E8FF]" :
            "text-white"
          )}>
            {line}
          </div>
        ))}
        {lines.length < sequence.length && (
          <div className="text-[#E4FF97] text-xs">
            {cursor ? "▋" : " "}
          </div>
        )}
        {lines.length === sequence.length && (
          <div className="text-[#E4FF97] text-xs mt-2">
            &gt; {cursor ? "▋" : " "}
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   COPY-BUTTON
══════════════════════════════════════════════ */

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} className="flex items-center gap-1 text-[10px] font-mono text-[#6B7A9A] hover:text-[#0A0A0A] transition-colors">
      {copied ? <Check size={10} className="text-green-600" /> : <Copy size={10} />}
      {copied ? "kopiert" : "kopieren"}
    </button>
  );
};

/* ══════════════════════════════════════════════
   HAUPT-KOMPONENTE
══════════════════════════════════════════════ */

export const DialogSection: React.FC = () => {
  const [activeDir, setActiveDir] = useState("human-human");
  const active = DIRECTIONS.find(d => d.id === activeDir) || DIRECTIONS[0];

  return (
    <div className="space-y-20">

      {/* ── HEADER ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-2">Dialog-Prinzip</p>
        <h1 className="font-display font-bold text-4xl text-[#0A0A0A] mb-4 leading-tight">
          Kein Pingpong.<br />Kein Nebel.
        </h1>
        <p className="text-[#4A4A4A] text-lg max-w-2xl leading-relaxed mb-6">
          Dialog ist kein Selbstzweck. Jede Interaktion folgt dem Prinzip:{" "}
          <span className="font-mono font-bold text-[#0A0A0A]">Input mit Konsequenz.</span>{" "}
          Was reingeht, muss etwas Verwendbares produzieren.
        </p>
        <div className="flex items-center gap-3">
          <GrainCursor size="sm" color="black" animated />
          <p className="font-mono text-sm text-[#0A0A0A] font-bold">
            Input mit Konsequenz.
          </p>
        </div>
      </div>

      {/* ── TERMINAL DEMO ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">
          Live-Beispiel
        </p>
        <TerminalDemo />
      </div>

      {/* ── 3 KOMMUNIKATIONSRICHTUNGEN ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">
          3 Kommunikationsrichtungen
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Richtungs-Tabs */}
          <div className="space-y-2">
            {DIRECTIONS.map((dir) => (
              <button
                key={dir.id}
                onClick={() => setActiveDir(dir.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all",
                  activeDir === dir.id
                    ? "border-[#0A0A0A] bg-white shadow-sm"
                    : "border-[#E8E8E8] bg-white hover:border-[#0A0A0A]/40"
                )}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-sm text-[#0A0A0A]"
                  style={{ background: dir.color, border: `1px solid ${dir.border}` }}
                >
                  {dir.label}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#0A0A0A] truncate">{dir.title}</p>
                  <p className="text-[10px] text-[#6B7A9A] truncate">{dir.subtitle}</p>
                </div>
                {activeDir === dir.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] shrink-0" />
                )}
              </button>
            ))}

            {/* Merksatz */}
            <div className="mt-4 p-3 rounded-xl bg-[#0A0A0A]">
              <p className="font-mono text-[11px] text-[#E4FF97] leading-relaxed">
                Kein Pingpong. Kein Nebel.<br />
                <strong>Input mit Konsequenz.</strong>
              </p>
            </div>
          </div>

          {/* Detail-Ansicht */}
          <div className="lg:col-span-2 space-y-3">

            {/* Header */}
            <div
              className="rounded-2xl p-5"
              style={{ background: active.color, border: `1px solid ${active.border}` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#0A0A0A]">{active.icon}</span>
                <p className="font-display font-bold text-lg text-[#0A0A0A]">{active.title}</p>
              </div>
              <p className="text-sm text-[#0A0A0A]/70">{active.subtitle}</p>
            </div>

            {/* Input → Transform → Output */}
            {[active.input, active.transform, active.output].map((step, i) => (
              <div key={i} className="rounded-xl border border-[#E8E8E8] bg-white p-4">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[11px] font-bold text-[#0A0A0A] bg-[#F0F0F0] px-2 py-0.5 rounded shrink-0 mt-0.5">
                    {step.label}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#0A0A0A] mb-1">{step.content}</p>
                    <p className="text-xs text-[#6B7A9A] leading-relaxed">{step.detail}</p>
                  </div>
                </div>
                {i < 2 && (
                  <div className="flex justify-center mt-3">
                    <ArrowRight size={14} className="text-[#BEBEBE]" />
                  </div>
                )}
              </div>
            ))}

            {/* Beispiel */}
            <div className="rounded-2xl bg-[#0A0A0A] p-4">
              <p className="text-[9px] font-mono uppercase tracking-widest text-[#555] mb-3">Beispiel</p>
              <div className="space-y-2">
                <p className={cn(
                  "font-mono text-xs leading-relaxed",
                  active.example.prompt.startsWith(">") ? "text-[#E4FF97]" : "text-[#AAAAAA]"
                )}>
                  {active.example.prompt}
                </p>
                <p className={cn(
                  "font-mono text-xs leading-relaxed",
                  active.example.response.startsWith("_") ? "text-[#AAAAAA]" : "text-[#E4FF97]"
                )}>
                  {active.example.response}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MICROCOPY-SYSTEM ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-2">
          Microcopy-System
        </p>
        <p className="text-sm text-[#4A4A4A] mb-4 max-w-xl">
          Diese Labels sind die Signatur von Free-Agents.io. Sie erscheinen in Buttons,
          Badges, Karten und Dokumenten – immer in Monospace, immer mit Doppelpunkt.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MICROCOPY_LABELS.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#E8E8E8] bg-white p-4 hover:border-[#0A0A0A] transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <span
                  className="font-mono text-sm font-bold text-[#0A0A0A] px-2 py-0.5 rounded"
                  style={{ background: item.color }}
                >
                  {item.label}
                </span>
                <CopyButton text={item.label} />
              </div>
              <p className="text-xs text-[#6B7A9A] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICE CLI ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">
          Service CLI – Free-Agents.io
        </p>
        <div className="rounded-2xl bg-[#0A0A0A] p-6">
          <div className="flex items-center gap-1.5 mb-5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 text-[9px] text-[#555] tracking-widest uppercase">free-agents.io — services</span>
          </div>
          <div className="space-y-3">
            {[
              { cmd: "> build brand-system",       desc: "Marke, Positionierung, Designsprache",       color: "#E4FF97" },
              { cmd: "> build growth-system",      desc: "Marketing, Leads, Content-Automatisierung",  color: "#C3F4D3" },
              { cmd: "> build product-system",     desc: "Produkt-Workflows, Specs, Delivery",         color: "#D4E8FF" },
              { cmd: "> build ai-integration",     desc: "AI-Infrastruktur, Guardrails, Ownership",    color: "#FFF5BA" },
              { cmd: "> strategic-consulting",     desc: "Positionierung, Entscheidungen, Roadmap",    color: "#E4D4FF" },
            ].map((service, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <span
                  className="font-mono text-sm font-bold shrink-0"
                  style={{ color: service.color }}
                >
                  {service.cmd}
                </span>
                <span className="font-mono text-xs text-[#555] mt-0.5 group-hover:text-[#999] transition-colors">
                  # {service.desc}
                </span>
              </div>
            ))}
            <div className="mt-4 text-[#E4FF97] font-mono text-sm">
              &gt; ▋
            </div>
          </div>
        </div>
      </div>

      {/* ── GUARDRAILS ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">
          Dialog-Guardrails
        </p>
        <div className="flex flex-wrap gap-2">
          {GUARDRAILS.map((g, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#E8E8E8] bg-white hover:border-[#0A0A0A] transition-colors"
            >
              <span className="font-mono text-[9px] text-[#BEBEBE]">{String(i+1).padStart(2,"0")}</span>
              <span className="text-xs font-semibold text-[#0A0A0A]">{g}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TEMPLATE ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">
          Dialog-Template (copy/paste)
        </p>
        <div className="rounded-2xl border border-[#E8E8E8] bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8E8E8] bg-[#F7F7F7]">
            <span className="font-mono text-xs text-[#6B7A9A]">dialog-template.md</span>
            <CopyButton text={`input:\n- Kontext:\n- Rohmaterial:\n- Constraints:\n- Format:\n\ntransform:\n- Schritte:\n- Guardrails:\n- Owner:\n\noutput:\n- Artefakt:\n- DoD:\n- Annahmen:\n- Offene Punkte:\n\nhand-off:\n- Wie weiter ohne mich?\n- Next Action:\n- Deadline:`} />
          </div>
          <div className="p-5 font-mono text-xs space-y-4">
            {[
              { label: "input:", fields: ["Kontext:", "Rohmaterial:", "Constraints:", "Format:"], color: "#D4E8FF" },
              { label: "transform:", fields: ["Schritte:", "Guardrails:", "Owner:"], color: "#C3F4D3" },
              { label: "output:", fields: ["Artefakt:", "DoD:", "Annahmen:", "Offene Punkte:"], color: "#FFF5BA" },
              { label: "hand-off:", fields: ["Wie weiter ohne mich?", "Next Action:", "Deadline:"], color: "#E4D4FF" },
            ].map((block, i) => (
              <div key={i}>
                <span
                  className="font-bold text-[#0A0A0A] px-2 py-0.5 rounded text-[11px]"
                  style={{ background: block.color }}
                >
                  {block.label}
                </span>
                <div className="mt-2 space-y-1 pl-2 border-l-2 border-[#E8E8E8]">
                  {block.fields.map((f, j) => (
                    <p key={j} className="text-[#6B7A9A]">- {f} <span className="text-[#BEBEBE]">___</span></p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DialogSection;
