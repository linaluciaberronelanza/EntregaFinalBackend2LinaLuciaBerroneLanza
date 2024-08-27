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

            carrito.markModified("products");
            await carrito.save();
            return carrito;
        } catch (error) {
            console.log("Error al agregar un producto: ", error);
            throw error;
        }
    }

    async vaciarCarrito(cartId) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) {
                throw new Error("Carrito no encontrado");
            }
            carrito.products = []; // Vaciar el arreglo de productos
            await carrito.save();
            return carrito;
        } catch (error) {
            console.error("Error al vaciar el carrito:", error.message);
            throw error;
        }
    }


    // Método para obtener el carrito con productos completos usando populate
    async obtenerCarritoConProductos(cartId) {
        try {
            const carrito = await CartModel.findById(cartId).populate("products.product");
            if (!carrito) {
                throw new Error("Carrito no encontrado");
            }
            return carrito;
        } catch (error) {
            console.error("Error al obtener carrito con productos:", error.message);
            throw error;
        }
    }

    // Actualizar el carrito con un arreglo de productos
    async actualizarCarrito(cartId, productos) {
        try {
            const carrito = await this.getCarritoById(cartId);
            carrito.products = productos;
            carrito.markModified('products');
            await carrito.save();
            return carrito;
        } catch (error) {
            console.error("Error al actualizar el carrito:", error.message);
            throw error;
        }
    }

    // Actualizar la cantidad de un producto en el carrito
    async actualizarCantidadProducto(cartId, productId, quantity) {
        try {
            const carrito = await this.getCarritoById(cartId);
            const producto = carrito.products.find(p => p.product.toString() === productId);

            if (producto) {
                producto.quantity = quantity;
                carrito.markModified('products');
                await carrito.save();
            }
            return carrito;
        } catch (error) {
            console.error("Error al actualizar la cantidad del producto:", error.message);
            throw error;
        }
    }

    // Eliminar un producto específico del carrito
    async eliminarProductoDelCarrito(cartId, productId) {
        try {
            const carrito = await this.getCarritoById(cartId);
            carrito.products = carrito.products.filter(p => p.product.toString() !== productId);
            carrito.markModified('products');
            await carrito.save();
            return carrito;
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error.message);
            throw error;
        }
    }
    async obtenerTodosLosCarritos() {
        try {
            const carritos = await CartModel.find();
            return carritos;
        } catch (error) {
            console.error("Error al obtener todos los carritos:", error.message);
            throw error;
        }
    }

}

export default CartManager;