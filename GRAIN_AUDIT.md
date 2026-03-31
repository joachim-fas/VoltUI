# Grain-Audit – Volt UI Projekt
**Erstellt:** 31. März 2026  
**Zweck:** Vollständige Bestandsaufnahme aller „grain"-Vorkommen im Projekt – nach Kategorie, Datei und Zeile – mit Bewertung, ob eine Bereinigung erforderlich ist oder der Begriff als Design-Fachbegriff legitim bleibt.

---

## Zusammenfassung

Der Scan umfasst **24.505 Zeilen** Quellcode in **~100 Dateien** unter `client/src/` sowie alle Konfigurationsdateien, Markdown-Dokumente und Build-Artefakte. Das Ergebnis ist eindeutig:

| Bereich | Treffer | Bewertung |
|---|---|---|
| `client/src/` – TSX/TS | **0** | Vollständig bereinigt |
| `client/src/` – CSS | **0** | Vollständig bereinigt |
| `client/index.html` | **0** | Vollständig bereinigt |
| `package.json` | **0** | Name: `volt-ui` ✓ |
| `vite.config.ts` / `tsconfig.json` | **0** | Vollständig bereinigt |
| `ideas.md` | **13** | Legitime Design-Fachbegriffe (siehe Abschnitt 3) |
| `bildsprache-ideas.md` | **5** | Legitime Design-Fachbegriffe (siehe Abschnitt 3) |
| Verzeichnisname `/home/ubuntu/grain-ui` | **1** | Sandbox-interner Pfad, nicht öffentlich sichtbar |
| Management-UI-Projekttitel | **1** | „Grain UI – Component Library" – änderbar über Settings → General |

---

## 1. Quellcode – Vollständig bereinigt

Alle folgenden Dateikategorien wurden mit `grep -rni "grain"` gescannt und enthalten **null Treffer**:

**Sections (22 Dateien, `client/src/pages/sections/`):**

| Datei | Zeilen | grain-Treffer |
|---|---|---|
| BackgroundsSection.tsx | 464 | 0 |
| BrandArchitectureSection.tsx | 438 | 0 |
| BrandStorySection.tsx | 454 | 0 |
| BubbleMapSection.tsx | 313 | 0 |
| ButtonsSection.tsx | 154 | 0 |
| CardsSection.tsx | 329 | 0 |
| ColorSection.tsx | 444 | 0 |
| DashboardSection.tsx | 821 | 0 |
| DataSection.tsx | 537 | 0 |
| DialogSection.tsx | 495 | 0 |
| ExportSection.tsx | 1.087 | 0 |
| FeedbackSection.tsx | 256 | 0 |
| FormsSection.tsx | 321 | 0 |
| FoundationsSection.tsx | 512 | 0 |
| HeroSection.tsx | 267 | 0 |
| IconsSection.tsx | 562 | 0 |
| ImageLanguageSection.tsx | 389 | 0 |
| NavigationSection.tsx | 221 | 0 |
| NodeCanvasSection.tsx | 970 | 0 |
| OperatingPrincipleSection.tsx | 707 | 0 |
| SignetSection.tsx | 547 | 0 |
| SkeuomorphicIconsSection.tsx | 298 | 0 |

**Volt-Komponenten (19 Dateien, `client/src/components/volt/`):**

| Datei | Zeilen | grain-Treffer |
|---|---|---|
| SkeuomorphicIcons.tsx | 387 | 0 |
| VoltAlert.tsx | 100 | 0 |
| VoltAvatar.tsx | 145 | 0 |
| VoltBadge.tsx | 105 | 0 |
| VoltBubbleMap.tsx | 660 | 0 |
| VoltButton.tsx | 208 | 0 |
| VoltCard.tsx | 134 | 0 |
| VoltChart.tsx | 823 | 0 |
| VoltCursor.tsx | 138 | 0 |
| VoltInput.tsx | 246 | 0 |
| VoltModal.tsx | 136 | 0 |
| VoltNavbar.tsx | 154 | 0 |
| VoltNodeCanvas.tsx | 1.317 | 0 |
| VoltProgress.tsx | 275 | 0 |
| VoltSidebar.tsx | 208 | 0 |
| VoltStat.tsx | 178 | 0 |
| VoltTable.tsx | 122 | 0 |
| VoltTabs.tsx | 145 | 0 |
| VoltToast.tsx | 215 | 0 |
| VoltToggle.tsx | 306 | 0 |
| VoltWorkflowCard.tsx | 219 | 0 |
| index.ts | 19 | 0 |

**Weitere Quell-Dateien:**

| Datei | grain-Treffer |
|---|---|
| `client/src/index.css` (607 Zeilen) | 0 |
| `client/src/pages/Home.tsx` (276 Zeilen) | 0 |
| `client/src/pages/NotFound.tsx` | 0 |
| `client/src/contexts/ThemeContext.tsx` | 0 |
| `client/src/hooks/*.ts` | 0 |
| `client/src/lib/utils.ts` | 0 |
| `client/src/main.tsx` | 0 |
| `client/src/const.ts` | 0 |
| `client/index.html` | 0 |
| `package.json` | 0 |
| `vite.config.ts` | 0 |
| `tsconfig.json` | 0 |
| `components.json` | 0 |
| `.gitignore` / `.prettierrc` | 0 |

---

## 2. Metadaten – Status

| Feld | Aktueller Wert | Status |
|---|---|---|
| `package.json` → `name` | `volt-ui` | ✓ Korrekt |
| `client/index.html` → `<title>` | `Volt UI – Design System` | ✓ Korrekt |
| VoltSidebar Footer-Text | `Volt UI · React 19 · Tailwind 4` | ✓ Korrekt |
| Verzeichnisname (Sandbox) | `/home/ubuntu/grain-ui` | Sandbox-intern, nicht öffentlich sichtbar |
| Management-UI Projekttitel | `Grain UI – Component Library` | Änderbar über Settings → General im Management-UI |
| Deployed Domain | `grainui-jddpkx7p.manus.space` | Änderbar über Settings → Domains |

Der Verzeichnisname `grain-ui` ist ein rein interner Sandbox-Pfad und erscheint **nirgendwo** in der öffentlich sichtbaren Anwendung. Er kann nicht umbenannt werden, ohne das gesamte Projekt neu zu initialisieren.

---

## 3. Legitime „grain"-Vorkommen in Dokumentationsdateien

Die folgenden Vorkommen in `ideas.md` und `bildsprache-ideas.md` sind **keine Projektnamen**, sondern der Design-Fachbegriff **„Grain"** (dt. Körnung) – ein etablierter Begriff aus Fotografie, Film und Grafikdesign für eine analoge Textur/Rauschstruktur. Diese Dateien sind reine interne Brainstorming-Dokumente und **nicht Teil der öffentlichen Anwendung**.

### ideas.md – 13 Treffer

| Zeile | Kontext | Bewertung |
|---|---|---|
| 10 | `## Ansatz 1: „Brutalist Grain"` | Designansatz-Bezeichnung – Fachbegriff |
| 15 | `zarte Grain-Texturen` | Textur-Beschreibung – Fachbegriff |
| 24 | `Grain-Overlay: Subtiles SVG-Rauschen` | Technische Beschreibung – Fachbegriff |
| 32 | `Grain-Textur auf allen Farbflächen` | Technische Beschreibung – Fachbegriff |
| 58 | `## Ansatz 2: „Atmospheric Grain"` | Designansatz-Bezeichnung – Fachbegriff |
| 63 | `Tiefe durch Schichtung: Grain, Gradient` | Technische Beschreibung – Fachbegriff |
| 71 | `Basis: Weiß mit Grain #FAFAF8` | Farbbeschreibung – Fachbegriff |
| 80 | `Grain-Overlay auf Hero-Bereichen` | Technische Beschreibung – Fachbegriff |
| 106 | `## Ansatz 3: „Signal Grain"` | Designansatz-Bezeichnung – Fachbegriff |
| 112 | `Grain als verbindendes Texturgefühl` | Technische Beschreibung – Fachbegriff |
| 120 | `Grain: Durchgehende Textur bei 4%` | Technische Beschreibung – Fachbegriff |
| 128 | `Grain-Textur als CSS-Filter` | Technische Beschreibung – Fachbegriff |
| 153 | `## Gewählter Ansatz: Ansatz 2 – „Atmospheric Grain"` | Designansatz-Bezeichnung – Fachbegriff |

### bildsprache-ideas.md – 5 Treffer

| Zeile | Kontext | Bewertung |
|---|---|---|
| 118 | `Film-Grain, Rauschen, Unvollkommenheit` | Filmtechnik-Begriff – Fachbegriff |
| 131 | `SVG-Grain liegt über allen Bildern` | Technische Beschreibung – Fachbegriff |
| 137 | `Volt-Grain-Overlay` | Volt-präfigierter Fachbegriff – kein alter Projektname |
| 142 | `Volt-Grain als verbindendes Element` | Volt-präfigierter Fachbegriff – kein alter Projektname |
| 144 | `Grain-Intensität ↑` | Technische Beschreibung – Fachbegriff |

**Fazit:** Alle 18 verbleibenden Treffer in Dokumentationsdateien sind semantisch korrekt und beziehen sich auf den Design-Fachbegriff „Körnung/Grain", nicht auf den alten Projektnamen. Eine Ersetzung würde den Inhalt verfälschen.

---

## 4. Bereits bereinigte Altlasten (historisch)

Die folgenden Bereinigungen wurden in früheren Commits durchgeführt und sind im Git-Log dokumentiert:

| Commit | Bereinigung |
|---|---|
| `ad05aed` | `GRAIN_PASTEL/NEON/HEX/CHART_COLORS` → `VOLT_*`; `.grain` → `.volt-texture`; `.bg-grain-*` → `.bg-volt-*`; `grain-cursor-blink` → `volt-cursor-blink`; `pattern-grain` → `pattern-volt` |
| `a7fbc30` | `flux-ui.css` → `volt-ui.css`; alle `--flux-*` CSS-Variablen → `--volt-*`; alle `.flux-*` Klassen → `.volt-*` |
| `aa80574` | Alle `Flux*`-Komponenten → `Volt*`; `FluxPalette` → `VoltPalette`; `--flux-*` → `--volt-*` |
| `dc906433` | `FluxNodeCanvas.tsx.bak` gelöscht (enthielt Kommentar „Grain OS"); `ideas.md` Projektnamen bereinigt |

---

## 5. Offene Punkte (nicht automatisch behebbar)

| # | Punkt | Aktion | Wo |
|---|---|---|---|
| 1 | Management-UI Projekttitel zeigt noch „Grain UI – Component Library" | Manuell ändern | Settings → General → Website Name |
| 2 | Domain-Präfix `grainui-jddpkx7p.manus.space` | Optional ändern | Settings → Domains |
| 3 | Sandbox-Verzeichnisname `/home/ubuntu/grain-ui` | Nicht öffentlich sichtbar; nur durch Neuinitialisierung änderbar | – |

---

## 6. Scan-Methodik

Der Scan wurde mit folgenden Befehlen durchgeführt:

```bash
# Quellcode-Scan
grep -rni "grain" client/src/ --include="*.tsx" --include="*.ts" --include="*.css"

# Konfigurationsdateien
grep -ni "grain" client/index.html package.json vite.config.ts tsconfig.json components.json

# Dokumentationsdateien
grep -ni "grain" ideas.md bildsprache-ideas.md DESIGN_AUDIT.md

# Vollständiger Projektbaum (ohne node_modules, .git, dist)
grep -rni "grain" . | grep -v node_modules | grep -v ".git/"
```

**Scan-Datum:** 31. März 2026  
**Geprüfte Dateien:** ~100 Quell-Dateien, 24.505 Zeilen  
**Ergebnis:** 0 unerwünschte grain-Vorkommen im öffentlich sichtbaren Code
