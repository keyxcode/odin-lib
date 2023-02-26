const Piece = (title, composer, pages, learnt) => ({
  title,
  composer,
  pages,
  learnt,
});

// Demo pieces
const piece1 = Piece("Sonata", "Beethoven", 5, true);
const piece2 = Piece("Concerto", "Mozart", 3, false);

const App = (() => {
  const myPieces = [piece1, piece2];

  // cache DOM
  const addButton = document.querySelector("#add");
  const tableBody = document.querySelector("#table-body");

  const render = () => {
    // without any arg, replaceChildren() removes all children
    tableBody.replaceChildren();
    let index = 0;
    myPieces.forEach((piece) => {
      const tr = document.createElement("tr");
      tr.dataset.id = index;
      index += 1;
      Object.entries(piece).forEach(([key, value]) => {
        const td = document.createElement("td");
        td.innerText = value;
        tr.appendChild(td);
      });
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Del";
      deleteButton.classList.add("del");
      tr.appendChild(deleteButton);
      tableBody.appendChild(tr);
    });
  };
  const addPiece = (title, composer, pages, learnt) => {
    const piece = Piece(title, composer, pages, learnt);
    myPieces.push(piece);
    render();
  };
  const deletePiece = (id) => {
    myPieces.splice(id, 1);
    render();
  };

  render();

  // bind Events
  addButton.addEventListener("click", () => {
    addPiece("a", "b", 1, true);
  });
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
      deletePiece(e.target.parentNode.dataset.id);
    }
  });

  return { myPieces, addPiece, deletePiece };
})();
