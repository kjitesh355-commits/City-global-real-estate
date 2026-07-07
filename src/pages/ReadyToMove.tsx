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
  Users,
  ChevronDown,
  ArrowRight,
  Phone,
  Filter,
  Castle,
  Landmark,
  Warehouse,
  Waves,
  CalendarClock,
  Heart,
  Share2,
  Eye,
  Sparkles,
  TrendingUp,
  Shield,
  Star,
  Play,
  Pause,
  X,
} from "lucide-react";
import { GradientBackground } from "../components/ui/gradient-background-4";
import { BeamsBackground } from "../components/ui/beams-background";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  MapControls,
} from "../components/ui/mapcn-marker-popup";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../components/ui/scroll-reveal";

interface ReadyToMoveProps {
  theme: "light" | "dark";
  onOpenConsultation: () => void;
}

const categories = [
  { name: "Apartments", icon: Building2, count: 320 },
  { name: "Villas", icon: Home, count: 185 },
  { name: "Townhouses", icon: Castle, count: 94 },
  { name: "Penthouses", icon: Landmark, count: 42 },
  { name: "Mansions", icon: Building2, count: 18 },
  { name: "Commercial", icon: Warehouse, count: 76 },
  { name: "Waterfront", icon: Waves, count: 58 },
  { name: "Off-Plan", icon: CalendarClock, count: 210 },
];

const floatingProperties = [
  {
    id: 1,
    type: "Luxury Apartment",
    location: "Downtown Dubai",
    price: "AED 1.5M",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    badge: "Ready",
  },
  {
    id: 2,
    type: "Beachfront Villa",
    location: "Palm Jumeirah",
    price: "AED 12M",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    badge: "Premium",
  },
  {
    id: 3,
    type: "Waterfront Penthouse",
    location: "Dubai Marina",
    price: "AED 8.9M",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    badge: "Exclusive",
  },
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

export default function ReadyToMove({ theme, onOpenConsultation }: ReadyToMoveProps) {
  const [activeCategory, setActiveCategory] = useState("Apartments");
  const [searchPurpose, setSearchPurpose] = useState("buy");
  const [hoveredProperty, setHoveredProperty] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isDark = theme === "dark";

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION — Full Screen Cinematic
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background Image / Video */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90"
            alt="Dubai Skyline"
            className="w-full h-full object-cover scale-105 animate-[slowZoom_30s_ease-in-out_infinite_alternate]"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
          {/* Gold Glow Accents */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/[0.04] blur-[150px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#d4af37]/[0.03] blur-[120px] rounded-full" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full pt-24 pb-12">
            <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-center">

              {/* Left — Text + Search */}
              <div className="space-y-8">
                <ScrollReveal delay={0.1}>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
                      Premium UAE Real Estate
                    </span>
                  </span>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                    Find Your Perfect
                    <br />
                    Property in{" "}
                    <span className="text-[#d4af37]">Dubai</span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.35}>
                  <p className={`font-sans text-sm sm:text-base max-w-xl leading-relaxed ${isDark ? "text-gray-300" : "text-stone-600"}`}>
                    Explore an exclusive collection of luxury apartments, villas, penthouses, townhouses, and commercial spaces across Dubai's most prestigious communities.
                  </p>
                </ScrollReveal>

                {/* ═══ Glassmorphism Search Panel ═══ */}
                <ScrollReveal delay={0.45}>
                  <div className={`rounded-3xl backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] p-5 sm:p-6 space-y-4 ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white/80 border-stone-200/60 shadow-sm"} border`}>
                    {/* Purpose Toggle */}
                    <div className={`flex gap-1 p-1 rounded-xl w-fit ${isDark ? "bg-white/5 border-white/10" : "bg-stone-100/80 border-stone-200"}`}>
                      {["buy", "rent"].map((p) => (
                        <button
                          key={p}
                          onClick={() => setSearchPurpose(p)}
                          className={`px-5 py-2 rounded-lg text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                            searchPurpose === p
                              ? "bg-[#d4af37] text-black shadow-[0_2px_12px_rgba(212,175,55,0.3)]"
                              : `${isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-stone-500 hover:text-stone-900 hover:bg-stone-100/80"}`
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    {/* Search Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="relative">
                        <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        <input
                          type="text"
                          placeholder="Property name..."
                          className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all ${isDark ? "bg-white/5 border-white/10 text-white placeholder-gray-500" : "bg-white border-stone-200 text-stone-900 placeholder-stone-400"}`}
                        />
                      </div>

                      <div className="relative">
                        <MapPin className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        <select className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}>
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
                        <select className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}>
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
                        <select className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}>
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
                        <select className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}>
                          <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Price Range</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Under AED 1M</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>AED 1M - 3M</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>AED 3M - 5M</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>AED 5M - 10M</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>AED 10M+</option>
                        </select>
                        <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                      </div>

                      <div className="relative">
                        <Ruler className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        <select className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}>
                          <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Size (Sq Ft)</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Under 1,000</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>1,000 - 2,000</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>2,000 - 3,000</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>3,000 - 5,000</option>
                          <option className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>5,000+</option>
                        </select>
                        <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#d4af37] text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#e7c96a] active:scale-[0.98] transition-all duration-300 shadow-[0_2px_16px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_24px_rgba(212,175,55,0.4)] cursor-pointer">
                        <Search className="w-4 h-4" />
                        Search Properties
                      </button>
                      <button className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${isDark ? "border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/25" : "border-stone-200 bg-stone-100/80 text-stone-900 hover:bg-stone-100 hover:border-stone-300"}`}>
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
                      className={`group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${isDark ? "bg-white/10 border-white/15 text-white hover:bg-white/15 hover:border-white/30" : "bg-stone-100/80 border-stone-200 text-stone-900 hover:bg-stone-100 hover:border-stone-300"}`}
                    >
                      Browse Properties
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <button
                      onClick={onOpenConsultation}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] font-sans text-xs font-semibold uppercase tracking-wider hover:bg-[#d4af37]/10 hover:border-[#d4af37]/50 transition-all duration-300 cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      Contact Property Expert
                    </button>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right — Floating Property Cards */}
              <div className="hidden lg:flex flex-col gap-4">
                {floatingProperties.map((prop, i) => (
                  <ScrollReveal key={prop.id} delay={0.3 + i * 0.15} direction="right">
                    <motion.div
                      onHoverStart={() => setHoveredProperty(prop.id)}
                      onHoverEnd={() => setHoveredProperty(null)}
                      animate={{
                        y: hoveredProperty === prop.id ? -6 : 0,
                        scale: hoveredProperty === prop.id ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`group relative rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.3)] cursor-pointer ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white/80 border-stone-200/60 shadow-sm"} border`}
                    >
                      <div className="flex">
                        <div className="relative w-28 h-28 shrink-0">
                          <img
                            src={prop.image}
                            alt={prop.type}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] uppercase font-bold tracking-wider bg-[#d4af37] text-black">
                            {prop.badge}
                          </span>
                        </div>
                        <div className="flex-1 p-3.5 flex flex-col justify-between">
                          <div>
                            <span className={`text-[9px] uppercase tracking-wider font-medium block mb-0.5 ${isDark ? "text-gray-500" : "text-stone-400"}`}>
                              {prop.type}
                            </span>
                            <div className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-300" : "text-stone-600"}`}>
                              <MapPin className="w-3 h-3 text-[#d4af37]" />
                              {prop.location}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#d4af37]">{prop.price}</span>
                            <div className="flex gap-1.5">
                              <button className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${isDark ? "bg-white/5 text-gray-400 hover:text-[#d4af37]" : "bg-stone-100/80 text-stone-400 hover:text-[#d4af37]"}`}>
                                <Heart className="w-3.5 h-3.5" />
                              </button>
                              <button className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${isDark ? "bg-white/5 text-gray-400 hover:text-[#d4af37]" : "bg-stone-100/80 text-stone-400 hover:text-[#d4af37]"}`}>
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
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-2.5 rounded-full bg-[#d4af37]" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          QUICK STATISTICS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 -mt-16 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: 1000, suffix: "+", label: "Premium Properties", icon: Building2 },
              { value: 50, suffix: "+", label: "Prime Communities", icon: MapPin },
              { value: 75, suffix: "+", label: "Trusted Developers", icon: Shield },
              { value: 500, suffix: "K+", label: "Starting Prices", prefix: "AED ", icon: TrendingUp },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={stat.label}>
                  <div className={`rounded-2xl backdrop-blur-xl p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white/80 border-stone-200/60 shadow-sm"} border`}>
                    <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
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
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                Featured <span className="text-[#d4af37]">Categories</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border font-sans text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#d4af37] text-black border-[#d4af37] shadow-[0_2px_16px_rgba(212,175,55,0.3)]"
                        : `${isDark ? "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white" : "bg-stone-100/80 text-stone-600 border-stone-200 hover:bg-stone-100 hover:border-stone-300 hover:text-stone-900"}`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.name}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-black/10 text-black" : `${isDark ? "bg-white/5 text-gray-500" : "bg-stone-100/80 text-stone-400"}`
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          INTERACTIVE MAP — Ready Properties Locations
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
                Explore on Map
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Ready Properties{" "}
                <span className="text-[#d4af37]">Locations</span>
              </h2>
              <p className={`font-sans text-sm max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                Find ready-to-move properties across Dubai's most desirable communities
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className={`rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white/80 border-stone-200/60 shadow-sm"} border`}>
              <div className="h-[450px] w-full">
                <Map
                  center={[55.22, 25.15]}
                  zoom={11}
                  theme="dark"
                  className="h-full w-full"
                >
                  {[
                    { name: "Downtown Dubai", lng: 55.2744, lat: 25.1924, price: "From AED 1.5M", type: "Luxury Apartments", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80" },
                    { name: "Dubai Marina", lng: 55.1398, lat: 25.0803, price: "From AED 1.2M", type: "Waterfront Living", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
                    { name: "Palm Jumeirah", lng: 55.1389, lat: 25.1124, price: "From AED 3.5M", type: "Beachfront Villas", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80" },
                    { name: "Dubai Hills Estate", lng: 55.2468, lat: 25.1048, price: "From AED 1.8M", type: "Family Communities", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80" },
                    { name: "Business Bay", lng: 55.2624, lat: 25.1855, price: "From AED 1.1M", type: "Urban Living", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80" },
                    { name: "Jumeirah Village Circle", lng: 55.2092, lat: 25.1164, price: "From AED 750K", type: "Affordable Luxury", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80" },
                    { name: "Dubai Creek Harbour", lng: 55.3461, lat: 25.2132, price: "From AED 1.3M", type: "Waterfront Towers", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" },
                    { name: "Meydan", lng: 55.2712, lat: 25.1548, price: "From AED 1.4M", type: "Golf Course Living", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80" },
                  ].map((loc) => (
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
                            View Details
                          </button>
                        </div>
                      </MarkerPopup>
                    </MapMarker>
                  ))}
                  <MapControls position="bottom-right" showZoom showCompass />
                </Map>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
