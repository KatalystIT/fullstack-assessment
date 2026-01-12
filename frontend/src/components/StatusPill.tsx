import type { ServerStatus } from "../types";

const pill: Record<ServerStatus, string> = {
    healthy: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    critical: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
};

const dot: Record<ServerStatus, string> = {
    healthy: "bg-emerald-400",
    warning: "bg-amber-400",
    critical: "bg-rose-400",
};

export function StatusPill({ status }: { status: ServerStatus }) {
    return (
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${pill[status]}`}>
            <span className={`h-2 w-2 rounded-full ${dot[status]}`} />
            {status[0].toUpperCase() + status.slice(1)}
        </span>
    );
}
