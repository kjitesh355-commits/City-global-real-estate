import React, { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsGrid from "./components/StatsGrid";
import FeaturedProperties from "./components/FeaturedProperties";
import ExploreAndCompare from "./components/ExploreAndCompare";
import InvestmentScore from "./components/InvestmentScore";
import Calculators from "./components/Calculators";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";
import OurServices from "./components/OurServices";
import GlobeFeatureSection from "./components/ui/globe-feature-section";
import AIConcierge from "./components/AIConcierge";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import SectionNav from "./components/SectionNav";
import AboutUs from "./pages/AboutUs";
import Projects from "./pages/Projects";
import ReadyToMove from "./pages/ReadyToMove";
import Rentals from "./pages/Rentals";
import Blog from "./pages/Blog";
import Agents from "./pages/Agents";
import Contact from "./pages/Contact";
import { BeamsBackground } from "./components/ui/beams-background";
import { Property } from "./types";
import { X, Calendar, User, Mail, Phone, Clock, Sparkles, Compass, Plus, Facebook, Linkedin, Instagram, ChevronUp } from "lucide-react";
import { FloatingButton, FloatingButtonItem } from "./components/ui/floating-button";

export default function App() {
  // Page routing
  const [activePage, setActivePage] = useState<"home" | "about" | "projects" | "ready" | "rentals" | "blog" | "agents" | "contact">("home");
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  
  // Theme State
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  // AI Search states
  const [aiResults, setAiResults] = useState<Property[] | null>(null);
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Modals States
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [successBooking, setSuccessBooking] = useState(false);
  const [selected3DProperty, setSelected3DProperty] = useState<Property | null>(null);

  // Form Fields
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");

  // Cookie Consent
  const [cookieAccepted, setCookieAccepted] = useState(() => {
    return localStorage.getItem("cookie_consent") === "accepted";
  });

  // Scroll to Top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fetch properties from Express API on startup
  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch("/api/properties");
        if (response.ok) {
          const data = await response.json();
          setAllProperties(data);
          setFilteredProperties(data);
        }
      } catch (error) {
        console.error("Failed to load properties:", error);
      }
    }
    fetchProperties();
  }, []);

  // Filter properties based on traditional search form
  const handleTraditionalSearch = (filters: {
    location: string;
    propertyType: string;
    bedrooms: string;
    budget: string;
    developer: string;
  }) => {
    // Clear any active AI curation search to let traditional search take priority
    setAiResults(null);

    let results = [...allProperties];

    // Location
    if (filters.location.trim()) {
      const loc = filters.location.toLowerCase();
      results = results.filter(
        (p) => p.area.toLowerCase().includes(loc) || p.name.toLowerCase().includes(loc)
      );
    }

    // Property Type
    if (filters.propertyType !== "All Types") {
      const type = filters.propertyType.toLowerCase();
      results = results.filter((p) => p.name.toLowerCase().includes(type) || p.description.toLowerCase().includes(type));
    }

    // Bedrooms
    if (filters.bedrooms !== "Any") {
      if (filters.bedrooms.includes("+")) {
        const minBeds = parseInt(filters.bedrooms);
        results = results.filter((p) => p.beds >= minBeds);
      } else {
        const exactBeds = parseInt(filters.bedrooms);
        results = results.filter((p) => p.beds === exactBeds);
      }
    }

    // Budget
    if (filters.budget !== "Any Budget") {
      if (filters.budget === "Under 10M") {
        results = results.filter((p) => p.price < 10000000);
      } else if (filters.budget === "10M - 20M") {
        results = results.filter((p) => p.price >= 10000000 && p.price <= 20000000);
      } else if (filters.budget === "20M - 40M") {
        results = results.filter((p) => p.price >= 20000000 && p.price <= 40000000);
      } else if (filters.budget === "40M+") {
        results = results.filter((p) => p.price > 40000000);
      }
    }

    // Developer
    if (filters.developer !== "All Developers") {
      results = results.filter((p) => p.developer === filters.developer);
    }

    setFilteredProperties(results);
  };

  // AI Curation search results callback
  const handleAISearchResults = (
    results: Property[] | null,
    isSearching: boolean,
    error: string | null
  ) => {
    setIsAiSearching(isSearching);
    setAiError(error);
    if (results !== null) {
      setAiResults(results);
    }
  };

  const handleClearAISearch = () => {
    setAiResults(null);
    setAiError(null);
    setFilteredProperties(allProperties);
  };

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;

    setSuccessBooking(true);
    setTimeout(() => {
      setSuccessBooking(false);
      setConsultationOpen(false);
      // Reset fields
      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setPreferredDate("");
      setNotes("");
    }, 4500);
  };

  const handleAcceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setCookieAccepted(true);
  };

  // Scroll to Top handler
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <HelmetProvider>
    <div className={`relative min-h-screen transition-colors duration-500 selection:bg-[#d4af37]/40 overflow-x-hidden ${
      theme === "dark" ? "bg-[#07080a] text-white" : "bg-[#fcfbf9] text-[#14161d]"
    }`}>
      
      {/* Page-specific SEO */}
      {activePage === "home" && <SEO />}
      {activePage === "about" && <SEO title="About Us" description="Learn about City Global Real Estate - Dubai's trusted property agency with 10+ years experience, 15,000+ properties sold, and RERA certification." />}
      {activePage === "projects" && <SEO title="Off Plan Projects" description="Explore premium off-plan projects in Dubai from top developers like EMAAR, DAMAC, and MERAAS. Flexible payment plans and high ROI." />}
      {activePage === "ready" && <SEO title="Ready to Move" description="Browse ready-to-move properties in Dubai. Verified listings, transparent pricing, and professional advisory support." />}
      {activePage === "rentals" && <SEO title="Rental Properties" description="Find luxury rental properties in Dubai - apartments, villas, and commercial spaces in prime locations." />}
      {activePage === "blog" && <SEO title="Blog" description="Latest insights on Dubai real estate market, investment tips, golden visa updates, and property guides." />}
      {activePage === "agents" && <SEO title="Our Agents" description="Meet our expert real estate agents in Dubai. Professional, multilingual, and dedicated to finding your perfect property." />}
      {activePage === "contact" && <SEO title="Contact Us" description="Get in touch with City Global Real Estate. Free consultation, WhatsApp support, and office visits available." />}
      <Navbar onOpenConsultation={() => setConsultationOpen(true)} theme={theme} onToggleTheme={toggleTheme} activePage={activePage} onNavigateHome={() => setActivePage("home")} onNavigateAbout={() => setActivePage("about")} onNavigateProjects={() => setActivePage("projects")} onNavigateReady={() => setActivePage("ready")} onNavigateRentals={() => setActivePage("rentals")} onNavigateBlog={() => setActivePage("blog")} onNavigateAgents={() => setActivePage("agents")} onNavigateContact={() => setActivePage("contact")} />
      
      {/* Section Navigation Sidebar */}
      {activePage === "home" && <SectionNav theme={theme} />}

      {activePage === "about" ? (
        <>
        <AboutUs
          theme={theme}
          onNavigateHome={() => setActivePage("home")}
          onOpenConsultation={() => setConsultationOpen(true)}
        />
        <Footer onOpenConsultation={() => setConsultationOpen(true)} theme={theme} />
        </>
      ) : activePage === "projects" ? (
        <>
        <Projects
          theme={theme}
          onOpenConsultation={() => setConsultationOpen(true)}
        />
        <Footer onOpenConsultation={() => setConsultationOpen(true)} theme={theme} />
        </>
      ) : activePage === "ready" ? (
        <>
        <ReadyToMove
          theme={theme}
          onOpenConsultation={() => setConsultationOpen(true)}
        />
        <Footer onOpenConsultation={() => setConsultationOpen(true)} theme={theme} />
        </>
      ) : activePage === "rentals" ? (
        <>
        <Rentals
          theme={theme}
          onOpenConsultation={() => setConsultationOpen(true)}
        />
        <Footer onOpenConsultation={() => setConsultationOpen(true)} theme={theme} />
        </>
      ) : activePage === "blog" ? (
        <>
        <Blog
          theme={theme}
          onOpenConsultation={() => setConsultationOpen(true)}
        />
        <Footer onOpenConsultation={() => setConsultationOpen(true)} theme={theme} />
        </>
      ) : activePage === "agents" ? (
        <>
        <Agents
          theme={theme}
          onOpenConsultation={() => setConsultationOpen(true)}
        />
        <Footer onOpenConsultation={() => setConsultationOpen(true)} theme={theme} />
        </>
      ) : activePage === "contact" ? (
        <>
        <Contact
          theme={theme}
          onOpenConsultation={() => setConsultationOpen(true)}
        />
        <Footer onOpenConsultation={() => setConsultationOpen(true)} theme={theme} />
        </>
      ) : (
      <>

      {/* Hero Marquee Showcase */}
      <Hero
        onSearchSubmit={handleTraditionalSearch}
        onAISearchResults={handleAISearchResults}
        theme={theme}
      />

      {/* Ambient glowing beams background below the hero */}
      <BeamsBackground theme={theme} intensity="medium">
        {/* Trust Badges Row */}
        <StatsGrid theme={theme} />

        {/* Our Services */}
        <OurServices theme={theme} onNavigate={(page) => setActivePage(page)} />

        {/* Core Properties Viewport */}
        <FeaturedProperties
          properties={filteredProperties}
          aiResults={aiResults}
          isAiSearching={isAiSearching}
          aiError={aiError}
          onClearAISearch={handleClearAISearch}
          onOpen3DModal={(property) => setSelected3DProperty(property)}
          theme={theme}
        />

        {/* Shoreline Map & Property Comparison */}
        <ExploreAndCompare properties={allProperties} theme={theme} />

        {/* Financial Analytics & Gauges */}
        <InvestmentScore properties={allProperties} theme={theme} />

        {/* Financial Calculators (Mortgage & ROI) */}
        <Calculators theme={theme} />

        {/* Partners & Endorsements */}
        <Testimonials theme={theme} />

        {/* Why Choose City Global */}
        <WhyChooseUs theme={theme} />

        {/* Globe Feature - Global Reach */}
        <div className="px-4 sm:px-6 lg:px-12 py-8">
          <GlobeFeatureSection theme={theme} />
        </div>

        {/* Footer & CTAs */}
        <Footer onOpenConsultation={() => setConsultationOpen(true)} theme={theme} />
      </BeamsBackground>

      {/* AI Concierge - Outside BeamsBackground for proper floating */}
      <AIConcierge theme={theme} />
      </>
      )}

      {/* --- CONSULTATION BOOKING MODAL (GLASS STYLE) --- */}
      {consultationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className={`glass-gold w-full max-w-lg rounded-lg overflow-hidden border shadow-2xl relative animate-in zoom-in-95 duration-300 text-left transition-colors duration-300 ${
            theme === "dark" ? "border-[#d4af37]/40" : "border-[#aa7c11]/30"
          }`}>
            
            {/* Header */}
            <div className={`p-6 flex justify-between items-center transition-colors duration-300 ${
              theme === "dark" ? "bg-[#13110d] border-b border-[#d4af37]/20" : "bg-[#fcfaf5] border-b border-[#aa7c11]/20"
            }`}>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#d4af37]" />
                <h3 className={`font-serif text-lg font-bold tracking-wide transition-colors duration-300 ${
                  theme === "dark" ? "text-[#f3e5ab]" : "text-[#aa7c11]"
                }`}>Private Consultation</h3>
              </div>
              <button
                onClick={() => setConsultationOpen(false)}
                className={`p-1 cursor-pointer transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400 hover:text-white" : "text-stone-400 hover:text-stone-900"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            {successBooking ? (
              <div className="p-10 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400 animate-bounce">
                  <Sparkles className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h4 className={`font-serif text-xl font-bold mb-2 transition-colors duration-300 ${
                  theme === "dark" ? "text-[#f3e5ab]" : "text-[#aa7c11]"
                }`}>Consultation Assigned</h4>
                <p className={`font-sans text-xs leading-relaxed max-w-xs transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-300" : "text-stone-700"
                }`}>
                  Your private concierge advisor has been successfully assigned. A Dubai market expert will contact you within 15 minutes to coordinate your portfolio requirements.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookConsultation} className="p-6 flex flex-col gap-4 font-sans text-xs">
                <p className={`font-light leading-relaxed mb-2 transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400" : "text-stone-600"
                }`}>
                  Arrange a private portfolio strategy audit with an expert real estate advisor. Completely tax-free yields, residency visa pathways, and bespoke off-market inventories.
                </p>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className={`font-semibold tracking-wider uppercase text-[10px] transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-400" : "text-stone-500"
                  }`}>Your Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Alexander Mercer"
                      className={`w-full rounded px-3 py-2 focus:outline-none transition-colors duration-300 ${
                        theme === "dark"
                          ? "bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:border-[#d4af37]"
                          : "bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#aa7c11]"
                      }`}
                    />
                    <User className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
                  </div>
                </div>

                {/* Email & Phone side-by-side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={`font-semibold tracking-wider uppercase text-[10px] transition-colors duration-300 ${
                      theme === "dark" ? "text-gray-400" : "text-stone-500"
                    }`}>Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g. alex@example.com"
                        className={`w-full rounded px-3 py-2 focus:outline-none transition-colors duration-300 ${
                          theme === "dark"
                            ? "bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:border-[#d4af37]"
                            : "bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#aa7c11]"
                        }`}
                      />
                      <Mail className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={`font-semibold tracking-wider uppercase text-[10px] transition-colors duration-300 ${
                      theme === "dark" ? "text-gray-400" : "text-stone-500"
                    }`}>Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+971 50 123 4567"
                        className={`w-full rounded px-3 py-2 focus:outline-none transition-colors duration-300 ${
                          theme === "dark"
                            ? "bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:border-[#d4af37]"
                            : "bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#aa7c11]"
                        }`}
                      />
                      <Phone className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>

                {/* Preferred Date */}
                <div className="flex flex-col gap-1.5">
                  <label className={`font-semibold tracking-wider uppercase text-[10px] transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-400" : "text-stone-500"
                  }`}>Preferred Consultation Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`w-full rounded px-3 py-2 focus:outline-none transition-colors duration-300 ${
                        theme === "dark"
                          ? "bg-black/40 border border-gray-800 text-white focus:border-[#d4af37]"
                          : "bg-white border border-stone-200 text-stone-900 focus:border-[#aa7c11]"
                      }`}
                    />
                  </div>
                </div>

                {/* Message notes */}
                <div className="flex flex-col gap-1.5">
                  <label className={`font-semibold tracking-wider uppercase text-[10px] transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-400" : "text-stone-500"
                  }`}>Investment Notes / Preferences</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Looking for high-yield properties on Palm Jumeirah..."
                    className={`w-full rounded px-3 py-2 focus:outline-none resize-none transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:border-[#d4af37]"
                        : "bg-white border border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#aa7c11]"
                    }`}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="cursor-pointer bg-gradient-to-r from-[#d4af37] via-[#aa7c11] to-[#d4af37] text-black font-sans text-xs uppercase font-bold py-3 rounded-sm mt-2 hover:brightness-110 active:scale-98 transition-all"
                >
                  Schedule Strategy Audit
                </button>
              </form>
            )}

          </div>
        </div>
      )}


      {/* --- IMMERSIVE 3D VR PREVIEW MODAL --- */}
      {selected3DProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass-gold w-full max-w-4xl rounded-lg overflow-hidden border border-[#d4af37]/50 shadow-2xl relative animate-in zoom-in-95 duration-300">
            
            {/* Header */}
            <div className="p-4 border-b border-[#d4af37]/20 flex justify-between items-center bg-[#13110d] text-left">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#d4af37] animate-spin" style={{ animationDuration: '6s' }} />
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#f3e5ab] leading-none mb-0.5">3D Immersive VR Tour</h3>
                  <p className="text-[10px] text-gray-500 font-sans">{selected3DProperty.name} — {selected3DProperty.area}</p>
                </div>
              </div>
              <button
                onClick={() => setSelected3DProperty(null)}
                className="text-gray-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Immersive 3D/VR panoramic preview area */}
            <div className="relative h-[420px] bg-black flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                alt="3D Panoramic View"
                className="w-full h-full object-cover scale-110 blur-[1px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />

              {/* VR Interactive Markers Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] flex items-center justify-center animate-pulse shadow-[0_0_20px_#d4af37]">
                    <Compass className="w-8 h-8 text-[#d4af37]" />
                  </div>
                  <span className="font-serif text-xs text-white uppercase tracking-widest font-bold mt-3 bg-black/60 px-4 py-1.5 rounded-full border border-gray-800">
                    Drag to Rotate 360°
                  </span>
                </div>
              </div>

              {/* Giro / Hotspots */}
              <button className="cursor-pointer absolute top-1/4 left-1/3 p-2 rounded bg-black/70 border border-[#d4af37]/40 text-[#f3e5ab] text-[10px] font-sans flex items-center gap-1.5 animate-bounce">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                <span>Enter Master Suite</span>
              </button>

              <button className="cursor-pointer absolute bottom-1/4 right-1/4 p-2 rounded bg-black/70 border border-[#d4af37]/40 text-[#f3e5ab] text-[10px] font-sans flex items-center gap-1.5 animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                <span>View Private Jetty &amp; Beach</span>
              </button>

              {/* Interactive bottom controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                <div className="flex gap-2 bg-black/60 backdrop-blur-md rounded-full px-4 py-1.5 border border-gray-800 text-[10px] font-sans text-gray-300">
                  <span className="text-gray-500">Camera height:</span>
                  <span className="text-[#d4af37]">1.65m</span>
                  <span className="text-gray-700">|</span>
                  <span className="text-gray-500">Optics:</span>
                  <span className="text-emerald-400">Ultra-Wide VR</span>
                </div>

                <div className="flex gap-2">
                  <button className="cursor-pointer bg-[#d4af37] hover:brightness-110 text-black px-4 py-1.5 rounded-full text-[10px] font-sans uppercase font-bold transition-all">
                    Capture Snapshot
                  </button>
                  <button
                    onClick={() => setSelected3DProperty(null)}
                    className="cursor-pointer bg-black/60 hover:bg-black/80 text-white border border-gray-800 px-4 py-1.5 rounded-full text-[10px] font-sans uppercase font-bold transition-all"
                  >
                    Exit VR Preview
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Floating Action Button - WhatsApp & Social Links */}
      <div className="fixed bottom-6 right-4 sm:right-12 z-40">
        <FloatingButton
          triggerContent={
            <button className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-[#d4af37] via-[#aa7c11] to-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-110 cursor-pointer animate-pulse" style={{ animationDuration: '3s' }}>
              <Plus className="w-5 h-5" />
            </button>
          }
        >
          {/* WhatsApp */}
          <FloatingButtonItem>
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center h-11 w-11 bg-[#25d366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-[0_0_16px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.022-.015-.05-.03-.07-.043l-1.077-.525c-.247-.12-.486-.06-.633.1l-.478.587c-.1.123-.25.196-.4.185-.714-.055-1.56-.34-2.288-.89-.728-.55-1.127-1.12-1.353-1.683-.05-.13-.016-.273.08-.372l.412-.412c.11-.11.16-.255.13-.4l-.313-1.1c-.08-.28-.313-.485-.6-.485-.157 0-.313.06-.432.18l-.515.515c-.485.485-.615 1.21-.328 1.838.682 1.49 1.94 2.82 3.492 3.492.615.265 1.347.15 1.838-.328l.492-.492c.133-.133.316-.2.502-.2.074 0 .15.013.22.043l1.1.472c.28.12.443.376.433.682-.014.307-.21.57-.492.645l-.472.122c-.152.04-.316.03-.466-.026zm-5.47-11.4c-4.962 0-9 4.038-9 9 0 1.58.412 3.12 1.205 4.473l-1.28 4.673 4.793-1.258c1.3.725 2.766 1.11 4.28 1.11 4.964 0 9-4.036 9-9s-4.038-9-9-9zm0 16.5c-1.378 0-2.693-.382-3.83-1.1l-.274-.162-2.843.746.76-2.775-.178-.283C4.846 14.806 4.47 13.434 4.47 12c0-4.152 3.377-7.53 7.53-7.53 4.152 0 7.53 3.378 7.53 7.53 0 4.152-3.378 7.53-7.53 7.53z"/>
              </svg>
              <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-sans font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                WhatsApp
              </span>
            </a>
          </FloatingButtonItem>
          {/* Facebook */}
          <FloatingButtonItem>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center h-11 w-11 bg-[#1877f2] hover:bg-[#166fe5] text-white rounded-full shadow-lg hover:shadow-[0_0_16px_rgba(24,119,242,0.5)] transition-all duration-300 hover:scale-110"
            >
              <Facebook className="w-5 h-5" />
              <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-sans font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                Facebook
              </span>
            </a>
          </FloatingButtonItem>
          {/* LinkedIn */}
          <FloatingButtonItem>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center h-11 w-11 bg-[#0a66c2] hover:bg-[#0077b5] text-white rounded-full shadow-lg hover:shadow-[0_0_16px_rgba(0,119,181,0.5)] transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
              <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-sans font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                LinkedIn
              </span>
            </a>
          </FloatingButtonItem>
          {/* Instagram */}
          <FloatingButtonItem>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center h-11 w-11 bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] hover:opacity-90 text-white rounded-full shadow-lg hover:shadow-[0_0_16px_rgba(225,48,108,0.5)] transition-all duration-300 hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
              <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-sans font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                Instagram
              </span>
            </a>
          </FloatingButtonItem>
        </FloatingButton>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-28 left-6 z-40 w-11 h-11 rounded-full bg-gradient-to-br from-[#d4af37] via-[#aa7c11] to-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center animate-in fade-in slide-in-from-bottom-4"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Cookie Consent Banner */}
      {!cookieAccepted && (
        <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 transition-all duration-500 ${
          theme === "dark"
            ? "bg-[#0a0c12]/95 backdrop-blur-xl border-t border-[#d4af37]/15"
            : "bg-white/95 backdrop-blur-xl border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
        }`} style={{ animation: 'slideUpBanner 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <span className="text-2xl mt-0.5">🍪</span>
              <div>
                <p className={`font-serif text-sm font-bold mb-1 transition-colors duration-300 ${
                  theme === "dark" ? "text-[#f3e5ab]" : "text-[#6b4f1d]"
                }`}>We value your privacy</p>
                <p className={`font-sans text-xs leading-relaxed transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400" : "text-stone-500"
                }`}>
                  This website uses cookies to improve user experience. By using our website you consent to all cookies in accordance with our{" "}
                  <a href="/privacy" className={`underline font-semibold transition-colors duration-300 ${
                    theme === "dark" ? "text-[#d4af37] hover:text-[#f3e5ab]" : "text-[#aa7c11] hover:text-[#6b4f1d]"
                  }`}>Privacy Policy</a>.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAcceptCookies}
                className={`cursor-pointer px-6 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black hover:shadow-[0_0_16px_rgba(212,175,55,0.3)] hover:scale-105"
                    : "bg-gradient-to-r from-[#aa7c11] to-[#d4af37] text-black hover:shadow-[0_4px_12px_rgba(170,124,17,0.25)] hover:scale-105"
                } active:scale-95`}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUpBanner {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
    </HelmetProvider>
  );
}
