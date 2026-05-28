import axios from "axios";

const api = axios.create({
  baseURL: "http://ai-career-backend-3sbg.vercel.app",
  withCredentials: true   // cookie send करने के लिए
});

export default api;