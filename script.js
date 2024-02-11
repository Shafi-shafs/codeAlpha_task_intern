document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.getElementById("addTask");
  const taskInput = document.getElementById("taskInput");
  const taskTime = document.getElementById("taskTime");
  const taskList = document.getElementById("taskList");

  addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    const timeValue = taskTime.value;
    if (taskText !== "") {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.innerHTML = `
                <span>${taskText}</span>
                <span class="badge bg-primary rounded-pill ms-5">${timeValue}</span>
                <button class="btn btn-danger delete-btn">Delete</button>
            `;
      taskList.appendChild(listItem);
      taskInput.value = "";
      taskTime.value = "";
    }
  });

  taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      event.target.parentNode.remove();
    }
  });
});

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;
  document.getElementById("clock").textContent = timeString;
}
setInterval(updateTime, 1000);
updateTime();
