import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import api from "../api/axios";
import Step1Page from "./Step1Page";
import Step2Page from "./Step2Page";
import Step3Page from "./Step3Page";



function ResumeBuilder() {

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    role: "",
    skills: "",
    experience: "",
    education: "",
  });

  const [resume, setResume] = useState("");
  const [file, setFile] = useState(null);
  const [ats, setATS] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const generateResume = async () => {
  setLoading(true);

  try {
    const res = await api.post(
      "/resume/generate",
      form,
      {
        withCredentials: true // ✅ IMPORTANT for auth
      }
    );

    console.log(res.data);

    // ✅ safe usage inside try
    setResume(res.data.resume);
    setStep(3);

  } catch (error) {
    console.log("Full Error Object:", error?.response || error);

    // optional: user feedback
    alert(error?.response?.data?.message || "Something went wrong");

  } finally {
    // ✅ always runs
    setLoading(false);
  }
};

  const uploadResume = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    const uploadRes = await api.post("/resume/upload", formData);

    setFileName(file.name);

    const atsRes = await api.post("/ats/check", {
      resumeText: uploadRes.data.resumeText,
    });

    setATS(atsRes.data);
  };

  const variants = {
    enter: (direction) => ({ x: 1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: -1000, opacity: 0 }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <AnimatePresence mode="wait">

        {step === 1 && (
          <Step1Page
            form={form}
            handleChange={handleChange}
            setStep={setStep}
            variants={variants}
          />
        )}

        {step === 2 && (
          <Step2Page
            form={form}
            handleChange={handleChange}
            setStep={setStep}
            generateResume={generateResume}
            loading={loading}
            variants={variants}
          />
        )}

        {step === 3 && (
          <Step3Page
            resume={resume}
            setStep={setStep}
            uploadResume={uploadResume}
            setFile={setFile}
            fileName={fileName}
            ats={ats}
            variants={variants}
          />
        )}

      </AnimatePresence>

    </div>
  );
}

export default ResumeBuilder;