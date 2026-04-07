/**
 * Volt UI – Pricing Page Template
 * Route: /showcase/pricing
 */
import { useState } from "react";
import { Link } from "wouter";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltToggle } from "@/components/volt/VoltToggle";
import { VoltNavbar } from "@/components/volt/VoltNavbar";
import { Check, X, Zap, Terminal, ArrowRight, HelpCircle } from "lucide-react";

interface PlanFeature {
  label: string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

const FEATURES: PlanFeature[] = [
  { label: "Events / Monat",        starter: "100k",      pro: "5M",          enterprise: "Unbegrenzt" },
  { label: "Datenspeicher",         starter: "10 GB",     pro: "500 GB",      enterprise: "Unbegrenzt" },
  { label: "API-Anfragen / Min",    starter: "100",       pro: "5.000",       enterprise: "Unbegrenzt" },
  { label: "Nutzer-Seats",          starter: "3",         pro: "25",          enterprise: "Unbegrenzt" },
  { label: "Echtzeit-Streaming",    starter: false,       pro: true,          enterprise: true },
  { label: "KI-Anomalie-Erkennung", starter: false,       pro: true,          enterprise: true },
  { label: "Custom Dashboards",     starter: "3",         pro: "Unbegrenzt",  enterprise: "Unbegrenzt" },
  { label: "Datenexport (CSV/API)", starter: true,        pro: true,          enterprise: true },
  { label: "SSO / SAML",           starter: false,       pro: false,         enterprise: true },
  { label: "SLA",                   starter: "99.5%",     pro: "99.9%",       enterprise: "99.99%" },
  { label: "Support",               starter: "Community", pro: "E-Mail",      enterprise: "Dediziert" },
  { label: "Onboarding",            starter: false,       pro: false,         enterprise: "Persönlich" },
];

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    desc: "Für Einzelpersonen und kleine Projekte.",
    monthlyPrice: 0,
    annualPrice: 0,
    cta: "Kostenlos starten",
    ctaVariant: "outline" as const,
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    desc: "Für wachsende Teams mit ernsthaften Anforderungen.",
    monthlyPrice: 99,
    annualPrice: 79,
    cta: "Pro starten",
    ctaVariant: "primary" as const,
    highlight: true,
    badge: "Beliebteste Wahl",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    desc: "Für große Organisationen mit individuellen Anforderungen.",
    monthlyPrice: 499,
    annualPrice: 399,
    cta: "Sales kontaktieren",
    ctaVariant: "solid" as const,
    highlight: false,
  },
];

function FeatureValue({ val }: { val: boolean | string }) {
  if (val === true) return <Check className="w-4 h-4 text-[var(--signal-positive)] mx-auto" />;
  if (val === false) return <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />;
  return <span className="text-sm font-medium">{val}</span>;
}

export default function PricingTemplate() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <VoltNavbar
        variant="glass"
        sticky
        logo={
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-[#E4FF97]" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight">Volt</span>
          </div>
        }
        items={[
          { label: "Produkt", href: "#" },
          { label: "Preise", href: "#" },
          { label: "Docs", href: "#" },
        ]}
        rightSlot={
          <div className="flex items-center gap-2">
            <VoltButton variant="ghost" size="sm">Anmelden</VoltButton>
            <VoltButton variant="primary" size="sm">Kostenlos starten</VoltButton>
          </div>
        }
      />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <VoltBadge variant="default" size="sm" className="mb-5 inline-flex">
          <Zap className="w-3 h-3" /> Transparente Preise
        </VoltBadge>
        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4">
          Einfach. Ehrlich. Skalierbar.
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
          Kein versteckter Overhead. Kein Lock-in. Starte kostenlos und upgrade wenn du bereit bist.
        </p>
        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-muted rounded-full px-4 py-2">
          <span className={`text-sm font-medium transition-colors ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monatlich</span>
          <VoltToggle
            checked={annual}
            onChange={(e) => setAnnual(e.target.checked)}
            variant="default"
            toggleSize="sm"
          />
          <span className={`text-sm font-medium transition-colors ${annual ? "text-foreground" : "text-muted-foreground"}`}>
            Jährlich
          </span>
          {annual && <VoltBadge variant="positive" size="sm">–20%</VoltBadge>}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border overflow-hidden transition-all ${
                  plan.highlight
                    ? "border-foreground shadow-xl scale-[1.02]"
                    : "border-border"
                }`}
              >
                {plan.highlight && (
                  <div className="bg-foreground text-[#E4FF97] text-xs font-bold text-center py-2 tracking-widest uppercase">
                    {plan.badge}
                  </div>
                )}
                <div className={`p-6 ${plan.highlight ? "bg-card" : "bg-card"}`}>
                  <h3 className="font-display font-bold text-lg mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-5">{plan.desc}</p>
                  <div className="mb-6">
                    {price === 0 ? (
                      <div className="font-display font-bold text-4xl tracking-tight">Kostenlos</div>
                    ) : (
                      <div className="flex items-end gap-1">
                        <span className="font-display font-bold text-4xl tracking-tight">€ {price}</span>
                        <span className="text-muted-foreground text-sm mb-1.5">/ Monat</span>
                      </div>
                    )}
                    {annual && price > 0 && (
                      <p className="text-muted-foreground text-xs mt-1">
                        Jährlich abgerechnet (€ {price * 12} / Jahr)
                      </p>
                    )}
                  </div>
                  <VoltButton
                    variant={plan.ctaVariant}
                    size="md"
                    className="w-full"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    {plan.cta}
                  </VoltButton>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="font-display font-bold text-2xl tracking-tight mb-6 text-center">
          Vollständiger Vergleich
        </h2>
        <VoltCard variant="default" className="overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Feature</th>
                {PLANS.map((p) => (
                  <th key={p.id} className={`text-center px-4 py-3 font-display font-bold ${p.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f, i) => (
                <tr key={f.label} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                  <td className="px-5 py-3 text-foreground/80 flex items-center gap-1.5">
                    {f.label}
                    <HelpCircle className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
                  </td>
                  <td className="px-4 py-3 text-center"><FeatureValue val={f.starter} /></td>
                  <td className="px-4 py-3 text-center bg-[#E4FF97]/5"><FeatureValue val={f.pro} /></td>
                  <td className="px-4 py-3 text-center"><FeatureValue val={f.enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </VoltCard>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-muted-foreground text-sm">Alle Preise in EUR, zzgl. MwSt.</p>
          <Link href="/showcase" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Zurück zum Showcase
          </Link>
        </div>
      </footer>
    </div>
  );
}
