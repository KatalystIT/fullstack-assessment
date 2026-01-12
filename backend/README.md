# Server Monitoring API

This service exposes a simple REST API for monitoring server health, metrics, and alerts.
It is designed to be lightweight, easy to reason about, and straightforward to extend.

---

## Overview

The API provides:
- A list of servers with current health status
- Detailed metrics for individual servers
- Alerts when metrics exceed defined thresholds

The service focuses on **clarity and correctness** rather than persistence or advanced infrastructure.

---

## Technology Choices

### FastAPI
FastAPI was selected for the backend because it:
- Encourages explicit, type-safe API design
- Provides automatic OpenAPI documentation
- Makes error handling and validation predictable
- Keeps boilerplate minimal while remaining production-ready

These characteristics make it well suited for building well-documented APIs quickly without sacrificing structure.

---

## Data Model & Storage

Server data is stored **in memory** using a small mock dataset.

This choice was intentional:
- Persistence is not required to demonstrate API behavior
- In-memory data keeps the implementation simple and transparent
- It allows the API to focus on response shape, validation, and error handling

The current design allows the data layer to be replaced with a database with minimal changes.

---

## Metrics & Alerts

- Metrics include CPU, memory, disk usage, and network I/O
- Server health status is derived dynamically from metric values
- Alerts are generated when usage thresholds are exceeded

This keeps business logic centralized and avoids duplicating rules across endpoints.

---

## API Endpoints

| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/api/servers` | List servers with current status and metrics |
| GET | `/api/servers/{server_id}/metrics` | Detailed metrics for a single server |
| GET | `/api/servers/alerts` | Active alerts based on thresholds |

---

## API Documentation

Interactive API documentation is available via OpenAPI:

- Swagger UI: `http://127.0.0.1:8000/docs`
- OpenAPI JSON: `http://127.0.0.1:8000/openapi.json`

---

## Error Handling

The API uses standard HTTP semantics:
- `404` when a server does not exist
- `422` for invalid request parameters
- `500` for unexpected internal errors

Errors are returned in a consistent JSON format.

---

## Running the Service

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
