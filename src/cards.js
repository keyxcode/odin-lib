import * as EventManager from "./event-manager.js";

// cache DOM
const cardsContainer = document.querySelector("#cards-container");
const feedbackMessage = document.querySelector("#feedback-message");

const createCardHTML = (piece) => {
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
    <div class="card-comments">${piece.comments}</div>
        `;
  card.innerHTML = cardHTML;
  return card;
};

const createCardFromPiece = (piece, id) => {
  const card = createCardHTML(piece);
  card.classList.add("card");
  card.dataset.id = id;
  card.dataset.finished = piece.learnt;
  return card;
};

const pieceHasSelectedTags = (piece, selectedTags) => {
  const pieceTags = piece.tags.split(",").map((item) => item.trim());
  const pieceTagsLowerCase = pieceTags.map((pieceTag) =>
    pieceTag.toLowerCase()
  );
  return Array.from(selectedTags).every((selectedTag) =>
    pieceTagsLowerCase.includes(selectedTag)
  );
};

const updateFeedbackMessage = (message = "") => {
  feedbackMessage.style.display = message ? "block" : "none";
  feedbackMessage.textContent = message;
};

export const render = (pieces, selectedTags = new Set()) => {
  if (pieces.length === 0) {
    updateFeedbackMessage("Press the plus button to add a piece");
  } else updateFeedbackMessage();

  // without any arg, replaceChildren() removes all children
  cardsContainer.replaceChildren();
  // newest addition is shown first
  const reversedPieces = pieces.slice().reverse();
  // therefore id has to go from highest to lowest
  let id = reversedPieces.length - 1;
  reversedPieces.forEach((piece) => {
    if (pieceHasSelectedTags(piece, selectedTags) || selectedTags.size === 0) {
      const card = createCardFromPiece(piece, id);
      cardsContainer.appendChild(card);
    }
    id -= 1;
  });

  if (selectedTags.size > 0 && !cardsContainer.hasChildNodes()) {
    updateFeedbackMessage("No pieces match all the selected tags");
  }

  const cards = document.querySelectorAll(".card");
  EventManager.publish("cardsChanged", cards);
};
