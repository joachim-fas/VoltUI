/**
 * Volt UI – Template Showcase Index
 * Route: /showcase
 *
 * Gestaltungskonzept:
 * – Jede Karte hat einen EIGENEN Pastell-Hintergrund
 * – Brutalism Style: harte schwarze Outlines, KEINE Rundungen, Offset-Schatten
 * – Weiß (#FAFAFA) und Schwarz (#0A0A0A) als Elemente auf den Pastell-Flächen
 * – Neon-Gelb (#E4FF97) als Volt-Akzent auf CTAs/aktiven Elementen
 *
 * Hintergrund-Zuweisung:
 * 1. Landing Page     → Mint       #C3F4D3
 * 2. Dashboard        → Butter     #FFF5BA
 * 3. Pricing          → Blue       #D4E8FF
 * 4. Auth             → Orchid     #FDE2FF
 * 5. Empty States     → Peach      #FFECD2
 * 6. Settings         → Aqua       #D6F5F5
 * 7. Onboarding       → Rose       #FFD6E0
 * 8. Notifications    → Lavender   #E8E0FF
 * 9. Data Table       → Sage       #DCF0DC
 * 10. Terminal        → Charcoal   #1A1A2E  (dunkel – Terminal-Feeling)
 */
import { Link } from "wouter";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { ArrowRight, Terminal, ArrowLeft, Layers } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Farb-Tokens
───────────────────────────────────────────────────────────────── */
const C = {
  // Pastell-Hintergründe (je 1 pro Karte)
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

  // Sekundäre Akzente (auf den Pastell-Flächen)
  white:    "#FAFAFA",
  black:    "#0A0A0A",
  neon:     "#E4FF97",

  // Dunklere Töne der Pastellfarben (für Elemente auf Pastell-BG)
  mintDark:     "#6EDFA0",
  butterDark:   "#F5D860",
  blueDark:     "#7BBCF5",
  orchidDark:   "#D97EF5",
  peachDark:    "#F5B87A",
  aquaDark:     "#5ECECE",
  roseDark:     "#F5829A",
  lavenderDark: "#9B7EF5",
  sageDark:     "#7EC87E",

  shadow: 4,
};

/* ─────────────────────────────────────────────────────────────────
   Brutalism-Hilfsfunktionen
───────────────────────────────────────────────────────────────── */

/** Offset-Schatten-Rechteck */
function Sh({ x, y, w, h, c = C.black }: { x:number; y:number; w:number; h:number; c?:string }) {
  return <rect x={x+C.shadow} y={y+C.shadow} width={w} height={h} fill={c} />;
}

/** Brutalism-Rechteck: Schatten + Fläche + Outline */
function BR({ x, y, w, h, fill, sc = C.black, sw = 2 }: {
  x:number; y:number; w:number; h:number; fill:string; sc?:string; sw?:number;
}) {
  return (
    <>
      <Sh x={x} y={y} w={w} h={h} c={sc} />
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={C.black} strokeWidth={sw} />
    </>
  );
}

/** Brutalism-Kreis */
function BC({ cx, cy, r, fill }: { cx:number; cy:number; r:number; fill:string }) {
  return (
    <>
      <circle cx={cx+C.shadow} cy={cy+C.shadow} r={r} fill={C.black} />
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={C.black} strokeWidth={2} />
    </>
  );
}

/** SVG-Wrapper mit individuellem Hintergrund + Raster */
function BG({ bg, children, dark = false }: {
  bg: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  const gridColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  return (
    <svg
      viewBox="0 0 480 200"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <pattern id={`g-${bg.replace("#","")}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={gridColor} strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="480" height="200" fill={bg} />
      <rect width="480" height="200" fill={`url(#g-${bg.replace("#","")})`} />
      {children}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   1 · SaaS Landing Page  — Hintergrund: Mint
───────────────────────────────────────────────────────────────── */
function IllustrationLanding() {
  return (
    <BG bg={C.mint}>
      {/* Navbar */}
      <BR x={16} y={14} w={448} h={26} fill={C.black} />
      <rect x={24} y={20} width={14} height={14} fill={C.neon} />
      <rect x={44} y={22} width={36} height={10} fill={C.neon} opacity={0.5} />
      <rect x={390} y={18} width={66} height={18} fill={C.white} stroke={C.black} strokeWidth={1.5} />
      <rect x={398} y={23} width={50} height={8} fill={C.black} />

      {/* Hero */}
      <BR x={16} y={50} w={448} h={66} fill={C.white} />
      <rect x={26} y={60} width={280} height={16} fill={C.black} />
      <rect x={26} y={82} width={200} height={10} fill={C.black} opacity={0.3} />
      {/* CTAs */}
      <BR x={26} y={100} w={96} h={24} fill={C.neon} />
      <rect x={34} y={107} width={80} height={10} fill={C.black} />
      <BR x={130} y={100} w={96} h={24} fill={C.mintDark} />
      <rect x={138} y={107} width={80} height={10} fill={C.black} opacity={0.5} />

      {/* Feature-Karten */}
      {[
        { x: 16,  fill: C.mintDark },
        { x: 172, fill: C.white },
        { x: 328, fill: C.neon },
      ].map((k, i) => (
        <g key={i}>
          <BR x={k.x} y={128} w={140} h={58} fill={k.fill} />
          <rect x={k.x+10} y={138} width={18} height={18} fill={C.black} />
          <rect x={k.x+36} y={140} width={86} height={8} fill={C.black} opacity={0.5} />
          <rect x={k.x+36} y={154} width={64} height={6} fill={C.black} opacity={0.25} />
        </g>
      ))}
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   2 · Analytics Dashboard  — Hintergrund: Butter
───────────────────────────────────────────────────────────────── */
function IllustrationDashboard() {
  return (
    <BG bg={C.butter}>
      {/* Sidebar */}
      <BR x={14} y={14} w={78} h={172} fill={C.black} />
      <rect x={22} y={24} width={14} height={14} fill={C.neon} />
      <rect x={40} y={26} width={44} height={10} fill={C.neon} opacity={0.4} />
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={20} y={50+i*22} width={64} height={14}
          fill={i===0 ? C.neon : "transparent"}
          stroke={i===0 ? "none" : "rgba(255,255,255,0.2)"} strokeWidth={1.5}
        />
      ))}

      {/* KPI-Karten */}
      {[
        { x: 104, fill: C.white },
        { x: 222, fill: C.white },
        { x: 340, fill: C.neon },
      ].map((k, i) => (
        <g key={i}>
          <BR x={k.x} y={14} w={104} h={44} fill={k.fill} />
          <rect x={k.x+10} y={22} width={48} height={8} fill={C.black} opacity={0.35} />
          <rect x={k.x+10} y={36} width={68} height={12} fill={C.black} />
        </g>
      ))}

      {/* Chart-Fläche */}
      <BR x={104} y={70} w={240} h={116} fill={C.white} />
      {[0,1,2,3].map(i => (
        <line key={i} x1={104} y1={86+i*28} x2={344} y2={86+i*28}
          stroke={C.black} strokeWidth={0.8} opacity={0.15} />
      ))}
      {/* Kurve */}
      <polyline
        points="114,178 146,158 178,164 210,134 242,146 274,110 306,122 338,88"
        stroke={C.black} strokeWidth={3} fill="none" strokeLinejoin="round"
      />
      <polyline
        points="114,178 146,158 178,164 210,134 242,146 274,110 306,122 338,88"
        stroke={C.butterDark} strokeWidth={2} fill="none" strokeLinejoin="round"
      />
      {[[114,178],[210,134],[274,110],[338,88]].map(([cx,cy],i) => (
        <BC key={i} cx={cx} cy={cy} r={5} fill={C.neon} />
      ))}

      {/* Balken-Chart */}
      <BR x={354} y={70} w={106} h={116} fill={C.white} />
      {[
        { h: 44, fill: C.butterDark },
        { h: 62, fill: C.neon },
        { h: 32, fill: C.butterDark },
        { h: 76, fill: C.black },
        { h: 50, fill: C.butterDark },
      ].map((b, i) => (
        <g key={i}>
          <rect x={362+i*18+C.shadow} y={182-b.h+C.shadow} width={14} height={b.h} fill={C.black} />
          <rect x={362+i*18} y={182-b.h} width={14} height={b.h}
            fill={b.fill} stroke={C.black} strokeWidth={1.5} />
        </g>
      ))}
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   3 · Pricing Page  — Hintergrund: Blue
───────────────────────────────────────────────────────────────── */
function IllustrationPricing() {
  return (
    <BG bg={C.blue}>
      {/* Toggle */}
      <BR x={168} y={10} w={144} h={22} fill={C.white} />
      <rect x={170} y={12} width={70} height={18} fill={C.black} />
      <rect x={176} y={15} width={58} height={12} fill={C.neon} />

      {/* Free */}
      <BR x={14} y={42} w={136} h={148} fill={C.white} />
      <rect x={24} y={52} width={58} height={8} fill={C.black} opacity={0.4} />
      <rect x={24} y={66} width={78} height={18} fill={C.black} />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={24} y={96+i*16} width={10} height={10} fill={C.black} opacity={0.3} />
          <rect x={40} y={98+i*16} width={86} height={6} fill={C.black} opacity={0.25} />
        </g>
      ))}
      <BR x={24} y={162} w={116} h={22} fill={C.blueDark} />
      <rect x={34} y={168} width={96} height={10} fill={C.black} opacity={0.5} />

      {/* Pro – hervorgehoben */}
      <BR x={170} y={28} w={140} h={162} fill={C.black} sc={C.blueDark} />
      <rect x={206} y={14} width={68} height={20} fill={C.neon} stroke={C.black} strokeWidth={2} />
      <rect x={214} y={19} width={52} height={10} fill={C.black} />
      <rect x={180} y={40} width={58} height={8} fill={C.white} opacity={0.5} />
      <rect x={180} y={54} width={78} height={18} fill={C.neon} />
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={180} y={84+i*16} width={10} height={10} fill={C.neon} opacity={0.3} />
          <path d={`M${182} ${89+i*16} L${185} ${92+i*16} L${190} ${87+i*16}`}
            stroke={C.neon} strokeWidth={2} strokeLinecap="round" />
          <rect x={196} y={86+i*16} width={86} height={6} fill={C.white} opacity={0.4} />
        </g>
      ))}
      <BR x={180} y={164} w={120} h={22} fill={C.neon} sc={C.blueDark} />
      <rect x={190} y={170} width={100} height={10} fill={C.black} />

      {/* Enterprise */}
      <BR x={326} y={42} w={140} h={148} fill={C.white} />
      <rect x={336} y={52} width={68} height={8} fill={C.black} opacity={0.4} />
      <rect x={336} y={66} width={78} height={18} fill={C.black} />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={336} y={96+i*16} width={10} height={10} fill={C.black} opacity={0.3} />
          <rect x={352} y={98+i*16} width={86} height={6} fill={C.black} opacity={0.25} />
        </g>
      ))}
      <BR x={336} y={162} w={116} h={22} fill={C.blueDark} />
      <rect x={346} y={168} width={96} height={10} fill={C.black} opacity={0.5} />
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   4 · Login & Auth  — Hintergrund: Orchid
───────────────────────────────────────────────────────────────── */
function IllustrationAuth() {
  return (
    <BG bg={C.orchid}>
      {/* Auth-Karte */}
      <BR x={108} y={14} w={264} h={172} fill={C.white} />

      {/* Logo */}
      <BR x={220} y={24} w={40} h={40} fill={C.orchidDark} />
      <rect x={228} y={32} width={24} height={24} fill={C.black} opacity={0.2} />
      <rect x={232} y={36} width={16} height={10} fill={C.black} />

      {/* Titel */}
      <rect x={128} y={74} width={224} height={14} fill={C.black} />
      <rect x={148} y={94} width={184} height={8} fill={C.black} opacity={0.25} />

      {/* Input E-Mail */}
      <BR x={124} y={110} w={232} h={24} fill={C.orchid} />
      <rect x={134} y={117} width={80} height={10} fill={C.black} opacity={0.4} />

      {/* Input Passwort */}
      <BR x={124} y={142} w={232} h={24} fill={C.orchid} />
      <rect x={134} y={149} width={60} height={10} fill={C.black} opacity={0.4} />
      {[0,1,2,3,4].map(i => (
        <circle key={i} cx={308+i*8} cy={154} r={3} fill={C.black} />
      ))}

      {/* Stärke-Balken */}
      <rect x={124} y={172} width={232} height={6} fill={C.black} opacity={0.1} stroke={C.black} strokeWidth={1.5} />
      <rect x={124} y={172} width={144} height={6} fill={C.orchidDark} stroke={C.black} strokeWidth={1.5} />

      {/* CTA */}
      <BR x={124} y={184} w={232} h={0} fill={C.neon} />
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   5 · Empty States  — Hintergrund: Peach
───────────────────────────────────────────────────────────────── */
function IllustrationEmptyStates() {
  return (
    <BG bg={C.peach}>
      {/* Fenster-Rahmen */}
      <BR x={38} y={14} w={404} h={172} fill={C.white} />

      {/* Titelleiste */}
      <rect x={38} y={14} width={404} height={32} fill={C.black} />
      <circle cx={58}  cy={30} r={6} fill="#FF5F57" />
      <circle cx={78}  cy={30} r={6} fill="#FEBC2E" />
      <circle cx={98}  cy={30} r={6} fill="#28C840" />
      <rect x={178} y={24} width={104} height={12} fill={C.white} opacity={0.15} />

      {/* Gestrichelter Rahmen */}
      <rect x={118} y={58} width={244} height={108}
        fill="none" stroke={C.black} strokeWidth={2} strokeDasharray="10 6" />

      {/* Envelope */}
      <BR x={166} y={80} w={148} h={70} fill={C.peachDark} />
      <path d="M166 80 L240 130 L314 80" fill={C.peachDark} stroke={C.black} strokeWidth={2} strokeLinejoin="round" />
      <path d="M166 80 L240 130 L314 80" fill="none" stroke={C.black} strokeWidth={2} strokeLinejoin="round" />
      <rect x={186} y={100} width={108} height={8} fill={C.black} opacity={0.15} />
      <rect x={196} y={114} width={88} height={6} fill={C.black} opacity={0.1} />

      {/* Prompt */}
      <rect x={50} y={172} width={16} height={14} fill={C.neon} stroke={C.black} strokeWidth={1.5} />
      <rect x={70} y={174} width={80} height={10} fill={C.black} opacity={0.2} />
      <rect x={154} y={172} width={10} height={14} fill={C.black} />
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   6 · Settings Page  — Hintergrund: Aqua
───────────────────────────────────────────────────────────────── */
function IllustrationSettings() {
  return (
    <BG bg={C.aqua}>
      {/* Linke Nav */}
      <BR x={14} y={14} w={118} h={172} fill={C.black} />
      <rect x={22} y={24} width={68} height={10} fill={C.neon} />
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={18} y={46+i*24} width={110} height={18}
            fill={i===0 ? C.neon : "transparent"}
            stroke={i===0 ? "none" : "rgba(255,255,255,0.15)"} strokeWidth={1.5}
          />
          <rect x={24} y={50+i*24} width={10} height={10}
            fill={i===0 ? C.black : C.white} opacity={i===0 ? 1 : 0.3} />
          <rect x={40} y={51+i*24} width={i===0 ? 70 : 58} height={8}
            fill={i===0 ? C.black : C.white} opacity={i===0 ? 1 : 0.25} />
        </g>
      ))}

      {/* Rechter Bereich */}
      <BR x={146} y={14} w={320} h={172} fill={C.white} />

      {/* Profil */}
      <BC cx={180} cy={50} r={26} fill={C.aquaDark} />
      <circle cx={180} cy={42} r={11} fill={C.black} opacity={0.2} />
      <ellipse cx={180} cy={68} rx={16} ry={8} fill={C.black} opacity={0.15} />
      <rect x={216} y={36} width={100} height={12} fill={C.black} />
      <rect x={216} y={54} width={72} height={8} fill={C.black} opacity={0.3} />
      <BR x={404} y={36} w={52} h={22} fill={C.aquaDark} />
      <rect x={412} y={42} width={36} height={10} fill={C.black} opacity={0.5} />

      {/* Trennlinie */}
      <line x1={156} y1={86} x2={456} y2={86} stroke={C.black} strokeWidth={2} />

      {/* Toggle-Zeilen */}
      {[
        { on: true,  fill: C.neon },
        { on: false, fill: C.white },
        { on: true,  fill: C.aquaDark },
        { on: false, fill: C.white },
      ].map((row, i) => (
        <g key={i}>
          <rect x={156} y={98+i*22} width={row.on ? 168 : 138} height={8}
            fill={C.black} opacity={0.25} />
          <rect x={410+C.shadow} y={96+i*22+C.shadow} width={38} height={16} fill={C.black} />
          <rect x={410} y={96+i*22} width={38} height={16}
            fill={row.on ? row.fill : C.white} stroke={C.black} strokeWidth={2} />
          <rect
            x={row.on ? 432 : 414}
            y={100+i*22}
            width={12} height={8}
            fill={C.black}
          />
        </g>
      ))}
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   7 · Onboarding Flow  — Hintergrund: Rose
───────────────────────────────────────────────────────────────── */
function IllustrationOnboarding() {
  return (
    <BG bg={C.rose}>
      {/* Schritt-Indikatoren */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={44+i*88+C.shadow} y={10+C.shadow} width={28} height={28} fill={C.black} />
          <rect x={44+i*88} y={10} width={28} height={28}
            fill={i<2 ? C.black : i===2 ? C.neon : C.white}
            stroke={C.black} strokeWidth={2}
          />
          {i<2 && (
            <path d={`M${50+i*88} ${24} L${55+i*88} ${29} L${65+i*88} ${19}`}
              stroke={C.neon} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          )}
          {i===2 && (
            <rect x={54+i*88} y={20} width={8} height={8} fill={C.black} />
          )}
          {i>=3 && (
            <rect x={54+i*88} y={20} width={8} height={8} fill={C.black} opacity={0.2} />
          )}
          {i<4 && (
            <line x1={72+i*88} y1={24} x2={132+i*88} y2={24}
              stroke={C.black}
              strokeWidth={i<2 ? 2.5 : 1.5}
              strokeDasharray={i>=2 ? "6 4" : "0"}
              opacity={i>=2 ? 0.3 : 1}
            />
          )}
        </g>
      ))}

      {/* Wizard-Karte */}
      <BR x={38} y={50} w={404} h={140} fill={C.white} />

      {/* Inhalt */}
      <BR x={168} y={66} w={144} h={60} fill={C.rose} />
      <rect x={178} y={76} width={124} height={10} fill={C.black} />
      <rect x={178} y={92} width={92} height={8} fill={C.black} opacity={0.25} />
      <rect x={178} y={106} width={112} height={8} fill={C.black} opacity={0.15} />

      {/* Input */}
      <BR x={54} y={136} w={372} h={24} fill={C.rose} />
      <rect x={64} y={143} width={112} height={10} fill={C.black} opacity={0.25} />
      <rect x={180} y={140} width={8} height={14} fill={C.black} />

      {/* Weiter-Button */}
      <BR x={298} y={168} w={128} h={16} fill={C.neon} />
      <rect x={308} y={171} width={108} height={10} fill={C.black} />
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   8 · Notification Center  — Hintergrund: Lavender
───────────────────────────────────────────────────────────────── */
function IllustrationNotifications() {
  const rowFills = [C.white, C.white, C.white, C.white, C.white];
  const avatarFills = [C.lavenderDark, C.roseDark, C.aquaDark, C.peachDark, C.sageDark];
  return (
    <BG bg={C.lavender}>
      {/* Kritischer Alert */}
      <BR x={14} y={10} w={452} h={28} fill={C.roseDark} />
      <rect x={22} y={16} width={16} height={16} fill={C.black} />
      <path d="M30 17 L30 25 M30 27 L30 28" stroke={C.white} strokeWidth={2.5} strokeLinecap="round" />
      <rect x={44} y={18} width={160} height={8} fill={C.black} />
      <rect x={44} y={28} width={110} height={6} fill={C.black} opacity={0.3} />
      <line x1={450} y1={16} x2={460} y2={32} stroke={C.black} strokeWidth={2.5} />
      <line x1={460} y1={16} x2={450} y2={32} stroke={C.black} strokeWidth={2.5} />

      {/* Zeilen */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <BR x={14} y={46+i*28} w={452} h={24}
            fill={i<2 ? C.white : C.lavender}
            sc={i<2 ? C.black : C.lavenderDark}
          />
          {i<2 && <rect x={20} y={52+i*28} width={8} height={8} fill={C.lavenderDark} />}
          {/* Avatar */}
          <rect x={36+C.shadow} y={50+i*28+C.shadow} width={18} height={18} fill={C.black} />
          <rect x={36} y={50+i*28} width={18} height={18}
            fill={avatarFills[i]} stroke={C.black} strokeWidth={2} />
          {/* Text */}
          <rect x={62} y={52+i*28} width={i<2 ? 200 : 160} height={8}
            fill={C.black} opacity={i<2 ? 0.7 : 0.35} />
          <rect x={62} y={64+i*28} width={i<2 ? 140 : 110} height={6}
            fill={C.black} opacity={0.2} />
          {/* Zeit */}
          <rect x={426} y={55+i*28} width={34} height={6} fill={C.black} opacity={0.2} />
        </g>
      ))}
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   9 · Data Table View  — Hintergrund: Sage
───────────────────────────────────────────────────────────────── */
function IllustrationDataTable() {
  const statusFills = [C.sageDark, C.peachDark, C.sageDark, C.roseDark, C.peachDark];
  return (
    <BG bg={C.sage}>
      {/* Toolbar */}
      <BR x={14} y={10} w={452} h={30} fill={C.white} />
      <BR x={22} y={16} w={150} h={18} fill={C.sage} />
      <circle cx={34} cy={25} r={5} fill="none" stroke={C.black} strokeWidth={2} />
      <line x1={38} y1={29} x2={42} y2={33} stroke={C.black} strokeWidth={2} />
      <rect x={46} y={22} width={90} height={6} fill={C.black} opacity={0.2} />
      <BR x={180} y={16} w={58} h={18} fill={C.sage} />
      <BR x={246} y={16} w={58} h={18} fill={C.sage} />
      <BR x={412} y={16} w={46} h={18} fill={C.neon} />
      <rect x={420} y={21} width={30} height={8} fill={C.black} />

      {/* Header */}
      <rect x={14} y={46} width={452} height={20} fill={C.black} />
      <rect x={22} y={52} width={10} height={10} fill={C.white} opacity={0.3} />
      {[
        { x: 40, w: 60 }, { x: 130, w: 80 }, { x: 246, w: 60 },
        { x: 342, w: 52 }, { x: 430, w: 30 }
      ].map((col, i) => (
        <rect key={i} x={col.x} y={53} width={col.w} height={6} fill={C.white} opacity={0.5} />
      ))}

      {/* Zeilen */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <BR x={14} y={70+i*24} w={452} h={22}
            fill={i===0 ? C.sageDark : C.white}
            sc={i===0 ? C.black : C.sage}
          />
          <rect x={22} y={75+i*24} width={12} height={12}
            fill={i===0 ? C.neon : C.white} stroke={C.black} strokeWidth={2} />
          {i===0 && (
            <path d={`M24 ${81+i*24} L27 ${84+i*24} L33 ${78+i*24}`}
              stroke={C.black} strokeWidth={2} strokeLinecap="round" />
          )}
          <rect x={42+C.shadow} y={73+i*24+C.shadow} width={16} height={16} fill={C.black} />
          <rect x={42} y={73+i*24} width={16} height={16}
            fill={statusFills[i]} stroke={C.black} strokeWidth={1.5} />
          <rect x={64} y={76+i*24} width={56} height={7} fill={C.black} opacity={0.5} />
          <rect x={130} y={76+i*24} width={90} height={7} fill={C.black} opacity={0.25} />
          <rect x={246+C.shadow} y={74+i*24+C.shadow} width={48} height={14} fill={C.black} />
          <rect x={246} y={74+i*24} width={48} height={14}
            fill={statusFills[i]} stroke={C.black} strokeWidth={1.5} />
          <rect x={252} y={78+i*24} width={36} height={6} fill={C.black} opacity={0.45} />
          <rect x={342} y={76+i*24} width={60} height={7} fill={C.black} opacity={0.2} />
          {[0,1,2].map(d => (
            <rect key={d} x={432+d*10} y={77+i*24} width={6} height={6}
              fill={C.black} opacity={0.25} />
          ))}
        </g>
      ))}
    </BG>
  );
}

/* ─────────────────────────────────────────────────────────────────
   10 · Terminal & CLI  — Hintergrund: Dark (#1A1A2E)
───────────────────────────────────────────────────────────────── */
function IllustrationTerminal() {
  return (
    <BG bg={C.dark} dark>
      {/* Terminal-Fenster */}
      <BR x={14} y={10} w={278} h={180} fill="#0D0D1A" sc="rgba(255,255,255,0.15)" />
      <rect x={14} y={10} width={278} height={32} fill="#0D0D1A" stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
      <circle cx={32} cy={26} r={6} fill="#FF5F57" />
      <circle cx={52} cy={26} r={6} fill="#FEBC2E" />
      <circle cx={72} cy={26} r={6} fill="#28C840" />
      <rect x={120} y={22} width={90} height={8} fill={C.white} opacity={0.1} />

      {/* Terminal-Zeilen */}
      {[
        { y: 50,  isCmd: true,  fill: C.neon,    w: 140 },
        { y: 64,  isCmd: false, fill: "#6EDFA0",  w: 110 },
        { y: 78,  isCmd: false, fill: "#6EDFA0",  w: 160 },
        { y: 92,  isCmd: true,  fill: C.neon,    w: 120 },
        { y: 106, isCmd: false, fill: "#5ECECE",  w: 180 },
        { y: 120, isCmd: false, fill: "#5ECECE",  w: 150 },
        { y: 134, isCmd: false, fill: "#6EDFA0",  w: 130 },
        { y: 148, isCmd: false, fill: "#F5829A",  w: 96  },
        { y: 162, isCmd: true,  fill: C.neon,    w: 0, cursor: true },
      ].map((line, i) => (
        <g key={i}>
          {line.isCmd && (
            <rect x={22} y={line.y} width={14} height={12} fill={C.neon} />
          )}
          {line.w > 0 && (
            <rect
              x={line.isCmd ? 40 : 22}
              y={line.y}
              width={line.w}
              height={10}
              fill={line.fill}
              opacity={0.8}
            />
          )}
          {(line as any).cursor && (
            <rect x={40} y={line.y} width={10} height={14} fill={C.neon} />
          )}
        </g>
      ))}

      {/* Pipeline-Panel */}
      <BR x={306} y={10} w={160} h={180} fill="#0D0D1A" sc="rgba(255,255,255,0.15)" />
      <rect x={306} y={10} width={160} height={32}
        fill={C.lavenderDark} stroke={C.black} strokeWidth={2} />
      <rect x={316} y={20} width={100} height={12} fill={C.black} />

      {/* Pipeline-Schritte */}
      {[
        { y: 52,  done: true,  running: false, fill: "#6EDFA0" },
        { y: 76,  done: true,  running: false, fill: "#6EDFA0" },
        { y: 100, done: true,  running: false, fill: "#6EDFA0" },
        { y: 124, done: false, running: true,  fill: C.neon },
        { y: 148, done: false, running: false, fill: "rgba(255,255,255,0.1)" },
        { y: 172, done: false, running: false, fill: "rgba(255,255,255,0.1)" },
      ].map((step, i) => (
        <g key={i}>
          <rect x={316+C.shadow} y={step.y+C.shadow} width={16} height={16} fill={C.black} />
          <rect x={316} y={step.y} width={16} height={16}
            fill={step.done ? step.fill : step.running ? step.fill : "rgba(255,255,255,0.08)"}
            stroke={step.done || step.running ? C.black : "rgba(255,255,255,0.2)"} strokeWidth={2}
          />
          {step.done && (
            <path d={`M${318} ${step.y+8} L${321} ${step.y+11} L${330} ${step.y+5}`}
              stroke={C.black} strokeWidth={2} strokeLinecap="round" />
          )}
          {step.running && (
            <rect x={320} y={step.y+4} width={8} height={8} fill={C.black} />
          )}
          <rect x={340} y={step.y+4} width={118} height={8}
            fill={step.done || step.running ? C.white : C.white}
            opacity={step.done ? 0.5 : step.running ? 0.9 : 0.15}
          />
          {i < 5 && (
            <line x1={324} y1={step.y+16} x2={324} y2={step.y+24}
              stroke={C.white}
              strokeWidth={step.done ? 2 : 1}
              strokeDasharray={!step.done ? "4 3" : "0"}
              opacity={step.done ? 0.4 : 0.15}
            />
          )}
        </g>
      ))}
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
