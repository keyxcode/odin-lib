const Piece = (title, composer, pages, learnt) => ({
  title,
  composer,
  pages,
  learnt,
});

const piece1 = Piece("Sonata", "Beethoven", 5, true);
const piece2 = Piece("Concerto", "Mozart", 3, false);

const App = (() => {
  const myPieces = [piece1, piece2];
  const addButton = document.querySelector("#add");

  const render = () => {
    const tableBody = document.querySelector("#table-body");
    tableBody.replaceChildren(); // without any arg, this removes all children
    myPieces.forEach((piece) => {
      const tr = document.createElement("tr");
      Object.entries(piece).forEach(([key, value]) => {
        tr.dataset.id = key;
        const td = document.createElement("td");
        td.innerText = value;
        tr.appendChild(td);
      });
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Del";
      tr.appendChild(deleteButton);
      tableBody.appendChild(tr);
    });
  };
  const addPiece = (title, composer, pages, learnt) => {
    const piece = Piece(title, composer, pages, learnt);
    myPieces.push(piece);
    render();
  };
  const bindEvents = () => {
    addButton.addEventListener("click", () => {
      addPiece("a", "b", 1, true);
    });
  };
  const init = () => {
    bindEvents();
    render();
  };

  return { myPieces, init, addPiece };
})();

App.init();
