from typing import List, Dict

# -----------------------------
# Mock data (in-memory)
# -----------------------------
SERVERS: List[Dict] = [
    {
        "id": "server-1",
        "name": "web-server-01",
        "type": "web",
        "metrics": {"cpu_usage": 45.2, "memory_usage": 68.5, "disk_usage": 52.1, "network_io": 1024.5},
    },
    {
        "id": "server-2",
        "name": "api-server-01",
        "type": "api",
        "metrics": {"cpu_usage": 72.8, "memory_usage": 81.3, "disk_usage": 45.6, "network_io": 2048.7},
    },
    {
        "id": "server-3",
        "name": "db-server-01",
        "type": "database",
        "metrics": {"cpu_usage": 91.5, "memory_usage": 88.2, "disk_usage": 95.3, "network_io": 3072.1},
    },
    {
        "id": "server-4",
        "name": "cache-server-01",
        "type": "cache",
        "metrics": {"cpu_usage": 34.1, "memory_usage": 55.0, "disk_usage": 21.4, "network_io": 512.2},
    },
    {
        "id": "server-5",
        "name": "worker-01",
        "type": "worker",
        "metrics": {"cpu_usage": 66.3, "memory_usage": 73.4, "disk_usage": 62.0, "network_io": 980.0},
    },
        {
        "id": "server-6",
        "name": "api-server-02",
        "type": "worker",
        "metrics": {"cpu_usage": 55.3, "memory_usage": 65.4, "disk_usage": 62.0, "network_io": 2103.0},
    },
]