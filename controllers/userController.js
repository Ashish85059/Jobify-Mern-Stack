import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import {promises as fs} from "fs";
import cloudinary from "cloudinary";

export const  getCurrentUser=async(req,res)=>{
    const user=await User.findOne({_id:req.user.userId})
    // console.log(user)
    const userwithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({user})
}
export const getAllUsers=async(req,res)=>{
    const users=await User.find({})
    res.status(StatusCodes.OK).json({users})
}
export const  getApplicationStatus=async(req,res)=>{
    const users=await User.countDocuments();
    const jobs=await Job.countDocuments();

    res.status(StatusCodes.OK).json({"users":users, "jobs":jobs})
}


export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
//   console.log(newUser)
  delete newUser.password;
  if (req.file) {
    console.log(req.file.path)
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "update user" });
};