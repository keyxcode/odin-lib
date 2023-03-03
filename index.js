import { subscribe, publish } from "./event-manager.js";

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
  subscribe("piecesChanged", (pieces) => {
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

    // recache new cards
    const cards = document.querySelectorAll(".card");
    // bind events
    publish("cardsChanged", cards);
  };

  // bind events
  subscribe("piecesChanged", (pieces) => {
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
  "Waltz for Debby",
  "Bill Evans",
  4,
  true,
  "3/4 but feels like 1/4\nHas two alternative endings"
);
const piece2 = Piece(
  "Waltz in B minor",
  "Bill Evans",
  4,
  false,
  "Pay attention to key changes\n"
);
const piece3 = Piece(
  "Le cygne",
  "Camille Saint-Saëns",
  5,
  true,
  "Originally written for solo cello and 2 pianos\nSteady and soft left-hand accompaniment"
);
const piece4 = Piece(
  "Piano Sonata No. 8 II. Adagio cantabile",
  "Ludwig V. Beethoven",
  4,
  true,
  "Listen to Baremboim's version"
);
const piece5 = Piece(
  "Clair de lune ",
  "Claude Debussy",
  6,
  true,
  "Make use of half-pedalling\nListen to the original poem by Paul Verlaine for inspiration"
);
const piece6 = Piece(
  "Salut d'Amour Op.12",
  "Edward Elgar ",
  5,
  false,
  "Originally written for piano and violin\nTry to make the right hand legato lines sing like a violin"
);

//= ===================================================================
// Information holder – knows certain information and provides that information
const PiecesStorage = (() => {
  const myPieces = [piece1, piece2, piece3, piece4, piece5, piece6];

  // cache DOM
  const addButton = document.querySelector("#add");
  const mainCardContainer = document.querySelector("#main-card-container");
  const mainCardTitle = document.querySelector("#main-card-title");
  const mainCardComposer = document.querySelector("#main-card-composer");
  const mainCardPages = document.querySelector("#main-card-pages");
  const mainCardLearnt = document.querySelector("#main-card-learnt");
  const mainCardComments = document.querySelector("#main-card-comments");
  const mainCardEdit = document.querySelector("#main-card-edit");
  const mainCardDel = document.querySelector("#main-card-del");
  const formContainer = document.querySelector("#form-container");
  const pieceForm = document.querySelector("#piece-form");
  const formTitle = document.querySelector("#title");
  const formComposer = document.querySelector("#composer");
  const formPages = document.querySelector("#pages");
  const formLearnt = document.querySelector("#learnt");
  const formComments = document.querySelector("#comments");
  // form-id is a hidden value, always empty unless showForm() has an id passed in
  const formID = document.querySelector("#form-id");

  const showMainCard = (id) => {
    mainCardContainer.style.display = "flex";
    const pieceToShow = myPieces[id];
    mainCardTitle.innerText = pieceToShow.title;
    mainCardComposer.innerText = pieceToShow.composer;
    mainCardPages.innerText = `${pieceToShow.pages} pages`;
    mainCardLearnt.innerText = `${pieceToShow.learnt}`
      ? "Finished"
      : "In progress";
    mainCardLearnt.classList.add(
      `${pieceToShow.learnt}` ? "finished" : "progress"
    );
    mainCardComments.innerText = pieceToShow.comments;
    mainCardEdit.dataset.id = id;
    mainCardDel.dataset.id = id;
  };
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
  const hideMainCard = () => {
    mainCardContainer.style.display = "none";
  };
  const clearMainCard = () => {
    mainCardTitle.innerText = "";
    mainCardComposer.innerText = "";
    mainCardPages.innerText = "";
    mainCardLearnt.innerText = "";
    mainCardComments.innerText = "";
    mainCardEdit.dataset.id = "";
    mainCardDel.dataset.id = "";
  };

  const addOrEditPiece = (title, composer, pages, learnt, id, comments) => {
    const piece = Piece(title, composer, pages, learnt, comments);
    if (id) {
      // update the existing piece with new values
      myPieces[id] = piece;
    } else {
      myPieces.push(piece);
    }
    publish("piecesChanged", myPieces);
  };
  const deletePiece = (id) => {
    myPieces.splice(id, 1);
    publish("piecesChanged", myPieces);
  };

  // bind Events
  subscribe("cardsChanged", (changedCards) => {
    changedCards.forEach((card) =>
      card.addEventListener("click", () => {
        const pieceID = card.dataset.id;
        showMainCard(pieceID);
      })
    );
  });
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
    // if id exists => is editing a card => show main card after editing
    if (id) showMainCard(id);
  });
  window.addEventListener("click", (e) => {
    if (e.target === formContainer) {
      clearForm();
      hideForm();
    } else if (e.target === mainCardContainer) {
      clearMainCard();
      hideMainCard();
    }
  });
  mainCardEdit.addEventListener("click", (e) => {
    e.preventDefault();
    const cardID = mainCardEdit.dataset.id;
    clearMainCard();
    hideMainCard();
    showForm(cardID);
  });
  mainCardDel.addEventListener("click", (e) => {
    e.preventDefault();
    deletePiece(mainCardDel.dataset.id);
    clearMainCard();
    hideMainCard();
  });
  // init stats and pieces layout by publishing this event
  publish("piecesChanged", myPieces);

  return { myPieces };
})();
