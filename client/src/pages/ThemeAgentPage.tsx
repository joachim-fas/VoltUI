/**
 * Theme Agent – Eigene Seite (Route: /theme-agent)
 * Volt UI auf beliebige GitHub-Repos anwenden.
 * Vollständiges Volt UI Design: Lime-Gelb Hintergrund, Terminal-Ästhetik, körnige Texturen
 */

import React, { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import {
  Github, Sparkles, Download, ChevronRight, ChevronDown,
  FileCode, CheckCircle2, AlertCircle, Loader2, Terminal,
  ArrowRight, Code2, Layers, Zap, Lock, Eye, EyeOff,
  KeyRound, Trash2, ShieldCheck, RefreshCw, ArrowLeft, ExternalLink
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
    "react-tailwind": { label: "React + Tailwind", color: "bg-[#0A0A0A] text-[#E4FF97]" },
    "react-css":      { label: "React + CSS",      color: "bg-[#0A0A0A]/80 text-white" },
    "html-css":       { label: "HTML + CSS",        color: "bg-[#0A0A0A]/60 text-white" },
    "unknown":        { label: "Unbekannt",          color: "bg-muted text-muted-foreground" },
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
    <div className="bg-[#0A0A0A] border border-[#E4FF97]/20 rounded-lg p-4 font-mono text-xs max-h-48 overflow-y-auto">
      {lines.map((line, i) => (
        <div key={i} className={`leading-relaxed ${
          line.startsWith("✓") ? "text-[#E4FF97]" :
          line.startsWith("✗") ? "text-red-400" :
          line.startsWith("[") ? "text-white/30" :
          "text-white/70"
        }`}>
          <span className="text-white/20 mr-2 select-none">{String(i + 1).padStart(2, "00")}</span>
          {line}
        </div>
      ))}
      {lines.length === 0 && (
        <div className="text-white/30 italic">Warte auf Analyse...</div>
      )}
    </div>
  );
}

// ─── Diff-Viewer ──────────────────────────────────────────────────────────────

function DiffViewer({ file }: { file: PreviewFile }) {
  const [open, setOpen] = useState(false);
  const hasChanges = file.changes.length > 0;

  return (
    <div className="border border-[#E4FF97]/20 rounded-lg overflow-hidden bg-[#0A0A0A]/40">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#E4FF97]/10 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <FileCode className="w-4 h-4 text-[#E4FF97]/60 flex-shrink-0" />
          <span className="font-mono text-xs text-white/80 truncate">{file.path}</span>
          {hasChanges && (
            <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 bg-[#E4FF97] text-[#0A0A0A] rounded text-xs font-medium">
              <CheckCircle2 className="w-3 h-3" />
              {file.changes.length} Änderung{file.changes.length !== 1 ? "en" : ""}
            </span>
          )}
        </div>
        {open
          ? <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0" />
          : <ChevronRight className="w-4 h-4 text-white/40 flex-shrink-0" />
        }
      </button>

      {open && (
        <div className="p-4 space-y-3 bg-[#0A0A0A]/60">
          {hasChanges && (
            <div className="flex flex-wrap gap-2">
              {file.changes.map((change, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#0A0A0A] border border-[#E4FF97]/20 rounded text-xs font-mono text-white/60">
                  <ArrowRight className="w-3 h-3 text-[#E4FF97]/60" />
                  {change}
                </span>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-mono text-white/40 mb-1.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                Original
              </div>
              <pre className="bg-red-950/20 border border-red-900/20 rounded p-3 text-xs font-mono overflow-x-auto max-h-48 whitespace-pre-wrap break-all">
                <code className="text-red-300/70">{file.originalContent}</code>
              </pre>
            </div>
            <div>
              <div className="text-xs font-mono text-white/40 mb-1.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#E4FF97] inline-block" />
                Volt UI
              </div>
              <pre className="bg-[#0A0A0A] border border-[#E4FF97]/20 rounded p-3 text-xs font-mono overflow-x-auto max-h-48 whitespace-pre-wrap break-all">
                <code className="text-[#E4FF97]/80">{file.transformedContent}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Token-Manager ────────────────────────────────────────────────────────────

function TokenManager() {
  const [inputToken, setInputToken]     = useState("");
  const [inputLabel, setInputLabel]     = useState("");
  const [showInput, setShowInput]       = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const utils = trpc.useUtils();
  const { data: tokenData, isLoading: tokenLoading } = trpc.githubToken.get.useQuery();

  const saveMutation = trpc.githubToken.save.useMutation({
    onSuccess: () => {
      utils.githubToken.get.invalidate();
      setInputToken("");
      setInputLabel("");
      setShowInput(false);
    },
  });

  const deleteMutation = trpc.githubToken.delete.useMutation({
    onSuccess: () => { utils.githubToken.get.invalidate(); },
  });

  if (tokenLoading) {
    return (
      <div className="flex items-center gap-2 text-xs text-white/40">
        <Loader2 className="w-3 h-3 animate-spin" />
        Token-Status wird geladen...
      </div>
    );
  }

  return (
    <div className="border border-[#E4FF97]/20 rounded-xl overflow-hidden bg-[#0A0A0A]/40">
      <div className="px-4 py-3 bg-[#E4FF97]/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-[#E4FF97]" />
          <span className="text-sm font-semibold text-white">GitHub Token</span>
          <span className="text-xs text-white/40">(für private Repositories)</span>
        </div>
        {tokenData?.hasToken && (
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E4FF97]" />
            <span className="text-xs font-mono text-[#E4FF97] font-semibold">Aktiv</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        {tokenData?.hasToken ? (
          <div className="flex items-center justify-between gap-3 bg-[#0A0A0A]/60 border border-[#E4FF97]/10 rounded-lg px-4 py-3">
            <div className="min-w-0">
              <div className="text-xs text-white/40 mb-0.5">{tokenData.label ?? "GitHub Token"}</div>
              <code className="text-sm font-mono text-white/70">{tokenData.maskedToken}</code>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowInput(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border border-[#E4FF97]/20 text-white/60 hover:text-white hover:bg-[#E4FF97]/10 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Ersetzen
              </button>
              <button
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border border-red-900/30 text-red-400/60 hover:bg-red-950/20 transition-colors disabled:opacity-50"
              >
                {deleteMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                Löschen
              </button>
            </div>
          </div>
        ) : (
          <div className="text-xs text-white/40 flex items-center gap-2">
            <Lock className="w-3 h-3" />
            Kein Token gespeichert – öffentliche Repos werden ohne Token analysiert.
          </div>
        )}

        {(!tokenData?.hasToken || showInput) && (
          <div className="space-y-2">
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#E4FF97]/60" />
              <input
                type={showPassword ? "text" : "password"}
                value={inputToken}
                onChange={e => setInputToken(e.target.value)}
                onKeyDown={e => e.key === "Enter" && saveMutation.mutate({ token: inputToken.trim(), label: inputLabel.trim() || undefined })}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="w-full pl-9 pr-10 py-2 border border-[#E4FF97]/20 rounded-lg bg-[#0A0A0A]/60 text-white text-sm font-mono placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#E4FF97]/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
            <input
              type="text"
              value={inputLabel}
              onChange={e => setInputLabel(e.target.value)}
              placeholder="Label (optional)"
              className="w-full px-3 py-2 border border-[#E4FF97]/20 rounded-lg bg-[#0A0A0A]/60 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#E4FF97]/40"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => saveMutation.mutate({ token: inputToken.trim(), label: inputLabel.trim() || undefined })}
                disabled={!inputToken.trim() || saveMutation.isPending}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#E4FF97] text-[#0A0A0A] rounded-lg text-xs font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {saveMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <ShieldCheck className="w-3 h-3" />}
                Token speichern
              </button>
              {showInput && (
                <button
                  onClick={() => { setShowInput(false); setInputToken(""); }}
                  className="px-3 py-2 text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  Abbrechen
                </button>
              )}
              <span className="text-xs text-white/30">Token wird gehasht – nie im Klartext gespeichert.</span>
            </div>
          </div>
        )}

        <p className="text-xs text-white/30">
          Token erstellen unter{" "}
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/50"
          >
            github.com/settings/tokens
          </a>{" "}
          mit <code className="font-mono bg-[#0A0A0A]/60 px-1 rounded">repo</code>-Berechtigung.
        </p>
      </div>
    </div>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({ result, onDownload }: {
  result: TransformResult;
  onDownload: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="border border-[#E4FF97]/20 rounded-xl p-6 bg-[#0A0A0A]/40">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Github className="w-4 h-4 text-[#E4FF97]/60" />
              <span className="text-white/50 text-sm font-mono">{result.owner}/</span>
              <span className="text-white font-bold text-lg font-display">{result.repoName}</span>
            </div>
            <StackBadge stack={result.stack} />
          </div>
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#E4FF97] text-[#0A0A0A] rounded-lg font-semibold text-sm hover:opacity-90 transition-all flex-shrink-0"
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
            <div key={stat.label} className="bg-[#0A0A0A]/60 border border-[#E4FF97]/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold font-display text-[#E4FF97]">{stat.value}</div>
              <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-white/70 mb-2 flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          Analyse-Log
        </h4>
        <LogTerminal lines={result.log} />
      </div>

      {result.previewFiles.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            Vorschau der Transformationen
            <span className="text-xs font-normal text-white/30">(erste {result.previewFiles.length} Dateien)</span>
          </h4>
          <div className="space-y-2">
            {result.previewFiles.map((file, i) => (
              <DiffViewer key={i} file={file} />
            ))}
          </div>
        </div>
      )}

      <div className="border border-[#E4FF97]/20 rounded-lg p-4 flex items-start gap-3 bg-[#0A0A0A]/40">
        <Download className="w-4 h-4 text-[#E4FF97]/60 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-white/60">
          Das ZIP-Paket enthält alle transformierten Dateien sowie{" "}
          <code className="font-mono text-xs bg-[#0A0A0A]/60 px-1 py-0.5 rounded">volt-ui.css</code> und eine{" "}
          <code className="font-mono text-xs bg-[#0A0A0A]/60 px-1 py-0.5 rounded">VOLT_UI_MIGRATION.md</code>{" "}
          mit Integrationsanleitung.
        </div>
      </div>
    </div>
  );
}

// ─── Haupt-Seite ─────────────────────────────────────────────────────────────

export default function ThemeAgentPage() {
  const [, setLocation] = useLocation();
  const [repoUrl, setRepoUrl]   = useState("");
  const [result, setResult]     = useState<TransformResult | null>(null);
  const [cacheKey, setCacheKey] = useState<string | null>(null);

  const { data: tokenData } = trpc.githubToken.get.useQuery();

  const transformMutation = trpc.themeTransform.transform.useMutation({
    onSuccess: (data) => {
      setResult(data as TransformResult);
      setCacheKey(data.cacheKey);
    },
  });

  const handleTransform = () => {
    if (!repoUrl.trim()) return;
    setResult(null);
    transformMutation.mutate({ repoUrl: repoUrl.trim() });
  };

  const handleDownload = () => {
    if (!cacheKey) return;
    window.open(`/api/theme-transform/download/${cacheKey}`, "_blank");
  };

  const isLoading = transformMutation.isPending;
  const error = transformMutation.error?.message;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Subtile Muster-Überlagerung */}
      <div className="fixed inset-0 pattern-dots opacity-10 pointer-events-none" />

      {/* ── Kopfzeile ── */}
      <header className="sticky top-0 z-50 border-b border-[#E4FF97]/10 bg-[#0A0A0A]/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Volt UI
            </button>
            <div className="w-px h-4 bg-[#E4FF97]/20" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E4FF97]" />
              <span className="font-semibold text-sm text-white">Theme Agent</span>
              <span className="text-[0.55rem] font-mono text-[#E4FF97] bg-[#E4FF97]/10 px-1.5 py-0.5 rounded uppercase tracking-widest">V2</span>
            </div>
          </div>
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            Token erstellen
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* ── Inhalt ── */}
      <main className="relative max-w-5xl mx-auto px-6 py-12 space-y-10">
        {/* Hero mit Lime-Hintergrund */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-12 text-center"
          style={{ background: "#E4FF97" }}
        >
          {/* Subtile Muster-Überlagerung */}
          <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-[#E4FF97]" />
              </div>
              <span className="text-xs font-mono text-[#0A0A0A]/50 uppercase tracking-widest">&gt;_ volt ui · theme agent</span>
            </div>
            <h1 className="text-4xl font-bold font-display text-[#0A0A0A] leading-tight mb-4">
              Volt UI auf jedes<br />GitHub-Projekt anwenden.
            </h1>
            <p className="text-[#0A0A0A]/60 text-sm leading-relaxed max-w-2xl mx-auto">
              Gib eine GitHub-URL ein. Der Agent lädt alle design-relevanten Dateien,
              erkennt den Tech-Stack und ersetzt alle UI-Komponenten durch Volt UI Äquivalente.
              Das Ergebnis kannst du als ZIP herunterladen.
            </p>
          </div>
        </motion.div>

        {/* Feature-Karten */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Layers className="w-4 h-4" />, title: "Stack-Erkennung",    desc: "React+Tailwind, React+CSS, HTML+CSS" },
            { icon: <Zap className="w-4 h-4" />,    title: "LLM-Transformation", desc: "KI ersetzt alle UI-Komponenten" },
            { icon: <Download className="w-4 h-4" />, title: "ZIP-Download",     desc: "Transformierte Dateien + volt-ui.css" },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="border border-[#E4FF97]/20 rounded-lg p-4 bg-[#0A0A0A]/40"
            >
              <div className="text-[#E4FF97] mb-2">{f.icon}</div>
              <div className="font-semibold text-sm text-white mb-0.5">{f.title}</div>
              <div className="text-xs text-white/50">{f.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Token Manager */}
        <TokenManager />

        {/* Input */}
        <div className="border border-[#E4FF97]/20 rounded-xl p-6 space-y-4 bg-[#0A0A0A]/40">
          <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
            <Github className="w-4 h-4 text-[#E4FF97]/60" />
            Repository transformieren
            {tokenData?.hasToken && (
              <span className="flex items-center gap-1 text-xs font-normal text-white/50 bg-[#E4FF97]/10 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                Token aktiv
              </span>
            )}
          </h3>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E4FF97]/60" />
              <input
                type="url"
                value={repoUrl}
                onChange={e => setRepoUrl(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleTransform()}
                placeholder="https://github.com/username/repo"
                className="w-full pl-10 pr-4 py-2.5 border border-[#E4FF97]/20 rounded-lg bg-[#0A0A0A]/60 text-white text-sm font-mono placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#E4FF97]/40"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleTransform}
              disabled={isLoading || !repoUrl.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#E4FF97] text-[#0A0A0A] rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {isLoading
                ? <><Loader2 className="w-4 h-4 animate-spin" />Analysiere...</>
                : <><Sparkles className="w-4 h-4" />Transformieren</>
              }
            </button>
          </div>

          <p className="text-xs text-white/40">
            Unterstützt: React+Tailwind, React+CSS, HTML+CSS · Max. 30 Dateien
            {tokenData?.hasToken && " · Private Repos mit gespeichertem Token"}
          </p>
        </div>

        {/* Lade-Zustand */}
        {isLoading && (
          <div className="border border-[#E4FF97]/20 rounded-xl p-10 flex flex-col items-center gap-4 text-center bg-[#0A0A0A]/40">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-[#E4FF97]/10 border border-[#E4FF97]/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#E4FF97]" />
              </div>
              <div className="absolute -inset-1 rounded-xl border border-[#E4FF97]/30 animate-pulse" />
            </div>
            <div>
              <div className="font-semibold text-white mb-1">Transformation läuft...</div>
              <div className="text-sm text-white/50">
                Dateien werden geladen, analysiert und durch Volt UI Komponenten ersetzt.
                <br />Das kann 30–60 Sekunden dauern.
              </div>
            </div>
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#E4FF97] animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Fehler */}
        {error && !isLoading && (
          <div className="border border-red-900/30 bg-red-950/20 rounded-xl p-5 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400/60 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-red-400/80 text-sm mb-1">Transformation fehlgeschlagen</div>
              <div className="text-sm text-red-300/50">{error}</div>
            </div>
          </div>
        )}

        {/* Ergebnis */}
        {result && !isLoading && (
          <ResultCard result={result} onDownload={handleDownload} />
        )}

        {/* Leerzustand */}
        {!result && !isLoading && !error && (
          <div className="border border-dashed border-[#E4FF97]/20 rounded-xl p-14 flex flex-col items-center gap-3 text-center">
            <Github className="w-10 h-10 text-[#E4FF97]/30" />
            <div className="font-semibold text-white/60">Bereit zur Transformation</div>
            <div className="text-sm text-white/40 max-w-sm">
              Gib oben eine GitHub-URL ein. Der Theme Agent analysiert automatisch alle
              UI-Komponenten und wandelt sie in Volt UI Komponenten um.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
