import Piece from "./piece.js";
import * as EventManager from "./event-manager.js";
import * as Stats from "./stats.js";
import * as Cards from "./cards.js";
import * as PiecesStorage from "./pieces-storage.js";
import * as PieceForm from "./piece-form.js";
import * as SelectedCard from "./selected-card.js";

export default () => {
  // cache DOM
  const addButtons = document.querySelectorAll(".add"); // many because desktop & mobile
  const addDemo = document.querySelector("#add-demo");

  // Demo pieces
  const demoPieces = [
    Piece(
      "Waltz for Debby",
      "Bill Evans",
      4,
      true,
      "3/4 but feels like 1/4\nHas two alternative endings",
      "jazz, waltz"
    ),
    Piece(
      "Waltz in B minor",
      "Bill Evans",
      4,
      false,
      "Pay attention to key changes\n",
      "jazz, waltz"
    ),
    Piece(
      "Le cygne",
      "Camille Saint-Saëns",
      5,
      true,
      "Originally written for solo cello and 2 pianos\nSteady and soft left-hand accompaniment",
      "piano, romantic"
    ),
    Piece(
      "Piano Sonata No. 8 II. Adagio cantabile",
      "Ludwig V. Beethoven",
      4,
      true,
      "Listen to Baremboim's version",
      "early romantic"
    ),
    Piece(
      "Clair de lune ",
      "Claude Debussy",
      6,
      true,
      "Make use of half-pedalling\nListen to the original poem by Paul Verlaine for inspiration",
      "impressionism, late romantic"
    ),
    Piece(
      "Salut d'Amour Op.12",
      "Edward Elgar ",
      5,
      false,
      "Originally written for piano and violin\nTry to make the right hand legato lines sing like a violin",
      "romantic, 2022"
    ),
  ];

  // bind events
  addButtons.forEach((button) =>
    button.addEventListener("click", () => {
      PieceForm.showForm();
    })
  );
  addDemo.addEventListener("click", () => {
    demoPieces.forEach((demoPiece) => {
      PiecesStorage.addOrEditPiece(
        demoPiece.title,
        demoPiece.composer,
        demoPiece.pages,
        demoPiece.learnt,
        undefined, // undefined id so that it doesn't call up an edit form
        demoPiece.comments,
        demoPiece.tags
      );
    });
  });
  EventManager.subscribe("piecesChanged", (pieces) => {
    Stats.render(pieces);
    Cards.render(pieces);
    console.log(
      "repertoire receives piecesChanged: render stats, render cards"
    );
  });
  EventManager.subscribe("editedAPiece", (id) => {
    SelectedCard.showSelectedCard(id);
    console.log(
      "repertoire receives editedAPiece: show the selected card of the piece just being edited"
    );
  });
  EventManager.subscribe("tagsSelected", (selectedTags) => {
    Cards.render(PiecesStorage.myPieces, selectedTags);
  });

  // init
  PiecesStorage.syncWithLocalStorage();
  EventManager.publish("piecesChanged", PiecesStorage.myPieces);
};
