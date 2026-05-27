// src/api/ai.js

import axios from "axios";

export const generateCareerAI = async (data) => {
  const res = await axios.post(
    "http://localhost:5000/api/ask-ai",
    data
  );
  return res.data.reply;
};