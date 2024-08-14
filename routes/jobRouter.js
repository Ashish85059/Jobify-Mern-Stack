import {Router} from 'express';
import {validateJobInput,validateIdParam}from "../middlewares/validationMiddlewares.js"
const router =Router()

import {getJob,getAllJobs,createJob,updateJob,deleteJob,showStats, applyToJob, approveJob, rejectJob} from "../controllers/jobController.js";
import { checkForTestUser } from '../middlewares/authMiddleware.js';

// router.get('/', getAllJobs);
 
router.route("/").get(getAllJobs).post(checkForTestUser,validateJobInput, createJob);
router.route("/stats").get(showStats)
router.route("/:id").get(validateIdParam,getJob).patch(checkForTestUser,validateJobInput,validateIdParam, updateJob).delete(checkForTestUser,validateIdParam,deleteJob)
router.post("/apply-job/:id",applyToJob)
router.post("/approve-application",approveJob).post("/reject-application",rejectJob);
export default router;
