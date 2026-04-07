/**
 * VoltCommandBar – AI-Eingabefeld / Command-Bar Komponente
 *
 * Inspiriert von modernen AI-Interfaces (ChatGPT, Claude, Perplexity).
 * Gestaltet im Volt-UI-Stil: klare Typografie, dezente Borders, Lime-Accent.
 *
 * Varianten:
 *   default  – weißes Feld mit Border, für helle Hintergründe
 *   dark     – dunkles Feld für schwarze/dunkle Hintergründe
 *   ghost    – randlos, nur Hintergrundfarbe, für eingebettete Kontexte
 *
 * Größen: sm · md · lg
 *
 * Features:
 *   - Konfigurierbarer Prompt-Text
 *   - Linke Aktions-Slots (Anhang, Werkzeuge etc.)
 *   - Rechte Aktions-Slots (Mikrofon, Senden etc.)
 *   - Pill-Tags unter dem Feld (Vorschläge / Quick-Actions)
 *   - Fokus-Ring im Volt-Lime-Stil
 *   - Textarea mit Auto-Resize (Shift+Enter für Zeilenumbruch)
 *   - Submit via Enter
 */

import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  TextareaHTMLAttributes,
} from "react";
import {
  Plus,
  Mic,
  ArrowUp,
  Paperclip,
  Globe,
  Sparkles,
  Zap,
  Code2,
  FileText,
  Image,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Typen ── */
export type CommandBarVariant = "default" | "dark" | "ghost";
export type CommandBarSize    = "sm" | "md" | "lg";

export interface CommandBarAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export interface CommandBarSuggestion {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface VoltCommandBarProps {
  /** Placeholder-Text im Eingabefeld */
  placeholder?: string;
  /** Initialer Wert */
  defaultValue?: string;
  /** Kontrollierter Wert */
  value?: string;
  /** Änderungs-Handler */
  onChange?: (value: string) => void;
  /** Submit-Handler */
  onSubmit?: (value: string) => void;
  /** Aktionen links im Eingabefeld */
  leftActions?: CommandBarAction[];
  /** Aktionen rechts im Eingabefeld */
  rightActions?: CommandBarAction[];
  /** Pill-Vorschläge unterhalb */
  suggestions?: CommandBarSuggestion[];
  /** Visueller Stil */
  variant?: CommandBarVariant;
  /** Größe */
  size?: CommandBarSize;
  /** Maximale Zeilen für Auto-Resize */
  maxRows?: number;
  /** Deaktiviert */
  disabled?: boolean;
  /** Lade-Zustand (Submit-Button dreht sich) */
  loading?: boolean;
  /** Submit-Button ausblenden */
  hideSubmit?: boolean;
  className?: string;
}

/* ── Stil-Maps ── */
const variantMap: Record<CommandBarVariant, {
  wrapper: string;
  field:   string;
  border:  string;
  text:    string;
  placeholder: string;
  submit:  string;
  action:  string;
  suggestion: string;
}> = {
  default: {
    wrapper:     "",
    field:       "bg-white border border-[#E0E0E0] hover:border-[#C0C0C0] focus-within:border-[#0A0A0A] shadow-sm",
    border:      "border-[#E0E0E0]",
    text:        "text-[#0A0A0A] placeholder:text-[#AAAAAA]",
    placeholder: "text-[#AAAAAA]",
    submit:      "bg-[#0A0A0A] text-white hover:bg-[#222222]",
    action:      "text-[#888888] hover:text-[#0A0A0A] hover:bg-[#F5F5F5]",
    suggestion:  "bg-[#F5F5F5] text-[#444444] hover:bg-[#EBEBEB] border border-[#E8E8E8]",
  },
  dark: {
    wrapper:     "",
    field:       "bg-[#141414] border border-[#2A2A2A] hover:border-[#3A3A3A] focus-within:border-[#E4FF97] shadow-lg",
    border:      "border-[#2A2A2A]",
    text:        "text-[#F0F0F0] placeholder:text-[#555555]",
    placeholder: "text-[#555555]",
    submit:      "bg-[#E4FF97] text-[#0A0A0A] hover:bg-[#d4ef87]",
    action:      "text-[#555555] hover:text-[#CCCCCC] hover:bg-[#1E1E1E]",
    suggestion:  "bg-[#1A1A1A] text-[#888888] hover:bg-[#222222] border border-[#2A2A2A]",
  },
  ghost: {
    wrapper:     "",
    field:       "bg-[#F8F8F8] border border-transparent hover:border-[#E0E0E0] focus-within:border-[#0A0A0A] focus-within:bg-white",
    border:      "border-transparent",
    text:        "text-[#0A0A0A] placeholder:text-[#AAAAAA]",
    placeholder: "text-[#AAAAAA]",
    submit:      "bg-[#0A0A0A] text-white hover:bg-[#222222]",
    action:      "text-[#888888] hover:text-[#0A0A0A] hover:bg-white",
    suggestion:  "bg-white text-[#444444] hover:bg-[#F5F5F5] border border-[#E8E8E8]",
  },
};

const sizeMap: Record<CommandBarSize, {
  padding:  string;
  text:     string;
  radius:   string;
  iconSize: string;
  btnSize:  string;
  gap:      string;
}> = {
  sm: { padding: "px-3 py-2",   text: "text-sm",   radius: "rounded-xl",   iconSize: "w-4 h-4", btnSize: "w-7 h-7",   gap: "gap-1.5" },
  md: { padding: "px-4 py-3",   text: "text-base", radius: "rounded-2xl",  iconSize: "w-4 h-4", btnSize: "w-8 h-8",   gap: "gap-2"   },
  lg: { padding: "px-5 py-4",   text: "text-lg",   radius: "rounded-2xl",  iconSize: "w-5 h-5", btnSize: "w-9 h-9",   gap: "gap-2.5" },
};

/* ── Hauptkomponente ── */
export const VoltCommandBar: React.FC<VoltCommandBarProps> = ({
  placeholder = "Frag mich etwas…",
  defaultValue = "",
  value: controlledValue,
  onChange,
  onSubmit,
  leftActions,
  rightActions,
  suggestions,
  variant = "default",
  size = "md",
  maxRows = 6,
  disabled = false,
  loading = false,
  hideSubmit = false,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const vc = variantMap[variant];
  const sc = sizeMap[size];

  /* Auto-Resize */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 24;
    const maxHeight  = lineHeight * maxRows;
    el.style.height  = Math.min(el.scrollHeight, maxHeight) + "px";
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [value, maxRows]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setInternalValue(v);
    onChange?.(v);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!value.trim() || disabled || loading) return;
    onSubmit?.(value.trim());
    setInternalValue("");
    onChange?.("");
  };

  const hasValue = value.trim().length > 0;

  return (
    <div className={cn("w-full", className)}>
      {/* ── Eingabefeld ── */}
      <div className={cn(
        "relative flex flex-col transition-all duration-200",
        sc.radius,
        vc.field,
      )}>
        {/* Hauptzeile: linke Aktionen + Textarea + rechte Aktionen */}
        <div className={cn("flex items-center", sc.padding, sc.gap)}>
          {/* Linke Aktionen */}
          {leftActions && leftActions.length > 0 && (
            <div className={cn("flex items-center flex-shrink-0", sc.gap)}>
              {leftActions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.onClick}
                  title={action.label}
                  className={cn(
                    "flex items-center justify-center rounded-lg transition-colors flex-shrink-0",
                    sc.btnSize,
                    vc.action,
                    action.active && "bg-[#E4FF97] text-[#0A0A0A]",
                    disabled && "opacity-40 cursor-not-allowed"
                  )}
                  disabled={disabled}
                >
                  <span className={sc.iconSize}>{action.icon}</span>
                </button>
              ))}
            </div>
          )}

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              "flex-1 resize-none outline-none bg-transparent leading-relaxed",
              sc.text,
              vc.text,
              "min-h-[1.5em]",
              disabled && "cursor-not-allowed opacity-50"
            )}
            style={{ lineHeight: "1.6" }}
          />

          {/* Rechte Aktionen + Submit */}
          <div className={cn("flex items-center flex-shrink-0", sc.gap)}>
            {rightActions?.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                title={action.label}
                className={cn(
                  "flex items-center justify-center rounded-lg transition-colors flex-shrink-0",
                  sc.btnSize,
                  vc.action,
                  action.active && "bg-[#E4FF97] text-[#0A0A0A]",
                  disabled && "opacity-40 cursor-not-allowed"
                )}
                disabled={disabled}
              >
                <span className={sc.iconSize}>{action.icon}</span>
              </button>
            ))}

            {/* Submit-Button */}
            {!hideSubmit && (
              <button
                onClick={handleSubmit}
                disabled={disabled || loading || !hasValue}
                title="Senden (Enter)"
                className={cn(
                  "flex items-center justify-center rounded-full transition-all flex-shrink-0",
                  sc.btnSize,
                  vc.submit,
                  (!hasValue || disabled) && "opacity-30 cursor-not-allowed",
                  hasValue && !disabled && "opacity-100 scale-100",
                )}
              >
                {loading ? (
                  <svg className={cn("animate-spin", sc.iconSize)} viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                ) : (
                  <ArrowUp className={sc.iconSize} strokeWidth={2.5} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Suggestions / Quick-Actions ── */}
      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={s.onClick}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                vc.suggestion
              )}
            >
              {s.icon && <span className="w-3.5 h-3.5">{s.icon}</span>}
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── VoltCommandBarCentered: Hero-Layout mit Titel ── */
export interface VoltCommandBarCenteredProps extends VoltCommandBarProps {
  /** Großer Titel über dem Eingabefeld */
  title?: string;
  /** Untertitel */
  subtitle?: string;
}

export const VoltCommandBarCentered: React.FC<VoltCommandBarCenteredProps> = ({
  title,
  subtitle,
  ...props
}) => (
  <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
    {(title || subtitle) && (
      <div className="text-center space-y-2">
        {title && (
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground tracking-tight">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-muted-foreground font-body text-base">{subtitle}</p>
        )}
      </div>
    )}
    <VoltCommandBar {...props} className={cn("w-full", props.className)} />
  </div>
);

export default VoltCommandBar;
