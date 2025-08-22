const workItems = [...document.querySelectorAll(".work-item")];
const infoBlock = document.querySelector(".work-info");

if (!workItems.length || !infoBlock) {
  console.warn("Нет .work-item или .work-info");
} else {
  // панель всегда видима
  infoBlock.style.display = "";
  infoBlock.removeAttribute("hidden");
  infoBlock.setAttribute("aria-live", "polite");

  const toSafeHtml = (s = "") =>
    s.replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/\[br\]/g, "<br>");

  const show = (item) => {
    workItems.forEach(el => el.classList.toggle("is-active", el === item));
    infoBlock.innerHTML = toSafeHtml(item.dataset.info || "");
  };

  // стартовое состояние
  show(document.querySelector(".work-item.is-active") || workItems[0]);

  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  workItems.forEach(item => {
    item.setAttribute("tabindex", "0");

    // ДЕСKTOP: настоящий hover
    if (canHover) {
      item.addEventListener("mouseenter", () => show(item));
    }

    // ВЕЗДЕ: клавиатура/клик/тач
    item.addEventListener("focus", () => show(item));
    item.addEventListener("click", () => show(item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        show(item);
      }
    });

    // iOS/тач: мгновенный отклик
    item.addEventListener("touchstart", () => show(item), { passive: true });
  });
}
//💻 📋 📰 