import express from "express";
import {LogOut, getProfile, RegisterUser, LoginUser} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",RegisterUser);
router.post("/login",LoginUser);
router.get("/profile",authMiddleware,getProfile);
router.get("/logout",LogOut);

export default router;