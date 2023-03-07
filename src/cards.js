import * as EventManager from "./event-manager.js";

// cache DOM
const cardsContainer = document.querySelector("#cards-container");
const emptyMessage = document.querySelector("#empty-message");

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

export const render = (pieces) => {
  if (pieces.length === 0) emptyMessage.style.display = "block";
  else emptyMessage.style.display = "none";

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
  EventManager.publish("cardsChanged", cards);
};