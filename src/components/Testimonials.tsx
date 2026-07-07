import React, { useState, useCallback, useEffect } from "react";
import { t } from "../utils/translations";
import { Star, Quote, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { TestimonialsColumn, Testimonial } from "./ui/testimonials-columns-1";
import { Sparkles } from "./ui/sparkles";
import { InfiniteSlider } from "./ui/infinite-slider";
import { ProgressiveBlur } from "./ui/progressive-blur";
import { GradientBackground } from "./ui/gradient-background-4";
import { ScrollReveal } from "./ui/scroll-reveal";
import { developerLogos } from "../assets/developer-logos";

interface TestimonialsProps {
  theme: "light" | "dark";
}

export default function Testimonials({ theme }: TestimonialsProps) {
  const [activeDevIndex, setActiveDevIndex] = useState(0);
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

  const developers = [
    { name: "EMAAR", tagline: "Shaping Dubai's Skyline", logo: "https://companieslogo.com/img/emaar-properties/logo-e9236da7.png" },
    { name: "DAMAC", tagline: "Luxury Residences", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Damac_logo.svg/512px-Damac_logo.svg.png" },
    { name: "SOBHA", tagline: "Realty Redefined", logo: developerLogos.shobha },
    { name: "NAKHEEL", tagline: "Waterfront Living Creator", logo: "https://companieslogo.com/img/nakheel/logo-f2c9ec22.png" },
    { name: "ELLINGTON", tagline: "Bespoke Design Houses", logo: "https://companieslogo.com/img/ellington-properties/logo-e14b8c58.png" },
    { name: "MERAAS", tagline: "Iconic Urban Hubs", logo: "https://companieslogo.com/img/meraas/logo-c3e1e7ab.png" },
    { name: "BINGHATTI", tagline: "Aerodynamic Luxury", logo: developerLogos.binghatti },
    { name: "OMNIYAT", tagline: "Artistic Architecture", logo: "https://companieslogo.com/img/omniyat/logo-e5f6c2a3.png" },
    { name: "DANUBE", tagline: "Affordable Luxury", logo: developerLogos.danube },
    { name: "BNW", tagline: "Premium Developments", logo: developerLogos.bnw }
  ];

  const dubaiTestimonials: Testimonial[] = [
    {
      text: "City Global's real-time AI scoring and risk-audit models enabled our family office to secure prime Palm Jumeirah villas with complete tax-free yield assurance. Absolute game-changer.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
      name: "Bilal Ahmed",
      role: "Sovereign Wealth Advisor",
    },
    {
      text: "The transition to City Global was immaculate. Their instant predictive heatmaps on capital growth allowed us to expand our residential portfolio ahead of market spikes.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
      name: "Farhan Siddiqui",
      role: "Portfolio Director",
    },
    {
      text: "Securing my family's golden visa residency was handled seamlessly by their concierge. Outstanding personal brokerage matched with institutional-grade tech.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80",
      name: "Saman Malik",
      role: "Private Investor",
    },
    {
      text: "Their offline-first design and precise mortgage evaluation tools saved our team days of manual auditing. Extremely reliable systems and professional agents.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
      name: "Briana Patton",
      role: "Family Office Principal",
    },
    {
      text: "As an international investor, trust is everything. City Global's strict compliance with Dubai's RERA rules and verified escrow monitoring provided total peace of mind.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
      name: "Aliza Khan",
      role: "Lead Asset Manager",
    },
    {
      text: "The data integrity of their rental yield audit tool is outstanding. I have never seen a brokerage back up their projections with such clear, verifiable analytics.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80",
      name: "Michael Brown",
      role: "Capital Markets VP",
    },
    {
      text: "Their off-market luxury penthouses on Dubai Canal are second to none. We were able to negotiate and acquire premium units without any public noise.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      name: "Sarah Johnson",
      role: "UHNW Brokerage Partner",
    },
    {
      text: "State-of-the-art interactive map views combined with rapid advisory callbacks. The best digital real estate agency in the GCC, bar none.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80",
      name: "Ahmed Al Mansoori",
      role: "Downtown Portfolio Owner",
    },
    {
      text: "A highly cooperative partner that bridges tech-forward design with deep local Dubai knowledge. They are shaping the future of global real estate investment.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80",
      name: "Hassan Ali",
      role: "Luxury Property Developer",
    }
  ];

  const firstColumn = dubaiTestimonials.slice(0, 3);
  const secondColumn = dubaiTestimonials.slice(3, 6);
  const thirdColumn = dubaiTestimonials.slice(6, 9);

  const handleNextDev = useCallback(() => {
    setActiveDevIndex((prev) => (prev + 1) % developers.length);
  }, [developers.length]);

  const handlePrevDev = useCallback(() => {
    setActiveDevIndex((prev) => (prev - 1 + developers.length) % developers.length);
  }, [developers.length]);

  return (
    <section id="testimonials-section" className={`relative z-10 w-full py-16 overflow-hidden transition-colors duration-500 ${
      theme === "dark" ? "" : ""
    }`} style={{ contain: "layout style" }}>
      <GradientBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      
      {/* 1. Our Trusted Developers Slider Row */}
      <ScrollReveal>
      <div className="mb-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-bold mb-3">{t("test.partners", lang)}</p>
          <h3 className={`font-serif text-3xl sm:text-4xl font-bold tracking-wide mb-4 transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-stone-900"
          }`}>{t("test.trustedDevs", lang)}</h3>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className={`h-px w-16 ${theme === "dark" ? "bg-gradient-to-r from-transparent to-[#d4af37]/50" : "bg-gradient-to-r from-transparent to-[#aa7c11]/50"}`} />
            <div className="w-2 h-2 rotate-45 bg-[#d4af37]" />
            <div className={`h-px w-16 ${theme === "dark" ? "bg-gradient-to-l from-transparent to-[#d4af37]/50" : "bg-gradient-to-l from-transparent to-[#aa7c11]/50"}`} />
          </div>
          <p className={`font-sans text-xs max-w-md mx-auto ${theme === "dark" ? "text-gray-500" : "text-stone-400"}`}>
            {t("test.partnersDesc", lang)}
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={handlePrevDev}
            className={`cursor-pointer w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              theme === "dark"
                ? "border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10 hover:border-[#d4af37]"
                : "border-[#aa7c11]/30 text-[#aa7c11] hover:bg-[#aa7c11]/10 hover:border-[#aa7c11]"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextDev}
            className={`cursor-pointer w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              theme === "dark"
                ? "border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10 hover:border-[#d4af37]"
                : "border-[#aa7c11]/30 text-[#aa7c11] hover:bg-[#aa7c11]/10 hover:border-[#aa7c11]"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Developers Logos horizontal carousel */}
        <div className="relative w-full overflow-hidden py-4" style={{ contain: "layout style" }}>
          <InfiniteSlider 
            className="flex h-full w-full items-center" 
            duration={25}
            gap={24}
          >
            {developers.map((dev, idx) => (
              <div
                key={`${dev.name}-${idx}`}
                onClick={() => setActiveDevIndex(idx)}
                className={`cursor-pointer group px-8 py-6 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 h-36 w-64 shrink-0 ${
                  idx === activeDevIndex 
                    ? `border-2 border-[#d4af37] ${
                        theme === "dark"
                          ? "bg-gradient-to-b from-[#1a1708] to-[#0d0b04] shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                          : "bg-gradient-to-b from-[#fdf8ef] to-white shadow-[0_8px_30px_rgba(170,124,17,0.12)]"
                      }`
                    : `border ${
                        theme === "dark"
                          ? "border-white/10 bg-white/5 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)]"
                          : "border-stone-200 bg-white hover:border-[#aa7c11]/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                      }`
                }`}
              >
                <img
                  src={dev.logo}
                  alt={`${dev.name} logo`}
                  className={`h-16 w-auto object-contain transition-all duration-500 ${
                    theme === "dark" ? "brightness-0 invert" : ""
                  } ${
                    idx === activeDevIndex
                      ? "opacity-100 scale-110"
                      : "opacity-60 group-hover:opacity-90 group-hover:scale-105"
                  }`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className={`hidden font-serif text-sm font-bold tracking-[0.2em] transition-colors duration-300 ${
                  theme === "dark" ? "text-[#f3e5ab]" : "text-[#aa7c11]"
                }`}>{dev.name}</span>
              </div>
            ))}
          </InfiniteSlider>

          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[120px] z-10"
            direction="left"
            blurLayers={3}
            blurIntensity={0.5}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[120px] z-10"
            direction="right"
            blurLayers={3}
            blurIntensity={0.5}
          />
        </div>

        {/* Sparkles Ambient luxury curve section under the slider */}
        <div className="relative mt-4 h-48 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#d4af37,transparent_75%)] before:opacity-15 pointer-events-none" />
          <div className={`absolute -left-1/2 top-1/2 aspect-[1/0.7] z-0 w-[200%] rounded-[100%] border-t ${
            theme === "dark" 
              ? "border-zinc-800/20 bg-[#07080a]" 
              : "border-stone-200 bg-stone-50"
          }`} />
          <Sparkles
            density={50}
            className="absolute inset-x-0 bottom-0 h-full w-full pointer-events-none z-10 [mask-image:radial-gradient(50%_50%,white,transparent_80%)]"
            color={theme === "dark" ? "#d4af37" : "#aa7c11"}
          />
        </div>
      </div>
      </ScrollReveal>

      {/* 2. What Our Clients Say Grid Section */}
      <ScrollReveal delay={0.2}>
      <div>
        <div className="text-left mb-10">
          <p className="font-sans text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold mb-1">{t("test.endorsements", lang)}</p>
          <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-wide transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-stone-900"
          }`}>{t("test.title", lang)}</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
          
          {/* Google Reviews Card Summarizer (matching layout exactly) */}
          <div className={`lg:col-span-1 p-6 rounded-lg border shadow-xl flex flex-col justify-between text-left transition-colors duration-300 ${
            theme === "dark" 
              ? "glass border-[#d4af37]/20 bg-[#121110]" 
              : "bg-white border-[#aa7c11]/20 shadow-sm"
          }`}>
            <div>
              <p className={`font-sans text-[10px] uppercase tracking-wider font-semibold mb-1 transition-colors duration-300 ${
                theme === "dark" ? "text-gray-400" : "text-stone-500"
              }`}>{t("test.auditScore", lang)}</p>
              <h4 className={`font-serif text-base font-bold tracking-wide mb-3 transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-stone-900"
              }`}>{t("test.googleReviews", lang)}</h4>
              
              <div className="flex items-baseline gap-2 mt-4 mb-1">
                <span className={`font-num text-4xl font-extrabold transition-colors duration-300 ${
                  theme === "dark" ? "text-[#f3e5ab]" : "text-[#aa7c11]"
                }`}>4.9</span>
                <span className={`text-xs transition-colors duration-300 ${theme === "dark" ? "text-gray-500" : "text-stone-400"}`}>/ 5.0</span>
              </div>

              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 text-[#d4af37] fill-[#d4af37]" />
                ))}
              </div>

              <p className={`font-sans text-[11px] transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-stone-600"}`}>{t("test.basedOn", lang)}</p>
            </div>

            {/* Overlapping small faces representing reviewers */}
            <div className={`flex items-center justify-between pt-4 mt-6 transition-colors duration-300`}>
              <div className="flex -space-x-2.5 overflow-hidden">
                <img loading="lazy" className={`inline-block h-7 w-7 rounded-full ring-2 ${theme === "dark" ? "ring-[#0c0d14]" : "ring-white"}`} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80" alt="" referrerPolicy="no-referrer" />
                <img loading="lazy" className={`inline-block h-7 w-7 rounded-full ring-2 ${theme === "dark" ? "ring-[#0c0d14]" : "ring-white"}`} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80" alt="" referrerPolicy="no-referrer" />
                <img loading="lazy" className={`inline-block h-7 w-7 rounded-full ring-2 ${theme === "dark" ? "ring-[#0c0d14]" : "ring-white"}`} src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64&q=80" alt="" referrerPolicy="no-referrer" />
                <img loading="lazy" className={`inline-block h-7 w-7 rounded-full ring-2 ${theme === "dark" ? "ring-[#0c0d14]" : "ring-white"}`} src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=64&h=64&q=80" alt="" referrerPolicy="no-referrer" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-sans font-semibold uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t("test.verifiedReviews", lang)}</span>
              </div>
            </div>

          </div>

          {/* Animated scrolling testimonials (spans 3 columns on large screens) */}
          <div className="lg:col-span-3 overflow-hidden relative max-h-[520px] rounded-lg border border-transparent" style={{ contain: "layout style" }}>
            {/* Ambient gold/fading gradient overlays to hide clipping top and bottom */}
            <div className={`absolute top-0 left-0 right-0 h-16 z-20 pointer-events-none transition-colors duration-500 ${
              theme === "dark" 
                ? "bg-gradient-to-b from-[#07080a] to-transparent" 
                : "bg-gradient-to-b from-[#fcfbf9] to-transparent"
            }`} />
            
            <div className={`absolute bottom-0 left-0 right-0 h-16 z-20 pointer-events-none transition-colors duration-500 ${
              theme === "dark" 
                ? "bg-gradient-to-t from-[#07080a] to-transparent" 
                : "bg-gradient-to-t from-[#fcfbf9] to-transparent"
            }`} />

            <div className="flex justify-center gap-6">
              <TestimonialsColumn testimonials={firstColumn} duration={35} className="w-full max-w-xs" />
              <TestimonialsColumn testimonials={secondColumn} className="hidden md:block w-full max-w-xs" duration={42} />
              <TestimonialsColumn testimonials={thirdColumn} className="hidden xl:block w-full max-w-xs" duration={38} />
            </div>
          </div>

        </div>
      </div>
      </ScrollReveal>
      </div>

    </section>
  );
}
