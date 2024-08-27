import express from "express";
import CartManager from "../dao/db/cart-manager-db.js";


const router = express.Router();
const cartManager = new CartManager();

// Crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

// Obtener todos los carritos
router.get("/", async (req, res) => {
    try {
        const carritos = await cartManager.obtenerTodosLosCarritos();
        res.json(carritos);
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al obtener los carritos" });
    }
});

// Obtener carrito por ID
router.get("/:cid", async (req, res) => {
    const carritoID = req.params.cid;

    try {
        const carritoBuscado = await cartManager.obtenerCarritoConProductos(carritoID);
        res.json(carritoBuscado);
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error del servidor al buscar un carrito" });
    }
});

// Agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const carritoActualizado = await cartManager.agregarProductoAlCarrito(carritoId, productoId, quantity);
        res.json(carritoActualizado);
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al ingresar un producto al carrito" });
    }
});

// Actualizar el carrito con un arreglo de productos
router.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const productosActualizados = req.body.products;

    try {
        const carritoActualizado = await cartManager.actualizarCarrito(cid, productosActualizados);
        res.send({ message: "Carrito actualizado", carrito: carritoActualizado });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

// Actualizar la cantidad de un producto en el carrito
router.put("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const carritoActualizado = await cartManager.actualizarCantidadProducto(cid, pid, quantity);
        res.send({ message: "Cantidad de producto actualizada", carrito: carritoActualizado });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

// Eliminar un producto específico del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const carrito = await cartManager.eliminarProductoDelCarrito(cid, pid);
        res.send({ message: "Producto eliminado del carrito", carrito });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

// Vaciar el carrito
router.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const carritoVaciado = await cartManager.vaciarCarrito(cid);
        res.send({ message: "Carrito vacío", carrito: carritoVaciado });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});



export default router;
