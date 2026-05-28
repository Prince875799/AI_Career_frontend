import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-career-backend-3sbg.vercel.app/api",
  withCredentials: true   // cookie send करने के लिए
});

export default api;