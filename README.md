# devops-app-checklist
<img width="1517" height="1136" alt="Screenshot 2026-01-31 at 2 11 38 PM" src="https://github.com/user-attachments/assets/0e1e7ee7-991a-45fb-af0e-f80ad3ade061" />


A Node.js web app to track your DevOps learning journey step by step. Create tasks, break them into steps, and check them off as you complete them.

## Getting Started

```bash
git https://github.com/Hepher114/devops-tasks-checklist.git
cd devops-checklist
npm install
npm start
```

Open http://localhost:3000

## Project Structure

```
devops-checklist/
├── server.js           # Backend API (Express.js)
├── package.json        # Dependencies
├── public/
│   └── index.html      # Frontend
└── README.md
```

## How It Works

The frontend calls the backend API using JavaScript `fetch()`. When you click a checkbox, it sends a request to the backend, which updates the data and returns the result. The frontend then re-renders the page.

## Features

- Create and manage DevOps tasks with steps
- Check off steps and track progress visually
- Real-time statistics dashboard
- Comes with 3 pre-loaded tasks (Dockerfile, CI/CD, Kubernetes)

## Tech Stack

- Node.js + Express.js (Backend)
- HTML / CSS / JavaScript (Frontend)
- In-memory storage (resets on restart)

