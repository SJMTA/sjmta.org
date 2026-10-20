/** Progressive enhancement for the homepage navigation. Content lives in index.html. */
(() => {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const desktop = window.matchMedia("(min-width: 1050px)");

  if (!header || !toggle || !navigation) return;

  function setMenuOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    header.dataset.menuOpen = String(open);
  }

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 1);
  }

  document.documentElement.classList.add("js");
  toggle.hidden = false;
  setMenuOpen(false);
  updateHeader();

  toggle.addEventListener("click", () => {
    setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });

  desktop.addEventListener("change", () => setMenuOpen(false));
  window.addEventListener("scroll", updateHeader, { passive: true });
})();
