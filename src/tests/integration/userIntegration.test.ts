import request from 'supertest';
import app from '../server.mock';
import User from '../../models/user.model';

import {NextFunction} from "express";


jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose');
    return {
        ...actualMongoose,
        connect: jest.fn().mockResolvedValue(null),
        disconnect: jest.fn().mockResolvedValue(null),
        Schema: class MockSchema {
            constructor(schemaDefinition: any) {
                Object.assign(this, schemaDefinition);
            }
        },
        SchemaTypes: {
            String: 'String',
            Date: 'Date',
        },
        model: jest.fn().mockImplementation((name: string, schema: any) => {
            return {
                name,
                schema,
                find: jest.fn(),
                findOne: jest.fn(),
                findOneAndUpdate: jest.fn(),
                deleteOne: jest.fn(),
                save: jest.fn(),
            };
        }),
    };
});

jest.mock('../../models/user.model', () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    save: jest.fn(),
}));

jest.mock('../../middlewares/authenticationMiddleware', () => (req: Request, res: Response, next: NextFunction) => next());
jest.mock('../../middlewares/authorizationMiddleware', () => ({
    authorize: jest.fn((requiredRoles: string[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            // Mock req.user and simulate role-based access
            // @ts-ignore
            req.user = { role: 'admin' }; // Default to 'admin' for tests
            // @ts-ignore
            if (!requiredRoles.includes(req.user.role)) {
                // @ts-ignore
                return res.status(403).send({ message: 'Access denied' });
            }
            next();
        };
    }),
}));


describe('User Routes', () => {
    describe('GET /user', () => {
        it('should return all users', async () => {
            const mockUsers = [{ name: 'Test User', email: 'test@example.com' }];
            (User.find as jest.Mock).mockResolvedValueOnce(mockUsers);

            const response = await request(app).get('/user');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
        });

        it('should return 404 if no users exist', async () => {
            (User.find as jest.Mock).mockResolvedValueOnce([]);

            const response = await request(app).get('/user');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'No users found' });
        });
    });
});
