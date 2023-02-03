import { Request, Response } from 'express';
import { PortionService } from '../services/portion.service';

export class PortionController {
    async getAll(_: Request, res: Response) {
        const service = new PortionService()
        const result = await service.getAll()
        res.status(result.statusCode).send(result)
    }

    async getById(req: Request, res: Response) {
        const service = new PortionService()
        const id = req.params.id || -1
        const result = await service.getById(Number(id))
        res.status(result.statusCode).send(result)
    }

    async create(req: Request, res: Response) {
        const service = new PortionService()
        const portion = req.body
        const result = await service.create(portion)
        res.status(result.statusCode).send(result)
    }

    async update(req: Request, res: Response) {
        const service = new PortionService()
        const portion = req.body
        const id = req.params.id || ""
        const result = await service.update(Number(id), portion)
        res.status(result.statusCode).send(result)
    }

    async delete(req: Request, res: Response) {
        const service = new PortionService()
        const id = req.params.id || ""
        const result = await service.delete(Number(id))
        res.status(result.statusCode).send(result)
    }
}