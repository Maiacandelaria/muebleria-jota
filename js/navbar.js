(() => {
  const CART_STORAGE_KEY = "hermanos_jota_cart";

  function getCartCount() {
    try {
      const items = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
      return Array.isArray(items) ? items.reduce((total, item) => total + (Number(item.cantidad) || 0), 0) : 0;
    } catch { return 0; }
  }

  function updateCartBadge(animate = false) {
    document.querySelectorAll("[data-cart-count], #cart-count-badge").forEach((badge) => {
      badge.textContent = getCartCount();
      if (animate) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
    });
  }

  function setActiveLink() {
    const page = window.location.pathname.split("/").pop().toLowerCase() || "index.html";
    const current = page === "index.html" ? "inicio" :
      ["productos.html", "producto.html", "detalle.html"].includes(page) ? "catalogo" :
      page === "contacto.html" ? "contacto" : "";
    document.querySelectorAll("[data-nav-link], .main-nav a").forEach((link) => {
      const target = link.dataset.navLink || (link.getAttribute("href") || "").split("?")[0].split("/").pop().replace(".html", "");
      const active = link.dataset.navLink ? link.dataset.navLink === current :
        (current === "inicio" && target === "index") ||
        (current === "catalogo" && ["productos", "producto", "detalle"].includes(target)) ||
        (current === "contacto" && target === "contacto");
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
  }

  function initMenu() {
    const nav = document.querySelector("[data-main-nav], .main-nav");
    if (!nav) return;
    let toggle = document.querySelector("[data-nav-toggle]");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "nav-toggle";
      toggle.dataset.navToggle = "";
      toggle.setAttribute("aria-label", "Abrir menú de navegación");
      toggle.setAttribute("aria-controls", "main-navigation");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<svg class="nav-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
      nav.id = "main-navigation";
      nav.parentNode.insertBefore(toggle, nav);
    }
    const closeMenu = () => { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Abrir menú de navegación"); };
    toggle.addEventListener("click", () => { const open = nav.classList.toggle("is-open"); toggle.setAttribute("aria-expanded", String(open)); toggle.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación"); });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeMenu(); toggle.focus(); } });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setActiveLink();
    updateCartBadge();
    initMenu();
    document.querySelectorAll(".footer-bottom p").forEach((paragraph) => {
      if (paragraph.textContent.includes("Sprint 1 y 2")) paragraph.remove();
    });
  });
  window.addEventListener("storage", (event) => { if (event.key === CART_STORAGE_KEY) updateCartBadge(true); });
  window.actualizarNavbarCarrito = () => updateCartBadge(true);
})();
