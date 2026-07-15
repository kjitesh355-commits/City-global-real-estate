import express from "express";
import { GoogleGenAI, Type } from "@google/genai";

// Input sanitization helper
function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters and limit length
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length to prevent abuse
}

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
    id: "azizi-venice",
    name: "Azizi Venice",
    area: "Dubai South",
    price: 755000,
    beds: 1,
    baths: 1,
    size: 692,
    imageUrl: "https://files.remapp.ae/rem-offplan-v3/project-covers/1770640193250-f1305fa96134cd79.png",
    developer: "Azizi Developments",
    rentalYield: 7.0,
    appreciation: 8.5,
    capitalGrowth: 9.0,
    risk: "Medium Risk",
    completion: "Q4 2026",
    description: "Azizi Venice is a large-scale waterfront community by Azizi Developments, located in Dubai South. Inspired by the charm of Venice, the project is designed around water-based living, cultural experiences, and a vibrant destination lifestyle. The master development includes over 90 buildings, 300+ villas and mansions, and more than 400,000 square metres of water areas.",
    coordinates: { x: 22, y: 65 },
    popular: false,
    views: {
      exterior: "https://files.remapp.ae/rem-offplan-v3/project-images/1771137251833-4a8d369b30f2fbb5.jpg",
      living: "https://files.remapp.ae/rem-offplan-v3/project-images/1771137255063-0a0012a9a8ecb181.jpg",
      kitchen: "https://files.remapp.ae/rem-offplan-v3/project-images/1771137257994-ff71d5268756fa94.jpg",
      bedroom: "https://files.remapp.ae/rem-offplan-v3/project-images/1771137267712-a8c97c2e7a09cdca.jpg",
      tour3d: "https://files.remapp.ae/rem-offplan-v3/project-images/1771137272701-9bb5e041580fa688.jpg"
    },
    amenities: ["Friday Mosque", "Spa", "Restaurants", "Opera House", "Jogging & Bicycle Tracks", "Waterpark", "International School", "Community Hospital", "Swimming Pool", "Kids Play Area", "Snow Room", "State-Of-The-Art Gym", "Boulevard", "Undulating Boardwalk"],
    nearbyLocations: [
      { name: "Al Maktoum International Airport", distance: "19 min" },
      { name: "University of South Wales", distance: "20 min" },
      { name: "Dubai Exhibition Centre", distance: "21 min" },
      { name: "Al Marmoom Desert Lakes", distance: "32 min" }
    ],
    allImages: [
      "https://files.remapp.ae/rem-offplan-v3/project-covers/1770640193250-f1305fa96134cd79.png",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137255063-0a0012a9a8ecb181.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137267712-a8c97c2e7a09cdca.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137281599-923a63ca5b4bf504.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137283969-33fa2e79b03e29a0.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137289532-b2f295241cd0b559.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137302152-8158fd2edb801deb.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137308826-e119297775e90fef.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137261876-fcee94d206299421.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137251833-4a8d369b30f2fbb5.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137272701-9bb5e041580fa688.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137275898-194506e97c04f075.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137287126-af3dfcaf79ecdfb3.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137292984-357bc253478cc6a4.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137298216-a18f253f3d51104f.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137307124-554d67562a4a1694.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137310790-67366b830550e2a7.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137257994-ff71d5268756fa94.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137265104-3c4e712047e0fc14.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1771137278598-da0cb0affd3e4cbc.jpg"
    ],
    mapUrl: "https://www.google.com/maps?q=24.840158335436968,55.13328832799388&z=15",
    brochureUrl: "https://files.remapp.ae/rem-offplan-v3/project-files/1771139327639-78eac544dfc5af1d.pdf",
    developerInfo: {
      name: "Azizi Developments",
      description: "Azizi Developments is a leading developer belonging to the AZIZI Group, headquartered in Dubai, UAE. The company was founded in 2007 and has been awarded Developer of the Year three years in a row. For more than 15 years, Azizi has implemented many projects of various scales, paying special attention to innovative design and high quality.",
      phone: "+971 4 359 6673",
      email: "info@azizidevelopments.com",
      website: "https://www.azizidevelopments.com",
      address: "API World Tower, Suite No. 902/904, Sheikh Zayed Road, Dubai"
    }
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
    description: "Verdana Residence 2 is another architectural gem added to the luxury collection of Verdana community. It is a beautiful blend of modernity and natural serene views, offering a contemporary lifestyle for those who seek privacy, functionality, and a resort-like living experience within the bustling life of Dubai. The building features high-quality finishing, modern facades, and world-class facilities that bring all the city life to your doorstep.",
    coordinates: { x: 25, y: 60 },
    popular: false,
    views: {
      exterior: "https://files.remapp.ae/rem-offplan-v3/project-images/1770989423971-075d642722b1d2df.jpg",
      living: "https://files.remapp.ae/rem-offplan-v3/project-images/1770989432972-9a7eaf7828d3f560.jpg",
      kitchen: "https://files.remapp.ae/rem-offplan-v3/project-images/1770989428851-719805c3f16a4b51.jpg",
      bedroom: "https://files.remapp.ae/rem-offplan-v3/project-images/1770989443233-081eea692ef446df.jpg",
      tour3d: "https://files.remapp.ae/rem-offplan-v3/project-images/1770989449694-1b07ebecf0db0d1e.jpg"
    },
    amenities: ["Gymnasium", "BBQ Areas", "Large Swimming Pool", "Kids' Swimming Pools", "Kids' Play Area", "Shaded Seating Areas"],
    nearbyLocations: [
      { name: "Ewan Child Park", distance: "4.2 KM" },
      { name: "Souq Extra", distance: "4.5 KM" },
      { name: "Marina Beach", distance: "25.3 KM" },
      { name: "Al Maktoum International Airport", distance: "20.8 KM" },
      { name: "Downtown Dubai", distance: "34.4 KM" },
      { name: "The International School of Choueifat", distance: "3.8 KM" }
    ],
    allImages: [
      "https://files.remapp.ae/rem-offplan-v3/project-covers/1770640558459-4212adfde84e5056.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1770989432972-9a7eaf7828d3f560.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1770989443233-081eea692ef446df.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1770989449694-1b07ebecf0db0d1e.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1770989452980-06477585371399e2.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1770989436496-068c658a0a046230.png",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1770989423971-075d642722b1d2df.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1770989440091-125b915f91a34f27.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1770989446888-ebcd46dc31f56781.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1770989456262-1845e252052cf9a9.jpg",
      "https://files.remapp.ae/rem-offplan-v3/project-images/1770989428851-719805c3f16a4b51.jpg"
    ],
    mapUrl: "https://www.google.com/maps?q=24.989703896691616,55.17886168244739&z=15",
    floorPlanUrl: "https://files.remapp.ae/rem-offplan-v3/project-files/1770989462400-0697c6d6e89df7ea.pdf",
    brochureUrl: "https://files.remapp.ae/rem-offplan-v3/project-files/1770989471733-19e03b7d60b29196.pdf",
    developerInfo: {
      name: "Reportage Properties",
      description: "Reportage Properties is a prestigious developer with a confident international status based in the United Arab Emirates. The company is a key participant in the real estate market and we present magnificent projects combining modern design, high quality and innovative solutions. Reportage Properties demonstrates more than 15 years of experience in the field of real estate development.",
      phone: "+971562341318",
      email: "info@reportageuae.com",
      website: "https://reportageuae.com/",
      address: "3rd Floor, Anantara Tower, Business Bay, Dubai"
    }
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
  if (req.method === "GET") {
    res.status(200).json(PROPERTIES);
  } else if (req.method === "POST") {
    try {
      const { description } = req.body;
      if (!description || typeof description !== "string") {
        return res.status(400).json({ error: "Description is required" });
      }

      const client = getGeminiClient();
      
      const sanitizedDescription = sanitizeInput(description);
      
      const propertySummary = PROPERTIES.map(p => 
        `ID: "${p.id}" | ${p.name} | ${p.area} | AED ${p.price.toLocaleString()} | ${p.beds}BR/${p.baths}BA | ${p.size}sqft | Yield: ${p.rentalYield}% | Appreciation: ${p.appreciation}% | Risk: ${p.risk} | Status: ${p.completion} | Developer: ${p.developer}`
      ).join("\n");

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `You are City Global Real Estate's Chief Investment Analyst — a world-class property advisor with deep expertise in Dubai's real estate market. A client has shared their investment vision. Analyze it carefully and match the best properties from our portfolio.

CLIENT'S REQUEST: "${sanitizedDescription}"

OUR PORTFOLIO:
${propertySummary}

YOUR TASK:
1. Analyze the client's request for: investment goals, budget range, lifestyle preferences, location preferences, size needs, and risk tolerance.
2. Match properties that best align with their vision. Consider ROI potential, location prestige, developer reputation, and lifestyle fit.
3. For each match, write a compelling 1-2 sentence explanation that highlights the specific investment value proposition — mention the area, yield, appreciation potential, or unique selling point.
4. Rank by match quality. Only include properties that genuinely fit. It's better to recommend 2-3 strong matches than 5 weak ones.

Return a JSON array. Each entry must have:
- "id": exact property ID from our list
- "matchPercentage": integer 0-100 (be honest — a 70% match is fine, don't inflate)
- "aiExplanation": 1-2 sentences of expert analysis explaining why this property matches their vision. Be specific about numbers, location benefits, and investment returns.

Return ONLY the raw JSON array, no additional text.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: "The exact property ID from our portfolio" },
                matchPercentage: { type: Type.INTEGER, description: "Honest match score 0-100" },
                aiExplanation: { type: Type.STRING, description: "Expert investment analysis, 1-2 sentences with specific numbers" }
              },
              required: ["id", "matchPercentage", "aiExplanation"]
            }
          }
        }
      });

      const text = response.text || "[]";
      const matches = JSON.parse(text);

      const enrichedMatches = matches.map((m) => {
        const prop = PROPERTIES.find(p => p.id === m.id);
        if (!prop) return null;
        return {
          ...prop,
          matchPercentage: Math.min(100, Math.max(0, m.matchPercentage)),
          aiExplanation: m.aiExplanation
        };
      }).filter(Boolean);

      enrichedMatches.sort((a: any, b: any) => (b.matchPercentage || 0) - (a.matchPercentage || 0));

      if (enrichedMatches.length === 0) {
        const fallback = PROPERTIES.slice(0, 2).map((p, i) => ({
          ...p,
          matchPercentage: 90 - i * 5,
          aiExplanation: `Based on your search, ${p.name} in ${p.area} stands out as a strong option — AED ${p.price.toLocaleString()} with ${p.rentalYield}% rental yield and ${p.appreciation}% annual appreciation. ${p.developer} delivers proven quality in this emerging micro-market.`
        }));
        return res.json(fallback);
      }

      res.status(200).json(enrichedMatches);
    } catch (error) {
      console.error("AI Property Finder Error:", error);
      res.status(500).json({ error: "An error occurred with the AI assistant" });
    }
  }
}