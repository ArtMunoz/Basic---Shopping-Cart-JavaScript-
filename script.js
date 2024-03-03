document.addEventListener('DOMContentLoaded', () => {
    // Productos disponibles (podrían ser cargados desde una base de datos o una API)
    const productos = [
        { id: 1, nombre: 'Producto 1', precio: 10, cantidadDisponible: 5 },
        { id: 2, nombre: 'Producto 2', precio: 20, cantidadDisponible: 3 },
        { id: 3, nombre: 'Producto 3', precio: 15, cantidadDisponible: 7 }
    ];

    // Inicializar carrito de compras
    let carrito = [];

    // Elementos del DOM
    const productosContainer = document.getElementById('productos');
    const carritoLista = document.getElementById('carrito-lista');
    const carritoTotal = document.getElementById('carrito-total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const confirmarCompraBtn = document.getElementById('confirmar-compra');

    // Función para renderizar productos en la página
    function renderizarProductos() {
        productosContainer.innerHTML = '';

        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
                <p>${producto.nombre} - Precio: $${producto.precio} - Disponibles: ${producto.cantidadDisponible}</p>
                <input type="number" min="1" max="${producto.cantidadDisponible}" id="cantidad-${producto.id}" placeholder="Cantidad">
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            `;
            productosContainer.appendChild(productoDiv);
        });
    }

    // Función para renderizar el carrito de compras
    function renderizarCarrito() {
        carritoLista.innerHTML = '';

        carrito.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('carrito-item');
            const subtotal = item.cantidad * item.precio;
            itemDiv.innerHTML = `
                <p>${item.nombre} - Cantidad: ${item.cantidad} - Precio Unitario: $${item.precio} - Subtotal: $${subtotal}</p>
                <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            `;
            carritoLista.appendChild(itemDiv);
        });

        // Calcular el total del carrito
        const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        carritoTotal.innerHTML = `Total: $${total.toFixed(2)}`;
    }

    // Función para agregar un producto al carrito
    window.agregarAlCarrito = function(id) {
        const cantidadInput = document.getElementById(`cantidad-${id}`);
        const cantidad = parseInt(cantidadInput.value);
        const producto = productos.find(item => item.id === id);

        if (cantidad && cantidad <= producto.cantidadDisponible) {
            const productoEnCarrito = carrito.find(item => item.id === id);

            if (productoEnCarrito) {
                productoEnCarrito.cantidad += cantidad;
            } else {
                carrito.push({
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad
                });
            }

            // Actualizar la visualización del carrito
            renderizarCarrito();
        } else {
            alert('Cantidad no válida o no disponible');
        }
    }

    // Función para eliminar un producto del carrito
    window.eliminarDelCarrito = function(id) {
        carrito = carrito.filter(item => item.id !== id);
        renderizarCarrito();
    }

    // Vaciar carrito de compras
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = [];
        renderizarCarrito();
    });

    // Confirmar compra
    confirmarCompraBtn.addEventListener('click', () => {
        // Aquí podrías implementar la lógica para generar la factura
        alert('Compra confirmada');
        // Por ejemplo, podrías limpiar el carrito y recargar los productos disponibles
        carrito = [];
        renderizarCarrito();
        renderizarProductos();
    });

    // Inicializar la aplicación renderizando los productos disponibles
    renderizarProductos();
});
