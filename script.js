// Variables
let tasks = [];
let points = 0;
let leaderboard = [];
let timer;
let timeLeft = 1500; // 25 minutes in seconds

// DOM Elements
const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('addTask');
const tasksList = document.getElementById('tasks');
const pointsDisplay = document.getElementById('points');
const leaderboardList = document.getElementById('leaderboard');
const themeToggle = document.getElementById('theme-toggle');
const progressFill = document.getElementById('progress');
const progressText = document.getElementById('progress-text');
const quoteText = document.getElementById('quote-text');

// Quotes
const quotes = [
  "The future belongs to those who believe in the beauty of their dreams.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Believe you can and you’re halfway there.",
];

// Add Task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

// Render Tasks
function renderTasks() {
  tasksList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add('completed');
    }

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      if (tasks[index].completed) {
        points += 10; // Award points for completing a task
        celebrate();
      } else {
        points -= 10; // Deduct points for undoing a task
      }
      updatePoints();
      renderTasks();
    });

    li.appendChild(completeButton);
    tasksList.appendChild(li);
  });
  updateProgress();
}

// Update Points
function updatePoints() {
  pointsDisplay.textContent = points;
  updateLeaderboard();
}

// Update Leaderboard
function updateLeaderboard() {
  leaderboard = [{ name: 'You', points: points }]; // Example: Add more users dynamically
  leaderboard.sort((a, b) => b.points - a.points);

  leaderboardList.innerHTML = '';
  leaderboard.forEach((user, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${user.name}: ${user.points} points`;
    leaderboardList.appendChild(li);
  });
}

// Update Progress
function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  progressFill.style.width = `${progress}%`;
  progressText.textContent = `${Math.round(progress)}%`;
}

// Confetti Effect
function celebrate() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Dark Mode Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Pomodoro Timer
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('time').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimer();
    } else {
      clearInterval(timer);
      alert('Time’s up! Take a break.');
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 1500;
  updateTimer();
}

document.getElementById('start-timer').addEventListener('click', startTimer);
document.getElementById('reset-timer').addEventListener('click', resetTimer);

// Motivational Quote
function displayRandomQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = `"${randomQuote}"`;
}

// Initial Render
renderTasks();
updatePoints();
displayRandomQuote();
