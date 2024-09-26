import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    cartId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cart'  // Esto debe ser 'Cart' (nombre del modelo de carrito)
    },
    rol: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

const UsuarioModel = mongoose.model("usuarios", usuarioSchema);

export default UsuarioModel;