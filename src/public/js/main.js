const socket = io();

socket.on("productos", (data) => {

    renderProductos(data);
})
//esto modifique
socket.on("noProductos", () => {
    document.getElementById("recargarProductos").style.display = "block";
});

document.getElementById("recargarProductos").addEventListener("click", () => {
    socket.emit("recargarProductos");
    document.getElementById("recargarProductos").style.display = "none";
});
//hasta aca

//RENDERIZAR PRODUCTOS DE PRODUCTOS.JSON
const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    // Agrega una clase al contenedor de todos los productos
    contenedorProductos.classList.add("productosContenedor");
    contenedorProductos.innerHTML = "";

    productos.forEach(item => {
        const card = document.createElement("div");
        //aca le agrego la clase para poder modificar el estilo
        card.classList.add("cardProducto");
        card.innerHTML = `
                        <div class="cardContent">
                            <p>ID: ${item.id}</p>
                            <p class="cardTitle">Título: ${item.title}</p>
                            <img src="${item.img}" alt="${item.title}" class="cardImg">
                            <p class="cardDescription">Descripción: ${item.description}</p>
                            <p class="cardPrice">Precio: ${item.price}</p>
                             <div class="cardFooter">
                                <p class="cardStock">Stock: ${item.stock}</p>
                                <p class="cardCategory">Categoría: ${item.category}</p>
                            </div>
                        </div>
                        <button class="cardButton"> Eliminar </button>
                        `

        contenedorProductos.appendChild(card);

        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id);
        })
    })
}

const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id);
}

//AGREGAR PRODUCTO
document.getElementById("agregarProductoForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const nuevoProducto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value
    };

    socket.emit("agregarProducto", nuevoProducto);

    document.getElementById("agregarProductoForm").reset();
});

socket.on("productos", (data) => {
    renderProductos(data);
});
