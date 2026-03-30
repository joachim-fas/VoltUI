// GrainWorkflowCard – Operating Principle Component
// Design: Semantische Tokens für vollständigen Dark-Mode-Support
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

// Phase-Farben: intentional pastellig, aber mit dark: Variante für Text
const PHASE_CONFIG: Record<WorkflowPhase, {
  label: string;
  bgClass: string;
  borderClass: string;
  dotColor: string;
  icon: React.ReactNode;
}> = {
  input: {
    label: "Eingang",
    bgClass: "bg-[#D4E8FF] dark:bg-[#1A2A3A]",
    borderClass: "border-[#A8CEFF] dark:border-[#2A4A6A]",
    dotColor: "#7AB8F5",
    icon: <GitBranch size={14} />,
  },
  process: {
    label: "Ablauf",
    bgClass: "bg-[#FFF5BA] dark:bg-[#2A2510]",
    borderClass: "border-[#FFE87A] dark:border-[#4A4020]",
    dotColor: "#E8C840",
    icon: <Zap size={14} />,
  },
  output: {
    label: "Ergebnis",
    bgClass: "bg-[#C3F4D3] dark:bg-[#0A2A18]",
    borderClass: "border-[#7ADEA0] dark:border-[#1A5A30]",
    dotColor: "#6DDBA0",
    icon: <CheckCircle2 size={14} />,
  },
  proof: {
    label: "Wirkung",
    bgClass: "bg-[#E4FF97] dark:bg-[#1A2A00]",
    borderClass: "border-[#C8F050] dark:border-[#3A5A00]",
    dotColor: "#E4FF97",
    icon: <AlertCircle size={14} />,
  },
};

const STATUS_CONFIG: Record<WorkflowStatus, { label: string; colorClass: string }> = {
  pending:  { label: "Ausstehend", colorClass: "text-muted-foreground bg-muted" },
  active:   { label: "Aktiv",      colorClass: "text-[#0A0A0A] bg-[#E4FF97]" },
  done:     { label: "Fertig",     colorClass: "text-white bg-[#1A9E5A]" },
  blocked:  { label: "Blockiert",  colorClass: "text-white bg-[#E8402A]" },
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
            config.bgClass,
            config.borderClass
          )}
        >
          <span className="text-foreground">{config.icon}</span>
        </div>
        {!isLast && (
          <div className="w-px h-full min-h-[2rem] bg-border mt-1" />
        )}
      </div>
      <div className={cn("flex-1 pb-6 border rounded-xl p-4", config.borderClass, config.bgClass + "/30")}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            {config.label}
          </span>
          {status && (
            <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded-full", status.colorClass)}>
              {status.label}
            </span>
          )}
        </div>
        <p className="font-semibold text-foreground text-sm mb-1">{step.label}</p>
        <p className="text-muted-foreground text-xs leading-relaxed">{step.content}</p>

        {(step.owner || step.dod || step.handoff) && (
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-3">
            {step.owner && (
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <User size={11} />
                <span className="font-mono">{step.owner}</span>
              </div>
            )}
            {step.dod && (
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <CheckCircle2 size={11} />
                <span>DoD: {step.dod}</span>
              </div>
            )}
            {step.handoff && (
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
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
    <div className={cn("bg-card border border-border rounded-2xl p-6", className)}>
      <div className="mb-5">
        <h3 className="font-bold text-card-foreground text-base">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        )}
      </div>

      {compact ? (
        // Compact: horizontal flow
        <div className="flex items-center gap-2 flex-wrap">
          {steps.map((step, i) => {
            const config = PHASE_CONFIG[step.phase];
            return (
              <div key={i} className="flex items-center gap-2">
                <div className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium", config.bgClass, config.borderClass)}>
                  <span className="text-foreground">{config.icon}</span>
                  <span className="text-foreground">{step.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight size={14} className="text-muted-foreground shrink-0" />
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

// Pastell-Badges bleiben intentional farbig (Datenkodierung), aber Text wird semantisch
const OP_BADGE_CONFIG: Record<OPLabel, { label: string; bgColor: string; textClass: string }> = {
  input:     { label: "Eingang",    bgColor: "#D4E8FF", textClass: "text-[#0A3060]" },
  process:   { label: "Ablauf",     bgColor: "#FFF5BA", textClass: "text-[#4A3800]" },
  output:    { label: "Ergebnis",   bgColor: "#C3F4D3", textClass: "text-[#0A3020]" },
  proof:     { label: "Wirkung",    bgColor: "#E4FF97", textClass: "text-[#0A0A0A]" },
  dod:       { label: "DoD",        bgColor: "",        textClass: "text-muted-foreground bg-muted" },
  owner:     { label: "Owner",      bgColor: "",        textClass: "text-muted-foreground bg-muted" },
  handoff:   { label: "Hand-off",   bgColor: "",        textClass: "text-muted-foreground bg-muted" },
  guardrail: { label: "Guardrail",  bgColor: "#FFD6E0", textClass: "text-[#600A20]" },
  log:       { label: "Log",        bgColor: "",        textClass: "text-muted-foreground bg-muted" },
};

interface GrainOPBadgeProps {
  type: OPLabel;
  value?: string;
  className?: string;
}

export function GrainOPBadge({ type, value, className }: GrainOPBadgeProps) {
  const config = OP_BADGE_CONFIG[type];
  const style = config.bgColor ? { backgroundColor: config.bgColor } : {};
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wide",
        config.textClass,
        className
      )}
      style={style}
    >
      {config.label}
      {value && <span className="font-normal normal-case tracking-normal">· {value}</span>}
    </span>
  );
}
