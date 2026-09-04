/**
 * MUEBLERÍA HERMANOS JOTA - ALIAS DETALLE.JS
 * Este archivo asegura compatibilidad con cualquier referencia a detalle.js
 */

// Si producto.js no fue cargado previamente, cargamos la misma lógica
if (typeof cargarDetalleProducto === "undefined") {
  const script = document.createElement("script");
  script.src = "../js/producto.js";
  document.head.appendChild(script);
}
