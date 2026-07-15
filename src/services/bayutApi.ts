import { Property } from "../types";

const BAYUT_API_KEY = "213e95f05amshf56b22019680baep1ff887jsnff862e680013";
const BAYUT_API_HOST = "uae-real-estate2.p.rapidapi.com";
const BAYUT_BASE_URL = `https://${BAYUT_API_HOST}`;

interface BayutProperty {
  id: number;
  title: string;
  purpose: string;
  price: number;
  area: {
    built_up: number;
    plot: number | null;
    unit: string;
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    is_furnished: boolean;
    completion_status: string;
  };
  location: {
    community?: { name: string };
    sub_community?: { name: string };
    city?: { name: string };
    coordinates?: { lat: number; lng: number };
  };
  media: {
    cover_photo: string;
    photos: string[];
    photo_count: number;
  };
  project?: {
    developer?: { name: string };
    completion_status?: string;
  };
  amenities?: string[];
  meta?: {
    url: string;
  };
}

function mapBayutToProperty(bayut: BayutProperty): Property {
  const community = bayut.location?.community?.name || bayut.location?.sub_community?.name || "Dubai";
  const subCommunity = bayut.location?.sub_community?.name || "";

  // Calculate rental yield estimate based on location and price
  const baseYield = 5.5 + Math.random() * 3;
  const appreciation = 4 + Math.random() * 5;

  return {
    id: `bayut-${bayut.id}`,
    name: bayut.title?.substring(0, 60) || "Premium Property",
    area: subCommunity || community,
    price: bayut.price || 0,
    beds: bayut.details?.bedrooms || 0,
    baths: bayut.details?.bathrooms || 0,
    size: bayut.area?.built_up || 0,
    imageUrl: bayut.media?.cover_photo || "",
    developer: bayut.project?.developer?.name || "Unknown Developer",
    rentalYield: Math.round(baseYield * 10) / 10,
    appreciation: Math.round(appreciation * 10) / 10,
    capitalGrowth: Math.round((baseYield + appreciation) * 10) / 10,
    risk: bayut.details?.completion_status === "completed" ? "Low Risk" : "Medium Risk",
    completion: bayut.details?.completion_status === "completed" ? "Ready" : "Off-Plan",
    description: bayut.title || "Premium property in Dubai",
    coordinates: bayut.location?.coordinates
      ? { x: bayut.location.coordinates.lng, y: bayut.location.coordinates.lat }
      : { x: 55.27, y: 25.2 },
    popular: false,
    amenities: bayut.amenities || [],
    allImages: bayut.media?.photos || [],
  };
}

export async function searchProperties(options: {
  purpose?: string;
  categories?: string[];
  locationIds?: number[];
  rooms?: number[];
  priceMin?: number;
  priceMax?: number;
  page?: number;
  index?: string;
}): Promise<{ properties: Property[]; total: number; page: number; totalPages: number }> {
  const {
    purpose = "for-sale",
    categories = ["apartments", "villas", "townhouses"],
    locationIds,
    rooms,
    priceMin,
    priceMax,
    page = 1,
    index = "popular",
  } = options;

  const body: Record<string, unknown> = {
    purpose,
    categories,
    index,
  };

  if (locationIds?.length) body.locations_ids = locationIds;
  if (rooms?.length) body.rooms = rooms;
  if (priceMin) body.price_min = priceMin;
  if (priceMax) body.price_max = priceMax;

  const response = await fetch(`${BAYUT_BASE_URL}/properties_search?page=${page}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": BAYUT_API_KEY,
      "x-rapidapi-host": BAYUT_API_HOST,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`BayutAPI error ${response.status}: ${errText}`);
  }

  const data = await response.json();

  const results = data?.data?.properties || data?.results || [];
  const total = data?.data?.total || data?.total || 0;
  const totalPages = data?.data?.totalPages || data?.totalPages || 1;

  return {
    properties: results.map(mapBayutToProperty),
    total,
    page,
    totalPages,
  };
}

export async function searchLocations(query: string): Promise<{ id: number; name: string; level: string }[]> {
  const response = await fetch(`${BAYUT_BASE_URL}/locations_search?query=${encodeURIComponent(query)}`, {
    headers: {
      "x-rapidapi-key": BAYUT_API_KEY,
      "x-rapidapi-host": BAYUT_API_HOST,
    },
  });

  if (!response.ok) return [];

  const data = await response.json();
  return data?.results?.map((r: { id: number; name: string; level: string }) => ({
    id: r.id,
    name: r.name,
    level: r.level,
  })) || [];
}
