import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    async getAll(_: Request, res: Response) {
        const service = new UserService()
        const result = await service.getAll()
        res.status(result.statusCode).send(result)
    }

    async getById(req: Request, res: Response) {
        const service = new UserService()
        const id = req.params.id || -1
        const result = await service.getById(Number(id))
        res.status(result.statusCode).send(result)
    }

    async create(req: Request, res: Response) {
        const service = new UserService()
        const user = req.body
        const result = await service.create(user)
        res.status(result.statusCode).send(result)
    }

    async login(req: Request, res: Response) {
        const service = new UserService()
        const user = req.body
        const result = await service.login(user)
        res.status(result.statusCode).send(result)
    }

    async update(req: Request, res: Response) {
        const service = new UserService()
        const user = req.body
        const id = req.params.id || ""
        const result = await service.update(Number(id), user)
        res.status(result.statusCode).send(result)
    }
}