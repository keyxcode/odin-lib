let myLib;
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

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

function render(book) {
  const node = document.createElement("li");
  node.innerText = book.info();
  bookList.appendChild(node);
}

function addBookToLib(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLib.push(book);
  render(book);
}

const demoBook1 = new Book("Sonata", "Beethoven", 5, true);
const demoBook2 = new Book("Concerto", "Mozart", 3, false);
myLib = [demoBook1, demoBook2];
