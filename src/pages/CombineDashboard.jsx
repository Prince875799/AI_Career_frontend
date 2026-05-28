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
  FaRegUserCircle,
  FaBars,
  FaRobot,
  FaLightbulb,
  FaRocket
} from "react-icons/fa";

import ResumeBuilder from "./ResumeBuilder";
import CareerForm from "./CareerForm";
import LandingPage from "./LandingPage";

const CombineDashboard = () => {
  const { userData, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);

  const [activeTab, setActiveTab] = useState("overview");

  // ONLY MOBILE CONTROL
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get(serverUrl + "/api/auth/logout", {
      withCredentials: true,
    });
    getCurrentUser();
    navigate("/login");
  };

  const menuItems = [
    { id: "overview", name: "Dashboard Home", icon: <FaThLarge /> },
    { id: "builder", name: "Resume Builder", icon: <FaFileAlt /> },
    { id: "roadmap", name: "Career Roadmap", icon: <FaRoute /> },
    { id: "interview", name: "Mock Interview", icon: <FaUserTie /> },
  ];

  // ================= HERO (UNCHANGED) =================
  const DashboardHero = () => (
    <div className="p-8 md:p-12">
      <h1 className="text-5xl font-bold text-white">
        AI Career Dashboard
      </h1>

      <p className="text-gray-400 mt-3">
        Welcome {userData?.name}
      </p>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

  {/* CAREER ROADMAP CARD */}
  <div
    onClick={() => setActiveTab("roadmap")}
    className="cursor-pointer p-6 bg-[#0D0D0D] border border-white/5 rounded-2xl hover:bg-white/5 transition"
  >
    <FaLightbulb className="text-[#A6FF5D] text-2xl mb-2" />
    <h3 className="text-white font-bold">Career Roadmap</h3>
    <p className="text-gray-400 text-sm">
      AI builds your career path
    </p>
  </div>

  {/* RESUME BUILDER CARD */}
  <div
    onClick={() => setActiveTab("builder")}
    className="cursor-pointer p-6 bg-[#0D0D0D] border border-white/5 rounded-2xl hover:bg-white/5 transition"
  >
    <FaFileAlt className="text-[#A6FF5D] text-2xl mb-2" />
    <h3 className="text-white font-bold">Resume Builder</h3>
    <p className="text-gray-400 text-sm">
      Create ATS optimized resume
    </p>
  </div>

  {/* INTERVIEW / QUIZ */}
  <div
    onClick={() => setActiveTab("interview")}
    className="cursor-pointer p-6 bg-[#0D0D0D] border border-white/5 rounded-2xl hover:bg-white/5 transition"
  >
    <FaRocket className="text-[#A6FF5D] text-2xl mb-2" />
    <h3 className="text-white font-bold">Test / Quiz Prep</h3>
    <p className="text-gray-400 text-sm">
      AI mock interview system
    </p>
  </div>

</div>
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
    <div className="flex h-screen bg-[#050505] text-white">

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileSidebar && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      {/* ================= DESKTOP SIDEBAR (ORIGINAL STYLE) ================= */}
      <aside className="hidden md:flex w-[280px] h-full bg-[#0A0A0A] border-r border-white/5 flex-col">

        <div className="p-4 text-white font-bold border-b border-white/10">
          AI CAREER
        </div>

        <nav className="flex-1 px-3 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                activeTab === item.id
                  ? "bg-[#A6FF5D] text-black"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="text-red-400 flex gap-2">
            <FaSignOutAlt /> Logout
          </button>
        </div>

      </aside>

      {/* ================= MOBILE SIDEBAR (DRAWER) ================= */}
      <aside
        className={`fixed md:hidden top-0 left-0 w-[280px] h-full bg-[#0A0A0A] z-50 transition-transform duration-300
        ${mobileSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >

        <div className="p-4 flex justify-between border-b border-white/10">
          <span>AI CAREER GUIDANCE</span>
          <button onClick={() => setMobileSidebar(false)}>✕</button>
        </div>

        <nav className="px-3 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileSidebar(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl"
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-white/10">

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMobileSidebar(true)}
          >
            <FaBars />
          </button>

          <h2 className="text-gray-400 text-sm">
            {activeTab}
          </h2>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">{userData?.name}</span>
            <FaRegUserCircle />
          </div>

        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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