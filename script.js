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
                <p>${item.nombre} - Cantidad: ${item.cantidad} - Precio Unitario: $${item.precio} - Subtotal: $${subtotal.toFixed(2)}</p>
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

    // Función para generar la factura
    function generarFactura() {
        let facturaHTML = '<h2>Factura de Compra</h2>';
        facturaHTML += '<table>';
        facturaHTML += '<tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th><th>Subtotal</th></tr>';

        carrito.forEach(item => {
            const subtotal = item.cantidad * item.precio;
            facturaHTML += `<tr><td>${item.nombre}</td><td>${item.cantidad}</td><td>$${item.precio.toFixed(2)}</td><td>$${subtotal.toFixed(2)}</td></tr>`;
        });

        const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        facturaHTML += `<tr><td colspan="3">Total</td><td>$${total.toFixed(2)}</td></tr>`;
        facturaHTML += '</table>';

        return facturaHTML;
    }

    // Vaciar carrito de compras
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = [];
        renderizarCarrito();
    });

    // Confirmar compra
    confirmarCompraBtn.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('El carrito de compras está vacío. Por favor, agrega productos.');
            return;
        }

        const factura = generarFactura();
        // Mostrar la factura en pantalla
        const facturaContainer = document.createElement('div');
        facturaContainer.classList.add('factura-container');
        facturaContainer.innerHTML = factura;
        document.body.appendChild(facturaContainer);

        // Limpiar el carrito después de confirmar la compra
        carrito = [];
        renderizarCarrito();
    });

    // Inicializar la aplicación renderizando los productos disponibles
    renderizarProductos();
});
