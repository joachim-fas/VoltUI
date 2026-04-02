/**
 * Theme Transform Router v2.3
 * tRPC-Prozeduren für die Volt UI Komponenten-Transformation
 */

import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { transformRepo, generateZip } from "./themeTransformer";
import { TRPCError } from "@trpc/server";
import { tokenStore } from "./tokenRouter";
import type { Request, Response } from "express";

// --- LRU-Cache mit TTL ---
// Max. 50 Einträge + TTL 30 Minuten um Memory-Leaks zu verhindern
const CACHE_MAX_SIZE = 50;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 Minuten

type CacheEntry = {
  result: Awaited<ReturnType<typeof transformRepo>>;
  zipBuffer: Buffer;
  createdAt: number;
};

const transformCache = new Map<string, CacheEntry>();

function cacheSet(key: string, value: CacheEntry): void {
  // LRU: ältesten Eintrag entfernen wenn Limit erreicht
  if (transformCache.size >= CACHE_MAX_SIZE) {
    let oldestKey = "";
    let oldestTime = Infinity;
    for (const [k, v] of Array.from(transformCache.entries())) {
      if (v.createdAt < oldestTime) {
        oldestTime = v.createdAt;
        oldestKey = k;
      }
    }
    if (oldestKey) transformCache.delete(oldestKey);
  }
  transformCache.set(key, value);
}

// Cache-Bereinigung: abgelaufene Einträge alle 5 Minuten entfernen
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of Array.from(transformCache.entries())) {
    if (now - value.createdAt > CACHE_TTL_MS) {
      transformCache.delete(key);
    }
  }
}, 5 * 60 * 1000).unref(); // .unref() verhindert dass der Timer den Prozess am Leben hält

export const themeTransformRouter = router({
  /**
   * Analysiert ein GitHub-Repo und transformiert UI-Komponenten zu Volt UI.
   * Gibt das Ergebnis zurück und speichert es im Cache für den ZIP-Download.
   */
  transform: publicProcedure
    .input(
      z.object({
        repoUrl: z.string().min(1, "GitHub-URL ist erforderlich"),
        token: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { repoUrl } = input;
      const userId = ctx.user?.id ?? 0;
      const token = input.token || tokenStore.get(userId);

      try {
        const result = await transformRepo(repoUrl, token);

        const zipBuffer = await generateZip(result.transformedFiles);
        const cacheKey = `${result.owner}-${result.repoName}-${Date.now()}`;

        cacheSet(cacheKey, { result, zipBuffer, createdAt: Date.now() });

        return {
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
        };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Transformation fehlgeschlagen";
        throw new TRPCError({ code: "BAD_REQUEST", message });
      }
    }),

  /**
   * Gibt den ZIP-Download-Link für ein gecachtes Transformations-Ergebnis zurück.
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
export function handleZipDownload(req: Request, res: Response): void {
  const { cacheKey } = req.params;
  const cached = transformCache.get(cacheKey);

  if (!cached) {
    res.status(404).json({ error: "Download nicht mehr verfügbar" });
    return;
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
export async function handleLocalRepoUpload(req: Request, res: Response): Promise<void> {
  const multer = (await import("multer")).default;
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 500 * 1024 * 1024 },
  });

  upload.single("repo")(req, res, async (err: unknown) => {
    if (err) {
      const message = err instanceof Error ? err.message : "Upload fehlgeschlagen";
      res.status(400).json({ error: `Upload fehlgeschlagen: ${message}` });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "Keine Datei hochgeladen" });
      return;
    }

    const zipBuffer = req.file.buffer;
    const repoName = (req.body as Record<string, string>).repoName
      || req.file.originalname.replace(/\.zip$/i, "");

    try {
      const { transformLocalRepo, generateZip: genZip } = await import("./themeTransformer");
      const result = await transformLocalRepo(zipBuffer, repoName);

      const zipResultBuffer = await genZip(result.transformedFiles);
      const cacheKey = `local-${repoName}-${Date.now()}`;

      cacheSet(cacheKey, { result, zipBuffer: zipResultBuffer, createdAt: Date.now() });

      res.json({
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Transformation fehlgeschlagen";
      res.status(500).json({ error: message });
    }
  });
}

/**
 * Express-Handler für HTML-Vorschau einer transformierten Datei.
 * GET /api/theme-transform/preview/:cacheKey/:fileIndex
 */
export function handlePreview(req: Request, res: Response): void {
  const { cacheKey, fileIndex } = req.params;
  const cached = transformCache.get(cacheKey);

  if (!cached) {
    res.status(404).send(
      "<html><body style='font-family:sans-serif;padding:24px'><p>Vorschau nicht mehr verfügbar. Bitte erneut transformieren.</p></body></html>"
    );
    return;
  }

  const idx = parseInt(fileIndex, 10);
  const file = cached.result.transformedFiles[idx];

  if (!file) {
    res.status(404).send(
      "<html><body style='font-family:sans-serif;padding:24px'><p>Datei nicht gefunden.</p></body></html>"
    );
    return;
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (file.htmlPreview) {
    res.send(file.htmlPreview);
    return;
  }

  // Fallback: Hinweis dass Vorschau noch generiert wird
  res.send(
    `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>Volt UI Vorschau</title>` +
    `<style>body{font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;` +
    `min-height:100vh;margin:0;background:#F5F5F5;color:#6B6B6B;}</style></head><body>` +
    `<div style="text-align:center"><p style="font-size:14px">Vorschau wird beim nächsten Transformations-Durchlauf generiert.</p>` +
    `<p style="font-size:12px;margin-top:8px;font-family:monospace">${file.path}</p></div></body></html>`
  );
}
