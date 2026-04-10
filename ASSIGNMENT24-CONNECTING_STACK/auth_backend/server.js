const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "mysecretkey";

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/auth_DB")
  .then(() => console.log("MongoDB Connected"));

// Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);


// 🔐 SIGNUP
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hashed });
  await user.save();

  res.send("User registered");
});


// 🔑 LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.send("User not found");

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.send("Wrong password");

  const token = jwt.sign({ id: user._id }, SECRET);

  res.json({ token });
});


app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});