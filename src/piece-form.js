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
const formTags = document.querySelector("#form-tags");
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
    formTags.value = pieceToEdit.tags;
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
  formTags.value = "";
  titleError.textContent = "";
  composerError.textContent = "";
  pagesError.textContent = "";
};

const showTitleError = () => {
  if (formTitle.validity.valueMissing) {
    titleError.textContent = "Please enter the piece title.";
    titleError.className = "error active";
  } else {
    titleError.textContent = "";
    titleError.className = "error";
  }
};

const showComposerError = () => {
  if (formComposer.validity.valueMissing) {
    composerError.textContent = "Please enter the piece composer.";
    composerError.className = "error active";
  } else {
    composerError.textContent = "";
    composerError.className = "error";
  }
};

const showPagesError = () => {
  if (formPages.validity.valueMissing) {
    pagesError.textContent = "Please enter the number of pages.";
    pagesError.className = "error active";
  } else {
    pagesError.textContent = "";
    pagesError.className = "error";
  }
};

const showErrors = () => {
  showTitleError();
  showComposerError();
  showPagesError();
};

// bind events
EventManager.subscribe("requestEditForm", (id) => {
  showForm(id);
  console.log("piece-form receives requestEditForm: show the requested form");
});
formTitle.addEventListener("input", showTitleError);
formComposer.addEventListener("input", showComposerError);
formPages.addEventListener("input", showPagesError);
pieceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !formTitle.validity.valid ||
    !formComposer.validity.valid ||
    !formPages.validity.valid
  ) {
    showErrors();
    return;
  }
  const title = formTitle.value;
  const composer = formComposer.value;
  const pages = formPages.value;
  const learnt = formLearnt.checked;
  const id = formID.value;
  const comments = formComments.value;
  const tags = formTags.value;
  PiecesStorage.addOrEditPiece(
    title,
    composer,
    pages,
    learnt,
    id,
    comments,
    tags
  );
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
