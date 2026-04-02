/**
 * Theme Transformer v2.2
 * Lädt design-relevante Dateien via GitHub API (kein vollständiger Klon),
 * erkennt den Tech-Stack und transformiert UI-Komponenten zu Volt UI Äquivalenten.
 */

import axios from "axios";
import archiver from "archiver";
import { PassThrough } from "stream";
import { invokeLLM } from "./_core/llm";

// ─── Typen ───────────────────────────────────────────────────────────────────

export type TechStack = "react-tailwind" | "react-css" | "html-css" | "unknown";

export interface RepoFile {
  path: string;
  content: string;
  size: number;
}

export interface TransformResult {
  repoName: string;
  owner: string;
  stack: TechStack;
  filesScanned: number;
  filesTransformed: number;
  transformedFiles: TransformedFile[];
  log: string[];
}

export interface TransformedFile {
  path: string;
  originalContent: string;
  transformedContent: string;
  changes: string[];
  htmlPreview?: string; // Vollständiges HTML für iframe-Vorschau (vom LLM generiert)
}

// ─── Volt UI Komponenten-Mapping ─────────────────────────────────────────────

const VOLT_COMPONENT_MAP = {
  // React-Komponenten
  react: {
    Button: "VoltButton",
    Input: "VoltInput",
    Textarea: "VoltTextarea",
    Select: "VoltSelect",
    Card: "VoltCard",
    Badge: "VoltBadge",
    Modal: "VoltModal",
    Dialog: "VoltModal",
    Navbar: "VoltNavbar",
    Nav: "VoltNavbar",
    Sidebar: "VoltSidebar",
    Table: "VoltTable",
    Tabs: "VoltTabs",
    Alert: "VoltAlert",
    Toast: "VoltToast",
    Spinner: "VoltSpinner",
    Loader: "VoltSpinner",
    Avatar: "VoltAvatar",
    Dropdown: "VoltDropdown",
    Menu: "VoltMenu",
    Checkbox: "VoltCheckbox",
    Radio: "VoltRadio",
    Switch: "VoltSwitch",
    Toggle: "VoltSwitch",
    Tooltip: "VoltTooltip",
    Popover: "VoltPopover",
    Progress: "VoltProgress",
    Breadcrumb: "VoltBreadcrumb",
    Pagination: "VoltPagination",
  },
  // HTML-Elemente → Volt CSS-Klassen
  html: {
    button: ".volt-btn",
    input: ".volt-input",
    textarea: ".volt-textarea",
    select: ".volt-select",
    nav: ".volt-nav",
    table: ".volt-table",
  },
  // Tailwind-Klassen → Volt CSS-Klassen
  tailwind: {
    "bg-blue-500": "bg-primary",
    "bg-blue-600": "bg-primary",
    "bg-indigo-500": "bg-primary",
    "text-blue-500": "text-primary",
    "border-blue-500": "border-primary",
    "btn-primary": "volt-btn-primary",
    "btn-secondary": "volt-btn-secondary",
    "card": "volt-card",
    "badge": "volt-badge",
  },
};

// ─── GitHub API Helpers ───────────────────────────────────────────────────────

function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const patterns = [
    /github\.com\/([^/]+)\/([^/\s.]+)/,
    /^([^/]+)\/([^/\s.]+)$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
  }
  return null;
}

async function fetchGitHubTree(owner: string, repo: string, token?: string): Promise<any[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "VoltUI-ThemeAgent/2.2",
  };
  if (token) headers["Authorization"] = `token ${token}`;

  // Erst den default branch ermitteln
  const repoRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
    headers,
    timeout: 15_000,
  });
  const defaultBranch = repoRes.data.default_branch || "main";

  // Dann den vollständigen Dateibaum laden (recursive)
  const treeRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
    { headers, timeout: 15_000 }
  );
  return treeRes.data.tree || [];
}

async function fetchFileContent(
  owner: string,
  repo: string,
  path: string,
  token?: string
): Promise<string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3.raw",
    "User-Agent": "VoltUI-ThemeAgent/2.2",
  };
  if (token) headers["Authorization"] = `token ${token}`;

  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    { headers, timeout: 10_000 }
  );

  // GitHub gibt base64-kodierte Inhalte zurück
  if (res.data.encoding === "base64" && res.data.content) {
    return Buffer.from(res.data.content, "base64").toString("utf-8");
  }
  return typeof res.data === "string" ? res.data : "";
}

// ─── Stack-Erkennung ─────────────────────────────────────────────────────────

function detectStack(files: string[]): TechStack {
  const hasTailwind = files.some(
    f => f.includes("tailwind.config") || f.endsWith("tailwind.css")
  );
  const hasReact = files.some(
    f => f.endsWith(".tsx") || f.endsWith(".jsx") || f.includes("react")
  );
  const hasPackageJson = files.some(f => f === "package.json");
  const hasHtml = files.some(f => f.endsWith(".html"));
  const hasCss = files.some(f => f.endsWith(".css") || f.endsWith(".scss"));

  if (hasReact && hasTailwind) return "react-tailwind";
  if (hasReact && hasCss) return "react-css";
  if (hasHtml && hasCss) return "html-css";
  if (hasPackageJson && hasReact) return "react-css";
  return "unknown";
}

// ─── Design-relevante Dateien filtern ────────────────────────────────────────

const DESIGN_FILE_PATTERNS = [
  // React-Komponenten
  /\.(tsx|jsx)$/,
  // CSS/SCSS/Tailwind
  /\.(css|scss|sass|less)$/,
  // HTML-Dateien
  /\.html$/,
  // Tailwind-Config
  /tailwind\.config\.(js|ts|cjs|mjs)$/,
  // PostCSS-Config
  /postcss\.config\.(js|ts|cjs)$/,
  // Vite/Webpack-Config (für Font-Erkennung)
  /vite\.config\.(ts|js)$/,
];

const SKIP_PATTERNS = [
  /node_modules/,
  /\.git\//,
  /dist\//,
  /build\//,
  /\.next\//,
  /coverage\//,
  /\.test\.(tsx?|jsx?)$/,
  /\.spec\.(tsx?|jsx?)$/,
  /\.stories\.(tsx?|jsx?)$/,
  /\/__tests__\//,
  /\/test\//,
  /\/tests\//,
];

function isDesignRelevant(path: string): boolean {
  if (SKIP_PATTERNS.some(p => p.test(path))) return false;
  return DESIGN_FILE_PATTERNS.some(p => p.test(path));
}

// ─── LLM-Transformation ──────────────────────────────────────────────────────

async function transformFileWithLLM(
  file: RepoFile,
  stack: TechStack,
  log: string[]
): Promise<TransformedFile> {
  const componentMapStr = JSON.stringify(VOLT_COMPONENT_MAP, null, 2);

  const systemPrompt = `Du bist ein Code-Transformations-Experte für das Volt UI Design System.
Deine Aufgabe ist es, UI-Komponenten in bestehenden Projekten durch Volt UI Äquivalente zu ersetzen.

Tech-Stack: ${stack}

Volt UI Komponenten-Mapping:
${componentMapStr}

Volt UI Import-Pfad: "volt-ui" (npm-Paket)
Volt UI CSS: <link rel="stylesheet" href="volt-ui.css">

Regeln:
1. Ersetze ALLE UI-Komponenten durch Volt UI Äquivalente
2. Behalte die Logik (State, Events, Props) vollständig bei
3. Passe nur die Komponenten-Namen und CSS-Klassen an
4. Füge die notwendigen Volt UI Imports hinzu
5. Entferne alte Imports die nicht mehr benötigt werden
6. Bei React: Verwende VoltButton statt button/Button, VoltInput statt input/Input, etc.
7. Bei HTML: Füge Volt CSS-Klassen hinzu (volt-btn, volt-input, volt-card, etc.)
8. Bei Tailwind: Ersetze generische Klassen durch Volt-Klassen wo sinnvoll
9. Antworte NUR mit dem transformierten Code, ohne Erklärungen oder Markdown-Blöcke`;

  const userPrompt = `Transformiere diese Datei (${file.path}) zu Volt UI:

\`\`\`
${file.content.slice(0, 6000)}
\`\`\`

Antworte nur mit dem vollständigen transformierten Code.`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const rawContent = response.choices?.[0]?.message?.content;
    const transformed = (typeof rawContent === "string" ? rawContent : null) || file.content;

    // Änderungen erkennen (einfache Diff-Zusammenfassung)
    const changes: string[] = [];
    for (const [original, volt] of Object.entries(VOLT_COMPONENT_MAP.react)) {
      if (file.content.includes(original) && transformed.includes(volt)) {
        changes.push(`${original} → ${volt}`);
      }
    }
    if (transformed.includes("volt-ui")) changes.push("Volt UI Import hinzugefügt");

    log.push(`✓ Transformiert: ${file.path} (${changes.length} Änderungen)`);

    // HTML-Preview generieren: LLM konvertiert JSX zu vollständigem HTML
    let htmlPreview: string | undefined;
    try {
      const previewResponse = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `Du bist ein Experte für die Konvertierung von React/JSX zu statischem HTML.
Konvertiere den gegebenen React/JSX-Code in vollständiges, eigenständiges HTML das direkt im Browser gerendert werden kann.

Volt UI CSS-Variablen und Klassen:
- Farben: --volt-lime: #E4FF97, --volt-black: #0A0A0A, --volt-white: #FFFFFF
- Klassen: .volt-btn, .volt-btn-primary, .volt-card, .volt-input, .volt-nav, .volt-badge
- Fonts: Space Grotesk (Display), DM Sans (Body), JetBrains Mono (Code)

Regeln:
1. Gib NUR vollständiges HTML zurück (<!DOCTYPE html> bis </html>)
2. Ersetze JSX-Ausdrücke {variable} durch sinnvolle Platzhalter-Werte
3. Ersetze className= durch class=
4. Entferne alle React-Hooks, State, Event-Handler (nur statisches HTML)
5. Binde Google Fonts ein: Space Grotesk, DM Sans, JetBrains Mono
6. Verwende die Volt UI CSS-Variablen für Farben und Styling
7. Das Ergebnis soll wie eine fertige Volt UI Seite aussehen
8. Keine Erklärungen, nur HTML`,
          },
          {
            role: "user",
            content: `Konvertiere diesen transformierten Volt UI Code zu statischem HTML für die Vorschau:

${transformed.slice(0, 5000)}

Gib vollständiges HTML zurück das direkt im Browser gerendert werden kann.`,
          },
        ],
      });
      const rawHtml = previewResponse.choices?.[0]?.message?.content;
      if (typeof rawHtml === "string" && rawHtml.includes("<!DOCTYPE")) {
        htmlPreview = rawHtml;
      } else if (typeof rawHtml === "string") {
        // Falls kein vollständiges HTML, in Template einbetten
        htmlPreview = `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Volt UI Vorschau</title><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"><style>:root{--volt-lime:#E4FF97;--volt-black:#0A0A0A;--volt-white:#FFFFFF;--volt-background:#FFFFFF;--volt-foreground:#0A0A0A;--volt-muted:#F5F5F5;--volt-muted-fg:#6B6B6B;--volt-border:#E5E5E5;--volt-radius:8px;--volt-font-display:'Space Grotesk',sans-serif;--volt-font-body:'DM Sans',sans-serif;--volt-font-mono:'JetBrains Mono',monospace;}*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{font-family:var(--volt-font-body);background:var(--volt-background);color:var(--volt-foreground);line-height:1.5;padding:24px;}.volt-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:var(--volt-radius);font-family:var(--volt-font-body);font-weight:500;font-size:14px;cursor:pointer;border:none;transition:all 0.15s ease;}.volt-btn-primary{background:var(--volt-black);color:var(--volt-lime);}.volt-btn-secondary{background:var(--volt-muted);color:var(--volt-foreground);}.volt-input{width:100%;padding:10px 14px;border:1.5px solid var(--volt-border);border-radius:var(--volt-radius);font-family:var(--volt-font-body);font-size:14px;background:var(--volt-background);color:var(--volt-foreground);}.volt-card{background:var(--volt-background);border:1.5px solid var(--volt-border);border-radius:calc(var(--volt-radius)*1.5);padding:24px;}.volt-nav{display:flex;align-items:center;gap:8px;padding:12px 24px;background:var(--volt-black);}.volt-nav a{color:rgba(255,255,255,0.7);text-decoration:none;font-size:14px;}.volt-badge{display:inline-flex;align-items:center;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:500;}.volt-badge-primary{background:var(--volt-black);color:var(--volt-lime);}.flex{display:flex;}.flex-col{flex-direction:column;}.items-center{align-items:center;}.justify-between{justify-content:space-between;}.gap-2{gap:8px;}.gap-4{gap:16px;}.p-4{padding:16px;}.p-6{padding:24px;}.mb-4{margin-bottom:16px;}.w-full{width:100%;}.text-sm{font-size:14px;}.text-lg{font-size:18px;}.font-bold{font-weight:700;}.font-semibold{font-weight:600;}.rounded-lg{border-radius:8px;}.bg-white{background:#fff;}.border{border:1px solid #E5E5E5;}.grid{display:grid;}.grid-cols-2{grid-template-columns:repeat(2,1fr);}.grid-cols-3{grid-template-columns:repeat(3,1fr);}.space-y-4>*+*{margin-top:16px;}.max-w-5xl{max-width:1024px;}.mx-auto{margin-left:auto;margin-right:auto;}.container{max-width:1200px;margin:0 auto;padding:0 24px;}</style></head><body>${rawHtml}</body></html>`;
      }
    } catch (previewErr: unknown) {
      const previewMsg = previewErr instanceof Error ? previewErr.message : String(previewErr);
      log.push(`⚠ HTML-Vorschau für ${file.path} fehlgeschlagen: ${previewMsg}`);
    }

    return {
      path: file.path,
      originalContent: file.content,
      transformedContent: transformed,
      changes,
      htmlPreview,
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    log.push(`✗ Fehler bei ${file.path}: ${errMsg}`);
    return {
      path: file.path,
      originalContent: file.content,
      transformedContent: file.content,
      changes: [],
    };
  }
}

// ─── ZIP-Generator ────────────────────────────────────────────────────────────

export async function generateZip(files: TransformedFile[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const chunks: Buffer[] = [];
    const passThrough = new PassThrough();

    passThrough.on("data", chunk => chunks.push(Buffer.from(chunk)));
    passThrough.on("end", () => resolve(Buffer.concat(chunks)));
    passThrough.on("error", reject);

    archive.pipe(passThrough);

    // Transformierte Dateien hinzufügen
    for (const file of files) {
      archive.append(file.transformedContent, { name: file.path });
    }

    // volt-ui.css Stub hinzufügen
    archive.append(VOLT_UI_CSS_STUB, { name: "volt-ui.css" });

    // README hinzufügen
    archive.append(generateReadme(files), { name: "VOLT_UI_MIGRATION.md" });

    archive.finalize();
  });
}

// ─── Volt UI CSS Stub ─────────────────────────────────────────────────────────

const VOLT_UI_CSS_STUB = `/**
 * Volt UI – Design System CSS
 * Version: 2.2
 * 
 * Einbinden in HTML: <link rel="stylesheet" href="volt-ui.css">
 * Oder in CSS: @import 'volt-ui.css';
 */

:root {
  --volt-lime: #E4FF97;
  --volt-black: #0A0A0A;
  --volt-white: #FFFFFF;
  --volt-primary: #E4FF97;
  --volt-primary-fg: #0A0A0A;
  --volt-background: #FFFFFF;
  --volt-foreground: #0A0A0A;
  --volt-muted: #F5F5F5;
  --volt-muted-fg: #6B6B6B;
  --volt-border: #E5E5E5;
  --volt-radius: 8px;
  --volt-font-display: 'Space Grotesk', sans-serif;
  --volt-font-body: 'DM Sans', sans-serif;
  --volt-font-mono: 'JetBrains Mono', monospace;
  --signal-positive: #1A9E5A;
  --signal-negative: #E8402A;
  --signal-neutral: #6B7A9A;
}

/* Buttons */
.volt-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 20px; border-radius: var(--volt-radius);
  font-family: var(--volt-font-body); font-weight: 500;
  font-size: 14px; cursor: pointer; border: none;
  transition: all 0.15s ease;
}
.volt-btn-primary { background: var(--volt-black); color: var(--volt-lime); }
.volt-btn-primary:hover { opacity: 0.85; }
.volt-btn-secondary { background: var(--volt-muted); color: var(--volt-foreground); }
.volt-btn-outline { background: transparent; border: 1.5px solid var(--volt-border); color: var(--volt-foreground); }

/* Inputs */
.volt-input, .volt-textarea, .volt-select {
  width: 100%; padding: 10px 14px;
  border: 1.5px solid var(--volt-border); border-radius: var(--volt-radius);
  font-family: var(--volt-font-body); font-size: 14px;
  background: var(--volt-background); color: var(--volt-foreground);
  transition: border-color 0.15s ease;
}
.volt-input:focus, .volt-textarea:focus, .volt-select:focus {
  outline: none; border-color: var(--volt-black);
}

/* Cards */
.volt-card {
  background: var(--volt-background); border: 1.5px solid var(--volt-border);
  border-radius: calc(var(--volt-radius) * 1.5); padding: 24px;
}

/* Badges */
.volt-badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 10px; border-radius: 999px;
  font-size: 12px; font-weight: 500; font-family: var(--volt-font-body);
}
.volt-badge-primary { background: var(--volt-black); color: var(--volt-lime); }
.volt-badge-muted { background: var(--volt-muted); color: var(--volt-muted-fg); }

/* Navigation */
.volt-nav {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 24px; background: var(--volt-black);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.volt-nav a { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px; }
.volt-nav a:hover, .volt-nav a.active { color: var(--volt-lime); }

/* Tables */
.volt-table { width: 100%; border-collapse: collapse; }
.volt-table th {
  text-align: left; padding: 12px 16px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--volt-muted-fg);
  border-bottom: 1.5px solid var(--volt-border);
}
.volt-table td { padding: 12px 16px; border-bottom: 1px solid var(--volt-border); font-size: 14px; }
.volt-table tr:hover td { background: var(--volt-muted); }

/* Utility */
.volt-texture { position: relative; }
.volt-texture::after {
  content: ""; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
  pointer-events: none;
}
`;

// ─── README Generator ─────────────────────────────────────────────────────────

function generateReadme(files: TransformedFile[]): string {
  const totalChanges = files.reduce((sum, f) => sum + f.changes.length, 0);
  const changedFiles = files.filter(f => f.changes.length > 0);

  return `# Volt UI Migration

Dieses Paket enthält die von Volt UI transformierten Dateien deines Projekts.

## Zusammenfassung

- **Transformierte Dateien:** ${changedFiles.length} von ${files.length}
- **Gesamte Änderungen:** ${totalChanges}

## Integration

1. \`volt-ui.css\` in dein Projekt einbinden:
   \`\`\`html
   <link rel="stylesheet" href="volt-ui.css">
   \`\`\`

2. Bei React-Projekten: Volt UI npm-Paket installieren:
   \`\`\`bash
   npm install volt-ui
   \`\`\`

3. Die transformierten Dateien ersetzen die Originaldateien in deinem Projekt.

## Geänderte Dateien

${changedFiles.map(f => `### \`${f.path}\`\n${f.changes.map(c => `- ${c}`).join("\n")}`).join("\n\n")}

## Design Tokens

Alle Volt UI Design-Tokens sind in \`volt-ui.css\` als CSS Custom Properties definiert:

\`\`\`css
--volt-lime: #E4FF97;      /* Primärfarbe */
--volt-black: #0A0A0A;     /* Fundament */
--volt-radius: 8px;        /* Border Radius */
--volt-font-display: 'Space Grotesk', sans-serif;
--volt-font-body: 'DM Sans', sans-serif;
\`\`\`

---
*Generiert von Volt UI Theme Agent v2.2*
`;
}

// ─── Haupt-Funktion ───────────────────────────────────────────────────────────

export async function transformRepo(
  repoUrl: string,
  token?: string,
  onProgress?: (step: string) => void
): Promise<TransformResult> {
  const log: string[] = [];
  const progress = (msg: string) => {
    log.push(msg);
    onProgress?.(msg);
  };

  // 1. URL parsen
  const parsed = parseGitHubUrl(repoUrl);
  if (!parsed) throw new Error("Ungültige GitHub-URL. Format: https://github.com/owner/repo");
  const { owner, repo } = parsed;

  progress(`[1/5] Lade Repository-Struktur: ${owner}/${repo}`);

  // 2. Dateibaum laden
  let tree: any[];
  try {
    tree = await fetchGitHubTree(owner, repo, token);
  } catch (err: any) {
    if (err.response?.status === 404) {
      throw new Error(
        "Repository nicht gefunden oder privat. " +
        "Öffentliche Repos funktionieren ohne Token. " +
        "Für private Repos bitte einen GitHub Personal Access Token angeben."
      );
    }
    if (err.response?.status === 403) {
      throw new Error("GitHub API Rate Limit erreicht. Bitte später erneut versuchen oder einen Token angeben.");
    }
    throw new Error(`GitHub API Fehler: ${err.message}`);
  }

  // 3. Design-relevante Dateien filtern
  const designFiles = tree.filter(
    f => f.type === "blob" && isDesignRelevant(f.path) && f.size < 100_000
  );
  progress(`✓ ${designFiles.length} design-relevante Dateien gefunden (von ${tree.length} gesamt)`);

  // Stack erkennen
  const allPaths = tree.map((f: any) => f.path);
  const stack = detectStack(allPaths);
  progress(`✓ Tech-Stack erkannt: ${stack}`);

  // 4. Dateien laden (max. 30 für Performance)
  const filesToLoad = designFiles.slice(0, 30);
  progress(`[2/5] Lade ${filesToLoad.length} Dateien...`);

  const loadedFiles: RepoFile[] = [];
  for (const file of filesToLoad) {
    try {
      const content = await fetchFileContent(owner, repo, file.path, token);
      if (content.trim()) {
        loadedFiles.push({ path: file.path, content, size: file.size });
      }
    } catch {
      // Einzelne Datei-Fehler ignorieren
    }
  }
  progress(`✓ ${loadedFiles.length} Dateien geladen`);

  // 5. Transformation via LLM
  progress(`[3/5] Transformiere UI-Komponenten zu Volt UI...`);

  // Nur Dateien transformieren die tatsächlich UI-Komponenten enthalten
  const uiFiles = loadedFiles.filter(f =>
    f.content.includes("<") && // Hat HTML/JSX
    (f.path.endsWith(".tsx") || f.path.endsWith(".jsx") || f.path.endsWith(".html")) &&
    f.content.length > 100
  );

  const cssFiles = loadedFiles.filter(f =>
    f.path.endsWith(".css") || f.path.endsWith(".scss") || f.path.endsWith(".sass")
  );

  progress(`  → ${uiFiles.length} UI-Dateien, ${cssFiles.length} CSS-Dateien`);

  const transformedFiles: TransformedFile[] = [];

  // UI-Dateien transformieren (max. 10) – parallel für bessere Performance
  const uiSlice = uiFiles.slice(0, 10);
  progress(`  Starte parallele Transformation von ${uiSlice.length} Dateien...`);
  const transformedUiFiles = await Promise.all(
    uiSlice.map(async file => {
      progress(`  Transformiere: ${file.path}`);
      return transformFileWithLLM(file, stack, log);
    })
  );
  transformedFiles.push(...transformedUiFiles);

  // CSS-Dateien ohne LLM hinzufügen (werden durch volt-ui.css ersetzt)
  for (const file of cssFiles) {
    transformedFiles.push({
      path: file.path,
      originalContent: file.content,
      transformedContent: `/* Original CSS – wird durch volt-ui.css Tokens ergänzt */\n\n${file.content}`,
      changes: ["Volt UI CSS-Variablen als Referenz hinzugefügt"],
    });
  }

  progress(`[4/5] Generiere Download-Paket...`);
  progress(`✓ Transformation abgeschlossen`);

  return {
    repoName: repo,
    owner,
    stack,
    filesScanned: loadedFiles.length,
    filesTransformed: transformedFiles.filter(f => f.changes.length > 0).length,
    transformedFiles,
    log,
  };
}

// ─── Lokale Repo-Transformation (ZIP-Upload) ──────────────────────────────────

export interface LocalRepoFile {
  path: string;
  content: Buffer;
}

/**
 * Transformiert ein lokal hochgeladenes Repository (als ZIP-Buffer).
 * Extrahiert Dateien, erkennt den Stack und transformiert UI-Komponenten.
 */
export async function transformLocalRepo(
  zipBuffer: Buffer,
  repoName: string,
  onProgress?: (step: string) => void
): Promise<TransformResult> {
  const AdmZip = (await import("adm-zip")).default;
  const log: string[] = [];
  const progress = (msg: string) => {
    log.push(msg);
    onProgress?.(msg);
  };

  progress(`[1/5] Extrahiere ZIP-Archiv: ${repoName}`);

  // ZIP entpacken
  const zip = new AdmZip(zipBuffer);
  const entries = zip.getEntries();

  // Alle Pfade sammeln (für Stack-Erkennung)
  const allPaths = entries
    .filter(e => !e.isDirectory)
    .map(e => {
      // Entferne führendes Verzeichnis (z.B. "myrepo-main/src/..." → "src/...")
      const parts = e.entryName.split("/");
      return parts.length > 1 ? parts.slice(1).join("/") : e.entryName;
    });

  progress(`✓ ${allPaths.length} Dateien im Archiv gefunden`);

  // Stack erkennen
  const stack = detectStack(allPaths);
  progress(`✓ Tech-Stack erkannt: ${stack}`);

  // Design-relevante Dateien filtern und laden
  const loadedFiles: RepoFile[] = [];

  for (const entry of entries) {
    if (entry.isDirectory) continue;

    // Pfad normalisieren (führendes Verzeichnis entfernen)
    const parts = entry.entryName.split("/");
    const normalizedPath = parts.length > 1 ? parts.slice(1).join("/") : entry.entryName;

    if (!normalizedPath || !isDesignRelevant(normalizedPath)) continue;
    if (entry.header.size > 100_000) continue; // Zu große Dateien überspringen

    try {
      const content = entry.getData().toString("utf-8");
      if (content.trim()) {
        loadedFiles.push({ path: normalizedPath, content, size: entry.header.size });
      }
    } catch {
      // Binärdateien oder Encoding-Fehler ignorieren
    }
  }

  progress(`✓ ${loadedFiles.length} design-relevante Dateien geladen`);

  // 5. Transformation via LLM (gleiche Logik wie bei GitHub)
  progress(`[3/5] Transformiere UI-Komponenten zu Volt UI...`);

  const uiFiles = loadedFiles.filter(f =>
    f.content.includes("<") &&
    (f.path.endsWith(".tsx") || f.path.endsWith(".jsx") || f.path.endsWith(".html")) &&
    f.content.length > 100
  );

  const cssFiles = loadedFiles.filter(f =>
    f.path.endsWith(".css") || f.path.endsWith(".scss") || f.path.endsWith(".sass")
  );

  progress(`  → ${uiFiles.length} UI-Dateien, ${cssFiles.length} CSS-Dateien`);

  const transformedFiles: TransformedFile[] = [];

  // Parallel transformieren für bessere Performance
  const uiSliceLocal = uiFiles.slice(0, 10);
  progress(`  Starte parallele Transformation von ${uiSliceLocal.length} Dateien...`);
  const transformedUiFilesLocal = await Promise.all(
    uiSliceLocal.map(async file => {
      progress(`  Transformiere: ${file.path}`);
      return transformFileWithLLM(file, stack, log);
    })
  );
  transformedFiles.push(...transformedUiFilesLocal);

  for (const file of cssFiles) {
    transformedFiles.push({
      path: file.path,
      originalContent: file.content,
      transformedContent: `/* Original CSS – wird durch volt-ui.css Tokens ergänzt */\n\n${file.content}`,
      changes: ["Volt UI CSS-Variablen als Referenz hinzugefügt"],
    });
  }

  progress(`[4/5] Generiere Download-Paket...`);
  progress(`✓ Transformation abgeschlossen`);

  return {
    repoName,
    owner: "lokal",
    stack,
    filesScanned: loadedFiles.length,
    filesTransformed: transformedFiles.filter(f => f.changes.length > 0).length,
    transformedFiles,
    log,
  };
}
