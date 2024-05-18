import { Request, Response, NextFunction } from "express";
import User from "../model/userModel"
import bcrypt from "bcrypt"

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        console.log("login with email and password")
        console.log(email, password)
        
        const emailCheck = await User.findOne({email}) 
        
        const hashedPassword = emailCheck ? await bcrypt.compare(password, emailCheck?.password) : false
        

        if(hashedPassword && emailCheck){
            
            return res.json({status: true , message: "Email and password match", user: {
                avatarImage: emailCheck.avatarImage,
                isAvatarImageSet: emailCheck.isAvatarImageSet,
                username: emailCheck.username,
                _id:emailCheck._id,
            }})

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
        console.log("Get username , email and password")
        console.log(username, email, password)
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
        const userResponse = {
            id: newUser.id,
            username: newUser.username,
        }
        return res.json({status: true, user: newUser, message: "Successfully created account!"})
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
        })
        console.log(userData)
    return res.json({isSet: userData?.isAvatarImageSet, image: userData?.avatarImage })
        
    } catch (error) {
        next(error)
    }
}