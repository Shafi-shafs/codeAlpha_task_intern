document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.getElementById("addTask");
  const taskInput = document.getElementById("taskInput");
  const taskTime = document.getElementById("taskTime");
  const taskList = document.getElementById("taskList");

  // Load tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    renderTask(task.text, task.time);
  });

  addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    const timeValue = taskTime.value;
    if (taskText !== "") {
      renderTask(taskText, timeValue);
      // Save tasks to localStorage
      tasks.push({ text: taskText, time: timeValue });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskInput.value = "";
      taskTime.value = "";
    }
  });

  taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      const taskText = event.target.parentNode.querySelector('span:first-child').textContent;
      // Remove task from tasks array
      const index = tasks.findIndex(task => task.text === taskText);
      if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
      event.target.parentNode.remove();
    }
  });

  function renderTask(taskText, timeValue) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `
      <span>${taskText}</span>
      <span class="badge bg-primary rounded-pill ms-5">${timeValue}</span>
      <button class="btn btn-danger delete-btn">Delete</button>
    `;
    taskList.appendChild(listItem);
  }

});
