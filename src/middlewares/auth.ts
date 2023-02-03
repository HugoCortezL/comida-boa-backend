require('dotenv').config()
import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';
import { ResponseType } from '../models';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-access-token"];

    if (!token || Array.isArray(token)) {
        res.status(401).send({
            statusCode: 401,
            type: ResponseType.Error,
            message: "Unauthorized"
        })
        return
    }

    try {
        const secret = process.env.TOKEN_KEY
        const decoded = jwt.verify(token, (secret || "123")) as JwtPayload;
        req.params.role = decoded.role
        return next()
    } catch (err) {
        res.status(401).send({
            statusCode: 401,
            type: ResponseType.Error,
            message: "Unauthorized",
        })
        return
    }
};

export const verifyPermission = (allowedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const role = req.params.role
            if (role && allowedRoles.includes(role)) {
                next()
                return
            }
            else {
                res.status(403).send({
                    statusCode: 403,
                    type: ResponseType.Error,
                    message: "Forbidden"
                })
                return
            }
        } catch (error) {
            next(error)
        }
    }
}