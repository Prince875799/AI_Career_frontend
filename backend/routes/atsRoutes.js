import express from "express";
import { checkATS } from "../controllers/atsController.js";

const router = express.Router();

router.post("/check",checkATS);

export default router;