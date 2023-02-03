import express from 'express'
import { MaterialController } from '../controller/material.controller'
import { verifyToken, verifyPermission } from '../middlewares/auth'
import { Roles } from '../models';

export const materialRouter = express.Router()
const materialController = new MaterialController()

materialRouter.get("/materials", verifyToken, verifyPermission([Roles.ADM]), materialController.getAll)

materialRouter.get("/materials/:id", materialController.getById)

materialRouter.post("/materials", materialController.create)

materialRouter.put("/materials/:id", materialController.update)

materialRouter.delete("/materials/:id", materialController.delete)