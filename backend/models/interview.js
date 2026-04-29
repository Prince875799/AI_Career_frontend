import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  role: String,
  question: String,
  options: [String], // Array for A, B, C, D
  correctAnswer: String,
  userAnswer: String,
  score: Number,
  feedback: String,
  explanation: String, // UI ke liye zaruri hai
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Interview", interviewSchema);