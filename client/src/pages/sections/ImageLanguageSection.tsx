/**
 * ImageLanguageSection – Volt UI · Konzept & Marke
 *
 * Konzept: Moodboard mit zwei Stilen – Brutalismus & Futurismus
 * Layout: Kompaktes asymmetrisches Grid + zwei Filmstill-Kapitel
 * Bilder: Unsplash – abstrakt, architektonisch, atmosphärisch
 */

import React, { useState } from "react";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════
   BILDKATALOG
   Zwei Stile: BRUTALISMUS · FUTURISMUS
   + ABSTRAKT als gemeinsame Basis
══════════════════════════════════════════════ */

interface MoodImage {
  id: string;
  url: string;
  alt: string;
  photographer: string;
  handle: string;
  style: "brutalismus" | "futurismus" | "abstrakt";
  label: string;
  span?: "wide" | "tall" | "normal";
}

const IMAGES: MoodImage[] = [
  // ── BRUTALISMUS ──
  {
    id: "b1",
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=85&fit=crop&crop=center",
    alt: "Brutalistische Betonarchitektur – rohe Geometrie",
    photographer: "Nathan Duck",
    handle: "nvte",
    style: "brutalismus",
    label: "Beton",
    span: "wide",
  },
  {
    id: "b2",
    url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=85&fit=crop&crop=center",
    alt: "Brutalistisches Gebäude – Masse und Schatten",
    photographer: "Joel Filipe",
    handle: "joelfilip",
    style: "brutalismus",
    label: "Masse",
    span: "tall",
  },
  {
    id: "b3",
    url: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=700&q=85&fit=crop&crop=center",
    alt: "Betonstruktur – Licht und Schatten auf Rohbeton",
    photographer: "Scott Webb",
    handle: "scottwebb",
    style: "brutalismus",
    label: "Struktur",
    span: "normal",
  },
  // ── FUTURISMUS ──
  {
    id: "f1",
    url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=900&q=85&fit=crop&crop=center",
    alt: "Futuristische Lichtstreifen – abstrakte Geometrie",
    photographer: "Pawel Czerwinski",
    handle: "pawel_czerwinski",
    style: "futurismus",
    label: "Licht",
    span: "wide",
  },
  {
    id: "f2",
    url: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=700&q=85&fit=crop&crop=center",
    alt: "Neon-Lichtbogen – futuristische Energie",
    photographer: "Ramón Salinero",
    handle: "donramxn",
    style: "futurismus",
    label: "Energie",
    span: "normal",
  },
  {
    id: "f3",
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?w=700&q=85&fit=crop&crop=center",
    alt: "Abstrakte digitale Wellen – futuristische Bewegung",
    photographer: "Maxim Berg",
    handle: "maxberg",
    style: "futurismus",
    label: "Bewegung",
    span: "tall",
  },
  // ── ABSTRAKT ──
  {
    id: "a1",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85&fit=crop&crop=center",
    alt: "Diagonale Licht- und Schattenstreifen",
    photographer: "Pawel Czerwinski",
    handle: "pawel_czerwinski",
    style: "abstrakt",
    label: "Kontrast",
    span: "normal",
  },
  {
    id: "a2",
    url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=700&q=85&fit=crop&crop=center",
    alt: "Abstrakte Technologie – futuristische Oberfläche",
    photographer: "Ales Nesetril",
    handle: "alesnesetril",
    style: "abstrakt",
    label: "System",
    span: "normal",
  },
  {
    id: "a3",
    url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=900&q=85&fit=crop&crop=center",
    alt: "Sternenhimmel – Langzeitbelichtung",
    photographer: "Vincentiu Solomon",
    handle: "vincentiu_solomon",
    style: "abstrakt",
    label: "Leere",
    span: "wide",
  },
];

const STYLE_LABELS = {
  brutalismus: { label: "Brutalismus", desc: "Rohe Materie. Keine Entschuldigung." },
  futurismus:  { label: "Futurismus",  desc: "Energie in Bewegung. Form als Versprechen." },
  abstrakt:    { label: "Abstrakt",    desc: "Bedeutung vor Motiv." },
};

/* ══════════════════════════════════════════════
   PRINZIPIEN
══════════════════════════════════════════════ */

const PRINCIPLES = [
  { num: "01", label: "Atmosphäre",     text: "Bilder erzeugen eine Stimmung, bevor sie ein Objekt zeigen." },
  { num: "02", label: "Zurückhaltung",  text: "Das Bild zeigt genau eine Sache. Der Rest ist Raum." },
  { num: "03", label: "Zeitlichkeit",   text: "Gute Bilder haben eine Vergangenheit und eine Zukunft." },
  { num: "04", label: "Körnung",        text: "Unvollkommenheit ist kein Fehler. Sie ist Charakter." },
];

/* ══════════════════════════════════════════════
   HAUPTKOMPONENTE
══════════════════════════════════════════════ */

export const ImageLanguageSection: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState<"alle" | "brutalismus" | "futurismus" | "abstrakt">("alle");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = activeStyle === "alle" ? IMAGES : IMAGES.filter(img => img.style === activeStyle);

  return (
    <div className="space-y-16">

      {/* ── HEADER ── */}
      <div>
        <p className="section-label mb-3">07 — Bildsprache</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2
            className="font-display font-black text-foreground leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Zwei Stile.<br />
            <span className="text-muted-foreground/35">Eine Haltung.</span>
          </h2>
          <p className="font-ui text-sm text-muted-foreground leading-relaxed max-w-xs md:text-right">
            Volt UI-Bilder folgen keiner Kategorie. Brutalismus und Futurismus
            als zwei Pole – roh und präzise, massiv und leicht.
          </p>
        </div>
      </div>

      {/* ── STIL-FILTER ── */}
      <div className="flex items-center gap-2 flex-wrap border-b border-border pb-6">
        {(["alle", "brutalismus", "futurismus", "abstrakt"] as const).map(s => (
          <button
            key={s}
            onClick={() => setActiveStyle(s)}
            className={cn(
              "px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] border transition-all duration-200",
              activeStyle === s
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
            )}
          >
            {s === "alle" ? "Alle" : STYLE_LABELS[s].label}
          </button>
        ))}
        {activeStyle !== "alle" && (
          <p className="ml-4 font-mono text-xs text-muted-foreground/60 italic">
            {STYLE_LABELS[activeStyle].desc}
          </p>
        )}
      </div>

      {/* ── MOODBOARD-GRID ── */}
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "120px",
        }}
      >
        {filtered.map((img, i) => {
          // Spalten- und Zeilenbelegung je nach span
          const colSpan = img.span === "wide" ? 8 : img.span === "tall" ? 4 : 4;
          const rowSpan = img.span === "tall" ? 3 : img.span === "wide" ? 2 : 2;

          return (
            <div
              key={img.id}
              className="relative overflow-hidden group cursor-pointer"
              style={{
                gridColumn: `span ${colSpan}`,
                gridRow: `span ${rowSpan}`,
              }}
              onMouseEnter={() => setHoveredId(img.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700"
                style={{
                  transform: hoveredId === img.id ? "scale(1.06)" : "scale(1.0)",
                  filter: "grayscale(15%) contrast(1.05)",
                }}
              />

              {/* Stil-Badge */}
              <div className="absolute top-3 left-3">
                <span
                  className={cn(
                    "font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-0.5",
                    img.style === "brutalismus" && "bg-white/10 text-white/70",
                    img.style === "futurismus"  && "bg-black/40 text-white/70",
                    img.style === "abstrakt"    && "bg-black/30 text-white/60",
                  )}
                >
                  {img.style}
                </span>
              </div>

              {/* Hover-Overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)",
                  opacity: hoveredId === img.id ? 1 : 0,
                }}
              >
                <p className="font-display font-black text-white text-xl leading-none mb-1">
                  {img.label}
                </p>
                <a
                  href={"https://unsplash.com/@" + img.handle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[9px] text-white/50 hover:text-white/80 transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  {img.photographer} · Unsplash
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── ZWEI FILMSTILL-KAPITEL ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border divide-y md:divide-y-0 md:divide-x divide-border">

        {/* Brutalismus */}
        <div className="relative overflow-hidden group" style={{ minHeight: "380px" }}>
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=85&fit=crop&crop=center"
            alt="Brutalistische Architektur"
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-[5s] group-hover:scale-105"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">Stil 01</span>
            <h3 className="font-display font-black text-white leading-[0.9] mb-4" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}>
              Brutalismus
            </h3>
            <p className="font-ui text-sm text-white/70 leading-relaxed max-w-xs">
              Rohheit als Ehrlichkeit. Beton, Masse, Schatten.
              Keine Verkleidung – nur das, was trägt.
            </p>
          </div>
        </div>

        {/* Futurismus */}
        <div className="relative overflow-hidden group" style={{ minHeight: "380px" }}>
          <img
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=900&q=85&fit=crop&crop=center"
            alt="Futuristische Lichtgeometrie"
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-[5s] group-hover:scale-105"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">Stil 02</span>
            <h3 className="font-display font-black text-white leading-[0.9] mb-4" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}>
              Futurismus
            </h3>
            <p className="font-ui text-sm text-white/70 leading-relaxed max-w-xs">
              Energie in Form. Licht als Struktur.
              Bewegung als Versprechen einer anderen Zeit.
            </p>
          </div>
        </div>

      </div>

      {/* ── PRINZIPIEN ── */}
      <div className="pt-6 border-t border-border">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-10">
          Visuelle Prinzipien
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {PRINCIPLES.map((p) => (
            <div key={p.num} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] text-muted-foreground/35">{p.num}</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <p className="font-display font-bold text-sm text-foreground">{p.label}</p>
              <p className="font-ui text-xs text-muted-foreground leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="pt-6 border-t border-border/40 flex items-center justify-between gap-4">
        <p className="font-mono text-[9px] text-muted-foreground/35 tracking-wider uppercase">
          Alle Bilder: Unsplash · Lizenzfrei
        </p>
        <a
          href="https://unsplash.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] text-muted-foreground/35 hover:text-muted-foreground transition-colors tracking-wider uppercase"
        >
          unsplash.com →
        </a>
      </div>

    </div>
  );
};

export default ImageLanguageSection;
