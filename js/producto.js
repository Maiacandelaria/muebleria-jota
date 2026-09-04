/**
 * MUEBLERÍA HERMANOS JOTA - DETALLE DE PRODUCTO (Sprint 1 & 2)
 * Lógica interactiva, carga asíncrona y gestión de carrito
 * Conectado con el catálogo oficial sin modificar productos.js
 */

// Metadatos extendidos para enriquecer los productos del catálogo
const PRODUCTOS_METADATOS = {
  1: {
    slug: "aparador-uspallata",
    categoria: "Almacenamiento",
    especificaciones: {
      "Medidas": "180 × 45 × 75 cm",
      "Materiales": "Nogal macizo FSC®, herrajes de latón",
      "Acabado": "Aceite natural ecológico",
      "Peso": "68 kg",
      "Capacidad": "6 compartimentos interiores"
    },
    enStock: true,
    tiempoEntrega: "Envío en 3 a 5 días hábiles"
  },
  2: {
    slug: "biblioteca-recoleta",
    categoria: "Almacenamiento",
    especificaciones: {
      "Medidas": "100 × 35 × 200 cm",
      "Materiales": "Estructura de acero, estantes de roble",
      "Acabado": "Laca mate ecológica",
      "Capacidad": "45 kg por estante",
      "Modulares": "5 estantes ajustables"
    },
    enStock: true,
    tiempoEntrega: "Envío en 4 a 7 días hábiles"
  },
  3: {
    slug: "butaca-mendoza",
    categoria: "Asientos",
    especificaciones: {
      "Medidas": "80 × 75 × 85 cm",
      "Materiales": "Guatambú macizo, tela bouclé",
      "Acabado": "Cera vegetal, tapizado premium",
      "Tapizado": "Repelente al agua y manchas",
      "Confort": "Espuma alta densidad"
    },
    enStock: true,
    tiempoEntrega: "Envío en 2 a 4 días hábiles"
  },
  4: {
    slug: "sillon-copacabana",
    categoria: "Asientos",
    especificaciones: {
      "Medidas": "90 × 85 × 95 cm",
      "Materiales": "Cuero curtido vegetal, acero pintado",
      "Acabado": "Cuero anilina premium",
      "Rotación": "360° silenciosa y suave",
      "Garantía": "10 años en estructura"
    },
    enStock: true,
    tiempoEntrega: "Envío en 5 a 8 días hábiles"
  },
  5: {
    slug: "mesa-de-centro-araucaria",
    categoria: "Mesas",
    especificaciones: {
      "Medidas": "90 × 90 × 45 cm",
      "Materiales": "Sobre de mármol Patagonia, patas de nogal",
      "Acabado": "Mármol pulido, aceite natural en madera",
      "Peso": "42 kg",
      "Carga máxima": "25 kg distribuidos"
    },
    enStock: true,
    tiempoEntrega: "Envío en 3 a 5 días hábiles"
  },
  6: {
    slug: "mesa-de-noche-aconcagua",
    categoria: "Dormitorio",
    especificaciones: {
      "Medidas": "45 × 35 × 60 cm",
      "Materiales": "Roble macizo FSC®, herrajes soft-close",
      "Acabado": "Barniz mate de poliuretano",
      "Almacenamiento": "1 cajón + repisa inferior"
    },
    enStock: true,
    tiempoEntrega: "Envío en 2 a 3 días hábiles"
  },
  7: {
    slug: "sofa-patagonia",
    categoria: "Asientos",
    especificaciones: {
      "Medidas": "220 × 90 × 80 cm",
      "Estructura": "Madera de eucalipto certificada FSC®",
      "Tapizado": "Lino 100% natural premium",
      "Relleno": "Espuma HR + plumón reciclado",
      "Sostenibilidad": "Materiales 100% reciclables"
    },
    enStock: true,
    tiempoEntrega: "Envío en 7 a 10 días hábiles"
  },
  8: {
    slug: "mesa-comedor-pampa",
    categoria: "Mesas",
    especificaciones: {
      "Medidas": "160-240 × 90 × 75 cm",
      "Materiales": "Roble macizo FSC®, mecanismo alemán",
      "Acabado": "Aceite-cera natural",
      "Capacidad": "6-10 comensales",
      "Extensión": "Sistema de mariposa central"
    },
    enStock: true,
    tiempoEntrega: "Envío en 5 a 7 días hábiles"
  },
  9: {
    slug: "sillas-cordoba",
    categoria: "Asientos",
    especificaciones: {
      "Medidas": "45 × 52 × 80 cm (cada una)",
      "Materiales": "Contrachapado nogal, tubo de acero",
      "Acabado": "Laca mate, pintura epoxi",
      "Apilables": "Hasta 6 sillas",
      "Incluye": "Set de 4 sillas"
    },
    enStock: true,
    tiempoEntrega: "Envío en 3 a 5 días hábiles"
  },
  10: {
    slug: "escritorio-costa",
    categoria: "Oficina",
    especificaciones: {
      "Medidas": "120 × 60 × 75 cm",
      "Materiales": "Bambú laminado, herrajes ocultos",
      "Acabado": "Laca mate resistente",
      "Almacenamiento": "1 cajón con organizador",
      "Cables": "Pasacables integrado"
    },
    enStock: true,
    tiempoEntrega: "Envío en 3 a 5 días hábiles"
  },
  11: {
    slug: "silla-de-trabajo-belgrano",
    categoria: "Oficina",
    especificaciones: {
      "Medidas": "60 × 60 × 90-100 cm",
      "Materiales": "Malla técnica, tejido reciclado",
      "Acabado": "Base cromada, tapizado premium",
      "Regulación": "Altura + inclinación respaldo",
      "Certificación": "Ergonomía europea EN 1335"
    },
    enStock: true,
    tiempoEntrega: "Envío en 2 a 4 días hábiles"
  }
};

// Catálogo base de respaldo si productos.js no estuviera disponible
const PRODUCTOS_FALLBACK = [
  { id: 1, nombre: "Aparador Uspallata", descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón.", medidas: "180 x 45 x 75 cm", materiales: "Nogal macizo FSC®, herrajes de latón", precio: 850000, imagen: "../assets/Aparador Uspallata.png" },
  { id: 2, nombre: "Biblioteca Recoleta", descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro.", medidas: "100 x 35 x 200 cm", materiales: "Estructura de acero, estantes de roble", precio: 620000, imagen: "../assets/Biblioteca Recoleta.png" },
  { id: 3, nombre: "Butaca Mendoza", descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú.", medidas: "80 x 75 x 85 cm", materiales: "Guatambú macizo, tela bouclé", precio: 480000, imagen: "../assets/Butaca Mendoza.png" },
  { id: 4, nombre: "Sillón Copacabana", descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna.", medidas: "90 x 85 x 95 cm", materiales: "Cuero curtido vegetal, acero pintado", precio: 750000, imagen: "../assets/Sillón Copacabana.png" },
  { id: 5, nombre: "Mesa de Centro Araucaria", descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal.", medidas: "90 x 90 x 45 cm", materiales: "Sobre de mármol Patagonia, patas de nogal", precio: 390000, imagen: "../assets/Mesa de Centro Araucaria.png" },
  { id: 6, nombre: "Mesa de Noche Aconcagua", descripcion: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®.", medidas: "45 x 35 x 60 cm", materiales: "Roble macizo FSC®, herrajes soft-close", precio: 280000, imagen: "../assets/Mesa de Noche Aconcagua.png" },
  { id: 7, nombre: "Sofá Patagonia", descripcion: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera.", medidas: "220 x 90 x 80 cm", materiales: "Madera de eucalipto certificada FSC®, Lino natural", precio: 1200000, imagen: "../assets/Sofá Patagonia.png" },
  { id: 8, nombre: "Mesa Comedor Pampa", descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave.", medidas: "160-240 x 90 x 75 cm", materiales: "Roble macizo FSC®, mecanismo alemán", precio: 950000, imagen: "../assets/Mesa Comedor Pampa.png" },
  { id: 9, nombre: "Sillas Córdoba", descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal.", medidas: "45 x 52 x 80 cm", materiales: "Contrachapado nogal, tubo de acero", precio: 340000, imagen: "../assets/Sillas Córdoba.png" },
  { id: 10, nombre: "Escritorio Costa", descripcion: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado.", medidas: "120 x 60 x 75 cm", materiales: "Bambú laminado, herrajes ocultos", precio: 510000, imagen: "../assets/Escritorio Costa.png" },
  { id: 11, nombre: "Silla de Trabajo Belgrano", descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable.", medidas: "60 x 60 x 90-100 cm", materiales: "Malla técnica, tejido reciclado", precio: 420000, imagen: "../assets/Silla de Trabajo Belgrano.png" }
];

// Estado global de la vista
let currentProduct = null;
let currentQuantity = 1;

/**
 * Obtiene la lista completa y enriquecida de productos combinando productos.js y metadatos
 */
function obtenerCatalogoCompleto() {
  const listaBase = (typeof productos !== "undefined" && Array.isArray(productos) && productos.length > 0)
    ? productos
    : PRODUCTOS_FALLBACK;

  return listaBase.map((item) => {
    const meta = PRODUCTOS_METADATOS[item.id] || {};
    return {
      ...item,
      slug: meta.slug || normalizarSlug(item.nombre),
      categoria: meta.categoria || "Colección",
      especificaciones: meta.especificaciones || {
        "Medidas": item.medidas || "Consultar",
        "Materiales": item.materiales || "Madera sostenible"
      },
      enStock: meta.enStock ?? true,
      tiempoEntrega: meta.tiempoEntrega || "Envío en 3 a 5 días hábiles"
    };
  });
}

/**
 * Normaliza un texto para generar un slug comparable
 * @param {string} texto 
 */
function normalizarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Función asíncrona simulada para obtener un producto por ID o slug (async/await)
 * @param {string|number} idParam 
 * @returns {Promise<Object|null>}
 */
function fetchProductoPorId(idParam) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const catalogo = obtenerCatalogoCompleto();
      if (!idParam) {
        // Por defecto producto 1
        resolve(catalogo[0] || null);
        return;
      }

      const idParamStr = String(idParam).trim().toLowerCase();

      // Buscar por ID numérico exacto o por slug
      const encontrado = catalogo.find((p) => 
        String(p.id) === idParamStr ||
        (p.slug && p.slug.toLowerCase() === idParamStr) ||
        normalizarSlug(p.nombre) === idParamStr
      );

      resolve(encontrado || null);
    }, 350); // Simulación de latencia de red
  });
}

/**
 * Inicialización al cargar el DOM
 */
document.addEventListener("DOMContentLoaded", () => {
  initCartCounter();
  cargarDetalleProducto();
  initQuantityControls();
  initAddToCartAction();
});

/**
 * Lee los parámetros de la URL y carga el producto correspondiente
 */
async function cargarDetalleProducto() {
  const urlParams = new URLSearchParams(window.location.search);
  // Si no se especifica ID, por defecto se carga el producto 1 (Aparador Uspallata)
  const productId = urlParams.get("id") || "1";

  const loaderEl = document.getElementById("product-loader");
  const contentEl = document.getElementById("product-content");
  const errorEl = document.getElementById("product-error");

  try {
    if (loaderEl) loaderEl.style.display = "block";
    if (contentEl) contentEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";

    const product = await fetchProductoPorId(productId);

    if (!product) {
      if (loaderEl) loaderEl.style.display = "none";
      if (errorEl) errorEl.style.display = "block";
      return;
    }

    currentProduct = product;
    renderizarDatosProducto(product);
    renderizarProductosRelacionados(product);

    if (loaderEl) loaderEl.style.display = "none";
    if (contentEl) contentEl.style.display = "block";

  } catch (error) {
    console.error("Error al cargar los detalles del producto:", error);
    if (loaderEl) loaderEl.style.display = "none";
    if (errorEl) errorEl.style.display = "block";
  }
}

/**
 * Renderiza todos los elementos del producto en el DOM
 * @param {Object} product 
 */
function renderizarDatosProducto(product) {
  // Título del documento en el navegador
  document.title = `${product.nombre} | Hermanos Jota Mueblería`;

  // Migas de Pan (Breadcrumbs)
  const breadcrumbCurrent = document.getElementById("breadcrumb-current-product");
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.nombre;

  // Imagen Principal
  const mainImg = document.getElementById("product-image");
  if (mainImg) {
    mainImg.src = product.imagen;
    mainImg.alt = product.imagenAlt || product.nombre;
  }

  // Categoría, Título y Descripción
  const categoryEl = document.getElementById("product-category");
  if (categoryEl) categoryEl.textContent = product.categoria;

  const titleEl = document.getElementById("product-title");
  if (titleEl) titleEl.textContent = product.nombre;

  const descEl = document.getElementById("product-description");
  if (descEl) descEl.textContent = product.descripcion;

  // Precio y Cuotas
  const priceEl = document.getElementById("product-price");
  if (priceEl) priceEl.textContent = formatearPrecio(product.precio);

  const installmentsEl = document.getElementById("product-installments");
  if (installmentsEl) {
    const cuota = Math.round(product.precio / 6);
    installmentsEl.textContent = `Hasta 6 cuotas sin interés de ${formatearPrecio(cuota)}`;
  }

  // Tabla de Especificaciones Técnicas Dinámicas
  renderizarEspecificaciones(product.especificaciones);
}

/**
 * Renderiza dinámicamente la tabla de especificaciones del producto
 * @param {Object} especificaciones 
 */
function renderizarEspecificaciones(especificaciones) {
  const tableBody = document.getElementById("specs-table-body");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  if (!especificaciones || Object.keys(especificaciones).length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="2" class="specs-empty-cell">Sin especificaciones adicionales.</td>';
    tableBody.appendChild(row);
    return;
  }

  Object.entries(especificaciones).forEach(([clave, valor]) => {
    const row = document.createElement("tr");

    const th = document.createElement("th");
    th.scope = "row";
    th.textContent = clave;

    const td = document.createElement("td");
    td.textContent = valor;

    row.appendChild(th);
    row.appendChild(td);
    tableBody.appendChild(row);
  });
}

/**
 * Renderiza piezas recomendadas de la colección
 * @param {Object} currentProduct 
 */
function renderizarProductosRelacionados(currentProduct) {
  const relatedGrid = document.getElementById("related-products-grid");
  if (!relatedGrid) return;

  relatedGrid.innerHTML = "";
  const catalogo = obtenerCatalogoCompleto();

  // Filtrar el producto actual y priorizar misma categoría
  const otros = catalogo.filter((p) => String(p.id) !== String(currentProduct.id));
  const seleccionados = otros
    .sort((a, b) => (a.categoria === currentProduct.categoria ? -1 : 1))
    .slice(0, 3);

  seleccionados.forEach((prod) => {
    const card = document.createElement("article");
    card.className = "related-card";

    card.innerHTML = `
      <div class="related-card-image-wrap">
        <img src="${prod.imagen}" alt="${prod.nombre}" class="related-card-image">
      </div>
      <div class="related-card-body">
        <span class="related-card-category">${prod.categoria}</span>
        <h3 class="related-card-title">
          <a href="producto.html?id=${prod.id}">${prod.nombre}</a>
        </h3>
        <p class="related-card-price">${formatearPrecio(prod.precio)}</p>
        <a href="producto.html?id=${prod.id}" class="related-card-link">Ver Detalle</a>
      </div>
    `;

    relatedGrid.appendChild(card);
  });
}

/**
 * Control del selector de cantidad (+ / -)
 */
function initQuantityControls() {
  const decreaseBtn = document.getElementById("qty-decrease");
  const increaseBtn = document.getElementById("qty-increase");
  const qtyInput = document.getElementById("qty-input");

  if (!decreaseBtn || !increaseBtn || !qtyInput) return;

  const updateQuantityState = (newVal) => {
    currentQuantity = Math.max(1, Math.min(10, newVal));
    qtyInput.value = currentQuantity;
    decreaseBtn.disabled = currentQuantity <= 1;
    increaseBtn.disabled = currentQuantity >= 10;
  };

  decreaseBtn.addEventListener("click", () => {
    updateQuantityState(currentQuantity - 1);
  });

  increaseBtn.addEventListener("click", () => {
    updateQuantityState(currentQuantity + 1);
  });

  qtyInput.addEventListener("change", (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) {
      updateQuantityState(1);
    } else if (val > 10) {
      updateQuantityState(10);
    } else {
      updateQuantityState(val);
    }
  });
}

/**
 * Acción del botón Añadir al Carrito
 */
function initAddToCartAction() {
  const addBtn = document.getElementById("add-to-cart-btn");
  if (!addBtn) return;

  addBtn.addEventListener("click", () => {
    if (!currentProduct) return;

    agregarProductoAlCarrito(currentProduct, currentQuantity);
    actualizarBadgeCarrito();
    mostrarToastAlerta(currentProduct.nombre, currentQuantity);
  });
}

// ==========================================================================
// GESTIÓN DE CARRITO (LocalStorage)
// ==========================================================================

const CART_STORAGE_KEY = "hermanos_jota_cart";

/**
 * Obtiene los items del carrito desde localStorage
 * @returns {Array}
 */
function getCartItems() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error al leer el carrito de localStorage:", e);
    return [];
  }
}

/**
 * Guarda los items del carrito en localStorage
 * @param {Array} items 
 */
function saveCartItems(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Error al guardar en el carrito:", e);
  }
}

/**
 * Agrega un producto con cantidad al carrito
 * @param {Object} product 
 * @param {number} quantity 
 */
function agregarProductoAlCarrito(product, quantity) {
  const cart = getCartItems();
  const existingItemIndex = cart.findIndex((item) => String(item.id) === String(product.id));

  if (existingItemIndex > -1) {
    cart[existingItemIndex].cantidad += quantity;
  } else {
    cart.push({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      cantidad: quantity
    });
  }

  saveCartItems(cart);
}

/**
 * Inicializa el contador del carrito en el header
 */
function initCartCounter() {
  actualizarBadgeCarrito();
}

/**
 * Actualiza el número visible en el badge del carrito en el header
 */
function actualizarBadgeCarrito() {
  const badge = document.getElementById("cart-count-badge");
  if (!badge) return;

  const cart = getCartItems();
  const totalCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  badge.textContent = totalCount;

  // Animación de pulso
  badge.classList.remove("bump");
  void badge.offsetWidth;
  badge.classList.add("bump");
  if (typeof window.actualizarNavbarCarrito === "function") {
    window.actualizarNavbarCarrito();
  }
}

// ==========================================================================
// COMPONENTE TOAST / ALERTA FLOTANTE
// ==========================================================================

let toastTimeout = null;

/**
 * Muestra una alerta toast flotante estilizada con la identidad de marca
 * @param {string} nombreProducto 
 * @param {number} cantidad 
 */
function mostrarToastAlerta(nombreProducto, cantidad) {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  toastContainer.innerHTML = "";
  if (toastTimeout) clearTimeout(toastTimeout);

  const toast = document.createElement("div");
  toast.className = "custom-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");

  const qtyText = cantidad > 1 ? `${cantidad} unidades de ` : "";

  toast.innerHTML = `
    <div class="toast-icon-wrap">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <div class="toast-body">
      <p class="toast-title">¡Añadido al carrito!</p>
      <p class="toast-msg">Se agregó ${qtyText}<strong>${nombreProducto}</strong>.</p>
    </div>
    <button class="toast-close-btn" aria-label="Cerrar notificación">&times;</button>
  `;

  const closeBtn = toast.querySelector(".toast-close-btn");
  closeBtn.addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  });

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}

/**
 * Formatea un número a formato de moneda en pesos argentinos
 * @param {number} valor 
 * @returns {string} Formateado como "$ 850.000"
 */
function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(valor);
}
