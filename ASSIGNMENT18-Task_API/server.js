const express = require("express");
const app = express();

// Middleware
app.use(express.json());
app.use(express.static("public"));  

// Home route
app.get("/", (req, res) => {
  res.send("Task API is running 🚀");
});

// Routes
app.get("/tasks", (req, res) => {
  res.json([{ id: 1, title: "Sample Task" }]);
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});