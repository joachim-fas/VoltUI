/**
 * DashboardSection – Grain UI v3
 * Fokus: Klare Informationsvermittlung
 * Jede Kennzahl hat Kontext. Jeder Chart erklärt was er zeigt.
 * Hierarchie: Was ist wichtig → Was bedeutet es → Was tue ich damit
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from "recharts";
import {
  TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart,
  Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Search, ChevronRight, Globe,
  Package, Star, AlertCircle, CheckCircle2, Clock, Filter,
  Download, RefreshCw, Eye, Edit2, Trash2, Plus, Info,
  Target, Zap, AlertTriangle,
} from "lucide-react";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle } from "@/components/grain/GrainCard";
import { GrainBadge } from "@/components/grain/GrainBadge";
import { GrainButton } from "@/components/grain/GrainButton";

/* ── Farben ── */
const C = {
  blue:   "oklch(0.42 0.22 268)",
  violet: "oklch(0.36 0.20 285)",
  red:    "oklch(0.52 0.26 27)",
  coral:  "oklch(0.68 0.18 28)",
  teal:   "oklch(0.58 0.16 195)",
  amber:  "oklch(0.72 0.18 75)",
  green:  "oklch(0.58 0.18 145)",
};

/* ── Chart-Daten ── */
const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000, profit: 14000 },
  { month: "Feb", revenue: 51000, expenses: 31000, profit: 20000 },
  { month: "Mär", revenue: 47000, expenses: 29000, profit: 18000 },
  { month: "Apr", revenue: 63000, expenses: 35000, profit: 28000 },
  { month: "Mai", revenue: 58000, expenses: 32000, profit: 26000 },
  { month: "Jun", revenue: 72000, expenses: 38000, profit: 34000 },
  { month: "Jul", revenue: 69000, expenses: 36000, profit: 33000 },
  { month: "Aug", revenue: 84000, expenses: 41000, profit: 43000 },
];

const visitorData = [
  { day: "Mo", organic: 1200, paid: 800, direct: 400 },
  { day: "Di", organic: 1800, paid: 1100, direct: 600 },
  { day: "Mi", organic: 1400, paid: 900, direct: 500 },
  { day: "Do", organic: 2200, paid: 1400, direct: 700 },
  { day: "Fr", organic: 2600, paid: 1600, direct: 900 },
  { day: "Sa", organic: 1900, paid: 1200, direct: 650 },
  { day: "So", organic: 1100, paid: 700, direct: 350 },
];

const channelData = [
  { name: "Organisch", value: 38, color: C.blue },
  { name: "Paid",      value: 27, color: C.red },
  { name: "Social",    value: 18, color: C.teal },
  { name: "Direkt",    value: 12, color: C.amber },
  { name: "Sonstige",  value: 5,  color: C.violet },
];

const conversionData = [
  { name: "Besucher",     value: 100, fill: C.blue },
  { name: "Interessenten",value: 68,  fill: C.violet },
  { name: "Leads",        value: 42,  fill: C.teal },
  { name: "Kunden",       value: 21,  fill: C.green },
];

const performanceData = [
  { week: "KW1", target: 80, actual: 72 },
  { week: "KW2", target: 80, actual: 85 },
  { week: "KW3", target: 80, actual: 78 },
  { week: "KW4", target: 80, actual: 91 },
  { week: "KW5", target: 80, actual: 88 },
  { week: "KW6", target: 80, actual: 94 },
];

/* ── Tabellen-Daten ── */
const orders = [
  { id: "#4821", customer: "Anna Müller",   avatar: "AM", product: "Pro Plan",   amount: 299,  status: "success", date: "Heute, 14:32" },
  { id: "#4820", customer: "Ben Schmidt",   avatar: "BS", product: "Enterprise", amount: 899,  status: "pending", date: "Heute, 12:15" },
  { id: "#4819", customer: "Clara Weber",   avatar: "CW", product: "Starter",    amount: 49,   status: "success", date: "Heute, 10:08" },
  { id: "#4818", customer: "David Koch",    avatar: "DK", product: "Pro Plan",   amount: 299,  status: "failed",  date: "Gestern, 18:44" },
  { id: "#4817", customer: "Eva Braun",     avatar: "EB", product: "Enterprise", amount: 899,  status: "success", date: "Gestern, 16:22" },
  { id: "#4816", customer: "Felix Richter", avatar: "FR", product: "Pro Plan",   amount: 299,  status: "pending", date: "Gestern, 11:05" },
];

/* ── Activity-Feed ── */
const activities = [
  { icon: <Users className="w-3.5 h-3.5" />,       color: "bg-[oklch(0.42_0.22_268)]", text: "Anna Müller hat sich registriert",   time: "vor 2 Min.",  type: "user" },
  { icon: <DollarSign className="w-3.5 h-3.5" />,  color: "bg-[oklch(0.58_0.18_145)]", text: "Neue Zahlung: € 899 von Ben Schmidt", time: "vor 8 Min.",  type: "payment" },
  { icon: <AlertCircle className="w-3.5 h-3.5" />, color: "bg-[oklch(0.52_0.26_27)]",  text: "Zahlung #4818 fehlgeschlagen",        time: "vor 15 Min.", type: "error" },
  { icon: <Package className="w-3.5 h-3.5" />,     color: "bg-[oklch(0.72_0.18_75)]",  text: "Neues Paket deployt: v2.4.1",         time: "vor 32 Min.", type: "deploy" },
  { icon: <Star className="w-3.5 h-3.5" />,        color: "bg-[oklch(0.68_0.18_28)]",  text: "5-Sterne-Bewertung von Clara Weber",  time: "vor 1 Std.",  type: "review" },
  { icon: <Globe className="w-3.5 h-3.5" />,       color: "bg-[oklch(0.58_0.16_195)]", text: "Traffic-Spike: +340% aus Deutschland",time: "vor 2 Std.",  type: "traffic" },
  { icon: <CheckCircle2 className="w-3.5 h-3.5" />,color: "bg-[oklch(0.58_0.18_145)]", text: "Backup erfolgreich abgeschlossen",    time: "vor 3 Std.",  type: "system" },
];

/* ── Top-Produkte ── */
const topProducts = [
  { name: "Enterprise Plan",  revenue: 48200, growth: 12.4,  units: 54,  bar: 90 },
  { name: "Pro Plan",         revenue: 31700, growth: 8.1,   units: 106, bar: 65 },
  { name: "Starter Plan",     revenue: 12400, growth: -2.3,  units: 253, bar: 40 },
  { name: "Add-ons",          revenue: 8900,  growth: 24.7,  units: 89,  bar: 28 },
];

/* ── Ziele / Goals ── */
const goals = [
  { label: "Monatsumsatz",  current: 84000, target: 100000, color: C.blue,  unit: "€", note: "16k fehlen noch" },
  { label: "Neue Kunden",   current: 142,   target: 200,    color: C.teal,  unit: "",  note: "58 bis Monatsende" },
  { label: "NPS Score",     current: 72,    target: 80,     color: C.green, unit: "",  note: "8 Punkte Abstand" },
  { label: "Churn Rate",    current: 2.1,   target: 1.5,    color: C.amber, unit: "%", note: "Ziel: unter 1.5%" },
];

/* ── Helpers ── */
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    success: { label: "Erfolgreich", cls: "bg-[oklch(0.58_0.18_145/0.12)] text-[oklch(0.42_0.18_145)] border border-[oklch(0.58_0.18_145/0.25)]", icon: <CheckCircle2 className="w-3 h-3" /> },
    pending: { label: "Ausstehend",  cls: "bg-[oklch(0.72_0.18_75/0.12)] text-[oklch(0.50_0.18_75)] border border-[oklch(0.72_0.18_75/0.25)]",   icon: <Clock className="w-3 h-3" /> },
    failed:  { label: "Fehlerhaft",  cls: "bg-[oklch(0.52_0.26_27/0.12)] text-[oklch(0.52_0.26_27)] border border-[oklch(0.52_0.26_27/0.25)]",   icon: <AlertCircle className="w-3 h-3" /> },
  };
  const { label, cls, icon } = map[status] ?? map.pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold font-ui ${cls}`}>
      {icon}{label}
    </span>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl px-3.5 py-2.5 border border-border shadow-xl">
      <p className="text-xs font-semibold font-ui text-foreground mb-2 pb-1.5 border-b border-border">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-[11px] font-body text-muted-foreground">{p.name}</span>
          </div>
          <span className="text-[11px] font-semibold font-ui text-foreground">
            {typeof p.value === "number" && p.value > 1000 ? `€ ${(p.value / 1000).toFixed(0)}k` : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Insight-Chip: erklärt was ein Wert bedeutet ── */
const Insight: React.FC<{ text: string; type?: "positive" | "warning" | "neutral" }> = ({ text, type = "neutral" }) => {
  const styles = {
    positive: "bg-[oklch(0.58_0.18_145/0.10)] text-[oklch(0.42_0.18_145)] border-[oklch(0.58_0.18_145/0.20)]",
    warning:  "bg-[oklch(0.72_0.18_75/0.10)] text-[oklch(0.50_0.18_75)] border-[oklch(0.72_0.18_75/0.20)]",
    neutral:  "bg-muted text-muted-foreground border-border",
  };
  const icons = {
    positive: <TrendingUp className="w-3 h-3" />,
    warning:  <AlertTriangle className="w-3 h-3" />,
    neutral:  <Info className="w-3 h-3" />,
  };
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-semibold font-ui ${styles[type]}`}>
      {icons[type]}{text}
    </div>
  );
};

/* ── KPI Card mit Kontext ── */
interface KPICardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  insight: string;
  insightType: "positive" | "warning" | "neutral";
  gradient?: boolean;
  colorClass?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  label, value, change, changeLabel, icon, insight, insightType, gradient, colorClass
}) => {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div className={`relative rounded-2xl p-5 grain overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
      gradient
        ? "bg-[linear-gradient(135deg,oklch(0.42_0.22_268),oklch(0.36_0.20_285),oklch(0.52_0.26_27))] text-white"
        : colorClass
        ? `${colorClass} text-white`
        : "bg-card border border-border shadow-[0_2px_12px_oklch(0_0_0/0.06)]"
    }`}>
      {/* Radial highlight */}
      <div className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
        style={{ background: (gradient || colorClass) ? "radial-gradient(circle, oklch(1 0 0 / 0.12) 0%, transparent 70%)" : "radial-gradient(circle, oklch(0.42 0.22 268 / 0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10">
        {/* Label + Icon */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`text-[0.6rem] font-mono font-semibold uppercase tracking-[0.14em] ${(gradient || colorClass) ? "text-white/60" : "text-muted-foreground"}`}>
            {label}
          </span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${(gradient || colorClass) ? "bg-white/15" : "bg-primary/10 text-primary"}`}>
            {icon}
          </div>
        </div>

        {/* Wert – größte Schrift, sofort lesbar */}
        <p className={`font-display font-black text-3xl leading-none tracking-tight mb-2 ${(gradient || colorClass) ? "text-white" : "text-foreground"}`}>
          {value}
        </p>

        {/* Veränderung – erklärt den Trend */}
        <div className={`flex items-center gap-1 mb-3 ${(gradient || colorClass) ? "text-white/80" : isPositive ? "text-[oklch(0.50_0.18_145)]" : isNegative ? "text-[oklch(0.52_0.26_27)]" : "text-muted-foreground"}`}>
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : isNegative ? <TrendingDown className="w-3.5 h-3.5" /> : null}
          <span className="text-xs font-semibold font-ui">
            {isPositive ? "+" : ""}{change}%
          </span>
          <span className={`text-[10px] font-body ${(gradient || colorClass) ? "text-white/50" : "text-muted-foreground"}`}>
            {changeLabel}
          </span>
        </div>

        {/* Insight – erklärt was der Wert bedeutet */}
        <div className={`text-[10px] font-body leading-snug ${(gradient || colorClass) ? "text-white/60" : "text-muted-foreground"}`}>
          {insight}
        </div>
      </div>
    </div>
  );
};

/* ── Haupt-Komponente ── */
export const DashboardSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "orders">("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter(o =>
    o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.includes(searchQuery)
  );

  return (
    <div className="space-y-8">

      {/* ── Header mit Kontext ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="section-label mb-2">08 — Dashboard</p>
          <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-2">
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xl">
            Echtzeit-Überblick über Umsatz, Nutzer und Performance. Die wichtigsten Kennzahlen
            auf einen Blick – mit Kontext, Trend und Handlungsempfehlung.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <GrainButton variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Aktualisieren
          </GrainButton>
          <GrainButton variant="gradient" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export
          </GrainButton>
        </div>
      </div>

      {/* ── Tabs mit Beschreibung ── */}
      <div className="flex items-center gap-1 p-1 bg-muted rounded-xl w-fit">
        {([
          { id: "overview",   label: "Übersicht",    desc: "KPIs & Charts" },
          { id: "analytics",  label: "Analytics",    desc: "Traffic & Funnel" },
          { id: "orders",     label: "Bestellungen", desc: "Tabelle & Filter" },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-left transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xs font-semibold font-ui block">{tab.label}</span>
            <span className="text-[9px] font-mono opacity-60 block leading-tight">{tab.desc}</span>
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          TAB: OVERVIEW
      ══════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div className="space-y-6">

          {/* ── KPI-Karten mit Kontext ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-ui font-semibold text-sm text-foreground">Kennzahlen August 2025</h3>
              <span className="text-[10px] font-mono text-muted-foreground">Vergleich zum Vormonat</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {([
                {
                  label: "Gesamtumsatz",
                  value: "€ 84.200",
                  change: 12.4,
                  changeLabel: "vs. Vormonat",
                  icon: <DollarSign className="w-4 h-4" />,
                  insight: "Bestes Monatsergebnis seit Q1. Ziel: € 100k bis Monatsende.",
                  insightType: "positive" as const,
                  gradient: true,
                },
                {
                  label: "Neue Kunden",
                  value: "1.429",
                  change: 8.2,
                  changeLabel: "diese Woche",
                  icon: <Users className="w-4 h-4" />,
                  insight: "Organisches Wachstum treibt 62% der Neuregistrierungen.",
                  insightType: "positive" as const,
                  colorClass: "bg-[oklch(0.42_0.22_268)]",
                },
                {
                  label: "Konversionsrate",
                  value: "3.24%",
                  change: -0.8,
                  changeLabel: "vs. Vorwoche",
                  icon: <Activity className="w-4 h-4" />,
                  insight: "Leichter Rückgang. Checkout-Optimierung empfohlen.",
                  insightType: "warning" as const,
                },
                {
                  label: "Ø Bestellwert",
                  value: "€ 247",
                  change: 5.1,
                  changeLabel: "vs. Vormonat",
                  icon: <ShoppingCart className="w-4 h-4" />,
                  insight: "Enterprise-Upgrades erhöhen den Durchschnittswert.",
                  insightType: "positive" as const,
                },
              ] as KPICardProps[]).map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <KPICard {...kpi} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Revenue Chart + Channel Pie ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Area Chart – Umsatz */}
            <GrainCard className="lg:col-span-2">
              <GrainCardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <GrainCardTitle>Umsatz & Ausgaben</GrainCardTitle>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">
                      Jan – Aug 2025 · Monatliche Entwicklung
                    </p>
                    {/* Erklärung was der Chart zeigt */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <Insight text="Umsatz wächst schneller als Ausgaben" type="positive" />
                      <Insight text="Gewinn +18.4% vs. Vorjahr" type="positive" />
                    </div>
                  </div>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </GrainCardHeader>
              <GrainCardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={C.blue}   stopOpacity={0.3} />
                        <stop offset="95%" stopColor={C.blue}   stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={C.red}    stopOpacity={0.25} />
                        <stop offset="95%" stopColor={C.red}    stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={C.teal}   stopOpacity={0.25} />
                        <stop offset="95%" stopColor={C.teal}   stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0 0 0 / 0.05)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: "Space Grotesk", fill: "oklch(0.55 0.016 286)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fontFamily: "Space Grotesk", fill: "oklch(0.55 0.016 286)" }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10, fontFamily: "Space Grotesk" }} />
                    <Area type="monotone" dataKey="revenue"  name="Umsatz"   stroke={C.blue}   strokeWidth={2} fill="url(#gradRevenue)"  />
                    <Area type="monotone" dataKey="expenses" name="Ausgaben" stroke={C.red}    strokeWidth={2} fill="url(#gradExpenses)" />
                    <Area type="monotone" dataKey="profit"   name="Gewinn"   stroke={C.teal}   strokeWidth={2} fill="url(#gradProfit)"   />
                  </AreaChart>
                </ResponsiveContainer>
              </GrainCardContent>
            </GrainCard>

            {/* Pie Chart – Kanäle */}
            <GrainCard>
              <GrainCardHeader>
                <GrainCardTitle>Traffic-Kanäle</GrainCardTitle>
                <p className="text-xs text-muted-foreground font-body mt-0.5">
                  Woher kommen die Besucher?
                </p>
                <Insight text="Organisch dominiert mit 38%" type="positive" />
              </GrainCardHeader>
              <GrainCardContent>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie data={channelData} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="value">
                      {channelData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "oklch(1 0 0 / 0.95)", border: "1px solid oklch(0.9 0.004 286)", borderRadius: 12, fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-2">
                  {channelData.map((c) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-body text-foreground">{c.name}</span>
                          <span className="text-xs font-semibold font-ui text-foreground">{c.value}%</span>
                        </div>
                        <div className="h-1 bg-muted rounded-full mt-0.5 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${c.value}%`, background: c.color }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GrainCardContent>
            </GrainCard>
          </div>

          {/* ── Besucher + Ziele ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <GrainCard className="lg:col-span-2">
              <GrainCardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <GrainCardTitle>Besucher nach Kanal</GrainCardTitle>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">
                      Diese Woche · täglich aufgeschlüsselt
                    </p>
                    <Insight text="Freitag ist stärkster Tag (+34% vs. Montag)" type="positive" />
                  </div>
                  <GrainBadge variant="muted" size="sm">7 Tage</GrainBadge>
                </div>
              </GrainCardHeader>
              <GrainCardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={visitorData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={10} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0 0 0 / 0.05)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: "Space Grotesk", fill: "oklch(0.55 0.016 286)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fontFamily: "Space Grotesk", fill: "oklch(0.55 0.016 286)" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10, fontFamily: "Space Grotesk" }} />
                    <Bar dataKey="organic" name="Organisch" fill={C.blue}   radius={[4, 4, 0, 0]} />
                    <Bar dataKey="paid"    name="Paid"      fill={C.red}    radius={[4, 4, 0, 0]} />
                    <Bar dataKey="direct"  name="Direkt"    fill={C.teal}   radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </GrainCardContent>
            </GrainCard>

            {/* Ziele mit Kontext */}
            <GrainCard>
              <GrainCardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <GrainCardTitle>Monatsziele</GrainCardTitle>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">August 2025 · 4 Tage verbleibend</p>
                  </div>
                  <Target className="w-4 h-4 text-muted-foreground" />
                </div>
              </GrainCardHeader>
              <GrainCardContent>
                <div className="space-y-4">
                  {goals.map((g) => {
                    const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                    const isChurn = g.label === "Churn Rate";
                    const good = isChurn ? g.current <= g.target : pct >= 80;
                    return (
                      <div key={g.label}>
                        <div className="flex items-start justify-between mb-1.5 gap-2">
                          <div>
                            <span className="text-xs font-semibold font-ui text-foreground block">{g.label}</span>
                            <span className="text-[9px] font-body text-muted-foreground">{g.note}</span>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-xs font-mono text-foreground block">{g.unit}{g.current}</span>
                            <span className="text-[9px] font-mono text-muted-foreground">/ {g.unit}{g.target}</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: g.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[9px] font-mono text-muted-foreground">{pct}%</span>
                          <span className={`text-[9px] font-semibold font-ui flex items-center gap-0.5 ${good ? "text-[oklch(0.50_0.18_145)]" : "text-[oklch(0.52_0.26_27)]"}`}>
                            {good ? <><CheckCircle2 className="w-2.5 h-2.5" /> On Track</> : <><AlertTriangle className="w-2.5 h-2.5" /> Hinter Plan</>}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GrainCardContent>
            </GrainCard>
          </div>

          {/* ── Top Produkte + Activity Feed ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <GrainCard className="lg:col-span-2">
              <GrainCardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <GrainCardTitle>Top Produkte</GrainCardTitle>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">Nach Umsatz sortiert · August 2025</p>
                  </div>
                  <GrainButton variant="ghost" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                    Alle anzeigen
                  </GrainButton>
                </div>
              </GrainCardHeader>
              <GrainCardContent>
                {/* Spalten-Header */}
                <div className="grid grid-cols-12 gap-2 px-1 mb-2">
                  <span className="col-span-1 text-[9px] font-mono text-muted-foreground uppercase">#</span>
                  <span className="col-span-4 text-[9px] font-mono text-muted-foreground uppercase">Produkt</span>
                  <span className="col-span-3 text-[9px] font-mono text-muted-foreground uppercase text-right">Umsatz</span>
                  <span className="col-span-2 text-[9px] font-mono text-muted-foreground uppercase text-right">Trend</span>
                  <span className="col-span-2 text-[9px] font-mono text-muted-foreground uppercase text-right">Einheiten</span>
                </div>
                <div className="space-y-2">
                  {topProducts.map((p, i) => (
                    <div key={p.name} className="grid grid-cols-12 gap-2 items-center py-2 px-1 rounded-lg hover:bg-muted/50 transition-colors group">
                      <div className="col-span-1">
                        <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center">
                          <span className="text-[10px] font-bold font-display text-muted-foreground">{i + 1}</span>
                        </div>
                      </div>
                      <div className="col-span-4">
                        <span className="text-xs font-semibold font-ui text-foreground block truncate">{p.name}</span>
                        <div className="h-1 bg-muted rounded-full mt-1 overflow-hidden">
                          <motion.div className="h-full rounded-full bg-[oklch(0.42_0.22_268)]"
                            initial={{ width: 0 }} animate={{ width: `${p.bar}%` }} transition={{ duration: 0.7, delay: i * 0.1 }} />
                        </div>
                      </div>
                      <div className="col-span-3 text-right">
                        <span className="text-xs font-mono font-semibold text-foreground">€ {(p.revenue / 1000).toFixed(1)}k</span>
                      </div>
                      <div className="col-span-2 text-right">
                        <span className={`text-[10px] font-semibold font-ui flex items-center justify-end gap-0.5 ${p.growth > 0 ? "text-[oklch(0.50_0.18_145)]" : "text-[oklch(0.52_0.26_27)]"}`}>
                          {p.growth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(p.growth)}%
                        </span>
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="text-[10px] font-mono text-muted-foreground">{p.units}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GrainCardContent>
            </GrainCard>

            {/* Activity Feed mit Typen-Kategorisierung */}
            <GrainCard>
              <GrainCardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <GrainCardTitle>Aktivitäten</GrainCardTitle>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">Letzte 3 Stunden</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.18_145)] animate-pulse" />
                    <span className="text-[10px] font-mono text-[oklch(0.50_0.18_145)] font-semibold">Live</span>
                  </div>
                </div>
              </GrainCardHeader>
              <GrainCardContent>
                <div className="space-y-0">
                  {activities.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-start gap-2.5 py-2.5 ${i < activities.length - 1 ? "border-b border-border/50" : ""}`}
                    >
                      <div className={`w-6 h-6 rounded-lg ${a.color} flex items-center justify-center flex-shrink-0 text-white mt-0.5`}>
                        {a.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-body text-foreground leading-snug">{a.text}</p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{a.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GrainCardContent>
            </GrainCard>
          </div>

        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB: ANALYTICS
      ══════════════════════════════════════════ */}
      {activeTab === "analytics" && (
        <div className="space-y-6">

          {/* Kontext-Banner */}
          <div className="rounded-2xl border border-border bg-muted/40 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[oklch(0.42_0.22_268/0.12)] flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-[oklch(0.42_0.22_268)]" />
            </div>
            <div>
              <p className="text-sm font-semibold font-ui text-foreground">Traffic-Analyse August 2025</p>
              <p className="text-xs font-body text-muted-foreground mt-0.5 leading-relaxed">
                Organischer Traffic wächst um 22.1%. Die Absprungrate ist leicht gestiegen – 
                Checkout-Flow und Ladezeiten sollten überprüft werden.
              </p>
            </div>
          </div>

          {/* Metric-Karten mit Kontext */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              { label: "Seitenaufrufe",  value: "284.521", change: 22.1, changeLabel: "vs. Vormonat", icon: <Eye className="w-4 h-4" />,        insight: "Peak: Dienstag 14–16 Uhr",          insightType: "positive" as const },
              { label: "Sitzungsdauer",  value: "4m 32s",  change: 6.8,  changeLabel: "vs. Vorwoche",  icon: <Clock className="w-4 h-4" />,       insight: "Nutzer lesen Inhalte gründlicher",  insightType: "positive" as const },
              { label: "Absprungrate",   value: "38.2%",   change: -3.4, changeLabel: "vs. Vorwoche",  icon: <Activity className="w-4 h-4" />,    insight: "Checkout-Seite: 62% Absprung",      insightType: "warning" as const },
              { label: "Wiederkehrende", value: "62.4%",   change: 9.2,  changeLabel: "vs. Vormonat",  icon: <RefreshCw className="w-4 h-4" />,   insight: "Hohe Kundenbindung durch Newsletter", insightType: "positive" as const },
            ] as KPICardProps[]).map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <KPICard {...m} />
              </motion.div>
            ))}
          </div>

          {/* Performance Line + Radial */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <GrainCard className="lg:col-span-2">
              <GrainCardHeader>
                <GrainCardTitle>Performance vs. Ziel</GrainCardTitle>
                <p className="text-xs text-muted-foreground font-body mt-0.5">
                  Wöchentlicher Vergleich · Ist vs. Soll (Ziel: 80%)
                </p>
                <div className="flex gap-1.5 mt-2">
                  <Insight text="4 von 6 Wochen über Ziel" type="positive" />
                  <Insight text="Trend: steigend" type="positive" />
                </div>
              </GrainCardHeader>
              <GrainCardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0 0 0 / 0.05)" />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fontFamily: "Space Grotesk", fill: "oklch(0.55 0.016 286)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fontFamily: "Space Grotesk", fill: "oklch(0.55 0.016 286)" }} axisLine={false} tickLine={false} domain={[60, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10, fontFamily: "Space Grotesk" }} />
                    <ReferenceLine y={80} stroke={C.violet} strokeDasharray="5 3" strokeWidth={1} label={{ value: "Ziel", position: "right", fontSize: 9, fill: C.violet }} />
                    <Line type="monotone" dataKey="target" name="Ziel"    stroke={C.violet} strokeWidth={1.5} strokeDasharray="5 3" dot={false} />
                    <Line type="monotone" dataKey="actual" name="Aktuell" stroke={C.blue}   strokeWidth={2.5} dot={{ r: 4, fill: C.blue, strokeWidth: 2, stroke: "white" }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </GrainCardContent>
            </GrainCard>

            {/* Radial Bar – Conversion Funnel */}
            <GrainCard>
              <GrainCardHeader>
                <GrainCardTitle>Conversion Funnel</GrainCardTitle>
                <p className="text-xs text-muted-foreground font-body mt-0.5">
                  Von Besucher zu Kunde: 21% Conversion
                </p>
              </GrainCardHeader>
              <GrainCardContent>
                <ResponsiveContainer width="100%" height={160}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius={20} outerRadius={75} data={conversionData} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "oklch(0.96 0.006 268)" }} />
                    <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "oklch(1 0 0 / 0.95)", border: "1px solid oklch(0.9 0.004 286)", borderRadius: 12, fontSize: 11 }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-2">
                  {conversionData.map((c, i) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.fill }} />
                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <span className="text-xs font-body text-muted-foreground">{c.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold font-ui text-foreground">{c.value}%</span>
                          {i > 0 && (
                            <span className="text-[9px] font-mono text-muted-foreground">
                              -{(conversionData[i-1].value - c.value)}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GrainCardContent>
            </GrainCard>
          </div>

          {/* Gradient Hero Stats */}
          <GrainCard variant="gradient">
            <GrainCardContent className="py-8">
              <p className="text-center text-white/50 text-[10px] font-mono uppercase tracking-widest mb-6">Monatszusammenfassung</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "284K",  label: "Seitenaufrufe",   sub: "+22.1% vs. Vormonat", icon: <Eye className="w-5 h-5" /> },
                  { value: "18.4%", label: "Wachstum",        sub: "Organisch getrieben",  icon: <TrendingUp className="w-5 h-5" /> },
                  { value: "4:32",  label: "Ø Sitzungsdauer", sub: "+6.8% länger",         icon: <Clock className="w-5 h-5" /> },
                  { value: "62%",   label: "Wiederkehrend",   sub: "Starke Kundenbindung", icon: <RefreshCw className="w-5 h-5" /> },
                ].map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">{s.icon}</div>
                    <p className="font-display font-black text-3xl text-white">{s.value}</p>
                    <p className="text-xs font-semibold font-ui text-white/80">{s.label}</p>
                    <p className="text-[10px] font-body text-white/50">{s.sub}</p>
                  </motion.div>
                ))}
              </div>
            </GrainCardContent>
          </GrainCard>

        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB: ORDERS
      ══════════════════════════════════════════ */}
      {activeTab === "orders" && (
        <div className="space-y-5">

          {/* Filter-Leiste */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-xl border border-border">
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <input
                  className="bg-transparent text-xs font-body text-foreground placeholder:text-muted-foreground outline-none w-44"
                  placeholder="Bestellung suchen…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <GrainButton variant="outline" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />}>Filter</GrainButton>
            </div>
            <GrainButton variant="gradient" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>Neue Bestellung</GrainButton>
          </div>

          {/* Tabelle */}
          <GrainCard>
            <GrainCardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-5 py-3 text-[10px] font-bold font-ui text-muted-foreground uppercase tracking-wider">ID</th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold font-ui text-muted-foreground uppercase tracking-wider">Kunde</th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold font-ui text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Produkt</th>
                      <th className="text-right px-5 py-3 text-[10px] font-bold font-ui text-muted-foreground uppercase tracking-wider">Betrag</th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold font-ui text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold font-ui text-muted-foreground uppercase tracking-wider hidden md:table-cell">Datum</th>
                      <th className="text-right px-5 py-3 text-[10px] font-bold font-ui text-muted-foreground uppercase tracking-wider">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-sm font-body text-muted-foreground">
                          Keine Bestellungen gefunden für „{searchQuery}"
                        </td>
                      </tr>
                    ) : filteredOrders.map((order, i) => (
                      <tr key={order.id} className={`border-b border-border/50 hover:bg-muted/30 transition-colors group ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-mono text-[oklch(0.42_0.22_268)] font-semibold">{order.id}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[linear-gradient(135deg,oklch(0.42_0.22_268),oklch(0.52_0.26_27))] flex items-center justify-center flex-shrink-0">
                              <span className="text-[9px] font-bold text-white">{order.avatar}</span>
                            </div>
                            <span className="text-xs font-semibold font-ui text-foreground">{order.customer}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <span className="text-xs font-body text-muted-foreground">{order.product}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="text-xs font-mono font-semibold text-foreground">€ {order.amount.toLocaleString("de-DE")}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <span className="text-[10px] font-mono text-muted-foreground">{order.date}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-6 h-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-[oklch(0.52_0.26_27)] hover:bg-[oklch(0.52_0.26_27/0.08)] transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tabellen-Footer mit Kontext */}
              <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {filteredOrders.length} von 248 Bestellungen
                  {searchQuery && ` · Gefiltert nach „${searchQuery}"`}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, "…", 12].map((p, i) => (
                    <button key={i} className={`w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-mono transition-colors ${
                      p === 1 ? "bg-[oklch(0.42_0.22_268)] text-white" : "text-muted-foreground hover:bg-muted"
                    }`}>{p}</button>
                  ))}
                </div>
              </div>
            </GrainCardContent>
          </GrainCard>

          {/* Summary KPIs unter der Tabelle */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Gesamt Bestellungen", value: "248",      change: 14.2, icon: <ShoppingCart className="w-4 h-4" />, insight: "Täglich Ø 8 neue Bestellungen" },
              { label: "Ausstehend",          value: "32",       change: -5.1, icon: <Clock className="w-4 h-4" />,        insight: "Ø Bearbeitungszeit: 2.3 Stunden" },
              { label: "Umsatz (Monat)",      value: "€ 84.200", change: 18.4, icon: <DollarSign className="w-4 h-4" />,   insight: "84% des Monatsziels erreicht", gradient: true },
            ].map((kpi, i) => (
              <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <KPICard {...kpi as any} changeLabel="vs. Vormonat" insightType={kpi.change > 0 ? "positive" : "warning"} />
              </motion.div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
