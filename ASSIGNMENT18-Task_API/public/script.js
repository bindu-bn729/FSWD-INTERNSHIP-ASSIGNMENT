async function loadTasks() {
  const res = await fetch("/tasks");
  const data = await res.json();

  let output = "";

  data.forEach(task => {
    output += `
      <div class="task">
        ${task.title}
        <br>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
  });

  document.getElementById("taskList").innerHTML = output;
}

async function addTask() {
  const title = document.getElementById("taskInput").value;

  await fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });

  loadTasks();
}

async function deleteTask(id) {
  await fetch(`/tasks/${id}`, {
    method: "DELETE"
  });

  loadTasks();
}

// Load tasks when page opens
loadTasks();