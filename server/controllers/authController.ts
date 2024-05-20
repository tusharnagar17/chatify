import { Request, Response, NextFunction } from "express";
import User from "../model/userModel"
import bcrypt from "bcrypt"
import mongoose from "mongoose";


export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        
        const emailCheck = await User.findOne({email}) 
        
        const hashedPassword = emailCheck ? await bcrypt.compare(password, emailCheck?.password) : false
        

        if(hashedPassword && emailCheck){

            const userResponse = await User.findById(emailCheck._id).select("username _id avatarImage isAvatarImageSet")
            
            return res.json({status: true , message: "Email and password match", user: userResponse})

        }else{
            
            return res.json({status: false, message: "Incorrect Email and Password!"})
        }
    } catch (error) {
        next(error)
    }
}

// register
export const register = async (req, res, next) => {
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
        next(error)
    }
}

export const setAvatar = async (req, res, next) => {
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
        next(error)
    }
}

export const getAllUsers = async (req, res, next) => {
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
        next(error)
    }
    }