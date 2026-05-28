import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { generateCareerRoadmap } from "../controllers/careerController.js";

const router = express.Router();

// Generate Career Roadmap
router.post("/roadmap", authMiddleware, generateCareerRoadmap);

export default router;