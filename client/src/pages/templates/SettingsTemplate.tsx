/**
 * Volt UI – Settings Page Template
 * Route: /showcase/settings
 * Zeigt: Account-Einstellungen, Benachrichtigungen, Sicherheit, Appearance
 * Komponenten: VoltInput, VoltToggle, VoltButton, VoltBadge, VoltCard, VoltAvatar, VoltSelect, VoltAlert
 */

import React, { useState } from "react";
import { TemplateShell } from "./TemplateShell";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltInput, VoltSelect } from "@/components/volt/VoltInput";
import { VoltToggle } from "@/components/volt/VoltToggle";
import { VoltAlert } from "@/components/volt/VoltAlert";
import { VoltAvatar } from "@/components/volt/VoltAvatar";
import {
  User, Bell, Shield, Palette, CreditCard, Key, Trash2,
  Globe, Moon, Sun, Monitor, ChevronRight, LogOut, Check,
  Smartphone, Mail, Slack, Github, Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Sidebar-Navigation ── */
const NAV_SECTIONS = [
  { id: "account",       label: "Account",          icon: <User className="w-4 h-4" /> },
  { id: "notifications", label: "Benachrichtigungen",icon: <Bell className="w-4 h-4" /> },
  { id: "security",      label: "Sicherheit",        icon: <Shield className="w-4 h-4" /> },
  { id: "appearance",    label: "Darstellung",       icon: <Palette className="w-4 h-4" /> },
  { id: "billing",       label: "Abrechnung",        icon: <CreditCard className="w-4 h-4" /> },
  { id: "api",           label: "API & Tokens",      icon: <Key className="w-4 h-4" /> },
  { id: "danger",        label: "Gefahrenzone",      icon: <Trash2 className="w-4 h-4" />, danger: true },
];

/* ── Notification-Kanal-Zeile ── */
function NotifRow({
  icon, label, description, defaultOn = true,
}: { icon: React.ReactNode; label: string; description: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <VoltToggle checked={on} onChange={(e) => setOn(e.target.checked)} variant="primary" toggleSize="sm" />
    </div>
  );
}

/* ── API-Token-Zeile ── */
function TokenRow({ name, created, lastUsed, scope }: { name: string; created: string; lastUsed: string; scope: string }) {
  const [revoked, setRevoked] = useState(false);
  return (
    <div className={cn("flex items-center gap-4 py-3.5 border-b border-border last:border-0", revoked && "opacity-40")}>
      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">Erstellt {created} · Zuletzt {lastUsed}</p>
      </div>
      <VoltBadge variant="outline" size="sm">{scope}</VoltBadge>
      <VoltButton
        size="sm" variant="ghost"
        className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
        onClick={() => setRevoked(true)}
        disabled={revoked}
      >
        {revoked ? <Check className="w-3.5 h-3.5" /> : "Widerrufen"}
      </VoltButton>
    </div>
  );
}

/* ── Hauptkomponente ── */
export default function SettingsTemplate() {
  const [activeSection, setActiveSection] = useState("account");
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <TemplateShell title="Settings Page" category="App">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Page Header ── */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl tracking-tight mb-1">Einstellungen</h1>
          <p className="text-muted-foreground text-sm">Verwalte dein Konto, Sicherheit und Präferenzen.</p>
        </div>

        <div className="flex gap-8">
          {/* ── Sidebar ── */}
          <aside className="hidden md:flex flex-col w-52 flex-shrink-0 gap-1">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left",
                  activeSection === s.id
                    ? "bg-foreground text-background"
                    : s.danger
                    ? "text-destructive hover:bg-destructive/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
            <div className="mt-auto pt-4 border-t border-border">
              <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted w-full transition-all">
                <LogOut className="w-4 h-4" />
                Abmelden
              </button>
            </div>
          </aside>

          {/* ── Hauptinhalt ── */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* ── Account ── */}
            {activeSection === "account" && (
              <>
                {saved && (
                  <VoltAlert variant="success" title="Gespeichert">
                    Deine Änderungen wurden erfolgreich gespeichert.
                  </VoltAlert>
                )}

                {/* Profil */}
                <VoltCard className="p-6">
                  <h2 className="font-display font-bold text-base mb-5">Profil</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <VoltAvatar
                      src="https://api.dicebear.com/9.x/initials/svg?seed=JF&backgroundColor=E4FF97&fontColor=0A0A0A"
                      name="JF"
                      size="xl"
                    />
                    <div>
                      <p className="font-semibold text-sm">Joachim Fischer</p>
                      <p className="text-xs text-muted-foreground mb-2">joachim@example.com</p>
                      <div className="flex gap-2">
                        <VoltButton size="sm" variant="outline">Foto ändern</VoltButton>
                        <VoltButton size="sm" variant="ghost">Entfernen</VoltButton>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <VoltInput label="Vorname" defaultValue="Joachim" variant="boxed" />
                    <VoltInput label="Nachname" defaultValue="Fischer" variant="boxed" />
                    <VoltInput label="E-Mail" defaultValue="joachim@example.com" type="email" variant="boxed" />
                    <VoltInput label="Benutzername" defaultValue="joachim-fas" variant="boxed" leftElement={<span className="text-xs text-muted-foreground">@</span>} />
                    <div className="sm:col-span-2">
                      <VoltSelect label="Sprache" variant="boxed" defaultValue="de">
                        <option value="de">Deutsch</option>
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="es">Español</option>
                      </VoltSelect>
                    </div>
                    <div className="sm:col-span-2">
                      <VoltSelect label="Zeitzone" variant="boxed" defaultValue="europe-berlin">
                        <option value="europe-berlin">Europe/Berlin (UTC+1)</option>
                        <option value="europe-london">Europe/London (UTC+0)</option>
                        <option value="america-new_york">America/New_York (UTC-5)</option>
                        <option value="asia-tokyo">Asia/Tokyo (UTC+9)</option>
                      </VoltSelect>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 pt-5 border-t border-border">
                    <VoltButton onClick={handleSave}>Änderungen speichern</VoltButton>
                  </div>
                </VoltCard>

                {/* Verbundene Konten */}
                <VoltCard className="p-6">
                  <h2 className="font-display font-bold text-base mb-1">Verbundene Konten</h2>
                  <p className="text-xs text-muted-foreground mb-5">Verknüpfe externe Dienste mit deinem Konto.</p>
                  {[
                    { icon: <Github className="w-4 h-4" />, name: "GitHub", handle: "joachim-fas", connected: true },
                    { icon: <Slack className="w-4 h-4" />, name: "Slack", handle: "", connected: false },
                    { icon: <Globe className="w-4 h-4" />, name: "Google", handle: "joachim@gmail.com", connected: true },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          {item.handle && <p className="text-xs text-muted-foreground">{item.handle}</p>}
                        </div>
                      </div>
                      {item.connected
                        ? <VoltBadge variant="positive" size="sm">Verbunden</VoltBadge>
                        : <VoltButton size="sm" variant="outline">Verbinden</VoltButton>
                      }
                    </div>
                  ))}
                </VoltCard>
              </>
            )}

            {/* ── Benachrichtigungen ── */}
            {activeSection === "notifications" && (
              <VoltCard className="p-6">
                <h2 className="font-display font-bold text-base mb-1">Benachrichtigungen</h2>
                <p className="text-xs text-muted-foreground mb-5">Steuere, wie und wann du benachrichtigt wirst.</p>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-3">Kanäle</p>
                  <NotifRow icon={<Mail className="w-4 h-4" />} label="E-Mail" description="Benachrichtigungen per E-Mail" defaultOn={true} />
                  <NotifRow icon={<Smartphone className="w-4 h-4" />} label="Push" description="Browser- und Mobile-Push" defaultOn={false} />
                  <NotifRow icon={<Slack className="w-4 h-4" />} label="Slack" description="Direkt in deinen Workspace" defaultOn={true} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-3">Ereignisse</p>
                  {[
                    { label: "Neue Kommentare",     desc: "Wenn jemand dein Dokument kommentiert", on: true },
                    { label: "Erwähnungen",          desc: "Wenn du @erwähnt wirst",                on: true },
                    { label: "Deployment-Status",   desc: "Erfolg oder Fehler bei Deployments",    on: true },
                    { label: "Wöchentliche Zusammenfassung", desc: "Aktivitätsreport jeden Montag", on: false },
                    { label: "Produktneuigkeiten",  desc: "Updates und neue Features",              on: false },
                  ].map((item) => {
                    const [on, setOn] = useState(item.on);
                    return (
                      <div key={item.label} className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-semibold">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                        <VoltToggle checked={on} onChange={(e) => setOn(e.target.checked)} toggleSize="sm" />
                      </div>
                    );
                  })}
                </div>
              </VoltCard>
            )}

            {/* ── Sicherheit ── */}
            {activeSection === "security" && (
              <>
                <VoltCard className="p-6">
                  <h2 className="font-display font-bold text-base mb-5">Passwort ändern</h2>
                  <div className="space-y-4 max-w-sm">
                    <VoltInput label="Aktuelles Passwort" type="password" variant="boxed" />
                    <VoltInput label="Neues Passwort" type="password" variant="boxed" hint="Mindestens 12 Zeichen, Groß-/Kleinbuchstaben, Zahlen." />
                    <VoltInput label="Passwort bestätigen" type="password" variant="boxed" />
                  </div>
                  <div className="flex justify-end mt-6 pt-5 border-t border-border">
                    <VoltButton>Passwort aktualisieren</VoltButton>
                  </div>
                </VoltCard>

                <VoltCard className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-display font-bold text-base">Zwei-Faktor-Authentifizierung</h2>
                    <VoltBadge variant="positive" size="sm">Aktiv</VoltBadge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-5">2FA schützt dein Konto mit einem zusätzlichen Verifizierungsschritt.</p>
                  <div className="flex gap-3">
                    <VoltButton variant="outline" size="sm">Authenticator-App</VoltButton>
                    <VoltButton variant="ghost" size="sm">Backup-Codes</VoltButton>
                  </div>
                </VoltCard>

                <VoltCard className="p-6">
                  <h2 className="font-display font-bold text-base mb-5">Aktive Sitzungen</h2>
                  {[
                    { device: "MacBook Pro 16 Zoll", location: "Berlin, DE", current: true,  time: "Jetzt aktiv" },
                    { device: "iPhone 15 Pro",    location: "Berlin, DE", current: false, time: "vor 2 Stunden" },
                    { device: "Chrome / Windows", location: "Hamburg, DE",current: false, time: "vor 3 Tagen" },
                  ].map((s) => (
                    <div key={s.device} className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-2 h-2 rounded-full flex-shrink-0", s.current ? "bg-primary" : "bg-muted-foreground/40")} />
                        <div>
                          <p className="text-sm font-semibold">{s.device}</p>
                          <p className="text-xs text-muted-foreground">{s.location} · {s.time}</p>
                        </div>
                      </div>
                      {s.current
                        ? <VoltBadge variant="default" size="sm">Aktuell</VoltBadge>
                        : <VoltButton size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">Beenden</VoltButton>
                      }
                    </div>
                  ))}
                </VoltCard>
              </>
            )}

            {/* ── Darstellung ── */}
            {activeSection === "appearance" && (
              <VoltCard className="p-6">
                <h2 className="font-display font-bold text-base mb-5">Darstellung</h2>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-3">Farbschema</p>
                  <div className="grid grid-cols-3 gap-3 max-w-xs">
                    {([
                      { value: "light",  label: "Hell",   icon: <Sun className="w-5 h-5" /> },
                      { value: "dark",   label: "Dunkel", icon: <Moon className="w-5 h-5" /> },
                      { value: "system", label: "System", icon: <Monitor className="w-5 h-5" /> },
                    ] as const).map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setTheme(t.value)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                          theme === t.value
                            ? "border-foreground bg-foreground/5"
                            : "border-border hover:border-foreground/30"
                        )}
                      >
                        <div className={cn("text-foreground", theme !== t.value && "text-muted-foreground")}>{t.icon}</div>
                        <span className="text-xs font-semibold">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-3">Schriftgröße</p>
                  <div className="flex gap-2">                    {["Klein", "Mittel", "Groß"].map((s, i) => (
                      <VoltButton key={s} size="sm" variant={i === 1 ? "solid" : "outline"}>{s}</VoltButton>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-3">Akzentfarbe</p>
                  <div className="flex gap-2">
                    {[
                      { color: "#E4FF97", label: "Lime" },
                      { color: "#74C0FC", label: "Blue" },
                      { color: "#FF6B6B", label: "Red" },
                      { color: "#6BFF9E", label: "Green" },
                      { color: "#FFD166", label: "Yellow" },
                    ].map((c, i) => (
                      <button
                        key={c.label}
                        title={c.label}
                        className={cn(
                          "w-7 h-7 rounded-full border-2 transition-all",
                          i === 0 ? "border-foreground scale-110" : "border-transparent hover:border-foreground/40"
                        )}
                        style={{ backgroundColor: c.color }}
                      />
                    ))}
                  </div>
                </div>
              </VoltCard>
            )}

            {/* ── Abrechnung ── */}
            {activeSection === "billing" && (
              <>
                <VoltCard className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-display font-bold text-base">Aktueller Plan</h2>
                    <VoltBadge variant="default" size="sm">Pro</VoltBadge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-5">Dein Plan verlängert sich am 1. Mai 2026.</p>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="font-display font-bold text-4xl">€29</span>
                    <span className="text-muted-foreground text-sm mb-1">/Monat</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {["Unbegrenzte Projekte", "10 Team-Mitglieder", "Prioritäts-Support", "API-Zugang"].map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <VoltButton variant="outline" size="sm">Plan ändern</VoltButton>
                    <VoltButton variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">Kündigen</VoltButton>
                  </div>
                </VoltCard>

                <VoltCard className="p-6">
                  <h2 className="font-display font-bold text-base mb-5">Rechnungshistorie</h2>
                  <div className="space-y-0">
                    {[
                      { date: "01.04.2026", amount: "€29,00", status: "Bezahlt" },
                      { date: "01.03.2026", amount: "€29,00", status: "Bezahlt" },
                      { date: "01.02.2026", amount: "€29,00", status: "Bezahlt" },
                      { date: "01.01.2026", amount: "€29,00", status: "Bezahlt" },
                    ].map((r) => (
                      <div key={r.date} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-semibold">Pro Plan · {r.date}</p>
                          <p className="text-xs text-muted-foreground">{r.amount}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <VoltBadge variant="positive" size="sm">{r.status}</VoltBadge>
                          <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                            PDF <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </VoltCard>
              </>
            )}

            {/* ── API & Tokens ── */}
            {activeSection === "api" && (
              <>
                <VoltCard className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-display font-bold text-base">API-Tokens</h2>
                    <VoltButton size="sm">Neuer Token</VoltButton>
                  </div>
                  <p className="text-xs text-muted-foreground mb-5">Tokens ermöglichen programmatischen Zugriff auf die API.</p>
                  <TokenRow name="Production API Key"    created="01.01.2026" lastUsed="heute"       scope="read:write" />
                  <TokenRow name="CI/CD Deploy Token"   created="15.02.2026" lastUsed="vor 1 Std."  scope="deploy" />
                  <TokenRow name="Analytics Read Token" created="10.03.2026" lastUsed="vor 2 Tagen" scope="read" />
                </VoltCard>

                <VoltCard className="p-6 bg-[#0A0A0A] border-[#1E1E1E]">
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-4 h-4 text-primary" />
                    <h2 className="font-display font-bold text-base text-primary">Schnellstart</h2>
                  </div>
                  <div className="font-mono text-xs space-y-1">
                    <p className="text-[#666666]"># Token in Header einbinden</p>
                    <p className="text-[#C8C8C8]">curl -H <span className="text-[#E4FF97]">"Authorization: Bearer &lt;TOKEN&gt;"</span> \</p>
                    <p className="text-[#C8C8C8] pl-4">https://api.volt-ui.dev/v1/components</p>
                    <p className="text-[#666666] mt-2"># Response</p>
                    <p className="text-[#6BFF9E]">{"{"} "status": "ok", "version": "1.0.0" {"}"}</p>
                  </div>
                </VoltCard>
              </>
            )}

            {/* ── Gefahrenzone ── */}
            {activeSection === "danger" && (
              <>
                <VoltAlert variant="error" title="Achtung: Irreversible Aktionen">
                  Die folgenden Aktionen können nicht rückgängig gemacht werden. Bitte lies jeden Hinweis sorgfältig.
                </VoltAlert>
                <VoltCard className="p-6 border-destructive/30">
                  <h2 className="font-display font-bold text-base text-destructive mb-1">Konto löschen</h2>
                  <p className="text-sm text-muted-foreground mb-5">
                    Alle Daten, Projekte und Einstellungen werden dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.
                  </p>
                  <VoltInput label="Bestätigung" placeholder='Tippe "LÖSCHEN" zur Bestätigung' variant="boxed" />
                  <div className="mt-4">
                    <VoltButton variant="ghost" className="text-destructive hover:bg-destructive/10 border border-destructive/30">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Konto endgültig löschen
                    </VoltButton>
                  </div>
                </VoltCard>
              </>
            )}

          </div>
        </div>
      </div>
    </TemplateShell>
  );
}
