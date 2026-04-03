let tasks = require("../models/taskModel");

// Get all tasks
exports.getTasks = (req, res) => {
  res.json(tasks);
};

// Add task
exports.addTask = (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.send("Task added");
};

// Delete task
exports.deleteTask = (req, res) => {
  const index = req.params.id;
  tasks.splice(index, 1);
  res.send("Task deleted");
};