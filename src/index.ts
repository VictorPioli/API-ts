import UserRepository from "./User/Repository/UserRepository.js";
import UserService from "./User/Service/UserService.js";
import UserController from "./User/Controller/UserController.js";
import express, { Request, Response} from "express";
import { connectMongo } from "./database/mongo.js";

const repository = new UserRepository()
const service = new UserService(repository)
const controller = new UserController(service)

const port = 3000
const app = express();
async function startServer() {
    try {
        await connectMongo();
        app.use(express.json());
        
        app.get('/users', (req: Request, res: Response) => controller.findAllUser(req, res));
        app.post('/users', (req: Request, res: Response) => controller.createUser(req, res));
        app.post('/login', (req: Request, res: Response) => controller.login(req, res));
        
        app.listen(port, () => {
            console.log(`O servidor está rodando na porta ${port}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar servidor:", error);
        process.exit(1);
    }
}

startServer();