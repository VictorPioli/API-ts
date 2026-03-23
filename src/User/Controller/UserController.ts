import { Response, Request } from 'express'
import UserService from '../Service/UserService.js'
import { createUserSchema } from '../Schema/CreaterUserSchema.js'
import { loginUserSchema } from '../Schema/LoginUserSchema.js'
export default class UserController{
    constructor(private userService: UserService) {}

    async createUser(req: Request, res: Response) {
        try {
            const data = createUserSchema.parse(req.body)
            await this.userService.createUser(data)
            
            res.status(201).json({
                message: "Usuário criado com sucesso"
            })
        } catch (err: any) {
            res.status(401).json({
                message: err.message
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
        const data = loginUserSchema.parse(req.body)
        const result = await this.userService.login(data)
        res.status(200).json(result)
        }
        catch (err: any) {
            res.status(401).json({
                Success: false,
                message: err.message || String(err)
            })
        }
    }
}
