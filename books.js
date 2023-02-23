const myLib = [];
const entryTable = document.querySelector("#entry-table");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read ? "done" : "todo";
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

function renderNewBook(book) {
  const tr = document.createElement("tr");
  Object.entries(book).forEach(([key, value]) => {
    const td = document.createElement("td");
    td.innerText = value;
    tr.appendChild(td);
  });
  entryTable.appendChild(tr);
}

function addBookToLib(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLib.push(book);
  renderNewBook(book);
}

addBookToLib("Sonata", "Beethoven", 5, true);
addBookToLib("Concerto", "Mozart", 3, false);
