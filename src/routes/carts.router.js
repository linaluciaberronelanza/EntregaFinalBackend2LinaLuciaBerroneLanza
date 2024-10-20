import express from "express";
//import CartManager from "../dao/db/cart-manager-db.js";
const router = express.Router();
//const cartManager = new CartManager();
import CartController from "../controllers/cart.controller.js";
const cartController = new CartController();


router.post("/", cartController.create);
router.get("/:cid", cartController.getCart);
router.post("/:cid/product/:pid", cartController.addProductToCart);

export default router;
