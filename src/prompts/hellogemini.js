import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

// Init client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function getHelloResponse() {
  // Select model (gemini-1.5-flash is latest; 2.5 is not public yet)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Just give prompt string, no "messages"
  const result = await model.generateContent(
    "Hey Gemini, my name is Anil. Can you tell me my name and write a poem on me?"
  );

  // Get text response
  console.log("✅ Gemini Response:\n", result.response.text());
}

getHelloResponse().catch((err) => console.error("❌ Error:", err));
