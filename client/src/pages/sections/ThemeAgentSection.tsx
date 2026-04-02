/**
 * Theme Agent Section – Volt UI v2
 * Analysiert GitHub-Repos und generiert angepasste volt-ui.css
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle } from "@/components/volt/VoltCard";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltInput } from "@/components/volt/VoltInput";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { Github, Sparkles, Download, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function ThemeAgentSection() {
  const [repoUrl, setRepoUrl] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const analyzeMutation = trpc.theme.analyze.useMutation({
    onSuccess: (data) => {
      setAnalysisResult(data);
      toast.success("Analyse abgeschlossen", {
        description: `${data.colors.length} Farben und ${data.fonts.length} Schriften gefunden`,
      });
    },
    onError: (error) => {
      toast.error("Analyse fehlgeschlagen", {
        description: error.message,
      });
    },
  });

  const generateCssMutation = trpc.theme.generateCss.useMutation({
    onSuccess: (data) => {
      // CSS als Download anbieten
      const blob = new Blob([data.css], { type: "text/css" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `volt-ui-${analysisResult?.repoName || "adapted"}.css`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("CSS heruntergeladen", {
        description: "Die angepasste volt-ui.css wurde gespeichert",
      });
    },
  });

  const handleAnalyze = () => {
    if (!repoUrl.trim()) {
      toast.error("Bitte GitHub-URL eingeben");
      return;
    }
    analyzeMutation.mutate({ repoUrl: repoUrl.trim() });
  };

  const handleDownload = () => {
    if (!analysisResult) return;
    generateCssMutation.mutate({
      tokenMapping: analysisResult.tokenMapping,
      projectName: analysisResult.repoName,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-[#E4FF97] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#0A0A0A]" />
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl text-foreground leading-none">
              Theme Agent
            </h2>
            <p className="text-xs font-mono text-muted-foreground mt-1 tracking-wider uppercase">
              v2 · Volt UI auf jedes Projekt anwenden
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground font-body leading-relaxed">
          Gib eine GitHub-URL ein – der Theme Agent analysiert das Projekt, extrahiert Farben und Schriften,
          und generiert eine angepasste <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">volt-ui.css</code>,
          die du direkt in dein Projekt einbinden kannst.
        </p>
      </div>

      {/* Input-Bereich */}
      <VoltCard>
        <VoltCardHeader>
          <VoltCardTitle>Repository analysieren</VoltCardTitle>
        </VoltCardHeader>
        <VoltCardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <VoltInput
                variant="filled"
                placeholder="https://github.com/username/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                disabled={analyzeMutation.isPending}
              />
              <VoltButton
                variant="primary"
                onClick={handleAnalyze}
                disabled={analyzeMutation.isPending || !repoUrl.trim()}
                rightIcon={analyzeMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              >
                {analyzeMutation.isPending ? "Analysiere..." : "Analysieren"}
              </VoltButton>
            </div>
            <p className="text-xs text-muted-foreground font-body">
              Unterstützt: GitHub, GitLab, Bitbucket · Public Repositories
            </p>
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Analyse-Log */}
      {analyzeMutation.isPending && (
        <VoltCard>
          <VoltCardHeader>
            <VoltCardTitle>Analyse läuft...</VoltCardTitle>
          </VoltCardHeader>
          <VoltCardContent>
            <div className="space-y-2 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Repository wird geklont...</span>
              </div>
              <div className="flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Design-Dateien werden gescannt...</span>
              </div>
              <div className="flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Farben und Schriften werden extrahiert...</span>
              </div>
            </div>
          </VoltCardContent>
        </VoltCard>
      )}

      {/* Ergebnis-Vorschau */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Meta-Info */}
          <VoltCard>
            <VoltCardHeader>
              <div className="flex items-center justify-between">
                <VoltCardTitle>Analyse-Ergebnis</VoltCardTitle>
                <VoltBadge variant="default">
                  <CheckCircle2 className="w-3 h-3" />
                  Abgeschlossen
                </VoltBadge>
              </div>
            </VoltCardHeader>
            <VoltCardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Github className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono text-xs text-foreground">{analysisResult.repoName}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {analysisResult.techStack.map((tech: string) => (
                    <VoltBadge key={tech} variant="muted">{tech}</VoltBadge>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Farben</p>
                    <p className="font-display font-bold text-xl text-foreground">{analysisResult.colors.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Schriften</p>
                    <p className="font-display font-bold text-xl text-foreground">{analysisResult.fonts.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Dateien</p>
                    <p className="font-display font-bold text-xl text-foreground">{analysisResult.files.length}</p>
                  </div>
                </div>
              </div>
            </VoltCardContent>
          </VoltCard>

          {/* Extrahierte Farben */}
          <VoltCard>
            <VoltCardHeader>
              <VoltCardTitle>Extrahierte Farben</VoltCardTitle>
            </VoltCardHeader>
            <VoltCardContent>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {analysisResult.colors.slice(0, 12).map((color: any) => (
                  <div key={color.value} className="flex flex-col items-center gap-2">
                    <div
                      className="w-full aspect-square rounded-lg border border-border shadow-sm"
                      style={{ backgroundColor: color.value }}
                    />
                    <div className="text-center">
                      <p className="font-mono text-[0.65rem] text-foreground">{color.value}</p>
                      <p className="text-[0.6rem] text-muted-foreground">{color.count}×</p>
                    </div>
                  </div>
                ))}
              </div>
            </VoltCardContent>
          </VoltCard>

          {/* Extrahierte Schriften */}
          <VoltCard>
            <VoltCardHeader>
              <VoltCardTitle>Extrahierte Schriften</VoltCardTitle>
            </VoltCardHeader>
            <VoltCardContent>
              <div className="space-y-2">
                {analysisResult.fonts.map((font: any) => (
                  <div key={font.family} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                    <div>
                      <p className="font-body font-medium text-sm text-foreground">{font.family}</p>
                      <p className="text-xs text-muted-foreground">{font.usage.slice(0, 2).join(", ")}</p>
                    </div>
                    <VoltBadge variant={font.source === "google" ? "default" : "muted"}>
                      {font.source}
                    </VoltBadge>
                  </div>
                ))}
              </div>
            </VoltCardContent>
          </VoltCard>

          {/* Token-Mapping */}
          <VoltCard>
            <VoltCardHeader>
              <VoltCardTitle>Volt Token-Mapping</VoltCardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Automatisch gemappte Design-Tokens für dein Projekt
              </p>
            </VoltCardHeader>
            <VoltCardContent>
              <div className="space-y-4">
                {/* Farb-Mapping */}
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Farben</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Primary", value: analysisResult.tokenMapping.primary },
                      { label: "Accent", value: analysisResult.tokenMapping.accent },
                      { label: "Background", value: analysisResult.tokenMapping.background },
                      { label: "Foreground", value: analysisResult.tokenMapping.foreground },
                    ].map((token) => (
                      <div key={token.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                        <div
                          className="w-8 h-8 rounded-md border border-border flex-shrink-0"
                          style={{ backgroundColor: token.value }}
                        />
                        <div>
                          <p className="text-xs font-body font-medium text-foreground">{token.label}</p>
                          <p className="font-mono text-[0.65rem] text-muted-foreground">{token.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Font-Mapping */}
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Schriften</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                      <span className="text-xs text-muted-foreground">Display Font</span>
                      <span className="font-body font-medium text-sm text-foreground">{analysisResult.tokenMapping.fontDisplay}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                      <span className="text-xs text-muted-foreground">Body Font</span>
                      <span className="font-body font-medium text-sm text-foreground">{analysisResult.tokenMapping.fontBody}</span>
                    </div>
                  </div>
                </div>

                {/* Border-Radius */}
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Geometrie</p>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                    <span className="text-xs text-muted-foreground">Border Radius</span>
                    <span className="font-mono text-xs text-foreground">{analysisResult.tokenMapping.borderRadius}</span>
                  </div>
                </div>
              </div>
            </VoltCardContent>
          </VoltCard>

          {/* Download-Bereich */}
          <VoltCard>
            <VoltCardHeader>
              <VoltCardTitle>Angepasste CSS herunterladen</VoltCardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Die generierte <code className="font-mono text-xs">volt-ui.css</code> enthält alle Volt-Komponenten
                mit deinen Projekt-Farben und -Schriften.
              </p>
            </VoltCardHeader>
            <VoltCardContent>
              <div className="flex gap-3">
                <VoltButton
                  variant="primary"
                  onClick={handleDownload}
                  disabled={generateCssMutation.isPending}
                  rightIcon={generateCssMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                >
                  {generateCssMutation.isPending ? "Generiere..." : "volt-ui.css herunterladen"}
                </VoltButton>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border">
                <p className="text-xs font-mono text-muted-foreground mb-2">Integration:</p>
                <pre className="font-mono text-xs text-foreground overflow-x-auto">
{`<!-- In deinem HTML -->
<link rel="stylesheet" href="volt-ui.css">

<!-- Dann Volt-Klassen verwenden -->
<button class="volt-btn volt-btn-primary">
  Klick mich
</button>`}
                </pre>
              </div>
            </VoltCardContent>
          </VoltCard>

          {/* Analyse-Log */}
          {analysisResult.analysisLog && analysisResult.analysisLog.length > 0 && (
            <VoltCard>
              <VoltCardHeader>
                <VoltCardTitle>Analyse-Log</VoltCardTitle>
              </VoltCardHeader>
              <VoltCardContent>
                <div className="space-y-1 font-mono text-xs text-muted-foreground max-h-48 overflow-y-auto">
                  {analysisResult.analysisLog.map((line: string, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                      {line.startsWith("✓") ? (
                        <CheckCircle2 className="w-3 h-3 text-[#1A9E5A] flex-shrink-0 mt-0.5" />
                      ) : line.startsWith("✗") ? (
                        <AlertCircle className="w-3 h-3 text-[#E8402A] flex-shrink-0 mt-0.5" />
                      ) : (
                        <span className="w-3 text-center flex-shrink-0">›</span>
                      )}
                      <span>{line.replace(/^[✓✗]\s*/, "")}</span>
                    </div>
                  ))}
                </div>
              </VoltCardContent>
            </VoltCard>
          )}
        </div>
      )}

      {/* Placeholder wenn noch keine Analyse */}
      {!analysisResult && !analyzeMutation.isPending && (
        <VoltCard>
          <VoltCardContent>
            <div className="py-12 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                <Github className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-display font-semibold text-lg text-foreground mb-1">
                  Bereit zum Analysieren
                </p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Gib oben eine GitHub-URL ein und starte die Analyse. Der Theme Agent extrahiert
                  automatisch alle Design-Tokens und mappt sie auf das Volt-System.
                </p>
              </div>
            </div>
          </VoltCardContent>
        </VoltCard>
      )}
    </div>
  );
}
