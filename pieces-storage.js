import Piece from "./piece.js";
import * as EventManager from "./event-manager.js";

// Information holder – knows certain information and provides that information
const myPieces = [];

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

export const addOrEditPiece = (
  title,
  composer,
  pages,
  learnt,
  id,
  comments
) => {
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
EventManager.subscribe("cardsChanged", (changedCards) => {
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
