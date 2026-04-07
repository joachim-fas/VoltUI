/**
 * TemplateShell – gemeinsamer Layout-Wrapper für alle Volt UI Templates
 * Enthält: Header mit Logo, Breadcrumb, ← Zurück-Button
 */
import { Link } from "wouter";
import { ArrowLeft, Terminal } from "lucide-react";
import { VoltBadge } from "@/components/volt/VoltBadge";

interface TemplateShellProps {
  /** Name des Templates, z.B. "Landing Page" */
  title: string;
  /** Optionaler Typ-Badge, z.B. "Marketing" oder "Dashboard" */
  category?: string;
  children: React.ReactNode;
}

export function TemplateShell({ title, category, children }: TemplateShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          {/* Zurück-Button */}
          <Link
            href="/showcase"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Templates</span>
          </Link>

          {/* Divider */}
          <span className="text-border text-lg font-light select-none">/</span>

          {/* Breadcrumb: aktuelles Template */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{title}</span>
            {category && (
              <VoltBadge variant="outline" size="sm">{category}</VoltBadge>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Terminal className="w-3 h-3 text-[#E4FF97]" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight hidden sm:block">volt ui</span>
          </div>
        </div>
      </header>

      {/* ── Inhalt ── */}
      <main>{children}</main>
    </div>
  );
}
