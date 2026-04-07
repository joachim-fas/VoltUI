/**
 * VoltCodeBlock – Kompakter Copy-Chip im Volt-Stil
 *
 * Kein sichtbarer Code – ein kleiner, prägnanter Chip mit
 * Komponenten-Name und Copy-Button. Direkt unter dem Demo-Inhalt.
 */

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoltCodeBlockProps {
  code: string;
  language?: "tsx" | "css" | "bash" | "ts";
  /** Komponenten-Name oder Klassen-Name, z.B. "VoltButton" oder ".pattern-dots" */
  label?: string;
  className?: string;
}

export const VoltCodeBlock: React.FC<VoltCodeBlockProps> = ({
  code,
  label = "CSS",
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

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group inline-flex items-center gap-2 mt-4",
        "px-3 py-1.5 rounded-lg",
        "bg-[#0A0A0A] text-[#E4FF97]",
        "font-mono text-[11px] tracking-wide",
        "hover:bg-[#1a1a1a] transition-colors duration-150",
        "border border-[#2a2a2a]",
        className
      )}
      title={copied ? "Kopiert!" : `${label} kopieren`}
    >
      <span className="opacity-50 select-none">&gt;_</span>
      <span>{label}</span>
      <span className="w-px h-3 bg-[#E4FF97]/20 mx-0.5" />
      {copied ? (
        <Check className="w-3 h-3 text-[#E4FF97]" />
      ) : (
        <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
};

export default VoltCodeBlock;
