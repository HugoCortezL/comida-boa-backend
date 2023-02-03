import express from 'express'
import { PortionController } from '../controller/portion.controller'
import { verifyToken, verifyPermission } from '../middlewares/auth'
import { Roles } from '../models';

export const portionRouter = express.Router()
const portionController = new PortionController()

portionRouter.get("/portions", verifyToken, verifyPermission([Roles.ADM]), portionController.getAll)

portionRouter.get("/portions/:id",verifyToken, verifyPermission([Roles.ADM]), portionController.getById)

portionRouter.post("/portions",verifyToken, verifyPermission([Roles.ADM]), portionController.create)

portionRouter.put("/portions/:id",verifyToken, verifyPermission([Roles.ADM]), portionController.update)

portionRouter.delete("/portions/:id",verifyToken, verifyPermission([Roles.ADM]), portionController.delete)