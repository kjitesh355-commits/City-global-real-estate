import express from "express";
import { GoogleGenAI, Type } from "@google/genai";

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

      const enrichedMatches = matches.map((m) => {
        const prop = PROPERTIES.find(p => p.id === m.id);
        if (!prop) return null;
        return {
          ...prop,
          matchPercentage: m.matchPercentage,
          aiExplanation: m.aiExplanation
        };
      }).filter(Boolean);

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

      res.status(200).json(enrichedMatches);
    } catch (error) {
      console.error("AI Property Finder Error:", error);
      res.status(500).json({ error: error.message || "An error occurred with the AI assistant" });
    }
  }
}