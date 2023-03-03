import Piece from "./piece.js";
import * as EventManager from "./event-manager.js";

// Information holder – knows certain information and provides that information
export const myPieces = [];

export const addOrEditPiece = (
  title,
  composer,
  pages,
  learnt,
  id,
  comments
) => {
  const piece = Piece(title, composer, pages, learnt, comments);
  if (id) {
    // update the existing piece with new values
    myPieces[id] = piece;
  } else {
    myPieces.push(piece);
  }
  EventManager.publish("piecesChanged", myPieces);
};

export const deletePiece = (id) => {
  myPieces.splice(id, 1);
  EventManager.publish("piecesChanged", myPieces);
};
