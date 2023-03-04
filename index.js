import Piece from "./piece.js";
import * as EventManager from "./event-manager.js";
import * as Stats from "./stats.js";
import * as Cards from "./cards.js";
import * as PiecesStorage from "./pieces-storage.js";
import * as PieceForm from "./piece-form.js";
import * as SelectedCard from "./selected-card.js";

//= ===================================================================
// Bind events
EventManager.subscribe("piecesChanged", (pieces) => {
  Stats.render(pieces);
});
EventManager.subscribe("piecesChanged", (pieces) => {
  Cards.render(pieces);
});
EventManager.subscribe("editedAPiece", (id) => {
  SelectedCard.showSelectedCard(id);
});

// Add demo pieces
const DemoPieces = [
  Piece(
    "Waltz for Debby",
    "Bill Evans",
    4,
    true,
    "3/4 but feels like 1/4\nHas two alternative endings"
  ),
  Piece(
    "Waltz in B minor",
    "Bill Evans",
    4,
    false,
    "Pay attention to key changes\n"
  ),
  Piece(
    "Le cygne",
    "Camille Saint-Saëns",
    5,
    true,
    "Originally written for solo cello and 2 pianos\nSteady and soft left-hand accompaniment"
  ),
  Piece(
    "Piano Sonata No. 8 II. Adagio cantabile",
    "Ludwig V. Beethoven",
    4,
    true,
    "Listen to Baremboim's version"
  ),
  Piece(
    "Clair de lune ",
    "Claude Debussy",
    6,
    true,
    "Make use of half-pedalling\nListen to the original poem by Paul Verlaine for inspiration"
  ),
  Piece(
    "Salut d'Amour Op.12",
    "Edward Elgar ",
    5,
    false,
    "Originally written for piano and violin\nTry to make the right hand legato lines sing like a violin"
  ),
];
DemoPieces.forEach((piece) =>
  PiecesStorage.addOrEditPiece(
    piece.title,
    piece.composer,
    piece.pages,
    piece.learnt,
    undefined,
    piece.comments
  )
);

const addButton = document.querySelector("#add");
addButton.addEventListener("click", () => {
  PieceForm.showForm();
});
