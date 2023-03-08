import * as EventManager from "./event-manager.js";

const initTags = () => {
  const tags = ["jazz", "waltz", "romantic"];
  const selectedTags = new Set();

  // cache DOM
  const tagsContainer = document.querySelector("#tag-container");

  const render = () => {
    tags.forEach((tag) => {
      const tagDiv = document.createElement("div");
      tagDiv.textContent = tag;
      tagDiv.className = "tag";
      tagsContainer.appendChild(tagDiv);
    });
  };
  render();

  const tagDivs = document.querySelectorAll(".tag");

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

  // bind events
  tagDivs.forEach((tagDiv) =>
    tagDiv.addEventListener("click", (e) => {
      selectOrUnselectTag(e);
      EventManager.publish("tagsSelected", selectedTags);
    })
  );

  return { render };
};

export default initTags();
