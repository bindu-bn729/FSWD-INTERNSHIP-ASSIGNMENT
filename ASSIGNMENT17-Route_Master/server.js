const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

// Data
const books = [
  { id: 1, title: "JavaScript Basics", author: "John Doe" },
  { id: 2, title: "React Guide", author: "Jane Smith" }
];

const authors = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" }
];

// Routes
app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/authors", (req, res) => {
  res.json(authors);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});