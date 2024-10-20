import express from "express";
//import ProductManager from "../dao/db/product-manager-db.js";

const router = express.Router();
//const manager = new ProductManager();

import ProductController from "../controllers/product.controller.js";
const productController = new ProductController();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.get("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router; 