import User from "../Entities/User.js";
import { UserModel } from "./UserModel.js";
import { userMongoSchema } from "../Schema/UserSchema.js";

export default class UserRepository {

    async createUser(user: User) {
        return await UserModel.create(user);
    }

    async findAllUsers() {
        return await UserModel.find()
    }

    async findByEmail(email: string) {

        const user = await UserModel.findOne({ email: email }).lean();

        if (!user) return null

        const result = userMongoSchema.safeParse(user);
        if (!result.success) {
            throw new Error("Invalid user data in database for email!")
        }
        const parsed = result.data
        return new User(
            parsed.name,
            parsed.email,
            parsed.password
        )

    }
}