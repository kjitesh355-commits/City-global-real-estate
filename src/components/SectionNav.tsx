import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  BarChart3,
  Briefcase,
  Building,
  Map,
  TrendingUp,
  Calculator,
  MessageSquare,
  Shield,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SectionNavProps {
  theme: "light" | "dark";
}

const sections = [
  { id: "home", label: "Home", icon: Home },
  { id: "stats-section", label: "Stats", icon: BarChart3 },
  { id: "services-section", label: "Services", icon: Briefcase },
  { id: "featured-properties", label: "Properties", icon: Building },
  { id: "explore-section", label: "Explore", icon: Map },
  { id: "investment-section", label: "Investment", icon: TrendingUp },
  { id: "calculators-section", label: "Calculators", icon: Calculator },
  { id: "testimonials-section", label: "Testimonials", icon: MessageSquare },
  { id: "why-section", label: "Why Us", icon: Shield },
  { id: "globe-section", label: "Global", icon: Globe },
];

export default function SectionNav({ theme }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);

      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`cursor-pointer flex items-center justify-center w-6 h-12 rounded-l-lg transition-all duration-300 ${
              theme === "dark"
                ? "bg-[#0e1015]/90 border border-white/10 border-r-0 text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37]/30"
                : "bg-white/90 border border-stone-200 border-r-0 text-stone-500 hover:text-[#aa7c11] hover:border-[#aa7c11]/30"
            } backdrop-blur-md shadow-lg`}
          >
            {isExpanded ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronLeft className="w-3 h-3" />
            )}
          </button>

          {/* Navigation Panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`overflow-hidden backdrop-blur-md rounded-l-xl border shadow-2xl ${
                  theme === "dark"
                    ? "bg-[#0e1015]/95 border-white/10"
                    : "bg-white/95 border-stone-200"
                }`}
              >
                <div className="p-3 flex flex-col gap-1 min-w-[160px]">
                  <p
                    className={`font-sans text-[9px] uppercase tracking-[0.2em] font-bold mb-2 px-2 ${
                      theme === "dark" ? "text-[#d4af37]" : "text-[#aa7c11]"
                    }`}
                  >
                    Sections
                  </p>
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollTo(section.id)}
                        className={`cursor-pointer flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-200 group ${
                          isActive
                            ? theme === "dark"
                              ? "bg-[#d4af37]/10 text-[#f3e5ab] border border-[#d4af37]/20"
                              : "bg-[#aa7c11]/10 text-[#6b4f1d] border border-[#aa7c11]/20"
                            : theme === "dark"
                            ? "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                            : "text-stone-500 hover:text-stone-900 hover:bg-stone-50 border border-transparent"
                        }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 flex-shrink-0 transition-colors duration-200 ${
                            isActive
                              ? theme === "dark"
                                ? "text-[#d4af37]"
                                : "text-[#aa7c11]"
                              : ""
                          }`}
                        />
                        <span className="font-sans text-[10px] uppercase tracking-wider font-medium whitespace-nowrap">
                          {section.label}
                        </span>
                        {isActive && (
                          <div
                            className={`ml-auto w-1.5 h-1.5 rounded-full animate-pulse ${
                              theme === "dark" ? "bg-[#d4af37]" : "bg-[#aa7c11]"
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed Dots */}
          {!isExpanded && (
            <div
              className={`flex flex-col gap-2 py-3 px-1.5 rounded-l-lg ${
                theme === "dark"
                  ? "bg-[#0e1015]/90 border border-white/10 border-r-0"
                  : "bg-white/90 border border-stone-200 border-r-0"
              } backdrop-blur-md shadow-lg`}
            >
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`cursor-pointer w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? theme === "dark"
                          ? "bg-[#d4af37] scale-125 shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                          : "bg-[#aa7c11] scale-125 shadow-[0_0_8px_rgba(170,124,17,0.4)]"
                        : theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-500"
                        : "bg-stone-300 hover:bg-stone-500"
                    }`}
                    title={section.label}
                  />
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
