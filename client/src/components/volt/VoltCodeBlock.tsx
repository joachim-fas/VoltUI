/**
 * VoltCodeBlock – Dezenter Copy-Button im Volt-Stil
 *
 * Kleines, transparentes Icon-Only-Element. Kein schwarzes Pill,
 * kein Lime-Text. Nur ein Copy-Icon das beim Hover sichtbar wird.
 * Passt sich dem umgebenden Hintergrund an.
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
        "group inline-flex items-center gap-1.5 mt-3",
        "px-2 py-1 rounded-md",
        "text-muted-foreground hover:text-foreground",
        "hover:bg-muted/60",
        "transition-all duration-150",
        "text-[11px] font-mono",
        className
      )}
      title={copied ? "Kopiert!" : `${label} kopieren`}
    >
      {copied ? (
        <Check className="w-3 h-3 text-foreground" />
      ) : (
        <Copy className="w-3 h-3 opacity-40 group-hover:opacity-80 transition-opacity" />
      )}
      <span className="opacity-50 group-hover:opacity-70 transition-opacity select-none">
        {copied ? "Kopiert" : label}
      </span>
    </button>
  );
};

export default VoltCodeBlock;
