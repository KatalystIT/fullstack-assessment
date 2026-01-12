export function MetricLine({
    label,
    value,
    color,
}: {
    label: string;
    value: number;
    color: "sky" | "violet" | "amber" | "emerald" | "rose";
}) {
    const pct = Math.max(0, Math.min(100, value));
    const bar =
        color === "sky"
            ? "bg-sky-400"
            : color === "violet"
                ? "bg-violet-400"
                : color === "amber"
                    ? "bg-amber-400"
                    : color === "emerald"
                        ? "bg-emerald-400"
                        : "bg-rose-400";

    return (
        <div>
            <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
                <span>{label}</span>
                <span className="tabular-nums text-slate-200">{pct.toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800/70 ring-1 ring-slate-700/60">
                <div className={`h-2 rounded-full ${bar}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}
