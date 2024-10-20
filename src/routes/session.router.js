//import { createHash, isValidPassword } from "../utils/util.js";
//import UsuarioModel from "../dao/models/usuarios.model.js";
//import jwt from "jsonwebtoken";
import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/user.controller.js';
const userController = new UserController();


const router = Router();

//Register
router.post("/register", userController.register)
//Login
router.post("/login", userController.login)
//Logout
router.post("/logout", userController.logout)
//Current: 
router.get("/current", passport.authenticate("current", { session: false }), userController.current);


// //Admin
// router.get("/admin", passport.authenticate("current", { session: false }), (req, res) => {
//     if (req.user.rol !== "admin") {
//         return res.status(403).send("Acceso denegado!");
//     }

//     //Si el usuario es administrador, mostrar la vista correspondiente: 
//     res.render("admin");
// });


export default router; 