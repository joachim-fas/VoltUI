/**
 * BrandStorySection – Flux UI
 * Free-Agents.io Brand Story: Core Story, Foundations, Narrative, Prinzipien, Voice
 * Design: Editorial, Warm Tech, Terminal-Signatur, Pastell-Akzente
 */

import React, { useState } from "react";
import { GrainCursor } from "@/components/grain/GrainCursor";
import { cn } from "@/lib/utils";
import { Copy, Check, ChevronRight } from "lucide-react";

/* ══════════════════════════════════════════════
   DATEN
══════════════════════════════════════════════ */

const CORE_STORY = {
  lines: [
    "Menschen sind zu wertvoll für repetitive Tasks.",
    "Deshalb bauen wir Systeme, die ihre Fähigkeiten multiplizieren.",
    "Nicht als Service. Als Infrastruktur, die ihnen gehört.",
  ],
  annotations: ["Haltung", "Mechanik", "Business-Model"],
};

const BRAND_ESSENCE = [
  {
    label: "Purpose",
    sublabel: "Warum",
    content: "Teams von Busywork befreien und Entscheidungen verbessern, indem AI als verlässliche Routine im Alltag läuft.",
    color: "#E4FF97",
  },
  {
    label: "Promise",
    sublabel: "Wertversprechen",
    content: "Spürbar weniger manuelle Arbeit in 2–4 Wochen durch 3 produktive Workflows.",
    color: "#C3F4D3",
  },
  {
    label: "Belief",
    sublabel: "Weltbild",
    content: "SMBs kaufen keine \"AI\". SMBs kaufen Entlastung, Sicherheit und eine funktionierende Routine.",
    color: "#D4E8FF",
  },
  {
    label: "Position",
    sublabel: "Marktposition",
    content: "Implementation Layer zwischen \"AI kann alles\" und \"AI bringt im Alltag Ergebnisse\".",
    color: "#FFF5BA",
  },
];

const FIVE_PRINCIPLES = [
  {
    n: "01",
    title: "Routine statt Tool-Show",
    desc: "Wir bauen wiederholbare Workflows, keine Demos. Ein System, das morgen noch laeuft.",
    do: "3 produktive Workflows mit Doku und Uebergabe.",
    dont: "\"Wir haben 47 AI-Tools integriert.\"",
    color: "#E4FF97",
  },
  {
    n: "02",
    title: "Sichtbarkeit statt Bauchgefuehl",
    desc: "Jede Automatisierung erzeugt sichtbare Outputs. Ohne Evidenz zaehlt sie im Alltag nicht.",
    do: "Log: 10h/Woche → 1.5h/Woche. Delta: -8.5h.",
    dont: "\"Das laeuft jetzt irgendwie im Hintergrund.\"",
    color: "#C3F4D3",
  },
  {
    n: "03",
    title: "Guardrails statt Chaos",
    desc: "Qualitaet, Datenschutz und Verantwortung sind ab Tag 1 Teil des Systems, nicht nachtraegliche Auflagen.",
    do: "guardrails: Datenschutz, Qualitaetspruefung, Human-in-the-loop.",
    dont: "\"Probier es einfach mal aus.\"",
    color: "#D4E8FF",
  },
  {
    n: "04",
    title: "Owner statt 'macht halt wer'",
    desc: "Jeder Output hat einen Owner. Ownership ist Teil der Lieferung, nicht optional.",
    do: "owner: Joachim. deadline: 15.04. hand-off: ready.",
    dont: "\"Jemand muss sich das noch anschauen.\"",
    color: "#FFF5BA",
  },
  {
    n: "05",
    title: "Small wins statt Big Bang",
    desc: "Schnell sichtbare Entlastung, dann ausbauen. Kein 6-Monats-Projekt ohne Zwischenergebnisse.",
    do: "Woche 1: erster Workflow produktiv. Woche 4: 3 Workflows stabil.",
    dont: "\"Nach dem Rollout wird alles besser.\"",
    color: "#E4D4FF",
  },
];

const MESSAGING = {
  oneliner: "AI, die sich nach 7 Tagen wie ein Teammitglied anfuehlt.",
  claim: "3 Prozesse. 2–4 Wochen. Spuerbar weniger Busywork.",
  explanation: "Wir bauen eine schlanke AI-Arbeitsinfrastruktur aus wiederholbaren Workflows, Vorlagen und Guardrails. Damit wird AI zu einer Routine, die wirklich genutzt wird.",
  proof: [
    "3 Workflows produktiv",
    "Human-in-the-loop an den richtigen Stellen",
    "Doku + Loom-Uebergabe",
    "Messbarkeit per Dashboard/Log",
  ],
};

const VOICE_RULES = [
  { rule: "Outcome vor Feature",      example: "\"3 Workflows produktiv\" statt \"AI-Integration\"" },
  { rule: "Zeitrahmen nennen",        example: "\"in 2–4 Wochen\" statt \"schnell\"" },
  { rule: "Guardrails mitfuehren",    example: "\"inkl. Datenschutz und Qualitaetspruefung\"" },
  { rule: "Ownership benennen",       example: "\"bleibt beim Kunden\" statt \"wir kuemmern uns\"" },
  { rule: "Alltagssprache",           example: "\"Ablaeufe\" statt \"Agenten\", \"Routinen\" statt \"Automationen\"" },
];

const VOCAB = [
  { use: "Routine",        avoid: "Automation",     why: "Klingt menschlicher, weniger technisch" },
  { use: "Ablauf",         avoid: "Agent",          why: "Alltagssprache vor Tech-Sprache" },
  { use: "Ergebnis",       avoid: "Output",         why: "Im Kunden-Kontext verstaendlicher" },
  { use: "Infrastruktur",  avoid: "Tool",           why: "Signalisiert Dauerhaftigkeit" },
  { use: "Guardrails",     avoid: "Regeln",         why: "Praeziser, Teil der Fachsprache" },
  { use: "Sichtbar",       avoid: "Messbar",        why: "Emotionaler, konkreter" },
];

const DIFFERENTIATORS = [
  { title: "Infrastruktur statt Folien",  desc: "Systeme bauen, nicht beraten. Kein Workshop ohne Umsetzung.", icon: ">" },
  { title: "Small wins → Skalierung",     desc: "Schnell sichtbare Entlastung, dann ausbauen. Kein Big Bang.", icon: ">" },
  { title: "Client-owned",               desc: "Doku und Assets bleiben beim Kunden. Keine Vendor-Abhaengigkeit.", icon: ">" },
  { title: "Guardrails ab Tag 1",         desc: "Verantwortung, Qualitaet, Datenschutz sind eingebaut.", icon: ">" },
  { title: "Make value visible",          desc: "Jede Automatisierung erzeugt sichtbare Outputs. Sonst zaehlt sie nicht.", icon: ">" },
];

/* ══════════════════════════════════════════════
   COPY-BUTTON
══════════════════════════════════════════════ */

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="flex items-center gap-1 text-[10px] font-mono text-[#6B7A9A] hover:text-foreground transition-colors"
    >
      {copied ? <Check size={10} className="text-green-600" /> : <Copy size={10} />}
      {copied ? "kopiert" : "kopieren"}
    </button>
  );
};

/* ══════════════════════════════════════════════
   HAUPT-KOMPONENTE
══════════════════════════════════════════════ */

export const BrandStorySection: React.FC = () => {
  const [activeP, setActiveP] = useState(0);

  return (
    <div className="space-y-20">

      {/* ── HEADER ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-2">Brand Story</p>
        <h1 className="font-display font-bold text-4xl text-foreground mb-4 leading-tight">
          Free-Agents.io
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Die vollstaendige Markengeschichte: Warum Free-Agents.io existiert, was es
          unterscheidet und wie es klingt – als lebendiges Dokument im Design System.
        </p>
      </div>

      {/* ── CORE STORY ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Core Story</p>
        <div className="rounded-2xl border border-[#0A0A0A] bg-card overflow-hidden">
          <div className="p-8 space-y-0">
            {CORE_STORY.lines.map((line, i) => (
              <div key={i} className="flex items-start gap-4 py-4 border-b border-border last:border-0">
                <span className="font-mono text-[10px] text-[#BEBEBE] shrink-0 mt-1.5 w-16">
                  {CORE_STORY.annotations[i]}
                </span>
                <p className="font-display font-bold text-xl text-foreground leading-snug flex-1">
                  {line}
                </p>
              </div>
            ))}
          </div>
          <div className="px-8 py-4 bg-[#0A0A0A] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GrainCursor size="sm" color="lime" animated />
              <p className="font-mono text-xs text-[#E4FF97]">free-agents.io</p>
            </div>
            <CopyButton text={CORE_STORY.lines.join("\n")} />
          </div>
        </div>
      </div>

      {/* ── TERMINAL-METAPHER ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">
          Das Terminal als Philosophie
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#0A0A0A] p-6">
            <p className="text-[9px] font-mono uppercase tracking-widest text-[#555] mb-4">Bedeutung</p>
            <div className="space-y-4">
              <div>
                <span className="font-mono text-2xl font-bold text-[#E4FF97]">&gt;</span>
                <p className="text-sm text-white mt-1">Command Prompt. Das System ist bereit fuer einen qualifizierten Befehl.</p>
                <p className="text-xs text-[#555] mt-0.5 font-mono">Dialog ist kein Selbstzweck.</p>
              </div>
              <div>
                <span className="font-mono text-2xl font-bold text-white">_</span>
                <p className="text-sm text-white mt-1">Moment der Ausfuehrung. Aus Denken wird Handlung.</p>
                <p className="text-xs text-[#555] mt-0.5 font-mono">Aus Input wird Output.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-[#0A0A0A] p-6">
            <p className="text-[9px] font-mono uppercase tracking-widest text-[#555] mb-4">In der Praxis</p>
            <div className="space-y-2 font-mono text-xs">
              <p className="text-[#E4FF97]">&gt; Mein Team verbringt 10h/Woche mit Format-Anpassungen.</p>
              <p className="text-muted-foreground">_ System wird gebaut...</p>
              <p className="text-[#C3F4D3]">output: Content-Repurposing-Workflow produktiv.</p>
              <p className="text-[#D4E8FF]">log: 10h → 1.5h. Delta: -8.5h.</p>
              <div className="mt-4 pt-3 border-t border-[#222]">
                <p className="text-[#555] text-[10px]">Kein Agentur-Pingpong.</p>
                <p className="text-[#555] text-[10px]">Kein Workshop ohne Umsetzung.</p>
                <p className="text-[#E4FF97] text-[10px] font-bold mt-1">Input mit Konsequenz.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BRAND ESSENCE ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Brand Essence</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BRAND_ESSENCE.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 border"
              style={{ background: item.color, borderColor: item.color }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] font-bold text-foreground uppercase tracking-wider">{item.label}</span>
                <span className="text-[9px] text-foreground/50 font-mono">/ {item.sublabel}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5 MARKENPRINZIPIEN ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">
          5 Markenprinzipien
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Prinzip-Liste */}
          <div className="space-y-1">
            {FIVE_PRINCIPLES.map((p, i) => (
              <button
                key={i}
                onClick={() => setActiveP(i)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all",
                  activeP === i
                    ? "border-foreground bg-card shadow-sm"
                    : "border-border bg-card hover:border-foreground/40"
                )}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-[10px] text-foreground"
                  style={{ background: p.color }}
                >
                  {p.n}
                </div>
                <p className="text-xs font-semibold text-foreground truncate">{p.title}</p>
                {activeP === i && <div className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] shrink-0 ml-auto" />}
              </button>
            ))}
          </div>

          {/* Prinzip-Detail */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="p-5" style={{ background: FIVE_PRINCIPLES[activeP].color }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[10px] font-bold text-foreground">{FIVE_PRINCIPLES[activeP].n}</span>
                  <h3 className="font-display font-bold text-lg text-foreground">{FIVE_PRINCIPLES[activeP].title}</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{FIVE_PRINCIPLES[activeP].desc}</p>
              </div>
              <div className="p-5 bg-card space-y-3">
                <div className="flex gap-3">
                  <span className="font-mono text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded shrink-0">DO</span>
                  <p className="font-mono text-xs text-foreground">{FIVE_PRINCIPLES[activeP].do}</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded shrink-0">DON'T</span>
                  <p className="font-mono text-xs text-[#6B7A9A] line-through">{FIVE_PRINCIPLES[activeP].dont}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MESSAGING ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Messaging-Bausteine</p>
        <div className="space-y-3">
          <div className="rounded-2xl border border-[#0A0A0A] bg-[#E4FF97] p-5">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] text-foreground/60 uppercase tracking-wider">One-liner</span>
              <CopyButton text={MESSAGING.oneliner} />
            </div>
            <p className="font-display font-bold text-xl text-foreground">{MESSAGING.oneliner}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] text-[#6B7A9A] uppercase tracking-wider">Core Claim</span>
              <CopyButton text={MESSAGING.claim} />
            </div>
            <p className="font-display font-bold text-lg text-foreground">{MESSAGING.claim}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-[#6B7A9A] uppercase tracking-wider">Erklaerung</span>
              <CopyButton text={MESSAGING.explanation} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{MESSAGING.explanation}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <span className="font-mono text-[10px] text-[#6B7A9A] uppercase tracking-wider block mb-3">Proof / Mechanism</span>
            <div className="grid grid-cols-2 gap-2">
              {MESSAGING.proof.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[#E4FF97] bg-[#0A0A0A] w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold shrink-0">{i+1}</span>
                  <p className="text-xs text-foreground">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── DIFFERENZIERUNG ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Differenzierung</p>
        <div className="space-y-2">
          {DIFFERENTIATORS.map((d, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-[#0A0A0A] transition-colors">
              <span className="font-mono font-bold text-[#E4FF97] bg-[#0A0A0A] w-6 h-6 rounded flex items-center justify-center text-sm shrink-0 mt-0.5">&gt;</span>
              <div>
                <p className="font-semibold text-sm text-foreground mb-0.5">{d.title}</p>
                <p className="text-xs text-[#6B7A9A] leading-relaxed">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── VOICE & TONE ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Voice & Tone</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Copy-Regeln */}
          <div>
            <p className="text-xs font-semibold text-foreground mb-3">Copy-Regeln</p>
            <div className="space-y-2">
              {VOICE_RULES.map((r, i) => (
                <div key={i} className="p-3 rounded-xl border border-border bg-card">
                  <p className="text-xs font-semibold text-foreground mb-1">{r.rule}</p>
                  <p className="font-mono text-[10px] text-[#6B7A9A]">{r.example}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Vokabular */}
          <div>
            <p className="text-xs font-semibold text-foreground mb-3">Vokabular</p>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-3 bg-[#F7F7F7] px-3 py-2 border-b border-border">
                <span className="text-[9px] font-mono font-bold text-[#6B7A9A] uppercase">Verwenden</span>
                <span className="text-[9px] font-mono font-bold text-[#6B7A9A] uppercase">Vermeiden</span>
                <span className="text-[9px] font-mono font-bold text-[#6B7A9A] uppercase">Warum</span>
              </div>
              {VOCAB.map((v, i) => (
                <div key={i} className="grid grid-cols-3 px-3 py-2.5 border-b border-border last:border-0 hover:bg-[#FAFAFA]">
                  <span className="text-xs font-semibold text-green-700">{v.use}</span>
                  <span className="text-xs text-red-500 line-through">{v.avoid}</span>
                  <span className="text-[10px] text-[#6B7A9A]">{v.why}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── QUICK REFERENCE ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A] mb-4">Quick Reference</p>
        <div className="rounded-2xl bg-[#0A0A0A] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-[9px] font-mono uppercase tracking-widest text-[#555]">Messaging</p>
              <p className="font-mono text-xs text-[#E4FF97]">one-liner: "{MESSAGING.oneliner}"</p>
              <p className="font-mono text-xs text-[#C3F4D3]">claim: "{MESSAGING.claim}"</p>
              <div className="mt-3 pt-3 border-t border-[#222]">
                <p className="text-[9px] font-mono uppercase tracking-widest text-[#555] mb-2">5 Prinzipien</p>
                {FIVE_PRINCIPLES.map((p, i) => (
                  <p key={i} className="font-mono text-[10px] text-muted-foreground">{p.n} {p.title}</p>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[9px] font-mono uppercase tracking-widest text-[#555]">Service CLI</p>
              {["> build brand-system", "> build growth-system", "> build product-system", "> build ai-integration", "> strategic-consulting"].map((s, i) => (
                <p key={i} className="font-mono text-xs text-[#E4FF97]">{s}</p>
              ))}
              <div className="mt-3 pt-3 border-t border-[#222]">
                <p className="text-[9px] font-mono uppercase tracking-widest text-[#555] mb-2">Microcopy</p>
                <p className="font-mono text-[10px] text-muted-foreground">input: / transform: / output: / guardrails: / log: / owner:</p>
              </div>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-[#222] flex items-center gap-3">
            <GrainCursor size="sm" color="lime" animated />
            <p className="font-mono text-xs text-[#E4FF97] font-bold">Kein Pingpong. Kein Nebel. Input mit Konsequenz.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BrandStorySection;
