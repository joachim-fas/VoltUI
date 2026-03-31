/**
 * HeroSection – Volt UI
 * Semantische Tokens für vollständigen Dark-Mode-Support
 */

import React from "react";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltCursor } from "@/components/volt/VoltCursor";
import { motion } from "framer-motion";
import {
  ArrowRight, Code2, Palette, Zap, Layers, Package,
  BarChart2, Cpu, Workflow, Fingerprint,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const features = [
  { icon: <Palette className="w-4 h-4" />,    title: "Atmosphärische Textur", desc: "SVG-Rauschen als CSS-Overlay",    lightBg: "#E4FF97", darkBg: "#E4FF97", fg: "#0A0A0A" },
  { icon: <Code2 className="w-4 h-4" />,      title: "Reiner Code",           desc: "Kein Bild-Asset, alles CSS",      lightBg: "#0A0A0A", darkBg: "#E4FF97", fg: "#FFFFFF", darkFg: "#0A0A0A" },
  { icon: <Zap className="w-4 h-4" />,        title: "Framer Motion",         desc: "Flüssige Übergänge",              lightBg: "#1A9E5A", darkBg: "#1A9E5A", fg: "#FFFFFF" },
  { icon: <Layers className="w-4 h-4" />,     title: "Design Tokens",         desc: "CSS-Variablen, portabel",         lightBg: "#F4F4F4", darkBg: "#2A2A2A", fg: "#0A0A0A", darkFg: "#E4FF97" },
  { icon: <BarChart2 className="w-4 h-4" />,  title: "12 Graphen-Typen",      desc: "Recharts mit Volt-Styling",       lightBg: "#E4FF97", darkBg: "#E4FF97", fg: "#0A0A0A" },
  { icon: <Package className="w-4 h-4" />,    title: "18 Komponenten",        desc: "Vollständige Bibliothek",         lightBg: "#0A0A0A", darkBg: "#E4FF97", fg: "#FFFFFF", darkFg: "#0A0A0A" },
  { icon: <Cpu className="w-4 h-4" />,        title: "React 19",              desc: "Modernste React-Version",         lightBg: "#6B7A9A", darkBg: "#6B7A9A", fg: "#FFFFFF" },
  { icon: <Workflow className="w-4 h-4" />,   title: "Operating Principle",   desc: "Eingabe → Workflow → Ausgabe",    lightBg: "#D4E8FF", darkBg: "#1A2A3A", fg: "#0A0A0A", darkFg: "#D4E8FF" },
  { icon: <Fingerprint className="w-4 h-4" />,title: "TypeScript",            desc: "Vollständig typisiert",           lightBg: "#F4F4F4", darkBg: "#2A2A2A", fg: "#0A0A0A", darkFg: "#F5F5F5" },
];

const stats = [
  { value: "18",  label: "Komponenten",   suffix: "" },
  { value: "12",  label: "Graphen-Typen", suffix: "" },
  { value: "48",  label: "CSS-Variablen", suffix: "+" },
  { value: "4",   label: "Schriftschnitte", suffix: "" },
];

const codeSnippet = `import { VoltButton } from "volt-ui";

export function App() {
  return (
    <VoltButton
      variant="lime"
      rightIcon={<ArrowRight />}
    >
      Volt UI · Design Concept
    </VoltButton>
  );
}`;

export const HeroSection: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  const { darkMode } = useTheme();
  const isDark = darkMode === "dark";

  return (
    <div className="space-y-16">

      {/* ── Hero: Lime-Hintergrund mit Unsplash-Bild ── */}
      <div className="relative min-h-[75vh] rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center px-6 py-24"
        style={{ background: "#E4FF97" }}>

        {/* Unsplash-Hintergrundbild (dunkel, strukturiert) – nur im Dark-Mode sichtbar */}
        {isDark && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&fit=crop')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.18,
              mixBlendMode: "multiply",
            }}
          />
        )}

        {/* Subtile Muster-Überlagerung */}
        <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />

        {/* Schwarze Orbs (subtil) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full animate-breathe"
            style={{ background: "radial-gradient(circle, rgba(10,10,10,0.06) 0%, transparent 65%)", top: "-200px", left: "-100px" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full animate-breathe delay-200"
            style={{ background: "radial-gradient(circle, rgba(10,10,10,0.04) 0%, transparent 65%)", bottom: "-150px", right: "-100px" }} />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-display-xl text-[#0A0A0A] mb-6"
          >
            <span className="font-mono font-black opacity-100 mr-3">&gt;_</span>Volt UI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-ui text-[#0A0A0A]/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Ein portables Design-System aus Tokens, Komponenten und Mustern –
            übertragbar auf jedes Projekt. Klar, kontrastreich, terminal-inspiriert.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <VoltButton variant="solid" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={() => onNavigate("foundations")}>
              Foundations erkunden
            </VoltButton>
            <VoltButton variant="outline" size="lg" onClick={() => onNavigate("dashboard")}
              className="border-[#0A0A0A]/30 text-[#0A0A0A] hover:bg-[#0A0A0A]/8">
              Dashboard ansehen
            </VoltButton>
          </motion.div>
        </motion.div>

        {/* Stats-Leiste unten */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-display font-black text-2xl text-[#0A0A0A] leading-none">
                {s.value}{s.suffix}
              </p>
              <p className="text-[0.65rem] font-mono text-[#0A0A0A]/50 mt-0.5 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Intro-Panel: Was ist Volt UI? ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="rounded-2xl border border-border bg-card overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Was ist Volt UI */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
                <span className="text-primary font-mono text-xs font-bold">&gt;_</span>
              </div>
              <p className="section-label">Was ist Volt UI?</p>
            </div>
            <p className="font-display font-bold text-xl text-card-foreground leading-snug mb-3">
              Ein portables Design-System – nicht an ein Framework gebunden.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Volt UI ist eine Sammlung aus Design-Tokens, Komponenten und Mustern, die sich in jedes Projekt importieren lässt – ob React, plain HTML, Claude Code oder Figma.
            </p>
          </div>
          {/* Wofür */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <Workflow className="w-3 h-3 text-primary-foreground" />
              </div>
              <p className="section-label">Wofür?</p>
            </div>
            <p className="font-display font-bold text-xl text-card-foreground leading-snug mb-3">
              Konsistenz über alle Projekte hinweg.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Alle Projekte im Free-Agents-Ökosystem teilen dieselbe visuelle Sprache: Lime + Schwarz, Space Grotesk, das &gt;_ Signet und die Volt-Textur.
            </p>
          </div>
          {/* Wie */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center">
                <Package className="w-3 h-3 text-secondary-foreground" />
              </div>
              <p className="section-label">Wie importieren?</p>
            </div>
            <p className="font-display font-bold text-xl text-card-foreground leading-snug mb-3">
              Eine CSS-Datei. Fertig.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <code className="font-mono text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">volt-ui.css</code> einbinden, Klassen verwenden – keine Build-Tools, kein Framework nötig.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Feature Grid ── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <p className="section-label">Was ist drin</p>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <VoltCard className="p-4 hover:-translate-y-0.5 transition-transform duration-200">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: isDark ? f.darkBg : f.lightBg,
                    color: isDark ? (f.darkFg || f.fg) : f.fg,
                  }}>
                  {f.icon}
                </div>
                <p className="font-display font-bold text-sm text-card-foreground mb-0.5">{f.title}</p>
                <p className="text-[0.65rem] font-ui text-muted-foreground leading-snug">{f.desc}</p>
              </VoltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Code-Snippet + CTA ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code – bleibt immer dunkel */}
        <div className="rounded-2xl bg-[#0A0A0A] p-6 overflow-hidden">
          <div className="flex items-center gap-1.5 mb-4">
            {["#E8402A","#E4FF97","#1A9E5A"].map((c,i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
            <span className="ml-2 text-[0.6rem] font-mono text-white/30">volt-ui · example.tsx</span>
          </div>
          <pre className="text-xs font-mono text-white/80 leading-relaxed overflow-x-auto whitespace-pre-wrap">
            <code>{codeSnippet}</code>
          </pre>
        </div>

        {/* CTA: Lime-Card (bleibt Lime in beiden Modi) */}
        <div className="rounded-2xl p-8 flex flex-col justify-between"
          style={{ background: "#E4FF97" }}>
          <div>
            <p className="font-display font-black text-2xl text-[#0A0A0A] leading-tight mb-3">
              Von Tokens zu<br />fertigen Komponenten
            </p>
            <p className="font-ui text-[#0A0A0A]/60 text-sm leading-relaxed">
              Portables Design-System mit semantischen Farben,
              präziser Typografie und atmosphärischer Textur –
              importierbar in jedes Projekt.
            </p>
          </div>
          <VoltButton variant="solid" size="lg" className="mt-6 w-fit" onClick={() => onNavigate("foundations")}>
            Jetzt starten
          </VoltButton>
        </div>
      </div>

    </div>
  );
};
