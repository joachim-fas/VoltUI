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
      "ArrowUpRight", "ArrowDownLeft", "ArrowUpLeft", "ArrowDownRight",
      "Navigation", "Compass", "Map", "MapPin", "MapPinned",
      "MoveLeft", "MoveRight", "MoveUp", "MoveDown", "Move",
      "ChevronsLeft", "ChevronsRight", "ChevronsUpDown",
    ],
  },
  actions: {
    label: "Aktionen & Operationen",
    color: "#1A1A1A",
    bg: "#E4FF97",
    icons: [
      "Plus", "Minus", "X", "Check", "Search", "Filter", "SortAsc", "SortDesc",
      "Edit", "Edit2", "Edit3", "Pencil", "PencilLine", "Trash", "Trash2",
      "Copy", "Clipboard", "ClipboardCheck", "ClipboardList", "ClipboardPaste",
      "Download", "Upload", "Share", "Share2", "Send", "SendHorizontal",
      "RefreshCw", "RefreshCcw", "RotateCw", "RotateCcw",
      "Undo", "Undo2", "Redo", "Redo2",
      "ZoomIn", "ZoomOut", "Maximize", "Minimize", "Maximize2", "Minimize2",
      "Lock", "Unlock", "Eye", "EyeOff", "Pin", "PinOff",
    ],
  },
  data: {
    label: "Daten & Visualisierung",
    color: "#0F6038",
    bg: "#C3F4D3",
    icons: [
      "BarChart", "BarChart2", "BarChart3", "BarChart4", "BarChartHorizontal",
      "LineChart", "AreaChart", "PieChart", "DonutChart",
      "TrendingUp", "TrendingDown", "Activity", "Gauge", "Target", "Radar",
      "Table", "TableProperties", "TableColumns", "TableRows",
      "Database", "DatabaseBackup", "DatabaseZap", "Server", "HardDrive",
      "FileSpreadsheet", "FileBarChart", "FileBarChart2", "ChartPie",
      "Sigma", "Hash", "Binary", "Braces", "BracesIcon",
    ],
  },
  communication: {
    label: "Kommunikation & Social",
    color: "#1A3A8A",
    bg: "#D6E4FF",
    icons: [
      "MessageSquare", "MessageSquarePlus", "MessageSquareText", "MessageCircle",
      "Mail", "MailOpen", "MailPlus", "Inbox", "InboxIcon",
      "Bell", "BellRing", "BellOff", "BellDot",
      "Phone", "PhoneCall", "PhoneIncoming", "PhoneOutgoing", "PhoneMissed",
      "Video", "VideoOff", "Mic", "MicOff", "Volume", "Volume2", "VolumeX",
      "AtSign", "Hash", "Link", "Link2", "ExternalLink", "Globe",
      "Reply", "ReplyAll", "Forward",
    ],
  },
  media: {
    label: "Medien & Dateien",
    color: "#6A1A6A",
    bg: "#F0D6FF",
    icons: [
      "Image", "ImagePlus", "ImageOff", "Images", "Camera", "CameraOff",
      "Film", "Clapperboard", "Music", "Music2", "Music3", "Music4",
      "Play", "Pause", "Stop", "SkipBack", "SkipForward", "Rewind", "FastForward",
      "FileText", "File", "FilePlus", "FilePlus2", "FileCheck", "FileCheck2",
      "FileImage", "FileVideo", "FileAudio", "FileCode", "FileCog",
      "Folder", "FolderOpen", "FolderPlus", "FolderTree",
      "Archive", "Package", "Package2", "PackageOpen",
    ],
  },
  tech: {
    label: "Technologie & Code",
    color: "#1A4A6A",
    bg: "#D6F0FF",
    icons: [
      "Code", "Code2", "CodeXml", "Terminal", "TerminalSquare",
      "Cpu", "Bot", "BrainCircuit", "Brain", "Workflow", "GitBranch",
      "GitCommit", "GitMerge", "GitPullRequest", "Github",
      "Bug", "BugOff", "Wrench", "WrenchIcon", "Settings", "Settings2",
      "Globe", "Monitor", "MonitorCheck", "Laptop", "Laptop2",
      "Smartphone", "Tablet", "Keyboard", "Mouse", "Printer",
      "Wifi", "WifiOff", "Bluetooth", "BluetoothConnected",
      "Cloud", "CloudUpload", "CloudDownload", "CloudOff",
    ],
  },
  finance: {
    label: "Finance & Business",
    color: "#0A4A20",
    bg: "#C3F4D3",
    icons: [
      "DollarSign", "Euro", "PoundSterling", "JapaneseYen", "Bitcoin",
      "Coins", "Banknote", "CreditCard", "Wallet", "PiggyBank",
      "HandCoins", "TrendingUp", "TrendingDown", "BarChart2",
      "Receipt", "ReceiptText", "Scale", "Percent", "Calculator",
      "Landmark", "Building", "Building2", "Briefcase", "BriefcaseBusiness",
      "ShoppingCart", "ShoppingBag", "Store", "Package",
    ],
  },
  innovation: {
    label: "Innovation & Zukunft",
    color: "#4A0A7A",
    bg: "#EDD4FF",
    icons: [
      "Lightbulb", "LightbulbOff", "Sparkles", "Zap", "ZapOff",
      "Rocket", "Wand", "Wand2", "FlaskConical", "FlaskRound",
      "Microscope", "Atom", "Dna", "BrainCircuit", "Brain",
      "Bot", "Cpu", "Telescope", "Satellite", "SatelliteDish",
      "Network", "Workflow", "CircuitBoard", "Microchip",
    ],
  },
  social: {
    label: "Social & Community",
    color: "#8A1A3A",
    bg: "#FFD6E0",
    icons: [
      "Heart", "HeartHandshake", "HeartPulse", "Handshake",
      "Users", "Users2", "UserPlus", "UserCheck", "UserMinus",
      "Share2", "ThumbsUp", "ThumbsDown", "Smile", "SmilePlus",
      "PartyPopper", "Gift", "Star", "StarOff", "Trophy",
      "Flag", "Rss", "Bell", "Globe2",
    ],
  },
  nature: {
    label: "Natur & Klima",
    color: "#0F6038",
    bg: "#D6F5F5",
    icons: [
      "Sun", "SunMedium", "SunDim", "Moon", "MoonStar",
      "Cloud", "CloudRain", "CloudSnow", "CloudLightning", "CloudFog",
      "Wind", "Waves", "Droplets", "Droplet",
      "Flame", "Leaf", "LeafyGreen", "TreePine", "TreeDeciduous",
      "Mountain", "MountainSnow", "Globe", "Globe2",
      "Zap", "Sparkles", "Sunrise", "Sunset", "Thermometer",
    ],
  },
  health: {
    label: "Gesundheit & Medizin",
    color: "#8A1A1A",
    bg: "#FFD6D6",
    icons: [
      "Stethoscope", "Pill", "Syringe", "HeartPulse", "Activity",
      "Baby", "PersonStanding", "Accessibility",
      "Cross", "Plus", "Shield", "ShieldCheck",
      "Eye", "EyeOff", "Brain", "Dna",
      "Thermometer", "Scale", "ClipboardList", "ClipboardPlus",
    ],
  },
  geopolitics: {
    label: "Geopolitik & Sicherheit",
    color: "#3A1A0A",
    bg: "#FFE8D6",
    icons: [
      "Globe", "Globe2", "Map", "MapPin", "MapPinned",
      "Flag", "FlagOff", "Shield", "ShieldAlert", "ShieldCheck", "ShieldOff",
      "Swords", "Crosshair", "Target", "AlertTriangle", "AlertOctagon",
      "Landmark", "Building", "Building2", "Vote",
      "Lock", "Unlock", "Key", "KeyRound",
      "Eye", "EyeOff", "Search", "ScanSearch",
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
        </div>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Lucide-Icons in zwölf thematischen Kategorien. Klick auf ein Icon kopiert den JSX-Import direkt in die Zwischenablage.
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
