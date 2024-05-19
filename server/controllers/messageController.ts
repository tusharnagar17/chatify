import { Request, Response, NextFunction } from "express";
import MessageModel from "../model/messageModel";

export const AllMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {from, to} = req.body;
        const messageOnline = await MessageModel.find({users: {
            $all: [from, to]
        }}).sort({updatedAt: 1})

        const ProjectedMessage = messageOnline.map((msg)=> {return {
            fromSelf: msg.sender.toString() === from,
            message: msg?.message?.text,
        }})

        return res.json({ProjectedMessage})
    } catch (error) {
        next(error)
    }
}

export const SendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {from, to, message} = req.body
        const response = await MessageModel.create({
            message: {text: message},
            users: [from, to],
            sender: from
        })
        if(response){
            return res.json({msg: "Message Sent!"})
        }else {
            return res.json({msg: "Failed to Send Message!"})
        }
    } catch (error) {
        next(error)
    }
}