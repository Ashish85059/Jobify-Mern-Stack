import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import  mongoose  from "mongoose";
import day from "dayjs"
import nodemailer from "nodemailer";
import { verifyJWT } from "../utils/tokenUtils.js";


export const getAllJobs = async (req, res) => {
  const { token } = req.cookies;
  const { userId,mainRole,role } = verifyJWT(token);
  const {search,jobType,sort}=req.query;
  const queryObject={};
  if(search){
    queryObject.$or=[
      {position:{$regex:search,$options:'i'}},
      {company:{$regex:search,$options:'i'}}
    ]
  }
  if(jobType && jobType!=='all'){
    queryObject.jobType=jobType;
  }

  const sortOptions={
    newest:"-createdAt",
    oldest:"createdAt",
    'a-z':"postion",
    'z-a':"-position",
  }

  const sortKey=sortOptions[sort] || sortOptions.newest

  // setup pagination
  const page=Number(req.query.page)||1
  const limit = Number(req.query.page) || 10
  const skip=(page-1)*limit;

  if(mainRole==="Employee" || role=="admin" || role=="demo"){
    const jobs = await Job.find(queryObject).sort(sortKey)
    const totalJobs=await Job.countDocuments(queryObject)
    const numOfPages =Math.ceil(totalJobs/limit)
    // console.log(req.user)
    return res.status(StatusCodes.OK).json({totalJobs,numOfPages,totalJobs,currentPage:page,"jobs": jobs });  
  }
  queryObject.createdBy=userId;
  const jobs = await Job.find(queryObject)
  .sort(sortKey)
  const totalJobs=await Job.countDocuments(queryObject)
  const numOfPages =Math.ceil(totalJobs/limit)
  // console.log(req.user)
    res.status(StatusCodes.OK).json({totalJobs,numOfPages,totalJobs,currentPage:page, jobs });
};

export const createJob = async (req, res) => {
    req.body.createdBy=req.user.userId
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });  
};



export const getJob = async (req, res) => {
  const { id } = req.params;
  const job=await Job.findById(id); 
  
  if (!job) {
    throw new NotFoundError( `No job with id ${id} `)
  }

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  
  const updatedJob=await Job.findByIdAndUpdate(id,req.body,{
    new: true,
  });

  
  if (!updatedJob) {
    throw new NotFoundError( `No job with id ${id} `)
  }

  res.status(StatusCodes.OK).json({ msg: "Job modified", job: updateJob });
};

const sendStatusEmail = async (user, job, status, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "ashishsharma903461@gmail.com", // your email
      pass: "upkcnhbblhxgtczt", // your app password
    },
  });

  const subject =
    status === "Approved" ? "Congratulations!" : "Application Status";
  const text =
    status === "Approved"
      ? `You have been shortlisted for our company ${job.company} for the role of ${job.position}. Wait for the offer letter.`
      : `We regret to inform you that your application for the role of ${job.position} at ${job.company} has been declined.`;

  const receiver = {
    from: "ashishsharma903461@gmail.com", // sender's email (should match auth user)
    to: user.email, // receiver's email
    subject: subject,
    text: text,
  };

  transporter.sendMail(receiver, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ msg: "Failed to send email" });
    }
    console.log("Email sent successfully:", info.response);
    res.status(200).json({ msg: `Job ${status} and Mail sent` });
  });
};

export const approveJob = async (req, res) => {
  const { userId, jobId } = req.body;

  try {
    const user = await User.findById(userId);
    const job = await Job.findById(jobId);

    // Find the applied job by matching the jobId
    const appliedJob = user.appliedJobs.find((us) => us.id === jobId);

    if (appliedJob) {
      appliedJob.status = "Approved"; // Update the status

      // Explicitly mark the appliedJob array as modified
      user.markModified("appliedJobs");

      await user.save(); // Save the changes to the user document
      console.log("Job status updated:", appliedJob);

      // Send the approval email
      await sendStatusEmail(user, job, "Approved", res);
    } else {
      res.status(404).json({ msg: "Job not found in applied jobs" });
    }
  } catch (error) {
    console.error("Error approving job:", error);
    res.status(500).json({ msg: "Failed to approve job" });
  }
};

export const rejectJob = async (req, res) => {
  const { userId, jobId } = req.body;
  console.log("userId", userId);
  console.log("jobId", jobId);

  try {
    const user = await User.findById(userId);
    const job = await Job.findById(jobId);

    // Find the applied job by matching the jobId
    const appliedJob = user.appliedJobs.find((us) => us.id === jobId);

    if (appliedJob) {
      appliedJob.status = "Declined"; // Update the status

      // Explicitly mark the appliedJob array as modified
      user.markModified("appliedJobs");

      await user.save(); // Save the changes to the user document
      console.log("Job status updated:", appliedJob);

      // Send the rejection email
      await sendStatusEmail(user, job, "Declined", res);
    } else {
      res.status(404).json({ msg: "Job not found in applied jobs" });
    }
  } catch (error) {
    console.error("Error Declining job:", error);
    res.status(500).json({ msg: "Failed to Decline job" });
  }
};


export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const removedJob=await Job.findByIdAndDelete(id);

  if (!removedJob) { 
    throw new NotFoundError( `No job with id ${id} `)
  }

  res.status(StatusCodes.OK).json({ msg: "Job deleted", job: removedJob });
};

export const applyToJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Job not found" });
    }

    const { token } = req.cookies;
    const { userId } = verifyJWT(token);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
    }

    // Check if the user has already applied to the job
    const hasApplied = user.appliedJobs.some((applied) => applied.id === id);

    if (hasApplied) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You have already applied to this job" });
    }

    // Add the job ID to the user's applied jobs
    user.appliedJobs.push({ id, status: "pending" });
    await user.save();

    // Add the user ID to the job's appliedBy list
    job.appliedBy.push(userId);
    await job.save();

    res
      .status(StatusCodes.OK)
      .json({ msg: "Job applied successfully", appliedJobs: user.appliedJobs });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong", error: error.message });
  }
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  // console.log(stats) 

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { 
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    }) 
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};