import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

// import atsRoutes from "./routes/atsRoutes.js";
// import careerRoutes from "./routes/careerRoutes.js";
 import interviewRoutes from "./routes/interviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://ai-career-guidance-frontend.onrender.com", 
  credentials: true
}));

// Initialize Groq Client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Inject Groq into Request object (Global accessibility)
app.use((req, res, next) => {
  req.groq = groq;
  next();
});

// Main API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/genrate", resumeRoutes);

// app.use("/api/career", careerRoutes);
 app.use("/api/interview", interviewRoutes);
// app.use("/api/ats", atsRoutes);

// General AI Chat (For Quick Help/Doubt Clearing)
app.post("/api/ask-ai", async (req, res) => {
  try {
    const { interest, skill, goal } = req.body;

    const prompt = `
    You are a career expert.

    Based on:
    Interest: ${interest}
    Skill Level: ${skill}
    Goal: ${goal}

    Give:
    1. Best career suggestion
    2. Step-by-step roadmap (points only)
    3. Required skills

    Keep answer clean and structured.
    `;

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({
      reply: chatCompletion.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ message: "AI Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
