import { Router } from "express";
const router = Router();

import { getResume, setResume } from "../controllers/resumeController.js";

router.route("/").post(setResume).get(getResume);

export default router;
