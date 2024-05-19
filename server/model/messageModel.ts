import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
    { 
        message: {
            text: {type: String, required: true}
        }, 
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
    },
    {
        timestamps: true
    }
)

const MessageModel = mongoose.model("Messages", messageSchema)

export default MessageModel

