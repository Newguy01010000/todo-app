const addBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");

function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(task => {
    const text = task.querySelector(".task-text").textContent;
    const completed = task.querySelector(".task-text").classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

function createTaskElement(text, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("task-text");
  if (completed) span.classList.add("completed");

  span.addEventListener("click", function () {
    span.classList.toggle("completed");
    saveTasksToLocalStorage();
    applyFilter();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    taskList.removeChild(li);
    saveTasksToLocalStorage();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

addBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    createTaskElement(taskText);
    taskInput.value = "";
    saveTasksToLocalStorage();
    applyFilter();
  }
});

function applyFilter() {
  const filterValue = filter.value;
  const tasks = taskList.querySelectorAll("li");

  tasks.forEach(function (task) {
    const isCompleted = task.querySelector(".task-text")?.classList.contains("completed");

    if (filterValue === "all") {
      task.style.display = "flex";
    } else if (filterValue === "completed") {
      task.style.display = isCompleted ? "flex" : "none";
    } else if (filterValue === "incomplete") {
      task.style.display = isCompleted ? "none" : "flex";
    }
  });
}

filter.addEventListener("change", applyFilter);

const clearAllBtn = document.getElementById("clearAllBtn");

clearAllBtn.addEventListener("click", function () {
  taskList.innerHTML = ""; // Remove all tasks visually
  localStorage.removeItem("tasks"); // Clear from storage
});

window.addEventListener("DOMContentLoaded", function () {
  loadTasksFromLocalStorage();
  applyFilter();
});