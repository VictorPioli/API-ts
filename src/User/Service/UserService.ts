import UserRepository from "../Repository/UserRepository.js";
import User from "../Entities/User.js";
import { hashPassword, comparePassword } from '../../utils/hashPassword.js'
import { generateToken } from "../../utils/generateToken.js";

import { CreateUserInput } from "../Schema/CreaterUserSchema.js";
import { LoginUserInput } from "../Schema/LoginUserSchema.js";
//Aplicar as regras de negócio

export default class UserService {
    constructor(private userRepository: UserRepository) { }

    async createUser(data: CreateUserInput) {
        if (!data.email.includes("@")) {
            throw new Error("Email inválido")
        }
        if (await this.userRepository.findByEmail(data.email)) {
            throw new Error("Email já está sendo utilizado")
        }
        const hash = await hashPassword(data.password)
        const user = new User(
            data.name,
            data.email,
            hash
        )
        return await this.userRepository.createUser(user)
    }

    async findByEmail(email: string) {
        return await this.userRepository.findByEmail(email)
    }

    async login(data: LoginUserInput) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        const matchPassword = await comparePassword(data.password, user.password);


        if (matchPassword) {
            const token = generateToken({
                email: user.email
            });
            return { user, token }
        } else {
            throw new Error("Senha inválida");
        }
    }

    async getUsers() {
        return await this.userRepository.findAllUsers();
    }
}