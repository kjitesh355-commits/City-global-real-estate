const PROPERTIES = [
  { id: "serenia-living", name: "Serenia Living Villa", area: "Palm Jumeirah", price: 45000000, beds: 5, baths: 7, size: 7500, developer: "EMAAR", rentalYield: 6.8, appreciation: 7.9, completion: "Ready", risk: "Low Risk" },
  { id: "azizi-venice", name: "Azizi Venice", area: "Dubai South", price: 755000, beds: 1, baths: 1, size: 692, developer: "Azizi Developments", rentalYield: 7.0, appreciation: 8.5, completion: "Q4 2026", risk: "Medium Risk" },
  { id: "verdana-residence-2", name: "Verdana Residence 2", area: "Dubai Investments Park", price: 985000, beds: 1, baths: 1, size: 633, developer: "Reportage Properties", rentalYield: 6.5, appreciation: 7.2, completion: "Q4 2026", risk: "Low Risk" },
  { id: "frond-g-villa", name: "Frond G Villa", area: "Palm Jumeirah", price: 65000000, beds: 6, baths: 8, size: 12000, developer: "Nakheel", rentalYield: 5.5, appreciation: 8.2, completion: "Ready", risk: "Low Risk" },
  { id: "address-residences", name: "Address Residences", area: "Downtown Dubai", price: 8200000, beds: 3, baths: 4, size: 2100, developer: "EMAAR", rentalYield: 5.8, appreciation: 6.9, completion: "Q4 2025", risk: "Very Low Risk" },
  { id: "one-zaabeel", name: "One Za'abeel Penthouse", area: "Downtown Dubai", price: 14500000, beds: 4, baths: 5, size: 4200, developer: "MERAAS", rentalYield: 6.5, appreciation: 8.2, completion: "Ready", risk: "Low Risk" },
  { id: "bugatti-residences", name: "Bugatti Residences", area: "Business Bay", price: 19000000, beds: 3, baths: 4, size: 3400, developer: "BINGHATTI", rentalYield: 7.0, appreciation: 9.2, completion: "Q4 2026", risk: "Medium Risk" },
  { id: "bluewaters-bay", name: "Bluewaters Bay Apartment", area: "Bluewaters", price: 6200000, beds: 2, baths: 3, size: 1600, developer: "MERAAS", rentalYield: 6.2, appreciation: 7.1, completion: "Ready", risk: "Very Low Risk" },
  { id: "dubai-hills-mansion", name: "Dubai Hills Mansion", area: "Dubai Hills", price: 38000000, beds: 7, baths: 9, size: 12000, developer: "EMAAR", rentalYield: 5.5, appreciation: 8.8, completion: "Ready", risk: "Low Risk" },
  { id: "creek-harbour-penthouse", name: "Creek Harbour Penthouse", area: "Dubai Creek Harbour", price: 11200000, beds: 4, baths: 5, size: 3800, developer: "EMAAR", rentalYield: 6.7, appreciation: 8.0, completion: "Q3 2026", risk: "Low Risk" }
];

async function callGeminiStream(contents: any[], systemInstruction?: string): Promise<ReadableStream> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY environment variable is required");
  const body: any = {
    contents,
    generationConfig: {
      maxOutputTokens: 512,
      temperature: 0.7
    }
  };
  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${key}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );
  if (!res.ok) {
    const rawText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${rawText.substring(0, 500)}`);
  }
  if (!res.body) throw new Error("No response body");
  return res.body;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  let rawBody = "";
  try {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk);
    rawBody = Buffer.concat(chunks).toString("utf-8");
  } catch (e) {
    return res.status(500).json({ error: "BODY_READ_ERROR" });
  }

  let parsed: any;
  try { parsed = JSON.parse(rawBody); }
  catch (e) { return res.status(400).json({ error: "INVALID_JSON_BODY", details: String(e) }); }

  try {
    const { messages } = parsed;
    if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "Messages array is required" });

    const chatMessages = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" as const : "model" as const,
      parts: [{ text: msg.content }]
    }));

    const propertyBrief = PROPERTIES.map(p =>
      `- ${p.name} (${p.area}): AED ${p.price.toLocaleString()} | ${p.beds}BR/${p.baths}BA | Yield: ${p.rentalYield}% | Appreciation: ${p.appreciation}% | Risk: ${p.risk} | ${p.completion} | by ${p.developer}`
    ).join("\n");

    const systemInstruction = `You are City Global Real Estate's AI Concierge — a luxury real estate advisor in Dubai.

PERSONALITY: Warm, confident. Use specific numbers.
PORTFOLIO: ${propertyBrief}

RULES: 2-3 short paragraphs max. Mention specific properties with real numbers. End with a question or call-to-action. Never fabricate data.`;

    const stream = await callGeminiStream(chatMessages, systemInstruction);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              res.write(`data: ${JSON.stringify({ text })}\n\n`);
            }
          } catch {
            // skip invalid JSON lines
          }
        }
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error: any) {
    console.error("AI Concierge Chat Error:", error);
    res.status(500).json({ error: "AI assistant error", details: error?.message || String(error) });
  }
}
