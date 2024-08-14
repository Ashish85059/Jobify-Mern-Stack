import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs"
import {comparePassword, hashPassword} from  "../utils/passwordUtils.js"
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register=async(req,res)=>{
    console.log("Creating user")
    const isFirstAccount=await User.countDocuments()===0; // gives total users in Users collection
    req.body.role=isFirstAccount?"admin":"user"; // agar pehla account hai toh usse admin bnayange

    const hashedPassword=await hashPassword(req.body.password);
    // console.log(hashedPassword)
    req.body.password=hashedPassword;  // hashed password store karega
    console.log("Almost done")
    const user=await User.create(req.body);
    console.log("User created: " + user)
    res.status(StatusCodes.CREATED).json({msg:"user created"});
}

export const login=async(req,res)=>{
    const {email,password} = req.body;
    const user=await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError("invalid email address")
    }

    const isPasswordCorrect =await comparePassword(req.body.password, user.password)
    if(!isPasswordCorrect) throw new UnauthenticatedError("invalid password")

    const token=createJWT({userId:user._id,role:user.role,mainRole:user.mainRole});

    const day=1000*60*60*24

    res.cookie("token",token,{
        httpOnly: true,
        expires:new Date(Date.now()+day),
        secure:process.env.NODE_ENV==="production"  // secure true hota hai toh cookie HTTPS se bhejate hai, production mode se secure true hone se kab karte hai
    })
    
    res.status(StatusCodes.OK).json({msg:"USER LOGGED IN"})
}


export const logout=async(req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({msg:"user logged out!"})
}