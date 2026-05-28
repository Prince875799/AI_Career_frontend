/**import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {askAI} from "../controllers/aiController.js";

const router = express.Router();

router.post("/ask", askAI);

export default router; **/


import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { askAI } from "../controllers/aiController.js";

const router = express.Router();

// AI Question Route
router.post("/ask", authMiddleware, askAI);

export default router;