/**
 * Volt UI – Pricing Page Template
 * Route: /showcase/pricing
 */
import { useState } from "react";
import { TemplateShell } from "./TemplateShell";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltToggle } from "@/components/volt/VoltToggle";
import { VoltNavbar, VoltNavItem } from "@/components/volt/VoltNavbar";
import { VoltTable, VoltTableColumn } from "@/components/volt/VoltTable";
import { VoltToastContainer, useVoltToast } from "@/components/volt/VoltToast";
import { Check, X, Zap, ArrowRight, HelpCircle, Terminal } from "lucide-react";

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

const FAQ = [
  {
    q: "Kann ich jederzeit kündigen?",
    a: "Ja. Kein Vertrag, keine Mindestlaufzeit. Du kannst monatlich kündigen.",
  },
  {
    q: "Gibt es eine Testphase?",
    a: "Der Starter-Plan ist dauerhaft kostenlos. Pro und Enterprise haben eine 14-tägige Testphase.",
  },
  {
    q: "Was passiert wenn ich mein Limit überschreite?",
    a: "Wir benachrichtigen dich bei 80 % Auslastung. Danach kannst du upgraden oder das Limit wird gedrosselt.",
  },
];

const NAV_ITEMS: VoltNavItem[] = [
  { label: "Produkt", href: "#" },
  { label: "Preise", href: "#", active: true },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
];

function FeatureValue({ val }: { val: boolean | string }) {
  if (val === true) return <Check className="w-4 h-4 text-green-600 mx-auto" />;
  if (val === false) return <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />;
  return <span className="text-sm font-medium">{val}</span>;
}

export default function PricingTemplate() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { toasts, add, dismiss } = useVoltToast();

  const Logo = (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-md bg-foreground flex items-center justify-center">
        <Terminal className="w-3.5 h-3.5 text-primary" />
      </div>
      <span className="font-display font-bold text-sm tracking-tight">volt ui</span>
    </div>
  );

  const RightSlot = (
    <div className="flex items-center gap-2">
      <VoltButton variant="ghost" size="sm">Anmelden</VoltButton>
      <VoltButton variant="primary" size="sm" onClick={() => add({ title: "Konto erstellen", description: "Weiterleitung zur Registrierung …", variant: "info" })}>Kostenlos starten</VoltButton>
    </div>
  );

  return (
    <TemplateShell title="Pricing Page" category="Marketing">

      {/* ── Seiten-Navbar ── */}
      <VoltNavbar
        logo={Logo}
        items={NAV_ITEMS}
        rightSlot={RightSlot}
        variant="glass"
        sticky
      />

      {/* ── Hero ── */}
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

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-3 bg-muted rounded-full px-4 py-2">
          <span className={`text-sm font-medium transition-colors ${!annual ? "text-foreground" : "text-muted-foreground"}`}>
            Monatlich
          </span>
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

      {/* ── Pricing Cards ── */}
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
                  <div className="bg-foreground text-primary text-xs font-bold text-center py-2 tracking-widest uppercase">
                    {plan.badge}
                  </div>
                )}
                <div className="p-6 bg-card">
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

      {/* ── Feature Comparison Table ── */}
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
                  <th
                    key={p.id}
                    className={`text-center px-4 py-3 font-display font-bold ${
                      p.highlight ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f, i) => (
                <tr
                  key={f.label}
                  className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}
                >
                  <td className="px-5 py-3 text-foreground/80">
                    <span className="flex items-center gap-1.5">
                      {f.label}
                      <HelpCircle className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center"><FeatureValue val={f.starter} /></td>
                  <td className="px-4 py-3 text-center bg-primary/5"><FeatureValue val={f.pro} /></td>
                  <td className="px-4 py-3 text-center"><FeatureValue val={f.enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </VoltCard>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="font-display font-bold text-2xl tracking-tight mb-8 text-center">
          Häufige Fragen
        </h2>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <VoltCard
              key={i}
              variant="default"
              className="p-0 overflow-hidden cursor-pointer"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex items-center justify-between px-5 py-4">
                <span className="font-semibold text-sm">{item.q}</span>
                <span className={`text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </div>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground border-t border-border pt-3">
                  {item.a}
                </div>
              )}
            </VoltCard>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Terminal className="w-3 h-3 text-primary" />
            </div>
            <span className="font-display font-bold text-sm">volt ui</span>
          </div>
          <p className="text-muted-foreground text-sm font-mono">Alle Preise in EUR, zzgl. MwSt.</p>
        </div>
      </footer>
      {/* Toast Container */}
      <VoltToastContainer toasts={toasts} onDismiss={dismiss} position="bottom-center" />
    </TemplateShell>
  );
}
