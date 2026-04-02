/**
 * Volt UI – Hauptseite
 * Layout: Schwarze Sidebar (links, sticky) + weißer Hauptinhalt (rechts, durchgehend scrollbar)
 * Scroll-Spy: IntersectionObserver hebt aktiven Abschnitt in der Sidebar hervor
 * Navigation: scrollIntoView mit forceMount – Lazy Sections werden beim Klick sofort gemountet
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
import { IconsSection }              from "./sections/IconsSection";
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
import { ExportSection }              from "./sections/ExportSection";
import SkeuomorphicIconsSection       from "./sections/SkeuomorphicIconsSection";
import {
  Home as HomeIcon, Palette, LayoutGrid,
  FormInput, MessageSquare, BarChart2, Menu, X,
  LayoutDashboard, Layers, Workflow,
  BookOpen, Network, Bell, Download,
  Wallpaper, Stamp, RectangleHorizontal, Grid2x2,
  Eye, Box, Boxes, CircleDot, Terminal,
} from "lucide-react";

/* ── Alle Sections in der gewünschten Reihenfolge ── */
const ALL_SECTIONS = [
  { id: "home",        Component: HeroSection },
  { id: "foundations", Component: FoundationsSection },
  { id: "colors",      Component: ColorSection },
  { id: "icons",       Component: IconsSection },
  { id: "backgrounds", Component: BackgroundsSection },
  { id: "signet",      Component: SignetSection },
  { id: "buttons",     Component: ButtonsSection },
  { id: "cards",       Component: CardsSection },
  { id: "forms",       Component: FormsSection },
  { id: "feedback",    Component: FeedbackSection },
  { id: "data",        Component: DataSection },
  { id: "navigation",  Component: NavigationSection },
  { id: "op",          Component: OperatingPrincipleSection },
  { id: "brand",       Component: BrandArchitectureSection },
  { id: "brandstory",  Component: BrandStorySection },
  { id: "dialog",      Component: DialogSection },
  { id: "imagelang",   Component: ImageLanguageSection },
  { id: "skeuicons",   Component: SkeuomorphicIconsSection },
  { id: "dashboard",   Component: DashboardSection },
  { id: "bubblemap",   Component: BubbleMapSection },
  { id: "nodecanvas",  Component: NodeCanvasSection },
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
      { id: "icons",       label: "Icon-Set",             description: "611+ Icons, kategorisiert",             icon: <Grid2x2 className="w-4 h-4" /> },
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
      { id: "data",        label: "Data & Charts",        description: "12 Diagramm-Typen & Tabellen",          icon: <BarChart2 className="w-4 h-4" /> },
      { id: "navigation",  label: "Navigation",           description: "Navbar, Breadcrumb, Tabs",              icon: <Menu className="w-4 h-4" /> },
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
      { id: "skeuicons",   label: "Skeuomorphic Icons",   description: "18 Icons im 3D-Plastik-Grau-Stil",      icon: <Box className="w-4 h-4" /> },
    ],
  },
  {
    title: "Templates & Visualisierung",
    items: [
      { id: "dashboard",   label: "Dashboard",            description: "KPIs, Analytics, Bestellungen",         icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: "bubblemap",   label: "Bubble Map",           description: "Force-Layout Bubble Visualisierung",    icon: <CircleDot className="w-4 h-4" /> },
      { id: "nodecanvas",  label: "Node Canvas",          description: "Node-basiertes Workflow-System",        icon: <Network className="w-4 h-4" /> },
    ],
  },
  {
    title: "Export",
    items: [
      { id: "export",      label: "Export & Import",      description: "CSS, Snippets, Anleitung",              icon: <Download className="w-4 h-4" /> },
    ],
  },
];

/* ── Lazy Section Wrapper ──
   - Mountet automatisch wenn 400px vor dem Viewport (IntersectionObserver)
   - Kann per forceMount-Prop sofort gemountet werden (für Navigation)
*/
function LazySectionWrapper({
  id,
  sectionRefs,
  forceMount,
  children,
}: {
  id: string;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  forceMount: boolean;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(id === "home");
  const wrapperRef = useRef<HTMLElement | null>(null);

  // forceMount: sofort mounten wenn Navigation es verlangt
  useEffect(() => {
    if (forceMount && !mounted) {
      setMounted(true);
    }
  }, [forceMount, mounted]);

  // Automatisch mounten wenn in Viewport-Nähe
  useEffect(() => {
    if (mounted) return;
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <section
      id={id}
      ref={(el) => {
        wrapperRef.current = el;
        sectionRefs.current[id] = el;
      }}
      className="border-b border-border last:border-b-0"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {mounted ? children : <SectionSkeleton />}
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
  // Set of IDs that should be force-mounted (for navigation)
  const [forceMounted, setForceMounted] = useState<Set<string>>(new Set(["home"]));
  const mainRef     = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  // Flag: verhindert dass Scroll-Spy den State überschreibt während wir programmatisch scrollen
  const isScrollingTo   = useRef(false);
  const scrollTargetId  = useRef<string | null>(null);

  /* ── Scroll-Spy via IntersectionObserver ── */
  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingTo.current) return;
        // Finde den sichtbarsten Eintrag
        let best: { id: string; ratio: number } | null = null;
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id) continue;
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.ratio) {
              best = { id, ratio: entry.intersectionRatio };
            }
          }
        }
        if (best) setActiveId(best.id);
      },
      {
        root: container,
        threshold: [0, 0.1, 0.25, 0.5],
        rootMargin: "-10% 0px -60% 0px",
      }
    );

    // Beobachte alle Section-Elemente
    const observe = () => {
      Object.values(sectionRefs.current).forEach((el) => {
        if (el) observer.observe(el);
      });
    };
    // Kurz warten bis Refs gesetzt sind
    const t = setTimeout(observe, 100);
    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  /* ── Programmatisches Scrollen beim Klick auf Sidebar-Item ── */
  const scrollToSection = useCallback((id: string) => {
    setMobileOpen(false);
    setActiveId(id);

    // Section sofort mounten falls noch nicht geschehen
    setForceMounted((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    isScrollingTo.current = true;
    scrollTargetId.current = id;

    const doScroll = () => {
      const el = sectionRefs.current[id];
      const container = mainRef.current;
      if (!el || !container) return;

      const containerTop = container.getBoundingClientRect().top;
      const elTop        = el.getBoundingClientRect().top;
      const offset       = elTop - containerTop + container.scrollTop - 24;

      container.scrollTo({ top: offset, behavior: "smooth" });
      setTimeout(() => {
        isScrollingTo.current = false;
        scrollTargetId.current = null;
      }, 900);
    };

    // Falls Section noch nicht gemountet: kurz warten bis React re-rendert
    const el = sectionRefs.current[id];
    if (!el || el.querySelector('[data-skeleton]')) {
      setTimeout(doScroll, 80);
    } else {
      doScroll();
    }
  }, []);

  /* ── Logo ── */
  const Logo = ({ showClose = false }: { showClose?: boolean }) => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center flex-shrink-0">
          <Terminal className="w-4 h-4 text-[#E4FF97]" />
        </div>
        <div>
          <p className="font-display font-bold text-sm text-[#0A0A0A] leading-tight tracking-tight">
            volt<span className="opacity-30"> ui</span>
          </p>
          <p className="text-[0.6rem] font-mono text-[#AAAAAA] leading-tight tracking-widest uppercase">Design Concept</p>
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
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-border bg-[#0A0A0A] overflow-hidden">
        <div className="p-5 border-b border-white/10">
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
          <div className="w-72 flex flex-col bg-[#0A0A0A] h-full overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/10">
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
        <div ref={mainRef} className="flex-1 overflow-y-auto bg-background">
          {ALL_SECTIONS.map(({ id, Component }) => (
            <LazySectionWrapper
              key={id}
              id={id}
              sectionRefs={sectionRefs}
              forceMount={forceMounted.has(id)}
            >
              {id === "home"
                ? <HeroSection onNavigate={scrollToSection} />
                : (id === "nodecanvas" || id === "bubblemap")
                  ? <Suspense fallback={<SectionSkeleton />}><Component /></Suspense>
                  : <Component />
              }
            </LazySectionWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
