import type { Alerts, ServerMetrics, Servers } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

async function http<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) {
        let detail = `Request failed (${res.status})`;
        try {
            const body = await res.json();
            if (body?.detail) 
                detail = body.detail;
        } catch (e) {
            console.debug("Failed to parse error body as JSON:", e);
        }
        throw new Error(detail);
    }
    return (await res.json()) as T;
}

export const api = {
    getServers: () => http<Servers>("/api/servers"),
    getAlerts: () => http<Alerts>("/api/servers/alerts"),
    getServerMetrics: (id: string) => http<ServerMetrics>(`/api/servers/${id}/metrics`),
};
