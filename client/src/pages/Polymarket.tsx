/**
 * Polymarket – read-only Scanner & Edge-Evaluator
 * Route: /polymarket
 *
 * Liest Marktdaten (Gamma-API) und rechnet Arbitrage/Edge. Es werden NIE Wetten
 * platziert – Funding und Ausführung liegen ausschließlich bei dir.
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltInput } from "@/components/volt/VoltInput";
import { VoltToastContainer, useVoltToast } from "@/components/volt/VoltToast";
import {
  ArrowLeft, Terminal, Scale, RefreshCw, TrendingUp, AlertTriangle, Eye,
} from "lucide-react";

export default function Polymarket() {
  const { toasts, add, dismiss } = useVoltToast();
  const marketsQ = trpc.polymarket.markets.useQuery({ limit: 60 }, { retry: false });
  const scanQ = trpc.polymarket.scan.useQuery({ limit: 200, tolerancePct: 1 }, { retry: false });

  const [price, setPrice] = useState("0.25");
  const [myProb, setMyProb] = useState("0.40");
  const evalM = trpc.polymarket.evaluate.useMutation({
    onError: (e) => add({ title: "Berechnung fehlgeschlagen", description: e.message, variant: "error" }),
  });

  const [cross, setCross] = useState({ a: "0.40", b: "0.55", fee: "0" });
  const crossM = trpc.polymarket.crossVenue.useMutation({
    onError: (e) => add({ title: "Berechnung fehlgeschlagen", description: e.message, variant: "error" }),
  });
  const autoScanQ = trpc.crossVenue.scan.useQuery({ limit: 200, feePct: 0 }, { retry: false, enabled: false });
  const runCross = () => {
    const a = Number(cross.a), b = Number(cross.b), fee = Number(cross.fee);
    if (!(a >= 0 && a <= 1) || !(b >= 0 && b <= 1)) {
      add({ title: "Eingabe prüfen", description: "YES-Preise in [0,1].", variant: "warning" });
      return;
    }
    crossM.mutate({ yesA: a, yesB: b, feePct: Number.isFinite(fee) ? fee : 0 });
  };

  const runEval = () => {
    const p = Number(price), q = Number(myProb);
    if (!(p > 0 && p < 1) || !(q >= 0 && q <= 1)) {
      add({ title: "Eingabe prüfen", description: "Preis in (0,1), Wahrscheinlichkeit in [0,1].", variant: "warning" });
      return;
    }
    evalM.mutate({ price: p, myProb: q });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link href="/bitpanda" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Co-Pilot</span>
          </Link>
          <span className="text-border text-lg font-light select-none">/</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Polymarket</span>
            <VoltBadge variant="outline" size="sm"><Eye className="w-3 h-3" /> read-only</VoltBadge>
          </div>
          <div className="flex-1" />
          <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
            <Terminal className="w-3 h-3 text-[#E4FF97]" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Banner */}
        <div className="rounded-2xl border border-border bg-[#E4FF97]/20 px-5 py-4 flex items-start gap-3">
          <span className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center flex-shrink-0">
            <Scale className="w-4 h-4 text-[#E4FF97]" />
          </span>
          <div className="leading-snug">
            <p className="text-sm font-bold">Prediction-Market-Analyse — nur Lesen</p>
            <p className="text-xs text-muted-foreground">
              Preis = implizite Wahrscheinlichkeit. Das Tool findet Arbitrage und bewertet deinen Edge.
              Wetten fundest und platzierst du selbst. Rechtliche Zulässigkeit in deiner Jurisdiktion prüfst du selbst.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Arbitrage-Scanner */}
          <VoltCard variant="default" className="p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-foreground flex items-center justify-center"><Scale className="w-4 h-4 text-[#E4FF97]" /></span>
                <h3 className="font-display font-bold text-sm">Arbitrage-Scanner</h3>
              </div>
              <VoltButton variant="ghost" size="sm" leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${scanQ.isFetching ? "animate-spin" : ""}`} />} onClick={() => scanQ.refetch()}>
                Scannen
              </VoltButton>
            </div>
            <div className="p-4">
              {scanQ.isLoading && <p className="text-sm text-muted-foreground text-center py-8">Scanne Märkte …</p>}
              {scanQ.isError && (
                <div className="flex flex-col items-center text-center gap-2 py-8">
                  <AlertTriangle className="w-7 h-7 text-muted-foreground" />
                  <p className="text-sm font-semibold">Marktdaten nicht abrufbar</p>
                  <p className="text-xs text-muted-foreground max-w-xs">Braucht Internetzugang zu Polymarket. {scanQ.error.message}</p>
                </div>
              )}
              {scanQ.data && scanQ.data.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">Keine Fehlbewertungen über der Toleranz gefunden.</p>
              )}
              {scanQ.data && scanQ.data.length > 0 && (
                <div className="divide-y divide-border max-h-[420px] overflow-y-auto">
                  {scanQ.data.map((a) => (
                    <div key={a.id} className="py-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug">{a.question}</p>
                        <VoltBadge variant="positive" size="sm">+{a.profitPct.toFixed(1)}%</VoltBadge>
                      </div>
                      <p className="text-[0.7rem] text-muted-foreground font-mono mt-1">
                        Σ {a.sum.toFixed(3)} · {a.kind === "UNDERPRICED" ? "alle kaufen" : "überbewertet"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </VoltCard>

          {/* Edge-Evaluator */}
          <VoltCard variant="default" className="p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-display font-bold text-sm">Edge-Evaluator</h3>
              <p className="text-muted-foreground text-xs mt-0.5">Deine Wahrscheinlichkeit vs. Marktpreis → EV & Kelly</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <VoltInput label="Marktpreis (0–1)" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
                <VoltInput label="Deine Wkt. (0–1)" inputMode="decimal" value={myProb} onChange={(e) => setMyProb(e.target.value)} />
              </div>
              <VoltButton variant="primary" size="md" className="w-full" loading={evalM.isPending} leftIcon={<TrendingUp className="w-3.5 h-3.5" />} onClick={runEval}>
                Edge berechnen
              </VoltButton>
              {evalM.data && (
                <div className={`rounded-xl border p-3 text-xs space-y-1.5 ${evalM.data.edge > 0 ? "border-[#1A9E5A]/40 bg-[#1A9E5A]/8" : "border-[#E8402A]/40 bg-[#E8402A]/8"}`}>
                  <p className="text-sm font-semibold">{evalM.data.edge > 0 ? "Positiver Edge" : "Kein Edge — Finger weg"}</p>
                  <div className="flex justify-between"><span className="text-muted-foreground">implizite Wkt. / deine</span><span className="font-mono">{(evalM.data.impliedProb * 100).toFixed(1)}% / {(evalM.data.myProb * 100).toFixed(1)}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Payoff</span><span className="font-mono">{evalM.data.payoff.toFixed(2)}×</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Erwartungswert</span><span className="font-mono">{evalM.data.evPerBetPct >= 0 ? "+" : ""}{evalM.data.evPerBetPct.toFixed(1)}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Kelly-Einsatz</span><span className="font-mono font-semibold">{(Math.max(0, Math.min(1, evalM.data.kellyFraction)) * 100).toFixed(1)}% des Kapitals</span></div>
                </div>
              )}
              <p className="text-[0.7rem] text-muted-foreground">
                Kelly ist die wachstumsoptimale Größe bei echtem Edge. Ohne Edge: nicht wetten.
                In der Praxis Bruchteil-Kelly (z. B. ½) gegen Schätzfehler.
              </p>
            </div>
          </VoltCard>
        </div>

        {/* Cross-Venue-Arbitrage */}
        <VoltCard variant="default" className="p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-display font-bold text-sm">Cross-Venue-Arbitrage</h3>
            <p className="text-muted-foreground text-xs mt-0.5">
              Gleiches Event, zwei Börsen (z. B. Polymarket vs. Kalshi) – YES-Preise vergleichen, Differenz risikofrei sichern
            </p>
          </div>
          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <VoltInput label="YES Börse A" inputMode="decimal" value={cross.a} onChange={(e) => setCross((s) => ({ ...s, a: e.target.value }))} />
                <VoltInput label="YES Börse B" inputMode="decimal" value={cross.b} onChange={(e) => setCross((s) => ({ ...s, b: e.target.value }))} />
                <VoltInput label="Gebühren %" inputMode="decimal" value={cross.fee} onChange={(e) => setCross((s) => ({ ...s, fee: e.target.value }))} />
              </div>
              <VoltButton variant="primary" size="md" className="w-full" loading={crossM.isPending} leftIcon={<Scale className="w-3.5 h-3.5" />} onClick={runCross}>
                Arbitrage prüfen
              </VoltButton>
            </div>
            <div>
              {crossM.data ? (
                <div className={`rounded-xl border p-3 text-xs space-y-1.5 h-full ${crossM.data.worthwhile ? "border-[#1A9E5A]/40 bg-[#1A9E5A]/8" : "border-[#E8402A]/40 bg-[#E8402A]/8"}`}>
                  <p className="text-sm font-semibold">{crossM.data.worthwhile ? "Arbitrage vorhanden" : "Keine lohnende Marge"}</p>
                  <div className="flex justify-between"><span className="text-muted-foreground">Preisdifferenz</span><span className="font-mono">{crossM.data.divergencePct.toFixed(1)} %</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Marge (vor Gebühren)</span><span className="font-mono">{crossM.data.profitPct.toFixed(1)} %</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">nach Gebühren</span><span className="font-mono font-semibold">{crossM.data.feeAdjustedProfitPct.toFixed(1)} %</span></div>
                  {crossM.data.worthwhile && (
                    <p className="text-muted-foreground pt-1">YES auf Börse {crossM.data.buyYesOn} · NO auf Börse {crossM.data.buyNoOn} kaufen.</p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Trag die YES-Preise beider Börsen ein. Liegt YES auf A unter YES auf B, kaufst du YES auf A und NO auf B – garantierter Payout 1, Kosten 1 − Differenz.</p>
              )}
            </div>
          </div>
        </VoltCard>

        {/* Auto-Scan Polymarket ↔ Kalshi */}
        <VoltCard variant="default" className="p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="font-display font-bold text-sm">Auto-Scan: Polymarket ↔ Kalshi</h3>
              <p className="text-muted-foreground text-xs mt-0.5">Holt beide Venues, matched gleiche Events per Titel, rankt nach Marge</p>
            </div>
            <VoltButton variant="primary" size="sm" loading={autoScanQ.isFetching} leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${autoScanQ.isFetching ? "animate-spin" : ""}`} />} onClick={() => autoScanQ.refetch()}>
              Scannen
            </VoltButton>
          </div>
          <div className="p-4">
            {!autoScanQ.data && !autoScanQ.isFetching && (
              <p className="text-xs text-muted-foreground text-center py-6">Klicke „Scannen", um Events beider Börsen zu vergleichen.</p>
            )}
            {autoScanQ.data && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <VoltBadge variant="muted" size="sm">{autoScanQ.data.sources.polymarket} Polymarket</VoltBadge>
                  <VoltBadge variant="muted" size="sm">{autoScanQ.data.sources.kalshi} Kalshi</VoltBadge>
                  <VoltBadge variant="muted" size="sm">{autoScanQ.data.matched} Matches</VoltBadge>
                </div>
                {autoScanQ.data.errors.length > 0 && (
                  <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs space-y-1">
                    {autoScanQ.data.errors.map((e, i) => (
                      <p key={i} className="flex items-start gap-1.5"><AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-600" />{e}</p>
                    ))}
                  </div>
                )}
                {autoScanQ.data.opportunities.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">Keine matchenden Events mit Marge gefunden.</p>
                ) : (
                  <div className="divide-y divide-border max-h-[480px] overflow-y-auto">
                    {autoScanQ.data.opportunities.map((o, i) => (
                      <div key={i} className="py-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-snug">{o.a.title}</p>
                          <VoltBadge variant={o.worthwhile ? "positive" : "muted"} size="sm">
                            {o.feeAdjustedProfitPct >= 0 ? "+" : ""}{o.feeAdjustedProfitPct.toFixed(1)}%
                          </VoltBadge>
                        </div>
                        <p className="text-[0.7rem] text-muted-foreground font-mono mt-1">
                          PM {(o.a.yesPrice * 100).toFixed(1)}% vs KAL {(o.b.yesPrice * 100).toFixed(1)}% · YES auf {o.buyYesOn} · NO auf {o.buyNoOn}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {autoScanQ.isError && (
              <p className="text-xs text-[#A01A08] text-center py-6">Scan fehlgeschlagen: {autoScanQ.error.message}</p>
            )}
          </div>
        </VoltCard>

        {/* Marktliste */}
        <VoltCard variant="default" className="p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="font-display font-bold text-sm">Aktive Märkte</h3>
            <VoltButton variant="ghost" size="sm" leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${marketsQ.isFetching ? "animate-spin" : ""}`} />} onClick={() => marketsQ.refetch()}>
              Aktualisieren
            </VoltButton>
          </div>
          <div className="p-4">
            {marketsQ.isLoading && <p className="text-sm text-muted-foreground text-center py-8">Lade Märkte …</p>}
            {marketsQ.isError && (
              <p className="text-xs text-muted-foreground text-center py-8">Marktdaten nicht abrufbar (Internetzugang zu Polymarket nötig). {marketsQ.error.message}</p>
            )}
            {marketsQ.data && (
              <div className="divide-y divide-border max-h-[480px] overflow-y-auto">
                {marketsQ.data.map((m) => (
                  <div key={m.id} className="flex items-center justify-between gap-3 py-2.5">
                    <p className="text-sm leading-snug min-w-0 truncate">{m.question}</p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {m.outcomes.slice(0, 3).map((o, i) => (
                        <VoltBadge key={i} variant="muted" size="sm">{o}: {(m.prices[i] * 100).toFixed(0)}%</VoltBadge>
                      ))}
                    </div>
                  </div>
                ))}
                {marketsQ.data.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Keine Märkte.</p>}
              </div>
            )}
          </div>
        </VoltCard>
      </main>

      <VoltToastContainer toasts={toasts} onDismiss={dismiss} position="top-right" />
    </div>
  );
}
