/**
 * VoltTable – Atmospheric Volt UI Design System
 * Tabellen-Komponente mit atmosphärischen Hover-Effekten.
 */

import React from "react";
import { cn } from "@/lib/utils";

export interface VoltTableColumn<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface VoltTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns: VoltTableColumn<T>[];
  data: T[];
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  caption?: string;
  emptyMessage?: string;
}

export function VoltTable<T extends Record<string, unknown>>({
  columns,
  data,
  striped = false,
  hoverable = true,
  compact = false,
  caption,
  emptyMessage = "Keine Daten vorhanden",
  className,
  ...props
}: VoltTableProps<T>) {
  const cellPad = compact ? "px-4 py-2" : "px-5 py-3.5";

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border",
        "ring-1 ring-border",
        className
      )}
      {...props}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {caption && (
            <caption className="px-5 py-3 text-left text-sm font-semibold font-body text-muted-foreground border-b border-border bg-muted/50">
              {caption}
            </caption>
          )}
          <thead>
            <tr className="bg-muted/60 border-b border-border">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={cn(
                    cellPad,
                    "text-xs font-bold font-body uppercase tracking-widest text-muted-foreground",
                    "section-label",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                  )}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-10 text-center text-sm text-muted-foreground font-body"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={cn(
                    "border-b border-border/60 last:border-0",
                    "transition-colors duration-150",
                    striped && rowIdx % 2 === 1 && "bg-muted/30",
                    hoverable && "hover:bg-primary/4"
                  )}
                >
                  {columns.map((col, colIdx) => {
                    const value = row[col.key as keyof T];
                    return (
                      <td
                        key={colIdx}
                        className={cn(
                          cellPad,
                          "text-sm font-body text-foreground",
                          col.align === "center" && "text-center",
                          col.align === "right" && "text-right",
                        )}
                      >
                        {col.render
                          ? col.render(value, row, rowIdx)
                          : String(value ?? "")}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
