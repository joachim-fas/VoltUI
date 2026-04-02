/**
 * Theme Agent – Eigene Seite (Route: /theme-agent)
 * Volt UI auf beliebige GitHub-Repos anwenden.
 * Vollständiges Volt UI Design: Lime-Gelb Hintergrund, Terminal-Ästhetik, körnige Texturen
 */

import React, { useState, useRef } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import {
  Github, Sparkles, Download, ChevronRight, ChevronDown,
  FileCode, CheckCircle2, AlertCircle, Loader2, Terminal,
  ArrowRight, Code2, Layers, Zap, Lock, Eye, EyeOff,
  KeyRound, Trash2, ShieldCheck, RefreshCw, ArrowLeft, ExternalLink,
  Upload, FolderOpen, X
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
    <div className="bg-secondary border border-border rounded-lg p-4 font-mono text-xs max-h-48 overflow-y-auto">
      {lines.map((line, i) => (
        <div key={i} className={`leading-relaxed ${
          line.startsWith("✓") ? "text-[#1A9E5A]" :
          line.startsWith("✗") ? "text-red-500" :
          line.startsWith("[") ? "text-muted-foreground" :
          "text-foreground/70"
        }`}>
          <span className="text-muted-foreground/40 mr-2 select-none">{String(i + 1).padStart(2, "00")}</span>
          {line}
        </div>
      ))}
      {lines.length === 0 && (
        <div className="text-muted-foreground italic">Warte auf Analyse...</div>
      )}
    </div>
  );
}

// ─── Diff-Viewer ──────────────────────────────────────────────────────────────

function DiffViewer({ file }: { file: PreviewFile }) {
  const [open, setOpen] = useState(false);
  const hasChanges = file.changes.length > 0;

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <FileCode className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="font-mono text-xs text-foreground/80 truncate">{file.path}</span>
          {hasChanges && (
            <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 bg-[#E4FF97] text-[#0A0A0A] rounded text-xs font-medium">
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
        <div className="p-4 space-y-3 bg-secondary/30">
          {hasChanges && (
            <div className="flex flex-wrap gap-2">
              {file.changes.map((change, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-secondary border border-border rounded text-xs font-mono text-muted-foreground">
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
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
              <pre className="bg-red-950/20 border border-red-900/20 rounded p-3 text-xs font-mono overflow-x-auto max-h-48 whitespace-pre-wrap break-all">
                <code className="text-red-300/70">{file.originalContent}</code>
              </pre>
            </div>
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#E4FF97] inline-block" />
                Volt UI
              </div>
              <pre className="bg-secondary border border-border rounded p-3 text-xs font-mono overflow-x-auto max-h-48 whitespace-pre-wrap break-all">
                <code className="text-[#1A9E5A]">{file.transformedContent}</code>
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
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="px-4 py-3 bg-secondary/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-foreground" />
          <span className="text-sm font-semibold text-foreground">GitHub Token</span>
          <span className="text-xs text-muted-foreground">(für private Repositories)</span>
        </div>
        {tokenData?.hasToken && (
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1A9E5A]" />
            <span className="text-xs font-mono text-[#1A9E5A] font-semibold">Aktiv</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        {tokenData?.hasToken ? (
          <div className="flex items-center justify-between gap-3 bg-secondary border border-border rounded-lg px-4 py-3">
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground mb-0.5">{tokenData.label ?? "GitHub Token"}</div>
              <code className="text-sm font-mono text-foreground/70">{tokenData.maskedToken}</code>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowInput(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
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
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <Lock className="w-3 h-3" />
            Kein Token gespeichert – öffentliche Repos werden ohne Token analysiert.
          </div>
        )}

        {(!tokenData?.hasToken || showInput) && (
          <div className="space-y-2">
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={inputToken}
                onChange={e => setInputToken(e.target.value)}
                onKeyDown={e => e.key === "Enter" && saveMutation.mutate({ token: inputToken.trim(), label: inputLabel.trim() || undefined })}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="w-full pl-9 pr-10 py-2 border border-border rounded-lg bg-background text-foreground text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
            <input
              type="text"
              value={inputLabel}
              onChange={e => setInputLabel(e.target.value)}
              placeholder="Label (optional)"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
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
                  className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Abbrechen
                </button>
              )}
              <span className="text-xs text-muted-foreground/60">Token wird gehasht – nie im Klartext gespeichert.</span>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Token erstellen unter{" "}
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            github.com/settings/tokens
          </a>{" "}
          mit <code className="font-mono bg-secondary px-1 rounded">repo</code>-Berechtigung.
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
      <div className="border border-border rounded-xl p-6 bg-card">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Github className="w-4 h-4 text-foreground" />
              <span className="text-muted-foreground text-sm font-mono">{result.owner}/</span>
              <span className="text-foreground font-bold text-lg font-display">{result.repoName}</span>
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
            <div key={stat.label} className="bg-secondary border border-border rounded-lg p-3 text-center">
              <div className="text-2xl font-bold font-display text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-foreground/70 mb-2 flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          Analyse-Log
        </h4>
        <LogTerminal lines={result.log} />
      </div>

      {result.previewFiles.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-foreground/70 mb-3 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            Vorschau der Transformationen
            <span className="text-xs font-normal text-muted-foreground">(erste {result.previewFiles.length} Dateien)</span>
          </h4>
          <div className="space-y-2">
            {result.previewFiles.map((file, i) => (
              <DiffViewer key={i} file={file} />
            ))}
          </div>
        </div>
      )}

      <div className="border border-border rounded-lg p-4 flex items-start gap-3 bg-card">
        <Download className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" />
        <div className="text-sm text-muted-foreground">
          Das ZIP-Paket enthält alle transformierten Dateien sowie{" "}
          <code className="font-mono text-xs bg-secondary px-1 py-0.5 rounded">volt-ui.css</code> und eine{" "}
          <code className="font-mono text-xs bg-secondary px-1 py-0.5 rounded">VOLT_UI_MIGRATION.md</code>{" "}
          mit Integrationsanleitung.
        </div>
      </div>
    </div>
  );
}

// ─── Haupt-Seite ─────────────────────────────────────────────────────────────

export default function ThemeAgentPage() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<"github" | "local">("github");
  const [repoUrl, setRepoUrl]   = useState("");
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [localRepoName, setLocalRepoName] = useState("");
  const [result, setResult]     = useState<TransformResult | null>(null);
  const [cacheKey, setCacheKey] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleLocalTransform = async () => {
    if (!localFile) return;
    setResult(null);
    setLocalError(null);
    setLocalLoading(true);
    try {
      const formData = new FormData();
      formData.append("repo", localFile);
      formData.append("repoName", localRepoName || localFile.name.replace(/\.zip$/i, ""));
      const res = await fetch("/api/theme-transform/upload-local", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload fehlgeschlagen");
      setResult(data as TransformResult);
      setCacheKey(data.cacheKey);
    } catch (err: any) {
      setLocalError(err.message);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleDownload = () => {
    if (!cacheKey) return;
    window.open(`/api/theme-transform/download/${cacheKey}`, "_blank");
  };

  const isLoading = mode === "github" ? transformMutation.isPending : localLoading;
  const error = mode === "github" ? transformMutation.error?.message : localError;

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Kopfzeile ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Volt UI
            </button>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-foreground" />
              <span className="font-semibold text-sm text-foreground">Theme Agent</span>
              <span className="text-[0.55rem] font-mono text-[#E4FF97] bg-[#E4FF97]/10 px-1.5 py-0.5 rounded uppercase tracking-widest">V2</span>
            </div>
          </div>
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
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
              Volt UI auf jedes<br />Projekt anwenden.
            </h1>
            <p className="text-[#0A0A0A]/60 text-sm leading-relaxed max-w-2xl mx-auto">
              Gib eine GitHub-URL ein oder lade ein lokales Repository hoch. Der Agent analysiert alle design-relevanten Dateien,
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
              className="border border-border rounded-lg p-4 bg-card"
            >
              <div className="text-foreground mb-2">{f.icon}</div>
              <div className="font-semibold text-sm text-foreground mb-0.5">{f.title}</div>
              <div className="text-xs text-muted-foreground">{f.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Token Manager */}
        <TokenManager />

        {/* Input */}
        <div className="border border-border rounded-xl overflow-hidden bg-card">
          {/* Tab-Umschalter */}
          <div className="flex border-b border-border">
            <button
              onClick={() => { setMode("github"); setResult(null); setLocalError(null); }}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                mode === "github"
                  ? "bg-secondary text-foreground border-b-2 border-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Github className="w-4 h-4" />
                GitHub URL
              </div>
            </button>
            <button
              onClick={() => { setMode("local"); setResult(null); transformMutation.reset(); }}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                mode === "local"
                  ? "bg-secondary text-foreground border-b-2 border-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Lokales Repo
              </div>
            </button>
          </div>

          <div className="p-6 space-y-4">
            {mode === "github" ? (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Github className="w-4 h-4 text-foreground" />
                  <span className="font-semibold text-foreground">GitHub Repository</span>
                  {tokenData?.hasToken && (
                    <span className="flex items-center gap-1 text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full ml-auto">
                      <ShieldCheck className="w-3 h-3" />
                      Token aktiv
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={repoUrl}
                      onChange={e => setRepoUrl(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleTransform()}
                      placeholder="https://github.com/username/repo"
                      className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
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
                <p className="text-xs text-muted-foreground">
                  Unterstützt: React+Tailwind, React+CSS, HTML+CSS · Max. 30 Dateien
                  {tokenData?.hasToken && " · Private Repos mit gespeichertem Token"}
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <FolderOpen className="w-4 h-4 text-foreground" />
                  <span className="font-semibold text-foreground">Lokales Repository (ZIP)</span>
                </div>
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".zip"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setLocalFile(file);
                        setLocalRepoName(file.name.replace(/\.zip$/i, ""));
                      }
                    }}
                    className="hidden"
                  />
                  {!localFile ? (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center gap-3 hover:border-foreground hover:bg-secondary/30 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <div className="text-center">
                        <div className="font-medium text-foreground text-sm mb-1">ZIP-Datei auswählen</div>
                        <div className="text-xs text-muted-foreground">Klicke oder ziehe eine ZIP-Datei hierher</div>
                      </div>
                    </button>
                  ) : (
                    <div className="border border-border rounded-lg p-4 flex items-center gap-3 bg-secondary/30">
                      <FolderOpen className="w-5 h-5 text-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground text-sm truncate">{localFile.name}</div>
                        <div className="text-xs text-muted-foreground">{(localFile.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                      <button
                        onClick={() => { setLocalFile(null); setLocalRepoName(""); }}
                        className="p-1.5 rounded hover:bg-secondary transition-colors"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  )}
                  {localFile && (
                    <>
                      <input
                        type="text"
                        value={localRepoName}
                        onChange={e => setLocalRepoName(e.target.value)}
                        placeholder="Projekt-Name (optional)"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                      <button
                        onClick={handleLocalTransform}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-[#E4FF97] text-[#0A0A0A] rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        {isLoading
                          ? <><Loader2 className="w-4 h-4 animate-spin" />Analysiere...</>
                          : <><Sparkles className="w-4 h-4" />Transformieren</>
                        }
                      </button>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Lade dein lokales Git-Repository als ZIP hoch. Max. 50 MB · Unterstützt: React+Tailwind, React+CSS, HTML+CSS
                </p>
              </>
            )}
          </div>
        </div>

        {/* Lade-Zustand */}
        {isLoading && (
          <div className="border border-border rounded-xl p-10 flex flex-col items-center gap-4 text-center bg-card">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-foreground" />
              </div>
              <div className="absolute -inset-1 rounded-xl border border-border animate-pulse" />
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
          <div className="border border-dashed border-border rounded-xl p-14 flex flex-col items-center gap-3 text-center">
            <Github className="w-10 h-10 text-muted-foreground/30" />
            <div className="font-semibold text-muted-foreground">Bereit zur Transformation</div>
            <div className="text-sm text-muted-foreground/70 max-w-sm">
              Gib oben eine GitHub-URL ein. Der Theme Agent analysiert automatisch alle
              UI-Komponenten und wandelt sie in Volt UI Komponenten um.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
