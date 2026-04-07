# Volt UI – Component Reference

> **Für Claude Code und andere Agenten:** Importiere Komponenten direkt aus `src/components/volt/`.
> Alle Komponenten sind fertig gebaut – **nicht nachbauen, direkt verwenden.**

```tsx
import { VoltButton, VoltCard, VoltInput } from "@/components/volt";
```

---

## Quick-Start

```tsx
// 1. CSS-Tokens laden (einmalig in index.css oder main.tsx)
import "./volt-ui.css";

// 2. Komponenten importieren
import { VoltButton, VoltCard, VoltInput, VoltBadge } from "@/components/volt";

// 3. Verwenden
<VoltCard variant="elevated">
  <VoltCardHeader>
    <VoltBadge variant="lime">NEU</VoltBadge>
    <h2>Titel</h2>
  </VoltCardHeader>
  <VoltCardContent>
    <VoltInput label="Name" variant="boxed" />
    <VoltButton variant="primary">Speichern</VoltButton>
  </VoltCardContent>
</VoltCard>
```

---

## Design-Tokens (Kurzreferenz)

| Token | Light | Dark | Verwendung |
|---|---|---|---|
| `--neon-yellow` / `#E4FF97` | Lime | Lime | Primär-Akzent, nie als Textfarbe |
| `--foreground` | `#000000` | `#F5F5F5` | Haupttext |
| `--background` | `#FFFFFF` | `#000000` | Seitenhintergrund |
| `--card` | `#FFFFFF` | `#111111` | Karten-Hintergrund |
| `--border` | `#E8E8E8` | `#2A2A2A` | Trennlinien |
| `--muted-foreground` | `#6B6B6B` | `#888888` | Sekundärtext |
| `--signal-positive` | `#1A9E5A` | `#2ECC7A` | Positiv/Grün |
| `--signal-negative` | `#E8402A` | `#FF6050` | Negativ/Rot |
| `--signal-neutral` | `#6B7A9A` | `#8899BB` | Neutral/Grau |

**Schriften (Google Fonts):**
- `font-display` → Space Grotesk (Headlines)
- `font-ui` / `font-body` → DM Sans (UI-Text)
- `font-mono` → JetBrains Mono (Code, Labels)

---

## Komponenten

### VoltButton

```tsx
import { VoltButton } from "@/components/volt";

<VoltButton variant="primary" size="md">Primär</VoltButton>
<VoltButton variant="solid">Solid</VoltButton>
<VoltButton variant="outline">Outline</VoltButton>
<VoltButton variant="ghost">Ghost</VoltButton>
<VoltButton variant="destructive">Löschen</VoltButton>
<VoltButton variant="primary" loading>Laden…</VoltButton>
<VoltButton variant="primary" leftIcon={<Plus />}>Hinzufügen</VoltButton>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `variant` | string | `"primary"` | `"primary"` `"solid"` `"outline"` `"ghost"` `"glass"` `"secondary"` `"destructive"` `"gradient"` |
| `size` | string | `"md"` | `"sm"` `"md"` `"lg"` `"xl"` `"icon"` |
| `loading` | boolean | `false` | — |
| `leftIcon` | ReactNode | — | Lucide-Icon |
| `rightIcon` | ReactNode | — | Lucide-Icon |

> **Regel:** `variant="primary"` = Lime-Hintergrund (`#E4FF97`) mit schwarzem Text. Für schwarzen Button: `variant="solid"`.

---

### VoltCard

```tsx
import { VoltCard, VoltCardHeader, VoltCardContent, VoltCardFooter } from "@/components/volt";

<VoltCard variant="elevated">
  <VoltCardHeader>Titel</VoltCardHeader>
  <VoltCardContent>Inhalt</VoltCardContent>
  <VoltCardFooter>Footer</VoltCardFooter>
</VoltCard>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `variant` | string | `"default"` | `"default"` `"glass"` `"gradient"` `"elevated"` `"outline"` `"lime"` `"solid"` |
| `withTexture` | boolean | `true` | Noise-Textur-Overlay |

> **Regel:** `variant="elevated"` = weiße Karte mit Schatten. `variant="lime"` = Lime-Hintergrund. `variant="solid"` = schwarze Karte.

---

### VoltInput

```tsx
import { VoltInput } from "@/components/volt";

<VoltInput label="E-Mail" variant="boxed" placeholder="name@example.com" />
<VoltInput label="Suche" variant="filled" leftElement={<Search />} />
<VoltInput label="Passwort" state="error" error="Ungültig" />
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `variant` | string | `"default"` | `"default"` `"filled"` `"glass"` `"boxed"` |
| `inputSize` | string | `"md"` | `"sm"` `"md"` `"lg"` |
| `state` | string | `"default"` | `"default"` `"error"` `"success"` |
| `label` | string | — | Feldbezeichnung |
| `hint` | string | — | Hilfstext unter dem Feld |
| `error` | string | — | Fehlermeldung (setzt `state="error"`) |
| `leftElement` | ReactNode | — | Icon links im Feld |
| `rightElement` | ReactNode | — | Icon rechts im Feld |

---

### VoltBadge

```tsx
import { VoltBadge } from "@/components/volt";

<VoltBadge variant="default">Standard</VoltBadge>
<VoltBadge variant="lime">Neu</VoltBadge>
<VoltBadge variant="solid">Solid</VoltBadge>
<VoltBadge variant="positive">Aktiv</VoltBadge>
<VoltBadge variant="negative">Fehler</VoltBadge>
<VoltBadge variant="outline" dot dotColor="#E4FF97">Live</VoltBadge>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `variant` | string | `"default"` | `"default"` `"lime"` `"solid"` `"outline"` `"positive"` `"negative"` `"neutral"` `"ghost"` |
| `size` | string | `"md"` | `"sm"` `"md"` `"lg"` |
| `dot` | boolean | `false` | Farbpunkt links |
| `dotColor` | string | — | Farbe des Punkts |

---

### VoltAlert

```tsx
import { VoltAlert } from "@/components/volt";

<VoltAlert variant="info" title="Hinweis">Nachricht hier.</VoltAlert>
<VoltAlert variant="success" title="Gespeichert" dismissible onDismiss={() => {}}>
  Änderungen wurden gespeichert.
</VoltAlert>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `variant` | string | `"info"` | `"info"` `"success"` `"warning"` `"error"` `"lime"` |
| `title` | string | — | Fettgedruckter Titel |
| `dismissible` | boolean | `false` | Schließen-Button anzeigen |
| `onDismiss` | function | — | Callback beim Schließen |

---

### VoltAvatar

```tsx
import { VoltAvatar } from "@/components/volt";

<VoltAvatar name="Max Müller" size="md" />
<VoltAvatar src="/avatar.jpg" size="lg" ring online />
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `src` | string | — | Bild-URL |
| `name` | string | — | Name (für Initialen-Fallback) |
| `size` | string | `"md"` | `"xs"` `"sm"` `"md"` `"lg"` `"xl"` |
| `ring` | boolean | `false` | Lime-Ring |
| `online` | boolean | `false` | Grüner Online-Indikator |

---

### VoltProgress & VoltSlider

```tsx
import { VoltProgress, VoltSlider } from "@/components/volt";

<VoltProgress value={72} variant="lime" label="Fortschritt" showValue />
<VoltSlider value={50} onChange={(v) => console.log(v)} variant="lime" />
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `value` | number | `0` | 0–100 (oder `max`) |
| `max` | number | `100` | — |
| `variant` | string | `"default"` | `"default"` `"lime"` `"positive"` `"negative"` `"neutral"` |
| `size` | string | `"md"` | `"xs"` `"sm"` `"md"` `"lg"` `"xl"` |
| `label` | string | — | Beschriftung |
| `showValue` | boolean | `false` | Prozentzahl anzeigen |
| `animated` | boolean | `false` | Einblend-Animation |

---

### VoltToggle / VoltCheckbox / VoltRadioGroup

```tsx
import { VoltToggle, VoltCheckbox, VoltRadioGroup } from "@/components/volt";

<VoltToggle label="Benachrichtigungen" variant="primary" defaultChecked />
<VoltCheckbox label="AGB akzeptieren" variant="primary" />
<VoltRadioGroup
  name="plan"
  options={[
    { value: "free", label: "Kostenlos" },
    { value: "pro", label: "Pro", description: "Alle Features" },
  ]}
  defaultValue="free"
  onValueChange={(v) => console.log(v)}
/>
```

| Prop (Toggle/Checkbox) | Typ | Standard | Werte |
|---|---|---|---|
| `label` | string | — | Beschriftung |
| `description` | string | — | Hilfstext |
| `variant` | string | `"default"` | `"default"` `"primary"` `"positive"` `"negative"` `"neutral"` |
| `toggleSize` | string | `"md"` | `"sm"` `"md"` `"lg"` (nur Toggle) |

---

### VoltTabs

```tsx
import { VoltTabs } from "@/components/volt";

<VoltTabs
  variant="pills"
  tabs={[
    { id: "overview", label: "Übersicht", content: <div>Inhalt A</div> },
    { id: "details",  label: "Details",   content: <div>Inhalt B</div> },
  ]}
  onTabChange={(id) => console.log(id)}
/>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `variant` | string | `"pills"` | `"underline"` `"pills"` `"glass"` `"boxed"` |
| `tabs` | array | — | `{ id, label, content, icon?, badge? }[]` |
| `defaultTab` | string | — | Initiale Tab-ID |
| `activeTab` | string | — | Kontrollierter Wert |
| `onTabChange` | function | — | `(id: string) => void` |

---

### VoltModal

```tsx
import { VoltModal } from "@/components/volt";

const [open, setOpen] = useState(false);

<VoltModal
  open={open}
  onClose={() => setOpen(false)}
  title="Bestätigung"
  size="md"
  footer={<VoltButton onClick={() => setOpen(false)}>Schließen</VoltButton>}
>
  Modalinhalt hier.
</VoltModal>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `open` | boolean | — | — |
| `onClose` | function | — | — |
| `title` | string | — | — |
| `description` | string | — | Untertitel |
| `size` | string | `"md"` | `"sm"` `"md"` `"lg"` `"xl"` `"full"` |
| `footer` | ReactNode | — | Footer-Bereich |

---

### VoltToast / useVoltToast

```tsx
import { VoltToastContainer, useVoltToast } from "@/components/volt";

// In der App-Root:
const { toasts, dismiss, toast } = useVoltToast();
<VoltToastContainer toasts={toasts} onDismiss={dismiss} position="bottom-right" />

// Irgendwo im Code:
toast({ variant: "success", title: "Gespeichert", description: "Änderungen übernommen." });
toast({ variant: "error",   title: "Fehler",      description: "Etwas ist schiefgelaufen." });
```

| Toast-Variante | Farbe |
|---|---|
| `"info"` | Blau |
| `"success"` | Grün |
| `"warning"` | Gelb |
| `"error"` | Rot |
| `"lime"` | Lime |

| Container-Prop | Typ | Standard | Werte |
|---|---|---|---|
| `position` | string | `"bottom-right"` | `"top-right"` `"top-left"` `"bottom-right"` `"bottom-left"` `"top-center"` `"bottom-center"` |

---

### VoltTable

```tsx
import { VoltTable } from "@/components/volt";

<VoltTable
  columns={[
    { key: "name",   header: "Name",   render: (row) => row.name },
    { key: "status", header: "Status", render: (row) => <VoltBadge>{row.status}</VoltBadge> },
    { key: "value",  header: "Wert",   align: "right" },
  ]}
  data={rows}
  hoverable
  striped={false}
/>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `columns` | array | — | `{ key, header, render?, align? }[]` |
| `data` | array | — | Daten-Objekte |
| `striped` | boolean | `false` | Abwechselnde Zeilen |
| `hoverable` | boolean | `true` | Hover-Hervorhebung |
| `compact` | boolean | `false` | Kleineres Padding |
| `emptyMessage` | string | `"Keine Daten"` | — |

---

### VoltStat

```tsx
import { VoltStat } from "@/components/volt";

<VoltStat
  label="Umsatz"
  value="12.450"
  unit="€"
  change={+8.3}
  changeLabel="vs. Vormonat"
  variant="default"
  size="md"
/>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `label` | string | — | Bezeichnung |
| `value` | string \| number | — | Hauptwert |
| `unit` | string | — | Einheit (€, %, …) |
| `change` | number | — | Veränderung (positiv/negativ) |
| `changeLabel` | string | — | Kontext zum Change |
| `icon` | ReactNode | — | Lucide-Icon |
| `variant` | string | `"default"` | `"default"` `"lime"` `"solid"` `"positive"` `"negative"` |
| `size` | string | `"md"` | `"sm"` `"md"` `"lg"` |

---

### VoltCodeBlock

```tsx
import { VoltCodeBlock } from "@/components/volt";

<VoltCodeBlock
  label="VoltButton"
  language="tsx"
  code={`<VoltButton variant="primary">Klick mich</VoltButton>`}
/>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `code` | string | — | Code-Inhalt |
| `label` | string | `"CSS"` | Label links (z.B. Komponentenname) |
| `language` | string | — | `"tsx"` `"css"` `"bash"` `"ts"` |

> Klick auf den Block kopiert den Code in die Zwischenablage.

---

### VoltTerminal

```tsx
import { VoltTerminal, VoltTerminalStatic } from "@/components/volt";

// Interaktives Terminal
<VoltTerminal
  title="volt-cli"
  variant="dark"
  size="md"
  typewriterEffect
  initialOutput={[
    { type: "output",  text: "Volt UI v1.0.0 bereit." },
    { type: "command", text: "volt init projekt" },
    { type: "success", text: "Projekt erstellt." },
  ]}
  commands={[
    { name: "help", description: "Hilfe", handler: () => [{ type: "output", text: "Befehle: help, clear" }] },
  ]}
/>

// Statische Ausgabe (kein Input)
<VoltTerminalStatic
  title="Output"
  lines={[{ type: "success", text: "Build erfolgreich." }]}
/>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `variant` | string | `"dark"` | `"dark"` `"light"` `"minimal"` `"glass"` |
| `size` | string | `"md"` | `"sm"` `"md"` `"lg"` |
| `title` | string | — | Fenstertitel |
| `typewriterEffect` | boolean | `false` | Schreibmaschinen-Animation |
| `allowFullscreen` | boolean | `false` | Vollbild-Toggle |
| `showWindowControls` | boolean | `true` | macOS-Fensterknöpfe |

**Zeilentypen:** `"command"` (Lime) · `"output"` (Grau) · `"success"` (Grün) · `"error"` (Rot) · `"warning"` (Gelb) · `"info"` (Blau) · `"comment"` (Dunkelgrau)

---

### VoltNavbar

```tsx
import { VoltNavbar } from "@/components/volt";

<VoltNavbar
  variant="glass"
  sticky
  logo={<span className="font-display font-bold">Projekt</span>}
  items={[
    { label: "Start",    href: "/" },
    { label: "Features", href: "/features" },
    { label: "Preise",   href: "/preise" },
  ]}
  rightSlot={<VoltButton size="sm">Login</VoltButton>}
/>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `variant` | string | `"glass"` | `"glass"` `"solid"` `"transparent"` |
| `sticky` | boolean | `true` | Sticky-Positionierung |
| `logo` | ReactNode | — | Logo-Bereich |
| `items` | array | `[]` | `{ label, href, icon? }[]` |
| `rightSlot` | ReactNode | — | Rechter Bereich (Login, CTA) |

---

### VoltCommandBar / VoltCommandBarCentered

```tsx
import { VoltCommandBar, VoltCommandBarCentered } from "@/components/volt";

// Inline
<VoltCommandBar
  placeholder="Frag mich etwas…"
  variant="glass"
  onSubmit={(value) => console.log(value)}
  suggestions={[
    { label: "Analysiere Trends", icon: <BarChart2 /> },
    { label: "Erstelle Report",   icon: <FileText /> },
  ]}
/>

// Zentriert mit Titel (Hero-Bereich)
<VoltCommandBarCentered
  title="Was möchtest du wissen?"
  subtitle="KI-gestützte Analyse in Sekunden"
  placeholder="Frag mich etwas…"
  onSubmit={(value) => console.log(value)}
/>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `variant` | string | `"glass"` | `"glass"` `"solid"` `"outline"` `"minimal"` |
| `size` | string | `"md"` | `"sm"` `"md"` `"lg"` |
| `placeholder` | string | — | — |
| `onSubmit` | function | — | `(value: string) => void` |
| `suggestions` | array | — | `{ label, icon? }[]` |
| `loading` | boolean | `false` | Submit-Button dreht sich |
| `leftActions` | array | — | Icons links im Feld |
| `rightActions` | array | — | Icons rechts im Feld |

---

### VoltSidebar

```tsx
import { VoltSidebar } from "@/components/volt";

<VoltSidebar
  sections={[
    {
      title: "Navigation",
      items: [
        { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard />, description: "Übersicht" },
        { id: "analytics", label: "Analyse",   icon: <BarChart2 />,       badge: "NEU" },
      ],
    },
  ]}
  activeId="dashboard"
  onSelect={(id) => navigate(id)}
/>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `sections` | array | — | `{ title, items[] }[]` |
| `activeId` | string | — | Aktive Item-ID |
| `onSelect` | function | — | `(id: string) => void` |
| `logo` | ReactNode | — | Logo oben |

**Item-Felder:** `id` · `label` · `description?` · `icon?` · `badge?` · `isNew?` · `count?` · `href?`

---

### VoltRankedList

```tsx
import { VoltRankedList } from "@/components/volt";

<VoltRankedList
  title="Top Quellen"
  entries={[
    { id: "1", label: "Quelle A", value: 84, trend: "up" },
    { id: "2", label: "Quelle B", value: 62, trend: "stable" },
    { id: "3", label: "Quelle C", value: 41, trend: "down" },
  ]}
  valueFormat="percent"
  showProgressBar
  sortByValue
/>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `entries` | array | — | `{ id, label, value, trend?, sublabel? }[]` |
| `categories` | array | — | Gruppierte Einträge |
| `valueFormat` | string \| function | `"number"` | `"percent"` `"number"` oder `(v) => string` |
| `showProgressBar` | boolean | `false` | — |
| `sortByValue` | boolean | `false` | Absteigend sortieren |
| `maxHeight` | number | — | Scroll-Höhe in px |

---

### VoltChart (Diagramme)

```tsx
import {
  VoltAreaChart, VoltBarChart, VoltLineChart,
  VoltDonutChart, VoltRadarChart, VoltScatterChart,
} from "@/components/volt";

// Flächendiagramm
<VoltAreaChart
  data={[{ name: "Jan", umsatz: 4200 }, { name: "Feb", umsatz: 5800 }]}
  dataKeys={["umsatz"]}
  xKey="name"
  title="Umsatzverlauf"
  height={280}
/>

// Balkendiagramm (horizontal)
<VoltBarChart
  data={data}
  dataKeys={["wert"]}
  horizontal
  title="Vergleich"
/>

// Donut-Chart
<VoltDonutChart
  data={[{ name: "A", value: 60 }, { name: "B", value: 40 }]}
  innerLabel="Gesamt"
  innerValue={100}
  title="Verteilung"
/>
```

| Prop (alle Charts) | Typ | Standard |
|---|---|---|
| `data` | array | — |
| `dataKeys` | string[] | — |
| `xKey` | string | `"name"` |
| `height` | number | `280` |
| `title` | string | — |
| `subtitle` | string | — |
| `delay` | number | `0` (Stagger-Animation) |

**Spezifisch:**
- `VoltAreaChart`: `stacked?`, `gradient?`, `live?`
- `VoltBarChart`: `stacked?`, `horizontal?`, `palette?`
- `VoltLineChart`: `curved?`, `live?`
- `VoltDonutChart`: `donut?`, `innerLabel?`, `innerValue?`
- `VoltRadarChart`: `angleKey?`

---

### VoltTrendCard

```tsx
import { VoltTrendCard } from "@/components/volt";

<VoltTrendCard
  title="KI-Automatisierung"
  category="MEGA"
  status="adopt"
  direction="up"
  signals={12}
  confidence={87}
  onClick={() => console.log("clicked")}
  active={false}
/>
```

| Prop | Typ | Standard | Werte |
|---|---|---|---|
| `status` | string | — | `"trial"` `"assess"` `"hold"` `"adopt"` `"mega"` |
| `direction` | string | — | `"up"` `"down"` `"stable"` |
| `category` | string | — | `"MAKRO"` `"MEGA"` |
| `signals` | number | — | Anzahl Signale |
| `confidence` | number | — | Konfidenz 0–100 |
| `active` | boolean | `false` | Ausgewählt |

---

## CSS-Utility-Klassen

```css
/* Textur-Overlay (subtiles Noise) */
.volt-texture

/* Glassmorphismus */
.glass          /* leicht transparent */
.glass-strong   /* stark transparent */
.glass-dark     /* dunkle Variante */

/* Hintergrund-Patterns */
.pattern-grid         /* Raster */
.pattern-dots         /* Punkte */
.pattern-dots-fine    /* Feine Punkte */
.pattern-dots-coarse  /* Grobe Punkte */
.pattern-lines        /* Diagonale Linien */
.pattern-cross        /* Kreuzgitter */

/* Typografie */
.font-display   /* Space Grotesk */
.font-ui        /* DM Sans */
.font-mono      /* JetBrains Mono */
.text-display-xl  /* clamp(3rem, 8vw, 6rem) */
.text-display-lg  /* clamp(2rem, 5vw, 3.5rem) */
.text-display-md  /* clamp(1.5rem, 3vw, 2.25rem) */
.text-label       /* 11px, uppercase, tracking */
.text-numeric     /* Tabular-Nums, Mono */
.section-label    /* Mono, uppercase, muted */
```

---

## Vollständiges Beispiel: Dashboard-Seite

```tsx
import {
  VoltCard, VoltCardHeader, VoltCardContent,
  VoltStat, VoltBadge, VoltButton,
  VoltTable, VoltAreaChart, VoltRankedList,
} from "@/components/volt";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* KPI-Zeile */}
      <div className="grid grid-cols-4 gap-4">
        <VoltStat label="Umsatz"    value="12.450" unit="€" change={+8.3} variant="default" />
        <VoltStat label="Nutzer"    value="3.821"            change={+2.1} variant="default" />
        <VoltStat label="Fehler"    value="12"               change={-4}   variant="negative" />
        <VoltStat label="Uptime"    value="99.9"  unit="%"                 variant="lime" />
      </div>

      {/* Chart + Ranked List */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <VoltAreaChart
            data={chartData}
            dataKeys={["umsatz", "kosten"]}
            title="Verlauf"
            height={260}
          />
        </div>
        <VoltRankedList
          title="Top Kanäle"
          entries={rankData}
          valueFormat="percent"
          showProgressBar
          sortByValue
        />
      </div>

      {/* Tabelle */}
      <VoltCard variant="default">
        <VoltCardHeader>
          <div className="flex items-center justify-between">
            <span className="font-ui font-semibold">Letzte Transaktionen</span>
            <VoltBadge variant="lime">Live</VoltBadge>
          </div>
        </VoltCardHeader>
        <VoltCardContent className="p-0">
          <VoltTable columns={columns} data={tableData} hoverable />
        </VoltCardContent>
      </VoltCard>
    </div>
  );
}
```

---

## Häufige Fehler

| Problem | Ursache | Lösung |
|---|---|---|
| Lime-Text unsichtbar | `#E4FF97` auf hellem Hintergrund | Lime nur als `background`, nie als `color` |
| Button sieht falsch aus | Falsches `variant` | `"primary"` = Lime-BG, `"solid"` = Schwarz-BG |
| Karte ohne Schatten | `variant="default"` | Verwende `variant="elevated"` |
| Toggle-Farbe falsch | `variant` nicht gesetzt | Setze `variant="primary"` für Lime-Toggle |
| Chart leer | `dataKeys` falsch | `dataKeys` müssen exakt den Objekt-Keys entsprechen |
