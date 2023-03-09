import * as EventManager from "./event-manager.js";

// cache DOM
const total = document.querySelector("#total");
const finished = document.querySelector("#finished");
const toLearn = document.querySelector("#to-learn");

const parsePiecesStats = (cards) => {
  const numTotal = cards.length;
  const numFinished = Array.from(cards).filter(
    (card) => card.dataset.finished === "true"
  ).length;
  const numToLearn = numTotal - numFinished;
  return { numTotal, numFinished, numToLearn };
};

export const render = (cards) => {
  const stats = parsePiecesStats(cards);
  total.innerText = stats.numTotal;
  finished.innerText = stats.numFinished;
  toLearn.innerText = stats.numToLearn;
};

// bind events
EventManager.subscribe("cardsChanged", (cards) => {
  render(cards);
});
