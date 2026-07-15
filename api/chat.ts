import { GoogleGenAI } from "@google/genai";

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .substring(0, 1000);
}

const PROPERTIES = [
  { id: "serenia-living", name: "Serenia Living Villa", area: "Palm Jumeirah", price: 45000000, beds: 5, baths: 7, size: 7500, developer: "EMAAR", rentalYield: 6.8, appreciation: 7.9, completion: "Ready", risk: "Low Risk" },
  { id: "azizi-venice", name: "Azizi Venice", area: "Dubai South", price: 755000, beds: 1, baths: 1, size: 692, developer: "Azizi Developments", rentalYield: 7.0, appreciation: 8.5, completion: "Q4 2026", risk: "Medium Risk" },
  { id: "verdana-residence-2", name: "Verdana Residence 2", area: "Dubai Investments Park", price: 880000, beds: 1, baths: 2, size: 719, developer: "Azizi Developments", rentalYield: 7.5, appreciation: 6.5, completion: "Q2 2027", risk: "Medium Risk" },
  { id: "frond-g-villa", name: "Frond G Villa", area: "Palm Jumeirah", price: 65000000, beds: 6, baths: 8, size: 12000, developer: "Nakheel", rentalYield: 5.5, appreciation: 8.2, completion: "Ready", risk: "Low Risk" },
  { id: "address-residences", name: "Address Residences", area: "Downtown Dubai", price: 5500000, beds: 2, baths: 3, size: 1800, developer: "EMAAR", rentalYield: 6.5, appreciation: 7.0, completion: "Q1 2027", risk: "Low Risk" },
  { id: "one-zaabeel", name: "One Za'abeel", area: "Za'abeel", price: 8200000, beds: 3, baths: 4, size: 3200, developer: "Ithra Dubai", rentalYield: 5.8, appreciation: 6.8, completion: "Ready", risk: "Low Risk" },
  { id: "bugatti-residences", name: "Bugatti Residences", area: "Business Bay", price: 18500000, beds: 4, baths: 5, size: 5600, developer: "Binghatti", rentalYield: 5.2, appreciation: 9.1, completion: "Q4 2026", risk: "Medium Risk" },
  { id: "bluewaters-bay", name: "Bluewaters Bay", area: "Bluewaters Island", price: 3800000, beds: 2, baths: 3, size: 1400, developer: "Meraas", rentalYield: 6.2, appreciation: 7.5, completion: "Ready", risk: "Low Risk" },
  { id: "dubai-hills-mansion", name: "Dubai Hills Mansion", area: "Dubai Hills Estate", price: 12500000, beds: 5, baths: 6, size: 6200, developer: "EMAAR", rentalYield: 5.8, appreciation: 8.0, completion: "Q3 2026", risk: "Low Risk" },
  { id: "creek-harbour-penthouse", name: "Creek Harbour Penthouse", area: "Dubai Creek Harbour", price: 9800000, beds: 3, baths: 4, size: 4100, developer: "EMAAR", rentalYield: 6.0, appreciation: 7.8, completion: "Q1 2027", risk: "Low Risk" }
];

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

    const propertyBrief = PROPERTIES.map(p => 
      `- ${p.name} (${p.area}): AED ${p.price.toLocaleString()} | ${p.beds}BR/${p.baths}BA | ${p.size}sqft | Yield: ${p.rentalYield}% | Appreciation: ${p.appreciation}% | Risk: ${p.risk} | ${p.completion} | by ${p.developer}`
    ).join("\n");

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatMessages,
      config: {
        systemInstruction: `You are City Global Real Estate's Elite AI Concierge — a world-class luxury real estate advisor based in Dubai with 15+ years of market expertise.

YOUR PERSONALITY:
- Warm, confident, sophisticated — like a trusted advisor at a five-star hotel
- Speak with authority but never arrogance
- Use specific numbers, not vague claims
- Match the client's language — if they're casual, be warm; if they're formal, be polished

CORE KNOWLEDGE:
- Dubai market trends: Palm Jumeirah properties appreciate 7-10% annually, Downtown 5-8%, Marina 6-9%
- Rental yields: Studios 7-9%, 1BR 6-8%, Villas 5-7%, Penthouses 4-6%
- Golden Visa: AED 2M+ property investment grants 10-year renewable visa
- Tax-free: No income tax, no capital gains tax, 0% property tax
- Key developers: EMAAR (premium, reliable), DAMAC (luxury, high-yield), Sobha (quality craftsmanship), Azizi (affordable luxury), Binghatti (innovative design)

OUR CURRENT PORTFOLIO (mention these specifically when relevant):
${propertyBrief}

GUIDELINES:
- Always mention specific properties from our portfolio when giving recommendations
- Use real numbers: yields, prices, appreciation rates
- If discussing areas, mention which of our properties are there
- Keep responses to 2-3 paragraphs max, use bullet points for lists
- End with a call-to-action: suggest viewing a property, booking a consultation, or exploring our portfolio
- For Golden Visa questions: explain the AED 2M threshold, 10-year visa, family sponsorship, and which of our properties qualify
- For investment questions: compare yields, discuss risk levels, mention payment plans
- Never make up data. If unsure, say "I'll have our investment team prepare a detailed analysis for you"
- Always sign off professionally — you represent a premium brand`
      }
    });

    res.status(200).json({ content: response.text });
  } catch (error) {
    console.error("AI Concierge Chat Error:", error);
    res.status(500).json({ error: "An error occurred with the AI assistant" });
  }
}