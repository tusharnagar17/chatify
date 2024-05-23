import { Request, Response, NextFunction } from 'express'; // Assuming you're using Express
import bcrypt from 'bcrypt';
import { login } from '../../../src/controllers/authController';
// Replace 'yourFile' with the actual file name containing the login function
import User from '../../../src/model/userModel';

// Mock User model and bcrypt
// jest.mock('../../../src/model/userModel', () => ({
//   findOne: jest.fn(),
//   findById: jest.fn(),
// }));

// jest.mock('bcrypt', () => ({
//   compare: jest.fn(),
// }));

const mockedReq: Partial<Request> = {};
const mockedRes: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const mockedNext: NextFunction = jest.fn();

describe('login', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock call history before each test
  });

  it('should return status 200 and user data when email and password match', async () => {
    const fakeUser = {
      _id: 'fakeUserId',
      username: 'fakeUsername',
      avatarImage: 'fakeAvatarImage',
      isAvatarImageSet: true,
    };

    // Mock the behavior of User.findOne and bcrypt.compare
    // (User.findOne as jest.Mock).mockResolvedValueOnce({ email: 'fake@example.com', password: 'fakeHashedPassword' });
    // (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
    // (User.findById as jest.Mock).mockResolvedValueOnce(fakeUser);

    

    mockedReq.body = { email: 'fake@example.com', password: 'fakePassword' };

    await login(mockedReq as Request, mockedRes as Response, mockedNext);

    expect(mockedRes.status).toHaveBeenCalledWith(200);
    expect(mockedRes.json).toHaveBeenCalledWith({
      status: true,
      message: 'Email and password match',
      user: fakeUser,
    });
  });

  it('should return status 401 when email and password do not match', async () => {
    // Mock the behavior of User.findOne and bcrypt.compare
    (User.findOne as jest.Mock).mockResolvedValueOnce(null);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    mockedReq.body = { email: 'fake@example.com', password: 'fakePassword' };

    await login(mockedReq as Request, mockedRes as Response, mockedNext);

    expect(mockedRes.status).toHaveBeenCalledWith(401);
    expect(mockedRes.json).toHaveBeenCalledWith({ status: false, message: 'Incorrect Email and Password!' });
  });

  it('should return status 500 when an error occurs', async () => {
    const fakeError = new Error('Fake error');

    // Mock the behavior of User.findOne to throw an error
    (User.findOne as jest.Mock).mockRejectedValueOnce(fakeError);

    mockedReq.body = { email: 'fake@example.com', password: 'fakePassword' };

    await login(mockedReq as Request, mockedRes as Response, mockedNext);

    expect(mockedRes.status).toHaveBeenCalledWith(500);
    expect(mockedRes.json).toHaveBeenCalledWith({ status: false, message: 'An error occurred', error: 'Fake error' });
    expect(mockedNext).toHaveBeenCalledWith(fakeError);
  });
});
