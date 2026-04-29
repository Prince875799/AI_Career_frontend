import express from "express";
import { startInterview, submitAnswer } from "../controllers/interviewController.js";

const router = express.Router();

// AI Question Generate karne ke liye
router.post("/start", startInterview);

// Answer submit karke result/explanation lene ke liye
router.post("/answer", submitAnswer);

export default router;