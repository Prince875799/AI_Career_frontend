import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import { 
  FaFileAlt, 
  FaRoute, 
  FaUserTie, 
  FaSignOutAlt, 
  FaThLarge, 
  FaChevronRight, 
  FaRegUserCircle, 
  FaBars,
  FaRobot,
  FaLightbulb,
  FaRocket
} from "react-icons/fa";

// Components
import ResumeBuilder from "./ResumeBuilder";
import CareerForm from "./CareerForm";
import LandingPage from "./LandingPage";

const CombineDashboard = () => {
  const { userData, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      getCurrentUser();
      navigate("/login");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  const menuItems = [
    { id: "overview", name: "Dashboard Home", icon: <FaThLarge /> },
    { id: "builder", name: "Resume Builder", icon: <FaFileAlt /> },
    { id: "roadmap", name: "Career Roadmap", icon: <FaRoute /> },
    { id: "interview", name: "Mock Interview", icon: <FaUserTie /> },
  ];

  // Naya Hero Section Component (Feature ki jagah)
  const DashboardHero = () => (
    <div className="p-8 md:p-12 max-w-6xl mx-auto text-left">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A6FF5D]/10 border border-[#A6FF5D]/20 text-[#A6FF5D] text-xs font-bold tracking-widest uppercase">
          <FaRobot /> AI-Powered Career Intelligence
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black leading-tight">
          Shape Your Future <br /> 
          <span className="text-[#A6FF5D]">With Precision.</span>
        </h2>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          Welcome back, <span className="text-white font-semibold">{userData?.name}</span>. 
          Our AI engine has analyzed the current market trends. You are currently in the top 
          bracket of emerging talent. Use the tools below to accelerate your journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
  {[
    { 
      title: "Career Roadmap", 
      desc: "Our AI dissects your background to identify 'hidden' transferable skills that traditional recruiters often miss.", 
      icon: <FaLightbulb className="text-2xl text-[#A6FF5D]" />,
      detail: "Deep Analysis Engine"
    },
    { 
      title: "Resume Builder", 
      desc: "Every resume generated is pre-scanned against 50+ Applicant Tracking Systems to ensure 95%+ match rates.", 
      icon: <FaFileAlt className="text-2xl text-[#A6FF5D]" />,
      detail: "Bot-Friendly Tech"
    },
    { 
      title: "Interview Preparation", 
      desc: "Using LLMs to simulate actual company-specific interview patterns based on thousands of real historical data points.", 
      icon: <FaRocket className="text-2xl text-[#A6FF5D]" />,
      detail: "Real-time AI Feedback"
    }
  ].map((item, index) => (
    <motion.div 
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-2xl border border-white/5 bg-[#0D0D0D] relative overflow-hidden group"
    >
      {/* Background Subtle Glow Effect */}
      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-[#A6FF5D]/5 blur-2xl rounded-full transition-all group-hover:bg-[#A6FF5D]/10"></div>
      
      <div className="relative z-10">
        <div className="mb-4 inline-block p-3 rounded-lg bg-[#A6FF5D]/5">
          {item.icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {item.desc}
        </p>
        
        {/* Extra Informative Label */}
        <div className="pt-4 border-t border-white/5">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#A6FF5D]/60">
            {item.detail}
          </span>
        </div>
      </div>
    </motion.div>
  ))}
</div>

        {/* Stats Section */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#A6FF5D]/5 to-transparent border border-[#A6FF5D]/10 flex flex-wrap gap-12">
          <div>
            <p className="text-3xl font-black text-white">98%</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Accuracy Rate</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white">2.5k+</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Skills Mapped</p>
          </div>
          <div>
            <p className="text-3xl font-black text-[#A6FF5D]">PRO</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Account Status</p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "builder": return <ResumeBuilder />;
      case "roadmap": return <CareerForm />;
      case "interview": return <LandingPage />;
      default: return <DashboardHero />;
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden selection:bg-[#A6FF5D] selection:text-black">
      
      {/* --- SIDEBAR --- */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? "280px" : "80px" }}
        className="border-r border-white/5 bg-[#0A0A0A] hidden md:flex flex-col relative z-20"
      >
        <div className="p-6 mb-4 flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              AI CAREER GUIDANCE.
            </h1>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg text-gray-400">
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                activeTab === item.id 
                  ? "bg-[#A6FF5D] text-black shadow-[0_0_25px_rgba(166,255,93,0.15)]" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && <span className="text-sm font-semibold whitespace-nowrap">{item.name}</span>}
              {activeTab === item.id && isSidebarOpen && <FaChevronRight className="ml-auto text-[10px] opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-medium">
            <FaSignOutAlt className="text-lg" />
            {isSidebarOpen && "Logout"}
          </button>
        </div>
      </motion.aside>

      {/* --- MAIN AREA --- */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#A6FF5D]/5 blur-[120px] rounded-full pointer-events-none"></div>

        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl z-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            {menuItems.find(t => t.id === activeTab)?.name || "Overview"}
          </h2>

          <div className="flex items-center gap-5">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold leading-none mb-1">{userData?.name}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Verified User</p>
            </div>
            <div className="w-10 h-10 rounded-full ring-2 ring-white/5 bg-[#111] flex items-center justify-center text-[#A6FF5D] border border-white/10">
              {userData?.name ? userData.name[0].toUpperCase() : <FaRegUserCircle />}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default CombineDashboard;