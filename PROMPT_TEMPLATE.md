# Volt UI – Prompt-Template für Claude Code

> Kopiere diesen Block an den Anfang jeder Konversation mit Claude Code,
> wenn du Seiten oder Features im Volt UI Stil bauen willst.

---

## System-Prompt (einmalig setzen)

```
Du bist ein Frontend-Entwickler der mit dem Volt UI Design-System arbeitet.

WICHTIG: Verwende IMMER die fertigen Volt-Komponenten aus `src/components/volt/`.
Baue KEINE eigenen Karten, Buttons oder Inputs – importiere sie direkt.

Importpfad:
  import { VoltButton, VoltCard, VoltInput, VoltBadge } from "@/components/volt";

Design-Regeln:
- Lime (#E4FF97) NUR als Hintergrundfarbe, NIEMALS als Textfarbe
- Primär-Button = VoltButton variant="primary" (Lime-Hintergrund, schwarzer Text)
- Schwarzer Button = VoltButton variant="solid"
- Karte mit Schatten = VoltCard variant="elevated"
- Karte auf schwarzem Hintergrund = VoltCard variant="solid"
- Schriften: font-display (Space Grotesk), font-ui (DM Sans), font-mono (JetBrains Mono)

Vollständige Komponenten-Referenz: siehe COMPONENTS.md im Repo-Root.
CSS-Tokens: siehe volt-ui.css im Repo-Root.
```

---

## Seiten-Prompt (pro Feature anpassen)

```
Baue [SEITENNAME] mit folgenden Volt-Komponenten:

Layout:
- Seitenstruktur: [z.B. 2-Spalten-Grid, Dashboard-Layout, Fullscreen]
- Navigation: [z.B. VoltNavbar variant="glass" mit Logo + 3 Links + Login-Button]
- Hintergrund: [z.B. bg-background mit pattern-dots, oder bg-[#0A0A0A]]

Hero / Header:
- Titel: text-display-xl, font-display, [Farbe]
- Untertitel: text-base, font-ui, text-muted-foreground
- CTA: VoltButton variant="primary" size="lg" + VoltButton variant="outline" size="lg"

Hauptinhalt:
- [Komponente 1]: [z.B. VoltCard variant="elevated" mit VoltStat darin]
- [Komponente 2]: [z.B. VoltAreaChart mit dataKeys=["wert"] und height=260]
- [Komponente 3]: [z.B. VoltTable mit hoverable=true]

Sidebar / Panel:
- [z.B. VoltRankedList mit showProgressBar und sortByValue]
- [z.B. VoltBadge variant="lime" für Status-Anzeigen]

Interaktion:
- [z.B. VoltModal für Bestätigungs-Dialog]
- [z.B. useVoltToast für Erfolgs-/Fehlermeldungen]
```

---

## Konkrete Beispiel-Prompts

### Analyse-Dashboard

```
Baue ein Analyse-Dashboard mit:
- VoltNavbar variant="solid" mit Logo ">_ Analyse" und Logout-Button
- 4 VoltStat-Karten in einer Zeile: Umsatz (+8%), Nutzer (+2%), Fehler (-4%), Uptime
- VoltAreaChart (Verlauf, 2 dataKeys, height=260) links, VoltRankedList rechts
- VoltTable mit hoverable=true und VoltBadge für Status-Spalte
- VoltToast bei Daten-Refresh
```

### Onboarding-Seite

```
Baue eine Onboarding-Seite mit:
- Zentriertes Layout, bg-background
- VoltCommandBarCentered mit title="Was möchtest du analysieren?" und 3 Suggestions
- Darunter 3 VoltCard variant="elevated" nebeneinander mit Icon + Titel + Beschreibung
- VoltButton variant="primary" size="xl" als CTA
- VoltBadge variant="lime" mit "BETA" oben rechts
```

### Einstellungs-Seite

```
Baue eine Einstellungs-Seite mit:
- VoltSidebar links mit 3 Sektionen (Profil, Sicherheit, Benachrichtigungen)
- Rechts: VoltCard variant="default" mit VoltInput-Feldern (variant="boxed")
- VoltToggle variant="primary" für Benachrichtigungs-Einstellungen
- VoltButton variant="primary" Speichern + VoltButton variant="ghost" Abbrechen
- VoltAlert variant="success" nach dem Speichern
```

---

## Checkliste für Claude Code

Bevor du Code schreibst, prüfe:

- [ ] Importiere ich aus `@/components/volt` statt selbst zu bauen?
- [ ] Verwende ich `VoltCard variant="elevated"` statt einer eigenen Karte?
- [ ] Ist Lime (#E4FF97) nur als Hintergrund, nicht als Textfarbe?
- [ ] Verwende ich `font-display` für Headlines und `font-ui` für Fließtext?
- [ ] Habe ich Loading-States mit `VoltButton loading` oder Skeleton?
- [ ] Habe ich Error-States mit `VoltAlert variant="error"` oder `VoltInput state="error"`?

---

## Häufige Fehler vermeiden

| Falsch | Richtig |
|---|---|
| `<div className="bg-[#E4FF97] text-[#E4FF97]">` | `<VoltBadge variant="lime">` |
| `<button className="bg-black text-white">` | `<VoltButton variant="solid">` |
| Eigene Karte mit `shadow-md` | `<VoltCard variant="elevated">` |
| `<input className="border rounded">` | `<VoltInput variant="boxed">` |
| Eigene Tabelle mit `<table>` | `<VoltTable columns={...} data={...}>` |
| `toast("Gespeichert")` (shadcn) | `useVoltToast().toast({ variant: "success" })` |
