import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, Timer, Terminal, Send, Code2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function QuizPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // States
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // MCQ ke liye
  const [userCode, setUserCode] = useState(""); // Script mode ke liye
  const [timeLeft, setTimeLeft] = useState(state?.type === "script" ? 300 : 30); // Script ke liye 5 min
  const [count, setCount] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!state) navigate("/");
    fetchQuestion();
  }, []);

  // Timer Logic
  useEffect(() => {
    if (timeLeft === 0) handleNext(false);
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchQuestion = async () => {
    setQuestionData(null);
    try {
      const res = await axios.post("http://localhost:5000/api/interview/start", { 
        role: state.role, 
        type: state.type 
      });
      setQuestionData(res.data);
      setSelectedOption(null);
      setUserCode(""); // Code reset
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleNext = (manual = true) => {
    let currentScore = score;
    
    if (state.type === "script") {
      // Script mode: Agar code likha hai toh score add hoga (aap yahan AI evaluation bhi daal sakte hain)
      if (manual && userCode.trim().length > 10) currentScore += 10;
    } else {
      // MCQ mode
      if (manual && selectedOption === questionData.correctAnswer) currentScore += 10;
    }

    setScore(currentScore);

    if (count >= 5) {
      navigate("/result", { state: { score: currentScore, total: 50, role: state.role } });
    } else {
      setCount(prev => prev + 1);
      fetchQuestion();
      setTimeLeft(state.type === "script" ? 300 : 30);
    }
  };

  if (!questionData) return (
    <div className="h-screen flex items-center justify-center bg-[#050505]">
      <Loader2 className="animate-spin text-[#A6FF5D]" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
              <Timer size={18} className={timeLeft < 20 ? "text-red-500 animate-pulse" : "text-[#A6FF5D]"} />
              <span className="font-mono text-xl">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <span className="text-gray-500 font-black text-xs uppercase tracking-widest">Task {count}/5</span>
          </div>
          <div className="text-[10px] bg-[#A6FF5D]/10 text-[#A6FF5D] px-3 py-1 rounded-full border border-[#A6FF5D]/20 font-bold uppercase tracking-tighter">
            {state.type} Assessment Active
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className={`grid ${state.type === "script" ? "lg:grid-cols-2" : "grid-cols-1"} gap-6`}>
          
          {/* LEFT: Question Box */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 h-fit"
          >
            <div className="flex items-center gap-2 mb-4 text-[#A6FF5D]">
              <Code2 size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Problem Statement</span>
            </div>
            <h2 className="text-2xl font-bold leading-snug mb-6">
              {questionData.question}
            </h2>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 italic text-sm text-gray-400">
              Note: Solve this by considering edge cases and optimal time complexity.
            </div>
          </motion.div>

          {/* RIGHT: Input Box (MCQ or Code Editor) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            {state.type === "script" ? (
              /* --- 💻 VS CODE STYLE EDITOR --- */
              <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl">
                <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 flex items-center gap-2 tracking-widest">
                    <Terminal size={12} /> main.js
                  </span>
                </div>
                <textarea
                  className="w-full h-[400px] bg-transparent p-8 font-mono text-sm text-[#A6FF5D] outline-none resize-none leading-relaxed"
                  placeholder={`// Apni logic yahan likhein...\nfunction solution() {\n  \n}`}
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                />
              </div>
            ) : (
              /* --- 🔘 MCQ OPTIONS --- */
              <div className="grid gap-4">
                {questionData.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(opt)}
                    className={`p-6 rounded-2xl border text-left text-lg transition-all flex justify-between items-center ${
                      selectedOption === opt 
                      ? "bg-[#A6FF5D] text-black border-[#A6FF5D] font-bold" 
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {opt}
                    {selectedOption === opt && <ChevronRight size={20} />}
                  </button>
                ))}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              onClick={() => handleNext(true)}
              disabled={state.type === "script" ? userCode.length < 5 : !selectedOption}
              className="w-full py-5 bg-[#A6FF5D] text-black font-black rounded-2xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 shadow-[0_0_30px_-10px_#A6FF5D]"
            >
              Submit solution <Send size={18} />
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}