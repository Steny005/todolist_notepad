const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const prioritySelect = document.getElementById("priority");
const dateEl = document.getElementById("date");
const themeBtn = document.getElementById("themeToggle");
const notepad = document.querySelector(".notepad");

// 📅 Date on top
dateEl.textContent = new Date().toDateString();

// ➕ Add Task
input.addEventListener("keypress", e => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    addTask(input.value, prioritySelect.value);
    input.value = "";
  }
});

function addTask(text, priority) {
  const li = document.createElement("li");

  li.innerHTML = `
    <div style="display:flex; align-items:center;">
      <span class="priority ${priority}"></span>
      <span>${text}</span>
    </div>
    <button>❌</button>
  `;

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  li.querySelector("button").addEventListener("click", e => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  list.appendChild(li);
  saveTasks();
}

// 💾 Local Storage
function saveTasks() {
  localStorage.setItem("tasks", list.innerHTML);
}

function loadTasks() {
  list.innerHTML = localStorage.getItem("tasks") || "";
}
loadTasks();

// 🌙 Dark Mode
themeBtn.addEventListener("click", () => {
  notepad.classList.toggle("dark");
});

// 🧹 Clear All
function clearAll() {
  if (confirm("Clear all notes?")) {
    list.innerHTML = "";
    saveTasks();
  }
}
