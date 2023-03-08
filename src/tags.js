const initTags = () => {
  const tags = ["Classical", "Romantic", "Jazz", "20th century", "Baroque"];

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
    if (tagDiv.className === "tag selected") {
      tagDiv.className = "tag";
      tagDiv.style.filter = "brightness(100%)";
    } else {
      tagDiv.className = "tag selected";
      tagDiv.style.filter = "brightness(60%)";
    }
  };

  // bind events
  tagDivs.forEach((tagDiv) =>
    tagDiv.addEventListener("click", (e) => {
      selectOrUnselectTag(e);
    })
  );

  return { render };
};

export default initTags();
