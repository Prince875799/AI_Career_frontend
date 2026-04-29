import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadResume, generateResume, checkATS } from "../controllers/resumeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 1. Check if uploads folder exists, if not, create it
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 2. Advanced Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Unique filename with original extension
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

// 3. File Filter (Only PDF & Images/Docs)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|txt/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (extname) {
        return cb(null, true);
    } else {
        cb(new Error("Only .pdf, .doc, and .txt files are allowed!"));
    }
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// --- ROUTES ---

// Upload & Process Resume
router.post(
    "/upload",
    authMiddleware,
    upload.single("resume"),
    uploadResume
);

// AI Resume Generation (Llama 3.1)
router.post(
    "/generate",
    authMiddleware,
    generateResume
);

// ATS Analysis Route (Adding the Pro feature we wrote)
router.post(
    "/check-ats",
    authMiddleware,
    checkATS
);

export default router;