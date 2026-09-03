// 1. Array de objetos con todos los muebles del catálogo oficial
const productos = [
    {
        id: 1,
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón.",
        medidas: "180 x 45 x 75 cm",
        materiales: "Nogal macizo FSC®, herrajes de latón",
        precio: 850000, 
        imagen: "../assets/Aparador Uspallata.png" 
    },
    {
        id: 2,
        nombre: "Biblioteca Recoleta",
        descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro.",
        medidas: "100 x 35 x 200 cm",
        materiales: "Estructura de acero, estantes de roble",
        precio: 620000, 
        imagen: "../assets/Biblioteca Recoleta.png"
    },
    {
        id: 3,
        nombre: "Butaca Mendoza",
        descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú.",
        medidas: "80 x 75 x 85 cm",
        materiales: "Guatambú macizo, tela bouclé",
        precio: 480000, 
        imagen: "../assets/Butaca Mendoza.png"
    },
    {
        id: 4,
        nombre: "Sillón Copacabana",
        descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna.",
        medidas: "90 x 85 x 95 cm",
        materiales: "Cuero curtido vegetal, acero pintado",
        precio: 750000, 
        imagen: "../assets/Sillón Copacabana.png"
    },
    {
        id: 5,
        nombre: "Mesa de Centro Araucaria",
        descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal.",
        medidas: "90 x 90 x 45 cm",
        materiales: "Sobre de mármol Patagonia, patas de nogal",
        precio: 390000, 
        imagen: "../assets/Mesa de Centro Araucaria.png"
    },
    {
        id: 6,
        nombre: "Mesa de Noche Aconcagua",
        descripcion: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®.",
        medidas: "45 x 35 x 60 cm",
        materiales: "Roble macizo FSC®, herrajes soft-close",
        precio: 280000, 
        imagen: "../assets/Mesa de Noche Aconcagua.png"
    },
    {
        id: 7,
        nombre: "Sofá Patagonia",
        descripcion: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera.",
        medidas: "220 x 90 x 80 cm",
        materiales: "Madera de eucalipto certificada FSC®, Lino natural",
        precio: 1200000, 
        imagen: "../assets/Sofá Patagonia.png"
    },
    {
        id: 8,
        nombre: "Mesa Comedor Pampa",
        descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave.",
        medidas: "160-240 x 90 x 75 cm",
        materiales: "Roble macizo FSC®, mecanismo alemán",
        precio: 950000, 
        imagen: "../assets/Mesa Comedor Pampa.png"
    },
    {
        id: 9,
        nombre: "Sillas Córdoba",
        descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal.",
        medidas: "45 x 52 x 80 cm",
        materiales: "Contrachapado nogal, tubo de acero",
        precio: 340000, 
        imagen: "../assets/Sillas Córdoba.png"
    },
    {
        id: 10,
        nombre: "Escritorio Costa",
        descripcion: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado.",
        medidas: "120 x 60 x 75 cm",
        materiales: "Bambú laminado, herrajes ocultos",
        precio: 510000, 
        imagen: "../assets/Escritorio Costa.png"
    },
    {
        id: 11,
        nombre: "Silla de Trabajo Belgrano",
        descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable.",
        medidas: "60 x 60 x 90-100 cm",
        materiales: "Malla técnica, tejido reciclado",
        precio: 420000, 
        imagen: "../assets/Silla de Trabajo Belgrano.png"
    }
];

// 2. Función para renderizar las tarjetas en el DOM
function renderizarProductos(lista) {
    const contenedor = document.getElementById("grid-productos");
    contenedor.innerHTML = ""; // Limpiamos el contenedor antes de inyectar

    if (lista.length === 0) {
        contenedor.innerHTML = `<p class="sin-resultados">No se encontraron productos que coincidan con la búsqueda.</p>`;
        return;
    }

    lista.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        // Formateamos el precio a moneda argentina (ARS)
        const precioFormateado = producto.precio.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0
        });

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <p class="producto-precio">${precioFormateado}</p>
                <a href="producto.html?id=${producto.id}" class="btn-detalle">Ver detalle</a>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });
}

// 3. Inicialización y evento de búsqueda (Bonus requerimiento funcional)
document.addEventListener("DOMContentLoaded", () => {
    // Carga inicial de todos los productos
    renderizarProductos(productos);

    // Lógica del buscador en tiempo real
    const inputBusqueda = document.getElementById("input-busqueda");
    if (inputBusqueda) {
        inputBusqueda.addEventListener("input", (e) => {
            const textoBusqueda = e.target.value.toLowerCase().trim();
            const productosFiltrados = productos.filter(p => 
                p.nombre.toLowerCase().includes(textoBusqueda) ||
                p.descripcion.toLowerCase().includes(textoBusqueda)
            );
            renderizarProductos(productosFiltrados);
        });
    }
});