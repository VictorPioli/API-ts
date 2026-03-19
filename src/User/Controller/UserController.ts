import { Response, Request } from 'express'
import UserService from '../Service/UserService.js'

export default class UserController{
    constructor(private userService: UserService) {}

    async createUser(req: Request, res: Response) {
        try {
            await this.userService.createUser(req.body)
            res.status(201).json({
                message: "Usuário criado com sucesso"
            })
        } catch (err: any) {
            res.status(200).json({
                message: err.message || String(err)
            })
        }
    }

    async findAllUser(req: Request, res: Response) {
         const users = await this.userService.getUsers()
        res.status(200).json(users)
    }

    async findByEmail(req: Request, res: Response){
        const user = await this.userService.findByEmail(req.body.email)
        res.status(200).json(user)
    }

    async login(req: Request, res: Response){ 
        try {
        const user = await this.userService.login(req.body)
        res.status(200).json(user)
        }
        catch (err: any) {
            res.status(200).json({
                Success: false,
                message: err.message || String(err)
            })
        }
    }
}
