/**
 * Bitpanda Co-Pilot – Gamble-Mode (Paper-Trading-Sandbox)
 * Route: /sandbox
 *
 * 100 % Spielgeld. Die Strategie läuft gegen echte Live-Kurse, bewegt aber
 * niemals echtes Geld und sendet keine Order an Bitpanda. Reiner Strategie-Test.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltStat } from "@/components/volt/VoltStat";
import { VoltInput } from "@/components/volt/VoltInput";
import { VoltToastContainer, useVoltToast } from "@/components/volt/VoltToast";
import {
  ArrowLeft, Terminal, Dices, Play, Square, RefreshCw, Zap,
  TrendingUp, TrendingDown, Wallet,
} from "lucide-react";

export default function BitpandaSandbox() {
  const { toasts, add, dismiss } = useVoltToast();
  const sbQ = trpc.bitpanda.sandbox.get.useQuery(undefined, { retry: false, refetchInterval: 10000 });

  const configureM = trpc.bitpanda.sandbox.configure.useMutation({
    onSuccess: () => { add({ title: "Strategie gespeichert", variant: "success" }); sbQ.refetch(); },
    onError: (e) => add({ title: "Speichern fehlgeschlagen", description: e.message, variant: "error" }),
  });
  const toggleM = trpc.bitpanda.sandbox.toggle.useMutation({ onSuccess: () => sbQ.refetch() });
  const resetM = trpc.bitpanda.sandbox.reset.useMutation({
    onSuccess: () => { add({ title: "Sandbox zurückgesetzt", variant: "info" }); sbQ.refetch(); },
  });
  const stepM = trpc.bitpanda.sandbox.step.useMutation({
    onSuccess: (r) => {
      add({
        title: r.acted ? "Virtueller Trade ausgeführt" : "Kein Trade",
        description: r.price ? `Live-Kurs: ${r.price}` : "Kurs nicht abrufbar (Netz/Instrument prüfen)",
        variant: r.acted ? "success" : "info",
      });
      sbQ.refetch();
    },
    onError: (e) => add({ title: "Schritt fehlgeschlagen", description: e.message, variant: "error" }),
  });

  const backtestM = trpc.bitpanda.sandbox.backtest.useMutation({
    onError: (e) => add({ title: "Backtest fehlgeschlagen", description: e.message, variant: "error" }),
  });
  const walkForwardM = trpc.bitpanda.sandbox.walkForward.useMutation({
    onError: (e) => add({ title: "Walk-Forward fehlgeschlagen", description: e.message, variant: "error" }),
  });
  const walkHistM = trpc.bitpanda.sandbox.walkForwardHistorical.useMutation({
    onError: (e) => add({ title: "Historischer Walk-Forward fehlgeschlagen", description: e.message, variant: "error" }),
  });
  const incomeM = trpc.bitpanda.sandbox.income.useMutation({
    onError: (e) => add({ title: "Income-Analyse fehlgeschlagen", description: e.message, variant: "error" }),
  });
  const edgeCalcM = trpc.bitpanda.sandbox.edgeCalc.useMutation({
    onError: (e) => add({ title: "Berechnung fehlgeschlagen", description: e.message, variant: "error" }),
  });
  const [edge, setEdge] = useState({ target: "100", trades: "10", move: "2" });

  const [form, setForm] = useState({ instrument: "BTC_EUR", strategy: "DIP_BUY" as "DIP_BUY" | "MOMENTUM", tradeEur: "50", dipPct: "3", takeProfitPct: "8", stopLossPct: "10", startCash: "1000" });
  const [initialized, setInitialized] = useState(false);

  const sb = sbQ.data;
  useEffect(() => {
    if (sb && !initialized) {
      setForm({
        instrument: sb.config.instrument,
        strategy: sb.config.strategy,
        tradeEur: String(sb.config.tradeEur),
        dipPct: String(sb.config.dipPct),
        takeProfitPct: String(sb.config.takeProfitPct),
        stopLossPct: String(sb.config.stopLossPct),
        startCash: String(sb.startCash),
      });
      setInitialized(true);
    }
  }, [sb, initialized]);

  const mark = sb ? (sb.lastPrice ?? sb.position.avgEntry) : 0;
  const equity = sb ? sb.cash + sb.position.amount * mark : 0;
  const pnl = sb ? equity - sb.startCash : 0;
  const pnlPct = sb && sb.startCash ? (pnl / sb.startCash) * 100 : 0;

  const saveConfig = () => {
    const num = (v: string) => Number(v);
    configureM.mutate({
      instrument: form.instrument.trim().toUpperCase(),
      strategy: form.strategy,
      tradeEur: num(form.tradeEur),
      dipPct: num(form.dipPct),
      takeProfitPct: num(form.takeProfitPct),
      stopLossPct: num(form.stopLossPct),
      startCash: num(form.startCash),
    });
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const applyConfig = (c: { instrument: string; strategy: "DIP_BUY" | "MOMENTUM"; tradeEur: number; dipPct: number; takeProfitPct: number; stopLossPct: number }) => {
    setForm((f) => ({
      ...f,
      instrument: c.instrument, strategy: c.strategy,
      tradeEur: String(c.tradeEur), dipPct: String(c.dipPct),
      takeProfitPct: String(c.takeProfitPct), stopLossPct: String(c.stopLossPct),
    }));
    configureM.mutate({ instrument: c.instrument, strategy: c.strategy, tradeEur: c.tradeEur, dipPct: c.dipPct, takeProfitPct: c.takeProfitPct, stopLossPct: c.stopLossPct });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link href="/bitpanda" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Co-Pilot</span>
          </Link>
          <span className="text-border text-lg font-light select-none">/</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Gamble-Mode</span>
            <VoltBadge variant="default" size="sm"><Dices className="w-3 h-3" /> Paper</VoltBadge>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Terminal className="w-3 h-3 text-[#E4FF97]" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight hidden sm:block">volt ui</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Spielgeld-Banner */}
        <div className="rounded-2xl border border-border bg-[#E4FF97]/20 px-5 py-4 flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center flex-shrink-0">
            <Dices className="w-4 h-4 text-[#E4FF97]" />
          </span>
          <div className="leading-snug">
            <p className="text-sm font-bold">Gamble-Mode · 100 % Spielgeld</p>
            <p className="text-xs text-muted-foreground">
              Strategie gegen echte Live-Kurse, aber rein virtuell. Kein echtes Geld, keine Order an Bitpanda.
            </p>
          </div>
        </div>

        {/* Portfolio */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <VoltStat label="Equity (virtuell)" value={`${equity.toFixed(2)} €`} variant="lime" icon={<Wallet className="w-4 h-4" />} />
          <VoltStat label="Cash frei" value={`${(sb?.cash ?? 0).toFixed(2)} €`} icon={<Wallet className="w-4 h-4" />} />
          <VoltStat
            label="G/V"
            value={`${pnl >= 0 ? "+" : ""}${pnl.toFixed(2)} €`}
            change={Number(pnlPct.toFixed(1))}
            variant={pnl >= 0 ? "positive" : "negative"}
            icon={pnl >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          />
          <VoltStat label="Position" value={sb && sb.position.amount > 0 ? sb.position.amount.toFixed(5) : "—"} icon={<Dices className="w-4 h-4" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strategie & Steuerung */}
          <VoltCard variant="default" className="p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-display font-bold text-sm">Strategie ({form.strategy === "DIP_BUY" ? "Dip-Buy" : "Momentum"})</h3>
              <VoltBadge variant={sb?.enabled ? "positive" : "muted"} size="sm" dot>
                {sb?.enabled ? "läuft" : "gestoppt"}
              </VoltBadge>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {(["DIP_BUY", "MOMENTUM"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setForm((f) => ({ ...f, strategy: st }))}
                    className={`h-9 rounded-lg text-sm font-semibold transition-all border ${
                      form.strategy === st ? "bg-foreground text-background border-transparent" : "bg-transparent text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    {st === "DIP_BUY" ? "Dip-Buy" : "Momentum"}
                  </button>
                ))}
              </div>
              <VoltInput label="Instrument" value={form.instrument} onChange={set("instrument")} />
              <div className="grid grid-cols-2 gap-3">
                <VoltInput label="Einsatz / Kauf (€)" inputMode="decimal" value={form.tradeEur} onChange={set("tradeEur")} />
                <VoltInput label="Startkapital (€)" inputMode="decimal" value={form.startCash} onChange={set("startCash")} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <VoltInput label="Dip %" inputMode="decimal" value={form.dipPct} onChange={set("dipPct")} />
                <VoltInput label="TP %" inputMode="decimal" value={form.takeProfitPct} onChange={set("takeProfitPct")} />
                <VoltInput label="SL %" inputMode="decimal" value={form.stopLossPct} onChange={set("stopLossPct")} />
              </div>
              <p className="text-[0.7rem] text-muted-foreground">
                {form.strategy === "DIP_BUY"
                  ? `Kaufe ${form.tradeEur} € bei −${form.dipPct} % unter dem Hoch`
                  : `Kaufe ${form.tradeEur} € bei +${form.dipPct} % über dem Tief`}
                {" "}· verkaufe bei +{form.takeProfitPct} % / −{form.stopLossPct} %.
                Strategie/Instrument/Startkapital ändern setzt die Sandbox zurück.
              </p>
              <VoltButton variant="outline" size="md" className="w-full" loading={configureM.isPending} onClick={saveConfig}>
                Strategie speichern
              </VoltButton>

              <div className="flex items-center gap-2 pt-1">
                <VoltButton
                  variant="primary" size="md" className="flex-1"
                  leftIcon={sb?.enabled ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  loading={toggleM.isPending}
                  onClick={() => toggleM.mutate({ enabled: !sb?.enabled })}
                >
                  {sb?.enabled ? "Stoppen" : "Starten"}
                </VoltButton>
                <VoltButton variant="outline" size="md" leftIcon={<Zap className="w-3.5 h-3.5" />} loading={stepM.isPending} onClick={() => stepM.mutate()}>
                  Schritt
                </VoltButton>
                <VoltButton variant="ghost" size="md" leftIcon={<RefreshCw className="w-3.5 h-3.5" />} loading={resetM.isPending} onClick={() => resetM.mutate()}>
                  Reset
                </VoltButton>
              </div>
            </div>
          </VoltCard>

          {/* Trade-Log */}
          <VoltCard variant="default" className="p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-display font-bold text-sm">Virtuelle Trades</h3>
              <p className="text-muted-foreground text-xs mt-0.5">
                {sb ? `${sb.trades.length} Trades · Position-Einstand ${sb.position.amount > 0 ? sb.position.avgEntry.toFixed(2) + " €" : "—"}` : "…"}
              </p>
            </div>
            <div className="p-4">
              {(!sb || sb.trades.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-8">Noch keine Trades. Starte die Strategie oder mach einen Schritt.</p>
              )}
              <div className="divide-y divide-border max-h-[360px] overflow-y-auto">
                {sb?.trades.map((t) => (
                  <div key={t.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <VoltBadge variant={t.side === "BUY" ? "positive" : "negative"} size="sm">
                        {t.side === "BUY" ? "Kauf" : "Verkauf"}
                      </VoltBadge>
                      <div className="leading-tight min-w-0">
                        <div className="text-sm font-mono truncate">{t.amount.toFixed(5)} @ {t.price.toFixed(2)}</div>
                        <div className="text-[0.7rem] text-muted-foreground truncate">{t.reason} · {new Date(t.at).toLocaleTimeString("de-DE")}</div>
                      </div>
                    </div>
                    <span className="text-sm font-mono flex-shrink-0">{t.eur.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            </div>
          </VoltCard>
        </div>

        {/* ── Effizienzgrenze (Backtest & Walk-Forward) ── */}
        <VoltCard variant="default" className="p-0 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-border">
            <div>
              <h3 className="font-display font-bold text-sm">Effizienzgrenze</h3>
              <p className="text-muted-foreground text-xs mt-0.5">Parameterraum absuchen · ehrlich gegen Overfitting testen</p>
            </div>
            <div className="flex items-center gap-2">
              <VoltButton variant="primary" size="sm" loading={backtestM.isPending} onClick={() => backtestM.mutate({ paths: 40, vol: 0.025 })}>
                Sweep
              </VoltButton>
              <VoltButton variant="outline" size="sm" loading={walkForwardM.isPending} onClick={() => walkForwardM.mutate({ paths: 40, vol: 0.025 })}>
                Walk-Forward (Sim)
              </VoltButton>
              <VoltButton variant="outline" size="sm" loading={walkHistM.isPending} onClick={() => walkHistM.mutate({ instrument: form.instrument, days: 180 })}>
                Auf echten Kursen
              </VoltButton>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Historischer Walk-Forward */}
            {walkHistM.data && (
              <div className={`rounded-xl border p-3 ${walkHistM.data.holdsUp ? "border-[#1A9E5A]/40 bg-[#1A9E5A]/8" : "border-[#E8402A]/40 bg-[#E8402A]/8"}`}>
                <p className="text-sm font-semibold mb-1">
                  Echte Kurse ({walkHistM.data.instrument}, {walkHistM.data.points} Tage · CoinGecko):
                  {" "}{walkHistM.data.holdsUp ? "hält out-of-sample" : "bricht out-of-sample ein"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Sieger {walkHistM.data.inSample.config.strategy} dip{walkHistM.data.inSample.config.dipPct}/tp{walkHistM.data.inSample.config.takeProfitPct}/sl{walkHistM.data.inSample.config.stopLossPct} ·
                  {" "}IS {walkHistM.data.inSample.avgReturnPct.toFixed(1)}% → OS {walkHistM.data.outOfSample.avgReturnPct.toFixed(1)}%
                  {" "}(Overfit-Lücke {walkHistM.data.overfitGapPct.toFixed(1)} Pp)
                </p>
              </div>
            )}

            {/* Walk-Forward-Ergebnis */}
            {walkForwardM.data && (
              <div className={`rounded-xl border p-3 ${walkForwardM.data.holdsUp ? "border-[#1A9E5A]/40 bg-[#1A9E5A]/8" : "border-[#E8402A]/40 bg-[#E8402A]/8"}`}>
                <p className="text-sm font-semibold mb-1">
                  Walk-Forward: {walkForwardM.data.holdsUp ? "hält out-of-sample stand" : "bricht out-of-sample ein"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Beste Config {walkForwardM.data.inSample.config.strategy} dip{walkForwardM.data.inSample.config.dipPct}/tp{walkForwardM.data.inSample.config.takeProfitPct}/sl{walkForwardM.data.inSample.config.stopLossPct} ·
                  {" "}In-Sample Ø{walkForwardM.data.inSample.avgReturnPct.toFixed(1)}% → Out-of-Sample Ø{walkForwardM.data.outOfSample.avgReturnPct.toFixed(1)}%
                  {" "}(Overfit-Lücke {walkForwardM.data.overfitGapPct.toFixed(1)} Pp)
                </p>
              </div>
            )}

            {/* Sweep-Top-Tabelle */}
            {backtestM.data && (
              <div className="overflow-x-auto">
                <div className="text-xs text-muted-foreground mb-2">Top 10 von {backtestM.data.total} Configs (nach Rendite/Risiko)</div>
                <div className="divide-y divide-border">
                  {backtestM.data.top.map((r, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 py-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <VoltBadge variant={r.config.strategy === "MOMENTUM" ? "neutral" : "muted"} size="sm">
                          {r.config.strategy === "MOMENTUM" ? "Mom" : "Dip"}
                        </VoltBadge>
                        <span className="text-xs font-mono truncate">
                          dip{r.config.dipPct} tp{r.config.takeProfitPct} sl{r.config.stopLossPct}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs font-mono">{r.avgReturnPct >= 0 ? "+" : ""}{r.avgReturnPct.toFixed(1)}%</span>
                        <span className="text-xs font-mono text-muted-foreground">DD {r.avgMaxDrawdownPct.toFixed(1)}%</span>
                        <span className="text-xs font-semibold">R/R {r.riskAdjusted.toFixed(2)}</span>
                        <VoltButton variant="ghost" size="sm" onClick={() => applyConfig(r.config)}>Übernehmen</VoltButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!backtestM.data && !walkForwardM.data && (
              <p className="text-sm text-muted-foreground text-center py-6">
                Starte einen Sweep, um die besten Risiko/Rendite-Configs zu finden – oder einen Walk-Forward für den ehrlichen Overfit-Test.
              </p>
            )}
          </div>
        </VoltCard>

        {/* ── Realitäts-Check (Income & Edge) ── */}
        <VoltCard variant="default" className="p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-display font-bold text-sm">Realitäts-Check</h3>
            <p className="text-muted-foreground text-xs mt-0.5">Fester Einsatz statt Compounding · was ein Tagesziel wirklich verlangt</p>
          </div>
          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Income-Verteilung */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Tagesrendite (fester Einsatz)</span>
                <VoltButton variant="primary" size="sm" loading={incomeM.isPending} onClick={() => incomeM.mutate({ windows: 400, windowTicks: 24, vol: 0.03 })}>
                  Verteilung
                </VoltButton>
              </div>
              {incomeM.data ? (
                <div className="rounded-xl border border-border p-3 space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">„Tage" verdoppelt (≥ +100 %)</span><span className="font-mono font-semibold">{incomeM.data.doubledPct.toFixed(1)} %</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">profitabel (&gt; 0 %)</span><span className="font-mono">{incomeM.data.profitablePct.toFixed(1)} %</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Median-Tag</span><span className="font-mono">{incomeM.data.medianReturnPct.toFixed(1)} %</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Mittelwert</span><span className="font-mono">{incomeM.data.meanReturnPct.toFixed(1)} %</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">bestes / schlechtestes</span><span className="font-mono">{incomeM.data.bestPct.toFixed(0)} % / {incomeM.data.worstPct.toFixed(0)} %</span></div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Misst über {`${400}`} simulierte „Tage", wie oft ein fester Einsatz sich verdoppelt — ohne Compounding-Illusion.</p>
              )}
            </div>

            {/* Edge-Rechner */}
            <div className="space-y-3">
              <span className="text-sm font-semibold">Welcher Edge wäre nötig?</span>
              <div className="grid grid-cols-3 gap-2">
                <VoltInput label="Ziel %/Tag" inputMode="decimal" value={edge.target} onChange={(e) => setEdge((s) => ({ ...s, target: e.target.value }))} />
                <VoltInput label="Trades/Tag" inputMode="numeric" value={edge.trades} onChange={(e) => setEdge((s) => ({ ...s, trades: e.target.value }))} />
                <VoltInput label="Move %" inputMode="decimal" value={edge.move} onChange={(e) => setEdge((s) => ({ ...s, move: e.target.value }))} />
              </div>
              <VoltButton
                variant="outline" size="sm" className="w-full" loading={edgeCalcM.isPending}
                onClick={() => edgeCalcM.mutate({ targetDailyReturnPct: Number(edge.target), tradesPerDay: Math.max(1, Math.round(Number(edge.trades))), moveSizePct: Number(edge.move) })}
              >
                Berechnen
              </VoltButton>
              {edgeCalcM.data && (
                <div className={`rounded-xl border p-3 text-xs ${edgeCalcM.data.realistic ? "border-[#1A9E5A]/40 bg-[#1A9E5A]/8" : edgeCalcM.data.feasible ? "border-amber-500/40 bg-amber-500/8" : "border-[#E8402A]/40 bg-[#E8402A]/8"}`}>
                  <p className="text-sm font-semibold mb-1">
                    {edgeCalcM.data.realistic
                      ? "Plausibel — mit echtem Edge erreichbar"
                      : edgeCalcM.data.feasible
                        ? "Nur theoretisch — verlangt unrealistische Trefferquote"
                        : "Unmöglich — Trefferquote über 100 %"}
                  </p>
                  <div className="flex justify-between"><span className="text-muted-foreground">nötige Trefferquote</span><span className="font-mono font-semibold">{(edgeCalcM.data.requiredWinRate * 100).toFixed(1)} %</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">nötige Erwartung/Trade</span><span className="font-mono">{edgeCalcM.data.requiredPerTradeReturnPct.toFixed(2)} %</span></div>
                </div>
              )}
            </div>
          </div>
        </VoltCard>
      </main>

      <VoltToastContainer toasts={toasts} onDismiss={dismiss} position="top-right" />
    </div>
  );
}
