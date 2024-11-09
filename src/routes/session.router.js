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
router.get("/current", passport.authenticate("jwt", { session: false }), userController.current);

// Admin (ruta protegida con JWT y verificación de rol)
router.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.rol !== "admin") {
        return res.status(403).send("Acceso denegado!");
    }
    res.render("admin");
});



export default router; 