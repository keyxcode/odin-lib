import * as EventManager from "./event-manager.js";
import * as PiecesStorage from "./pieces-storage.js";
import * as PieceForm from "./piece-form.js";

// cache DOM
const selectedCardContainer = document.querySelector("#main-card-container");
const selectedCardTitle = document.querySelector("#main-card-title");
const selectedCardComposer = document.querySelector("#main-card-composer");
const selectedCardPages = document.querySelector("#main-card-pages");
const selectedCardLearnt = document.querySelector("#main-card-learnt");
const selectedCardComments = document.querySelector("#main-card-comments");
const selectedCardEdit = document.querySelector("#main-card-edit");
const selectedCardDel = document.querySelector("#main-card-del");

const showSelectedCard = (id) => {
  selectedCardContainer.style.display = "flex";
  const pieceToShow = PiecesStorage.myPieces[id];
  selectedCardTitle.innerText = pieceToShow.title;
  selectedCardComposer.innerText = pieceToShow.composer;
  selectedCardPages.innerText = `${pieceToShow.pages} pages`;
  selectedCardLearnt.innerText = `${pieceToShow.learnt}`
    ? "Finished"
    : "In progress";
  selectedCardLearnt.classList.add(
    `${pieceToShow.learnt}` ? "finished" : "progress"
  );
  selectedCardComments.innerText = pieceToShow.comments;
  selectedCardEdit.dataset.id = id;
  selectedCardDel.dataset.id = id;
};

const hideSelectedCard = () => {
  selectedCardContainer.style.display = "none";
};

const clearSelectedCard = () => {
  selectedCardTitle.innerText = "";
  selectedCardComposer.innerText = "";
  selectedCardPages.innerText = "";
  selectedCardLearnt.innerText = "";
  selectedCardComments.innerText = "";
  selectedCardEdit.dataset.id = "";
  selectedCardDel.dataset.id = "";
};

// bind Events
EventManager.subscribe("cardsChanged", (changedCards) => {
  changedCards.forEach((card) =>
    card.addEventListener("click", () => {
      const pieceID = card.dataset.id;
      showSelectedCard(pieceID);
    })
  );
});
selectedCardEdit.addEventListener("click", (e) => {
  e.preventDefault();
  const cardID = selectedCardEdit.dataset.id;
  clearSelectedCard();
  hideSelectedCard();
  PieceForm.showForm(cardID);
});
selectedCardDel.addEventListener("click", (e) => {
  e.preventDefault();
  PiecesStorage.deletePiece(selectedCardDel.dataset.id);
  clearSelectedCard();
  hideSelectedCard();
});
window.addEventListener("click", (e) => {
  if (e.target === selectedCardContainer) {
    clearSelectedCard();
    hideSelectedCard();
  }
});
