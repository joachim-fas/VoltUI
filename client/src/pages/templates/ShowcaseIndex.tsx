/**
 * Volt UI – Template Showcase Index
 * Route: /showcase
 *
 * Gestaltungskonzept:
 * – Alle Illustrationen: #0A0A0A Schwarz + #E4FF97 Neon-Gelb + #1A1A1A / #2A2A2A Graustufen
 * – Raster-Muster als atmosphärische Textur
 * – Terminal-Ästhetik: Monospace-Fragmente, >_ Prompt, Cursor-Blöcke
 * – Einheitliche dunkle Palette, kein Bunt
 */
import { Link } from "wouter";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { ArrowRight, Terminal, ArrowLeft, Layers } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Gemeinsame SVG-Bausteine
───────────────────────────────────────────────────────────────── */

/** Subtiles Punkt-Raster – wird in jede Illustration eingebettet */
function DotGrid({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="8" cy="8" r="0.9" fill="#E4FF97" fillOpacity="0.12" />
      </pattern>
    </defs>
  );
}

/* ─────────────────────────────────────────────────────────────────
   1 · SaaS Landing Page
   Zeigt: Navbar-Leiste, großer Hero-Headline-Block, zwei CTA-Buttons,
   Feature-Karten-Reihe, alles im Volt-Stil
───────────────────────────────────────────────────────────────── */
function IllustrationLanding() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0A0A0A" />
      <DotGrid id="dg-landing" />
      <rect width="400" height="160" fill="url(#dg-landing)" />

      {/* Navbar */}
      <rect x="0" y="0" width="400" height="28" fill="#111111" />
      <line x1="0" y1="28" x2="400" y2="28" stroke="#1E1E1E" strokeWidth="1" />
      {/* Logo-Block */}
      <rect x="16" y="9" width="10" height="10" rx="2" fill="#E4FF97" />
      <rect x="30" y="11" width="32" height="6" rx="2" fill="#E4FF97" fillOpacity="0.7" />
      {/* Nav-Links */}
      <rect x="160" y="11" width="24" height="6" rx="2" fill="#444444" />
      <rect x="192" y="11" width="28" height="6" rx="2" fill="#444444" />
      <rect x="228" y="11" width="20" height="6" rx="2" fill="#444444" />
      {/* CTA-Button Navbar */}
      <rect x="356" y="8" width="28" height="12" rx="3" fill="#E4FF97" />

      {/* Hero-Headline */}
      <rect x="60" y="44" width="280" height="18" rx="3" fill="#E4FF97" fillOpacity="0.9" />
      <rect x="90" y="68" width="220" height="10" rx="3" fill="#2A2A2A" />
      <rect x="110" y="82" width="180" height="8" rx="2" fill="#1E1E1E" />

      {/* CTA-Buttons */}
      <rect x="104" y="100" width="80" height="22" rx="4" fill="#E4FF97" />
      <rect x="104" y="100" width="80" height="22" rx="4" fill="#E4FF97" />
      <rect x="196" y="100" width="80" height="22" rx="4" fill="none" stroke="#2A2A2A" strokeWidth="1.5" />
      {/* Button-Labels */}
      <rect x="116" y="108" width="56" height="6" rx="2" fill="#0A0A0A" />
      <rect x="208" y="108" width="56" height="6" rx="2" fill="#444444" />

      {/* Feature-Karten */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={16 + i * 124} y="134" width="112" height="20" rx="4" fill="#141414" stroke="#1E1E1E" strokeWidth="1" />
          <rect x={24 + i * 124} y="140" width="8" height="8" rx="2" fill="#E4FF97" fillOpacity="0.6" />
          <rect x={36 + i * 124} y="142" width="60" height="4" rx="2" fill="#333333" />
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   2 · Analytics Dashboard
   Zeigt: Dunkle Sidebar, KPI-Karten mit Neon-Werten,
   Linien-Chart mit Neon-Kurve, Balken-Chart
───────────────────────────────────────────────────────────────── */
function IllustrationDashboard() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0A0A0A" />
      <DotGrid id="dg-dash" />
      <rect width="400" height="160" fill="url(#dg-dash)" />

      {/* Sidebar */}
      <rect x="0" y="0" width="68" height="160" fill="#111111" />
      <line x1="68" y1="0" x2="68" y2="160" stroke="#1E1E1E" strokeWidth="1" />
      {/* Sidebar Logo */}
      <rect x="10" y="12" width="10" height="10" rx="2" fill="#E4FF97" />
      <rect x="24" y="14" width="30" height="6" rx="2" fill="#E4FF97" fillOpacity="0.6" />
      {/* Sidebar Nav-Items */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="10" y={36 + i * 18} width="48" height="12" rx="3"
            fill={i === 0 ? "#E4FF97" : "transparent"}
            fillOpacity={i === 0 ? 0.12 : 0}
          />
          <rect x="14" y={39 + i * 18} width="6" height="6" rx="1"
            fill={i === 0 ? "#E4FF97" : "#2A2A2A"}
          />
          <rect x="24" y={41 + i * 18} width="28" height="3" rx="1"
            fill={i === 0 ? "#E4FF97" : "#2A2A2A"}
            fillOpacity={i === 0 ? 0.8 : 1}
          />
        </g>
      ))}

      {/* KPI-Karten */}
      {[
        { x: 80, val: "#E4FF97", w: 52 },
        { x: 160, val: "#FFFFFF", w: 44 },
        { x: 240, val: "#FFFFFF", w: 48 },
        { x: 320, val: "#FFFFFF", w: 40 },
      ].map((k, i) => (
        <g key={i}>
          <rect x={k.x} y="10" width="72" height="34" rx="5" fill="#141414" stroke="#1E1E1E" strokeWidth="1" />
          <rect x={k.x + 8} y="17" width="36" height="4" rx="2" fill="#333333" />
          <rect x={k.x + 8} y="26" width={k.w} height="10" rx="2" fill={k.val} fillOpacity="0.85" />
        </g>
      ))}

      {/* Linien-Chart */}
      <rect x="80" y="52" width="192" height="100" rx="6" fill="#111111" stroke="#1E1E1E" strokeWidth="1" />
      {/* Raster-Linien */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="88" y1={68 + i * 22} x2="264" y2={68 + i * 22} stroke="#1E1E1E" strokeWidth="0.5" />
      ))}
      {/* Neon-Kurve */}
      <polyline
        points="88,130 108,112 128,120 148,96 168,104 188,82 208,90 228,70 248,78 264,60"
        stroke="#E4FF97" strokeWidth="2.5" fill="none" strokeLinejoin="round" strokeLinecap="round"
      />
      {/* Fläche unter Kurve */}
      <polygon
        points="88,130 108,112 128,120 148,96 168,104 188,82 208,90 228,70 248,78 264,60 264,148 88,148"
        fill="#E4FF97" fillOpacity="0.06"
      />
      {/* Datenpunkte */}
      {[[88,130],[148,96],[208,90],[264,60]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#E4FF97" />
      ))}

      {/* Balken-Chart */}
      <rect x="280" y="52" width="112" height="100" rx="6" fill="#111111" stroke="#1E1E1E" strokeWidth="1" />
      {[
        { x: 290, h: 38, o: 0.5 },
        { x: 306, h: 52, o: 0.7 },
        { x: 322, h: 28, o: 0.5 },
        { x: 338, h: 62, o: 1 },
        { x: 354, h: 44, o: 0.7 },
        { x: 370, h: 32, o: 0.5 },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={148 - b.h} width="12" height={b.h} rx="2" fill="#E4FF97" fillOpacity={b.o} />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   3 · Pricing Page
   Zeigt: 3 Karten, mittlere hervorgehoben mit Neon-Gelb-Rand,
   Preis-Typografie, Feature-Zeilen, CTA-Buttons
───────────────────────────────────────────────────────────────── */
function IllustrationPricing() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0A0A0A" />
      <DotGrid id="dg-pricing" />
      <rect width="400" height="160" fill="url(#dg-pricing)" />

      {/* Toggle */}
      <rect x="152" y="8" width="96" height="16" rx="8" fill="#141414" stroke="#1E1E1E" strokeWidth="1" />
      <rect x="152" y="8" width="48" height="16" rx="8" fill="#E4FF97" fillOpacity="0.15" />
      <rect x="156" y="11" width="36" height="10" rx="5" fill="#E4FF97" fillOpacity="0.3" />
      <rect x="200" y="11" width="40" height="10" rx="5" fill="transparent" />

      {/* Karte 1 – Free */}
      <rect x="12" y="32" width="112" height="120" rx="7" fill="#111111" stroke="#1E1E1E" strokeWidth="1" />
      <rect x="22" y="44" width="40" height="5" rx="2" fill="#333333" />
      <rect x="22" y="56" width="56" height="14" rx="3" fill="#2A2A2A" />
      {[0,1,2].map(i => (
        <g key={i}>
          <circle cx="26" cy={80 + i * 12} r="2.5" fill="#1E1E1E" stroke="#2A2A2A" strokeWidth="1" />
          <rect x="32" y={77 + i * 12} width="64" height="4" rx="2" fill="#1E1E1E" />
        </g>
      ))}
      <rect x="22" y="120" width="92" height="18" rx="4" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1" />
      <rect x="38" y="126" width="60" height="6" rx="2" fill="#333333" />

      {/* Karte 2 – Pro (hervorgehoben) */}
      <rect x="144" y="24" width="112" height="128" rx="7" fill="#141414" stroke="#E4FF97" strokeWidth="1.5" />
      {/* "Beliebt"-Badge */}
      <rect x="168" y="16" width="64" height="14" rx="7" fill="#E4FF97" />
      <rect x="176" y="20" width="48" height="6" rx="2" fill="#0A0A0A" />
      <rect x="154" y="36" width="40" height="5" rx="2" fill="#555555" />
      <rect x="154" y="48" width="56" height="14" rx="3" fill="#E4FF97" fillOpacity="0.9" />
      {[0,1,2,3].map(i => (
        <g key={i}>
          {/* Checkmark-Kreis */}
          <circle cx="158" cy={72 + i * 12} r="3" fill="#E4FF97" fillOpacity="0.2" />
          <path d={`M${156} ${72 + i * 12} L${158} ${74 + i * 12} L${162} ${70 + i * 12}`}
            stroke="#E4FF97" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="166" y={69 + i * 12} width="68" height="4" rx="2" fill="#2A2A2A" />
        </g>
      ))}
      <rect x="154" y="122" width="92" height="18" rx="4" fill="#E4FF97" />
      <rect x="170" y="128" width="60" height="6" rx="2" fill="#0A0A0A" />

      {/* Karte 3 – Enterprise */}
      <rect x="276" y="32" width="112" height="120" rx="7" fill="#111111" stroke="#1E1E1E" strokeWidth="1" />
      <rect x="286" y="44" width="40" height="5" rx="2" fill="#333333" />
      <rect x="286" y="56" width="56" height="14" rx="3" fill="#2A2A2A" />
      {[0,1,2].map(i => (
        <g key={i}>
          <circle cx="290" cy={80 + i * 12} r="2.5" fill="#1E1E1E" stroke="#2A2A2A" strokeWidth="1" />
          <rect x="296" y={77 + i * 12} width="64" height="4" rx="2" fill="#1E1E1E" />
        </g>
      ))}
      <rect x="286" y="120" width="92" height="18" rx="4" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1" />
      <rect x="302" y="126" width="60" height="6" rx="2" fill="#333333" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   4 · Login & Auth
   Zeigt: Zentriertes Formular-Fenster, Logo, Inputs, Button
───────────────────────────────────────────────────────────────── */
function IllustrationAuth() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0A0A0A" />
      <DotGrid id="dg-auth" />
      <rect width="400" height="160" fill="url(#dg-auth)" />

      {/* Hintergrund-Glow */}
      <circle cx="200" cy="80" r="90" fill="#E4FF97" fillOpacity="0.03" />

      {/* Auth-Karte */}
      <rect x="108" y="10" width="184" height="140" rx="10" fill="#111111" stroke="#1E1E1E" strokeWidth="1" />

      {/* Logo */}
      <rect x="191" y="22" width="18" height="18" rx="4" fill="#E4FF97" />
      <text x="200" y="34" textAnchor="middle" fontSize="9" fill="#0A0A0A" fontFamily="monospace" fontWeight="bold">&gt;_</text>

      {/* Titel */}
      <rect x="136" y="48" width="128" height="9" rx="3" fill="#E4FF97" fillOpacity="0.8" />
      <rect x="152" y="62" width="96" height="6" rx="2" fill="#2A2A2A" />

      {/* Input E-Mail */}
      <rect x="120" y="76" width="160" height="16" rx="4" fill="#0D0D0D" stroke="#2A2A2A" strokeWidth="1" />
      <rect x="128" y="81" width="56" height="5" rx="2" fill="#333333" />

      {/* Input Passwort */}
      <rect x="120" y="98" width="160" height="16" rx="4" fill="#0D0D0D" stroke="#2A2A2A" strokeWidth="1" />
      <rect x="128" y="103" width="44" height="5" rx="2" fill="#333333" />
      {/* Passwort-Punkte */}
      {[0,1,2,3,4].map(i => (
        <circle key={i} cx={256 + i * 6} cy={106} r="2" fill="#2A2A2A" />
      ))}

      {/* CTA-Button */}
      <rect x="120" y="122" width="160" height="20" rx="5" fill="#E4FF97" />
      <rect x="152" y="129" width="96" height="6" rx="2" fill="#0A0A0A" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   5 · Empty States
   Zeigt: Terminal-Fenster mit leerem Zustand, >_ Prompt, Cursor
───────────────────────────────────────────────────────────────── */
function IllustrationEmptyStates() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0A0A0A" />
      <DotGrid id="dg-empty" />
      <rect width="400" height="160" fill="url(#dg-empty)" />

      {/* Terminal-Fenster */}
      <rect x="60" y="12" width="280" height="136" rx="10" fill="#111111" stroke="#1E1E1E" strokeWidth="1" />
      {/* Titelleiste */}
      <rect x="60" y="12" width="280" height="28" rx="10" fill="#141414" />
      <rect x="60" y="30" width="280" height="10" fill="#141414" />
      <line x1="60" y1="40" x2="340" y2="40" stroke="#1E1E1E" strokeWidth="1" />
      {/* Window Controls */}
      <circle cx="78" cy="26" r="4" fill="#FF5F57" fillOpacity="0.8" />
      <circle cx="94" cy="26" r="4" fill="#FEBC2E" fillOpacity="0.8" />
      <circle cx="110" cy="26" r="4" fill="#28C840" fillOpacity="0.8" />
      {/* Titel */}
      <rect x="160" y="23" width="80" height="6" rx="3" fill="#1E1E1E" />

      {/* Leerer Zustand: zentriertes Icon + Text */}
      {/* Gestrichelter Rahmen */}
      <rect x="140" y="58" width="120" height="60" rx="8" fill="none" stroke="#1E1E1E" strokeWidth="1.5" strokeDasharray="6 4" />
      {/* Inbox-Symbol */}
      <rect x="168" y="70" width="64" height="36" rx="4" fill="none" stroke="#2A2A2A" strokeWidth="1.5" />
      <path d="M168 82 L200 94 L232 82" stroke="#E4FF97" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

      {/* Prompt-Zeile */}
      <text x="80" y="136" fontSize="9" fill="#E4FF97" fillOpacity="0.6" fontFamily="monospace">&gt;_</text>
      <rect x="96" y="129" width="48" height="6" rx="2" fill="#1E1E1E" />
      {/* Cursor */}
      <rect x="148" y="129" width="6" height="8" rx="1" fill="#E4FF97" fillOpacity="0.8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   6 · Settings Page
   Zeigt: Linke Nav-Leiste, rechts Profil + Toggle-Zeilen
───────────────────────────────────────────────────────────────── */
function IllustrationSettings() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0A0A0A" />
      <DotGrid id="dg-settings" />
      <rect width="400" height="160" fill="url(#dg-settings)" />

      {/* Linke Nav */}
      <rect x="12" y="12" width="100" height="136" rx="7" fill="#111111" stroke="#1E1E1E" strokeWidth="1" />
      <rect x="20" y="22" width="48" height="7" rx="3" fill="#E4FF97" fillOpacity="0.7" />
      {/* Nav-Items */}
      {[
        { label: 52, active: true },
        { label: 44, active: false },
        { label: 56, active: false },
        { label: 40, active: false },
        { label: 48, active: false },
      ].map((item, i) => (
        <g key={i}>
          <rect x="16" y={38 + i * 20} width="92" height="14" rx="4"
            fill={item.active ? "#E4FF97" : "transparent"}
            fillOpacity={item.active ? 0.1 : 0}
          />
          <rect x="20" y={41 + i * 20} width="6" height="6" rx="1"
            fill={item.active ? "#E4FF97" : "#2A2A2A"}
            fillOpacity={item.active ? 0.8 : 1}
          />
          <rect x="30" y={43 + i * 20} width={item.label} height="4" rx="2"
            fill={item.active ? "#E4FF97" : "#2A2A2A"}
            fillOpacity={item.active ? 0.7 : 1}
          />
        </g>
      ))}

      {/* Rechter Inhaltsbereich */}
      <rect x="124" y="12" width="264" height="136" rx="7" fill="#111111" stroke="#1E1E1E" strokeWidth="1" />

      {/* Profil-Zeile */}
      <circle cx="152" cy="40" r="18" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1" />
      {/* Avatar-Silhouette */}
      <circle cx="152" cy="34" r="7" fill="#2A2A2A" />
      <ellipse cx="152" cy="52" rx="10" ry="5" fill="#2A2A2A" />
      <rect x="178" y="30" width="72" height="8" rx="3" fill="#E4FF97" fillOpacity="0.7" />
      <rect x="178" y="44" width="52" height="5" rx="2" fill="#333333" />
      {/* Edit-Button */}
      <rect x="340" y="30" width="36" height="18" rx="4" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1" />
      <rect x="348" y="36" width="20" height="4" rx="2" fill="#333333" />

      {/* Trennlinie */}
      <line x1="134" y1="68" x2="378" y2="68" stroke="#1E1E1E" strokeWidth="1" />

      {/* Toggle-Zeilen */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="134" y={78 + i * 18} width="140" height="5" rx="2" fill="#2A2A2A" />
          {/* Toggle */}
          <rect x="340" y={76 + i * 18} width="28" height="10" rx="5"
            fill={i === 0 || i === 2 ? "#E4FF97" : "#1A1A1A"}
            stroke={i === 0 || i === 2 ? "none" : "#2A2A2A"}
            strokeWidth="1"
          />
          <circle
            cx={i === 0 || i === 2 ? 362 : 346}
            cy={81 + i * 18}
            r="4"
            fill={i === 0 || i === 2 ? "#0A0A0A" : "#333333"}
          />
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   7 · Onboarding Flow
   Zeigt: Schritt-Indikatoren, Wizard-Karte mit Neon-Akzent
───────────────────────────────────────────────────────────────── */
function IllustrationOnboarding() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0A0A0A" />
      <DotGrid id="dg-onboarding" />
      <rect width="400" height="160" fill="url(#dg-onboarding)" />

      {/* Schritt-Indikatoren */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle
            cx={60 + i * 70} cy={20} r={10}
            fill={i < 2 ? "#E4FF97" : i === 2 ? "#E4FF97" : "#111111"}
            fillOpacity={i < 2 ? 0.9 : i === 2 ? 1 : 1}
            stroke={i >= 3 ? "#2A2A2A" : "none"}
            strokeWidth="1.5"
          />
          {/* Checkmarks für erledigte Schritte */}
          {i < 2 && (
            <path
              d={`M${55 + i * 70} ${20} L${58 + i * 70} ${23} L${65 + i * 70} ${17}`}
              stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          )}
          {/* Aktive Schritt-Nummer */}
          {i === 2 && (
            <text x={60 + i * 70} y={24} textAnchor="middle" fontSize="9" fill="#0A0A0A" fontFamily="monospace" fontWeight="bold">3</text>
          )}
          {/* Zukünftige Schritt-Nummern */}
          {i >= 3 && (
            <text x={60 + i * 70} y={24} textAnchor="middle" fontSize="9" fill="#333333" fontFamily="monospace">{i + 1}</text>
          )}
          {/* Verbindungslinien */}
          {i < 4 && (
            <line
              x1={70 + i * 70} y1={20} x2={120 + i * 70} y2={20}
              stroke={i < 2 ? "#E4FF97" : "#1E1E1E"}
              strokeWidth={i < 2 ? 2 : 1}
              strokeOpacity={i < 2 ? 0.6 : 1}
              strokeDasharray={i >= 2 ? "4 3" : "0"}
            />
          )}
        </g>
      ))}

      {/* Wizard-Karte */}
      <rect x="48" y="40" width="304" height="112" rx="10" fill="#111111" stroke="#E4FF97" strokeWidth="1" strokeOpacity="0.3" />

      {/* Workspace-Icon */}
      <rect x="172" y="54" width="56" height="40" rx="6" fill="#141414" stroke="#1E1E1E" strokeWidth="1" />
      <rect x="180" y="62" width="40" height="5" rx="2" fill="#E4FF97" fillOpacity="0.5" />
      <rect x="180" y="72" width="30" height="4" rx="2" fill="#2A2A2A" />
      <rect x="180" y="80" width="36" height="4" rx="2" fill="#2A2A2A" />

      {/* Input-Feld */}
      <rect x="64" y="102" width="272" height="16" rx="4" fill="#0D0D0D" stroke="#2A2A2A" strokeWidth="1" />
      <rect x="72" y="107" width="80" height="5" rx="2" fill="#2A2A2A" />
      {/* Cursor im Input */}
      <rect x="156" y="107" width="5" height="7" rx="1" fill="#E4FF97" fillOpacity="0.7" />

      {/* Weiter-Button */}
      <rect x="256" y="126" width="88" height="18" rx="5" fill="#E4FF97" />
      <rect x="268" y="132" width="64" height="6" rx="2" fill="#0A0A0A" />
      {/* Zurück-Link */}
      <rect x="64" y="130" width="48" height="6" rx="2" fill="#2A2A2A" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   8 · Notification Center
   Zeigt: Kritischer Alert-Banner, Benachrichtigungsliste mit
   Ungelesen-Indikatoren in Neon-Gelb
───────────────────────────────────────────────────────────────── */
function IllustrationNotifications() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0A0A0A" />
      <DotGrid id="dg-notif" />
      <rect width="400" height="160" fill="url(#dg-notif)" />

      {/* Kritischer Alert-Banner */}
      <rect x="12" y="8" width="376" height="24" rx="6" fill="#1A0A0A" stroke="#FF5540" strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="26" cy="20" r="5" fill="#FF5540" fillOpacity="0.8" />
      <text x="22" y="23" fontSize="7" fill="#FF5540" fontFamily="monospace" fontWeight="bold">!</text>
      <rect x="38" y="15" width="120" height="5" rx="2" fill="#FF5540" fillOpacity="0.5" />
      <rect x="38" y="22" width="80" height="4" rx="2" fill="#FF5540" fillOpacity="0.25" />
      {/* Schließen-X */}
      <line x1="374" y1="14" x2="380" y2="26" stroke="#FF5540" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="380" y1="14" x2="374" y2="26" stroke="#FF5540" strokeWidth="1.2" strokeOpacity="0.5" />

      {/* Benachrichtigungs-Zeilen */}
      {[
        { y: 40, unread: true,  avatarFill: "#E4FF97", textW: 160, subW: 120 },
        { y: 62, unread: true,  avatarFill: "#E4FF97", textW: 140, subW: 100 },
        { y: 84, unread: false, avatarFill: "#2A2A2A", textW: 120, subW: 90 },
        { y: 106, unread: false, avatarFill: "#2A2A2A", textW: 150, subW: 110 },
        { y: 128, unread: false, avatarFill: "#2A2A2A", textW: 130, subW: 95 },
      ].map((item, i) => (
        <g key={i}>
          <rect x="12" y={item.y} width="376" height="20" rx="5"
            fill={item.unread ? "#141414" : "#0D0D0D"}
            stroke={item.unread ? "#1E1E1E" : "transparent"}
            strokeWidth="1"
          />
          {/* Ungelesen-Punkt */}
          {item.unread && <circle cx="20" cy={item.y + 10} r="3" fill="#E4FF97" />}
          {/* Avatar */}
          <circle cx="38" cy={item.y + 10} r="7"
            fill={item.avatarFill}
            fillOpacity={item.unread ? 0.2 : 0.08}
            stroke={item.avatarFill}
            strokeWidth="1"
            strokeOpacity={item.unread ? 0.4 : 0.15}
          />
          {/* Text */}
          <rect x="52" y={item.y + 5} width={item.textW} height="5" rx="2"
            fill={item.unread ? "#E4FF97" : "#2A2A2A"}
            fillOpacity={item.unread ? 0.5 : 1}
          />
          <rect x="52" y={item.y + 13} width={item.subW} height="4" rx="2" fill="#1E1E1E" />
          {/* Zeitstempel */}
          <rect x="352" y={item.y + 7} width="32" height="4" rx="2" fill="#1E1E1E" />
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   9 · Data Table View
   Zeigt: Toolbar mit Suche, Tabellen-Header, Zeilen mit
   Checkboxen, Status-Badges in Neon-Gelb
───────────────────────────────────────────────────────────────── */
function IllustrationDataTable() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0A0A0A" />
      <DotGrid id="dg-table" />
      <rect width="400" height="160" fill="url(#dg-table)" />

      {/* Toolbar */}
      <rect x="12" y="8" width="376" height="26" rx="6" fill="#111111" stroke="#1E1E1E" strokeWidth="1" />
      {/* Suchfeld */}
      <rect x="20" y="13" width="128" height="16" rx="4" fill="#0D0D0D" stroke="#1E1E1E" strokeWidth="1" />
      <circle cx="30" cy="21" r="4" fill="none" stroke="#333333" strokeWidth="1.2" />
      <line x1="33" y1="24" x2="36" y2="27" stroke="#333333" strokeWidth="1.2" />
      <rect x="40" y="18" width="64" height="4" rx="2" fill="#1E1E1E" />
      {/* Filter-Chips */}
      <rect x="156" y="13" width="48" height="16" rx="4" fill="#0D0D0D" stroke="#1E1E1E" strokeWidth="1" />
      <rect x="212" y="13" width="48" height="16" rx="4" fill="#0D0D0D" stroke="#1E1E1E" strokeWidth="1" />
      {/* Aktion-Button */}
      <rect x="344" y="13" width="36" height="16" rx="4" fill="#E4FF97" />
      <rect x="352" y="18" width="20" height="5" rx="2" fill="#0A0A0A" />

      {/* Tabellen-Header */}
      <rect x="12" y="40" width="376" height="18" rx="4" fill="#141414" />
      <rect x="20" y="45" width="8" height="8" rx="2" fill="none" stroke="#333333" strokeWidth="1" />
      <rect x="36" y="47" width="48" height="4" rx="2" fill="#333333" />
      <rect x="112" y="47" width="64" height="4" rx="2" fill="#333333" />
      <rect x="208" y="47" width="48" height="4" rx="2" fill="#333333" />
      <rect x="284" y="47" width="40" height="4" rx="2" fill="#333333" />
      <rect x="352" y="47" width="28" height="4" rx="2" fill="#333333" />

      {/* Tabellen-Zeilen */}
      {[
        { y: 62, sel: true },
        { y: 82, sel: false },
        { y: 102, sel: false },
        { y: 122, sel: false },
        { y: 142, sel: false },
      ].map((row, i) => (
        <g key={i}>
          <rect x="12" y={row.y} width="376" height="18" rx="3"
            fill={row.sel ? "#141414" : "transparent"}
          />
          <line x1="12" y1={row.y + 18} x2="388" y2={row.y + 18} stroke="#1A1A1A" strokeWidth="0.5" />
          {/* Checkbox */}
          <rect x="20" y={row.y + 5} width="8" height="8" rx="2"
            fill={row.sel ? "#E4FF97" : "none"}
            stroke={row.sel ? "#E4FF97" : "#2A2A2A"}
            strokeWidth="1"
          />
          {row.sel && (
            <path d={`M${22} ${row.y + 9} L${24} ${row.y + 12} L${28} ${row.y + 7}`}
              stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
          )}
          {/* Avatar */}
          <circle cx="42" cy={row.y + 9} r="6" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1" />
          {/* Name */}
          <rect x="54" y={row.y + 5} width="44" height="4" rx="2" fill="#2A2A2A" />
          <rect x="54" y={row.y + 12} width="32" height="3" rx="1.5" fill="#1A1A1A" />
          {/* E-Mail */}
          <rect x="112" y={row.y + 7} width="72" height="4" rx="2" fill="#1E1E1E" />
          {/* Status-Badge */}
          <rect x="208" y={row.y + 5} width="36" height="8" rx="4"
            fill="#E4FF97"
            fillOpacity={i % 3 === 0 ? 0.15 : i % 3 === 1 ? 0.08 : 0.12}
          />
          <rect x="214" y={row.y + 7} width="24" height="4" rx="2"
            fill="#E4FF97"
            fillOpacity={i % 3 === 0 ? 0.7 : i % 3 === 1 ? 0.3 : 0.5}
          />
          {/* Datum */}
          <rect x="284" y={row.y + 7} width="48" height="4" rx="2" fill="#1E1E1E" />
          {/* Drei-Punkte-Menü */}
          {[0, 1, 2].map((d) => (
            <circle key={d} cx={358 + d * 8} cy={row.y + 9} r="2" fill="#2A2A2A" />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   10 · Terminal & CLI
   Zeigt: Terminal-Fenster links mit Neon-Ausgaben,
   Build-Pipeline rechts mit Status-Indikatoren
───────────────────────────────────────────────────────────────── */
function IllustrationTerminal() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0A0A0A" />
      <DotGrid id="dg-terminal" />
      <rect width="400" height="160" fill="url(#dg-terminal)" />

      {/* Terminal-Fenster */}
      <rect x="12" y="8" width="236" height="144" rx="8" fill="#111111" stroke="#1E1E1E" strokeWidth="1" />
      {/* Titelleiste */}
      <rect x="12" y="8" width="236" height="26" rx="8" fill="#141414" />
      <rect x="12" y="24" width="236" height="10" fill="#141414" />
      <line x1="12" y1="34" x2="248" y2="34" stroke="#1E1E1E" strokeWidth="1" />
      <circle cx="28" cy="21" r="4" fill="#FF5F57" fillOpacity="0.8" />
      <circle cx="44" cy="21" r="4" fill="#FEBC2E" fillOpacity="0.8" />
      <circle cx="60" cy="21" r="4" fill="#28C840" fillOpacity="0.8" />
      <rect x="96" y="18" width="80" height="6" rx="3" fill="#1E1E1E" />

      {/* Terminal-Zeilen */}
      {[
        { y: 42, isCmd: true,  color: "#E4FF97", w: 120, op: 0.7 },
        { y: 54, isCmd: false, color: "#E4FF97", w: 90,  op: 0.5 },
        { y: 66, isCmd: false, color: "#6BFF9E", w: 140, op: 0.7 },
        { y: 78, isCmd: true,  color: "#E4FF97", w: 100, op: 0.7 },
        { y: 90, isCmd: false, color: "#E4FF97", w: 160, op: 0.4 },
        { y: 102, isCmd: false, color: "#6BFF9E", w: 110, op: 0.7 },
        { y: 114, isCmd: false, color: "#6BFF9E", w: 130, op: 0.7 },
        { y: 126, isCmd: false, color: "#FF5540", w: 80,  op: 0.6 },
        { y: 138, isCmd: true,  color: "#E4FF97", w: 0,   op: 0.7, cursor: true },
      ].map((line, i) => (
        <g key={i}>
          {line.isCmd && (
            <text x="20" y={line.y + 8} fontSize="8" fill="#E4FF97" fillOpacity="0.5" fontFamily="monospace">&gt;_</text>
          )}
          {line.w > 0 && (
            <rect
              x={line.isCmd ? 36 : 20}
              y={line.y}
              width={line.w}
              height="6"
              rx="2"
              fill={line.color}
              fillOpacity={line.op}
            />
          )}
          {line.cursor && (
            <rect x="36" y={line.y} width="6" height="10" rx="1" fill="#E4FF97" fillOpacity="0.9" />
          )}
        </g>
      ))}

      {/* Pipeline-Panel */}
      <rect x="260" y="8" width="128" height="144" rx="8" fill="#111111" stroke="#1E1E1E" strokeWidth="1" />
      <rect x="270" y="18" width="72" height="7" rx="3" fill="#E4FF97" fillOpacity="0.7" />
      <rect x="270" y="30" width="48" height="5" rx="2" fill="#2A2A2A" />

      {/* Pipeline-Schritte */}
      {[
        { y: 44, done: true,    running: false },
        { y: 62, done: true,    running: false },
        { y: 80, done: true,    running: false },
        { y: 98, done: false,   running: true },
        { y: 116, done: false,  running: false },
        { y: 134, done: false,  running: false },
      ].map((step, i) => (
        <g key={i}>
          {/* Status-Kreis */}
          <circle cx="274" cy={step.y + 5} r="5"
            fill={step.done ? "#E4FF97" : step.running ? "#E4FF97" : "#141414"}
            fillOpacity={step.running ? 0.3 : 1}
            stroke={step.done ? "none" : step.running ? "#E4FF97" : "#2A2A2A"}
            strokeWidth="1.5"
          />
          {step.done && (
            <path d={`M${271} ${step.y + 5} L${273} ${step.y + 7} L${277} ${step.y + 3}`}
              stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
          )}
          {/* Label */}
          <rect x="284" y={step.y + 2} width={step.done ? 80 : step.running ? 96 : 72} height="5" rx="2"
            fill={step.done ? "#C8C8C8" : step.running ? "#E4FF97" : "#2A2A2A"}
            fillOpacity={step.done ? 0.5 : step.running ? 0.8 : 1}
          />
          {/* Verbindungslinie */}
          {i < 5 && (
            <line x1="274" y1={step.y + 10} x2="274" y2={step.y + 18}
              stroke={step.done ? "#E4FF97" : "#1E1E1E"}
              strokeWidth="1"
              strokeOpacity={step.done ? 0.4 : 1}
            />
          )}
        </g>
      ))}
    </svg>
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
                {/* SVG-Illustration */}
                <div className="h-40 overflow-hidden relative rounded-t-2xl">
                  <t.Illustration />
                  {/* Hover-Overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-200" />
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
