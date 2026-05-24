/**
 * Volt UI – Template Showcase Index
 * Route: /showcase
 *
 * Illustrationen: subtil, reduziert, wenige abstrakte Formen
 * Jede Karte hat einen eigenen Pastell-Hintergrund
 */
import { Link } from "wouter";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { ArrowRight, ArrowLeft, Layers } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Farb-Tokens
───────────────────────────────────────────────────────────────── */
const C = {
  mint:     "#C3F4D3",
  butter:   "#FFF5BA",
  blue:     "#D4E8FF",
  orchid:   "#FDE2FF",
  peach:    "#FFECD2",
  aqua:     "#D6F5F5",
  rose:     "#FFD6E0",
  lavender: "#E8E0FF",
  sage:     "#DCF0DC",
  dark:     "#1A1A2E",

  mintDark:     "#6EDFA0",
  butterDark:   "#F5D860",
  blueDark:     "#7BBCF5",
  orchidDark:   "#D97EF5",
  peachDark:    "#F5B87A",
  aquaDark:     "#5ECECE",
  roseDark:     "#F5829A",
  lavenderDark: "#9B7EF5",
  sageDark:     "#7EC87E",

  white:  "#FAFAFA",
  black:  "#0A0A0A",
  neon:   "#E4FF97",
};

/* ─────────────────────────────────────────────────────────────────
   SVG-Wrapper
───────────────────────────────────────────────────────────────── */
function BG({ bg, children, dark = false }: {
  bg: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  const gridColor = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const id = `g${bg.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg
      viewBox="0 0 480 200"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke={gridColor} strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="480" height="200" fill={bg} />
      <rect width="480" height="200" fill={`url(#${id})`} />
      {children}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   1 · SaaS Landing Page  — Mint
   Motiv: Navbar-Streifen + zentrierter Hero-Block + 3 Feature-Streifen
───────────────────────────────────────────────────────────────── */
function IllustrationLanding() {
  return (
    <BG bg={C.mint}>
      {/* Navbar */}
      <rect x={0} y={0} width={480} height={36} fill={C.black} />
      <rect x={20} y={12} width={48} height={12} fill={C.neon} rx={2} />
      <rect x={360} y={13} width={80} height={10} fill={C.white} opacity={0.15} rx={2} />

      {/* Hero-Headline */}
      <rect x={80} y={58} width={320} height={18} fill={C.black} rx={2} />
      <rect x={130} y={84} width={220} height={10} fill={C.black} opacity={0.25} rx={2} />

      {/* CTA */}
      <rect x={170} y={106} width={100} height={22} fill={C.neon} rx={2} />
      <rect x={280} y={106} width={70} height={22} fill="none" stroke={C.black} strokeWidth={1.5} rx={2} />

      {/* Feature-Streifen */}
      {[0, 1, 2].map(i => (
        <rect key={i} x={20 + i * 150} y={148} width={130} height={36}
          fill={i === 1 ? C.mintDark : C.white} opacity={0.7} rx={2}
          stroke={C.black} strokeWidth={1.5} />
      ))}
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   2 · Analytics Dashboard  — Butter
   Motiv: Schmale Sidebar + Linienchart
───────────────────────────────────────────────────────────────── */
function IllustrationDashboard() {
  return (
    <BG bg={C.butter}>
      {/* Sidebar */}
      <rect x={0} y={0} width={64} height={200} fill={C.black} />
      <rect x={12} y={16} width={40} height={12} fill={C.neon} rx={2} />
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={10} y={44 + i * 28} width={44} height={10}
          fill={i === 0 ? C.neon : C.white} opacity={i === 0 ? 1 : 0.15} rx={2} />
      ))}

      {/* Chart-Fläche */}
      <rect x={80} y={16} width={384} height={168} fill={C.white} opacity={0.8} rx={2}
        stroke={C.black} strokeWidth={1.5} />

      {/* Horizontale Rasterlinien */}
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={96} y1={48 + i * 36} x2={448} y2={48 + i * 36}
          stroke={C.black} strokeWidth={0.8} opacity={0.1} />
      ))}

      {/* Kurve */}
      <polyline
        points="96,168 152,148 208,154 264,118 320,132 376,96 432,80"
        stroke={C.black} strokeWidth={2.5} fill="none" strokeLinejoin="round" strokeLinecap="round"
      />
      <polyline
        points="96,168 152,148 208,154 264,118 320,132 376,96 432,80"
        stroke={C.butterDark} strokeWidth={1.5} fill="none" strokeLinejoin="round" strokeLinecap="round"
      />

      {/* Datenpunkte */}
      {[[96,168],[264,118],[376,96],[432,80]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={4} fill={C.neon} stroke={C.black} strokeWidth={1.5} />
      ))}
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   3 · Pricing Page  — Blue
   Motiv: 3 Preisspalten, mittlere hervorgehoben
───────────────────────────────────────────────────────────────── */
function IllustrationPricing() {
  const cols = [
    { x: 20,  h: 140, fill: C.white,  accent: C.blueDark, top: 40 },
    { x: 170, h: 168, fill: C.black,  accent: C.neon,     top: 16 },
    { x: 320, h: 140, fill: C.white,  accent: C.blueDark, top: 40 },
  ];
  return (
    <BG bg={C.blue}>
      {cols.map((col, i) => (
        <g key={i}>
          <rect x={col.x} y={col.top} width={140} height={col.h}
            fill={col.fill} stroke={C.black} strokeWidth={1.5} rx={2} />
          {/* Preis-Block */}
          <rect x={col.x + 16} y={col.top + 16} width={60} height={10}
            fill={i === 1 ? C.white : C.black} opacity={i === 1 ? 0.4 : 0.3} rx={2} />
          <rect x={col.x + 16} y={col.top + 34} width={80} height={18}
            fill={i === 1 ? C.neon : C.black} rx={2} />
          {/* Feature-Zeilen */}
          {[0, 1, 2].map(j => (
            <rect key={j} x={col.x + 16} y={col.top + 68 + j * 18} width={100} height={8}
              fill={i === 1 ? C.white : C.black}
              opacity={i === 1 ? 0.25 : 0.15} rx={2} />
          ))}
          {/* CTA */}
          <rect x={col.x + 16} y={col.top + col.h - 30} width={108} height={18}
            fill={col.accent} stroke={C.black} strokeWidth={1.5} rx={2} />
        </g>
      ))}
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   4 · Login & Auth  — Orchid
   Motiv: Zentrierte Karte mit 2 Inputs + Button
───────────────────────────────────────────────────────────────── */
function IllustrationAuth() {
  return (
    <BG bg={C.orchid}>
      {/* Karte */}
      <rect x={120} y={20} width={240} height={160} fill={C.white}
        stroke={C.black} strokeWidth={1.5} rx={2} />

      {/* Avatar-Platzhalter */}
      <rect x={216} y={36} width={48} height={48} fill={C.orchidDark}
        stroke={C.black} strokeWidth={1.5} rx={2} />

      {/* Titel */}
      <rect x={148} y={96} width={184} height={12} fill={C.black} rx={2} />

      {/* Input 1 */}
      <rect x={136} y={118} width={208} height={20} fill={C.orchid}
        stroke={C.black} strokeWidth={1.5} rx={2} />

      {/* Input 2 */}
      <rect x={136} y={146} width={208} height={20} fill={C.orchid}
        stroke={C.black} strokeWidth={1.5} rx={2} />
      {/* Punkte */}
      {[0,1,2,3].map(i => (
        <circle key={i} cx={296 + i * 10} cy={156} r={3} fill={C.black} opacity={0.4} />
      ))}
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   5 · Empty States  — Peach
   Motiv: Fenster-Rahmen + zentriertes Envelope-Symbol
───────────────────────────────────────────────────────────────── */
function IllustrationEmptyStates() {
  return (
    <BG bg={C.peach}>
      {/* Fenster */}
      <rect x={40} y={16} width={400} height={168} fill={C.white}
        stroke={C.black} strokeWidth={1.5} rx={2} />
      {/* Titelleiste */}
      <rect x={40} y={16} width={400} height={28} fill={C.black} rx={2} />
      <circle cx={62}  cy={30} r={5} fill="#FF5F57" />
      <circle cx={80}  cy={30} r={5} fill="#FEBC2E" />
      <circle cx={98}  cy={30} r={5} fill="#28C840" />

      {/* Envelope */}
      <rect x={176} y={72} width={128} height={80} fill={C.peachDark}
        stroke={C.black} strokeWidth={1.5} rx={2} />
      <path d="M176 72 L240 118 L304 72"
        fill="none" stroke={C.black} strokeWidth={1.5} strokeLinejoin="round" />

      {/* Prompt-Zeile */}
      <rect x={56} y={166} width={12} height={12} fill={C.neon}
        stroke={C.black} strokeWidth={1.5} rx={1} />
      <rect x={74} y={169} width={60} height={6} fill={C.black} opacity={0.2} rx={2} />
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   6 · Settings Page  — Aqua
   Motiv: Schmale Sidebar + Profil-Block + Toggle-Zeilen
───────────────────────────────────────────────────────────────── */
function IllustrationSettings() {
  return (
    <BG bg={C.aqua}>
      {/* Sidebar */}
      <rect x={0} y={0} width={100} height={200} fill={C.black} />
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={12} y={24 + i * 30} width={76} height={16}
          fill={i === 0 ? C.neon : C.white} opacity={i === 0 ? 1 : 0.1} rx={2} />
      ))}

      {/* Inhalt */}
      <rect x={116} y={16} width={348} height={168} fill={C.white} opacity={0.8}
        stroke={C.black} strokeWidth={1.5} rx={2} />

      {/* Profil-Zeile */}
      <rect x={132} y={32} width={44} height={44} fill={C.aquaDark}
        stroke={C.black} strokeWidth={1.5} rx={2} />
      <rect x={186} y={38} width={100} height={10} fill={C.black} rx={2} />
      <rect x={186} y={54} width={68} height={8} fill={C.black} opacity={0.25} rx={2} />

      {/* Trennlinie */}
      <line x1={116} y1={88} x2={464} y2={88} stroke={C.black} strokeWidth={1} opacity={0.2} />

      {/* Toggle-Zeilen */}
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={132} y={104 + i * 26} width={140} height={8}
            fill={C.black} opacity={0.2} rx={2} />
          {/* Toggle */}
          <rect x={420} y={102 + i * 26} width={32} height={14}
            fill={i === 0 ? C.neon : C.white}
            stroke={C.black} strokeWidth={1.5} rx={7} />
          <circle cx={i === 0 ? 444 : 428} cy={109 + i * 26} r={5}
            fill={C.black} opacity={0.6} />
        </g>
      ))}
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   7 · Onboarding Flow  — Rose
   Motiv: Schritt-Indikatoren + Wizard-Karte
───────────────────────────────────────────────────────────────── */
function IllustrationOnboarding() {
  return (
    <BG bg={C.rose}>
      {/* Schritt-Indikatoren */}
      {[0, 1, 2, 3, 4].map(i => (
        <g key={i}>
          <circle cx={80 + i * 80} cy={30} r={12}
            fill={i < 2 ? C.black : i === 2 ? C.neon : C.white}
            stroke={C.black} strokeWidth={1.5} />
          {i < 2 && (
            <path d={`M${74 + i*80} ${30} L${78 + i*80} ${34} L${86 + i*80} ${26}`}
              stroke={i < 2 ? C.neon : C.black} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          )}
          {i < 4 && (
            <line x1={92 + i * 80} y1={30} x2={148 + i * 80} y2={30}
              stroke={C.black} strokeWidth={i < 2 ? 2 : 1}
              strokeDasharray={i >= 2 ? "5 4" : "0"} opacity={i >= 2 ? 0.3 : 0.6} />
          )}
        </g>
      ))}

      {/* Wizard-Karte */}
      <rect x={40} y={56} width={400} height={128} fill={C.white}
        stroke={C.black} strokeWidth={1.5} rx={2} />

      {/* Inhalt */}
      <rect x={60} y={76} width={240} height={14} fill={C.black} rx={2} />
      <rect x={60} y={98} width={180} height={8} fill={C.black} opacity={0.2} rx={2} />

      {/* Input */}
      <rect x={60} y={120} width={360} height={20} fill={C.rose}
        stroke={C.black} strokeWidth={1.5} rx={2} />

      {/* Weiter-Button */}
      <rect x={312} y={152} width={108} height={20} fill={C.neon}
        stroke={C.black} strokeWidth={1.5} rx={2} />
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   8 · Notification Center  — Lavender
   Motiv: Alert-Banner + 4 Zeilen
───────────────────────────────────────────────────────────────── */
function IllustrationNotifications() {
  return (
    <BG bg={C.lavender}>
      {/* Alert-Banner */}
      <rect x={16} y={16} width={448} height={28} fill={C.roseDark}
        stroke={C.black} strokeWidth={1.5} rx={2} />
      <rect x={32} y={24} width={140} height={8} fill={C.black} opacity={0.5} rx={2} />

      {/* Zeilen */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={16} y={56 + i * 34} width={448} height={26}
            fill={i < 2 ? C.white : C.lavender} opacity={0.85}
            stroke={C.black} strokeWidth={1} rx={2} />
          {/* Avatar */}
          <rect x={28} y={62 + i * 34} width={16} height={16}
            fill={[C.lavenderDark, C.roseDark, C.aquaDark, C.peachDark][i]}
            stroke={C.black} strokeWidth={1.5} rx={2} />
          {/* Text */}
          <rect x={52} y={64 + i * 34} width={i < 2 ? 180 : 140} height={7}
            fill={C.black} opacity={i < 2 ? 0.5 : 0.25} rx={2} />
          <rect x={52} y={75 + i * 34} width={i < 2 ? 120 : 90} height={5}
            fill={C.black} opacity={0.15} rx={2} />
          {/* Ungelesen-Dot */}
          {i < 2 && <circle cx={456} cy={69 + i * 34} r={4} fill={C.lavenderDark} stroke={C.black} strokeWidth={1} />}
        </g>
      ))}
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   9 · Data Table View  — Sage
   Motiv: Toolbar + Header-Zeile + 4 Datenzeilen
───────────────────────────────────────────────────────────────── */
function IllustrationDataTable() {
  return (
    <BG bg={C.sage}>
      {/* Toolbar */}
      <rect x={16} y={16} width={448} height={28} fill={C.white} opacity={0.85}
        stroke={C.black} strokeWidth={1.5} rx={2} />
      <rect x={28} y={24} width={120} height={10} fill={C.sage}
        stroke={C.black} strokeWidth={1} rx={2} />
      <rect x={400} y={22} width={52} height={14} fill={C.neon}
        stroke={C.black} strokeWidth={1.5} rx={2} />

      {/* Header */}
      <rect x={16} y={52} width={448} height={20} fill={C.black} rx={2} />
      {[60, 160, 260, 360].map((x, i) => (
        <rect key={i} x={x} y={58} width={80} height={6} fill={C.white} opacity={0.35} rx={2} />
      ))}

      {/* Zeilen */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={16} y={76 + i * 28} width={448} height={24}
            fill={i === 0 ? C.sageDark : C.white} opacity={0.7}
            stroke={C.black} strokeWidth={1} rx={2} />
          {/* Checkbox */}
          <rect x={28} y={82 + i * 28} width={12} height={12}
            fill={i === 0 ? C.neon : C.white} stroke={C.black} strokeWidth={1.5} rx={1} />
          {/* Spalten */}
          <rect x={60} y={84 + i * 28} width={80} height={6} fill={C.black} opacity={0.35} rx={2} />
          <rect x={160} y={84 + i * 28} width={80} height={6} fill={C.black} opacity={0.2} rx={2} />
          {/* Status-Badge */}
          <rect x={260} y={81 + i * 28} width={52} height={12}
            fill={[C.sageDark, C.peachDark, C.sageDark, C.roseDark][i]}
            stroke={C.black} strokeWidth={1} rx={6} />
        </g>
      ))}
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   10 · Terminal & CLI  — Dark
   Motiv: Dunkles Fenster + wenige Zeilen
───────────────────────────────────────────────────────────────── */
function IllustrationTerminal() {
  const lines = [
    { cmd: true,  w: 130, fill: C.neon },
    { cmd: false, w: 100, fill: "#6EDFA0" },
    { cmd: false, w: 150, fill: "#6EDFA0" },
    { cmd: true,  w: 110, fill: C.neon },
    { cmd: false, w: 160, fill: "#5ECECE" },
    { cmd: false, w: 80,  fill: "#F5829A" },
    { cmd: true,  w: 0,   fill: C.neon, cursor: true },
  ];
  return (
    <BG bg={C.dark} dark>
      {/* Fenster */}
      <rect x={16} y={16} width={448} height={168} fill="#0D0D1A"
        stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} rx={2} />

      {/* Titelleiste */}
      <rect x={16} y={16} width={448} height={28} fill="rgba(255,255,255,0.06)" rx={2} />
      <circle cx={36} cy={30} r={5} fill="#FF5F57" />
      <circle cx={54} cy={30} r={5} fill="#FEBC2E" />
      <circle cx={72} cy={30} r={5} fill="#28C840" />

      {/* Zeilen */}
      {lines.map((line, i) => (
        <g key={i}>
          {line.cmd && (
            <rect x={28} y={54 + i * 18} width={10} height={10} fill={C.neon} rx={1} />
          )}
          {line.w > 0 && (
            <rect
              x={line.cmd ? 44 : 28}
              y={55 + i * 18}
              width={line.w}
              height={8}
              fill={line.fill}
              opacity={0.75}
              rx={2}
            />
          )}
          {(line as any).cursor && (
            <rect x={44} y={54 + i * 18} width={8} height={12} fill={C.neon} opacity={0.9} rx={1} />
          )}
        </g>
      ))}
    </BG>
  );
}


/* ─────────────────────────────────────────────────────────────────
   11 · Bitpanda Co-Pilot  — Bitpanda-Green
   Motiv: Portfolio-Header + aufsteigender Chart + Entscheidungs-Alert
───────────────────────────────────────────────────────────────── */
function IllustrationBitpanda() {
  const green = "#CDEFE0";
  return (
    <BG bg={green}>
      {/* Portfolio-Header */}
      <rect x={16} y={16} width={448} height={40} fill={C.black} rx={2} />
      <rect x={28} y={26} width={70} height={8} fill={C.white} opacity={0.3} rx={2} />
      <rect x={28} y={38} width={110} height={12} fill={C.neon} rx={2} />
      {/* Bell mit Badge */}
      <circle cx={436} cy={36} r={10} fill="none" stroke={C.white} strokeWidth={1.5} opacity={0.5} />
      <circle cx={443} cy={29} r={5} fill="#E8402A" />

      {/* Chart-Karte */}
      <rect x={16} y={68} width={280} height={116} fill={C.white} opacity={0.85}
        stroke={C.black} strokeWidth={1.5} rx={2} />
      <polyline points="32,156 76,140 120,148 164,112 208,120 252,88 280,78"
        stroke={C.black} strokeWidth={2.5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <polyline points="32,156 76,140 120,148 164,112 208,120 252,88 280,78"
        stroke={C.mintDark} strokeWidth={1.5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {[[164,112],[252,88]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={4} fill={C.neon} stroke={C.black} strokeWidth={1.5} />
      ))}

      {/* Decision-Alert-Karte */}
      <rect x={308} y={68} width={156} height={116} fill={C.white} opacity={0.85}
        stroke={C.black} strokeWidth={1.5} rx={2} />
      <rect x={308} y={68} width={4} height={116} fill="#E8402A" />
      <circle cx={328} cy={88} r={4} fill="#E8402A" />
      <rect x={340} y={84} width={100} height={8} fill={C.black} opacity={0.45} rx={2} />
      <rect x={324} y={104} width={124} height={6} fill={C.black} opacity={0.18} rx={2} />
      <rect x={324} y={116} width={96} height={6} fill={C.black} opacity={0.18} rx={2} />
      {/* Entscheiden-Button (lime) + Später (outline) */}
      <rect x={324} y={150} width={84} height={20} fill={C.neon} stroke={C.black} strokeWidth={1.5} rx={2} />
      <rect x={416} y={150} width={36} height={20} fill="none" stroke={C.black} strokeWidth={1.5} rx={2} />
    </BG>
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
    badgeVariant: "outline",
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
    badgeVariant: "outline",
    Illustration: IllustrationDataTable,
  },
  {
    title: "Terminal & CLI",
    description: "Interaktives Terminal, Build-Pipeline, Log-Viewer und Quick Commands – Dev-Tool-Template.",
    href: "/showcase/terminal",
    badge: "Dev",
    badgeVariant: "neutral",
    Illustration: IllustrationTerminal,
  },
  {
    title: "Bitpanda Co-Pilot",
    description: "Trading-Co-Pilot mit Portfolio-Übersicht, Entscheidungs-Alerts und KI-Vorschlägen – du bestätigst jeden Trade selbst.",
    href: "/showcase/bitpanda",
    badge: "Finance",
    badgeVariant: "default",
    Illustration: IllustrationBitpanda,
  },
];

/* ─────────────────────────────────────────────────────────────────
   Seite
───────────────────────────────────────────────────────────────── */
export default function ShowcaseIndex() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" />
            volt ui
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Layers className="w-4 h-4" />
            Templates
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="flex items-center gap-2 mb-4">
          <VoltBadge variant="default" size="sm">Seiten-Templates</VoltBadge>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4">
          Template Showcase
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
          Vollständige Seiten-Templates, gebaut mit Volt UI Komponenten.
          Jedes Template ist sofort einsetzbar und vollständig anpassbar.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((t) => (
            <Link key={t.href} href={t.href}>
              <div className="group border border-border rounded-2xl overflow-hidden hover:border-foreground/40 hover:shadow-xl transition-all duration-200 cursor-pointer bg-card">
                {/* SVG-Illustration */}
                <div className="h-40 overflow-hidden relative flex">
                  <div className="w-full h-full flex-shrink-0">
                    <t.Illustration />
                  </div>
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
            volt ui · Template Showcase
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
