import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const [show, setShow] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlreadyRegistered, setShowAlreadyRegistered] = useState(false);

  const navigate = useNavigate();
  const { getCurrentUser } = useContext(userDataContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        serverUrl + "/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );
      getCurrentUser();
      setShowSuccess(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (
        error.response &&
        error.response.data.message?.toLowerCase().includes("already")
      ) {
        setShowAlreadyRegistered(true);
      }
    }
  };

  return (
    <div className="w-screen min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden py-10">
      
      {/* Background Neon Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#A6FF5D]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[480px] px-6"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter mb-2 italic">
            AI <span className="text-[#A6FF5D]">COACH.</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">
            Start your professional journey today
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[52px] px-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#A6FF5D]/50 focus:outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[52px] px-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#A6FF5D]/50 focus:outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[52px] px-5 rounded-2xl bg-white/5 border border-white/10 focus:border-[#A6FF5D]/50 focus:outline-none transition-all placeholder:text-gray-600"
                />
                <button 
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  {show ? <FaEyeSlash size={18} /> : <IoEyeSharp size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button className="group relative h-[55px] bg-[#A6FF5D] text-black font-bold rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(166,255,93,0.3)] active:scale-95 mt-2">
              <span className="relative z-10">Create Account</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>

            {/* Footer */}
            <p className="text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-white font-bold cursor-pointer hover:text-[#A6FF5D] transition"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </motion.div>

      {/* Modals Container */}
      <AnimatePresence>
        {/* Success Modal */}
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#111] border border-[#A6FF5D]/20 p-8 rounded-3xl text-center max-w-[320px] shadow-[0_0_50px_rgba(166,255,93,0.1)]"
            >
              <FaCheckCircle className="text-[#A6FF5D] text-5xl mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Welcome Aboard!</h2>
              <p className="text-gray-400 text-sm mb-6">Your account has been created successfully.</p>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 bg-[#A6FF5D] text-black font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(166,255,93,0.4)]"
              >
                Go to Login
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Already Registered Modal */}
        {showAlreadyRegistered && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#111] border border-red-500/20 p-8 rounded-3xl text-center max-w-[320px] shadow-[0_0_50px_rgba(239,68,68,0.1)]"
            >
              <FaExclamationCircle className="text-red-500 text-5xl mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">User Exists</h2>
              <p className="text-gray-400 text-sm mb-6">This email is already registered with us.</p>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 bg-red-500/10 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all"
              >
                Login Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Register;