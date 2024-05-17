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
            
            return res.json({status: true , message: "Email and password match"})

        }else{
            
            return res.json({status: false, message: "Incorrect Email I'd password"})
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
            email: newUser.email
        }
        return res.json({status: true, user: userResponse, message: "Successfully created account!"})
    } catch (error) {
        next(error)
    }
}