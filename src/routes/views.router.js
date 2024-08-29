import express from "express";
import ProductManager from "../dao/db/product-manager-db.js";
import ProductModel from "../dao/models/product.model.js";

const router = express.Router();
const manager = new ProductManager("");

/* 
//METODO PARA OBTENER PRODUCTOS SIN EL PAGINATE, LOS RECIBE EN EL HOME Y RENDERIZA HOME.HANDLEBARS
router.get("/products", async (req, res) => {

    const productos = await manager.getProducts();
    res.render("home", { productos });

}); */

router.get("/products", async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = 3;

    try {
        const listadoProductos = await ProductModel.paginate({}, { limit, page });

        const productosResultadoFinal = listadoProductos.docs.map(producto => producto.toObject());

        res.render("home", {
            productos: productosResultadoFinal,
            hasPrevPage: listadoProductos.hasPrevPage,
            hasNextPage: listadoProductos.hasNextPage,
            prevPage: listadoProductos.prevPage,
            nextPage: listadoProductos.nextPage,
            currentPage: listadoProductos.page,
            totalPages: listadoProductos.totalPages
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener productos con paginación");
    }
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
});


export default router;