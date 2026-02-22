import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateResponse(prompt, history) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const chat = model.startChat({
    history: history ?? [],
    generationConfig: {
      temperature: 0.7
    }
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;

  return response.text();
}
