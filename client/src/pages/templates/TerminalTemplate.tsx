/**
 * Volt UI – Terminal / CLI Output Template
 * Route: /showcase/terminal
 * Zeigt: Interaktives Terminal, statische Log-Ausgaben, Build-Pipeline, Deployment-Status
 * Komponenten: VoltTerminal, VoltTerminalStatic, VoltBadge, VoltButton, VoltCard, VoltProgress
 */

import React, { useState } from "react";
import { TemplateShell } from "./TemplateShell";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltProgress } from "@/components/volt/VoltProgress";
import { VoltTerminal, VoltTerminalStatic, TerminalLine, TerminalCommand } from "@/components/volt/VoltTerminal";
import {
  Terminal, Play, Square, RefreshCw, Download,
  CheckCircle2, XCircle, Clock, Zap, GitBranch,
  Package, Server, Database, Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Build-Pipeline-Daten ── */
type StepStatus = "done" | "running" | "pending" | "error";

interface PipelineStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: StepStatus;
  duration?: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  { id: "install",  label: "Dependencies installieren", icon: <Package className="w-4 h-4" />,  status: "done",    duration: "12s" },
  { id: "lint",     label: "Linting & Type-Check",      icon: <Terminal className="w-4 h-4" />, status: "done",    duration: "4s" },
  { id: "test",     label: "Unit Tests",                icon: <CheckCircle2 className="w-4 h-4" />, status: "done", duration: "18s" },
  { id: "build",    label: "Production Build",          icon: <Zap className="w-4 h-4" />,      status: "running", duration: undefined },
  { id: "docker",   label: "Docker Image",              icon: <Server className="w-4 h-4" />,   status: "pending", duration: undefined },
  { id: "db",       label: "DB Migrations",             icon: <Database className="w-4 h-4" />, status: "pending", duration: undefined },
  { id: "deploy",   label: "Deployment",                icon: <Globe className="w-4 h-4" />,    status: "pending", duration: undefined },
];

/* ── Statische Log-Ausgaben ── */
const BUILD_LOG: TerminalLine[] = [
  { type: "comment", text: "# Volt UI – Production Build" },
  { type: "blank",   text: "" },
  { type: "command", text: ">_ pnpm run build" },
  { type: "info",    text: "vite v7.1.9  building for production..." },
  { type: "blank",   text: "" },
  { type: "output",  text: "transforming..." },
  { type: "success", text: "✓  1.247 modules transformed." },
  { type: "blank",   text: "" },
  { type: "output",  text: "dist/index.html                    0.48 kB │ gzip:  0.31 kB" },
  { type: "output",  text: "dist/assets/index-BxK2mNpQ.css   42.18 kB │ gzip: 11.24 kB" },
  { type: "output",  text: "dist/assets/index-DvKpMnRt.js   312.47 kB │ gzip: 89.12 kB" },
  { type: "blank",   text: "" },
  { type: "success", text: "✓  built in 1m 23s" },
];

const TEST_LOG: TerminalLine[] = [
  { type: "comment", text: "# Vitest – Unit Test Suite" },
  { type: "blank",   text: "" },
  { type: "command", text: ">_ pnpm test" },
  { type: "info",    text: "Vitest v2.1.8 – running tests..." },
  { type: "blank",   text: "" },
  { type: "success", text: " PASS  src/components/volt/VoltButton.test.tsx (12 tests)" },
  { type: "success", text: " PASS  src/components/volt/VoltInput.test.tsx (8 tests)" },
  { type: "success", text: " PASS  src/components/volt/VoltTable.test.tsx (15 tests)" },
  { type: "success", text: " PASS  src/components/volt/VoltModal.test.tsx (6 tests)" },
  { type: "warning", text: " SKIP  src/components/volt/VoltChart.test.tsx (canvas not available)" },
  { type: "blank",   text: "" },
  { type: "success", text: "Test Files  4 passed | 1 skipped (5)" },
  { type: "success", text: "Tests       41 passed (41)" },
  { type: "output",  text: "Duration    2.14s" },
];

const DEPLOY_LOG: TerminalLine[] = [
  { type: "comment", text: "# Deployment – Production" },
  { type: "blank",   text: "" },
  { type: "command", text: ">_ volt deploy --env production" },
  { type: "info",    text: "Connecting to deployment server..." },
  { type: "output",  text: "Uploading build artifacts..." },
  { type: "output",  text: "  → dist/ (312 KB compressed)" },
  { type: "output",  text: "Running database migrations..." },
  { type: "success", text: "  ✓ 3 migrations applied" },
  { type: "output",  text: "Restarting application servers..." },
  { type: "success", text: "  ✓ Server 1/3 healthy" },
  { type: "success", text: "  ✓ Server 2/3 healthy" },
  { type: "success", text: "  ✓ Server 3/3 healthy" },
  { type: "blank",   text: "" },
  { type: "success", text: "Deployment successful! 🚀" },
  { type: "output",  text: "URL: https://volt-ui.manus.space" },
  { type: "output",  text: "Version: 2.5.0 · Build: #1247" },
];

/* ── Benutzerdefinierte Terminal-Befehle ── */
const CUSTOM_COMMANDS: TerminalCommand[] = [
  {
    name: "components",
    description: "Alle Volt UI Komponenten auflisten",
    handler: () => [
      { type: "info",    text: "Volt UI Komponenten:" },
      { type: "blank",   text: "" },
      ...["VoltButton", "VoltCard", "VoltInput", "VoltBadge", "VoltAlert", "VoltModal",
          "VoltTable", "VoltTabs", "VoltProgress", "VoltToast", "VoltTerminal", "VoltNavbar",
          "VoltAvatar", "VoltStat", "VoltChart", "VoltCommandBar"].map((c) => ({
        type: "output" as const,
        text: `  → ${c}`,
      })),
      { type: "blank",   text: "" },
      { type: "comment", text: "16 Komponenten verfügbar" },
    ],
  },
  {
    name: "status",
    description: "System-Status prüfen",
    handler: () => [
      { type: "info",    text: "System Status:" },
      { type: "success", text: "  ✓ API Server: online (42ms)" },
      { type: "success", text: "  ✓ Database: online (8ms)" },
      { type: "success", text: "  ✓ CDN: online (12ms)" },
      { type: "warning", text: "  ⚠ Cache: degraded (high memory)" },
      { type: "blank",   text: "" },
      { type: "output",  text: "Uptime: 99.97% (30 Tage)" },
    ],
  },
  {
    name: "deploy",
    description: "Deployment starten (Demo)",
    handler: () => [
      { type: "info",    text: "Starte Deployment..." },
      { type: "output",  text: "Validiere Konfiguration..." },
      { type: "success", text: "✓ Konfiguration OK" },
      { type: "output",  text: "Erstelle Build..." },
      { type: "success", text: "✓ Build erfolgreich (1m 23s)" },
      { type: "success", text: "✓ Deployment abgeschlossen" },
      { type: "blank",   text: "" },
      { type: "comment", text: "Tipp: In Produktion wäre das ein echter Deploy." },
    ],
  },
];

/* ── Pipeline-Schritt-Komponente ── */
function PipelineStepRow({ step }: { step: PipelineStep }) {
  const statusIcon = {
    done:    <CheckCircle2 className="w-4 h-4 text-[#6BFF9E]" />,
    running: <RefreshCw className="w-4 h-4 text-[#E4FF97] animate-spin" />,
    pending: <Clock className="w-4 h-4 text-[#666666]" />,
    error:   <XCircle className="w-4 h-4 text-[#FF6B6B]" />,
  }[step.status];

  return (
    <div className={cn(
      "flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors",
      step.status === "running" ? "bg-[#E4FF97]/10" : "hover:bg-white/5"
    )}>
      <div className="text-[#666666] flex-shrink-0">{step.icon}</div>
      <span className={cn(
        "flex-1 text-sm font-mono",
        step.status === "done"    ? "text-[#C8C8C8]" :
        step.status === "running" ? "text-[#E4FF97] font-semibold" :
        step.status === "error"   ? "text-[#FF6B6B]" :
        "text-[#444444]"
      )}>
        {step.label}
      </span>
      {step.duration && (
        <span className="text-[#444444] text-xs font-mono">{step.duration}</span>
      )}
      {statusIcon}
    </div>
  );
}

/* ── Hauptkomponente ── */
export default function TerminalTemplate() {
  const [activeLog, setActiveLog] = useState<"build" | "test" | "deploy">("build");
  const [buildProgress] = useState(67);

  const logMap = { build: BUILD_LOG, test: TEST_LOG, deploy: DEPLOY_LOG };

  return (
    <TemplateShell title="Terminal & CLI Output" category="Dev">
      <div className="min-h-[calc(100vh-56px)] bg-[#0A0A0A] text-[#C8C8C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          {/* ── Page Header ── */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#1E1E1E] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-[#E4FF97]" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-white tracking-tight">Terminal & CLI</h1>
                <p className="text-[#666666] text-xs font-mono">volt-ui · v2.5.0 · branch: main</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <VoltBadge variant="positive" size="sm">Live</VoltBadge>
              <VoltButton size="sm" variant="outline" leftIcon={<GitBranch className="w-3.5 h-3.5" />}
                className="border-[#1E1E1E] text-[#C8C8C8] hover:border-[#E4FF97] hover:text-[#E4FF97]">
                main
              </VoltButton>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Linke Spalte: Pipeline + Logs ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Build-Pipeline */}
              <div className="rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E1E1E] bg-[#141414]">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#E4FF97]" />
                    <span className="text-sm font-semibold text-white">Build Pipeline</span>
                    <VoltBadge variant="default" size="sm">Running</VoltBadge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#666666]">Build #1247</span>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#666666] hover:text-[#C8C8C8] hover:bg-[#1E1E1E] transition-colors">
                      <Square className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono text-[#666666]">Fortschritt</span>
                      <span className="text-xs font-mono text-[#E4FF97]">{buildProgress}%</span>
                    </div>
                    <VoltProgress value={buildProgress} size="sm" variant="primary" />
                  </div>
                  <div className="space-y-0.5">
                    {PIPELINE_STEPS.map((step) => (
                      <PipelineStepRow key={step.id} step={step} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Log-Viewer */}
              <div className="rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] overflow-hidden">
                <div className="flex items-center gap-0 border-b border-[#1E1E1E] bg-[#141414]">
                  {(["build", "test", "deploy"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveLog(tab)}
                      className={cn(
                        "px-4 py-2.5 text-xs font-mono font-semibold transition-colors border-b-2",
                        activeLog === tab
                          ? "text-[#E4FF97] border-[#E4FF97]"
                          : "text-[#666666] border-transparent hover:text-[#C8C8C8]"
                      )}
                    >
                      {tab}.log
                    </button>
                  ))}
                  <div className="flex-1" />
                  <button className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-mono text-[#666666] hover:text-[#C8C8C8] transition-colors">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
                <VoltTerminalStatic
                  lines={logMap[activeLog]}
                  title={`${activeLog}.log`}
                  showWindowControls={false}
                  className="rounded-none border-0"
                />
              </div>

            </div>

            {/* ── Rechte Spalte: Interaktives Terminal ── */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-white mb-1">Interaktives Terminal</h2>
                <p className="text-xs text-[#666666] font-mono mb-3">Tippe <span className="text-[#E4FF97]">help</span> für alle Befehle</p>
                <VoltTerminal
                  title="volt-ui — shell"
                  variant="dark"
                  size="sm"
                  maxHeight="320px"
                  commands={CUSTOM_COMMANDS}
                  initialOutput={[
                    { type: "info",    text: "Volt UI Terminal v2.5.0" },
                    { type: "comment", text: "Tippe 'help' für alle Befehle." },
                    { type: "blank",   text: "" },
                  ]}
                />
              </div>

              {/* Quick Commands */}
              <div className="rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] p-4">
                <p className="text-xs font-semibold text-[#666666] tracking-widest uppercase mb-3">Quick Commands</p>
                <div className="space-y-1.5">
                  {[
                    { cmd: "pnpm run dev",   desc: "Dev-Server starten" },
                    { cmd: "pnpm run build", desc: "Production Build" },
                    { cmd: "pnpm test",      desc: "Tests ausführen" },
                    { cmd: "pnpm db:push",   desc: "DB-Schema pushen" },
                  ].map((item) => (
                    <div key={item.cmd} className="flex items-center justify-between group">
                      <div>
                        <code className="text-xs text-[#E4FF97] font-mono">{item.cmd}</code>
                        <p className="text-[10px] text-[#444444]">{item.desc}</p>
                      </div>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#444444] hover:text-[#E4FF97] hover:bg-[#1E1E1E] transition-colors opacity-0 group-hover:opacity-100">
                        <Play className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deployment-Info */}
              <div className="rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] p-4">
                <p className="text-xs font-semibold text-[#666666] tracking-widest uppercase mb-3">Letztes Deployment</p>
                <div className="space-y-2">
                  {[
                    { label: "Version",   value: "v2.5.0" },
                    { label: "Branch",    value: "main" },
                    { label: "Commit",    value: "a3f9c12" },
                    { label: "Deployed",  value: "vor 2 Std." },
                    { label: "Duration",  value: "1m 47s" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs text-[#444444] font-mono">{item.label}</span>
                      <span className="text-xs text-[#C8C8C8] font-mono">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TemplateShell>
  );
}
