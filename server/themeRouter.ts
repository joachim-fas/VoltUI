/**
 * Volt UI Theme Agent – tRPC Router
 * Endpoints für Git-Repo-Analyse und CSS-Generierung
 */

import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { analyzeGitRepo } from "./themeAnalyzer";
import { generateVoltCss } from "./cssGenerator";

export const themeRouter = router({
  /**
   * Analysiert ein GitHub-Repository und extrahiert Design-Tokens
   */
  analyze: publicProcedure
    .input(
      z.object({
        repoUrl: z.string().url().refine(
          (url) => url.includes("github.com") || url.includes("gitlab.com") || url.includes("bitbucket.org"),
          { message: "Nur GitHub, GitLab und Bitbucket werden unterstützt" }
        ),
      })
    )
    .mutation(async ({ input }) => {
      const result = await analyzeGitRepo(input.repoUrl);
      return result;
    }),

  /**
   * Generiert eine angepasste volt-ui.css basierend auf Token-Mapping
   */
  generateCss: publicProcedure
    .input(
      z.object({
        tokenMapping: z.object({
          primary: z.string(),
          background: z.string(),
          foreground: z.string(),
          accent: z.string(),
          fontDisplay: z.string(),
          fontBody: z.string(),
          borderRadius: z.string(),
        }),
        projectName: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const css = generateVoltCss(input.tokenMapping, input.projectName);
      return { css };
    }),
});
