import { Router } from "express";
import UsuarioModel from "../dao/models/usuarios.model.js";
import CartManager from "../dao/db/cart-manager-db.js";
import jwt from "jsonwebtoken";
import { createHash, isValidPassword } from "../utils/util.js";
import passport from "passport";
const router = Router();
const cartManager = new CartManager();

//Register
router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
        //Verificamos si ya existe el usuario. 
        const existeUsuario = await UsuarioModel.findOne({ email });

        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe");
        }

        const nuevoCarrito = await cartManager.crearCarrito();

        //Si no existe, lo puedo crear: 
        const nuevoUsuario = new UsuarioModel({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cartId: nuevoCarrito._id,
        });

        await nuevoUsuario.save();

        //Generar el Token JWT
        const token = jwt.sign({ email: nuevoUsuario.email }, "coderhouse", { expiresIn: "1h" });

        //Lo mandamos con la cookie. 

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true
        })

        res.redirect("/api/sessions/current");

    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})


//Login

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        //Buscamos al usuario en MongoDB: 
        const usuarioEncontrado = await UsuarioModel.findOne({ email });

        //Si no lo encuentro, lo puedo mandar a registrarse: 
        if (!usuarioEncontrado) {
            return res.status(401).send("Usuario no registrado, date una vuelta por el registro");
        }

        //Verificamos la contraseña: 
        if (!isValidPassword(password, usuarioEncontrado)) {
            return res.status(401).send("Contraseña incorrecta");
        }

        //Generamos el token JWT: 

        const token = jwt.sign({ email: usuarioEncontrado.email, rol: usuarioEncontrado.rol }, "coderhouse", { expiresIn: "1h" });

        //Enviamos con la cookie: 

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true
        })

        res.redirect("/api/sessions/current");
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

//Logout
router.post("/logout", (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
})

//Current: 

router.get("/current", passport.authenticate("current", { session: false }), (req, res) => {
    res.render("start", { email: req.user.email });
});

//Admin

router.get("/admin", passport.authenticate("current", { session: false }), (req, res) => {
    if (req.user.rol !== "admin") {
        return res.status(403).send("Acceso denegado!");
    }

    //Si el usuario es administrador, mostrar la vista correspondiente: 
    res.render("admin");
});


export default router; 