const Piece = (title, composer, pages, learnt) => ({
  title,
  composer,
  pages,
  learnt,
});

// function addPieceToLib(title, composer, pages, learnt) {
//   const newPiece = Piece(title, composer, pages, learnt);
//   myPieces.push(newPiece);
//   renderNewPiece(newPiece);
// }

const piece1 = Piece("Sonata", "Beethoven", 5, true);
const piece2 = Piece("Concerto", "Mozart", 3, false);

const App = (() => {
  const myPieces = [piece1, piece2];
  const cacheDom = () => {};
  const bindEvents = () => {};
  const render = () => {
    const entryTable = document.querySelector("#entry-table");

    myPieces.forEach((piece) => {
      const tr = document.createElement("tr");
      Object.entries(piece).forEach(([key, value]) => {
        const td = document.createElement("td");
        td.innerText = value;
        tr.appendChild(td);
      });
      entryTable.appendChild(tr);
    });
  };
  const init = () => {
    cacheDom();
    bindEvents();
    render();
  };

  return { myPieces, cacheDom, render, init };
})();

App.init();
