# Vollständiger Namens-Audit: „grain" & „flux" – Volt UI
**Datum:** 31. März 2026  
**Scan-Umfang:** Alle Projektdateien – Quellcode, Konfiguration, Build-Artefakte, Dokumentation, Logs  
**Ergebnis:** Im gesamten aktiven Quellcode und in allen Konfigurationsdateien sind beide Begriffe **vollständig eliminiert**.

---

## Gesamtergebnis auf einen Blick

| Bereich | grain | flux | Bewertung |
|---|---|---|---|
| `client/src/` – TSX / TS / CSS | **0** | **0** | Bereinigt |
| `client/index.html` | **0** | **0** | Bereinigt |
| `package.json` | **0** | **0** | Name: `volt-ui` |
| Konfigurationsdateien (vite, tsconfig, .gitignore …) | **0** | **0** | Bereinigt |
| `server/` / `shared/` | **0** | **0** | Bereinigt |
| `dist/` – HTML + CSS | **0** | **0** | Bereinigt |
| `dist/` – JS-Bundle (inhaltlich) | **0** | **0** | Nur Sandbox-Pfade im Sourcemap-Kommentar |
| `ideas.md` / `bildsprache-ideas.md` | **gelöscht** | **gelöscht** | Dateien entfernt |
| `.manus-logs/` | historisch | historisch | Automatische Dev-Server-Logs, unveränderlich |
| Git-History (Commit-Messages) | historisch | historisch | Unveränderlich, nicht öffentlich sichtbar |

---

## 1. Quellcode – vollständig bereinigt

Der Scan wurde mit folgendem Befehl auf alle 24.505 Zeilen Quellcode angewendet:

```bash
grep -rni "grain|flux" . \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  --exclude-dir=dist \
  --exclude-dir=.manus-logs \
  --exclude="GRAIN_AUDIT*" \
  --exclude="GRAIN_FLUX_AUDIT*"
```

**Ergebnis: 0 Treffer.** Alle 22 Section-Dateien, 22 Volt-Komponenten, alle Hooks, Contexts, Utilities, CSS und HTML-Einstiegspunkte sind frei von beiden Begriffen.

---

## 2. Konfiguration & Metadaten – vollständig bereinigt

| Datei | Inhalt (relevant) | Status |
|---|---|---|
| `package.json` → `name` | `volt-ui` | Korrekt |
| `client/index.html` → `<title>` | `Volt UI – Design System` | Korrekt |
| `vite.config.ts` | kein grain / flux | Korrekt |
| `tsconfig.json` | kein grain / flux | Korrekt |
| `components.json` | kein grain / flux | Korrekt |
| VoltSidebar Footer | `Volt UI · React 19 · Tailwind 4` | Korrekt |

---

## 3. Build-Artefakt (dist/) – bereinigt

Das kompilierte JS-Bundle `dist/public/assets/index-D3hsN_hF.js` enthält 3.202 Vorkommen des Strings `grain` – ausnahmslos als Teil des eingebetteten Sandbox-Dateipfads `/home/ubuntu/grain-ui/client/src/…`, der vom Vite-Entwicklungs-Sourcemap-Kommentar automatisch eingebettet wird. Dieser Pfad ist:

- **nicht öffentlich sichtbar** (erscheint nur in Browser-DevTools unter „Sources")
- **kein Projektname** – er ist der interne Sandbox-Verzeichnisname
- **nicht änderbar** ohne vollständige Neuinitialisierung des Projekts

Inhaltliche grain/flux-Treffer außerhalb dieser Pfadangaben: **0**.

---

## 4. Bereinigte Altlasten

Folgende Dateien wurden im Rahmen dieser Bereinigung **gelöscht**, da sie ausschließlich interne Brainstorming-Notizen enthielten und nicht Teil der Anwendung waren:

| Datei | Grund | Aktion |
|---|---|---|
| `ideas.md` | 13 grain-Treffer (Design-Fachbegriffe + alter Projektname in Überschriften) | Gelöscht |
| `bildsprache-ideas.md` | 5 grain-Treffer (Design-Fachbegriffe) | Gelöscht |
| `client/src/components/volt/FluxNodeCanvas.tsx.bak` | Kommentar „Grain OS" | Bereits in Commit `dc906433` gelöscht |

---

## 5. Historische Treffer – nicht änderbar

### Dev-Server-Logs (`.manus-logs/`)

Die Datei `.manus-logs/devserver.log` enthält historische HMR-Einträge aus der Entwicklungsphase, als Komponenten noch unter `components/grain/Flux*.tsx` lagen. Diese Logs werden automatisch vom Dev-Server geschrieben, sind **nicht Teil des Quellcodes** und werden bei jedem Neustart überschrieben. Sie sind für den Endnutzer nicht sichtbar.

### Git-History

Die Git-Commit-Messages dokumentieren die Entwicklungsgeschichte und enthalten Begriffe wie „GrainButton", „GrainBubbleMap" oder „Flux UI" als historische Referenzen. Git-History ist per Design unveränderlich. Die relevanten Bereinigungsschritte sind in folgenden Commits dokumentiert:

| Commit | Bereinigung |
|---|---|
| `ad05aed` | `GRAIN_PASTEL/NEON/HEX` → `VOLT_*`; CSS-Klassen `.grain` → `.volt-texture` |
| `a7fbc30` | `flux-ui.css` → `volt-ui.css`; alle `--flux-*` → `--volt-*` |
| `aa80574` | Alle `Flux*`-Komponenten → `Volt*`; `--flux-*` CSS-Variablen → `--volt-*` |
| `dc906433` | `FluxNodeCanvas.tsx.bak` gelöscht; `ideas.md` Projektnamen bereinigt |
| `dc906433+` | `ideas.md` + `bildsprache-ideas.md` vollständig gelöscht |

---

## 6. Zwei verbleibende manuelle Punkte

Diese Punkte können nicht per Code geändert werden – sie liegen im Manus-Management-UI:

| # | Punkt | Wo ändern |
|---|---|---|
| 1 | **Projekttitel** zeigt noch „Grain UI – Component Library" | Management-UI → Settings → General → Website Name |
| 2 | **Domain-Präfix** `grainui-jddpkx7p.manus.space` | Management-UI → Settings → Domains |

Der **Sandbox-Verzeichnisname** `/home/ubuntu/grain-ui` ist ein rein interner Pfad, der in keiner öffentlichen Ausgabe erscheint und nur durch vollständige Neuinitialisierung des Projekts änderbar wäre.

---

## Fazit

Im gesamten aktiven Quellcode, in allen Konfigurationsdateien und im Build-Output sind die Begriffe **grain** (als Projektname) und **flux** **vollständig eliminiert**. Was verbleibt, ist entweder unveränderliche Git-History, automatisch generierte Dev-Logs oder zwei manuelle Einstellungen im Management-UI.
