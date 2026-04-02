/**
 * UIIconsSection – Volt UI
 * Lucide Icons: kategorisiert, durchsuchbar, copy-to-clipboard
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Search, CheckCheck, X } from "lucide-react";

const LUCIDE_CATEGORIES: Record<string, { label: string; color: string; bg: string; icons: string[] }> = {
  navigation: {
    label: "Navigation & Layout",
    color: "#1A1A1A",
    bg: "#F4F4F4",
    icons: [
      "Home", "LayoutDashboard", "LayoutGrid", "Sidebar", "PanelLeft", "PanelRight",
      "Menu", "MoreHorizontal", "MoreVertical", "ChevronLeft", "ChevronRight",
      "ChevronUp", "ChevronDown", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
      "ArrowUpRight", "Navigation", "Compass", "Map", "MapPin",
    ],
  },
  actions: {
    label: "Aktionen & Operationen",
    color: "#1A1A1A",
    bg: "#E4FF97",
    icons: [
      "Plus", "Minus", "X", "Check", "Search", "Filter", "SortAsc", "SortDesc",
      "Edit", "Pencil", "Trash2", "Copy", "Clipboard", "ClipboardCheck",
      "Download", "Upload", "Share2", "Send", "RefreshCw", "RotateCw",
      "Undo2", "Redo2", "ZoomIn", "ZoomOut",
    ],
  },
  data: {
    label: "Daten & Visualisierung",
    color: "#0F6038",
    bg: "#C3F4D3",
    icons: [
      "BarChart", "BarChart2", "BarChart3", "LineChart", "AreaChart", "PieChart",
      "TrendingUp", "TrendingDown", "Activity", "Gauge", "Target", "Radar",
      "Table", "TableProperties", "Database", "Server", "HardDrive",
      "FileSpreadsheet", "FileBarChart", "ChartPie",
    ],
  },
  communication: {
    label: "Kommunikation & Social",
    color: "#1A3A8A",
    bg: "#D6E4FF",
    icons: [
      "MessageSquare", "MessageCircle", "Mail", "Inbox", "Bell", "BellRing",
      "Phone", "PhoneCall", "Video", "Mic", "MicOff", "Volume2",
      "AtSign", "Hash", "Link", "Link2", "ExternalLink", "Globe",
    ],
  },
  media: {
    label: "Medien & Dateien",
    color: "#6A1A6A",
    bg: "#F0D6FF",
    icons: [
      "Image", "ImagePlus", "Camera", "Film", "Music", "Play", "Pause",
      "FileText", "File", "FilePlus", "FileCheck", "FileImage", "FileVideo",
      "Folder", "FolderOpen", "FolderPlus", "Archive", "Package",
    ],
  },
  tech: {
    label: "Technologie & Code",
    color: "#1A4A6A",
    bg: "#D6F0FF",
    icons: [
      "Code", "Code2", "Terminal", "Cpu", "Bot", "BrainCircuit", "Workflow",
      "GitBranch", "GitCommit", "Bug", "Wrench", "Settings", "Settings2",
      "Globe", "Monitor", "Laptop", "Smartphone", "Keyboard",
    ],
  },
  finance: {
    label: "Finance & Business",
    color: "#0A4A20",
    bg: "#C3F4D3",
    icons: [
      "DollarSign", "Euro", "Bitcoin", "Coins", "Banknote", "CreditCard",
      "Wallet", "PiggyBank", "HandCoins", "TrendingUp", "BarChart2",
      "Receipt", "Scale", "Percent", "Calculator", "Landmark",
    ],
  },
  innovation: {
    label: "Innovation & Zukunft",
    color: "#4A0A7A",
    bg: "#EDD4FF",
    icons: [
      "Lightbulb", "Sparkles", "Zap", "Rocket", "Wand2", "FlaskConical",
      "Microscope", "Atom", "Dna", "BrainCircuit", "Bot", "Cpu",
      "Telescope", "Satellite", "Network", "Workflow",
    ],
  },
  social: {
    label: "Social & Community",
    color: "#8A1A3A",
    bg: "#FFD6E0",
    icons: [
      "Heart", "HeartHandshake", "Handshake", "Users", "Share2",
      "ThumbsUp", "Smile", "PartyPopper", "Gift", "Star", "Trophy",
      "Flag", "Rss", "Bell",
    ],
  },
  nature: {
    label: "Natur & Klima",
    color: "#0F6038",
    bg: "#D6F5F5",
    icons: [
      "Sun", "Moon", "Cloud", "CloudRain", "Wind", "Waves", "Flame",
      "Leaf", "TreePine", "Mountain", "Globe", "Satellite",
      "Zap", "Sparkles", "Sunrise",
    ],
  },
};

const IconCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  accentColor: string;
  accentBg: string;
  onCopy: () => void;
  copied: boolean;
}> = ({ icon, label, accentColor, accentBg, onCopy, copied }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onCopy}
      className="relative flex flex-col items-center gap-2 rounded-xl border bg-card transition-all duration-200 cursor-pointer p-3"
      style={{
        borderColor: hovered ? `${accentColor}55` : "var(--border)",
        boxShadow: hovered ? `0 4px 16px ${accentColor}18` : "none",
      }}
    >
      <div
        className="flex items-center justify-center rounded-lg transition-all duration-200"
        style={{ width: 40, height: 40, background: hovered ? accentBg : `${accentColor}10` }}
      >
        {icon}
      </div>
      <p className="text-[9px] font-mono text-muted-foreground text-center leading-tight break-all">{label}</p>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1"
            style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}40` }}
          >
            <CheckCheck className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-[8px] font-mono font-semibold" style={{ color: accentColor }}>Kopiert</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function UIIconsSection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const totalCount = useMemo(
    () => Object.values(LUCIDE_CATEGORIES).reduce((sum, cat) => sum + cat.icons.length, 0), []
  );

  const allIcons = useMemo(() =>
    Object.entries(LUCIDE_CATEGORIES).flatMap(([catKey, cat]) =>
      cat.icons.map(name => ({ name, catKey, color: cat.color, bg: cat.bg }))
    ), []);

  const filteredIcons = useMemo(() => {
    if (!search) return null;
    return allIcons.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, allIcons]);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<${name} className="w-5 h-5" />`);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1400);
  };

  return (
    <section className="space-y-8">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Icon-Sets · UI-Icons</p>
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-display font-bold text-3xl text-foreground tracking-tight">UI-Icons</h2>
          <span className="px-2.5 py-1 rounded-xl text-[11px] font-mono bg-muted text-muted-foreground border border-border">{totalCount}+ Icons</span>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Lucide-Icons in zehn thematischen Kategorien. Klick auf ein Icon kopiert den JSX-Import direkt in die Zwischenablage.
        </p>
      </div>

      <div className="space-y-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Icon suchen …"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-9 text-sm font-mono rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/15 focus:border-foreground/30 transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 text-[11px] font-semibold rounded-xl border transition-all ${activeCategory === null ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground bg-card"}`}
          >
            Alle
          </button>
          {Object.entries(LUCIDE_CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              className="px-3 py-1.5 text-[11px] font-semibold rounded-xl border transition-all"
              style={activeCategory === key
                ? { background: cat.bg, color: cat.color, borderColor: `${cat.color}40` }
                : { background: "var(--card)", color: "var(--muted-foreground)", borderColor: "var(--border)" }
              }
            >
              {cat.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {search && (
        <div>
          <p className="text-[11px] font-mono text-muted-foreground mb-4">{filteredIcons?.length ?? 0} Ergebnisse für „{search}"</p>
          {filteredIcons && filteredIcons.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
              {filteredIcons.map(({ name, color, bg }) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Ic = (LucideIcons as Record<string, any>)[name] as React.FC<{ className?: string; style?: React.CSSProperties }> | undefined;
                if (!Ic) return null;
                return (
                  <IconCard key={name} icon={<Ic className="w-5 h-5" style={{ color }} />} label={name} accentColor={color} accentBg={bg} onCopy={() => handleCopy(name)} copied={copiedName === name} />
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <LucideIcons.SearchX className="w-10 h-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">Kein Icon für „{search}"</p>
            </div>
          )}
        </div>
      )}

      {!search && (
        <div className="space-y-8">
          {Object.entries(LUCIDE_CATEGORIES)
            .filter(([key]) => !activeCategory || key === activeCategory)
            .map(([catKey, cat]) => (
              <motion.div key={catKey} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                  <h3 className="text-[12px] font-semibold text-foreground">{cat.label}</h3>
                  <span className="text-[10px] font-mono text-muted-foreground">{cat.icons.length}</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
                  {cat.icons.map(name => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Ic = (LucideIcons as Record<string, any>)[name] as React.FC<{ className?: string; style?: React.CSSProperties }> | undefined;
                    if (!Ic) return null;
                    return (
                      <IconCard key={`${catKey}-${name}`} icon={<Ic className="w-5 h-5" style={{ color: cat.color }} />} label={name} accentColor={cat.color} accentBg={cat.bg} onCopy={() => handleCopy(name)} copied={copiedName === name} />
                    );
                  })}
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </section>
  );
}
