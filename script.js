// Variables
let tasks = [];
let points = 0;
let leaderboard = [];

// DOM Elements
const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('addTask');
const tasksList = document.getElementById('tasks');
const pointsDisplay = document.getElementById('points');
const leaderboardList = document.getElementById('leaderboard');

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
      } else {
        points -= 10; // Deduct points for undoing a task
      }
      updatePoints();
      renderTasks();
    });

    li.appendChild(completeButton);
    tasksList.appendChild(li);
  });
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

// Initial Render
renderTasks();
updatePoints();