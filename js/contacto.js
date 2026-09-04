const CLAVE_CARRITO = "carritoHermanosJota";

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  inicializarFormularioContacto();
  inicializarMenuMobile();
  inicializarModalExito();
});

function inicializarMenuMobile() {
  const boton = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-principal");
  if (!boton || !nav) return;

  boton.addEventListener("click", () => {
    const abierto = nav.classList.toggle("nav-principal--abierta");
    boton.setAttribute("aria-expanded", abierto ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-principal--abierta");
      boton.setAttribute("aria-expanded", "false");
    });
  });
}

function obtenerCarrito() {
  try {
    const data = localStorage.getItem(CLAVE_CARRITO);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("No se pudo leer el carrito:", error);
    return [];
  }
}

function contarItemsCarrito() {
  const carrito = obtenerCarrito();
  return carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
}

function actualizarContadorCarrito() {
  const contadorEl = document.getElementById("carrito-contador");
  if (!contadorEl) return;
  contadorEl.textContent = contarItemsCarrito();
}

function inicializarFormularioContacto() {
  const form = document.getElementById("form-contacto");
  if (!form) return;

  const campos = {
    nombre: document.getElementById("nombre"),
    email: document.getElementById("email"),
    mensaje: document.getElementById("mensaje"),
  };

  Object.keys(campos).forEach((clave) => {
    campos[clave].addEventListener("blur", () =>
      validarCampo(clave, campos[clave]),
    );
  });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombreValido = validarCampo("nombre", campos.nombre);
    const emailValido = validarCampo("email", campos.email);
    const mensajeValido = validarCampo("mensaje", campos.mensaje);

    if (!(nombreValido && emailValido && mensajeValido)) {
      const primerError = form.querySelector(
        ".campo.con-error input, .campo.con-error textarea",
      );
      if (primerError) primerError.focus();
      return;
    }

    mostrarModalExito();
    form.reset();
    Object.values(campos).forEach((input) => limpiarError(input));
  });
}

function validarCampo(tipo, input) {
  const valor = input.value.trim();
  let mensaje = "";

  switch (tipo) {
    case "nombre":
      if (valor.length === 0) {
        mensaje = "Contanos tu nombre para poder saludarte.";
      } else if (valor.length < 2) {
        mensaje = "El nombre es demasiado corto.";
      }
      break;

    case "email":
      if (valor.length === 0) {
        mensaje = "Necesitamos un email para responderte.";
      } else if (!esEmailValido(valor)) {
        mensaje = "Revisá el formato del email (ej: nombre@dominio.com).";
      }
      break;

    case "mensaje":
      if (valor.length === 0) {
        mensaje = "Escribinos qué mueble estás buscando o tu consulta.";
      } else if (valor.length < 10) {
        mensaje = "Contanos un poco más, así podemos ayudarte mejor.";
      }
      break;
  }

  if (mensaje) {
    mostrarError(input, mensaje);
    return false;
  }

  limpiarError(input);
  return true;
}

function esEmailValido(valor) {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(valor);
}

function mostrarError(input, mensaje) {
  const campo = input.closest(".campo");
  const errorEl = document.getElementById(`error-${input.id}`);
  if (campo) campo.classList.add("con-error");
  if (errorEl) errorEl.textContent = mensaje;
}

function limpiarError(input) {
  const campo = input.closest(".campo");
  const errorEl = document.getElementById(`error-${input.id}`);
  if (campo) campo.classList.remove("con-error");
  if (errorEl) errorEl.textContent = "";
}

function inicializarModalExito() {
  const overlay = document.getElementById("modal-exito");
  const botonCerrar = document.getElementById("modal-cerrar");
  if (!overlay || !botonCerrar) return;

  botonCerrar.addEventListener("click", cerrarModalExito);

  overlay.addEventListener("click", (evento) => {
    if (evento.target === overlay) cerrarModalExito();
  });

  document.addEventListener("keydown", (evento) => {
    if (
      evento.key === "Escape" &&
      overlay.classList.contains("modal-overlay--abierto")
    ) {
      cerrarModalExito();
    }
  });
}

function mostrarModalExito() {
  const overlay = document.getElementById("modal-exito");
  if (!overlay) return;
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add("modal-overlay--abierto"));
}

function cerrarModalExito() {
  const overlay = document.getElementById("modal-exito");
  if (!overlay) return;
  overlay.classList.remove("modal-overlay--abierto");
  window.setTimeout(() => {
    overlay.hidden = true;
  }, 200);
}