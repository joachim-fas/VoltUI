/**
 * Volt UI – Bitpanda Trading Co-Pilot Template
 * Route: /showcase/bitpanda
 *
 * Designprinzip: Der KI-Co-Pilot ANALYSIERT und SCHLÄGT VOR – aber jeder
 * Trade wird ausschließlich vom Menschen bestätigt und ausgelöst.
 * Keine autonome Ausführung, keine echten Orders. Reines UI-Mockup mit Beispieldaten.
 */
import { useState } from "react";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltStat } from "@/components/volt/VoltStat";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltTable, VoltTableColumn } from "@/components/volt/VoltTable";
import { VoltProgress } from "@/components/volt/VoltProgress";
import { VoltAreaChart, VoltDonutChart } from "@/components/volt/VoltChart";
import { VoltModal } from "@/components/volt/VoltModal";
import { VoltToggle } from "@/components/volt/VoltToggle";
import { VoltToastContainer, useVoltToast } from "@/components/volt/VoltToast";
import { TemplateShell } from "./TemplateShell";
import {
  Bot, Sparkles, ShieldCheck, TrendingUp, Wallet, Coins,
  ArrowUpRight, ArrowDownRight, Info, CheckCircle2, AlertTriangle,
  Lock, Eye, ChevronRight, Lightbulb, Hand, Bell, Clock, AlertCircle,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Beispieldaten – Portfolio
───────────────────────────────────────────────────────────────── */
const portfolioHistory = [
  { month: "Dez", wert: 21400 },
  { month: "Jan", wert: 23800 },
  { month: "Feb", wert: 22600 },
  { month: "Mär", wert: 26900 },
  { month: "Apr", wert: 28100 },
  { month: "Mai", wert: 31240 },
];

const allocationData = [
  { name: "Bitcoin",  value: 46 },
  { name: "Ethereum", value: 27 },
  { name: "Solana",   value: 12 },
  { name: "Cardano",  value: 7 },
  { name: "Cash (€)", value: 8 },
];

interface Holding extends Record<string, unknown> {
  asset: string;
  symbol: string;
  dot: string;
  bestand: string;
  kurs: string;
  wert: string;
  change: number;
  allokation: number;
}

const holdings: Holding[] = [
  { asset: "Bitcoin",  symbol: "BTC", dot: "#F7931A", bestand: "0,2140",  kurs: "€ 67.120", wert: "€ 14.364", change: 2.4,  allokation: 46 },
  { asset: "Ethereum", symbol: "ETH", dot: "#627EEA", bestand: "2,840",   kurs: "€ 2.970",  wert: "€ 8.435",  change: 1.1,  allokation: 27 },
  { asset: "Solana",   symbol: "SOL", dot: "#14F195", bestand: "31,50",   kurs: "€ 119,0",  wert: "€ 3.749",  change: -3.2, allokation: 12 },
  { asset: "Cardano",  symbol: "ADA", dot: "#0033AD", bestand: "4.900",   kurs: "€ 0,446",  wert: "€ 2.185",  change: 0.6,  allokation: 7 },
  { asset: "Cash",     symbol: "EUR", dot: "#9AA0A6", bestand: "—",       kurs: "—",        wert: "€ 2.507",  change: 0,    allokation: 8 },
];

const holdingColumns: VoltTableColumn<Holding>[] = [
  {
    key: "asset", header: "Asset",
    render: (_, row) => (
      <div className="flex items-center gap-2.5">
        <span className="w-7 h-7 rounded-full flex items-center justify-center text-[0.6rem] font-bold text-white flex-shrink-0"
          style={{ backgroundColor: row.dot }}>
          {row.symbol.slice(0, 3)}
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{row.asset}</div>
          <div className="text-[0.7rem] text-muted-foreground font-mono">{row.symbol}</div>
        </div>
      </div>
    ),
  },
  { key: "bestand", header: "Bestand", align: "right" },
  { key: "kurs", header: "Kurs", align: "right" },
  { key: "wert", header: "Wert", align: "right" },
  {
    key: "change", header: "24h", align: "right",
    render: (v) => {
      const n = v as number;
      if (n === 0) return <span className="text-muted-foreground text-sm">±0,0%</span>;
      const up = n > 0;
      return (
        <span className={`inline-flex items-center gap-1 text-sm font-semibold ${up ? "text-[#1A9E5A]" : "text-[#E8402A]"}`}>
          {up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {up ? "+" : ""}{n.toFixed(1)}%
        </span>
      );
    },
  },
];

/* ─────────────────────────────────────────────────────────────────
   Beispieldaten – Co-Pilot-Vorschläge
───────────────────────────────────────────────────────────────── */
type Action = "buy" | "sell" | "rebalance";

interface Suggestion {
  id: string;
  action: Action;
  asset: string;
  symbol: string;
  dot: string;
  headline: string;
  size: string;
  rationale: string[];
  confidence: number;
  horizon: string;
  risk: "Niedrig" | "Mittel" | "Hoch";
}

const suggestions: Suggestion[] = [
  {
    id: "s1",
    action: "rebalance",
    asset: "Solana",
    symbol: "SOL",
    dot: "#14F195",
    headline: "SOL-Position auf Zielgewichtung trimmen",
    size: "Verkauf ~ 8,0 SOL (≈ € 952)",
    rationale: [
      "Solana liegt mit 12 % über deiner Zielallokation von 10 %.",
      "24h −3,2 %, aber 30-Tage +18 % – Teilgewinn-Mitnahme im Rahmen deiner Regeln.",
      "Erlös erhöht die Cash-Reserve für kommende Nachkäufe.",
    ],
    confidence: 72,
    horizon: "Rebalancing",
    risk: "Niedrig",
  },
  {
    id: "s2",
    action: "buy",
    asset: "Bitcoin",
    symbol: "BTC",
    dot: "#F7931A",
    headline: "BTC-Sparrate per Limit-Order nachkaufen",
    size: "Kauf € 500 · Limit € 65.800",
    rationale: [
      "Kurs nahe dem von dir definierten Support-Band (€ 64–66k).",
      "Passt zu deinem monatlichen DCA-Plan (noch offen für Mai).",
      "Limit-Order statt Market – du zahlst nicht über deinem Zielpreis.",
    ],
    confidence: 64,
    horizon: "Langfristig (DCA)",
    risk: "Mittel",
  },
  {
    id: "s3",
    action: "sell",
    asset: "Cardano",
    symbol: "ADA",
    dot: "#0033AD",
    headline: "ADA-Stop-Loss-Hinweis prüfen",
    size: "Stop bei € 0,41 (−8 %) erwägen",
    rationale: [
      "ADA seitwärts, Momentum schwächer als der Rest des Portfolios.",
      "Ein definierter Stop begrenzt das Abwärtsrisiko der Position.",
      "Reiner Vorschlag – keine automatische Auslösung.",
    ],
    confidence: 48,
    horizon: "Risikomanagement",
    risk: "Hoch",
  },
];

const actionMeta: Record<Action, { label: string; badge: "positive" | "negative" | "neutral"; icon: React.ReactNode }> = {
  buy:       { label: "Kauf-Vorschlag",       badge: "positive", icon: <ArrowUpRight className="w-3.5 h-3.5" /> },
  sell:      { label: "Verkauf-Vorschlag",    badge: "negative", icon: <ArrowDownRight className="w-3.5 h-3.5" /> },
  rebalance: { label: "Rebalancing-Vorschlag", badge: "neutral",  icon: <TrendingUp className="w-3.5 h-3.5" /> },
};

const riskColor: Record<Suggestion["risk"], "positive" | "neutral" | "negative"> = {
  Niedrig: "positive",
  Mittel: "neutral",
  Hoch: "negative",
};

/* ─────────────────────────────────────────────────────────────────
   Beispieldaten – Entscheidungs-Alerts
   Jeder Alert verlangt eine Entscheidung von dir; nichts läuft automatisch.
───────────────────────────────────────────────────────────────── */
type Severity = "critical" | "warning" | "info";

interface AlertOption {
  label: string;
  variant: "primary" | "outline" | "ghost" | "destructive";
}

interface DecisionAlert {
  id: string;
  severity: Severity;
  title: string;
  detail: string;
  time: string;
  options: AlertOption[];
}

const decisionAlerts: DecisionAlert[] = [
  {
    id: "a1",
    severity: "critical",
    title: "ADA hat deine Stop-Loss-Schwelle berührt",
    detail: "Cardano fiel auf € 0,41 (−8 %). Du hattest dir hier eine Entscheidung vorgemerkt.",
    time: "vor 4 Min.",
    options: [
      { label: "Position verkaufen", variant: "destructive" },
      { label: "Halten & Schwelle senken", variant: "outline" },
      { label: "Ignorieren", variant: "ghost" },
    ],
  },
  {
    id: "a2",
    severity: "warning",
    title: "BTC unter deinem DCA-Limit (€ 65.800)",
    detail: "Bitcoin notiert bei € 67.120, nähert sich deinem Nachkauf-Band. Sparrate für Mai noch offen.",
    time: "vor 22 Min.",
    options: [
      { label: "€ 500 nachkaufen", variant: "primary" },
      { label: "Limit-Order setzen", variant: "outline" },
      { label: "Abwarten", variant: "ghost" },
    ],
  },
  {
    id: "a3",
    severity: "warning",
    title: "Solana über Zielallokation",
    detail: "SOL liegt bei 12 % statt deiner Ziel-10 %. Rebalancing zur Wiederherstellung möglich.",
    time: "vor 1 Std.",
    options: [
      { label: "Jetzt rebalancen", variant: "primary" },
      { label: "Ignorieren", variant: "ghost" },
    ],
  },
  {
    id: "a4",
    severity: "info",
    title: "Monatliche Sparrate fällig (Mai)",
    detail: "Dein wiederkehrender Plan über € 500 wartet auf deine Freigabe.",
    time: "Heute",
    options: [
      { label: "Freigeben", variant: "primary" },
      { label: "Diesen Monat überspringen", variant: "outline" },
    ],
  },
];

const severityMeta: Record<Severity, {
  label: string;
  badge: "negative" | "neutral" | "muted";
  icon: React.ReactNode;
  ring: string;
}> = {
  critical: { label: "Kritisch", badge: "negative", icon: <AlertCircle className="w-4 h-4" />, ring: "border-l-[#E8402A]" },
  warning:  { label: "Achtung",  badge: "neutral",  icon: <AlertTriangle className="w-4 h-4" />, ring: "border-l-amber-500" },
  info:     { label: "Info",     badge: "muted",    icon: <Info className="w-4 h-4" />, ring: "border-l-[#7BBCF5]" },
};

/* ─────────────────────────────────────────────────────────────────
   Seite
───────────────────────────────────────────────────────────────── */
export default function BitpandaTemplate() {
  const [active, setActive] = useState<Suggestion | null>(null);
  const [checked, setChecked] = useState(false);
  const [autopilot, setAutopilot] = useState(false);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [activeAlert, setActiveAlert] = useState<DecisionAlert | null>(null);
  const [resolvedAlerts, setResolvedAlerts] = useState<string[]>([]);
  const { toasts, add, dismiss } = useVoltToast();

  const openReview = (s: Suggestion) => {
    setChecked(false);
    setActive(s);
  };

  const confirmOrder = () => {
    if (!active) return;
    add({
      title: "Order von dir bestätigt",
      description: `${active.headline} – im Demo-Modus übernommen.`,
      variant: "success",
    });
    setDismissed((d) => [...d, active.id]);
    setActive(null);
  };

  const declineSuggestion = (s: Suggestion) => {
    setDismissed((d) => [...d, s.id]);
    add({ title: "Vorschlag verworfen", description: s.headline, variant: "info" });
  };

  const decideAlert = (alert: DecisionAlert, option: AlertOption) => {
    setResolvedAlerts((r) => [...r, alert.id]);
    add({
      title: `Entscheidung getroffen: ${option.label}`,
      description: alert.title,
      variant: option.variant === "destructive" ? "warning" : "success",
    });
    setActiveAlert(null);
  };

  const visible = suggestions.filter((s) => !dismissed.includes(s.id));
  const openAlerts = decisionAlerts.filter((a) => !resolvedAlerts.includes(a.id));

  return (
    <TemplateShell title="Bitpanda Co-Pilot" category="Finance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── Human-in-the-Loop Banner ── */}
        <div className="rounded-2xl border border-border bg-[#E4FF97]/25 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2.5 flex-1">
            <span className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center flex-shrink-0">
              <Hand className="w-4 h-4 text-[#E4FF97]" />
            </span>
            <div className="leading-snug">
              <p className="text-sm font-bold">Der Co-Pilot schlägt vor – du entscheidest.</p>
              <p className="text-xs text-muted-foreground">
                Kein Trade wird automatisch ausgeführt. Jede Order bestätigst du selbst. Keine Anlageberatung.
              </p>
            </div>
          </div>
          <VoltBadge variant="outline" size="sm" className="self-start sm:self-center">
            <Eye className="w-3 h-3" /> Demo · Beispieldaten
          </VoltBadge>
        </div>

        {/* ── KPI Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <VoltStat label="Portfoliowert" value="€ 31.240" change={11.2} changeLabel="30 T" variant="lime" icon={<Wallet className="w-4 h-4" />} />
          <VoltStat label="24h-Veränderung" value="+ € 412" change={1.3} variant="default" icon={<TrendingUp className="w-4 h-4" />} />
          <VoltStat label="Investiert" value="€ 24.000" variant="default" icon={<Coins className="w-4 h-4" />} />
          <VoltStat label="Nicht real. G/V" value="+ € 7.240" change={30.2} variant="positive" icon={<Sparkles className="w-4 h-4" />} />
        </div>

        {/* ── Entscheidungs-Alerts ── */}
        <VoltCard variant="default" className="p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <span className="relative w-8 h-8 rounded-xl bg-foreground flex items-center justify-center">
                <Bell className="w-4 h-4 text-[#E4FF97]" />
                {openAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#E8402A] text-white text-[0.6rem] font-bold flex items-center justify-center">
                    {openAlerts.length}
                  </span>
                )}
              </span>
              <div>
                <h3 className="font-display font-bold text-sm">Entscheidungs-Alerts</h3>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Ereignisse, die deine Entscheidung brauchen
                </p>
              </div>
            </div>
            {openAlerts.length > 0 && (
              <VoltBadge variant="negative" size="sm" dot>{openAlerts.length} offen</VoltBadge>
            )}
          </div>

          <div className="divide-y divide-border">
            {openAlerts.map((a) => {
              const meta = severityMeta[a.severity];
              return (
                <div key={a.id} className={`flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-l-4 ${meta.ring}`}>
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className={`flex-shrink-0 mt-0.5 ${
                      a.severity === "critical" ? "text-[#E8402A]" : a.severity === "warning" ? "text-amber-600" : "text-[#7BBCF5]"
                    }`}>
                      {meta.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold leading-snug">{a.title}</p>
                        <VoltBadge variant={meta.badge} size="sm">{meta.label}</VoltBadge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-snug">{a.detail}</p>
                      <span className="inline-flex items-center gap-1 text-[0.7rem] text-muted-foreground mt-1.5">
                        <Clock className="w-3 h-3" /> {a.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 sm:pl-2">
                    <VoltButton
                      variant="primary"
                      size="sm"
                      rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                      onClick={() => setActiveAlert(a)}
                    >
                      Entscheiden
                    </VoltButton>
                    <VoltButton
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setResolvedAlerts((r) => [...r, a.id]);
                        add({ title: "Alert auf später verschoben", description: a.title, variant: "info" });
                      }}
                    >
                      Später
                    </VoltButton>
                  </div>
                </div>
              );
            })}

            {openAlerts.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-2">
                <CheckCircle2 className="w-8 h-8 text-[#1A9E5A]" />
                <p className="text-sm font-semibold">Keine offenen Entscheidungen</p>
                <p className="text-xs text-muted-foreground">Du bist auf dem aktuellen Stand. Neue Alerts erscheinen hier.</p>
              </div>
            )}
          </div>
        </VoltCard>

        {/* ── Chart + Allocation ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <VoltAreaChart
              data={portfolioHistory}
              dataKeys={["wert"]}
              xKey="month"
              title="Portfolio-Entwicklung"
              subtitle="Letzte 6 Monate · in EUR"
              gradient
              height={260}
            />
          </div>
          <VoltDonutChart
            data={allocationData}
            title="Allokation"
            subtitle="Aktuelle Gewichtung"
            innerLabel="Assets"
            innerValue="5"
            height={260}
          />
        </div>

        {/* ── Co-Pilot Vorschläge ── */}
        <VoltCard variant="default" className="p-0 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-foreground flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#E4FF97]" />
              </span>
              <div>
                <h3 className="font-display font-bold text-sm">Co-Pilot-Vorschläge</h3>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {visible.length} offene Empfehlungen · zur Prüfung durch dich
                </p>
              </div>
            </div>

            {/* Auto-Pilot Toggle – bewusst deaktiviert */}
            <div className="flex items-center gap-2.5 rounded-xl border border-border px-3 py-2">
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground">Auto-Trading</span>
              <VoltToggle
                checked={autopilot}
                onChange={() => {
                  setAutopilot(false);
                  add({
                    title: "Auto-Trading nicht verfügbar",
                    description: "Aus Sicherheitsgründen deaktiviert – du bestätigst jeden Trade selbst.",
                    variant: "warning",
                  });
                }}
              />
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visible.map((s) => {
              const meta = actionMeta[s.action];
              return (
                <div key={s.id} className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
                  {/* Head */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-[0.6rem] font-bold text-white"
                        style={{ backgroundColor: s.dot }}>
                        {s.symbol.slice(0, 3)}
                      </span>
                      <div className="leading-tight">
                        <div className="text-sm font-bold">{s.asset}</div>
                        <div className="text-[0.7rem] text-muted-foreground font-mono">{s.symbol}</div>
                      </div>
                    </div>
                    <VoltBadge variant={meta.badge} size="sm">
                      {meta.icon} {meta.label}
                    </VoltBadge>
                  </div>

                  {/* Headline + Size */}
                  <div>
                    <p className="text-sm font-semibold leading-snug">{s.headline}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{s.size}</p>
                  </div>

                  {/* Rationale */}
                  <ul className="space-y-1.5">
                    {s.rationale.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-snug">
                        <Lightbulb className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-foreground/50" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Confidence */}
                  <div>
                    <VoltProgress
                      value={s.confidence}
                      variant={s.confidence >= 65 ? "positive" : s.confidence >= 50 ? "neutral" : "negative"}
                      size="md"
                      label="Modell-Konfidenz"
                      showValue
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <VoltBadge variant="muted" size="sm">{s.horizon}</VoltBadge>
                    <VoltBadge variant={riskColor[s.risk]} size="sm">Risiko: {s.risk}</VoltBadge>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-auto pt-1">
                    <VoltButton
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                      onClick={() => openReview(s)}
                    >
                      Prüfen & bestätigen
                    </VoltButton>
                    <VoltButton variant="ghost" size="sm" onClick={() => declineSuggestion(s)}>
                      Verwerfen
                    </VoltButton>
                  </div>
                </div>
              );
            })}

            {visible.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center text-center py-12 gap-2">
                <CheckCircle2 className="w-8 h-8 text-[#1A9E5A]" />
                <p className="text-sm font-semibold">Alle Vorschläge bearbeitet</p>
                <p className="text-xs text-muted-foreground">Der Co-Pilot meldet sich, sobald es Neues gibt.</p>
              </div>
            )}
          </div>
        </VoltCard>

        {/* ── Holdings ── */}
        <VoltCard variant="default" className="p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="font-display font-bold text-sm">Bestände</h3>
              <p className="text-muted-foreground text-xs mt-0.5">5 Positionen · Bitpanda-Konto (Demo)</p>
            </div>
            <VoltBadge variant="positive" size="sm" dot>Verbunden</VoltBadge>
          </div>
          <VoltTable columns={holdingColumns} data={holdings} hoverable />
        </VoltCard>

      </div>

      {/* Toasts */}
      <VoltToastContainer toasts={toasts} onDismiss={dismiss} position="top-right" />

      {/* ── Bestätigungs-Modal: du löst aus ── */}
      <VoltModal
        open={active !== null}
        onClose={() => setActive(null)}
        title="Order prüfen & bestätigen"
        description="Du behältst die Kontrolle – nichts wird ohne deine ausdrückliche Bestätigung ausgeführt."
        size="md"
        footer={
          <div className="flex gap-2 justify-end w-full">
            <VoltButton variant="ghost" size="sm" onClick={() => setActive(null)}>Abbrechen</VoltButton>
            <VoltButton
              variant="primary"
              size="sm"
              disabled={!checked}
              leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
              onClick={confirmOrder}
            >
              Order absenden
            </VoltButton>
          </div>
        }
      >
        {active && (
          <div className="space-y-4">
            {/* Zusammenfassung */}
            <div className="rounded-xl border border-border p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Aktion</span>
                <VoltBadge variant={actionMeta[active.action].badge} size="sm">
                  {actionMeta[active.action].icon} {actionMeta[active.action].label}
                </VoltBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Asset</span>
                <span className="text-sm font-semibold">{active.asset} ({active.symbol})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Order</span>
                <span className="text-sm font-mono">{active.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Konfidenz / Risiko</span>
                <span className="text-sm font-semibold">{active.confidence}% · {active.risk}</span>
              </div>
            </div>

            {/* Hinweis */}
            <div className="flex items-start gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-snug">
                Demo-Modus: Es wird keine echte Order an Bitpanda gesendet. Dies ist keine Anlageberatung –
                die finale Entscheidung und Verantwortung liegen bei dir.
              </p>
            </div>

            {/* Bestätigung */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#E4FF97] cursor-pointer"
              />
              <span className="text-xs text-foreground leading-snug">
                Ich habe den Vorschlag geprüft und möchte diese Order selbst auslösen.
              </span>
            </label>
          </div>
        )}
      </VoltModal>

      {/* ── Decision-Modal: du wählst die Reaktion auf einen Alert ── */}
      <VoltModal
        open={activeAlert !== null}
        onClose={() => setActiveAlert(null)}
        title="Deine Entscheidung"
        description="Wähle, wie du auf diesen Alert reagieren möchtest. Es wird nur das ausgeführt, was du auswählst."
        size="md"
      >
        {activeAlert && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-border p-4">
              <span className={`flex-shrink-0 mt-0.5 ${
                activeAlert.severity === "critical" ? "text-[#E8402A]" : activeAlert.severity === "warning" ? "text-amber-600" : "text-[#7BBCF5]"
              }`}>
                {severityMeta[activeAlert.severity].icon}
              </span>
              <div>
                <p className="text-sm font-semibold leading-snug">{activeAlert.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{activeAlert.detail}</p>
              </div>
            </div>

            <div className="space-y-2">
              {activeAlert.options.map((opt) => (
                <VoltButton
                  key={opt.label}
                  variant={opt.variant}
                  size="md"
                  className="w-full justify-between"
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                  onClick={() => decideAlert(activeAlert, opt)}
                >
                  {opt.label}
                </VoltButton>
              ))}
            </div>

            <p className="text-[0.7rem] text-muted-foreground text-center leading-snug">
              Demo-Modus · keine echte Order · keine Anlageberatung
            </p>
          </div>
        )}
      </VoltModal>
    </TemplateShell>
  );
}
