// Service provider – performs specific work and offers services to others on demand
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

export const render = (pieces) => {
  const stats = parsePiecesStats(pieces);
  total.innerText = stats.numTotal;
  finished.innerText = stats.numFinished;
  toLearn.innerText = stats.numToLearn;
};
