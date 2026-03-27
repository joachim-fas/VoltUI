// GrainWorkflowCard – Operating Principle Component
// Design: Weiß/Hell, Lime+Schwarz System, Pastell-Farbzuordnung pro Phase
// Eingabe → Baby Blue | Ablauf → Butter Yellow | Ergebnis → Mint Green | Wirkung → Neon Yellow

import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, User, GitBranch, Zap, AlertCircle } from "lucide-react";

export type WorkflowPhase = "input" | "process" | "output" | "proof";
export type WorkflowStatus = "pending" | "active" | "done" | "blocked";

export interface WorkflowStep {
  phase: WorkflowPhase;
  label: string;
  content: string;
  owner?: string;
  dod?: string;
  handoff?: string;
  status?: WorkflowStatus;
}

interface GrainWorkflowCardProps {
  title: string;
  description?: string;
  steps: WorkflowStep[];
  compact?: boolean;
  className?: string;
}

const PHASE_CONFIG: Record<WorkflowPhase, {
  label: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
  dot: string;
}> = {
  input: {
    label: "Eingang",
    bg: "bg-[#D4E8FF]",
    border: "border-[#A8CEFF]",
    icon: <GitBranch size={14} />,
    dot: "#D4E8FF",
  },
  process: {
    label: "Ablauf",
    bg: "bg-[#FFF5BA]",
    border: "border-[#FFE87A]",
    icon: <Zap size={14} />,
    dot: "#FFF5BA",
  },
  output: {
    label: "Ergebnis",
    bg: "bg-[#C3F4D3]",
    border: "border-[#7ADEA0]",
    icon: <CheckCircle2 size={14} />,
    dot: "#C3F4D3",
  },
  proof: {
    label: "Wirkung",
    bg: "bg-[#E4FF97]",
    border: "border-[#C8F050]",
    icon: <AlertCircle size={14} />,
    dot: "#E4FF97",
  },
};

const STATUS_CONFIG: Record<WorkflowStatus, { label: string; color: string }> = {
  pending: { label: "Ausstehend", color: "text-[#6B7A9A] bg-[#F0F2F7]" },
  active: { label: "Aktiv", color: "text-[#0A0A0A] bg-[#E4FF97]" },
  done: { label: "Fertig", color: "text-white bg-[#1A9E5A]" },
  blocked: { label: "Blockiert", color: "text-white bg-[#E8402A]" },
};

function WorkflowStepCard({ step, isLast }: { step: WorkflowStep; isLast: boolean }) {
  const config = PHASE_CONFIG[step.phase];
  const status = step.status ? STATUS_CONFIG[step.status] : null;

  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0",
            config.bg,
            config.border
          )}
        >
          <span className="text-[#0A0A0A]">{config.icon}</span>
        </div>
        {!isLast && (
          <div className="w-px h-full min-h-[2rem] bg-[#E8E8E8] mt-1" />
        )}
      </div>
      <div className={cn("flex-1 pb-6 border rounded-xl p-4", config.border, config.bg + "/30")}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A9A]">
            {config.label}
          </span>
          {status && (
            <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded-full", status.color)}>
              {status.label}
            </span>
          )}
        </div>
        <p className="font-semibold text-[#0A0A0A] text-sm mb-1">{step.label}</p>
        <p className="text-[#4A4A4A] text-xs leading-relaxed">{step.content}</p>

        {(step.owner || step.dod || step.handoff) && (
          <div className="mt-3 pt-3 border-t border-[#E8E8E8] flex flex-wrap gap-3">
            {step.owner && (
              <div className="flex items-center gap-1 text-[11px] text-[#6B7A9A]">
                <User size={11} />
                <span className="font-mono">{step.owner}</span>
              </div>
            )}
            {step.dod && (
              <div className="flex items-center gap-1 text-[11px] text-[#6B7A9A]">
                <CheckCircle2 size={11} />
                <span>DoD: {step.dod}</span>
              </div>
            )}
            {step.handoff && (
              <div className="flex items-center gap-1 text-[11px] text-[#6B7A9A]">
                <ArrowRight size={11} />
                <span>Hand-off: {step.handoff}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function GrainWorkflowCard({
  title,
  description,
  steps,
  compact = false,
  className,
}: GrainWorkflowCardProps) {
  return (
    <div className={cn("bg-white border border-[#E8E8E8] rounded-2xl p-6", className)}>
      <div className="mb-5">
        <h3 className="font-bold text-[#0A0A0A] text-base">{title}</h3>
        {description && (
          <p className="text-[#6B7A9A] text-sm mt-1">{description}</p>
        )}
      </div>

      {compact ? (
        // Compact: horizontal flow
        <div className="flex items-center gap-2 flex-wrap">
          {steps.map((step, i) => {
            const config = PHASE_CONFIG[step.phase];
            return (
              <div key={i} className="flex items-center gap-2">
                <div className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium", config.bg, config.border)}>
                  <span className="text-[#0A0A0A]">{config.icon}</span>
                  <span className="text-[#0A0A0A]">{step.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight size={14} className="text-[#BEBEBE] shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        // Full: vertical steps
        <div className="space-y-0">
          {steps.map((step, i) => (
            <WorkflowStepCard key={i} step={step} isLast={i === steps.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// GrainOPBadge – kleine Labels für OP-Metadaten
export type OPLabel = "input" | "process" | "output" | "proof" | "dod" | "owner" | "handoff" | "guardrail" | "log";

const OP_BADGE_CONFIG: Record<OPLabel, { label: string; bg: string; text: string }> = {
  input:     { label: "Eingang",    bg: "#D4E8FF", text: "#0A0A0A" },
  process:   { label: "Ablauf",     bg: "#FFF5BA", text: "#0A0A0A" },
  output:    { label: "Ergebnis",   bg: "#C3F4D3", text: "#0A0A0A" },
  proof:     { label: "Wirkung",    bg: "#E4FF97", text: "#0A0A0A" },
  dod:       { label: "DoD",        bg: "#F0F2F7", text: "#6B7A9A" },
  owner:     { label: "Owner",      bg: "#F0F2F7", text: "#6B7A9A" },
  handoff:   { label: "Hand-off",   bg: "#F0F2F7", text: "#6B7A9A" },
  guardrail: { label: "Guardrail",  bg: "#FFD6E0", text: "#0A0A0A" },
  log:       { label: "Log",        bg: "#F0F2F7", text: "#6B7A9A" },
};

interface GrainOPBadgeProps {
  type: OPLabel;
  value?: string;
  className?: string;
}

export function GrainOPBadge({ type, value, className }: GrainOPBadgeProps) {
  const config = OP_BADGE_CONFIG[type];
  return (
    <span
      className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wide", className)}
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
      {value && <span className="font-normal normal-case tracking-normal">· {value}</span>}
    </span>
  );
}
