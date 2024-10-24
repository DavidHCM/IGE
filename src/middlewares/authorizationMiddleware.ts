import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../types/http-status-codes';

export const authorize = (requiredRole: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new Error('Not authenticated: ' + HTTP_STATUS.AUTH_ERROR);
        }
        const { role } = req.user;
        if (!requiredRole.includes(role)) {
            throw new Error('Access denied: ' + HTTP_STATUS.FORBIDDEN);
        }

        next();
    };
};