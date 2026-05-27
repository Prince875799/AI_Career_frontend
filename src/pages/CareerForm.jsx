import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Sparkles, Target, Zap, ChevronRight, Cpu } from "lucide-react";
import { motion } from "framer-motion";

function CareerForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    interest: "",
    skills: [],
    goal: "",
  });

  const interests = ["Web Dev", "AI/ML", "App Dev", "Design", "Cyber Security"];
  const skillsList = ["HTML", "CSS", "JavaScript", "React", "Node", "Python", "Cyber Security"];
  const goals = ["Get a Job", "Start Freelancing", "Build a Startup"];

  const toggleSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = () => {
    if (!form.interest || form.skills.length === 0 || !form.goal) {
      alert("Please complete all sections to generate your roadmap!");
      return;
    }
    navigate("/roadmap", { state: form });
  };

  return (
    <div
      className="min-h-screen text-white bg-cover bg-center bg-fixed relative font-sans overflow-x-hidden"
      style={{
        // ✅ NEW PREMIUM BACKGROUND IMAGE (Abstract Dark Tech)
        backgroundImage:
          "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
      }}
    >
      {/* 🌑 Deep Gradient Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-blue-900/20"></div>

      {/* 🧪 Animated Glow Spotlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A6FF5D]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-10">
        
        {/* MAIN CARD - Ultra Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/40 backdrop-blur-[30px] border border-white/10 p-8 md:p-12 rounded-[3rem] w-full max-w-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
        >

          {/* HEADER */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="relative">
                <div className="absolute inset-0 bg-[#A6FF5D] blur-xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-[#A6FF5D] to-[#5effa6] p-4 rounded-2xl text-black shadow-xl mb-4">
                  <Cpu size={32} strokeWidth={2.5} />
                </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              Career AI Engine
            </h1>
            <p className="text-gray-400 mt-3 text-sm md:text-base font-medium tracking-wide">Select your parameters to begin the analysis.</p>
          </div>

          <div className="space-y-12">
            
            {/* 1. INTEREST SECTION */}
            <section>
              <h2 className="flex items-center gap-3 mb-5 text-[11px] font-black text-[#A6FF5D] uppercase tracking-[0.3em]">
                <Target size={16} /> 01. Primary Interest
              </h2>
              <div className="flex flex-wrap gap-3">
                {interests.map((item) => (
                  <button
                    key={item}
                    onClick={() => setForm({ ...form, interest: item })}
                    className={`px-6 py-3 rounded-2xl border text-sm font-bold transition-all duration-500 ${
                      form.interest === item
                        ? "bg-[#A6FF5D] text-black border-[#A6FF5D] shadow-[0_0_20px_rgba(166,255,93,0.4)] scale-105"
                        : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

            {/* 2. SKILLS SECTION */}
            <section>
              <h2 className="flex items-center gap-3 mb-5 text-[11px] font-black text-blue-400 uppercase tracking-[0.3em]">
                <Zap size={16} /> 02. Current Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {skillsList.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-5 py-2.5 rounded-2xl border text-sm font-bold transition-all duration-500 ${
                      form.skills.includes(skill)
                        ? "bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105"
                        : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {form.skills.includes(skill) ? "• " : "+ "} {skill}
                  </button>
                ))}
              </div>
            </section>

            {/* 3. GOAL SECTION */}
            <section>
              <h2 className="flex items-center gap-3 mb-5 text-[11px] font-black text-purple-400 uppercase tracking-[0.3em]">
                <Sparkles size={16} /> 03. Future Objective
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {goals.map((g) => (
                  <button
                    key={g}
                    onClick={() => setForm({ ...form, goal: g })}
                    className={`p-5 rounded-[1.5rem] border text-center text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                      form.goal === g
                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "border-white/5 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </section>

            {/* FINAL GENERATE BUTTON */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={!form.interest || form.skills.length === 0 || !form.goal}
                className="group relative w-full overflow-hidden bg-[#A6FF5D] disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed text-black py-6 rounded-[2rem] font-black text-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(166,255,93,0.5)] flex items-center justify-center gap-3"
              >
                <span>GENERATE SYSTEM PATH</span>
                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CareerForm;