import productRepository from "../repositories/product.repository.js";

class ProductService {
    async createProduct(productData) {
        return await productRepository.createProduct(productData);
    }

    async getProductById(id) {
        return await productRepository.getProductById(id);
    }
    async getProducts(options) {
        return await productRepository.getProducts({}, options);
    }
    async updateProduct(id, productData) {
        return await productRepository.updateProduct(id, productData);
    }

    async deleteProduct(id) {
        return productRepository.deleteProduct(id);
    }



}

export default new ProductService(); 