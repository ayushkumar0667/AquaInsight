import { GoogleGenAI, Type } from "@google/genai";

export function getGeminiClient() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

export function readCity(req: any) {
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  return String(body.city || "").trim();
}
