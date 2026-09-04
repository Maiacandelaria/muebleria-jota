const destacadosInicio = [
  { id: 1, nombre: 'Aparador Uspallata', categoria: 'Almacenamiento', descripcion: 'Nogal sostenible y herrajes en acabado latón.', precio: 850000, imagen: './assets/Aparador Uspallata.png' },
  { id: 4, nombre: 'Sillón Copacabana', categoria: 'Asientos', descripcion: 'Cuero cognac y base giratoria de acero.', precio: 750000, imagen: './assets/Sillón Copacabana.png' },
  { id: 7, nombre: 'Sofá Patagonia', categoria: 'Asientos', descripcion: 'Lino natural y estructura de madera certificada.', precio: 1200000, imagen: './assets/Sofá Patagonia.png' },
  { id: 8, nombre: 'Mesa Comedor Pampa', categoria: 'Mesas', descripcion: 'Roble macizo extensible para compartir.', precio: 950000, imagen: './assets/Mesa Comedor Pampa.png' }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('featured-products-grid');
  if (!grid) return;
  grid.innerHTML = destacadosInicio.map((producto) => `
    <article class="featured-card">
      <div class="featured-image-wrap"><img src="${producto.imagen}" alt="${producto.nombre}"></div>
      <div class="featured-card-body">
        <span class="featured-category">${producto.categoria}</span>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="featured-price">${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(producto.precio)}</p>
        <a href="./templates/producto.html?id=${producto.id}">Ver detalle</a>
      </div>
    </article>
  `).join('');
});
