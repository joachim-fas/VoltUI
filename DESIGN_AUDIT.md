# Volt UI – Design-Konsistenz-Audit
**Stand:** 31. März 2026 · Analysierte Dateien: 21 Sections + Home.tsx + index.css

---

## Zusammenfassung

Das Projekt ist in weiten Teilen konsistent, hat aber in vier Bereichen systematische Abweichungen: **Nummerierung der section-labels**, **fehlende section-labels in Konzept-Sections**, **inkonsistente Schriftgewichte** (`font-semibold` ohne `font-display`/`font-mono`) und **Abstandsinkonsistenzen** bei `h2 mb-*`.

---

## 1. Nummerierung & section-label

### 1a. Doppelte Nummern
| Nummer | Datei A | Datei B |
|--------|---------|---------|
| `02` | `ColorSection` → "02 — Farbsystem" | `ButtonsSection` → "02 — Buttons" |
| `08` | `DashboardSection` → "08 — Dashboard" | `IconsSection` → "08 — Icons" |

**Empfehlung:** Nummerierung entweder vollständig entfernen (da Sidebar bereits Reihenfolge vorgibt) oder konsequent nach Sidebar-Reihenfolge neu vergeben.

### 1b. Fehlende section-labels (kein section-label im Header)
| Datei | Status |
|-------|--------|
| `BrandStorySection.tsx` | Kein `section-label` – beginnt direkt mit `<h1>` |
| `OperatingPrincipleSection.tsx` | Kein `section-label` – beginnt direkt mit `<h1>` |
| `NodeCanvasSection.tsx` | Kein `section-label` |

### 1c. Inkonsistentes Format
| Datei | Aktuell | Soll |
|-------|---------|------|
| `BackgroundsSection` | "Design System — Hintergründe" | Nummeriert oder ohne Präfix |
| `BubbleMapSection` | "Visualisierung — Bubble Map" | Nummeriert oder ohne Präfix |
| `SignetSection` | "Signet" (ohne Nummer) | Konsistent mit anderen |
| `ImageLanguageSection` | "Bildsprache" (ohne Nummer) | Konsistent mit anderen |

---

## 2. Typografie-Inkonsistenzen

### 2a. `font-semibold` ohne explizite Font-Family
In 20+ Stellen wird `font-semibold` ohne `font-display`, `font-mono` oder `font-ui` verwendet. Das führt zu undefinierten Fallback-Fonts. Betroffen:

- `BrandArchitectureSection.tsx` (1×)
- `BrandStorySection.tsx` (5×)
- `BubbleMapSection.tsx` (1×)
- `CardsSection.tsx` (1×)
- `DialogSection.tsx` (3×)
- `IconsSection.tsx` (1×)
- `NavigationSection.tsx` (1×)
- `OperatingPrincipleSection.tsx` (6×)

**Fix:** `font-semibold` → `font-ui font-semibold` (für UI-Text) oder `font-display font-bold` (für Überschriften).

### 2b. `<h1>` statt `<h2>` in Sections
| Datei | Zeile | Problem |
|-------|-------|---------|
| `BrandStorySection.tsx` | 163 | `<h1>` als Section-Haupttitel |
| `OperatingPrincipleSection.tsx` | 337, 353 | `<h1>` als Section-Haupttitel (2×) |
| `ExportSection.tsx` | 287 | `<h1>` innerhalb einer Section |

**Fix:** Alle Section-Haupttitel auf `<h2>` vereinheitlichen.

### 2c. `h2 mb-*` Inkonsistenz
Standard ist `mb-3`. Abweichungen:
| Datei | Abweichung |
|-------|-----------|
| `DashboardSection.tsx` | `mb-2` |
| `ExportSection.tsx` | `mb-4 leading-tight` |
| `NodeCanvasSection.tsx` | `mb-4` (ohne `tracking-tight`) |

### 2d. `tracking-tight` fehlt
In einigen `<h2>` fehlt `tracking-tight`:
- `ButtonsSection.tsx`
- `CardsSection.tsx`
- `FeedbackSection.tsx`
- `FormsSection.tsx`
- `NavigationSection.tsx`

---

## 3. Abstands-Inkonsistenzen

### 3a. `space-y-*` des Root-Containers
Standard ist `space-y-16`. Abweichungen prüfen:
- `DashboardSection` und `NodeCanvasSection` verwenden abweichende Wrapper-Abstände (interne `space-y-0` Blöcke – OK, da bewusst).

### 3b. `section-label mb-*`
Standard ist `mb-2`. Abweichungen (innerhalb von Sub-Sektionen bewusst, im Header-Block nicht):
- `SignetSection` Header: `mb-2` ✓
- `ColorSection` hat ein zweites `section-label` mit `mb-3` (Sub-Sektion – OK)

---

## 4. Border-Radius-Inkonsistenz

`rounded-3xl` wird in 3 Stellen als Hero-Container verwendet, `rounded-2xl` ist der Standard für Cards/Panels.

| Datei | Verwendung | Bewertung |
|-------|-----------|-----------|
| `HeroSection.tsx` | Hero-Banner | OK (bewusst groß) |
| `SignetSection.tsx` | Signet-Hero | OK (bewusst groß) |
| `OperatingPrincipleSection.tsx` | Bild-Banner | OK (bewusst groß) |

→ **Kein Fix nötig**, `rounded-3xl` ist für Hero-Elemente reserviert.

---

## 5. Sidebar & Navigation

### 5a. Sidebar-Gruppen-Titel
Aktuell: Start / Design System / Komponenten / Konzept & Marke / Templates & Visualisierung / Export

**Auffälligkeit:** "Export" ist eine eigene Gruppe für einen einzigen Eintrag. Könnte unter "Design System" oder als letzter Eintrag in "Templates & Visualisierung" eingeordnet werden.

### 5b. Doppelte Icons
| Icon | Verwendet für |
|------|--------------|
| `MessageSquare` | Feedback & Overlay **und** Dialog & I/O |
| `Workflow` | Operating Principle **und** Node Canvas |
| `Brush` | Hintergründe **und** Bildsprache |
| `Terminal` | Signet **und** Export & Import |

**Fix:** Eindeutige Icons pro Eintrag wählen.

### 5c. `Signet`-Label in Sidebar
Einziger Eintrag ohne Leerzeichen-Ausrichtung: `label: "Signet",` (fehlende Ausrichtung im Code – nur kosmetisch).

---

## 6. Farbsystem-Abweichungen

### 6a. `text-primary` ohne CSS-Variable-Kontext
`text-primary` wird in `OperatingPrincipleSection` verwendet. Im Dark-Mode kann `--primary` unerwartete Werte annehmen. Besser: explizit `text-[#E4FF97]` oder `text-foreground`.

### 6b. Hardcodierte Farben außerhalb des Token-Systems
Vereinzelt `text-green-700` (`BrandStorySection`) statt `text-[#1A9E5A]` (Volt-Token).

---

## 7. Fehlende Beschreibungstexte

Sections ohne einleitenden `<p className="text-muted-foreground ...">` Beschreibungstext:
- `ButtonsSection` – direkt in Komponenten-Demo
- `CardsSection` – direkt in Komponenten-Demo
- `FormsSection` – direkt in Komponenten-Demo

(Bewusste Entscheidung möglich – nur dokumentiert.)

---

## Priorisierte ToDo-Liste

### Priorität 1 – Kritisch (Konsistenz bricht)
- [ ] **Doppelte Nummern** beheben: `02 — Farbsystem` und `08 — Icons` umbenennen oder alle Nummern entfernen
- [ ] **`<h1>` → `<h2>`** in BrandStorySection, OperatingPrincipleSection, ExportSection
- [ ] **`section-label` ergänzen** in BrandStorySection, OperatingPrincipleSection, NodeCanvasSection

### Priorität 2 – Hoch (Typografie-Konsistenz)
- [ ] **`font-semibold` → `font-ui font-semibold`** in allen 20 betroffenen Stellen
- [ ] **`tracking-tight` ergänzen** bei h2 in Buttons, Cards, Feedback, Forms, Navigation
- [ ] **`mb-3` vereinheitlichen** bei h2 in Dashboard, Export, NodeCanvas

### Priorität 3 – Mittel (Sidebar & Icons)
- [ ] **Doppelte Sidebar-Icons** ersetzen: MessageSquare, Workflow, Brush, Terminal
- [ ] **"Export"-Gruppe** in bestehende Gruppe integrieren
- [ ] **section-label-Format** vereinheitlichen: BackgroundsSection und BubbleMapSection angleichen

### Priorität 4 – Niedrig (Feinschliff)
- [ ] **`text-primary` → explizite Farbe** in OperatingPrincipleSection
- [ ] **`text-green-700` → `text-[#1A9E5A]`** in BrandStorySection
- [ ] **Einleitungstexte** für Buttons, Cards, Forms prüfen und ggf. ergänzen

---

*Erstellt durch automatisierte Codeanalyse aller 21 Section-Dateien.*
