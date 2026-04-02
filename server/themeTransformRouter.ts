/**
 * Theme Transform Router v2.2
 * tRPC-Prozeduren für die Volt UI Komponenten-Transformation
 */

import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { transformRepo, generateZip } from "./themeTransformer";
import { TRPCError } from "@trpc/server";
import { tokenStore } from "./tokenRouter";

// In-Memory Cache für Transformations-Ergebnisse (für ZIP-Download)
const transformCache = new Map<string, {
  result: Awaited<ReturnType<typeof transformRepo>>;
  zipBuffer: Buffer;
  createdAt: number;
}>();

// Cache nach 30 Minuten bereinigen
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of Array.from(transformCache.entries())) {
    if (now - value.createdAt > 30 * 60 * 1000) {
      transformCache.delete(key);
    }
  }
}, 5 * 60 * 1000);

export const themeTransformRouter = router({
  /**
   * Analysiert ein GitHub-Repo und transformiert UI-Komponenten zu Volt UI.
   * Gibt das Ergebnis zurück und speichert es im Cache für den ZIP-Download.
   */
  transform: publicProcedure
    .input(
      z.object({
        repoUrl: z.string().min(1, "GitHub-URL ist erforderlich"),
        token: z.string().optional(), // Optionaler GitHub PAT (wird normalerweise aus tokenStore geladen)
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { repoUrl } = input;
      // Token-Priorität: 1. Direkt im Request, 2. Gespeicherter Token aus Memory-Store
      const userId = ctx.user?.id ?? 0;
      const token = input.token || tokenStore.get(userId);

      try {
        const result = await transformRepo(repoUrl, token);

        // ZIP generieren und cachen
        const zipBuffer = await generateZip(result.transformedFiles);
        const cacheKey = `${result.owner}-${result.repoName}-${Date.now()}`;

        transformCache.set(cacheKey, {
          result,
          zipBuffer,
          createdAt: Date.now(),
        });

        return {
          success: true,
          cacheKey,
          repoName: result.repoName,
          owner: result.owner,
          stack: result.stack,
          filesScanned: result.filesScanned,
          filesTransformed: result.filesTransformed,
          log: result.log,
          // Transformierte Dateien für die Vorschau (nur erste 5)
          previewFiles: result.transformedFiles.slice(0, 5).map(f => ({
            path: f.path,
            originalContent: f.originalContent.slice(0, 2000),
            transformedContent: f.transformedContent.slice(0, 2000),
            changes: f.changes,
          })),
          totalFiles: result.transformedFiles.length,
        };
      } catch (err: any) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: err.message || "Transformation fehlgeschlagen",
        });
      }
    }),

  /**
   * Gibt den ZIP-Download-Link für ein gecachtes Transformations-Ergebnis zurück.
   * Der eigentliche Download läuft über einen Express-Endpoint.
   */
  getDownloadUrl: publicProcedure
    .input(z.object({ cacheKey: z.string() }))
    .query(({ input }) => {
      const cached = transformCache.get(input.cacheKey);
      if (!cached) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Download nicht mehr verfügbar. Bitte erneut transformieren.",
        });
      }
      return {
        downloadUrl: `/api/theme-transform/download/${input.cacheKey}`,
        repoName: cached.result.repoName,
        filesCount: cached.result.transformedFiles.length,
      };
    }),
});

/**
 * Express-Handler für den ZIP-Download.
 * Wird in server/_core/index.ts registriert.
 */
export function handleZipDownload(req: any, res: any) {
  const { cacheKey } = req.params;
  const cached = transformCache.get(cacheKey);

  if (!cached) {
    return res.status(404).json({ error: "Download nicht mehr verfügbar" });
  }

  const filename = `volt-ui-${cached.result.repoName}.zip`;
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Length", cached.zipBuffer.length);
  res.send(cached.zipBuffer);
}

/**
 * Express-Handler für lokalen Repo-Upload (Multipart).
 * Wird in server/_core/index.ts registriert.
 */
export async function handleLocalRepoUpload(req: any, res: any) {
  const multer = (await import("multer")).default;
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 500 * 1024 * 1024 } });

  upload.single("repo")(req, res, async (err: any) => {
    if (err) {
      return res.status(400).json({ error: `Upload fehlgeschlagen: ${err.message}` });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Keine Datei hochgeladen" });
    }

    const zipBuffer = req.file.buffer;
    const repoName = req.body.repoName || req.file.originalname.replace(/\.zip$/i, "");

    try {
      const { transformLocalRepo, generateZip } = await import("./themeTransformer");
      const result = await transformLocalRepo(zipBuffer, repoName);

      // ZIP generieren und cachen
      const zipResultBuffer = await generateZip(result.transformedFiles);
      const cacheKey = `local-${repoName}-${Date.now()}`;

      transformCache.set(cacheKey, {
        result,
        zipBuffer: zipResultBuffer,
        createdAt: Date.now(),
      });

      return res.json({
        success: true,
        cacheKey,
        repoName: result.repoName,
        owner: result.owner,
        stack: result.stack,
        filesScanned: result.filesScanned,
        filesTransformed: result.filesTransformed,
        log: result.log,
        previewFiles: result.transformedFiles.slice(0, 5).map(f => ({
          path: f.path,
          originalContent: f.originalContent.slice(0, 2000),
          transformedContent: f.transformedContent.slice(0, 2000),
          changes: f.changes,
        })),
        totalFiles: result.transformedFiles.length,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || "Transformation fehlgeschlagen" });
    }
  });
}

/**
 * Express-Handler für HTML-Vorschau einer transformierten Datei.
 * Rendert das transformierte HTML/JSX als vollständige HTML-Seite mit volt-ui.css.
 * GET /api/theme-transform/preview/:cacheKey/:fileIndex
 */
export function handlePreview(req: any, res: any) {
  const { cacheKey, fileIndex } = req.params;
  const cached = transformCache.get(cacheKey);

  if (!cached) {
    return res.status(404).send("<html><body><p>Vorschau nicht mehr verfügbar. Bitte erneut transformieren.</p></body></html>");
  }

  const idx = parseInt(fileIndex, 10);
  const file = cached.result.transformedFiles[idx];

  if (!file) {
    return res.status(404).send("<html><body><p>Datei nicht gefunden.</p></body></html>");
  }

  // JSX/TSX zu HTML konvertieren (einfache Heuristik für Vorschau)
  let content = file.transformedContent;
  const isJSX = file.path.endsWith(".tsx") || file.path.endsWith(".jsx") || file.path.endsWith(".ts") || file.path.endsWith(".js");

  let bodyContent: string;

  if (isJSX) {
    // JSX: Extrahiere JSX-Markup aus return() Statement für Vorschau
    // Suche nach dem return-Block und extrahiere JSX
    const returnMatch = content.match(/return\s*\(\s*([\s\S]*?)\s*\);\s*\}?\s*$/m);
    const jsxContent = returnMatch ? returnMatch[1] : content;

    // Einfache JSX → HTML Konvertierung für Vorschau
    let html = jsxContent
      .replace(/className=/g, "class=")
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "") // JSX-Kommentare entfernen
      .replace(/\{[^}]*\}/g, (m) => {
        // Einfache Ausdrücke: Strings direkt einsetzen, Variablen als Platzhalter
        const inner = m.slice(1, -1).trim();
        if (inner.startsWith('"') || inner.startsWith("'")) return inner.slice(1, -1);
        if (inner === "true") return "";
        if (inner === "false") return "";
        return `<span class="preview-placeholder" style="background:#E4FF97;color:#0A0A0A;padding:2px 6px;border-radius:4px;font-size:11px;font-family:monospace">{${inner}}</span>`;
      })
      .replace(/<>/g, "<div>")
      .replace(/<\/>/g, "</div>")
      .replace(/\bclassName\b/g, "class");

    bodyContent = `
      <div class="preview-wrapper" style="padding:24px;font-family:'DM Sans',sans-serif;">
        <div class="preview-notice" style="background:#F5F5F5;border:1px solid #E5E5E5;border-radius:8px;padding:10px 14px;margin-bottom:20px;font-size:12px;color:#6B6B6B;font-family:monospace;">
          📄 ${file.path} — Volt UI Vorschau (JSX-Rendering)
        </div>
        ${html}
      </div>`;
  } else {
    // HTML: direkt rendern
    bodyContent = content;
  }

  // Vollständige HTML-Seite mit volt-ui.css
  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Volt UI Vorschau – ${file.path}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    /* Volt UI CSS */
    :root {
      --volt-lime: #E4FF97;
      --volt-black: #0A0A0A;
      --volt-white: #FFFFFF;
      --volt-background: #FFFFFF;
      --volt-foreground: #0A0A0A;
      --volt-muted: #F5F5F5;
      --volt-muted-fg: #6B6B6B;
      --volt-border: #E5E5E5;
      --volt-radius: 8px;
      --volt-font-display: 'Space Grotesk', sans-serif;
      --volt-font-body: 'DM Sans', sans-serif;
      --volt-font-mono: 'JetBrains Mono', monospace;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--volt-font-body); background: var(--volt-background); color: var(--volt-foreground); line-height: 1.5; }
    .volt-btn { display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:var(--volt-radius);font-family:var(--volt-font-body);font-weight:500;font-size:14px;cursor:pointer;border:none;transition:all 0.15s ease; }
    .volt-btn-primary { background:var(--volt-black);color:var(--volt-lime); }
    .volt-btn-primary:hover { opacity:0.85; }
    .volt-btn-secondary { background:var(--volt-muted);color:var(--volt-foreground); }
    .volt-btn-outline { background:transparent;border:1.5px solid var(--volt-border);color:var(--volt-foreground); }
    .volt-input,.volt-textarea,.volt-select { width:100%;padding:10px 14px;border:1.5px solid var(--volt-border);border-radius:var(--volt-radius);font-family:var(--volt-font-body);font-size:14px;background:var(--volt-background);color:var(--volt-foreground);transition:border-color 0.15s ease; }
    .volt-input:focus,.volt-textarea:focus,.volt-select:focus { outline:none;border-color:var(--volt-black); }
    .volt-card { background:var(--volt-background);border:1.5px solid var(--volt-border);border-radius:calc(var(--volt-radius)*1.5);padding:24px; }
    .volt-badge { display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:500; }
    .volt-badge-primary { background:var(--volt-black);color:var(--volt-lime); }
    .volt-badge-muted { background:var(--volt-muted);color:var(--volt-muted-fg); }
    .volt-nav { display:flex;align-items:center;gap:8px;padding:12px 24px;background:var(--volt-black);border-bottom:1px solid rgba(255,255,255,0.1); }
    .volt-nav a { color:rgba(255,255,255,0.7);text-decoration:none;font-size:14px; }
    .volt-nav a:hover,.volt-nav a.active { color:var(--volt-lime); }
    .volt-table { width:100%;border-collapse:collapse; }
    .volt-table th { text-align:left;padding:12px 16px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--volt-muted-fg);border-bottom:1.5px solid var(--volt-border); }
    .volt-table td { padding:12px 16px;border-bottom:1px solid var(--volt-border);font-size:14px; }
    .volt-table tr:hover td { background:var(--volt-muted); }
    /* Tailwind-ähnliche Utility-Klassen für JSX-Vorschau */
    .flex { display:flex; } .flex-col { flex-direction:column; } .items-center { align-items:center; }
    .justify-between { justify-content:space-between; } .justify-center { justify-content:center; }
    .gap-2 { gap:8px; } .gap-3 { gap:12px; } .gap-4 { gap:16px; } .gap-6 { gap:24px; }
    .p-4 { padding:16px; } .p-6 { padding:24px; } .p-8 { padding:32px; }
    .px-4 { padding-left:16px;padding-right:16px; } .py-2 { padding-top:8px;padding-bottom:8px; }
    .px-6 { padding-left:24px;padding-right:24px; } .py-4 { padding-top:16px;padding-bottom:16px; }
    .mt-2 { margin-top:8px; } .mt-4 { margin-top:16px; } .mb-2 { margin-bottom:8px; } .mb-4 { margin-bottom:16px; }
    .w-full { width:100%; } .h-full { height:100%; } .min-h-screen { min-height:100vh; }
    .text-sm { font-size:14px; } .text-xs { font-size:12px; } .text-lg { font-size:18px; } .text-xl { font-size:20px; } .text-2xl { font-size:24px; } .text-3xl { font-size:30px; }
    .font-bold { font-weight:700; } .font-semibold { font-weight:600; } .font-medium { font-weight:500; }
    .text-white { color:#fff; } .text-black { color:#000; }
    .bg-white { background:#fff; } .bg-black { background:#000; }
    .rounded { border-radius:4px; } .rounded-lg { border-radius:8px; } .rounded-xl { border-radius:12px; } .rounded-full { border-radius:999px; }
    .border { border:1px solid #E5E5E5; } .border-b { border-bottom:1px solid #E5E5E5; }
    .shadow { box-shadow:0 1px 3px rgba(0,0,0,0.1); } .shadow-lg { box-shadow:0 10px 25px rgba(0,0,0,0.1); }
    .grid { display:grid; } .grid-cols-2 { grid-template-columns:repeat(2,1fr); } .grid-cols-3 { grid-template-columns:repeat(3,1fr); }
    .space-y-4 > * + * { margin-top:16px; } .space-y-6 > * + * { margin-top:24px; }
    .opacity-50 { opacity:0.5; } .cursor-pointer { cursor:pointer; }
    .overflow-hidden { overflow:hidden; } .relative { position:relative; } .absolute { position:absolute; }
    .inset-0 { top:0;right:0;bottom:0;left:0; } .z-10 { z-index:10; }
    .max-w-5xl { max-width:1024px; } .max-w-2xl { max-width:672px; } .mx-auto { margin-left:auto;margin-right:auto; }
    .container { max-width:1200px;margin:0 auto;padding:0 24px; }
    .hidden { display:none; } .block { display:block; } .inline-flex { display:inline-flex; } .inline-block { display:inline-block; }
    .truncate { overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
    .leading-relaxed { line-height:1.625; } .leading-tight { line-height:1.25; }
    .tracking-wide { letter-spacing:0.025em; } .tracking-widest { letter-spacing:0.1em; }
    .uppercase { text-transform:uppercase; } .capitalize { text-transform:capitalize; }
    .italic { font-style:italic; }
    .transition { transition:all 0.15s ease; }
    .hover\\:opacity-90:hover { opacity:0.9; }
  </style>
</head>
<body>
${bodyContent}
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(html);
}
