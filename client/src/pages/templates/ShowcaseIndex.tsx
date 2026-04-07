/**
 * Volt UI – Template Showcase Index
 * Route: /showcase
 *
 * Gestaltungskonzept:
 * – Hintergrund: #0A0A0A (Volt Schwarz)
 * – Akzent: #E4FF97 (Neon Yellow)
 * – Pastell-Palette: Rose Quartz, Peach Cream, Mint Green, Soft Orchid,
 *                    Baby Blue, Butter Yellow, Powder Orange, Aqua Mist
 * – Signalfarben: Smaragd (#1A9E5A), Koralle (#E8402A), Slate (#6B7A9A)
 * – Raster-Muster als atmosphärische Textur
 * – Terminal-Ästhetik: >_ Prompt, Cursor-Blöcke, Mono-Fragmente
 *
 * FIX: SVG-Container mit preserveAspectRatio="xMidYMid meet" + padding
 *      verhindert Anschnitt oben.
 */
import { Link } from "wouter";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { ArrowRight, Terminal, ArrowLeft, Layers } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Volt-Farbpalette (hardcoded für SVG – CSS-Variablen greifen nicht)
───────────────────────────────────────────────────────────────── */
const C = {
  bg:          "#0A0A0A",
  bg1:         "#111111",
  bg2:         "#141414",
  bg3:         "#1A1A1A",
  border:      "#1E1E1E",
  border2:     "#2A2A2A",
  muted:       "#333333",
  muted2:      "#444444",
  neon:        "#E4FF97",   // Neon Yellow
  neonDeep:    "#C8F060",
  white:       "#F5F5F5",
  // Pastell
  rose:        "#FFD6E0",
  peach:       "#FFECD2",
  mint:        "#C3F4D3",
  orchid:      "#FDE2FF",
  blue:        "#D4E8FF",
  butter:      "#FFF5BA",
  orange:      "#FFE0CC",
  aqua:        "#D6F5F5",
  // Signal
  positive:    "#1A9E5A",
  negative:    "#E8402A",
  neutral:     "#6B7A9A",
};

/* ─────────────────────────────────────────────────────────────────
   Gemeinsame SVG-Bausteine
───────────────────────────────────────────────────────────────── */
function DotGrid({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
        <circle cx="9" cy="9" r="1" fill={C.neon} fillOpacity="0.08" />
      </pattern>
    </defs>
  );
}

/* Wrapper: füllt den Container vollständig, kein Anschnitt */
function IllustrationWrapper({ children, viewBox = "0 0 480 200" }: {
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      {children}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   1 · SaaS Landing Page
   Farben: Neon-Gelb Hero-Banner, Baby Blue Feature-Karten,
           Butter Yellow sekundäre Elemente
───────────────────────────────────────────────────────────────── */
function IllustrationLanding() {
  return (
    <IllustrationWrapper viewBox="0 0 480 200">
      <rect width="480" height="200" fill={C.bg} />
      <DotGrid id="dg-l" />
      <rect width="480" height="200" fill="url(#dg-l)" />

      {/* Navbar */}
      <rect x="0" y="0" width="480" height="32" fill={C.bg1} />
      <line x1="0" y1="32" x2="480" y2="32" stroke={C.border} strokeWidth="1" />
      <rect x="18" y="10" width="12" height="12" rx="3" fill={C.neon} />
      <rect x="34" y="12" width="36" height="8" rx="3" fill={C.neon} fillOpacity="0.6" />
      <rect x="190" y="13" width="28" height="6" rx="2" fill={C.muted2} />
      <rect x="226" y="13" width="32" height="6" rx="2" fill={C.muted2} />
      <rect x="266" y="13" width="24" height="6" rx="2" fill={C.muted2} />
      <rect x="424" y="9" width="38" height="14" rx="4" fill={C.neon} />
      <rect x="432" y="13" width="22" height="6" rx="2" fill={C.bg} />

      {/* Hero-Banner */}
      <rect x="18" y="46" width="444" height="72" rx="10" fill={C.neon} fillOpacity="0.12" stroke={C.neon} strokeWidth="1" strokeOpacity="0.3" />
      <rect x="100" y="58" width="280" height="20" rx="4" fill={C.neon} fillOpacity="0.85" />
      <rect x="130" y="84" width="220" height="10" rx="3" fill={C.border2} />
      <rect x="152" y="98" width="176" height="8" rx="2" fill={C.border} />

      {/* CTA-Buttons */}
      <rect x="130" y="128" width="90" height="26" rx="5" fill={C.neon} />
      <rect x="138" y="135" width="74" height="12" rx="3" fill={C.bg} />
      <rect x="230" y="128" width="90" height="26" rx="5" fill="none" stroke={C.border2} strokeWidth="1.5" />
      <rect x="238" y="135" width="74" height="12" rx="3" fill={C.muted} />

      {/* Feature-Karten */}
      {[
        { x: 18,  color: C.blue,   label: C.blue },
        { x: 178, color: C.mint,   label: C.mint },
        { x: 338, color: C.butter, label: C.butter },
      ].map((k, i) => (
        <g key={i}>
          <rect x={k.x} y="166" width="140" height="26" rx="6" fill={C.bg2} stroke={C.border} strokeWidth="1" />
          <rect x={k.x + 10} y="173" width="10" height="10" rx="3" fill={k.color} fillOpacity="0.7" />
          <rect x={k.x + 26} y="175" width="80" height="6" rx="2" fill={k.label} fillOpacity="0.3" />
        </g>
      ))}
    </IllustrationWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   2 · Analytics Dashboard
   Farben: Neon-Gelb Kurve, Pastell-Balken (Butter, Mint, Blue, Rose),
           Smaragd positive KPI, Koralle negative KPI
───────────────────────────────────────────────────────────────── */
function IllustrationDashboard() {
  return (
    <IllustrationWrapper viewBox="0 0 480 200">
      <rect width="480" height="200" fill={C.bg} />
      <DotGrid id="dg-d" />
      <rect width="480" height="200" fill="url(#dg-d)" />

      {/* Sidebar */}
      <rect x="0" y="0" width="80" height="200" fill={C.bg1} />
      <line x1="80" y1="0" x2="80" y2="200" stroke={C.border} strokeWidth="1" />
      <rect x="12" y="14" width="12" height="12" rx="3" fill={C.neon} />
      <rect x="28" y="16" width="36" height="8" rx="3" fill={C.neon} fillOpacity="0.5" />
      {[0,1,2,3,4].map((i) => (
        <g key={i}>
          <rect x="10" y={42+i*22} width="60" height="14" rx="4"
            fill={i===0 ? C.neon : "transparent"} fillOpacity={i===0 ? 0.12 : 0} />
          <rect x="14" y={45+i*22} width="8" height="8" rx="2"
            fill={i===0 ? C.neon : C.border2} />
          <rect x="26" y={47+i*22} width={i===0 ? 36 : 28} height="4" rx="2"
            fill={i===0 ? C.neon : C.border2} fillOpacity={i===0 ? 0.7 : 1} />
        </g>
      ))}

      {/* KPI-Karten */}
      {[
        { x: 92,  val: C.neon,     badge: C.positive, badgeW: 28 },
        { x: 212, val: C.white,    badge: C.negative,  badgeW: 24 },
        { x: 332, val: C.blue,     badge: C.neutral,   badgeW: 26 },
      ].map((k, i) => (
        <g key={i}>
          <rect x={k.x} y="10" width="108" height="42" rx="6" fill={C.bg2} stroke={C.border} strokeWidth="1" />
          <rect x={k.x+10} y="18" width="48" height="5" rx="2" fill={C.muted} />
          <rect x={k.x+10} y="28" width="64" height="14" rx="3" fill={k.val} fillOpacity="0.8" />
          {/* Trend-Badge */}
          <rect x={k.x+78} y="18" width={k.badgeW} height="10" rx="5" fill={k.badge} fillOpacity="0.2" />
          <rect x={k.x+82} y="21" width={k.badgeW-8} height="4" rx="2" fill={k.badge} fillOpacity="0.7" />
        </g>
      ))}

      {/* Linien-Chart */}
      <rect x="92" y="62" width="236" height="128" rx="8" fill={C.bg1} stroke={C.border} strokeWidth="1" />
      {[0,1,2,3].map(i => (
        <line key={i} x1="100" y1={80+i*28} x2="320" y2={80+i*28} stroke={C.border} strokeWidth="0.5" />
      ))}
      {/* Neon-Kurve */}
      <polyline
        points="100,168 126,148 152,156 178,126 204,136 230,108 256,118 282,90 308,100 320,78"
        stroke={C.neon} strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round"
      />
      <polygon
        points="100,168 126,148 152,156 178,126 204,136 230,108 256,118 282,90 308,100 320,78 320,186 100,186"
        fill={C.neon} fillOpacity="0.05"
      />
      {[[100,168],[178,126],[256,118],[320,78]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill={C.neon} />
      ))}

      {/* Balken-Chart – Pastell-Farben */}
      <rect x="338" y="62" width="130" height="128" rx="8" fill={C.bg1} stroke={C.border} strokeWidth="1" />
      {[
        { x: 348, h: 46, c: C.butter },
        { x: 366, h: 64, c: C.mint },
        { x: 384, h: 34, c: C.blue },
        { x: 402, h: 76, c: C.neon },
        { x: 420, h: 52, c: C.rose },
        { x: 438, h: 40, c: C.aqua },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={186-b.h} width="14" height={b.h} rx="3" fill={b.c} fillOpacity="0.8" />
      ))}
    </IllustrationWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   3 · Pricing Page
   Farben: Butter Yellow Free, Neon-Gelb Pro (highlight), Aqua Enterprise
───────────────────────────────────────────────────────────────── */
function IllustrationPricing() {
  return (
    <IllustrationWrapper viewBox="0 0 480 200">
      <rect width="480" height="200" fill={C.bg} />
      <DotGrid id="dg-p" />
      <rect width="480" height="200" fill="url(#dg-p)" />

      {/* Toggle */}
      <rect x="180" y="8" width="120" height="20" rx="10" fill={C.bg2} stroke={C.border} strokeWidth="1" />
      <rect x="180" y="8" width="60" height="20" rx="10" fill={C.neon} fillOpacity="0.15" />
      <rect x="184" y="11" width="48" height="14" rx="7" fill={C.neon} fillOpacity="0.25" />

      {/* Karte 1 – Free (Butter Yellow) */}
      <rect x="14" y="38" width="138" height="152" rx="8" fill={C.bg1} stroke={C.border} strokeWidth="1" />
      <rect x="24" y="50" width="50" height="6" rx="3" fill={C.muted} />
      <rect x="24" y="62" width="70" height="18" rx="4" fill={C.butter} fillOpacity="0.7" />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <circle cx="28" cy={92+i*14} r="3.5" fill={C.butter} fillOpacity="0.4" stroke={C.butter} strokeWidth="1" strokeOpacity="0.5" />
          <rect x="36" y={89+i*14} width="88" height="5" rx="2" fill={C.border2} />
        </g>
      ))}
      <rect x="24" y="152" width="118" height="24" rx="5" fill={C.bg3} stroke={C.border2} strokeWidth="1" />
      <rect x="44" y="160" width="78" height="8" rx="3" fill={C.muted} />

      {/* Karte 2 – Pro (Neon-Gelb, hervorgehoben) */}
      <rect x="171" y="28" width="138" height="162" rx="8" fill={C.bg2} stroke={C.neon} strokeWidth="1.5" />
      {/* "Beliebt"-Badge */}
      <rect x="200" y="18" width="80" height="18" rx="9" fill={C.neon} />
      <rect x="210" y="23" width="60" height="8" rx="3" fill={C.bg} />
      <rect x="181" y="40" width="50" height="6" rx="3" fill={C.muted2} />
      <rect x="181" y="52" width="70" height="18" rx="4" fill={C.neon} fillOpacity="0.9" />
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <circle cx="185" cy={82+i*14} r="3.5" fill={C.neon} fillOpacity="0.25" />
          <path d={`M${183} ${82+i*14} L${185} ${84+i*14} L${189} ${80+i*14}`}
            stroke={C.neon} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="194" y={79+i*14} width="88" height="5" rx="2" fill={C.border2} />
        </g>
      ))}
      <rect x="181" y="158" width="118" height="24" rx="5" fill={C.neon} />
      <rect x="201" y="166" width="78" height="8" rx="3" fill={C.bg} />

      {/* Karte 3 – Enterprise (Aqua Mist) */}
      <rect x="328" y="38" width="138" height="152" rx="8" fill={C.bg1} stroke={C.border} strokeWidth="1" />
      <rect x="338" y="50" width="60" height="6" rx="3" fill={C.muted} />
      <rect x="338" y="62" width="70" height="18" rx="4" fill={C.aqua} fillOpacity="0.6" />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <circle cx="342" cy={92+i*14} r="3.5" fill={C.aqua} fillOpacity="0.4" stroke={C.aqua} strokeWidth="1" strokeOpacity="0.5" />
          <rect x="350" y={89+i*14} width="88" height="5" rx="2" fill={C.border2} />
        </g>
      ))}
      <rect x="338" y="152" width="118" height="24" rx="5" fill={C.bg3} stroke={C.aqua} strokeWidth="1" strokeOpacity="0.4" />
      <rect x="358" y="160" width="78" height="8" rx="3" fill={C.aqua} fillOpacity="0.4" />
    </IllustrationWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   4 · Login & Auth
   Farben: Neon-Gelb Logo + CTA, Rose Quartz Fehler-Hinweis,
           Mint Green Erfolgs-Indikator
───────────────────────────────────────────────────────────────── */
function IllustrationAuth() {
  return (
    <IllustrationWrapper viewBox="0 0 480 200">
      <rect width="480" height="200" fill={C.bg} />
      <DotGrid id="dg-a" />
      <rect width="480" height="200" fill="url(#dg-a)" />

      {/* Hintergrund-Glow */}
      <circle cx="240" cy="100" r="110" fill={C.neon} fillOpacity="0.03" />
      <circle cx="240" cy="100" r="70"  fill={C.orchid} fillOpacity="0.04" />

      {/* Auth-Karte */}
      <rect x="120" y="12" width="240" height="176" rx="12" fill={C.bg1} stroke={C.border} strokeWidth="1" />

      {/* Logo */}
      <rect x="228" y="24" width="24" height="24" rx="6" fill={C.neon} />
      <text x="240" y="40" textAnchor="middle" fontSize="11" fill={C.bg} fontFamily="monospace" fontWeight="bold">&gt;_</text>

      {/* Titel */}
      <rect x="150" y="56" width="180" height="12" rx="4" fill={C.neon} fillOpacity="0.75" />
      <rect x="170" y="74" width="140" height="8" rx="3" fill={C.border2} />

      {/* Input E-Mail */}
      <rect x="136" y="90" width="208" height="22" rx="5" fill="#0D0D0D" stroke={C.border2} strokeWidth="1" />
      <rect x="146" y="97" width="70" height="7" rx="2" fill={C.muted} />

      {/* Input Passwort */}
      <rect x="136" y="120" width="208" height="22" rx="5" fill="#0D0D0D" stroke={C.border2} strokeWidth="1" />
      <rect x="146" y="127" width="56" height="7" rx="2" fill={C.muted} />
      {[0,1,2,3,4].map(i => (
        <circle key={i} cx={312+i*7} cy={131} r="2.5" fill={C.border2} />
      ))}

      {/* Passwort-Stärke (Mint Green) */}
      <rect x="136" y="148" width="208" height="4" rx="2" fill={C.border} />
      <rect x="136" y="148" width="130" height="4" rx="2" fill={C.mint} fillOpacity="0.7" />

      {/* CTA-Button */}
      <rect x="136" y="158" width="208" height="24" rx="6" fill={C.neon} />
      <rect x="170" y="166" width="140" height="8" rx="3" fill={C.bg} />
    </IllustrationWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   5 · Empty States
   Farben: Terminal-Fenster, Orchid Inbox-Illustration,
           Neon-Gelb Cursor + Prompt
───────────────────────────────────────────────────────────────── */
function IllustrationEmptyStates() {
  return (
    <IllustrationWrapper viewBox="0 0 480 200">
      <rect width="480" height="200" fill={C.bg} />
      <DotGrid id="dg-e" />
      <rect width="480" height="200" fill="url(#dg-e)" />

      {/* Terminal-Fenster */}
      <rect x="60" y="14" width="360" height="172" rx="12" fill={C.bg1} stroke={C.border} strokeWidth="1" />
      {/* Titelleiste */}
      <rect x="60" y="14" width="360" height="32" rx="12" fill={C.bg2} />
      <rect x="60" y="34" width="360" height="12" fill={C.bg2} />
      <line x1="60" y1="46" x2="420" y2="46" stroke={C.border} strokeWidth="1" />
      <circle cx="82"  cy="30" r="5" fill="#FF5F57" fillOpacity="0.85" />
      <circle cx="100" cy="30" r="5" fill="#FEBC2E" fillOpacity="0.85" />
      <circle cx="118" cy="30" r="5" fill="#28C840" fillOpacity="0.85" />
      <rect x="196" y="27" width="88" height="7" rx="3" fill={C.border} />

      {/* Leerer Zustand – gestrichelter Rahmen */}
      <rect x="140" y="62" width="200" height="100" rx="10" fill="none" stroke={C.border2} strokeWidth="1.5" strokeDasharray="8 5" />

      {/* Inbox-Illustration (Orchid) */}
      <rect x="188" y="82" width="104" height="60" rx="6" fill="none" stroke={C.orchid} strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M188 100 L240 118 L292 100" stroke={C.orchid} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      {/* Brief-Linien */}
      <rect x="204" y="88" width="72" height="6" rx="2" fill={C.orchid} fillOpacity="0.25" />
      <rect x="210" y="98" width="60" height="5" rx="2" fill={C.orchid} fillOpacity="0.15" />

      {/* Prompt-Zeile */}
      <text x="78" y="178" fontSize="10" fill={C.neon} fillOpacity="0.55" fontFamily="monospace">&gt;_</text>
      <rect x="96" y="170" width="60" height="8" rx="3" fill={C.border} />
      <rect x="160" y="170" width="8" height="10" rx="1.5" fill={C.neon} fillOpacity="0.85" />
    </IllustrationWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   6 · Settings Page
   Farben: Neon-Gelb aktive Nav + aktive Toggles,
           Baby Blue Avatar-Ring, Peach Cream sekundäre Elemente
───────────────────────────────────────────────────────────────── */
function IllustrationSettings() {
  return (
    <IllustrationWrapper viewBox="0 0 480 200">
      <rect width="480" height="200" fill={C.bg} />
      <DotGrid id="dg-s" />
      <rect width="480" height="200" fill="url(#dg-s)" />

      {/* Linke Nav */}
      <rect x="14" y="14" width="120" height="172" rx="8" fill={C.bg1} stroke={C.border} strokeWidth="1" />
      <rect x="24" y="26" width="60" height="8" rx="3" fill={C.neon} fillOpacity="0.65" />
      {[
        { w: 64, active: true,  color: C.neon },
        { w: 56, active: false, color: C.border2 },
        { w: 72, active: false, color: C.border2 },
        { w: 52, active: false, color: C.border2 },
        { w: 60, active: false, color: C.border2 },
      ].map((item, i) => (
        <g key={i}>
          <rect x="18" y={44+i*24} width="112" height="16" rx="4"
            fill={item.active ? C.neon : "transparent"} fillOpacity={item.active ? 0.1 : 0} />
          <rect x="22" y={47+i*24} width="8" height="8" rx="2"
            fill={item.active ? C.neon : C.border2} fillOpacity={item.active ? 0.8 : 1} />
          <rect x="34" y={49+i*24} width={item.w} height="5" rx="2"
            fill={item.color} fillOpacity={item.active ? 0.7 : 1} />
        </g>
      ))}

      {/* Rechter Inhaltsbereich */}
      <rect x="148" y="14" width="318" height="172" rx="8" fill={C.bg1} stroke={C.border} strokeWidth="1" />

      {/* Profil-Zeile */}
      <circle cx="180" cy="50" r="24" fill={C.bg3} stroke={C.blue} strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="180" cy="42" r="10" fill={C.border2} />
      <ellipse cx="180" cy="66" rx="14" ry="7" fill={C.border2} />
      <rect x="214" y="36" width="88" height="10" rx="4" fill={C.neon} fillOpacity="0.65" />
      <rect x="214" y="52" width="64" height="7" rx="3" fill={C.muted} />
      {/* Edit-Button */}
      <rect x="408" y="36" width="48" height="22" rx="5" fill={C.bg3} stroke={C.border2} strokeWidth="1" />
      <rect x="418" y="43" width="28" height="6" rx="2" fill={C.muted} />

      {/* Trennlinie */}
      <line x1="158" y1="84" x2="456" y2="84" stroke={C.border} strokeWidth="1" />

      {/* Toggle-Zeilen */}
      {[
        { on: true,  color: C.neon,   labelW: 160 },
        { on: false, color: C.border2, labelW: 140 },
        { on: true,  color: C.mint,   labelW: 180 },
        { on: false, color: C.border2, labelW: 120 },
      ].map((row, i) => (
        <g key={i}>
          <rect x="158" y={96+i*22} width={row.labelW} height="7" rx="3" fill={C.border2} />
          {/* Toggle-Track */}
          <rect x="410" y={94+i*22} width="36" height="14" rx="7"
            fill={row.on ? row.color : C.bg3}
            stroke={row.on ? "none" : C.border2}
            strokeWidth="1"
            fillOpacity={row.on ? 0.85 : 1}
          />
          {/* Toggle-Knopf */}
          <circle
            cx={row.on ? 440 : 420}
            cy={101+i*22}
            r="5"
            fill={row.on ? C.bg : C.muted}
          />
        </g>
      ))}
    </IllustrationWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   7 · Onboarding Flow
   Farben: Smaragd erledigte Schritte, Neon-Gelb aktiver Schritt,
           Peach Cream Wizard-Karte, Butter Yellow Input-Highlight
───────────────────────────────────────────────────────────────── */
function IllustrationOnboarding() {
  return (
    <IllustrationWrapper viewBox="0 0 480 200">
      <rect width="480" height="200" fill={C.bg} />
      <DotGrid id="dg-o" />
      <rect width="480" height="200" fill="url(#dg-o)" />

      {/* Schritt-Indikatoren */}
      {[0,1,2,3,4].map((i) => (
        <g key={i}>
          <circle cx={60+i*90} cy={24} r={13}
            fill={i<2 ? C.positive : i===2 ? C.neon : C.bg2}
            stroke={i>=3 ? C.border2 : "none"}
            strokeWidth="1.5"
          />
          {i<2 && (
            <path d={`M${53+i*90} ${24} L${58+i*90} ${29} L${67+i*90} ${19}`}
              stroke={C.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {i===2 && (
            <text x={60+i*90} y={28} textAnchor="middle" fontSize="10" fill={C.bg} fontFamily="monospace" fontWeight="bold">3</text>
          )}
          {i>=3 && (
            <text x={60+i*90} y={28} textAnchor="middle" fontSize="10" fill={C.muted} fontFamily="monospace">{i+1}</text>
          )}
          {i<4 && (
            <line x1={73+i*90} y1={24} x2={137+i*90} y2={24}
              stroke={i<2 ? C.positive : C.border2}
              strokeWidth={i<2 ? 2 : 1}
              strokeOpacity={i<2 ? 0.5 : 1}
              strokeDasharray={i>=2 ? "5 4" : "0"}
            />
          )}
        </g>
      ))}

      {/* Wizard-Karte */}
      <rect x="60" y="50" width="360" height="140" rx="12" fill={C.bg1} stroke={C.neon} strokeWidth="1" strokeOpacity="0.25" />

      {/* Workspace-Illustration */}
      <rect x="190" y="66" width="100" height="56" rx="8" fill={C.bg2} stroke={C.border2} strokeWidth="1" />
      <rect x="200" y="76" width="80" height="8" rx="3" fill={C.neon} fillOpacity="0.45" />
      <rect x="200" y="90" width="60" height="6" rx="2" fill={C.border2} />
      <rect x="200" y="102" width="72" height="6" rx="2" fill={C.border2} />

      {/* Input-Feld */}
      <rect x="76" y="130" width="328" height="22" rx="5" fill="#0D0D0D" stroke={C.neon} strokeWidth="1" strokeOpacity="0.3" />
      <rect x="86" y="137" width="100" height="7" rx="3" fill={C.border2} />
      <rect x="190" y="137" width="7" height="10" rx="1.5" fill={C.neon} fillOpacity="0.7" />

      {/* Weiter-Button */}
      <rect x="308" y="160" width="104" height="22" rx="6" fill={C.neon} />
      <rect x="322" y="167" width="76" height="8" rx="3" fill={C.bg} />
      {/* Zurück-Link */}
      <rect x="76" y="164" width="60" height="8" rx="3" fill={C.border2} />
    </IllustrationWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   8 · Notification Center
   Farben: Koralle Alert-Banner, Neon-Gelb ungelesene Punkte,
           Pastell-Avatare (Rose, Blue, Mint, Orchid, Peach)
───────────────────────────────────────────────────────────────── */
function IllustrationNotifications() {
  const avatarColors = [C.rose, C.blue, C.mint, C.orchid, C.peach];
  return (
    <IllustrationWrapper viewBox="0 0 480 200">
      <rect width="480" height="200" fill={C.bg} />
      <DotGrid id="dg-n" />
      <rect width="480" height="200" fill="url(#dg-n)" />

      {/* Kritischer Alert-Banner */}
      <rect x="14" y="10" width="452" height="28" rx="7" fill="#1A0A0A" stroke={C.negative} strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="30" cy="24" r="6" fill={C.negative} fillOpacity="0.8" />
      <text x="26" y="28" fontSize="8" fill={C.negative} fontFamily="monospace" fontWeight="bold">!</text>
      <rect x="44" y="18" width="140" height="6" rx="3" fill={C.negative} fillOpacity="0.5" />
      <rect x="44" y="27" width="100" height="5" rx="2" fill={C.negative} fillOpacity="0.25" />
      <line x1="450" y1="16" x2="458" y2="30" stroke={C.negative} strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="458" y1="16" x2="450" y2="30" stroke={C.negative} strokeWidth="1.2" strokeOpacity="0.5" />

      {/* Benachrichtigungs-Zeilen */}
      {[
        { y: 46,  unread: true,  textW: 200, subW: 150 },
        { y: 72,  unread: true,  textW: 180, subW: 130 },
        { y: 98,  unread: false, textW: 160, subW: 120 },
        { y: 124, unread: false, textW: 190, subW: 140 },
        { y: 150, unread: false, textW: 170, subW: 125 },
      ].map((item, i) => (
        <g key={i}>
          <rect x="14" y={item.y} width="452" height="24" rx="6"
            fill={item.unread ? C.bg2 : C.bg1}
            stroke={item.unread ? C.border : "transparent"}
            strokeWidth="1"
          />
          {item.unread && <circle cx="24" cy={item.y+12} r="4" fill={C.neon} />}
          {/* Avatar */}
          <circle cx="44" cy={item.y+12} r="9"
            fill={avatarColors[i]}
            fillOpacity={item.unread ? 0.25 : 0.1}
            stroke={avatarColors[i]}
            strokeWidth="1"
            strokeOpacity={item.unread ? 0.5 : 0.2}
          />
          {/* Text */}
          <rect x="60" y={item.y+6} width={item.textW} height="6" rx="3"
            fill={item.unread ? C.neon : C.border2}
            fillOpacity={item.unread ? 0.5 : 1}
          />
          <rect x="60" y={item.y+15} width={item.subW} height="5" rx="2" fill={C.border} />
          {/* Zeitstempel */}
          <rect x="424" y={item.y+9} width="36" height="5" rx="2" fill={C.border} />
        </g>
      ))}

      {/* Pagination-Dots */}
      {[0,1,2].map(i => (
        <circle key={i} cx={234+i*12} cy={188} r={i===0 ? 4 : 3}
          fill={i===0 ? C.neon : C.border2} />
      ))}
    </IllustrationWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   9 · Data Table View
   Farben: Neon-Gelb Checkboxen + CTA, Pastell-Status-Badges
           (Mint=aktiv, Peach=ausstehend, Rose=inaktiv)
───────────────────────────────────────────────────────────────── */
function IllustrationDataTable() {
  const statusColors = [C.mint, C.peach, C.mint, C.rose, C.peach];
  const statusLabels = [0.7, 0.5, 0.7, 0.6, 0.5];
  return (
    <IllustrationWrapper viewBox="0 0 480 200">
      <rect width="480" height="200" fill={C.bg} />
      <DotGrid id="dg-t" />
      <rect width="480" height="200" fill="url(#dg-t)" />

      {/* Toolbar */}
      <rect x="14" y="10" width="452" height="30" rx="7" fill={C.bg1} stroke={C.border} strokeWidth="1" />
      {/* Suchfeld */}
      <rect x="22" y="16" width="148" height="18" rx="5" fill="#0D0D0D" stroke={C.border} strokeWidth="1" />
      <circle cx="34" cy="25" r="5" fill="none" stroke={C.muted} strokeWidth="1.2" />
      <line x1="38" y1="29" x2="41" y2="32" stroke={C.muted} strokeWidth="1.2" />
      <rect x="46" y="22" width="80" height="5" rx="2" fill={C.border} />
      {/* Filter-Chips */}
      <rect x="178" y="16" width="56" height="18" rx="5" fill="#0D0D0D" stroke={C.border} strokeWidth="1" />
      <rect x="242" y="16" width="56" height="18" rx="5" fill="#0D0D0D" stroke={C.border} strokeWidth="1" />
      {/* Aktion-Button */}
      <rect x="412" y="16" width="46" height="18" rx="5" fill={C.neon} />
      <rect x="422" y="21" width="26" height="8" rx="3" fill={C.bg} />

      {/* Tabellen-Header */}
      <rect x="14" y="46" width="452" height="20" rx="5" fill={C.bg2} />
      <rect x="22" y="52" width="10" height="10" rx="2" fill="none" stroke={C.muted} strokeWidth="1" />
      <rect x="40" y="54" width="56" height="5" rx="2" fill={C.muted} />
      <rect x="128" y="54" width="76" height="5" rx="2" fill={C.muted} />
      <rect x="244" y="54" width="56" height="5" rx="2" fill={C.muted} />
      <rect x="340" y="54" width="48" height="5" rx="2" fill={C.muted} />
      <rect x="428" y="54" width="32" height="5" rx="2" fill={C.muted} />

      {/* Tabellen-Zeilen */}
      {[0,1,2,3,4].map((i) => (
        <g key={i}>
          <rect x="14" y={70+i*24} width="452" height="22" rx="4"
            fill={i===0 ? C.bg2 : "transparent"}
          />
          <line x1="14" y1={92+i*24} x2="466" y2={92+i*24} stroke={C.border} strokeWidth="0.5" />
          {/* Checkbox */}
          <rect x="22" y={75+i*24} width="10" height="10" rx="2"
            fill={i===0 ? C.neon : "none"}
            stroke={i===0 ? C.neon : C.border2}
            strokeWidth="1"
          />
          {i===0 && (
            <path d={`M24 ${80+i*24} L27 ${83+i*24} L32 ${77+i*24}`}
              stroke={C.bg} strokeWidth="1.5" strokeLinecap="round" />
          )}
          {/* Avatar */}
          <circle cx="50" cy={81+i*24} r="8" fill={C.bg3} stroke={C.border2} strokeWidth="1" />
          {/* Name */}
          <rect x="64" y={77+i*24} width="52" height="5" rx="2" fill={C.border2} />
          <rect x="64" y={85+i*24} width="38" height="4" rx="2" fill={C.border} />
          {/* E-Mail */}
          <rect x="128" y={79+i*24} width="88" height="5" rx="2" fill={C.border} />
          {/* Status-Badge */}
          <rect x="244" y={76+i*24} width="44" height="10" rx="5"
            fill={statusColors[i]} fillOpacity="0.15" />
          <rect x="250" y={79+i*24} width="32" height="5" rx="2"
            fill={statusColors[i]} fillOpacity={statusLabels[i]} />
          {/* Datum */}
          <rect x="340" y={79+i*24} width="56" height="5" rx="2" fill={C.border} />
          {/* Drei-Punkte */}
          {[0,1,2].map(d => (
            <circle key={d} cx={436+d*10} cy={81+i*24} r="2.5" fill={C.border2} />
          ))}
        </g>
      ))}
    </IllustrationWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   10 · Terminal & CLI
   Farben: Neon-Gelb Commands, Smaragd Erfolgs-Output,
           Koralle Fehler-Zeile, Aqua Mist Log-Zeilen,
           Butter Yellow Build-Pipeline Labels
───────────────────────────────────────────────────────────────── */
function IllustrationTerminal() {
  return (
    <IllustrationWrapper viewBox="0 0 480 200">
      <rect width="480" height="200" fill={C.bg} />
      <DotGrid id="dg-term" />
      <rect width="480" height="200" fill="url(#dg-term)" />

      {/* Terminal-Fenster */}
      <rect x="14" y="10" width="280" height="180" rx="10" fill={C.bg1} stroke={C.border} strokeWidth="1" />
      {/* Titelleiste */}
      <rect x="14" y="10" width="280" height="30" rx="10" fill={C.bg2} />
      <rect x="14" y="30" width="280" height="10" fill={C.bg2} />
      <line x1="14" y1="40" x2="294" y2="40" stroke={C.border} strokeWidth="1" />
      <circle cx="32"  cy="25" r="5" fill="#FF5F57" fillOpacity="0.85" />
      <circle cx="50"  cy="25" r="5" fill="#FEBC2E" fillOpacity="0.85" />
      <circle cx="68"  cy="25" r="5" fill="#28C840" fillOpacity="0.85" />
      <rect x="116" y="22" width="90" height="7" rx="3" fill={C.border} />

      {/* Terminal-Zeilen */}
      {[
        { y: 48,  isCmd: true,  color: C.neon,     w: 140, op: 0.75 },
        { y: 62,  isCmd: false, color: C.neon,     w: 110, op: 0.45 },
        { y: 76,  isCmd: false, color: C.positive, w: 160, op: 0.8 },
        { y: 90,  isCmd: true,  color: C.neon,     w: 120, op: 0.75 },
        { y: 104, isCmd: false, color: C.aqua,     w: 180, op: 0.7 },
        { y: 118, isCmd: false, color: C.aqua,     w: 150, op: 0.6 },
        { y: 132, isCmd: false, color: C.positive, w: 130, op: 0.8 },
        { y: 146, isCmd: false, color: C.negative, w: 96,  op: 0.7 },
        { y: 160, isCmd: true,  color: C.neon,     w: 0,   op: 0.75, cursor: true },
      ].map((line, i) => (
        <g key={i}>
          {line.isCmd && (
            <text x="22" y={line.y+10} fontSize="9" fill={C.neon} fillOpacity="0.5" fontFamily="monospace">&gt;_</text>
          )}
          {line.w > 0 && (
            <rect
              x={line.isCmd ? 42 : 22}
              y={line.y}
              width={line.w}
              height="8"
              rx="2.5"
              fill={line.color}
              fillOpacity={line.op}
            />
          )}
          {line.cursor && (
            <rect x="42" y={line.y} width="8" height="12" rx="2" fill={C.neon} fillOpacity="0.9" />
          )}
        </g>
      ))}

      {/* Pipeline-Panel */}
      <rect x="306" y="10" width="160" height="180" rx="10" fill={C.bg1} stroke={C.border} strokeWidth="1" />
      <rect x="318" y="22" width="90" height="9" rx="4" fill={C.neon} fillOpacity="0.65" />
      <rect x="318" y="36" width="60" height="6" rx="3" fill={C.border2} />

      {/* Pipeline-Schritte */}
      {[
        { y: 52,  done: true,  running: false, color: C.positive, labelW: 96 },
        { y: 76,  done: true,  running: false, color: C.positive, labelW: 88 },
        { y: 100, done: true,  running: false, color: C.positive, labelW: 104 },
        { y: 124, done: false, running: true,  color: C.neon,     labelW: 116 },
        { y: 148, done: false, running: false, color: C.butter,   labelW: 80 },
        { y: 172, done: false, running: false, color: C.butter,   labelW: 92 },
      ].map((step, i) => (
        <g key={i}>
          <circle cx="320" cy={step.y+7} r="7"
            fill={step.done ? step.color : step.running ? step.color : C.bg2}
            fillOpacity={step.running ? 0.25 : 1}
            stroke={step.done || step.running ? "none" : C.border2}
            strokeWidth="1.5"
          />
          {step.done && (
            <path d={`M${317} ${step.y+7} L${319} ${step.y+9} L${323} ${step.y+5}`}
              stroke={C.bg} strokeWidth="1.5" strokeLinecap="round" />
          )}
          {step.running && (
            <circle cx="320" cy={step.y+7} r="4" fill={step.color} fillOpacity="0.8" />
          )}
          <rect x="334" y={step.y+4} width={step.labelW} height="6" rx="3"
            fill={step.done ? C.white : step.running ? step.color : step.color}
            fillOpacity={step.done ? 0.45 : step.running ? 0.8 : 0.3}
          />
          {i < 5 && (
            <line x1="320" y1={step.y+14} x2="320" y2={step.y+22}
              stroke={step.done ? step.color : C.border}
              strokeWidth="1"
              strokeOpacity={step.done ? 0.4 : 1}
            />
          )}
        </g>
      ))}
    </IllustrationWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Template-Daten
───────────────────────────────────────────────────────────────── */
interface TemplateCard {
  title: string;
  description: string;
  href: string;
  badge: string;
  badgeVariant?: "default" | "solid" | "outline" | "positive" | "negative" | "muted" | "glass" | "neutral" | "blue" | "red";
  Illustration: React.FC;
}

const templates: TemplateCard[] = [
  {
    title: "SaaS Landing Page",
    description: "Hero, Feature-Grid, Testimonials, CTA-Banner – vollständige Marketing-Seite für ein SaaS-Produkt.",
    href: "/showcase/landing",
    badge: "Marketing",
    badgeVariant: "default",
    Illustration: IllustrationLanding,
  },
  {
    title: "Analytics Dashboard",
    description: "KPI-Karten, Charts, Tabelle, Sidebar-Navigation – klassisches Admin-Panel mit Volt UI.",
    href: "/showcase/dashboard",
    badge: "Dashboard",
    badgeVariant: "solid",
    Illustration: IllustrationDashboard,
  },
  {
    title: "Pricing Page",
    description: "3-Spalten-Preisvergleich mit Feature-Tabelle, monatlich/jährlich-Toggle und CTA.",
    href: "/showcase/pricing",
    badge: "Marketing",
    badgeVariant: "default",
    Illustration: IllustrationPricing,
  },
  {
    title: "Login & Auth",
    description: "Sign-in, Sign-up und Forgot-Password – alle drei Auth-Screens in einem Template.",
    href: "/showcase/auth",
    badge: "App",
    badgeVariant: "outline",
    Illustration: IllustrationAuth,
  },
  {
    title: "Empty States",
    description: "Leere Zustände: keine Daten, Fehler, Suche ohne Ergebnis, Offline, Onboarding u.v.m.",
    href: "/showcase/empty-states",
    badge: "UI Pattern",
    badgeVariant: "muted",
    Illustration: IllustrationEmptyStates,
  },
  {
    title: "Settings Page",
    description: "Profil, Benachrichtigungen, Erscheinungsbild, Sicherheit & Gefahrenzone – vollständige Einstellungsseite.",
    href: "/showcase/settings",
    badge: "App",
    badgeVariant: "muted",
    Illustration: IllustrationSettings,
  },
  {
    title: "Onboarding Flow",
    description: "5-stufiger Setup-Wizard: Willkommen, Profil, Workspace, Integrationen, Fertig.",
    href: "/showcase/onboarding",
    badge: "App",
    badgeVariant: "outline",
    Illustration: IllustrationOnboarding,
  },
  {
    title: "Notification Center",
    description: "Benachrichtigungszentrum mit Kategorien, Prioritäten, Bulk-Aktionen und kritischen Alerts.",
    href: "/showcase/notifications",
    badge: "App",
    badgeVariant: "outline",
    Illustration: IllustrationNotifications,
  },
  {
    title: "Data Table View",
    description: "Nutzerverwaltung mit Suche, Filtern, Sortierung, Selektion und Pagination.",
    href: "/showcase/data-table",
    badge: "App",
    badgeVariant: "solid",
    Illustration: IllustrationDataTable,
  },
  {
    title: "Terminal & CLI",
    description: "Interaktives Terminal, Build-Pipeline, Log-Viewer und Quick Commands – Dev-Tool-Template.",
    href: "/showcase/terminal",
    badge: "Dev",
    badgeVariant: "default",
    Illustration: IllustrationTerminal,
  },
];

/* ─────────────────────────────────────────────────────────────────
   Hauptkomponente
───────────────────────────────────────────────────────────────── */
export default function ShowcaseIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>volt ui</span>
          </Link>
          <span className="text-border text-lg font-light select-none">/</span>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Templates</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Terminal className="w-3 h-3 text-[#E4FF97]" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight hidden sm:block">volt ui</span>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="flex items-center gap-2 mb-4">
          <VoltBadge variant="default" size="sm">Seiten-Templates</VoltBadge>
          <span className="text-muted-foreground text-sm font-mono">{templates.length} verfügbar</span>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4">
          Template Showcase
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
          Vollständige Seiten-Templates, gebaut mit Volt UI Komponenten.
          Jedes Template ist sofort einsetzbar und vollständig anpassbar.
        </p>
      </section>

      {/* ── Template Grid ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((t) => (
            <Link key={t.href} href={t.href}>
              <div className="group border border-border rounded-2xl overflow-hidden hover:border-foreground/40 hover:shadow-xl transition-all duration-200 cursor-pointer bg-card">
                {/* SVG-Illustration – aspect-ratio 12:5 verhindert Anschnitt */}
                <div className="w-full overflow-hidden rounded-t-2xl" style={{ aspectRatio: "12/5" }}>
                  <t.Illustration />
                  {/* Hover-Overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-200 pointer-events-none" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-bold text-base leading-tight">{t.title}</h3>
                    <VoltBadge variant={t.badgeVariant ?? "outline"} size="sm" className="flex-shrink-0">
                      {t.badge}
                    </VoltBadge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.description}</p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:gap-3 transition-all">
                    Template öffnen
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <p className="text-muted-foreground text-sm font-mono">
            volt ui · Template Showcase · {templates.length} Templates
          </p>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Zur Hauptseite
          </Link>
        </div>
      </section>
    </div>
  );
}
