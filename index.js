
const workItems = [...document.querySelectorAll(".work-item")];
const infoBlock = document.querySelector(".work-info");

const toSafeHtml = (s = "") =>
  s.replace(/&/g, "&amp;")
   .replace(/</g, "&lt;")
   .replace(/\[br\]/g, "<br>");

const show = (item) => {
  workItems.forEach(el => el.classList.toggle("is-active", el === item));

  // плавно скрыть текущий текст
  infoBlock.classList.remove("show");

  // после скрытия обновить текст и снова показать
  setTimeout(() => {
    infoBlock.innerHTML = toSafeHtml(item.dataset.info || "");
    requestAnimationFrame(() => infoBlock.classList.add("show"));
  }, 300); // таймаут = transition (0.3s)
};

// стартовое состояние
show(workItems[0]);

// обработчики
workItems.forEach(item => {
  item.addEventListener("mouseenter", () => show(item));
  item.addEventListener("click", () => show(item));
  item.addEventListener("focus", () => show(item));
});
