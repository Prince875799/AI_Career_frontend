import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Trophy, 
  Target, 
  Zap, 
  ArrowLeft,
  CheckCircle2,
  TrendingUp
} from "lucide-react";

function Dashboard() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Defensive check agar state null ho
  const skills = state?.skills || [];
  const interests = state?.interests || [];
  
  const totalSkillsGoal = 10;
  const progress = Math.min(Math.floor((skills.length / totalSkillsGoal) * 100), 100);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#A6FF5D] selection:text-black">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#A6FF5D] blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6 md:p-10">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-4 text-sm"
            >
              <ArrowLeft size={16} /> Back to Roadmap
            </button>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              Performance Hub <LayoutDashboard className="text-[#A6FF5D]" />
            </h1>
            <p className="text-gray-400 mt-1">Analyzing your professional growth trajectory.</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md flex items-center gap-4">
            <div className="bg-[#A6FF5D]/10 p-3 rounded-xl">
              <Trophy className="text-[#A6FF5D]" size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Global Rank</p>
              <p className="text-xl font-bold">Top 12%</p>
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PROGRESS CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Mastery Progress</h3>
                  <p className="text-gray-400 text-sm">Skills unlocked vs Market requirement</p>
                </div>
                <span className="text-5xl font-black text-[#A6FF5D]">{progress}%</span>
              </div>

              {/* CUSTOM PROGRESS BAR */}
              <div className="w-full bg-white/5 h-6 rounded-2xl border border-white/10 p-1 mb-8">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#A6FF5D] to-emerald-400 rounded-xl shadow-[0_0_20px_rgba(166,255,93,0.3)]"
                ></motion.div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <Target size={20} className="text-blue-400 mb-2" />
                  <p className="text-xs text-gray-500 uppercase">Focus Area</p>
                  <p className="font-semibold">{interests[0] || "General"}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <Zap size={20} className="text-yellow-400 mb-2" />
                  <p className="text-xs text-gray-500 uppercase">Skill Count</p>
                  <p className="font-semibold">{skills.length} Active</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hidden md:block">
                  <TrendingUp size={20} className="text-purple-400 mb-2" />
                  <p className="text-xs text-gray-500 uppercase">Status</p>
                  <p className="font-semibold text-green-400">Leveling Up</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SKILLS LIST CARD */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#111] border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              Verified Skills <CheckCircle2 size={18} className="text-[#A6FF5D]" />
            </h3>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {skills.map((skill, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-[#A6FF5D] font-bold border border-[#A6FF5D]/20 group-hover:border-[#A6FF5D]">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">{skill}</p>
                    <p className="text-[10px] text-[#A6FF5D] uppercase tracking-tighter">Pro Level</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;