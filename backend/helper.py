import datetime
import random
from typing import Literal, Tuple, Dict
from datetime import datetime, timezone
from fastapi import HTTPException
from data import SERVERS

Status = Literal["healthy", "warning", "critical"]

USAGE_KEYS: Tuple[str, ...] = ("cpu_usage", "memory_usage", "disk_usage")
ALERT_THRESHOLD = 90.0

def now_iso_z() -> str:
    """UTC ISO timestamp ending with Z."""
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def clamp(value: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, value))

def jitter_metrics(metrics: Dict[str, float]) -> Dict[str, float]:
    """
    Slightly changes metrics each time to simulate real-time data.
    Keeps values within sensible bounds.
    """
    out = dict(metrics)

    for key, value in out.items():
        if key == "network_io":
            out[key] = round(clamp(value + random.uniform(-250, 250), 0, 10000), 1)
        else:
            out[key] = round(clamp(value + random.uniform(-6, 6), 0, 100), 1)

    return out


def status_from_metrics(metrics: Dict[str, float]) -> Status:
    vals = [metrics[k] for k in USAGE_KEYS]
    if any(v > 90 for v in vals):
        return "critical"
    if any(70 <= v <= 90 for v in vals):
        return "warning"
    return "healthy"


def find_server(server_id: str) -> Dict:
    for s in SERVERS:
        if s["id"] == server_id:
            return s
    raise HTTPException(status_code=404, detail="Server not found")