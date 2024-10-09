export interface User {
    userId: string;
    name: string;
    email: string;
    password: string;
    role: string;
    status?: string;
    createdAt?: Date;
}