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
      </main>

      <VoltToastContainer toasts={toasts} onDismiss={dismiss} position="top-right" />
    </div>
  );
}
