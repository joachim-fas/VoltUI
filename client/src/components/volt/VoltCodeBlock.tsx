/**
 * VoltCodeBlock – Reiner Copy-Button
 * Kein sichtbarer Code – nur ein kleiner Button der den Inhalt in die Zwischenablage kopiert.
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
      title={copied ? "Kopiert!" : "CSS kopieren"}
      className={cn(
        "mt-3 flex items-center gap-1.5 text-[11px] font-mono text-[#888888] hover:text-[#0A0A0A] transition-colors",
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
          <span>CSS kopieren</span>
        </>
      )}
    </button>
  );
};

export default VoltCodeBlock;
