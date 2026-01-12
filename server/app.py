from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from data import SERVERS
from helper import ALERT_THRESHOLD, USAGE_KEYS, find_server, jitter_metrics, now_iso_z, status_from_metrics


app = FastAPI(title="Server Monitoring API", version="1.0.0")

# Allow dev server(s)
ALLOWED_ORIGINS = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Routes
# -----------------------------
@app.get("/")
def root():
    return {"message": "Server Monitoring API", "version": "1.0.0"}

@app.get("/api/servers")
def get_servers():
    """
    Returns all servers with derived status and last_updated.
    Includes metrics to support the list view.
    """
    ts = now_iso_z()
    servers_out = []

    for s in SERVERS:
        # simulate updates
        new_metrics = jitter_metrics(s["metrics"])
        s["metrics"] = new_metrics

        servers_out.append(
            {
                "id": s["id"],
                "name": s["name"],
                "status": status_from_metrics(new_metrics),
                "last_updated": ts,
                "metrics": new_metrics,
            }
        )

    return {"servers": servers_out}


