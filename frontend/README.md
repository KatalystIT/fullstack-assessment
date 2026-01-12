# Server Monitoring Dashboard

A client-side dashboard for visualizing server health, system metrics, and alerts in near real time.
The interface is designed to surface critical information quickly while remaining easy to navigate and extend.

---

## Overview

The dashboard provides:
- A searchable list of servers with health status indicators
- Visual summaries of CPU, memory, disk, and network usage
- A dedicated alerts panel for critical conditions
- A detailed server view presented in a modal
- Automatic periodic refresh to simulate real-time monitoring

The layout follows common monitoring patterns, prioritizing clarity and information density without overwhelming the user.

---

## Technology Choices

### React + TypeScript
React was chosen for its predictable component model and ecosystem maturity.
TypeScript is used throughout the application to:
- Enforce strong typing for API responses and UI state
- Catch errors early during development
- Improve maintainability as the application grows

---

### Vite
Vite provides a fast development environment with minimal configuration:
- Instant dev server startup
- Efficient hot module replacement
- Modern build tooling without unnecessary complexity

---

### Tailwind CSS
Tailwind CSS was selected to:
- Build a custom UI without relying on pre-built component libraries
- Iterate quickly on layout, spacing, and visual hierarchy
- Keep styling colocated with component logic

All UI components are implemented manually using utility classes.

---

## Design Approach

- Server cards present high-level health information at a glance
- Status-based filtering and search improve discoverability
- Clicking a server opens a modal with detailed metrics
- Alerts are visually emphasized to draw attention to critical states

The visual style is inspired by modern monitoring dashboards, but the implementation is entirely custom and component-driven.

---

## Real-Time Behavior

The dashboard polls the backend API at a fixed interval to simulate real-time updates.
This approach:
- Keeps the implementation simple and predictable
- Avoids introducing streaming or WebSocket complexity
- Ensures UI state remains consistent during updates

---

## Setup & Running the Application

### Prerequisites
- Node.js 18+
- npm (comes with Node.js)

---

### Installation and running the app

From the project root:

- cd frontend
- npm install
- npm run dev
