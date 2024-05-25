import { Request, Response, NextFunction } from "express"
import User from "../../../src/model/userModel"
import {login} from "./../../../src/controllers/authController"
import bcrypt from "bcrypt"

jest.mock('../../../src/model/userModel');
jest.mock('bcrypt');

describe('login', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.MockedFunction<NextFunction>;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if email is not found', async () => {
        const email = 'test@example.com';
        const password = 'password123';

        (User.findOne as jest.Mock).mockResolvedValue(null);

        req.body = { email, password };

        await login(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ status: false, message: 'Incorrect Email and Password!' });
    });

    it('should return 401 if password is incorrect', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const user = { email, password: 'hashedpassword' };

        (User.findOne as jest.Mock).mockResolvedValue(user);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        req.body = { email, password };

        await login(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ status: false, message: 'Incorrect Email and Password!' });
    });

    it('should return 200 if email and password are correct', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const userId = 'someuserid';
        const user = {
            _id: userId,
            username: 'testuser',
            avatarImage: 'image.png',
            isAvatarImageSet: true,
        };

        (User.findOne as jest.Mock).mockResolvedValue({ email, password: 'hashedpassword', _id: userId });
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (User.findById as jest.Mock).mockResolvedValue(user);

        req.body = { email, password };

        await login(req as Request, res as Response, next);

    
        expect(res.status).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: 'Email and password match',
            user: {
                _id: userId,
                username: user.username,
                avatarImage: user.avatarImage,
                isAvatarImageSet: user.isAvatarImageSet,
            },
        });
    });

    it('should return 500 if there is a server error', async () => {
        const email = 'test@example.com';
        const password = 'password123';

        (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

        req.body = { email, password };

        await login(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ status: false, message: 'An error occurred', error: 'Database error' });
        expect(next).toHaveBeenCalled();
    });
});
