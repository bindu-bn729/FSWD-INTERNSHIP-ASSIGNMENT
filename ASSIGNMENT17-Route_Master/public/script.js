async function loadBooks() {

  const res = await fetch("/books");
  const data = await res.json();

  let output = "";

  data.forEach(book => {
    output += `<p><b>${book.title}</b><br>${book.author}</p>`;
  });

  document.getElementById("books").innerHTML = output;
}

async function loadAuthors() {

  const res = await fetch("/authors");
  const data = await res.json();

  let output = "";

  data.forEach(author => {
    output += `<p>${author.name}</p>`;
  });

  document.getElementById("authors").innerHTML = output;
}