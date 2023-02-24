const myPieces = [];
const entryTable = document.querySelector("#entry-table");

function Piece(title, composer, pages, learnt) {
  this.title = title;
  this.composer = composer;
  this.pages = pages;
  this.learnt = learnt ? "learnt" : "tolearn";
}

Piece.prototype.info = function () {
  return `${this.title} by ${this.composer}, ${this.pages} pages, ${this.learnt}`;
};

function renderNewPiece(piece) {
  const tr = document.createElement("tr");
  Object.entries(piece).forEach(([key, value]) => {
    const td = document.createElement("td");
    td.innerText = value;
    tr.appendChild(td);
  });
  entryTable.appendChild(tr);
}

function addPieceToLib(title, composer, pages, learnt) {
  const newPiece = new Piece(title, composer, pages, learnt);
  myPieces.push(newPiece);
  renderNewPiece(newPiece);
}

addPieceToLib("Sonata", "Beethoven", 5, true);
addPieceToLib("Concerto", "Mozart", 3, false);
