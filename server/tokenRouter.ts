/**
 * Token Router – GitHub Personal Access Token Management
 * Tokens werden gehasht (SHA-256) gespeichert – nie im Klartext.
 * Für den Transformations-Request wird der Token aus einer separaten
 * In-Memory-Map gelesen (nur für die Dauer der Session).
 */

import { createHash } from "crypto";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { githubTokens } from "../drizzle/schema";
import { TRPCError } from "@trpc/server";

// In-Memory Store: sessionId → plaintext token (nur für aktive Requests)
// Wird beim Speichern befüllt und beim Löschen geleert.
// Kein Persist – nach Server-Neustart muss der Token neu eingegeben werden.
export const tokenStore = new Map<number, string>(); // userId → token

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function maskToken(token: string): string {
  if (token.length <= 8) return "****";
  const prefix = token.slice(0, 4);
  const suffix = token.slice(-4);
  return `${prefix}${"*".repeat(Math.min(token.length - 8, 16))}${suffix}`;
}

export const tokenRouter = router({
  /**
   * Token speichern – Hash in DB, Klartext in Memory-Store.
   * Kein Login erforderlich: wir nutzen eine anonyme userId=0 für nicht-eingeloggte Nutzer.
   */
  save: publicProcedure
    .input(z.object({
      token: z.string().min(10, "Token zu kurz"),
      label: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB nicht verfügbar" });

      // Anonyme userId: 0 für nicht-eingeloggte Nutzer, echte ID für eingeloggte
      const userId = ctx.user?.id ?? 0;
      const tokenHash = hashToken(input.token);
      const maskedToken = maskToken(input.token);

      // Bestehenden Token für diesen User ersetzen
      await db.delete(githubTokens).where(eq(githubTokens.userId, userId));
      await db.insert(githubTokens).values({
        userId,
        tokenHash,
        maskedToken,
        label: input.label ?? "GitHub Token",
      });

      // Klartext in Memory-Store für aktive Requests
      tokenStore.set(userId, input.token);

      return { success: true, maskedToken };
    }),

  /**
   * Aktuellen Token-Status abrufen (nur Maske, nie Klartext).
   */
  get: publicProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { hasToken: false, maskedToken: null, label: null };

    const userId = ctx.user?.id ?? 0;
    const rows = await db
      .select()
      .from(githubTokens)
      .where(eq(githubTokens.userId, userId))
      .limit(1);

    if (rows.length === 0) return { hasToken: false, maskedToken: null, label: null };

    const row = rows[0];
    return {
      hasToken: true,
      maskedToken: row.maskedToken,
      label: row.label,
      createdAt: row.createdAt,
    };
  }),

  /**
   * Token löschen – aus DB und Memory-Store.
   */
  delete: publicProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB nicht verfügbar" });

    const userId = ctx.user?.id ?? 0;
    await db.delete(githubTokens).where(eq(githubTokens.userId, userId));
    tokenStore.delete(userId);

    return { success: true };
  }),
});

/**
 * Hilfsfunktion: Token für einen User aus dem Memory-Store oder DB laden.
 * Wird vom themeTransformRouter verwendet.
 */
export async function getTokenForUser(userId: number): Promise<string | undefined> {
  // Erst aus Memory-Store (schnell, nach Neustart leer)
  const cached = tokenStore.get(userId);
  if (cached) return cached;

  // Fallback: aus DB – aber wir haben nur den Hash, nicht den Klartext!
  // Deshalb: wenn Memory-Store leer, muss der User den Token neu eingeben.
  return undefined;
}
