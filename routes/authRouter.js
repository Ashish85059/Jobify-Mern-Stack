import { Router } from "express";
const router=Router();
import { login,register,logout } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middlewares/validationMiddlewares.js";

router.post("/register",validateRegisterInput,register)
router.post("/login",validateLoginInput,login)
router.get("/logout",logout)
export default router;