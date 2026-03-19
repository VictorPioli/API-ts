import User from "../Entities/User.js";
import { UserModel } from "./UserModel.js";

export default class UserRepository {

    async createUser(user: User) {
        return await UserModel.create(user);
    }

    async findAllUsers() {
        return await UserModel.find()
    }

    async findByEmail(email: string) {
        const user = await UserModel.findOne({email: email})

        if(!user) return null

        return new User(
            user.name,
            user.email,
            user.password
        )
    } 
}