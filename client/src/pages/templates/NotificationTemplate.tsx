/**
 * Volt UI – Notification Center Template
 * Route: /showcase/notifications
 * Zeigt: Vollständiges Benachrichtigungszentrum mit Kategorien, Filtern, Aktionen
 * Komponenten: VoltBadge, VoltButton, VoltCard, VoltAvatar, VoltInput, VoltTabs, VoltAlert
 */

import React, { useState } from "react";
import { TemplateShell } from "./TemplateShell";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltAvatar } from "@/components/volt/VoltAvatar";
import { VoltTabs } from "@/components/volt/VoltTabs";
import { VoltAlert } from "@/components/volt/VoltAlert";
import {
  Bell, Check, CheckCheck, Trash2, Settings, Filter,
  MessageSquare, GitPullRequest, AlertCircle, Zap,
  Package, Users, Star, ArrowUpRight, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Typen ── */
type NotifCategory = "all" | "mentions" | "system" | "updates";
type NotifPriority = "high" | "medium" | "low";

interface Notification {
  id: string;
  type: "mention" | "pr" | "alert" | "deploy" | "invite" | "update" | "star";
  title: string;
  body: string;
  time: string;
  read: boolean;
  priority: NotifPriority;
  actor?: string;
  actionLabel?: string;
}

/* ── Dummy-Daten ── */
const INITIAL_NOTIFS: Notification[] = [
  {
    id: "1", type: "mention", title: "@du in Kommentar", read: false, priority: "high",
    body: "Lena Hoffmann hat dich in \"Dashboard Redesign\" erwähnt: \"@du kannst du das reviewen?\"",
    time: "vor 5 Min.", actor: "Lena Hoffmann", actionLabel: "Antworten",
  },
  {
    id: "2", type: "pr", title: "Pull Request gemergt", read: false, priority: "medium",
    body: "feat/volt-v2 wurde erfolgreich in main gemergt. 14 Dateien geändert.",
    time: "vor 23 Min.", actor: "Marcus Steiner", actionLabel: "Ansehen",
  },
  {
    id: "3", type: "alert", title: "Kritischer Fehler erkannt", read: false, priority: "high",
    body: "API-Endpunkt /v1/components gibt seit 5 Min. 503 zurück. Durchschnittliche Latenz: 4.2s.",
    time: "vor 1 Std.", actionLabel: "Logs öffnen",
  },
  {
    id: "4", type: "deploy", title: "Deployment erfolgreich", read: true, priority: "low",
    body: "Version 2.4.1 wurde erfolgreich auf Production deployed. Build-Zeit: 1m 23s.",
    time: "vor 2 Std.", actionLabel: "Ansehen",
  },
  {
    id: "5", type: "invite", title: "Team-Einladung", read: false, priority: "medium",
    body: "Anna Müller hat dich zum Workspace \"Design System\" eingeladen.",
    time: "vor 3 Std.", actor: "Anna Müller", actionLabel: "Annehmen",
  },
  {
    id: "6", type: "update", title: "Volt UI v2.5 verfügbar", read: true, priority: "low",
    body: "Neue Version mit 12 neuen Komponenten, Performance-Verbesserungen und Dark Mode Fixes.",
    time: "vor 5 Std.", actionLabel: "Changelog",
  },
  {
    id: "7", type: "star", title: "Neuer Stern auf GitHub", read: true, priority: "low",
    body: "Dein Repository VoltUI hat einen neuen Stern erhalten. Insgesamt: 1.247 Sterne.",
    time: "vor 6 Std.", actionLabel: "Ansehen",
  },
  {
    id: "8", type: "mention", title: "@du in Issue #142", read: true, priority: "medium",
    body: "Tom Weber hat dich in Issue #142 \"VoltTable: Sortierung fehlt\" erwähnt.",
    time: "gestern", actor: "Tom Weber", actionLabel: "Zum Issue",
  },
];

/* ── Typ-Icon-Map ── */
const TYPE_ICON: Record<Notification["type"], { icon: React.ReactNode; bg: string; color: string }> = {
  mention: { icon: <MessageSquare className="w-4 h-4" />, bg: "bg-blue-100 dark:bg-blue-900/30", color: "text-blue-600 dark:text-blue-400" },
  pr:      { icon: <GitPullRequest className="w-4 h-4" />, bg: "bg-purple-100 dark:bg-purple-900/30", color: "text-purple-600 dark:text-purple-400" },
  alert:   { icon: <AlertCircle className="w-4 h-4" />, bg: "bg-red-100 dark:bg-red-900/30", color: "text-red-600 dark:text-red-400" },
  deploy:  { icon: <Zap className="w-4 h-4" />, bg: "bg-[#E4FF97]/30", color: "text-[#6B7C00] dark:text-primary" },
  invite:  { icon: <Users className="w-4 h-4" />, bg: "bg-orange-100 dark:bg-orange-900/30", color: "text-orange-600 dark:text-orange-400" },
  update:  { icon: <Package className="w-4 h-4" />, bg: "bg-muted", color: "text-muted-foreground" },
  star:    { icon: <Star className="w-4 h-4" />, bg: "bg-yellow-100 dark:bg-yellow-900/30", color: "text-yellow-600 dark:text-yellow-500" },
};

const PRIORITY_DOT: Record<NotifPriority, string> = {
  high:   "bg-[var(--signal-negative)]",
  medium: "bg-[var(--signal-warning,#F59E0B)]",
  low:    "bg-transparent",
};

/* ── Einzelne Benachrichtigung ── */
function NotifItem({
  notif, onRead, onDelete,
}: { notif: Notification; onRead: (id: string) => void; onDelete: (id: string) => void }) {
  const typeInfo = TYPE_ICON[notif.type];

  return (
    <div
      className={cn(
        "group flex gap-3 px-5 py-4 border-b border-border last:border-0 transition-colors cursor-pointer",
        notif.read ? "bg-background hover:bg-muted/40" : "bg-primary/5 hover:bg-primary/10"
      )}
      onClick={() => onRead(notif.id)}
    >
      {/* Ungelesen-Indikator */}
      <div className="flex-shrink-0 pt-1.5">
        <div className={cn("w-2 h-2 rounded-full", notif.read ? "bg-transparent" : PRIORITY_DOT[notif.priority])} />
      </div>

      {/* Icon */}
      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", typeInfo.bg, typeInfo.color)}>
        {typeInfo.icon}
      </div>

      {/* Inhalt */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <p className={cn("text-sm leading-snug", notif.read ? "text-foreground" : "text-foreground font-semibold")}>
            {notif.title}
          </p>
          <span className="text-[11px] text-muted-foreground flex-shrink-0 font-mono">{notif.time}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">{notif.body}</p>
        <div className="flex items-center gap-2">
          {notif.actor && (
            <div className="flex items-center gap-1.5">
              <VoltAvatar name={notif.actor} size="xs" />
              <span className="text-xs text-muted-foreground">{notif.actor}</span>
            </div>
          )}
          {notif.actionLabel && (
            <button className="text-xs font-semibold text-foreground hover:text-primary flex items-center gap-0.5 transition-colors ml-auto">
              {notif.actionLabel} <ArrowUpRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Aktionen (on hover) */}
      <div className="flex-shrink-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onRead(notif.id); }}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          title="Als gelesen markieren"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(notif.id); }}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="Löschen"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ── Hauptkomponente ── */
export default function NotificationTemplate() {
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL_NOTIFS);
  const [activeTab, setActiveTab] = useState<NotifCategory>("all");
  const [showBanner, setShowBanner] = useState(true);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const filtered = notifs.filter((n) => {
    if (activeTab === "mentions") return n.type === "mention";
    if (activeTab === "system")   return n.type === "alert" || n.type === "deploy";
    if (activeTab === "updates")  return n.type === "update" || n.type === "star" || n.type === "pr";
    return true;
  });

  const markRead = (id: string) => setNotifs((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id: string) => setNotifs((p) => p.filter((n) => n.id !== id));
  const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, read: true })));
  const clearAll = () => setNotifs([]);

  return (
    <TemplateShell title="Notification Center" category="App">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="font-display font-bold text-2xl tracking-tight">Benachrichtigungen</h1>
            {unreadCount > 0 && (
              <VoltBadge variant="default" size="sm">{unreadCount} neu</VoltBadge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <VoltButton size="sm" variant="ghost" leftIcon={<CheckCheck className="w-4 h-4" />} onClick={markAllRead}>
              Alle gelesen
            </VoltButton>
            <VoltButton size="sm" variant="ghost" leftIcon={<Trash2 className="w-4 h-4" />} onClick={clearAll}>
              Alle löschen
            </VoltButton>
            <VoltButton size="sm" variant="outline" leftIcon={<Settings className="w-4 h-4" />}>
              Einstellungen
            </VoltButton>
          </div>
        </div>

        {/* ── Kritischer Alert-Banner ── */}
        {showBanner && notifs.some((n) => n.type === "alert" && !n.read) && (
          <div className="mb-4">
            <VoltAlert variant="error" title="Kritischer Fehler aktiv" dismissible onDismiss={() => setShowBanner(false)}>
              Ein API-Endpunkt ist seit über 1 Stunde nicht erreichbar. Sofortige Aufmerksamkeit erforderlich.
            </VoltAlert>
          </div>
        )}

        {/* ── Tabs + Filter ── */}
        <div className="flex items-center justify-between mb-4">
          <VoltTabs
            variant="underline"
            activeTab={activeTab}
            onTabChange={(t) => setActiveTab(t as NotifCategory)}
            tabs={[
              { id: "all",       label: `Alle (${notifs.length})` },
              { id: "mentions",  label: "Erwähnungen" },
              { id: "system",    label: "System" },
              { id: "updates",   label: "Updates" },
            ]}
          />
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>

        {/* ── Benachrichtigungsliste ── */}
        <VoltCard className="p-0 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">Keine Benachrichtigungen</p>
              <p className="text-xs text-muted-foreground">Du bist auf dem neuesten Stand.</p>
            </div>
          ) : (
            filtered.map((n) => (
              <NotifItem key={n.id} notif={n} onRead={markRead} onDelete={deleteNotif} />
            ))
          )}
        </VoltCard>

        {/* ── Prioritäts-Legende ── */}
        <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="font-semibold tracking-widest uppercase">Priorität:</span>
          {[
            { label: "Hoch",   color: "bg-[var(--signal-negative)]" },
            { label: "Mittel", color: "bg-[#F59E0B]" },
          ].map((p) => (
            <div key={p.label} className="flex items-center gap-1.5">
              <div className={cn("w-2 h-2 rounded-full", p.color)} />
              {p.label}
            </div>
          ))}
        </div>

      </div>
    </TemplateShell>
  );
}
