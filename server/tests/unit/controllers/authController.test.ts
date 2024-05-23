import User from "../../../src/model/userModel";
import bcrypt from "bcrypt"
import { Request, Response, NextFunction } from "express";
import { login } from "../../../src/controllers/authController";

jest.mock('bcrypt', ()=> ({
    compare: jest.fn()
}))

jest.mock("../../../src/model/userModel", ()=> ({
    findOne: jest.fn(),
    findById: jest.fn()
}))

const mockedReq: Partial<Request> = {};
const mockedRes: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}
const mockedNext: NextFunction = jest.fn()

describe("auth controller", ()=> {
    beforeEach(()=> {
        jest.clearAllMocks()
    })
    test("should return 200 and username and email match", async ()=> {
        
        const fakeUser = {
            _id: 'fakeUserId',
            username: 'fakeUsername',
            avatarImage: 'fakeAvatarImage',
            isAvatarImageSet: true,
          };

        // (User.findOne as jest.Mock).mockResolvedValueOnce({email: "fakeemail@com", password: "fakepassword"})
        // (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true)
        // (User.findById as jest.Mock).mockResolvedValueOnce()

        jest.spyOn(User, 'findOne').mockResolvedValueOnce({ email: 'fake@example.com', password: 'fakeHashedPassword' });
        (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValueOnce(true);
        jest.spyOn(User, 'findById').mockResolvedValueOnce(fakeUser);
        
        mockedReq.body = { email: 'fake@example.com', password: 'fakePassword' };

         await login(mockedReq as Request, mockedRes as Response, mockedNext);

        expect(mockedRes.status).toHaveBeenCalledWith(200)
        expect(mockedRes.json).toHaveBeenCalledWith({
            status: true,
            message: 'Email and password match',
            user: fakeUser,
          });
        
        

    })
})