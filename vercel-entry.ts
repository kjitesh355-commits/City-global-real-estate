import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

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

let distPath = null;

function getDistPath() {
  if (!distPath) {
    distPath = path.join(process.cwd(), "dist");
  }
  return distPath;
}

async function buildFrontend() {
  const dp = getDistPath();
  if (!existsSync(dp)) {
    try {
      execSync("npm run build:frontend", { stdio: "inherit" });
    } catch (e) {
      console.log("Frontend build skipped or not configured");
    }
  }
}

async function handler(req: any, res: any) {
  const url = req.url || "/";
  console.log("Request URL:", url);
  
  if (url.startsWith("/api/")) {
    const pathname = url.split("?")[0].slice(5);
    console.log("API Pathname:", pathname);
    
    if (pathname === "properties" && req.method === "GET") {
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(PROPERTIES));
    }

    if (pathname === "bayut/properties" && req.method === "GET") {
      try {
        const params = new URLSearchParams(url.split("?")[1] || "");
        const purpose = params.get("purpose") || "for-sale";
        const page = params.get("page") || "1";
        const categories = params.get("categories") || "apartments,villas,townhouses";

        const bayutParams = new URLSearchParams();
        bayutParams.set("purpose", purpose);
        bayutParams.set("page", page);
        bayutParams.set("langs", "en");
        if (categories) bayutParams.set("categories", categories);

        const response = await fetch(
          `https://uae-real-estate3.p.rapidapi.com/search-property?${bayutParams.toString()}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "213e95f05amshf56b22019680baep1ff887jsnff862e680013",
              "x-rapidapi-host": "uae-real-estate3.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          console.error("BayutAPI error:", response.status);
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ properties: PROPERTIES }));
        }

        const data = await response.json();
        const results = data?.data?.properties || [];

        const mapped = results.map((p: any) => {
          const loc = p.location || [];
          const community = loc.find((l: any) => l.level === 2)?.name || loc.find((l: any) => l.level === 1)?.name || "Dubai";
          const subCommunity = loc.find((l: any) => l.level === 3)?.name || "";

          return {
            id: "bayut-" + p.id,
            name: (p.title?.en || "Premium Property").substring(0, 60),
            area: subCommunity || community,
            price: p.price || 0,
            beds: p.rooms || 0,
            baths: p.baths || 0,
            size: Math.round(p.area || 0),
            imageUrl: p.coverPhoto?.url || "",
            developer: p.project?.developer?.name?.en || "Unknown Developer",
            rentalYield: Math.round((5.5 + Math.random() * 3) * 10) / 10,
            appreciation: Math.round((4 + Math.random() * 5) * 10) / 10,
            capitalGrowth: Math.round((7 + Math.random() * 4) * 10) / 10,
            risk: p.completionStatus === "completed" ? "Low Risk" : "Medium Risk",
            completion: p.completionStatus === "completed" ? "Ready" : "Off-Plan",
            description: p.title?.en || "Premium property in Dubai",
            coordinates: p.geography?.lat
              ? { x: p.geography?.lng || 55.27, y: p.geography?.lat || 25.2 }
              : { x: 55.27, y: 25.2 },
            popular: false,
            amenities: (p.amenities || []).map((a: any) => a.name || a),
            allImages: (p.pictures || []).map((pic: any) => pic.url || pic),
            views: {
              exterior: p.coverPhoto?.url || "",
              living: p.pictures?.[0]?.url || p.coverPhoto?.url || "",
              kitchen: p.pictures?.[1]?.url || p.coverPhoto?.url || "",
              bedroom: p.pictures?.[2]?.url || p.coverPhoto?.url || "",
              tour3d: p.coverPhoto?.url || "",
            },
          };
        });

        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({
          properties: mapped,
          total: data?.data?.total || 0,
          page: Number(page),
          totalPages: data?.data?.totalPages || 1,
        }));
      } catch (error) {
        console.error("BayutAPI proxy error:", error);
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ properties: PROPERTIES }));
      }
    }
    
    if (pathname === "search-properties" && req.method === "POST") {
      try {
        const { description } = req.body;
        if (!description || typeof description !== "string") {
          return res.status(400).json({ error: "Description is required" });
        }

        const client = getGeminiClient();
        
        // Sanitize user input
        const sanitizedDescription = sanitizeInput(description);
        
        const response = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `You are an elite real estate expert in Dubai. Filter our property database based on the user's dream house description: "${sanitizedDescription}".

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

        return res.status(200).json(enrichedMatches);
      } catch (error) {
        console.error("AI Property Finder Error:", error);
        return res.status(500).json({ error: "An error occurred with the AI assistant" });
      }
    }
    
    if (pathname === "chat" && req.method === "POST") {
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

        return res.status(200).json({ content: response.text });
      } catch (error) {
        console.error("AI Concierge Chat Error:", error);
        return res.status(500).json({ error: "An error occurred with the AI assistant" });
      }
    }
    
    return res.status(404).json({ error: "Not found" });
  }
  
  const dp = getDistPath();
  const indexPath = path.join(dp, "index.html");
  
  if (existsSync(indexPath)) {
    const html = readFileSync(indexPath, "utf-8");
    res.setHeader("Content-Type", "text/html");
    return res.send(html);
  }
  
  res.status(404).send("Not found");
}

export default handler;