/**
 * VoltRankedList – Kategorisierte Rangliste mit Echtzeit-Metriken
 * ─────────────────────────────────────────────────────────────────────────────
 * Design: Volt OS · Terminal-Ästhetik · Volt Design Tokens
 *
 * Features:
 *   Farbpunkte    → Kategorie-Zugehörigkeit
 *   Trend-Pfeile  → ▲ steigend (Grün) | ▼ fallend (Rot) | → neutral
 *   Werte         → Prozent oder absolute Zahl (JetBrains Mono)
 *   Fortschritt   → optionaler 2px Balken unter dem Eintrag
 *   Kategorien    → Gruppen-Header im Mono-Stil mit Anzahl
 *   Animation     → gestaffelter Fade-in beim Einblenden
 */

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ── Volt Kategorie-Farben (konsistent mit BubbleMap + Chart) ── */
const VOLT_CATEGORY_COLORS = [
  "#F4A0B5", // Rose
  "#7AB8F5", // Sky
  "#6DDBA0", // Mint
  "#F5C87A", // Amber
  "#D98AE8", // Orchid
  "#F0956A", // Peach
  "#5ECECE", // Aqua
  "#E8C840", // Yellow
  "#E4FF97", // Lime
  "#1A9E5A", // Green
];

/* ── Typen ── */
export interface RankedEntry {
  id: string;
  label: string;
  /** Numerischer Wert (0–100 für Prozent, oder absoluter Wert) */
  value: number;
  /** Vorheriger Wert für automatische Trend-Berechnung */
  previousValue?: number;
  /** Expliziter Trend (überschreibt automatische Berechnung) */
  trend?: "up" | "down" | "neutral";
  /** Kategorie-Zugehörigkeit */
  category: string;
  /** Überschreibt automatische Kategorie-Farbe */
  color?: string;
  /** Zusätzliche Metadaten für Tooltip */
  meta?: Record<string, string | number>;
}

export interface RankedCategory {
  id: string;
  label: string;
  entries: RankedEntry[];
}

export interface VoltRankedListProps {
  /** Kategorisierte Daten */
  categories?: RankedCategory[];
  /** Alternativ: flache Liste (wird als eine Kategorie behandelt) */
  entries?: RankedEntry[];
  /** Wertformat */
  valueFormat?: "percent" | "number" | ((v: number) => string);
  /** Maximale Höhe mit internem Scroll (px) */
  maxHeight?: number;
  /** Fortschrittsbalken anzeigen */
  showProgressBar?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
  onEntryClick?: (entry: RankedEntry) => void;
  /** Automatisch nach Wert absteigend sortieren */
  sortByValue?: boolean;
  /** Maximaler Wert für Fortschrittsbalken (default: 100) */
  maxValue?: number;
}

/* ── Trend-Indikator ── */
function TrendIcon({ trend }: { trend: "up" | "down" | "neutral" }) {
  if (trend === "up") {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
        <path d="M5 2L9 8H1L5 2Z" fill="#1A9E5A" />
      </svg>
    );
  }
  if (trend === "down") {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
        <path d="M5 8L1 2H9L5 8Z" fill="#E8402A" />
      </svg>
    );
  }
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
      <path d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Einzelner Eintrag ── */
function EntryRow({
  entry,
  color,
  valueFormat,
  showProgressBar,
  maxValue,
  onClick,
  animDelay,
}: {
  entry: RankedEntry;
  color: string;
  valueFormat: "percent" | "number" | ((v: number) => string);
  showProgressBar: boolean;
  maxValue: number;
  onClick?: (entry: RankedEntry) => void;
  animDelay: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), animDelay);
    return () => clearTimeout(timer);
  }, [animDelay]);

  // Trend berechnen
  const trend: "up" | "down" | "neutral" = entry.trend
    ? entry.trend
    : entry.previousValue !== undefined
    ? entry.value > entry.previousValue
      ? "up"
      : entry.value < entry.previousValue
      ? "down"
      : "neutral"
    : "neutral";

  // Wert formatieren
  const formattedValue =
    typeof valueFormat === "function"
      ? valueFormat(entry.value)
      : valueFormat === "percent"
      ? `${entry.value}%`
      : entry.value.toLocaleString();

  // Fortschrittsbreite
  const progressWidth = Math.min(100, (entry.value / maxValue) * 100);

  return (
    <div
      ref={ref}
      onClick={() => onClick?.(entry)}
      className={cn(
        "group relative px-4 py-2 transition-colors duration-100",
        onClick ? "cursor-pointer hover:bg-secondary/50" : ""
      )}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-4px)",
        transition: `opacity 0.25s ease, transform 0.25s ease`,
      }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Farbpunkt */}
        <span
          className="flex-shrink-0 rounded-full"
          style={{
            width: 8,
            height: 8,
            background: entry.color ?? color,
          }}
        />

        {/* Label */}
        <span
          className="flex-1 truncate text-foreground"
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 13,
            lineHeight: "1.4",
          }}
        >
          {entry.label}
        </span>

        {/* Trend */}
        <TrendIcon trend={trend} />

        {/* Wert */}
        <span
          className="flex-shrink-0 tabular-nums text-foreground"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            fontWeight: 500,
            minWidth: 36,
            textAlign: "right",
          }}
        >
          {formattedValue}
        </span>
      </div>

      {/* Fortschrittsbalken */}
      {showProgressBar && (
        <div
          className="mt-1.5 rounded-full overflow-hidden"
          style={{ height: 2, background: "var(--secondary)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: visible ? `${progressWidth}%` : "0%",
              background: entry.color ?? color,
              opacity: 0.7,
              transitionDelay: `${animDelay + 100}ms`,
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ── Kategorie-Gruppe ── */
function CategoryGroup({
  category,
  colorMap,
  valueFormat,
  showProgressBar,
  maxValue,
  sortByValue,
  onEntryClick,
  baseDelay,
}: {
  category: RankedCategory;
  colorMap: Map<string, string>;
  valueFormat: "percent" | "number" | ((v: number) => string);
  showProgressBar: boolean;
  maxValue: number;
  sortByValue: boolean;
  onEntryClick?: (entry: RankedEntry) => void;
  baseDelay: number;
}) {
  const entries = sortByValue
    ? [...category.entries].sort((a, b) => b.value - a.value)
    : category.entries;

  return (
    <div>
      {/* Kategorie-Header */}
      <div
        className="px-4 pt-3 pb-1.5 flex items-center gap-2"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span
          className="text-muted-foreground tracking-widest uppercase"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            fontWeight: 500,
          }}
        >
          {category.label}
        </span>
        <span
          className="text-muted-foreground/60"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
          }}
        >
          ({category.entries.length})
        </span>
      </div>

      {/* Einträge */}
      {entries.map((entry, i) => (
        <EntryRow
          key={entry.id}
          entry={entry}
          color={colorMap.get(entry.category) ?? VOLT_CATEGORY_COLORS[0]}
          valueFormat={valueFormat}
          showProgressBar={showProgressBar}
          maxValue={maxValue}
          onClick={onEntryClick}
          animDelay={baseDelay + i * 25}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HAUPTKOMPONENTE
══════════════════════════════════════════════════════════════════════ */
export const VoltRankedList: React.FC<VoltRankedListProps> = ({
  categories,
  entries,
  valueFormat = "percent",
  maxHeight = 480,
  showProgressBar = false,
  title,
  subtitle,
  className,
  onEntryClick,
  sortByValue = true,
  maxValue = 100,
}) => {
  // Daten normalisieren: flache Liste → eine Kategorie
  const normalizedCategories: RankedCategory[] = categories
    ? categories
    : entries
    ? [{ id: "default", label: "Einträge", entries }]
    : [];

  // Kategorie-Farben zuweisen
  const allCategories = Array.from(
    new Set(
      normalizedCategories.flatMap(cat =>
        cat.entries.map(e => e.category)
      )
    )
  );
  const colorMap = new Map<string, string>(
    allCategories.map((cat, i) => [cat, VOLT_CATEGORY_COLORS[i % VOLT_CATEGORY_COLORS.length]])
  );

  // Basis-Delay pro Kategorie berechnen
  let cumulativeDelay = 0;
  const categoryDelays: number[] = normalizedCategories.map(cat => {
    const delay = cumulativeDelay;
    cumulativeDelay += cat.entries.length * 25 + 50;
    return delay;
  });

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl overflow-hidden",
        className
      )}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="px-4 pt-4 pb-2">
          {title && (
            <h4
              className="font-semibold text-sm text-foreground leading-tight"
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              {title}
            </h4>
          )}
          {subtitle && (
            <p
              className="text-xs text-muted-foreground mt-0.5"
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Scrollbarer Inhalt */}
      <div
        style={{
          maxHeight,
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--border) transparent",
        }}
      >
        {normalizedCategories.map((cat, i) => (
          <CategoryGroup
            key={cat.id}
            category={cat}
            colorMap={colorMap}
            valueFormat={valueFormat}
            showProgressBar={showProgressBar}
            maxValue={maxValue}
            sortByValue={sortByValue}
            onEntryClick={onEntryClick}
            baseDelay={categoryDelays[i]}
          />
        ))}

        {normalizedCategories.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p
              className="text-muted-foreground text-sm"
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
            >
              Keine Daten vorhanden
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoltRankedList;
