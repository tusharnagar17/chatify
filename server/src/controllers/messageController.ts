import { Request, Response, NextFunction } from "express";
import MessageModel from "../model/messageModel";

  // @ts-ignore: Ignore TypeScript error on the next line
export const AllMessage = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const {from, to} = req.body;
        const messageOnline = await MessageModel.find({users: {
            $all: [from, to]
        }}).sort({updatedAt: 1})

        const ProjectedMessage = messageOnline.map((msg)=> {return {
            fromSelf: msg.sender.toString() === from,
            message: msg?.message?.text,
        }})

        return res.status(200).json({ProjectedMessage})
    } catch (error) {
        next(error)
    }
}


  // @ts-ignore: Ignore TypeScript error on the next line
export const SendMessage = async (req: Request, res: Response<SendMessageBody>, next: NextFunction) => {
    try {
        const {from, to, message} = req.body
        const response = await MessageModel.create({
            message: {text: message},
            users: [from, to],
            sender: from
        })
        if(response){
            return res.status(200).json({status: true, message: "Message Sent!"})
        }else {
            return res.status(503).json({status: false, message: "Failed to Send Message!"})
        }
    } catch (error) {
        
        next(error)
    }
}