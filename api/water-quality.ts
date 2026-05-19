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
      contents: `Provide an accurate and up-to-date water quality report for the region of ${city}. Return the result as JSON structured exactly according to the schema. Make the data realistic and based on the current geographic water profile. Provide a realistic list of 6 suitable crops with their optimal statuses (Optimal, Fair, or Too Dry) based on the local climate and water quality. Ensure crop icons are valid Lucide React icon names (e.g., 'Wheat', 'Tractor', 'Leaf', 'Sprout', 'Droplet', 'Flower2').`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallStatus: { type: Type.STRING, enum: ["GOOD", "MODERATE", "POOR"] },
            phLevel: { type: Type.NUMBER },
            tds: { type: Type.INTEGER },
            turbidity: { type: Type.NUMBER },
            isSafeForDrinking: { type: Type.BOOLEAN },
            suitableCrops: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  icon: { type: Type.STRING },
                  status: { type: Type.STRING, enum: ["Optimal", "Fair", "Too Dry", "Poor"] },
                  statusColor: { type: Type.STRING, enum: ["safe-green", "earth-brown", "alert-red"] },
                },
                required: ["name", "icon", "status", "statusColor"],
              },
            },
          },
          required: [
            "overallStatus",
            "phLevel",
            "tds",
            "turbidity",
            "isSafeForDrinking",
            "suitableCrops",
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const data = JSON.parse(text);
    return res.json(data);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
