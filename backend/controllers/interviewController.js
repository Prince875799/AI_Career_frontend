import Interview from "../models/interview.js";
// Controller file ke upar


export const startInterview = async (req, res) => {
  try {
    const { role, type } = req.body; 

    // Custom prompt based on type
    const specificInstruction = type === 'coding' 
      ? "Provide a coding logic question or a small snippet to debug." 
      : "Provide a conceptual interview question.";

    const prompt = `Generate a technical ${type} question for the role: ${role}.
    ${specificInstruction}
    Return ONLY a JSON object with this exact structure:
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string",
      "explanation": "string"
    }`;

    const completion = await req.groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    res.json(JSON.parse(completion.choices[0].message.content));
  } catch (error) {
    res.status(500).json({ message: "AI error" });
  }
};
export const submitAnswer = async (req, res) => {
  try {
    const { role, question, options, answer, correctAnswer, explanation } = req.body;

    // AI evaluation for score and feedback
    const completion = await req.groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Evaluate the answer and return JSON with: score (number 0-10) and feedback (string)."
        },
        {
          role: "user",
          content: `Question: ${question}\nCorrect Answer: ${correctAnswer}\nUser Answer: ${answer}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const evaluation = JSON.parse(completion.choices[0].message.content);

    // Saving to Database
    const interview = await Interview.create({
      role,
      question,
      options,
      correctAnswer,
      userAnswer: answer,
      score: evaluation.score,
      feedback: evaluation.feedback,
      explanation: explanation
    });

    res.json({ 
      score: evaluation.score, 
      feedback: evaluation.feedback, 
      interview 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error evaluating answer" });
  }
};