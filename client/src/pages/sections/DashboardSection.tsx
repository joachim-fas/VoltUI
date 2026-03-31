/**
 * DashboardSection – Volt UI
 * Farben: Lime (#E4FF97) + Schwarz (#0A0A0A) + Signalfarben
 * Kein Blau, kein Violett
 */

import React, { useState, useRef, useEffect } from "react";
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
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle } from "@/components/volt/VoltCard";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltButton } from "@/components/volt/VoltButton";

/* ── Farbpalette: Lime + Schwarz + Signale ── */
const C = {
  lime:     "#E4FF97",   /* Primär */
  black:    "#0A0A0A",   /* Fundament */
  gray:     "#6B6B6B",   /* Grau */
  positive: "#1A9E5A",   /* Signal Positiv */
  negative: "#E8402A",   /* Signal Negativ */
  neutral:  "#6B7A9A",   /* Signal Neutral */
  /* Pastell-Palette für Charts – alle 8 GRAIN_PASTEL Töne */
  rose:     "#F4A0B5",   /* Pastell Rose Quartz */
  peach:    "#F5C87A",   /* Pastell Peach Cream */
  mint:     "#6DDBA0",   /* Pastell Mint Green */
  orchid:   "#D98AE8",   /* Pastell Soft Orchid */
  sky:      "#7AB8F5",   /* Pastell Baby Blue */
  butter:   "#E8C840",   /* Pastell Butter Yellow */
  orange:   "#F0956A",   /* Pastell Powder Orange */
  aqua:     "#5ECECE",   /* Pastell Aqua Mist */
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
  { day: "Mo", organisch: 1200, paid: 800, direkt: 400, social: 320, email: 180, referral: 140, affiliate: 90, sonstige: 60 },
  { day: "Di", organisch: 1800, paid: 1100, direkt: 600, social: 480, email: 260, referral: 200, affiliate: 130, sonstige: 80 },
  { day: "Mi", organisch: 1400, paid: 900, direkt: 500, social: 380, email: 210, referral: 160, affiliate: 100, sonstige: 70 },
  { day: "Do", organisch: 2200, paid: 1400, direkt: 700, social: 560, email: 310, referral: 240, affiliate: 150, sonstige: 95 },
  { day: "Fr", organisch: 2600, paid: 1600, direkt: 900, social: 680, email: 380, referral: 290, affiliate: 180, sonstige: 110 },
  { day: "Sa", organisch: 1900, paid: 1200, direkt: 650, social: 500, email: 280, referral: 210, affiliate: 130, sonstige: 85 },
  { day: "So", organisch: 1100, paid: 700, direkt: 350, social: 290, email: 160, referral: 120, affiliate: 75, sonstige: 50 },
];

const channelData = [
  { name: "Organisch", value: 38, color: C.black },
  { name: "Paid",      value: 27, color: C.rose },
  { name: "Social",    value: 18, color: C.mint },
  { name: "Direkt",    value: 12, color: C.sky },
  { name: "Sonstige",  value: 5,  color: C.butter },
];

const conversionData = [
  { name: "Besucher",      value: 100, fill: C.black },
  { name: "Interessenten", value: 68,  fill: C.orchid },
  { name: "Leads",         value: 42,  fill: C.mint },
  { name: "Kunden",        value: 21,  fill: C.lime },
];

const performanceData = [
  { week: "KW1", target: 80, actual: 72 },
  { week: "KW2", target: 80, actual: 85 },
  { week: "KW3", target: 80, actual: 78 },
  { week: "KW4", target: 80, actual: 91 },
  { week: "KW5", target: 80, actual: 88 },
  { week: "KW6", target: 80, actual: 94 },
];

const orders = [
  { id: "#4821", customer: "Anna Müller",   avatar: "AM", product: "Pro Plan",   amount: 299,  status: "success", date: "Heute, 14:32" },
  { id: "#4820", customer: "Ben Schmidt",   avatar: "BS", product: "Enterprise", amount: 899,  status: "pending", date: "Heute, 12:15" },
  { id: "#4819", customer: "Clara Weber",   avatar: "CW", product: "Starter",    amount: 49,   status: "success", date: "Heute, 10:08" },
  { id: "#4818", customer: "David Koch",    avatar: "DK", product: "Pro Plan",   amount: 299,  status: "failed",  date: "Gestern, 18:44" },
  { id: "#4817", customer: "Eva Braun",     avatar: "EB", product: "Enterprise", amount: 899,  status: "success", date: "Gestern, 16:22" },
  { id: "#4816", customer: "Felix Richter", avatar: "FR", product: "Pro Plan",   amount: 299,  status: "pending", date: "Gestern, 11:05" },
];

const activities = [
  { icon: <Users className="w-3.5 h-3.5" />,       color: C.black,    text: "Anna Müller hat sich registriert",    time: "vor 2 Min." },
  { icon: <DollarSign className="w-3.5 h-3.5" />,  color: C.positive, text: "Neue Zahlung: € 899 von Ben Schmidt",  time: "vor 8 Min." },
  { icon: <AlertCircle className="w-3.5 h-3.5" />, color: C.negative, text: "Zahlung #4818 fehlgeschlagen",         time: "vor 15 Min." },
  { icon: <Package className="w-3.5 h-3.5" />,     color: C.sky,      text: "Neues Paket deployt: v2.4.1",          time: "vor 32 Min." },
  { icon: <Star className="w-3.5 h-3.5" />,        color: C.neutral,  text: "5-Sterne-Bewertung von Clara Weber",   time: "vor 1 Std." },
  { icon: <Globe className="w-3.5 h-3.5" />,       color: C.butter,   text: "Traffic-Spike: +340% aus Deutschland", time: "vor 2 Std." },
  { icon: <CheckCircle2 className="w-3.5 h-3.5" />,color: C.positive, text: "Backup erfolgreich abgeschlossen",     time: "vor 3 Std." },
];

const topProducts = [
  { name: "Enterprise Plan",  revenue: 48200, growth: 12.4,  units: 54,  bar: 90 },
  { name: "Pro Plan",         revenue: 31700, growth: 8.1,   units: 106, bar: 65 },
  { name: "Starter Plan",     revenue: 12400, growth: -2.3,  units: 253, bar: 40 },
  { name: "Add-ons",          revenue: 8900,  growth: 24.7,  units: 89,  bar: 28 },
];

const goals = [
  { label: "Monatsumsatz",  current: 84000, target: 100000, color: C.black,    unit: "€", note: "16k fehlen noch" },
  { label: "Neue Kunden",   current: 142,   target: 200,    color: C.positive, unit: "",  note: "58 bis Monatsende" },
  { label: "NPS Score",     current: 72,    target: 80,     color: C.neutral,  unit: "",  note: "8 Punkte Abstand" },
  { label: "Churn Rate",    current: 2.1,   target: 1.5,    color: C.negative, unit: "%", note: "Ziel: unter 1.5%" },
];

/* ── Intersection Observer Hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Helpers ── */
const TICK_STYLE = { fontSize: 10, fontFamily: "DM Sans", fill: "#6B6B6B" };

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    success: { label: "Erfolgreich", cls: "bg-[var(--signal-positive-light)] text-[var(--signal-positive-text)] border border-[var(--signal-positive-border)]",   icon: <CheckCircle2 className="w-3 h-3" /> },
    pending: { label: "Ausstehend",  cls: "bg-[var(--signal-neutral-light)] text-[var(--signal-neutral-text)] border border-[var(--signal-neutral-border)]",   icon: <Clock className="w-3 h-3" /> },
    failed:  { label: "Fehlerhaft",  cls: "bg-[var(--signal-negative-light)] text-[var(--signal-negative-text)] border border-[var(--signal-negative-border)]",   icon: <AlertCircle className="w-3 h-3" /> },
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
    <div className="bg-card rounded-xl px-3.5 py-2.5 border border-border">
      <p className="text-xs font-semibold font-ui text-foreground mb-2 pb-1.5 border-b border-border">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-[11px] font-ui text-muted-foreground">{p.name}</span>
          </div>
          <span className="text-[11px] font-semibold font-ui text-foreground">
            {typeof p.value === "number" && p.value > 1000 ? `€ ${(p.value / 1000).toFixed(0)}k` : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const Insight: React.FC<{ text: string; type?: "positive" | "warning" | "neutral" }> = ({ text, type = "neutral" }) => {
  const styles = {
    positive: "bg-[var(--signal-positive-light)] text-[var(--signal-positive-text)] border-[var(--signal-positive-border)]",
    warning:  "bg-amber-50 text-amber-800 border-amber-200",
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

interface KPICardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  insight: string;
  insightType: "positive" | "warning" | "neutral";
  lime?: boolean;
  dark?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({
  label, value, change, changeLabel, icon, insight, insightType, lime, dark
}) => {
  const isPositive = change > 0;
  const isNegative = change < 0;

  const bg = lime ? "bg-[#E4FF97]" : dark ? "bg-[#0A0A0A]" : "bg-card border border-border";
  const textMain = lime || dark ? (lime ? "text-foreground" : "text-white") : "text-foreground";
  const textSub  = lime ? "text-foreground/50" : dark ? "text-white/50" : "text-muted-foreground";
  const iconBg   = lime ? "bg-[#0A0A0A]/10" : dark ? "bg-white/10" : "bg-secondary";
  const iconColor= lime ? "text-foreground" : dark ? "text-white" : "text-foreground";

  const changeColor = (lime || dark)
    ? (lime ? "text-foreground/70" : "text-white/70")
    : isPositive ? "text-[#1A9E5A]" : isNegative ? "text-[#E8402A]" : "text-muted-foreground";

  return (
    <div className={`relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${bg}`}>
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`text-[0.6rem] font-mono font-semibold uppercase tracking-[0.14em] ${textSub}`}>
            {label}
          </span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg} ${iconColor}`}>
            {icon}
          </div>
        </div>
        <p className={`font-display font-black text-3xl leading-none tracking-tight mb-2 ${textMain}`}>
          {value}
        </p>
        <div className={`flex items-center gap-1 mb-3 ${changeColor}`}>
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : isNegative ? <TrendingDown className="w-3.5 h-3.5" /> : null}
          <span className="text-xs font-semibold font-ui">
            {isPositive ? "+" : ""}{change}%
          </span>
          <span className={`text-[10px] font-ui ${textSub}`}>{changeLabel}</span>
        </div>
        <div className={`text-[10px] font-ui leading-snug ${textSub}`}>{insight}</div>
      </div>
    </div>
  );
};

export const DashboardSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "orders">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const { ref: revenueRef, inView: revenueInView } = useInView();
  const { ref: visitorRef, inView: visitorInView } = useInView();
  const { ref: perfRef,    inView: perfInView }    = useInView();
  const { ref: funnelRef,  inView: funnelInView }  = useInView();
  const { ref: channelRef, inView: channelInView } = useInView();

  const filteredOrders = orders.filter(o =>
    o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.includes(searchQuery)
  );

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="section-label mb-2">08 — Dashboard</p>
          <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-2">
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground font-ui text-sm leading-relaxed max-w-xl">
            Echtzeit-Überblick über Umsatz, Nutzer und Performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <VoltButton variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Aktualisieren
          </VoltButton>
          <VoltButton variant="solid" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export
          </VoltButton>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-1 p-1 bg-secondary rounded-xl w-fit">
        {([
          { id: "overview",  label: "Übersicht",    desc: "KPIs & Charts" },
          { id: "analytics", label: "Analytics",    desc: "Traffic & Funnel" },
          { id: "orders",    label: "Bestellungen", desc: "Tabelle & Filter" },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-left transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-card text-foreground ring-1 ring-border"
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

          {/* KPI-Karten */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-ui font-semibold text-sm text-foreground">Kennzahlen August 2025</h3>
              <span className="text-[10px] font-mono text-muted-foreground">Vergleich zum Vormonat</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {([
                { label: "Gesamtumsatz",   value: "€ 84.200", change: 12.4, changeLabel: "vs. Vormonat", icon: <DollarSign className="w-4 h-4" />, insight: "Bestes Monatsergebnis seit Q1.", insightType: "positive" as const, lime: true },
                { label: "Neue Kunden",    value: "1.429",    change: 8.2,  changeLabel: "diese Woche",  icon: <Users className="w-4 h-4" />,       insight: "Organisches Wachstum: 62%.",    insightType: "positive" as const, dark: true },
                { label: "Konversionsrate",value: "3.24%",    change: -0.8, changeLabel: "vs. Vorwoche", icon: <Activity className="w-4 h-4" />,    insight: "Checkout-Optimierung empfohlen.", insightType: "warning" as const },
                { label: "Ø Bestellwert",  value: "€ 247",   change: 5.1,  changeLabel: "vs. Vormonat", icon: <ShoppingCart className="w-4 h-4" />, insight: "Enterprise-Upgrades treiben Wert.", insightType: "positive" as const },
              ] as KPICardProps[]).map((kpi, i) => (
                <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <KPICard {...kpi} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Revenue Chart + Channel Pie */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <VoltCard className="lg:col-span-2">
              <VoltCardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <VoltCardTitle>Umsatz & Ausgaben</VoltCardTitle>
                    <p className="text-xs text-muted-foreground font-ui mt-0.5">Jan – Aug 2025 · Monatliche Entwicklung</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <Insight text="Umsatz wächst schneller als Ausgaben" type="positive" />
                      <Insight text="Gewinn +18.4% vs. Vorjahr" type="positive" />
                    </div>
                  </div>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary flex-shrink-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </VoltCardHeader>
              <VoltCardContent>
                <div ref={revenueRef}>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={C.black}    stopOpacity={0.15} />
                        <stop offset="95%" stopColor={C.black}    stopOpacity={0.01} />
                      </linearGradient>
                      <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={C.negative} stopOpacity={0.15} />
                        <stop offset="95%" stopColor={C.negative} stopOpacity={0.01} />
                      </linearGradient>
                      <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={C.positive} stopOpacity={0.20} />
                        <stop offset="95%" stopColor={C.positive} stopOpacity={0.01} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="month" tick={TICK_STYLE} axisLine={false} tickLine={false} />
                    <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10, fontFamily: "DM Sans" }} />
                    <Area type="monotone" dataKey="revenue"  name="Umsatz"   stroke={C.black}    strokeWidth={2} fill="url(#gradRevenue)"  isAnimationActive={revenueInView} animationDuration={900} animationEasing="ease-out" animationBegin={0} />
                    <Area type="monotone" dataKey="expenses" name="Ausgaben" stroke={C.negative} strokeWidth={2} fill="url(#gradExpenses)" isAnimationActive={revenueInView} animationDuration={900} animationEasing="ease-out" animationBegin={120} />
                    <Area type="monotone" dataKey="profit"   name="Gewinn"   stroke={C.positive} strokeWidth={2} fill="url(#gradProfit)"   isAnimationActive={revenueInView} animationDuration={900} animationEasing="ease-out" animationBegin={240} />
                  </AreaChart>
                </ResponsiveContainer>
                </div>
              </VoltCardContent>
            </VoltCard>

            {/* Pie Chart */}
            <VoltCard>
              <VoltCardHeader>
                <VoltCardTitle>Traffic-Kanäle</VoltCardTitle>
                <p className="text-xs text-muted-foreground font-ui mt-0.5">Woher kommen die Besucher?</p>
                <Insight text="Organisch dominiert mit 38%" type="positive" />
              </VoltCardHeader>
              <VoltCardContent>
                <div ref={channelRef}>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie data={channelData} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="value" isAnimationActive={channelInView} animationBegin={0} animationDuration={800} animationEasing="ease-out">
                      {channelData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 11, color: "var(--card-foreground)" }} />
                  </PieChart>
                </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-2">
                  {channelData.map((c) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-ui text-foreground">{c.name}</span>
                          <span className="text-xs font-semibold font-ui text-foreground">{c.value}%</span>
                        </div>
                        <div className="h-1 bg-secondary rounded-full mt-0.5 overflow-hidden">
                          <div className="h-full rounded-full" style={{
                            width: channelInView ? `${c.value}%` : "0%",
                            background: c.color,
                            transition: `width 0.7s ease-out`,
                          }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </VoltCardContent>
            </VoltCard>
          </div>

          {/* Besucher + Ziele */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <VoltCard className="lg:col-span-2">
              <VoltCardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <VoltCardTitle>Besucher nach Kanal</VoltCardTitle>
                    <p className="text-xs text-muted-foreground font-ui mt-0.5">Diese Woche · täglich aufgeschlüsselt</p>
                    <Insight text="Freitag ist stärkster Tag (+34% vs. Montag)" type="positive" />
                  </div>
                  <VoltBadge variant="muted" size="sm">7 Tage</VoltBadge>
                </div>
              </VoltCardHeader>
              <VoltCardContent>
                <div ref={visitorRef}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={visitorData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={10} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                    <XAxis dataKey="day" tick={TICK_STYLE} axisLine={false} tickLine={false} />
                    <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10, fontFamily: "DM Sans" }} />
                    <Bar dataKey="organisch" name="Organisch" fill={C.black}   radius={[4,4,0,0]} isAnimationActive={visitorInView} animationDuration={600} animationEasing="ease-out" animationBegin={0} />
                    <Bar dataKey="paid"      name="Paid"      fill={C.rose}    radius={[4,4,0,0]} isAnimationActive={visitorInView} animationDuration={600} animationEasing="ease-out" animationBegin={60} />
                    <Bar dataKey="direkt"    name="Direkt"    fill={C.sky}     radius={[4,4,0,0]} isAnimationActive={visitorInView} animationDuration={600} animationEasing="ease-out" animationBegin={120} />
                    <Bar dataKey="social"    name="Social"    fill={C.mint}    radius={[4,4,0,0]} isAnimationActive={visitorInView} animationDuration={600} animationEasing="ease-out" animationBegin={180} />
                    <Bar dataKey="email"     name="E-Mail"    fill={C.butter}  radius={[4,4,0,0]} isAnimationActive={visitorInView} animationDuration={600} animationEasing="ease-out" animationBegin={240} />
                    <Bar dataKey="referral"  name="Referral"  fill={C.orchid}  radius={[4,4,0,0]} isAnimationActive={visitorInView} animationDuration={600} animationEasing="ease-out" animationBegin={300} />
                    <Bar dataKey="affiliate" name="Affiliate" fill={C.peach}   radius={[4,4,0,0]} isAnimationActive={visitorInView} animationDuration={600} animationEasing="ease-out" animationBegin={360} />
                    <Bar dataKey="sonstige"  name="Sonstige"  fill={C.aqua}    radius={[4,4,0,0]} isAnimationActive={visitorInView} animationDuration={600} animationEasing="ease-out" animationBegin={420} />
                  </BarChart>
                </ResponsiveContainer>
                </div>
              </VoltCardContent>
            </VoltCard>

            {/* Ziele */}
            <VoltCard>
              <VoltCardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <VoltCardTitle>Monatsziele</VoltCardTitle>
                    <p className="text-xs text-muted-foreground font-ui mt-0.5">August 2025 · 4 Tage verbleibend</p>
                  </div>
                  <Target className="w-4 h-4 text-muted-foreground" />
                </div>
              </VoltCardHeader>
              <VoltCardContent>
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
                            <span className="text-[9px] font-ui text-muted-foreground">{g.note}</span>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-xs font-mono text-foreground block">{g.unit}{g.current}</span>
                            <span className="text-[9px] font-mono text-muted-foreground">/ {g.unit}{g.target}</span>
                          </div>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full" style={{ background: g.color }}
                            initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[9px] font-mono text-muted-foreground">{pct}%</span>
                          <span className={`text-[9px] font-semibold font-ui flex items-center gap-0.5 ${good ? "text-[#1A9E5A]" : "text-[#E8402A]"}`}>
                            {good ? <><CheckCircle2 className="w-2.5 h-2.5" /> On Track</> : <><AlertTriangle className="w-2.5 h-2.5" /> Hinter Plan</>}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </VoltCardContent>
            </VoltCard>
          </div>

          {/* Top Produkte + Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <VoltCard className="lg:col-span-2">
              <VoltCardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <VoltCardTitle>Top Produkte</VoltCardTitle>
                    <p className="text-xs text-muted-foreground font-ui mt-0.5">Nach Umsatz sortiert · August 2025</p>
                  </div>
                  <VoltButton variant="ghost" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>Alle anzeigen</VoltButton>
                </div>
              </VoltCardHeader>
              <VoltCardContent>
                <div className="grid grid-cols-12 gap-2 px-1 mb-2">
                  {["#","Produkt","Umsatz","Trend","Einheiten"].map((h,i) => (
                    <span key={i} className={`text-[9px] font-mono text-muted-foreground uppercase ${i===0?"col-span-1":i===1?"col-span-4":i===2?"col-span-3 text-right":i===3?"col-span-2 text-right":"col-span-2 text-right"}`}>{h}</span>
                  ))}
                </div>
                <div className="space-y-2">
                  {topProducts.map((p, i) => (
                    <div key={p.name} className="grid grid-cols-12 gap-2 items-center py-2 px-1 rounded-lg hover:bg-secondary transition-colors">
                      <div className="col-span-1">
                        <div className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center">
                          <span className="text-[10px] font-bold font-display text-muted-foreground">{i + 1}</span>
                        </div>
                      </div>
                      <div className="col-span-4">
                        <span className="text-xs font-semibold font-ui text-foreground block truncate">{p.name}</span>
                        <div className="h-1 bg-secondary rounded-full mt-1 overflow-hidden">
                          <motion.div className="h-full rounded-full bg-[#0A0A0A]"
                            initial={{ width: 0 }} animate={{ width: `${p.bar}%` }} transition={{ duration: 0.7, delay: i * 0.1 }} />
                        </div>
                      </div>
                      <div className="col-span-3 text-right">
                        <span className="text-xs font-mono font-semibold text-foreground">€ {(p.revenue / 1000).toFixed(1)}k</span>
                      </div>
                      <div className="col-span-2 text-right">
                        <span className={`text-[10px] font-semibold font-ui flex items-center justify-end gap-0.5 ${p.growth > 0 ? "text-[#1A9E5A]" : "text-[#E8402A]"}`}>
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
              </VoltCardContent>
            </VoltCard>

            {/* Activity Feed */}
            <VoltCard>
              <VoltCardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <VoltCardTitle>Aktivitäten</VoltCardTitle>
                    <p className="text-xs text-muted-foreground font-ui mt-0.5">Letzte 3 Stunden</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A9E5A] animate-pulse" />
                    <span className="text-[10px] font-mono text-[#1A9E5A] font-semibold">Live</span>
                  </div>
                </div>
              </VoltCardHeader>
              <VoltCardContent>
                <div className="space-y-0">
                  {activities.map((a, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className={`flex items-start gap-2.5 py-2.5 ${i < activities.length - 1 ? "border-b border-border" : ""}`}>
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-white mt-0.5"
                        style={{ background: a.color }}>
                        {a.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-ui text-foreground leading-snug">{a.text}</p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{a.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </VoltCardContent>
            </VoltCard>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB: ANALYTICS
      ══════════════════════════════════════════ */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-secondary p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#E4FF97] flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold font-ui text-foreground">Traffic-Analyse August 2025</p>
              <p className="text-xs font-ui text-muted-foreground mt-0.5 leading-relaxed">
                Organischer Traffic wächst um 22.1%. Die Absprungrate ist leicht gestiegen –
                Checkout-Flow und Ladezeiten sollten überprüft werden.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              { label: "Seitenaufrufe",  value: "284.521", change: 22.1, changeLabel: "vs. Vormonat", icon: <Eye className="w-4 h-4" />,       insight: "Peak: Dienstag 14–16 Uhr",            insightType: "positive" as const },
              { label: "Sitzungsdauer",  value: "4m 32s",  change: 6.8,  changeLabel: "vs. Vorwoche",  icon: <Clock className="w-4 h-4" />,      insight: "Nutzer lesen Inhalte gründlicher",    insightType: "positive" as const },
              { label: "Absprungrate",   value: "38.2%",   change: -3.4, changeLabel: "vs. Vorwoche",  icon: <Activity className="w-4 h-4" />,   insight: "Checkout-Seite: 62% Absprung",        insightType: "warning" as const },
              { label: "Wiederkehrende", value: "62.4%",   change: 9.2,  changeLabel: "vs. Vormonat",  icon: <RefreshCw className="w-4 h-4" />,  insight: "Hohe Kundenbindung durch Newsletter", insightType: "positive" as const },
            ] as KPICardProps[]).map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <KPICard {...m} />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <VoltCard className="lg:col-span-2">
              <VoltCardHeader>
                <VoltCardTitle>Performance vs. Ziel</VoltCardTitle>
                <p className="text-xs text-muted-foreground font-ui mt-0.5">Wöchentlicher Vergleich · Ist vs. Soll (Ziel: 80%)</p>
                <div className="flex gap-1.5 mt-2">
                  <Insight text="4 von 6 Wochen über Ziel" type="positive" />
                  <Insight text="Trend: steigend" type="positive" />
                </div>
              </VoltCardHeader>
              <VoltCardContent>
                <div ref={perfRef}>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="week" tick={TICK_STYLE} axisLine={false} tickLine={false} />
                    <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} domain={[60, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10, fontFamily: "DM Sans" }} />
                    <ReferenceLine y={80} stroke={C.neutral} strokeDasharray="5 3" strokeWidth={1} label={{ value: "Ziel", position: "right", fontSize: 9, fill: C.neutral }} />
                    <Line type="monotone" dataKey="target" name="Ziel"    stroke={C.neutral} strokeWidth={1.5} strokeDasharray="5 3" dot={false} isAnimationActive={perfInView} animationDuration={900} animationEasing="ease-out" animationBegin={0} />
                    <Line type="monotone" dataKey="actual" name="Aktuell" stroke={C.black}   strokeWidth={2.5} dot={{ r: 4, fill: C.black, strokeWidth: 2, stroke: "white" }} activeDot={{ r: 6 }} isAnimationActive={perfInView} animationDuration={1000} animationEasing="ease-out" animationBegin={150} />
                  </LineChart>
                </ResponsiveContainer>
                </div>
              </VoltCardContent>
            </VoltCard>

            <VoltCard>
              <VoltCardHeader>
                <VoltCardTitle>Conversion Funnel</VoltCardTitle>
                <p className="text-xs text-muted-foreground font-ui mt-0.5">Von Besucher zu Kunde: 21% Conversion</p>
              </VoltCardHeader>
              <VoltCardContent>
                <div ref={funnelRef}>
                <ResponsiveContainer width="100%" height={160}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius={20} outerRadius={75} data={conversionData} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "#F4F4F4" }} isAnimationActive={funnelInView} animationDuration={900} animationEasing="ease-out" />
                    <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 11, color: "var(--card-foreground)" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-2">
                  {conversionData.map((c, i) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.fill }} />
                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <span className="text-xs font-ui text-muted-foreground">{c.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold font-ui text-foreground">{c.value}%</span>
                          {i > 0 && <span className="text-[9px] font-mono text-muted-foreground">-{conversionData[i-1].value - c.value}%</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </VoltCardContent>
            </VoltCard>
          </div>

          {/* Lime Hero Stats */}
          <div className="rounded-2xl bg-[#0A0A0A] p-8">
            <p className="text-center text-white/40 text-[10px] font-mono uppercase tracking-widest mb-6">Monatszusammenfassung</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "284K",  label: "Seitenaufrufe",   sub: "+22.1% vs. Vormonat", icon: <Eye className="w-5 h-5" /> },
                { value: "18.4%", label: "Wachstum",        sub: "Organisch getrieben",  icon: <TrendingUp className="w-5 h-5" /> },
                { value: "4:32",  label: "Ø Sitzungsdauer", sub: "+6.8% länger",         icon: <Clock className="w-5 h-5" /> },
                { value: "62%",   label: "Wiederkehrend",   sub: "Starke Kundenbindung", icon: <RefreshCw className="w-5 h-5" /> },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#E4FF97] flex items-center justify-center text-foreground">{s.icon}</div>
                  <p className="font-display font-black text-3xl text-white">{s.value}</p>
                  <p className="text-xs font-semibold font-ui text-white/80">{s.label}</p>
                  <p className="text-[10px] font-ui text-white/40">{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB: ORDERS
      ══════════════════════════════════════════ */}
      {activeTab === "orders" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl border border-border">
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <input
                  className="bg-transparent text-xs font-ui text-foreground placeholder:text-muted-foreground outline-none w-44"
                  placeholder="Bestellung suchen…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <VoltButton variant="outline" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />}>Filter</VoltButton>
            </div>
            <VoltButton variant="solid" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>Neue Bestellung</VoltButton>
          </div>

          <VoltCard>
            <VoltCardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary">
                      {["ID","Kunde","Produkt","Betrag","Status","Datum","Aktionen"].map((h,i) => (
                        <th key={i} className={`px-5 py-3 text-[10px] font-bold font-ui text-muted-foreground uppercase tracking-wider ${i===3?"text-right":i===6?"text-right":"text-left"} ${i===2?"hidden sm:table-cell":i===5?"hidden md:table-cell":""}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-12 text-sm font-ui text-muted-foreground">Keine Bestellungen gefunden für „{searchQuery}"</td></tr>
                    ) : filteredOrders.map((order, i) => (
                      <tr key={order.id} className={`border-b border-border/50 hover:bg-secondary transition-colors ${i % 2 !== 0 ? "bg-secondary/50" : ""}`}>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-mono text-foreground font-semibold">{order.id}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#0A0A0A] flex items-center justify-center flex-shrink-0">
                              <span className="text-[9px] font-bold text-white">{order.avatar}</span>
                            </div>
                            <span className="text-xs font-semibold font-ui text-foreground">{order.customer}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <span className="text-xs font-ui text-muted-foreground">{order.product}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="text-xs font-mono font-semibold text-foreground">€ {order.amount.toLocaleString("de-DE")}</span>
                        </td>
                        <td className="px-5 py-3.5"><StatusBadge status={order.status} /></td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <span className="text-[10px] font-mono text-muted-foreground">{order.date}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1">
                            <button className="w-6 h-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-[#E8402A] hover:bg-destructive/10 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-border bg-secondary flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {filteredOrders.length} von 248 Bestellungen{searchQuery && ` · Gefiltert nach „${searchQuery}"`}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, "…", 12].map((p, i) => (
                    <button key={i} className={`w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-mono transition-colors ${
                      p === 1 ? "bg-[#0A0A0A] text-white" : "text-muted-foreground hover:bg-secondary"
                    }`}>{p}</button>
                  ))}
                </div>
              </div>
            </VoltCardContent>
          </VoltCard>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Gesamt Bestellungen", value: "248",      change: 14.2, icon: <ShoppingCart className="w-4 h-4" />, insight: "Täglich Ø 8 neue Bestellungen" },
              { label: "Ausstehend",          value: "32",       change: -5.1, icon: <Clock className="w-4 h-4" />,        insight: "Ø Bearbeitungszeit: 2.3 Stunden" },
              { label: "Umsatz (Monat)",      value: "€ 84.200", change: 18.4, icon: <DollarSign className="w-4 h-4" />,   insight: "84% des Monatsziels erreicht", lime: true },
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
