/**
 * HeroSection – Grain UI
 * Weiß + Schwarz + Lime (#E4FF97) – kein Violett, kein Blau
 */

import React from "react";
import { GrainButton } from "@/components/grain/GrainButton";
import { GrainBadge } from "@/components/grain/GrainBadge";
import { GrainCard } from "@/components/grain/GrainCard";
import { motion } from "framer-motion";
import {
  ArrowRight, Code2, Palette, Zap, Layers, Package,
  BarChart2, Cpu, GitBranch,
} from "lucide-react";

const features = [
  { icon: <Palette className="w-4 h-4" />,   title: "Atmospheric Grain",  desc: "SVG-Rauschen als CSS-Textur", bg: "#E4FF97",  fg: "#0A0A0A" },
  { icon: <Code2 className="w-4 h-4" />,     title: "Reiner Code",        desc: "Kein Bild-Asset, alles CSS", bg: "#0A0A0A",  fg: "#FFFFFF" },
  { icon: <Zap className="w-4 h-4" />,       title: "Framer Motion",      desc: "Flüssige Übergänge",         bg: "#1A9E5A",  fg: "#FFFFFF" },
  { icon: <Layers className="w-4 h-4" />,    title: "Design Tokens",      desc: "OKLCH-Farbraum",             bg: "#F4F4F4",  fg: "#0A0A0A" },
  { icon: <BarChart2 className="w-4 h-4" />, title: "12 Graphen-Typen",   desc: "Recharts mit Grain-Styling", bg: "#E4FF97",  fg: "#0A0A0A" },
  { icon: <Package className="w-4 h-4" />,   title: "16 Komponenten",     desc: "Vollständige Bibliothek",    bg: "#0A0A0A",  fg: "#FFFFFF" },
  { icon: <Cpu className="w-4 h-4" />,       title: "React 19",           desc: "Modernste React-Version",    bg: "#6B7A9A",  fg: "#FFFFFF" },
  { icon: <GitBranch className="w-4 h-4" />, title: "TypeScript",         desc: "Vollständig typisiert",      bg: "#F4F4F4",  fg: "#0A0A0A" },
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
      variant="primary"
      rightIcon={<ArrowRight />}
    >
      Lime + Schwarz
    </GrainButton>
  );
}`;

export const HeroSection: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-16">

      {/* ── Hero: Lime-Hintergrund ── */}
      <div className="relative min-h-[75vh] rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center px-6 py-24"
        style={{ background: "#E4FF97" }}>

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
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <GrainBadge variant="solid" size="md" dot dotColor="#E4FF97">
              Grain UI · Component Library v3
            </GrainBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-display-xl text-[#0A0A0A] mb-6"
          >
            Design System<br />
            <span className="font-body italic font-normal">für moderne</span>{" "}
            Interfaces
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-ui text-[#0A0A0A]/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Grain UI verbindet atmosphärische Textur, präzise Typografie und
            semantische Farbcodierung zu einem kohärenten Design-System.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <GrainButton variant="solid" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={() => onNavigate("foundations")}>
              Foundations erkunden
            </GrainButton>
            <GrainButton variant="outline" size="lg" onClick={() => onNavigate("dashboard")}
              className="border-[#0A0A0A]/30 text-[#0A0A0A] hover:bg-[#0A0A0A]/8">
              Dashboard ansehen
            </GrainButton>
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

      {/* ── Feature Grid ── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <p className="section-label">Was ist drin</p>
          <div className="flex-1 h-px bg-[#E8E8E8]" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <GrainCard className="p-4 hover:-translate-y-0.5 transition-transform duration-200">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: f.bg, color: f.fg }}>
                  {f.icon}
                </div>
                <p className="font-display font-bold text-sm text-[#0A0A0A] mb-0.5">{f.title}</p>
                <p className="text-[0.65rem] font-ui text-[#6B6B6B] leading-snug">{f.desc}</p>
              </GrainCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Code-Snippet + CTA ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code */}
        <div className="rounded-2xl bg-[#0A0A0A] p-6 overflow-hidden">
          <div className="flex items-center gap-1.5 mb-4">
            {["#E8402A","#E4FF97","#1A9E5A"].map((c,i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
            <span className="ml-2 text-[0.6rem] font-mono text-white/30">grain-ui · example.tsx</span>
          </div>
          <pre className="text-xs font-mono text-white/80 leading-relaxed overflow-x-auto whitespace-pre-wrap">
            <code>{codeSnippet}</code>
          </pre>
        </div>

        {/* CTA: Lime-Card wie Figma-Referenz */}
        <div className="rounded-2xl p-8 flex flex-col justify-between"
          style={{ background: "#E4FF97" }}>
          <div>
            <p className="font-display font-black text-2xl text-[#0A0A0A] leading-tight mb-3">
              Von Tokens zu<br />fertigen Komponenten
            </p>
            <p className="font-ui text-[#0A0A0A]/60 text-sm leading-relaxed">
              Konsistentes Design-System mit semantischen Farben,
              präziser Typografie und atmosphärischer Textur.
            </p>
          </div>
          <GrainButton variant="solid" size="lg" className="mt-6 w-fit" onClick={() => onNavigate("foundations")}>
            Jetzt starten
          </GrainButton>
        </div>
      </div>

    </div>
  );
};
