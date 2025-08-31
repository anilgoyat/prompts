import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

// Init OpenAI (Reasoner)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Init Gemini (Judge)
const genAI = new GoogleGenerativeAI(process.env.google_api_key);
const geminiJudge = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function runHybrid() {
  const SYSTEM_PROMPT = `
    You are an AI assistant who works on START, THINK and OUTPUT format.
    Rules:
    - Always output in JSON format { "step": "...", "content": "..." }
    - Sequence must be START → THINK → OUTPUT
    Important: You must answer related to javascript only.
  `;

  let messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: "what is python" },
  ];

  while (true) {
    // 🧠 Ask OpenAI Reasoner
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
    });

    const raw = response.choices[0].message.content;
    const parsed = JSON.parse(raw);

    messages.push({ role: "assistant", content: JSON.stringify(parsed) });

    if (parsed.step === "START") {
      console.log("🔥 Reasoner START:", parsed.content);
      continue;
    }

    if (parsed.step === "THINK") {
      console.log("🧠 Reasoner THINK:", parsed.content);

      // ⚖️ Ask Gemini Judge
      const judgeResult = await geminiJudge.generateContent(
        `Evaluate the following reasoning step:\n\n${parsed.content}\n\nRespond strictly in JSON: { "step": "EVALUATE", "content": "short feedback" }`
      );

      const judgeFeedback = judgeResult.response.text();
      console.log("⚖️ Judge Feedback:", judgeFeedback);

      // Append judge feedback as developer note
      messages.push({ role: "developer", content: judgeFeedback });
      continue;
    }

    if (parsed.step === "OUTPUT") {
      console.log("🤖 Final OUTPUT:", parsed.content);
      break;
    }
  }
}

runHybrid().catch(console.error);
