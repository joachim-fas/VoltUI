/**
 * Volt UI – Template Showcase Index
 * Übersicht aller verfügbaren Seiten-Templates
 * Route: /showcase
 */
import { Link } from "wouter";
import { VoltBadge } from "@/components/volt/VoltBadge";
import {
  LayoutDashboard, Globe, CreditCard, LogIn, Inbox,
  ArrowRight, Terminal,
} from "lucide-react";

interface TemplateCard {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge: string;
  badgeVariant?: "default" | "solid" | "outline" | "positive" | "negative" | "muted" | "glass" | "neutral" | "blue" | "red";
  bg: string;
}

const templates: TemplateCard[] = [
  {
    title: "SaaS Landing Page",
    description: "Hero, Feature-Grid, Testimonials, CTA-Banner – vollständige Marketing-Seite für ein SaaS-Produkt.",
    href: "/showcase/landing",
    icon: <Globe className="w-6 h-6" />,
    badge: "Marketing",
    badgeVariant: "muted",
    bg: "bg-[#E4FF97]",
  },
  {
    title: "Analytics Dashboard",
    description: "KPI-Karten, Linien- und Balkendiagramme, Tabelle, Sidebar-Navigation – klassisches Admin-Panel.",
    href: "/showcase/dashboard",
    icon: <LayoutDashboard className="w-6 h-6" />,
    badge: "Dashboard",
    badgeVariant: "solid",
    bg: "bg-[#0A0A0A]",
  },
  {
    title: "Pricing Page",
    description: "3-Spalten-Preisvergleich mit Feature-Liste, monatlich/jährlich-Toggle und CTA.",
    href: "/showcase/pricing",
    icon: <CreditCard className="w-6 h-6" />,
    badge: "Marketing",
    badgeVariant: "blue",
    bg: "bg-[#D4E8FF]",
  },
  {
    title: "Login & Auth",
    description: "Sign-in, Sign-up und Forgot-Password – alle drei Auth-Screens in einem Template.",
    href: "/showcase/auth",
    icon: <LogIn className="w-6 h-6" />,
    badge: "App",
    badgeVariant: "outline",
    bg: "bg-[#FDE2FF]",
  },
  {
    title: "Empty States",
    description: "Sammlung von leeren Zuständen: keine Daten, Fehler, Suche ohne Ergebnis, Onboarding.",
    href: "/showcase/empty-states",
    icon: <Inbox className="w-6 h-6" />,
    badge: "UI Pattern",
    badgeVariant: "outline",
    bg: "bg-[#C3F4D3]",
  },
];

export default function ShowcaseIndex() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-[#E4FF97]" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight">volt ui</span>
            <span className="text-muted-foreground text-sm">/</span>
            <span className="text-muted-foreground text-sm">Templates</span>
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            ← Zurück zur Hauptseite
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <VoltBadge variant="default" size="sm" className="mb-4">Seiten-Templates</VoltBadge>
        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4">
          Template Showcase
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Vollständige Seiten-Templates, gebaut mit Volt UI Komponenten.
          Jedes Template ist sofort einsetzbar und vollständig anpassbar.
        </p>
      </section>

      {/* Template Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <Link key={t.href} href={t.href}>
              <div className="group border border-border rounded-2xl overflow-hidden hover:border-foreground/30 hover:shadow-lg transition-all duration-200 cursor-pointer bg-card">
                {/* Preview Thumbnail */}
                <div className={`${t.bg} h-40 flex items-center justify-center`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${t.bg === "bg-[#0A0A0A]" ? "bg-white/10 text-white" : "bg-black/10 text-black"}`}>
                    {t.icon}
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-bold text-base leading-tight">{t.title}</h3>
                    <VoltBadge variant={t.badgeVariant ?? "outline"} size="sm">{t.badge}</VoltBadge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.description}</p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:gap-2.5 transition-all">
                    Template öffnen <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
