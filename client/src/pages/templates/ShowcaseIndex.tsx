/**
 * Volt UI – Template Showcase Index
 * Übersicht aller verfügbaren Seiten-Templates
 * Route: /showcase
 */
import { Link } from "wouter";
import { VoltBadge } from "@/components/volt/VoltBadge";
import {
  LayoutDashboard, Globe, CreditCard, LogIn, Inbox,
  ArrowRight, Terminal, ArrowLeft, Layers,
} from "lucide-react";

interface TemplateCard {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge: string;
  badgeVariant?: "default" | "solid" | "outline" | "positive" | "negative" | "muted" | "glass" | "neutral" | "blue" | "red";
  /** Tailwind-Klassen für den Vorschau-Bereich */
  previewClass: string;
  /** Icon-Farbe im Vorschau-Bereich */
  iconClass: string;
}

const templates: TemplateCard[] = [
  {
    title: "SaaS Landing Page",
    description: "Hero, Feature-Grid, Testimonials, CTA-Banner – vollständige Marketing-Seite für ein SaaS-Produkt.",
    href: "/showcase/landing",
    icon: <Globe className="w-7 h-7" />,
    badge: "Marketing",
    badgeVariant: "default",
    previewClass: "bg-[#E4FF97]",
    iconClass: "bg-[#0A0A0A] text-[#E4FF97]",
  },
  {
    title: "Analytics Dashboard",
    description: "KPI-Karten, Charts, Tabelle, Sidebar-Navigation – klassisches Admin-Panel mit Volt UI.",
    href: "/showcase/dashboard",
    icon: <LayoutDashboard className="w-7 h-7" />,
    badge: "Dashboard",
    badgeVariant: "solid",
    previewClass: "bg-[#0A0A0A]",
    iconClass: "bg-[#E4FF97] text-[#0A0A0A]",
  },
  {
    title: "Pricing Page",
    description: "3-Spalten-Preisvergleich mit Feature-Tabelle, monatlich/jährlich-Toggle und CTA.",
    href: "/showcase/pricing",
    icon: <CreditCard className="w-7 h-7" />,
    badge: "Marketing",
    badgeVariant: "blue",
    previewClass: "bg-[#DBEAFE]",
    iconClass: "bg-[#1D4ED8] text-white",
  },
  {
    title: "Login & Auth",
    description: "Sign-in, Sign-up und Forgot-Password – alle drei Auth-Screens in einem Template.",
    href: "/showcase/auth",
    icon: <LogIn className="w-7 h-7" />,
    badge: "App",
    badgeVariant: "outline",
    previewClass: "bg-[#F3E8FF]",
    iconClass: "bg-[#7C3AED] text-white",
  },
  {
    title: "Empty States",
    description: "8 leere Zustände: keine Daten, Fehler, Suche ohne Ergebnis, Offline, Onboarding u.v.m.",
    href: "/showcase/empty-states",
    icon: <Inbox className="w-7 h-7" />,
    badge: "UI Pattern",
    badgeVariant: "positive",
    previewClass: "bg-[#DCFCE7]",
    iconClass: "bg-[#16A34A] text-white",
  },
];

export default function ShowcaseIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          {/* Zurück zur Hauptseite */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>volt ui</span>
          </Link>

          <span className="text-border text-lg font-light select-none">/</span>

          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Templates</span>
          </div>

          <div className="flex-1" />

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Terminal className="w-3 h-3 text-[#E4FF97]" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight hidden sm:block">volt ui</span>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="flex items-center gap-2 mb-4">
          <VoltBadge variant="default" size="sm">Seiten-Templates</VoltBadge>
          <span className="text-muted-foreground text-sm font-mono">{templates.length} verfügbar</span>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4">
          Template Showcase
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
          Vollständige Seiten-Templates, gebaut mit Volt UI Komponenten.
          Jedes Template ist sofort einsetzbar und vollständig anpassbar.
        </p>
      </section>

      {/* ── Template Grid ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((t) => (
            <Link key={t.href} href={t.href}>
              <div className="group border border-border rounded-2xl overflow-hidden hover:border-foreground/40 hover:shadow-xl transition-all duration-200 cursor-pointer bg-card">
                {/* Farbiger Vorschau-Bereich */}
                <div className={`${t.previewClass} h-36 flex items-center justify-center relative overflow-hidden`}>
                  {/* Dekoratives Raster */}
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${t.iconClass} relative z-10`}>
                    {t.icon}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-bold text-base leading-tight">{t.title}</h3>
                    <VoltBadge variant={t.badgeVariant ?? "outline"} size="sm" className="flex-shrink-0">
                      {t.badge}
                    </VoltBadge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.description}</p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:gap-3 transition-all">
                    Template öffnen
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer-Hinweis */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <p className="text-muted-foreground text-sm font-mono">
            volt ui · Template Showcase · {templates.length} Templates
          </p>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Zur Hauptseite
          </Link>
        </div>
      </section>
    </div>
  );
}
