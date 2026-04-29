import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Code, Zap, Sparkles, ArrowRight, Target, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const startQuiz = (type) => {
    const finalRole = role || "Full Stack Developer";
    navigate("/quiz", { state: { role: finalRole, type } });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-[#A6FF5D] selection:text-black">
      
      {/* --- Background Elements --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#A6FF5D]/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 flex flex-col items-center">
        
        {/* --- Top Badge --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-[#A6FF5D]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 font-mono">System Status: AI Online</span>
        </motion.div>

        {/* --- Hero Heading --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9]">
            Master Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6FF5D] via-emerald-400 to-[#A6FF5D]">
              Interview.
            </span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Next-gen simulators for modern developers. Choose your path and start your journey.
          </p>
          
          {/* --- Input Field Premium --- */}
          <div className="mt-12 relative max-w-xl mx-auto group">
            <div className="absolute inset-0 bg-[#A6FF5D]/20 blur-2xl group-focus-within:bg-[#A6FF5D]/40 transition-all duration-500 opacity-0 group-focus-within:opacity-100" />
            <div className="relative flex items-center bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] shadow-2xl focus-within:border-[#A6FF5D]/50 transition-all">
              <div className="pl-6 text-gray-500">
                <Target size={20} />
              </div>
              <input
                type="text"
                placeholder="Enter skill (React, Node, Java...)"
                className="w-full p-4 bg-transparent outline-none text-white placeholder-gray-700 font-bold text-lg"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* --- 3 CARDS GRID --- */}
        <div className="grid md:grid-cols-3 gap-6 w-full mt-8">
          
          {/* Card 1: Behavioral/Technical Mock */}
          <SelectionCard 
            title="AI Mock Interview" 
            desc="Simulate a live video-call style interview with complex behavioral and role-specific questions."
            icon={<MessageSquare size={28} />} 
            accent="#A6FF5D"
            onClick={() => startQuiz("mock")} 
          />

          {/* Card 2: Logic/Algorithm MCQ */}
          <SelectionCard 
            title="Coding Logic" 
            desc="Perfect for DSA rounds. Solve conceptual problems, analyze time complexity and logic patterns."
            icon={<Code size={28} />} 
            accent="#3b82f6"
            onClick={() => startQuiz("coding")} 
          />

          {/* Card 3: New - Full Code Editor Mode */}
          <SelectionCard 
            title="Technical Script" 
            desc="Solve real-world challenges by writing complete code. Includes syntax highlighting and AI logic review."
            icon={<Terminal size={28} />} 
            accent="#a855f7" 
            onClick={() => startQuiz("script")} 
          />

        </div>

        {/* --- Footer Hint --- */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-[10px] font-black uppercase tracking-[0.4em] text-gray-600"
        >
          Propelled by Advanced Gemini 3.0 Logic
        </motion.p>
      </div>
    </div>
  );
}

function SelectionCard({ title, desc, icon, accent, onClick }) {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-start text-left group cursor-pointer hover:bg-white/[0.04] transition-all overflow-hidden h-full"
      onClick={onClick}
    >
      {/* Background Accent Glow */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full"
        style={{ backgroundColor: accent }}
      />

      <div 
        className="mb-8 p-5 rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 group-hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]"
        style={{ color: accent }}
      >
        {icon}
      </div>
      
      <h3 className="text-2xl font-black mb-4 tracking-tight text-white/90 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed font-medium mb-10 group-hover:text-gray-400 transition-colors">
        {desc}
      </p>

      <div className="mt-auto flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white group-hover:gap-5 transition-all">
        Launch Session 
        <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
          <ArrowRight size={12} style={{ color: accent }} />
        </div>
      </div>
    </motion.div>
  );
}