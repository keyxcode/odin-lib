import Piece from "./piece.js";
import * as EventManager from "./event-manager.js";
import * as Stats from "./stats.js";
import * as Cards from "./cards.js";
import * as PiecesStorage from "./pieces-storage.js";
import * as PieceForm from "./piece-form.js";
import * as SelectedCard from "./selected-card.js";
import Tags from "./tags.js";

export default () => {
  // Cache DOM
  const addButtons = document.querySelectorAll(".add");

  // Bind events
  addButtons.forEach((button) =>
    button.addEventListener("click", () => {
      PieceForm.showForm();
    })
  );
  EventManager.subscribe("piecesChanged", (pieces) => {
    Stats.render(pieces);
    Cards.render(pieces);
    localStorage.setItem("myPieces", JSON.stringify(pieces));
    console.log(
      "repertoire receives piecesChanged: render stats, render cards, update localStorage"
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

  // Add demo pieces
  let myPieces = [];
  if (localStorage.getItem("myPieces")) {
    myPieces = JSON.parse(localStorage.getItem("myPieces"));
  } else {
    // Demo pieces
    myPieces = [
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
        "romantic"
      ),
      Piece(
        "Piano Sonata No. 8 II. Adagio cantabile",
        "Ludwig V. Beethoven",
        4,
        true,
        "Listen to Baremboim's version",
        "romantic"
      ),
      Piece(
        "Clair de lune ",
        "Claude Debussy",
        6,
        true,
        "Make use of half-pedalling\nListen to the original poem by Paul Verlaine for inspiration",
        "impressionism, romantic"
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
  }
  myPieces.forEach((piece) =>
    PiecesStorage.addOrEditPiece(
      piece.title,
      piece.composer,
      piece.pages,
      piece.learnt,
      undefined, // undefined id so that it doesn't call up an edit form
      piece.comments,
      piece.tags
    )
  );

  // In case there aren't any pieces in storage, this will render the stats
  if (myPieces.length === 0) {
    EventManager.publish("piecesChanged", myPieces);
  }
};
