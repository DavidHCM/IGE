import { Request, Response } from 'express';
import User from './../models/user.model';
import { HTTP_STATUS } from '../types/http-status-codes';
import { User as UserType } from '../types/user';

class userController {
    async create(req: Request, res: Response) {
        try {
            const {
                userId,
                name,
                email,
                password,
                role,
                status,
                createdAt
            }: UserType = req.body;

            const existingUser = await User.findOne({ userId });

            if (existingUser) {
                throw ('User already exists: ' + HTTP_STATUS.CONFLICT);
            }

            const newUser = new User({
                userId,
                name,
                email,
                password,
                role,
                status,
                createdAt
            });

            const savedUser = await newUser.save();
            res.status(HTTP_STATUS.SUCCESS).json(savedUser);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error creating user';

            res.status(status).send({ message, error: err });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const results = await User.find({});
            res.send(results);
        } catch (err) {
            res.status(HTTP_STATUS.NOT_FOUND).send({ message: 'No users found' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const existingUser = await User.findOne({ userId });
            if (!existingUser) {
                throw ('User does not exist: ' + HTTP_STATUS.NOT_FOUND);
            }
            res.send(existingUser);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.NOT_FOUND;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error fetching user';

            res.status(status).send({ message, error: err });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const updatedData = req.body;

            const existingUser = await User.findOne({ userId });

            if (!existingUser) {
                throw ('User does not exist: ' + HTTP_STATUS.CONFLICT);
            }

            const updatedUser = await User.findOneAndUpdate(
                { userId },
                updatedData,
                { new: true, runValidators: true }
            );

            res.status(HTTP_STATUS.SUCCESS).json(updatedUser);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error updating user';

            res.status(status).send({ message, error: err });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const existingUser = await User.findOne({ userId });

            if (!existingUser) {
                throw ('User does not exist: ' + HTTP_STATUS.CONFLICT);
            }

            const deletedUser = await User.deleteOne({ userId });
            res.status(HTTP_STATUS.SUCCESS).json(deletedUser);
        } catch (err) {
            const status = err instanceof Error && 'status' in err ? (err as any).status : HTTP_STATUS.BAD_REQUEST;
            const message = err instanceof Error && 'message' in err ? err.message : 'Error deleting user';

            res.status(status).send({ message, error: err });
        }
    }
}

export const userControllers = new userController();
