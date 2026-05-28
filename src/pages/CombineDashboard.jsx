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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ mobile default false

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true
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

  const DashboardHero = () => (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-6xl font-black text-white">
        Shape Your Future <span className="text-[#A6FF5D]">With AI</span>
      </h2>
      <p className="text-gray-400 mt-4">
        Welcome back {userData?.name}
      </p>
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
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <motion.aside
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : -300
        }}
        className="
          fixed md:relative top-0 left-0
          h-full w-[280px]
          bg-[#0A0A0A]
          border-r border-white/5
          z-50 md:z-0
          md:translate-x-0
          flex flex-col
        "
      >

        {/* Close button (mobile) */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Logo */}
        <div className="p-5 flex justify-between items-center">
          <h1 className="font-bold text-white text-lg">
            AI CAREER
          </h1>

          <button
            className="text-white md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false); // auto close mobile
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                activeTab === item.id
                  ? "bg-[#A6FF5D] text-black"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
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

          {/* Hamburger */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden text-xl"
          >
            <FaBars />
          </button>

          <h2 className="text-gray-400 text-sm uppercase">
            {activeTab}
          </h2>

          <div className="flex items-center gap-2">
            <div className="text-sm hidden sm:block">
              {userData?.name}
            </div>
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