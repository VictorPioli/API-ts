import { Response, Request } from 'express'
import UserService from '../Service/UserService.js'

export default class UserController{
    constructor(private userService: UserService) {}

    async createUser(req: Request, res: Response) {
        await this.userService.createUser(req.body)
        res.status(201).json({
            message: "Usuário criado com sucesso"
        })
    }

    async findAllUser(req: Request, res: Response) {
         const users = await this.userService.getUsers()
        res.status(201).json(users)
    }
}
