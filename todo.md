# Volt UI v2 – Theme Agent TODO

## Navigation-Fix (v1.2)
- [x] LazySectionWrapper durch SectionWrapper ersetzt
- [x] forceMounted/pendingScrollId-Logik entfernt
- [x] scrollToSection vereinfacht auf direktes scrollTo
- [x] Git v1.2.0 getaggt und gepusht

## v2 Theme Agent Features
- [x] Backend: Git-Klon-Endpoint (GitHub-URL → lokales Repo klonen)
- [x] Backend: Datei-Analyse-Engine (CSS/SCSS/Tailwind/Config-Dateien scannen)
- [x] Backend: Farb-Extraktion (Hex/RGB/HSL → OKLCH konvertieren)
- [x] Backend: Font-Extraktion (Google Fonts, System-Fonts erkennen)
- [x] Backend: Volt-Token-Mapping (extrahierte Werte → Volt-System mappen)
- [x] Backend: volt-ui.css Generator (angepasste CSS-Datei erzeugen)
- [x] Frontend: Theme Agent UI-Sektion (neue Sidebar-Kategorie)
- [x] Frontend: GitHub-URL-Input + Validierung
- [x] Frontend: Analyse-Fortschritt-Anzeige (Spinner, Logs, Schritte)
- [x] Frontend: Ergebnis-Vorschau (extrahierte Farben/Fonts, gemappte Tokens)
- [x] Frontend: Download-Button für angepasste volt-ui.css
- [x] Integration: Theme Agent in Sidebar einbinden
- [x] Test: Beispiel-Repo analysieren und Ergebnis validieren (SOP-SonicPulse)

## v2.1 Live-Vorschau
- [x] ThemePreview-Komponente mit dynamischen CSS-Variablen
- [x] Vorschau-Panels: Buttons, Cards, Typography, Forms, Navigation
- [x] Dark/Light-Toggle in der Vorschau
- [x] Integration in ThemeAgentSection nach Analyse-Ergebnis

## v2.2 Theme Agent – Vollständige Komponenten-Transformation
- [x] Backend: GitHub API-basierter Datei-Scanner (kein vollständiger Klon, nur relevante Dateien)
- [x] Backend: Stack-Erkennung (React+Tailwind / React+CSS / plain HTML)
- [x] Backend: LLM-Transformation – UI-Komponenten durch Volt UI Äquivalente ersetzen
- [x] Backend: Mapping-Tabelle (Button → VoltButton, Card → VoltCard, Input → VoltInput, etc.)
- [x] Backend: ZIP-Generator für transformierte Dateien
- [x] Backend: Download-Endpoint für ZIP
- [x] Frontend: Theme Agent UI überarbeiten (Fortschritts-Steps, Diff-Vorschau, Download)
- [ ] Test mit öffentlichem Repo
- [x] Sidebar: Theme Agent als eigene Kategorie "V2" darstellen (visuell hervorgehoben)

## v2.3 GitHub Token Management
- [x] DB: github_tokens Tabelle (id, tokenHash, maskedToken, label, createdAt)
- [x] Backend: tRPC-Prozeduren saveToken / getToken / deleteToken
- [x] Frontend: Token-Management UI (Eingabe, Maske, Löschen-Button)
- [x] Backend: Token aus DB beim Transformations-Request laden (via tokenStore)
- [x] Sicherheit: Token nur gehasht in DB, nie im Klartext zurückgeben

## v2.4 Design-Korrekturen
- [x] Sidebar: Logo-Text Kontrast korrigieren (kein Lime auf Schwarz)
- [x] Sidebar: Fortschrittsbalken Farbe korrigieren (kein Lime)
- [x] Sidebar: V2-Kategorie dezenter gestalten (kein Lime-Block)
- [x] Theme Agent: Eigene Route /theme-agent mit eigenem Layout
- [x] Sidebar: V2-Eintrag als Link zur Route (nicht Scroll)

## v2.4.2 Sidebar-Korrekturen
- [x] Logo-Bereich: Schwarzen Hintergrund entfernen (soll weiß sein wie Rest der Sidebar)
- [x] Aktive Items: Lime-Gelb (#E4FF97) als Hintergrund wiederherstellen statt Schwarz

## v2.4.3 ThemeAgentPage Design
- [ ] ThemeAgentPage: Schwarzes Layout durch helles Design ersetzen (bg-background, text-foreground)

## v2.5 Volt UI Design auf Theme Agent Seite anwenden
- [x] Körniger Gradienten-Hintergrund wie auf Hauptseite (Lime-Gelb #E4FF97)
- [x] Hero-Section mit großem ">_ Volt UI" Logo und Terminal-Ästhetik
- [x] Feature-Cards mit Volt UI Styling (Border, Glow-Effekte)
- [x] Input-Felder im Volt UI Stil (Lime-Akzente, Terminal-Font)
- [x] Buttons mit Volt UI Design (Schwarz auf Lime-Gelb)
- [x] Token-Manager Card mit Volt UI Styling
- [x] Ergebnis-Cards mit körnigem Hintergrund und Lime-Akzenten
- [x] Konsistente Typografie (Space Grotesk + JetBrains Mono)
- [x] Schwarzer Hintergrund (#0A0A0A) mit Lime-Akzenten
- [x] Terminal-Log mit Volt UI Styling
- [x] Diff-Viewer mit Volt UI Design
