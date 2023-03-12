import * as EventManager from "./event-manager.js";

const tags = new Set();
const selectedTags = new Set();
if (!localStorage.getItem("tagsDisplayStatus")) {
  localStorage.setItem("tagsDisplayStatus", "show");
}

// cache DOM
const tagsArea = document.querySelector("#tags-area");
const tagsHider = document.querySelector("#tags-hider");
const tagsDropDown = document.querySelector("#dropdown");
const tagsContainer = document.querySelector("#tags-container");

const selectOrUnselectTag = (e) => {
  const tagDiv = e.target;
  const tag = e.target.innerText;
  if (tagDiv.className === "tag selected") {
    tagDiv.className = "tag";
    tagDiv.style.filter = "brightness(100%)";
    selectedTags.delete(tag);
  } else {
    tagDiv.className = "tag selected";
    tagDiv.style.filter = "brightness(60%)";
    selectedTags.add(tag);
  }
};

const showHideTagsArea = (displayStatus) => {
  if (displayStatus === "show") {
    tagsArea.style.display = "grid";
  } else if (displayStatus === "hide") {
    tagsArea.style.display = "none";
  }
};

const showHideTagsContainer = (displayStatus) => {
  if (displayStatus === "show") {
    tagsContainer.style.display = "flex";
    tagsContainer.classList.remove("hide-tags");
    tagsContainer.classList.add("show-tags");
    tagsDropDown.classList.remove("active");
  } else if (displayStatus === "hide") {
    tagsContainer.style.display = "none";
    tagsContainer.classList.remove("show-tags");
    tagsContainer.classList.add("hide-tags");
    tagsDropDown.classList.add("active");
  }
};

export const render = () => {
  const tagsContainerDisplayStatus = localStorage.getItem("tagsDisplayStatus");
  if (tags.size === 0) {
    showHideTagsArea("hide");
    return;
  }
  showHideTagsArea("show");
  showHideTagsContainer(tagsContainerDisplayStatus);

  tagsContainer.replaceChildren();
  tags.forEach((tag) => {
    const tagDiv = document.createElement("div");
    tagDiv.textContent = tag;
    tagDiv.className = "tag";
    tagsContainer.appendChild(tagDiv);
  });

  // recache DOM
  const tagDivs = document.querySelectorAll(".tag");

  // rebind events
  tagDivs.forEach((tagDiv) =>
    tagDiv.addEventListener("click", (e) => {
      selectOrUnselectTag(e);
      EventManager.publish("tagsSelected", selectedTags);
    })
  );
};

const getTagsFromPieces = (pieces) => {
  const tagLists = Array.from(pieces).map((piece) => piece.tags);
  const sortedTags = [];
  tagLists.forEach((tagList) => {
    const pieceTags = tagList.split(",").map((item) => item.trim());
    pieceTags.forEach((pieceTag) => {
      if (pieceTag === "") return;
      const pieceTagLowerCase = pieceTag.toLowerCase();
      sortedTags.push(pieceTagLowerCase);
    });
  });
  tags.clear();
  sortedTags.sort().forEach((sortedTag) => tags.add(sortedTag));
};

// bind events
EventManager.subscribe("piecesChanged", (pieces) => {
  getTagsFromPieces(pieces);
  render();
});

tagsHider.addEventListener("click", () => {
  const currentDisplayStatus = localStorage.getItem("tagsDisplayStatus");
  const switchedDisplayStatus =
    currentDisplayStatus === "show" ? "hide" : "show";
  localStorage.setItem("tagsDisplayStatus", switchedDisplayStatus);
  showHideTagsContainer(switchedDisplayStatus);
});
