import express from "express";
const router = express.Router();

import CartController from "../controllers/cart.controller.js";
const cartController = new CartController();


router.post("/", cartController.create);
router.get("/:cid", cartController.getCart);
router.post("/:cid/product/:pid", cartController.addProductToCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);
router.put("/:id", cartController.clearProductsToCart);

export default router;
