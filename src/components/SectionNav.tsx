import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
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
  Compass,
} from "lucide-react";

interface SectionNavProps {
  theme: "light" | "dark";
}

const sections = [
  { id: "home", label: "Home", sublabel: "Welcome", icon: Home },
  { id: "stats-section", label: "Stats", sublabel: "Numbers", icon: BarChart3 },
  { id: "services-section", label: "Services", sublabel: "What We Offer", icon: Briefcase },
  { id: "featured-properties", label: "Properties", sublabel: "Featured", icon: Building },
  { id: "explore-section", label: "Explore", sublabel: "Discover", icon: Map },
  { id: "investment-section", label: "Investment", sublabel: "ROI", icon: TrendingUp },
  { id: "calculators-section", label: "Calculators", sublabel: "Tools", icon: Calculator },
  { id: "testimonials-section", label: "Testimonials", sublabel: "Reviews", icon: MessageSquare },
  { id: "why-section", label: "Why Us", sublabel: "Benefits", icon: Shield },
  { id: "globe-section", label: "Global", sublabel: "Worldwide", icon: Globe },
];

export default function SectionNav({ theme }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const [clickRipple, setClickRipple] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  const activeIndex = useMemo(() => sections.findIndex((s) => s.id === activeSection), [activeSection]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => setScrollProgress(v));
    return unsubscribe;
  }, [scrollYProgress]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
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
    setClickRipple(id);
    setTimeout(() => setClickRipple(null), 600);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 30, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center"
        >
          {/* Collapsed: Vertical Dots + Progress Line */}
          {!isExpanded && (
            <div className="relative flex items-center">
              {/* Scroll Progress Bar */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-[2px] rounded-full top-3 bottom-3 ${
                  isDark ? "bg-white/5" : "bg-stone-200/50"
                }`}
              >
                <motion.div
                  className={`w-full rounded-full origin-top ${
                    isDark
                      ? "bg-gradient-to-b from-[#d4af37] via-[#f3e5ab] to-[#d4af37]"
                      : "bg-gradient-to-b from-[#aa7c11] via-[#d4af37] to-[#aa7c11]"
                  }`}
                  style={{ scaleY: scrollProgress, height: "100%" }}
                />
              </div>

              {/* Dots Container */}
              <div
                className={`relative flex flex-col items-center gap-0 py-4 px-1.5 rounded-2xl border ${
                  isDark
                    ? "bg-[#0a0c10]/80 border-white/[0.08]"
                    : "bg-white/80 border-stone-200/60"
                } backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]`}
              >
                {sections.map((section, idx) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  const isHovered = hoveredDot === section.id;
                  const isRippling = clickRipple === section.id;

                  return (
                    <div key={section.id} className="relative">
                      {/* Tooltip */}
                      <AnimatePresence>
                        {isHovered && !isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, x: 10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 10, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap z-50 pointer-events-none`}
                          >
                            <div
                              className={`px-3 py-1.5 rounded-lg border shadow-xl ${
                                isDark
                                  ? "bg-[#0a0c10]/95 border-[#d4af37]/20 text-white"
                                  : "bg-white/95 border-[#aa7c11]/20 text-stone-900"
                              } backdrop-blur-md`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-sans text-[10px] font-bold uppercase tracking-wider ${
                                    isDark ? "text-[#d4af37]" : "text-[#aa7c11]"
                                  }`}
                                >
                                  {section.label}
                                </span>
                                <span
                                  className={`font-sans text-[9px] ${
                                    isDark ? "text-gray-500" : "text-stone-400"
                                  }`}
                                >
                                  {section.sublabel}
                                </span>
                              </div>
                            </div>
                            {/* Arrow */}
                            <div
                              className={`absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 rotate-45 ${
                                isDark
                                  ? "bg-[#0a0c10]/95 border-r border-b border-[#d4af37]/20"
                                  : "bg-white/95 border-r border-b border-[#aa7c11]/20"
                              }`}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Dot Button */}
                      <button
                        onClick={() => scrollTo(section.id)}
                        onMouseEnter={() => setHoveredDot(section.id)}
                        onMouseLeave={() => setHoveredDot(null)}
                        className="cursor-pointer relative flex items-center justify-center w-8 h-8 group"
                      >
                        {/* Ripple Effect */}
                        <AnimatePresence>
                          {isRippling && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0.6 }}
                              animate={{ scale: 2.5, opacity: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.6 }}
                              className={`absolute w-4 h-4 rounded-full ${
                                isDark ? "bg-[#d4af37]" : "bg-[#aa7c11]"
                              }`}
                            />
                          )}
                        </AnimatePresence>

                        {/* Active Ring */}
                        {isActive && (
                          <motion.div
                            layoutId="activeRing"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className={`absolute w-6 h-6 rounded-full border-2 ${
                              isDark
                                ? "border-[#d4af37]/40"
                                : "border-[#aa7c11]/30"
                            }`}
                          />
                        )}

                        {/* Dot */}
                        <motion.div
                          animate={{
                            scale: isActive ? 1 : isHovered ? 1.3 : 0.7,
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className={`relative w-2 h-2 rounded-full transition-colors duration-300 ${
                            isActive
                              ? isDark
                                ? "bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                                : "bg-[#aa7c11] shadow-[0_0_12px_rgba(170,124,17,0.4)]"
                              : isHovered
                              ? isDark
                                ? "bg-gray-400"
                                : "bg-stone-500"
                              : isDark
                              ? "bg-gray-600"
                              : "bg-stone-300"
                          }`}
                        />

                        {/* Index Number */}
                        <span
                          className={`absolute -left-0.5 text-[8px] font-mono font-bold transition-opacity duration-200 ${
                            isActive
                              ? isDark
                                ? "text-[#d4af37]"
                                : "text-[#aa7c11]"
                              : isDark
                              ? "text-gray-700"
                              : "text-stone-300"
                          } ${isHovered ? "opacity-100" : "opacity-0"}`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Expand Toggle */}
              <button
                onClick={() => setIsExpanded(true)}
                className={`ml-1.5 flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 group ${
                  isDark
                    ? "bg-[#0a0c10]/80 border border-white/[0.08] text-gray-500 hover:text-[#d4af37] hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5"
                    : "bg-white/80 border border-stone-200/60 text-stone-400 hover:text-[#aa7c11] hover:border-[#aa7c11]/30 hover:bg-[#aa7c11]/5"
                } backdrop-blur-xl shadow-lg`}
              >
                <Compass className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
          )}

          {/* Expanded: Full Panel */}
          <AnimatePresence>
            {isExpanded && (
              <div className="relative flex items-center">
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`overflow-hidden rounded-2xl border shadow-[0_8px_40px_rgba(0,0,0,0.15)] ${
                    isDark
                      ? "bg-[#0a0c10]/90 border-white/[0.08]"
                      : "bg-white/90 border-stone-200/60"
                  } backdrop-blur-xl`}
                >
                  <div className="p-4 min-w-[200px]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-1 h-4 rounded-full ${
                            isDark
                              ? "bg-gradient-to-b from-[#d4af37] to-[#aa7c11]"
                              : "bg-gradient-to-b from-[#aa7c11] to-[#d4af37]"
                          }`}
                        />
                        <p
                          className={`font-sans text-[10px] uppercase tracking-[0.25em] font-bold ${
                            isDark ? "text-[#d4af37]" : "text-[#aa7c11]"
                          }`}
                        >
                          Navigation
                        </p>
                      </div>
                      <span
                        className={`font-mono text-[10px] ${
                          isDark ? "text-gray-600" : "text-stone-300"
                        }`}
                      >
                        {activeIndex + 1}/{sections.length}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div
                      className={`w-full h-[3px] rounded-full mb-4 ${
                        isDark ? "bg-white/5" : "bg-stone-100"
                      }`}
                    >
                      <motion.div
                        className={`h-full rounded-full ${
                          isDark
                            ? "bg-gradient-to-r from-[#d4af37] to-[#f3e5ab]"
                            : "bg-gradient-to-r from-[#aa7c11] to-[#d4af37]"
                        }`}
                        animate={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>

                    {/* Section Items */}
                    <div className="flex flex-col gap-0.5">
                      {sections.map((section, idx) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;
                        const isPast = idx < activeIndex;

                        return (
                          <motion.button
                            key={section.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03, duration: 0.3 }}
                            onClick={() => scrollTo(section.id)}
                            className={`cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${
                              isActive
                                ? isDark
                                  ? "bg-[#d4af37]/10"
                                  : "bg-[#aa7c11]/10"
                                : ""
                            }`}
                          >
                            {/* Active Background Glow */}
                            {isActive && (
                              <motion.div
                                layoutId="activeGlow"
                                className={`absolute inset-0 rounded-xl ${
                                  isDark
                                    ? "bg-gradient-to-r from-[#d4af37]/10 to-transparent"
                                    : "bg-gradient-to-r from-[#aa7c11]/10 to-transparent"
                                }`}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}

                            {/* Icon Container */}
                            <div
                              className={`relative flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300 ${
                                isActive
                                  ? isDark
                                    ? "bg-[#d4af37]/15 text-[#d4af37]"
                                    : "bg-[#aa7c11]/15 text-[#aa7c11]"
                                  : isPast
                                  ? isDark
                                    ? "bg-white/5 text-gray-500"
                                    : "bg-stone-100 text-stone-400"
                                  : isDark
                                  ? "bg-white/[0.03] text-gray-600 group-hover:text-gray-400"
                                  : "bg-stone-50 text-stone-400 group-hover:text-stone-600"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>

                            {/* Label */}
                            <div className="relative flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-sans text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                                    isActive
                                      ? isDark
                                        ? "text-[#f3e5ab]"
                                        : "text-[#6b4f1d]"
                                      : isDark
                                      ? "text-gray-400 group-hover:text-gray-200"
                                      : "text-stone-500 group-hover:text-stone-800"
                                  }`}
                                >
                                  {section.label}
                                </span>
                                {isActive && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`w-1 h-1 rounded-full ${
                                      isDark ? "bg-[#d4af37]" : "bg-[#aa7c11]"
                                    }`}
                                  />
                                )}
                              </div>
                              <span
                                className={`font-sans text-[9px] tracking-wide ${
                                  isDark ? "text-gray-600" : "text-stone-300"
                                }`}
                              >
                                {section.sublabel}
                              </span>
                            </div>

                            {/* Index */}
                            <span
                              className={`font-mono text-[9px] transition-colors duration-300 ${
                                isActive
                                  ? isDark
                                    ? "text-[#d4af37]"
                                    : "text-[#aa7c11]"
                                  : isDark
                                  ? "text-gray-700"
                                  : "text-stone-300"
                              }`}
                            >
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Footer */}
                    <div
                      className={`mt-4 pt-3 border-t flex items-center justify-between ${
                        isDark ? "border-white/5" : "border-stone-100"
                      }`}
                    >
                      <span
                        className={`font-sans text-[9px] tracking-wider ${
                          isDark ? "text-gray-600" : "text-stone-300"
                        }`}
                      >
                        SCROLL TO EXPLORE
                      </span>
                      <div className="flex gap-0.5">
                        {sections.map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 rounded-full transition-all duration-300 ${
                              i === activeIndex
                                ? isDark
                                  ? "bg-[#d4af37]"
                                  : "bg-[#aa7c11]"
                                : i < activeIndex
                                ? isDark
                                  ? "bg-[#d4af37]/30"
                                  : "bg-[#aa7c11]/30"
                                : isDark
                                ? "bg-white/5"
                                : "bg-stone-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Collapse Toggle */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className={`ml-1.5 flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 group ${
                    isDark
                      ? "bg-[#0a0c10]/80 border border-white/[0.08] text-gray-500 hover:text-[#d4af37] hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5"
                      : "bg-white/80 border border-stone-200/60 text-stone-400 hover:text-[#aa7c11] hover:border-[#aa7c11]/30 hover:bg-[#aa7c11]/5"
                  } backdrop-blur-xl shadow-lg`}
                >
                  <Compass className="w-3.5 h-3.5 -rotate-90 group-hover:rotate-0 transition-transform duration-500" />
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
