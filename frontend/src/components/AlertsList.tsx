import type { AlertItem } from "../types";

export function AlertsList({ alerts }: { alerts: AlertItem[] }) {
    return (
        <div className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4 ring-1 ring-slate-700/40">
            <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-100">Critical Alerts</div>
                <div className="text-xs text-slate-400">{alerts.length || 0}</div>
            </div>

            {!alerts.length ? (
                <div className="mt-3 text-sm text-slate-400">No critical alerts.</div>
            ) : (
                <div className="mt-3 space-y-3">
                    {alerts.slice(0, 6).map((a) => (
                        <div
                            key={`${a.server_id}-${a.alert_type}-${a.timestamp}`}
                            className="rounded-2xl border border-rose-500/30 bg-slate-950/60 p-3 ring-1 ring-rose-500/10"
                        >
                            <div className="text-sm font-semibold text-slate-100">{a.name}</div>
                            <div className="mt-1 text-xs text-slate-300">
                                {a.alert_type.toUpperCase()} Usage at{" "}
                                <span className="font-semibold text-rose-300 tabular-nums">{a.value.toFixed(1)}%</span>{" "}
                                <span className="text-slate-400">(threshold: {a.threshold}%)</span>
                            </div>
                            <div className="mt-1 text-[11px] text-slate-500">
                                {new Date(a.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
