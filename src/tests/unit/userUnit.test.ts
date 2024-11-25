import { userControllers } from '../../controllers';
import User from '../../models/user.model';

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

        it('should return all drivers', async () => {
            const mockDrivers = [
                { name: 'Driver One', email: 'driver1@example.com', role: 'driver' },
                { name: 'Driver Two', email: 'driver2@example.com', role: 'driver' }
            ];
            (User.find as jest.Mock).mockResolvedValueOnce(mockDrivers);

            const req = {} as any;
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await userControllers.getDrivers(req, res);

            expect(res.send).toHaveBeenCalledWith(mockDrivers);
            expect(res.status).not.toHaveBeenCalledWith(404);
        });

        it('should return a user by ID', async () => {
            const mockUser = { name: 'Test User', email: 'test@example.com', userId: '123' };
            (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

            const req = { params: { userId: '123' } } as any;
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await userControllers.getById(req, res);

            expect(res.send).toHaveBeenCalledWith(mockUser);
            expect(res.status).not.toHaveBeenCalledWith(404);
        });

    });
});
