/**
 * Volt UI – Template Showcase Index
 * Übersicht aller verfügbaren Seiten-Templates
 * Route: /showcase
 */
import { Link } from "wouter";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { ArrowRight, Terminal, ArrowLeft, Layers } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   SVG-Illustrationen – eine pro Template
   Jede Illustration ist 100 % inline-SVG, kein externes Asset.
───────────────────────────────────────────────────────────────── */

/** 1 · SaaS Landing Page – Hero + Feature-Grid + CTA */
function IllustrationLanding() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Hintergrund */}
      <rect width="400" height="160" fill="#E4FF97" />
      {/* Subtiles Raster */}
      <defs>
        <pattern id="grid-landing" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0A0A0A" strokeWidth="0.3" strokeOpacity="0.12" />
        </pattern>
      </defs>
      <rect width="400" height="160" fill="url(#grid-landing)" />

      {/* Navbar-Leiste */}
      <rect x="24" y="16" width="352" height="22" rx="6" fill="#0A0A0A" fillOpacity="0.08" />
      <rect x="32" y="22" width="40" height="10" rx="3" fill="#0A0A0A" fillOpacity="0.5" />
      <rect x="290" y="22" width="28" height="10" rx="3" fill="#0A0A0A" fillOpacity="0.3" />
      <rect x="324" y="22" width="28" height="10" rx="3" fill="#0A0A0A" fillOpacity="0.3" />
      <rect x="358" y="20" width="10" height="14" rx="3" fill="#0A0A0A" fillOpacity="0.5" />

      {/* Hero-Headline */}
      <rect x="80" y="52" width="240" height="14" rx="4" fill="#0A0A0A" fillOpacity="0.75" />
      <rect x="110" y="72" width="180" height="8" rx="3" fill="#0A0A0A" fillOpacity="0.35" />

      {/* CTA-Buttons */}
      <rect x="118" y="90" width="72" height="22" rx="6" fill="#0A0A0A" />
      <rect x="198" y="90" width="84" height="22" rx="6" fill="none" stroke="#0A0A0A" strokeWidth="1.5" />

      {/* Feature-Karten */}
      <rect x="24" y="126" width="100" height="22" rx="6" fill="#0A0A0A" fillOpacity="0.08" />
      <rect x="150" y="126" width="100" height="22" rx="6" fill="#0A0A0A" fillOpacity="0.08" />
      <rect x="276" y="126" width="100" height="22" rx="6" fill="#0A0A0A" fillOpacity="0.08" />

      {/* Kleine Icon-Punkte in Karten */}
      <circle cx="34" cy="137" r="4" fill="#0A0A0A" fillOpacity="0.3" />
      <circle cx="160" cy="137" r="4" fill="#0A0A0A" fillOpacity="0.3" />
      <circle cx="286" cy="137" r="4" fill="#0A0A0A" fillOpacity="0.3" />
    </svg>
  );
}

/** 2 · Analytics Dashboard – Sidebar + Charts + KPIs */
function IllustrationDashboard() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0A0A0A" />
      {/* Sidebar */}
      <rect x="0" y="0" width="72" height="160" fill="#141414" />
      <rect x="10" y="16" width="52" height="10" rx="3" fill="#E4FF97" fillOpacity="0.9" />
      <rect x="10" y="36" width="40" height="7" rx="2" fill="#FFFFFF" fillOpacity="0.15" />
      <rect x="10" y="50" width="44" height="7" rx="2" fill="#FFFFFF" fillOpacity="0.08" />
      <rect x="10" y="64" width="36" height="7" rx="2" fill="#FFFFFF" fillOpacity="0.08" />
      <rect x="10" y="78" width="42" height="7" rx="2" fill="#FFFFFF" fillOpacity="0.08" />
      <rect x="10" y="92" width="38" height="7" rx="2" fill="#FFFFFF" fillOpacity="0.08" />
      {/* Trennlinie */}
      <line x1="72" y1="0" x2="72" y2="160" stroke="#1E1E1E" strokeWidth="1" />

      {/* KPI-Karten */}
      <rect x="82" y="12" width="74" height="36" rx="5" fill="#1A1A1A" />
      <rect x="164" y="12" width="74" height="36" rx="5" fill="#1A1A1A" />
      <rect x="246" y="12" width="74" height="36" rx="5" fill="#1A1A1A" />
      <rect x="328" y="12" width="62" height="36" rx="5" fill="#1A1A1A" />
      <rect x="90" y="20" width="30" height="5" rx="2" fill="#666666" />
      <rect x="90" y="30" width="48" height="10" rx="3" fill="#E4FF97" fillOpacity="0.85" />
      <rect x="172" y="20" width="30" height="5" rx="2" fill="#666666" />
      <rect x="172" y="30" width="40" height="10" rx="3" fill="#FFFFFF" fillOpacity="0.6" />
      <rect x="254" y="20" width="30" height="5" rx="2" fill="#666666" />
      <rect x="254" y="30" width="44" height="10" rx="3" fill="#FFFFFF" fillOpacity="0.6" />
      <rect x="336" y="20" width="30" height="5" rx="2" fill="#666666" />
      <rect x="336" y="30" width="36" height="10" rx="3" fill="#FFFFFF" fillOpacity="0.6" />

      {/* Linien-Chart */}
      <rect x="82" y="56" width="196" height="92" rx="6" fill="#141414" />
      <polyline points="92,130 110,110 130,118 150,95 170,100 190,80 210,88 230,70 250,78 268,60" stroke="#E4FF97" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <polyline points="92,130 110,110 130,118 150,95 170,100 190,80 210,88 230,70 250,78 268,60 268,148 92,148" fill="#E4FF97" fillOpacity="0.07" />

      {/* Balken-Chart */}
      <rect x="286" y="56" width="104" height="92" rx="6" fill="#141414" />
      <rect x="296" y="108" width="12" height="32" rx="2" fill="#E4FF97" fillOpacity="0.7" />
      <rect x="312" y="96" width="12" height="44" rx="2" fill="#E4FF97" fillOpacity="0.5" />
      <rect x="328" y="118" width="12" height="22" rx="2" fill="#E4FF97" fillOpacity="0.7" />
      <rect x="344" y="88" width="12" height="52" rx="2" fill="#E4FF97" />
      <rect x="360" y="102" width="12" height="38" rx="2" fill="#E4FF97" fillOpacity="0.5" />
    </svg>
  );
}

/** 3 · Pricing Page – 3 Spalten mit Preisen */
function IllustrationPricing() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#DBEAFE" />
      <defs>
        <pattern id="grid-pricing" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1D4ED8" strokeWidth="0.3" strokeOpacity="0.1" />
        </pattern>
      </defs>
      <rect width="400" height="160" fill="url(#grid-pricing)" />

      {/* Toggle monatlich/jährlich */}
      <rect x="148" y="10" width="104" height="18" rx="9" fill="#BFDBFE" />
      <rect x="148" y="10" width="52" height="18" rx="9" fill="#1D4ED8" />
      <rect x="152" y="13" width="40" height="12" rx="6" fill="white" fillOpacity="0.3" />

      {/* Karte 1 – Free */}
      <rect x="16" y="36" width="108" height="112" rx="8" fill="white" fillOpacity="0.7" stroke="#BFDBFE" strokeWidth="1" />
      <rect x="26" y="48" width="48" height="8" rx="3" fill="#1D4ED8" fillOpacity="0.5" />
      <rect x="26" y="62" width="64" height="14" rx="4" fill="#1D4ED8" fillOpacity="0.7" />
      <rect x="26" y="82" width="76" height="5" rx="2" fill="#93C5FD" />
      <rect x="26" y="92" width="68" height="5" rx="2" fill="#93C5FD" />
      <rect x="26" y="102" width="72" height="5" rx="2" fill="#93C5FD" />
      <rect x="26" y="116" width="88" height="20" rx="5" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1" />

      {/* Karte 2 – Pro (hervorgehoben) */}
      <rect x="146" y="28" width="108" height="120" rx="8" fill="#1D4ED8" />
      <rect x="156" y="40" width="48" height="8" rx="3" fill="white" fillOpacity="0.6" />
      <rect x="156" y="54" width="64" height="14" rx="4" fill="white" />
      <rect x="156" y="74" width="76" height="5" rx="2" fill="white" fillOpacity="0.4" />
      <rect x="156" y="84" width="68" height="5" rx="2" fill="white" fillOpacity="0.4" />
      <rect x="156" y="94" width="72" height="5" rx="2" fill="white" fillOpacity="0.4" />
      <rect x="156" y="104" width="60" height="5" rx="2" fill="white" fillOpacity="0.4" />
      <rect x="156" y="118" width="88" height="20" rx="5" fill="white" />
      {/* "Beliebt"-Badge */}
      <rect x="168" y="30" width="64" height="14" rx="7" fill="#E4FF97" transform="translate(0,-14)" />
      <rect x="168" y="16" width="64" height="14" rx="7" fill="#E4FF97" />

      {/* Karte 3 – Enterprise */}
      <rect x="276" y="36" width="108" height="112" rx="8" fill="white" fillOpacity="0.7" stroke="#BFDBFE" strokeWidth="1" />
      <rect x="286" y="48" width="48" height="8" rx="3" fill="#1D4ED8" fillOpacity="0.5" />
      <rect x="286" y="62" width="64" height="14" rx="4" fill="#1D4ED8" fillOpacity="0.7" />
      <rect x="286" y="82" width="76" height="5" rx="2" fill="#93C5FD" />
      <rect x="286" y="92" width="68" height="5" rx="2" fill="#93C5FD" />
      <rect x="286" y="102" width="72" height="5" rx="2" fill="#93C5FD" />
      <rect x="286" y="116" width="88" height="20" rx="5" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1" />
    </svg>
  );
}

/** 4 · Login & Auth – Formular-Fenster */
function IllustrationAuth() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#F3E8FF" />
      <defs>
        <pattern id="grid-auth" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="#7C3AED" fillOpacity="0.15" />
        </pattern>
      </defs>
      <rect width="400" height="160" fill="url(#grid-auth)" />

      {/* Hintergrund-Blur-Kreise */}
      <circle cx="80" cy="40" r="60" fill="#7C3AED" fillOpacity="0.08" />
      <circle cx="320" cy="120" r="50" fill="#A855F7" fillOpacity="0.08" />

      {/* Auth-Karte */}
      <rect x="112" y="12" width="176" height="136" rx="10" fill="white" fillOpacity="0.9" />
      <rect x="112" y="12" width="176" height="136" rx="10" stroke="#E9D5FF" strokeWidth="1" />

      {/* Avatar-Kreis */}
      <circle cx="200" cy="40" r="16" fill="#7C3AED" fillOpacity="0.15" />
      <circle cx="200" cy="40" r="8" fill="#7C3AED" fillOpacity="0.6" />

      {/* Titel */}
      <rect x="148" y="62" width="104" height="9" rx="3" fill="#7C3AED" fillOpacity="0.7" />
      <rect x="160" y="76" width="80" height="6" rx="2" fill="#C4B5FD" />

      {/* Input E-Mail */}
      <rect x="128" y="90" width="144" height="16" rx="4" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1" />
      <rect x="136" y="95" width="60" height="6" rx="2" fill="#C4B5FD" />

      {/* Input Passwort */}
      <rect x="128" y="112" width="144" height="16" rx="4" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1" />
      <rect x="136" y="117" width="48" height="6" rx="2" fill="#C4B5FD" />
      {/* Auge-Icon */}
      <circle cx="262" cy="120" r="4" fill="none" stroke="#C4B5FD" strokeWidth="1.2" />
      <circle cx="262" cy="120" r="1.5" fill="#C4B5FD" />

      {/* CTA-Button */}
      <rect x="128" y="134" width="144" height="8" rx="4" fill="#7C3AED" />
    </svg>
  );
}

/** 5 · Empty States – leere Inbox-Illustration */
function IllustrationEmptyStates() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#DCFCE7" />
      <defs>
        <pattern id="grid-empty" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#16A34A" strokeWidth="0.4" strokeOpacity="0.12" />
        </pattern>
      </defs>
      <rect width="400" height="160" fill="url(#grid-empty)" />

      {/* Gestapelte leere Karten */}
      <rect x="60" y="30" width="280" height="100" rx="10" fill="white" fillOpacity="0.5" transform="rotate(-3 200 80)" />
      <rect x="60" y="30" width="280" height="100" rx="10" fill="white" fillOpacity="0.7" transform="rotate(1.5 200 80)" />
      <rect x="60" y="30" width="280" height="100" rx="10" fill="white" fillOpacity="0.95" stroke="#BBF7D0" strokeWidth="1" />

      {/* Inbox-Icon zentriert */}
      {/* Briefkasten-Körper */}
      <rect x="168" y="48" width="64" height="44" rx="6" fill="#16A34A" fillOpacity="0.12" stroke="#16A34A" strokeWidth="1.5" />
      {/* Klappe */}
      <path d="M168 62 L200 76 L232 62" stroke="#16A34A" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      {/* Leerer Text-Hinweis */}
      <rect x="148" y="100" width="104" height="7" rx="3" fill="#16A34A" fillOpacity="0.4" />
      <rect x="168" y="112" width="64" height="5" rx="2" fill="#16A34A" fillOpacity="0.25" />

      {/* Kleine Dekor-Punkte */}
      <circle cx="80" cy="50" r="4" fill="#16A34A" fillOpacity="0.2" />
      <circle cx="320" cy="110" r="6" fill="#16A34A" fillOpacity="0.15" />
      <circle cx="340" cy="40" r="3" fill="#16A34A" fillOpacity="0.2" />
    </svg>
  );
}

/** 6 · Settings Page – Profil + Toggles */
function IllustrationSettings() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#F1F5F9" />
      <defs>
        <pattern id="grid-settings" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.3" strokeOpacity="0.1" />
        </pattern>
      </defs>
      <rect width="400" height="160" fill="url(#grid-settings)" />

      {/* Linke Navigationsleiste */}
      <rect x="16" y="16" width="96" height="128" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="26" y="28" width="56" height="7" rx="3" fill="#334155" fillOpacity="0.7" />
      <rect x="26" y="44" width="64" height="7" rx="3" fill="#334155" fillOpacity="0.2" />
      <rect x="26" y="57" width="52" height="7" rx="3" fill="#334155" fillOpacity="0.2" />
      <rect x="26" y="70" width="60" height="7" rx="3" fill="#334155" fillOpacity="0.2" />
      <rect x="26" y="83" width="48" height="7" rx="3" fill="#334155" fillOpacity="0.2" />
      {/* Aktiver Eintrag */}
      <rect x="20" y="40" width="88" height="18" rx="5" fill="#334155" fillOpacity="0.08" />

      {/* Rechter Inhaltsbereich */}
      <rect x="124" y="16" width="260" height="128" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="1" />

      {/* Profil-Header */}
      <circle cx="152" cy="44" r="18" fill="#CBD5E1" />
      <circle cx="152" cy="38" r="8" fill="#94A3B8" />
      <ellipse cx="152" cy="58" rx="12" ry="6" fill="#94A3B8" />
      <rect x="178" y="34" width="80" height="8" rx="3" fill="#334155" fillOpacity="0.6" />
      <rect x="178" y="48" width="56" height="6" rx="2" fill="#94A3B8" />

      {/* Trennlinie */}
      <line x1="134" y1="72" x2="374" y2="72" stroke="#E2E8F0" strokeWidth="1" />

      {/* Toggle-Zeilen */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="134" y={82 + i * 18} width="120" height="6" rx="2" fill="#334155" fillOpacity="0.35" />
          {/* Toggle */}
          <rect x="340" y={80 + i * 18} width="28" height="10" rx="5" fill={i === 0 ? "#334155" : "#CBD5E1"} />
          <circle cx={i === 0 ? 362 : 346} cy={85 + i * 18} r="4" fill="white" />
        </g>
      ))}
    </svg>
  );
}

/** 7 · Onboarding Flow – Wizard-Schritte */
function IllustrationOnboarding() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#E4FF97" />
      <defs>
        <pattern id="grid-onboarding" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0A0A0A" strokeWidth="0.3" strokeOpacity="0.1" />
        </pattern>
      </defs>
      <rect width="400" height="160" fill="url(#grid-onboarding)" />

      {/* Schritt-Indikatoren oben */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={80 + i * 60} cy={22} r={10} fill={i < 2 ? "#0A0A0A" : i === 2 ? "#0A0A0A" : "none"} stroke="#0A0A0A" strokeWidth={i < 3 ? 0 : 1.5} fillOpacity={i === 2 ? 1 : i < 2 ? 0.85 : 0} />
          {/* Checkmark für erledigte Schritte */}
          {i < 2 && (
            <path d={`M${75 + i * 60} ${22} L${78 + i * 60} ${25} L${85 + i * 60} ${18}`} stroke="#E4FF97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {/* Aktiver Schritt-Nummer */}
          {i === 2 && (
            <text x={80 + i * 60} y={26} textAnchor="middle" fontSize="10" fill="#E4FF97" fontFamily="monospace" fontWeight="bold">3</text>
          )}
          {/* Verbindungslinie */}
          {i < 4 && (
            <line x1={90 + i * 60} y1={22} x2={130 + i * 60} y2={22} stroke="#0A0A0A" strokeWidth={i < 2 ? 2 : 1} strokeOpacity={i < 2 ? 0.6 : 0.2} strokeDasharray={i >= 2 ? "4 3" : "0"} />
          )}
        </g>
      ))}

      {/* Wizard-Karte */}
      <rect x="60" y="42" width="280" height="106" rx="10" fill="#0A0A0A" fillOpacity="0.06" />
      <rect x="64" y="46" width="272" height="98" rx="8" fill="white" fillOpacity="0.85" stroke="#0A0A0A" strokeWidth="1" strokeOpacity="0.1" />

      {/* Workspace-Setup Icon */}
      <rect x="176" y="58" width="48" height="36" rx="6" fill="#0A0A0A" fillOpacity="0.07" />
      <rect x="184" y="64" width="32" height="4" rx="2" fill="#0A0A0A" fillOpacity="0.3" />
      <rect x="184" y="72" width="24" height="4" rx="2" fill="#0A0A0A" fillOpacity="0.2" />
      <rect x="184" y="80" width="28" height="4" rx="2" fill="#0A0A0A" fillOpacity="0.2" />

      {/* Input-Felder */}
      <rect x="80" y="100" width="240" height="12" rx="4" fill="#F8F8F8" stroke="#0A0A0A" strokeWidth="0.8" strokeOpacity="0.15" />
      <rect x="88" y="104" width="80" height="4" rx="2" fill="#0A0A0A" fillOpacity="0.2" />

      {/* Weiter-Button */}
      <rect x="240" y="120" width="84" height="18" rx="5" fill="#0A0A0A" />
      <rect x="252" y="126" width="48" height="6" rx="2" fill="#E4FF97" fillOpacity="0.8" />
    </svg>
  );
}

/** 8 · Notification Center – Benachrichtigungsliste */
function IllustrationNotifications() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#EFF6FF" />
      <defs>
        <pattern id="grid-notif" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="0.8" fill="#2563EB" fillOpacity="0.15" />
        </pattern>
      </defs>
      <rect width="400" height="160" fill="url(#grid-notif)" />

      {/* Kritischer Alert-Banner */}
      <rect x="16" y="10" width="368" height="22" rx="6" fill="#FEF2F2" stroke="#FECACA" strokeWidth="1" />
      <circle cx="30" cy="21" r="5" fill="#EF4444" />
      <rect x="42" y="17" width="120" height="5" rx="2" fill="#EF4444" fillOpacity="0.6" />
      <rect x="42" y="24" width="80" height="4" rx="2" fill="#EF4444" fillOpacity="0.3" />

      {/* Benachrichtigungs-Zeilen */}
      {[
        { y: 40, color: "#2563EB", unread: true, w: 160 },
        { y: 64, color: "#2563EB", unread: true, w: 140 },
        { y: 88, color: "#6B7280", unread: false, w: 120 },
        { y: 112, color: "#6B7280", unread: false, w: 150 },
        { y: 136, color: "#6B7280", unread: false, w: 130 },
      ].map((item, i) => (
        <g key={i}>
          <rect x="16" y={item.y} width="368" height="20" rx="5" fill={item.unread ? "#DBEAFE" : "white"} fillOpacity={item.unread ? 0.8 : 0.5} />
          {/* Avatar */}
          <circle cx="32" cy={item.y + 10} r="7" fill={item.color} fillOpacity={item.unread ? 0.7 : 0.3} />
          {/* Ungelesen-Punkt */}
          {item.unread && <circle cx="16" cy={item.y + 10} r="3" fill="#2563EB" />}
          {/* Text-Zeilen */}
          <rect x="46" y={item.y + 5} width={item.w} height="5" rx="2" fill={item.color} fillOpacity={item.unread ? 0.5 : 0.2} />
          <rect x="46" y={item.y + 13} width={item.w - 40} height="4" rx="2" fill="#94A3B8" fillOpacity="0.5" />
          {/* Zeitstempel */}
          <rect x="340" y={item.y + 7} width="36" height="4" rx="2" fill="#94A3B8" fillOpacity="0.4" />
        </g>
      ))}
    </svg>
  );
}

/** 9 · Data Table View – Tabelle mit Zeilen */
function IllustrationDataTable() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0A0A0A" />

      {/* Toolbar */}
      <rect x="16" y="10" width="368" height="24" rx="6" fill="#141414" />
      {/* Suchfeld */}
      <rect x="24" y="15" width="120" height="14" rx="4" fill="#1E1E1E" />
      <circle cx="33" cy="22" r="4" fill="none" stroke="#444444" strokeWidth="1.2" />
      <line x1="36" y1="25" x2="39" y2="28" stroke="#444444" strokeWidth="1.2" />
      <rect x="42" y="19" width="60" height="4" rx="2" fill="#333333" />
      {/* Filter-Buttons */}
      <rect x="152" y="15" width="44" height="14" rx="4" fill="#1E1E1E" stroke="#2E2E2E" strokeWidth="1" />
      <rect x="202" y="15" width="44" height="14" rx="4" fill="#1E1E1E" stroke="#2E2E2E" strokeWidth="1" />
      {/* Aktion-Button */}
      <rect x="332" y="15" width="44" height="14" rx="4" fill="#E4FF97" />

      {/* Tabellen-Header */}
      <rect x="16" y="40" width="368" height="18" rx="4" fill="#141414" />
      {/* Checkbox */}
      <rect x="24" y="45" width="8" height="8" rx="2" fill="none" stroke="#444444" strokeWidth="1" />
      <rect x="40" y="47" width="48" height="4" rx="2" fill="#444444" />
      <rect x="116" y="47" width="64" height="4" rx="2" fill="#444444" />
      <rect x="208" y="47" width="48" height="4" rx="2" fill="#444444" />
      <rect x="284" y="47" width="40" height="4" rx="2" fill="#444444" />
      <rect x="352" y="47" width="24" height="4" rx="2" fill="#444444" />

      {/* Tabellen-Zeilen */}
      {[
        { y: 62, selected: true, badge: "#6BFF9E", badgeW: 28 },
        { y: 82, selected: false, badge: "#E4FF97", badgeW: 32 },
        { y: 102, selected: false, badge: "#FF6B6B", badgeW: 24 },
        { y: 122, selected: false, badge: "#6BFF9E", badgeW: 28 },
        { y: 142, selected: false, badge: "#E4FF97", badgeW: 32 },
      ].map((row, i) => (
        <g key={i}>
          <rect x="16" y={row.y} width="368" height="18" rx="3" fill={row.selected ? "#1A2A1A" : "transparent"} />
          <line x1="16" y1={row.y + 18} x2="384" y2={row.y + 18} stroke="#1E1E1E" strokeWidth="0.5" />
          {/* Checkbox */}
          <rect x="24" y={row.y + 5} width="8" height="8" rx="2" fill={row.selected ? "#E4FF97" : "none"} stroke={row.selected ? "#E4FF97" : "#333333"} strokeWidth="1" />
          {row.selected && <path d={`M${26} ${row.y + 9} L${28} ${row.y + 12} L${32} ${row.y + 7}`} stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />}
          {/* Avatar */}
          <circle cx="46" cy={row.y + 9} r="6" fill="#1E1E1E" stroke="#2E2E2E" strokeWidth="1" />
          {/* Name */}
          <rect x="58" y={row.y + 5} width="44" height="4" rx="2" fill="#C8C8C8" fillOpacity="0.6" />
          <rect x="58" y={row.y + 11} width="32" height="3" rx="1.5" fill="#444444" />
          {/* Email */}
          <rect x="116" y={row.y + 7} width="72" height="4" rx="2" fill="#666666" />
          {/* Badge */}
          <rect x="208" y={row.y + 5} width={row.badgeW} height="8" rx="4" fill={row.badge} fillOpacity="0.15" />
          <rect x="212" y={row.y + 7} width={row.badgeW - 8} height="4" rx="2" fill={row.badge} fillOpacity="0.7" />
          {/* Datum */}
          <rect x="284" y={row.y + 7} width="48" height="4" rx="2" fill="#444444" />
          {/* Aktionen */}
          <circle cx="358" cy={row.y + 9} r="2" fill="#444444" />
          <circle cx="366" cy={row.y + 9} r="2" fill="#444444" />
          <circle cx="374" cy={row.y + 9} r="2" fill="#444444" />
        </g>
      ))}
    </svg>
  );
}

/** 10 · Terminal & CLI – Build-Pipeline + Logs */
function IllustrationTerminal() {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="160" fill="#0D0D0D" />

      {/* Terminal-Fenster */}
      <rect x="16" y="10" width="240" height="140" rx="8" fill="#141414" stroke="#1E1E1E" strokeWidth="1" />
      {/* Window Controls */}
      <circle cx="30" cy="22" r="4" fill="#FF5F57" />
      <circle cx="44" cy="22" r="4" fill="#FEBC2E" />
      <circle cx="58" cy="22" r="4" fill="#28C840" />
      <rect x="80" y="19" width="80" height="6" rx="3" fill="#1E1E1E" />
      {/* Trennlinie */}
      <line x1="16" y1="32" x2="256" y2="32" stroke="#1E1E1E" strokeWidth="1" />

      {/* Terminal-Zeilen */}
      {[
        { y: 42, color: "#666666", w: 140, prefix: true },
        { y: 54, color: "#E4FF97", w: 100, prefix: false },
        { y: 66, color: "#6BFF9E", w: 120, prefix: false },
        { y: 78, color: "#666666", w: 80, prefix: true },
        { y: 90, color: "#E4FF97", w: 160, prefix: false },
        { y: 102, color: "#6BFF9E", w: 90, prefix: false },
        { y: 114, color: "#6BFF9E", w: 110, prefix: false },
        { y: 126, color: "#FF6B6B", w: 70, prefix: false },
        { y: 138, color: "#E4FF97", w: 8, prefix: true, cursor: true },
      ].map((line, i) => (
        <g key={i}>
          {line.prefix && <text x="24" y={line.y + 8} fontSize="8" fill="#E4FF97" fontFamily="monospace">&gt;_</text>}
          <rect x={line.prefix ? 40 : 24} y={line.y} width={line.w} height="6" rx="2" fill={line.color} fillOpacity={line.prefix ? 0.5 : 0.7} />
          {line.cursor && <rect x={40} y={line.y} width="6" height="10" rx="1" fill="#E4FF97" fillOpacity="0.9">
            <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite" />
          </rect>}
        </g>
      ))}

      {/* Pipeline-Panel rechts */}
      <rect x="268" y="10" width="116" height="140" rx="8" fill="#141414" stroke="#1E1E1E" strokeWidth="1" />
      <rect x="278" y="20" width="60" height="6" rx="3" fill="#E4FF97" fillOpacity="0.7" />
      <rect x="278" y="30" width="40" height="4" rx="2" fill="#444444" />

      {/* Pipeline-Schritte */}
      {[
        { y: 44, status: "done",    label: 60 },
        { y: 62, status: "done",    label: 48 },
        { y: 80, status: "done",    label: 56 },
        { y: 98, status: "running", label: 64 },
        { y: 116, status: "pending", label: 52 },
        { y: 134, status: "pending", label: 44 },
      ].map((step, i) => (
        <g key={i}>
          {/* Status-Kreis */}
          <circle cx="282" cy={step.y + 5} r="5"
            fill={step.status === "done" ? "#6BFF9E" : step.status === "running" ? "#E4FF97" : "#1E1E1E"}
            stroke={step.status === "pending" ? "#333333" : "none"}
          />
          {step.status === "done" && (
            <path d={`M${279} ${step.y + 5} L${281} ${step.y + 7} L${285} ${step.y + 3}`} stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
          )}
          {/* Label */}
          <rect x="292" y={step.y + 2} width={step.label} height="5" rx="2"
            fill={step.status === "done" ? "#C8C8C8" : step.status === "running" ? "#E4FF97" : "#333333"}
            fillOpacity={step.status === "pending" ? 0.5 : 0.8}
          />
          {/* Verbindungslinie */}
          {i < 5 && <line x1="282" y1={step.y + 10} x2="282" y2={step.y + 18} stroke={step.status === "done" ? "#6BFF9E" : "#1E1E1E"} strokeWidth="1" strokeOpacity="0.5" />}
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
    badgeVariant: "blue",
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
    description: "8 leere Zustände: keine Daten, Fehler, Suche ohne Ergebnis, Offline, Onboarding u.v.m.",
    href: "/showcase/empty-states",
    badge: "UI Pattern",
    badgeVariant: "positive",
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
    badgeVariant: "positive",
    Illustration: IllustrationOnboarding,
  },
  {
    title: "Notification Center",
    description: "Benachrichtigungszentrum mit Kategorien, Prioritäten, Bulk-Aktionen und kritischen Alerts.",
    href: "/showcase/notifications",
    badge: "App",
    badgeVariant: "blue",
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
                <div className="h-40 overflow-hidden relative">
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

        {/* Footer-Hinweis */}
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
