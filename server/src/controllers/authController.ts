import { Request, Response, NextFunction } from "express";
import User from "../model/userModel";
import bcrypt from "bcrypt"
import mongoose from "mongoose";

  // @ts-ignore: Ignore TypeScript error on the next line
export const login = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {email, password} = req.body;
        
        const emailCheck = await User.findOne({email}) 
        console.log(emailCheck)
        
        
        if (!emailCheck) {
            return res.status(401).json({ status: false, message: "Incorrect Email and Password!" });
        }

        const isPasswordValid = await bcrypt.compare(password, emailCheck.password);

        if (!isPasswordValid) {
            return res.status(401).json({ status: false, message: "Incorrect Email and Password!" });
        }

        const userResponse = await User.findById(emailCheck._id).select("username _id avatarImage isAvatarImageSet");
        
        return res.status(200).json({ status: true, message: "Email and password match", user: userResponse });
    } catch (error:unknown) {
        let errorMessage = ""
        if(error instanceof TypeError){
            errorMessage +=error.message
        }
        res.status(500).json({ status: false, message: "An error occurred", error: errorMessage });
        next(error)
    }
}

// register
  // @ts-ignore: Ignore TypeScript error on the next line
export const register = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {username, email, password} = req.body;
        // check duplicate username
        const usernameCheck = await User.findOne({username})

        // check duplicat email
        const emailCheck = await User.findOne({email})
        if(usernameCheck){
            return res.json({status: false, message: "Username already exists!"})
        }
        if(emailCheck){
            return res.json({status: false , message: "Email already exists!"})
        }

    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username, email, password: hashedPassword
        })
        const userResponse = await User.findById(newUser?._id).select("username _id avatarImage isAvatarImageSet")
       
        return res.json({status: true, user: userResponse, message: "Successfully created account!"})
    } catch (error) {
        let errorMessage = ""
        if(error instanceof TypeError){
            errorMessage +=error.message
        }
        res.status(500).json({ status: false, message: "An error occurred", error: errorMessage });
        next(error)
    }
}

  // @ts-ignore: Ignore TypeScript error on the next line
export const setAvatar = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userId = req.params.id
        const image = req.body.image

        const userData = await User.findByIdAndUpdate(userId, {
            avatarImage: image,
            isAvatarImageSet: true
        }, {new:true})
        const userResponse = await User.findById(userData?._id).select("username _id avatarImage isAvatarImageSet")
    return res.json({ status: true, user: userResponse })
        
    } catch (error) {
        let errorMessage = ""
        if(error instanceof TypeError){
            errorMessage +=error.message
        }
        res.status(500).json({ status: false, message: "An error occurred", error: errorMessage });
        next(error)
    }
}

  // @ts-ignore: Ignore TypeScript error on the next line
export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userId = mongoose.Types.ObjectId.createFromHexString(req.params.id)
        
        const AllUserData = await User.find({_id: {$ne: userId}}).select([
            "username",
            "email",
            "avatarImage",
            "_id"
        ])

        return res.json({status: true, user: AllUserData})

    } catch (error) {
        let errorMessage = ""
        if(error instanceof TypeError){
            errorMessage +=error.message
        }
        res.status(500).json({ status: false, message: "An error occurred", error: errorMessage });
        next(error)
    }
    }