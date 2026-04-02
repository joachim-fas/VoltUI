/**
 * IconSetsSection – Volt UI
 * ─────────────────────────────────────────────────────────────────────────────
 * Alle Icon-Sets in einer Section mit Tab-Navigation:
 *   Tab 1 – Lucide Icons (611+, durchsuchbar, kategorisiert)
 *   Tab 2 – Kategorie-Icons (12 SVG) + Analyse-Methoden (6 SVG)
 *   Tab 3 – Skeuomorphic Icons (18, 3D-Plastik-Grau-Stil)
 *
 * Einheitlicher Karten-Stil über alle Tabs hinweg.
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Search, Copy, CheckCheck, X } from "lucide-react";
import { SKEU_ICONS } from "@/components/volt/SkeuomorphicIcons";

/* ══════════════════════════════════════════════════════════════════════
   LUCIDE ICON-KATEGORIEN
══════════════════════════════════════════════════════════════════════ */

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
      "TrendingUp", "TrendingDown", "Activity", "Table", "Database", "DatabaseZap",
      "FileSpreadsheet", "Sigma", "Hash", "Percent", "Target", "Gauge",
    ],
  },
  communication: {
    label: "Kommunikation",
    color: "#1A4A8A",
    bg: "#D4E8FF",
    icons: [
      "MessageSquare", "MessageCircle", "Mail", "MailOpen", "MailCheck",
      "Bell", "BellRing", "Phone", "PhoneCall", "Video", "Mic",
      "AtSign", "Link", "ExternalLink",
    ],
  },
  files: {
    label: "Dateien & Medien",
    color: "#7A4800",
    bg: "#FFF5BA",
    icons: [
      "File", "FileText", "FileCode", "FileJson", "FilePlus", "FileCheck",
      "Folder", "FolderOpen", "FolderPlus", "Image", "Camera", "Film",
      "Music", "Archive", "Package", "Paperclip", "HardDrive",
    ],
  },
  status: {
    label: "Status & Feedback",
    color: "#A01A08",
    bg: "#FDEEE9",
    icons: [
      "CheckCircle2", "XCircle", "AlertCircle", "AlertTriangle", "Info",
      "HelpCircle", "ShieldCheck", "ShieldAlert", "Lock", "LockOpen",
      "Eye", "EyeOff", "Loader2", "Wifi", "WifiOff",
    ],
  },
  users: {
    label: "Nutzer & Teams",
    color: "#8A1A3A",
    bg: "#FFD6E0",
    icons: [
      "User", "UserCircle", "Users", "Users2", "UserPlus", "UserCheck",
      "Contact", "Briefcase", "Building", "Crown", "Star", "Award",
      "Fingerprint", "BadgeCheck",
    ],
  },
  tech: {
    label: "Technologie & Code",
    color: "#4A0A7A",
    bg: "#EDD4FF",
    icons: [
      "Code", "Code2", "Terminal", "Command", "Cpu", "Server", "Cloud",
      "Globe", "Monitor", "Laptop", "Smartphone", "Keyboard",
      "GitBranch", "GitCommit", "Bug", "Wrench", "Settings2",
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

/* ══════════════════════════════════════════════════════════════════════
   KATEGORIE-ICONS (SVG)
══════════════════════════════════════════════════════════════════════ */

const CategoryIcons = {
  NewsMedian: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="3" y="5" width="22" height="18" rx="2.5" stroke={color} strokeWidth="1.6" />
      <line x1="3" y1="10" x2="25" y2="10" stroke={color} strokeWidth="1.4" />
      <rect x="6" y="13" width="8" height="7" rx="1" fill={color} opacity="0.25" stroke={color} strokeWidth="1.2" />
      <line x1="17" y1="13" x2="22" y2="13" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="17" y1="16" x2="22" y2="16" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="17" y1="19" x2="20" y2="19" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="6.5" cy="7.5" r="1" fill={color} />
      <circle cx="9.5" cy="7.5" r="1" fill={color} />
      <circle cx="12.5" cy="7.5" r="1" fill={color} />
    </svg>
  ),
  DatenStatistik: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="4" y="16" width="4" height="8" rx="1" fill={color} opacity="0.35" stroke={color} strokeWidth="1.3" />
      <rect x="10" y="11" width="4" height="13" rx="1" fill={color} opacity="0.55" stroke={color} strokeWidth="1.3" />
      <rect x="16" y="7" width="4" height="17" rx="1" fill={color} opacity="0.75" stroke={color} strokeWidth="1.3" />
      <rect x="22" y="4" width="4" height="20" rx="1" fill={color} opacity="0.90" stroke={color} strokeWidth="1.3" />
      <polyline points="4,15 10,10 16,6 22,3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
      <circle cx="4" cy="15" r="1.5" fill={color} />
      <circle cx="10" cy="10" r="1.5" fill={color} />
      <circle cx="16" cy="6" r="1.5" fill={color} />
      <circle cx="22" cy="3" r="1.5" fill={color} />
    </svg>
  ),
  WissenschaftForschung: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M10 4 L10 14 L4 22 L24 22 L18 14 L18 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="8" y1="4" x2="20" y2="4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="11" cy="18" r="2" fill={color} opacity="0.5" />
      <circle cx="17" cy="16" r="1.5" fill={color} opacity="0.7" />
      <circle cx="14" cy="20" r="1" fill={color} opacity="0.4" />
      <line x1="13" y1="8" x2="15" y2="8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="13" y1="11" x2="15" y2="11" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  GeopolitikKonflikte: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="1.6" fill="none" />
      <ellipse cx="14" cy="14" rx="4.5" ry="10" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
      <line x1="4" y1="14" x2="24" y2="14" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <line x1="6" y1="9" x2="22" y2="9" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="6" y1="19" x2="22" y2="19" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M14 4 Q18 8 18 14 Q18 20 14 24" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
      <circle cx="14" cy="14" r="2.5" fill={color} opacity="0.3" stroke={color} strokeWidth="1.2" />
    </svg>
  ),
  FinanzenMaerkte: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <polyline points="3,20 8,13 12,16 17,8 22,11 25,6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="3" y1="24" x2="25" y2="24" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="3" y1="24" x2="3" y2="4" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="7" y="16" width="3" height="8" rx="0.5" fill={color} opacity="0.25" />
      <rect x="12" y="14" width="3" height="10" rx="0.5" fill={color} opacity="0.4" />
      <rect x="17" y="11" width="3" height="13" rx="0.5" fill={color} opacity="0.6" />
    </svg>
  ),
  UmfragenMeinungsforschung: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="3" y="3" width="22" height="16" rx="2.5" stroke={color} strokeWidth="1.6" fill="none" />
      <path d="M8 22 L8 19 L20 19 L20 22" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="14" y1="22" x2="14" y2="25" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="9" r="1.5" fill={color} opacity="0.5" />
      <circle cx="14" cy="9" r="1.5" fill={color} opacity="0.7" />
      <circle cx="19" cy="9" r="1.5" fill={color} opacity="0.9" />
      <line x1="7" y1="13" x2="11" y2="13" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="12" y1="13" x2="16" y2="13" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="17" y1="13" x2="21" y2="13" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  PredictionMarkets: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="1.6" fill="none" />
      <path d="M14 4 L14 14 L21 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="14" cy="14" r="2" fill={color} />
      <line x1="14" y1="4" x2="14" y2="6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="24" y1="14" x2="22" y2="14" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="4" y1="14" x2="6" y2="14" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14" y1="24" x2="14" y2="22" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 19 Q11 22 14 22 Q17 22 20 19" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
    </svg>
  ),
  InnovationPatente: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 3 Q20 6 20 12 Q20 17 17 19 L17 22 L11 22 L11 19 Q8 17 8 12 Q8 6 14 3 Z" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <line x1="11" y1="22" x2="17" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="25" x2="17" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="7" x2="14" y2="15" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <line x1="10" y1="11" x2="18" y2="11" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <circle cx="14" cy="11" r="1.5" fill={color} opacity="0.4" />
    </svg>
  ),
  SocialCommunity: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="9" r="4" stroke={color} strokeWidth="1.6" fill="none" />
      <circle cx="6" cy="19" r="3" stroke={color} strokeWidth="1.4" fill="none" opacity="0.7" />
      <circle cx="22" cy="19" r="3" stroke={color} strokeWidth="1.4" fill="none" opacity="0.7" />
      <path d="M10 14 Q8 15 6 16" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M18 14 Q20 15 22 16" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M10 14 Q14 17 18 14" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  ),
  KlimaUmwelt: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 3 Q20 8 20 15 Q20 22 14 25 Q8 22 8 15 Q8 8 14 3 Z" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <path d="M14 25 L14 12" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      <path d="M14 18 Q11 15 8 15" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M14 14 Q17 11 20 11" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" />
      <circle cx="14" cy="10" r="1.5" fill={color} opacity="0.5" />
    </svg>
  ),
  GesundheitBevoelkerung: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 22 Q6 17 6 11 Q6 6 11 6 Q13 6 14 8 Q15 6 17 6 Q22 6 22 11 Q22 17 14 22 Z" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <line x1="14" y1="10" x2="14" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="11" y1="13" x2="17" y2="13" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  ),
  ForesightSzenarien: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="4" stroke={color} strokeWidth="1.6" fill="none" />
      <circle cx="14" cy="14" r="8" stroke={color} strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="3 3" />
      <line x1="14" y1="3" x2="14" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="21" x2="14" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="14" x2="7" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="14" x2="25" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6.5" y1="6.5" x2="9.3" y2="9.3" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <line x1="18.7" y1="18.7" x2="21.5" y2="21.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <line x1="21.5" y1="6.5" x2="18.7" y2="9.3" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <line x1="9.3" y1="18.7" x2="6.5" y2="21.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
      <circle cx="14" cy="14" r="2" fill={color} opacity="0.6" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════════════════════
   METHODEN-ICONS (SVG)
══════════════════════════════════════════════════════════════════════ */

const MethodIcons = {
  Marktanalyse: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="3" y="3" width="10" height="10" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
      <rect x="15" y="3" width="10" height="10" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
      <rect x="3" y="15" width="10" height="10" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
      <rect x="15" y="15" width="10" height="10" rx="1.5" stroke={color} strokeWidth="1.6" fill="none" />
      <line x1="14" y1="1" x2="14" y2="27" stroke={color} strokeWidth="1.1" opacity="0.3" />
      <line x1="1" y1="14" x2="27" y2="14" stroke={color} strokeWidth="1.1" opacity="0.3" />
    </svg>
  ),
  WarGaming: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <polygon points="14,2 26,9 26,21 14,26 2,21 2,9" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <polygon points="14,8 21,12 21,18 14,22 7,18 7,12" stroke={color} strokeWidth="1.1" fill="none" strokeLinejoin="round" opacity="0.45" />
      <circle cx="14" cy="15" r="2.5" fill={color} opacity="0.4" stroke={color} strokeWidth="1.3" />
      <line x1="14" y1="2" x2="14" y2="8" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      <line x1="26" y1="9" x2="21" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  PreMortem: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 3 L26 24 L2 24 Z" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <line x1="14" y1="10" x2="14" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="20.5" r="1.5" fill={color} />
    </svg>
  ),
  PostMortem: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" stroke={color} strokeWidth="1.6" fill="none" />
      <circle cx="14" cy="14" r="5" stroke={color} strokeWidth="1.3" fill="none" opacity="0.45" />
      <line x1="14" y1="3" x2="14" y2="9" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14" y1="19" x2="14" y2="25" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="3" y1="14" x2="9" y2="14" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="19" y1="14" x2="25" y2="14" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  TrendDeepDive: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.6" fill="none" />
      <circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth="1.1" fill="none" opacity="0.45" />
      <circle cx="12" cy="12" r="1.8" fill={color} opacity="0.6" />
      <line x1="18" y1="18" x2="25" y2="25" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Stakeholder: ({ size = 28, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="9" r="3.5" stroke={color} strokeWidth="1.6" fill="none" />
      <path d="M8 24 Q8 19 14 19 Q20 19 20 24" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="6" cy="12" r="2.5" stroke={color} strokeWidth="1.3" fill="none" opacity="0.65" />
      <path d="M2 24 Q2 20 6 20" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.65" />
      <circle cx="22" cy="12" r="2.5" stroke={color} strokeWidth="1.3" fill="none" opacity="0.65" />
      <path d="M26 24 Q26 20 22 20" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.65" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════════════════════
   DATEN-LISTEN
══════════════════════════════════════════════════════════════════════ */

const CATEGORY_ICON_LIST = [
  { label: "News & Medien",               sublabel: "Nachrichten, Presse, Broadcast",          Icon: CategoryIcons.NewsMedian,                color: "#7AB8F5" },
  { label: "Daten & Statistik",           sublabel: "Kennzahlen, Indikatoren, Berichte",        Icon: CategoryIcons.DatenStatistik,            color: "#6DDBA0" },
  { label: "Wissenschaft & Forschung",    sublabel: "Papers, Studien, Experimente",             Icon: CategoryIcons.WissenschaftForschung,     color: "#D98AE8" },
  { label: "Geopolitik & Konflikte",      sublabel: "Regionen, Akteure, Ereignisse",            Icon: CategoryIcons.GeopolitikKonflikte,        color: "#F4A0B5" },
  { label: "Finanzen & Märkte",           sublabel: "Kurse, Indizes, Makroökonomie",            Icon: CategoryIcons.FinanzenMaerkte,           color: "#F5C87A" },
  { label: "Umfragen & Meinungsforschung",sublabel: "Surveys, Panels, Sentiment",               Icon: CategoryIcons.UmfragenMeinungsforschung, color: "#F0956A" },
  { label: "Prediction Markets",          sublabel: "Wetten, Prognosen, Wahrscheinlichkeiten",  Icon: CategoryIcons.PredictionMarkets,         color: "#5ECECE" },
  { label: "Innovation & Patente",        sublabel: "Technologien, Erfindungen, Trends",        Icon: CategoryIcons.InnovationPatente,         color: "#E8C840" },
  { label: "Social & Community",          sublabel: "Netzwerke, Diskurse, Gruppen",             Icon: CategoryIcons.SocialCommunity,           color: "#7AB8F5" },
  { label: "Klima & Umwelt",              sublabel: "Klimadaten, Ökosysteme, ESG",              Icon: CategoryIcons.KlimaUmwelt,               color: "#6DDBA0" },
  { label: "Gesundheit & Bevölkerung",    sublabel: "Epidemiologie, Demografie",                Icon: CategoryIcons.GesundheitBevoelkerung,    color: "#F4A0B5" },
  { label: "Foresight & Szenarien",       sublabel: "Zukunftsbilder, Strategien",               Icon: CategoryIcons.ForesightSzenarien,        color: "#D98AE8" },
];

const METHOD_LIST = [
  { label: "Marktanalyse",    sublabel: "4 Quadranten SWOT",      Icon: MethodIcons.Marktanalyse,   color: "#7AB8F5" },
  { label: "War-Gaming",      sublabel: "3 Szenarien + Strategie", Icon: MethodIcons.WarGaming,      color: "#F5C87A" },
  { label: "Pre-Mortem",      sublabel: "Was könnte schiefgehen?", Icon: MethodIcons.PreMortem,      color: "#F4A0B5" },
  { label: "Post-Mortem",     sublabel: "Ursachen-Analyse",        Icon: MethodIcons.PostMortem,     color: "#6DDBA0" },
  { label: "Trend Deep-Dive", sublabel: "Trend von allen Seiten",  Icon: MethodIcons.TrendDeepDive,  color: "#D98AE8" },
  { label: "Stakeholder",     sublabel: "Akteure & Einfluss",      Icon: MethodIcons.Stakeholder,    color: "#5ECECE" },
];

/* ══════════════════════════════════════════════════════════════════════
   GEMEINSAME KARTEN-KOMPONENTEN
══════════════════════════════════════════════════════════════════════ */

/** Einheitliche Icon-Karte für alle drei Tabs */
const IconCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  accentColor: string;
  onCopy?: () => void;
  copied?: boolean;
  size?: "sm" | "md";
}> = ({ icon, label, sublabel, accentColor, onCopy, copied, size = "sm" }) => {
  const [hovered, setHovered] = useState(false);
  const iconSize = size === "md" ? 52 : 44;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onCopy}
      className={`relative flex flex-col rounded-xl border bg-card transition-all duration-200 ${onCopy ? "cursor-pointer" : "cursor-default"}`}
      style={{
        borderColor: hovered ? `${accentColor}55` : "var(--border)",
        boxShadow: hovered ? `0 4px 20px ${accentColor}20` : "none",
        padding: size === "md" ? "16px 16px 14px" : "12px 10px 10px",
      }}
    >
      {/* Icon-Hintergrund */}
      <div
        className="flex items-center justify-center rounded-xl mb-3 flex-shrink-0 transition-all duration-200"
        style={{
          width: iconSize,
          height: iconSize,
          background: hovered ? `${accentColor}28` : `${accentColor}15`,
          border: `1px solid ${accentColor}${hovered ? "45" : "25"}`,
        }}
      >
        {icon}
      </div>

      {/* Label */}
      <p className="text-[11px] font-semibold text-foreground leading-tight mb-0.5 break-words">
        {label}
      </p>

      {/* Sublabel */}
      {sublabel && (
        <p className="text-[9px] font-mono text-muted-foreground leading-tight">
          {sublabel}
        </p>
      )}

      {/* Copy-Feedback */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1"
            style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}45` }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8 L6.5 11.5 L13 5" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[9px] font-mono font-semibold" style={{ color: accentColor }}>Kopiert</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/** Methoden-Karte (horizontal, größer) */
const MethodCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  accentColor: string;
}> = ({ icon, label, sublabel, accentColor }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 rounded-xl border bg-card transition-all duration-200 cursor-default"
      style={{
        padding: "16px 18px",
        borderColor: hovered ? `${accentColor}55` : "var(--border)",
        boxShadow: hovered ? `0 4px 20px ${accentColor}20` : "none",
      }}
    >
      <div
        className="flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-200"
        style={{
          width: 52,
          height: 52,
          background: hovered ? `${accentColor}28` : `${accentColor}15`,
          border: `1px solid ${accentColor}${hovered ? "45" : "25"}`,
        }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[13px] font-semibold text-foreground leading-tight mb-1">{label}</p>
        <p className="text-[10px] font-mono text-muted-foreground leading-tight">{sublabel}</p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   TAB 1: LUCIDE ICONS
══════════════════════════════════════════════════════════════════════ */

const LucideTab: React.FC = () => {
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
    <div className="space-y-8">
      {/* Suche + Filter */}
      <div className="space-y-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Icon suchen …"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-9 text-sm font-mono rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/15 focus:border-foreground/30 transition-all"
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
            className={`px-3 py-1.5 text-[11px] font-semibold rounded-xl border transition-all ${
              activeCategory === null
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 bg-card"
            }`}
          >
            Alle
          </button>
          {Object.entries(LUCIDE_CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              className="px-3 py-1.5 text-[11px] font-semibold rounded-xl border transition-all"
              style={
                activeCategory === key
                  ? { background: cat.bg, color: cat.color, borderColor: `${cat.color}40` }
                  : { background: "var(--card)", color: "var(--muted-foreground)", borderColor: "var(--border)" }
              }
            >
              {cat.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Suchergebnisse */}
      {search && (
        <div>
          <p className="text-[11px] font-mono text-muted-foreground mb-4">
            {filteredIcons?.length ?? 0} Ergebnisse für „{search}"
          </p>
          {filteredIcons && filteredIcons.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {filteredIcons.map(({ name, color, bg }) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Ic = (LucideIcons as Record<string, any>)[name] as React.FC<{ className?: string; style?: React.CSSProperties }> | undefined;
                if (!Ic) return null;
                return (
                  <IconCard
                    key={name}
                    icon={<Ic className="w-5 h-5" style={{ color }} />}
                    label={name}
                    accentColor={bg}
                    onCopy={() => handleCopy(name)}
                    copied={copiedName === name}
                    size="sm"
                  />
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

      {/* Kategorien */}
      {!search && Object.entries(LUCIDE_CATEGORIES)
        .filter(([key]) => !activeCategory || key === activeCategory)
        .map(([catKey, cat]) => (
          <motion.div key={catKey} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
              <h3 className="text-[11px] font-semibold text-foreground">{cat.label}</h3>
              <span className="text-[10px] font-mono text-muted-foreground">{cat.icons.length}</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
              {cat.icons.map(name => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Ic = (LucideIcons as Record<string, any>)[name] as React.FC<{ className?: string; style?: React.CSSProperties }> | undefined;
                if (!Ic) return null;
                return (
                  <IconCard
                    key={`${catKey}-${name}`}
                    icon={<Ic className="w-5 h-5" style={{ color: cat.color }} />}
                    label={name}
                    accentColor={cat.bg}
                    onCopy={() => handleCopy(name)}
                    copied={copiedName === name}
                    size="sm"
                  />
                );
              })}
            </div>
          </motion.div>
        ))
      }
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   TAB 2: KATEGORIE- & METHODEN-ICONS
══════════════════════════════════════════════════════════════════════ */

const CategoryMethodTab: React.FC = () => (
  <div className="space-y-10">
    {/* Kategorie-Icons */}
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-sm font-semibold text-foreground">Datenquellen-Icons</h3>
        <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-muted text-muted-foreground border border-border">
          {CATEGORY_ICON_LIST.length} Icons
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {CATEGORY_ICON_LIST.map(item => (
          <IconCard
            key={item.label}
            icon={<item.Icon size={24} color={item.color} />}
            label={item.label}
            sublabel={item.sublabel}
            accentColor={item.color}
            size="md"
          />
        ))}
      </div>
    </div>

    {/* Methoden-Karten */}
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-sm font-semibold text-foreground">Analyse-Methoden</h3>
        <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-muted text-muted-foreground border border-border">
          {METHOD_LIST.length} Methoden
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {METHOD_LIST.map(item => (
          <MethodCard
            key={item.label}
            icon={<item.Icon size={26} color={item.color} />}
            label={item.label}
            sublabel={item.sublabel}
            accentColor={item.color}
          />
        ))}
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════
   TAB 3: SKEUOMORPHIC ICONS
══════════════════════════════════════════════════════════════════════ */

const SkeuomorphicTab: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedIcon = selectedId ? SKEU_ICONS.find(i => i.id === selectedId) ?? null : null;

  return (
    <div className="space-y-8">
      {/* Stil-Info */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">Stil-Merkmale</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Material",  value: "Monochrom Grau",   sub: "Plastik · Metall · Glas" },
            { label: "ViewBox",   value: "0 0 64 64",        sub: "Einheitliche Proportionen" },
            { label: "Licht",     value: "Oben-Links",       sub: "Glanzlichter + Schatten" },
            { label: "Technik",   value: "SVG-Gradienten",   sub: "linear + radialGradient" },
          ].map(item => (
            <div key={item.label}>
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
              <p className="text-[12px] font-semibold text-foreground">{item.value}</p>
              <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Icon-Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-3">
        {SKEU_ICONS.map(({ id, label, Component }) => {
          const isSelected = selectedId === id;
          return (
            <button
              key={id}
              onClick={() => setSelectedId(isSelected ? null : id)}
              className="flex flex-col items-center gap-3 p-4 rounded-xl border bg-card transition-all duration-200"
              style={{
                borderColor: isSelected ? "var(--foreground)" : "var(--border)",
                background: isSelected ? "var(--muted)" : "var(--card)",
              }}
            >
              <Component size={48} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground text-center leading-tight">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail-Panel */}
      <AnimatePresence>
        {selectedIcon && (
          <motion.div
            key={selectedIcon.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              {/* Vorschau */}
              <div className="flex flex-col items-center justify-center gap-6 p-10 border-b md:border-b-0 md:border-r border-border bg-muted/30">
                <div className="flex items-end gap-6">
                  {[128, 64, 32, 16].map(sz => (
                    <div key={sz} className="flex flex-col items-center gap-2">
                      <selectedIcon.Component size={sz} />
                      <span className="font-mono text-[9px] text-muted-foreground">{sz}px</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center w-full p-4 rounded-xl bg-[#1A1A1A]">
                  <selectedIcon.Component size={56} />
                  <span className="font-mono text-[10px] text-[#666] ml-4">auf dunklem Hintergrund</span>
                </div>
              </div>
              {/* Info */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                    {selectedIcon.id.toUpperCase()}
                  </p>
                  <h3 className="font-display font-bold text-xl tracking-tight">{selectedIcon.label}</h3>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Handgefertigtes SVG im macOS-Skeuomorphismus-Stil. Nutzt linearGradient, radialGradient
                  und feDropShadow um Tiefe, Glanzlichter und Materialität zu simulieren.
                </p>
                <div className="rounded-xl bg-[#0A0A0A] p-4">
                  <p className="font-mono text-[10px] text-[#E4FF97]">
                    {`<selectedIcon.Component size={64} />`}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════
   HAUPT-SECTION
══════════════════════════════════════════════════════════════════════ */

type TabId = "lucide" | "category" | "skeuomorphic";

const TABS: { id: TabId; label: string; count: string; description: string }[] = [
  { id: "lucide",       label: "UI-Icons",            count: "600+",  description: "Lucide · durchsuchbar · copy-to-clipboard" },
  { id: "category",     label: "Quellen & Methoden",  count: "18",   description: "12 Datenquellen-Icons + 6 Analyse-Methoden" },
  { id: "skeuomorphic", label: "Skeuomorphic",        count: "18",   description: "3D-Plastik-Grau · SVG-Gradienten" },
];

export default function IconSetsSection() {
  const [activeTab, setActiveTab] = useState<TabId>("lucide");

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Icon-Sets</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">
          Icon-Sets
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Drei spezialisierte Icon-Sets in einem einheitlichen Karten-Stil – von universellen UI-Icons
          über semantische Kategorie-Icons bis hin zu handgefertigten Skeuomorphic-Icons.
        </p>
      </div>

      {/* Tab-Navigation */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-start px-4 py-3 rounded-xl border transition-all duration-200 text-left ${
              activeTab === tab.id
                ? "bg-foreground text-background border-foreground"
                : "bg-card border-border text-foreground hover:border-foreground/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[12px] font-semibold">{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  activeTab === tab.id ? "bg-background/20 text-background/70" : "bg-muted text-muted-foreground"
                }`}
              >
                {tab.count}
              </span>
            </div>
            <span className={`text-[10px] font-mono ${activeTab === tab.id ? "text-background/60" : "text-muted-foreground"}`}>
              {tab.description}
            </span>
          </button>
        ))}
      </div>

      {/* Tab-Inhalt */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "lucide"       && <LucideTab />}
          {activeTab === "category"     && <CategoryMethodTab />}
          {activeTab === "skeuomorphic" && <SkeuomorphicTab />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
