function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .substring(0, 1000);
}

const PROPERTIES = [
  { id: "serenia-living", name: "Serenia Living Villa", area: "Palm Jumeirah", price: 45000000, beds: 5, baths: 7, size: 7500, developer: "EMAAR", rentalYield: 6.8, appreciation: 7.9, completion: "Ready", risk: "Low Risk", description: "Ultra-premium beachfront villa on West Crescent of Palm Jumeirah.", coordinates: { x: 18, y: 49 }, imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80", views: { exterior: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80", living: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", bedroom: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", tour3d: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80" }, popular: true },
  { id: "azizi-venice", name: "Azizi Venice", area: "Dubai South", price: 755000, beds: 1, baths: 1, size: 692, developer: "Azizi Developments", rentalYield: 7.0, appreciation: 8.5, completion: "Q4 2026", risk: "Medium Risk", description: "Large-scale waterfront community inspired by Venice.", coordinates: { x: 22, y: 65 }, imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", views: { exterior: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", living: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", bedroom: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", tour3d: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80" } },
  { id: "verdana-residence-2", name: "Verdana Residence 2", area: "Dubai Investments Park", price: 985000, beds: 1, baths: 1, size: 633, developer: "Reportage Properties", rentalYield: 6.5, appreciation: 7.2, completion: "Q4 2026", risk: "Low Risk", description: "Modern luxury in the Verdana community.", coordinates: { x: 25, y: 60 }, imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", views: { exterior: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", living: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", bedroom: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", tour3d: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80" } },
  { id: "frond-g-villa", name: "Frond G Villa", area: "Palm Jumeirah", price: 65000000, beds: 6, baths: 8, size: 12000, developer: "Nakheel", rentalYield: 5.5, appreciation: 8.2, completion: "Ready", risk: "Low Risk", description: "Crown jewel of Palm Jumeirah fronds.", coordinates: { x: 22, y: 55 }, imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", views: { exterior: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", living: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", bedroom: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", tour3d: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80" }, popular: true },
  { id: "address-residences", name: "Address Residences", area: "Downtown Dubai", price: 8200000, beds: 3, baths: 4, size: 2100, developer: "EMAAR", rentalYield: 5.8, appreciation: 6.9, completion: "Q4 2025", risk: "Very Low Risk", description: "Luxury apartments facing Burj Khalifa.", coordinates: { x: 34, y: 38 }, imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", views: { exterior: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", living: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", bedroom: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", tour3d: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80" } },
  { id: "one-zaabeel", name: "One Za'abeel Penthouse", area: "Downtown Dubai", price: 14500000, beds: 4, baths: 5, size: 4200, developer: "MERAAS", rentalYield: 6.5, appreciation: 8.2, completion: "Ready", risk: "Low Risk", description: "Iconic landmark with infinity pools.", coordinates: { x: 38, y: 30 }, imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", views: { exterior: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", living: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", bedroom: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", tour3d: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80" }, popular: true },
  { id: "bugatti-residences", name: "Bugatti Residences", area: "Business Bay", price: 19000000, beds: 3, baths: 4, size: 3400, developer: "BINGHATTI", rentalYield: 7.0, appreciation: 9.2, completion: "Q4 2026", risk: "Medium Risk", description: "Automotive-inspired luxury with car elevators.", coordinates: { x: 28, y: 50 }, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", views: { exterior: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", living: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", bedroom: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", tour3d: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80" } },
  { id: "bluewaters-bay", name: "Bluewaters Bay Apartment", area: "Bluewaters", price: 6200000, beds: 2, baths: 3, size: 1600, developer: "MERAAS", rentalYield: 6.2, appreciation: 7.1, completion: "Ready", risk: "Very Low Risk", description: "Island living near Ain Dubai.", coordinates: { x: 10, y: 58 }, imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", views: { exterior: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", living: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", bedroom: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", tour3d: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80" } },
  { id: "dubai-hills-mansion", name: "Dubai Hills Mansion", area: "Dubai Hills", price: 38000000, beds: 7, baths: 9, size: 12000, developer: "EMAAR", rentalYield: 5.5, appreciation: 8.8, completion: "Ready", risk: "Low Risk", description: "Golf course estate mansion.", coordinates: { x: 35, y: 53 }, imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", views: { exterior: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", living: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", bedroom: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", tour3d: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80" }, popular: true },
  { id: "creek-harbour-penthouse", name: "Creek Harbour Penthouse", area: "Dubai Creek Harbour", price: 11200000, beds: 4, baths: 5, size: 3800, developer: "EMAAR", rentalYield: 6.7, appreciation: 8.0, completion: "Q3 2026", risk: "Low Risk", description: "Smart waterfront penthouse.", coordinates: { x: 41, y: 58 }, imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", views: { exterior: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", living: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80", bedroom: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80", tour3d: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80" } }
];

async function callGemini(contents: any[], systemInstruction?: string, responseSchema?: any): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY environment variable is required");
  const body: any = { contents, generationConfig: {} };
  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }
  if (responseSchema) {
    body.generationConfig.responseMimeType = "application/json";
    body.generationConfig.responseSchema = responseSchema;
  }
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const rawText = await res.text();
  if (!res.ok) {
    throw new Error(`Gemini API error ${res.status}: ${rawText}`);
  }
  let data: any;
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    throw new Error(`Invalid JSON from Gemini: ${rawText.substring(0, 200)}`);
  }
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error(`No text in Gemini response: ${JSON.stringify(data).substring(0, 200)}`);
  return text;
}

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    res.status(200).json(PROPERTIES);
  } else if (req.method === "POST") {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk);
        const raw = Buffer.concat(chunks).toString("utf-8");
        req.body = JSON.parse(raw);
      }

      const { description } = req.body;
      if (!description || typeof description !== "string") {
        return res.status(400).json({ error: "Description is required" });
      }

      const sanitizedDescription = sanitizeInput(description);
      
      const propertySummary = PROPERTIES.map(p => 
        `ID: "${p.id}" | ${p.name} | ${p.area} | AED ${p.price.toLocaleString()} | ${p.beds}BR/${p.baths}BA | ${p.size}sqft | Yield: ${p.rentalYield}% | Appreciation: ${p.appreciation}% | Risk: ${p.risk} | Status: ${p.completion} | Developer: ${p.developer}`
      ).join("\n");

      const userPrompt = `You are City Global Real Estate's Chief Investment Analyst. A client has shared their investment vision. Match the best properties.

CLIENT'S REQUEST: "${sanitizedDescription}"

OUR PORTFOLIO:
${propertySummary}

Return a JSON array. Each entry:
- "id": property ID from list
- "matchPercentage": 0-100
- "aiExplanation": 1-2 sentences with specific numbers

Return ONLY the JSON array.`;

      const text = await callGemini(
        [{ role: "user", parts: [{ text: userPrompt }] }],
        undefined,
        {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              id: { type: "STRING" },
              matchPercentage: { type: "INTEGER" },
              aiExplanation: { type: "STRING" }
            },
            required: ["id", "matchPercentage", "aiExplanation"]
          }
        }
      );

      let matches;
      try {
        matches = JSON.parse(text);
      } catch {
        const fallback = PROPERTIES.slice(0, 3).map((p, i) => ({
          ...p,
          matchPercentage: 85 - i * 5,
          aiExplanation: `${p.name} in ${p.area} — AED ${p.price.toLocaleString()} with ${p.rentalYield}% yield and ${p.appreciation}% appreciation.`
        }));
        return res.json(fallback);
      }

      const enrichedMatches = matches.map((m: any) => {
        const prop = PROPERTIES.find(p => p.id === m.id);
        if (!prop) return null;
        return { ...prop, matchPercentage: Math.min(100, Math.max(0, m.matchPercentage)), aiExplanation: m.aiExplanation };
      }).filter(Boolean);

      enrichedMatches.sort((a: any, b: any) => (b.matchPercentage || 0) - (a.matchPercentage || 0));

      if (enrichedMatches.length === 0) {
        const fallback = PROPERTIES.slice(0, 2).map((p, i) => ({
          ...p,
          matchPercentage: 90 - i * 5,
          aiExplanation: `${p.name} in ${p.area} — AED ${p.price.toLocaleString()} with ${p.rentalYield}% yield.`
        }));
        return res.json(fallback);
      }

      res.status(200).json(enrichedMatches);
    } catch (error: any) {
      console.error("AI Property Finder Error:", error);
      res.status(500).json({ error: "An error occurred with the AI assistant", details: error?.message || String(error) });
    }
  }
}
