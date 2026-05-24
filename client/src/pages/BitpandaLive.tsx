/**
 * Bitpanda Co-Pilot – Live-Tool (echte tRPC-Endpunkte)
 * Route: /bitpanda
 *
 * Read-only zuerst (Status, Balances). Das Order-Ticket läuft strikt
 * Vorschau → Bestätigung: previewOrder prüft die Guardrails, placeOrder sendet
 * nur mit ausdrücklicher Bestätigung (confirm:true) und nur, wenn die
 * Server-Schalter es erlauben. Nichts passiert autonom.
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltStat } from "@/components/volt/VoltStat";
import { VoltInput } from "@/components/volt/VoltInput";
import { VoltModal } from "@/components/volt/VoltModal";
import { VoltToastContainer, useVoltToast } from "@/components/volt/VoltToast";
import {
  ArrowLeft, Terminal, ShieldCheck, ShieldAlert, KeyRound, Wallet,
  RefreshCw, AlertTriangle, CheckCircle2, Lock, Eye, Info,
  ListOrdered, XCircle, TrendingUp, Bell, Clock, Plus, Trash2,
} from "lucide-react";

type Side = "BUY" | "SELL";
type OrderType = "MARKET" | "LIMIT";

export default function BitpandaLive() {
  const { toasts, add, dismiss } = useVoltToast();

  const statusQ = trpc.bitpanda.status.useQuery();
  const balancesQ = trpc.bitpanda.balances.useQuery(undefined, { retry: false });
  const openOrdersQ = trpc.bitpanda.openOrders.useQuery(undefined, { retry: false });

  const [instrument, setInstrument] = useState("BTC_EUR");
  const [side, setSide] = useState<Side>("BUY");
  const [type, setType] = useState<OrderType>("LIMIT");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<{ order_id: string; instrument_code: string } | null>(null);

  const tickerQ = trpc.bitpanda.ticker.useQuery(
    { instrumentCode: instrument.trim().toUpperCase() },
    { enabled: false, retry: false },
  );
  const lastPrice = tickerQ.data && !Array.isArray(tickerQ.data) ? tickerQ.data.last_price : null;

  const cancelM = trpc.bitpanda.cancelOrder.useMutation({
    onSuccess: (res) => {
      add({ title: "Order storniert", description: res.message, variant: "success" });
      setCancelTarget(null);
      openOrdersQ.refetch();
    },
    onError: (e) => add({ title: "Stornieren fehlgeschlagen", description: e.message, variant: "error" }),
  });

  // ── Alert-Regeln & ausgelöste Alerts ──
  const rulesQ = trpc.bitpanda.listRules.useQuery(undefined, { retry: false });
  const alertsQ = trpc.bitpanda.listAlerts.useQuery(undefined, { retry: false, refetchInterval: 15000 });

  const [ruleType, setRuleType] = useState<"PRICE" | "ALLOCATION">("PRICE");
  const [ruleTarget, setRuleTarget] = useState("BTC_EUR");
  const [ruleComparator, setRuleComparator] = useState<"ABOVE" | "BELOW">("BELOW");
  const [ruleValue, setRuleValue] = useState("");

  const createRuleM = trpc.bitpanda.createRule.useMutation({
    onSuccess: () => { add({ title: "Regel angelegt", variant: "success" }); setRuleValue(""); rulesQ.refetch(); },
    onError: (e) => add({ title: "Regel fehlgeschlagen", description: e.message, variant: "error" }),
  });
  const deleteRuleM = trpc.bitpanda.deleteRule.useMutation({ onSuccess: () => rulesQ.refetch() });
  const toggleRuleM = trpc.bitpanda.toggleRule.useMutation({ onSuccess: () => rulesQ.refetch() });
  const dismissAlertM = trpc.bitpanda.dismissAlert.useMutation({ onSuccess: () => alertsQ.refetch() });
  const evaluateNowM = trpc.bitpanda.evaluateNow.useMutation({
    onSuccess: (res) => {
      add({ title: "Regeln geprüft", description: `${res.checked} geprüft · ${res.triggered} ausgelöst`, variant: res.triggered > 0 ? "warning" : "info" });
      alertsQ.refetch();
    },
    onError: (e) => add({ title: "Prüfung fehlgeschlagen", description: e.message, variant: "error" }),
  });

  const addRule = () => {
    const v = Number(ruleValue);
    if (!ruleTarget.trim() || !Number.isFinite(v) || v <= 0) {
      add({ title: "Eingabe prüfen", description: "Ziel und ein positiver Wert sind nötig.", variant: "warning" });
      return;
    }
    createRuleM.mutate({ type: ruleType, target: ruleTarget.trim(), comparator: ruleComparator, value: v });
  };

  const alertToTicket = (a: { type: string; target: string; comparator: string }) => {
    const instr = a.type === "PRICE" ? a.target : `${a.target}_${status?.quoteCurrency ?? "EUR"}`;
    setInstrument(instr.toUpperCase());
    setSide(a.comparator === "BELOW" ? "BUY" : "SELL");
    previewM.reset();
    add({ title: "Ins Ticket übernommen", description: instr.toUpperCase(), variant: "info" });
  };

  const orderPayload = () => ({
    instrument_code: instrument.trim().toUpperCase(),
    side,
    type,
    amount: amount.trim(),
    ...(type === "LIMIT" ? { price: price.trim() } : {}),
  });

  const previewM = trpc.bitpanda.previewOrder.useMutation();
  const placeM = trpc.bitpanda.placeOrder.useMutation({
    onSuccess: (res) => {
      add({
        title: res.executed ? "Order gesendet" : "Order nicht gesendet",
        description: res.message,
        variant: res.executed ? "success" : "warning",
      });
      setConfirmOpen(false);
      if (res.executed) { balancesQ.refetch(); openOrdersQ.refetch(); }
    },
    onError: (e) => add({ title: "Fehler beim Senden", description: e.message, variant: "error" }),
  });

  const status = statusQ.data;
  const preview = previewM.data;
  const liveTrading = status?.tradingEnabled && !status?.dryRun;

  const runPreview = () => {
    if (!amount.trim() || (type === "LIMIT" && !price.trim())) {
      add({ title: "Eingabe unvollständig", description: "Menge (und Preis bei Limit) angeben.", variant: "warning" });
      return;
    }
    previewM.mutate(orderPayload(), {
      onError: (e) => add({ title: "Vorschau fehlgeschlagen", description: e.message, variant: "error" }),
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Start</span>
          </Link>
          <span className="text-border text-lg font-light select-none">/</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Bitpanda Co-Pilot</span>
            <VoltBadge variant="outline" size="sm">Live</VoltBadge>
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

        {/* ── Sicherheits-Status ── */}
        <div className={`rounded-2xl border px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 ${
          liveTrading ? "border-[#E8402A]/40 bg-[#E8402A]/8" : "border-border bg-[#E4FF97]/20"
        }`}>
          <span className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${liveTrading ? "bg-[#E8402A]" : "bg-foreground"}`}>
            {liveTrading ? <ShieldAlert className="w-4 h-4 text-white" /> : <ShieldCheck className="w-4 h-4 text-[#E4FF97]" />}
          </span>
          <div className="flex-1 leading-snug">
            <p className="text-sm font-bold">
              {statusQ.isLoading ? "Status wird geladen …" : liveTrading ? "Live-Trading aktiv" : "Sicherer Modus"}
            </p>
            <p className="text-xs text-muted-foreground">
              {liveTrading
                ? "Echte Orders können gesendet werden – jede Order bestätigst du selbst."
                : "Read-only / Dry-Run. Orders werden simuliert, bis du die Schalter in deiner .env aktivierst."}
            </p>
          </div>
          {status && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <VoltBadge variant={status.hasApiKey ? "positive" : "muted"} size="sm">
                <KeyRound className="w-3 h-3" /> {status.hasApiKey ? "API-Key gesetzt" : "kein Key"}
              </VoltBadge>
              <VoltBadge variant={status.tradingEnabled ? "negative" : "neutral"} size="sm">
                Trading: {status.tradingEnabled ? "an" : "aus"}
              </VoltBadge>
              <VoltBadge variant={status.dryRun ? "neutral" : "negative"} size="sm">
                <Eye className="w-3 h-3" /> Dry-Run: {status.dryRun ? "an" : "aus"}
              </VoltBadge>
              {status.killSwitch && <VoltBadge variant="negative" size="sm"><Lock className="w-3 h-3" /> Kill-Switch</VoltBadge>}
              <VoltBadge variant="muted" size="sm">max {status.maxOrderEur} {status.quoteCurrency}</VoltBadge>
            </div>
          )}
        </div>

        {/* ── Ausgelöste Alerts (Entscheidungen) ── */}
        <VoltCard variant="default" className="p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <span className="relative w-8 h-8 rounded-xl bg-foreground flex items-center justify-center">
                <Bell className="w-4 h-4 text-[#E4FF97]" />
                {alertsQ.data && alertsQ.data.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#E8402A] text-white text-[0.6rem] font-bold flex items-center justify-center">
                    {alertsQ.data.length}
                  </span>
                )}
              </span>
              <div>
                <h3 className="font-display font-bold text-sm">Entscheidungs-Alerts</h3>
                <p className="text-muted-foreground text-xs mt-0.5">Ausgelöste Regeln – du entscheidest</p>
              </div>
            </div>
            <VoltButton
              variant="outline" size="sm"
              loading={evaluateNowM.isPending}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={() => evaluateNowM.mutate()}
            >
              Jetzt prüfen
            </VoltButton>
          </div>
          <div className="divide-y divide-border">
            {(!alertsQ.data || alertsQ.data.length === 0) && (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-2">
                <CheckCircle2 className="w-8 h-8 text-[#1A9E5A]" />
                <p className="text-sm font-semibold">Keine offenen Alerts</p>
                <p className="text-xs text-muted-foreground">Sobald eine Regel auslöst, erscheint sie hier zur Entscheidung.</p>
              </div>
            )}
            {alertsQ.data?.map((a) => (
              <div key={a.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-l-4 border-l-amber-500">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">{a.detail}</p>
                    <span className="inline-flex items-center gap-1 text-[0.7rem] text-muted-foreground mt-1.5">
                      <Clock className="w-3 h-3" /> {new Date(a.createdAt).toLocaleString("de-DE")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <VoltButton variant="primary" size="sm" onClick={() => alertToTicket(a)}>Zum Ticket</VoltButton>
                  <VoltButton variant="ghost" size="sm" onClick={() => dismissAlertM.mutate({ id: a.id })}>Erledigt</VoltButton>
                </div>
              </div>
            ))}
          </div>
        </VoltCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Balances ── */}
          <VoltCard variant="default" className="p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-foreground flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-[#E4FF97]" />
                </span>
                <h3 className="font-display font-bold text-sm">Kontostände</h3>
              </div>
              <VoltButton
                variant="ghost" size="sm"
                leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${balancesQ.isFetching ? "animate-spin" : ""}`} />}
                onClick={() => balancesQ.refetch()}
              >
                Aktualisieren
              </VoltButton>
            </div>
            <div className="p-4">
              {balancesQ.isLoading && (
                <p className="text-sm text-muted-foreground text-center py-8">Lade Kontostände …</p>
              )}
              {balancesQ.isError && (
                <div className="flex flex-col items-center text-center gap-2 py-8">
                  <KeyRound className="w-7 h-7 text-muted-foreground" />
                  <p className="text-sm font-semibold">Keine Kontodaten</p>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Hinterlege <code className="font-mono">BITPANDA_API_KEY</code> in deiner <code className="font-mono">.env</code> und starte das Tool lokal neu.
                  </p>
                  <p className="text-[0.7rem] text-muted-foreground/70 mt-1">{balancesQ.error.message}</p>
                </div>
              )}
              {balancesQ.data && (
                <div className="divide-y divide-border">
                  {(balancesQ.data as Array<{ currency_code: string; available: string; locked: string }>)
                    .filter((b) => Number(b.available) > 0 || Number(b.locked) > 0)
                    .map((b) => (
                      <div key={b.currency_code} className="flex items-center justify-between py-2.5">
                        <span className="text-sm font-semibold font-mono">{b.currency_code}</span>
                        <div className="text-right">
                          <div className="text-sm font-mono">{b.available}</div>
                          {Number(b.locked) > 0 && (
                            <div className="text-[0.7rem] text-muted-foreground font-mono">{b.locked} gebunden</div>
                          )}
                        </div>
                      </div>
                    ))}
                  {(balancesQ.data as unknown[]).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">Keine Guthaben gefunden.</p>
                  )}
                </div>
              )}
            </div>
          </VoltCard>

          {/* ── Order-Ticket ── */}
          <VoltCard variant="default" className="p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-display font-bold text-sm">Order-Ticket</h3>
              <p className="text-muted-foreground text-xs mt-0.5">Vorschau prüfen, dann selbst bestätigen</p>
            </div>
            <div className="p-4 space-y-4">
              {/* Side */}
              <div className="grid grid-cols-2 gap-2">
                {(["BUY", "SELL"] as Side[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSide(s); previewM.reset(); }}
                    className={`h-9 rounded-lg text-sm font-semibold transition-all border ${
                      side === s
                        ? s === "BUY" ? "bg-[#1A9E5A] text-white border-transparent" : "bg-[#E8402A] text-white border-transparent"
                        : "bg-transparent text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    {s === "BUY" ? "Kaufen" : "Verkaufen"}
                  </button>
                ))}
              </div>

              {/* Type */}
              <div className="grid grid-cols-2 gap-2">
                {(["LIMIT", "MARKET"] as OrderType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setType(t); previewM.reset(); }}
                    className={`h-9 rounded-lg text-sm font-semibold transition-all border ${
                      type === t ? "bg-foreground text-background border-transparent" : "bg-transparent text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    {t === "LIMIT" ? "Limit" : "Market"}
                  </button>
                ))}
              </div>

              <div className="flex items-end gap-2">
                <VoltInput
                  label="Instrument" placeholder="BTC_EUR" className="flex-1"
                  value={instrument}
                  onChange={(e) => { setInstrument(e.target.value); previewM.reset(); }}
                />
                <VoltButton
                  variant="outline" size="md"
                  loading={tickerQ.isFetching}
                  leftIcon={<TrendingUp className="w-3.5 h-3.5" />}
                  onClick={() => tickerQ.refetch()}
                >
                  Kurs
                </VoltButton>
              </div>
              {lastPrice && (
                <p className="text-xs text-muted-foreground -mt-2">
                  Aktueller Kurs {instrument.toUpperCase()}: <span className="font-mono text-foreground">{lastPrice}</span>
                </p>
              )}
              {tickerQ.isError && (
                <p className="text-xs text-[#A01A08] -mt-2">Kurs nicht abrufbar: {tickerQ.error.message}</p>
              )}
              <div className="grid grid-cols-2 gap-3">
                <VoltInput
                  label="Menge (Basis)" placeholder="0.01" inputMode="decimal"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); previewM.reset(); }}
                />
                {type === "LIMIT" && (
                  <VoltInput
                    label="Limit-Preis" placeholder="60000" inputMode="decimal"
                    value={price}
                    onChange={(e) => { setPrice(e.target.value); previewM.reset(); }}
                  />
                )}
              </div>

              {/* Preview-Ergebnis */}
              {preview && (
                <div className={`rounded-xl border p-3 space-y-2 ${preview.check.allowed ? "border-[#1A9E5A]/40 bg-[#1A9E5A]/8" : "border-[#E8402A]/40 bg-[#E8402A]/8"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">
                      {preview.check.allowed ? "Vorschau OK" : "Vorschau – blockiert"}
                    </span>
                    {preview.estimatedEur !== null && (
                      <span className="text-xs font-mono">~ {preview.estimatedEur.toFixed(2)} {status?.quoteCurrency ?? "EUR"}</span>
                    )}
                  </div>
                  {preview.check.blockers.map((b, i) => (
                    <p key={i} className="flex items-start gap-1.5 text-xs text-[#A01A08]">
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />{b}
                    </p>
                  ))}
                  {preview.check.warnings.map((w, i) => (
                    <p key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />{w}
                    </p>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <VoltButton
                  variant="outline" size="md" className="flex-1"
                  loading={previewM.isPending}
                  onClick={runPreview}
                >
                  Vorschau prüfen
                </VoltButton>
                <VoltButton
                  variant="primary" size="md" className="flex-1"
                  disabled={!preview || !preview.check.allowed}
                  leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
                  onClick={() => setConfirmOpen(true)}
                >
                  Bestätigen
                </VoltButton>
              </div>
            </div>
          </VoltCard>
        </div>

        {/* ── Offene Orders ── */}
        <VoltCard variant="default" className="p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-foreground flex items-center justify-center">
                <ListOrdered className="w-4 h-4 text-[#E4FF97]" />
              </span>
              <h3 className="font-display font-bold text-sm">Offene Orders</h3>
            </div>
            <VoltButton
              variant="ghost" size="sm"
              leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${openOrdersQ.isFetching ? "animate-spin" : ""}`} />}
              onClick={() => openOrdersQ.refetch()}
            >
              Aktualisieren
            </VoltButton>
          </div>
          <div className="p-4">
            {openOrdersQ.isLoading && (
              <p className="text-sm text-muted-foreground text-center py-8">Lade offene Orders …</p>
            )}
            {openOrdersQ.isError && (
              <div className="flex flex-col items-center text-center gap-2 py-8">
                <KeyRound className="w-7 h-7 text-muted-foreground" />
                <p className="text-sm font-semibold">Keine Order-Daten</p>
                <p className="text-xs text-muted-foreground max-w-xs">API-Key erforderlich. {openOrdersQ.error.message}</p>
              </div>
            )}
            {openOrdersQ.data && openOrdersQ.data.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">Keine offenen Orders.</p>
            )}
            {openOrdersQ.data && openOrdersQ.data.length > 0 && (
              <div className="divide-y divide-border">
                {openOrdersQ.data.map((o) => (
                  <div key={o.order_id} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <VoltBadge variant={o.side === "BUY" ? "positive" : "negative"} size="sm">
                        {o.side === "BUY" ? "Kauf" : o.side === "SELL" ? "Verkauf" : o.side}
                      </VoltBadge>
                      <div className="leading-tight min-w-0">
                        <div className="text-sm font-semibold font-mono truncate">{o.instrument_code}</div>
                        <div className="text-[0.7rem] text-muted-foreground font-mono truncate">
                          {o.type} · {o.amount}{o.price ? ` @ ${o.price}` : ""}{o.status ? ` · ${o.status}` : ""}
                        </div>
                      </div>
                    </div>
                    <VoltButton
                      variant="ghost" size="sm"
                      leftIcon={<XCircle className="w-3.5 h-3.5" />}
                      onClick={() => setCancelTarget({ order_id: o.order_id, instrument_code: o.instrument_code })}
                    >
                      Stornieren
                    </VoltButton>
                  </div>
                ))}
              </div>
            )}
          </div>
        </VoltCard>

        {/* ── Alert-Regeln ── */}
        <VoltCard variant="default" className="p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-display font-bold text-sm">Alert-Regeln</h3>
            <p className="text-muted-foreground text-xs mt-0.5">
              Trigger definieren – das Tool prüft sie periodisch und benachrichtigt dich. Es handelt nie selbst.
            </p>
          </div>

          {/* Create-Form */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {(["PRICE", "ALLOCATION"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setRuleType(t); setRuleTarget(t === "PRICE" ? "BTC_EUR" : "SOL"); }}
                  className={`h-9 rounded-lg text-sm font-semibold transition-all border ${
                    ruleType === t ? "bg-foreground text-background border-transparent" : "bg-transparent text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  {t === "PRICE" ? "Preis" : "Allokation"}
                </button>
              ))}
            </div>
            <VoltInput
              label={ruleType === "PRICE" ? "Instrument (z. B. BTC_EUR)" : "Währung (z. B. SOL)"}
              value={ruleTarget}
              onChange={(e) => setRuleTarget(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              {(["BELOW", "ABOVE"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setRuleComparator(c)}
                  className={`h-9 rounded-lg text-sm font-semibold transition-all border ${
                    ruleComparator === c ? "bg-foreground text-background border-transparent" : "bg-transparent text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  {c === "BELOW" ? "fällt unter" : "steigt über"}
                </button>
              ))}
            </div>
            <VoltInput
              label={ruleType === "PRICE" ? "Schwelle (Kurs)" : "Schwelle (% Allokation)"}
              placeholder={ruleType === "PRICE" ? "60000" : "12"}
              inputMode="decimal"
              value={ruleValue}
              onChange={(e) => setRuleValue(e.target.value)}
            />
            <VoltButton
              variant="primary" size="md" className="w-full"
              loading={createRuleM.isPending}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={addRule}
            >
              Regel hinzufügen
            </VoltButton>
          </div>

          {/* Rules-List */}
          <div className="p-4">
            {(!rulesQ.data || rulesQ.data.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-6">Noch keine Regeln definiert.</p>
            )}
            <div className="divide-y divide-border">
              {rulesQ.data?.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <VoltBadge variant={r.type === "PRICE" ? "neutral" : "muted"} size="sm">
                      {r.type === "PRICE" ? "Preis" : "Allokation"}
                    </VoltBadge>
                    <span className="text-sm font-mono truncate">
                      {r.target} {r.comparator === "BELOW" ? "<" : ">"} {r.value}{r.type === "ALLOCATION" ? "%" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleRuleM.mutate({ id: r.id, enabled: !r.enabled })}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                        r.enabled ? "border-[#1A9E5A]/40 text-[#1A9E5A]" : "border-border text-muted-foreground"
                      }`}
                    >
                      {r.enabled ? "Aktiv" : "Pausiert"}
                    </button>
                    <button
                      onClick={() => deleteRuleM.mutate({ id: r.id })}
                      className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-[#E8402A] hover:bg-muted transition-colors"
                      aria-label="Regel löschen"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </VoltCard>
      </main>

      <VoltToastContainer toasts={toasts} onDismiss={dismiss} position="top-right" />

      {/* ── Bestätigungs-Modal ── */}
      <VoltModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Order bestätigen"
        description={status?.dryRun ? "Dry-Run aktiv – diese Order wird nur simuliert." : "Diese Order wird an Bitpanda gesendet."}
        size="md"
        footer={
          <div className="flex gap-2 justify-end w-full">
            <VoltButton variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>Abbrechen</VoltButton>
            <VoltButton
              variant="primary" size="sm"
              loading={placeM.isPending}
              leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
              onClick={() => placeM.mutate({ ...orderPayload(), confirm: true })}
            >
              {status?.dryRun ? "Simulieren" : "Order senden"}
            </VoltButton>
          </div>
        }
      >
        {preview && (
          <div className="space-y-3">
            <div className="rounded-xl border border-border p-4 space-y-2">
              <Row label="Seite" value={side === "BUY" ? "Kaufen" : "Verkaufen"} />
              <Row label="Typ" value={type} />
              <Row label="Instrument" value={instrument.toUpperCase()} />
              <Row label="Menge" value={amount} />
              {type === "LIMIT" && <Row label="Limit-Preis" value={price} />}
              {preview.estimatedEur !== null && (
                <Row label="Gegenwert" value={`~ ${preview.estimatedEur.toFixed(2)} ${status?.quoteCurrency ?? "EUR"}`} />
              )}
            </div>
            <div className="flex items-start gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3">
              <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-snug">
                Du löst diese Order selbst aus. Keine Anlageberatung – Entscheidung und Verantwortung liegen bei dir.
              </p>
            </div>
          </div>
        )}
      </VoltModal>

      {/* ── Stornieren bestätigen ── */}
      <VoltModal
        open={cancelTarget !== null}
        onClose={() => setCancelTarget(null)}
        title="Order stornieren?"
        description="Stornieren entfernt diese offene Order. Diese Aktion bestätigst du selbst."
        size="sm"
        footer={
          <div className="flex gap-2 justify-end w-full">
            <VoltButton variant="ghost" size="sm" onClick={() => setCancelTarget(null)}>Zurück</VoltButton>
            <VoltButton
              variant="destructive" size="sm"
              loading={cancelM.isPending}
              leftIcon={<XCircle className="w-3.5 h-3.5" />}
              onClick={() => cancelTarget && cancelM.mutate({ orderId: cancelTarget.order_id, confirm: true })}
            >
              Stornieren
            </VoltButton>
          </div>
        }
      >
        {cancelTarget && (
          <div className="rounded-xl border border-border p-4 space-y-2">
            <Row label="Instrument" value={cancelTarget.instrument_code} />
            <Row label="Order-ID" value={cancelTarget.order_id} />
          </div>
        )}
      </VoltModal>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold font-mono">{value}</span>
    </div>
  );
}
