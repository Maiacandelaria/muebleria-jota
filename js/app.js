const catalogoMuebles = [
  {
    id: 1,
    nombre: 'Mesa de Centro Araucaria',
    precio: 185000,
    imagenURL: './img/mesa-centro-araucaria.png',
    etiquetas: ['Vidrio', 'Nogal', 'Sala'],
  },
  {
    id: 2,
    nombre: 'Mesa Comedor Pampa',
    precio: 520000,
    imagenURL: './img/mesa-comedor-pampa.png',
    etiquetas: ['Nogal', 'Comedor', 'Artesanal'],
  },
  {
    id: 3,
    nombre: 'Sillas Córdoba',
    precio: 95000,
    imagenURL: './img/sillas-cordoba.png',
    etiquetas: ['Nórdico', 'Comedor', 'Tapizado'],
  },
  {
    id: 4,
    nombre: 'Mesa de Noche Aconcagua',
    precio: 145000,
    imagenURL: './img/mesa-noche-aconcagua.png',
    etiquetas: ['Flotante', 'Nogal', 'Dormitorio'],
  },
  {
    id: 5,
    nombre: 'Sofá Patagonia',
    precio: 680000,
    imagenURL: './img/sofa-patagonia.png',
    etiquetas: ['3 cuerpos', 'Lino', 'Sala'],
  },
  {
    id: 6,
    nombre: 'Sillón Copacabana',
    precio: 410000,
    imagenURL: './img/sillon-copacabana.png',
    etiquetas: ['Cuero', 'Vintage', 'Sala'],
  },
  {
    id: 7,
    nombre: 'Biblioteca Recoleta',
    precio: 395000,
    imagenURL: './img/biblioteca-recoleta.png',
    etiquetas: ['Modular', 'Nogal', 'Estudio'],
  },
  {
    id: 8,
    nombre: 'Silla de Trabajo Belgrano',
    precio: 275000,
    imagenURL: './img/silla-trabajo-belgrano.png',
    etiquetas: ['Ergonómica', 'Madera', 'Oficina'],
  },
  {
    id: 9,
    nombre: 'Butaca Mendoza',
    precio: 230000,
    imagenURL: './img/butaca-mendoza.png',
    etiquetas: ['Terciopelo', 'Nórdico', 'Lectura'],
  },
  {
    id: 10,
    nombre: 'Aparador Uspallata',
    precio: 465000,
    imagenURL: './img/aparador-uspallata.png',
    etiquetas: ['Mármol', 'Rejilla', 'Comedor'],
  },
  {
    id: 11,
    nombre: 'Escritorio Costa',
    precio: 340000,
    imagenURL: './img/escritorio-costa.png',
    etiquetas: ['Nogal', 'Cajonera', 'Oficina'],
  },
];

const productContainer = document.getElementById('product-container');

catalogoMuebles.forEach((producto) => {
  const card = document.createElement('article');
  card.classList.add('product-card');

  const imagen = document.createElement('img');
  imagen.src = producto.imagenURL;
  imagen.alt = producto.nombre;

  const titulo = document.createElement('h3');
  titulo.textContent = producto.nombre;

  const precio = document.createElement('p');
  precio.classList.add('precio');
  precio.textContent = `$${producto.precio.toLocaleString('es-AR')}`;

  const listaEtiquetas = document.createElement('ul');
  listaEtiquetas.classList.add('etiquetas');
  listaEtiquetas.setAttribute('aria-label', 'Características');

  producto.etiquetas.forEach((etiqueta) => {
    const item = document.createElement('li');
    item.textContent = etiqueta;
    listaEtiquetas.appendChild(item);
  });

  card.appendChild(imagen);
  card.appendChild(titulo);
  card.appendChild(precio);
  card.appendChild(listaEtiquetas);
  productContainer.appendChild(card);
});

const btnFavoritos = document.querySelector('#btn-favoritos');

btnFavoritos.addEventListener('click', () => {
  btnFavoritos.classList.toggle('favorito');

  if (btnFavoritos.classList.contains('favorito')) {
    btnFavoritos.textContent = '⭐ Quitar de Favoritos';
  } else {
    btnFavoritos.textContent = '❤️ Añadir a Favoritos';
  }
});

const preferenciasUsuario = {
  tema: 'oscuro',
  idioma: 'es',
  notificaciones: true,
};

const btnGuardar = document.getElementById('btn-guardar');
const btnCargar = document.getElementById('btn-cargar');

btnGuardar.addEventListener('click', () => {
  const preferenciasJSON = JSON.stringify(preferenciasUsuario);
  localStorage.setItem('misPreferencias', preferenciasJSON);
  alert('Preferencias guardadas');
});

btnCargar.addEventListener('click', () => {
  const preferenciasJSON = localStorage.getItem('misPreferencias');

  if (preferenciasJSON) {
    const preferenciasRecuperadas = JSON.parse(preferenciasJSON);
    console.log(preferenciasRecuperadas);
  } else {
    console.log('No hay preferencias guardadas');
  }
});

const formBuscarUsuario = document.getElementById('form-buscar-usuario');
const resultadoUsuario = document.getElementById('resultado-usuario');

formBuscarUsuario.addEventListener('submit', (event) => {
  event.preventDefault();
  buscarUsuario();
});

async function buscarUsuario() {
  const inputUsuario = document.getElementById('input-usuario');
  const nombreUsuario = inputUsuario.value.trim();
  resultadoUsuario.textContent = '';

  if (!nombreUsuario) {
    resultadoUsuario.textContent = 'Usuario no encontrado';
    return;
  }

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?username=${encodeURIComponent(nombreUsuario)}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const usuario = data[0];
      resultadoUsuario.innerHTML = `
        <p><strong>Nombre:</strong> ${usuario.name}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Ciudad:</strong> ${usuario.address.city}</p>
      `;
    } else {
      resultadoUsuario.textContent = 'Usuario no encontrado';
    }
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    resultadoUsuario.textContent = 'Usuario no encontrado';
  }
}

function cargarGaleria() {
  const galeriaContainer = document.getElementById('galeria-fotos');

  catalogoMuebles.forEach((producto) => {
    const imagen = document.createElement('img');
    imagen.src = producto.imagenURL;
    imagen.alt = producto.nombre;
    imagen.classList.add('galeria-img');

    imagen.addEventListener('click', () => {
      alert(producto.nombre);
    });

    galeriaContainer.appendChild(imagen);
  });
}

document.addEventListener('DOMContentLoaded', cargarGaleria);
