import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  // Port 5173 for development
  const PORT = 5173;
  const HMR_PORT = Number(process.env.HMR_PORT || 24678);

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/harvesting-data", async (req, res) => {
    try {
      const { city } = req.body;
      if (!city) {
        return res.status(400).json({ error: "City is required" });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Provide accurate annual rainfall data and rainwater harvesting context for the city of ${city}. Provide the response as JSON structured exactly according to the schema. Make the data realistic and based on historical averages. Keep the descriptions concise.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              annualAverageRainfall: {
                type: Type.NUMBER,
                description: "Average annual rainfall in mm",
              },
              monthlyRainfall: {
                type: Type.ARRAY,
                description: "Array of exactly 12 integers representing rainfall in mm for each month (Jan-Dec) respectively.",
                items: {
                  type: Type.INTEGER,
                },
              },
              seasonalitySummary: {
                type: Type.STRING,
                description: "A short sentence describing the seasonality, e.g., '70% of rainfall occurs during the monsoon from June to September.'",
              },
              verdictTitle: {
                type: Type.STRING,
                description: "A short title like 'HIGHLY RECOMMENDED', 'MODERATELY RECOMMENDED', or 'CHALLENGING'",
              },
              verdictStatus: {
                type: Type.STRING,
                description: "Either 'success', 'warning', or 'error' based on the recommendation",
              },
              verdictDescription: {
                type: Type.STRING,
                description: "A short sentence describing why the verdict was given.",
              },
              groundwaterContextItems: {
                type: Type.ARRAY,
                description: "An array of 2 to 3 points about groundwater context in the city.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    status: {
                      type: Type.STRING,
                      description: "Either 'success', 'warning', or 'error'",
                    },
                    text: {
                      type: Type.STRING,
                      description: "Short description of the context point",
                    },
                  },
                  required: ["status", "text"],
                },
              },
              rechargePriorityText: {
                type: Type.STRING,
                description: "Either 'High', 'Medium', or 'Low' representing the priority of groundwater recharge.",
              },
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
      res.json(data);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to generate harvesting data" });
    }
  });

  app.post("/api/usage-data", async (req, res) => {
    try {
      const { city } = req.body;
      if (!city) {
        return res.status(400).json({ error: "City is required" });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Provide realistic water usage estimates for the city of ${city}. Provide the response as JSON structured exactly according to the schema. Volumes should be in Millions of Gallons (MGD). Make the data realistic based on population size.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              currentUsage: {
                type: Type.NUMBER,
                description: "Current month-to-date water usage in Millions of Gallons",
              },
              usageTrend: {
                type: Type.NUMBER,
                description: "Percentage increase or decrease compared to last month (e.g., 5.2 or -2.1)",
              },
              recommendedLimit: {
                type: Type.NUMBER,
                description: "Recommended safe limit for month-to-date usage in Millions of Gallons",
              },
              capacityPercentage: {
                type: Type.INTEGER,
                description: "Current capacity status percentage (0-100)",
              },
              dailyUsageByMonth: {
                type: Type.ARRAY,
                description: "Array of exactly 12 numbers representing average daily water usage for each month (Jan-Dec) of the current year in Millions of Gallons",
                items: {
                  type: Type.NUMBER,
                },
              },
              dailyUsagePast7Years: {
                type: Type.ARRAY,
                description: "Array of exactly 7 numbers representing average daily water usage for each of the past 7 years in Millions of Gallons",
                items: {
                  type: Type.NUMBER,
                },
              },
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
      res.json(data);
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to generate usage data" });
    }
  });

  app.post("/api/water-quality", async (req, res) => {
    try {
      const { city } = req.body;
      if (!city) throw new Error("City is required");

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Provide an accurate and up-to-date water quality report for the region of ${city}. Return the result as JSON structured exactly according to the schema. Make the data realistic and based on the current geographic water profile. Provide a realistic list of 6 suitable crops with their optimal statuses (Optimal, Fair, or Too Dry) based on the local climate and water quality. Ensure crop icons are valid Lucide React icon names (e.g., 'Wheat', 'Tractor', 'Leaf', 'Sprout', 'Droplet', 'Flower2').`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallStatus: {
                type: Type.STRING,
                enum: ["GOOD", "MODERATE", "POOR"],
                description: "Overall water quality status",
              },
              phLevel: {
                type: Type.NUMBER,
                description: "pH Level of the water",
              },
              tds: {
                type: Type.INTEGER,
                description: "Total Dissolved Solids in ppm",
              },
              turbidity: {
                type: Type.NUMBER,
                description: "Turbidity in NTU",
              },
              isSafeForDrinking: {
                type: Type.BOOLEAN,
                description: "Is the water safe for drinking after basic filtration?",
              },
              suitableCrops: {
                type: Type.ARRAY,
                description: "List of 6 suitable crops based on local conditions",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Crop name (e.g., Wheat)" },
                    icon: { type: Type.STRING, description: "Lucide React icon name" },
                    status: { type: Type.STRING, enum: ["Optimal", "Fair", "Too Dry", "Poor"], description: "Growth suitability status" },
                    statusColor: { type: Type.STRING, enum: ["safe-green", "earth-brown", "alert-red"], description: "Color coding for the status: safe-green for Optimal, earth-brown for Fair, alert-red for Too Dry/Poor" },
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
      if (!text) throw new Error("Empty response from Gemini");
      const data = JSON.parse(text);
      res.json(data);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || "Something went wrong" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          port: HMR_PORT,
        },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
