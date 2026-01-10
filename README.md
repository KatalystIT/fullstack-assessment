# Katalyst IT/ Katalux - Full-Stack Engineer Assessment

## 🎯 Challenge Overview

Build a **Server Monitoring Dashboard** that displays real-time health metrics for a fleet of servers. This assignment is designed to assess your full-stack capabilities with React and Python.

**Time Estimate:** 2-4 hours (Don't spend more than 6 hours)

---

## 📋 Requirements

### **Backend (Python)**

Build a REST API with the following endpoints:

#### **Required Endpoints:**

1. **GET /api/servers**
   - Returns a list of all servers with their current status
   - Response format:
   ```json
   {
     "servers": [
       {
         "id": "server-1",
         "name": "web-server-01",
         "status": "healthy",
         "last_updated": "2024-01-10T10:30:00Z"
       }
     ]
   }
   ```

2. **GET /api/servers/{server_id}/metrics**
   - Returns detailed metrics for a specific server
   - Response format:
   ```json
   {
     "server_id": "server-1",
     "name": "web-server-01",
     "metrics": {
       "cpu_usage": 45.2,
       "memory_usage": 68.5,
       "disk_usage": 52.1,
       "network_io": 1024.5
     },
     "status": "healthy",
     "timestamp": "2024-01-10T10:30:00Z"
   }
   ```

3. **GET /api/servers/alerts**
   - Returns servers with critical status (any metric > 90%)
   - Response format:
   ```json
   {
     "alerts": [
       {
         "server_id": "server-3",
         "name": "db-server-02",
         "alert_type": "cpu",
         "value": 95.3,
         "threshold": 90,
         "timestamp": "2024-01-10T10:30:00Z"
       }
     ]
   }
   ```

#### **Backend Requirements:**
- ✅ Use **Python** (Flask or FastAPI recommended)
- ✅ Use **mock data** or in-memory storage (no database required, but bonus points for using SQLite/PostgreSQL)
- ✅ Include at least **5 servers** with realistic metrics
- ✅ Implement proper **error handling** and HTTP status codes
- ✅ Include **input validation** where appropriate
- ✅ Add basic **API documentation** (OpenAPI/Swagger is a bonus)

---

### **Frontend (React)**

Build a dashboard interface with the following features:

#### **Required Features:**

1. **Server List View**
   - Display all servers in a grid or list
   - Show: server name, status (color-coded), key metrics
   - Status colors:
     - 🟢 Green: healthy (all metrics < 70%)
     - 🟡 Yellow: warning (any metric 70-90%)
     - 🔴 Red: critical (any metric > 90%)

2. **Server Detail View**
   - Click a server to view detailed metrics
   - Display all metrics with visual indicators (progress bars, charts, etc.)
   - Show last updated timestamp

3. **Filter & Search**
   - Filter servers by status (All/Healthy/Warning/Critical)
   - Search servers by name

4. **Alerts Section**
   - Display critical alerts prominently
   - Show which metric triggered the alert

#### **Frontend Requirements:**
- ✅ Use **React** (TypeScript is a bonus)
- ✅ Implement **responsive design** (mobile-friendly)
- ✅ Use **modern React patterns** (hooks, functional components)
- ✅ Handle **loading states** and **errors** gracefully
- ✅ Clean, intuitive **UI/UX** (styling framework of your choice: Tailwind, Material-UI, CSS, etc.)
- ✅ **No** boilerplate UI copying - we want to see your design thinking

---

## 🎁 Bonus Points (Optional)

Implement any of these for extra credit:

- 🌟 **Auto-refresh**: Dashboard updates every 10 seconds
- 🌟 **Charts**: Visualize metrics with charts (Chart.js, Recharts, etc.)
- 🌟 **Sorting**: Sort servers by name, status, or metric values
- 🌟 **Database**: Use SQLite or PostgreSQL instead of in-memory data
- 🌟 **WebSocket**: Real-time updates via WebSocket
- 🌟 **Tests**: Unit tests for backend or frontend
- 🌟 **Docker**: Include Dockerfile(s) for easy setup
- 🌟 **TypeScript**: Use TypeScript for type safety
- 🌟 **Dark Mode**: Toggle between light/dark themes

---

## 📁 Suggested Project Structure

```
katalyst-assessment/
├── backend/
│   ├── app.py              # Main Flask/FastAPI app
│   ├── models.py           # Data models (optional)
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Backend setup instructions
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main app component
│   │   └── index.jsx       # Entry point
│   ├── package.json        # Node dependencies
│   └── README.md           # Frontend setup instructions
└── README.md               # This file + your setup instructions
```

---

## 🚀 Getting Started

### **Option 1: Start from Scratch**
Create your own project structure using your preferred tools.

### **Option 2: Use This Structure**
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install flask flask-cors  # or: pip install fastapi uvicorn
python app.py

# Frontend (in a new terminal)
cd frontend
npx create-react-app .  # or: npm create vite@latest . -- --template react
npm install
npm start
```

---

## 📤 Submission Requirements

When you're ready to submit, please provide:

### **1. GitHub Repository**
- Make your repository **public** or add `katalyst-it` as a collaborator
- Include a clear **README.md** with:
  - Setup instructions (how to run your code)
  - Any assumptions you made
  - Technologies/libraries you chose and why
  - What you would improve with more time

### **2. Running Instructions**
Your README should allow us to run your project with minimal setup:
```bash
# Backend
cd backend
pip install -r requirements.txt
python app.py

# Frontend
cd frontend
npm install
npm start
```

### **3. Submit Via Form**
Complete the submission form with:
- Your GitHub repository URL
- Brief notes on your approach
- Time spent
- Any challenges you faced

**Submission Form:** [Will be provided in email]

---

## ⏰ Timeline

- **Due Date:** 12 01 2026
- **Estimated Time:** 2-4 hours
- **Don't exceed:** 6 hours

If you're running over 4 hours, wrap up what you have and document what you'd do with more time. We value time management and prioritization.

---

## 🎯 What We're Evaluating

| Category | Weight | What We Look For |
|----------|--------|------------------|
| **Functionality** | 30% | Does it work as specified? |
| **Code Quality** | 30% | Is code clean, readable, well-organized? |
| **UI/UX** | 20% | Is the interface intuitive and polished? |
| **Problem Solving** | 10% | How did you handle challenges? |
| **Documentation** | 10% | Are instructions clear and complete? |

---

## 💡 Mock Data Guidance

Your API should return realistic data for at least 5 servers. Here's an example structure:

```python
# Example mock data structure
SERVERS = [
    {
        "id": "server-1",
        "name": "web-server-01",
        "type": "web",
        "metrics": {
            "cpu_usage": 45.2,
            "memory_usage": 68.5,
            "disk_usage": 52.1,
            "network_io": 1024.5
        },
        "status": "healthy"  # Calculated based on metrics
    },
    {
        "id": "server-2",
        "name": "api-server-01",
        "type": "api",
        "metrics": {
            "cpu_usage": 72.8,
            "memory_usage": 81.3,
            "disk_usage": 45.6,
            "network_io": 2048.7
        },
        "status": "warning"
    },
    {
        "id": "server-3",
        "name": "db-server-01",
        "type": "database",
        "metrics": {
            "cpu_usage": 91.5,
            "memory_usage": 88.2,
            "disk_usage": 95.3,
            "network_io": 3072.1
        },
        "status": "critical"
    }
    # Add at least 2 more servers
]
```

**Status Calculation Logic:**
- `healthy`: All metrics < 70%
- `warning`: Any metric between 70-90%
- `critical`: Any metric > 90%

---

## ❓ Questions?

If anything is unclear, feel free to:
- Make reasonable assumptions (document them in your README)
- Email: kamando@katalystit.com

We're looking for engineers who can make good decisions with incomplete information!

---

## 🤝 Final Notes

- **Be yourself**: We want to see your coding style and decision-making
- **Quality over quantity**: A well-implemented core is better than half-finished bonus features
- **Think production**: Consider error handling, edge cases, and user experience
- **Document your thinking**: Your README should explain your technical choices
- **Have fun**: This should be an enjoyable challenge!

---

## 📝 Example README Structure

Your submission README should include:

```markdown
# Server Monitoring Dashboard

## Setup Instructions

### Backend
1. cd backend
2. pip install -r requirements.txt
3. python app.py
4. API runs on http://localhost:8000

### Frontend
1. cd frontend
2. npm install
3. npm start
4. App runs on http://localhost:3000

## Technology Choices

- **Backend**: [Flask/FastAPI] - [Why you chose it]
- **Frontend**: [React/Next.js] - [Why you chose it]
- **Styling**: [CSS/Tailwind/Material-UI] - [Why you chose it]

## Key Decisions

[Explain 2-3 important technical decisions you made]

## Assumptions

- [Any assumptions you made about requirements]
- [How you interpreted ambiguous parts]

## What I Would Improve With More Time

- [Feature 1]
- [Feature 2]
- [Technical improvement]

## Time Spent

Approximately [X] hours

## Challenges

[Any challenges you faced and how you solved them]
```

---

## 🔒 Confidentiality

This assessment is confidential. Please do not:
- Share it publicly
- Post it on your portfolio (without removing Katalyst branding)
- Share with other candidates

You may include the code in your private portfolio after the hiring process concludes.

---

Good luck! We're excited to see what you build. 🚀

**- Katalyst IT Team**
