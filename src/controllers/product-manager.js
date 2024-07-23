import { promises as fs } from "fs";

class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct({ title, description, price, img, code, stock, category, thumbnails }) {

        try {
            const arrayProductos = await this.leerArchivo();

            if (!title || !description || !price || !img || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            if (arrayProductos.some(item => item.code === code)) {
                console.log("El codigo debe ser unico.. o todos moriremos");
                return;
            }

            const nuevoProducto = {
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            }

            if (arrayProductos.length > 0) {
                ProductManager.ultId = arrayProductos.reduce((maxId, product) => Math.max(maxId, product.id), 0);
            }

            nuevoProducto.id = ++ProductManager.ultId;

            arrayProductos.push(nuevoProducto);

            await this.guardarArchivo(arrayProductos);

        } catch (error) {
            console.log("Error al agregar productos");
            throw error;
        }


    }

    //LEE EL ARCHIVO USANDO LOS METODOS AUXILIARES
    async getProducts() {
        const arrayProductos = await this.leerArchivo();
        return arrayProductos;
    }

    //Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
    async getProductById(id) {

        const arrayProductos = await this.leerArchivo();
        const buscado = arrayProductos.find(item => item.id === id);

        if (!buscado) {
            return "Producto no encontrado - metodo obtener producto";
        } else {
            return buscado;
        }
    }

    //Métodos auxiliares: 
    async leerArchivo() {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayProductos = JSON.parse(respuesta);
        return arrayProductos;
    }

    async guardarArchivo(arrayProductos) {
        await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    }

    //Estan faltando los metodos de actualizar y eliminar. 
    async actualizarProducto(id, data) {
        const arrayProductos = await this.leerArchivo();
        const buscarIndex = arrayProductos.findIndex(product => product.id === id);

        if (buscarIndex !== -1) {
            arrayProductos[buscarIndex] = { ...arrayProductos[buscarIndex], ...data };
            await this.guardarArchivo(arrayProductos);
            return arrayProductos[buscarIndex];
        } else {
            console.log("Producto no encontrado - método actualizar");
            return null;
        }
    }

    async borrarProducto(id) {
        const arrayProductos = await this.leerArchivo();
        const buscarIndex = arrayProductos.findIndex(product => product.id === id);

        if (buscarIndex != -1) {
            arrayProductos.splice(buscarIndex, 1);
            await this.guardarArchivo(arrayProductos);
            console.log("Porducto eliminado exitosamente");
            return true;
        } else {
            console.log("Producto no encontrado - metodo borrar");
            return false;
        }
    }


}

export default ProductManager;