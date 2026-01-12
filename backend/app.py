from fastapi import FastAPI, Path, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

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
@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


@app.get("/",status_code=200)
def root():
    return {"message": "Server Monitoring API", "version": "1.0.0"}

@app.get("/api/servers", status_code=200)
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




@app.get("/api/servers/{server_id}/metrics", status_code=200)
def get_server_metrics(server_id: str= Path(..., pattern=r"^server-\d+$")):
    """
    Returns detailed metrics for one server, plus derived status.
    """
    s = find_server(server_id)

    # simulate updates for this server
    new_metrics = jitter_metrics(s["metrics"])
    s["metrics"] = new_metrics

    return {
        "server_id": s["id"],
        "name": s["name"],
        "metrics": new_metrics,
        "status": status_from_metrics(new_metrics),
        "timestamp": now_iso_z(),
    }


@app.get("/api/servers/alerts", status_code=200)
def get_alerts():
    """
    Returns servers with critical status (any usage metric > 90%).
    One alert per metric that breaches threshold.
    """
    ts = now_iso_z()
    alerts_out = []

    for s in SERVERS:
        m = s["metrics"]
        for key in USAGE_KEYS:
            value = m[key]
            if value > ALERT_THRESHOLD:
                alerts_out.append(
                    {
                        "server_id": s["id"],
                        "name": s["name"],
                        "alert_type": key.replace("_usage", ""),
                        "value": value,
                        "threshold": ALERT_THRESHOLD,
                        "timestamp": ts,
                    }
                )

    return {"alerts": alerts_out}
