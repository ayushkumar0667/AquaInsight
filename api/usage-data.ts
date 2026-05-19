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
      contents: `Provide realistic water usage estimates for the city of ${city}. Provide the response as JSON structured exactly according to the schema. Volumes should be in Millions of Gallons (MGD). Make the data realistic based on population size.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            currentUsage: { type: Type.NUMBER },
            usageTrend: { type: Type.NUMBER },
            recommendedLimit: { type: Type.NUMBER },
            capacityPercentage: { type: Type.INTEGER },
            dailyUsageByMonth: { type: Type.ARRAY, items: { type: Type.NUMBER } },
            dailyUsagePast7Years: { type: Type.ARRAY, items: { type: Type.NUMBER } },
          },
          required: [
            "currentUsage",
            "usageTrend",
            "recommendedLimit",
            "capacityPercentage",
            "dailyUsageByMonth",
            "dailyUsagePast7Years",
          ],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    return res.json(data);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Failed to generate usage data" });
  }
}
