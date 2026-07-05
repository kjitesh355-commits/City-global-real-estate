export interface Property {
  id: string;
  name: string;
  area: string;
  price: number;
  beds: number;
  baths: number;
  size: number;
  imageUrl: string;
  developer: string;
  rentalYield: number;
  appreciation: number;
  capitalGrowth: number;
  risk: string;
  completion: string;
  description: string;
  coordinates: { x: number; y: number };
  popular?: boolean;
  views?: {
    exterior: string;
    living: string;
    kitchen: string;
    bedroom: string;
    tour3d: string;
  };
  matchPercentage?: number;
  aiExplanation?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
