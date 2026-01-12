// src/components/ServerDetailModal.tsx
import type { ServerMetrics } from "../types";
import { StatusPill } from "./StatusPill";
import { MetricLine } from "./MetricLine";

export function ServerDetailModal({
    open,
    loading,
    error,
    data,
    onClose,
}: {
    open: boolean;
    loading: boolean;
    error: string | null;
    data: ServerMetrics | null;
    onClose: () => void;
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <button
                aria-label="Close modal"
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
            />


            {/* Centered modal */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    <div className="rounded-2xl border border-slate-800/60 bg-slate-950 p-4 ring-1 ring-slate-700/40">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-slate-100">
                                    {data?.name ?? "Select a server"}
                                </div>
                                <div className="mt-1 text-xs text-slate-400">
                                    {data?.server_id ? `Web Server · ID: ${data.server_id}` : "—"}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {data?.status && <StatusPill status={data.status} />}
                                <button
                                    onClick={onClose}
                                    className="rounded-xl bg-slate-900/60 px-2.5 py-1.5 text-xs font-semibold
                                                text-slate-200 ring-1 ring-slate-700/60 hover:bg-slate-900"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>


                        <div className="mt-5 space-y-4">
                            {loading && (
                                <div className="text-sm text-slate-400">Loading metrics…</div>
                            )}
                            {error && <div className="text-sm text-rose-300">{error}</div>}

                            {data && !loading && !error && (
                                <>
                                    <MetricLine
                                        label="CPU Usage"
                                        value={data.metrics.cpu_usage}
                                        color="sky"
                                    />
                                    <MetricLine
                                        label="Memory Usage"
                                        value={data.metrics.memory_usage}
                                        color="violet"
                                    />
                                    <MetricLine
                                        label="Disk Usage"
                                        value={data.metrics.disk_usage}
                                        color="amber"
                                    />
                                    <MetricLine
                                        label="Network I/O"
                                        value={Math.min(100, (data.metrics.network_io / 10000) * 100)}
                                        color="emerald"
                                    />

                                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                                        <span>
                                            Last updated:{" "}
                                            {data.timestamp
                                                ? new Date(data.timestamp).toLocaleString()
                                                : "—"}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
