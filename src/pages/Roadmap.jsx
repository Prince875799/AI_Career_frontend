import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bot, ChevronLeft, Download, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

function Roadmap() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateRoadmap();
  }, []);

  const generateRoadmap = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ask-ai", state);
      setData(res.data.reply);
    } catch (error) {
      setData("### ❌ Generation Failed\nPlease check your server or API key.");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen text-white bg-cover bg-center bg-fixed relative font-sans selection:bg-[#A6FF5D] selection:text-black"
      style={{
        // ✅ Same Background as CareerForm for Consistency
        backgroundImage:
          "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
      }}
    >
      {/* 🌑 Deep Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black"></div>

      {/* 🧪 Subtle Glow Spotlights */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 p-4 md:p-10 max-w-5xl mx-auto">
        
        {/* TOP NAVIGATION */}
        <div className="flex justify-between items-center mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all font-bold text-xs uppercase tracking-widest"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Parameters
          </button>
          
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
             <div className="bg-[#A6FF5D] p-1.5 rounded-lg text-black">
               <Bot size={18} />
             </div>
             <span className="font-black text-[10px] tracking-[0.3em] text-[#A6FF5D]">AI PATHFINDER</span>
          </div>
        </div>

        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
            Strategizing Your Path
          </h1>
          <div className="flex items-center gap-2 text-[#A6FF5D] font-mono text-xs tracking-widest uppercase bg-[#A6FF5D]/10 w-fit px-3 py-1 rounded-full border border-[#A6FF5D]/20">
            <Sparkles size={12} /> Target Goal: {state?.goal || "Professional"}
          </div>
        </motion.div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-4 bg-white/10 rounded-full w-1/4"></div>
            <div className="h-[400px] bg-white/5 border border-white/10 rounded-[2.5rem]"></div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            
            {/* MAIN CONTENT CARD */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#A6FF5D]/20 to-blue-500/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                
                <div className="relative bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/10 p-8 md:p-14 rounded-[2.5rem] shadow-2xl overflow-hidden">
                  
                  {/* Decorative Elements inside card */}
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Bot size={150} />
                  </div>

                  {/* AI RESPONSE WRAPPER */}
                  <article className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-strong:text-[#A6FF5D] prose-ul:list-disc max-w-none prose-headings:tracking-tighter prose-headings:font-black">
                    <ReactMarkdown>{data}</ReactMarkdown>
                  </article>
                </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10">
                <div className="text-center md:text-left">
                    <p className="text-lg font-bold">Strategy Generated Successfully.</p>
                    <p className="text-sm text-gray-500">Ready to track your daily progress?</p>
                </div>
                
                <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none border border-white/10 hover:bg-white/10 px-8 py-4 rounded-2xl font-bold transition flex items-center justify-center gap-2 text-sm">
                        <Download size={18} /> EXPORT PDF
                    </button>
                    <button
                        onClick={() => navigate("/dashboard", { state })}
                        className="flex-1 md:flex-none bg-[#A6FF5D] text-black px-10 py-4 rounded-2xl font-black hover:shadow-[0_0_30px_rgba(166,255,93,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
                    >
                        DASHBOARD <Send size={18} />
                    </button>
                </div>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Roadmap;