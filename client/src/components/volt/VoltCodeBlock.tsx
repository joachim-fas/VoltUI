/**
 * VoltCodeBlock – Code-Anzeige mit Syntax-Highlighting und Copy-Button
 * Unterstützt TSX/JSX und CSS-Code-Snippets
 */

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface VoltCodeBlockProps {
  code: string;
  language?: "tsx" | "css" | "bash" | "ts";
  label?: string;
  className?: string;
}

// Einfaches Syntax-Highlighting via regex
function highlight(code: string, language: string): React.ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, i) => (
    <div key={i} className="table-row">
      <span className="table-cell pr-4 select-none text-right text-[10px] text-muted-foreground/40 w-8 min-w-[2rem]">
        {i + 1}
      </span>
      <span className="table-cell">
        {highlightLine(line, language)}
      </span>
    </div>
  ));
}

function highlightLine(line: string, language: string): React.ReactNode {
  if (language === "css") {
    return highlightCSS(line);
  }
  return highlightTSX(line);
}

function highlightCSS(line: string): React.ReactNode {
  // CSS: property: value; und Selektoren
  const cssPropertyRegex = /^(\s*)([\w-]+)(\s*:\s*)(.+?)(;?)(\s*\/\*.*\*\/)?$/;
  const selectorRegex = /^(\s*)([\w.#:[\](),\s>~+*-]+)(\s*\{)$/;
  const commentRegex = /^(\s*)(\/\*.*\*\/)(\s*)$/;
  const varRegex = /(--[\w-]+)/g;

  if (commentRegex.test(line)) {
    return <span className="text-muted-foreground/60 italic">{line}</span>;
  }

  if (selectorRegex.test(line)) {
    const m = line.match(selectorRegex)!;
    return (
      <>
        <span>{m[1]}</span>
        <span className="text-[#E4FF97]">{m[2]}</span>
        <span className="text-muted-foreground">{m[3]}</span>
      </>
    );
  }

  if (cssPropertyRegex.test(line)) {
    const m = line.match(cssPropertyRegex)!;
    const value = m[4].replace(varRegex, (v) => `<VAR>${v}</VAR>`);
    const parts = value.split(/(<VAR>.*?<\/VAR>)/);
    return (
      <>
        <span>{m[1]}</span>
        <span className="text-[#93C5FD]">{m[2]}</span>
        <span className="text-muted-foreground">{m[3]}</span>
        {parts.map((p, i) =>
          p.startsWith("<VAR>") ? (
            <span key={i} className="text-[#FCA5A5]">{p.replace(/<\/?VAR>/g, "")}</span>
          ) : (
            <span key={i} className="text-[#86EFAC]">{p}</span>
          )
        )}
        <span className="text-muted-foreground">{m[5]}</span>
      </>
    );
  }

  return <span className="text-foreground/80">{line}</span>;
}

function highlightTSX(line: string): React.ReactNode {
  // Einfaches TSX-Highlighting
  const tokens: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  // Kommentare
  if (/^\s*\/\//.test(remaining) || /^\s*\*/.test(remaining)) {
    return <span className="text-muted-foreground/60 italic">{line}</span>;
  }

  // Import-Zeilen
  if (/^\s*import\s/.test(remaining)) {
    const importMatch = remaining.match(/^(\s*)(import)(\s+)(.*?)(\s+from\s+)(['"].*['"])/);
    if (importMatch) {
      return (
        <>
          <span>{importMatch[1]}</span>
          <span className="text-[#C084FC]">{importMatch[2]}</span>
          <span>{importMatch[3]}</span>
          <span className="text-foreground/80">{importMatch[4]}</span>
          <span className="text-[#C084FC]">{importMatch[5]}</span>
          <span className="text-[#86EFAC]">{importMatch[6]}</span>
        </>
      );
    }
  }

  // JSX-Tags mit Props
  const tagRegex = /<\/?([A-Z][A-Za-z0-9]*|[a-z][a-z0-9-]*)([^>]*?)(\s*\/?>)/g;
  const propRegex = /(\s+)([\w-]+)(=)(\{[^}]*\}|"[^"]*"|'[^']*')/g;

  let lastIndex = 0;
  let match;

  while ((match = tagRegex.exec(remaining)) !== null) {
    // Text vor dem Tag
    if (match.index > lastIndex) {
      const before = remaining.slice(lastIndex, match.index);
      tokens.push(<span key={key++} className="text-foreground/80">{before}</span>);
    }

    const fullTag = match[0];
    const tagName = match[1];
    const propsStr = match[2];
    const closing = match[3];

    // Tag-Name
    const isComponent = /^[A-Z]/.test(tagName);
    tokens.push(
      <span key={key++} className="text-muted-foreground">{"<"}{fullTag.startsWith("</") ? "/" : ""}</span>
    );
    tokens.push(
      <span key={key++} className={isComponent ? "text-[#93C5FD]" : "text-[#86EFAC]"}>{tagName}</span>
    );

    // Props
    let propMatch;
    propRegex.lastIndex = 0;
    let propLastIndex = 0;
    const propTokens: React.ReactNode[] = [];

    while ((propMatch = propRegex.exec(propsStr)) !== null) {
      if (propMatch.index > propLastIndex) {
        propTokens.push(<span key={key++} className="text-foreground/80">{propsStr.slice(propLastIndex, propMatch.index)}</span>);
      }
      propTokens.push(<span key={key++} className="text-muted-foreground">{propMatch[1]}</span>);
      propTokens.push(<span key={key++} className="text-[#FCA5A5]">{propMatch[2]}</span>);
      propTokens.push(<span key={key++} className="text-muted-foreground">=</span>);
      propTokens.push(<span key={key++} className="text-[#E4FF97]">{propMatch[4]}</span>);
      propLastIndex = propMatch.index + propMatch[0].length;
    }

    if (propLastIndex < propsStr.length) {
      propTokens.push(<span key={key++} className="text-foreground/80">{propsStr.slice(propLastIndex)}</span>);
    }

    tokens.push(...propTokens);
    tokens.push(<span key={key++} className="text-muted-foreground">{closing}</span>);

    lastIndex = match.index + fullTag.length;
  }

  // Rest
  if (lastIndex < remaining.length) {
    const rest = remaining.slice(lastIndex);
    // String-Literale
    const strRest = rest.replace(/(".*?"|'.*?'|`.*?`)/g, (s) => `<STR>${s}</STR>`);
    const parts = strRest.split(/(<STR>.*?<\/STR>)/);
    parts.forEach((p) => {
      if (p.startsWith("<STR>")) {
        tokens.push(<span key={key++} className="text-[#86EFAC]">{p.replace(/<\/?STR>/g, "")}</span>);
      } else if (p) {
        // Keywords
        const kwRest = p.replace(/\b(const|let|var|return|export|default|function|interface|type|extends|implements|if|else|for|while|class|new|this|true|false|null|undefined|async|await|void)\b/g,
          (kw) => `<KW>${kw}</KW>`);
        const kwParts = kwRest.split(/(<KW>.*?<\/KW>)/);
        kwParts.forEach((kp) => {
          if (kp.startsWith("<KW>")) {
            tokens.push(<span key={key++} className="text-[#C084FC]">{kp.replace(/<\/?KW>/g, "")}</span>);
          } else if (kp) {
            tokens.push(<span key={key++} className="text-foreground/80">{kp}</span>);
          }
        });
      }
    });
  }

  return tokens.length > 0 ? <>{tokens}</> : <span className="text-foreground/80">{line}</span>;
}

export const VoltCodeBlock: React.FC<VoltCodeBlockProps> = ({
  code,
  language = "tsx",
  label,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const langLabel = label || language.toUpperCase();

  return (
    <div className={`mt-4 rounded-xl border border-border overflow-hidden bg-[#0A0A0A] ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{langLabel}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all duration-200
            text-white/40 hover:text-white/80 hover:bg-white/10 active:scale-95"
          title="Code kopieren"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#E4FF97]" />
              <span className="text-[#E4FF97]">Kopiert</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Kopieren</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <div className="table w-full min-w-full p-4 font-mono text-[12px] leading-relaxed">
          {highlight(code, language)}
        </div>
      </div>
    </div>
  );
};

export default VoltCodeBlock;
