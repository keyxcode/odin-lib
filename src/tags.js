import * as EventManager from "./event-manager.js";

const initTags = () => {
  const tags = new Set();
  const selectedTags = new Set();

  // cache DOM
  const tagsContainer = document.querySelector("#tag-container");

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

  const render = () => {
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
  render();

  const parseTagsFromPieces = (pieces) => {
    const tagLists = Array.from(pieces).map((piece) => piece.tags);
    tagLists.forEach((tagList) => {
      const pieceTags = tagList.split(",").map((item) => item.trim());
      pieceTags.forEach((pieceTag) => tags.add(pieceTag));
    });
  };

  // bind events
  EventManager.subscribe("piecesChanged", (pieces) => {
    parseTagsFromPieces(pieces);
    render();
  });
};

export default initTags();
