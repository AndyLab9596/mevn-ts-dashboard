import express, { Request, Response, NextFunction } from 'express';
import { UnauthenticatedError } from '../errors';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

declare module 'express' {
    interface Request {
        user: { userId: Types.ObjectId }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders && !authHeaders?.startsWith('Bearer')) throw new UnauthenticatedError('Authentication Invalid');

    // Bearer token
    const token = authHeaders.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        if (error instanceof Error) {
            throw new UnauthenticatedError(error.message);
        }
        console.log(error);
    }
}

export default authMiddleware;