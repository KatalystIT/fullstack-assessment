import type { ServerListItem } from "../types";
import { StatusPill } from "./StatusPill";

function metricColor(v: number) {
    if (v > 90) return "text-rose-300";
    if (v >= 70) return "text-amber-300";
    return "text-slate-200";
}

export function ServerCard({
    server,
    selected,
    onClick,
}: {
    server: ServerListItem;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={[
                "w-full text-left rounded-2xl border bg-slate-900/40 p-4",
                "ring-1 ring-slate-700/50 shadow-sm transition",
                "hover:bg-slate-900/60 hover:ring-slate-600/60",
                selected ? "border-sky-500/50 ring-sky-500/40" : "border-slate-800/60",
            ].join(" ")}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-100">{server.name}</div>
                    <div className="mt-0.5 text-xs text-slate-400">Server</div>
                </div>
                <StatusPill status={server.status} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <div className="text-slate-400">
                    CPU{" "}
                    <span className={`ml-2 font-semibold tabular-nums ${metricColor(server.metrics.cpu_usage)}`}>
                        {server.metrics.cpu_usage.toFixed(1)}%
                    </span>
                </div>
                <div className="text-slate-400">
                    Memory{" "}
                    <span className={`ml-2 font-semibold tabular-nums ${metricColor(server.metrics.memory_usage)}`}>
                        {server.metrics.memory_usage.toFixed(1)}%
                    </span>
                </div>
                <div className="text-slate-400">
                    Disk{" "}
                    <span className={`ml-2 font-semibold tabular-nums ${metricColor(server.metrics.disk_usage)}`}>
                        {server.metrics.disk_usage.toFixed(1)}%
                    </span>
                </div>
            </div>
        </button>
    );
}
