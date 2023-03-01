// Coordinator – doesn’t make many decisions but delegates work to other objects.
const EventManager = (() => {
  // the events object contains pairs of: event - [list of corresponding callbacks]
  const events = {};

  const publish = (event, arg) => {
    if (!events[event]) return;
    events[event].forEach((callback) => {
      callback(arg);
    });
  };
  const subscribe = (event, callback) => {
    events[event] = events[event] === undefined ? [] : events[event];
    events[event].push(callback);
  };
  const unsubscribe = (event, callback) => {
    if (!events[event]) return;
    const callbacks = events[event];
    const callbackID = callbacks.indexOf(callback);
    if (callbackID >= 0) callbacks.splice(callbackID, 1);
  };

  return { publish, subscribe, unsubscribe };
})();

//= ===================================================================
// Service provider – performs specific work and offers services to others on demand
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

  const render = (pieces) => {
    const stats = parsePiecesStats(pieces);
    total.innerText = stats.numTotal;
    finished.innerText = stats.numFinished;
    toLearn.innerText = stats.numToLearn;
  };

  // bind events
  EventManager.subscribe("piecesChanged", (pieces) => {
    render(pieces);
  });
})();

//= ===================================================================
// Service provider – performs specific work and offers services to others on demand
const Cards = (() => {
  // cache DOM
  const cardsContainer = document.querySelector("#cards-container");

  const createCard = (piece) => {
    const card = document.createElement("div");
    const cardHTML = `
      <div>
        <div class="card-title">${piece.title}</div>
        <div class="card-composer">${piece.composer}</div>
      </div>
      <div>
        <div>${piece.pages} pages</div>
        <div class="${piece.learnt ? `finished` : `progress`}">${
      piece.learnt ? `Finished` : `In progress`
    }</div>
      </div>
      <div class="piece-comments">${piece.comments}</div>
      <div class="edit-del-row">
        <button class="edit">Edit</button>
        <button class="del">Del</button>
      </div>
    `;
    card.innerHTML = cardHTML;
    return card;
  };
  const render = (pieces) => {
    // without any arg, replaceChildren() removes all children
    cardsContainer.replaceChildren();
    // this is so that the newest addition is shown first
    const reversedPieces = pieces.slice().reverse();
    let i = reversedPieces.length - 1;
    reversedPieces.forEach((piece) => {
      const card = createCard(piece);
      card.classList.add("card");
      card.dataset.id = i;
      cardsContainer.appendChild(card);
      i -= 1;
    });
  };

  // bind Events
  EventManager.subscribe("piecesChanged", (pieces) => {
    render(pieces);
  });
})();

//= ===================================================================
// Information holder – knows certain information and provides that information
const Piece = (title, composer, pages, learnt, comments) => ({
  title,
  composer,
  pages,
  learnt,
  comments,
});

// demo pieces
const piece1 = Piece(
  "Sonata",
  "Beethoven",
  5,
  true,
  "abcxyzlmnpq\nasdfasdfasabcxyzlmnpq\nasdfasdfas\nasdfasdfasabcxyzlmnpq\nasdfasdfas"
);
const piece2 = Piece(
  "Concerto",
  "Mozart",
  3,
  false,
  "abcxyzlmnpqabcxyzlmnpqadsfasdfasdf"
);
const piece3 = Piece("Sonata", "Beethoven", 5, true, "abcxyzlmnpq");
const piece4 = Piece("Concerto", "Mozart", 3, false, "abcxyzlmnpq");
const piece5 = Piece("Sonata", "Beethoven", 5, true, "abcxyzlmnpq");
const piece6 = Piece("Concerto", "Mozart", 3, false, "abcxyzlmnpq");

//= ===================================================================
// Information holder – knows certain information and provides that information
const Storage = (() => {
  const myPieces = [piece1, piece2, piece3, piece4, piece5, piece6];

  // cache DOM
  const cardsContainer = document.querySelector("#cards-container");
  const addButton = document.querySelector("#add");
  const formContainer = document.querySelector("#form-container");
  const pieceForm = document.querySelector("#piece-form");
  const formTitle = document.querySelector("#title");
  const formComposer = document.querySelector("#composer");
  const formPages = document.querySelector("#pages");
  const formLearnt = document.querySelector("#learnt");
  const formComments = document.querySelector("#comments");
  // form-id is a hidden value, always empty unless showForm() has an id passed in
  const formID = document.querySelector("#form-id");

  const showForm = (id) => {
    formContainer.style.display = "flex";
    // if an id is passed in, prefill the form with info the piece with that id
    if (id) {
      const pieceToEdit = myPieces[id];
      formTitle.value = pieceToEdit.title;
      formComposer.value = pieceToEdit.composer;
      formPages.value = pieceToEdit.pages;
      formLearnt.checked = pieceToEdit.learnt;
      formID.value = id;
      formComments.value = pieceToEdit.comments;
    }
  };
  const hideForm = () => {
    formContainer.style.display = "none";
  };
  const clearForm = () => {
    formTitle.value = "";
    formComposer.value = "";
    formPages.value = "";
    formLearnt.checked = false;
    formID.value = "";
    formComments.value = "";
  };
  const addOrEditPiece = (title, composer, pages, learnt, id, comments) => {
    const piece = Piece(title, composer, pages, learnt, comments);
    if (id) {
      // update the existing piece with new values
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

  // bind Events
  addButton.addEventListener("click", () => {
    showForm();
  });
  pieceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = formTitle.value;
    const composer = formComposer.value;
    const pages = formPages.value;
    const learnt = formLearnt.checked;
    const id = formID.value;
    const comments = formComments.value;
    addOrEditPiece(title, composer, pages, learnt, id, comments);
    clearForm();
    hideForm();
  });
  window.addEventListener("click", (e) => {
    if (e.target === formContainer) {
      clearForm();
      hideForm();
    }
  });
  cardsContainer.addEventListener("click", (e) => {
    const pieceID = e.target.parentNode.parentNode.dataset.id;
    if (e.target.classList.contains("del")) {
      deletePiece(pieceID);
    } else if (e.target.classList.contains("edit")) {
      showForm(pieceID);
    }
  });

  // init stats and pieces layout by publishing this event
  EventManager.publish("piecesChanged", myPieces);

  return { myPieces };
})();
