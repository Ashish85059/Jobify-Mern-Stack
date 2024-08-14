import { Router } from "express";
import { getAllUsers, getApplicationStatus, getCurrentUser, updateUser } from "../controllers/userController.js";
import {validateUpdateUserInput} from "../middlewares/validationMiddlewares.js"
import { authorizePermissions ,checkForTestUser} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
const router = Router();


router.get("/current-user",getCurrentUser).get("/getAllUsers",getAllUsers);
router.get("/admin/app-stats",[ authorizePermissions('admin'),getApplicationStatus] );
router.patch("/update-user",checkForTestUser, upload.single("avatar"),validateUpdateUserInput, updateUser);

export default router;
