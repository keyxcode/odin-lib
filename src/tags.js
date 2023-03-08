const initTags = () => {
  const tags = ["Classical", "Romantic", "Jazz", "20th century", "Baroque"];

  // cache DOM
  const tagsContainer = document.querySelector("#tag-container");
  const tagDivs = document.querySelectorAll(".tag");

  const render = () => {
    tags.forEach((tag) => {
      const tagDiv = document.createElement("div");
      tagDiv.textContent = tag;
      tagDiv.className = "tag";
      tagsContainer.appendChild(tagDiv);
    });
  };
  render();

  const selectOrUnselectTag = (e) => {
    const button = e.target;
    if (button.className === "tag selected") {
      button.className = "tag";
      button.style.filter = "brightness(100%)";
    } else {
      button.className = "tag selected";
      button.style.filter = "brightness(60%)";
    }
  };

  // bind events
  tagDivs.forEach((tagDiv) =>
    tagDiv.addEventListener("click", (e) => {
      selectOrUnselectTag(e);
    })
  );
};

export default initTags();
