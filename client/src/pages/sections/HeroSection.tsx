/**
 * HeroSection – Grain UI v2
 * Atmospheric Design System – Startseite der Komponentenbibliothek
 * Modern, technologisch hochwertig, mit Grain-Textur und Gradient-Effekten
 */

import React from "react";
import { GrainButton } from "@/components/grain/GrainButton";
import { GrainBadge } from "@/components/grain/GrainBadge";
import { GrainCard } from "@/components/grain/GrainCard";
import { motion } from "framer-motion";
import {
  ArrowRight, Code2, Palette, Zap, Layers, Package,
  Sparkles, BarChart2, Cpu, GitBranch, LayoutDashboard,
} from "lucide-react";

const features = [
  { icon: <Palette className="w-4 h-4" />,   title: "Atmospheric Grain",  desc: "SVG-Rauschen als CSS-Textur", color: "oklch(0.42 0.22 268)" },
  { icon: <Code2 className="w-4 h-4" />,     title: "Reiner Code",        desc: "Kein Bild-Asset, alles CSS", color: "oklch(0.52 0.26 27)" },
  { icon: <Zap className="w-4 h-4" />,       title: "Framer Motion",      desc: "Flüssige Übergänge", color: "oklch(0.36 0.20 285)" },
  { icon: <Layers className="w-4 h-4" />,    title: "Design Tokens",      desc: "OKLCH-Farbraum", color: "oklch(0.68 0.18 28)" },
  { icon: <BarChart2 className="w-4 h-4" />, title: "12 Graphen-Typen",   desc: "Recharts mit Grain-Styling", color: "oklch(0.42 0.22 268)" },
  { icon: <Package className="w-4 h-4" />,   title: "16 Komponenten",     desc: "Vollständige Bibliothek", color: "oklch(0.52 0.26 27)" },
  { icon: <Cpu className="w-4 h-4" />,       title: "React 19",           desc: "Modernste React-Version", color: "oklch(0.36 0.20 285)" },
  { icon: <GitBranch className="w-4 h-4" />, title: "TypeScript",         desc: "Vollständig typisiert", color: "oklch(0.68 0.18 28)" },
];

const stats = [
  { value: "17",  label: "Komponenten",   suffix: "" },
  { value: "12",  label: "Graphen-Typen", suffix: "" },
  { value: "48",  label: "CSS-Variablen", suffix: "+" },
  { value: "0",   label: "Bild-Assets",   suffix: "" },
];

const codeSnippet = `import { GrainButton } from "grain-ui";

export function App() {
  return (
    <GrainButton
      variant="gradient"
      rightIcon={<ArrowRight />}
    >
      Atmospheric Design
    </GrainButton>
  );
}`;

export const HeroSection: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-16">

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] rounded-3xl overflow-hidden bg-grain-hero grain flex flex-col items-center justify-center text-center px-6 py-24">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[700px] h-[700px] rounded-full animate-breathe"
            style={{ background: "radial-gradient(circle, oklch(0.42 0.22 268 / 0.22) 0%, transparent 65%)", top: "-250px", left: "-150px" }} />
          <div className="absolute w-[600px] h-[600px] rounded-full animate-breathe delay-200"
            style={{ background: "radial-gradient(circle, oklch(0.52 0.26 27 / 0.18) 0%, transparent 65%)", bottom: "-200px", right: "-150px" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full animate-breathe delay-100"
            style={{ background: "radial-gradient(circle, oklch(0.36 0.20 285 / 0.12) 0%, transparent 65%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <GrainBadge variant="glass" size="md" dot dotColor="oklch(0.75 0.18 145)">
              v2.0 — Atmospheric Design System
            </GrainBadge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="font-display font-black leading-[0.9] tracking-[-0.04em] mb-8">
              <span className="block text-[clamp(4rem,12vw,8rem)] text-gradient-fire">Grain</span>
              <span className="block text-[clamp(4rem,12vw,8rem)] text-foreground">UI</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto"
          >
            Eine vollständige UI/UX Komponentenbibliothek, inspiriert von einem körnigen
            Gradienten-Bild. Alle Effekte – Grain-Textur, Glasmorphismus, atmosphärische
            Gradienten – sind reiner CSS- und React-Code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <GrainButton
              variant="gradient"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => onNavigate("foundations")}
            >
              Design System erkunden
            </GrainButton>
            <GrainButton
              variant="glass"
              size="lg"
              leftIcon={<BarChart2 className="w-5 h-5" />}
              onClick={() => onNavigate("data")}
            >
              Charts ansehen
            </GrainButton>
          </motion.div>
        </motion.div>

        {/* Floating status chips */}
        <motion.div
          initial={{ opacity: 0, x: -40, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
          className="absolute left-6 bottom-10 hidden lg:block"
        >
          <div className="glass rounded-xl px-3.5 py-2.5 shadow-lg border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.18_145)] animate-pulse" />
              <span className="text-xs font-mono text-foreground font-medium">grain.css aktiv</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
          className="absolute right-6 bottom-10 hidden lg:block"
        >
          <div className="glass rounded-xl px-3.5 py-2.5 shadow-lg border border-white/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-grain-coral" />
              <span className="text-xs font-mono text-foreground font-medium">React 19 + Tailwind 4</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
            className="relative rounded-2xl border border-border bg-card p-5 grain overflow-hidden group hover:-translate-y-0.5 transition-transform duration-300"
          >
            <div className="absolute inset-0 bg-grain-gradient-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <p className="font-display font-black text-4xl text-foreground relative z-10">
              {s.value}<span className="text-grain-blue">{s.suffix}</span>
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-1 relative z-10 tracking-wide">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Feature Grid ── */}
      <div>
        <p className="section-label text-center mb-2">Was ist Grain UI?</p>
        <h2 className="font-display font-bold text-2xl text-foreground text-center mb-8 tracking-tight">
          Ein Design System aus einem einzigen Bild
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
              className="group"
            >
              <GrainCard variant="subtle" className="h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="p-4 flex flex-col gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: f.color }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-ui font-semibold text-sm text-foreground">{f.title}</p>
                    <p className="text-[11px] text-muted-foreground font-body mt-0.5">{f.desc}</p>
                  </div>
                </div>
              </GrainCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Code Preview ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code snippet */}
        <GrainCard variant="default">
          <div className="p-5">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-mono text-muted-foreground">GrainButton.tsx</span>
            </div>
            <pre className="text-[11px] font-mono text-[oklch(0.75_0.04_268)] leading-relaxed bg-[oklch(0.12_0.025_268)] rounded-xl p-4 overflow-x-auto">
              {codeSnippet.split('\n').map((line, i) => (
                <div key={i}>
                  {line
                    .replace(/import/g, '\x00import\x00')
                    .replace(/from/g, '\x00from\x00')
                    .replace(/export/g, '\x00export\x00')
                    .replace(/function/g, '\x00function\x00')
                    .replace(/return/g, '\x00return\x00')
                    .split('\x00')
                    .map((part, j) => {
                      const keywords = ['import', 'from', 'export', 'function', 'return'];
                      if (keywords.includes(part)) return <span key={j} style={{ color: '#FA716B' }}>{part}</span>;
                      if (part.startsWith('"') || part.startsWith("'")) return <span key={j} style={{ color: '#72D44A' }}>{part}</span>;
                      return <span key={j}>{part}</span>;
                    })
                  }
                </div>
              ))}
            </pre>
          </div>
        </GrainCard>

        {/* Inspiration card */}
        <GrainCard variant="gradient" className="overflow-hidden">
          <div className="p-8 relative h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 opacity-15 pointer-events-none"
              style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
            <div>
              <p className="section-label text-white/50 mb-3">Inspiration</p>
              <h2 className="font-display font-black text-2xl md:text-3xl text-white leading-tight mb-4">
                Aus einem einzigen Bild<br />entstand ein ganzes System.
              </h2>
              <p className="font-body text-sm text-white/70 leading-relaxed">
                Das körnige Gradienten-Bild mit Tiefblau, Leuchtendem Rot und Gebrochenem Weiß
                wurde in ein vollständiges Design-System übersetzt. Farbpalette, Texturen,
                Gradienten – alles direkt aus dem Bild extrahiert und als Code implementiert.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              <GrainButton
                variant="glass"
                size="sm"
                className="text-white border-white/20"
                onClick={() => onNavigate("foundations")}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Design Tokens
              </GrainButton>
              <GrainButton
                variant="glass"
                size="sm"
                className="text-white border-white/20"
                onClick={() => onNavigate("data")}
                rightIcon={<BarChart2 className="w-3.5 h-3.5" />}
              >
                Charts
              </GrainButton>
            </div>
          </div>
        </GrainCard>
      </div>

      {/* ── Quick Navigation ── */}
      <div>
        <p className="section-label text-center mb-6">Alle Sektionen</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: "foundations", label: "Foundations",     desc: "Farben, Tokens, Typo",    icon: <Palette className="w-4 h-4" />,   color: "bg-grain-blue" },
            { id: "buttons",     label: "Buttons",          desc: "7 Varianten, 5 Größen",   icon: <Zap className="w-4 h-4" />,       color: "bg-grain-red" },
            { id: "cards",       label: "Cards & Surfaces", desc: "Cards, Badges, Alerts",   icon: <Layers className="w-4 h-4" />,    color: "bg-grain-violet" },
            { id: "forms",       label: "Forms",            desc: "Inputs, Toggles, Slider", icon: <Code2 className="w-4 h-4" />,     color: "bg-grain-coral" },
            { id: "feedback",    label: "Feedback",         desc: "Modal, Toast, Tabs",      icon: <Sparkles className="w-4 h-4" />,  color: "bg-grain-blue" },
            { id: "data",        label: "Data & Charts",    desc: "12 Graphen-Typen",        icon: <BarChart2 className="w-4 h-4" />, color: "bg-grain-gradient" },
            { id: "navigation",  label: "Navigation",       desc: "Navbar, Breadcrumb",      icon: <GitBranch className="w-4 h-4" />,       color: "bg-grain-red" },
            { id: "dashboard",   label: "Dashboard",         desc: "KPIs, Charts, Tabellen",  icon: <LayoutDashboard className="w-4 h-4" />, color: "bg-grain-gradient" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 hover:-translate-y-0.5 transition-all duration-200 text-left"
            >
              <div className={`w-8 h-8 rounded-lg ${item.color} grain flex items-center justify-center text-white flex-shrink-0`}>
                {item.icon}
              </div>
              <div>
                <p className="font-ui font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{item.label}</p>
                <p className="text-[10px] text-muted-foreground font-body mt-0.5">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
