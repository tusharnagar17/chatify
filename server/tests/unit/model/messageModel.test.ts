import MessageModel from "../../../src/model/messageModel"
import mongoose from "mongoose";

describe("MessageModel test", ()=> {
    it('should create and save a new message successfully', async () => {
        const testData = {
          message: { text: 'Hello, world!' },
          users: ['user1', 'user2'],
          sender: new mongoose.Types.ObjectId(),
        };
    
        const message = new MessageModel(testData);
        const savedMessage = await message.save();
    
        // Object Id should be defined when successfully saved to MongoDB
        expect(savedMessage._id).toBeDefined();
        expect(savedMessage.message?.text).toBe(testData.message.text);
        expect(savedMessage.users).toEqual(testData.users);
        expect(savedMessage.sender).toEqual(testData.sender);
        
      });
})