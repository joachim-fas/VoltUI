/**
 * Volt UI – Analytics Dashboard Template
 * Route: /showcase/dashboard
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltStat } from "@/components/volt/VoltStat";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltTable, VoltTableColumn } from "@/components/volt/VoltTable";
import { VoltTabs } from "@/components/volt/VoltTabs";
import { VoltAvatar } from "@/components/volt/VoltAvatar";
import { VoltAreaChart, VoltBarChart, VoltDonutChart } from "@/components/volt/VoltChart";
import {
  LayoutDashboard, Users, ShoppingCart, TrendingUp,
  Settings, Bell, Search, Terminal, BarChart2,
  FileText, LogOut, ChevronDown, ArrowUpRight,
  Package, Zap, Activity,
} from "lucide-react";

/* ── Dummy-Daten ── */
const revenueData = [
  { month: "Jan", umsatz: 42000, kosten: 18000 },
  { month: "Feb", umsatz: 51000, kosten: 20000 },
  { month: "Mär", umsatz: 47000, kosten: 19000 },
  { month: "Apr", umsatz: 63000, kosten: 22000 },
  { month: "Mai", umsatz: 58000, kosten: 21000 },
  { month: "Jun", umsatz: 72000, kosten: 24000 },
  { month: "Jul", umsatz: 69000, kosten: 23000 },
  { month: "Aug", umsatz: 81000, kosten: 27000 },
];

const channelData = [
  { name: "Organisch", value: 38 },
  { name: "Paid", value: 27 },
  { name: "Referral", value: 18 },
  { name: "Direkt", value: 17 },
];

const weeklyData = [
  { day: "Mo", sessions: 1200, conversions: 48 },
  { day: "Di", sessions: 1450, conversions: 62 },
  { day: "Mi", sessions: 1380, conversions: 55 },
  { day: "Do", sessions: 1620, conversions: 71 },
  { day: "Fr", sessions: 1890, conversions: 84 },
  { day: "Sa", sessions: 980, conversions: 31 },
  { day: "So", sessions: 760, conversions: 22 },
];

interface Order extends Record<string, unknown> {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: string;
  date: string;
}

const orders: Order[] = [
  { id: "#4821", customer: "Lena Hoffmann", product: "Pro Plan", amount: "€ 299", status: "Bezahlt", date: "07.04.2026" },
  { id: "#4820", customer: "Marcus Steiner", product: "Enterprise", amount: "€ 999", status: "Bezahlt", date: "07.04.2026" },
  { id: "#4819", customer: "Priya Nair", product: "Starter", amount: "€ 49", status: "Ausstehend", date: "06.04.2026" },
  { id: "#4818", customer: "Tom Weber", product: "Pro Plan", amount: "€ 299", status: "Bezahlt", date: "06.04.2026" },
  { id: "#4817", customer: "Anna Müller", product: "Enterprise", amount: "€ 999", status: "Storniert", date: "05.04.2026" },
];

const orderColumns: VoltTableColumn<Order>[] = [
  { key: "id", header: "Bestell-Nr.", width: "100px" },
  {
    key: "customer", header: "Kunde",
    render: (_, row) => (
      <div className="flex items-center gap-2.5">
        <VoltAvatar name={row.customer} size="xs" />
        <span className="text-sm font-medium">{row.customer}</span>
      </div>
    ),
  },
  { key: "product", header: "Produkt" },
  { key: "amount", header: "Betrag", align: "right" },
  {
    key: "status", header: "Status",
    render: (v) => {
      const s = v as string;
      const map: Record<string, "positive" | "negative" | "neutral"> = {
        Bezahlt: "positive", Ausstehend: "neutral", Storniert: "negative",
      };
      return <VoltBadge variant={map[s] ?? "outline"} size="sm">{s}</VoltBadge>;
    },
  },
  { key: "date", header: "Datum", align: "right" },
];

const NAV_ITEMS = [
  { icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard", active: true },
  { icon: <BarChart2 className="w-4 h-4" />, label: "Analytics" },
  { icon: <ShoppingCart className="w-4 h-4" />, label: "Bestellungen" },
  { icon: <Users className="w-4 h-4" />, label: "Kunden" },
  { icon: <Package className="w-4 h-4" />, label: "Produkte" },
  { icon: <FileText className="w-4 h-4" />, label: "Berichte" },
];

export default function DashboardTemplate() {
  const [activeTab, setActiveTab] = useState("umsatz");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 border-r border-border bg-card">
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-[#E4FF97]" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight">Volt Analytics</span>
          </div>
        </div>
        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="text-[0.65rem] font-semibold text-muted-foreground uppercase tracking-widest px-3 py-2 mt-1">Hauptmenü</p>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                item.active
                  ? "bg-[#E4FF97] text-black font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        {/* User */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <VoltAvatar name="Admin User" size="sm" online />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">Admin User</div>
              <div className="text-xs text-muted-foreground truncate">admin@volt.io</div>
            </div>
            <LogOut className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 h-14 border-b border-border bg-background flex-shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="font-display font-bold text-base">Dashboard</h1>
            <VoltBadge variant="default" size="sm">Live</VoltBadge>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E4FF97] rounded-full" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <Link href="/showcase" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground ml-2 transition-colors group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Templates
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <VoltStat label="Gesamtumsatz" value="€ 483k" change={12.4} variant="default" icon={<TrendingUp className="w-4 h-4" />} />
            <VoltStat label="Aktive Nutzer" value="12.847" change={8.1} variant="default" icon={<Users className="w-4 h-4" />} />
            <VoltStat label="Bestellungen" value="1.294" change={-3.2} variant="default" icon={<ShoppingCart className="w-4 h-4" />} />
            <VoltStat label="Conversion" value="4.7%" change={0.3} variant="lime" icon={<Zap className="w-4 h-4" />} />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Area Chart */}
            <div className="lg:col-span-2">
              <VoltTabs
                variant="pills"
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabs={[
                  { id: "umsatz", label: "Umsatz" },
                  { id: "sessions", label: "Sessions" },
                ]}
              />
              <div className="mt-3">
                {activeTab === "umsatz" ? (
                  <VoltAreaChart
                    data={revenueData}
                    dataKeys={["umsatz", "kosten"]}
                    xKey="month"
                    title="Umsatz vs. Kosten"
                    subtitle="Jan – Aug 2026"
                    gradient
                    height={240}
                  />
                ) : (
                  <VoltBarChart
                    data={weeklyData}
                    dataKeys={["sessions", "conversions"]}
                    xKey="day"
                    title="Wöchentliche Sessions"
                    subtitle="KW 14"
                    height={240}
                  />
                )}
              </div>
            </div>
            {/* Donut */}
            <VoltDonutChart
              data={channelData}
              title="Traffic-Quellen"
              subtitle="Letzte 30 Tage"
              innerLabel="Gesamt"
              innerValue="100%"
              height={240}
            />
          </div>

          {/* Orders Table */}
          <VoltCard variant="default" className="p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h3 className="font-display font-bold text-sm">Letzte Bestellungen</h3>
                <p className="text-muted-foreground text-xs mt-0.5">5 von 1.294 Bestellungen</p>
              </div>
              <VoltButton variant="outline" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                Alle anzeigen
              </VoltButton>
            </div>
            <VoltTable columns={orderColumns} data={orders} hoverable />
          </VoltCard>
        </main>
      </div>
    </div>
  );
}
