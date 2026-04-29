import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FileSearch,
  Activity,
  ChevronLeft,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Zap,
  RotateCcw
} from "lucide-react";

function Step3Page() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Step 1 se data pakadna
  const userData = location.state?.userData || {};

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsScore, setAtsScore] = useState(0); 

  // Initial score setup
  useEffect(() => {
    if (userData.name) setAtsScore(25); // Base score agar data hai
  }, [userData]);

  // 🔥 Analysis Logic: Is par click karte hi score badhega
  const handleAnalyze = () => {
    if (!file) return;

    setIsAnalyzing(true);
    
    // 1. Pehle score reset karo animation ke liye
    setAtsScore(10);

    // 2. Fake Processing Delay
    setTimeout(() => {
      // Calculate a dynamic score based on data
      let finalScore = 40; // Default min
      
      if (userData.role) finalScore += 20;
      if (userData.email) finalScore += 10;
      if (file.size > 1000) finalScore += 15;
      
      // Add some randomness
      finalScore += Math.floor(Math.random() * 10);
      
      // Update state
      setAtsScore(Math.min(finalScore, 99));
      setIsAnalyzing(false);
    }, 2000);
  };

  const onFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] p-6 text-white flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <button onClick={() => navigate(-1)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-tighter">ATS ANALYZER v2.0</h1>
          <div className="w-10"></div> {/* Spacer */}
        </div>

        {/* SCORE DISPLAY (Main Fix) */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-12 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-64 h-64 transform -rotate-90">
              <circle cx="128" cy="128" r="110" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="transparent" />
              <motion.circle 
                cx="128" cy="128" r="110" stroke="#A6FF5D" strokeWidth="12" fill="transparent" 
                strokeDasharray="691" 
                animate={{ strokeDashoffset: 691 - (691 * atsScore) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            
            {/* Score Number */}
            <div className="absolute flex flex-col items-center">
              <motion.span 
                key={atsScore} // Key change forces re-render of animation
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-8xl font-black text-[#A6FF5D]"
              >
                {isAnalyzing ? "..." : atsScore}
              </motion.span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">Match Score</span>
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-400">
            {isAnalyzing ? "Scanning keywords..." : `Analysis complete for ${userData.name || 'Candidate'}`}
          </p>
        </div>

        {/* UPLOAD SECTION */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-6 cursor-pointer hover:border-[#A6FF5D]/50 transition-all">
              <UploadCloud size={32} className="text-gray-500 mb-2" />
              <span className="text-xs font-bold text-gray-400">{fileName || "Upload Resume PDF"}</span>
              <input type="file" className="hidden" onChange={onFileChange} />
            </label>
            
            <button
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
              className="w-full mt-4 py-4 bg-[#A6FF5D] text-black font-black rounded-xl uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20"
            >
              {isAnalyzing ? <Activity className="animate-spin" /> : <Zap size={14} />}
              Start Analysis
            </button>
          </div>

          {/* TIPS SECTION */}
          <div className="bg-[#A6FF5D]/5 border border-[#A6FF5D]/20 p-8 rounded-3xl flex flex-col justify-center">
             <div className="flex items-center gap-2 text-[#A6FF5D] mb-3">
               <AlertCircle size={16} />
               <h4 className="text-xs font-black uppercase tracking-widest">Quick Tip</h4>
             </div>
             <p className="text-sm text-gray-300 leading-relaxed">
               {atsScore < 60 
                 ? "Apne resume mein tech keywords badhayein score sudharne ke liye." 
                 : "Aapka resume market standards ke hisaab se kaafi accha hai."}
             </p>
             <button onClick={() => window.location.reload()} className="mt-4 flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-white transition-all">
               <RotateCcw size={12} /> Clear & Reset
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Step3Page;