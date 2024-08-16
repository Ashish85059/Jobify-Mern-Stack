import User from "../models/UserModel.js";
import Resume from "../models/ResumeSchema.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { verifyJWT } from "../utils/tokenUtils.js";

export const setResume = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { userId } = verifyJWT(token);
    const {
      personalInfo,
      summary,
      education,
      projects,
      achievements,
      certifications,
      skills,
    } = req.body;

    // Check if a resume already exists for the given userId
    let resume = await Resume.findOne({ id: userId });

    if (resume) {
      // If resume exists, update it with the new data
      resume.personalInfo = personalInfo;
      resume.summary = summary;
      resume.education = education;
      resume.projects = projects;
      resume.achievements = achievements;
      resume.certifications = certifications;
      resume.skills = skills;

      await resume.save();
      res
        .status(StatusCodes.OK)
        .json({ resume, msg: "Resume updated successfully" });
    } else {
      // If resume doesn't exist, create a new one
      resume = await Resume.create({
        id: userId,
        personalInfo,
        summary,
        education,
        projects,
        achievements,
        certifications,
        skills,
      });
      res
        .status(StatusCodes.CREATED)
        .json({ resume, msg: "Resume created successfully" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong", error: error.message });
  }
};


export const getResume=async(req,res)=>{
    try {
        const { token } = req.cookies;
        const { userId } = verifyJWT(token);
        const data=await Resume.find({id:userId});
        res.status(StatusCodes.OK).json({data})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong",error:error.message})
    }
}