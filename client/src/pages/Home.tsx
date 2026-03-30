/**
 * Flux UI – Hauptseite
 * Layout: Schwarze Sidebar (links, sticky) + weißer Hauptinhalt (rechts, durchgehend scrollbar)
 * Scroll-Spy: IntersectionObserver hebt aktiven Abschnitt in der Sidebar hervor
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { GrainSidebar } from "@/components/grain/GrainSidebar";
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
import BubbleMapSection              from "./sections/BubbleMapSection";
import NodeCanvasSection             from "./sections/NodeCanvasSection";
import {
  Home as HomeIcon, Palette, MousePointer2, LayoutGrid,
  FormInput, MessageSquare, BarChart2, Navigation, Menu, X,
  LayoutDashboard, Shapes, Palette as Palette2, GitBranch, Layers,
  BookOpen, Terminal,
} from "lucide-react";
import { GrainCursor } from "@/components/grain/GrainCursor";

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
  { id: "dashboard",   Component: DashboardSection },
  { id: "op",          Component: OperatingPrincipleSection },
  { id: "brand",       Component: BrandArchitectureSection },
  { id: "dialog",      Component: DialogSection },
  { id: "brandstory",  Component: BrandStorySection },
  { id: "bubblemap",   Component: BubbleMapSection },
  { id: "nodecanvas",  Component: NodeCanvasSection },
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
      { id: "foundations", label: "Foundations",          description: "Farben, Typo, Patterns, Tokens",        icon: <Palette className="w-4 h-4" /> },
      { id: "colors",      label: "Farbcodierung",        description: "Semantisches Datenfarbsystem",          icon: <Palette2 className="w-4 h-4" />, isNew: true },
      { id: "icons",       label: "Icon-Set",             description: "150+ Icons, kategorisiert",             icon: <Shapes className="w-4 h-4" />, count: 150, isNew: true },
      { id: "backgrounds", label: "Hintergründe",         description: "Patterns, Verläufe, Flux",              icon: <Layers className="w-4 h-4" />, isNew: true },
      { id: "signet",      label: ">_ Signet",            description: "Markenzeichen & Anwendungsregeln",      icon: <GrainCursor size="xs" color="black" animated={false} showBar={false} />, isNew: true },
    ],
  },
  {
    title: "Komponenten",
    items: [
      { id: "buttons",     label: "Buttons",              description: "Aktionen & Interaktionen",              icon: <MousePointer2 className="w-4 h-4" />, count: 7 },
      { id: "cards",       label: "Cards & Surfaces",     description: "Inhaltsflächen & Container",            icon: <LayoutGrid className="w-4 h-4" />,    count: 5 },
      { id: "forms",       label: "Forms & Inputs",       description: "Eingabe & Validierung",                 icon: <FormInput className="w-4 h-4" />,     count: 8 },
      { id: "feedback",    label: "Feedback & Overlay",   description: "Toast, Modal, Tooltip, Tabs",           icon: <MessageSquare className="w-4 h-4" />, count: 5 },
      { id: "data",        label: "Data & Charts",        description: "12 Diagramm-Typen & Tabellen",          icon: <BarChart2 className="w-4 h-4" />,     count: 12 },
      { id: "navigation",  label: "Navigation",           description: "Navbar, Breadcrumb, Tabs",              icon: <Navigation className="w-4 h-4" />,    count: 4 },
    ],
  },
  {
    title: "Templates",
    items: [
      { id: "dashboard",   label: "Dashboard",            description: "KPIs, Analytics, Bestellungen",         icon: <LayoutDashboard className="w-4 h-4" />, isNew: true },
      { id: "op",          label: "Operating Principle",  description: "Eingabe → Workflow → Ausgabe",          icon: <GitBranch className="w-4 h-4" />, isNew: true },
      { id: "brand",       label: "Brand Architecture",   description: "Free Agents & Tochterprojekte",         icon: <Layers className="w-4 h-4" />, isNew: true },
      { id: "dialog",      label: "Dialog & I/O",         description: "Input/Output-Kommunikation",            icon: <Terminal className="w-4 h-4" />, isNew: true },
      { id: "brandstory",  label: "Brand Story",          description: "Free Agents.io Identität",              icon: <BookOpen className="w-4 h-4" />, isNew: true },
    ],
  },
  {
    title: "Visualisierung",
    items: [
      { id: "bubblemap",   label: "Bubble Map",           description: "Force-Layout Bubble Visualisierung",    icon: <Shapes className="w-4 h-4" />, isNew: true },
      { id: "nodecanvas",  label: "Node Canvas",          description: "Node-basiertes Workflow-System",        icon: <GitBranch className="w-4 h-4" />, isNew: true },
    ],
  },
];

export default function Home() {
  const [activeId, setActiveId]   = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef   = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  /* Flag: verhindert dass Scroll-Spy den State überschreibt während wir programmatisch scrollen */
  const isScrollingTo = useRef(false);

  /* ── Scroll-Spy via onScroll ── */
  const handleScroll = useCallback(() => {
    if (isScrollingTo.current) return;
    const container = mainRef.current;
    if (!container) return;

    // Trigger-Linie: 30% vom oberen Rand des Scroll-Containers
    const triggerY = container.scrollTop + container.clientHeight * 0.30;

    // Finde den letzten Abschnitt, dessen Oberkante die Trigger-Linie überschritten hat
    let current: string = ALL_SECTIONS[0].id;
    for (const { id } of ALL_SECTIONS) {
      const el = sectionRefs.current[id];
      if (!el) continue;
      const elTop = el.offsetTop;
      if (elTop <= triggerY) {
        current = id;
      } else {
        break;
      }
    }
    setActiveId(current);
  }, []);

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    // Einmal direkt aufrufen um Initialzustand zu setzen
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Programmatisches Scrollen beim Klick auf Sidebar-Item ── */
  const scrollToSection = useCallback((id: string) => {
    setMobileOpen(false);
    const el = sectionRefs.current[id];
    if (!el || !mainRef.current) return;

    isScrollingTo.current = true;
    setActiveId(id);

    // Offset: 32px Luft oben
    const containerTop = mainRef.current.getBoundingClientRect().top;
    const elTop        = el.getBoundingClientRect().top;
    const offset       = elTop - containerTop + mainRef.current.scrollTop - 32;

    mainRef.current.scrollTo({ top: offset, behavior: "smooth" });

    // Flag nach Animation zurücksetzen
    setTimeout(() => { isScrollingTo.current = false; }, 800);
  }, []);

  /* ── Logo ── */
  const Logo = ({ showClose = false }: { showClose?: boolean }) => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <GrainCursor size="md" color="black" animated />
        <div>
          <p className="font-display font-bold text-sm text-[#0A0A0A] leading-tight tracking-tight">
            flux<span className="opacity-30"> ui</span>
          </p>
          <p className="text-[0.6rem] font-mono text-[#AAAAAA] leading-tight tracking-widest uppercase">Design Concept</p>
        </div>
      </div>
      {showClose && (
        <button
          onClick={() => setMobileOpen(false)}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#AAAAAA] hover:text-[#0A0A0A] hover:bg-[#F0F0F0]"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white">

      {/* ── Desktop Sidebar (sticky) ── */}
      <div className="hidden lg:flex flex-col h-full">
        <GrainSidebar
          sections={sidebarSections}
          activeId={activeId}
          onSelect={scrollToSection}
          logo={<Logo />}
        />
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 flex flex-col">
            <GrainSidebar
              sections={sidebarSections}
              activeId={activeId}
              onSelect={scrollToSection}
              logo={<Logo showClose />}
            />
          </div>
        </div>
      )}

      {/* ── Hauptinhalt: durchgehend scrollbar ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white">

        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-[#E8E8E8] bg-white flex-shrink-0 sticky top-0 z-40">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#6B6B6B] hover:text-[#0A0A0A] hover:bg-[#F4F4F4]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <GrainCursor size="sm" color="black" animated />
            <span className="font-display font-bold text-sm text-[#0A0A0A] tracking-tight">
              flux<span className="opacity-30"> ui</span>
            </span>
          </div>
          <div className="w-9" />
        </header>

        {/* Scrollbarer Inhalt – alle Sections untereinander */}
        <div ref={mainRef} className="flex-1 overflow-y-auto bg-white">
          {ALL_SECTIONS.map(({ id, Component }) => (
            <section
              key={id}
              id={id}
              ref={(el) => { sectionRefs.current[id] = el; }}
              className="border-b border-[#F0F0F0] last:border-b-0"
            >
              <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">
                {id === "home"
                  ? <HeroSection onNavigate={scrollToSection} />
                  : <Component />
                }
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
