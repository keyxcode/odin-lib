// cache DOM
const tags = document.querySelectorAll(".tag");

const selectOrUnselectTag = (e) => {
  console.log(e);
};

// bind events
tags.forEach((tag) =>
  tag.addEventListener("click", (e) => {
    selectOrUnselectTag(e);
  })
);
