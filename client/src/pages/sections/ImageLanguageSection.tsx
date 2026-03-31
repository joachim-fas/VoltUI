/**
 * ImageLanguageSection – Volt UI · Konzept & Marke
 *
 * Konzept: Filmstill-Prinzip
 * Referenzen: Wim Wenders, Saul Leiter, Alec Soth
 * 4 Kapitel: Kontrast · Stille · Bewegung · Leere
 * Layout: Abwechselnd links/rechts, Bild dominiert
 * Kein Grid, kein Filter, keine Kategorien – nur Bild + Haltung
 */

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  statement: string;
  counter: string;
  imageUrl: string;
  imageAlt: string;
  photographer: string;
  photographerHandle: string;
  imageLeft: boolean;
}

const CHAPTERS: Chapter[] = [
  {
    id: "kontrast",
    number: "01",
    title: "Kontrast",
    subtitle: "Licht braucht Dunkel",
    statement: "Ein Element leuchtet, weil das andere zurücktritt.",
    counter: "Nicht: Alles gleichzeitig betonen.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85&fit=crop&crop=center",
    imageAlt: "Diagonale Licht- und Schattenstreifen auf einer Oberfläche",
    photographer: "Pawel Czerwinski",
    photographerHandle: "pawel_czerwinski",
    imageLeft: true,
  },
  {
    id: "stille",
    number: "02",
    title: "Stille",
    subtitle: "Raum als Aussage",
    statement: "Was fehlt, ist genauso wichtig wie was da ist.",
    counter: "Nicht: Leere mit Inhalt füllen.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85&fit=crop&crop=center",
    imageAlt: "Nebliger Bergsee im Morgengrauen",
    photographer: "Samuel Ferrara",
    photographerHandle: "samferrara",
    imageLeft: false,
  },
  {
    id: "bewegung",
    number: "03",
    title: "Bewegung",
    subtitle: "Zeit als Spur",
    statement: "Bewegung zeigt sich in dem, was sie hinterlässt.",
    counter: "Nicht: Aktion um der Aktion willen.",
    imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1400&q=85&fit=crop&crop=center",
    imageAlt: "Sternenhimmel – Langzeitbelichtung, Licht als Spur der Zeit",
    photographer: "Vincentiu Solomon",
    photographerHandle: "vincentiu_solomon",
    imageLeft: true,
  },
  {
    id: "leere",
    number: "04",
    title: "Leere",
    subtitle: "Nebel als Horizont",
    statement: "Wo die Form aufhört, beginnt die Vorstellung.",
    counter: "Nicht: Jede Fläche erklären.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85&fit=crop&crop=center",
    imageAlt: "Berglandschaft im Nebel – Horizont löst sich auf",
    photographer: "Kalen Emsley",
    photographerHandle: "kalenemsley",
    imageLeft: false,
  },
];

const ChapterBlock: React.FC<{ chapter: Chapter; index: number }> = ({ chapter, index }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col md:flex-row items-stretch",
        chapter.imageLeft ? "md:flex-row" : "md:flex-row-reverse",
        "transition-all duration-1000 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 60}ms`, minHeight: "520px" }}
    >
      {/* Bild */}
      <div className="relative overflow-hidden bg-black flex-shrink-0 w-full md:w-[60%]">
        <img
          src={chapter.imageUrl}
          alt={chapter.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{
            minHeight: "320px",
            transform: visible ? "scale(1.04)" : "scale(1.0)",
            transition: "transform 8s ease-out",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: chapter.imageLeft
              ? "linear-gradient(to right, transparent 60%, rgba(0,0,0,0.25) 100%)"
              : "linear-gradient(to left, transparent 60%, rgba(0,0,0,0.25) 100%)",
          }}
        />
        <div className="absolute top-7 left-7">
          <span className="font-mono text-[11px] tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.35)" }}>
            — {chapter.number}
          </span>
        </div>
        <div className="absolute bottom-5 right-5">
          <a
            href={"https://unsplash.com/@" + chapter.photographerHandle}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] tracking-wider"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            {chapter.photographer} · Unsplash
          </a>
        </div>
      </div>

      {/* Text */}
      <div
        className={cn(
          "flex flex-col justify-center bg-background flex-1",
          chapter.imageLeft ? "md:pl-16 md:pr-10 px-8 py-14" : "md:pr-16 md:pl-10 px-8 py-14"
        )}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-7">
          {chapter.subtitle}
        </p>
        <h3
          className="font-display font-black text-foreground leading-[0.9] mb-9"
          style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
        >
          {chapter.title}
        </h3>
        <p className="font-ui text-lg text-foreground leading-relaxed mb-8 max-w-[280px]">
          {chapter.statement}
        </p>
        <div className="w-10 h-px bg-border mb-7" />
        <p className="font-mono text-xs text-muted-foreground/50 italic">
          {chapter.counter}
        </p>
      </div>
    </div>
  );
};

const PRINCIPLES = [
  { num: "01", label: "Atmosphäre", text: "Bilder erzeugen eine Stimmung, bevor sie ein Objekt zeigen." },
  { num: "02", label: "Zurückhaltung", text: "Das Bild zeigt genau eine Sache. Der Rest ist Raum." },
  { num: "03", label: "Zeitlichkeit", text: "Gute Bilder haben eine Vergangenheit und eine Zukunft." },
  { num: "04", label: "Körnung", text: "Unvollkommenheit ist kein Fehler. Sie ist Charakter." },
];

export const ImageLanguageSection: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <div className="pb-16">
        <p className="section-label mb-3">07 — Bildsprache</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2
            className="font-display font-black text-foreground leading-[0.9]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}
          >
            Vier Qualitäten.<br />
            <span className="text-muted-foreground/35">Kein Rauschen.</span>
          </h2>
          <p className="font-ui text-sm text-muted-foreground leading-relaxed max-w-xs md:text-right">
            Volt UI-Bilder folgen keiner Kategorie. Sie folgen einer Haltung:
            atmosphärisch, zurückhaltend, mit einer einzigen Aussage.
          </p>
        </div>
        <div className="mt-14 h-px bg-border" />
      </div>

      {/* Kapitel */}
      <div className="divide-y divide-border border-t border-border">
        {CHAPTERS.map((chapter, i) => (
          <ChapterBlock key={chapter.id} chapter={chapter} index={i} />
        ))}
      </div>

      {/* Prinzipien */}
      <div className="mt-20 pt-14 border-t border-border">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-12">
          Visuelle Prinzipien
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {PRINCIPLES.map((p) => (
            <div key={p.num} className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] text-muted-foreground/35 tracking-widest">{p.num}</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <p className="font-display font-bold text-base text-foreground">{p.label}</p>
              <p className="font-ui text-xs text-muted-foreground leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-border/40 flex items-center justify-between gap-4">
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
