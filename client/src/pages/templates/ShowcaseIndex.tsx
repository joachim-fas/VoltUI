/**
 * Volt UI – Template Showcase Index
 * Route: /showcase
 *
 * Gestaltungskonzept der Illustrationen:
 * – Brutalism Style: harte schwarze Outlines (stroke 2-3px), KEINE rx/ry Rundungen
 * – Pastell-Farbblöcke als Flächen: Rose, Mint, Butter, Blue, Orchid, Peach, Aqua
 * – Offset-Schatten: +4px translate in X und Y, schwarz
 * – Rohe Geometrie: Rechtecke, Linien, Dreiecke, Kreise mit starken Konturen
 * – Hintergrund: helles Papier-Weiß (#FAFAFA) mit feinem Raster
 * – Neon-Gelb (#E4FF97) als einziger Volt-Akzent auf Buttons/CTAs
 */
import { Link } from "wouter";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { ArrowRight, Terminal, ArrowLeft, Layers } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Pastell-Palette + Brutalism-Konstanten
───────────────────────────────────────────────────────────────── */
const P = {
  // Pastell-Farben
  rose:    "#FFD6E0",
  peach:   "#FFECD2",
  mint:    "#C3F4D3",
  orchid:  "#FDE2FF",
  blue:    "#D4E8FF",
  butter:  "#FFF5BA",
  aqua:    "#D6F5F5",
  neon:    "#E4FF97",
  // Brutalism-Basis
  black:   "#0A0A0A",
  white:   "#FAFAFA",
  paper:   "#F5F0E8",
  grid:    "#E8E4DC",
  // Schatten-Offset
  shadow:  4,
};

/* Offset-Schatten-Rechteck (Brutalism-Signatur) */
function Shadow({ x, y, w, h, color = P.black }: {
  x: number; y: number; w: number; h: number; color?: string;
}) {
  return <rect x={x + P.shadow} y={y + P.shadow} width={w} height={h} fill={color} />;
}

/* Brutalism-Wrapper: helles Papier-Hintergrund + Raster */
function BrutalWrapper({ children, viewBox = "0 0 480 200" }: {
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
      {/* Papier-Hintergrund */}
      <rect width="480" height="200" fill={P.paper} />
      {/* Raster */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={P.grid} strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="480" height="200" fill="url(#grid)" />
      {children}
    </svg>
  );
}

/* Brutalism-Rechteck mit Offset-Schatten */
function BrutalRect({ x, y, w, h, fill, shadowColor = P.black }: {
  x: number; y: number; w: number; h: number; fill: string; shadowColor?: string;
}) {
  return (
    <>
      <Shadow x={x} y={y} w={w} h={h} color={shadowColor} />
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={P.black} strokeWidth="2" />
    </>
  );
}

/* Brutalism-Kreis mit Offset-Schatten */
function BrutalCircle({ cx, cy, r, fill }: {
  cx: number; cy: number; r: number; fill: string;
}) {
  return (
    <>
      <circle cx={cx + P.shadow} cy={cy + P.shadow} r={r} fill={P.black} />
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={P.black} strokeWidth="2" />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   1 · SaaS Landing Page  (Mint + Butter + Neon)
───────────────────────────────────────────────────────────────── */
function IllustrationLanding() {
  return (
    <BrutalWrapper>
      {/* Navbar-Leiste */}
      <BrutalRect x={14} y={14} w={452} h={28} fill={P.black} />
      <rect x={22} y={20} width={16} height={16} fill={P.neon} />
      <rect x={44} y={23} width={40} height={10} fill={P.neon} opacity={0.6} />
      <rect x={390} y={20} width={68} height={16} fill={P.mint} stroke={P.black} strokeWidth="1.5" />
      <rect x={398} y={24} width={52} height={8} fill={P.black} />

      {/* Hero-Block */}
      <BrutalRect x={14} y={54} w={452} h={68} fill={P.butter} />
      {/* Headline-Streifen */}
      <rect x={24} y={64} width={300} height={18} fill={P.black} />
      <rect x={24} y={88} width={220} height={12} fill={P.black} opacity={0.3} />
      {/* CTA */}
      <BrutalRect x={24} y={106} w={100} h={26} fill={P.neon} />
      <rect x={32} y={113} width={84} height={12} fill={P.black} />
      <BrutalRect x={134} y={106} w={100} h={26} fill={P.white} />
      <rect x={142} y={113} width={84} height={12} fill={P.black} opacity={0.4} />

      {/* Feature-Karten */}
      {[
        { x: 14,  fill: P.mint },
        { x: 172, fill: P.orchid },
        { x: 330, fill: P.blue },
      ].map((k, i) => (
        <g key={i}>
          <BrutalRect x={k.x} y={134} w={144} h={52} fill={k.fill} />
          <rect x={k.x + 10} y={144} width={20} height={20} fill={P.black} />
          <rect x={k.x + 38} y={146} width={88} height={8} fill={P.black} opacity={0.5} />
          <rect x={k.x + 38} y={160} width={64} height={6} fill={P.black} opacity={0.25} />
        </g>
      ))}
    </BrutalWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   2 · Analytics Dashboard  (Blue Sidebar + Butter Chart + Mint Bars)
───────────────────────────────────────────────────────────────── */
function IllustrationDashboard() {
  return (
    <BrutalWrapper>
      {/* Sidebar */}
      <BrutalRect x={14} y={14} w={80} h={172} fill={P.blue} />
      <rect x={22} y={24} width={16} height={16} fill={P.black} />
      <rect x={42} y={26} width={44} height={12} fill={P.black} opacity={0.5} />
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={22} y={50+i*22} width={64} height={14}
          fill={i===0 ? P.black : "transparent"}
          stroke={i===0 ? "none" : P.black} strokeWidth="1.5"
        />
      ))}

      {/* KPI-Karten */}
      {[
        { x: 106, fill: P.butter },
        { x: 224, fill: P.mint },
        { x: 342, fill: P.rose },
      ].map((k, i) => (
        <g key={i}>
          <BrutalRect x={k.x} y={14} w={106} h={44} fill={k.fill} />
          <rect x={k.x+10} y={22} width={50} height={8} fill={P.black} opacity={0.4} />
          <rect x={k.x+10} y={36} width={70} height={14} fill={P.black} />
        </g>
      ))}

      {/* Chart-Fläche */}
      <BrutalRect x={106} y={70} w={242} h={116} fill={P.white} />
      {/* Raster-Linien */}
      {[0,1,2,3].map(i => (
        <line key={i} x1={106} y1={86+i*28} x2={348} y2={86+i*28}
          stroke={P.black} strokeWidth="0.8" opacity={0.2} />
      ))}
      {/* Neon-Kurve */}
      <polyline
        points="116,178 148,158 180,166 212,136 244,148 276,112 308,124 340,90"
        stroke={P.black} strokeWidth="3" fill="none" strokeLinejoin="round"
      />
      <polyline
        points="116,178 148,158 180,166 212,136 244,148 276,112 308,124 340,90"
        stroke={P.neon} strokeWidth="2" fill="none" strokeLinejoin="round"
      />
      {/* Datenpunkte */}
      {[[116,178],[212,136],[276,112],[340,90]].map(([cx,cy],i) => (
        <BrutalCircle key={i} cx={cx} cy={cy} r={5} fill={P.neon} />
      ))}

      {/* Balken-Chart */}
      <BrutalRect x={358} y={70} w={108} h={116} fill={P.white} />
      {[
        { h: 44, fill: P.butter },
        { h: 62, fill: P.mint },
        { h: 32, fill: P.blue },
        { h: 76, fill: P.orchid },
        { h: 50, fill: P.rose },
      ].map((b, i) => (
        <g key={i}>
          <rect x={366+i*4} y={186-b.h-i*2} width={14} height={b.h}
            fill={P.black} />
          <rect x={364+i*4} y={184-b.h-i*2} width={14} height={b.h}
            fill={b.fill} stroke={P.black} strokeWidth="1.5" />
        </g>
      ))}
    </BrutalWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   3 · Pricing Page  (Butter / Neon / Aqua)
───────────────────────────────────────────────────────────────── */
function IllustrationPricing() {
  return (
    <BrutalWrapper>
      {/* Toggle */}
      <BrutalRect x={170} y={10} w={140} h={22} fill={P.white} />
      <rect x={172} y={12} width={68} height={18} fill={P.black} />
      <rect x={178} y={15} width={56} height={12} fill={P.neon} />

      {/* Karte Free */}
      <BrutalRect x={14} y={42} w={138} h={148} fill={P.butter} />
      <rect x={24} y={52} width={60} height={8} fill={P.black} opacity={0.4} />
      <rect x={24} y={66} width={80} height={20} fill={P.black} />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={24} y={98+i*16} width={10} height={10} fill={P.black} />
          <rect x={40} y={100+i*16} width={88} height={6} fill={P.black} opacity={0.3} />
        </g>
      ))}
      <BrutalRect x={24} y={162} w={118} h={22} fill={P.white} />
      <rect x={34} y={168} width={98} height={10} fill={P.black} opacity={0.3} />

      {/* Karte Pro – hervorgehoben */}
      <BrutalRect x={171} y={28} w={138} h={162} fill={P.neon} shadowColor={P.black} />
      {/* "Beliebt"-Badge */}
      <rect x={207} y={14} width={66} height={20} fill={P.black} />
      <rect x={211} y={18} width={58} height={12} fill={P.neon} />
      <rect x={181} y={40} width={60} height={8} fill={P.black} opacity={0.5} />
      <rect x={181} y={54} width={80} height={20} fill={P.black} />
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={181} y={86+i*16} width={10} height={10} fill={P.black} />
          {/* Haken */}
          <path d={`M${183} ${91+i*16} L${186} ${94+i*16} L${191} ${88+i*16}`}
            stroke={P.neon} strokeWidth="2" strokeLinecap="round" />
          <rect x={197} y={88+i*16} width={88} height={6} fill={P.black} opacity={0.4} />
        </g>
      ))}
      <BrutalRect x={181} y={164} w={118} h={22} fill={P.black} />
      <rect x={191} y={170} width={98} height={10} fill={P.neon} />

      {/* Karte Enterprise */}
      <BrutalRect x={328} y={42} w={138} h={148} fill={P.aqua} />
      <rect x={338} y={52} width={70} height={8} fill={P.black} opacity={0.4} />
      <rect x={338} y={66} width={80} height={20} fill={P.black} />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={338} y={98+i*16} width={10} height={10} fill={P.black} />
          <rect x={354} y={100+i*16} width={88} height={6} fill={P.black} opacity={0.3} />
        </g>
      ))}
      <BrutalRect x={338} y={162} w={118} h={22} fill={P.white} />
      <rect x={348} y={168} width={98} height={10} fill={P.black} opacity={0.3} />
    </BrutalWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   4 · Login & Auth  (Orchid + Mint Stärke-Balken)
───────────────────────────────────────────────────────────────── */
function IllustrationAuth() {
  return (
    <BrutalWrapper>
      {/* Auth-Karte */}
      <BrutalRect x={110} y={14} w={260} h={172} fill={P.white} />

      {/* Logo-Block */}
      <BrutalRect x={222} y={24} w={36} h={36} fill={P.orchid} />
      <rect x={228} y={30} width={24} height={24} fill={P.black} opacity={0.15} />
      <rect x={230} y={34} width={20} height={12} fill={P.black} />

      {/* Titel */}
      <rect x={130} y={70} width={220} height={14} fill={P.black} />
      <rect x={150} y={90} width={180} height={8} fill={P.black} opacity={0.25} />

      {/* Input E-Mail */}
      <BrutalRect x={126} y={106} w={228} h={24} fill={P.butter} />
      <rect x={136} y={113} width={80} height={10} fill={P.black} opacity={0.35} />

      {/* Input Passwort */}
      <BrutalRect x={126} y={138} w={228} h={24} fill={P.butter} />
      <rect x={136} y={145} width={60} height={10} fill={P.black} opacity={0.35} />
      {[0,1,2,3,4].map(i => (
        <circle key={i} cx={306+i*8} cy={150} r={3} fill={P.black} />
      ))}

      {/* Passwort-Stärke (Mint) */}
      <rect x={126} y={168} width={228} height={6} fill={P.black} opacity={0.1} stroke={P.black} strokeWidth="1.5" />
      <rect x={126} y={168} width={140} height={6} fill={P.mint} stroke={P.black} strokeWidth="1.5" />

      {/* CTA */}
      <BrutalRect x={126} y={180} w={228} h={0} fill={P.neon} />
    </BrutalWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   5 · Empty States  (Orchid Envelope + Neon Prompt)
───────────────────────────────────────────────────────────────── */
function IllustrationEmptyStates() {
  return (
    <BrutalWrapper>
      {/* Terminal-Fenster */}
      <BrutalRect x={40} y={14} w={400} h={172} fill={P.white} />

      {/* Titelleiste */}
      <rect x={40} y={14} width={400} height={32} fill={P.black} />
      <circle cx={60}  cy={30} r={6} fill="#FF5F57" />
      <circle cx={80}  cy={30} r={6} fill="#FEBC2E" />
      <circle cx={100} cy={30} r={6} fill="#28C840" />
      <rect x={180} y={24} width={100} height={12} fill={P.white} opacity={0.15} />

      {/* Gestrichelter Rahmen */}
      <rect x={120} y={58} width={240} height={110}
        fill="none" stroke={P.black} strokeWidth="2" strokeDasharray="10 6" />

      {/* Envelope-Illustration (Orchid) */}
      <BrutalRect x={168} y={80} w={144} h={72} fill={P.orchid} />
      {/* Klappe */}
      <path d="M168 80 L240 128 L312 80" fill={P.orchid} stroke={P.black} strokeWidth="2" strokeLinejoin="round" />
      <path d="M168 80 L240 128 L312 80" fill="none" stroke={P.black} strokeWidth="2" strokeLinejoin="round" />
      {/* Brief-Linien */}
      <rect x={188} y={100} width={104} height={8} fill={P.black} opacity={0.15} />
      <rect x={196} y={114} width={88} height={6} fill={P.black} opacity={0.1} />

      {/* Prompt */}
      <rect x={52} y={172} width={16} height={14} fill={P.neon} stroke={P.black} strokeWidth="1.5" />
      <rect x={72} y={174} width={80} height={10} fill={P.black} opacity={0.2} />
      <rect x={156} y={172} width={10} height={14} fill={P.black} />
    </BrutalWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   6 · Settings Page  (Blue Nav + Neon Toggles)
───────────────────────────────────────────────────────────────── */
function IllustrationSettings() {
  return (
    <BrutalWrapper>
      {/* Linke Nav */}
      <BrutalRect x={14} y={14} w={120} h={172} fill={P.blue} />
      <rect x={24} y={24} width={70} height={10} fill={P.black} />
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={18} y={46+i*24} width={112} height={18}
            fill={i===0 ? P.black : "transparent"}
            stroke={i===0 ? "none" : P.black} strokeWidth="1.5"
          />
          <rect x={24} y={50+i*24} width={10} height={10}
            fill={i===0 ? P.neon : P.black} opacity={i===0 ? 1 : 0.3} />
          <rect x={40} y={51+i*24} width={i===0 ? 72 : 60} height={8}
            fill={i===0 ? P.neon : P.black} opacity={i===0 ? 1 : 0.25} />
        </g>
      ))}

      {/* Rechter Bereich */}
      <BrutalRect x={148} y={14} w={318} h={172} fill={P.white} />

      {/* Profil-Zeile */}
      <BrutalCircle cx={182} cy={50} r={26} fill={P.peach} />
      <circle cx={182} cy={42} r={11} fill={P.black} opacity={0.2} />
      <ellipse cx={182} cy={68} rx={16} ry={8} fill={P.black} opacity={0.15} />
      <rect x={218} y={36} width={100} height={12} fill={P.black} />
      <rect x={218} y={54} width={72} height={8} fill={P.black} opacity={0.3} />
      <BrutalRect x={406} y={36} w={52} h={22} fill={P.butter} />
      <rect x={414} y={42} width={36} height={10} fill={P.black} opacity={0.4} />

      {/* Trennlinie */}
      <line x1={158} y1={86} x2={456} y2={86} stroke={P.black} strokeWidth="2" />

      {/* Toggle-Zeilen */}
      {[
        { on: true,  fill: P.neon },
        { on: false, fill: P.white },
        { on: true,  fill: P.mint },
        { on: false, fill: P.white },
      ].map((row, i) => (
        <g key={i}>
          <rect x={158} y={98+i*22} width={row.on ? 170 : 140} height={8}
            fill={P.black} opacity={0.25} />
          {/* Toggle */}
          <rect x={412+P.shadow} y={96+i*22+P.shadow} width={38} height={16} fill={P.black} />
          <rect x={412} y={96+i*22} width={38} height={16}
            fill={row.on ? row.fill : P.white} stroke={P.black} strokeWidth="2" />
          <rect
            x={row.on ? 434 : 416}
            y={100+i*22}
            width={12} height={8}
            fill={P.black}
          />
        </g>
      ))}
    </BrutalWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   7 · Onboarding Flow  (Mint Steps + Butter Card)
───────────────────────────────────────────────────────────────── */
function IllustrationOnboarding() {
  return (
    <BrutalWrapper>
      {/* Schritt-Indikatoren */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={44+i*88+P.shadow} y={10+P.shadow} width={28} height={28} fill={P.black} />
          <rect x={44+i*88} y={10} width={28} height={28}
            fill={i<2 ? P.mint : i===2 ? P.neon : P.white}
            stroke={P.black} strokeWidth="2"
          />
          {i<2 && (
            <path d={`M${50+i*88} ${24} L${55+i*88} ${29} L${65+i*88} ${19}`}
              stroke={P.black} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {i===2 && (
            <rect x={54+i*88} y={20} width={8} height={8} fill={P.black} />
          )}
          {i>=3 && (
            <rect x={54+i*88} y={20} width={8} height={8} fill={P.black} opacity={0.2} />
          )}
          {i<4 && (
            <line x1={72+i*88} y1={24} x2={132+i*88} y2={24}
              stroke={i<2 ? P.black : P.black}
              strokeWidth={i<2 ? 2.5 : 1.5}
              strokeDasharray={i>=2 ? "6 4" : "0"}
              opacity={i>=2 ? 0.3 : 1}
            />
          )}
        </g>
      ))}

      {/* Wizard-Karte */}
      <BrutalRect x={40} y={50} w={400} h={140} fill={P.butter} />

      {/* Workspace-Illustration */}
      <BrutalRect x={170} y={66} w={140} h={60} fill={P.white} />
      <rect x={180} y={76} width={120} height={10} fill={P.black} />
      <rect x={180} y={92} width={90} height={8} fill={P.black} opacity={0.25} />
      <rect x={180} y={106} width={110} height={8} fill={P.black} opacity={0.15} />

      {/* Input */}
      <BrutalRect x={56} y={136} w={368} h={24} fill={P.white} />
      <rect x={66} y={143} width={110} height={10} fill={P.black} opacity={0.25} />
      <rect x={180} y={140} width={8} height={14} fill={P.black} />

      {/* Weiter-Button */}
      <BrutalRect x={300} y={168} w={124} h={14} fill={P.neon} />
      <rect x={310} y={171} width={104} height={8} fill={P.black} />
    </BrutalWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   8 · Notification Center  (Rose Alert + Pastell-Avatare)
───────────────────────────────────────────────────────────────── */
function IllustrationNotifications() {
  const avatarFills = [P.rose, P.blue, P.mint, P.orchid, P.peach];
  return (
    <BrutalWrapper>
      {/* Kritischer Alert */}
      <BrutalRect x={14} y={10} w={452} h={28} fill={P.rose} shadowColor={P.black} />
      <rect x={22} y={16} width={16} height={16} fill={P.black} />
      <path d="M30 17 L30 25 M30 27 L30 28" stroke={P.rose} strokeWidth="2.5" strokeLinecap="round" />
      <rect x={44} y={18} width={160} height={8} fill={P.black} />
      <rect x={44} y={28} width={110} height={6} fill={P.black} opacity={0.3} />
      {/* X */}
      <line x1={450} y1={16} x2={460} y2={32} stroke={P.black} strokeWidth="2.5" />
      <line x1={460} y1={16} x2={450} y2={32} stroke={P.black} strokeWidth="2.5" />

      {/* Benachrichtigungs-Zeilen */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <BrutalRect x={14} y={46+i*28} w={452} h={24}
            fill={i<2 ? avatarFills[i] : P.white}
            shadowColor={i<2 ? P.black : P.grid}
          />
          {/* Ungelesen-Punkt */}
          {i<2 && <rect x={20} y={52+i*28} width={8} height={8} fill={P.black} />}
          {/* Avatar */}
          <rect x={36+P.shadow} y={50+i*28+P.shadow} width={18} height={18} fill={P.black} />
          <rect x={36} y={50+i*28} width={18} height={18}
            fill={avatarFills[i]} stroke={P.black} strokeWidth="2" />
          {/* Text */}
          <rect x={62} y={52+i*28} width={i<2 ? 200 : 160} height={8}
            fill={P.black} opacity={i<2 ? 0.7 : 0.3} />
          <rect x={62} y={64+i*28} width={i<2 ? 140 : 110} height={6}
            fill={P.black} opacity={0.2} />
          {/* Zeit */}
          <rect x={426} y={55+i*28} width={34} height={6} fill={P.black} opacity={0.2} />
        </g>
      ))}
    </BrutalWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   9 · Data Table View  (Butter Toolbar + Pastell-Status-Badges)
───────────────────────────────────────────────────────────────── */
function IllustrationDataTable() {
  const statusFills = [P.mint, P.peach, P.mint, P.rose, P.peach];
  return (
    <BrutalWrapper>
      {/* Toolbar */}
      <BrutalRect x={14} y={10} w={452} h={30} fill={P.butter} />
      {/* Suchfeld */}
      <BrutalRect x={22} y={16} w={150} h={18} fill={P.white} />
      <circle cx={34} cy={25} r={5} fill="none" stroke={P.black} strokeWidth="2" />
      <line x1={38} y1={29} x2={42} y2={33} stroke={P.black} strokeWidth="2" />
      <rect x={46} y={22} width={90} height={6} fill={P.black} opacity={0.2} />
      {/* Filter */}
      <BrutalRect x={180} y={16} w={60} h={18} fill={P.white} />
      <BrutalRect x={248} y={16} w={60} h={18} fill={P.white} />
      {/* Button */}
      <BrutalRect x={414} y={16} w={44} h={18} fill={P.neon} />
      <rect x={422} y={21} width={28} height={8} fill={P.black} />

      {/* Header */}
      <rect x={14} y={46} width={452} height={20} fill={P.black} />
      <rect x={22} y={52} width={10} height={10} fill={P.white} opacity={0.3} />
      {[
        { x: 40, w: 60 }, { x: 130, w: 80 }, { x: 246, w: 60 },
        { x: 342, w: 52 }, { x: 430, w: 30 }
      ].map((col, i) => (
        <rect key={i} x={col.x} y={53} width={col.w} height={6} fill={P.white} opacity={0.5} />
      ))}

      {/* Zeilen */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <BrutalRect x={14} y={70+i*24} w={452} h={22}
            fill={i===0 ? P.blue : P.white}
            shadowColor={P.grid}
          />
          {/* Checkbox */}
          <rect x={22} y={75+i*24} width={12} height={12}
            fill={i===0 ? P.neon : P.white} stroke={P.black} strokeWidth="2" />
          {i===0 && (
            <path d={`M24 ${81+i*24} L27 ${84+i*24} L33 ${78+i*24}`}
              stroke={P.black} strokeWidth="2" strokeLinecap="round" />
          )}
          {/* Avatar */}
          <rect x={42+P.shadow} y={73+i*24+P.shadow} width={16} height={16} fill={P.black} />
          <rect x={42} y={73+i*24} width={16} height={16}
            fill={statusFills[i]} stroke={P.black} strokeWidth="1.5" />
          {/* Name */}
          <rect x={64} y={76+i*24} width={56} height={7} fill={P.black} opacity={0.5} />
          {/* E-Mail */}
          <rect x={130} y={76+i*24} width={90} height={7} fill={P.black} opacity={0.25} />
          {/* Status-Badge */}
          <rect x={246+P.shadow} y={74+i*24+P.shadow} width={48} height={14} fill={P.black} />
          <rect x={246} y={74+i*24} width={48} height={14}
            fill={statusFills[i]} stroke={P.black} strokeWidth="1.5" />
          <rect x={252} y={78+i*24} width={36} height={6} fill={P.black} opacity={0.4} />
          {/* Datum */}
          <rect x={342} y={76+i*24} width={60} height={7} fill={P.black} opacity={0.2} />
          {/* Drei-Punkte */}
          {[0,1,2].map(d => (
            <rect key={d} x={432+d*10} y={77+i*24} width={6} height={6}
              fill={P.black} opacity={0.25} />
          ))}
        </g>
      ))}
    </BrutalWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────────
   10 · Terminal & CLI  (Mint Pipeline + Neon Commands)
───────────────────────────────────────────────────────────────── */
function IllustrationTerminal() {
  return (
    <BrutalWrapper>
      {/* Terminal-Fenster */}
      <BrutalRect x={14} y={10} w={280} h={180} fill={P.white} />
      {/* Titelleiste */}
      <rect x={14} y={10} width={280} height={32} fill={P.black} />
      <circle cx={32}  cy={26} r={6} fill="#FF5F57" />
      <circle cx={52}  cy={26} r={6} fill="#FEBC2E" />
      <circle cx={72}  cy={26} r={6} fill="#28C840" />
      <rect x={120} y={22} width={90} height={8} fill={P.white} opacity={0.15} />

      {/* Terminal-Zeilen */}
      {[
        { y: 50,  isCmd: true,  fill: P.neon,  w: 140 },
        { y: 64,  isCmd: false, fill: P.mint,  w: 110 },
        { y: 78,  isCmd: false, fill: P.mint,  w: 160 },
        { y: 92,  isCmd: true,  fill: P.neon,  w: 120 },
        { y: 106, isCmd: false, fill: P.aqua,  w: 180 },
        { y: 120, isCmd: false, fill: P.aqua,  w: 150 },
        { y: 134, isCmd: false, fill: P.mint,  w: 130 },
        { y: 148, isCmd: false, fill: P.rose,  w: 96  },
        { y: 162, isCmd: true,  fill: P.neon,  w: 0, cursor: true },
      ].map((line, i) => (
        <g key={i}>
          {line.isCmd && (
            <rect x={22} y={line.y} width={14} height={12} fill={P.neon} />
          )}
          {line.w > 0 && (
            <rect
              x={line.isCmd ? 40 : 22}
              y={line.y}
              width={line.w}
              height={10}
              fill={line.fill}
              opacity={0.75}
            />
          )}
          {(line as any).cursor && (
            <rect x={40} y={line.y} width={10} height={14} fill={P.black} />
          )}
        </g>
      ))}

      {/* Pipeline-Panel */}
      <BrutalRect x={308} y={10} w={158} h={180} fill={P.white} />
      <rect x={308} y={10} width={158} height={32} fill={P.orchid} stroke={P.black} strokeWidth="2" />
      <rect x={318} y={20} width={100} height={12} fill={P.black} />

      {/* Pipeline-Schritte */}
      {[
        { y: 52,  done: true,  running: false, fill: P.mint },
        { y: 76,  done: true,  running: false, fill: P.mint },
        { y: 100, done: true,  running: false, fill: P.mint },
        { y: 124, done: false, running: true,  fill: P.neon },
        { y: 148, done: false, running: false, fill: P.butter },
        { y: 172, done: false, running: false, fill: P.butter },
      ].map((step, i) => (
        <g key={i}>
          {/* Schritt-Box */}
          <rect x={316+P.shadow} y={step.y+P.shadow} width={16} height={16} fill={P.black} />
          <rect x={316} y={step.y} width={16} height={16}
            fill={step.done ? step.fill : step.running ? step.fill : P.white}
            stroke={P.black} strokeWidth="2"
          />
          {step.done && (
            <path d={`M${318} ${step.y+8} L${321} ${step.y+11} L${330} ${step.y+5}`}
              stroke={P.black} strokeWidth="2" strokeLinecap="round" />
          )}
          {step.running && (
            <rect x={320} y={step.y+4} width={8} height={8} fill={P.black} />
          )}
          {/* Label */}
          <rect x={340} y={step.y+4} width={118} height={8}
            fill={step.done ? P.black : step.running ? P.black : P.black}
            opacity={step.done ? 0.5 : step.running ? 0.9 : 0.2}
          />
          {/* Verbindungslinie */}
          {i < 5 && (
            <line x1={324} y1={step.y+16} x2={324} y2={step.y+24}
              stroke={step.done ? P.black : P.black}
              strokeWidth={step.done ? 2 : 1}
              strokeDasharray={!step.done ? "4 3" : "0"}
              opacity={step.done ? 0.6 : 0.25}
            />
          )}
        </g>
      ))}
    </BrutalWrapper>
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
                <div className="w-full overflow-hidden rounded-t-2xl" style={{ aspectRatio: "12/5" }}>
                  <t.Illustration />
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
