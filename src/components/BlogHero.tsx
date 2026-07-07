import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Search,
  MapPin,
  Tag,
  TrendingUp,
  DollarSign,
  Home,
  Key,
  Building2,
  Castle,
  Newspaper,
  ChevronDown,
  ArrowRight,
  Clock,
  Calendar,
  Eye,
  BookOpen,
  Users,
  FileText,
  Sparkles,
  Bell,
  Filter,
  Flame,
  ArrowUpRight,
  ChevronRight,
  Bookmark,
  Share2,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ui/scroll-reveal";

interface BlogHeroProps {
  theme: "light" | "dark";
}

const categories = [
  { name: "Market Trends", icon: TrendingUp, count: 34 },
  { name: "Investment Guides", icon: DollarSign, count: 28 },
  { name: "Buying Tips", icon: Home, count: 42 },
  { name: "Rental Advice", icon: Key, count: 31 },
  { name: "Off-Plan Projects", icon: Building2, count: 19 },
  { name: "Luxury Living", icon: Castle, count: 24 },
  { name: "Community Guides", icon: MapPin, count: 37 },
  { name: "Developer News", icon: Newspaper, count: 16 },
];

const trendingArticles = [
  {
    id: 1,
    title: "Palm Jumeirah Villas Break AED 100M Record",
    category: "Market Trends",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Why Smart Investors Are Turning to Dubai South",
    category: "Investment",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
    readTime: "7 min",
  },
  {
    id: 3,
    title: "2026 Rent Control Laws: What Tenants Need to Know",
    category: "Rental Advice",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80",
    readTime: "4 min",
  },
  {
    id: 4,
    title: "Inside Ellington's Newest Beachfront Collection",
    category: "Off-Plan",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
    readTime: "6 min",
  },
  {
    id: 5,
    title: "Dubai Hills Estate: Community Complete Review",
    category: "Community",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    readTime: "9 min",
  },
];

const tags = [
  "Dubai Marina", "Palm Jumeirah", "Downtown Dubai", "Business Bay",
  "Dubai Hills Estate", "JVC", "DAMAC", "Emaar", "Ellington",
];

const featuredArticle = {
  image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=85",
  category: "Market Trends",
  date: "July 3, 2026",
  readTime: "8 min read",
  title: "Dubai Real Estate Market Q2 2026: Record Transactions & What Investors Need to Know",
  excerpt: "Dubai's property market hit AED 185 billion in Q2 2026, marking a 24% year-over-year surge. Here's the full breakdown of where smart money is flowing.",
  views: "12.4K",
  author: "Sarah Al-Rashid",
  authorRole: "Senior Market Analyst",
  authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
};

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

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#d4af37]/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function TrendingTicker({ theme }: { theme: "light" | "dark" }) {
  const isDark = theme === "dark";
  return (
    <div className={`w-full overflow-hidden border-y backdrop-blur-sm ${isDark ? "border-white/5 bg-white/[0.02]" : "border-stone-200/60 bg-stone-50/50"}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center gap-4">
        <span className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
          <Flame className="w-3 h-3 text-red-400" />
          <span className="font-sans text-[10px] uppercase tracking-wider text-red-400 font-bold">Trending</span>
        </span>
        <div className="flex-1 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...trendingArticles, ...trendingArticles].map((article, i) => (
              <a
                key={`${article.id}-${i}`}
                href="#"
                className={`flex items-center gap-2 text-xs ${isDark ? "text-gray-400" : "text-stone-500"} hover:text-[#d4af37] transition-colors group shrink-0`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/40" />
                <span className="font-medium">{article.title}</span>
                <span className="text-gray-600">·</span>
                <span className="text-[10px] text-gray-600">{article.readTime}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function BlogHero({ theme }: BlogHeroProps) {
  const isDark = theme === "dark";
  const [activeCategory, setActiveCategory] = useState("Market Trends");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTrending, setActiveTrending] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrending((prev) => (prev + 1) % trendingArticles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ═══════════════════════════════════════════════════════════════
          BACKGROUND LAYERS
      ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90"
          alt="Dubai Skyline Luxury"
          className="w-full h-full object-cover scale-105"
          style={{ animation: "slowZoom 30s ease-in-out infinite alternate" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        {/* Gold Ambient Orbs */}
        <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] bg-[#d4af37]/[0.04] blur-[200px] rounded-full" />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-[#d4af37]/[0.03] blur-[160px] rounded-full" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/[0.015] blur-[250px] rounded-full" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
      </div>

      <FloatingParticles />

      {/* ═══════════════════════════════════════════════════════════════
          TRENDING TICKER
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 pt-20">
        <TrendingTicker theme={theme} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          HERO CONTENT — TWO-COLUMN EDITORIAL
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full py-12 lg:py-16">
          <div className="grid lg:grid-cols-[1fr_480px] gap-10 lg:gap-14 items-start">

            {/* ── LEFT: Editorial Content ── */}
            <div className="space-y-8">
              {/* Label + Live Badge */}
              <ScrollReveal delay={0.1}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
                      Latest Real Estate Insights
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-sans text-[10px] uppercase tracking-wider text-emerald-400 font-medium">Live</span>
                  </span>
                </div>
              </ScrollReveal>

              {/* Main Heading — Large Editorial Style */}
              <ScrollReveal delay={0.2}>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.02] tracking-tight max-w-3xl">
                  Stay Ahead with{" "}
                  <span className="relative inline-block">
                    <span className="text-[#d4af37]">Dubai Property</span>
                    <svg className="absolute -bottom-1 left-0 w-full h-3 text-[#d4af37]/20" viewBox="0 0 200 12" fill="none">
                      <path d="M2 8 C50 2, 150 2, 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>{" "}
                  News & Insights
                </h1>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal delay={0.35}>
                <p className={`font-sans text-sm sm:text-base max-w-xl leading-relaxed ${isDark ? "text-gray-300/90" : "text-stone-600/90"}`}>
                  Expert articles, market trends, investment strategies, and exclusive insights into Dubai's ever-evolving real estate market — helping you make informed decisions.
                </p>
              </ScrollReveal>

              {/* ── GLASSMORPHISM SEARCH PANEL — Elevated Design ── */}
              <ScrollReveal delay={0.45}>
                <div className={`rounded-3xl backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden ${isDark ? "border border-white/10 bg-white/[0.03]" : "border border-stone-200/60 bg-white"}`}>
                  {/* Search header */}
                  <div className={`px-5 sm:px-6 pt-5 pb-3 ${isDark ? "border-b border-white/5" : "border-b border-stone-200/60"}`}>
                    <div className={`flex items-center gap-2 ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                      <Search className="w-4 h-4" />
                      <span className="font-sans text-xs font-medium">Search & Filter Articles</span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Search Input Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="relative sm:col-span-3">
                        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search for articles, guides, market reports..."
                          className={`w-full pl-11 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all ${isDark ? "bg-white/5 border border-white/10 text-white placeholder-gray-500" : "bg-stone-100/80 border border-stone-200 text-[#1c1917] placeholder-stone-400"}`}
                        />
                      </div>

                      <div className="relative">
                        <Filter className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        <select className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 transition-all cursor-pointer ${isDark ? "bg-white/5 border border-white/10 text-white" : "bg-stone-100/80 border border-stone-200 text-[#1c1917]"}`}>
                          <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>All Categories</option>
                          {categories.map((cat) => (
                            <option key={cat.name} className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>{cat.name}</option>
                          ))}
                        </select>
                        <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                      </div>

                      <div className="relative">
                        <Tag className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        <select className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 transition-all cursor-pointer ${isDark ? "bg-white/5 border border-white/10 text-white" : "bg-stone-100/80 border border-stone-200 text-[#1c1917]"}`}>
                          <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>All Tags</option>
                          {tags.map((tag) => (
                            <option key={tag} className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>{tag}</option>
                          ))}
                        </select>
                        <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                      </div>

                      <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#d4af37] text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#e7c96a] active:scale-[0.98] transition-all duration-300 shadow-[0_2px_16px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_24px_rgba(212,175,55,0.4)] cursor-pointer">
                        <Search className="w-4 h-4" />
                        Search
                      </button>
                    </div>

                    {/* Tags Row */}
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 5).map((tag) => (
                        <button
                          key={tag}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-sans font-medium transition-all duration-300 cursor-pointer ${isDark ? "bg-white/5 border border-white/10 text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5" : "bg-stone-100/80 border border-stone-200 text-stone-500 hover:text-[#d4af37] hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5"}`}
                        >
                          {tag}
                        </button>
                      ))}
                      <span className={`px-3 py-1.5 text-[10px] flex items-center ${isDark ? "text-gray-500" : "text-stone-400"}`}>+{tags.length - 5} more</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>


            </div>

            {/* ── RIGHT: Featured Article + Author Card ── */}
            <div className="space-y-4 lg:sticky lg:top-24">
              {/* Featured Article Card */}
              <ScrollReveal delay={0.4} direction="right">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative rounded-3xl backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden hover:border-[#d4af37]/30 hover:shadow-[0_12px_50px_rgba(212,175,55,0.08)] transition-all duration-500 ${isDark ? "border border-white/10 bg-white/[0.04]" : "border border-stone-200/60 bg-white"}`}
                >
                  {/* Featured Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-wider">
                          {featuredArticle.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full backdrop-blur-sm text-[10px] font-medium ${isDark ? "bg-white/10 text-white border border-white/10" : "bg-stone-100 text-[#1c1917] border border-stone-200"}`}>
                          Featured
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button className={`w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center hover:text-[#d4af37] transition-colors cursor-pointer ${isDark ? "bg-black/30 text-white/70 border border-white/10" : "bg-stone-200/80 text-stone-500 border border-stone-200"}`}>
                          <Bookmark className="w-3 h-3" />
                        </button>
                        <button className={`w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center hover:text-[#d4af37] transition-colors cursor-pointer ${isDark ? "bg-black/30 text-white/70 border border-white/10" : "bg-stone-200/80 text-stone-500 border border-stone-200"}`}>
                          <Share2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Date + Read Time */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className={`flex items-center gap-3 text-[10px] ${isDark ? "text-gray-300" : "text-stone-600"}`}>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#d4af37]" />
                          {featuredArticle.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#d4af37]" />
                          {featuredArticle.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-[#d4af37]" />
                          {featuredArticle.views}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-serif text-lg font-bold leading-snug group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-2">
                      {featuredArticle.title}
                    </h3>
                    <p className={`font-sans text-sm leading-relaxed line-clamp-3 ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                      {featuredArticle.excerpt}
                    </p>

                    {/* Author Row */}
                    <div className={`flex items-center gap-3 pt-2 ${isDark ? "border-t border-white/5" : "border-t border-stone-200/60"}`}>
                      <img
                        src={featuredArticle.authorAvatar}
                        alt={featuredArticle.author}
                        className={`w-9 h-9 rounded-full object-cover ${isDark ? "border border-white/10" : "border border-stone-200"}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-sans text-xs font-semibold truncate ${isDark ? "text-white" : "text-[#1c1917]"}`}>{featuredArticle.author}</p>
                        <p className={`font-sans text-[10px] ${isDark ? "text-gray-500" : "text-stone-400"}`}>{featuredArticle.authorRole}</p>
                      </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] font-sans text-[11px] font-bold uppercase tracking-wider hover:bg-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-300 cursor-pointer group/btn">
                      <BookOpen className="w-3.5 h-3.5" />
                      Read Article
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>

                  {/* Gold glow on hover */}
                  <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              </ScrollReveal>

              {/* Newsletter CTA Mini Card */}
              <ScrollReveal delay={0.6} direction="right">
                <div className="rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/5 to-transparent p-5 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                      <Bell className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-serif text-sm font-bold mb-1 ${isDark ? "text-white" : "text-[#1c1917]"}`}>Stay Informed</h4>
                      <p className={`font-sans text-[11px] leading-relaxed mb-3 ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                        Get weekly market insights delivered to your inbox.
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          placeholder="Your email"
                          className={`flex-1 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#d4af37]/50 transition-all ${isDark ? "bg-white/5 border border-white/10 text-white placeholder-gray-500" : "bg-stone-100/80 border border-stone-200 text-[#1c1917] placeholder-stone-400"}`}
                        />
                        <button className="px-4 py-2 rounded-lg bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-wider hover:bg-[#e7c96a] transition-all cursor-pointer shrink-0">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          EXPLORE TOPICS — FULL WIDTH HORIZONTAL SCROLL
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <ScrollReveal delay={0.1}>
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold block mb-2">
                  Browse by Topic
                </span>
                <h2 className={`font-serif text-2xl sm:text-3xl font-bold ${isDark ? "text-white" : "text-[#1c1917]"}`}>
                  Explore <span className="text-[#d4af37]">Topics</span>
                </h2>
              </div>
              <a href="#" className="hidden sm:flex items-center gap-1.5 text-xs text-[#d4af37] hover:text-[#e7c96a] font-medium transition-colors group">
                View All Topics
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </ScrollReveal>

          {/* Horizontal Scroll Row */}
          <ScrollReveal delay={0.2}>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.name;
                return (
                  <motion.div
                    key={cat.name}
                    whileHover={{ y: -6, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`relative shrink-0 w-[200px] sm:w-[240px] h-[180px] sm:h-[200px] rounded-3xl border cursor-pointer transition-all duration-400 overflow-hidden group snap-start ${
                      isActive
                        ? "border-[#d4af37]/60 bg-[#d4af37]/[0.08] shadow-[0_8px_30px_rgba(212,175,55,0.12)]"
                        : `${isDark ? "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.06] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]" : "border-stone-200/60 bg-white hover:border-stone-300 hover:bg-stone-50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"}`
                    }`}
                  >
                    {/* Subtle top shimmer on hover */}
                    <div className={`absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isDark ? "from-white/[0.04]" : "from-stone-100/50"}`} />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-5">
                      {/* Top: Icon */}
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-[#d4af37]/20 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                            : `${isDark ? "bg-white/[0.06] group-hover:bg-white/[0.1]" : "bg-stone-100 group-hover:bg-stone-200"}`
                        }`}>
                          <Icon className={`w-6 h-6 transition-colors duration-300 ${
                            isActive ? "text-[#d4af37]" : `${isDark ? "text-gray-400 group-hover:text-white" : "text-stone-500 group-hover:text-[#1c1917]"}`
                          }`} />
                        </div>
                        <ArrowUpRight className={`w-5 h-5 transition-all duration-300 ${
                          isActive
                            ? "text-[#d4af37] opacity-100"
                            : `${isDark ? "text-white/20" : "text-[#1c1917]/20"} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`
                        }`} />
                      </div>

                      {/* Bottom: Text */}
                      <div>
                        <h4 className={`font-serif text-lg font-bold mb-1 transition-colors duration-300 ${
                          isActive ? "text-[#d4af37]" : `${isDark ? "text-white group-hover:text-white" : "text-[#1c1917] group-hover:text-[#1c1917]"}`
                        }`}>
                          {cat.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-medium ${isDark ? "text-gray-500" : "text-stone-400"}`}>{cat.count} articles</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Active gold border glow */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-[#d4af37]/20 pointer-events-none" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Mobile view all link */}
          <div className="sm:hidden mt-4 text-center">
            <a href="#" className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-medium">
              View All Topics <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          QUICK STATISTICS BAR
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <ScrollReveal delay={0.6}>
            <div className={`rounded-3xl backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden ${isDark ? "border border-white/10 bg-white/[0.03]" : "border border-stone-200/60 bg-white"}`}>
              {/* Stats header line */}
              <div className={`px-6 sm:px-8 py-3 flex items-center gap-2 ${isDark ? "border-b border-white/5" : "border-b border-stone-200/60"}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                <span className={`font-sans text-[10px] uppercase tracking-[0.2em] font-medium ${isDark ? "text-gray-500" : "text-stone-400"}`}>Platform Overview</span>
              </div>
              <div className="p-6 sm:p-8">
                <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { value: 200, suffix: "+", label: "Expert Articles", icon: FileText },
                    { value: 50, suffix: "+", label: "Market Reports", icon: TrendingUp },
                    { value: 100, suffix: "K+", label: "Monthly Readers", icon: Users },
                    { value: 0, suffix: "", label: "Fresh Insights", icon: Clock, display: "Weekly" },
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <StaggerItem key={stat.label}>
                        <div className="relative flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center shrink-0 relative">
                            <Icon className="w-6 h-6 text-[#d4af37]" />
                            {idx < 3 && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40" />
                            )}
                          </div>
                          <div>
                            {stat.display ? (
                              <div className="text-3xl sm:text-4xl font-num font-bold text-[#d4af37]">{stat.display}</div>
                            ) : (
                              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            )}
                            <p className={`font-sans text-[10px] uppercase tracking-wider mt-0.5 ${isDark ? "text-gray-400" : "text-stone-500"}`}>{stat.label}</p>
                          </div>
                          {/* Separator line (not on last) */}
                          {idx < 3 && (
                            <div className={`hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 ${isDark ? "bg-white/5" : "bg-stone-200/60"}`} />
                          )}
                        </div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SCROLL INDICATOR
      ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-[#d4af37]" />
        </motion.div>
      </div>
    </section>
  );
}
