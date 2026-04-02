/**
 * SignetSection – Volt UI
 * Vollständige Marken-Dokumentation des ">_" Signets
 * Design: Weiß + Schwarz + Lime – keine anderen Farben
 */

import React, { useState, useCallback } from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { VoltCursor } from "@/components/volt/VoltCursor";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle } from "@/components/volt/VoltCard";
import { VoltBadge } from "@/components/volt/VoltBadge";

/* ── SVG-Quellen für Downloads ── */
const SVG_BLACK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414.24 269.82"><style>@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}#bar{animation:blink 1s steps(1,end) infinite}</style><path d="M0,214.08v-54.39l144.89-52.65L0,53.95V0l207.12,78.76v56.57L0,214.08Z" fill="#0A0A0A"/><path id="bar" d="M207.12,269.82v-55.74h207.12v55.74h-207.12Z" fill="#0A0A0A"/></svg>`;
const SVG_LIME  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414.24 269.82"><path d="M0,214.08v-54.39l144.89-52.65L0,53.95V0l207.12,78.76v56.57L0,214.08Z" fill="#E4FF97"/><path d="M207.12,269.82v-55.74h207.12v55.74h-207.12Z" fill="#E4FF97"/></svg>`;
const SVG_WHITE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414.24 269.82"><path d="M0,214.08v-54.39l144.89-52.65L0,53.95V0l207.12,78.76v56.57L0,214.08Z" fill="#FFFFFF"/><path d="M207.12,269.82v-55.74h207.12v55.74h-207.12Z" fill="#FFFFFF"/></svg>`;

/* ── Download-Sektion ── */
function DownloadSection() {
  const downloadSVG = useCallback((svgContent: string, filename: string) => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }, []);

  const downloadPNG = useCallback((svgContent: string, filename: string, bg: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 828; canvas.height = 540;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 828, 540);
    const img = new Image();
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 828, 540);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => {
        if (!b) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b); a.download = filename; a.click();
      }, "image/png");
    };
    img.src = url;
  }, []);

  const variants = [
    { label: "Schwarz", svg: SVG_BLACK, bg: "#FFFFFF", dark: false, svgFile: "volt-signet-black.svg", pngFile: "volt-signet-black.png" },
    { label: "Lime",    svg: SVG_LIME,  bg: "#0A0A0A", dark: true,  svgFile: "volt-signet-lime.svg",  pngFile: "volt-signet-lime.png"  },
    { label: "Weiß",   svg: SVG_WHITE, bg: "#0A0A0A", dark: true,  svgFile: "volt-signet-white.svg", pngFile: "volt-signet-white.png" },
  ];

  return (
    <div>
      <p className="section-label mb-6">Downloads</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {variants.map(({ label, svg, bg, dark, svgFile, pngFile }) => (
          <div key={label} className={`rounded-2xl p-5 flex flex-col gap-4 border ${
            dark ? "bg-[#0A0A0A] border-white/10" : "bg-white border-border"
          }`}>
            <div className="w-full h-20 rounded-xl flex items-center justify-center" style={{ background: bg }}>
              <div className="w-16 h-11" dangerouslySetInnerHTML={{ __html: svg }} />
            </div>
            <p className={`font-display font-bold text-sm ${dark ? "text-white" : "text-foreground"}`}>{label}</p>
            <div className="flex gap-2">
              <button
                onClick={() => downloadSVG(svg, svgFile)}
                className={`flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-mono font-medium border transition-opacity hover:opacity-70 ${
                  dark ? "border-white/20 text-white/70 bg-white/10" : "border-border text-muted-foreground bg-secondary"
                }`}
              >
                <Download className="w-3 h-3" /> SVG
              </button>
              <button
                onClick={() => downloadPNG(svg, pngFile, bg)}
                className={`flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-mono font-medium border transition-opacity hover:opacity-70 ${
                  dark ? "border-white/20 text-white/70 bg-white/10" : "border-border text-muted-foreground bg-secondary"
                }`}
              >
                <Download className="w-3 h-3" /> PNG
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Hilfsfunktion: Code-Kopieren ── */
const CopyButton: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={copy}
      className="text-[10px] font-mono px-2.5 py-1 rounded border border-border text-muted-foreground hover:border-[#0A0A0A] hover:text-foreground transition-all"
    >
      {copied ? "✓ kopiert" : "kopieren"}
    </button>
  );
};

/* ── Inline-Code-Block ── */
const CodeBlock: React.FC<{ code: string; label?: string }> = ({ code, label }) => (
  <div className="rounded-xl border border-border overflow-hidden">
    {label && (
      <div className="px-4 py-2 bg-secondary border-b border-border flex items-center justify-between">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{label}</span>
        <CopyButton code={code} />
      </div>
    )}
    <pre className="px-4 py-3 text-[11px] font-mono text-foreground leading-relaxed overflow-x-auto bg-card">
      {code}
    </pre>
  </div>
);

/* ── Regel-Karte ── */
const RuleCard: React.FC<{
  number: string;
  title: string;
  desc: string;
  good?: string;
  bad?: string;
}> = ({ number, title, desc, good, bad }) => (
  <div className="border border-border rounded-2xl overflow-hidden">
    <div className="px-5 py-4 bg-card">
      <div className="flex items-start gap-3 mb-2">
        <span className="font-mono text-[10px] text-muted-foreground/50 mt-0.5 shrink-0">{number}</span>
        <div>
          <p className="font-display font-bold text-sm text-foreground mb-1">{title}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
    {(good || bad) && (
      <div className="grid grid-cols-2 border-t border-border">
        {good && (
          <div className="px-4 py-3 bg-[#1A9E5A]/10 border-r border-border">
            <p className="text-[9px] font-mono text-[#1A9E5A] uppercase tracking-widest mb-1">✓ Richtig</p>
            <p className="text-[11px] text-foreground">{good}</p>
          </div>
        )}
        {bad && (
          <div className="px-4 py-3 bg-[#E8402A]/10">
            <p className="text-[9px] font-mono text-[#E8402A] uppercase tracking-widest mb-1">✗ Falsch</p>
            <p className="text-[11px] text-foreground">{bad}</p>
          </div>
        )}
      </div>
    )}
  </div>
);

/* ── Haupt-Komponente ── */
export const SignetSection: React.FC = () => {
  const [activeVariant, setActiveVariant] = useState<"black" | "lime" | "white">("black");
  const [activeSize, setActiveSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("xl");
  const [showBar, setShowBar] = useState(true);
  const [animated, setAnimated] = useState(true);

  const bgForVariant = {
    black: "#FFFFFF",
    lime:  "#0A0A0A",
    white: "#0A0A0A",
  };

  return (
    <div className="space-y-16">

      {/* ── Header ── */}
      <div>
        <p className="section-label mb-2">05 — Signet</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">
          Das <span className="font-mono">&gt;_</span> Signet
        </h2>
        <p className="text-muted-foreground font-ui text-base max-w-2xl leading-relaxed">
          Das Signet ist die visuelle Essenz von Volt UI. Es kombiniert den
          Terminal-Prompt-Pfeil <span className="font-mono text-foreground">&gt;</span> mit
          dem blinkenden Cursor-Balken <span className="font-mono text-foreground">_</span> –
          ein Symbol für präzise Eingabe, klaren Output und maschinelle Ästhetik.
        </p>
      </div>

      {/* ── Hero: Großes Signet ── */}
      <div className="relative rounded-3xl overflow-hidden" style={{ background: "#E4FF97", minHeight: "420px" }}>
        <div className="absolute inset-0 pattern-dots opacity-15 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full py-20 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <VoltCursor size="2xl" color="black" animated />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center"
          >
            <p className="font-mono text-foreground/50 text-sm tracking-widest uppercase">Volt UI · Signet · v1</p>
          </motion.div>
        </div>
      </div>

      {/* ── Anatomie ── */}
      <div>
        <p className="section-label mb-6">Anatomie</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Pfeil-Teil */}
          <VoltCard>
            <VoltCardContent className="p-6">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#E4FF97] flex items-center justify-center">
                  <svg viewBox="0 0 207 214" width="36" height="36" aria-hidden="true">
                    <path d="M0,214.08v-54.39l144.89-52.65L0,53.95V0l207.12,78.76v56.57L0,214.08Z" fill="#0A0A0A" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-display font-bold text-sm text-foreground">Prompt-Pfeil</p>
                    <VoltBadge variant="muted" size="sm">statisch</VoltBadge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Der nach rechts weisende Pfeil ist dem Terminal-Prompt nachempfunden.
                    Er steht für <strong>Richtung, Präzision und Handlungsbereitschaft</strong>.
                    Die hohle Mitte erzeugt Spannung zwischen Masse und Leere.
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground/60 mt-3">
                    SVG-Pfad: M0,214v-54l144-52L0,53V0l207,78v56L0,214Z
                  </p>
                </div>
              </div>
            </VoltCardContent>
          </VoltCard>

          {/* Balken-Teil */}
          <VoltCard>
            <VoltCardContent className="p-6">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#0A0A0A] flex items-center justify-center">
                  <svg viewBox="0 0 207 56" width="36" height="14" aria-hidden="true">
                    <style>{`@keyframes sb{0%,49%{opacity:1}50%,100%{opacity:0}}.sb{animation:sb 1s steps(1,end) infinite}`}</style>
                    <rect className="sb" x="0" y="0" width="207" height="56" fill="#E4FF97" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-display font-bold text-sm text-foreground">Cursor-Balken</p>
                    <VoltBadge variant="default" size="sm">animiert</VoltBadge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Der blinkende Balken ist der klassische Text-Cursor aus Terminals und Code-Editoren.
                    Er steht für <strong>Erwartung, Eingabe und lebendige Interaktion</strong>.
                    Blinkt im 1-Sekunden-Takt mit hartem Step-Übergang.
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground/60 mt-3">
                    Animation: blink 1s steps(1, end) infinite
                  </p>
                </div>
              </div>
            </VoltCardContent>
          </VoltCard>
        </div>
      </div>

      {/* ── Interaktiver Konfigurator ── */}
      <div>
        <p className="section-label mb-6">Konfigurator</p>
        <VoltCard>
          <VoltCardHeader>
            <VoltCardTitle>Live-Vorschau</VoltCardTitle>
            <p className="text-xs text-muted-foreground font-ui mt-0.5">
              Variante, Größe und Eigenschaften einstellen
            </p>
          </VoltCardHeader>
          <VoltCardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Vorschau-Fläche */}
              <div
                className="rounded-2xl flex items-center justify-center transition-colors duration-300"
                style={{ background: bgForVariant[activeVariant], minHeight: "220px" }}
              >
                <VoltCursor
                  size={activeSize}
                  color={activeVariant}
                  animated={animated}
                  showBar={showBar}
                />
              </div>

              {/* Steuerung */}
              <div className="space-y-5">

                {/* Farbe */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Farbe</p>
                  <div className="flex gap-2">
                    {(["black", "lime", "white"] as const).map(v => (
                      <button
                        key={v}
                        onClick={() => setActiveVariant(v)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold font-ui border transition-all ${
                          activeVariant === v
                            ? "bg-foreground text-background border-foreground"
                            : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Größe */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Größe</p>
                  <div className="flex gap-2 flex-wrap">
                    {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setActiveSize(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold font-ui border transition-all ${
                          activeSize === s
                            ? "bg-foreground text-background border-foreground"
                            : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optionen */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Optionen</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={animated}
                        onChange={e => setAnimated(e.target.checked)}
                        className="w-3.5 h-3.5 accent-[#0A0A0A]"
                      />
                      <span className="text-xs font-ui text-foreground">Animiert</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showBar}
                        onChange={e => setShowBar(e.target.checked)}
                        className="w-3.5 h-3.5 accent-[#0A0A0A]"
                      />
                      <span className="text-xs font-ui text-foreground">Balken zeigen</span>
                    </label>
                  </div>
                </div>

                {/* Generierter Code */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Code</p>
                  <CodeBlock
                    code={`<VoltCursor\n  size="${activeSize}"\n  color="${activeVariant}"\n  animated={${animated}}\n  showBar={${showBar}}\n/>`}
                  />
                </div>
              </div>
            </div>
          </VoltCardContent>
        </VoltCard>
      </div>

      {/* ── Größen-Übersicht ── */}
      <div>
        <p className="section-label mb-6">Größen</p>
        <VoltCard>
          <VoltCardContent className="p-6">
            <div className="flex items-end gap-8 flex-wrap">
              {([
                { size: "xs",  w: 20,  label: "20 px" },
                { size: "sm",  w: 32,  label: "32 px" },
                { size: "md",  w: 48,  label: "48 px" },
                { size: "lg",  w: 72,  label: "72 px" },
                { size: "xl",  w: 96,  label: "96 px" },
                { size: "2xl", w: 144, label: "144 px" },
              ] as const).map(({ size, label }) => (
                <div key={size} className="flex flex-col items-center gap-3">
                  <VoltCursor size={size} color="black" animated />
                  <div className="text-center">
                    <p className="text-[11px] font-semibold font-ui text-foreground">{size}</p>
                    <p className="text-[9px] font-mono text-muted-foreground">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </VoltCardContent>
        </VoltCard>
      </div>

      {/* ── Farbvarianten ── */}
      <div>
        <p className="section-label mb-6">Farbvarianten</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              color: "black" as const,
              bg: "#FFFFFF",
              border: "#E8E8E8",
              label: "Schwarz auf Weiß",
              desc: "Standard. Für helle Hintergründe, Dokumentation, Interface.",
              usage: "Sidebar, Formulare, Cards",
            },
            {
              color: "lime" as const,
              bg: "#0A0A0A",
              border: "#2A2A2A",
              label: "Lime auf Schwarz",
              desc: "Primär-Akzent. Für dunkle Hintergründe, Hero-Bereiche, Splash.",
              usage: "Hero, Dark Mode, Onboarding",
            },
            {
              color: "white" as const,
              bg: "#1A1A1A",
              border: "#2A2A2A",
              label: "Weiß auf Dunkel",
              desc: "Subtil. Für dunkle Surfaces, wo Lime zu laut wäre.",
              usage: "Dark Cards, Overlays, Modals",
            },
          ].map(({ color, bg, border, label, desc, usage }) => (
            <div
              key={color}
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: border }}
            >
              <div
                className="flex items-center justify-center py-10"
                style={{ background: bg }}
              >
                <VoltCursor size="xl" color={color} animated />
              </div>
              <div className="px-5 py-4 bg-card border-t" style={{ borderColor: border }}>
                <p className="font-display font-bold text-sm text-foreground mb-1">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{desc}</p>
                <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">
                  Einsatz: {usage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Anwendungsregeln ── */}
      <div>
        <p className="section-label mb-6">Anwendungsregeln</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RuleCard
            number="01"
            title="Immer mit Freiraum"
            desc="Das Signet braucht mindestens die eigene Breite als Schutzzone auf allen Seiten. Nie direkt an Kanten oder anderen Elementen."
            good="Signet mit 48 px Abstand zum Rand"
            bad="Signet direkt am Rand oder in engen Containern"
          />
          <RuleCard
            number="02"
            title="Nur drei Farbkombinationen"
            desc="Schwarz auf Weiß, Lime auf Schwarz, Weiß auf Dunkel. Keine anderen Farben. Keine Graustufen-Varianten."
            good="color='black' auf weißem Hintergrund"
            bad="Grau, Blau oder andere Farben"
          />
          <RuleCard
            number="03"
            title="Balken immer animiert"
            desc="Der Cursor-Balken blinkt immer, wenn das Signet in einer digitalen Umgebung erscheint. Statische Variante nur für Print."
            good="animated={true} (Standard)"
            bad="animated={false} in digitalen Interfaces"
          />
          <RuleCard
            number="04"
            title="Nicht verzerren"
            desc="Das Signet hat ein festes Seitenverhältnis (414 : 270). Nie strecken, quetschen oder drehen."
            good="Einheitliche Skalierung über size-Prop"
            bad="Individuelle width/height-Werte"
          />
          <RuleCard
            number="05"
            title="Mindestgröße: xs (20 px)"
            desc="Unter 20 px Breite verliert das Signet seine Lesbarkeit. Für sehr kleine Kontexte nur den Pfeil ohne Balken verwenden."
            good="size='xs' als kleinste Variante"
            bad="Kleinere Größen via style-Prop"
          />
          <RuleCard
            number="06"
            title="Kein Text im Signet"
            desc="Das Signet steht für sich. Kein Schriftzug innerhalb der Schutzzone. Wortmarke 'volt ui' wird separat gesetzt."
            good="Signet + Wortmarke nebeneinander"
            bad="Text über oder im Signet"
          />
        </div>
      </div>

      {/* ── Kontext-Beispiele ── */}
      <div>
        <p className="section-label mb-6">Kontext-Beispiele</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Sidebar-Logo */}
          <VoltCard>
            <VoltCardHeader>
              <VoltCardTitle>Sidebar-Logo</VoltCardTitle>
            </VoltCardHeader>
            <VoltCardContent>
              <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                <VoltCursor size="md" color="black" animated />
                <div>
                  <p className="font-display font-bold text-sm text-foreground leading-tight tracking-tight">
                    volt<span className="opacity-30"> ui</span>
                  </p>
                  <p className="text-[0.6rem] font-mono text-muted-foreground leading-tight tracking-widest uppercase">Design System</p>
                </div>
              </div>
              <CodeBlock
                label="JSX"
                code={`<VoltCursor size="md" color="black" animated />`}
              />
            </VoltCardContent>
          </VoltCard>

          {/* Hero-Einsatz */}
          <VoltCard>
            <VoltCardHeader>
              <VoltCardTitle>Hero-Einsatz</VoltCardTitle>
            </VoltCardHeader>
            <VoltCardContent>
              <div className="rounded-xl bg-[#E4FF97] flex items-center justify-center py-8">
                <VoltCursor size="2xl" color="black" animated />
              </div>
              <CodeBlock
                label="JSX"
                code={`<VoltCursor size="2xl" color="black" animated />`}
              />
            </VoltCardContent>
          </VoltCard>

          {/* Dark Mode */}
          <VoltCard>
            <VoltCardHeader>
              <VoltCardTitle>Dark Mode</VoltCardTitle>
            </VoltCardHeader>
            <VoltCardContent>
              <div className="rounded-xl bg-[#0A0A0A] flex items-center justify-center py-8">
                <VoltCursor size="xl" color="lime" animated />
              </div>
              <CodeBlock
                label="JSX"
                code={`<VoltCursor size="xl" color="lime" animated />`}
              />
            </VoltCardContent>
          </VoltCard>

          {/* Nur Pfeil */}
          <VoltCard>
            <VoltCardHeader>
              <VoltCardTitle>Nur Pfeil (kein Balken)</VoltCardTitle>
            </VoltCardHeader>
            <VoltCardContent>
              <div className="rounded-xl border border-border bg-card flex items-center justify-center py-8">
                <VoltCursor size="xl" color="black" animated={false} showBar={false} />
              </div>
              <CodeBlock
                label="JSX"
                code={`<VoltCursor size="xl" color="black"\n  animated={false} showBar={false} />`}
              />
            </VoltCardContent>
          </VoltCard>
        </div>
      </div>

      {/* ── Downloads ── */}
      <DownloadSection />

      {/* ── SVG-Quellcode ── */}
      <div>
        <p className="section-label mb-6">SVG-Quellcode</p>
        <VoltCard>
          <VoltCardHeader>
            <VoltCardTitle>Rohes SVG</VoltCardTitle>
            <p className="text-xs text-muted-foreground font-ui mt-0.5">
              Für den Einsatz außerhalb von React – z. B. in Figma, Illustrator oder als Favicon
            </p>
          </VoltCardHeader>
          <VoltCardContent>
            <CodeBlock
              label="SVG · vollständig mit Animation"
              code={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414.24 269.82">
  <style>
    @keyframes blink {
      0%, 49%   { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    #bar { animation: blink 1s steps(1, end) infinite; }
  </style>
  <!-- Pfeil -->
  <path d="M0,214.08v-54.39l144.89-52.65L0,53.95V0
           l207.12,78.76v56.57L0,214.08Z" fill="#0A0A0A"/>
  <!-- Balken -->
  <path id="bar" d="M207.12,269.82v-55.74h207.12
                    v55.74h-207.12Z" fill="#0A0A0A"/>
</svg>`}
            />
          </VoltCardContent>
        </VoltCard>
      </div>

    </div>
  );
};

export default SignetSection;
