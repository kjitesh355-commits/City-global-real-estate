import { GoogleGenAI } from "@google/genai";

// Input sanitization helper
function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters and limit length
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length to prevent abuse
}

let geminiClient = null;

function getGeminiClient() {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const client = getGeminiClient();

    const chatMessages = messages.map(msg => ({
      role: msg.role === "user" ? "user" as const : "model" as const,
      parts: [{ text: msg.content }]
    }));

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

    res.status(200).json({ content: response.text });
  } catch (error) {
    console.error("AI Concierge Chat Error:", error);
    res.status(500).json({ error: "An error occurred with the AI assistant" });
  }
}