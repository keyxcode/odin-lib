import * as EventManager from "./event-manager.js";
import * as PiecesStorage from "./pieces-storage.js";

// cache DOM
const selectedCardContainer = document.querySelector(
  "#selected-card-container"
);
const selectedCardTitle = document.querySelector("#selected-card-title");
const selectedCardComposer = document.querySelector("#selected-card-composer");
const selectedCardPages = document.querySelector("#selected-card-pages");
const selectedCardLearnt = document.querySelector("#selected-card-learnt");
const selectedCardComments = document.querySelector("#selected-card-comments");
const selectedCardEdit = document.querySelector("#selected-card-edit");
const selectedCardDel = document.querySelector("#selected-card-del");

export const showSelectedCard = (id) => {
  selectedCardContainer.style.display = "flex";
  const pieceToShow = PiecesStorage.myPieces[id];
  selectedCardTitle.innerText = pieceToShow.title;
  selectedCardComposer.innerText = pieceToShow.composer;
  selectedCardPages.innerText = `${pieceToShow.pages} pages`;
  selectedCardLearnt.innerText = pieceToShow.learnt
    ? "Finished"
    : "In progress";
  selectedCardLearnt.className = pieceToShow.learnt ? "finished" : "progress";
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
  console.log(
    "selected-card receives cardsChanged: update cards, rebind showSelectedCard callback for each card"
  );
});
selectedCardEdit.addEventListener("click", (e) => {
  e.preventDefault();
  const cardID = selectedCardEdit.dataset.id;
  clearSelectedCard();
  hideSelectedCard();
  EventManager.publish("requestEditForm", cardID);
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
