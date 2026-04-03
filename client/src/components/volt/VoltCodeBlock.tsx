/**
 * VoltCodeBlock – Kompaktes CSS-Snippet mit Copy-Button
 * Kein Syntax-Highlighting, keine Zeilennummern – nur der Code und ein Copy-Button.
 * Einzeilig für kurze Snippets, mehrzeilig für längere (scrollbar).
 */

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoltCodeBlockProps {
  code: string;
  language?: "tsx" | "css" | "bash" | "ts";
  label?: string;
  className?: string;
}

export const VoltCodeBlock: React.FC<VoltCodeBlockProps> = ({
  code,
  label,
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

  const isMultiline = code.includes("\n");

  return (
    <div className={cn(
      "flex items-start justify-between gap-3 rounded-lg bg-[#F5F5F5] border border-[#E8E8E8] px-3 py-2 mt-3",
      className
    )}>
      <code className={cn(
        "font-mono text-xs text-[#333333] flex-1 min-w-0",
        isMultiline ? "whitespace-pre overflow-x-auto" : "truncate"
      )}>
        {code}
      </code>
      <button
        onClick={handleCopy}
        title="Kopieren"
        className="flex-shrink-0 flex items-center gap-1 text-[11px] font-mono text-[#888888] hover:text-[#0A0A0A] transition-colors"
      >
        {copied
          ? <><Check className="w-3.5 h-3.5 text-[#22c55e]" /><span className="text-[#22c55e]">Kopiert</span></>
          : <><Copy className="w-3.5 h-3.5" /><span>CSS kopieren</span></>
        }
      </button>
    </div>
  );
};

export default VoltCodeBlock;
