// src/api/ai.js

import axios from "axios";

export const generateCareerAI = async (data) => {
  const res = await axios.post(
    "https://ai-career-backend-3sbg.vercel.app/api/ask-ai",
    data
  );
  return res.data.reply;
};