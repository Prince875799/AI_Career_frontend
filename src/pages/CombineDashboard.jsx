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

import ResumeBuilder from "./ResumeBuilder";
import CareerForm from "./CareerForm";
import LandingPage from "./LandingPage";

const CombineDashboard = () => {
  const { userData, getCurrentUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);

  const [activeTab, setActiveTab] = useState("overview");

  // mobile drawer only
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
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

  // ================= HERO (YOUR ORIGINAL CARDS PRESERVED) =================
  const DashboardHero = () => (
    <div className="p-6 md:p-12 max-w-6xl mx-auto text-left">

      <div className="space-y-6">

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A6FF5D]/10 text-[#A6FF5D] text-xs font-bold">
          <FaRobot /> AI Powered Career Intelligence
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white">
          Shape Your Future <br />
          <span className="text-[#A6FF5D]">With Precision.</span>
        </h2>

        <p className="text-gray-400 max-w-2xl">
          Welcome back <span className="text-white">{userData?.name}</span>.
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          {[
            {
              title: "Career Roadmap",
              desc: "AI detects hidden skills and builds your path.",
              icon: <FaLightbulb className="text-[#A6FF5D]" />
            },
            {
              title: "Resume Builder",
              desc: "ATS optimized resumes for higher selection.",
              icon: <FaFileAlt className="text-[#A6FF5D]" />
            },
            {
              title: "Interview Prep",
              desc: "AI simulates real interview scenarios.",
              icon: <FaRocket className="text-[#A6FF5D]" />
            }
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#0D0D0D] border border-white/5"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="text-white font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "builder":
        return <ResumeBuilder />;
      case "roadmap":
        return <CareerForm />;
      case "interview":
        return <LandingPage />;
      default:
        return <DashboardHero />;
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">

      {/* ================= MOBILE OVERLAY ================= */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <motion.aside
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        className="
          fixed md:relative
          top-0 left-0
          h-full w-[280px]
          bg-[#0A0A0A]
          border-r border-white/5
          z-50

          md:translate-x-0 md:flex md:flex-col
        "
      >

        {/* MOBILE CLOSE BUTTON */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* LOGO */}
        <div className="p-5 flex justify-between items-center border-b border-white/5">
          <h1 className="font-bold text-white">AI CAREER</h1>

          {/* Desktop toggle not needed, but kept safe */}
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
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

        {/* LOGOUT */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="text-red-400 flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

      </motion.aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-white/10">

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-xl"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars />
          </button>

          <h2 className="text-sm text-gray-400">
            {activeTab}
          </h2>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              {userData?.name}
            </span>
            <FaRegUserCircle />
          </div>

        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
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