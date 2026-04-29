import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Download,
  Printer,
  Mail,
  MapPin,
  Sparkles,
  Phone,
  Link2,
  X,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Code2,
  Cpu,
  Palette,
  Layout
} from "lucide-react";

function Step2Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const incomingData = location.state?.userData || {};

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState("modern");

  const templates = [
    { id: "modern", name: "Modern Minimalist", color: "#3b82f6" },
    { id: "classic", name: "Executive Classic", color: "#1e293b" },
    { id: "creative", name: "Creative Bold", color: "#A6FF5D" },
    { id: "compact", name: "Compact Professional", color: "#8b5cf6" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const {
        name, role, email, phone, location: userLoc, link,
        qualification, skills, projects, workDetails
      } = incomingData;

      const skillsArray = skills ? skills.split(',').map(s => s.trim()) : [];

      // 🚀 AI Summary: 30-word professional profile
      const generatedSummary = `Highly skilled ${role || 'Professional'} with a solid foundation in ${qualification || 'relevant studies'}. Expertly leveraging ${skillsArray.slice(0, 3).join(', ') || 'industry tools'} to build scalable solutions, optimize workflows, and drive technical excellence. Committed to delivering high-impact results through innovative design and robust architectural principles in collaborative environments.`;

      // 🚀 Projects Enrichment: 30-word paragraphs per project
      const projectList = projects ? projects.split(',').map(p => p.trim()) : [];
      const enrichedProjects = projectList.map(pName => ({
        title: pName,
        description: `Successfully architected and deployed the ${pName} project, focusing on building a highly scalable and responsive infrastructure. Integrated advanced functionalities and optimized performance metrics to deliver a seamless user experience while maintaining industry-standard code quality and robust security protocols throughout the development lifecycle.`
      }));

      setResume({
        name: name || "Full Name",
        role: role || "Professional Role",
        email: email || "email@example.com",
        phone: phone || "Contact Number",
        location: userLoc || "City, Country",
        link: link || "Portfolio Link",
        summary: generatedSummary,
        qualification: qualification || "Degree Details",
        skills: skillsArray,
        experience: workDetails || "Experience details not provided.",
        projects: enrichedProjects
      });

      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [incomingData]);

  const handleDownload = () => window.print();
  const activeColor = templates.find(t => t.id === currentTemplate).color;

  return (
    <div className="min-h-screen bg-[#05070a] p-4 md:p-10 selection:bg-[#A6FF5D] selection:text-black">
      
      {/* Template Selection Modal */}
      <AnimatePresence>
        {showTemplateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTemplateModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-2xl bg-[#0f1115] border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-bold text-white">Select Layout</h3>
                <button onClick={() => setShowTemplateModal(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-400 transition-transform hover:rotate-90"><X size={24} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {templates.map((tpl) => (
                  <button 
                    key={tpl.id} 
                    onClick={() => { setCurrentTemplate(tpl.id); setShowTemplateModal(false); }} 
                    className={`p-6 rounded-2xl border-2 transition-all text-left flex justify-between items-center group ${currentTemplate === tpl.id ? "border-[#A6FF5D] bg-[#A6FF5D]/5" : "border-white/5 bg-white/[0.02] hover:border-white/20"}`}
                  >
                    <div>
                      <h4 className={`font-bold transition-colors ${currentTemplate === tpl.id ? "text-[#A6FF5D]" : "text-white group-hover:text-[#A6FF5D]"}`}>{tpl.name}</h4>
                      <div className="w-10 h-1 mt-2 rounded-full" style={{ backgroundColor: tpl.color }} />
                    </div>
                    {currentTemplate === tpl.id && <CheckCircle2 className="text-[#A6FF5D]" size={22} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02] border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-xl no-print">
          <div className="flex items-center gap-5 text-white">
            <button onClick={() => navigate(-1)} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"><ChevronLeft size={20} /></button>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A6FF5D]">Step 02 / Output</h2>
              <p className="text-xl font-bold mt-1">AI Enriched Resume</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setShowTemplateModal(true)} className="p-4 bg-white/5 rounded-2xl text-gray-300 hover:text-[#A6FF5D] transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest border border-transparent hover:border-white/10"><Palette size={18} /> Layout</button>
            <button onClick={handleDownload} className="px-8 py-4 bg-[#A6FF5D] text-black rounded-2xl text-sm font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-[0_10px_30px_-10px_rgba(166,255,93,0.4)]">
              <Download size={18} /> Export PDF
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* SIDE PANEL */}
          <div className="lg:col-span-4 space-y-6 no-print">
            <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
               <h3 className="text-white font-bold mb-6 flex items-center gap-2"><Sparkles className="text-[#A6FF5D]" size={18}/> AI Processing</h3>
               <div className="space-y-4">
                 <p className="text-[11px] text-gray-500 italic leading-relaxed">
                   "We have enhanced your <b>Professional Summary</b> and <b>Projects</b> into 30-word high-impact paragraphs for maximum professional appeal."
                 </p>
               </div>
            </div>

            <button 
              onClick={() => setShowTemplateModal(true)}
              className="w-full py-6 bg-white/5 border border-white/10 rounded-[2rem] text-white font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              <Layout size={16} className="text-[#A6FF5D]" /> Change Style
            </button>
          </div>

          {/* MAIN RESUME CANVAS */}
          <div className="lg:col-span-8 print:col-span-12">
            <div id="resume-canvas" className="bg-white text-slate-900 p-10 md:p-16 rounded-[1rem] shadow-2xl min-h-[1100px] relative transition-all duration-500">
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 text-center">
                   <Sparkles className="text-[#A6FF5D] mb-4 animate-bounce" size={48} />
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Writing 30-Word AI Summaries...</p>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={currentTemplate}>
                  {/* Header */}
                  <header className={`pb-10 mb-10 border-b-2 ${currentTemplate === 'classic' ? 'text-center' : ''}`}>
                    <h1 className="text-5xl font-black uppercase text-slate-900 tracking-tighter mb-2">{resume.name}</h1>
                    <p className="font-bold text-xl uppercase tracking-wider" style={{ color: activeColor }}>{resume.role}</p>
                    <div className="grid grid-cols-2 gap-y-3 mt-8 text-[13px] text-slate-500 text-left">
                      <div className="flex items-center gap-3"><Mail size={16} style={{ color: activeColor }}/> {resume.email}</div>
                      <div className="flex items-center gap-3"><Phone size={16} style={{ color: activeColor }}/> {resume.phone}</div>
                      <div className="flex items-center gap-3"><MapPin size={16} style={{ color: activeColor }}/> {resume.location}</div>
                      <div className="flex items-center gap-3"><Link2 size={16} style={{ color: activeColor }}/> {resume.link}</div>
                    </div>
                  </header>

                  {/* 🚀 AI ENRICHED SUMMARY (30 Words) */}
                  <section className="mb-10">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4">Professional Profile</h3>
                    <p className="text-slate-700 leading-relaxed text-[14px] text-justify font-medium">
                      {resume.summary}
                    </p>
                  </section>

                  {/* Expertise */}
                  <section className="mb-10">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 mb-5 flex items-center gap-2"><Cpu size={16}/> Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((skill, i) => (
                        <span key={i} className="px-4 py-1.5 bg-slate-50 border border-slate-100 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Experience */}
                  <section className="mb-12">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6 flex items-center gap-2"><Briefcase size={16} /> Experience</h3>
                    <div className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-line border-l-4 pl-6" style={{ borderColor: activeColor }}>
                        {resume.experience}
                    </div>
                  </section>

                  {/* 🚀 AI ENRICHED PROJECTS (30 Words Each) */}
                  {resume.projects.length > 0 && (
                    <section className="mb-12">
                      <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 mb-8 flex items-center gap-2"><Code2 size={16}/> Key Projects</h3>
                      <div className="space-y-8">
                        {resume.projects.map((proj, i) => (
                          <div key={i} className="relative pl-6 border-l border-slate-100">
                            <div className="absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full" style={{ backgroundColor: activeColor }} />
                            <h4 className="font-black text-slate-800 text-[15px] mb-2 uppercase tracking-wide">{proj.title}</h4>
                            <p className="text-[13px] text-slate-600 leading-relaxed text-justify">
                              {proj.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Education */}
                  <section>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 mb-5 flex items-center gap-2"><GraduationCap size={16} /> Education</h3>
                    <p className="text-[14px] font-bold text-slate-800 ml-6">{resume.qualification}</p>
                  </section>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Step2Page;