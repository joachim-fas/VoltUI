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
