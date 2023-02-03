require('dotenv').config()
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express';
import { ResponseType, Roles } from '../models';

export const verifyToken = (req: Request, rolePermission: Roles[]) => {
    const token = req.headers["x-access-token"];

    if (!token || Array.isArray(token)) {
        return {
            statusCode: 401,
            type: ResponseType.Error,
            message: "Unauthorized"
        }
    }
    try {
        const secret = process.env.TOKEN_KEY
        const decoded = jwt.verify(token, (secret || "123")) as JwtPayload;
        if (rolePermission.includes(decoded.role)) {
            return {
                statusCode: 200,
                type: ResponseType.Success,
                message: "Advance",
            }
        }
        else {
            return {
                statusCode: 403,
                type: ResponseType.Error,
                message: "Forbidden",
            }
        }
    } catch (err) {
        return {
            statusCode: 401,
            type: ResponseType.Error,
            message: "Unauthorized",
        }
    }
};