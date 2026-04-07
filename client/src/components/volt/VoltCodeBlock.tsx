/**
 * VoltCodeBlock – Kompakter Copy-Button als Karten-Footer
 *
 * Zwei Verwendungsmodi:
 *   footer  – Trennlinie oben + Padding, ideal direkt nach </VoltCardContent> innerhalb von <VoltCard>
 *   inline  – Kein Rahmen, nur der Button, für eingebettete Kontexte
 */

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoltCodeBlockProps {
  code: string;
  language?: "tsx" | "css" | "bash" | "ts";
  label?: string;
  /** footer: Trennlinie + Padding (Standard, für direkt in VoltCard) | inline: nur Button */
  mode?: "footer" | "inline";
  className?: string;
}

export const VoltCodeBlock: React.FC<VoltCodeBlockProps> = ({
  code,
  label,
  mode = "footer",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (mode === "inline") {
    return (
      <button
        onClick={handleCopy}
        title={copied ? "Kopiert!" : label ?? "CSS kopieren"}
        className={cn(
          "flex items-center gap-1.5 text-[11px] font-mono text-[#888888] hover:text-[#0A0A0A] transition-colors",
          className
        )}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-[#22c55e]" />
            <span className="text-[#22c55e]">Kopiert</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>{label ?? "CSS kopieren"}</span>
          </>
        )}
      </button>
    );
  }

  /* mode === "footer" */
  return (
    <div className={cn(
      "border-t border-border/60 px-5 py-3 flex items-center justify-between",
      className
    )}>
      <span className="text-[11px] font-mono text-muted-foreground/60">
        {label ?? "CSS"}
      </span>
      <button
        onClick={handleCopy}
        title={copied ? "Kopiert!" : "In Zwischenablage kopieren"}
        className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-[#22c55e]" />
            <span className="text-[#22c55e]">Kopiert</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Kopieren</span>
          </>
        )}
      </button>
    </div>
  );
};

export default VoltCodeBlock;
