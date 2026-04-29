import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  User,
  Briefcase,
  Mail,
  MapPin,
  Phone,
  Link2,
  Sparkles,
  BarChart3,
  GraduationCap,
  History,
  Code2,     // New Icon
  Cpu,       // New Icon
  Layers     // New Icon
} from "lucide-react";

function Step1Page() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    link: "",
    experience: "", 
    qualification: "",
    // --- Added New Fields ---
    skills: "",
    projects: "",
    workDetails: "" 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070a] text-white py-12 px-4">

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#A6FF5D]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl z-10"
      >
        {/* Progress */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[33%] bg-[#A6FF5D]" />
          </div>
          <span className="text-[10px] text-gray-500 font-bold uppercase">
            Step 01/03
          </span>
        </div>

        {/* Card */}
        <div className="bg-white/[0.02] border border-white/10 p-8 md:p-14 rounded-[2.5rem] backdrop-blur-3xl">

          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-[#A6FF5D]/10 rounded-2xl">
              <Sparkles className="text-[#A6FF5D]" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Personal <span className="text-[#A6FF5D]">Identity</span>
              </h1>
              <p className="text-gray-500 text-sm">
                Enter your details to build your AI resume
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
            <InputGroup label="Full Name" name="name" value={form.name} onChange={handleChange} icon={<User size={18} />} placeholder="John Doe" />
            <InputGroup label="Current/Target Role" name="role" value={form.role} onChange={handleChange} icon={<Briefcase size={18} />} placeholder="Full Stack Developer" />
            <InputGroup label="Email Address" name="email" value={form.email} onChange={handleChange} icon={<Mail size={18} />} placeholder="john@example.com" />
            <InputGroup label="Phone Number" name="phone" value={form.phone} onChange={handleChange} icon={<Phone size={18} />} placeholder="+91 98765 43210" />
            <InputGroup label="Location" name="location" value={form.location} onChange={handleChange} icon={<MapPin size={18} />} placeholder="Mumbai, India" />
            <InputGroup label="Portfolio / LinkedIn" name="link" value={form.link} onChange={handleChange} icon={<Link2 size={18} />} placeholder="https://portfolio.com" />
            
            <div className="md:col-span-2">
               <InputGroup 
                  label="Highest Qualification" 
                  name="qualification" 
                  value={form.qualification} 
                  onChange={handleChange} 
                  icon={<GraduationCap size={18} />} 
                  placeholder="e.g. B.Tech in Computer Science, 2023"
               />
            </div>

            {/* 1. Skills Field */}
            <div className="md:col-span-2">
               <InputGroup 
                  label="Technical Skills" 
                  name="skills" 
                  value={form.skills} 
                  onChange={handleChange} 
                  icon={<Cpu size={18} />} 
                  placeholder="e.g. React, Node.js, Python, AWS, Tailwind CSS"
               />
            </div>

            {/* 2. Projects Field (Textarea for more space) */}
            <div className="md:col-span-2">
               <TextAreaGroup 
                  label="Key Projects" 
                  name="projects" 
                  value={form.projects} 
                  onChange={handleChange} 
                  icon={<Code2 size={16} />} 
                  placeholder="e.g. E-commerce App with Stripe integration, Portfolio with Framer Motion..."
               />
            </div>

            {/* 3. Detailed Work Experience Field */}
            <div className="md:col-span-2">
               <TextAreaGroup 
                  label="Work Experience Details" 
                  name="workDetails" 
                  value={form.workDetails} 
                  onChange={handleChange} 
                  icon={<History size={16} />} 
                  placeholder="Describe your roles, responsibilities, and achievements at previous companies."
               />
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-12 space-y-4">
            <button
              onClick={() => navigate("/step2page", { state: { userData: form } })}
              className="w-full py-5 bg-[#A6FF5D] text-black font-black rounded-[1.5rem] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs uppercase tracking-[0.3em] shadow-[0_10px_30px_-10px_rgba(166,255,93,0.4)]"
            >
              Generate AI Resume
              <ChevronRight size={20} />
            </button>

            <button
              onClick={() => navigate("/step3page")}
              className="w-full py-4 bg-white/[0.03] border border-white/5 text-gray-500 hover:text-[#A6FF5D] hover:bg-white/[0.06] font-bold rounded-[1.25rem] flex items-center justify-center gap-3 transition-all duration-300 text-[10px] uppercase tracking-[0.2em]"
            >
              <BarChart3 size={16} />
              Check ATS Score Directly
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Reusable Input Component
function InputGroup({ label, name, value, onChange, icon, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
        <span className="text-[#A6FF5D] opacity-50">#</span> {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#A6FF5D] transition-colors">
          {icon}
        </div>
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:border-[#A6FF5D]/50 focus:ring-1 focus:ring-[#A6FF5D]/50 transition-all outline-none placeholder:text-gray-700"
        />
      </div>
    </div>
  );
}

// New Reusable TextArea Component for larger inputs
function TextAreaGroup({ label, name, value, onChange, icon, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
        <span className="text-[#A6FF5D] opacity-50">{icon}</span> {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:border-[#A6FF5D]/50 focus:ring-1 focus:ring-[#A6FF5D]/50 transition-all outline-none min-h-[100px] resize-none placeholder:text-gray-700"
      />
    </div>
  );
}

export default Step1Page;