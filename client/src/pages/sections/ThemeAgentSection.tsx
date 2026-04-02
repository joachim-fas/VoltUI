/**
 * Theme Agent Section v2.2
 * GitHub-Repo-URL eingeben → UI-Komponenten durch Volt UI ersetzen → ZIP herunterladen
 */

import React, { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Github, Sparkles, Download, ChevronRight, ChevronDown,
  FileCode, CheckCircle2, AlertCircle, Loader2, Terminal,
  ArrowRight, Code2, Layers, Zap, Lock
} from "lucide-react";

// ─── Typen ───────────────────────────────────────────────────────────────────

type TechStack = "react-tailwind" | "react-css" | "html-css" | "unknown";

interface PreviewFile {
  path: string;
  originalContent: string;
  transformedContent: string;
  changes: string[];
}

interface TransformResult {
  success: boolean;
  cacheKey: string;
  repoName: string;
  owner: string;
  stack: TechStack;
  filesScanned: number;
  filesTransformed: number;
  log: string[];
  previewFiles: PreviewFile[];
  totalFiles: number;
}

// ─── Stack-Badge ──────────────────────────────────────────────────────────────

function StackBadge({ stack }: { stack: TechStack }) {
  const labels: Record<TechStack, { label: string; color: string }> = {
    "react-tailwind": { label: "React + Tailwind", color: "bg-[#E4FF97] text-[#0A0A0A]" },
    "react-css":      { label: "React + CSS",      color: "bg-white/10 text-white" },
    "html-css":       { label: "HTML + CSS",        color: "bg-white/10 text-white" },
    "unknown":        { label: "Unbekannt",          color: "bg-white/5 text-white/50" },
  };
  const { label, color } = labels[stack];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-semibold ${color}`}>
      {label}
    </span>
  );
}

// ─── Log-Terminal ─────────────────────────────────────────────────────────────

function LogTerminal({ lines }: { lines: string[] }) {
  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 font-mono text-xs max-h-48 overflow-y-auto">
      {lines.map((line, i) => (
        <div key={i} className={`leading-relaxed ${
          line.startsWith("✓") ? "text-[#E4FF97]" :
          line.startsWith("✗") ? "text-red-400" :
          line.startsWith("[") ? "text-white/40" :
          "text-white/70"
        }`}>
          <span className="text-white/20 mr-2 select-none">{String(i + 1).padStart(2, "0")}</span>
          {line}
        </div>
      ))}
      {lines.length === 0 && (
        <div className="text-white/20 italic">Warte auf Analyse...</div>
      )}
    </div>
  );
}

// ─── Diff-Viewer ──────────────────────────────────────────────────────────────

function DiffViewer({ file }: { file: PreviewFile }) {
  const [open, setOpen] = useState(false);
  const hasChanges = file.changes.length > 0;

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <FileCode className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="font-mono text-xs text-foreground truncate">{file.path}</span>
          {hasChanges && (
            <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 bg-[#E4FF97]/20 text-[#0A0A0A] rounded text-xs font-medium">
              <CheckCircle2 className="w-3 h-3" />
              {file.changes.length} Änderung{file.changes.length !== 1 ? "en" : ""}
            </span>
          )}
        </div>
        {open
          ? <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          : <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        }
      </button>

      {open && (
        <div className="p-4 space-y-3">
          {hasChanges && (
            <div className="flex flex-wrap gap-2">
              {file.changes.map((change, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E4FF97]/10 border border-[#E4FF97]/20 rounded text-xs font-mono text-foreground">
                  <ArrowRight className="w-3 h-3 text-[#E4FF97]" />
                  {change}
                </span>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                Original
              </div>
              <pre className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded p-3 text-xs font-mono overflow-x-auto max-h-48 whitespace-pre-wrap break-all">
                <code className="text-red-800 dark:text-red-300">{file.originalContent}</code>
              </pre>
            </div>
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#E4FF97] inline-block" />
                Volt UI
              </div>
              <pre className="bg-[#E4FF97]/5 border border-[#E4FF97]/20 rounded p-3 text-xs font-mono overflow-x-auto max-h-48 whitespace-pre-wrap break-all">
                <code className="text-foreground">{file.transformedContent}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Ergebnis-Karte ───────────────────────────────────────────────────────────

function ResultCard({ result, onDownload }: {
  result: TransformResult;
  onDownload: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Zusammenfassung */}
      <div className="bg-[#0A0A0A] rounded-xl p-6 text-white">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Github className="w-4 h-4 text-white/50" />
              <span className="text-white/50 text-sm font-mono">{result.owner}/</span>
              <span className="text-white font-bold text-lg font-display">{result.repoName}</span>
            </div>
            <StackBadge stack={result.stack} />
          </div>
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#E4FF97] text-[#0A0A0A] rounded-lg font-semibold text-sm hover:bg-[#d4ef87] transition-colors flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            ZIP herunterladen
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Dateien geladen", value: result.filesScanned },
            { label: "Transformiert",   value: result.filesTransformed },
            { label: "Dateien im ZIP",  value: result.totalFiles },
          ].map(stat => (
            <div key={stat.label} className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold font-display text-[#E4FF97]">{stat.value}</div>
              <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Analyse-Log */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          Analyse-Log
        </h4>
        <LogTerminal lines={result.log} />
      </div>

      {/* Datei-Vorschau */}
      {result.previewFiles.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            Vorschau der Transformationen
            <span className="text-xs font-normal text-muted-foreground">
              (erste {result.previewFiles.length} Dateien)
            </span>
          </h4>
          <div className="space-y-2">
            {result.previewFiles.map((file, i) => (
              <DiffViewer key={i} file={file} />
            ))}
          </div>
        </div>
      )}

      {/* Download-Hinweis */}
      <div className="bg-muted/50 border border-border rounded-lg p-4 flex items-start gap-3">
        <Download className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div className="text-sm text-muted-foreground">
          Das ZIP-Paket enthält alle transformierten Dateien sowie{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">volt-ui.css</code> und eine{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">VOLT_UI_MIGRATION.md</code>{" "}
          mit Integrationsanleitung.
        </div>
      </div>
    </div>
  );
}

// ─── Haupt-Komponente ─────────────────────────────────────────────────────────

export function ThemeAgentSection() {
  const [repoUrl, setRepoUrl]   = useState("");
  const [token, setToken]       = useState("");
  const [showToken, setShowToken] = useState(false);
  const [result, setResult]     = useState<TransformResult | null>(null);
  const [cacheKey, setCacheKey] = useState<string | null>(null);

  const transformMutation = trpc.themeTransform.transform.useMutation({
    onSuccess: (data) => {
      setResult(data as TransformResult);
      setCacheKey(data.cacheKey);
    },
  });

  const handleTransform = () => {
    if (!repoUrl.trim()) return;
    setResult(null);
    transformMutation.mutate({
      repoUrl: repoUrl.trim(),
      token: token.trim() || undefined,
    });
  };

  const handleDownload = () => {
    if (!cacheKey) return;
    window.open(`/api/theme-transform/download/${cacheKey}`, "_blank");
  };

  const isLoading = transformMutation.isPending;
  const error = transformMutation.error?.message;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-[#E4FF97]" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold font-display text-foreground">Theme Agent</h2>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              V2 · VOLT UI AUF JEDES PROJEKT ANWENDEN
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Gib eine GitHub-URL ein – der Theme Agent lädt alle design-relevanten Dateien,
            analysiert den Tech-Stack und ersetzt alle UI-Komponenten durch Volt UI Äquivalente.
            Das Ergebnis kannst du als ZIP herunterladen und direkt in dein Projekt einbinden.
          </p>
        </div>
      </div>

      {/* Feature-Übersicht */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: <Layers className="w-4 h-4" />, title: "Stack-Erkennung",    desc: "React+Tailwind, React+CSS, HTML+CSS" },
          { icon: <Zap className="w-4 h-4" />,    title: "LLM-Transformation", desc: "KI ersetzt alle UI-Komponenten" },
          { icon: <Download className="w-4 h-4" />, title: "ZIP-Download",     desc: "Transformierte Dateien + volt-ui.css" },
        ].map((f, i) => (
          <div key={i} className="border border-border rounded-lg p-4 bg-muted/30">
            <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center text-[#E4FF97] mb-3">
              {f.icon}
            </div>
            <div className="font-semibold text-sm text-foreground mb-0.5">{f.title}</div>
            <div className="text-xs text-muted-foreground">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Input-Bereich */}
      <div className="border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Github className="w-4 h-4" />
          Repository transformieren
        </h3>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="url"
              value={repoUrl}
              onChange={e => setRepoUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleTransform()}
              placeholder="https://github.com/username/repo"
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleTransform}
            disabled={isLoading || !repoUrl.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0A0A0A] text-[#E4FF97] rounded-lg font-semibold text-sm hover:bg-[#1a1a1a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading
              ? <><Loader2 className="w-4 h-4 animate-spin" />Analysiere...</>
              : <><Sparkles className="w-4 h-4" />Transformieren</>
            }
          </button>
        </div>

        {/* Token-Option */}
        <div>
          <button
            onClick={() => setShowToken(o => !o)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Lock className="w-3 h-3" />
            {showToken ? "Token ausblenden" : "GitHub Token für private Repos (optional)"}
          </button>
          {showToken && (
            <input
              type="password"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="mt-2 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0A0A0A]"
              disabled={isLoading}
            />
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Unterstützt: GitHub, GitLab, Bitbucket · Öffentliche Repositories · Max. 30 Dateien werden transformiert
        </p>
      </div>

      {/* Lade-Zustand */}
      {isLoading && (
        <div className="border border-border rounded-xl p-8 flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#E4FF97]" />
            </div>
            <div className="absolute -inset-1 rounded-xl border-2 border-[#E4FF97]/30 animate-pulse" />
          </div>
          <div>
            <div className="font-semibold text-foreground mb-1">Transformation läuft...</div>
            <div className="text-sm text-muted-foreground">
              Dateien werden geladen, analysiert und durch Volt UI Komponenten ersetzt.
              <br />Das kann 30–60 Sekunden dauern.
            </div>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#E4FF97] animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fehler-Zustand */}
      {error && !isLoading && (
        <div className="border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-red-700 dark:text-red-400 text-sm mb-1">Transformation fehlgeschlagen</div>
            <div className="text-sm text-red-600 dark:text-red-300">{error}</div>
          </div>
        </div>
      )}

      {/* Ergebnis */}
      {result && !isLoading && (
        <ResultCard result={result} onDownload={handleDownload} />
      )}

      {/* Leerzustand */}
      {!result && !isLoading && !error && (
        <div className="border border-dashed border-border rounded-xl p-12 flex flex-col items-center gap-3 text-center">
          <Github className="w-10 h-10 text-muted-foreground/40" />
          <div className="font-semibold text-muted-foreground">Bereit zur Transformation</div>
          <div className="text-sm text-muted-foreground/70 max-w-sm">
            Gib oben eine GitHub-URL ein. Der Theme Agent analysiert automatisch alle
            UI-Komponenten und wandelt sie in Volt UI Komponenten um.
          </div>
        </div>
      )}
    </div>
  );
}
