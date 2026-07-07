import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Search,
  MapPin,
  Building2,
  Home,
  BedDouble,
  Bath,
  DollarSign,
  Ruler,
  Calendar,
  Sofa,
  ChevronDown,
  ArrowRight,
  Phone,
  Filter,
  Castle,
  Landmark,
  Warehouse,
  Waves,
  Heart,
  Eye,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  Headphones,
  BadgeCheck,
} from "lucide-react";
import { GradientBackground } from "../components/ui/gradient-background-4";
import { BeamsBackground } from "../components/ui/beams-background";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../components/ui/scroll-reveal";
import {
  Map as MapComponent,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  MapControls,
} from "../components/ui/mapcn-marker-popup";

interface RentalsProps {
  theme: "light" | "dark";
  onOpenConsultation: () => void;
}

const categories = [
  { name: "Luxury Apartments", icon: Building2, count: 480 },
  { name: "Family Villas", icon: Home, count: 195 },
  { name: "Waterfront Homes", icon: Waves, count: 120 },
  { name: "Townhouses", icon: Castle, count: 85 },
  { name: "Penthouses", icon: Landmark, count: 34 },
  { name: "Commercial Spaces", icon: Warehouse, count: 110 },
];

const featuredRentals = [
  {
    id: 1,
    type: "Luxury Apartment",
    location: "Downtown Dubai",
    price: "AED 9,500/mo",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    badge: "Top Pick",
    beds: 2,
    baths: 2,
    sqft: "1,450",
    furnished: true,
  },
  {
    id: 2,
    type: "Beachfront Villa",
    location: "Palm Jumeirah",
    price: "AED 85,000/mo",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    badge: "Premium",
    beds: 5,
    baths: 4,
    sqft: "6,200",
    furnished: true,
  },
  {
    id: 3,
    type: "Modern Townhouse",
    location: "Dubai Hills Estate",
    price: "AED 18,000/mo",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    badge: "New",
    beds: 3,
    baths: 3,
    sqft: "2,800",
    furnished: false,
  },
];

const rentalLocations = [
  { name: "Downtown Dubai", lng: 55.2744, lat: 25.1924, price: "From AED 9,500/mo", type: "Luxury Apartments", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80" },
  { name: "Dubai Marina", lng: 55.1398, lat: 25.0803, price: "From AED 8,000/mo", type: "Waterfront Living", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
  { name: "Palm Jumeirah", lng: 55.1389, lat: 25.1124, price: "From AED 25,000/mo", type: "Beachfront Villas", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80" },
  { name: "Dubai Hills Estate", lng: 55.2468, lat: 25.1048, price: "From AED 12,000/mo", type: "Family Communities", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80" },
  { name: "Business Bay", lng: 55.2624, lat: 25.1855, price: "From AED 7,500/mo", type: "Urban Living", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80" },
  { name: "Jumeirah Village Circle", lng: 55.2092, lat: 25.1164, price: "From AED 5,500/mo", type: "Affordable Luxury", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80" },
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
    <div ref={ref} className="text-2xl sm:text-3xl lg:text-4xl font-num font-bold text-[#d4af37]">
      {prefix}{count}{suffix}
    </div>
  );
}

const badgeColors: Record<string, string> = {
  "Top Pick": "bg-[#d4af37] text-black",
  "Premium": "bg-purple-500 text-white",
  "New": "bg-emerald-500 text-white",
};

export default function Rentals({ theme, onOpenConsultation }: RentalsProps) {
  const isDark = theme === "dark";
  const [activeCategory, setActiveCategory] = useState("Luxury Apartments");
  const [hoveredRental, setHoveredRental] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90"
            alt="Dubai Skyline Sunset"
            className="w-full h-full object-cover scale-105 animate-[slowZoom_30s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#d4af37]/[0.04] blur-[150px] rounded-full" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#d4af37]/[0.03] blur-[120px] rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full pt-24 pb-12">
            <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-center">

              {/* Left — Text + Search */}
              <div className="space-y-7">
                <ScrollReveal delay={0.1}>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
                      Premium Rental Properties
                    </span>
                  </span>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                    Find Your Perfect
                    <br />
                    Rental Home in{" "}
                    <span className="text-[#d4af37]">Dubai</span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.35}>
                  <p className={`font-sans text-sm sm:text-base max-w-xl leading-relaxed ${isDark ? "text-gray-300" : "text-stone-600"}`}>
                    Discover a curated collection of luxury apartments, family villas, waterfront residences, and townhouses available for rent across Dubai's most sought-after communities.
                  </p>
                </ScrollReveal>

                {/* Search Panel */}
                <ScrollReveal delay={0.45}>
                  <div className={`rounded-3xl border backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] p-5 sm:p-6 space-y-4 ${isDark ? "border-white/10 bg-white/[0.04]" : "border-stone-200/60 bg-white shadow-sm"}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="relative">
                        <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        <input
                          type="text"
                          placeholder="Property name..."
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm placeholder-gray-500 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}
                        />
                      </div>

                      <div className="relative">
                        <MapPin className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        <select className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}>
                          <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Location</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Downtown Dubai</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Dubai Marina</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Palm Jumeirah</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Dubai Hills Estate</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Business Bay</option>
                        </select>
                        <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                      </div>

                      <div className="relative">
                        <Building2 className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        <select className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}>
                          <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Property Type</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Apartment</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Villa</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Townhouse</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Penthouse</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Commercial</option>
                        </select>
                        <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                      </div>

                      <div className="relative">
                        <BedDouble className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        <select className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}>
                          <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Bedrooms</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Studio</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>1 BR</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>2 BR</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>3 BR</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>4+ BR</option>
                        </select>
                        <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                      </div>

                      <div className="relative">
                        <DollarSign className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        <select className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}>
                          <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Budget Range</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Under AED 5,000/mo</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>AED 5,000 - 10,000/mo</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>AED 10,000 - 20,000/mo</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>AED 20,000 - 50,000/mo</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>AED 50,000+/mo</option>
                        </select>
                        <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                      </div>

                      <div className="relative">
                        <Sofa className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        <select className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}>
                          <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Furnished</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Furnished</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Unfurnished</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Semi-Furnished</option>
                        </select>
                        <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#d4af37] text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#e7c96a] active:scale-[0.98] transition-all duration-300 shadow-[0_2px_16px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_24px_rgba(212,175,55,0.4)] cursor-pointer">
                        <Search className="w-4 h-4" />
                        Find Rentals
                      </button>
                      <button className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border font-sans text-xs font-semibold uppercase tracking-wider hover:bg-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer ${isDark ? "border-white/15 bg-white/5 text-white" : "border-stone-200 bg-stone-100/80 text-stone-900 hover:bg-stone-200/50 hover:border-stone-300"}`}>
                        <Filter className="w-4 h-4" />
                        Advanced Filters
                      </button>
                    </div>
                  </div>
                </ScrollReveal>

                {/* CTA Buttons */}
                <ScrollReveal delay={0.55}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="#categories"
                      className={`group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border font-sans text-xs font-semibold uppercase tracking-wider hover:bg-white/15 hover:border-white/30 transition-all duration-300 ${isDark ? "bg-white/10 border-white/15 text-white" : "bg-stone-100/80 border-stone-200 text-stone-900 hover:bg-stone-200/50 hover:border-stone-300"}`}
                    >
                      Browse Rental Properties
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <button
                      onClick={onOpenConsultation}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] font-sans text-xs font-semibold uppercase tracking-wider hover:bg-[#d4af37]/10 hover:border-[#d4af37]/50 transition-all duration-300 cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      Speak with a Rental Consultant
                    </button>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right — Floating Rental Cards */}
              <div className="hidden lg:flex flex-col gap-4">
                {featuredRentals.map((rental, i) => (
                  <ScrollReveal key={rental.id} delay={0.3 + i * 0.15} direction="right">
                    <motion.div
                      onHoverStart={() => setHoveredRental(rental.id)}
                      onHoverEnd={() => setHoveredRental(null)}
                      animate={{
                        y: hoveredRental === rental.id ? -6 : 0,
                        scale: hoveredRental === rental.id ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`group relative rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.3)] cursor-pointer ${isDark ? "border border-white/10 bg-white/[0.04]" : "border border-stone-200/60 bg-white shadow-sm"}`}
                    >
                      <div className="flex">
                        <div className="relative w-28 h-28 shrink-0">
                          <img
                            src={rental.image}
                            alt={rental.type}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] uppercase font-bold tracking-wider ${badgeColors[rental.badge]}`}>
                            {rental.badge}
                          </span>
                        </div>
                        <div className="flex-1 p-3.5 flex flex-col justify-between">
                          <div>
                            <span className={`text-[9px] uppercase tracking-wider font-medium block mb-0.5 ${isDark ? "text-gray-500" : "text-stone-400"}`}>
                              {rental.type}
                            </span>
                            <div className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-300" : "text-stone-600"}`}>
                              <MapPin className="w-3 h-3 text-[#d4af37]" />
                              {rental.location}
                            </div>
                            <div className={`flex items-center gap-2 mt-1 text-[10px] ${isDark ? "text-gray-500" : "text-stone-400"}`}>
                              <span className="flex items-center gap-0.5"><BedDouble className="w-3 h-3" />{rental.beds}</span>
                              <span className="flex items-center gap-0.5"><Bath className="w-3 h-3" />{rental.baths}</span>
                              <span>{rental.sqft} sqft</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#d4af37]">{rental.price}</span>
                            <div className="flex gap-1.5">
                              <button className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${isDark ? "bg-white/5 text-gray-400" : "bg-stone-100/80 text-stone-400"} hover:text-[#d4af37]`}>
                                <Heart className="w-3.5 h-3.5" />
                              </button>
                              <button className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${isDark ? "bg-white/5 text-gray-400" : "bg-stone-100/80 text-stone-400"} hover:text-[#d4af37]`}>
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5 ${isDark ? "border-white/20" : "border-stone-300/50"}`}
          >
            <div className="w-1.5 h-2.5 rounded-full bg-[#d4af37]" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          RENTAL HIGHLIGHTS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 -mt-16 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: 1200, suffix: "+", label: "Rental Listings", icon: Building2 },
              { value: 50, suffix: "+", label: "Prime Communities", icon: MapPin },
              { value: 24, suffix: "/7", label: "Property Assistance", icon: Headphones },
              { value: 100, suffix: "%", label: "Verified Listings", icon: BadgeCheck },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={stat.label}>
                  <div className={`rounded-2xl backdrop-blur-xl p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] ${isDark ? "border border-white/10 bg-white/[0.04]" : "border border-stone-200/60 bg-white shadow-sm"}`}>
                    <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    <p className={`font-sans text-[10px] uppercase tracking-wider mt-1.5 ${isDark ? "text-gray-400" : "text-stone-500"}`}>{stat.label}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED CATEGORIES
      ═══════════════════════════════════════════════════════════════ */}
      <section id="categories" className="relative py-16 sm:py-20">
        <GradientBackground />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
                Explore
              </span>
              <h2 className={`font-serif text-3xl sm:text-4xl font-bold ${isDark ? "text-white" : "text-[#1c1917]"}`}>
                Featured Rental{" "}
                <span className="text-[#d4af37]">Categories</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <StaggerItem key={cat.name}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`rounded-2xl border p-6 text-center cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "border-[#d4af37]/50 bg-[#d4af37]/10 shadow-[0_4px_20px_rgba(212,175,55,0.1)]"
                        : `${isDark ? "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]" : "border-stone-200 bg-stone-100/80 hover:border-stone-300 hover:bg-stone-200/50"}`
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors ${
                      isActive ? "bg-[#d4af37]/20" : `${isDark ? "bg-white/5" : "bg-stone-200/50"}`
                    }`}>
                      <Icon className={`w-6 h-6 ${isActive ? "text-[#d4af37]" : `${isDark ? "text-gray-400" : "text-stone-500"}`}`} />
                    </div>
                    <h3 className={`font-sans text-sm font-semibold mb-1 ${isActive ? "text-[#d4af37]" : `${isDark ? "text-white" : "text-stone-900"}`}`}>
                      {cat.name}
                    </h3>
                    <span className={`text-xs ${isDark ? "text-gray-500" : "text-stone-400"}`}>{cat.count} Listings</span>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED RENTAL CARDS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
                Featured
              </span>
              <h2 className={`font-serif text-3xl sm:text-4xl font-bold ${isDark ? "text-white" : "text-[#1c1917]"}`}>
                Premium <span className="text-[#d4af37]">Rental Listings</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRentals.map((rental) => (
              <StaggerItem key={rental.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`group rounded-3xl backdrop-blur-sm overflow-hidden cursor-pointer hover:border-[#d4af37]/30 hover:shadow-[0_8px_40px_rgba(212,175,55,0.08)] transition-all duration-500 ${isDark ? "border border-white/10 bg-white/[0.04]" : "border border-stone-200/60 bg-white shadow-sm"}`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={rental.image}
                      alt={rental.type}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${badgeColors[rental.badge]}`}>
                      {rental.badge}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className={`font-serif text-xl font-bold mb-1 ${isDark ? "text-white" : "text-stone-900"}`}>{rental.type}</h3>
                      <div className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-300" : "text-stone-600"}`}>
                        <MapPin className="w-3 h-3 text-[#d4af37]" />
                        {rental.location}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className={`flex items-center gap-4 text-xs mb-4 py-3 border-b ${isDark ? "text-gray-400 border-white/5" : "text-stone-500 border-stone-200"}`}>
                      <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{rental.beds} Beds</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{rental.baths} Baths</span>
                      <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" />{rental.sqft} sqft</span>
                      <span className="flex items-center gap-1"><Sofa className="w-3.5 h-3.5" />{rental.furnished ? "Furnished" : "Unfurnished"}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#d4af37]">{rental.price}</span>
                      <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4af37] text-black text-[11px] font-bold uppercase tracking-wider hover:bg-[#e7c96a] transition-all duration-300 cursor-pointer">
                        <Eye className="w-3.5 h-3.5" />
                        View Details
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
          INTERACTIVE MAP
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
                Explore on Map
              </span>
              <h2 className={`font-serif text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-[#1c1917]"}`}>
                Rental Properties{" "}
                <span className="text-[#d4af37]">by Location</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className={`rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl ${isDark ? "border border-white/10 bg-white/[0.04]" : "border border-stone-200/60 bg-white shadow-sm"}`}>
              <div className="h-[450px] w-full">
                <MapComponent
                  center={[55.22, 25.15]}
                  zoom={11}
                  theme="dark"
                  className="h-full w-full"
                >
                  {rentalLocations.map((loc) => (
                    <MapMarker key={loc.name} longitude={loc.lng} latitude={loc.lat}>
                      <MarkerContent>
                        <div className="group relative">
                          <div className="w-9 h-9 rounded-full bg-[#d4af37] flex items-center justify-center shadow-lg shadow-[#d4af37]/30 transition-transform hover:scale-110 cursor-pointer border-2 border-white/30">
                            <Home className="w-4 h-4 text-black" />
                          </div>
                          <div className="absolute -inset-1.5 bg-[#d4af37]/20 rounded-full animate-ping opacity-20" />
                        </div>
                      </MarkerContent>
                      <MarkerLabel position="bottom">{loc.name}</MarkerLabel>
                      <MarkerPopup className="w-56 p-0">
                        <div className="relative h-24 overflow-hidden">
                          <img src={loc.image} alt={loc.name} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="p-3 space-y-1.5">
                          <h4 className="font-serif text-sm font-bold">{loc.name}</h4>
                          <p className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-400" : "text-stone-500"}`}>{loc.type}</p>
                          <p className="text-[#d4af37] text-xs font-semibold">{loc.price}</p>
                          <button
                            onClick={onOpenConsultation}
                            className="w-full mt-1 py-1.5 rounded-lg bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-wider hover:bg-[#e7c96a] transition-colors cursor-pointer"
                          >
                            View Listings
                          </button>
                        </div>
                      </MarkerPopup>
                    </MapMarker>
                  ))}
                  <MapControls position="bottom-right" showZoom showCompass />
                </MapComponent>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
