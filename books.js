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
  const formContainer = document.querySelector("#form-container");
  const pieceForm = document.querySelector("#piece-form");
  const formTitle = document.querySelector("#title");
  const formComposer = document.querySelector("#composer");
  const formPages = document.querySelector("#pages");
  const formLearnt = document.querySelector("#learnt");

  const render = () => {
    // without any arg, replaceChildren() removes all children
    tableBody.replaceChildren();
    let index = 0;

    myPieces.forEach((piece) => {
      const tr = tableBody.insertRow();
      tr.dataset.id = index;
      index += 1;
      Object.entries(piece).forEach(([key, value]) => {
        const cell = tr.insertCell();
        cell.innerHTML = value;
      });

      const editCell = tr.insertCell();
      editCell.innerHTML = `<button class="edit">Edit</button>`;
      const delCell = tr.insertCell();
      delCell.innerHTML = `<button class="del">Del</button>`;

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
  const showForm = (id) => {
    formContainer.style.display = "flex";
    if (id) {
      const pieceToEdit = myPieces[id];
      formTitle.value = pieceToEdit.title;
      formComposer.value = pieceToEdit.composer;
      formPages.value = pieceToEdit.pages;
      formLearnt.checked = pieceToEdit.learnt;
    }
  };
  const hideForm = () => {
    formContainer.style.display = "none";
  };
  const clearForm = () => {
    formTitle.value = "";
    formComposer.value = "";
    formPages.value = "";
    formLearnt.value = false;
  };
  const editPiece = (id) => {
    showForm(id);
  };
  render();

  // bind Events
  addButton.addEventListener("click", () => {
    showForm();
  });
  tableBody.addEventListener("click", (e) => {
    const pieceID = e.target.parentNode.parentNode.dataset.id;
    if (e.target.classList.contains("del")) {
      deletePiece(pieceID);
    } else if (e.target.classList.contains("edit")) {
      editPiece(pieceID);
    }
  });
  pieceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = formTitle.value;
    const composer = formComposer.value;
    const pages = formPages.value;
    const learnt = formLearnt.checked;
    addPiece(title, composer, pages, learnt);
    clearForm();
    hideForm();
  });
  window.addEventListener("click", (e) => {
    if (e.target === formContainer) {
      hideForm();
    }
  });

  return { myPieces, addPiece, deletePiece };
})();
