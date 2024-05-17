import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 3,
        max:20,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
      },
    avatarImage: {
        type: String,
        default: "",
    },
})
const User = mongoose.model("Users", userSchema)

export default User

