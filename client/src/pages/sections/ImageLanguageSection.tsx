/**
 * ImageLanguageSection – Volt UI · Konzept & Marke
 *
 * Design: Volt UI – space-y-16, rounded-2xl border border-border bg-card
 * 5 thematische Kategorien, je 9 Bilder, Lightbox-Gallery mit Keyboard-Navigation
 * Bilder: Unsplash (lizenzfrei)
 */

import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════
   TYPEN
══════════════════════════════════════════════ */

type Aspect = "landscape" | "portrait" | "square";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  photographer: string;
  label: string;
  aspect: Aspect;
}

interface Category {
  id: string;
  label: string;
  desc: string;
  accent: string;
  accentText: string;
  images: GalleryImage[];
}

/* ══════════════════════════════════════════════
   BILD-DATEN
══════════════════════════════════════════════ */

const CATEGORIES: Category[] = [
  {
    id: "brutalismus",
    label: "Brutalismus",
    desc: "Rohheit als Ehrlichkeit. Beton, Masse, Schatten. Keine Verkleidung – nur das, was trägt.",
    accent: "#2A2A2A",
    accentText: "#F5F5F5",
    images: [
      { id: "b1", url: "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=1200&q=85&fit=crop&crop=center", alt: "Brutalistische Betonarchitektur – rohe Geometrie", photographer: "Nathan Duck", label: "Masse", aspect: "landscape" },
      { id: "b2", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop&crop=center", alt: "Brutalistisches Gebäude – Licht und Schatten", photographer: "Joel Filipe", label: "Struktur", aspect: "portrait" },
      { id: "b3", url: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=85&fit=crop&crop=center", alt: "Betonstruktur – Licht auf Rohbeton", photographer: "Scott Webb", label: "Rohheit", aspect: "square" },
      { id: "b4", url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85&fit=crop&crop=center", alt: "Monumentale Betonkonstruktion von unten", photographer: "Simone Hutsch", label: "Monument", aspect: "portrait" },
      { id: "b5", url: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=85&fit=crop&crop=center", alt: "Industrielle Stahlkonstruktion – Geometrie", photographer: "Ant Rozetsky", label: "Stahl", aspect: "landscape" },
      { id: "b6", url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85&fit=crop&crop=center", alt: "Betonwand mit hartem Schattenwurf", photographer: "Simone Hutsch", label: "Schatten", aspect: "square" },
      { id: "b7", url: "https://images.unsplash.com/photo-1470723710355-95304d8aece4?w=1200&q=85&fit=crop&crop=center", alt: "Treppenkonstruktion aus Beton – Wiederholung", photographer: "Jace & Afsoon", label: "Rhythmus", aspect: "portrait" },
      { id: "b8", url: "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?w=1200&q=85&fit=crop&crop=center", alt: "Rasterförmige Betonfassade – Muster", photographer: "Tobias Fischer", label: "Raster", aspect: "landscape" },
      { id: "b9", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&fit=crop&crop=center", alt: "Diagonale Licht- und Schattenstreifen auf Beton", photographer: "Pawel Czerwinski", label: "Kontrast", aspect: "square" },
    ],
  },
  {
    id: "futurismus",
    label: "Futurismus",
    desc: "Energie in Form. Licht als Struktur. Bewegung als Versprechen einer anderen Zeit.",
    accent: "#E4FF97",
    accentText: "#1A1A1A",
    images: [
      { id: "f1", url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&q=85&fit=crop&crop=center", alt: "Futuristische Lichtstreifen – abstrakte Geometrie", photographer: "Pawel Czerwinski", label: "Licht", aspect: "landscape" },
      { id: "f2", url: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=1200&q=85&fit=crop&crop=center", alt: "Neon-Lichtbogen – futuristische Energie", photographer: "Ramon Salinero", label: "Energie", aspect: "portrait" },
      { id: "f3", url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?w=1200&q=85&fit=crop&crop=center", alt: "Abstrakte digitale Wellen – futuristische Bewegung", photographer: "Maxim Berg", label: "Bewegung", aspect: "square" },
      { id: "f4", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85&fit=crop&crop=center", alt: "Leiterplatte – technische Strukturen", photographer: "Alexandre Debiève", label: "Technik", aspect: "landscape" },
      { id: "f5", url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=85&fit=crop&crop=center", alt: "Neon-Lichter in der Nacht – urbane Energie", photographer: "Lorenzo Herrera", label: "Neon", aspect: "portrait" },
      { id: "f6", url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=85&fit=crop&crop=center", alt: "Abstrakte Lichtspuren – Langzeitbelichtung", photographer: "Efe Kurnaz", label: "Spur", aspect: "landscape" },
      { id: "f7", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fit=crop&crop=center", alt: "Futuristische Berglandschaft – Nebel und Licht", photographer: "Samuel Ferrara", label: "Horizont", aspect: "landscape" },
      { id: "f8", url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=85&fit=crop&crop=center", alt: "Sternenhimmel – Langzeitbelichtung Milchstraße", photographer: "Vincentiu Solomon", label: "Unendlich", aspect: "landscape" },
      { id: "f9", url: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=85&fit=crop&crop=center", alt: "Abstrakte Partikel – digitale Energie", photographer: "Fabio", label: "Partikel", aspect: "square" },
    ],
  },
  {
    id: "textur",
    label: "Natur & Textur",
    desc: "Oberflächen, die eine Geschichte erzählen. Körnung, Risse, Muster – das Unvollkommene als Qualität.",
    accent: "#C8B89A",
    accentText: "#1A1A1A",
    images: [
      { id: "t1", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&fit=crop&crop=center", alt: "Nahaufnahme Baumrinde – organische Textur", photographer: "Scott Webb", label: "Rinde", aspect: "square" },
      { id: "t2", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85&fit=crop&crop=center", alt: "Sandstruktur – natürliche Muster", photographer: "Tobias Keller", label: "Sand", aspect: "landscape" },
      { id: "t3", url: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=85&fit=crop&crop=center", alt: "Wasseroberfläche – Reflexionen und Wellen", photographer: "Linus Nylund", label: "Wasser", aspect: "landscape" },
      { id: "t4", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=85&fit=crop&crop=center", alt: "Nahaufnahme Stein – mineralische Struktur", photographer: "Joanna Kosinska", label: "Stein", aspect: "square" },
      { id: "t5", url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&q=85&fit=crop&crop=center", alt: "Blattstruktur – organische Geometrie", photographer: "Luca Bravo", label: "Blatt", aspect: "portrait" },
      { id: "t6", url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=85&fit=crop&crop=center", alt: "Verwitterte Holzoberfläche – Zeit als Textur", photographer: "Annie Spratt", label: "Verwitterung", aspect: "landscape" },
      { id: "t7", url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=85&fit=crop&crop=center", alt: "Nahaufnahme Moos – grüne Körnung", photographer: "Luca Bravo", label: "Moos", aspect: "square" },
      { id: "t8", url: "https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?w=1200&q=85&fit=crop&crop=center", alt: "Betonoberfläche mit Rissen – urbane Textur", photographer: "Pawel Czerwinski", label: "Riss", aspect: "portrait" },
      { id: "t9", url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=85&fit=crop&crop=center", alt: "Nahaufnahme Metall – industrielle Oberfläche", photographer: "Markus Spiske", label: "Metall", aspect: "landscape" },
    ],
  },
  {
    id: "raum",
    label: "Typografie & Raum",
    desc: "Stille als Gestaltungsmittel. Leere, die spricht. Schrift, die atmet.",
    accent: "#E8E8E8",
    accentText: "#1A1A1A",
    images: [
      { id: "r1", url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=85&fit=crop&crop=center", alt: "Minimalistischer weißer Raum – Stille", photographer: "Ales Nesetril", label: "Stille", aspect: "landscape" },
      { id: "r2", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85&fit=crop&crop=center", alt: "Leerer Korridor – Perspektive und Raum", photographer: "Tobias Keller", label: "Perspektive", aspect: "portrait" },
      { id: "r3", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop&crop=center", alt: "Schrift auf Betonwand – urbane Typografie", photographer: "Joel Filipe", label: "Schrift", aspect: "square" },
      { id: "r4", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=85&fit=crop&crop=center", alt: "Code auf schwarzem Bildschirm – Typografie", photographer: "Markus Spiske", label: "Code", aspect: "landscape" },
      { id: "r5", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&fit=crop&crop=center", alt: "Minimalistisches Büro – Weißraum", photographer: "Alex Kotliarskyi", label: "Weißraum", aspect: "landscape" },
      { id: "r6", url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=85&fit=crop&crop=center", alt: "Leerer Raum mit Lichteinfall – Atmosphäre", photographer: "Beazy", label: "Licht", aspect: "portrait" },
      { id: "r7", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85&fit=crop&crop=center", alt: "Abstrakte Linien – geometrische Reduktion", photographer: "Tobias Keller", label: "Linie", aspect: "square" },
      { id: "r8", url: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&q=85&fit=crop&crop=center", alt: "Offenes Buch – Typografie und Leere", photographer: "Thought Catalog", label: "Seite", aspect: "landscape" },
      { id: "r9", url: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&q=85&fit=crop&crop=center", alt: "Notizbuch auf weißem Tisch – Minimalismus", photographer: "Plush Design Studio", label: "Notiz", aspect: "square" },
    ],
  },
  {
    id: "urban",
    label: "Stadt & Architektur",
    desc: "Geometrie des Alltäglichen. Perspektiven, die man nicht sucht, aber findet.",
    accent: "#1A1A2E",
    accentText: "#E8E8E8",
    images: [
      { id: "u1", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop&crop=center", alt: "Hochhaus von unten – urbane Perspektive", photographer: "Joel Filipe", label: "Höhe", aspect: "portrait" },
      { id: "u2", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=85&fit=crop&crop=center", alt: "Stadtsilhouette bei Nacht – Lichter", photographer: "Pedro Lastra", label: "Skyline", aspect: "landscape" },
      { id: "u3", url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=85&fit=crop&crop=center", alt: "Urbane Straße – Perspektivlinien", photographer: "Luca Bravo", label: "Flucht", aspect: "landscape" },
      { id: "u4", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop&crop=center", alt: "Brücke – Stahl und Geometrie", photographer: "Joel Filipe", label: "Brücke", aspect: "landscape" },
      { id: "u5", url: "https://images.unsplash.com/photo-1470723710355-95304d8aece4?w=1200&q=85&fit=crop&crop=center", alt: "Wendeltreppe – Spiralgeometrie", photographer: "Jace & Afsoon", label: "Spirale", aspect: "portrait" },
      { id: "u6", url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=85&fit=crop&crop=center", alt: "Stadtstraße bei Regen – Reflexionen", photographer: "Denys Nevozhai", label: "Reflexion", aspect: "landscape" },
      { id: "u7", url: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1200&q=85&fit=crop&crop=center", alt: "Urbane Fassade – Fensterraster", photographer: "Gilles Lambert", label: "Fassade", aspect: "square" },
      { id: "u8", url: "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?w=1200&q=85&fit=crop&crop=center", alt: "Betongebäude – Rasterstruktur", photographer: "Tobias Fischer", label: "Raster", aspect: "landscape" },
      { id: "u9", url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=85&fit=crop&crop=center", alt: "Nachtaufnahme Stadt – Licht und Dunkel", photographer: "Luca Bravo", label: "Nacht", aspect: "landscape" },
    ],
  },
];

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
   LIGHTBOX
══════════════════════════════════════════════ */

interface LightboxProps {
  category: Category;
  startIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ category, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const images = category.images;
  const img = images[current];

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(0,0,0,0.95)" }}
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded"
            style={{ background: category.accent, color: category.accentText }}
          >
            {category.label}
          </span>
          <span className="font-mono text-[11px] text-white/40">
            {current + 1} / {images.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.1)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
        >
          <X size={16} className="text-white" />
        </button>
      </div>

      {/* Bild */}
      <div
        className="flex-1 flex items-center justify-center px-16 min-h-0"
        onClick={e => e.stopPropagation()}
      >
        <img
          key={img.id}
          src={img.url}
          alt={img.alt}
          className="max-h-full max-w-full object-contain rounded-xl"
          style={{
            filter: "grayscale(15%) contrast(1.05)",
            animation: "fadeIn 0.2s ease",
          }}
        />
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <div>
          <p className="font-display font-bold text-white text-sm">{img.label}</p>
          <p className="font-mono text-[10px] text-white/40 mt-0.5">{img.photographer} · Unsplash</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.1)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.1)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          >
            <ChevronRight size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Thumbnail-Strip */}
      <div
        className="flex gap-2 px-6 pb-5 overflow-x-auto shrink-0"
        onClick={e => e.stopPropagation()}
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((thumb, i) => (
          <button
            key={thumb.id}
            onClick={() => setCurrent(i)}
            className={cn(
              "shrink-0 w-14 h-10 rounded-lg overflow-hidden transition-all duration-150",
              i === current ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-70"
            )}
          >
            <img src={thumb.url} alt={thumb.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
};

/* ══════════════════════════════════════════════
   KATEGORIE-KARTE (Preview-Grid)
══════════════════════════════════════════════ */

const CategoryCard: React.FC<{
  category: Category;
  onOpen: (catId: string, imgIndex: number) => void;
}> = ({ category, onOpen }) => {
  const preview = category.images.slice(0, 4);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Kategorie-Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded"
            style={{ background: category.accent, color: category.accentText }}
          >
            {category.label}
          </span>
          <span className="font-mono text-[9px] text-muted-foreground/40">
            {category.images.length} Bilder
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{category.desc}</p>
      </div>

      {/* 2×2 Preview-Grid */}
      <div className="grid grid-cols-2 gap-0.5 px-5 pb-4">
        {preview.map((img, i) => (
          <div
            key={img.id}
            className="relative overflow-hidden rounded-lg cursor-pointer"
            style={{ paddingBottom: "66%" }}
            onMouseEnter={() => setHovered(img.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onOpen(category.id, i)}
          >
            <img
              src={img.url}
              alt={img.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
              style={{
                transform: hovered === img.id ? "scale(1.08)" : "scale(1.0)",
                filter: "grayscale(20%) contrast(1.05)",
              }}
            />
            {hovered === img.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <ZoomIn size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Öffnen-Button */}
      <div className="px-5 pb-5">
        <button
          onClick={() => onOpen(category.id, 0)}
          className="w-full py-2.5 rounded-xl border border-border font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-all duration-150 hover:border-foreground/40 hover:text-foreground hover:bg-foreground/5"
        >
          Alle {category.images.length} Bilder öffnen →
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   HAUPTKOMPONENTE
══════════════════════════════════════════════ */

export const ImageLanguageSection: React.FC = () => {
  const [lightbox, setLightbox] = useState<{ catId: string; imgIndex: number } | null>(null);

  const openLightbox = useCallback((catId: string, imgIndex: number) => {
    setLightbox({ catId, imgIndex });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const activeCat = lightbox
    ? CATEGORIES.find(c => c.id === lightbox.catId) ?? null
    : null;

  return (
    <div className="space-y-16">

      {/* ── HEADER ── */}
      <div>
        <p className="section-label mb-2">16 — Bildsprache</p>
        <h2 className="font-display font-bold text-3xl text-foreground tracking-tight mb-3">
          Visuelle Inspirations-Galerie
        </h2>
        <p className="text-muted-foreground font-ui text-base max-w-2xl leading-relaxed">
          Fünf thematische Kategorien definieren die visuelle Haltung von Volt UI.
          Jede Kategorie öffnet eine eigene Galerie zur Inspiration – atmosphärisch,
          zurückhaltend, ohne Stockfoto-Vokabular.
        </p>
      </div>

      {/* ── KATEGORIEN-GRID ── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Thematische Kategorien · {CATEGORIES.reduce((a, c) => a + c.images.length, 0)} Bilder gesamt
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CATEGORIES.map(cat => (
            <CategoryCard key={cat.id} category={cat} onOpen={openLightbox} />
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
                  <span className="font-mono text-[10px] text-muted-foreground/50 shrink-0 leading-[1.4rem] mt-px">{r.num}</span>
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

      {/* ── LIGHTBOX ── */}
      {activeCat && lightbox && (
        <Lightbox
          category={activeCat}
          startIndex={lightbox.imgIndex}
          onClose={closeLightbox}
        />
      )}

    </div>
  );
};

export default ImageLanguageSection;
