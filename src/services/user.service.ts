import { UserDal } from "../data-access/user.dal"
import { User, ApiResponse, ResponseType } from "../models"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validateUser, validateUserInput } from "../validators/user"

require('dotenv').config()

export class UserService {
    userDal: UserDal
    constructor() {
        this.userDal = new UserDal()
    }

    async getAll(): Promise<ApiResponse> {
        const users = await this.userDal.getMany()
        return {
            statusCode: 200,
            type: ResponseType.Success,
            message: "Successfully to retrieve all the users",
            data: users
        }
    }

    async getById(id: number): Promise<ApiResponse> {
        const user = await this.userDal.getUnique({ id })
        if (user) {
            return {
                statusCode: 200,
                type: ResponseType.Success,
                message: "Successfully to retrieve the user",
                data: user
            }
        }
        else {
            return {
                statusCode: 404,
                type: ResponseType.Error,
                message: "Can't retrieve the user with this id"
            }
        }
    }

    async create(data: User): Promise<ApiResponse> {
        const validUser = await validateUser(data)
        if (!validUser.success) {
            return {
                statusCode: 400,
                message: "User not valid",
                type: ResponseType.InputError,
                data: validUser
            }
        }
        const oldUser = await this.userDal.getOne({ email: data.email.toLowerCase() });

        if (oldUser) {
            return {
                statusCode: 409,
                message: "User already exists",
                type: ResponseType.Warning
            }
        }

        const encryptedPassword = await bcrypt.hash(data.password, 10)

        data = {
            ...data,
            email: data.email.toLowerCase(),
            password: encryptedPassword
        }

        const user = await this.userDal.create(data)

        const secret = process.env.TOKEN_KEY

        const token = jwt.sign(
            {
                user_id: user?.id,
                email: user?.email,
                role: user?.role
            },
            secret || "asdgvfrhtyh",
            {
                expiresIn: "2h",
            }
        );

        return {
            statusCode: 201,
            message: "Success to register",
            type: ResponseType.Success,
            data: {
                token
            }
        }

    }

    async login(data: User): Promise<ApiResponse> {
        const validUser = validateUserInput(data)
        if (!validUser) {
            return {
                statusCode: 400,
                message: "User not valid",
                type: ResponseType.InputError,
                data: validUser
            }
        }
        const user = await this.userDal.getOne({ email: data.email.toLowerCase() });

        if (user && (await bcrypt.compare(data.password, user.password))) {
            const secret = process.env.TOKEN_KEY

            const token = jwt.sign(
                {
                    user_id: user.id,
                    email: user.email,
                    role: user.role
                },
                secret || "asdgvfrhtyh",
                {
                    expiresIn: "2h",
                }
            );
            return {
                statusCode: 200,
                message: "Success to login",
                type: ResponseType.Success,
                data: {
                    token
                }
            }
        }

        return {
            statusCode: 400,
            message: "Invalid credentials",
            type: ResponseType.Error
        }
    }

    async update(id: number, data: User): Promise<ApiResponse> {
        const validUser = await validateUser(data)
        if (!validUser) {
            return {
                statusCode: 400,
                message: "User not valid",
                type: ResponseType.InputError,
                data: validUser
            }
        }
        const encryptedPassword = await bcrypt.hash(data.password, 10)

        data = {
            ...data,
            email: data.email.toLowerCase(),
            password: encryptedPassword
        }
        const user = await this.userDal.update(id, data)
        return {
            statusCode: 200,
            message: "Success to update the user",
            type: ResponseType.Success,
            data: {
                user
            }
        }

    }
}