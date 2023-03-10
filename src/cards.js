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

const pieceHasSelectedTags = (cardTags, selectedTags) => {
  const cardTagsLowerCase = cardTags.map((cardTag) => cardTag.toLowerCase());
  console.log(cardTagsLowerCase);
  return Array.from(selectedTags).every((selectedTag) =>
    cardTagsLowerCase.includes(selectedTag)
  );
};

const updateFeedbackMessage = (message = "") => {
  feedbackMessage.style.display = message ? "block" : "none";
  feedbackMessage.textContent = message;
};

export const render = (pieces, selectedTags = new Set()) => {
  // Empty message
  if (pieces.length === 0) {
    updateFeedbackMessage("Press the plus button to add a piece");
  } else updateFeedbackMessage();

  // without any arg, replaceChildren() removes all children
  cardsContainer.replaceChildren();

  // newest addition is shown first
  const reversedPieces = pieces.slice().reverse();
  let i = reversedPieces.length - 1;
  reversedPieces.forEach((piece) => {
    const pieceTags = piece.tags.split(",").map((item) => item.trim());
    if (
      pieceHasSelectedTags(pieceTags, selectedTags) ||
      selectedTags.size === 0
    ) {
      const card = createCardHTML(piece);
      card.classList.add("card");
      card.dataset.id = i;
      card.dataset.finished = piece.learnt;
      cardsContainer.appendChild(card);
    }
    i -= 1;
  });

  if (selectedTags.size > 0 && !cardsContainer.hasChildNodes()) {
    updateFeedbackMessage("No pieces match all the selected tags");
  }
  // recache new cards
  const cards = document.querySelectorAll(".card");
  // bind events
  EventManager.publish("cardsChanged", cards);
};
