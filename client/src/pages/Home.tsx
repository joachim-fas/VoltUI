/**
 * Grain UI – Hauptseite der Komponentenbibliothek v3
 * Atmospheric Design System – inspiriert vom körnigen Gradienten-Bild
 *
 * Layout: Dunkle Sidebar (links) + Hauptinhalt (rechts)
 * Alle Effekte sind reiner CSS/React-Code, keine Bild-Assets.
 */

import React, { useState } from "react";
import { GrainSidebar } from "@/components/grain/GrainSidebar";
import { HeroSection }       from "./sections/HeroSection";
import { FoundationsSection } from "./sections/FoundationsSection";
import { ButtonsSection }     from "./sections/ButtonsSection";
import { CardsSection }       from "./sections/CardsSection";
import { FormsSection }       from "./sections/FormsSection";
import { FeedbackSection }    from "./sections/FeedbackSection";
import { DataSection }        from "./sections/DataSection";
import { NavigationSection }  from "./sections/NavigationSection";
import { DashboardSection }   from "./sections/DashboardSection";
import { IconsSection }       from "./sections/IconsSection";
import { ColorSection }       from "./sections/ColorSection";
import {
  Home as HomeIcon, Palette, MousePointer2, LayoutGrid,
  FormInput, MessageSquare, BarChart2, Navigation, Menu, X,
  LayoutDashboard, Shapes, Palette as Palette2,
} from "lucide-react";

/* ── Sidebar-Konfiguration ── */
const sidebarSections = [
  {
    title: "Start",
    items: [
      { id: "home", label: "Übersicht", description: "Alle Komponenten auf einen Blick", icon: <HomeIcon className="w-4 h-4" /> },
    ],
  },
  {
    title: "Design System",
    items: [
      { id: "foundations", label: "Foundations",    description: "Farben, Typo, Patterns, Tokens",  icon: <Palette className="w-4 h-4" /> },
      { id: "colors",      label: "Farbcodierung",  description: "Semantisches Datenfarbsystem",    icon: <Palette2 className="w-4 h-4" />, isNew: true },
      { id: "icons",       label: "Icon-Set",       description: "150+ Icons, kategorisiert",       icon: <Shapes className="w-4 h-4" />, count: 150, isNew: true },
    ],
  },
  {
    title: "Komponenten",
    items: [
      { id: "buttons",    label: "Buttons",           description: "Aktionen & Interaktionen",    icon: <MousePointer2 className="w-4 h-4" />, count: 6 },
      { id: "cards",      label: "Cards & Surfaces",  description: "Inhaltsflächen & Container",   icon: <LayoutGrid className="w-4 h-4" />,    count: 5 },
      { id: "forms",      label: "Forms & Inputs",    description: "Eingabe & Validierung",        icon: <FormInput className="w-4 h-4" />,     count: 8 },
      { id: "feedback",   label: "Feedback & Overlay",description: "Toast, Modal, Tooltip, Tabs",  icon: <MessageSquare className="w-4 h-4" />, count: 5 },
      { id: "data",       label: "Data & Charts",     description: "12 Diagramm-Typen & Tabellen", icon: <BarChart2 className="w-4 h-4" />,     count: 12 },
      { id: "navigation", label: "Navigation",        description: "Navbar, Breadcrumb, Tabs",     icon: <Navigation className="w-4 h-4" />,    count: 4 },
    ],
  },
  {
    title: "Templates",
    items: [
      { id: "dashboard",  label: "Dashboard",         description: "KPIs, Analytics, Bestellungen", icon: <LayoutDashboard className="w-4 h-4" />, isNew: true },
    ],
  },
];

export default function Home() {
  const [activeId, setActiveId] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (id: string) => {
    setActiveId(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSection = () => {
    switch (activeId) {
      case "home":        return <HeroSection onNavigate={navigate} />;
      case "foundations": return <FoundationsSection />;
      case "colors":      return <ColorSection />;
      case "icons":       return <IconsSection />;
      case "buttons":     return <ButtonsSection />;
      case "cards":       return <CardsSection />;
      case "forms":       return <FormsSection />;
      case "feedback":    return <FeedbackSection />;
      case "data":        return <DataSection />;
      case "navigation":  return <NavigationSection />;
      case "dashboard":   return <DashboardSection />;
      default:            return <HeroSection onNavigate={navigate} />;
    }
  };

  /* ── Logo-Element ── */
  const Logo = ({ showClose = false }: { showClose?: boolean }) => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 rounded-xl overflow-hidden grain flex-shrink-0">
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, oklch(0.45 0.31 268), oklch(0.40 0.28 285) 50%, oklch(0.55 0.30 27))"
          }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-black text-white text-sm relative z-10">G</span>
          </div>
        </div>
        <div>
          <p className="font-display font-bold text-sm text-sidebar-foreground leading-tight">Grain UI</p>
          <p className="text-[0.6rem] font-mono text-sidebar-foreground/40 leading-tight">Component Library v3</p>
        </div>
      </div>
      {showClose && (
        <button
          onClick={() => setMobileOpen(false)}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Desktop Sidebar ── */}
      <div className="hidden lg:flex flex-col">
        <GrainSidebar
          sections={sidebarSections}
          activeId={activeId}
          onSelect={navigate}
          logo={<Logo />}
        />
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 flex flex-col">
            <GrainSidebar
              sections={sidebarSections}
              activeId={activeId}
              onSelect={navigate}
              logo={<Logo showClose />}
            />
          </div>
        </div>
      )}

      {/* ── Hauptinhalt ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-background/80 backdrop-blur-xl flex-shrink-0 sticky top-0 z-40">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-lg overflow-hidden grain flex-shrink-0">
              <div className="absolute inset-0" style={{
                background: "linear-gradient(135deg, oklch(0.45 0.31 268), oklch(0.55 0.30 27))"
              }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-black text-white text-[0.6rem] relative z-10">G</span>
              </div>
            </div>
            <span className="font-display font-bold text-sm text-foreground">Grain UI</span>
          </div>
          <div className="w-9" />
        </header>

        {/* Scrollbarer Inhalt */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
