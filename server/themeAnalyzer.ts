/**
 * Volt UI Theme Analyzer
 * Klont ein GitHub-Repo, scannt Design-relevante Dateien und extrahiert
 * Farben, Fonts und Spacing-Werte. Mappt diese auf Volt-Tokens.
 */

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

// ── Typen ──────────────────────────────────────────────────────────────────

export interface ExtractedColor {
  value: string;      // z.B. "#E4FF97"
  oklch?: string;     // z.B. "oklch(0.95 0.18 120)"
  usage: string[];    // z.B. ["primary", "button-bg"]
  count: number;
}

export interface ExtractedFont {
  family: string;     // z.B. "Inter"
  source: "google" | "system" | "custom" | "unknown";
  usage: string[];    // z.B. ["body", "heading"]
}

export interface DesignFile {
  path: string;
  type: "css" | "scss" | "tailwind-config" | "package-json" | "html" | "jsx" | "tsx" | "vue" | "svelte";
  relevance: "high" | "medium" | "low";
  size: number;
}

export interface VoltTokenMapping {
  // Primärfarbe → Volt Primary
  primary: string;
  // Hintergrundfarbe → Volt Background
  background: string;
  // Textfarbe → Volt Foreground
  foreground: string;
  // Akzentfarbe → Volt Accent
  accent: string;
  // Primäre Schrift → Volt Display Font
  fontDisplay: string;
  // Body-Schrift → Volt Body Font
  fontBody: string;
  // Border-Radius (dominant)
  borderRadius: string;
}

export interface AnalysisResult {
  repoUrl: string;
  repoName: string;
  colors: ExtractedColor[];
  fonts: ExtractedFont[];
  files: DesignFile[];
  tokenMapping: VoltTokenMapping;
  rawCssSnippets: string[];
  techStack: string[];
  analysisLog: string[];
}

// ── Hilfsfunktionen ────────────────────────────────────────────────────────

/** Konvertiert Hex-Farbe zu OKLCH-Näherung */
function hexToOklch(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Lineare Helligkeit (vereinfacht)
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const lightness = Math.round(Math.pow(L, 0.43) * 100) / 100;

  // Chroma-Näherung
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = Math.round((max - min) * 0.4 * 100) / 100;

  // Hue-Näherung
  let hue = 0;
  if (max !== min) {
    if (max === r) hue = ((g - b) / (max - min)) * 60;
    else if (max === g) hue = ((b - r) / (max - min)) * 60 + 120;
    else hue = ((r - g) / (max - min)) * 60 + 240;
    if (hue < 0) hue += 360;
  }

  return `oklch(${lightness} ${chroma} ${Math.round(hue)})`;
}

/** Normalisiert eine Farbe zu Hex */
function normalizeColor(raw: string): string | null {
  raw = raw.trim().toLowerCase();

  // Bereits Hex
  if (/^#[0-9a-f]{6}$/i.test(raw)) return raw.toUpperCase();
  if (/^#[0-9a-f]{3}$/i.test(raw)) {
    const r = raw[1], g = raw[2], b = raw[3];
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }

  // RGB
  const rgbMatch = raw.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return `#${parseInt(r!).toString(16).padStart(2, "0")}${parseInt(g!).toString(16).padStart(2, "0")}${parseInt(b!).toString(16).padStart(2, "0")}`.toUpperCase();
  }

  // HSL – vereinfachte Konvertierung
  const hslMatch = raw.match(/^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/);
  if (hslMatch) {
    const h = parseInt(hslMatch[1]!) / 360;
    const s = parseInt(hslMatch[2]!) / 100;
    const l = parseInt(hslMatch[3]!) / 100;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    const g = Math.round(hue2rgb(p, q, h) * 255);
    const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
  }

  return null;
}

/** Berechnet Luminanz einer Hex-Farbe (0=schwarz, 1=weiß) */
function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Prüft ob eine Farbe "interessant" ist (nicht zu grau, nicht transparent) */
function isInterestingColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;
  const luminance = getLuminance(hex);
  // Zu grau (fast weiß oder fast schwarz mit niedriger Sättigung) ausschließen
  if (saturation < 0.08 && luminance > 0.05 && luminance < 0.95) return false;
  return true;
}

// ── Design-Datei-Scanner ───────────────────────────────────────────────────

const DESIGN_FILE_PATTERNS: Record<string, DesignFile["type"]> = {
  ".css": "css",
  ".scss": "scss",
  ".sass": "scss",
};

const DESIGN_FILE_NAMES: Record<string, DesignFile["type"]> = {
  "tailwind.config.js": "tailwind-config",
  "tailwind.config.ts": "tailwind-config",
  "tailwind.config.cjs": "tailwind-config",
  "package.json": "package-json",
};

function classifyFile(filePath: string): DesignFile["type"] | null {
  const basename = path.basename(filePath);
  const ext = path.extname(filePath);

  if (DESIGN_FILE_NAMES[basename]) return DESIGN_FILE_NAMES[basename];
  if (DESIGN_FILE_PATTERNS[ext]) return DESIGN_FILE_PATTERNS[ext];

  if ([".jsx", ".tsx"].includes(ext)) return ext.slice(1) as "jsx" | "tsx";
  if (ext === ".html") return "html";
  if (ext === ".vue") return "vue";
  if (ext === ".svelte") return "svelte";

  return null;
}

function getRelevance(filePath: string, type: DesignFile["type"]): DesignFile["relevance"] {
  const lower = filePath.toLowerCase();
  if (type === "css" || type === "scss") {
    if (lower.includes("global") || lower.includes("main") || lower.includes("app") ||
        lower.includes("index") || lower.includes("theme") || lower.includes("variable") ||
        lower.includes("token") || lower.includes("design")) return "high";
    if (lower.includes("node_modules") || lower.includes("dist") || lower.includes(".min.")) return "low";
    return "medium";
  }
  if (type === "tailwind-config") return "high";
  if (type === "package-json" && lower.endsWith("package.json")) return "high";
  return "medium";
}

function scanDesignFiles(repoPath: string): DesignFile[] {
  const results: DesignFile[] = [];
  const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next", ".nuxt", "coverage", ".cache"]);

  function walk(dir: string, depth = 0) {
    if (depth > 6) return;
    let entries: fs.Dirent[];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
    catch { return; }

    for (const entry of entries) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, depth + 1);
      } else if (entry.isFile()) {
        const type = classifyFile(fullPath);
        if (!type) continue;
        const relPath = path.relative(repoPath, fullPath);
        const stat = fs.statSync(fullPath);
        if (stat.size > 500_000) continue; // Dateien > 500KB überspringen
        results.push({
          path: relPath,
          type,
          relevance: getRelevance(relPath, type),
          size: stat.size,
        });
      }
    }
  }

  walk(repoPath);
  return results.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.relevance] - order[b.relevance];
  });
}

// ── Farb-Extraktion ────────────────────────────────────────────────────────

const COLOR_PATTERNS = [
  // Hex-Farben
  /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g,
  // RGB
  /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g,
  // HSL
  /hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)/g,
];

function extractColorsFromContent(content: string, filePath: string): Map<string, string[]> {
  const colorMap = new Map<string, string[]>();

  for (const pattern of COLOR_PATTERNS) {
    const regex = new RegExp(pattern.source, "gi");
    let match;
    while ((match = regex.exec(content)) !== null) {
      const raw = match[0];
      const hex = normalizeColor(raw);
      if (!hex) continue;

      // Kontext extrahieren (Zeile vor dem Match)
      const lineStart = content.lastIndexOf("\n", match.index) + 1;
      const lineEnd = content.indexOf("\n", match.index);
      const line = content.slice(lineStart, lineEnd === -1 ? undefined : lineEnd).trim();

      const usages = colorMap.get(hex) || [];
      usages.push(`${path.basename(filePath)}: ${line.slice(0, 60)}`);
      colorMap.set(hex, usages);
    }
  }

  return colorMap;
}

// ── Font-Extraktion ────────────────────────────────────────────────────────

const GOOGLE_FONTS_PATTERN = /fonts\.googleapis\.com\/css[^"']*family=([^"'&]+)/gi;
const FONT_FAMILY_PATTERN = /font-family\s*:\s*([^;{}]+)/gi;

const SYSTEM_FONTS = new Set([
  "serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui",
  "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded",
  "arial", "helvetica", "times new roman", "georgia", "courier new",
  "verdana", "trebuchet ms", "impact", "comic sans ms",
]);

function extractFontsFromContent(content: string, filePath: string): Map<string, ExtractedFont> {
  const fontMap = new Map<string, ExtractedFont>();

  // Google Fonts via @import URL
  const gfRegex = new RegExp(GOOGLE_FONTS_PATTERN.source, "gi");
  let match;
  while ((match = gfRegex.exec(content)) !== null) {
    const families = decodeURIComponent(match[1]!).split("|");
    for (const family of families) {
      const name = family.split(":")[0]!.replace(/\+/g, " ").trim();
      if (!fontMap.has(name)) {
        fontMap.set(name, { family: name, source: "google", usage: [] });
      }
      fontMap.get(name)!.usage.push(path.basename(filePath));
    }
  }

  // font-family CSS-Deklarationen
  const ffRegex = new RegExp(FONT_FAMILY_PATTERN.source, "gi");
  while ((match = ffRegex.exec(content)) !== null) {
    const declaration = match[1]!;
    const families = declaration.split(",").map(f =>
      f.trim().replace(/^['"]|['"]$/g, "").trim()
    );
    for (const family of families) {
      if (!family || family.startsWith("var(") || family.startsWith("--")) continue;
      const lower = family.toLowerCase();
      if (SYSTEM_FONTS.has(lower)) continue;
      if (!fontMap.has(family)) {
        fontMap.set(family, {
          family,
          source: "unknown",
          usage: [path.basename(filePath)],
        });
      }
    }
  }

  return fontMap;
}

// ── Volt-Token-Mapping ─────────────────────────────────────────────────────

function mapToVoltTokens(
  colors: ExtractedColor[],
  fonts: ExtractedFont[]
): VoltTokenMapping {
  // Farben nach Luminanz sortieren
  const sorted = [...colors].sort((a, b) => {
    const la = getLuminance(a.value);
    const lb = getLuminance(b.value);
    return lb - la; // hell → dunkel
  });

  // Hintergrund: hellste Farbe (oder Weiß)
  const lightColors = sorted.filter(c => getLuminance(c.value) > 0.7);
  const darkColors = sorted.filter(c => getLuminance(c.value) < 0.15);
  const accentColors = colors.filter(c => isInterestingColor(c.value));

  const background = lightColors[0]?.value || "#FFFFFF";
  const foreground = darkColors[0]?.value || "#0A0A0A";

  // Primärfarbe: häufigste "interessante" Farbe
  const primary = accentColors.sort((a, b) => b.count - a.count)[0]?.value || "#E4FF97";

  // Akzent: zweithäufigste interessante Farbe
  const accent = accentColors.filter(c => c.value !== primary)[0]?.value || "#E4FF97";

  // Fonts mappen
  const displayFonts = fonts.filter(f =>
    f.usage.some(u => u.toLowerCase().includes("head") || u.toLowerCase().includes("display") || u.toLowerCase().includes("title"))
  );
  const bodyFonts = fonts.filter(f =>
    f.usage.some(u => u.toLowerCase().includes("body") || u.toLowerCase().includes("text") || u.toLowerCase().includes("para"))
  );

  const fontDisplay = displayFonts[0]?.family || fonts[0]?.family || "Space Grotesk";
  const fontBody = bodyFonts[0]?.family || fonts[1]?.family || fonts[0]?.family || "DM Sans";

  return {
    primary,
    background,
    foreground,
    accent,
    fontDisplay,
    fontBody,
    borderRadius: "8px",
  };
}

// ── Haupt-Analyse-Funktion ─────────────────────────────────────────────────

export async function analyzeGitRepo(repoUrl: string): Promise<AnalysisResult> {
  const log: string[] = [];
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "volt-agent-"));

  try {
    // 1. Repo klonen (shallow clone für Geschwindigkeit)
    log.push(`[1/5] Klone Repository: ${repoUrl}`);
    const cloneCmd = `git clone --depth=1 --single-branch "${repoUrl}" "${tmpDir}" 2>&1`;
    try {
      execSync(cloneCmd, { timeout: 60_000, stdio: "pipe" });
      log.push(`✓ Repository geklont nach ${tmpDir}`);
    } catch (err: any) {
      log.push(`✗ Fehler beim Klonen: ${err.message}`);
      throw new Error(`Git-Klon fehlgeschlagen: ${err.message}`);
    }

    const repoName = repoUrl.split("/").pop()?.replace(/\.git$/, "") || "unknown";

    // 2. Design-relevante Dateien scannen
    log.push("[2/5] Scanne Design-Dateien...");
    const files = scanDesignFiles(tmpDir);
    log.push(`✓ ${files.length} relevante Dateien gefunden`);

    // 3. Farben extrahieren
    log.push("[3/5] Extrahiere Farben...");
    const colorMap = new Map<string, { usage: string[]; count: number }>();

    for (const file of files.filter(f => f.relevance === "high" || f.relevance === "medium")) {
      const fullPath = path.join(tmpDir, file.path);
      let content: string;
      try { content = fs.readFileSync(fullPath, "utf-8"); }
      catch { continue; }

      const extracted = extractColorsFromContent(content, file.path);
      for (const [hex, usages] of Array.from(extracted)) {
        const existing = colorMap.get(hex) || { usage: [], count: 0 };
        existing.usage.push(...usages);
        existing.count += usages.length;
        colorMap.set(hex, existing);
      }
    }

    const colors: ExtractedColor[] = Array.from(colorMap.entries())
      .filter(([hex]) => isInterestingColor(hex))
      .map(([value, { usage, count }]) => ({
        value,
        oklch: hexToOklch(value),
        usage: Array.from(new Set(usage)).slice(0, 5),
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    log.push(`✓ ${colors.length} Farben extrahiert`);

    // 4. Fonts extrahieren
    log.push("[4/5] Extrahiere Schriften...");
    const fontMap = new Map<string, ExtractedFont>();

    for (const file of files.filter(f => f.relevance === "high" || f.relevance === "medium")) {
      const fullPath = path.join(tmpDir, file.path);
      let content: string;
      try { content = fs.readFileSync(fullPath, "utf-8"); }
      catch { continue; }

      const extracted = extractFontsFromContent(content, file.path);
      for (const [name, font] of Array.from(extracted)) {
        if (fontMap.has(name)) {
          fontMap.get(name)!.usage.push(...font.usage);
        } else {
          fontMap.set(name, font);
        }
      }
    }

    const fonts = Array.from(fontMap.values()).slice(0, 10);
    log.push(`✓ ${fonts.length} Schriften extrahiert`);

    // 5. Token-Mapping berechnen
    log.push("[5/5] Mappe auf Volt-Tokens...");
    const tokenMapping = mapToVoltTokens(colors, fonts);
    log.push("✓ Token-Mapping abgeschlossen");

    // Tech-Stack erkennen (vereinfacht)
    const techStack: string[] = [];
    const pkgJsonPath = path.join(tmpDir, "package.json");
    if (fs.existsSync(pkgJsonPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        if (deps.react) techStack.push("React");
        if (deps.vue) techStack.push("Vue");
        if (deps.svelte) techStack.push("Svelte");
        if (deps.tailwindcss) techStack.push("Tailwind CSS");
        if (deps.next) techStack.push("Next.js");
        if (deps.vite) techStack.push("Vite");
      } catch {}
    }

    return {
      repoUrl,
      repoName,
      colors,
      fonts,
      files: files.slice(0, 30),
      tokenMapping,
      rawCssSnippets: [],
      techStack,
      analysisLog: log,
    };
  } finally {
    // Cleanup: tmp-Verzeichnis löschen
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  }
}
