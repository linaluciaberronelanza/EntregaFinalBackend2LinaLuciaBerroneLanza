import express from "express";
import ProductManager from "../dao/db/product-manager-db.js";

const router = express.Router();
const manager = new ProductManager();

/*
router.get("/", async (req, res) => {

    let limit = req.query.limit;

    try {
        const arrayProductos = await manager.getProducts();
        if (limit) {
            res.send(arrayProductos.slice(0, limit));
        } else {
            res.send(arrayProductos);
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
}); 
*/

router.get("/", async (req, res) => {
    const arrayProductos = await manager.getProducts();
    res.send(arrayProductos);
})


router.get("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {
        const producto = await manager.getProductById(id);
        if (!producto) {
            res.status(404).send("Producto no encontrado");
        } else {
            res.json(producto);
        }
    } catch (error) {
        res.status(500).send("Error al buscar el producto");
    }
});

router.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    console.log("Nuevo producto:", nuevoProducto); // Agrega esta línea para depuración

    try {
        await manager.addProduct(nuevoProducto);
        res.status(201).send({ message: "Producto agregado exitosamente !!" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    const productoActualizable = req.body;
    const id = req.params.pid;

    try {
        const productoActualizado = await manager.actualizarProducto(id, productoActualizable);
        if (productoActualizado) {
            res.send({ message: 'Producto actualizado exitosamente', producto: productoActualizado });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
});


router.delete("/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
        const resultado = await manager.borrarProducto(id);
        if (resultado) {
            res.send({ message: "Producto eliminado exitosamente" });
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});


export default router;