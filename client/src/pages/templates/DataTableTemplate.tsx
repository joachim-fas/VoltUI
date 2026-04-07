/**
 * Volt UI – Data Table View Template
 * Route: /showcase/data-table
 * Zeigt: Vollständige Datentabelle mit Suche, Filtern, Sortierung, Pagination, Bulk-Aktionen
 * Komponenten: VoltTable, VoltInput, VoltBadge, VoltButton, VoltCard, VoltAvatar, VoltSelect
 */

import React, { useState, useMemo } from "react";
import { TemplateShell } from "./TemplateShell";
import { VoltButton } from "@/components/volt/VoltButton";
import { VoltBadge } from "@/components/volt/VoltBadge";
import { VoltCard } from "@/components/volt/VoltCard";
import { VoltAvatar } from "@/components/volt/VoltAvatar";
import { VoltInput } from "@/components/volt/VoltInput";
import { VoltSelect } from "@/components/volt/VoltInput";
import {
  Search, Download, Plus, Trash2, Edit, MoreHorizontal,
  ChevronUp, ChevronDown, ChevronsUpDown, Filter,
  CheckSquare, Square, ArrowUpRight, RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Typen ── */
type SortDir = "asc" | "desc" | null;
type UserRole = "admin" | "editor" | "viewer" | "owner";
type UserStatus = "active" | "inactive" | "pending" | "suspended";

interface User extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  plan: string;
  joined: string;
  lastActive: string;
  projects: number;
}

/* ── Dummy-Daten ── */
const USERS: User[] = [
  { id: "1",  name: "Lena Hoffmann",   email: "lena@example.com",    role: "owner",  status: "active",    plan: "Enterprise", joined: "12.01.2025", lastActive: "heute",       projects: 14 },
  { id: "2",  name: "Marcus Steiner",  email: "marcus@example.com",  role: "admin",  status: "active",    plan: "Pro",        joined: "03.03.2025", lastActive: "gestern",     projects: 8  },
  { id: "3",  name: "Priya Nair",      email: "priya@example.com",   role: "editor", status: "active",    plan: "Pro",        joined: "17.04.2025", lastActive: "vor 3 Tagen", projects: 5  },
  { id: "4",  name: "Tom Weber",       email: "tom@example.com",     role: "viewer", status: "inactive",  plan: "Starter",    joined: "22.06.2025", lastActive: "vor 2 Wo.",   projects: 2  },
  { id: "5",  name: "Anna Müller",     email: "anna@example.com",    role: "editor", status: "pending",   plan: "Pro",        joined: "05.07.2025", lastActive: "–",           projects: 0  },
  { id: "6",  name: "David Kim",       email: "david@example.com",   role: "admin",  status: "active",    plan: "Enterprise", joined: "14.08.2025", lastActive: "heute",       projects: 11 },
  { id: "7",  name: "Sophie Laurent",  email: "sophie@example.com",  role: "editor", status: "active",    plan: "Pro",        joined: "29.09.2025", lastActive: "vor 1 Tag",   projects: 6  },
  { id: "8",  name: "Kai Tanaka",      email: "kai@example.com",     role: "viewer", status: "suspended", plan: "Starter",    joined: "11.10.2025", lastActive: "vor 1 Mo.",   projects: 1  },
  { id: "9",  name: "Elena Rossi",     email: "elena@example.com",   role: "editor", status: "active",    plan: "Pro",        joined: "02.11.2025", lastActive: "vor 2 Tagen", projects: 4  },
  { id: "10", name: "James O'Brien",   email: "james@example.com",   role: "viewer", status: "active",    plan: "Starter",    joined: "18.12.2025", lastActive: "vor 5 Tagen", projects: 3  },
  { id: "11", name: "Mia Chen",        email: "mia@example.com",     role: "editor", status: "pending",   plan: "Pro",        joined: "07.01.2026", lastActive: "–",           projects: 0  },
  { id: "12", name: "Felix Wagner",    email: "felix@example.com",   role: "admin",  status: "active",    plan: "Enterprise", joined: "23.02.2026", lastActive: "heute",       projects: 9  },
];

/* ── Badge-Varianten ── */
const ROLE_BADGE: Record<UserRole, "default" | "solid" | "outline" | "blue" | "muted"> = {
  owner:  "solid",
  admin:  "default",
  editor: "blue",
  viewer: "muted",
};

const STATUS_BADGE: Record<UserStatus, "positive" | "negative" | "neutral" | "outline"> = {
  active:    "positive",
  inactive:  "neutral",
  pending:   "outline",
  suspended: "negative",
};

const STATUS_LABEL: Record<UserStatus, string> = {
  active:    "Aktiv",
  inactive:  "Inaktiv",
  pending:   "Ausstehend",
  suspended: "Gesperrt",
};

/* ── Sortier-Icon ── */
function SortIcon({ field, sortField, sortDir }: { field: string; sortField: string | null; sortDir: SortDir }) {
  if (sortField !== field) return <ChevronsUpDown className="w-3.5 h-3.5 opacity-30" />;
  return sortDir === "asc"
    ? <ChevronUp className="w-3.5 h-3.5 text-primary" />
    : <ChevronDown className="w-3.5 h-3.5 text-primary" />;
}

/* ── Hauptkomponente ── */
export default function DataTableTemplate() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  /* Filtern */
  const filtered = useMemo(() => {
    let data = [...USERS];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (roleFilter !== "all")   data = data.filter((u) => u.role === roleFilter);
    if (statusFilter !== "all") data = data.filter((u) => u.status === statusFilter);
    if (sortField && sortDir) {
      data.sort((a, b) => {
        const av = a[sortField] as string | number;
        const bv = b[sortField] as string | number;
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return data;
  }, [search, roleFilter, statusFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  /* Sortierung */
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir((d) => d === "asc" ? "desc" : d === "desc" ? null : "asc");
      if (sortDir === "desc") setSortField(null);
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  };

  /* Selektion */
  const allSelected = paginated.length > 0 && paginated.every((u) => selected.has(u.id));
  const toggleAll = () => {
    if (allSelected) {
      setSelected((p) => { const n = new Set(p); paginated.forEach((u) => n.delete(u.id)); return n; });
    } else {
      setSelected((p) => { const n = new Set(p); paginated.forEach((u) => n.add(u.id)); return n; });
    }
  };
  const toggleOne = (id: string) => {
    setSelected((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const SortableHeader = ({ field, label, align = "left" }: { field: string; label: string; align?: "left" | "right" }) => (
    <th
      className={cn(
        "px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground cursor-pointer select-none group",
        align === "right" ? "text-right" : "text-left"
      )}
      onClick={() => handleSort(field)}
    >
      <div className={cn("flex items-center gap-1.5", align === "right" && "justify-end")}>
        {label}
        <SortIcon field={field} sortField={sortField} sortDir={sortDir} />
      </div>
    </th>
  );

  return (
    <TemplateShell title="Data Table View" category="App">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl tracking-tight mb-0.5">Nutzerverwaltung</h1>
            <p className="text-muted-foreground text-sm">{USERS.length} Nutzer · {USERS.filter((u) => u.status === "active").length} aktiv</p>
          </div>
          <div className="flex items-center gap-2">
            <VoltButton size="sm" variant="outline" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export
            </VoltButton>
            <VoltButton size="sm" variant="primary" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Nutzer einladen
            </VoltButton>
          </div>
        </div>

        {/* ── Statistik-Zeile ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Gesamt",      value: USERS.length,                                            color: "bg-foreground text-background" },
            { label: "Aktiv",       value: USERS.filter((u) => u.status === "active").length,       color: "bg-[#E4FF97] text-[#0A0A0A]" },
            { label: "Ausstehend",  value: USERS.filter((u) => u.status === "pending").length,      color: "bg-muted text-foreground" },
            { label: "Gesperrt",    value: USERS.filter((u) => u.status === "suspended").length,    color: "bg-muted text-foreground" },
          ].map((s) => (
            <div key={s.label} className={cn("rounded-xl p-4 flex items-center justify-between", s.color)}>
              <span className="text-xs font-semibold opacity-70">{s.label}</span>
              <span className="font-display font-bold text-2xl">{s.value}</span>
            </div>
          ))}
        </div>

        <VoltCard className="p-0 overflow-hidden">
          {/* ── Toolbar ── */}
          <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-border">
            <div className="flex-1 min-w-[200px] max-w-xs">
              <VoltInput
                placeholder="Suchen …"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                variant="boxed"
                inputSize="sm"
                leftElement={<Search className="w-3.5 h-3.5" />}
              />
            </div>

            <VoltSelect
              variant="boxed"
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
              className="h-8 text-xs w-36"
            >
              <option value="all">Alle Rollen</option>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </VoltSelect>

            <VoltSelect
              variant="boxed"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="h-8 text-xs w-40"
            >
              <option value="all">Alle Status</option>
              <option value="active">Aktiv</option>
              <option value="inactive">Inaktiv</option>
              <option value="pending">Ausstehend</option>
              <option value="suspended">Gesperrt</option>
            </VoltSelect>

            <div className="flex-1" />

            {selected.size > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs font-semibold text-foreground">{selected.size} ausgewählt</span>
                <VoltButton size="sm" variant="ghost" leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                  className="text-destructive hover:bg-destructive/10 h-6 px-2 text-xs">
                  Löschen
                </VoltButton>
              </div>
            )}

            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ── Tabelle ── */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/60 border-b border-border">
                  <th className="px-4 py-3 w-10">
                    <button onClick={toggleAll} className="text-muted-foreground hover:text-foreground transition-colors">
                      {allSelected
                        ? <CheckSquare className="w-4 h-4 text-primary" />
                        : <Square className="w-4 h-4" />
                      }
                    </button>
                  </th>
                  <SortableHeader field="name"       label="Nutzer" />
                  <SortableHeader field="role"       label="Rolle" />
                  <SortableHeader field="status"     label="Status" />
                  <SortableHeader field="plan"       label="Plan" />
                  <SortableHeader field="projects"   label="Projekte" align="right" />
                  <SortableHeader field="lastActive" label="Zuletzt aktiv" />
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right w-16">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-sm text-muted-foreground">
                      Keine Nutzer gefunden.
                    </td>
                  </tr>
                ) : paginated.map((user) => (
                  <tr
                    key={user.id}
                    className={cn(
                      "border-b border-border last:border-0 transition-colors",
                      selected.has(user.id) ? "bg-primary/5" : "hover:bg-muted/30"
                    )}
                  >
                    <td className="px-4 py-3">
                      <button onClick={() => toggleOne(user.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                        {selected.has(user.id)
                          ? <CheckSquare className="w-4 h-4 text-primary" />
                          : <Square className="w-4 h-4" />
                        }
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <VoltAvatar name={user.name} size="sm" online={user.status === "active"} />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <VoltBadge variant={ROLE_BADGE[user.role]} size="sm">{user.role}</VoltBadge>
                    </td>
                    <td className="px-4 py-3">
                      <VoltBadge variant={STATUS_BADGE[user.status]} size="sm">{STATUS_LABEL[user.status]}</VoltBadge>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{user.plan}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-mono text-foreground">{user.projects}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground">{user.lastActive}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {filtered.length === 0
                ? "Keine Einträge"
                : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filtered.length)} von ${filtered.length}`
              }
            </p>
            <div className="flex items-center gap-1">
              <VoltButton
                size="sm" variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ←
              </VoltButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-xs font-semibold transition-all",
                    page === p
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {p}
                </button>
              ))}
              <VoltButton
                size="sm" variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || totalPages === 0}
              >
                →
              </VoltButton>
            </div>
          </div>
        </VoltCard>
      </div>
    </TemplateShell>
  );
}
