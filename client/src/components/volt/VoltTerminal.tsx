/**
 * VoltTerminal – Command-Line Interface Komponente
 *
 * Features:
 * - Interaktive Eingabe mit Befehlshistorie (↑/↓)
 * - Konfigurierbares Befehlsregister (commands-Prop)
 * - Syntax-Highlighting für Output-Zeilen (info · success · error · warning · command · comment)
 * - Schreibmaschinen-Effekt für initiale Ausgabe
 * - Varianten: dark (klassisch) · glass · minimal
 * - Größen: sm · md · lg
 * - Vollbild-Modus
 * - Copy-to-Clipboard für Output
 * - Blinkender Cursor
 */

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import {
  Terminal,
  X,
  Minus,
  Square,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Typen ── */
export type TerminalLineType =
  | "command"
  | "output"
  | "error"
  | "success"
  | "warning"
  | "info"
  | "comment"
  | "blank";

export interface TerminalLine {
  type: TerminalLineType;
  text: string;
  /** Verzögerung in ms vor Ausgabe (für Typewriter-Effekt) */
  delay?: number;
}

export interface TerminalCommand {
  /** Befehlsname (z.B. "help", "clear", "ls") */
  name: string;
  /** Kurzbeschreibung für help-Ausgabe */
  description?: string;
  /** Handler: gibt Array von TerminalLines zurück */
  handler: (args: string[]) => TerminalLine[];
}

export type TerminalVariant = "dark" | "glass" | "minimal";
export type TerminalSize = "sm" | "md" | "lg";

export interface VoltTerminalProps {
  /** Fenstername in der Titelleiste */
  title?: string;
  /** Prompt-Symbol */
  prompt?: string;
  /** Initiale Ausgabe beim Laden */
  initialOutput?: TerminalLine[];
  /** Registrierte Befehle */
  commands?: TerminalCommand[];
  /** Visueller Stil */
  variant?: TerminalVariant;
  /** Schriftgröße / Höhe */
  size?: TerminalSize;
  /** Maximale Höhe des Output-Bereichs */
  maxHeight?: string;
  /** Vollbild-Toggle anzeigen */
  allowFullscreen?: boolean;
  /** Fenster-Buttons (macOS-Stil) anzeigen */
  showWindowControls?: boolean;
  /** Schreibmaschinen-Effekt für initialOutput */
  typewriterEffect?: boolean;
  /** Callback wenn Befehl ausgeführt wird */
  onCommand?: (command: string, output: TerminalLine[]) => void;
  className?: string;
}

/* ── Hilfsfunktionen ── */
const lineTypeClass: Record<TerminalLineType, string> = {
  command:  "text-[#E4FF97]",
  output:   "text-[#C8C8C8]",
  error:    "text-[#FF6B6B]",
  success:  "text-[#6BFF9E]",
  warning:  "text-[#FFD166]",
  info:     "text-[#74C0FC]",
  comment:  "text-[#666666]",
  blank:    "",
};

const variantClasses: Record<TerminalVariant, {
  wrapper: string;
  header: string;
  body: string;
  input: string;
  border: string;
}> = {
  dark: {
    wrapper: "bg-[#0A0A0A] border border-[#1E1E1E] shadow-2xl",
    header:  "bg-[#141414] border-b border-[#1E1E1E]",
    body:    "bg-[#0A0A0A]",
    input:   "bg-transparent text-[#E4FF97] caret-[#E4FF97]",
    border:  "border-[#1E1E1E]",
  },
  glass: {
    wrapper: "bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl",
    header:  "bg-white/5 border-b border-white/10",
    body:    "bg-transparent",
    input:   "bg-transparent text-[#E4FF97] caret-[#E4FF97]",
    border:  "border-white/10",
  },
  minimal: {
    wrapper: "bg-[#111111] border border-[#2A2A2A] shadow-lg",
    header:  "bg-[#111111] border-b border-[#2A2A2A]",
    body:    "bg-[#111111]",
    input:   "bg-transparent text-[#E4FF97] caret-[#E4FF97]",
    border:  "border-[#2A2A2A]",
  },
};

const sizeClasses: Record<TerminalSize, { text: string; padding: string; height: string }> = {
  sm: { text: "text-xs",  padding: "px-3 py-1.5", height: "min-h-[200px]" },
  md: { text: "text-sm",  padding: "px-4 py-2",   height: "min-h-[300px]" },
  lg: { text: "text-base",padding: "px-5 py-3",   height: "min-h-[400px]" },
};

/* ── Default-Befehle ── */
const createDefaultCommands = (
  clearFn: () => void,
  allCommands: TerminalCommand[]
): TerminalCommand[] => [
  {
    name: "help",
    description: "Alle verfügbaren Befehle anzeigen",
    handler: () => [
      { type: "info",    text: "Verfügbare Befehle:" },
      { type: "blank",   text: "" },
      ...allCommands.map((cmd) => ({
        type: "output" as TerminalLineType,
        text: `  ${cmd.name.padEnd(16)} ${cmd.description ?? ""}`,
      })),
      { type: "blank",   text: "" },
      { type: "comment", text: "Tipp: Pfeiltasten ↑/↓ für Befehlshistorie" },
    ],
  },
  {
    name: "clear",
    description: "Terminal leeren",
    handler: () => {
      clearFn();
      return [];
    },
  },
  {
    name: "echo",
    description: "Text ausgeben",
    handler: (args) => [{ type: "output", text: args.join(" ") }],
  },
  {
    name: "date",
    description: "Aktuelles Datum und Uhrzeit",
    handler: () => [{ type: "output", text: new Date().toLocaleString("de-DE") }],
  },
  {
    name: "whoami",
    description: "Aktueller Benutzer",
    handler: () => [{ type: "success", text: "volt-user @ volt-ui" }],
  },
  {
    name: "version",
    description: "Volt UI Version",
    handler: () => [
      { type: "info",    text: "Volt UI Design System" },
      { type: "output",  text: "Version: 1.0.0" },
      { type: "comment", text: "Built with React + TypeScript + Tailwind CSS" },
    ],
  },
];

/* ── Hauptkomponente ── */
export const VoltTerminal: React.FC<VoltTerminalProps> = ({
  title = "volt-ui — terminal",
  prompt = ">_",
  initialOutput = [],
  commands: userCommands = [],
  variant = "dark",
  size = "md",
  maxHeight = "400px",
  allowFullscreen = true,
  showWindowControls = true,
  typewriterEffect = true,
  onCommand,
  className,
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [fullscreen, setFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const inputRef  = useRef<HTMLInputElement>(null);
  const bodyRef   = useRef<HTMLDivElement>(null);
  const clearRef  = useRef<() => void>(() => {});

  /* Cursor blinken */
  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  /* clear-Funktion via Ref bereitstellen (vor Befehlserstellung) */
  clearRef.current = () => setLines([]);

  /* Alle Befehle zusammenführen */
  const allCommands = [
    ...createDefaultCommands(() => clearRef.current(), [...userCommands, ...createDefaultCommands(() => {}, userCommands)]),
    ...userCommands,
  ];

  /* Initiale Ausgabe mit optionalem Typewriter-Effekt */
  useEffect(() => {
    if (!initialOutput.length) return;

    if (!typewriterEffect) {
      setLines(initialOutput);
      return;
    }

    let cumDelay = 0;
    initialOutput.forEach((line, i) => {
      const delay = line.delay ?? i * 60;
      cumDelay += delay;
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, cumDelay);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Auto-Scroll */
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  /* Befehl ausführen */
  const executeCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const [cmdName, ...args] = trimmed.split(/\s+/);

      // Befehl zur Ausgabe hinzufügen
      const commandLine: TerminalLine = { type: "command", text: `${prompt} ${trimmed}` };
      const cmd = allCommands.find((c) => c.name === cmdName.toLowerCase());

      let output: TerminalLine[];
      if (cmd) {
        output = cmd.handler(args);
      } else {
        output = [
          { type: "error", text: `Befehl nicht gefunden: ${cmdName}` },
          { type: "comment", text: `Tippe 'help' für eine Liste der Befehle.` },
        ];
      }

      setLines((prev) => [...prev, commandLine, ...output]);
      setHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
      setHistoryIdx(-1);
      onCommand?.(trimmed, output);
    },
    [allCommands, prompt, onCommand]
  );

  /* Tastatur-Handler */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : history[next] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Tab-Completion
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const match = allCommands.find((c) => c.name.startsWith(partial));
      if (match) setInput(match.name);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  /* Copy-to-Clipboard */
  const handleCopy = () => {
    const text = lines
      .map((l) => l.text)
      .filter(Boolean)
      .join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const vc = variantClasses[variant];
  const sc = sizeClasses[size];

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden font-mono transition-all duration-300",
        vc.wrapper,
        fullscreen && "fixed inset-4 z-50 rounded-2xl",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {/* ── Titelleiste ── */}
      <div className={cn("flex items-center justify-between px-4 py-2.5", vc.header)}>
        <div className="flex items-center gap-3">
          {showWindowControls && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 cursor-pointer transition-colors" title="Schließen" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 cursor-pointer transition-colors" title="Minimieren" />
              <div className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 cursor-pointer transition-colors" title="Vollbild" onClick={(e) => { e.stopPropagation(); setFullscreen(!fullscreen); }} />
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#666666]" />
            <span className="text-xs text-[#666666] tracking-wide select-none">{title}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); handleCopy(); }}
            className="w-6 h-6 flex items-center justify-center rounded text-[#444444] hover:text-[#888888] transition-colors"
            title="Output kopieren"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#6BFF9E]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          {allowFullscreen && (
            <button
              onClick={(e) => { e.stopPropagation(); setFullscreen(!fullscreen); }}
              className="w-6 h-6 flex items-center justify-center rounded text-[#444444] hover:text-[#888888] transition-colors"
              title={fullscreen ? "Vollbild beenden" : "Vollbild"}
            >
              {fullscreen
                ? <Minimize2 className="w-3.5 h-3.5" />
                : <Maximize2 className="w-3.5 h-3.5" />
              }
            </button>
          )}
        </div>
      </div>

      {/* ── Output-Bereich ── */}
      <div
        ref={bodyRef}
        className={cn(
          "overflow-y-auto scrollbar-thin scrollbar-thumb-[#2A2A2A] scrollbar-track-transparent",
          vc.body,
          sc.padding,
          sc.height,
          !fullscreen && `max-h-[${maxHeight}]`
        )}
        style={{ maxHeight: fullscreen ? undefined : maxHeight }}
      >
        <div className="space-y-0.5">
          {lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                "leading-relaxed whitespace-pre-wrap break-all",
                sc.text,
                lineTypeClass[line.type],
                line.type === "blank" && "h-2"
              )}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Eingabe-Zeile ── */}
      <div className={cn("flex items-center gap-2 border-t", vc.border, vc.body, sc.padding)}>
        <span className={cn("text-[#E4FF97] font-bold select-none flex-shrink-0", sc.text)}>
          {prompt}
        </span>
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full outline-none bg-transparent font-mono",
              sc.text,
              vc.input,
              "placeholder:text-[#333333]"
            )}
            placeholder="Befehl eingeben… (help für Hilfe)"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {/* Blinkender Cursor */}
          <span
            className={cn(
              "absolute pointer-events-none transition-opacity duration-100",
              sc.text,
              "text-[#E4FF97] font-bold",
              cursorVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ left: `${input.length}ch` }}
          >
            ▋
          </span>
        </div>
      </div>
    </div>
  );
};

/* ── VoltTerminalStatic: Nur Ausgabe, keine Eingabe ── */
export interface VoltTerminalStaticProps {
  title?: string;
  lines: TerminalLine[];
  variant?: TerminalVariant;
  size?: TerminalSize;
  maxHeight?: string;
  showWindowControls?: boolean;
  className?: string;
}

export const VoltTerminalStatic: React.FC<VoltTerminalStaticProps> = ({
  title = "output",
  lines,
  variant = "dark",
  size = "md",
  maxHeight = "300px",
  showWindowControls = true,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const vc = variantClasses[variant];
  const sc = sizeClasses[size];

  const handleCopy = () => {
    const text = lines.map((l) => l.text).filter(Boolean).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={cn("rounded-xl overflow-hidden font-mono", vc.wrapper, className)}>
      <div className={cn("flex items-center justify-between px-4 py-2.5", vc.header)}>
        <div className="flex items-center gap-3">
          {showWindowControls && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#666666]" />
            <span className="text-xs text-[#666666] tracking-wide select-none">{title}</span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="w-6 h-6 flex items-center justify-center rounded text-[#444444] hover:text-[#888888] transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#6BFF9E]" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div
        className={cn("overflow-y-auto", vc.body, sc.padding, sc.height)}
        style={{ maxHeight }}
      >
        <div className="space-y-0.5">
          {lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                "leading-relaxed whitespace-pre-wrap break-all",
                sc.text,
                lineTypeClass[line.type],
                line.type === "blank" && "h-2"
              )}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoltTerminal;
