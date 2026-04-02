/**
 * ThemePreview – Live-Vorschau des Volt UI Systems mit angepassten Tokens
 *
 * Rendert eine vollständige Komponentenvorschau (Buttons, Cards, Typography,
 * Forms, Navigation, Badges, Charts-Platzhalter) mit den extrahierten
 * Projekt-Farben und -Schriften als CSS-Variablen.
 */

import { useState, useMemo } from "react";
import { Sun, Moon, Monitor, Check, ChevronRight, Bell, Search, User, BarChart2, TrendingUp, ArrowUpRight, Star, Zap, Shield } from "lucide-react";

interface VoltTokenMapping {
  primary: string;
  background: string;
  foreground: string;
  accent: string;
  fontDisplay: string;
  fontBody: string;
  borderRadius: string;
}

interface ThemePreviewProps {
  tokens: VoltTokenMapping;
  repoName: string;
}

/** Luminanz-Check für Kontrast */
function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function lighten(hex: string, amount = 0.08): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + Math.round(255 * amount));
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + Math.round(255 * amount));
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function darken(hex: string, amount = 0.08): string {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - Math.round(255 * amount));
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - Math.round(255 * amount));
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/** Berechnet alle abgeleiteten Tokens aus den Basis-Tokens */
function computeTheme(tokens: VoltTokenMapping, darkMode: boolean) {
  const isDarkBg = getLuminance(tokens.background) < 0.3;

  // Im Dark-Mode: Hintergrund invertieren wenn das Original hell war
  const bg = darkMode
    ? (isDarkBg ? tokens.background : "#111111")
    : (isDarkBg ? "#FFFFFF" : tokens.background);

  const fg = darkMode
    ? (getLuminance(tokens.foreground) > 0.5 ? tokens.foreground : "#F0F0F0")
    : (getLuminance(tokens.foreground) < 0.3 ? tokens.foreground : "#111111");

  const isDark = getLuminance(bg) < 0.3;

  const muted = isDark ? lighten(bg, 0.07) : darken(bg, 0.04);
  const secondary = isDark ? lighten(bg, 0.04) : darken(bg, 0.02);
  const border = isDark ? lighten(bg, 0.12) : darken(bg, 0.09);
  const mutedFg = isDark ? lighten(fg, 0.0) + "99" : fg + "88";

  const primaryFg = getLuminance(tokens.primary) > 0.4 ? "#0A0A0A" : "#FFFFFF";

  return {
    bg,
    fg,
    muted,
    secondary,
    border,
    mutedFg,
    primary: tokens.primary,
    primaryFg,
    accent: tokens.accent,
    fontDisplay: tokens.fontDisplay,
    fontBody: tokens.fontBody,
    radius: tokens.borderRadius,
    isDark,
  };
}

export function ThemePreview({ tokens, repoName }: ThemePreviewProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "components" | "dashboard">("overview");
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);

  const t = useMemo(() => computeTheme(tokens, darkMode), [tokens, darkMode]);

  // CSS-Variablen als Inline-Style für den Preview-Container
  const cssVars = {
    "--p-bg": t.bg,
    "--p-fg": t.fg,
    "--p-muted": t.muted,
    "--p-secondary": t.secondary,
    "--p-border": t.border,
    "--p-muted-fg": t.mutedFg,
    "--p-primary": t.primary,
    "--p-primary-fg": t.primaryFg,
    "--p-accent": t.accent,
    "--p-radius": t.radius,
    "--p-font-display": `"${t.fontDisplay}", system-ui, sans-serif`,
    "--p-font-body": `"${t.fontBody}", system-ui, sans-serif`,
  } as React.CSSProperties;

  const s = {
    // Basis
    wrap: {
      backgroundColor: "var(--p-bg)",
      color: "var(--p-fg)",
      fontFamily: "var(--p-font-body)",
      borderRadius: "12px",
      overflow: "hidden",
      border: `1px solid var(--p-border)`,
    } as React.CSSProperties,

    // Topbar
    topbar: {
      backgroundColor: "var(--p-bg)",
      borderBottom: `1px solid var(--p-border)`,
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
    } as React.CSSProperties,

    // Sidebar
    sidebar: {
      backgroundColor: t.isDark ? darken(t.bg, 0.03) : darken(t.bg, 0.02),
      borderRight: `1px solid var(--p-border)`,
      width: "180px",
      flexShrink: 0,
      padding: "16px 0",
    } as React.CSSProperties,

    // Button Primary
    btnPrimary: {
      backgroundColor: "var(--p-primary)",
      color: "var(--p-primary-fg)",
      border: "none",
      borderRadius: "var(--p-radius)",
      padding: "8px 16px",
      fontFamily: "var(--p-font-body)",
      fontSize: "13px",
      fontWeight: 600,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
    } as React.CSSProperties,

    // Button Outline
    btnOutline: {
      backgroundColor: "transparent",
      color: "var(--p-fg)",
      border: `1.5px solid var(--p-border)`,
      borderRadius: "var(--p-radius)",
      padding: "8px 16px",
      fontFamily: "var(--p-font-body)",
      fontSize: "13px",
      fontWeight: 500,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
    } as React.CSSProperties,

    // Button Ghost
    btnGhost: {
      backgroundColor: "transparent",
      color: "var(--p-fg)",
      border: "none",
      borderRadius: "var(--p-radius)",
      padding: "8px 16px",
      fontFamily: "var(--p-font-body)",
      fontSize: "13px",
      fontWeight: 500,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
    } as React.CSSProperties,

    // Card
    card: {
      backgroundColor: "var(--p-bg)",
      border: `1px solid var(--p-border)`,
      borderRadius: `calc(var(--p-radius) * 1.5)`,
      padding: "16px",
    } as React.CSSProperties,

    // Muted Card
    cardMuted: {
      backgroundColor: "var(--p-muted)",
      border: `1px solid var(--p-border)`,
      borderRadius: `calc(var(--p-radius) * 1.5)`,
      padding: "16px",
    } as React.CSSProperties,

    // Input
    input: {
      backgroundColor: "var(--p-muted)",
      color: "var(--p-fg)",
      border: `1.5px solid var(--p-border)`,
      borderRadius: "var(--p-radius)",
      padding: "8px 12px",
      fontFamily: "var(--p-font-body)",
      fontSize: "13px",
      outline: "none",
      width: "100%",
    } as React.CSSProperties,

    // Badge Primary
    badgePrimary: {
      backgroundColor: t.primary + "22",
      color: t.primary,
      border: `1px solid ${t.primary}44`,
      borderRadius: "999px",
      padding: "2px 10px",
      fontSize: "11px",
      fontWeight: 600,
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
    } as React.CSSProperties,

    // Badge Muted
    badgeMuted: {
      backgroundColor: "var(--p-muted)",
      color: "var(--p-muted-fg)",
      border: `1px solid var(--p-border)`,
      borderRadius: "999px",
      padding: "2px 10px",
      fontSize: "11px",
      fontWeight: 500,
      display: "inline-flex",
      alignItems: "center",
    } as React.CSSProperties,

    // Badge Positive
    badgePositive: {
      backgroundColor: "#1A9E5A22",
      color: "#0D6B3D",
      border: "1px solid #A3D9BE",
      borderRadius: "999px",
      padding: "2px 10px",
      fontSize: "11px",
      fontWeight: 600,
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
    } as React.CSSProperties,

    // Sidebar Item Active
    sidebarItemActive: {
      backgroundColor: t.primary + "18",
      color: t.primary,
      borderLeft: `2px solid ${t.primary}`,
      padding: "8px 16px 8px 14px",
      fontSize: "13px",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    } as React.CSSProperties,

    // Sidebar Item
    sidebarItem: {
      color: "var(--p-muted-fg)",
      padding: "8px 16px",
      fontSize: "13px",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    } as React.CSSProperties,

    // Tab Active
    tabActive: {
      backgroundColor: "var(--p-primary)",
      color: "var(--p-primary-fg)",
      border: "none",
      borderRadius: "var(--p-radius)",
      padding: "6px 14px",
      fontSize: "12px",
      fontWeight: 600,
      cursor: "pointer",
    } as React.CSSProperties,

    // Tab
    tab: {
      backgroundColor: "transparent",
      color: "var(--p-muted-fg)",
      border: "none",
      borderRadius: "var(--p-radius)",
      padding: "6px 14px",
      fontSize: "12px",
      fontWeight: 500,
      cursor: "pointer",
    } as React.CSSProperties,

    // KPI Card
    kpiCard: {
      backgroundColor: "var(--p-bg)",
      border: `1px solid var(--p-border)`,
      borderRadius: `calc(var(--p-radius) * 1.5)`,
      padding: "16px",
      flex: 1,
    } as React.CSSProperties,
  };

  return (
    <div style={{ ...cssVars, fontFamily: "var(--p-font-body)" }}>
      {/* Preview-Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px",
      }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, color: t.primary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
            Live-Vorschau
          </p>
          <p style={{ fontSize: "13px", fontWeight: 600, color: t.fg, fontFamily: `"${t.fontDisplay}", system-ui, sans-serif` }}>
            {repoName} × Volt UI
          </p>
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: "2px", backgroundColor: t.muted, borderRadius: t.radius, padding: "3px" }}>
            {(["overview", "components", "dashboard"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={activeTab === tab ? s.tabActive : s.tab}
              >
                {tab === "overview" ? "Übersicht" : tab === "components" ? "Komponenten" : "Dashboard"}
              </button>
            ))}
          </div>
          {/* Dark/Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              backgroundColor: t.muted,
              border: `1px solid ${t.border}`,
              borderRadius: t.radius,
              padding: "6px 10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: t.fg,
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {darkMode ? <Sun size={13} /> : <Moon size={13} />}
            {darkMode ? "Hell" : "Dunkel"}
          </button>
        </div>
      </div>

      {/* Preview-Frame */}
      <div style={s.wrap}>

        {/* ── ÜBERSICHT ── */}
        {activeTab === "overview" && (
          <div>
            {/* Hero-Bereich */}
            <div style={{
              background: `linear-gradient(135deg, ${t.bg} 0%, ${t.isDark ? lighten(t.bg, 0.05) : darken(t.bg, 0.03)} 100%)`,
              padding: "40px 32px",
              borderBottom: `1px solid ${t.border}`,
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Dot-Pattern */}
              <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `radial-gradient(circle, ${t.border} 1.5px, transparent 1.5px)`,
                backgroundSize: "20px 20px",
                opacity: 0.5,
              }} />
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: t.radius,
                    backgroundColor: t.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Zap size={18} color={t.primaryFg} />
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: t.fg, fontFamily: `"${t.fontDisplay}", system-ui, sans-serif` }}>
                    {repoName}
                  </span>
                  <span style={s.badgePrimary}>v2.0</span>
                </div>
                <h1 style={{
                  fontFamily: `"${t.fontDisplay}", system-ui, sans-serif`,
                  fontSize: "32px",
                  fontWeight: 900,
                  color: t.fg,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  marginBottom: "12px",
                }}>
                  Powered by<br />
                  <span style={{ color: t.primary }}>Volt UI</span>
                </h1>
                <p style={{ fontSize: "14px", color: t.mutedFg, lineHeight: 1.6, maxWidth: "400px", marginBottom: "24px" }}>
                  Dieses Projekt wurde mit dem Volt UI Design-System adaptiert.
                  Alle Tokens basieren auf den extrahierten Farben und Schriften.
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button style={s.btnPrimary}>
                    <Zap size={14} />
                    Jetzt starten
                  </button>
                  <button style={s.btnOutline}>
                    Mehr erfahren
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Feature-Cards */}
            <div style={{ padding: "24px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              {[
                { icon: <Zap size={16} />, title: "Schnell", desc: "Optimierte Performance durch Token-System" },
                { icon: <Shield size={16} />, title: "Konsistent", desc: "Einheitliche Designsprache im ganzen Projekt" },
                { icon: <Star size={16} />, title: "Adaptiv", desc: "Automatisch auf Volt UI abgestimmt" },
              ].map((f, i) => (
                <div key={i} style={s.card}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: t.radius,
                    backgroundColor: t.primary + "18",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: t.primary,
                    marginBottom: "10px",
                  }}>
                    {f.icon}
                  </div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: t.fg, marginBottom: "4px", fontFamily: `"${t.fontDisplay}", system-ui, sans-serif` }}>
                    {f.title}
                  </p>
                  <p style={{ fontSize: "12px", color: t.mutedFg, lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── KOMPONENTEN ── */}
        {activeTab === "components" && (
          <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Typography */}
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, color: t.mutedFg, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                Typografie
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <p style={{ fontFamily: `"${t.fontDisplay}", system-ui, sans-serif`, fontSize: "28px", fontWeight: 900, color: t.fg, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                  Display Heading XL
                </p>
                <p style={{ fontFamily: `"${t.fontDisplay}", system-ui, sans-serif`, fontSize: "18px", fontWeight: 700, color: t.fg }}>
                  Section Heading
                </p>
                <p style={{ fontFamily: `"${t.fontBody}", system-ui, sans-serif`, fontSize: "14px", color: t.fg, lineHeight: 1.6 }}>
                  Body-Text: Fließtext in <strong>{t.fontBody}</strong>. Lesbar, klar, optimiert für lange Texte.
                </p>
                <p style={{ fontFamily: `"${t.fontBody}", system-ui, sans-serif`, fontSize: "12px", color: t.mutedFg }}>
                  Caption / Muted Text
                </p>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: t.primary }}>
                  {"const theme = { primary: \"" + t.primary + "\" }"}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, color: t.mutedFg, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                Buttons
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button style={s.btnPrimary}><Zap size={13} /> Primary</button>
                <button style={s.btnOutline}>Outline</button>
                <button style={s.btnGhost}>Ghost</button>
                <button style={{ ...s.btnPrimary, backgroundColor: "#1A9E5A", color: "#fff" }}>
                  <Check size={13} /> Erfolg
                </button>
                <button style={{ ...s.btnPrimary, backgroundColor: "#E8402A", color: "#fff" }}>
                  Fehler
                </button>
              </div>
            </div>

            {/* Badges */}
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, color: t.mutedFg, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                Badges
              </p>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <span style={s.badgePrimary}><Zap size={10} /> Primary</span>
                <span style={s.badgeMuted}>Muted</span>
                <span style={s.badgePositive}><Check size={10} /> Aktiv</span>
                <span style={{ ...s.badgePrimary, backgroundColor: "#E8402A22", color: "#E8402A", border: "1px solid #E8402A44" }}>Fehler</span>
                <span style={{ ...s.badgePrimary, backgroundColor: t.accent + "22", color: t.accent, border: `1px solid ${t.accent}44` }}>Akzent</span>
              </div>
            </div>

            {/* Form */}
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, color: t.mutedFg, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                Formular
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "360px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 500, color: t.fg, display: "block", marginBottom: "4px" }}>
                    E-Mail-Adresse
                  </label>
                  <input
                    style={s.input}
                    placeholder="name@beispiel.de"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 500, color: t.fg, display: "block", marginBottom: "4px" }}>
                    Passwort
                  </label>
                  <input style={s.input} type="password" placeholder="••••••••" />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    onClick={() => setChecked(!checked)}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      border: `2px solid ${checked ? t.primary : t.border}`,
                      backgroundColor: checked ? t.primary : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {checked && <Check size={10} color={t.primaryFg} />}
                  </div>
                  <span style={{ fontSize: "12px", color: t.fg }}>Angemeldet bleiben</span>
                </div>
                <button style={{ ...s.btnPrimary, justifyContent: "center" }}>
                  Anmelden
                </button>
              </div>
            </div>

            {/* Cards */}
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, color: t.mutedFg, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                Cards
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={s.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: t.fg, fontFamily: `"${t.fontDisplay}", system-ui, sans-serif` }}>Standard Card</p>
                    <span style={s.badgePrimary}>Neu</span>
                  </div>
                  <p style={{ fontSize: "12px", color: t.mutedFg, lineHeight: 1.5 }}>
                    Inhaltsfläche mit Border und subtiler Elevation.
                  </p>
                </div>
                <div style={{ ...s.cardMuted, position: "relative", overflow: "hidden" }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    backgroundColor: t.primary,
                  }} />
                  <p style={{ fontSize: "12px", fontWeight: 600, color: t.fg, marginBottom: "8px", fontFamily: `"${t.fontDisplay}", system-ui, sans-serif` }}>Muted Card</p>
                  <p style={{ fontSize: "12px", color: t.mutedFg, lineHeight: 1.5 }}>
                    Subtiler Hintergrund für sekundäre Inhalte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <div style={{ display: "flex", height: "480px" }}>
            {/* Sidebar */}
            <div style={s.sidebar}>
              {/* Logo */}
              <div style={{ padding: "0 16px 16px", borderBottom: `1px solid ${t.border}`, marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: t.radius,
                    backgroundColor: t.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Zap size={14} color={t.primaryFg} />
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: t.fg, fontFamily: `"${t.fontDisplay}", system-ui, sans-serif` }}>
                    {repoName.slice(0, 10)}
                  </span>
                </div>
              </div>
              {/* Nav Items */}
              {[
                { icon: <BarChart2 size={14} />, label: "Dashboard", active: true },
                { icon: <TrendingUp size={14} />, label: "Analytics" },
                { icon: <User size={14} />, label: "Nutzer" },
                { icon: <Bell size={14} />, label: "Benachrichtigungen" },
                { icon: <Shield size={14} />, label: "Einstellungen" },
              ].map((item) => (
                <div key={item.label} style={item.active ? s.sidebarItemActive : s.sidebarItem}>
                  <span style={{ color: item.active ? t.primary : "inherit" }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
              {/* Topbar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: t.fg, fontFamily: `"${t.fontDisplay}", system-ui, sans-serif` }}>
                    Dashboard
                  </p>
                  <p style={{ fontSize: "12px", color: t.mutedFg }}>Willkommen zurück</p>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <div style={{
                    ...s.input,
                    width: "160px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 10px",
                  }}>
                    <Search size={12} style={{ color: t.mutedFg, flexShrink: 0 }} />
                    <span style={{ fontSize: "12px", color: t.mutedFg }}>Suchen...</span>
                  </div>
                  <button style={s.btnPrimary}>
                    <Bell size={13} />
                    <span style={s.badgePrimary}>3</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                {[
                  { label: "Umsatz", value: "€ 48.291", delta: "+12.4%", positive: true },
                  { label: "Nutzer", value: "3.847", delta: "+8.1%", positive: true },
                  { label: "Abbrüche", value: "2.3%", delta: "-0.4%", positive: true },
                  { label: "Tickets", value: "142", delta: "+3", positive: false },
                ].map((kpi) => (
                  <div key={kpi.label} style={s.kpiCard}>
                    <p style={{ fontSize: "11px", color: t.mutedFg, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {kpi.label}
                    </p>
                    <p style={{ fontSize: "20px", fontWeight: 800, color: t.fg, fontFamily: `"${t.fontDisplay}", system-ui, sans-serif`, marginBottom: "4px" }}>
                      {kpi.value}
                    </p>
                    <span style={kpi.positive ? s.badgePositive : { ...s.badgePrimary, backgroundColor: "#E8402A22", color: "#E8402A", border: "1px solid #E8402A44" }}>
                      <ArrowUpRight size={9} />
                      {kpi.delta}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div style={{ ...s.card, marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: t.fg, fontFamily: `"${t.fontDisplay}", system-ui, sans-serif` }}>
                    Umsatz-Verlauf
                  </p>
                  <span style={s.badgeMuted}>Letzte 30 Tage</span>
                </div>
                {/* Simulated Bar Chart */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "80px" }}>
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        backgroundColor: i === 11 ? t.primary : t.primary + "44",
                        borderRadius: `${parseInt(t.radius) / 2}px ${parseInt(t.radius) / 2}px 0 0`,
                        transition: "height 0.3s ease",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Table */}
              <div style={s.card}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: t.fg, marginBottom: "10px", fontFamily: `"${t.fontDisplay}", system-ui, sans-serif` }}>
                  Letzte Transaktionen
                </p>
                {[
                  { name: "Max Mustermann", amount: "€ 299", status: "Abgeschlossen" },
                  { name: "Anna Schmidt", amount: "€ 149", status: "Ausstehend" },
                  { name: "Tom Müller", amount: "€ 599", status: "Abgeschlossen" },
                ].map((row, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: i < 2 ? `1px solid ${t.border}` : "none",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: t.primary + "22",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: t.primary,
                      }}>
                        {row.name[0]}
                      </div>
                      <span style={{ fontSize: "12px", color: t.fg }}>{row.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: t.fg }}>{row.amount}</span>
                      <span style={row.status === "Abgeschlossen" ? s.badgePositive : s.badgeMuted}>
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Token-Legende */}
      <div style={{
        marginTop: "12px",
        padding: "10px 14px",
        backgroundColor: t.muted,
        borderRadius: t.radius,
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        alignItems: "center",
      }}>
        <span style={{ fontSize: "10px", fontWeight: 600, color: t.mutedFg, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Aktive Tokens:
        </span>
        {[
          { label: "Primary", color: t.primary },
          { label: "Accent", color: t.accent },
          { label: "BG", color: t.bg },
          { label: "FG", color: t.fg },
        ].map((tok) => (
          <div key={tok.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{
              width: "12px",
              height: "12px",
              borderRadius: "3px",
              backgroundColor: tok.color,
              border: `1px solid ${t.border}`,
            }} />
            <span style={{ fontSize: "10px", color: t.mutedFg }}>{tok.label}</span>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: t.fg }}>{tok.color}</span>
          </div>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "10px", color: t.mutedFg }}>Display:</span>
          <span style={{ fontSize: "10px", fontWeight: 600, color: t.fg, fontFamily: `"${t.fontDisplay}", system-ui, sans-serif` }}>{t.fontDisplay}</span>
          <span style={{ fontSize: "10px", color: t.mutedFg }}>Body:</span>
          <span style={{ fontSize: "10px", fontWeight: 600, color: t.fg }}>{t.fontBody}</span>
        </div>
      </div>
    </div>
  );
}
