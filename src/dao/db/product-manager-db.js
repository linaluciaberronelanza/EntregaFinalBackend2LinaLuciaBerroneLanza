import ProductModel from "../models/product.model.js";

class ProductManager {
    async addProduct({ title, description, price, img, code, stock, category, thumbnails }) {
        try {
            if (!title || !description || !price || !img || !code || !stock || !category) {
                throw new Error("Todos los campos son obligatorios");
            }

            const existeCodigo = await ProductModel.findOne({ code });

            if (existeCodigo) {
                throw new Error("El código ya existe");
            }

            const nuevoProducto = new ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            });

            await nuevoProducto.save();
        } catch (error) {
            console.log("Error al agregar producto:", error.message);
            throw error;
        }
    }

    //LEE EL ARCHIVO
    //metodo que tuve que suplantar para que me tomara el sort en api/products
    /*async getProducts() {
        try {
            const arrayProductos = await ProductModel.find();
            return arrayProductos;
        } catch (error) {
            console.log("Error al leer el archivo")
        }
    }*/

    async getProducts(sort) {
        try {
            let query = ProductModel.find();

            if (sort) {
                const sortOrder = sort === "asc" ? 1 : -1;
                query = query.sort({ price: sortOrder });
            }

            const arrayProductos = await query.exec();
            return arrayProductos;
        } catch (error) {
            console.log("Error al leer los productos", error.message);
            throw error;
        }
    }

    //Metodo que debe buscar en el arreglo el producto que coincida con el id
    async getProductById(id) {
        try {
            const buscado = await ProductModel.findById(id);

            if (!buscado) {
                console.log("Producto no encontrado - metodo obtener producto");
                return null;
            }
            return buscado;
        } catch (error) {
            console.log("Error al buscar por ID");
        }
    }

    //Métodos auxiliares: 
    async actualizarProducto(id, productoActualizado) {
        try {
            const actualizado = await ProductModel.findByIdAndUpdate(id, productoActualizado);

            if (!actualizado) {
                console.log("No se encuentra el producto para actualizar");
                return null;
            }
            return actualizado;
        } catch (error) {
            console.error("Error al actualizar producto:", error.message);
            throw error;
        }
    }

    async borrarProducto(id) {
        try {
            const borrado = await ProductModel.findByIdAndDelete(id);
            if (!borrado) {
                console.log("No se encuentra el producto para borrar");
                return null;
            }
            return borrado;
        } catch (error) {
            console.error("Error al borrar producto:", error.message);
            throw error;
        }
    }

    //metodo SORT de ordenamiento ascendente o descente

}

export default ProductManager;