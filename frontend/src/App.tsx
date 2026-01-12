import { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import type { AlertItem, ServerListItem, ServerMetrics, ServerStatus } from "./types";
import { ServerCard } from "./components/ServerCard";
import { AlertsList } from "./components/AlertsList";
import { ServerDetailModal } from "./components/ServerDetailModal";
import { Server } from "lucide-react";

const tabs: Array<{ label: string; value: "all" | ServerStatus }> = [
  { label: "All", value: "all" },
  { label: "Healthy", value: "healthy" },
  { label: "Warning", value: "warning" },
  { label: "Critical", value: "critical" },
];

export default function App() {
  const [servers, setServers] = useState<ServerListItem[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | ServerStatus>("all");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ServerMetrics | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  async function loadDashboard() {
    try {
      setError(null);
      const [s, a] = await Promise.all([api.getServers(), api.getAlerts()]);
      setServers(s.servers);
      setAlerts(a.alerts);
      setLastUpdate(new Date().toLocaleTimeString());
      
    } catch (e: any) {
      setError(e?.message ?? "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }

  async function openServerModal(id: string) {
    setSelectedId(id);
    setIsModalOpen(true);
    setDetail(null);
    setDetailError(null);
    setDetailLoading(true);

    try {
      const data = await api.getServerMetrics(id);
      setDetail(data);
    } catch (e: any) {
      setDetailError(e?.message ?? "Failed to load server metrics");
    } finally {
      setDetailLoading(false);
    }
  }

  function closeServerModal() {
    setIsModalOpen(false);
  }

  // initial + polling
  useEffect(() => {
    loadDashboard();
    const t = window.setInterval(loadDashboard, 10_000);
    return () => window.clearInterval(t);
  }, []);

  const counts = useMemo(() => {
    const c = { healthy: 0, warning: 0, critical: 0 };
    for (const s of servers) c[s.status]++;
    return c;
  }, [servers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return servers
      .filter((s) => (tab === "all" ? true : s.status === tab))
      .filter((s) => (q ? s.name.toLowerCase().includes(q) : true));
  }, [servers, query, tab]);

  const alertCount = alerts.length;
  return (
    <div className="min-h-screen w-full bg-[#070B12] flex flex-col">
      {/* Top bar */}
      <div className="border-b border-slate-800/60 bg-slate-950/30">
        <div className="mx-auto flex w-full items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-500/15 ring-1 ring-sky-500/25">
              <Server className="h-5 w-5 text-sky-300" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-slate-100">
                Server Monitor
              </div>
              <div className="mt-0.5 text-sm text-slate-400">
                Real-time health metrics
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-full bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-300 ring-1 ring-rose-500/25">
              {alertCount} Alerts
            </div>
            <button
              onClick={() => {
                setLoading(true);
                loadDashboard();
              }}
              className="rounded-xl bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-200 ring-1 ring-slate-700/60 hover:bg-slate-900"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto w-full px-4 py-6 flex-1 flex flex-col">
        {error && (
          <div className="mb-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200 ring-1 ring-rose-500/10">
            {error}
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 flex-1">
            {/* Left column */}
            <div className="lg:col-span-8">
              <div className="space-y-3">
                {/* Search */}
                <div className="flex w-full items-center gap-2 rounded-2xl bg-slate-950/40 px-3 py-2 ring-1 ring-slate-800/60">
                  <span className="text-slate-400">⌕</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search servers…"
                    className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 outline-none"
                  />
                </div>

                {/* Tabs under search */}
                <div className="flex flex-wrap gap-2">
                  {tabs.map((t) => {
                    const label =
                      t.value === "healthy"
                        ? `Healthy ${counts.healthy}`
                        : t.value === "warning"
                          ? `Warning ${counts.warning}`
                          : t.value === "critical"
                            ? `Critical ${counts.critical}`
                            : `All ${servers.length}`;

                    const active = tab === t.value;

                    return (
                      <button
                        key={t.value}
                        onClick={() => setTab(t.value)}
                        className={[
                          "rounded-xl px-3 py-2 text-xs font-semibold ring-1 transition",
                          active
                            ? "bg-slate-100 text-slate-900 ring-slate-200"
                            : "bg-slate-950/40 text-slate-300 ring-slate-800/60 hover:bg-slate-900/60",
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>


              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {loading ? (
                  <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4 text-sm text-slate-400 ring-1 ring-slate-700/40">
                    Loading servers…
                  </div>
                ) : (
                  filtered.map((s) => (
                    <ServerCard
                      key={s.id}
                      server={s}
                      selected={s.id === selectedId}
                      onClick={() => openServerModal(s.id)}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <AlertsList alerts={alerts} />
            </div>
          </div>

          <div className="mt-auto text-center text-xs text-slate-500">
            Auto-refreshing every 10s · Last update: {lastUpdate || "—"}
          </div>
        </div>
      </div>

      <ServerDetailModal
        open={isModalOpen}
        loading={detailLoading}
        error={detailError}
        data={detail}
        onClose={closeServerModal}
      />

    </div>
  );
}
