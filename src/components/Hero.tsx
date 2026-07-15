import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  Sparkles,
  Play,
  ArrowRight,
  X,
  MapPin,
  Building,
  Bed,
  DollarSign,
  Users,
  Send,
  ChevronDown,
  Mouse,
  TrendingUp,
  Globe,
  Home,
  Award,
} from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { Property } from "../types";
import { t } from "../utils/translations";

interface HeroProps {
  onSearchSubmit: (filters: any) => void;
  onAISearchResults: (
    results: Property[] | null,
    isSearching: boolean,
    error: string | null
  ) => void;
  theme: "light" | "dark";
}

const popularSearches = [
  "Waterfront Villas",
  "Palm Jumeirah",
  "Downtown Dubai",
  "Family Homes",
  "Off Plan",
  "Dubai Marina",
  "Business Bay",
];

const aiExampleChips = [
  "Best ROI under AED 2M",
  "Luxury waterfront villas",
  "High rental yield studios",
  "Golden Visa eligible properties",
  "Off-plan investment opportunities",
  "Family homes in Dubai Hills",
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Hero({
  onSearchSubmit,
  onAISearchResults,
  theme,
}: HeroProps) {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");
  const [bedrooms, setBedrooms] = useState("Any");
  const [budget, setBudget] = useState("Any Budget");
  const [developer, setDeveloper] = useState("All Developers");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("app-lang") || "en";
    }
    return "en";
  });

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setLang(customEvent.detail);
      }
    };
    window.addEventListener("lang-change", handleLangChange);
    return () => window.removeEventListener("lang-change", handleLangChange);
  }, []);

  const stats = [
    { label: t("hero.statProperties", lang), value: "15,000+", icon: Home },
    { label: t("hero.statInvestors", lang), value: "8,500+", icon: Users },
    { label: t("hero.statCountries", lang), value: "25+", icon: Globe },
    { label: t("hero.statRoi", lang), value: "18%", icon: TrendingUp },
  ];

  // Mouse parallax
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  const handleTraditionalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({ location, propertyType, bedrooms, budget, developer });
    const el = document.getElementById("featured-properties");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAISearch = async (promptText: string) => {
    if (!promptText.trim()) return;
    setIsAiLoading(true);
    onAISearchResults([], true, null);
    const el = document.getElementById("featured-properties");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    try {
      const response = await fetch("/api/search-properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: promptText }),
      });
      if (!response.ok) throw new Error("Failed to process AI search.");
      const results = await response.json();
      onAISearchResults(results, false, null);
    } catch (err: any) {
      onAISearchResults(null, false, err.message || "An error occurred");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleTagClick = (tag: string) => {
    const detailedQueries: Record<string, string> = {
      "Best ROI under AED 2M": "I want the best return on investment properties in Dubai under AED 2 million. Focus on rental yield and capital appreciation. Which properties give the highest ROI?",
      "Luxury waterfront villas": "Show me luxury waterfront villas in Dubai with private beach access. I'm looking for premium beachfront living with strong investment potential.",
      "High rental yield studios": "What are the highest rental yield studio apartments in Dubai? I want maximum passive income with low entry price.",
      "Golden Visa eligible properties": "Which of your properties qualify for the UAE Golden Visa program? I need properties above AED 2M that grant 10-year residency.",
      "Off-plan investment opportunities": "Which off-plan projects offer the best investment opportunity? I'm looking for pre-handover payment plans with strong capital growth potential.",
      "Family homes in Dubai Hills": "I need a family home in Dubai Hills Estate or similar community. Looking for 3+ bedrooms, modern amenities, and good schools nearby.",
    };
    const query = detailedQueries[tag] || tag;
    setAiPrompt(query);
    handleAISearch(query);
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scroll-mouse {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes light-streak {
          0% { transform: translateX(-100%) rotate(-15deg); opacity: 0; }
          50% { opacity: 0.15; }
          100% { transform: translateX(200%) rotate(-15deg); opacity: 0; }
        }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-40px) translateX(-5px); opacity: 0.3; }
          75% { transform: translateY(-20px) translateX(-10px); opacity: 0.5; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #C9A227 0%, #E7C96A 25%, #FFFFFF 50%, #E7C96A 75%, #C9A227 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .glass-hero {
          background: rgba(12, 12, 16, 0.65);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(212, 175, 55, 0.15);
        }
        .glass-card {
          background: rgba(18, 18, 22, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.25);
        }
      `}</style>

      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "#090909" }}
        id="home"
      >
        {/* Background Video */}
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `scale(1.05) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop"
          >
            <source
              src="/hero-video-4k.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-[1] bg-black/50" />

        {/* Animated Gold Light Streaks */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-0 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent"
            style={{ animation: "light-streak 8s linear infinite", top: "20%" }}
          />
          <div
            className="absolute top-0 left-0 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[#E7C96A]/30 to-transparent"
            style={{ animation: "light-streak 12s linear infinite 3s", top: "40%" }}
          />
          <div
            className="absolute top-0 left-0 w-[250px] h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/25 to-transparent"
            style={{ animation: "light-streak 10s linear infinite 6s", top: "70%" }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-[#C9A227]/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particle-float ${4 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Noise Texture */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient Vignette */}
        <div className="absolute inset-0 z-[3] pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#090909_100%)]" />

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 flex flex-col items-center text-center">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C9A227] animate-pulse" />
            <span className="font-sans text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#C9A227] font-semibold">
              {t("hero.subtitle", lang)}
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C9A227] animate-pulse" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[40px] sm:text-[56px] md:text-[72px] font-bold leading-[1.05] tracking-[0.02em] mb-6 max-w-5xl"
          >
            <span className="text-white">{t("hero.title1", lang)}</span>
            <br />
            <span className="shimmer-text">{t("hero.title2", lang)}</span>
            <br />
            <span className="text-white">{t("hero.title3", lang)}</span>
          </motion.h1>

          {/* Gold Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-24 h-[2px] bg-gradient-to-r from-[#C9A227] via-[#E7C96A] to-[#C9A227] mb-8"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-sm sm:text-base md:text-lg text-[#B7B7B7] max-w-[750px] leading-[1.8] mb-10"
          >
            {t("hero.desc", lang)}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 mb-14 items-center"
          >
            <a
              href="#featured-properties"
              className="group flex items-center gap-3 bg-gradient-to-r from-[#C9A227] to-[#E7C96A] text-black font-sans text-xs uppercase font-bold tracking-widest px-8 py-4 rounded-full hover:brightness-110 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(201,162,39,0.4)] transition-all duration-500"
            >
              <span>{t("hero.explore", lang)}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>

            <a
              href="https://www.youtube.com/results?search_query=dubai+real+estate+investment+guide"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 cursor-pointer"
            >
              <div className="relative w-14 h-14 rounded-full border border-[#C9A227]/40 flex items-center justify-center transition-all duration-500 group-hover:border-[#C9A227] group-hover:shadow-[0_0_25px_rgba(201,162,39,0.3)]">
                <div className="absolute inset-0 rounded-full border border-[#C9A227]/20" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
                <Play className="w-5 h-5 text-[#C9A227] fill-[#C9A227] ml-0.5" />
              </div>
              <span className="font-sans text-xs uppercase tracking-widest text-[#B7B7B7] group-hover:text-[#C9A227] transition-colors duration-500">
                {t("hero.watch", lang)}
              </span>
            </a>
          </motion.div>

          {/* Search Panel */}
          <motion.form
            onSubmit={handleTraditionalSearch}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="w-full max-w-5xl glass-hero rounded-2xl p-5 sm:p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] mb-6"
            style={{ animation: "none" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 items-end">
              {/* Location */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#C9A227]" />
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Dubai, UAE"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/30 transition-all duration-300 font-sans"
                />
              </div>

              {/* Property Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
                  <Building className="w-3 h-3 text-[#C9A227]" />
                  Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#C9A227]/50 transition-all duration-300 font-sans appearance-none"
                >
                  <option className="bg-[#121216]">All Types</option>
                  <option className="bg-[#121216]">Apartment</option>
                  <option className="bg-[#121216]">Villa</option>
                  <option className="bg-[#121216]">Penthouse</option>
                  <option className="bg-[#121216]">Townhouse</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
                  <Bed className="w-3 h-3 text-[#C9A227]" />
                  Beds
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#C9A227]/50 transition-all duration-300 font-sans appearance-none"
                >
                  <option className="bg-[#121216]">Any</option>
                  <option className="bg-[#121216]">2</option>
                  <option className="bg-[#121216]">3</option>
                  <option className="bg-[#121216]">4</option>
                  <option className="bg-[#121216]">5</option>
                  <option className="bg-[#121216]">6+</option>
                </select>
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
                  <DollarSign className="w-3 h-3 text-[#C9A227]" />
                  Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#C9A227]/50 transition-all duration-300 font-sans appearance-none"
                >
                  <option className="bg-[#121216]">Any Budget</option>
                  <option className="bg-[#121216]">Under 10M</option>
                  <option className="bg-[#121216]">10M - 20M</option>
                  <option className="bg-[#121216]">20M - 40M</option>
                  <option className="bg-[#121216]">40M+</option>
                </select>
              </div>

              {/* Developer */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 flex items-center gap-1.5">
                  <Award className="w-3 h-3 text-[#C9A227]" />
                  Developer
                </label>
                <select
                  value={developer}
                  onChange={(e) => setDeveloper(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#C9A227]/50 transition-all duration-300 font-sans appearance-none"
                >
                  <option className="bg-[#121216]">All Developers</option>
                  <option className="bg-[#121216]">EMAAR</option>
                  <option className="bg-[#121216]">DAMAC</option>
                  <option className="bg-[#121216]">MERAAS</option>
                  <option className="bg-[#121216]">BINGHATTI</option>
                </select>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="cursor-pointer w-full bg-gradient-to-r from-[#C9A227] to-[#E7C96A] text-black font-sans text-xs uppercase font-bold py-2.5 rounded-xl hover:brightness-110 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setLocation(tag);
                    onSearchSubmit({
                      location: tag,
                      propertyType,
                      bedrooms,
                      budget,
                      developer,
                    });
                    const el = document.getElementById("featured-properties");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="cursor-pointer border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-sans text-gray-400 hover:border-[#C9A227]/50 hover:text-[#C9A227] hover:bg-[#C9A227]/5 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.form>

          {/* AI Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="w-full max-w-5xl glass-card rounded-2xl p-5 sm:p-6"
          >
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* AI Icon & Title */}
              <div className="flex items-center gap-3 w-full md:w-auto flex-shrink-0">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E7C96A] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-black" />
                  </div>
                  <div className="absolute inset-0 bg-[#C9A227]/30 blur-lg rounded-full animate-ping" style={{ animationDuration: "3s" }} />
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-sm font-bold text-[#E7C96A]">
                    Ask Our Smart Investment Assistant
                  </h3>
                  <p className="font-sans text-[11px] text-gray-400 max-w-xs">
                    AI-powered property recommendations, ROI analysis, and
                    personalized investment insights.
                  </p>
                </div>
              </div>

              {/* AI Input */}
              <div className="w-full flex-1 flex flex-col gap-2.5">
                <div className="flex flex-wrap gap-1.5">
                  {aiExampleChips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleTagClick(chip)}
                      className="cursor-pointer border border-white/10 px-3 py-1 rounded-full text-[10px] font-sans text-gray-400 hover:border-[#C9A227]/40 hover:text-[#E7C96A] hover:bg-[#C9A227]/10 transition-all duration-300"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleAISearch(aiPrompt)
                    }
                    placeholder="Ask anything..."
                    disabled={isAiLoading}
                    className="w-full bg-white/5 border border-[#C9A227]/20 rounded-full pl-5 pr-14 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/30 transition-all duration-300 font-sans"
                  />
                  {aiPrompt && (
                    <button
                      onClick={() => setAiPrompt("")}
                      className="absolute right-12 text-gray-500 hover:text-gray-300 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleAISearch(aiPrompt)}
                    disabled={isAiLoading || !aiPrompt.trim()}
                    className="cursor-pointer absolute right-2 w-9 h-9 rounded-full bg-gradient-to-r from-[#C9A227] to-[#E7C96A] hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-black transition-all duration-300"
                  >
                    {isAiLoading ? (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats Card - Desktop Only */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-4"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="glass-card rounded-xl px-5 py-4 flex items-center gap-3 min-w-[180px] hover:border-[#C9A227]/40 transition-all duration-500"
                style={{
                  animation: `float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
                }}
              >
                <div className="w-9 h-9 rounded-full bg-[#C9A227]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#C9A227]" />
                </div>
                <div>
                  <div className="font-num text-lg font-bold text-white leading-none">
                    <AnimatedCounter
                      target={parseInt(stat.value.replace(/[^0-9]/g, ""))}
                      suffix={stat.value.includes("+") ? "+" : stat.value.includes("%") ? "%" : ""}
                    />
                  </div>
                  <div className="font-sans text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-500">
            {t("hero.scrollExplore", lang)}
          </span>
          <div className="w-5 h-8 border border-gray-600 rounded-full flex justify-center pt-1.5">
            <div
              className="w-1 h-2 bg-[#C9A227] rounded-full"
              style={{ animation: "scroll-mouse 2s ease-in-out infinite" }}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
