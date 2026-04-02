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

## v2.5.1 Theme Agent Hintergrund korrigieren
- [x] Schwarzen Hintergrund (#0A0A0A) entfernen
- [x] Weißen/hellen Hintergrund (bg-background) verwenden wie auf Hauptseite
- [x] Nur Hero-Section behält Lime-Gelb Hintergrund
- [x] Cards und Sections: heller Hintergrund mit subtilen Borders
- [x] Text-Farben anpassen für hellen Hintergrund
- [x] TokenManager: heller Hintergrund mit bg-card und bg-secondary
- [x] LogTerminal: bg-secondary statt schwarz
- [x] DiffViewer: helle Cards mit bg-card und bg-secondary

## v2.6 Theme Agent Kontrast-Fix und lokale Repo-Unterstützung
- [x] Kontrast-Fix: Lime-Gelb Icons (#E4FF97) auf hellem Hintergrund durch dunkle Icons ersetzen
- [x] Feature-Cards Icons: text-foreground statt text-[#E4FF97]
- [x] Token-Manager Icons: text-foreground statt text-[#E4FF97]
- [x] Input-Icons: text-muted-foreground statt text-[#E4FF97]/60
- [x] Backend: Express-Handler für ZIP-Upload (lokales Repo)
- [x] Backend: transformLocalRepo Funktion (ZIP entpacken, analysieren, transformieren)
- [x] Frontend: Tab-Umschalter "GitHub URL" vs. "Lokales Repo"
- [x] Frontend: File-Upload-Komponente für ZIP-Dateien mit Drag & Drop UI
- [x] Frontend: handleLocalTransform Funktion für lokalen Upload
- [x] Hero-Text aktualisiert (GitHub + lokale Repos)

## v2.7 Upload-Limit erhöhen
- [x] Server: express.json/urlencoded Limit von 50mb auf 500mb erhöhen
- [x] Server: multer fileSize Limit von 50 MB auf 500 MB erhöhen
- [x] Frontend: Hinweistext "Max. 50 MB" auf "Max. 500 MB" aktualisieren

## v2.8 Visuelle Vorschau im Theme Agent
- [x] Backend: HTML-Preview-Endpoint der transformiertes HTML + volt-ui.css zusammenführt
- [x] Backend: JSX/TSX zu statischem HTML konvertieren für Preview (JSX-Heuristik)
- [x] Frontend: iframe-Rendering mit Browser-Bar (Traffic-Lights)
- [x] Frontend: Datei-Auswahl Tabs für Preview (welche Datei anzeigen)
- [x] Frontend: 3-Tab-Umschalter: Visuelle Vorschau / Code-Diff / Analyse-Log
- [x] Frontend: Vollbild-Preview-Modus
- [x] Frontend: "In neuem Tab öffnen" Button

## v2.9 Visuelle Vorschau grundlegend überarbeiten
- [x] Backend: LLM konvertiert JSX zu vollständigem HTML für Preview (parallel zur Code-Transformation)
- [x] Backend: htmlPreview wird in TransformedFile gecacht und direkt vom Preview-Endpoint geliefert
- [x] Frontend: iframe zeigt LLM-generiertes HTML statt rohen JSX-Code
- [x] Fallback: Hinweis wenn Vorschau noch nicht verfügbar

## v3.0 Responsive-Breakpoint-Buttons in Vorschau
- [x] Mobile (375px), Tablet (768px), Desktop (100%) Buttons in Preview-Toolbar
- [x] iframe-Breite dynamisch anpassen je nach gewähltem Breakpoint
- [x] Aktiver Breakpoint visuell hervorheben (bg-foreground text-background)
- [x] Icons: Smartphone, Tablet, Monitor (lucide-react)
- [x] Breakpoint-Breite in Browser-Bar anzeigen (bei Mobile/Tablet)
- [x] iframe zentriert bei Mobile/Tablet mit Schatten und Border

## v3.1 Ladeindikator für iframe-Vorschau
- [x] onLoad-Event am iframe abfangen um Ladezustand zu erkennen
- [x] Skeleton-Overlay über dem iframe während des Ladens (backdrop-blur)
- [x] Spinner im Volt UI Stil (rotierende Border + Dot in der Mitte)
- [x] Skeleton-Zeilen (3 animierte Pulse-Balken)
- [x] Smooth Fade-in wenn iframe geladen ist (opacity 0 → 1, 0.3s ease)
- [x] Ladezustand zurücksetzen bei Datei- und Breakpoint-Wechsel
