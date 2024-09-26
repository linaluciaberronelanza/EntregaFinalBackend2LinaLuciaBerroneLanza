import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: String,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
});

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;