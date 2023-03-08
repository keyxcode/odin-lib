const initTags = () => {
  // cache DOM
  const tags = document.querySelectorAll(".tag");

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
  tags.forEach((tag) =>
    tag.addEventListener("click", (e) => {
      selectOrUnselectTag(e);
    })
  );
};

export default initTags();
