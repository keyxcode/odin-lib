const App = (() => {
  const myPieces = [];
  const cacheDom = () => {};
  const render = () => {
    const entryTable = document.querySelector("#entry-table");
  };
  const init = () => {
    cacheDom();
    render();
  };

  return myPieces, cacheDom, render, init;
})();

App.init();

const myPieces = [];
const entryTable = document.querySelector("#entry-table");

const Piece = (title, composer, pages, learnt) => ({
  title,
  composer,
  pages,
  learnt,
});

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
  const newPiece = Piece(title, composer, pages, learnt);
  myPieces.push(newPiece);
  renderNewPiece(newPiece);
}

addPieceToLib("Sonata", "Beethoven", 5, true);
addPieceToLib("Concerto", "Mozart", 3, false);
