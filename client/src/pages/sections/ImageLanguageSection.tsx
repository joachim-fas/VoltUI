/**
 * ImageLanguageSection – Volt UI · Konzept & Marke
 *
 * Design: Volt UI – space-y-16, rounded-2xl border border-border bg-card,
 *         section-label, font-display font-bold text-3xl, font-mono labels
 * Zwei Stile: Brutalismus · Futurismus + Abstrakt als Basis
 * Bilder: Unsplash (alle URLs validiert 200 OK)
 */

import React, { useState } from "react";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════
   TYPEN & DATEN
══════════════════════════════════════════════ */

type Stil = "brutalismus" | "futurismus" | "abstrakt";

interface MoodImage {
  id: string;
  url: string;
  alt: string;
  photographer: string;
  handle: string;
  stil: Stil;
  label: string;
  aspect: "landscape" | "portrait" | "square";
}

const IMAGES: MoodImage[] = [
  // ── BRUTALISMUS ──
  {
    id: "b1",
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=85&fit=crop&crop=center",
    alt: "Brutalistische Betonarchitektur – rohe Geometrie",
    photographer: "Nathan Duck",
    handle: "nvte",
    stil: "brutalismus",
    label: "Masse",
    aspect: "landscape",
  },
  {
    id: "b2",
    url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=85&fit=crop&crop=center",
    alt: "Brutalistisches Gebäude – Licht und Schatten",
    photographer: "Joel Filipe",
    handle: "joelfilip",
    stil: "brutalismus",
    label: "Struktur",
    aspect: "portrait",
  },
  {
    id: "b3",
    url: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=700&q=85&fit=crop&crop=center",
    alt: "Betonstruktur – Licht auf Rohbeton",
    photographer: "Scott Webb",
    handle: "scottwebb",
    stil: "brutalismus",
    label: "Rohheit",
    aspect: "square",
  },
  // ── FUTURISMUS ──
  {
    id: "f1",
    url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=900&q=85&fit=crop&crop=center",
    alt: "Futuristische Lichtstreifen – abstrakte Geometrie",
    photographer: "Pawel Czerwinski",
    handle: "pawel_czerwinski",
    stil: "futurismus",
    label: "Licht",
    aspect: "landscape",
  },
  {
    id: "f2",
    url: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=700&q=85&fit=crop&crop=center",
    alt: "Neon-Lichtbogen – futuristische Energie",
    photographer: "Ramon Salinero",
    handle: "donramxn",
    stil: "futurismus",
    label: "Energie",
    aspect: "portrait",
  },
  {
    id: "f3",
    url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?w=700&q=85&fit=crop&crop=center",
    alt: "Abstrakte digitale Wellen – futuristische Bewegung",
    photographer: "Maxim Berg",
    handle: "maxberg",
    stil: "futurismus",
    label: "Bewegung",
    aspect: "square",
  },
  // ── ABSTRAKT ──
  {
    id: "a1",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85&fit=crop&crop=center",
    alt: "Diagonale Licht- und Schattenstreifen",
    photographer: "Pawel Czerwinski",
    handle: "pawel_czerwinski",
    stil: "abstrakt",
    label: "Kontrast",
    aspect: "landscape",
  },
  {
    id: "a2",
    url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=700&q=85&fit=crop&crop=center",
    alt: "Abstrakte Oberfläche – futuristische Textur",
    photographer: "Ales Nesetril",
    handle: "alesnesetril",
    stil: "abstrakt",
    label: "Textur",
    aspect: "square",
  },
  {
    id: "a3",
    url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=900&q=85&fit=crop&crop=center",
    alt: "Sternenhimmel – Langzeitbelichtung",
    photographer: "Vincentiu Solomon",
    handle: "vincentiu_solomon",
    stil: "abstrakt",
    label: "Leere",
    aspect: "landscape",
  },
];

const STIL_META: Record<Stil, { label: string; desc: string; accent: string }> = {
  brutalismus: {
    label: "Brutalismus",
    desc: "Rohheit als Ehrlichkeit. Beton, Masse, Schatten. Keine Verkleidung – nur das, was trägt.",
    accent: "#F5F5F5",
  },
  futurismus: {
    label: "Futurismus",
    desc: "Energie in Form. Licht als Struktur. Bewegung als Versprechen einer anderen Zeit.",
    accent: "#E4FF97",
  },
  abstrakt: {
    label: "Abstrakt",
    desc: "Bedeutung vor Motiv. Das Bild zeigt eine Qualität, kein Objekt.",
    accent: "#D4E8FF",
  },
};

const PRINZIPIEN = [
  { num: "01", label: "Atmosphäre",    text: "Bilder erzeugen eine Stimmung, bevor sie ein Objekt zeigen." },
  { num: "02", label: "Zurückhaltung", text: "Das Bild zeigt genau eine Sache. Der Rest ist Raum." },
  { num: "03", label: "Zeitlichkeit",  text: "Gute Bilder haben eine Vergangenheit und eine Zukunft." },
  { num: "04", label: "Körnung",       text: "Unvollkommenheit ist kein Fehler. Sie ist Charakter." },
];

const REGELN = [
  {
    num: "01",
    title: "Kein Stockfoto-Vokabular",
    desc: "Keine lächelnden Teams, keine Laptops auf Holztischen, keine Hände beim Handshake.",
    gut: "Atmosphärisch, abstrakt, zeitlos",
    schlecht: "Illustrativ, gestellt, generisch",
  },
  {
    num: "02",
    title: "Monochrom bevorzugt",
    desc: "Schwarz-Weiß oder stark entsättigte Bilder passen besser zum Volt-System als bunte Fotos.",
    gut: "Grayscale, Duotone, Low-Saturation",
    schlecht: "Vollbuntes Stockfoto ohne Kontext",
  },
  {
    num: "03",
    title: "Ein Motiv, eine Aussage",
    desc: "Jedes Bild trägt eine einzige visuelle Aussage. Kein Bild versucht mehrere Dinge gleichzeitig.",
    gut: "Lichtstrahl auf Beton",
    schlecht: "Collage mit 5 Elementen",
  },
];

/* ══════════════════════════════════════════════
   BILD-KARTE
══════════════════════════════════════════════ */

const ImageCard: React.FC<{ img: MoodImage }> = ({ img }) => {
  const [hovered, setHovered] = useState(false);
  const heights: Record<string, string> = {
    landscape: "h-44",
    portrait: "h-64",
    square: "h-52",
  };
  return (
    <div
      className="rounded-2xl overflow-hidden border border-border bg-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={cn("relative overflow-hidden", heights[img.aspect])}>
        <img
          src={img.url}
          alt={img.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1.0)",
            filter: "grayscale(20%) contrast(1.05)",
          }}
        />
        {/* Stil-Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: STIL_META[img.stil].accent,
              backdropFilter: "blur(4px)",
            }}
          >
            {STIL_META[img.stil].label}
          </span>
        </div>
        {/* Hover-Overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <p className="font-mono text-[9px] text-white/55">
            {img.photographer} · Unsplash
          </p>
        </div>
      </div>
      {/* Karten-Footer */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-border">
        <span className="font-display font-bold text-sm text-foreground">{img.label}</span>
        <span className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-widest">
          {img.stil}
        </span>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   HAUPTKOMPONENTE
══════════════════════════════════════════════ */

export const ImageLanguageSection: React.FC = () => {
  const [activeStil, setActiveStil] = useState<"alle" | Stil>("alle");

  const filtered = activeStil === "alle"
    ? IMAGES
    : IMAGES.filter(img => img.stil === activeStil);

  return (
    <div className="space-y-16">

      {/* ── HEADER ── */}
      <div>
        <p className="section-label mb-2">16 — Bildsprache</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">
          Brutalismus &amp; Futurismus
        </h2>
        <p className="text-muted-foreground font-ui text-base max-w-2xl leading-relaxed">
          Volt UI arbeitet mit zwei visuellen Polen: der rohen Materialität des Brutalismus
          und der abstrakten Energie des Futurismus. Beide Stile teilen eine Haltung –
          atmosphärisch, zurückhaltend, ohne Stockfoto-Vokabular.
        </p>
      </div>

      {/* ── STIL-ÜBERSICHT ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Visuelle Stile
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(STIL_META) as Stil[]).map(stil => (
            <div key={stil} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="h-1.5 w-full" style={{ background: STIL_META[stil].accent }} />
              <div className="p-5">
                <p className="font-display font-bold text-base text-foreground mb-2">
                  {STIL_META[stil].label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {STIL_META[stil].desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOODBOARD ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Moodboard
          </p>
          <div className="flex items-center gap-1.5">
            {(["alle", "brutalismus", "futurismus", "abstrakt"] as const).map(s => (
              <button
                key={s}
                onClick={() => setActiveStil(s)}
                className={cn(
                  "px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] border rounded transition-all duration-150",
                  activeStil === s
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                )}
              >
                {s === "alle" ? "Alle" : STIL_META[s as Stil].label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(img => (
            <ImageCard key={img.id} img={img} />
          ))}
        </div>
      </div>

      {/* ── ANWENDUNGSREGELN ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Anwendungsregeln
        </p>
        <div className="space-y-3">
          {REGELN.map(r => (
            <div key={r.num} className="border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 bg-card">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] text-muted-foreground/50 mt-0.5 shrink-0">{r.num}</span>
                  <div>
                    <p className="font-display font-bold text-sm text-foreground mb-1">{r.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 border-t border-border">
                <div className="px-4 py-3 bg-[#1A9E5A]/10 border-r border-border">
                  <p className="text-[9px] font-mono text-[#1A9E5A] uppercase tracking-widest mb-1">✓ Richtig</p>
                  <p className="text-[11px] text-foreground">{r.gut}</p>
                </div>
                <div className="px-4 py-3 bg-[#E8402A]/10">
                  <p className="text-[9px] font-mono text-[#E8402A] uppercase tracking-widest mb-1">✗ Falsch</p>
                  <p className="text-[11px] text-foreground">{r.schlecht}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── VISUELLE PRINZIPIEN ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Visuelle Prinzipien
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PRINZIPIEN.map(p => (
            <div key={p.num} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[9px] text-muted-foreground/40">{p.num}</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <p className="font-display font-bold text-sm text-foreground mb-2">{p.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-4">
        <p className="font-mono text-[9px] text-muted-foreground/40 tracking-wider uppercase">
          Alle Bilder: Unsplash · Lizenzfrei
        </p>
        <a
          href="https://unsplash.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] text-muted-foreground/40 hover:text-muted-foreground transition-colors tracking-wider uppercase"
        >
          unsplash.com →
        </a>
      </div>

    </div>
  );
};

export default ImageLanguageSection;
