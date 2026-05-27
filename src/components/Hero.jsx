import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [open, setOpen] = useState(false);
   const navigate = useNavigate();

  return (
    <header
      className="bg-black text-white flex flex-col items-center bg-cover bg-center bg-no-repeat pb-10 relative"
      style={{
        backgroundImage:
          "url('https://assets.prebuiltui.com/images/components/hero-section/hero-background-image.png')",
      }}
    >
      {/* Navbar */}
      <nav className="flex flex-col items-center w-full">
        <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 w-full">
          
          <h1 className="text-xl font-bold">AI Career Guidance</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="text-white/70 hover:text-white">Carrer roadmap</a>
            <a href="#" className="text-white/70 hover:text-white">Resume Builder</a>
            <a href="#" className="text-white/70 hover:text-white">Mock Interview</a>
            <a href="#" className="text-white/70 hover:text-white">Contact</a>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden bg-gray-900 p-2 rounded"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur flex flex-col items-center justify-center gap-8 transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a href="#" onClick={() => setOpen(false)}>Carrer roadmap</a>
        <a href="#" onClick={() => setOpen(false)}>Resume Builder</a>
        <a href="#" onClick={() => setOpen(false)}>Mock Interview</a>
        <a href="#" onClick={() => setOpen(false)}>Contact</a>

        <button
          onClick={() => setOpen(false)}
          className="bg-white text-black px-4 py-2 rounded"
        >
          Close
        </button>
      </div>

      {/* Rainbow Button */}
      <div className="relative mt-28 md:mt-32">
        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-white to-transparent animate-spin"></div>
        
        <button className="relative flex items-center gap-3 pl-4 pr-6 py-3 text-white rounded-full bg-gray-900/80 backdrop-blur">
          <span className="h-2 w-2 bg-green-400 rounded-full animate-ping"></span>
          <span className="text-xs">Designed for Modern Websites</span>
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-[64px] text-center max-w-4xl mt-5 leading-tight px-4">
        Build a Successful Career in AI with Expert Guidance      
       </h1>

      <p className="text-sm md:text-base text-gray-300 text-center max-w-lg mt-4 px-4">
     An AI career guidance platform built to help you learn, grow, and succeed in tech.   
    </p>

      {/* Buttons */}
      <div className="flex gap-3 mt-8">
       <button
         onClick={() => navigate("/signup")}
         className="bg-[#A6FF5D] text-gray-800 px-6 py-2.5 rounded-full text-sm"
          >
          Start Your AI Journey
         </button>
      </div>

        

      
      {/* Scroll */}
      <div className="flex flex-col items-center gap-4 mt-16 animate-bounce">
        <p className="text-sm text-white/50">Scroll down</p>
      </div>
    </header>
  );
}

export default Hero;