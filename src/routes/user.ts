import express from 'express'
import { UserController } from '../controller/user.controller'

export const userRouter = express.Router()
const userController = new UserController()

userRouter.get("/users", userController.getAll)

userRouter.get("/users/:id", userController.getById)

userRouter.get("/login", userController.login)

userRouter.put("/users/:id", userController.update)

userRouter.post("/register", userController.create)