const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

// Verify token
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.send("Access denied");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.send("Invalid token");
  }
};

// Check admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.send("Admin access only");
  }
  next();
};