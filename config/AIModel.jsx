import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp-01-21", // Or 'gemini-2.0-flash-exp'
 
  tools: [{ googleSearch: {} }],
});
  
export const chatSession = model.startChat({
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 1,
  },
  history: [],
});