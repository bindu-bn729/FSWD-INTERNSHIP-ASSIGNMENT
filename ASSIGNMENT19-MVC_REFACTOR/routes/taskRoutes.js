const express = require("express");
const router = express.Router();

const {
  getTasks,
  addTask,
  deleteTask
} = require("../controllers/taskController");

router.get("/tasks", getTasks);
router.post("/tasks", addTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;