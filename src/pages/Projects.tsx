import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import {
  Search,
  MapPin,
  Building2,
  TrendingUp,
  Users,
  Star,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Phone,
  Filter,
  Home,
  Castle,
  Landmark,
  Building,
  Warehouse,
  Waves,
  CalendarClock,
  CheckCircle,
  X,
  Heart,
  Share2,
  Eye,
  Sparkles,
  Shield,
  CreditCard,
  HeadphonesIcon,
  Handshake,
  BadgeCheck,
  Globe,
  Banknote,
  Timer,
  UserCheck,
  Target,
  Zap,
  Briefcase,
  Scale,
} from "lucide-react";
import { GradientBackground } from "../components/ui/gradient-background-4";
import { BeamsBackground } from "../components/ui/beams-background";
import {
  ScrollReveal,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  ScaleReveal,
} from "../components/ui/scroll-reveal";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  MapControls,
} from "../components/ui/mapcn-marker-popup";

interface ProjectsProps {
  theme: "light" | "dark";
  onOpenConsultation: () => void;
}

const projectsData = [
  {
    id: 1,
    name: "The Crest by Sobha",
    location: "Sobha Hartland, Dubai",
    developer: "Sobha Realty",
    price: "AED 1.5M",
    completion: "Q4 2026",
    type: "Apartments",
    status: "New Launch",
    units: "1, 2 & 3 BR",
    amenities: ["Swimming Pool", "Gym", "Smart Home", "Kids Area", "Parking"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    roi: "8.5%",
  },
  {
    id: 2,
    name: "Binghatti Ghost",
    location: "Business Bay, Dubai",
    developer: "Binghatti",
    price: "AED 1.2M",
    completion: "Q2 2026",
    type: "Apartments",
    status: "Pre-Launch",
    units: "Studio, 1 & 2 BR",
    amenities: ["Swimming Pool", "Gym", "Smart Home", "Parking"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    roi: "9.2%",
  },
  {
    id: 3,
    name: "Emaar Beachfront",
    location: "Emaar Beachfront, Dubai",
    developer: "Emaar Properties",
    price: "AED 2.8M",
    completion: "Ready",
    type: "Penthouses",
    status: "Ready",
    units: "2, 3 & 4 BR",
    amenities: ["Swimming Pool", "Gym", "Smart Home", "Kids Area", "Parking", "Beach Access"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    roi: "7.8%",
  },
  {
    id: 4,
    name: "Damac Lagoons",
    location: "Damac Hills 2, Dubai",
    developer: "DAMAC Properties",
    price: "AED 890K",
    completion: "Q1 2026",
    type: "Townhouses",
    status: "New Launch",
    units: "3 & 4 BR",
    amenities: ["Swimming Pool", "Gym", "Kids Area", "Parking", "Beach Access"],
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    roi: "10.1%",
  },
  {
    id: 5,
    name: "Aldar Yas Acres",
    location: "Yas Island, Abu Dhabi",
    developer: "Aldar Properties",
    price: "AED 1.8M",
    completion: "Q3 2026",
    type: "Villas",
    status: "Pre-Launch",
    units: "4 & 5 BR",
    amenities: ["Swimming Pool", "Gym", "Smart Home", "Kids Area", "Parking", "Beach Access"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    roi: "8.9%",
  },
  {
    id: 6,
    name: "Nakheel Palm Jebel Ali",
    location: "Palm Jebel Ali, Dubai",
    developer: "Nakheel",
    price: "AED 5.5M",
    completion: "Q4 2027",
    type: "Mansions",
    status: "Sold Out",
    units: "5, 6 & 7 BR",
    amenities: ["Swimming Pool", "Gym", "Smart Home", "Kids Area", "Parking", "Beach Access"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    roi: "6.5%",
  },
];

const categories = [
  { name: "Apartments", icon: Building2, count: 142 },
  { name: "Villas", icon: Home, count: 89 },
  { name: "Townhouses", icon: Castle, count: 56 },
  { name: "Penthouses", icon: Landmark, count: 34 },
  { name: "Mansions", icon: Building, count: 18 },
  { name: "Commercial", icon: Warehouse, count: 67 },
  { name: "Waterfront", icon: Waves, count: 43 },
  { name: "Off-Plan", icon: CalendarClock, count: 210 },
];

const locations = [
  { name: "Downtown Dubai", projects: 48, startingPrice: "AED 1.2M", roi: "7.5%", image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&q=80", lng: 55.2744, lat: 25.1924 },
  { name: "Dubai Marina", projects: 35, startingPrice: "AED 980K", roi: "8.2%", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", lng: 55.1398, lat: 25.0803 },
  { name: "Palm Jumeirah", projects: 22, startingPrice: "AED 3.5M", roi: "6.8%", image: "https://images.unsplash.com/photo-1597659840241-37e2b7c3d2b5?w=600&q=80", lng: 55.1389, lat: 25.1124 },
  { name: "Dubai Hills Estate", projects: 31, startingPrice: "AED 1.5M", roi: "9.1%", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", lng: 55.2468, lat: 25.1048 },
  { name: "Business Bay", projects: 42, startingPrice: "AED 1.1M", roi: "8.8%", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", lng: 55.2624, lat: 25.1855 },
  { name: "Jumeirah Village Circle", projects: 28, startingPrice: "AED 750K", roi: "9.5%", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", lng: 55.2092, lat: 25.1164 },
  { name: "Dubai Creek Harbour", projects: 19, startingPrice: "AED 1.3M", roi: "8.0%", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", lng: 55.3461, lat: 25.2132 },
  { name: "Dubai South", projects: 25, startingPrice: "AED 680K", roi: "10.2%", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", lng: 55.1681, lat: 24.8999 },
  { name: "Meydan", projects: 16, startingPrice: "AED 1.4M", roi: "8.6%", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80", lng: 55.2712, lat: 25.1548 },
  { name: "Expo City Dubai", projects: 12, startingPrice: "AED 950K", roi: "9.8%", image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80", lng: 55.3903, lat: 24.9655 },
];

const whyInvest = [
  { title: "High ROI", desc: "Average rental yields of 7-12% annually, among the highest globally.", icon: TrendingUp },
  { title: "Strong Rental Demand", desc: "Year-round demand from tourists, expats, and professionals.", icon: Users },
  { title: "Golden Visa Eligibility", desc: "10-year residency visa for property investors above AED 2M.", icon: Shield },
  { title: "Tax-Free Investment", desc: "Zero income tax, zero capital gains tax, zero property tax.", icon: Banknote },
];

const whyChooseUs = [
  { title: "Verified Projects", desc: "Every project is verified and RERA-approved.", icon: BadgeCheck },
  { title: "Trusted Developers", desc: "We partner with top-tier developers only.", icon: Shield },
  { title: "Flexible Payment Plans", desc: "60/40 and post-handover payment options.", icon: CreditCard },
  { title: "Investment Consultation", desc: "Expert advice tailored to your goals.", icon: HeadphonesIcon },
  { title: "Mortgage Assistance", desc: "Competitive rates from 3.99% per annum.", icon: Landmark },
  { title: "End-to-End Support", desc: "From search to handover, we handle everything.", icon: Handshake },
];

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-num font-bold text-[#d4af37]">
      {prefix}{count}{suffix}
    </div>
  );
}

const statusColors: Record<string, string> = {
  "New Launch": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Pre-Launch": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Ready": "bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30",
  "Sold Out": "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function Projects({ theme, onOpenConsultation }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const isDark = theme === "dark";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedType("");
    setSelectedDeveloper("");
    setSelectedPrice("");
    setSelectedBedrooms("");
    setSelectedStatus("");
    setSelectedYear("");
  };

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal delay={0.1}>
            <span className="inline-block font-sans text-[11px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold mb-6 px-5 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 backdrop-blur-sm">
              Latest Developments
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Discover Dubai's Most{" "}
              <span className="text-[#d4af37]">Exclusive</span>{" "}
              Real Estate Projects
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className={`font-sans text-base sm:text-lg ${isDark ? "text-gray-300" : "text-stone-600"} max-w-2xl mx-auto mb-10 leading-relaxed`}>
              Explore premium off-plan developments, luxury apartments, villas, townhouses, and investment opportunities across Dubai's most desirable communities.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.55}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#featured-projects"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#d4af37] text-black font-sans text-sm font-semibold tracking-wide hover:bg-[#e7c96a] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
              >
                <Search className="w-4 h-4" />
                Browse Projects
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button
                onClick={onOpenConsultation}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 ${isDark ? "bg-white/5" : "bg-stone-100/80"} backdrop-blur-sm ${isDark ? "text-white" : "text-[#1c1917]"} font-sans text-sm font-semibold tracking-wide hover:bg-white/10 hover:border-white/40 transition-all duration-300 cursor-pointer`}
              >
                <Phone className="w-4 h-4" />
                Schedule Consultation
              </button>
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#d4af37]" />
        </div>
      </section>

      <BeamsBackground theme="dark" intensity="medium">
        {/* Ambient floating gold orbs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute top-[15%] left-[10%] w-96 h-96 rounded-full bg-[#d4af37]/[0.03] blur-[120px] animate-[float_20s_ease-in-out_infinite]" />
          <div className="absolute top-[60%] right-[5%] w-80 h-80 rounded-full bg-[#d4af37]/[0.04] blur-[100px] animate-[float_25s_ease-in-out_infinite_reverse]" />
          <div className="absolute bottom-[10%] left-[40%] w-72 h-72 rounded-full bg-[#d4af37]/[0.02] blur-[140px] animate-[float_30s_ease-in-out_infinite]" />
          <div className="absolute top-[40%] right-[30%] w-64 h-64 rounded-full bg-white/[0.01] blur-[100px] animate-[float_22s_ease-in-out_infinite_reverse]" />
        </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — SMART PROPERTY SEARCH
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 -mt-20 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className={`rounded-3xl border ${isDark ? "border-white/10" : "border-stone-200/60"} ${isDark ? "bg-white/5" : "bg-white/80"} backdrop-blur-xl ${isDark ? "shadow-2xl" : "shadow-sm"} p-6 sm:p-8 lg:p-10`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                  <Search className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold">Smart Property Search</h2>
                  <p className={`text-xs ${isDark ? "text-gray-400" : "text-stone-500"}`}>Find your perfect project in seconds</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"}`} />
                  <input
                    type="text"
                    placeholder="Search by project name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl ${isDark ? "bg-white/5" : "bg-white"} border ${isDark ? "border-white/10" : "border-stone-200"} text-sm font-sans placeholder-gray-500 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all`}
                  />
                </div>

                <div className="relative">
                  <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"}`} />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl ${isDark ? "bg-white/5 border border-white/10 text-white" : "bg-white border border-stone-200 text-stone-900"} text-sm font-sans focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all appearance-none cursor-pointer`}
                  >
                    <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Location</option>
                    {locations.map((l) => (
                      <option key={l.name} value={l.name} className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>{l.name}</option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"} pointer-events-none`} />
                </div>

                <div className="relative">
                  <Building2 className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"}`} />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl ${isDark ? "bg-white/5 border border-white/10 text-white" : "bg-white border border-stone-200 text-stone-900"} text-sm font-sans focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all appearance-none cursor-pointer`}
                  >
                    <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Property Type</option>
                    {categories.map((c) => (
                      <option key={c.name} value={c.name} className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"} pointer-events-none`} />
                </div>

                <div className="relative">
                  <Users className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"}`} />
                  <select
                    value={selectedDeveloper}
                    onChange={(e) => setSelectedDeveloper(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl ${isDark ? "bg-white/5 border border-white/10 text-white" : "bg-white border border-stone-200 text-stone-900"} text-sm font-sans focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all appearance-none cursor-pointer`}
                  >
                    <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Developer</option>
                    <option value="emaar" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Emaar Properties</option>
                    <option value="damac" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>DAMAC Properties</option>
                    <option value="sobha" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Sobha Realty</option>
                    <option value="aldar" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Aldar Properties</option>
                    <option value="binghatti" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Binghatti</option>
                    <option value="nakheel" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Nakheel</option>
                  </select>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"} pointer-events-none`} />
                </div>
              </div>

              {/* Expanded Filters */}
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 transition-all duration-300 ${showFilters ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                <div className="relative">
                  <TrendingUp className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"}`} />
                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl ${isDark ? "bg-white/5 border border-white/10 text-white" : "bg-white border border-stone-200 text-stone-900"} text-sm font-sans focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all appearance-none cursor-pointer`}
                  >
                    <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Price Range</option>
                    <option value="0-1m" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Under AED 1M</option>
                    <option value="1-2m" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>AED 1M - 2M</option>
                    <option value="2-5m" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>AED 2M - 5M</option>
                    <option value="5m+" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>AED 5M+</option>
                  </select>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"} pointer-events-none`} />
                </div>

                <div className="relative">
                  <Home className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"}`} />
                  <select
                    value={selectedBedrooms}
                    onChange={(e) => setSelectedBedrooms(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl ${isDark ? "bg-white/5 border border-white/10 text-white" : "bg-white border border-stone-200 text-stone-900"} text-sm font-sans focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all appearance-none cursor-pointer`}
                  >
                    <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Bedrooms</option>
                    <option value="studio" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Studio</option>
                    <option value="1" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>1 BR</option>
                    <option value="2" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>2 BR</option>
                    <option value="3" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>3 BR</option>
                    <option value="4+" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>4+ BR</option>
                  </select>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"} pointer-events-none`} />
                </div>

                <div className="relative">
                  <CheckCircle className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"}`} />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl ${isDark ? "bg-white/5 border border-white/10 text-white" : "bg-white border border-stone-200 text-stone-900"} text-sm font-sans focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all appearance-none cursor-pointer`}
                  >
                    <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Completion Status</option>
                    <option value="off-plan" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Off-Plan</option>
                    <option value="ready" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Ready</option>
                    <option value="under-construction" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Under Construction</option>
                  </select>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"} pointer-events-none`} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl border ${isDark ? "border-white/10" : "border-stone-200"} ${isDark ? "bg-white/5" : "bg-stone-100/80"} text-sm font-sans ${isDark ? "text-gray-300" : "text-stone-600"} hover:bg-white/10 transition-all cursor-pointer`}
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? "Hide Filters" : "More Filters"}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </button>
                <div className="flex-1" />
                <button
                  onClick={resetFilters}
                  className={`px-5 py-3 rounded-2xl border ${isDark ? "border-white/10" : "border-stone-200"} ${isDark ? "bg-white/5" : "bg-stone-100/80"} text-sm font-sans ${isDark ? "text-gray-300" : "text-stone-600"} hover:bg-white/10 transition-all cursor-pointer`}
                >
                  Reset Filters
                </button>
                <button className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#d4af37] text-black font-sans text-sm font-semibold hover:bg-[#e7c96a] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] cursor-pointer">
                  <Search className="w-4 h-4" />
                  Search Projects
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — FEATURED PROJECTS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="featured-projects" className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block font-sans text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-4">
                Featured Projects
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Premium Off-Plan <span className="text-[#d4af37]">Developments</span>
              </h2>
              <p className={`font-sans ${isDark ? "text-gray-400" : "text-stone-500"} max-w-xl mx-auto`}>
                Handpicked projects from Dubai's most trusted developers
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projectsData.map((project) => (
              <StaggerItem key={project.id}>
                <motion.div
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  animate={{
                    borderColor: hoveredProject === project.id ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.08)",
                    y: hoveredProject === project.id ? -8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`group rounded-3xl border ${isDark ? "bg-white/5" : "bg-stone-100/80"} backdrop-blur-sm overflow-hidden cursor-pointer`}
                >
                  {/* Image */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      animate={{ scale: hoveredProject === project.id ? 1.08 : 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold border ${statusColors[project.status]}`}>
                      {project.status}
                    </span>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-[#d4af37] transition-colors cursor-pointer">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-[#d4af37] transition-colors cursor-pointer">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className={`font-serif text-xl font-bold ${isDark ? "text-white" : "text-[#1c1917]"} mb-1`}>{project.name}</h3>
                      <div className={`flex items-center gap-1.5 ${isDark ? "text-gray-300" : "text-stone-600"} text-xs`}>
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"} block mb-0.5`}>Developer</span>
                        <span className="text-sm font-semibold text-gray-200">{project.developer}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"} block mb-0.5`}>Starting Price</span>
                        <span className="text-lg font-bold text-[#d4af37]">{project.price}</span>
                      </div>
                    </div>

                    <div className={`grid grid-cols-3 gap-3 mb-4 py-3 border-t border-b ${isDark ? "border-white/5" : "border-stone-200/60"}`}>
                      <div className="text-center">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"} block`}>Type</span>
                        <span className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-stone-600"}`}>{project.type}</span>
                      </div>
                      <div className="text-center">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"} block`}>Units</span>
                        <span className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-stone-600"}`}>{project.units}</span>
                      </div>
                      <div className="text-center">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"} block`}>Completion</span>
                        <span className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-stone-600"}`}>{project.completion}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.amenities.slice(0, 4).map((amenity) => (
                        <span key={amenity} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
                          {amenity}
                        </span>
                      ))}
                      {project.amenities.length > 4 && (
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${isDark ? "bg-white/5" : "bg-stone-100/80"} ${isDark ? "text-gray-400" : "text-stone-500"} border ${isDark ? "border-white/10" : "border-stone-200"}`}>
                          +{project.amenities.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#d4af37] text-black text-xs font-semibold tracking-wide hover:bg-[#e7c96a] transition-all duration-300 cursor-pointer">
                        <Eye className="w-3.5 h-3.5" />
                        View Details
                      </button>
                      <button
                        onClick={onOpenConsultation}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border ${isDark ? "border-white/10" : "border-stone-200"} ${isDark ? "bg-white/5" : "bg-stone-100/80"} text-xs font-semibold tracking-wide hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — BROWSE BY CATEGORY
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <GradientBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block font-sans text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-4">
                Categories
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Browse by <span className="text-[#d4af37]">Category</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <StaggerItem key={cat.name}>
                  <motion.div
                    onHoverStart={() => setHoveredCategory(i)}
                    onHoverEnd={() => setHoveredCategory(null)}
                    whileHover={{ y: -6, borderColor: "rgba(212,175,55,0.4)" }}
                    className={`rounded-3xl border border-white/8 ${isDark ? "bg-white/5" : "bg-stone-100/80"} backdrop-blur-sm p-6 text-center cursor-pointer transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(212,175,55,0.08)]`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[#d4af37]" />
                    </div>
                    <h3 className="font-sans text-sm font-semibold mb-1">{cat.name}</h3>
                    <span className={`text-xs ${isDark ? "text-gray-500" : "text-stone-400"}`}>{cat.count} Projects</span>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — BROWSE BY LOCATION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block font-sans text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-4">
                Locations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Browse by <span className="text-[#d4af37]">Location</span>
              </h2>
              <p className={`font-sans ${isDark ? "text-gray-400" : "text-stone-500"} max-w-xl mx-auto`}>
                Explore Dubai's most sought-after neighborhoods
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {locations.map((loc, i) => (
              <StaggerItem key={loc.name}>
                <motion.div
                  onHoverStart={() => setHoveredLocation(i)}
                  onHoverEnd={() => setHoveredLocation(null)}
                  whileHover={{ y: -4 }}
                  className="group relative rounded-3xl overflow-hidden h-56 cursor-pointer"
                >
                  <motion.img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover"
                    animate={{ scale: hoveredLocation === i ? 1.08 : 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/5 transition-colors duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-xl font-bold mb-2">{loc.name}</h3>
                    <div className={`flex items-center gap-4 text-xs ${isDark ? "text-gray-300" : "text-stone-600"}`}>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {loc.projects} Projects
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-[#d4af37]" />
                        {loc.roi} ROI
                      </span>
                      <span className="text-[#d4af37] font-semibold">From {loc.startingPrice}</span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-black" />
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5b — INTERACTIVE MAP
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block font-sans text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-4">
                Explore on Map
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Discover <span className="text-[#d4af37]">Project Locations</span>
              </h2>
              <p className={`font-sans ${isDark ? "text-gray-400" : "text-stone-500"} max-w-xl mx-auto`}>
                Interactive map of Dubai's premium real estate communities
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className={`rounded-3xl overflow-hidden border ${isDark ? "border-white/10" : "border-stone-200/60"} ${isDark ? "bg-white/5" : "bg-white/80"} backdrop-blur-sm ${isDark ? "shadow-2xl" : "shadow-sm"}`}>
              <div className="h-[500px] w-full">
                <Map
                  center={[55.22, 25.15]}
                  zoom={11}
                  theme="dark"
                  className="h-full w-full"
                >
                  {locations.map((loc) => (
                    <MapMarker
                      key={loc.name}
                      longitude={loc.lng}
                      latitude={loc.lat}
                    >
                      <MarkerContent>
                        <div className="relative group">
                          <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-110 cursor-pointer border-2 border-white/30">
                            <MapPin className="w-4 h-4 text-black" />
                          </div>
                          <div className="absolute -inset-1 bg-[#d4af37]/20 rounded-full animate-ping opacity-30" />
                        </div>
                      </MarkerContent>
                      <MarkerLabel position="bottom">{loc.name}</MarkerLabel>
                      <MarkerPopup className="w-56 p-0">
                        <div className="relative h-24 overflow-hidden">
                          <img
                            src={loc.image}
                            alt={loc.name}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="p-3 space-y-2">
                          <h4 className="font-serif text-sm font-bold">{loc.name}</h4>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className={isDark ? "text-gray-400" : "text-stone-500"}>{loc.projects} Projects</span>
                            <span className="text-[#d4af37] font-semibold">{loc.roi} ROI</span>
                          </div>
                          <div className="text-[#d4af37] text-xs font-semibold">
                            From {loc.startingPrice}
                          </div>
                        </div>
                      </MarkerPopup>
                    </MapMarker>
                  ))}
                  <MapControls
                    position="bottom-right"
                    showZoom
                    showCompass
                  />
                </Map>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — WHY INVEST
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <GradientBackground />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block font-sans text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-4">
                Investment
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Why <span className="text-[#d4af37]">Invest</span> in Dubai?
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyInvest.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <motion.div
                    whileHover={{ y: -6, borderColor: "rgba(212,175,55,0.4)" }}
                    className={`rounded-3xl border border-white/8 ${isDark ? "bg-white/5" : "bg-stone-100/80"} backdrop-blur-sm p-6 text-center h-full`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-5">
                      <Icon className="w-7 h-7 text-[#d4af37]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                    <p className={`font-sans text-sm ${isDark ? "text-gray-400" : "text-stone-500"} leading-relaxed`}>{item.desc}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 — INVESTMENT STATISTICS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="rounded-3xl border border-[#d4af37]/20 bg-[#d4af37]/5 backdrop-blur-sm p-8 sm:p-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <AnimatedCounter target={500} suffix="+" />
                  <p className={`font-sans text-xs uppercase tracking-wider ${isDark ? "text-gray-400" : "text-stone-500"} mt-2`}>Projects</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter target={75} suffix="+" />
                  <p className={`font-sans text-xs uppercase tracking-wider ${isDark ? "text-gray-400" : "text-stone-500"} mt-2`}>Developers</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter target={500} prefix="AED " suffix="K" />
                  <p className={`font-sans text-xs uppercase tracking-wider ${isDark ? "text-gray-400" : "text-stone-500"} mt-2`}>Starting Price</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter target={98} suffix="%" />
                  <p className={`font-sans text-xs uppercase tracking-wider ${isDark ? "text-gray-400" : "text-stone-500"} mt-2`}>Client Satisfaction</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 9 — CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 via-transparent to-[#d4af37]/10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Find Your Next{" "}
              <span className="text-[#d4af37]">Investment</span>{" "}
              Opportunity Today
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className={`font-sans text-base sm:text-lg ${isDark ? "text-gray-300" : "text-stone-600"} mb-10 max-w-2xl mx-auto leading-relaxed`}>
              Whether you're searching for a dream home or your next high-return investment, our experienced advisors will help you choose the perfect property.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#featured-projects"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#d4af37] text-black font-sans text-sm font-semibold tracking-wide hover:bg-[#e7c96a] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
              >
                View All Projects
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button
                onClick={onOpenConsultation}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 ${isDark ? "bg-white/5" : "bg-stone-100/80"} backdrop-blur-sm ${isDark ? "text-white" : "text-[#1c1917]"} font-sans text-sm font-semibold tracking-wide hover:bg-white/10 hover:border-white/40 transition-all duration-300 cursor-pointer`}
              >
                <Phone className="w-4 h-4" />
                Talk to an Expert
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8 — WHY CHOOSE US
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block font-sans text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-4">
                Why Us
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Why Choose <span className="text-[#d4af37]">City Global</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <motion.div
                    whileHover={{ y: -6, borderColor: "rgba(212,175,55,0.4)" }}
                    className={`group rounded-3xl border border-white/8 ${isDark ? "bg-white/5" : "bg-stone-100/80"} backdrop-blur-sm p-6 h-full`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mb-4 group-hover:bg-[#d4af37]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold mb-2">{item.title}</h3>
                    <p className={`font-sans text-sm ${isDark ? "text-gray-400" : "text-stone-500"} leading-relaxed`}>{item.desc}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
      </BeamsBackground>
    </div>
  );
}
