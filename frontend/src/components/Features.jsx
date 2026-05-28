import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "AI Resume Builder",
    desc: "Create & Optimize Your Resume",
    path: "/builder",
    id: "builder" // Dashboard state se match karne ke liye
  },
  {
    title: "Career Roadmap",
    desc: "Personalized Job Path",
    path: "/c",
    id: "roadmap" // Dashboard state se match karne ke liye
  },
  {
    title: "Mock Interview",
    desc: "Generate Mock Interview",
    path: "/q",
    id: "interview" // Dashboard state se match karne ke liye
  },
];

const Features = ({ onFeatureClick }) => { // 1. Yahan prop receive karein
  const navigate = useNavigate();

  const handleClick = (feature) => {
    // 2. Agar Dashboard ne function bheja hai toh tab change karo, nahi toh navigate karo
    if (onFeatureClick) {
      onFeatureClick(feature.id);
    } else {
      navigate(feature.path);
    }
  };

  return (
    <section className="relative z-10 py-10"> {/* Padding kam ki dashboard ke liye */}
      <h2 className="text-3xl md:text-4xl text-center font-bold text-white mb-12">
        Powerful Features 🚀
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => handleClick(feature)} // 3. Updated handler
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg hover:border-[#A6FF5D]/50 hover:scale-105 transition duration-300 cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-[#A6FF5D]">
              {feature.title}
            </h3>
            <p className="text-gray-300 mt-3">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;