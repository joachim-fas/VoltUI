/**
 * SourcesTableSection – Template: Quellen-Tabelle
 * Vollständige Quellen-Verwaltungsansicht mit Filter-Pills, Suchfeld,
 * Typ-Badges (LIVE-SIGNAL, SOCIAL, FORSCHUNG) und Status/Auth-Spalten.
 */

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { VoltCard, VoltCardContent } from "@/components/volt/VoltCard";
import { VoltCodeBlock } from "@/components/volt/VoltCodeBlock";

type SourceType = "LIVE-SIGNAL" | "SOCIAL" | "FORSCHUNG" | "MARKT" | "SENTIMENT";
type SourceStatus = "AKTIV" | "INAKTIV";
type SourceAuth = "FREI" | "KEY";

interface Source {
  name: string;
  category: string;
  type: SourceType;
  description: string;
  status: SourceStatus;
  auth: SourceAuth;
}

const SOURCES: Source[] = [
  { name: "HackerNews",         category: "Tech & Developer", type: "LIVE-SIGNAL", description: "Tech-Community Headlines, Diskussionen, Upvotes",        status: "AKTIV",   auth: "FREI" },
  { name: "GitHub Trending",    category: "Tech & Developer", type: "LIVE-SIGNAL", description: "Trending Repos, Stars, Forks — Tech-Adoption",           status: "AKTIV",   auth: "FREI" },
  { name: "Reddit",             category: "Tech & Developer", type: "LIVE-SIGNAL", description: "Diskussionen aus 16 Tech-Subreddits",                     status: "AKTIV",   auth: "FREI" },
  { name: "Stack Overflow",     category: "Tech & Developer", type: "LIVE-SIGNAL", description: "Tag-Volumen als Developer-Aktivitäts-Indikator",          status: "AKTIV",   auth: "FREI" },
  { name: "npm + PyPI",         category: "Tech & Developer", type: "LIVE-SIGNAL", description: "Download-Trends für JS/Python-Pakete",                    status: "AKTIV",   auth: "FREI" },
  { name: "Product Hunt",       category: "Tech & Developer", type: "LIVE-SIGNAL", description: "Neue Tech-Produkte und Startups täglich",                 status: "AKTIV",   auth: "KEY"  },
  { name: "Docker Hub",         category: "Tech & Developer", type: "LIVE-SIGNAL", description: "Container Pull-Zahlen als Adoption-Signal",               status: "INAKTIV", auth: "FREI" },
  { name: "Bluesky",            category: "Tech & Developer", type: "SOCIAL",      description: "Dezentrales Social, Tech-Community",                      status: "INAKTIV", auth: "FREI" },
  { name: "Mastodon",           category: "Tech & Developer", type: "SOCIAL",      description: "Dezentrales Social, EU Tech/Wissenschaft",                status: "INAKTIV", auth: "FREI" },
  { name: "arXiv",              category: "Wissenschaft",     type: "FORSCHUNG",   description: "Preprints: Physics, CS, Bio — frühestes Signal",          status: "AKTIV",   auth: "FREI" },
  { name: "OpenAlex",           category: "Wissenschaft",     type: "FORSCHUNG",   description: "250M+ Works, Zitations-Analyse, Konzept-Trends",          status: "AKTIV",   auth: "FREI" },
  { name: "CrossRef",           category: "Wissenschaft",     type: "FORSCHUNG",   description: "150M+ DOI-Metadaten, Publikationsvolumen",                status: "INAKTIV", auth: "FREI" },
  { name: "Semantic Scholar",   category: "Wissenschaft",     type: "FORSCHUNG",   description: "220M+ Papers, semantische Suche, Citations",              status: "INAKTIV", auth: "FREI" },
  { name: "PatentsView (USPTO)",category: "Wissenschaft",     type: "FORSCHUNG",   description: "US-Patent-Trends als Innovationsindikator",               status: "INAKTIV", auth: "FREI" },
  { name: "GDELT 2.0",          category: "Geopolitik",       type: "LIVE-SIGNAL", description: "15-Min-Updates, 100+ Sprachen, Sentiment",                status: "AKTIV",   auth: "FREI" },
  { name: "ACLED",              category: "Geopolitik",       type: "LIVE-SIGNAL", description: "Konflikte & politische Gewalt weltweit",                  status: "INAKTIV", auth: "KEY"  },
  { name: "World Bank Open Data",category: "Makroökonomie",   type: "FORSCHUNG",   description: "Wirtschaftsindikatoren, 200+ Länder",                     status: "AKTIV",   auth: "FREI" },
  { name: "IMF Data",           category: "Makroökonomie",    type: "FORSCHUNG",   description: "Globale Wirtschaftsprognosen & Statistiken",              status: "AKTIV",   auth: "FREI" },
  { name: "Metaculus",          category: "Gesellschaft",     type: "MARKT",       description: "Prediction-Market für Wissenschaft & Technologie",        status: "AKTIV",   auth: "FREI" },
  { name: "Manifold Markets",   category: "Gesellschaft",     type: "MARKT",       description: "Play-Money Prediction Markets, breites Themenspektrum",   status: "INAKTIV", auth: "FREI" },
];

const CATEGORIES = ["Alle", "Tech & Developer", "Wissenschaft", "Geopolitik", "Makroökonomie", "Gesellschaft"];

const TYPE_STYLES: Record<SourceType, string> = {
  "LIVE-SIGNAL": "bg-[#D1FAE5] text-[#065F46]",
  "SOCIAL":      "bg-[#E0E7FF] text-[#3730A3]",
  "FORSCHUNG":   "bg-[#EDE9FE] text-[#5B21B6]",
  "MARKT":       "bg-[#FEF3C7] text-[#92400E]",
  "SENTIMENT":   "bg-[#FCE7F3] text-[#9D174D]",
};

export function SourcesTableSection() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return SOURCES.filter(s => {
      const matchCat = activeCategory === "Alle" || s.category === activeCategory;
      const matchSearch = search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const activeCount = SOURCES.filter(s => s.status === "AKTIV").length;
  const keyCount    = SOURCES.filter(s => s.auth === "KEY").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="section-label mb-1">27 — TEMPLATES & VISUALISIERUNG</p>
        <h2 className="font-display font-bold text-3xl text-foreground mb-2">Quellen-Tabelle</h2>
        <p className="font-body text-muted-foreground text-base max-w-2xl">
          Vollständige Quellen-Verwaltungsansicht mit Filter-Pills, Suchfeld,
          Typ-Badges und Status/Auth-Spalten.
        </p>
      </div>

      {/* Template Preview */}
      <VoltCard variant="outlined" className="overflow-hidden">
        <VoltCardContent className="p-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-border">
            <p className="text-sm font-mono text-muted-foreground">
              {SOURCES.length} Quellen ·{" "}
              <span className="text-[#10B981] font-semibold">{activeCount} aktiv</span>
              {" · "}
              <span className="text-[#D97706]">{keyCount} brauchen Key</span>
            </p>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Suchen…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs font-mono border border-border rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20 w-44"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-border overflow-x-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-foreground text-background font-semibold"
                    : "text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-2.5 text-[11px] font-mono font-semibold text-muted-foreground">Quelle</th>
                  <th className="text-left px-3 py-2.5 text-[11px] font-mono font-semibold text-muted-foreground">Kategorie</th>
                  <th className="text-left px-3 py-2.5 text-[11px] font-mono font-semibold text-muted-foreground">Typ</th>
                  <th className="text-left px-3 py-2.5 text-[11px] font-mono font-semibold text-muted-foreground">Beschreibung</th>
                  <th className="text-left px-3 py-2.5 text-[11px] font-mono font-semibold text-muted-foreground">Status</th>
                  <th className="text-left px-3 py-2.5 text-[11px] font-mono font-semibold text-muted-foreground">Auth</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((source, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <span className="font-body font-semibold text-sm text-foreground">{source.name}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs font-mono text-muted-foreground">{source.category}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${TYPE_STYLES[source.type]}`}>
                        {source.type}
                      </span>
                    </td>
                    <td className="px-3 py-3 max-w-xs">
                      <span className="text-xs font-body text-muted-foreground">{source.description}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        source.status === "AKTIV"
                          ? "bg-[#D1FAE5] text-[#065F46]"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {source.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        source.auth === "KEY"
                          ? "bg-[#FEF9C3] text-[#92400E]"
                          : "text-muted-foreground"
                      }`}>
                        {source.auth}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-xs font-mono text-muted-foreground">
                      Keine Quellen gefunden.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </VoltCardContent>
      </VoltCard>

      {/* Code Snippet */}
      <VoltCard variant="subtle">
        <VoltCardContent>
          <p className="text-xs font-mono text-muted-foreground mb-2">Verwendung</p>
          <VoltCodeBlock code={`// Filter-Pills + Suchfeld + Tabelle\n// TYPE_STYLES: Record<SourceType, string>\n// useMemo für gefilterte Daten`} />
        </VoltCardContent>
      </VoltCard>
    </div>
  );
}
