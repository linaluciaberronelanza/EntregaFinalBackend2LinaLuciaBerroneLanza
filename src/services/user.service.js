import { createHash, isValidPassword } from "../utils/util.js";
import userRepository from "../repositories/user.repository.js";
import cartService from "./cart.service.js";

class UserService {
    async registerUser(userData) {
        const userExist = await userRepository.getUserByEmail(userData.email);
        if (userExist) throw new Error("El usuario ya existe");

        userData.password = createHash(userData.password);

        //Crear un nuevo carrito: 
        const newCart = await cartService.createCart();
        userData.cart = newCart._id;

        return await userRepository.createUser(userData);
    }

    async loginUser(email, password) {
        const user = await userRepository.getUserByEmail(email);
        if (!user || !isValidPassword(password, user)) throw new Error("Email o contraseña incorrectas");
        return user;
    }
}

export default new UserService(); 