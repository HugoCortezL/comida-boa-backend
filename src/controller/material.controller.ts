import { Request, Response } from 'express';
import { MaterialService } from '../services/material.service';
import { verifyToken } from '../middlewares/auth'
import { Roles } from '../models';

export class MaterialController {
    async getAll(req: Request, res: Response) {
        const verified = verifyToken(req, [Roles.ADM])
        if (verified.statusCode < 200 || verified.statusCode >= 300) {
            res.status(verified.statusCode).send(verified)
        }
        else {
            const service = new MaterialService()
            const result = await service.getAll()
            res.status(result.statusCode).send(result)
        }
    }

    async getById(req: Request, res: Response) {
        const verified = verifyToken(req, [Roles.ADM])
        if (verified.statusCode < 200 || verified.statusCode >= 300) {
            res.status(verified.statusCode).send(verified)
        }
        else {
            const service = new MaterialService()
            const id = req.params.id || -1
            const result = await service.getById(Number(id))
            res.status(result.statusCode).send(result)
        }
    }

    async create(req: Request, res: Response) {
        const verified = verifyToken(req, [Roles.ADM])
        if (verified.statusCode < 200 || verified.statusCode >= 300) {
            res.status(verified.statusCode).send(verified)
        }
        else {
            const service = new MaterialService()
            const material = req.body
            const result = await service.create(material)
            res.status(result.statusCode).send(result)
        }
    }

    async update(req: Request, res: Response) {
        const verified = verifyToken(req, [Roles.ADM])
        if (verified.statusCode < 200 || verified.statusCode >= 300) {
            res.status(verified.statusCode).send(verified)
        }
        else {
            const service = new MaterialService()
            const material = req.body
            const id = req.params.id || ""
            const result = await service.update(Number(id), material)
            res.status(result.statusCode).send(result)
        }
    }

    async delete(req: Request, res: Response) {
        const verified = verifyToken(req, [Roles.ADM])
        if (verified.statusCode < 200 || verified.statusCode >= 300) {
            res.status(verified.statusCode).send(verified)
        }
        else {
            const service = new MaterialService()
            const id = req.params.id || ""
            const result = await service.delete(Number(id))
            res.status(result.statusCode).send(result)
        }
    }
}