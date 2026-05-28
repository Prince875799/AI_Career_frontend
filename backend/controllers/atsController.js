import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const checkATS = async (req,res)=>{

try{

const { resumeText } = req.body;

const model = genAI.getGenerativeModel({
model:"gemini-1.5-flash"
});

const prompt = `
Act like an ATS resume scanner.

Analyze this resume and give:

1. ATS Score out of 100
2. Missing keywords
3. Suggestions to improve ATS
4. Strengths

Resume:
${resumeText}
`;

const result = await model.generateContent(prompt);

const response = await result.response;

const text = response.text();

res.json({
success:true,
analysis:text
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};