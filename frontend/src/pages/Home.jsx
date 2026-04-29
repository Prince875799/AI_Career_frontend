import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Features from "../components/Features";

const Home = () => {
  const { userData, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      getCurrentUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#A6FF5D] selection:text-black">
      {/* Background Glows (Premium Aesthetic) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#A6FF5D]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-black tracking-tighter cursor-pointer bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            onClick={() => navigate("/")}
          >
            AI CAREER GUIDANCE.
          </motion.h1>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-400">
            {userData && (
              <>
                <button onClick={() => navigate("/builder")} className="hover:text-[#A6FF5D] transition-colors">Resume Builder</button>
                <button onClick={() => navigate("/")} className="hover:text-[#A6FF5D] transition-colors">Career Roadmap</button>
                <button onClick={() => navigate("/q")} className="hover:text-[#A6FF5D] transition-colors">Mock Interview</button>
              </>
            )}
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4 relative">
            <button onClick={() => setShowProfile(!showProfile)}>
              {!userData ? (
                <FaRegUserCircle className="text-2xl hover:text-[#A6FF5D] transition-colors" />
              ) : (
                <div className="w-10 h-10 border border-[#A6FF5D]/30 bg-gradient-to-br from-[#A6FF5D] to-[#86efac] text-black font-bold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(166,255,93,0.2)]">
                  {userData?.name[0].toUpperCase()}
                </div>
              )}
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-14 bg-[#111] border border-white/10 p-2 rounded-xl w-44 shadow-2xl overflow-hidden"
                >
                  {!userData ? (
                    <button onClick={() => navigate("/login")} className="w-full text-left px-4 py-2.5 hover:bg-white/5 rounded-lg text-sm transition-all">Login</button>
                  ) : (
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 hover:bg-red-500/10 text-red-400 rounded-lg text-sm transition-all font-medium">Logout</button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Hero Content (No Image Card) */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="inline-block px-4 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase bg-white/5 border border-white/10 rounded-full text-[#A6FF5D]">
            Intelligence for the next generation
          </span>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
            Dominate your <br />
            <span className="bg-gradient-to-r from-emerald-400 via-[#A6FF5D] to-blue-500 bg-clip-text text-transparent">
              Career Journey
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            An all-in-one AI ecosystem designed to refine your resume, chart your career path, and sharpen your interview skills.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={() => navigate(userData ? "/combinedashboard" : "/signup")}
              className="w-full sm:w-auto bg-[#A6FF5D] text-black px-10 py-4 rounded-full font-black text-sm tracking-wide hover:shadow-[0_0_40px_rgba(166,255,93,0.3)] transition-all active:scale-95 uppercase"
            >
              {userData ? "Open Dashboard" : "Get Started Now"}
            </button>
            
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      {/* <section className="pb-32">
        <Features />
      </section> */}

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 text-center text-gray-600 text-xs tracking-widest uppercase">
        © 2026 AI Career Coach. Built for the Elite.
      </footer>
    </div>
  );
};

export default Home;