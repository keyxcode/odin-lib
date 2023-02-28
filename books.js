const EventManager = (() => {
  // the events object contains pairs of: event - [list of corresponding callbacks]
  const events = {};

  const publish = (event, arg) => {
    if (!events[event]) return;

    events[event].forEach((callBack) => {
      callBack(arg);
    });
  };
  const subscribe = (event, callBack) => {
    events[event] = events[event] === undefined ? [] : events[event];
    events[event].push(callBack);
  };
  const unsubscribe = (event, callBack) => {
    if (!events[event]) return;

    const callBacks = events[event];
    const callBackID = callBacks.indexOf(callBack);
    if (callBackID >= 0) callBacks.splice(callBackID, 1);
  };

  return { publish, subscribe, unsubscribe };
})();

const Stats = (() => {
  // cache DOM
  const total = document.querySelector("#total");
  const finished = document.querySelector("#finished");
  const toLearn = document.querySelector("#to-learn");

  const parsePiecesStats = (pieces) => {
    const numTotal = pieces.length;
    const numFinished = pieces.filter((piece) => piece.learnt === true).length;
    const numToLearn = numTotal - numFinished;
    return { numTotal, numFinished, numToLearn };
  };

  const renderStats = (pieces) => {
    const stats = parsePiecesStats(pieces);
    total.innerText = stats.numTotal;
    finished.innerText = stats.numFinished;
    toLearn.innerText = stats.numToLearn;
  };

  EventManager.subscribe("piecesChanged", (pieces) => {
    renderStats(pieces);
  });
})();

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
  const formID = document.querySelector("#form-id");

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
  const addOrEditPiece = (title, composer, pages, learnt, id) => {
    const piece = Piece(title, composer, pages, learnt);
    if (id) {
      myPieces[id] = piece;
    } else {
      myPieces.push(piece);
    }
    EventManager.publish("piecesChanged", myPieces);
  };
  const deletePiece = (id) => {
    myPieces.splice(id, 1);
    EventManager.publish("piecesChanged", myPieces);
  };
  const showForm = (id) => {
    formContainer.style.display = "flex";
    if (id) {
      const pieceToEdit = myPieces[id];
      formTitle.value = pieceToEdit.title;
      formComposer.value = pieceToEdit.composer;
      formPages.value = pieceToEdit.pages;
      formLearnt.checked = pieceToEdit.learnt;
      formID.value = id;
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
    formID.value = "";
  };
  const editPiece = (id) => {
    showForm(id);
  };

  // bind Events
  EventManager.subscribe("piecesChanged", render);
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
    const id = formID.value;
    addOrEditPiece(title, composer, pages, learnt, id);
    clearForm();
    hideForm();
  });
  window.addEventListener("click", (e) => {
    if (e.target === formContainer) {
      clearForm();
      hideForm();
    }
  });

  EventManager.publish("piecesChanged", myPieces);
  return { myPieces, addOrEditPiece, deletePiece };
})();
