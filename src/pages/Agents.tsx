import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Search,
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
  Linkedin,
  MessageCircle,
  Briefcase,
  Globe,
  Clock,
  Users,
  TrendingUp,
  Award,
  Handshake,
  Heart,
  Headphones,
  Shield,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Building2,
  Filter,
  X,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/ui/scroll-reveal";
import { GradientBackground } from "../components/ui/gradient-background-4";

interface AgentsProps {
  theme: "light" | "dark";
  onOpenConsultation: () => void;
}

const agents = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Property Consultant",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Helping buyers and investors find luxury properties across Dubai with personalized guidance and deep market knowledge.",
    phone: "+971 50 123 4567",
    email: "sarah@cityglobal.ae",
    experience: "8+ Years",
    languages: ["English", "Arabic"],
    specialization: ["Luxury Villas", "Off-Plan", "Downtown Dubai"],
    rera: true,
    department: "Sales",
    areas: ["Downtown Dubai", "Palm Jumeirah"],
  },
  {
    id: 2,
    name: "Ahmed Al-Rashid",
    title: "Investment Property Specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Specializing in high-yield investment properties and portfolio strategies for local and international investors.",
    phone: "+971 55 987 6543",
    email: "ahmed@cityglobal.ae",
    experience: "12+ Years",
    languages: ["Arabic", "English", "French"],
    specialization: ["Investment", "Commercial", "Off-Plan"],
    rera: true,
    department: "Investment",
    areas: ["Business Bay", "Dubai Marina"],
  },
  {
    id: 3,
    name: "Elena Petrova",
    title: "Luxury Home Advisor",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Connecting discerning clients with exclusive luxury residences and waterfront properties in Dubai's premium communities.",
    phone: "+971 52 456 7890",
    email: "elena@cityglobal.ae",
    experience: "6+ Years",
    languages: ["English", "Russian", "Arabic"],
    specialization: ["Luxury Apartments", "Waterfront", "Palm Jumeirah"],
    rera: true,
    department: "Sales",
    areas: ["Palm Jumeirah", "Dubai Harbour"],
  },
  {
    id: 4,
    name: "Omar Hassan",
    title: "Rental Properties Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Managing premium rental portfolios and tenant relations across Dubai's most sought-after residential communities.",
    phone: "+971 56 321 0987",
    email: "omar@cityglobal.ae",
    experience: "10+ Years",
    languages: ["Arabic", "English"],
    specialization: ["Rentals", "Family Villas", "Dubai Hills"],
    rera: false,
    department: "Rentals",
    areas: ["Dubai Hills Estate", "Arabian Ranches"],
  },
  {
    id: 5,
    name: "Priya Sharma",
    title: "Off-Plan Specialist",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    bio: "Expert in off-plan investments with deep relationships with top Dubai developers and early access to premium launches.",
    phone: "+971 58 654 3210",
    email: "priya@cityglobal.ae",
    experience: "5+ Years",
    languages: ["English", "Hindi", "Arabic"],
    specialization: ["Off-Plan", "New Launches", "DAMAC"],
    rera: true,
    department: "Off-Plan",
    areas: ["Dubai South", "MBR City"],
  },
  {
    id: 6,
    name: "David Chen",
    title: "Commercial Property Advisor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio: "Advising businesses on commercial real estate solutions including offices, retail spaces, and industrial properties.",
    phone: "+971 54 789 0123",
    email: "david@cityglobal.ae",
    experience: "9+ Years",
    languages: ["English", "Mandarin"],
    specialization: ["Commercial", "Office Spaces", "Business Bay"],
    rera: true,
    department: "Commercial",
    areas: ["Business Bay", "DIFC"],
  },
];

const departments = ["All", "Sales", "Investment", "Rentals", "Off-Plan", "Commercial"];
const specializations = ["All", "Luxury Villas", "Off-Plan", "Investment", "Rentals", "Commercial", "Waterfront"];
const languageOptions = ["All", "English", "Arabic", "French", "Russian", "Hindi", "Mandarin"];
const experienceLevels = ["All", "3+ Years", "5+ Years", "8+ Years", "10+ Years"];

const teamStats = [
  { value: 50, suffix: "+", label: "Professional Advisors", icon: Users },
  { value: 10, suffix: "+", label: "Years Industry Experience", icon: Clock },
  { value: 2500, suffix: "+", label: "Successful Transactions", icon: TrendingUp },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: Heart },
];

const whyChoose = [
  { icon: BadgeCheck, title: "Certified Property Professionals", desc: "All advisors are RERA certified with verified credentials and industry training." },
  { icon: MapPin, title: "Local Market Expertise", desc: "Deep knowledge of Dubai's neighborhoods, regulations, and investment opportunities." },
  { icon: Handshake, title: "Personalized Consultation", desc: "Tailored guidance based on your goals, budget, and lifestyle preferences." },
  { icon: Headphones, title: "End-to-End Property Support", desc: "From search to handover — complete assistance through every step of the process." },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
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
    <div ref={ref} className="text-3xl sm:text-4xl font-num font-bold text-[#d4af37]">
      {count}{suffix}
    </div>
  );
}

export default function Agents({ theme, onOpenConsultation }: AgentsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [activeSpecialization, setActiveSpecialization] = useState("All");
  const [activeLanguage, setActiveLanguage] = useState("All");
  const [activeExperience, setActiveExperience] = useState("All");
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);
  const isDark = theme === "dark";

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = activeDepartment === "All" || agent.department === activeDepartment;
    const matchesSpec = activeSpecialization === "All" || agent.specialization.some(s => s.includes(activeSpecialization));
    const matchesLang = activeLanguage === "All" || agent.languages.includes(activeLanguage);
    const matchesExp = activeExperience === "All" ||
      (activeExperience === "3+ Years" && parseInt(agent.experience) >= 3) ||
      (activeExperience === "5+ Years" && parseInt(agent.experience) >= 5) ||
      (activeExperience === "8+ Years" && parseInt(agent.experience) >= 8) ||
      (activeExperience === "10+ Years" && parseInt(agent.experience) >= 10);
    return matchesSearch && matchesDept && matchesSpec && matchesLang && matchesExp;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setActiveDepartment("All");
    setActiveSpecialization("All");
    setActiveLanguage("All");
    setActiveExperience("All");
  };

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=90"
            alt="Dubai Real Estate Team"
            className="w-full h-full object-cover scale-105"
            style={{ animation: "slowZoom 30s ease-in-out infinite alternate" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#d4af37]/[0.04] blur-[200px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#d4af37]/[0.03] blur-[160px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full pt-24 pb-16">
          <div className="max-w-3xl">
            <ScrollReveal delay={0.1}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 backdrop-blur-sm mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
                  Our Expert Team
                </span>
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                Meet Our{" "}
                <span className="relative inline-block">
                  <span className="text-[#d4af37]">Professional</span>
                  <svg className="absolute -bottom-1 left-0 w-full h-3 text-[#d4af37]/20" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8 C50 2, 150 2, 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>{" "}
                Real Estate Advisors
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <p className={`font-sans text-sm sm:text-base max-w-2xl leading-relaxed mb-8 ${isDark ? "text-gray-300/90" : "text-stone-600"}`}>
                Connect with experienced real estate professionals who specialize in luxury homes, off-plan investments, residential sales, rentals, and commercial properties across Dubai. Our dedicated advisors provide personalized guidance and market expertise to help every client achieve their property goals.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#agents-grid"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#d4af37] text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#e7c96a] transition-all duration-300 shadow-[0_2px_16px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_24px_rgba(212,175,55,0.4)]"
                >
                  <Users className="w-4 h-4" />
                  Meet Our Experts
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <button
                  onClick={onOpenConsultation}
                  className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl backdrop-blur-sm font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${isDark ? "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30" : "border border-stone-300 bg-white text-stone-900 hover:bg-stone-50 hover:border-stone-400"}`}
                >
                  <Phone className="w-4 h-4" />
                  Contact Us
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SEARCH & FILTER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className={`rounded-3xl backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden ${isDark ? "border border-white/10 bg-white/[0.04]" : "border border-stone-200/60 bg-white shadow-sm"}`}>
              <div className={`px-5 sm:px-6 pt-5 pb-3 flex items-center justify-between ${isDark ? "border-b border-white/5" : "border-b border-stone-200/60"}`}>
                <div className={`flex items-center gap-2 ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                  <Filter className="w-4 h-4" />
                  <span className="font-sans text-xs font-medium">Find Your Advisor</span>
                </div>
                {(searchQuery || activeDepartment !== "All" || activeSpecialization !== "All" || activeLanguage !== "All" || activeExperience !== "All") && (
                  <button onClick={resetFilters} className={`flex items-center gap-1 text-[10px] hover:text-[#d4af37] transition-colors cursor-pointer ${isDark ? "text-gray-500" : "text-stone-400"}`}>
                    <X className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {/* Search */}
                  <div className="relative lg:col-span-2">
                    <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name or title..."
                      className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all ${isDark ? "bg-white/5 border border-white/10 text-white placeholder-gray-500" : "bg-white border border-stone-200 text-stone-900 placeholder-stone-400"}`}
                    />
                  </div>

                  {/* Department */}
                  <div className="relative">
                    <Briefcase className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                    <select
                      value={activeDepartment}
                      onChange={(e) => setActiveDepartment(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 transition-all cursor-pointer ${isDark ? "bg-white/5 border border-white/10 text-white" : "bg-white border border-stone-200 text-stone-900"}`}
                    >
                      {departments.map((d) => (
                        <option key={d} value={d} className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>{d === "All" ? "All Departments" : d}</option>
                      ))}
                    </select>
                    <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                  </div>

                  {/* Specialization */}
                  <div className="relative">
                    <Award className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                    <select
                      value={activeSpecialization}
                      onChange={(e) => setActiveSpecialization(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 transition-all cursor-pointer ${isDark ? "bg-white/5 border border-white/10 text-white" : "bg-white border border-stone-200 text-stone-900"}`}
                    >
                      {specializations.map((s) => (
                        <option key={s} value={s} className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>{s === "All" ? "All Specializations" : s}</option>
                      ))}
                    </select>
                    <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                  </div>

                  {/* Languages */}
                  <div className="relative">
                    <Globe className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                    <select
                      value={activeLanguage}
                      onChange={(e) => setActiveLanguage(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 transition-all cursor-pointer ${isDark ? "bg-white/5 border border-white/10 text-white" : "bg-white border border-stone-200 text-stone-900"}`}
                    >
                      {languageOptions.map((l) => (
                        <option key={l} value={l} className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>{l === "All" ? "All Languages" : l}</option>
                      ))}
                    </select>
                    <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Experience */}
                  <div className="relative">
                    <Clock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                    <select
                      value={activeExperience}
                      onChange={(e) => setActiveExperience(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 transition-all cursor-pointer ${isDark ? "bg-white/5 border border-white/10 text-white" : "bg-white border border-stone-200 text-stone-900"}`}
                    >
                      {experienceLevels.map((e) => (
                        <option key={e} value={e} className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>{e === "All" ? "Any Experience" : e}</option>
                      ))}
                    </select>
                    <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <a
                      href="#agents-grid"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#d4af37] text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#e7c96a] transition-all duration-300 shadow-[0_2px_12px_rgba(212,175,55,0.25)] cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                      Find Agent
                    </a>
                    <button
                      onClick={resetFilters}
                      className={`px-5 py-3 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${isDark ? "border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10" : "border border-stone-200 bg-white text-stone-500 hover:text-stone-900 hover:bg-stone-50"}`}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          AGENTS GRID
      ═══════════════════════════════════════════════════════════════ */}
      <section id="agents-grid" className="relative py-16 sm:py-20">
        <GradientBackground />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
                Our Team
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Featured <span className="text-[#d4af37]">Advisors</span>
              </h2>
              <p className={`font-sans text-sm max-w-lg mx-auto ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                {filteredAgents.length} advisor{filteredAgents.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <StaggerItem key={agent.id}>
                <motion.div
                  onHoverStart={() => setHoveredAgent(agent.id)}
                  onHoverEnd={() => setHoveredAgent(null)}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative rounded-3xl backdrop-blur-sm overflow-hidden hover:border-[#d4af37]/30 hover:shadow-[0_12px_50px_rgba(212,175,55,0.06)] transition-all duration-500 ${isDark ? "border border-white/10 bg-white/[0.04]" : "border border-stone-200/60 bg-white shadow-sm"}`}
                >
                  {/* Agent Photo */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <div className={`px-2.5 py-1 rounded-full backdrop-blur-sm text-[9px] font-medium uppercase tracking-wider ${isDark ? "bg-black/50 text-white border border-white/10" : "bg-white/80 text-stone-900 border border-stone-200/60"}`}>
                        {agent.department}
                      </div>
                      {agent.rera && (
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37] text-black text-[9px] font-bold uppercase tracking-wider">
                          <BadgeCheck className="w-3 h-3" />
                          RERA
                        </div>
                      )}
                    </div>

                    {/* Name overlay at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className={`font-serif text-xl font-bold mb-0.5 drop-shadow-lg ${isDark ? "text-white" : "text-stone-900"}`}>
                        {agent.name}
                      </h3>
                      <p className="font-sans text-[11px] text-[#d4af37] font-semibold uppercase tracking-wider">
                        {agent.title}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4">

                    {/* Bio */}
                    <p className={`font-sans text-xs leading-relaxed line-clamp-2 ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                      {agent.bio}
                    </p>

                    {/* Contact Row */}
                    <div className={`flex items-center gap-4 text-[11px] ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                      <a href={`tel:${agent.phone}`} className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                        <span className="truncate">{agent.phone}</span>
                      </a>
                      <a href={`mailto:${agent.email}`} className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate">{agent.email}</span>
                      </a>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${isDark ? "bg-white/5 border border-white/5 text-gray-400" : "bg-stone-100/80 border border-stone-200 text-stone-500"}`}>
                        <Clock className="w-3 h-3 text-[#d4af37]" />
                        {agent.experience}
                      </span>
                      <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${isDark ? "bg-white/5 border border-white/5 text-gray-400" : "bg-stone-100/80 border border-stone-200 text-stone-500"}`}>
                        <Globe className="w-3 h-3 text-[#d4af37]" />
                        {agent.languages.join(" · ")}
                      </span>
                    </div>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-1.5">
                      {agent.specialization.map((spec) => (
                        <span key={spec} className="px-2.5 py-1 rounded-lg bg-[#d4af37]/5 border border-[#d4af37]/15 text-[10px] font-medium text-[#d4af37]">
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href="#"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] font-sans text-[10px] font-bold uppercase tracking-wider hover:bg-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-300"
                      >
                        View Profile
                      </a>
                      <a
                        href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-sans text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-500/20 transition-all duration-300"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                      <a
                        href="#"
                        className={`flex items-center justify-center w-10 rounded-xl hover:text-[#0a66c2] hover:border-[#0a66c2]/30 transition-all duration-300 ${isDark ? "bg-white/5 border border-white/10 text-gray-400" : "bg-stone-100/80 border border-stone-200 text-stone-500"}`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredAgents.length === 0 && (
            <div className="text-center py-16">
              <Users className={`w-12 h-12 mx-auto mb-4 ${isDark ? "text-gray-600" : "text-stone-300"}`} />
              <p className={`font-serif text-xl mb-2 ${isDark ? "text-gray-400" : "text-stone-500"}`}>No advisors found</p>
              <p className={`font-sans text-sm mb-4 ${isDark ? "text-gray-500" : "text-stone-400"}`}>Try adjusting your filters</p>
              <button
                onClick={resetFilters}
                className="px-5 py-2 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-wider hover:bg-[#d4af37]/20 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TEAM STATISTICS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className={`rounded-3xl backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden ${isDark ? "border border-white/10 bg-white/[0.03]" : "border border-stone-200/60 bg-white shadow-sm"}`}>
              <div className={`px-6 sm:px-8 py-3 flex items-center gap-2 ${isDark ? "border-b border-white/5" : "border-b border-stone-200/60"}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                <span className={`font-sans text-[10px] uppercase tracking-[0.2em] font-medium ${isDark ? "text-gray-500" : "text-stone-400"}`}>Team Performance</span>
              </div>
              <div className="p-6 sm:p-8">
                <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {teamStats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <StaggerItem key={stat.label}>
                        <div className="relative flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                            <Icon className="w-6 h-6 text-[#d4af37]" />
                          </div>
                          <div>
                            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            <p className={`font-sans text-[10px] uppercase tracking-wider mt-0.5 ${isDark ? "text-gray-400" : "text-stone-500"}`}>{stat.label}</p>
                          </div>
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
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          JOIN OUR TEAM CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/5 via-transparent to-[#d4af37]/5" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 backdrop-blur-sm mb-6">
              <Briefcase className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
                Careers
              </span>
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Join Our <span className="text-[#d4af37]">Growing Team</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className={`font-sans text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-stone-600"}`}>
              We're always looking for passionate real estate professionals who are committed to delivering exceptional client experiences.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#d4af37] text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#e7c96a] transition-all duration-300 shadow-[0_2px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.4)]"
              >
                <Briefcase className="w-4 h-4" />
                View Careers
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#"
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl backdrop-blur-sm font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 ${isDark ? "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30" : "border border-stone-300 bg-white text-stone-900 hover:bg-stone-50 hover:border-stone-400"}`}
              >
                <Mail className="w-4 h-4" />
                Contact HR
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY CHOOSE OUR TEAM
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <GradientBackground />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
                Why Us
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                Why Choose <span className="text-[#d4af37]">Our Team</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyChoose.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className={`group rounded-3xl backdrop-blur-sm p-8 hover:border-[#d4af37]/30 hover:shadow-[0_8px_30px_rgba(212,175,55,0.06)] transition-all duration-500 ${isDark ? "border border-white/10 bg-white/[0.04]" : "border border-stone-200/60 bg-white shadow-sm"}`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mb-5 group-hover:bg-[#d4af37]/15 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#d4af37]" />
                    </div>
                    <h3 className={`font-serif text-xl font-bold mb-2 group-hover:text-[#d4af37] transition-colors duration-300 ${isDark ? "text-white" : "text-stone-900"}`}>
                      {item.title}
                    </h3>
                    <p className={`font-sans text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                      {item.desc}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
