import { Type } from "@google/genai";
import { getGeminiClient, readCity } from "./_shared";

export default async function handler(req: any, res: any) {
  try {
    const city = readCity(req);
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide accurate annual rainfall data and rainwater harvesting context for the city of ${city}. Provide the response as JSON structured exactly according to the schema. Make the data realistic and based on historical averages. Keep the descriptions concise.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            annualAverageRainfall: { type: Type.NUMBER },
            monthlyRainfall: { type: Type.ARRAY, items: { type: Type.INTEGER } },
            seasonalitySummary: { type: Type.STRING },
            verdictTitle: { type: Type.STRING },
            verdictStatus: { type: Type.STRING },
            verdictDescription: { type: Type.STRING },
            groundwaterContextItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  status: { type: Type.STRING },
                  text: { type: Type.STRING },
                },
                required: ["status", "text"],
              },
            },
            rechargePriorityText: { type: Type.STRING },
          },
          required: [
            "annualAverageRainfall",
            "monthlyRainfall",
            "seasonalitySummary",
            "verdictTitle",
            "verdictStatus",
            "verdictDescription",
            "groundwaterContextItems",
            "rechargePriorityText",
          ],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    return res.json(data);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Failed to generate harvesting data" });
  }
}
