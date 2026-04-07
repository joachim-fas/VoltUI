/**
 * Volt UI – Showcase
 * Alle Komponenten mit allen Varianten auf einen Blick.
 * Gedacht als Screenshot-Referenz für Claude Code und andere KI-Agenten.
 * Route: /showcase
 */

import React, { useState } from "react";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltInput } from "@/components/volt/VoltInput";
import { VoltAlert } from "@/components/volt/VoltAlert";
import { VoltToggle } from "@/components/volt/VoltToggle";
import { VoltProgress } from "@/components/volt/VoltProgress";
import { VoltStat } from "@/components/volt/VoltStat";
import { VoltTabs } from "@/components/volt/VoltTabs";
import { VoltTable } from "@/components/volt/VoltTable";
import { VoltModal } from "@/components/volt/VoltModal";
import { VoltCodeBlock } from "@/components/volt/VoltCodeBlock";
import { VoltAvatar } from "@/components/volt/VoltAvatar";
import { VoltTrendCard } from "@/components/volt/VoltTrendCard";
import { VoltRankedList } from "@/components/volt/VoltRankedList";
import { VoltNavbar } from "@/components/volt/VoltNavbar";
import { VoltTerminal } from "@/components/volt/VoltTerminal";
import {
  Terminal, ArrowRight, Download, Trash2, Plus, Settings,
  TrendingUp, TrendingDown, Minus, BarChart2, Zap, Star,
  Check, X, Eye, Code2, Palette,
  LayoutGrid, FormInput, Bell,
} from "lucide-react";

/* ── Section-Wrapper ── */
function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-b border-border last:border-b-0 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#E4FF97] bg-black px-2 py-1 rounded">
            {id}
          </span>
          <h2 className="font-display font-bold text-xl text-foreground">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ── Row-Wrapper ── */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/* ── Sidebar-Navigation ── */
const NAV_ITEMS = [
  { id: "buttons",   label: "Buttons",    icon: <Zap className="w-3.5 h-3.5" /> },
  { id: "cards",     label: "Cards",      icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  { id: "badges",    label: "Badges",     icon: <Star className="w-3.5 h-3.5" /> },
  { id: "inputs",    label: "Inputs",     icon: <FormInput className="w-3.5 h-3.5" /> },
  { id: "alerts",    label: "Alerts",     icon: <Bell className="w-3.5 h-3.5" /> },
  { id: "feedback",  label: "Feedback",   icon: <Check className="w-3.5 h-3.5" /> },
  { id: "data",      label: "Data",       icon: <BarChart2 className="w-3.5 h-3.5" /> },
  { id: "display",   label: "Display",    icon: <Eye className="w-3.5 h-3.5" /> },
  { id: "code",      label: "Code",       icon: <Code2 className="w-3.5 h-3.5" /> },
  { id: "colors",    label: "Tokens",     icon: <Palette className="w-3.5 h-3.5" /> },
];

/* ── Tabellen-Daten ── */
type TableRow = { name: string; status: string; version: string };
const TABLE_COLUMNS = [
  { key: "name" as keyof TableRow,    header: "Komponente" },
  { key: "status" as keyof TableRow,  header: "Status",   render: (v: unknown) => (
    <VoltBadge
      variant={v === "stable" ? "positive" : v === "beta" ? "neutral" : "negative"}
      size="sm"
    >
      {String(v)}
    </VoltBadge>
  )},
  { key: "version" as keyof TableRow, header: "Version" },
];
const TABLE_DATA: TableRow[] = [
  { name: "VoltButton",    status: "stable", version: "4.0" },
  { name: "VoltCard",      status: "stable", version: "4.0" },
  { name: "VoltBadge",     status: "stable", version: "4.0" },
  { name: "VoltInput",     status: "stable", version: "4.0" },
  { name: "VoltAlert",     status: "stable", version: "4.0" },
  { name: "VoltChart",     status: "stable", version: "4.0" },
  { name: "VoltTable",     status: "stable", version: "4.0" },
  { name: "VoltModal",     status: "beta",   version: "4.0" },
  { name: "VoltNavbar",    status: "stable", version: "4.0" },
  { name: "VoltTerminal",  status: "beta",   version: "4.0" },
];

/* ── Ranked-List-Daten ── */
const RANKED_DATA = [
  { id: "btn",    label: "VoltButton",  value: 98,  previousValue: 96, category: "Komponenten" },
  { id: "card",   label: "VoltCard",    value: 94,  previousValue: 95, category: "Komponenten" },
  { id: "badge",  label: "VoltBadge",   value: 89,  previousValue: 84, category: "Komponenten" },
  { id: "input",  label: "VoltInput",   value: 82,  previousValue: 82, category: "Komponenten" },
  { id: "chart",  label: "VoltChart",   value: 76,  previousValue: 73, category: "Komponenten" },
];

export default function Showcase() {
  const [activeSection, setActiveSection] = useState("buttons");
  const [modalOpen, setModalOpen] = useState(false);
  const [toggleA, setToggleA] = useState(true);
  const [toggleB, setToggleB] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">

      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-52 flex-shrink-0 border-r border-border bg-[#0A0A0A] overflow-y-auto">
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#E4FF97] flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-black" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-white leading-none">
                volt <span className="text-white/30">ui</span>
              </p>
              <p className="text-[9px] font-mono text-white/40 tracking-widest uppercase mt-0.5">Showcase</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-150 ${
                activeSection === item.id
                  ? "bg-[#E4FF97] text-black font-semibold"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span className="text-xs font-ui">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <p className="text-[9px] font-mono text-white/20 tracking-widest uppercase">v4.0 · Design System</p>
        </div>
      </aside>

      {/* ── Hauptinhalt ── */}
      <main
        className="flex-1 overflow-y-auto overflow-x-clip bg-background"
        style={{ overscrollBehaviorX: "none" } as React.CSSProperties}
        onScroll={() => {
          const sections = NAV_ITEMS.map(n => document.getElementById(n.id));
          for (const section of [...sections].reverse()) {
            if (section && section.getBoundingClientRect().top <= 120) {
              setActiveSection(section.id);
              break;
            }
          }
        }}
      >
        {/* ══════════════════════════════════════════════
            BUTTONS
        ══════════════════════════════════════════════ */}
        <Section title="VoltButton" id="buttons">
          <Row label="variant">
            <VoltButton variant="primary">Primary</VoltButton>
            <VoltButton variant="solid">Solid</VoltButton>
            <VoltButton variant="outline">Outline</VoltButton>
            <VoltButton variant="ghost">Ghost</VoltButton>
            <VoltButton variant="secondary">Secondary</VoltButton>
            <VoltButton variant="glass">Glass</VoltButton>
            <VoltButton variant="destructive">Destructive</VoltButton>
          </Row>
          <Row label="size">
            <VoltButton size="sm">Small</VoltButton>
            <VoltButton size="md">Medium</VoltButton>
            <VoltButton size="lg">Large</VoltButton>
            <VoltButton size="xl">Extra Large</VoltButton>
            <VoltButton size="icon"><Settings className="w-4 h-4" /></VoltButton>
          </Row>
          <Row label="with icons">
            <VoltButton leftIcon={<Plus className="w-4 h-4" />}>Hinzufügen</VoltButton>
            <VoltButton rightIcon={<ArrowRight className="w-4 h-4" />}>Weiter</VoltButton>
            <VoltButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export</VoltButton>
            <VoltButton variant="destructive" leftIcon={<Trash2 className="w-4 h-4" />}>Löschen</VoltButton>
          </Row>
          <Row label="states">
            <VoltButton loading>Lädt...</VoltButton>
            <VoltButton disabled>Deaktiviert</VoltButton>
          </Row>
        </Section>

        {/* ══════════════════════════════════════════════
            CARDS
        ══════════════════════════════════════════════ */}
        <Section title="VoltCard" id="cards">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(["default", "elevated", "outlined", "subtle", "glass", "gradient", "interactive"] as const).map((v) => (
              <VoltCard key={v} variant={v} className="p-5">
                <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-2">variant="{v}"</p>
                <p className="font-display font-semibold text-sm text-foreground">VoltCard</p>
                <p className="text-xs text-muted-foreground mt-1">Inhaltsfläche und Container</p>
              </VoltCard>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">withTexture=false</p>
            <VoltCard variant="elevated" withTexture={false} className="p-5 max-w-xs">
              <p className="font-display font-semibold text-sm text-foreground">Ohne Textur</p>
              <p className="text-xs text-muted-foreground mt-1">withTexture=&#123;false&#125;</p>
            </VoltCard>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            BADGES
        ══════════════════════════════════════════════ */}
        <Section title="VoltBadge" id="badges">
          <Row label="variant">
            <VoltBadge variant="default">Default</VoltBadge>
            <VoltBadge variant="solid">Solid</VoltBadge>
            <VoltBadge variant="outline">Outline</VoltBadge>
            <VoltBadge variant="muted">Muted</VoltBadge>
            <VoltBadge variant="glass">Glass</VoltBadge>
            <VoltBadge variant="positive">Positiv</VoltBadge>
            <VoltBadge variant="negative">Negativ</VoltBadge>
            <VoltBadge variant="neutral">Neutral</VoltBadge>
          </Row>
          <Row label="size">
            <VoltBadge size="sm">Small</VoltBadge>
            <VoltBadge size="md">Medium</VoltBadge>
            <VoltBadge size="lg">Large</VoltBadge>
          </Row>
          <Row label="with icon">
            <VoltBadge variant="positive"><Check className="w-3 h-3" /> Aktiv</VoltBadge>
            <VoltBadge variant="negative"><X className="w-3 h-3" /> Fehler</VoltBadge>
            <VoltBadge variant="neutral"><Minus className="w-3 h-3" /> Neutral</VoltBadge>
            <VoltBadge variant="default"><TrendingUp className="w-3 h-3" /> +8%</VoltBadge>
          </Row>
        </Section>

        {/* ══════════════════════════════════════════════
            INPUTS
        ══════════════════════════════════════════════ */}
        <Section title="VoltInput" id="inputs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <VoltInput variant="default" label="Default" placeholder="Text eingeben…" />
            <VoltInput variant="filled" label="Filled" placeholder="Text eingeben…" />
            <VoltInput variant="boxed" label="Boxed" placeholder="Text eingeben…" />
            <VoltInput variant="glass" label="Glass" placeholder="Text eingeben…" />
            <VoltInput variant="boxed" label="Mit Fehler" placeholder="E-Mail" state="error" error="Ungültige E-Mail-Adresse" />
            <VoltInput variant="boxed" label="Mit Erfolg" placeholder="Benutzername" state="success" hint="Benutzername verfügbar" />
            <VoltInput variant="boxed" label="Mit Icon links" placeholder="Suchen…" leftElement={<span className="text-muted-foreground text-sm">🔍</span>} />
            <VoltInput variant="boxed" label="Deaktiviert" placeholder="Nicht editierbar" disabled />
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            ALERTS
        ══════════════════════════════════════════════ */}
        <Section title="VoltAlert" id="alerts">
          <div className="space-y-3 max-w-2xl">
            <VoltAlert variant="info" title="Information">
              Das ist eine Info-Meldung mit <strong>wichtigen Hinweisen</strong>.
            </VoltAlert>
            <VoltAlert variant="success" title="Erfolgreich gespeichert">
              Alle Änderungen wurden erfolgreich übernommen.
            </VoltAlert>
            <VoltAlert variant="warning" title="Achtung">
              Diese Aktion kann nicht rückgängig gemacht werden.
            </VoltAlert>
            <VoltAlert variant="error" title="Fehler aufgetreten">
              Verbindung zum Server konnte nicht hergestellt werden.
            </VoltAlert>
            <VoltAlert variant="info" title="Schließbar" dismissible onDismiss={() => {}}>
              Diese Meldung kann geschlossen werden.
            </VoltAlert>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            FEEDBACK (Toggle, Progress, Modal, Tabs)
        ══════════════════════════════════════════════ */}
        <Section title="Feedback & Interaktion" id="feedback">
          <Row label="VoltToggle">
            <VoltToggle
              checked={toggleA}
              onChange={(e) => setToggleA((e.target as HTMLInputElement).checked)}
              label="Benachrichtigungen"
            />
            <VoltToggle
              checked={toggleB}
              onChange={(e) => setToggleB((e.target as HTMLInputElement).checked)}
              label="Dark Mode"
              variant="secondary"
            />
            <VoltToggle checked={true} onChange={() => {}} label="Deaktiviert" disabled />
          </Row>

          <div className="mb-6">
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">VoltProgress</p>
            <div className="space-y-3 max-w-md">
              <VoltProgress value={75} label="Fortschritt" showValue />
              <VoltProgress value={45} variant="success" label="Erfolg" showValue />
              <VoltProgress value={20} variant="warning" label="Warnung" showValue />
              <VoltProgress value={8}  variant="error"   label="Fehler"  showValue />
            </div>
          </div>

          <Row label="VoltModal">
            <VoltButton onClick={() => setModalOpen(true)}>Modal öffnen</VoltButton>
          </Row>
          <VoltModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Bestätigung erforderlich"
            description="Möchtest du diese Aktion wirklich ausführen? Sie kann nicht rückgängig gemacht werden."
            footer={
              <div className="flex gap-2 justify-end">
                <VoltButton variant="ghost" onClick={() => setModalOpen(false)}>Abbrechen</VoltButton>
                <VoltButton variant="destructive" onClick={() => setModalOpen(false)}>Löschen</VoltButton>
              </div>
            }
          >
            <VoltAlert variant="warning">Diese Aktion löscht alle zugehörigen Daten.</VoltAlert>
          </VoltModal>

          <div className="mb-6">
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">VoltTabs</p>
            <VoltTabs
              tabs={[
                { id: "overview", label: "Übersicht", content: <p className="text-sm text-muted-foreground p-4">Übersichts-Inhalt hier</p> },
                { id: "details",  label: "Details",   content: <p className="text-sm text-muted-foreground p-4">Detail-Inhalt hier</p> },
                { id: "history",  label: "Verlauf",   content: <p className="text-sm text-muted-foreground p-4">Verlaufs-Inhalt hier</p> },
              ]}
            />
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            DATA
        ══════════════════════════════════════════════ */}
        <Section title="Data & Statistik" id="data">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <VoltStat label="Umsatz"    value="€ 48.200" change={8.2}  changeLabel="vs. Vormonat" />
            <VoltStat label="Nutzer"    value="12.840"   change={2.1}  changeLabel="vs. Vorwoche" />
            <VoltStat label="Fehlerrate" value="0.4%"   change={-0.8} changeLabel="vs. gestern" />
            <VoltStat label="Uptime"    value="99.97%"  change={0}    changeLabel="30-Tage-Schnitt" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">VoltTrendCard</p>
              <VoltTrendCard
                title="KI-Agenten"
                status="adopt"
                direction="up"
                signals={24}
                confidence={87}
              />
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">VoltRankedList</p>
              <VoltRankedList
                title="Top Komponenten"
                entries={RANKED_DATA}
                showProgressBar
                sortByValue
              />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">VoltTable</p>
            <VoltTable<TableRow> columns={TABLE_COLUMNS} data={TABLE_DATA} hoverable />
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            DISPLAY (Avatar, Navbar, Terminal)
        ══════════════════════════════════════════════ */}
        <Section title="Display-Komponenten" id="display">
          <Row label="VoltAvatar – size">
            <VoltAvatar name="Anna Müller"  size="xs" />
            <VoltAvatar name="Ben Koch"     size="sm" />
            <VoltAvatar name="Clara Weiß"   size="md" />
            <VoltAvatar name="David Braun"  size="lg" />
            <VoltAvatar name="Eva Schwarz"  size="xl" />
          </Row>
          <Row label="VoltAvatar – ring + online">
            <VoltAvatar name="Ring"   ring />
            <VoltAvatar name="Online" online />
            <VoltAvatar name="Beides" ring online />
          </Row>

          <div className="mb-6">
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">VoltNavbar</p>
            <div className="border border-border rounded-xl overflow-hidden">
              <VoltNavbar
                logo={<span className="font-display font-bold text-sm">&gt;_ Volt UI</span>}
                items={[
                  { label: "Docs",     href: "#" },
                  { label: "Showcase", href: "/showcase", active: true },
                  { label: "Export",   href: "#" },
                ]}
                rightSlot={<VoltButton size="sm" variant="primary">Login</VoltButton>}
              />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3">VoltTerminal</p>
            <VoltTerminal
              initialOutput={[
                { type: "command", text: "import { VoltButton } from '@/components/volt'" },
                { type: "output",  text: "✓ VoltButton geladen (v4.0)" },
                { type: "command", text: "<VoltButton variant=\"primary\">Starten</VoltButton>" },
                { type: "success", text: "Komponente gerendert" },
              ]}
            />
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            CODE
        ══════════════════════════════════════════════ */}
        <Section title="VoltCodeBlock" id="code">
          <div className="space-y-4 max-w-2xl">
            <VoltCodeBlock
              label="TSX"
              code={`import { VoltButton } from "@/components/volt";

export function MyPage() {
  return (
    <VoltButton variant="primary" size="lg">
      Jetzt starten
    </VoltButton>
  );
}`}
            />
            <VoltCodeBlock
              label="CSS"
              code={`:root {
  --neon-yellow: #E4FF97;
  --font-display: "Space Grotesk", sans-serif;
}`}
            />
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            TOKENS
        ══════════════════════════════════════════════ */}
        <Section title="Design Tokens" id="colors">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {[
              { name: "Neon Yellow",  hex: "#E4FF97" },
              { name: "Black",        hex: "#000000" },
              { name: "Lime Deep",    hex: "#C8F060" },
              { name: "Lime Darker",  hex: "#9DC800" },
              { name: "Ink Soft",     hex: "#1A1A1A" },
              { name: "Ink Muted",    hex: "#3A3A3A" },
              { name: "Border",       hex: "#E8E8E8" },
              { name: "Muted",        hex: "#F7F7F7" },
            ].map((c) => (
              <div key={c.hex} className="rounded-xl overflow-hidden border border-border">
                <div className="h-14" style={{ backgroundColor: c.hex }} />
                <div className="p-2.5 bg-card">
                  <p className="text-xs font-ui font-semibold text-foreground">{c.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "Positiv",  bg: "var(--signal-positive-light)", text: "var(--signal-positive-text)", border: "var(--signal-positive-border)" },
              { name: "Negativ",  bg: "var(--signal-negative-light)", text: "var(--signal-negative-text)", border: "var(--signal-negative-border)" },
              { name: "Neutral",  bg: "var(--signal-neutral-light)",  text: "var(--signal-neutral-text)",  border: "var(--signal-neutral-border)" },
            ].map((s) => (
              <div key={s.name} className="rounded-xl p-4 border" style={{ backgroundColor: s.bg, borderColor: s.border }}>
                <p className="text-xs font-ui font-semibold" style={{ color: s.text }}>{s.name}</p>
                <p className="text-[10px] font-mono mt-1" style={{ color: s.text, opacity: 0.7 }}>Signal-Farbe</p>
              </div>
            ))}
          </div>
        </Section>

      </main>
    </div>
  );
}
