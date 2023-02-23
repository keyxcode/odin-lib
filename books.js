const myLib = [];

const bookList = document.querySelector("#book-list");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read ? "read" : "not read yet";

  //   this.info = function () {
  //     return `${title} by ${author}, ${pages} pages, ${this.read}`;
  //   };
}

// Book.prototype.info = function () {
//   return `${title} by ${author}, ${pages} pages, ${this.read}`;
// };

function render(book) {
  const node = document.createElement("li");
  node.innerText = Object.values(book);
  bookList.appendChild(node);
}

function addBookToLib(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  render(book);
}

// const book1 = new Book("doremon", "fujiko", 100, true);
// const book2 = new Book("naruto", "fujiko", 100, false);
