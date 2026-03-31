/**
 * ImageLanguageSection – Volt UI
 * Bildsprache: Visuelle Prinzipien, Moodboard und Anwendungsregeln
 * Design: Terminal-Ästhetik, Schwarz/Weiß-Basis, atmosphärische Fotos
 * Alle Bilder: Unsplash (lizenzfrei)
 */

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, Contrast, Layers, Grid3X3, ArrowRight, ExternalLink } from "lucide-react";

/* ══════════════════════════════════════════════
   DATEN
══════════════════════════════════════════════ */

interface UnsplashPhoto {
  id: string;
  url: string;
  thumb: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  category: string;
  tags: string[];
  principle: string;
}

const PHOTOS: UnsplashPhoto[] = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75&fit=crop",
    alt: "Elektronische Schaltkreise – Präzision und Struktur",
    photographer: "Alexandre Debiève",
    photographerUrl: "https://unsplash.com/@alexkixa",
    category: "Technologie",
    tags: ["Struktur", "Präzision", "System"],
    principle: "Jedes Element hat eine Funktion. Kein Rauschen.",
  },
  {
    id: "p2",
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=75&fit=crop",
    alt: "Code auf dunklem Monitor – Terminal-Ästhetik",
    photographer: "Ilya Pavlov",
    photographerUrl: "https://unsplash.com/@ilyapavlov",
    category: "Code",
    tags: ["Terminal", "Mono", "Dark"],
    principle: "Input hat Konsequenz. Zeile für Zeile.",
  },
  {
    id: "p3",
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=75&fit=crop",
    alt: "Arbeitsplatz mit Laptop – fokussiertes Arbeiten",
    photographer: "Glenn Carstens-Peters",
    photographerUrl: "https://unsplash.com/@glenncarstenspeters",
    category: "Arbeit",
    tags: ["Fokus", "Workflow", "Kontext"],
    principle: "Weniger Abstimmung. Mehr Ergebnis.",
  },
  {
    id: "p4",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=75&fit=crop",
    alt: "Serverraum – Infrastruktur und Skalierung",
    photographer: "Taylor Vick",
    photographerUrl: "https://unsplash.com/@tvick",
    category: "Infrastruktur",
    tags: ["Skalierung", "System", "Architektur"],
    principle: "Portabel. Skalierbar. Ohne Overhead.",
  },
  {
    id: "p5",
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=75&fit=crop",
    alt: "Team am Whiteboard – kollaboratives Denken",
    photographer: "Kaleidico",
    photographerUrl: "https://unsplash.com/@kaleidico",
    category: "Kollaboration",
    tags: ["Team", "Prozess", "Struktur"],
    principle: "Eingang → Ablauf → Ergebnis.",
  },
  {
    id: "p6",
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=75&fit=crop",
    alt: "Laptops auf Tisch – verteiltes Arbeiten",
    photographer: "Marvin Meyer",
    photographerUrl: "https://unsplash.com/@marvelous",
    category: "Remote",
    tags: ["Verteilt", "Async", "Fokus"],
    principle: "Klare Kommunikation. Kein Pingpong.",
  },
  {
    id: "p7",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75&fit=crop",
    alt: "Daten-Dashboard auf Monitor – Visualisierung",
    photographer: "Luke Chesser",
    photographerUrl: "https://unsplash.com/@lukechesser",
    category: "Daten",
    tags: ["Analytics", "Dashboard", "Klarheit"],
    principle: "Signale lesen. Entscheidungen treffen.",
  },
  {
    id: "p8",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75&fit=crop",
    alt: "Portrait – menschliche Dimension",
    photographer: "Jonas Kakaroto",
    photographerUrl: "https://unsplash.com/@jkakaroto",
    category: "Mensch",
    tags: ["Portrait", "Vertrauen", "Nähe"],
    principle: "Technologie im Dienst des Menschen.",
  },
  {
    id: "p9",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&fit=crop",
    thumb: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=75&fit=crop",
    alt: "Modernes Büro – Architektur und Raum",
    photographer: "Alex Kotliarskyi",
    photographerUrl: "https://unsplash.com/@frantic",
    category: "Raum",
    tags: ["Architektur", "Licht", "Struktur"],
    principle: "Form folgt Funktion. Immer.",
  },
];

const PRINCIPLES = [
  {
    icon: <Contrast size={18} />,
    title: "Kontrast vor Farbe",
    desc: "Schwarz und Weiß als Basis. Lime als einziger Akzent. Bilder verstärken den Kontrast, sie ersetzen ihn nicht.",
    color: "#E4FF97",
  },
  {
    icon: <Eye size={18} />,
    title: "Atmosphäre, nicht Dekoration",
    desc: "Bilder zeigen Kontext: Arbeit, Systeme, Menschen. Keine Stockfotos-Ästhetik. Keine gestellten Szenen.",
    color: "#D4E8FF",
  },
  {
    icon: <Layers size={18} />,
    title: "Dunkel über Hell",
    desc: "Bilder mit dunklem Charakter bevorzugen. Overlay-Gradienten schützen die Lesbarkeit des Textes.",
    color: "#C3F4D3",
  },
  {
    icon: <Grid3X3 size={18} />,
    title: "Asymmetrie als Prinzip",
    desc: "Bilder brechen das Raster auf. Sie stehen nie allein, sondern immer im Dialog mit Text oder Struktur.",
    color: "#FFF5BA",
  },
];

const USAGE_RULES = [
  { rule: "DO", text: "Echte Arbeitssituationen, Systeme, Infrastruktur, Menschen bei der Arbeit" },
  { rule: "DO", text: "Hohe Kontrastverhältnisse – dunkle Bilder mit hellem Text oder umgekehrt" },
  { rule: "DO", text: "Overlay-Gradienten (from-black/60) zum Schutz der Textlesbarkeit" },
  { rule: "DO", text: "Quellenangabe 'Photo: Unsplash' bei jedem eingebetteten Bild" },
  { rule: "DON'T", text: "Generische Stockfotos mit Lächeln und Handshakes" },
  { rule: "DON'T", text: "Bunte, farbenfrohe Bilder die mit der Lime-Akzentfarbe konkurrieren" },
  { rule: "DON'T", text: "Bilder ohne Kontext – jedes Bild muss eine Aussage transportieren" },
  { rule: "DON'T", text: "Bilder als Hintergrund ohne Overlay – Text muss immer lesbar bleiben" },
];

/* ══════════════════════════════════════════════
   HILFSFUNKTIONEN
══════════════════════════════════════════════ */

const UnsplashAttribution: React.FC<{
  photographer: string;
  photographerUrl: string;
  className?: string;
}> = ({ photographer, photographerUrl, className }) => (
  <a
    href={photographerUrl}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "inline-flex items-center gap-1 font-mono text-[9px] text-white/50 hover:text-white/80 transition-colors",
      className
    )}
  >
    Photo: {photographer} · Unsplash
    <ExternalLink size={8} />
  </a>
);

/* ══════════════════════════════════════════════
   HAUPT-KOMPONENTE
══════════════════════════════════════════════ */

export const ImageLanguageSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Alle");

  const categories = ["Alle", ...Array.from(new Set(PHOTOS.map(p => p.category)))];
  const filtered = activeCategory === "Alle" ? PHOTOS : PHOTOS.filter(p => p.category === activeCategory);
  const featured = PHOTOS.find(p => p.id === activePhoto) || PHOTOS[0];

  return (
    <div className="space-y-20">

      {/* ── HEADER ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Bildsprache</p>
          <h1 className="font-display font-bold text-4xl text-foreground mb-4 leading-tight">
            Atmosphäre.<br />Nicht Dekoration.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Volt UI nutzt Fotografie als visuellen Kontext – nicht als Schmuck. Jedes Bild
            transportiert eine Haltung: Präzision, Struktur, menschliche Arbeit.
            Alle Bilder stammen von{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-bold text-foreground underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Unsplash
            </a>{" "}
            und sind lizenzfrei.
          </p>
        </div>
        {/* Hero-Bild */}
        <div className="relative rounded-2xl overflow-hidden h-64 md:h-80">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&fit=crop"
            alt="Elektronische Schaltkreise – Präzision und Struktur"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <p className="font-mono text-[10px] text-white/80 uppercase tracking-widest">Volt UI · Bildsprache</p>
            <UnsplashAttribution photographer="Alexandre Debiève" photographerUrl="https://unsplash.com/@alexkixa" />
          </div>
        </div>
      </div>

      {/* ── BILDPRINZIPIEN ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-6">Visuelle Prinzipien</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRINCIPLES.map((p, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-border bg-card hover:border-foreground/30 transition-colors"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ background: p.color }}
              >
                <span className="text-foreground">{p.icon}</span>
              </div>
              <p className="font-display font-bold text-sm text-foreground mb-2">{p.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOODBOARD ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Moodboard · {filtered.length} Bilder</p>
          {/* Kategorie-Filter */}
          <div className="flex gap-1 flex-wrap justify-end">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-[10px] font-mono border transition-all",
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-ähnliches Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setActivePhoto(photo.id === activePhoto ? null : photo.id)}
              className={cn(
                "relative group rounded-xl overflow-hidden text-left transition-all",
                i % 5 === 0 ? "md:col-span-2 aspect-video" : "aspect-square",
                activePhoto === photo.id ? "ring-2 ring-foreground ring-offset-2" : ""
              )}
            >
              <img
                src={photo.thumb}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-mono text-[9px] text-white/70 uppercase tracking-wider mb-0.5">{photo.category}</p>
                <p className="font-display font-bold text-xs text-white leading-tight">{photo.principle}</p>
              </div>
              {/* Kategorie-Badge */}
              <div className="absolute top-2 left-2">
                <span className="px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-sm font-mono text-[9px] text-white/70 uppercase tracking-wider">
                  {photo.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── DETAIL-ANSICHT ── */}
      {activePhoto && (
        <div className="rounded-3xl overflow-hidden border border-border bg-card">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Bild */}
            <div className="relative h-72 md:h-auto">
              <img
                src={featured.url}
                alt={featured.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="flex gap-1 flex-wrap">
                  {featured.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm font-mono text-[9px] text-white/80">
                      #{tag}
                    </span>
                  ))}
                </div>
                <UnsplashAttribution photographer={featured.photographer} photographerUrl={featured.photographerUrl} />
              </div>
            </div>
            {/* Info */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{featured.category}</p>
                <h3 className="font-display font-bold text-2xl text-foreground mb-4 leading-tight">
                  {featured.alt}
                </h3>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border mb-6">
                  <ArrowRight size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                  <p className="font-mono text-sm text-foreground italic">"{featured.principle}"</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Fotograf</p>
                  <a
                    href={featured.photographerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {featured.photographer}
                    <ExternalLink size={12} />
                  </a>
                  <p className="text-xs text-muted-foreground">via Unsplash · Lizenzfrei</p>
                </div>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="mt-6 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                ← Schließen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ANWENDUNGSREGELN ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-6">Anwendungsregeln</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {USAGE_RULES.map((item, i) => (
            <div
              key={i}
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border",
                item.rule === "DO"
                  ? "border-[#1A9E5A]/30 bg-[#1A9E5A]/5"
                  : "border-[#E8402A]/30 bg-[#E8402A]/5"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 mt-0.5",
                  item.rule === "DO"
                    ? "bg-[#1A9E5A]/15 text-[#1A9E5A]"
                    : "bg-[#E8402A]/15 text-[#E8402A]"
                )}
              >
                {item.rule}
              </span>
              <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── UNSPLASH-HINWEIS ── */}
      <div className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card">
        <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center shrink-0">
          <span className="font-mono text-background font-bold text-sm">U</span>
        </div>
        <div className="flex-1">
          <p className="font-display font-bold text-sm text-foreground mb-0.5">Alle Bilder von Unsplash</p>
          <p className="text-xs text-muted-foreground">
            Lizenzfrei nutzbar unter der{" "}
            <a
              href="https://unsplash.com/license"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Unsplash-Lizenz
            </a>
            . Keine Registrierung erforderlich. Quellenangabe empfohlen.
          </p>
        </div>
        <a
          href="https://unsplash.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs font-mono text-foreground transition-colors flex items-center gap-1.5"
        >
          Unsplash öffnen
          <ExternalLink size={11} />
        </a>
      </div>

    </div>
  );
};

export default ImageLanguageSection;
