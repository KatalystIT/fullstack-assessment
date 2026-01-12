export type ServerStatus = "healthy" | "warning" | "critical";

export interface Metrics {
    cpu_usage: number;
    memory_usage: number;
    disk_usage: number;
    network_io: number;
}

export interface ServerListItem {
    id: string;
    name: string;
    status: ServerStatus;
    last_updated: string;
    metrics: Metrics; 
}

export interface Servers {
    servers: ServerListItem[];
}

export interface ServerMetrics {
    server_id: string;
    name: string;
    metrics: Metrics;
    status: ServerStatus;
    timestamp: string;
}

export interface AlertItem {
    server_id: string;
    name: string;
    alert_type: string; 
    value: number;
    threshold: number;
    timestamp: string;
}

export interface Alerts {
    alerts: AlertItem[];
}
