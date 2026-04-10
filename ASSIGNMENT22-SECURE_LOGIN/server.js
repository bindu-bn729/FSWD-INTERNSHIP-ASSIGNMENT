const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/userModel");

const app = express();
app.use(express.json());

// Secret key
const SECRET = "mysecretkey";

// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/authDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// 🔐 SIGNUP
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword
  });

  await user.save();

  res.send("User registered successfully");
});


// 🔑 LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.send("User not found");
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.send("Invalid password");
  }

  // generate token
  const token = jwt.sign({ id: user._id }, SECRET);

  res.json({ message: "Login successful", token });
});


// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});