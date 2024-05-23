import User from "../../../src/model/userModel"

describe("userModel test", ()=> {
    it("able to create user",async ()=> {
        const fakeData = {
            username: "fakeName",
            email: "fakeemail@gmail.com",
            password: "fakepassword",
            isAvatarImageSet: false,
            avatarImage: ""
        }
        const newUser = await User.create(fakeData)

        expect(newUser.username).toEqual(fakeData.username)
    })
})