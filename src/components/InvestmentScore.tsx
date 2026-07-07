import React, { useState, useEffect, useRef } from "react";
import { Shield, TrendingUp, ArrowUpRight, BarChart3, Lock } from "lucide-react";
import { Property } from "../types";
import { t } from "../utils/translations";
import { GradientBackground } from "./ui/gradient-background-4";
import { ScrollReveal, SlideIn, StaggerContainer, StaggerItem } from "./ui/scroll-reveal";
import { motion, useInView } from "motion/react";

interface InvestmentScoreProps {
  properties: Property[];
  theme: "light" | "dark";
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Number((eased * value).toFixed(1)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function InvestmentScore({ properties, theme }: InvestmentScoreProps) {
  const isDark = theme === "dark";
  const [selectedPropId, setSelectedPropId] = useState<string>("frond-g-villa");
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

  const fallbackProperty: Property = {
    id: "loading",
    name: "Loading...",
    area: "Dubai",
    price: 0,
    beds: 0,
    baths: 0,
    size: 0,
    imageUrl: "",
    developer: "City Global",
    rentalYield: 0,
    appreciation: 0,
    capitalGrowth: 0,
    risk: "Low Risk",
    completion: "Ready",
    description: "",
    coordinates: { x: 0, y: 0 },
  };

  const activeProp = properties.find((p) => p.id === selectedPropId) || properties[0] || fallbackProperty;
  const score = Math.round(activeProp.rentalYield * 5 + activeProp.appreciation * 4.5 + 8);

  const radius = 54;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const metrics = [
    {
      icon: TrendingUp,
      label: t("score.rentalYield", lang),
      value: activeProp.rentalYield,
      suffix: "%",
      badge: t("score.high", lang),
      badgeColor: "emerald",
      gradient: "from-emerald-500/20 to-emerald-600/5",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      sparkPath: "M0,35 Q15,30 30,15 T60,10 T90,5 L100,5",
    },
    {
      icon: ArrowUpRight,
      label: t("score.appreciation", lang),
      value: activeProp.appreciation,
      suffix: "%",
      badge: t("score.veryHigh", lang),
      badgeColor: "emerald",
      gradient: "from-emerald-500/20 to-emerald-600/5",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      sparkPath: "M0,38 Q10,30 30,32 T50,15 T80,8 L100,2",
    },
    {
      icon: BarChart3,
      label: t("score.capitalGrowth", lang),
      value: activeProp.capitalGrowth,
      suffix: "%",
      badge: t("score.veryHigh", lang),
      badgeColor: "emerald",
      gradient: "from-emerald-500/20 to-emerald-600/5",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      sparkPath: "M0,35 Q20,38 40,25 T70,12 T90,5 L100,1",
    },
    {
      icon: Shield,
      label: t("score.riskLevel", lang),
      value: 0,
      suffix: "",
      badge: t("score.verySafe", lang),
      badgeColor: "gold",
      gradient: "from-[#C9A227]/20 to-[#C9A227]/5",
      iconBg: "bg-[#C9A227]/10",
      iconColor: "text-[#C9A227]",
      sparkPath: "",
      isRisk: true,
      riskText: activeProp.risk,
    },
  ];

  return (
    <section
      id="investment-section"
      className="relative z-10 w-full py-20 md:py-28 overflow-hidden"
    >
      <GradientBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-[#1c1917]"}`}>
              {t("score.title", lang)}
            </h2>
            <p className={`text-sm max-w-xl mx-auto leading-relaxed ${isDark ? "text-gray-400" : "text-stone-500"}`}>
              {t("score.desc", lang)}
            </p>
          </div>
        </ScrollReveal>

        {/* Property Selector */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center mb-12">
            <div className={`inline-flex items-center gap-4 p-2 rounded-2xl ${isDark ? "border-white/10 bg-white/5" : "border-stone-200/60 bg-stone-50"} border`}>
              <span className={`text-xs px-3 ${isDark ? "text-gray-400" : "text-stone-500"}`}>{t("score.analyzing", lang)}</span>
              <select
                value={selectedPropId}
                onChange={(e) => setSelectedPropId(e.target.value)}
                className={`bg-transparent border-none font-serif text-sm font-bold focus:outline-none cursor-pointer pr-6 ${isDark ? "text-white" : "text-[#1c1917]"}`}
              >
                {properties.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                    className={isDark ? "bg-[#121216] text-white" : "bg-white text-stone-900"}
                  >
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gauge Card */}
          <SlideIn from="left" className="lg:col-span-5">
            <div className={`rounded-3xl p-8 md:p-10 text-center ${isDark ? "border-white/10 bg-white/5" : "border-stone-200/60 bg-white/80 shadow-sm"} border`}>
              <div className="relative z-10">
                <p className={`text-xs mb-8 ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("score.investmentScore", lang)}</p>

                {/* Circular Gauge */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={radius} stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} strokeWidth={strokeWidth} fill="transparent" />
                    <circle
                      cx="60" cy="60" r={radius} stroke="url(#scoreGradient)" strokeWidth={strokeWidth} fill="transparent"
                      strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C9A227" />
                        <stop offset="50%" stopColor="#E7C96A" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center ${isDark ? "bg-white/[0.03] border-white/10" : "bg-stone-50 border-stone-200/60"} border`}>
                      <span className="font-mono text-4xl font-extrabold text-[#E7C96A] leading-none">{score}</span>
                      <span className={`text-[10px] mt-1 ${isDark ? "text-gray-500" : "text-stone-400"}`}>/ 100</span>
                    </div>
                  </div>
                </div>

                {/* Score Label */}
                <p className={`text-xs mb-6 ${isDark ? "text-gray-400" : "text-stone-500"}`}>{score >= 80 ? t("score.excellent", lang) : score >= 60 ? t("score.good", lang) : t("score.average", lang)} {t("score.investment", lang)}</p>

                {/* Property Info */}
                <div className="pt-4 border-t border-white/5">
                  <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-[#1c1917]"}`}>{activeProp.name}</h3>
                  <p className={`text-xs ${isDark ? "text-gray-500" : "text-stone-400"}`}>{activeProp.area} — {activeProp.developer}</p>
                </div>
              </div>
            </div>
          </SlideIn>

          {/* Metrics Grid */}
          <div className="lg:col-span-7">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.1}>
              {metrics.map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <StaggerItem key={metric.label}>
                    <div className={`rounded-2xl p-6 transition-colors duration-300 ${isDark ? "border-white/10 bg-white/5" : "border-stone-200/60 bg-white/80 shadow-sm"} border`}>
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-5">
                          <div className={`w-10 h-10 rounded-xl ${metric.iconBg} flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${metric.iconColor}`} />
                          </div>
                          <span className={`text-xs font-semibold ${
                            metric.badgeColor === "gold" ? "text-[#E7C96A]" : "text-emerald-400"
                          }`}>
                            {metric.badge}
                          </span>
                        </div>

                        {/* Label & Value */}
                        <div className="mb-4">
                          <p className={`text-xs mb-1 ${isDark ? "text-gray-500" : "text-stone-400"}`}>{metric.label}</p>
                          {metric.isRisk ? (
                            <h4 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#1c1917]"}`}>{metric.riskText}</h4>
                          ) : (
                            <h4 className={`font-mono text-2xl font-bold ${isDark ? "text-white" : "text-[#1c1917]"}`}>
                              <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                            </h4>
                          )}
                        </div>

                        {/* Sparkline or Shield */}
                        {metric.isRisk ? (
                          <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? "bg-white/[0.03]" : "bg-stone-50 border-stone-200/60 border"}`}>
                            <Lock className="w-5 h-5 text-[#C9A227]" />
                            <div>
                              <p className="text-xs text-[#E7C96A] font-semibold">{t("score.reraMonitored", lang)}</p>
                              <p className={`text-[10px] ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("score.escrowProtection", lang)}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="h-12 w-full">
                            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id={`sparkGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id={`sparkLine-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                                  <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                              </defs>
                              <path d={metric.sparkPath + " L100,40 L0,40 Z"} fill={`url(#sparkGrad-${i})`} />
                              <path d={metric.sparkPath} fill="none" stroke={`url(#sparkLine-${i})`} strokeWidth="2" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Bottom Info Bar */}
            <ScrollReveal delay={0.3}>
              <div className={`mt-4 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 ${isDark ? "bg-white/[0.02] border-white/5" : "bg-stone-50/80 border-stone-200/60"} border`}>
                <p className={`text-xs ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                  {t("score.scoresUpdated", lang)}
                </p>
                <a href="#how" className="text-xs text-[#C9A227] hover:text-[#E7C96A] transition-colors">
                  {t("score.howItWorks", lang)}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
