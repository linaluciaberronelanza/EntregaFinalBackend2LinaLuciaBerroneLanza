import UserDao from "../dao/user.dao.js";

class UserRepository {
    async createUser(userData) {
        return await UserDao.save(userData);
    }

    async getUserById(id) {
        return await UserDao.findById(id);
    }

    async getUserByEmail(email) {
        return await UserDao.findOne({ email });
    }

    async updateUser(email, userData) {
        return await UserDao.update(email, userData); 
    }

    async deleteUser(email) {
        return UserDao.delete(email); 
    }

}

export default new UserRepository(); 