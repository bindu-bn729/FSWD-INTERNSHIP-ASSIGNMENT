const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/userModel");
const { verifyToken, isAdmin } = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(express.static("public"));
const SECRET = "mysecretkey";

// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/authDB")
  .then(() => console.log("MongoDB Connected"));


// 🔐 SIGNUP
app.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    role
  });

  await user.save();

  res.send("User registered");
});


// 🔑 LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.send("Wrong password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    SECRET
  );

  res.json({ token });
});


// 🔒 PROTECTED ROUTE (all users)
app.get("/profile", verifyToken, (req, res) => {
  res.send("Welcome user, your ID: " + req.user.id);
});


// 🔒 ADMIN ONLY ROUTE
app.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.send("Welcome Admin 🎉");
});


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});