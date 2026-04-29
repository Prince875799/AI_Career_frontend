import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { motion } from "framer-motion"; // Animation ke liye

const Login = () => {
  const [show, setShow] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const { getCurrentUser } = useContext(userDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error);
      setShowError(true);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden">
      
      {/* Premium Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#A6FF5D]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[450px] px-6"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter mb-2 italic">
            AI <span className="text-[#A6FF5D]">COACH.</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">
            Sign in to your professional workspace
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[55px] px-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#A6FF5D]/50 focus:outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                <span className="text-[10px] text-[#A6FF5D] cursor-pointer hover:underline">Forgot?</span>
              </div>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[55px] px-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#A6FF5D]/50 focus:outline-none transition-all placeholder:text-gray-600"
                />
                <button 
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  {show ? <FaEyeSlash size={20} /> : <IoEyeSharp size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button className="group relative h-[55px] bg-[#A6FF5D] text-black font-bold rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(166,255,93,0.3)] active:scale-95">
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>

            {/* Footer */}
            <p className="text-center text-gray-500 text-sm mt-2">
              New here?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-white font-bold cursor-pointer hover:text-[#A6FF5D] transition"
              >
                Create Account
              </span>
            </p>
          </form>
        </div>
      </motion.div>

      {/* Error Modal - Updated to Premium Style */}
      {showError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111] border border-red-500/20 p-8 rounded-3xl text-center max-w-[320px] shadow-[0_0_50px_rgba(239,68,68,0.1)]"
          >
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
               <span className="text-red-500 text-2xl">✕</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400 text-sm mb-6">The email or password you entered is incorrect.</p>
            <button
              onClick={() => setShowError(false)}
              className="w-full py-3 bg-red-500/10 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Login;