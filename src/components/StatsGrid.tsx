import React from "react";
import { Shield, Star, Users, Landmark, Home } from "lucide-react";
import { GradientBackground } from "./ui/gradient-background-4";
import { StaggerContainer, StaggerItem } from "./ui/scroll-reveal";

interface StatsGridProps {
  theme: "light" | "dark";
}

export default function StatsGrid({ theme }: StatsGridProps) {
  const stats = [
    {
      icon: <Landmark className="w-6 h-6 text-[#d4af37]" />,
      value: "10+",
      label: "Years Experience"
    },
    {
      icon: <Home className="w-6 h-6 text-[#d4af37]" />,
      value: "15,000+",
      label: "Properties Sold"
    },
    {
      icon: <Users className="w-6 h-6 text-[#d4af37]" />,
      value: "8,500+",
      label: "Happy Investors"
    },
    {
      isRating: true,
      icon: <Star className="w-6 h-6 text-[#d4af37] fill-[#d4af37]" />,
      value: "4.9",
      label: "Google Rating",
      stars: 5
    },
    {
      icon: <Shield className="w-6 h-6 text-[#d4af37]" />,
      value: "RERA",
      label: "Certified Agency"
    }
  ];

  return (
    <section className="relative z-10 w-full py-10 -mt-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      <GradientBackground />
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4" staggerDelay={0.08}>
        {stats.map((stat, i) => (
          <StaggerItem key={i}>
            <div
              className={`glass p-5 rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:border-[#d4af37]/40 hover:-translate-y-1 ${
                i === 4 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
            {/* Golden Icon Wrapper */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 ${
              theme === "dark" ? "bg-[#1c1d24]/50 border border-white/5" : "bg-white/90 border border-stone-200"
            }`}>
              {stat.icon}
            </div>

            {/* Stat Value */}
            <h4 className={`font-serif text-xl sm:text-2xl font-bold tracking-wider mb-1 transition-colors duration-300 ${
              theme === "dark" ? "text-[#f3e5ab]" : "text-[#aa7c11]"
            }`}>
              {stat.value}
            </h4>

            {/* Label */}
            <p className={`font-sans text-[10px] sm:text-xs uppercase tracking-widest transition-colors duration-300 ${
              theme === "dark" ? "text-gray-400" : "text-stone-500"
            }`}>
              {stat.label}
            </p>

            {/* Custom Google rating stars */}
            {stat.isRating && (
              <div className="flex items-center gap-0.5 mt-2">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
                ))}
              </div>
            )}
          </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
      </div>
    </section>
  );
}
