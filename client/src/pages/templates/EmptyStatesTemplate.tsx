/**
 * Volt UI – Empty States Template
 * Route: /showcase/empty-states
 * Sammlung von 8 leeren Zuständen
 */
import { TemplateShell } from "./TemplateShell";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltAlert } from "@/components/volt/VoltAlert";
import {
  Inbox, Search, AlertTriangle, WifiOff, Lock, FolderOpen,
  ShoppingCart, Plus, RefreshCw, ArrowRight,
  Zap, UploadCloud,
} from "lucide-react";

interface EmptyState {
  id: string;
  label: string;
  component: React.ReactNode;
}

function EmptyInbox() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
        <Inbox className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-display font-bold text-base mb-1.5">Alles erledigt</h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-5">
        Dein Posteingang ist leer. Neue Nachrichten erscheinen hier.
      </p>
      <VoltButton variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
        Aktualisieren
      </VoltButton>
    </div>
  );
}

function EmptySearch({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-display font-bold text-base mb-1.5">Keine Ergebnisse</h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-5">
        Für <span className="font-semibold text-foreground">"{query}"</span> wurden keine Treffer gefunden.
        Versuche andere Suchbegriffe.
      </p>
      <div className="flex gap-2">
        <VoltBadge variant="outline" size="sm" className="cursor-pointer hover:bg-muted">Suche leeren</VoltBadge>
        <VoltBadge variant="outline" size="sm" className="cursor-pointer hover:bg-muted">Filter zurücksetzen</VoltBadge>
      </div>
    </div>
  );
}

function EmptyError() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 rounded-2xl flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="font-display font-bold text-base mb-1.5">Fehler beim Laden</h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-5">
        Die Daten konnten nicht geladen werden. Bitte versuche es erneut oder kontaktiere den Support.
      </p>
      <div className="flex gap-2">
        <VoltButton variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Erneut versuchen
        </VoltButton>
        <VoltButton variant="ghost" size="sm">
          Support kontaktieren
        </VoltButton>
      </div>
    </div>
  );
}

function EmptyOffline() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
        <WifiOff className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-display font-bold text-base mb-1.5">Keine Verbindung</h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-5">
        Du bist offline. Prüfe deine Internetverbindung und versuche es erneut.
      </p>
      <VoltButton variant="primary" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
        Verbindung prüfen
      </VoltButton>
    </div>
  );
}

function EmptyPermission() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="w-16 h-16 bg-[#E4FF97] rounded-2xl flex items-center justify-center mb-4">
        <Lock className="w-8 h-8 text-black" />
      </div>
      <h3 className="font-display font-bold text-base mb-1.5">Zugriff verweigert</h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-5">
        Du hast keine Berechtigung, diesen Inhalt anzuzeigen.
        Wende dich an deinen Administrator.
      </p>
      <VoltButton variant="outline" size="sm" leftIcon={<ArrowRight className="w-3.5 h-3.5" />}>
        Upgrade anfragen
      </VoltButton>
    </div>
  );
}

function EmptyFolder() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
        <FolderOpen className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-display font-bold text-base mb-1.5">Ordner ist leer</h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-5">
        Noch keine Dateien vorhanden. Lade Dateien hoch oder erstelle neue Dokumente.
      </p>
      <div className="flex gap-2">
        <VoltButton variant="primary" size="sm" leftIcon={<UploadCloud className="w-3.5 h-3.5" />}>
          Hochladen
        </VoltButton>
        <VoltButton variant="outline" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Neu erstellen
        </VoltButton>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
        <ShoppingCart className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-display font-bold text-base mb-1.5">Warenkorb ist leer</h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-5">
        Füge Produkte hinzu, um fortzufahren.
      </p>
      <VoltButton variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
        Produkte entdecken
      </VoltButton>
    </div>
  );
}

function EmptyOnboarding() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center mb-4">
        <Zap className="w-8 h-8 text-[#E4FF97]" />
      </div>
      <h3 className="font-display font-bold text-base mb-1.5">Bereit loszulegen?</h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-5">
        Du hast noch keine Projekte erstellt. Starte dein erstes Projekt in weniger als 2 Minuten.
      </p>
      <VoltButton variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
        Erstes Projekt erstellen
      </VoltButton>
    </div>
  );
}

const STATES: EmptyState[] = [
  { id: "inbox",       label: "Leerer Posteingang",   component: <EmptyInbox /> },
  { id: "search",      label: "Keine Suchergebnisse", component: <EmptySearch query="volt dashboard" /> },
  { id: "error",       label: "Ladefehler",           component: <EmptyError /> },
  { id: "offline",     label: "Offline",              component: <EmptyOffline /> },
  { id: "permission",  label: "Kein Zugriff",         component: <EmptyPermission /> },
  { id: "folder",      label: "Leerer Ordner",        component: <EmptyFolder /> },
  { id: "cart",        label: "Leerer Warenkorb",     component: <EmptyCart /> },
  { id: "onboarding",  label: "Onboarding",           component: <EmptyOnboarding /> },
];

export default function EmptyStatesTemplate() {
  return (
    <TemplateShell title="Empty States" category="UI Patterns">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <VoltBadge variant="outline" size="sm" className="mb-4">UI Pattern</VoltBadge>
        <h1 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-3">
          Empty States
        </h1>
        <p className="text-muted-foreground max-w-xl">
          8 vorgefertigte leere Zustände für häufige Szenarien – sofort einsetzbar, konsistent gestaltet.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATES.map((s) => (
            <VoltCard key={s.id} variant="default" className="overflow-hidden p-0">
              <div className="px-4 py-2.5 border-b border-border bg-muted/30">
                <span className="text-xs font-semibold text-muted-foreground">{s.label}</span>
              </div>
              {s.component}
            </VoltCard>
          ))}
        </div>

        {/* Usage Hint */}
        <div className="mt-8">
          <VoltAlert variant="info" title="Verwendung">
            Importiere die gewünschten Empty-State-Komponenten aus diesem Template und passe Text,
            Icon und Aktionen an deinen Anwendungsfall an. Alle Zustände sind vollständig responsiv
            und respektieren das aktive Theme (hell/dunkel).
          </VoltAlert>
        </div>
      </section>
    </TemplateShell>
  );
}
