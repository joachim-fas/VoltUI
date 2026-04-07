/**
 * Volt UI – Hauptseite
 * Layout: Schwarze Sidebar (links, sticky) + weißer Hauptinhalt (rechts, durchgehend scrollbar)
 * Scroll-Spy: IntersectionObserver hebt aktiven Abschnitt in der Sidebar hervor
 * Navigation: scrollIntoView – alle Sections sofort gemountet, kein Lazy-Loading-Konflikt
 */

import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import { VoltSidebar } from "@/components/volt/VoltSidebar";
import { HeroSection }               from "./sections/HeroSection";
import { FoundationsSection }        from "./sections/FoundationsSection";
import { ButtonsSection }            from "./sections/ButtonsSection";
import { CardsSection }              from "./sections/CardsSection";
import { FormsSection }              from "./sections/FormsSection";
import { FeedbackSection }           from "./sections/FeedbackSection";
import { DataSection }               from "./sections/DataSection";
import { NavigationSection }         from "./sections/NavigationSection";
import { DashboardSection }          from "./sections/DashboardSection";
import { ColorSection }              from "./sections/ColorSection";
import OperatingPrincipleSection     from "./sections/OperatingPrincipleSection";
import { BackgroundsSection }        from "./sections/BackgroundsSection";
import SignetSection                 from "./sections/SignetSection";
import BrandArchitectureSection      from "./sections/BrandArchitectureSection";
import DialogSection                 from "./sections/DialogSection";
import BrandStorySection             from "./sections/BrandStorySection";
import ImageLanguageSection          from "./sections/ImageLanguageSection";
const BubbleMapSection = lazy(() => import("./sections/BubbleMapSection"));
const NodeCanvasSection = lazy(() => import("./sections/NodeCanvasSection"));
const RadarSection = lazy(() => import("./sections/RadarSection"));
const UIIconsSection = lazy(() => import("./sections/UIIconsSection"));
const QuellenMethodenSection = lazy(() => import("./sections/QuellenMethodenSection"));
const SkeuomorphicSection = lazy(() => import("./sections/SkeuomorphicSection"));
import { ExportSection }              from "./sections/ExportSection";
import { TerminalSection }            from "./sections/TerminalSection";
import { TrendOverviewSection }       from "./sections/TrendOverviewSection";
import { NetworkViewSection }         from "./sections/NetworkViewSection";
import { SourcesTableSection }        from "./sections/SourcesTableSection";
import {
  Home as HomeIcon, Palette, LayoutGrid,
  FormInput, MessageSquare, BarChart2, Menu, X,
  LayoutDashboard, Layers, Workflow,
  BookOpen, Network, Bell, Download,
  Wallpaper, Stamp, RectangleHorizontal,
  Eye, Boxes, CircleDot, Terminal, Sparkles,
  Radar, Shapes, Box, Layers3, TerminalSquare, PanelTop,
} from "lucide-react";

/* ── Alle Sections in der gewünschten Reihenfolge ── */
const ALL_SECTIONS = [
  { id: "home",        Component: HeroSection },
  { id: "foundations", Component: FoundationsSection },
  { id: "colors",      Component: ColorSection },
  { id: "backgrounds", Component: BackgroundsSection },
  { id: "signet",      Component: SignetSection },
  { id: "buttons",     Component: ButtonsSection },
  { id: "cards",       Component: CardsSection },
  { id: "forms",       Component: FormsSection },
  { id: "feedback",    Component: FeedbackSection },
  { id: "data",        Component: DataSection },
  { id: "navigation",  Component: NavigationSection },
  { id: "terminal",    Component: TerminalSection },
  { id: "op",          Component: OperatingPrincipleSection },
  { id: "brand",       Component: BrandArchitectureSection },
  { id: "brandstory",  Component: BrandStorySection },
  { id: "dialog",      Component: DialogSection },
  { id: "imagelang",   Component: ImageLanguageSection },
  { id: "dashboard",   Component: DashboardSection },
  { id: "bubblemap",   Component: BubbleMapSection },
  { id: "radar",       Component: RadarSection },
  { id: "nodecanvas",  Component: NodeCanvasSection },
  { id: "uiicons",         Component: UIIconsSection },
  { id: "quellenmethoden", Component: QuellenMethodenSection },
  { id: "skeuomorphic",    Component: SkeuomorphicSection },
  { id: "trendoverview",  Component: TrendOverviewSection },
  { id: "networkview",    Component: NetworkViewSection },
  { id: "sourcestable",   Component: SourcesTableSection },
  { id: "export",      Component: ExportSection },
] as const;

const sidebarSections = [
  {
    title: "Start",
    items: [
      { id: "home",        label: "Übersicht",            description: "Alle Komponenten auf einen Blick",      icon: <HomeIcon className="w-4 h-4" /> },
    ],
  },
  {
    title: "Design System",
    items: [
      { id: "foundations", label: "Foundations",          description: "Farben, Typo, Patterns, Tokens",        icon: <Layers className="w-4 h-4" /> },
      { id: "colors",      label: "Farbcodierung",        description: "Semantisches Datenfarbsystem",          icon: <Palette className="w-4 h-4" /> },
      { id: "backgrounds", label: "Hintergründe",         description: "Patterns, Verläufe, Texturen",          icon: <Wallpaper className="w-4 h-4" /> },
      { id: "signet",      label: "Signet",               description: "Markenzeichen & Anwendungsregeln",      icon: <Stamp className="w-4 h-4" /> },
    ],
  },
  {
    title: "Komponenten",
    items: [
      { id: "buttons",     label: "Buttons",              description: "Aktionen & Interaktionen",              icon: <RectangleHorizontal className="w-4 h-4" /> },
      { id: "cards",       label: "Cards & Surfaces",     description: "Inhaltsflächen & Container",            icon: <LayoutGrid className="w-4 h-4" /> },
      { id: "forms",       label: "Forms & Inputs",       description: "Eingabe & Validierung",                 icon: <FormInput className="w-4 h-4" /> },
      { id: "feedback",    label: "Feedback & Overlay",   description: "Toast, Modal, Tooltip, Tabs",           icon: <Bell className="w-4 h-4" /> },
      { id: "data",        label: "Data & Charts",        description: "Diagramm-Typen & Tabellen",          icon: <BarChart2 className="w-4 h-4" /> },
      { id: "navigation",  label: "Navigation",           description: "Navbar, Breadcrumb, Tabs",              icon: <Menu className="w-4 h-4" /> },
      { id: "terminal",    label: "Command Bar",           description: "AI-Eingabefeld & Command-Line",           icon: <TerminalSquare className="w-4 h-4" /> },
    ],
  },
  {
    title: "Konzept & Marke",
    items: [
      { id: "op",          label: "Operating Principle",  description: "Eingabe → Workflow → Ausgabe",          icon: <Workflow className="w-4 h-4" /> },
      { id: "brand",       label: "Brand Architecture",   description: "Volt UI & Tochterprojekte",             icon: <Boxes className="w-4 h-4" /> },
      { id: "brandstory",  label: "Brand Story",          description: "Identität & Positionierung",            icon: <BookOpen className="w-4 h-4" /> },
      { id: "dialog",      label: "Dialog & I/O",         description: "Input/Output-Kommunikation",            icon: <MessageSquare className="w-4 h-4" /> },
      { id: "imagelang",   label: "Bildsprache",          description: "Visuelle Prinzipien & Moodboard",       icon: <Eye className="w-4 h-4" /> },
    ],
  },
  {
    title: "Templates & Visualisierung",
    items: [
      { id: "__templates", label: "Templates",             description: "5 fertige Seiten-Templates",            icon: <PanelTop className="w-4 h-4" />, href: "/showcase" },
      { id: "dashboard",   label: "Dashboard",            description: "KPIs, Analytics, Bestellungen",         icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: "bubblemap",   label: "Bubble Map",           description: "Force-Layout Bubble Visualisierung",    icon: <CircleDot className="w-4 h-4" /> },
      { id: "radar",       label: "Quadranten-Radar",     description: "Radar + Ranked List für Intelligence",   icon: <Radar className="w-4 h-4" /> },
      { id: "nodecanvas",   label: "Node Canvas",          description: "Node-basiertes Workflow-System",        icon: <Network className="w-4 h-4" /> },
      { id: "trendoverview", label: "Trend-Übersicht",       description: "Trend-Grid, Detail-Panel & Intelligence Feed", icon: <BarChart2 className="w-4 h-4" /> },
      { id: "networkview",   label: "Netzwerk-View",         description: "Kausal-Graph mit farbcodierten Kanten",        icon: <Network className="w-4 h-4" /> },
      { id: "sourcestable",  label: "Quellen-Tabelle",       description: "Filter-Pills, Suchfeld & Status-Badges",       icon: <Layers3 className="w-4 h-4" /> },
    ],
  },
  {
    title: "Icon-Sets",
    items: [
      { id: "uiicons",         label: "UI-Icons",           description: "Lucide-Icons, kategorisiert & durchsuchbar",  icon: <Shapes className="w-4 h-4" /> },
      { id: "quellenmethoden", label: "Quellen & Methoden", description: "Datenquellen & Analyse-Frameworks",           icon: <Layers3 className="w-4 h-4" /> },
      { id: "skeuomorphic",    label: "Skeuomorphic",       description: "Handgefertigte 3D-Icons",                       icon: <Box className="w-4 h-4" /> },
    ],
  },
  {
    title: "Export",
    items: [
      { id: "export",      label: "Export & Import",      description: "CSS, Snippets, Anleitung",              icon: <Download className="w-4 h-4" /> },
    ],
  },
  {
    title: "v2 · Theme Agent",
    items: [
      { id: "themeagent", label: "Theme Agent",            description: "Volt UI auf jedes Repo anwenden",       icon: <Sparkles className="w-4 h-4" />, href: "/theme-agent" },
    ],
  },
];

/* ── Section Wrapper ──
   Alle Sections werden sofort gemountet damit Navigation korrekt funktioniert.
   Nur NodeCanvas und BubbleMap werden via React.lazy geladen (Code-Splitting).
*/
function SectionWrapper({
  id,
  sectionRefs,
  children,
}: {
  id: string;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      ref={(el) => {
        sectionRefs.current[id] = el;
      }}
      className="border-b border-border last:border-b-0 overflow-x-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {children}
      </div>
    </section>
  );
}

function SectionSkeleton() {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 opacity-30">
        <div className="w-8 h-8 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
        <p className="font-mono text-xs text-[#AAAAAA] tracking-widest uppercase">Laden …</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeId, setActiveId]     = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef     = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  // Flag: verhindert dass Scroll-Spy den State überschreibt während wir programmatisch scrollen
  const isScrollingTo = useRef(false);

  /* ── Scroll-Spy via IntersectionObserver ── */
  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingTo.current) return;
        // Nimm den Eintrag, der am nächsten am oberen Rand ist
        let topmost: { id: string; top: number } | null = null;
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id || !entry.isIntersecting) continue;
          const top = entry.boundingClientRect.top;
          if (!topmost || top < topmost.top) {
            topmost = { id, top };
          }
        }
        if (topmost) setActiveId(topmost.id);
      },
      {
        root: container,
        threshold: 0,
        rootMargin: "0px 0px -80% 0px",
      }
    );

    // MutationObserver: neue Section-Elemente automatisch beobachten
    const mutObs = new MutationObserver(() => {
      Object.values(sectionRefs.current).forEach((el) => {
        if (el) observer.observe(el);
      });
    });
    if (container) mutObs.observe(container, { childList: true, subtree: true });

    // Initial beobachten
    const t = setTimeout(() => {
      Object.values(sectionRefs.current).forEach((el) => {
        if (el) observer.observe(el);
      });
    }, 150);

    return () => {
      clearTimeout(t);
      observer.disconnect();
      mutObs.disconnect();
    };
  }, []);

  /* ── Programmatisches Scrollen beim Klick auf Sidebar-Item ──
     Alle Sections sind sofort gemountet – direktes scrollTo ohne Umwege.
  */
  const scrollToSection = useCallback((id: string) => {
    setMobileOpen(false);
    setActiveId(id);

    const el = sectionRefs.current[id];
    const container = mainRef.current;
    if (!el || !container) return;

    isScrollingTo.current = true;
    const elTop = el.getBoundingClientRect().top;
    const containerTop = container.getBoundingClientRect().top;
    const scrollOffset = container.scrollTop + elTop - containerTop;
    container.scrollTo({ top: scrollOffset, behavior: "smooth" });
    setTimeout(() => { isScrollingTo.current = false; }, 1000);
  }, []);

  /* ── Logo ── */
  const Logo = ({ showClose = false }: { showClose?: boolean }) => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#E4FF97] flex items-center justify-center flex-shrink-0">
          <Terminal className="w-4 h-4 text-[#0A0A0A]" />
        </div>
        <div>
          <p className="font-display font-bold text-sm text-foreground leading-none tracking-tight">
            volt<span className="text-foreground/30"> ui</span>
          </p>
          <p className="text-[0.6rem] font-mono text-foreground/40 leading-none tracking-widest uppercase mt-1">Design Concept</p>
        </div>
      </div>
      {showClose && (
        <button
          onClick={() => setMobileOpen(false)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-border bg-background overflow-hidden">
        <div className="p-5 border-b border-border">
          <Logo />
        </div>
        <VoltSidebar
          sections={sidebarSections}
          activeId={activeId}
          onSelect={scrollToSection}
        />
      </aside>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 flex flex-col bg-background h-full overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border">
              <Logo showClose />
            </div>
            <VoltSidebar
              sections={sidebarSections}
              activeId={activeId}
              onSelect={scrollToSection}
            />
          </div>
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* ── Hauptinhalt: durchgehend scrollbar ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-background">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-background flex-shrink-0 sticky top-0 z-40">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Terminal className="w-3 h-3 text-background" />
            </div>
            <span className="font-display font-bold text-sm text-foreground tracking-tight">
              volt<span className="opacity-30"> ui</span>
            </span>
          </div>
          <div className="w-9" />
        </header>

        {/* Scrollbarer Inhalt – alle Sections untereinander */}
        <div ref={mainRef} className="flex-1 overflow-y-auto overflow-x-clip bg-background" style={{ overscrollBehaviorX: "none", touchAction: "pan-y" }}>
          {ALL_SECTIONS.map(({ id, Component }) => (
            <SectionWrapper
              key={id}
              id={id}
              sectionRefs={sectionRefs}
            >
              {id === "home"
                ? <HeroSection onNavigate={scrollToSection} />
                : (id === "nodecanvas" || id === "bubblemap" || id === "radar" || id === "uiicons" || id === "quellenmethoden" || id === "skeuomorphic")
                  ? <Suspense fallback={<SectionSkeleton />}><Component /></Suspense>
                  : <Component />
              }
            </SectionWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
