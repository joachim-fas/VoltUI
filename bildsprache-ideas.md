# Bildsprache-Sektion: Konzept-Entwicklung

## Kontext
Volt UI ist ein Design System mit Terminal-Ästhetik (>_), Lime + Schwarz, Space Grotesk.
Die Bildsprache-Sektion steht unter "Konzept & Marke" – sie soll erklären,
welche visuellen Qualitäten Volt UI-Bilder haben sollen.

## Problem der alten Version
- 9 generische Unsplash-Fotos (Schaltkreise, Code-Monitor, Serverraum, Whiteboard)
- Raster-Grid wie ein Pinterest-Board
- Kategorie-Filter wie ein Stock-Foto-Portal
- Technisch, nicht atmosphärisch
- Kein eigenständiger ästhetischer Standpunkt

---

<response>
<idea>

## Konzept A: "Negative Space als Aussage"
**Probability: 0.07**

**Design Movement:** Japanese Minimalism meets Swiss Editorial (Muji × Zürcher Schule)

**Core Principles:**
1. Das Bild zeigt, was fehlt – nicht was da ist
2. Stille ist keine Abwesenheit, sondern ein Zustand
3. Kontrast entsteht durch Zurückhaltung, nicht durch Lautstärke
4. Jedes Bild hat genau eine Aussage

**Konzept:**
Keine Galerie. Stattdessen: 5 großformatige, fast monochrome Bilder
in einem vertikalen Scroll-Erlebnis. Jedes Bild nimmt 80vw × 60vh ein.
Darunter: ein einziger Satz in Space Grotesk, sehr groß, sehr wenig.
Kein Label, kein Tag, kein Filter. Nur Bild + Satz.

Bildauswahl: Nebel über Wasser, leere Straße im Regen, Betonwand mit
einem Lichtstreifen, Papierstapel von oben, Fenster mit Kondensation.

**Layout:**
- Horizontaler Scroll (Snap-Punkte) oder vertikaler Accordion
- Bilder: 16:9, leicht entsättigt (CSS filter: saturate(0.3) contrast(1.1))
- Text: 1 Satz, font-display, 2xl–3xl, links ausgerichtet, viel Luft
- Kein Rahmen, kein Schatten – Bild bricht aus dem Container aus

**Signature Elements:**
- Bild-Nummer als einzige Navigation: "01 / 05" in font-mono
- Kein Hover-Effekt außer einem sehr langsamen Zoom (scale 1.0 → 1.02, 4s)
- Weißer Hintergrund, damit die Bilder "atmen"

**Interaktion:** Pfeil-Navigation, kein Klick auf Bilder

</idea>
</response>

<response>
<idea>

## Konzept B: "Filmstill-Prinzip" ← GEWÄHLT
**Probability: 0.08**

**Design Movement:** Cinematic Editorial – Referenzen: Wim Wenders, Saul Leiter, 
Alec Soth. Nicht Fotografie als Dekoration, sondern als Haltung.

**Core Principles:**
1. Bilder zeigen Stimmung, keine Objekte
2. Unschärfe ist Information, kein Fehler
3. Das Bild beginnt vor dem Rand und endet nach dem Rand
4. Farbe ist sparsam – wenn, dann als Akzent, nicht als Palette

**Konzept:**
Keine Galerie, kein Grid. Stattdessen: 4 "Kapitel", jedes mit einer
visuellen Qualität (Kontrast / Stille / Bewegung / Leere).

Jedes Kapitel besteht aus:
- Einem großen, fast vollflächigen Bild (kein Container-Rahmen)
- Einer einzigen Überschrift (1–3 Wörter, sehr groß)
- Einem kurzen Satz (max. 12 Wörter), der das Prinzip benennt
- Einem kleinen "Gegenbeispiel" – was dieses Prinzip NICHT ist

Layout: Abwechselnd links/rechts – Bild nimmt 60% der Breite,
Text nimmt 40%. Kein Padding zwischen Bild und Viewport-Rand.

Bildsprache: Abstrakt-atmosphärisch. Nicht: Schaltkreise, Laptops, 
Serverräume. Sondern: Licht durch Jalousien, Reflexion auf Wasser,
Betonstruktur mit Schatten, Bewegungsunschärfe, Nebel.

**Bilder (KI-generiert, nicht Unsplash):**
1. "Kontrast" – Licht fällt diagonal durch eine dunkle Fläche (B&W)
2. "Stille" – Wasseroberfläche, fast spiegelglatt, minimale Wellen
3. "Bewegung" – Langzeitbelichtung, Lichtspuren, dunkel
4. "Leere" – Weißer Nebel, Horizont kaum erkennbar

**Typography im Bild:**
- Kapitel-Nummer: "— 01" in font-mono, sehr klein, oben links
- Titel: font-display, 4xl–5xl, bold, weiß auf dunklem Bild
- Satz: font-body, sm, weiß/80, max 12 Wörter
- "Nicht"-Zeile: font-mono, xs, muted, kursiv

**Animation:**
- Beim Scrollen: Bild bewegt sich leicht langsamer als der Text (Parallax, 20%)
- Kein Hover-Gimmick – die Bilder sind still

</idea>
</response>

<response>
<idea>

## Konzept C: "Textur als Sprache"
**Probability: 0.06**

**Design Movement:** Material Poetry – Referenzen: Leica-Fotografie, 
japanische Wabi-Sabi-Ästhetik, Brutalist Editorial

**Core Principles:**
1. Oberfläche hat Bedeutung – Körnung ist Charakter, nicht Fehler
2. Das Analoge im Digitalen: Film-Grain, Rauschen, Unvollkommenheit
3. Monochrom ist keine Einschränkung, sondern Fokus
4. Nähe statt Überblick – Makro statt Totale

**Konzept:**
Keine Bilder im klassischen Sinn. Stattdessen: 6 quadratische
"Textur-Felder" in einem asymmetrischen Layout (3+2+1, nicht 3×2).
Jedes Feld zeigt eine abstrakte Textur (Beton, Papier, Wasser, Metall,
Licht, Schatten) – extrem nah, fast abstrakt.

Über jedem Feld: ein einzelnes Adjektiv in Großbuchstaben.
Darunter: ein kurzer Satz.

Besonderheit: Die Volt-Textur (SVG-Grain) liegt über allen Bildern
als einheitlicher Filter – das verbindet die Bilder visuell mit dem
Design System selbst.

**Layout:**
- Asymmetrisches Masonry: 2 große + 4 kleine Felder
- Alle Bilder: leicht entsättigt + Volt-Grain-Overlay
- Hintergrund: #0A0A0A (dunkel) – Bilder "schweben"
- Kein Rahmen, nur Abstände

**Signature Elements:**
- Volt-Grain als verbindendes Element über allen Bildern
- Adjektive in Lime-Farbe (#E4FF97) als einziger Farbakzent
- Kein Hover-Effekt außer Grain-Intensität ↑

</idea>
</response>

---

## Entscheidung: Konzept B – "Filmstill-Prinzip"

Begründung:
- Passt am besten zur Volt-Marke (terminal-inspiriert, aber atmosphärisch)
- 4 Kapitel = klare Struktur ohne Galerie-Charakter
- KI-generierte Bilder = keine generischen Stock-Fotos
- Abwechselndes Links/Rechts-Layout = editorial, nicht rasterförmig
- Parallax + Stille = hohe ästhetische Qualität ohne Überladung
