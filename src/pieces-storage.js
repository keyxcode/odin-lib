import * as EventManager from "./event-manager.js";
import Piece from "./piece.js";

export const myPieces = [];

export const getPiecesFromLocalStorage = () => {
  if (localStorage.getItem("myPieces")) {
    const localPieces = JSON.parse(localStorage.getItem("myPieces"));
    localPieces.forEach((localPiece) => myPieces.push(localPiece));
  }
};

const savePiecesToLocalStorage = () => {
  localStorage.setItem("myPieces", JSON.stringify(myPieces));
};

export const addOrEditPiece = (
  title,
  composer,
  pages,
  learnt,
  id,
  comments,
  tags
) => {
  const piece = Piece(title, composer, pages, learnt, comments, tags);
  if (id) {
    // update the existing piece with new values
    myPieces[id] = piece;
  } else {
    myPieces.push(piece);
  }
  savePiecesToLocalStorage();
  EventManager.publish("piecesChanged", myPieces);
};

export const deletePiece = (id) => {
  myPieces.splice(id, 1);
  savePiecesToLocalStorage();
  EventManager.publish("piecesChanged", myPieces);
};

export const clearAll = () => {
  myPieces.splice(0, myPieces.length);
  savePiecesToLocalStorage();
  EventManager.publish("piecesChanged", myPieces);
};
