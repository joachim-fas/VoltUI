/**
 * DashboardSection – Grain UI v2
 * Vollständiges Dashboard-Design: KPIs, Charts, Tabelle, Activity-Feed, Kalender-Widget
 * Atmospheric Design System – alles reiner CSS/React-Code
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart,
  Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Bell, Search, Settings, ChevronRight, Zap, Globe,
  Package, Star, AlertCircle, CheckCircle2, Clock, Filter,
  Download, RefreshCw, Eye, Edit2, Trash2, Plus,
} from "lucide-react";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle } from "@/components/grain/GrainCard";
import { GrainBadge } from "@/components/grain/GrainBadge";
import { GrainButton } from "@/components/grain/GrainButton";
import { GrainStat } from "@/components/grain/GrainStat";

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
  { id: "#4821", customer: "Anna Müller",    product: "Pro Plan",    amount: "€ 299",  status: "success", date: "Heute, 14:32" },
  { id: "#4820", customer: "Ben Schmidt",    product: "Enterprise",  amount: "€ 899",  status: "pending", date: "Heute, 12:15" },
  { id: "#4819", customer: "Clara Weber",    product: "Starter",     amount: "€ 49",   status: "success", date: "Heute, 10:08" },
  { id: "#4818", customer: "David Koch",     product: "Pro Plan",    amount: "€ 299",  status: "failed",  date: "Gestern, 18:44" },
  { id: "#4817", customer: "Eva Braun",      product: "Enterprise",  amount: "€ 899",  status: "success", date: "Gestern, 16:22" },
  { id: "#4816", customer: "Felix Richter",  product: "Pro Plan",    amount: "€ 299",  status: "pending", date: "Gestern, 11:05" },
];

/* ── Activity-Feed ── */
const activities = [
  { icon: <Users className="w-3.5 h-3.5" />,       color: "bg-[oklch(0.42_0.22_268)]", text: "Anna Müller hat sich registriert",         time: "vor 2 Min.",   type: "user" },
  { icon: <DollarSign className="w-3.5 h-3.5" />,  color: "bg-[oklch(0.58_0.18_145)]", text: "Neue Zahlung: € 899 von Ben Schmidt",       time: "vor 8 Min.",   type: "payment" },
  { icon: <AlertCircle className="w-3.5 h-3.5" />, color: "bg-[oklch(0.52_0.26_27)]",  text: "Zahlung #4818 fehlgeschlagen",               time: "vor 15 Min.",  type: "error" },
  { icon: <Package className="w-3.5 h-3.5" />,     color: "bg-[oklch(0.72_0.18_75)]",  text: "Neues Paket deployt: v2.4.1",                time: "vor 32 Min.",  type: "deploy" },
  { icon: <Star className="w-3.5 h-3.5" />,        color: "bg-[oklch(0.68_0.18_28)]",  text: "5-Sterne-Bewertung von Clara Weber",         time: "vor 1 Std.",   type: "review" },
  { icon: <Globe className="w-3.5 h-3.5" />,       color: "bg-[oklch(0.58_0.16_195)]", text: "Traffic-Spike: +340% aus Deutschland",       time: "vor 2 Std.",   type: "traffic" },
  { icon: <CheckCircle2 className="w-3.5 h-3.5" />,color: "bg-[oklch(0.58_0.18_145)]", text: "Backup erfolgreich abgeschlossen",            time: "vor 3 Std.",   type: "system" },
];

/* ── Top-Produkte ── */
const topProducts = [
  { name: "Enterprise Plan",  revenue: "€ 48.200", growth: 12.4,  units: 54,  bar: 90 },
  { name: "Pro Plan",         revenue: "€ 31.700", growth: 8.1,   units: 106, bar: 65 },
  { name: "Starter Plan",     revenue: "€ 12.400", growth: -2.3,  units: 253, bar: 40 },
  { name: "Add-ons",          revenue: "€ 8.900",  growth: 24.7,  units: 89,  bar: 28 },
];

/* ── Ziele / Goals ── */
const goals = [
  { label: "Monatsumsatz",    current: 84000, target: 100000, color: C.blue,   unit: "€" },
  { label: "Neue Kunden",     current: 142,   target: 200,    color: C.teal,   unit: "" },
  { label: "NPS Score",       current: 72,    target: 80,     color: C.green,  unit: "" },
  { label: "Churn Rate",      current: 2.1,   target: 1.5,    color: C.amber,  unit: "%" },
];

/* ── Helpers ── */
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, { label: string; cls: string }> = {
    success: { label: "Erfolgreich", cls: "bg-[oklch(0.58_0.18_145/0.12)] text-[oklch(0.45_0.18_145)] border border-[oklch(0.58_0.18_145/0.25)]" },
    pending: { label: "Ausstehend",  cls: "bg-[oklch(0.72_0.18_75/0.12)] text-[oklch(0.55_0.18_75)] border border-[oklch(0.72_0.18_75/0.25)]" },
    failed:  { label: "Fehlerhaft",  cls: "bg-[oklch(0.52_0.26_27/0.12)] text-[oklch(0.52_0.26_27)] border border-[oklch(0.52_0.26_27/0.25)]" },
  };
  const { label, cls } = map[status] ?? map.pending;
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-ui ${cls}`}>{label}</span>;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl px-3 py-2 border border-border shadow-lg">
      <p className="text-xs font-semibold font-ui text-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-xs font-body" style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" && p.value > 1000 ? `€ ${(p.value / 1000).toFixed(0)}k` : p.value}
        </p>
      ))}
    </div>
  );
};

/* ── Haupt-Komponente ── */
export const DashboardSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "orders">("overview");

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="section-label mb-2">08 — Dashboard</p>
          <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-2">
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xl">
            Ein vollständiges Dashboard-Design mit KPI-Karten, Charts, Datentabellen,
            Activity-Feed und Ziel-Tracking. Alle Komponenten im Grain-Stil.
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

      {/* ── Dashboard-Tabs ── */}
      <div className="flex items-center gap-1 p-1 bg-muted rounded-xl w-fit">
        {(["overview", "analytics", "orders"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-ui transition-all duration-200 ${
              activeTab === tab
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {{ overview: "Übersicht", analytics: "Analytics", orders: "Bestellungen" }[tab]}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          TAB: OVERVIEW
      ══════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div className="space-y-6">

          {/* ── KPI-Karten ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Gesamtumsatz",   value: "€ 84.200", change: 12.4,  changeLabel: "vs. Vormonat", icon: <DollarSign className="w-5 h-5" />, variant: "gradient" as const },
              { label: "Neue Kunden",    value: "1.429",    change: 8.2,   changeLabel: "diese Woche",  icon: <Users className="w-5 h-5" />,      variant: "blue" as const },
              { label: "Konversionsrate",value: "3.24%",    change: -0.8,  changeLabel: "vs. Vorwoche", icon: <Activity className="w-5 h-5" />,   variant: "default" as const },
              { label: "Ø Bestellwert",  value: "€ 247",    change: 5.1,   changeLabel: "vs. Vormonat", icon: <ShoppingCart className="w-5 h-5" />,variant: "default" as const },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <GrainStat
                  label={kpi.label}
                  value={kpi.value}
                  change={kpi.change}
                  changeLabel={kpi.changeLabel}
                  icon={kpi.icon}
                  variant={kpi.variant}
                  size="md"
                />
              </motion.div>
            ))}
          </div>

          {/* ── Revenue Chart + Channel Pie ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Area Chart – Umsatz */}
            <GrainCard className="lg:col-span-2">
              <GrainCardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <GrainCardTitle>Umsatz & Ausgaben</GrainCardTitle>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">Monatliche Übersicht · Jan – Aug 2025</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GrainBadge variant="blue" size="sm">+18.4%</GrainBadge>
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
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
                <p className="text-xs text-muted-foreground font-body mt-0.5">Verteilung nach Quelle</p>
              </GrainCardHeader>
              <GrainCardContent>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%" cy="50%"
                      innerRadius={45} outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {channelData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "oklch(1 0 0 / 0.9)", border: "1px solid oklch(0.9 0.004 286)", borderRadius: 12, fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-1">
                  {channelData.map((c) => (
                    <div key={c.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                        <span className="text-xs font-body text-muted-foreground">{c.name}</span>
                      </div>
                      <span className="text-xs font-semibold font-ui text-foreground">{c.value}%</span>
                    </div>
                  ))}
                </div>
              </GrainCardContent>
            </GrainCard>
          </div>

          {/* ── Besucher Bar + Ziele ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Bar Chart – Besucher */}
            <GrainCard className="lg:col-span-2">
              <GrainCardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <GrainCardTitle>Besucher nach Kanal</GrainCardTitle>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">Diese Woche · täglich</p>
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

            {/* Ziele / Goals */}
            <GrainCard>
              <GrainCardHeader>
                <GrainCardTitle>Monatsziele</GrainCardTitle>
                <p className="text-xs text-muted-foreground font-body mt-0.5">Fortschritt August 2025</p>
              </GrainCardHeader>
              <GrainCardContent>
                <div className="space-y-5">
                  {goals.map((g) => {
                    const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                    const isChurn = g.label === "Churn Rate";
                    const good = isChurn ? g.current <= g.target : pct >= 80;
                    return (
                      <div key={g.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold font-ui text-foreground">{g.label}</span>
                          <span className="text-xs font-mono text-muted-foreground">
                            {g.unit}{g.current} / {g.unit}{g.target}
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
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
                          <span className={`text-[9px] font-semibold font-ui ${good ? "text-[oklch(0.58_0.18_145)]" : "text-[oklch(0.52_0.26_27)]"}`}>
                            {good ? "✓ On Track" : "⚠ Behind"}
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
            {/* Top Produkte */}
            <GrainCard className="lg:col-span-2">
              <GrainCardHeader>
                <div className="flex items-center justify-between">
                  <GrainCardTitle>Top Produkte</GrainCardTitle>
                  <GrainButton variant="ghost" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                    Alle anzeigen
                  </GrainButton>
                </div>
              </GrainCardHeader>
              <GrainCardContent>
                <div className="space-y-3">
                  {topProducts.map((p, i) => (
                    <div key={p.name} className="flex items-center gap-3 group">
                      <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold font-display text-muted-foreground">{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold font-ui text-foreground truncate">{p.name}</span>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <span className="text-xs font-mono text-foreground">{p.revenue}</span>
                            <span className={`text-[10px] font-semibold font-ui flex items-center gap-0.5 ${p.growth > 0 ? "text-[oklch(0.58_0.18_145)]" : "text-[oklch(0.52_0.26_27)]"}`}>
                              {p.growth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              {Math.abs(p.growth)}%
                            </span>
                          </div>
                        </div>
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-[oklch(0.42_0.22_268)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${p.bar}%` }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GrainCardContent>
            </GrainCard>

            {/* Activity Feed */}
            <GrainCard>
              <GrainCardHeader>
                <div className="flex items-center justify-between">
                  <GrainCardTitle>Aktivitäten</GrainCardTitle>
                  <GrainBadge variant="blue" size="sm">Live</GrainBadge>
                </div>
              </GrainCardHeader>
              <GrainCardContent>
                <div className="space-y-3">
                  {activities.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2.5"
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

          {/* Metric-Karten */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Seitenaufrufe",   value: "284.521", change: 22.1,  icon: <Eye className="w-5 h-5" /> },
              { label: "Sitzungsdauer",   value: "4m 32s",  change: 6.8,   icon: <Clock className="w-5 h-5" /> },
              { label: "Absprungrate",    value: "38.2%",   change: -3.4,  icon: <Activity className="w-5 h-5" /> },
              { label: "Wiederkehrende",  value: "62.4%",   change: 9.2,   icon: <RefreshCw className="w-5 h-5" /> },
            ].map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <GrainStat label={m.label} value={m.value} change={m.change} icon={m.icon} variant="default" />
              </motion.div>
            ))}
          </div>

          {/* Performance Line + Radial */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <GrainCard className="lg:col-span-2">
              <GrainCardHeader>
                <GrainCardTitle>Performance vs. Ziel</GrainCardTitle>
                <p className="text-xs text-muted-foreground font-body mt-0.5">Wöchentlicher Vergleich · Ist vs. Soll</p>
              </GrainCardHeader>
              <GrainCardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0 0 0 / 0.05)" />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fontFamily: "Space Grotesk", fill: "oklch(0.55 0.016 286)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fontFamily: "Space Grotesk", fill: "oklch(0.55 0.016 286)" }} axisLine={false} tickLine={false} domain={[60, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10, fontFamily: "Space Grotesk" }} />
                    <Line type="monotone" dataKey="target" name="Ziel"   stroke={C.violet} strokeWidth={1.5} strokeDasharray="5 3" dot={false} />
                    <Line type="monotone" dataKey="actual" name="Aktuell" stroke={C.blue}   strokeWidth={2.5} dot={{ r: 4, fill: C.blue, strokeWidth: 2, stroke: "white" }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </GrainCardContent>
            </GrainCard>

            {/* Radial Bar – Conversion Funnel */}
            <GrainCard>
              <GrainCardHeader>
                <GrainCardTitle>Conversion Funnel</GrainCardTitle>
                <p className="text-xs text-muted-foreground font-body mt-0.5">Radial-Darstellung</p>
              </GrainCardHeader>
              <GrainCardContent>
                <ResponsiveContainer width="100%" height={180}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius={20} outerRadius={80} data={conversionData} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "oklch(0.96 0.006 268)" }} />
                    <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "oklch(1 0 0 / 0.9)", border: "1px solid oklch(0.9 0.004 286)", borderRadius: 12, fontSize: 11 }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-1">
                  {conversionData.map((c) => (
                    <div key={c.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: c.fill }} />
                        <span className="text-xs font-body text-muted-foreground">{c.name}</span>
                      </div>
                      <span className="text-xs font-semibold font-ui text-foreground">{c.value}%</span>
                    </div>
                  ))}
                </div>
              </GrainCardContent>
            </GrainCard>
          </div>

          {/* Gradient Hero Stats */}
          <GrainCard variant="gradient">
            <GrainCardContent className="py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "284K",  label: "Seitenaufrufe",   icon: <Eye className="w-5 h-5" /> },
                  { value: "18.4%", label: "Wachstum",        icon: <TrendingUp className="w-5 h-5" /> },
                  { value: "4:32",  label: "Ø Sitzungsdauer", icon: <Clock className="w-5 h-5" /> },
                  { value: "62%",   label: "Wiederkehrend",   icon: <RefreshCw className="w-5 h-5" /> },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
                      {s.icon}
                    </div>
                    <p className="font-display font-black text-3xl text-white">{s.value}</p>
                    <p className="text-xs font-body text-white/70">{s.label}</p>
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
        <div className="space-y-6">

          {/* Filter-Leiste */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-xl border border-border">
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <input
                  className="bg-transparent text-xs font-body text-foreground placeholder:text-muted-foreground outline-none w-40"
                  placeholder="Bestellung suchen…"
                />
              </div>
              <GrainButton variant="outline" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />}>
                Filter
              </GrainButton>
            </div>
            <GrainButton variant="gradient" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Neue Bestellung
            </GrainButton>
          </div>

          {/* Tabelle */}
          <GrainCard>
            <GrainCardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-3 text-[10px] font-semibold font-ui text-muted-foreground uppercase tracking-wider">ID</th>
                      <th className="text-left px-5 py-3 text-[10px] font-semibold font-ui text-muted-foreground uppercase tracking-wider">Kunde</th>
                      <th className="text-left px-5 py-3 text-[10px] font-semibold font-ui text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Produkt</th>
                      <th className="text-left px-5 py-3 text-[10px] font-semibold font-ui text-muted-foreground uppercase tracking-wider">Betrag</th>
                      <th className="text-left px-5 py-3 text-[10px] font-semibold font-ui text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="text-left px-5 py-3 text-[10px] font-semibold font-ui text-muted-foreground uppercase tracking-wider hidden md:table-cell">Datum</th>
                      <th className="text-right px-5 py-3 text-[10px] font-semibold font-ui text-muted-foreground uppercase tracking-wider">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, i) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors group"
                      >
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-mono text-primary font-semibold">{order.id}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-grain-gradient grain flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] font-bold font-display text-white">
                                {order.customer.charAt(0)}
                              </span>
                            </div>
                            <span className="text-xs font-semibold font-ui text-foreground">{order.customer}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <span className="text-xs font-body text-muted-foreground">{order.product}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-semibold font-mono text-foreground">{order.amount}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <span className="text-xs font-body text-muted-foreground">{order.date}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-[oklch(0.52_0.26_27)] hover:bg-[oklch(0.52_0.26_27/0.08)] transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-border">
                <p className="text-xs font-body text-muted-foreground">6 von 248 Bestellungen</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, "…", 12].map((p, i) => (
                    <button
                      key={i}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold font-ui transition-colors ${
                        p === 1
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </GrainCardContent>
          </GrainCard>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GrainStat label="Gesamt Bestellungen"  value="248"       change={14.2} variant="default" icon={<ShoppingCart className="w-5 h-5" />} />
            <GrainStat label="Ausstehend"            value="32"        change={-5.1} variant="default" icon={<Clock className="w-5 h-5" />} />
            <GrainStat label="Umsatz (Monat)"        value="€ 84.200"  change={18.4} variant="blue"    icon={<DollarSign className="w-5 h-5" />} />
          </div>

        </div>
      )}

    </div>
  );
};
