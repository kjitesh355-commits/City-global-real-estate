import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Properties database
const PROPERTIES = [
  {
    id: "serenia-living",
    name: "Serenia Living Villa",
    area: "Palm Jumeirah",
    price: 45000000,
    beds: 5,
    baths: 7,
    size: 7500,
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    developer: "EMAAR",
    rentalYield: 6.8,
    appreciation: 7.9,
    capitalGrowth: 8.4,
    risk: "Low Risk",
    completion: "Ready",
    description: "An ultra-premium beachfront villa located on the West Crescent of Palm Jumeirah, offering private beach access, stunning sunset views, and bespoke interior finishes.",
    coordinates: { x: 18, y: 49 },
    popular: false
  },
  {
    id: "frond-g-villa",
    name: "Frond G Villa",
    area: "Palm Jumeirah",
    price: 65000000,
    beds: 6,
    baths: 8,
    size: 9400,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    developer: "EMAAR",
    rentalYield: 7.2,
    appreciation: 8.6,
    capitalGrowth: 9.1,
    risk: "Low Risk",
    completion: "Q2 2026",
    description: "The crown jewel of Palm Jumeirah fronds. A modern architectural masterpiece with double-height ceilings, an infinity pool blending with the Arabian Gulf, private jetty, and custom luxury styling.",
    coordinates: { x: 22, y: 55 },
    popular: true,
    views: {
      exterior: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      living: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      kitchen: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      bedroom: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
      tour3d: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    }
  },
  {
    id: "address-residences",
    name: "Address Residences",
    area: "Downtown Dubai",
    price: 8200000,
    beds: 3,
    baths: 4,
    size: 2100,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    developer: "EMAAR",
    rentalYield: 5.8,
    appreciation: 6.9,
    capitalGrowth: 7.5,
    risk: "Very Low Risk",
    completion: "Q4 2025",
    description: "Luxury high-rise apartments directly facing the Burj Khalifa and Dubai Fountain, fully furnished and managed by the Address Hotels + Resorts.",
    coordinates: { x: 34, y: 38 },
    popular: false
  },
  {
    id: "verdana-residence-2",
    name: "Verdana Residence 2",
    area: "Dubai Investments Park",
    price: 985000,
    beds: 1,
    baths: 1,
    size: 633,
    imageUrl: "https://files.remapp.ae/rem-offplan-v3/project-covers/1770640558459-4212adfde84e5056.jpg",
    developer: "Reportage Properties",
    rentalYield: 6.5,
    appreciation: 7.2,
    capitalGrowth: 7.8,
    risk: "Low Risk",
    completion: "Q4 2026",
    description: "A contemporary apartment in Verdana community, Dubai Investments Park. Modern Italian design with premium finishes, featuring amenities like gym, swimming pool, BBQ areas, and kids' play area.",
    coordinates: { x: 25, y: 60 },
    popular: false
  },
  {
    id: "one-zaabeel",
    name: "One Za'abeel Penthouse",
    area: "Downtown Dubai",
    price: 14500000,
    beds: 4,
    baths: 5,
    size: 4200,
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    developer: "MERAAS",
    rentalYield: 6.5,
    appreciation: 8.2,
    capitalGrowth: 8.8,
    risk: "Low Risk",
    completion: "Ready",
    description: "An iconic landmark bridging heritage and future, suspended in the sky. Featuring high-altitude infinity pools, Michelin restaurants, and dual tower views.",
    coordinates: { x: 38, y: 30 },
    popular: false
  },
  {
    id: "bugatti-residences",
    name: "Bugatti Residences",
    area: "Business Bay",
    price: 19000000,
    beds: 3,
    baths: 4,
    size: 3400,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    developer: "BINGHATTI",
    rentalYield: 7.0,
    appreciation: 9.2,
    capitalGrowth: 9.5,
    risk: "Medium Risk",
    completion: "Q4 2026",
    description: "Designed with the aerodynamic lines and automotive brilliance of Bugatti. High-speed car elevators right to your penthouse suite, private beach pool, and dynamic layouts.",
    coordinates: { x: 28, y: 50 },
    popular: false
  },
  {
    id: "bluewaters-bay",
    name: "Bluewaters Bay Apartment",
    area: "Bluewaters",
    price: 6200000,
    beds: 2,
    baths: 3,
    size: 1600,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    developer: "MERAAS",
    rentalYield: 6.2,
    appreciation: 7.1,
    capitalGrowth: 7.8,
    risk: "Very Low Risk",
    completion: "Ready",
    description: "Island living at its finest, home to Ain Dubai. Offering open layouts, premium wellness facilities, and immediate pedestrian bridge access to JBR Beach.",
    coordinates: { x: 10, y: 58 },
    popular: false
  },
  {
    id: "dubai-hills-mansion",
    name: "Dubai Hills Mansion",
    area: "Dubai Hills",
    price: 38000000,
    beds: 7,
    baths: 9,
    size: 12000,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    developer: "EMAAR",
    rentalYield: 5.5,
    appreciation: 8.8,
    capitalGrowth: 9.0,
    risk: "Low Risk",
    completion: "Ready",
    description: "Nestled in the prestigious fairway community of Dubai Hills Estate. Overlooking the championship golf course, with private wellness wings and extensive landscaping.",
    coordinates: { x: 35, y: 53 },
    popular: false
  },
  {
    id: "creek-harbour-penthouse",
    name: "Creek Harbour Penthouse",
    area: "Dubai Creek Harbour",
    price: 11200000,
    beds: 4,
    baths: 5,
    size: 3800,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    developer: "EMAAR",
    rentalYield: 6.7,
    appreciation: 8.0,
    capitalGrowth: 8.5,
    risk: "Low Risk",
    completion: "Q3 2026",
    description: "Set in the newly designed ultra-smart waterfront city. Spectacular views of the wildlife sanctuary, Dubai Creek tower, and Downtown skyline.",
    coordinates: { x: 41, y: 58 },
    popular: false
  }
];

// Lazy Gemini Client Initialization Helper
let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing. Please add it via Secrets panel.");
    }
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3001;

  app.use(express.json());

  // API Endpoint: Get all properties
  app.get("/api/properties", (req, res) => {
    res.json(PROPERTIES);
  });

  // API Endpoint: AI Property Finder
  app.post("/api/search-properties", async (req, res) => {
    try {
      const { description } = req.body;
      if (!description || typeof description !== "string") {
        return res.status(400).json({ error: "Description is required" });
      }

      const client = getGeminiClient();
      
      // Let Gemini match properties from our database and provide a premium explanation
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `You are an elite real estate expert in Dubai. Filter our property database based on the user's dream house description: "${description}".

Our properties database:
${JSON.stringify(PROPERTIES, null, 2)}

Provide your recommendations in JSON format as an array containing matching property objects, where each recommendation has the property "id" (must match our property id exactly), "matchPercentage" (integer 0-100), and "aiExplanation" (custom narrative explaining why this property matches their dream in a luxurious, professional tone).

Return ONLY a raw JSON array matching this schema:
[
  {
    "id": "property-id-string",
    "matchPercentage": 95,
    "aiExplanation": "A short, elegant explanation of why this property fits..."
  }
]`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: "The exact property ID matching our list" },
                matchPercentage: { type: Type.INTEGER, description: "Percentage representing the match quality (0-100)" },
                aiExplanation: { type: Type.STRING, description: "Exquisite description explaining the match reasons" }
              },
              required: ["id", "matchPercentage", "aiExplanation"]
            }
          }
        }
      });

      const text = response.text || "[]";
      const matches = JSON.parse(text);

      // Map back to our full property details
      const enrichedMatches = matches.map((m: any) => {
        const prop = PROPERTIES.find(p => p.id === m.id);
        if (!prop) return null;
        return {
          ...prop,
          matchPercentage: m.matchPercentage,
          aiExplanation: m.aiExplanation
        };
      }).filter(Boolean);

      // If no matches found or empty, return top 2 properties as general recommendation
      if (enrichedMatches.length === 0) {
        return res.json([
          {
            ...PROPERTIES[1],
            matchPercentage: 90,
            aiExplanation: "While we couldn't match your request exactly, Frond G Villa is our most popular off-plan property on Palm Jumeirah offering unparalleled beachfront luxury."
          },
          {
            ...PROPERTIES[2],
            matchPercentage: 85,
            aiExplanation: "As a prime luxury high-rise, Address Residences provides Burj-facing luxury suited for smart investments in the heart of Downtown."
          }
        ]);
      }

      res.json(enrichedMatches);
    } catch (error: any) {
      console.error("AI Property Finder Error:", error);
      res.status(500).json({ error: error.message || "An error occurred with the AI assistant" });
    }
  });

  // API Endpoint: AI Concierge Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      const client = getGeminiClient();

      // Convert messages to Gemini SDK parts format
      const chatMessages = messages.map(msg => ({
        role: msg.role === "user" ? "user" as const : "model" as const,
        parts: [{ text: msg.content }]
      }));

      // Initialize a new chat session using standard contents history
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatMessages,
        config: {
          systemInstruction: `You are 'City Global Real Estate's Elite AI Concierge' – an extremely sophisticated, highly informed, and polished real estate consultant based in Dubai.
- Tone: Professional, warm, premium, elite, highly knowledgeable.
- Expertise: Dubai Property market trends, Prime Areas (Palm Jumeirah, Downtown Dubai, Business Bay, Dubai Marina, Jumeirah, Dubai Hills Estate), UAE Golden Visa program, Return on Investment (ROI), rental yields, premium developments (EMAAR, DAMAC, Sobha, Meraas, Nakheel).
- Focus: Be specific and factual. Do not say generic things. Mention real estate values, yields of 6-9%, prime tax-free lifestyle benefits, and the golden visa investment threshold (AED 2M+).
- Structure: Keep your answers structured, elegant, and concise. Use clear bullet points if detailing multiple facts or steps. Limit responses to 2-3 brief paragraphs maximum.`
        }
      });

      res.json({ content: response.text });
    } catch (error: any) {
      console.error("AI Concierge Chat Error:", error);
      res.status(500).json({ error: error.message || "An error occurred with the AI assistant" });
    }
  });

// Serve static assets
   const distPath = path.join(process.cwd(), "dist");
   app.use(express.static(distPath));
   app.get("*", (req, res) => {
     res.sendFile(path.join(distPath, "index.html"));
   });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Server startup error:", err);
});
