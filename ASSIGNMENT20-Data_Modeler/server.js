const mongoose = require("mongoose");

// Import models
const User = require("./models/userModel");

// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Create sample user
const createUser = async () => {
  const user = new User({
    name: "Bindu",
    email: "bindu@gmail.com",
    password: "123456"
  });

  await user.save();
  console.log("User saved:", user);
};

createUser();