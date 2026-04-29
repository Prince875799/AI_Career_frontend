import Resume from "../models/Resume.js";
import fs from "fs";

export const generateResume = async (req, res) => {
  try {
    const { name, role, skills, experience, education } = req.body;

    // Premium Prompt with JSON Instructions
    const prompt = `
      Act as a Professional Resume Architect. 
      Generate a high-impact, ATS-optimized resume based on these details:
      Name: ${name}
      Role: ${role}
      Skills: ${skills}
      Experience: ${experience}
      Education: ${education}

      Return the response in a STRICT JSON format with the following keys:
      {
        "summary": "Professional summary with action verbs",
        "skills": ["skill1", "skill2"],
        "experience": [{"company": "", "role": "", "duration": "", "points": ["bullet1", "bullet2"]}],
        "education": [{"institution": "", "degree": "", "year": ""}],
        "projects": [{"title": "", "description": ""}]
      }
      Use strong action verbs and quantify achievements.
    `;

    const completion = await req.groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant that outputs only valid JSON objects." 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      response_format: { type: "json_object" }
    });

    // Groq se aaya content string hota hai, use parse karke direct bhej rahe hain
    const aiContent = JSON.parse(completion.choices[0].message.content);

    res.json({
      success: true,
      resume: aiContent // Ab ye pura object hai, text nahi
    });

  } catch (error) {
    console.error("Groq AI Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "AI Generation failed" 
    });
  }
};

// ATS Checker using Groq
export const checkATS = async (req, res) => {
  try {
    const { resumeText } = req.body;

    const prompt = `
      Analyze this resume text for ATS compatibility: "${resumeText}"
      Return a JSON object with:
      {
        "score": number,
        "missingKeywords": [],
        "improvements": [],
        "verdict": ""
      }
    `;

    const completion = await req.groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    res.json({
      success: true,
      analysis: JSON.parse(completion.choices[0].message.content)
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "ATS Check failed" });
  }
};   
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const filePath = req.file.path;

    // file read (optional)
    const fileContent = fs.readFileSync(filePath, "utf-8");

    res.json({
      success: true,
      message: "Resume uploaded successfully",
      file: filePath,
      content: fileContent // optional
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed"
    });
  }
};