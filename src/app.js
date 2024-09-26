
//import { Server } from "socket.io";
//import ProductManager from "./controllers/product-manager.js";
//import path from 'path';
import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import usuarioRouter from "./routes/usuario.router.js";
import './database.js';
import ProductModel from "./dao/models/product.model.js";

const app = express();
const PUERTO = 8000;
//const manager = new ProductManager("./src/data/productos.json");

//CONFIGURACION EXPRESS-HANDLEBARS
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//MIDDLEWARE
app.use(express.json());
app.use(express.static("./src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport(); 
app.use(passport.initialize());

//RUTAS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/sessions", usuarioRouter); 

const httpServer = app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8000");
});


//CONEXION SOCKET.IO
/* const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Un cliente se conectó");

    socket.emit("productos", await manager.getProducts());

    socket.on("eliminarProducto", async (id) => {
        await manager.borrarProducto(id);

        const productosRestantes = await manager.getProducts();
        io.sockets.emit("productos", productosRestantes);

        if (productosRestantes.length === 0) {
            socket.emit("noProductos", true);
        }
    });
    socket.on("agregarProducto", async (nuevoProducto) => {
        try {
            await manager.addProduct(nuevoProducto);
            io.sockets.emit("productos", await manager.getProducts());
        } catch (error) {
            console.log("Error al agregar el producto:", error);
        }
    });

    socket.on("recargarProductos", async () => {
        const stockPath = path.join("./src/data/stock.json");
        await manager.cargarProductosDesdeStock(stockPath);
        io.sockets.emit("productos", await manager.getProducts());
    });
}); */
