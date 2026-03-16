import UserRepository from "../Repository/UserRepository.js";
import { CreateUserDTO } from "../Dtos/CreateUserDtos.js";
import User from "../Entities/User.js";
//Aplicar as regras de negócio

export default class UserService {
    constructor(private userRepository: UserRepository) {}

   async createUser(data: CreateUserDTO){ 
        if (!data.email.includes("@")) {
            throw new Error("Email inválido")
        }
       const user = new User(
        data.name,
        data.email,
        data.password
       )
       return await this.userRepository.createUser(user)
    }

    async getUsers() {
        return await this.userRepository.findAllUsers();
    }
}