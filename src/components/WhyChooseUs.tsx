import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Award, Settings, Globe, TrendingUp } from "lucide-react";
import { GradientBackground } from "./ui/gradient-background-4";

interface WhyChooseUsProps {
  theme: "light" | "dark";
}

const features = [
  {
    icon: Award,
    title: "Market Expertise",
    description:
      "Extensive understanding of the UAE luxury and commercial property market, helping clients make informed investment decisions.",
  },
  {
    icon: Settings,
    title: "Tailored Service",
    description:
      "Personalized support throughout the buying and investment journey with complete transparency and professionalism.",
  },
  {
    icon: Globe,
    title: "Worldwide Connections",
    description:
      "Strong international investor network combined with deep knowledge of UAE real estate opportunities.",
  },
  {
    icon: TrendingUp,
    title: "Investment Strategy",
    description:
      "Data-driven investment advice focused on maximizing returns and long-term value.",
  },
];

export default function WhyChooseUs({ theme }: WhyChooseUsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className={`relative z-10 w-full overflow-hidden transition-colors duration-500 ${
        theme === "dark"
          ? "bg-[#07080a]"
          : "bg-[#FAFAFA]"
      }`}
      aria-label="Why Choose City Global Real Estate"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle radial gradient */}
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.03)_0%,_transparent_70%)]"
              : "bg-[radial-gradient(ellipse_at_center,_rgba(10,31,90,0.02)_0%,_transparent_70%)]"
          }`}
        />

        {/* Decorative abstract lines */}
        <svg
          className={`absolute inset-0 w-full h-full ${
            theme === "dark" ? "opacity-[0.02]" : "opacity-[0.03]"
          }`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="10%"
            y1="0"
            x2="90%"
            y2="100%"
            stroke={theme === "dark" ? "#d4af37" : "#0A1F5A"}
            strokeWidth="1"
          />
          <line
            x1="90%"
            y1="0"
            x2="10%"
            y2="100%"
            stroke={theme === "dark" ? "#d4af37" : "#0A1F5A"}
            strokeWidth="1"
          />
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke={theme === "dark" ? "#d4af37" : "#0A1F5A"}
            strokeWidth="0.5"
          />
        </svg>

        {/* Blurred gold gradient orb */}
        <div
          className={`absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[120px] ${
            theme === "dark"
              ? "bg-[#d4af37]/[0.06]"
              : "bg-[#0A1F5A]/[0.04]"
          }`}
        />

        {/* Minimal geometric pattern */}
        <div
          className={`absolute bottom-0 left-0 w-64 h-64 border rounded-full -translate-x-1/2 translate-y-1/2 ${
            theme === "dark"
              ? "border-[#d4af37]/[0.04]"
              : "border-[#0A1F5A]/[0.03]"
          }`}
        />
        <div
          className={`absolute top-0 right-0 w-48 h-48 border rounded-full translate-x-1/4 -translate-y-1/4 ${
            theme === "dark"
              ? "border-[#d4af37]/[0.03]"
              : "border-[#0A1F5A]/[0.02]"
          }`}
        />
      </div>

      <GradientBackground />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-24 md:py-32">
        {/* Header */}
        <div className="text-center mb-20 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold mb-4 ${
              theme === "dark" ? "text-[#d4af37]" : "text-[#0A1F5A]"
            }`}
          >
            Our Benefits
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className={`font-serif text-[30px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-wide ${
              theme === "dark" ? "text-white" : "text-[#0A1F5A]"
            }`}
          >
            Why Choose City Global
            <br />
            <span
              className={
                theme === "dark" ? "text-[#d4af37]" : "text-[#0A1F5A]/80"
              }
            >
              Real Estate?
            </span>
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + index * 0.15,
                  ease: "easeOut",
                }}
                tabIndex={0}
                role="article"
                aria-label={feature.title}
                className={`group relative rounded-[24px] p-10 text-center cursor-default transition-all duration-[400ms] ease-out outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 ${
                  theme === "dark"
                    ? "bg-[#0c0d14] border border-gray-900/60 shadow-xl hover:-translate-y-3 hover:border-[#d4af37]/50 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.12)]"
                    : "bg-white border border-stone-200 shadow-xl hover:-translate-y-3 hover:border-[#d4af37]/50 hover:shadow-[0_20px_60px_-15px_rgba(10,31,90,0.1)]"
                }`}
              >
                {/* Icon */}
                <div className="flex justify-center mb-7">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-[400ms] ease-out ${
                      theme === "dark"
                        ? "bg-[#d4af37]/10 group-hover:bg-[#0A1F5A]"
                        : "bg-[#0A1F5A]/5 group-hover:bg-[#0A1F5A]"
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0.8, rotate: 8 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: 0.5 + index * 0.15,
                        ease: "easeOut",
                      }}
                    >
                      <Icon
                        className={`w-7 h-7 transition-colors duration-[400ms] ease-out ${
                          theme === "dark"
                            ? "text-[#d4af37] group-hover:text-white"
                            : "text-[#0A1F5A] group-hover:text-white"
                        }`}
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`font-serif text-lg sm:text-xl font-bold tracking-wide mb-4 transition-colors duration-[400ms] ease-out ${
                    theme === "dark"
                      ? "text-white group-hover:text-[#d4af37]"
                      : "text-[#0A1F5A] group-hover:text-[#d4af37]"
                  }`}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className={`font-sans text-sm leading-[1.7] transition-colors duration-[400ms] ease-out ${
                    theme === "dark"
                      ? "text-gray-400 group-hover:text-gray-300"
                      : "text-stone-500 group-hover:text-stone-600"
                  }`}
                >
                  {feature.description}
                </p>

                {/* Hover gold accent line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent transition-all duration-[400ms] ease-out group-hover:w-3/4" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
