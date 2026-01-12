from typing import Literal, Tuple


Status = Literal["healthy", "warning", "critical"]

USAGE_KEYS: Tuple[str, ...] = ("cpu_usage", "memory_usage", "disk_usage")
ALERT_THRESHOLD = 90.0