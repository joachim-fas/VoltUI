/**
 * Volt UI – SaaS Landing Page Template
 * Route: /showcase/landing
 */
import { useState } from "react";
import { TemplateShell } from "./TemplateShell";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltAvatar } from "@/components/volt/VoltAvatar";
import {
  Zap, BarChart2, Shield, Globe, ArrowRight,
  Star, Terminal, Layers, Cpu,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Blitzschnell",
    desc: "Unter 50 ms Antwortzeit – selbst bei komplexen Abfragen. Kein Kompromiss zwischen Geschwindigkeit und Tiefe.",
  },
  {
    icon: <BarChart2 className="w-5 h-5" />,
    title: "Echtzeit-Analytics",
    desc: "Live-Dashboards mit automatischer Aggregation. Daten fließen ohne Batch-Jobs direkt in deine Visualisierungen.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Enterprise-Sicherheit",
    desc: "SOC 2 Type II, DSGVO-konform, Ende-zu-Ende-Verschlüsselung. Deine Daten bleiben deine Daten.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Global verteilt",
    desc: "12 Rechenzentren weltweit. Automatisches Failover, 99,99 % SLA – ohne Konfiguration.",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "API-first",
    desc: "REST, GraphQL und WebSocket in einem. Vollständige OpenAPI-Dokumentation und SDKs für 8 Sprachen.",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "KI-Integration",
    desc: "Eingebaute Vektorsuche, Embedding-Pipeline und LLM-Hooks. Kein separates ML-Stack nötig.",
  },
];

const TESTIMONIALS = [
  {
    name: "Lena Hoffmann",
    role: "CTO @ Finflow",
    text: "Wir haben unsere gesamte Daten-Pipeline in 3 Wochen migriert. Die Performance ist beeindruckend.",
    rating: 5,
  },
  {
    name: "Marcus Steiner",
    role: "Head of Engineering @ Shopify Partner",
    text: "Endlich ein Tool, das mit uns skaliert. Von 10k auf 10M Events – ohne eine Zeile Infrastruktur-Code.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Data Lead @ Healthtech GmbH",
    text: "Die DSGVO-Compliance war für uns entscheidend. Volt löst das out of the box, ohne Abstriche.",
    rating: 5,
  },
];

const STATS = [
  { value: "10M+", label: "Events / Tag" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "< 50ms", label: "Latenz p99" },
  { value: "500+", label: "Kunden weltweit" },
];

export default function LandingTemplate() {
  const [annual, setAnnual] = useState(false);

  return (
    <TemplateShell title="Landing Page" category="Marketing">

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 px-6">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E4FF97]/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <VoltBadge variant="default" size="sm" className="mb-6 inline-flex">
            <Zap className="w-3 h-3" /> Neu: KI-gestützte Anomalie-Erkennung
          </VoltBadge>
          <h1 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[1.05] mb-6">
            Daten-Infrastruktur,<br />
            <span className="text-[#E4FF97] bg-foreground px-3 py-1 rounded-lg inline-block mt-2">die mitdenkt.</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Volt ist die Echtzeit-Datenplattform für moderne Teams. Ingest, Transform, Visualize –
            alles in einem Stack, ohne Ops-Overhead.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <VoltButton variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Kostenlos starten
            </VoltButton>
            <VoltButton variant="outline" size="lg">
              Demo ansehen
            </VoltButton>
          </div>
          <p className="text-muted-foreground text-sm mt-4">Keine Kreditkarte. 14 Tage kostenlos.</p>
        </div>

        {/* Stats */}
        <div className="max-w-3xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-3xl tracking-tight">{s.value}</div>
              <div className="text-muted-foreground text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <VoltBadge variant="outline" size="sm" className="mb-4">Features</VoltBadge>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-4">
              Alles, was du brauchst.<br />Nichts, was du nicht brauchst.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Kein Feature-Bloat. Jede Funktion wurde gebaut, weil echte Teams sie gebraucht haben.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <VoltCard key={f.title} variant="default" className="p-6">
                <div className="w-10 h-10 rounded-xl bg-[#E4FF97] flex items-center justify-center mb-4 text-black">
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-base mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </VoltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <VoltBadge variant="outline" size="sm" className="mb-4">Kundenstimmen</VoltBadge>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              Teams, die auf Volt vertrauen
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <VoltCard key={t.name} variant="elevated" className="p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E4FF97] text-[#E4FF97]" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 text-foreground/80">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <VoltAvatar name={t.name} size="sm" />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                </div>
              </VoltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-foreground text-background rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E4FF97]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <VoltBadge variant="default" size="sm" className="mb-6 inline-flex">
              <Zap className="w-3 h-3" /> Jetzt starten
            </VoltBadge>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-4 text-background">
              Bereit für Echtzeit-Daten?
            </h2>
            <p className="text-background/60 max-w-lg mx-auto mb-8">
              Starte kostenlos, keine Kreditkarte nötig. Upgrade jederzeit möglich.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <VoltButton variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Kostenlos starten
              </VoltButton>
              <VoltButton variant="glass" size="lg">
                Sales kontaktieren
              </VoltButton>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Terminal className="w-3 h-3 text-[#E4FF97]" />
            </div>
            <span className="font-display font-bold text-sm">volt ui</span>
          </div>
          <p className="text-muted-foreground text-sm font-mono text-xs">© 2026 Volt UI · Design Concept</p>
        </div>
      </footer>
    </TemplateShell>
  );
}
