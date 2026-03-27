/**
 * IconsSection – Grain UI v3
 * 150+ Icons aus Lucide React, kategorisiert und durchsuchbar
 * Grain-Styling: Farbe, Größe, Kontext
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";

import { Search, Copy, CheckCheck, X } from "lucide-react";
import { GrainCard, GrainCardContent, GrainCardHeader, GrainCardTitle } from "@/components/grain/GrainCard";
import { GrainBadge } from "@/components/grain/GrainBadge";

/* ── Icon-Kategorien ── */
const ICON_CATEGORIES: Record<string, { label: string; color: string; bg: string; icons: string[] }> = {
  navigation: {
    label: "Navigation & Layout",
    color: "#000000",
    bg: "#F4F4F4",
    icons: [
      "Home", "LayoutDashboard", "LayoutGrid", "Sidebar", "PanelLeft", "PanelRight",
      "Menu", "MoreHorizontal", "MoreVertical", "ChevronLeft", "ChevronRight",
      "ChevronUp", "ChevronDown", "ChevronsLeft", "ChevronsRight", "ChevronsUpDown",
      "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "ArrowUpRight", "ArrowDownLeft",
      "MoveLeft", "MoveRight", "Navigation", "Compass", "Map", "MapPin",
    ],
  },
  actions: {
    label: "Aktionen & Operationen",
    color: "#000000",
    bg: "#E4FF97",
    icons: [
      "Plus", "Minus", "X", "Check", "Search", "Filter", "SortAsc", "SortDesc",
      "Edit", "Edit2", "Edit3", "Pencil", "Trash", "Trash2", "Delete",
      "Copy", "Clipboard", "ClipboardCheck", "ClipboardList", "ClipboardPaste",
      "Download", "Upload", "Share", "Share2", "Send", "Forward",
      "RefreshCw", "RefreshCcw", "RotateCw", "RotateCcw", "Repeat", "Repeat2",
      "Undo", "Undo2", "Redo", "Redo2", "ZoomIn", "ZoomOut",
    ],
  },
  data: {
    label: "Daten & Visualisierung",
    color: "#0F6038",
    bg: "#C3F4D3",
    icons: [
      "BarChart", "BarChart2", "BarChart3", "BarChart4", "BarChartHorizontal",
      "LineChart", "AreaChart", "PieChart", "ScatterChart",
      "TrendingUp", "TrendingDown", "Activity", "Pulse",
      "Table", "Table2", "Database", "DatabaseBackup", "DatabaseZap",
      "FileSpreadsheet", "Sheet", "Sigma", "Hash", "Percent",
      "Target", "Crosshair", "Gauge", "Thermometer",
    ],
  },
  communication: {
    label: "Kommunikation & Social",
    color: "#000000",
    bg: "#D4E8FF",
    icons: [
      "MessageSquare", "MessageCircle", "MessageCircleMore", "Messages",
      "Mail", "MailOpen", "MailCheck", "MailPlus", "Inbox",
      "Bell", "BellOff", "BellRing", "BellDot",
      "Phone", "PhoneCall", "PhoneIncoming", "PhoneOutgoing", "PhoneMissed",
      "Video", "VideoOff", "Mic", "MicOff",
      "AtSign", "Hash", "Link", "Link2", "ExternalLink",
    ],
  },
  files: {
    label: "Dateien & Medien",
    color: "#000000",
    bg: "#FFF5BA",
    icons: [
      "File", "FileText", "FileCode", "FileCode2", "FileJson", "FileJson2",
      "FilePlus", "FileMinus", "FileX", "FileCheck", "FileSearch",
      "Folder", "FolderOpen", "FolderPlus", "FolderMinus", "FolderX",
      "Image", "Images", "Camera", "Film", "Video", "Music", "Headphones",
      "Archive", "Package", "Package2", "PackageOpen", "PackageCheck",
      "Paperclip", "FileArchive", "HardDrive", "HardDriveDownload",
    ],
  },
  status: {
    label: "Status & Feedback",
    color: "#A01A08",
    bg: "#FDEEE9",
    icons: [
      "CheckCircle", "CheckCircle2", "XCircle", "AlertCircle", "AlertTriangle",
      "Info", "HelpCircle", "MinusCircle", "PlusCircle",
      "ShieldCheck", "ShieldAlert", "ShieldX", "Shield",
      "Lock", "LockOpen", "Unlock", "KeyRound", "Key",
      "Eye", "EyeOff", "Loader", "Loader2", "RefreshCw",
      "Wifi", "WifiOff", "Signal", "SignalHigh", "SignalLow", "SignalZero",
    ],
  },
  users: {
    label: "Nutzer & Teams",
    color: "#000000",
    bg: "#FFD6E0",
    icons: [
      "User", "User2", "UserCircle", "UserCircle2", "UserSquare", "UserSquare2",
      "Users", "Users2", "UserPlus", "UserMinus", "UserX", "UserCheck",
      "Contact", "Contact2", "Briefcase", "Building", "Building2",
      "Crown", "Star", "Award", "Trophy", "Medal", "Badge", "BadgeCheck",
      "Fingerprint", "ScanFace", "PersonStanding",
    ],
  },
  tech: {
    label: "Technologie & Code",
    color: "#000000",
    bg: "#FDE2FF",
    icons: [
      "Code", "Code2", "CodeXml", "Terminal", "Command",
      "Cpu", "Server", "ServerCog", "ServerCrash", "Cloud", "CloudOff",
      "Globe", "Globe2", "Wifi", "Bluetooth", "Usb",
      "Monitor", "Laptop", "Tablet", "Smartphone", "Watch",
      "Keyboard", "Mouse", "Printer", "Scanner",
      "Git", "GitBranch", "GitCommit", "GitMerge", "GitPullRequest",
      "Bug", "BugOff", "Wrench", "Settings", "Settings2", "Cog",
    ],
  },
  commerce: {
    label: "Commerce & Business",
    color: "#000000",
    bg: "#FFE0CC",
    icons: [
      "ShoppingCart", "ShoppingBag", "Store", "Package", "Tag", "Tags",
      "CreditCard", "Wallet", "Banknote", "Coins", "DollarSign", "Euro",
      "Receipt", "ReceiptText", "Invoice",
      "Truck", "Package2", "PackageCheck", "PackageX",
      "BarChart2", "TrendingUp", "PieChart", "Percent",
      "Calendar", "CalendarCheck", "CalendarDays", "CalendarClock",
      "Clock", "Clock1", "Clock3", "Clock8", "AlarmClock",
    ],
  },
  nature: {
    label: "Natur & Welt",
    color: "#0F6038",
    bg: "#D6F5F5",
    icons: [
      "Sun", "Moon", "Cloud", "CloudRain", "CloudSnow", "CloudLightning",
      "Wind", "Waves", "Flame", "Snowflake", "Leaf", "Flower", "Flower2",
      "TreePine", "Trees", "Mountain", "MountainSnow",
      "Globe", "Globe2", "Earth", "Satellite",
      "Zap", "Sparkles", "Star", "Stars", "Sunrise", "Sunset",
    ],
  },
};

const SIZES = [
  { label: "xs", px: 12, class: "w-3 h-3" },
  { label: "sm", px: 16, class: "w-4 h-4" },
  { label: "md", px: 20, class: "w-5 h-5" },
  { label: "lg", px: 24, class: "w-6 h-6" },
  { label: "xl", px: 32, class: "w-8 h-8" },
  { label: "2xl", px: 48, class: "w-12 h-12" },
];

/* ── Icon-Karte ── */
const IconCard: React.FC<{ name: string; color: string; bg: string }> = ({ name, color, bg }) => {
  const [copied, setCopied] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as Record<string, any>)[name] as React.FC<{ className?: string; style?: React.CSSProperties }> | undefined;
  if (!IconComponent) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`<${name} className="w-5 h-5" />`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-card hover:border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md relative"
      style={{ ["--hover-bg" as string]: bg }}
      title={`${name} — klicken zum Kopieren`}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
        style={{ background: bg }}
      >
        <IconComponent className="w-5 h-5 transition-colors duration-200" style={{ color }} />
      </div>
      <span className="text-[9px] font-mono text-muted-foreground group-hover:text-foreground transition-colors leading-tight text-center break-all max-w-full">
        {name}
      </span>
      {/* Copy feedback */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1"
            style={{ background: bg }}
          >
            <CheckCheck className="w-5 h-5" style={{ color }} />
            <span className="text-[9px] font-semibold font-ui" style={{ color }}>Kopiert!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export const IconsSection: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState("md");
  const [copiedAll, setCopiedAll] = useState<string | null>(null);

  // Alle Icons flach für die Suche
  const allIcons = useMemo(() => {
    return Object.entries(ICON_CATEGORIES).flatMap(([catKey, cat]) =>
      cat.icons.map(name => ({ name, catKey, color: cat.color, bg: cat.bg, label: cat.label }))
    );
  }, []);

  const filteredIcons = useMemo(() => {
    if (!search) return null;
    return allIcons.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, allIcons]);

  const totalCount = allIcons.length;

  return (
    <section className="space-y-10">

      {/* ── Header ── */}
      <div>
        <p className="section-label mb-2">08 — Icons</p>
        <h2 className="font-display text-3xl font-bold text-foreground tracking-tight mb-3">
          Icon-Set
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mb-4">
          <strong className="text-foreground">{totalCount}+ Icons</strong> aus Lucide React, kategorisiert und
          durchsuchbar. Alle Icons sind als React-Komponenten verfügbar, skalierbar und farbkodiert.
          Klicke auf ein Icon um den Import-Code zu kopieren.
        </p>
        <div className="flex flex-wrap gap-2">
          <GrainBadge variant="solid" size="sm" dot>Lucide React</GrainBadge>
          <GrainBadge variant="muted" size="sm">SVG-basiert</GrainBadge>
          <GrainBadge variant="muted" size="sm">Skalierbar</GrainBadge>
          <GrainBadge variant="muted" size="sm">Tree-shakeable</GrainBadge>
        </div>
      </div>

      {/* ── Suche + Filter ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Suchfeld */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Icon suchen … z.B. 'chart', 'user', 'arrow'"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 text-sm font-ui rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {/* Kategorie-Filter */}
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-2 text-xs font-semibold font-ui rounded-xl border transition-all ${
              activeCategory === null
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
            }`}
          >
            Alle
          </button>
          {Object.entries(ICON_CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              className={`px-3 py-2 text-xs font-semibold font-ui rounded-xl border transition-all`}
              style={activeCategory === key ? { background: cat.color, color: "white", borderColor: cat.color } : {}}
            >
              {cat.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Größen-Vorschau ── */}
      <GrainCard>
        <GrainCardHeader>
          <GrainCardTitle>Icon-Größen</GrainCardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">6 Standardgrößen · Tailwind-Klassen</p>
        </GrainCardHeader>
        <GrainCardContent>
          <div className="flex items-end gap-6 flex-wrap">
            {SIZES.map(size => (
              <button
                key={size.label}
                onClick={() => setActiveSize(size.label)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                  activeSize === size.label
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-border/60"
                }`}
              >
                <LucideIcons.Layers
                  style={{
                    width: size.px,
                    height: size.px,
                    color: activeSize === size.label ? "#000000" : "#6B6B6B"
                  }}
                />
                <div className="text-center">
                  <p className="text-[10px] font-semibold font-ui text-foreground">{size.label}</p>
                  <p className="text-[9px] font-mono text-muted-foreground">{size.px}px</p>
                  <p className="text-[9px] font-mono text-muted-foreground">{size.class}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-muted/50 border border-border">
            <p className="text-[10px] font-mono text-muted-foreground">
              <span className="text-[#1A9E5A]">import</span>{" "}
              {"{ Layers }"}{" "}
              <span className="text-[#1A9E5A]">from</span>{" "}
              <span className="text-[#000000] font-semibold">"lucide-react"</span>
              {" // "}
              <span className="text-muted-foreground">&lt;Layers className="{SIZES.find(s => s.label === activeSize)?.class}" /&gt;</span>
            </p>
          </div>
        </GrainCardContent>
      </GrainCard>

      {/* ── Suchergebnisse ── */}
      {search && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-ui font-semibold text-sm text-foreground">
              {filteredIcons?.length ?? 0} Ergebnisse für „{search}"
            </h3>
            <GrainBadge variant="muted" size="sm">{filteredIcons?.length} Icons</GrainBadge>
          </div>
          {filteredIcons && filteredIcons.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {filteredIcons.map(({ name, color, bg }) => (
                <IconCard key={name} name={name} color={color} bg={bg} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <LucideIcons.SearchX className="w-10 h-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-ui text-muted-foreground">Kein Icon gefunden für „{search}"</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Versuche einen anderen Suchbegriff</p>
            </div>
          )}
        </div>
      )}

      {/* ── Kategorien ── */}
      {!search && Object.entries(ICON_CATEGORIES)
        .filter(([key]) => !activeCategory || key === activeCategory)
        .map(([catKey, cat]) => (
          <motion.div
            key={catKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                <h3 className="font-ui font-semibold text-sm text-foreground">{cat.label}</h3>
                <span className="text-[10px] font-mono text-muted-foreground">{cat.icons.length} Icons</span>
              </div>
              <button
                onClick={() => {
                  const code = cat.icons.map(n => `import { ${n} } from "lucide-react";`).join("\n");
                  navigator.clipboard.writeText(code);
                  setCopiedAll(catKey);
                  setTimeout(() => setCopiedAll(null), 1500);
                }}
                className="flex items-center gap-1.5 text-[10px] font-semibold font-ui text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-muted"
              >
                {copiedAll === catKey ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedAll === catKey ? "Kopiert!" : "Alle kopieren"}
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
              {cat.icons.map(name => (
                <IconCard key={`${catKey}-${name}`} name={name} color={cat.color} bg={cat.bg} />
              ))}
            </div>
          </motion.div>
        ))
      }

      {/* ── Farbkodierte Icons ── */}
      {!search && !activeCategory && (
        <GrainCard>
          <GrainCardHeader>
            <GrainCardTitle>Icons mit semantischer Farbkodierung</GrainCardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Icons kommunizieren Bedeutung durch Farbe – konsistent mit dem Datenfarbsystem
            </p>
          </GrainCardHeader>
          <GrainCardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { icon: "TrendingUp",    label: "Positiv",  color: "#0F6038", bg: "#C3F4D3", desc: "Wachstum, Erfolg" },
                { icon: "TrendingDown",  label: "Negativ",  color: "#A01A08", bg: "#FDEEE9", desc: "Rückgang, Fehler" },
                { icon: "AlertTriangle", label: "Warnung",  color: "#7A4800", bg: "#FFF5BA", desc: "Aufmerksamkeit" },
                { icon: "Info",          label: "Info",     color: "#000000", bg: "#D4E8FF", desc: "Hinweis, Kontext" },
                { icon: "AlertCircle",   label: "Kritisch", color: "#A01A08", bg: "#FDEEE9", desc: "Dringend, Eskalation" },
                { icon: "Minus",         label: "Neutral",  color: "#3A4560", bg: "#F0F2F7", desc: "Stabil, unverändert" },
              ].map(({ icon, label, color, bg, desc }) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Icon = (LucideIcons as Record<string, any>)[icon] as React.FC<{ className?: string; style?: React.CSSProperties }> | undefined;
                if (!Icon) return null;
                return (
                  <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border text-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: bg }}>
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold font-ui text-foreground">{label}</p>
                      <p className="text-[10px] font-ui text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </GrainCardContent>
        </GrainCard>
      )}

    </section>
  );
};
