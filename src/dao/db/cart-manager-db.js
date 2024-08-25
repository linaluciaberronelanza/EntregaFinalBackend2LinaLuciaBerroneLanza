import CartModel from "../models/cart.model.js";
class CartManager {
    //Metodo para crear un carrito: 
    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({ products: [] });
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear un nuevo carrito de compras");
        }
    }

    async getCarritoById(carritoId) {
        try {
            const carrito = await CartModel.findById(carritoId);

            if (!carrito) {
                throw new Error("No existe un carrito con ese id");
            }

            return carrito;

        } catch (error) {
            console.log("Error al obtener el carrito por id, vamos a morir");
            throw error;
        }
    }

    async agregarProductoAlCarrito(carritoId, productoId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(carritoId);
            const existeProducto = carrito.products.find(p => p.product.toString() === productoId);

            if (existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({ product: productoId, quantity });
            }

            //Se marca la propiedad "products" como modificada antes de guardar. 
            carrito.markModified("products");
            await carrito.save();
            return carrito;
        } catch (error) {
            console.log("Error al agregar un producto: ", error);
        }
    }
}

export default CartManager;