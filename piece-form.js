import * as PiecesStorage from "./pieces-storage.js";
import * as SelectedCard from "./selected-card.js";

// cache DOM
const formContainer = document.querySelector("#form-container");
const pieceForm = document.querySelector("#piece-form");
const formTitle = document.querySelector("#title");
const formComposer = document.querySelector("#composer");
const formPages = document.querySelector("#pages");
const formLearnt = document.querySelector("#learnt");
const formComments = document.querySelector("#comments");
// form-id is a hidden value, always empty unless showForm() has an id passed in
const formID = document.querySelector("#form-id");

export const showForm = (id) => {
  formContainer.style.display = "flex";
  // if an id is passed in, prefill the form with info the piece with that id
  if (id) {
    const pieceToEdit = PiecesStorage.myPieces[id];
    formTitle.value = pieceToEdit.title;
    formComposer.value = pieceToEdit.composer;
    formPages.value = pieceToEdit.pages;
    formLearnt.checked = pieceToEdit.learnt;
    formID.value = id;
    formComments.value = pieceToEdit.comments;
  }
};

const hideForm = () => {
  formContainer.style.display = "none";
};

const clearForm = () => {
  formTitle.value = "";
  formComposer.value = "";
  formPages.value = "";
  formLearnt.checked = false;
  formID.value = "";
  formComments.value = "";
};

// bind events
pieceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = formTitle.value;
  const composer = formComposer.value;
  const pages = formPages.value;
  const learnt = formLearnt.checked;
  const id = formID.value;
  const comments = formComments.value;
  PiecesStorage.addOrEditPiece(title, composer, pages, learnt, id, comments);
  clearForm();
  hideForm();
  // if id exists => is editing a card => show main card after editing
  if (id) SelectedCard.showSelectedCard(id);
});
window.addEventListener("click", (e) => {
  if (e.target === formContainer) {
    clearForm();
    hideForm();
  }
});
