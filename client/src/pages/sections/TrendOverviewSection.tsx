/**
 * TrendOverviewSection – Template: Trend-Übersicht
 * Zeigt das vollständige Layout einer Trend-Intelligence-Plattform:
 * Links: Trend-Grid gruppiert nach Status, Rechts: Detail-Panel, Unten: Intelligence Feed
 */

import React, { useState } from "react";
import { ArrowRight, X, ExternalLink, RefreshCw } from "lucide-react";
import { VoltCard, VoltCardContent, VoltCardHeader, VoltCardTitle } from "@/components/volt/VoltCard";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltTabs } from "@/components/volt/VoltTabs";
import { VoltCodeBlock } from "@/components/volt/VoltCodeBlock";
import {
  VoltTrendCard,
  VoltTrendDirection,
  VoltSignalBar,
  VoltStatusDot,
  type TrendDirection,
  type TrendStatus,
} from "@/components/volt/VoltTrendCard";

/* ── Demo-Daten ── */
const ADOPT_TRENDS = [
  { id: 1,  title: "Attention Economy & Creator…",       category: "MAKRO" as const, status: "trial"  as TrendStatus, direction: "stable" as TrendDirection, signals: 55, confidence: 60 },
  { id: 2,  title: "Autonomous Mobility & EVs",           category: "MAKRO" as const, status: "trial"  as TrendStatus, direction: "stable" as TrendDirection, signals: 75, confidence: 62 },
  { id: 3,  title: "Circular Economy",                    category: "MAKRO" as const, status: "trial"  as TrendStatus, direction: "up"     as TrendDirection, signals: 65, confidence: 55 },
  { id: 4,  title: "Digital Health & Telemedicine",       category: "MAKRO" as const, status: "trial"  as TrendStatus, direction: "up"     as TrendDirection, signals: 80, confidence: 72 },
  { id: 5,  title: "Edge Computing & IoT",                category: "MAKRO" as const, status: "trial"  as TrendStatus, direction: "up"     as TrendDirection, signals: 85, confidence: 68 },
  { id: 6,  title: "Identity Dynamics & Value Shi…",     category: "MAKRO" as const, status: "trial"  as TrendStatus, direction: "stable" as TrendDirection, signals: 90, confidence: 50 },
  { id: 7,  title: "Knowledge Culture & Lifelong…",      category: "MAKRO" as const, status: "trial"  as TrendStatus, direction: "stable" as TrendDirection, signals: 120, confidence: 50 },
  { id: 8,  title: "Mobility & Autonomous Trans…",       category: "MAKRO" as const, status: "trial"  as TrendStatus, direction: "stable" as TrendDirection, signals: 140, confidence: 50 },
];

const ASSESS_TRENDS = [
  { id: 9,  title: "Conscious Consumption & Eat…",       category: "MAKRO" as const, status: "assess" as TrendStatus, direction: "stable" as TrendDirection, signals: 45, confidence: 55 },
  { id: 10, title: "Engineered Evolution & Huma…",       category: "MAKRO" as const, status: "assess" as TrendStatus, direction: "stable" as TrendDirection, signals: 38, confidence: 45 },
  { id: 11, title: "Exponential Manufacturing &…",       category: "MAKRO" as const, status: "assess" as TrendStatus, direction: "stable" as TrendDirection, signals: 38, confidence: 52 },
  { id: 12, title: "Genomics & Personalized Medi…",      category: "MAKRO" as const, status: "assess" as TrendStatus, direction: "stable" as TrendDirection, signals: 42, confidence: 60 },
  { id: 13, title: "Quantum Computing",                   category: "MAKRO" as const, status: "assess" as TrendStatus, direction: "stable" as TrendDirection, signals: 50, confidence: 45 },
  { id: 14, title: "Smart Surroundings & Ambien…",       category: "MAKRO" as const, status: "assess" as TrendStatus, direction: "stable" as TrendDirection, signals: 62, confidence: 55 },
  { id: 15, title: "Spatial Computing & XR",              category: "MAKRO" as const, status: "assess" as TrendStatus, direction: "up"     as TrendDirection, signals: 60, confidence: 55 },
];

const HOLD_TRENDS = [
  { id: 16, title: "Web3 & Decentralization",             category: "MAKRO" as const, status: "hold"   as TrendStatus, direction: "down"   as TrendDirection, signals: 35, confidence: 45 },
];

const FEED_ITEMS = [
  { id: 1, title: "Mega-Trend",                     subtitle: "8 steigende Trends",   direction: "stable" as TrendDirection, bg: "bg-[#FEF9C3]" },
  { id: 2, title: "Makro-Trend",                    subtitle: "11 steigende Trends",  direction: "stable" as TrendDirection, bg: "bg-[#FEF9C3]" },
  { id: 3, title: "Demographic Shifts & Aging",     subtitle: "Impact 90% · Conf 83%", direction: "up"     as TrendDirection, status: "adopt", bg: "bg-[#FEF9C3]" },
  { id: 4, title: "Artificial Intelligence & Auto", subtitle: "98% · 500 signals",    direction: "up"     as TrendDirection, status: "adopt", bg: "bg-[#FEF3F2]" },
  { id: 5, title: "Generative AI & Foundation Mo",  subtitle: "96% · 420 signals",    direction: "up"     as TrendDirection, status: "adopt", bg: "bg-[#FEF3F2]" },
  { id: 6, title: "Technological Disruption",       subtitle: "95% · 400 signals",    direction: "up"     as TrendDirection, status: "adopt", bg: "bg-[#FEF3F2]" },
  { id: 7, title: "Energy Transition & Decarbon",   subtitle: "90% · 280 signals",    direction: "up"     as TrendDirection, status: "adopt", bg: "bg-[#FEF9C3]" },
  { id: 8, title: "Renewable Energy & Green Tech",  subtitle: "88% · 200 signals",    direction: "up"     as TrendDirection, status: "adopt", bg: "bg-[#FEF3F2]" },
];

const DETAIL = {
  title: "Connectivity & Digital Networks",
  badges: [
    { label: "Übernehmen", color: "bg-[#10B981] text-white" },
    { label: "Mega-Trend",  color: "bg-[#8B5CF6] text-white" },
    { label: "✦ KI & Digitale Transformation", color: "bg-[#EEF2FF] text-[#4F46E5]" },
  ],
  stability: "Stabil",
  source: "TRENDONE – Trend Universe 2026 (18 Mega-Trends, 150 Macro-Trends)",
  description: "Belegt durch 3 von 42 autoritativen Quellen — mehr Abdeckung erhöht das Vertrauen.",
  regulatory: [
    { region: "EU",    name: "GDPR",     desc: "General Data Protection Regulation",    label: "bremst",   color: "bg-[#FEE2E2] text-[#DC2626]" },
    { region: "EU",    name: "DMA/DSA",  desc: "Digital Markets Act / Digital Services Act", label: "formt um", color: "bg-[#FEF9C3] text-[#D97706]" },
    { region: "China", name: "DSL/PIPL", desc: "China Data Security Law / PIPL",        label: "bremst",   color: "bg-[#FEE2E2] text-[#DC2626]" },
  ],
  signals: [
    { name: "Hacker News", desc: "Tech community discussions & project launches", status: "verfügbar" },
    { name: "GitHub",      desc: "Repository activity, stars & contributor growth", status: "verfügbar" },
    { name: "arXiv",       desc: "Academic preprints & research publications",    status: "verfügbar" },
  ],
  tags: ["connectivity", "networks", "digital", "iot", "mega-trend"],
};

export function TrendOverviewSection() {
  const [activeId, setActiveId] = useState<number | null>(4);
  const [showDetail, setShowDetail] = useState(true);
  const [feedTab, setFeedTab] = useState("all");

  const allTrends = [...ADOPT_TRENDS, ...ASSESS_TRENDS, ...HOLD_TRENDS];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="section-label mb-1">25 — TEMPLATES & VISUALISIERUNG</p>
        <h2 className="font-display font-bold text-3xl text-foreground mb-2">Trend-Übersicht</h2>
        <p className="font-body text-muted-foreground text-base max-w-2xl">
          Vollständiges Layout einer Trend-Intelligence-Plattform — Trend-Grid mit Statusgruppen,
          Detail-Panel und Intelligence Feed.
        </p>
      </div>

      {/* Template Preview */}
      <VoltCard variant="outlined" className="overflow-hidden">
        <VoltCardContent className="p-0">
          <div className="flex h-[640px] overflow-hidden">

            {/* ── Linke Spalte: Trend-Grid ── */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 min-w-0">

              {/* TRIAL */}
              <VoltStatusDot label="Trial" count={ADOPT_TRENDS.length} color="#3B82F6" />
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
                {ADOPT_TRENDS.map(t => (
                  <VoltTrendCard
                    key={t.id}
                    {...t}
                    active={activeId === t.id}
                    onClick={() => { setActiveId(t.id); setShowDetail(true); }}
                  />
                ))}
              </div>

              {/* ASSESS */}
              <VoltStatusDot label="Assess" count={ASSESS_TRENDS.length} color="#F59E0B" />
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
                {ASSESS_TRENDS.map(t => (
                  <VoltTrendCard
                    key={t.id}
                    {...t}
                    active={activeId === t.id}
                    onClick={() => { setActiveId(t.id); setShowDetail(true); }}
                  />
                ))}
              </div>

              {/* HOLD */}
              <VoltStatusDot label="Hold" count={HOLD_TRENDS.length} color="#EF4444" />
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
                {HOLD_TRENDS.map(t => (
                  <VoltTrendCard
                    key={t.id}
                    {...t}
                    active={activeId === t.id}
                    onClick={() => { setActiveId(t.id); setShowDetail(true); }}
                  />
                ))}
              </div>

              {/* Intelligence Feed */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono font-semibold text-muted-foreground tracking-widest uppercase">
                    · Intelligence Feed
                  </span>
                  <div className="flex items-center gap-1">
                    {[
                      { id: "all", label: "Alle 12", bg: "bg-foreground text-background" },
                      { id: "up",  label: "▲ 7",     bg: "bg-transparent text-[#10B981]" },
                      { id: "stable", label: "● 4",  bg: "bg-transparent text-[#D97706]" },
                      { id: "right",  label: "→ 1",  bg: "bg-transparent text-muted-foreground" },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setFeedTab(tab.id)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold transition-colors ${
                          feedTab === tab.id ? tab.bg : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1.5">
                  {FEED_ITEMS.map(item => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg ${item.bg}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-body font-medium text-xs text-foreground truncate">
                            {item.title}
                          </span>
                          {item.status && (
                            <span className="inline-flex items-center px-1 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-[#10B981] text-white flex-shrink-0">
                              {item.status}
                            </span>
                          )}
                          {item.direction === "up" && (
                            <span className="text-[#10B981] flex-shrink-0">▲</span>
                          )}
                        </div>
                        <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{item.subtitle}</p>
                      </div>
                      <VoltSignalBar direction={item.direction} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Rechte Spalte: Detail-Panel ── */}
            {showDetail && (
              <div className="w-72 flex-shrink-0 border-l border-border overflow-y-auto p-4 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-bold text-base text-foreground leading-snug">
                    {DETAIL.title}
                  </h3>
                  <button
                    onClick={() => setShowDetail(false)}
                    className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {DETAIL.badges.map((b, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold ${b.color}`}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-mono text-muted-foreground">— {DETAIL.stability}</p>

                {/* Source */}
                <div className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                  <span className="text-[10px] font-mono font-bold text-muted-foreground flex-shrink-0 mt-0.5">T1</span>
                  <div>
                    <p className="text-xs font-body font-semibold text-foreground">TRENDONE</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{DETAIL.source}</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5 ml-auto" />
                </div>
                <p className="text-xs font-body text-[#4F46E5] leading-relaxed">{DETAIL.description}</p>

                {/* Regulatory */}
                <div>
                  <p className="text-[10px] font-mono font-semibold text-muted-foreground tracking-widest uppercase mb-2">
                    ↳ Regulatorisches Umfeld ({DETAIL.regulatory.length})
                  </p>
                  <div className="flex gap-1.5 flex-wrap mb-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FEE2E2] text-[#DC2626] font-mono font-semibold">Bremsend 0.9</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FEF9C3] text-[#D97706] font-mono font-semibold">Umformend 0.5</span>
                  </div>
                  <div className="space-y-1.5">
                    {DETAIL.regulatory.map((r, i) => (
                      <div key={i} className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-muted-foreground">{r.region}</span>
                            <span className="text-xs font-body font-semibold text-foreground">{r.name}</span>
                          </div>
                          <p className="text-[10px] font-mono text-muted-foreground">{r.desc}</p>
                        </div>
                        <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${r.color}`}>
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Signals */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-mono font-semibold text-muted-foreground tracking-widest uppercase">
                      Live-Signale
                    </p>
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#E4FF97] text-[#0A0A0A]">
                      350 Signale
                    </span>
                  </div>
                  <div className="space-y-2">
                    {DETAIL.signals.map((s, i) => (
                      <div key={i} className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-foreground flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-body font-semibold text-foreground">{s.name}</p>
                            <p className="text-[10px] font-mono text-muted-foreground">{s.desc}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground flex-shrink-0">{s.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-[10px] font-mono font-semibold text-muted-foreground tracking-widest uppercase mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {DETAIL.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                          tag === "mega-trend"
                            ? "bg-[#E4FF97] text-[#0A0A0A] border-transparent"
                            : "bg-transparent text-muted-foreground border-border"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Komponenten-Übersicht */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VoltCard variant="subtle">
          <VoltCardHeader>
            <VoltBadge variant="muted" size="sm">Neu</VoltBadge>
            <VoltCardTitle className="text-sm">VoltTrendCard</VoltCardTitle>
          </VoltCardHeader>
          <VoltCardContent>
            <VoltTrendCard title="Quantum Computing" category="MAKRO" status="assess" direction="up" signals={50} confidence={45} />
            <VoltCodeBlock code={`<VoltTrendCard title="..." category="MAKRO" status="assess" direction="up" signals={50} confidence={45} />`} />
          </VoltCardContent>
        </VoltCard>

        <VoltCard variant="subtle">
          <VoltCardHeader>
            <VoltBadge variant="muted" size="sm">Neu</VoltBadge>
            <VoltCardTitle className="text-sm">VoltStatusDot</VoltCardTitle>
          </VoltCardHeader>
          <VoltCardContent>
            <VoltStatusDot label="Trial" count={8} color="#3B82F6" />
            <VoltStatusDot label="Assess" count={7} color="#F59E0B" />
            <VoltStatusDot label="Hold" count={1} color="#EF4444" />
            <VoltCodeBlock code={`<VoltStatusDot label="Trial" count={8} color="#3B82F6" />`} />
          </VoltCardContent>
        </VoltCard>

        <VoltCard variant="subtle">
          <VoltCardHeader>
            <VoltBadge variant="muted" size="sm">Neu</VoltBadge>
            <VoltCardTitle className="text-sm">VoltTrendDirection</VoltCardTitle>
          </VoltCardHeader>
          <VoltCardContent>
            <div className="flex items-center gap-4 py-2">
              <VoltTrendDirection direction="up" />
              <VoltTrendDirection direction="stable" />
              <VoltTrendDirection direction="down" />
            </div>
            <VoltCodeBlock code={`<VoltTrendDirection direction="up" />`} />
          </VoltCardContent>
        </VoltCard>

        <VoltCard variant="subtle">
          <VoltCardHeader>
            <VoltBadge variant="muted" size="sm">Neu</VoltBadge>
            <VoltCardTitle className="text-sm">VoltSignalBar</VoltCardTitle>
          </VoltCardHeader>
          <VoltCardContent>
            <div className="flex items-center gap-4 py-2">
              <VoltSignalBar direction="up" />
              <VoltSignalBar direction="stable" />
              <VoltSignalBar direction="down" />
            </div>
            <VoltCodeBlock code={`<VoltSignalBar direction="up" />`} />
          </VoltCardContent>
        </VoltCard>
      </div>
    </div>
  );
}
