import * as EventManager from "./event-manager.js";
import * as PiecesStorage from "./pieces-storage.js";

// cache DOM
const formContainer = document.querySelector("#form-container");
const pieceForm = document.querySelector("#piece-form");
const formTitle = document.querySelector("#title");
const titleError = document.querySelector("#title + span");
const formComposer = document.querySelector("#composer");
const composerError = document.querySelector("#composer + span");
const formPages = document.querySelector("#pages");
const pagesError = document.querySelector("#pages + span");
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

const showError = () => {
  titleError.textContent = formTitle.validity.valueMissing
    ? "Please enter the piece title."
    : "";
  composerError.textContent = formComposer.validity.valueMissing
    ? "Please enter the piece composer."
    : "";
  pagesError.textContent = formPages.validity.valueMissing
    ? "Please enter the number of pages."
    : "";
};

// bind events
EventManager.subscribe("requestEditForm", (id) => showForm(id));
pieceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !formTitle.validity.valid ||
    !formComposer.validity.valid ||
    !formPages.validity.valid
  ) {
    showError();
    return;
  }
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
  if (id) EventManager.publish("editedAPiece", id);
});
window.addEventListener("click", (e) => {
  if (e.target === formContainer) {
    clearForm();
    hideForm();
  }
});
