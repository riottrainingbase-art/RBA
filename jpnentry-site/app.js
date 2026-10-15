
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    if (menu) {
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Open navigation");
    }
  };
  if (menu && nav) {
    menu.addEventListener("click", function () {
      const open = document.body.classList.toggle("menu-open");
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeMenu();
    });
    document.addEventListener("click", e => {
      if (document.body.classList.contains("menu-open") && !e.target.closest(".site-header")) closeMenu();
    });
  }
  const langMenu = document.querySelector(".lang-menu");
  if (langMenu) {
    document.addEventListener("click", e => {
      if (!langMenu.contains(e.target)) langMenu.removeAttribute("open");
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") langMenu.removeAttribute("open");
    });
  }
  const field = document.getElementById("note-search");
  if (field) {
    const cards = Array.from(document.querySelectorAll(".blog-card"));
    const empty = document.querySelector(".empty-result");
    const total = document.querySelector(".blog-controls > span");
    const update = () => {
      const query = field.value.trim().toLocaleLowerCase();
      let shown = 0;
      cards.forEach(card => {
        const visible = query === "" || (card.getAttribute("data-search") || "").includes(query);
        card.hidden = !visible;
        if (visible) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
      if (total) total.textContent = query ? shown + " MATCHING NOTES" : cards.length + " PUBLISHED NOTES & GUIDES";
    };
    field.addEventListener("input", update);
    field.addEventListener("search", update);
  }
});
