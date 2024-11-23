

const productos = [
  {
    id:  1,
    nombre: `producto 1`,
    precio: 130000,
    imagen: "./imagenes/Escalera.jpeg"
  },
  {
    id:  2,
    nombre: `producto 2`,
    precio: 44000,
    imagen: "./imagenes/Llave Jardin.jpeg"
  },
  {
    id:  3,
    nombre: `producto 3`,
    precio: 285000,
    imagen: "./imagenes/Carreta Herragro.jpeg"
  },
  {
    id:  4,
    nombre: `producto 4`,
    precio: 285000,
    imagen: "./imagenes/Cinta Malla.jpeg"
  },
  {
    id:  5,
    nombre: `producto 5`,
    precio: 1000,
    imagen: "./imagenes/Caja Electrica 2x4.jpeg"
  },
  {
    id:  6,
    nombre: `producto 6`,
    precio: 8500,
    imagen: "./imagenes/Llave de paso.jpeg"
  },
  {
    id:  7,
    nombre: `producto 7`,
    precio: 8000,
    imagen: "./imagenes/Escuadra.jpeg"
  },
  {
    id:  8,
    nombre: `producto 8`,
    precio: 1000,
    imagen: "./imagenes/Chazo metalico.jpeg"
  },
  {
    id:  9,
    nombre: `producto 9`,
    precio: 8000,
    imagen: "./imagenes/Espatula metalica.jpeg"
  },
  {
    id:  10,
    nombre: `producto 10`,
    precio: 12000,
    imagen: "./imagenes/Machete.jpeg"
  },
  {
    id:  11,
    nombre: `producto 11`,
    precio: 25000,
    imagen: "./imagenes/Martillo.jpeg"
  },
  {
    id:  12,
    nombre: `producto 12`,
    precio: 11000,
    imagen: "./imagenes/Llave Peston.jpeg"
  },
  {
    id:  13,
    nombre: `producto 13`,
    precio: 1000,
    imagen: "./imagenes/Conector Manguera.jpeg"
  },
  {
    id:  14,
    nombre: `producto 14`,
    precio: 49000,
    imagen: "./imagenes/Eternit.jpeg"
  },
  {
    id:  15,
    nombre: `producto 15`,
    precio: 120000,
    imagen: "./imagenes/Cinta tapa goteras.jpeg"
  },
  {
    id:  16,
    nombre: `producto 16`,
    precio: 15000,
    imagen: "./imagenes/Lampara led 9w.jpeg"
  },
  {
    id:  17,
    nombre: `producto 17`,
    precio: 100,
    imagen: "./imagenes/Tornillo driwall.jpeg"
  },
  {
    id:  18,
    nombre: `producto 18`,
    precio: 200000,
    imagen: "./imagenes/Baño Sanitario.jpeg"
  },
  {
    id:  19,
    nombre: `producto 19`,
    precio: 98000,
    imagen: "./imagenes/Griferia lavamanos mezclador.jpeg"
  },
  {
    id:  20,
    nombre: `producto 20`,
    precio: 160000,
    imagen: "./imagenes/Manguera Jardin.jpeg"
  },
  {
    id: 21,
    nombre: `producto 21`,
    precio: 12000,
    imagen: "./imagenes/Palustre.jpeg"
  },
  {
    id:  22,
    nombre: `producto 22`,
    precio: 8500,
    imagen: "./imagenes/Metro.jpeg"
  },
  {
    id:  23,
    nombre: `producto 23`,
    precio: 6000,
    imagen: "./imagenes/Toma corriente.jpeg"
  },
  {
    id:  24,
    nombre: `producto 24`,
    precio: 2900,
    imagen: "./imagenes/Sifon sanitario.jpeg"
  },
  {
    id:  25,
    nombre: `producto 25`,
    precio: 2500,
    imagen: "./imagenes/Clavija macho.jpeg"
  },





  
  
]


let carrito = [];
const productoscontainer = document.getElementById("productos-container");

function renderProductos() {
  const fragment = document.createDocumentFragment();
  productos.forEach(producto => {

    const colDiv = document.createElement("div");
    colDiv.className = "col-12 col-md-6 col-lg-4 col-xl-2 mb-4";

    colDiv.innerHTML = `
      <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">precio: $${producto.precio}</p>
          <input type="number" min="1" value="1" class="form-control mb-2 product-quantity" data-id="${producto.id}">
          <button class="btn btn-primary w-100" data-id="${producto.id}">agregar al carrito</button>
        </div>
      </div>`;
    fragment.appendChild(colDiv);
  });
  productoscontainer.appendChild(fragment);
}

productoscontainer.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const productoId = parseInt(e.target.dataset.id);
    const quantityInput = document.querySelector(`.product-quantity[data-id="${productoId}"]`);
    const cantidad = parseInt(quantityInput.value);
    agregarAlCarrito(productoId, cantidad);
  }
});

function agregarAlCarrito(productoId, cantidad) {
  const producto = productos.find(p => p.id === productoId);
  const productoEnCarrito = carrito.find(p => p.id === productoId);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoContainer = document.getElementById("carrito-container");
  carritoContainer.innerHTML = carrito.map(producto => `
    <div class="carrito-item d-flex justify-content-between align-items-center mb-2">
      <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
      <div>
        <button onclick="cambiarCantidad(${producto.id}, 1)" class="btn btn-sm btn-secondary">+</button>
        <button onclick="cambiarCantidad(${producto.id}, -1)" class="btn btn-sm btn-secondary">-</button>
        <button onclick="eliminarDelCarrito(${producto.id})" class="btn btn-danger btn-sm">eliminar</button>
      </div>
    </div>`).join("");
  
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  document.getElementById("carrito-total").innerText = `Total: $${total}`;
}

function cambiarCantidad(productoId, cambio) {
  const producto = carrito.find(p => p.id === productoId);
  if (!producto) return;

  producto.cantidad += cambio;
  if (producto.cantidad <= 0) {
    eliminarDelCarrito(productoId);
  } else {
    actualizarCarrito();
  }
}

function eliminarDelCarrito(productoId) {
  carrito = carrito.filter(p => p.id !== productoId);
  actualizarCarrito();
}

function finalizarCompra() {
  const carritoModal = bootstrap.Modal.getInstance(document.getElementById("carritoModal"));
  carritoModal.hide();
  const finalizacionModal = new bootstrap.Modal(document.getElementById("finalizacionModal"));
  finalizacionModal.show();
}

function completarPedido() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const direccion = document.getElementById("direccion").value;

  if (!nombre || !email || !direccion) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  alert(`¡Gracias por tu compra, ${nombre}! Te enviaremos un correo de confirmación a ${email}.`);
  carrito = [];
  actualizarCarrito();
  document.getElementById("form-finalizacion").reset();
  const finalizacionModal = bootstrap.Modal.getInstance(document.getElementById("finalizacionModal"));
  finalizacionModal.hide();
}

renderProductos();
