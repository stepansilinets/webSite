const workItems = [...document.querySelectorAll(".work-item")];
const infoBlock = document.querySelector(".work-info");

const toSafeHtml = (s = "") =>
  s.replace(/&/g, "&amp;")
   .replace(/</g, "&lt;")
   .replace(/\[br\]/g, "<br>");

const show = (item) => {
  workItems.forEach(el => el.classList.toggle("is-active", el === item));

  infoBlock.classList.remove("show");

  setTimeout(() => {
    infoBlock.innerHTML = toSafeHtml(item.dataset.info || "");
    infoBlock.style.color = "white";
    requestAnimationFrame(() => infoBlock.classList.add("show"));
  }, 300); 
};


show(workItems[0]);


workItems.forEach(item => {
  // item.addEventListener("mouseenter", () => show(item));
  item.addEventListener("click", () => show(item));
  item.addEventListener("focus", () => show(item));
});
