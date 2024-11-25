import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../types/http-status-codes';
import jwt from 'jsonwebtoken';
import { User } from "../types/user";
import {config} from "dotenv";
config();
const secretKey = process.env.JWT_SECRET;

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

   

   
        next();
    
};
