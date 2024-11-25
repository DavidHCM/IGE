import { userControllers } from '../../controllers';
import User from '../../models/user.model';
import { HTTP_STATUS } from '../../types/http-status-codes';
import bcrypt from 'bcryptjs';

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

describe('User Controller', () => {
    describe('getAll', () => {
        it('should return all users', async () => {
            const mockUsers = [{ name: 'Test User', email: 'test@example.com' }];
            (User.find as jest.Mock).mockResolvedValueOnce(mockUsers);

            const req = {} as any;
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await userControllers.getAll(req, res);

            expect(res.send).toHaveBeenCalledWith(mockUsers);
        });

        it('should return a 404 error if no users exist', async () => {
            (User.find as jest.Mock).mockResolvedValueOnce([]);

            const req = {} as any;
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await userControllers.getAll(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ message: 'No users found' });
        });
    });
});


// Prueba unitaria para register

describe('User Controller - register', () => {
    it('should register a new user successfully', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                role: 'user'
            }
        } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as any;

        (User.findOne as jest.Mock).mockResolvedValueOnce(null);
        (User.prototype.save as jest.Mock).mockResolvedValueOnce(null);

        await userControllers.register(req, res);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.SUCCESS);
        expect(res.send).toHaveBeenCalledWith({ message: 'User registered successfully' });
    });

    it('should throw an error if required fields are missing', async () => {
        const req = { body: { email: 'missing.fields@example.com' } } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as any;

        await userControllers.register(req, res);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Error registering user',
        }));
    });
});


// Prueba unitaria para login

describe('User Controller - login', () => {
    it('should log in a user successfully', async () => {
        const req = {
            body: {
                email: 'john.doe@example.com',
                password: 'password123',
            }
        } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as any;

        (User.findOne as jest.Mock).mockResolvedValueOnce({
            email: 'john.doe@example.com',
            password: await bcrypt.hash('password123', 10),
            status: 'active',
            userId: '12345',
            role: 'user',
            name: 'John Doe'
        });

        await userControllers.login(req, res);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.SUCCESS);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
            token: expect.any(String),
            message: 'Login successful',
        }));
    });

    it('should return an error if credentials are invalid', async () => {
        const req = {
            body: {
                email: 'invalid@example.com',
                password: 'wrongpassword',
            }
        } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as any;

        (User.findOne as jest.Mock).mockResolvedValueOnce(null);

        await userControllers.login(req, res);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Error logging in user',
        }));
    });
});


// Prueba unitaria para update

describe('User Controller - update', () => {
    it('should update a user successfully', async () => {
        const req = {
            params: { userId: '12345' },
            body: { name: 'Updated Name' },
        } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as any;

        (User.findOne as jest.Mock).mockResolvedValueOnce({ userId: '12345' });
        (User.findOneAndUpdate as jest.Mock).mockResolvedValueOnce({
            userId: '12345',
            name: 'Updated Name',
        });

        await userControllers.update(req, res);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.SUCCESS);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            userId: '12345',
            name: 'Updated Name',
        }));
    });

    it('should return an error if user does not exist', async () => {
        const req = {
            params: { userId: 'nonexistent' },
            body: { name: 'Updated Name' },
        } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as any;

        (User.findOne as jest.Mock).mockResolvedValueOnce(null);

        await userControllers.update(req, res);

        expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CONFLICT);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Error updating user',
        }));
    });
});
