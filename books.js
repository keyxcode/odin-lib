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
  return `${title} by ${author}, ${pages} pages, ${this.read}`;
};

let book1 = new Book("doremon", "fujiko", 100, true);
let book2 = new Book("naruto", "fujiko", 100, false);
