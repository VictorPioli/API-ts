import User from "../Entities/User.js";
import { UserModel } from "./UserModel.js";

export default class UserRepository {

    async createUser(user: User) {
        return await UserModel.create(user);
    }

    async findAllUsers() {
        return await UserModel.find()
    }
}