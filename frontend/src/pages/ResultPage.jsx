import { useLocation, useNavigate } from "react-router-dom";
import { Trophy, RefreshCcw, Home, BarChart3, Target, Zap, Award, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Safety check agar state na ho
  const score = state?.score || 0;
  const total = state?.total || 50;
  const role = state?.role || "Developer";
  const percentage = (score / total) * 100;

  // Dynamic feedback based on percentage
  const getFeedback = () => {
    if (percentage >= 80) return { title: "Elite Performance!", msg: "You're in the top 5% of candidates.", color: "#A6FF5D" };
    if (percentage >= 50) return { title: "Solid Work!", msg: "You have a good grasp of the basics.", color: "#3b82f6" };
    return { title: "Keep Practicing", msg: "Focus on core concepts to improve.", color: "#ef4444" };
  };

  const feedback = getFeedback();

  return (
    <div className="min-h-screen bg-[#050505] text-white relative selection:bg-[#A6FF5D] selection:text-black overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#A6FF5D]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10 flex flex-col items-center">
        
        {/* --- TROPHY & HEADER --- */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-[#A6FF5D] blur-3xl opacity-20 animate-pulse" />
            <div className="relative w-40 h-40 bg-white/5 border border-white/10 rounded-[3rem] flex items-center justify-center backdrop-blur-xl">
              <Trophy size={80} className="text-[#A6FF5D]" />
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md"
            >
              <Award className="text-[#A6FF5D]" size={24} />
            </motion.div>
          </div>

          <h1 className="text-6xl font-black mb-4 tracking-tighter italic uppercase">
            {feedback.title}
          </h1>
          <p className="text-gray-500 font-mono tracking-[0.3em] uppercase text-sm">
            {role} Assessment Completed
          </p>
        </motion.div>

        {/* --- KEY STATS GRID --- */}
        <div className="grid md:grid-cols-3 gap-6 w-full mb-10">
          <StatBox 
            label="Score Points" 
            value={`${score}/${total}`} 
            icon={<Target className="text-[#A6FF5D]" size={20} />} 
          />
          <StatBox 
            label="Accuracy Rate" 
            value={`${percentage}%`} 
            icon={<Zap className="text-blue-400" size={20} />} 
          />
          <StatBox 
            label="Current Rank" 
            value={percentage >= 80 ? "Master" : "Pro"} 
            icon={<BarChart3 className="text-purple-400" size={20} />} 
          />
        </div>

        {/* --- PERFORMANCE ANALYTICS CARD --- */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white/[0.02] border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <BarChart3 size={120} />
          </div>

          <div className="relative">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#A6FF5D] rounded-full" />
              Detailed Breakdown
            </h3>
            
            <div className="space-y-10">
              {/* Progress Bar Section */}
              <div>
                <div className="flex justify-between mb-4 items-end font-mono">
                  <span className="text-gray-400 text-xs tracking-widest uppercase">Performance Index</span>
                  <span className="text-2xl font-black text-[#A6FF5D]">{percentage}%</span>
                </div>
                <div className="w-full bg-white/5 h-6 rounded-2xl border border-white/5 p-1 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${percentage}%` }} 
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-[#A6FF5D] to-emerald-400 rounded-xl shadow-[0_0_20px_rgba(166,255,93,0.4)]"
                  />
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/5 rounded-[2rem] flex items-center gap-6">
                <div className="p-4 bg-[#A6FF5D]/10 rounded-2xl">
                  <Sparkles size={24} className="text-[#A6FF5D]" />
                </div>
                <p className="text-gray-400 font-medium leading-relaxed">
                  "{feedback.msg} Focus on <span className="text-white">optimization and logic flow</span> in your next session to reach Master rank."
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex flex-col md:flex-row gap-4 mt-12 w-full">
          <button 
            onClick={() => navigate("/")} 
            className="flex-1 py-6 bg-white/5 border border-white/10 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all group"
          >
            <Home size={20} className="group-hover:-translate-y-1 transition-transform" /> 
            Back to Dashboard
          </button>
          
          <button 
            onClick={() => navigate("/")} 
            className="flex-1 py-6 bg-[#A6FF5D] text-black font-black rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] shadow-[0_20px_40px_-15px_rgba(166,255,93,0.3)] transition-all active:scale-95 group"
          >
            <RefreshCcw size={20} className="group-rotate-180 transition-transform duration-500" /> 
            Start New Session
          </button>

          <button className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all">
            <Share2 size={24} />
          </button>
        </div>
        
      </div>
    </div>
  );
}

function StatBox({ label, value, icon }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center text-center relative group overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#A6FF5D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="mb-4 p-3 bg-white/5 rounded-2xl">{icon}</div>
      <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className="text-4xl font-black text-white tracking-tight">{value}</p>
    </motion.div>
  );
}

function Sparkles(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}