const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/myDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// 🔹 CREATE
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});


// 🔹 READ ALL
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});


// 🔹 READ ONE
app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});


// 🔹 UPDATE
app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(user);
});


// 🔹 DELETE
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("User deleted");
});


// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});