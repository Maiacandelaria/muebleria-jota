const catalogoMuebles = [
  {
    id: 1,
    nombre: 'Mesa de comedor Roble',
    precio: 450000,
    imagenURL: 'https://via.placeholder.com/150/6b4226/ffffff?text=Mesa',
  },
  {
    id: 2,
    nombre: 'Sofá modular Linen',
    precio: 320000,
    imagenURL: 'https://via.placeholder.com/150/8b6914/ffffff?text=Sofá',
  },
  {
    id: 3,
    nombre: 'Ropero clásico Cedro',
    precio: 280000,
    imagenURL: 'https://via.placeholder.com/150/4a3728/ffffff?text=Ropero',
  },
  {
    id: 4,
    nombre: 'Escritorio ejecutivo Nogal',
    precio: 195000,
    imagenURL: 'https://via.placeholder.com/150/3d2914/ffffff?text=Escritorio',
  },
];

const productContainer = document.getElementById('product-container');

catalogoMuebles.forEach((producto) => {
  const card = document.createElement('div');
  card.classList.add('product-card');

  const titulo = document.createElement('h3');
  titulo.textContent = producto.nombre;

  const precio = document.createElement('p');
  precio.textContent = `$${producto.precio.toLocaleString('es-AR')}`;

  const imagen = document.createElement('img');
  imagen.src = producto.imagenURL;
  imagen.alt = producto.nombre;

  card.appendChild(imagen);
  card.appendChild(titulo);
  card.appendChild(precio);
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

async function cargarGaleria() {
  const galeriaContainer = document.getElementById('galeria-fotos');

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/photos?_limit=12'
    );
    const fotos = await response.json();

    fotos.forEach((foto) => {
      const imagen = document.createElement('img');
      imagen.src = foto.thumbnailUrl;
      imagen.alt = foto.title;
      imagen.classList.add('galeria-img');

      imagen.addEventListener('click', () => {
        alert(foto.title);
      });

      galeriaContainer.appendChild(imagen);
    });
  } catch (error) {
    console.error('Error al cargar la galería:', error);
    galeriaContainer.textContent = 'No se pudo cargar la galería.';
  }
}

document.addEventListener('DOMContentLoaded', cargarGaleria);