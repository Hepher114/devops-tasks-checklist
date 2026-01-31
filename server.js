const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory database (for demo purposes)
let tasks = [
  {
    id: 1,
    title: "Build a Dockerfile",
    description: "Learn how to containerize an application using Docker",
    steps: [
      { id: 1, text: "Create a new file named 'Dockerfile'", completed: false },
      { id: 2, text: "Choose a base image (e.g., FROM node:18)", completed: false },
      { id: 3, text: "Set the working directory (WORKDIR /app)", completed: false },
      { id: 4, text: "Copy package files (COPY package*.json ./)", completed: false },
      { id: 5, text: "Install dependencies (RUN npm install)", completed: false },
      { id: 6, text: "Copy application code (COPY . .)", completed: false },
      { id: 7, text: "Expose port (EXPOSE 3000)", completed: false },
      { id: 8, text: "Define start command (CMD [\"npm\", \"start\"])", completed: false },
      { id: 9, text: "Build the image (docker build -t myapp .)", completed: false },
      { id: 10, text: "Run the container (docker run -p 3000:3000 myapp)", completed: false }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Setup CI/CD Pipeline",
    description: "Configure GitHub Actions for automated deployment",
    steps: [
      { id: 1, text: "Create .github/workflows directory", completed: false },
      { id: 2, text: "Create workflow YAML file", completed: false },
      { id: 3, text: "Define trigger events (push, pull_request)", completed: false },
      { id: 4, text: "Setup job environment (runs-on: ubuntu-latest)", completed: false },
      { id: 5, text: "Checkout code (uses: actions/checkout@v3)", completed: false },
      { id: 6, text: "Setup Node.js environment", completed: false },
      { id: 7, text: "Install dependencies", completed: false },
      { id: 8, text: "Run tests", completed: false },
      { id: 9, text: "Build application", completed: false },
      { id: 10, text: "Deploy to production", completed: false }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Deploy to Kubernetes",
    description: "Deploy your containerized app to a Kubernetes cluster",
    steps: [
      { id: 1, text: "Create deployment.yaml file", completed: false },
      { id: 2, text: "Define Pod specification", completed: false },
      { id: 3, text: "Set container image and ports", completed: false },
      { id: 4, text: "Create service.yaml for networking", completed: false },
      { id: 5, text: "Apply deployment (kubectl apply -f deployment.yaml)", completed: false },
      { id: 6, text: "Apply service (kubectl apply -f service.yaml)", completed: false },
      { id: 7, text: "Verify pods are running (kubectl get pods)", completed: false },
      { id: 8, text: "Check service status (kubectl get services)", completed: false },
      { id: 9, text: "Test application endpoint", completed: false },
      { id: 10, text: "Setup horizontal pod autoscaling", completed: false }
    ],
    createdAt: new Date().toISOString()
  }
];

let nextTaskId = 4;
let nextStepId = 11;

// API Routes

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Get single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// Create new task
app.post('/api/tasks', (req, res) => {
  const { title, description, steps } = req.body;
  
  const newTask = {
    id: nextTaskId++,
    title,
    description,
    steps: steps.map((step, index) => ({
      id: nextStepId++,
      text: step,
      completed: false
    })),
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const { title, description } = req.body;
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description
  };
  
  res.json(tasks[taskIndex]);
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted successfully' });
});

// Toggle step completion
app.patch('/api/tasks/:taskId/steps/:stepId', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.taskId));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const step = task.steps.find(s => s.id === parseInt(req.params.stepId));
  if (!step) {
    return res.status(404).json({ error: 'Step not found' });
  }
  
  step.completed = !step.completed;
  res.json(task);
});

// Add step to task
app.post('/api/tasks/:id/steps', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const { text } = req.body;
  const newStep = {
    id: nextStepId++,
    text,
    completed: false
  };
  
  task.steps.push(newStep);
  res.status(201).json(task);
});

// Delete step from task
app.delete('/api/tasks/:taskId/steps/:stepId', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.taskId));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const stepIndex = task.steps.findIndex(s => s.id === parseInt(req.params.stepId));
  if (stepIndex === -1) {
    return res.status(404).json({ error: 'Step not found' });
  }
  
  task.steps.splice(stepIndex, 1);
  res.json(task);
});

// Get statistics
app.get('/api/stats', (req, res) => {
  const totalTasks = tasks.length;
  const totalSteps = tasks.reduce((sum, task) => sum + task.steps.length, 0);
  const completedSteps = tasks.reduce((sum, task) => 
    sum + task.steps.filter(s => s.completed).length, 0
  );
  const completedTasks = tasks.filter(task => 
    task.steps.every(s => s.completed)
  ).length;
  
  res.json({
    totalTasks,
    completedTasks,
    totalSteps,
    completedSteps,
    completionPercentage: totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0
  });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DevOps Checklist Tracker running on http://localhost:${PORT}`);
  console.log(`📋 Track your DevOps learning progress step by step!`);
});
