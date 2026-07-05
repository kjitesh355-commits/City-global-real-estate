import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Building2, Building, Home, ArrowRight } from "lucide-react";
import { GradientBackground } from "./ui/gradient-background-4";
import { ScrollReveal } from "./ui/scroll-reveal";

interface OurServicesProps {
  theme: "light" | "dark";
}

const services = [
  {
    icon: Building2,
    title: "Off Plan Projects",
    description:
      "Discover premium off-plan developments from Dubai's leading developers with expert investment guidance and flexible payment plans.",
    button: "Explore Projects",
    featured: false,
  },
  {
    icon: Building,
    title: "Secondary Property",
    description:
      "Buy and invest in ready properties across Dubai with verified listings, transparent pricing, and professional advisory support.",
    button: "View Properties",
    featured: true,
  },
  {
    icon: Home,
    title: "Rental Properties",
    description:
      "Find luxury apartments, villas, and commercial spaces that perfectly match your lifestyle and investment requirements.",
    button: "Find Rentals",
    featured: false,
  },
];

function RippleButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [ripples, setRipples] = useState<
    { x: number; y: number; size: number; key: number }[]
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    const key = Date.now();

    setRipples((prev) => [...prev, { x, y, size, key }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.key !== key));
    }, 600);

    props.onClick?.(e);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          className="absolute rounded-full bg-white/20 pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            animation: "ripple-expand 0.6s ease-out forwards",
          }}
        />
      ))}
      {children}
    </button>
  );
}

export default function OurServices({ theme }: OurServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <>
      <style>{`
        @keyframes ripple-expand {
          0% { transform: scale(0); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`relative z-10 w-full overflow-hidden transition-colors duration-500 ${
          theme === "dark" ? "bg-[#07080a]" : "bg-[#FAFAFA]"
        }`}
        aria-label="Our Services"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute inset-0 ${
              theme === "dark"
                ? "bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.04)_0%,_transparent_60%)]"
                : "bg-[radial-gradient(ellipse_at_top_right,_rgba(10,31,90,0.025)_0%,_transparent_60%)]"
            }`}
          />

          {/* Blurred gold orb */}
          <div
            className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[140px] ${
              theme === "dark"
                ? "bg-[#d4af37]/[0.05]"
                : "bg-[#071B63]/[0.03]"
            }`}
          />

          {/* Floating geometric shapes */}
          <div
            className={`absolute top-20 left-[10%] w-4 h-4 border rotate-45 ${
              theme === "dark"
                ? "border-[#d4af37]/[0.08]"
                : "border-[#071B63]/[0.06]"
            }`}
            style={{ animation: "float-slow 8s ease-in-out infinite" }}
          />
          <div
            className={`absolute bottom-32 right-[15%] w-6 h-6 border rounded-full ${
              theme === "dark"
                ? "border-[#d4af37]/[0.06]"
                : "border-[#071B63]/[0.04]"
            }`}
            style={{ animation: "float-slow 10s ease-in-out infinite 2s" }}
          />
          <div
            className={`absolute top-1/2 left-[5%] w-3 h-3 border ${
              theme === "dark"
                ? "border-[#d4af37]/[0.07]"
                : "border-[#071B63]/[0.05]"
            }`}
            style={{ animation: "float-slow 7s ease-in-out infinite 1s" }}
          />

          {/* Abstract lines */}
          <svg
            className={`absolute inset-0 w-full h-full ${
              theme === "dark" ? "opacity-[0.015]" : "opacity-[0.02]"
            }`}
          >
            <line
              x1="20%"
              y1="0"
              x2="80%"
              y2="100%"
              stroke={theme === "dark" ? "#d4af37" : "#071B63"}
              strokeWidth="0.5"
            />
            <line
              x1="80%"
              y1="0"
              x2="20%"
              y2="100%"
              stroke={theme === "dark" ? "#d4af37" : "#071B63"}
              strokeWidth="0.5"
            />
          </svg>
        </div>

        <GradientBackground />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-28 md:py-36">
          {/* Header */}
          <div className="text-center mb-20 md:mb-28">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold mb-4 ${
                theme === "dark" ? "text-[#d4af37]" : "text-[#071B63]"
              }`}
            >
              Our Services
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
              className={`font-serif text-[30px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-wide mb-6 ${
                theme === "dark" ? "text-white" : "text-[#071B63]"
              }`}
            >
              What We Do?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className={`font-sans text-base md:text-lg leading-[1.7] max-w-[700px] mx-auto ${
                theme === "dark" ? "text-gray-400" : "text-stone-500"
              }`}
            >
              Providing comprehensive real estate solutions tailored for
              investors, homeowners, and tenants across the UAE.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + index * 0.15,
                    ease: "easeOut",
                  }}
                  tabIndex={0}
                  role="article"
                  aria-label={service.title}
                  className={`group relative rounded-[24px] p-10 flex flex-col transition-all duration-[400ms] ease-out outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 ${
                    service.featured
                      ? theme === "dark"
                        ? "bg-gradient-to-br from-[#0c0d14] via-[#0e1225] to-[#0c0d14] border border-[#d4af37]/30 shadow-xl hover:-translate-y-[15px] hover:border-[#d4af37]/60 hover:shadow-[0_25px_70px_-15px_rgba(212,175,55,0.15)]"
                        : "bg-gradient-to-br from-white via-[#f8f7f4] to-white border border-[#071B63]/10 shadow-xl hover:-translate-y-[15px] hover:border-[#d4af37]/50 hover:shadow-[0_25px_70px_-15px_rgba(10,31,90,0.12)]"
                      : theme === "dark"
                      ? "bg-[#0c0d14] border border-gray-900/60 shadow-xl hover:-translate-y-[15px] hover:border-[#d4af37]/50 hover:shadow-[0_25px_70px_-15px_rgba(212,175,55,0.12)]"
                      : "bg-white border border-stone-200 shadow-xl hover:-translate-y-[15px] hover:border-[#d4af37]/50 hover:shadow-[0_25px_70px_-15px_rgba(10,31,90,0.1)]"
                  }`}
                >
                  {/* Popular Badge */}
                  {service.featured && (
                    <div className="absolute top-6 right-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[10px] font-sans font-bold uppercase tracking-wider text-[#d4af37]">
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-8">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-[400ms] ease-out ${
                        service.featured
                          ? theme === "dark"
                            ? "bg-[#d4af37]/15 group-hover:bg-[#071B63]"
                            : "bg-[#071B63]/8 group-hover:bg-[#071B63]"
                          : theme === "dark"
                          ? "bg-[#d4af37]/10 group-hover:bg-[#071B63]"
                          : "bg-[#071B63]/5 group-hover:bg-[#071B63]"
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
                        className="group-hover:scale-110 transition-transform duration-[400ms]"
                      >
                        <Icon
                          className={`w-7 h-7 transition-colors duration-[400ms] ease-out ${
                            service.featured
                              ? theme === "dark"
                                ? "text-[#d4af37] group-hover:text-white"
                                : "text-[#071B63] group-hover:text-white"
                              : theme === "dark"
                              ? "text-[#d4af37] group-hover:text-white"
                              : "text-[#071B63] group-hover:text-white"
                          }`}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-serif text-[26px] md:text-[34px] font-bold tracking-wide mb-5 transition-colors duration-[400ms] ease-out ${
                      theme === "dark"
                        ? "text-white group-hover:text-[#d4af37]"
                        : "text-[#071B63] group-hover:text-[#d4af37]"
                    }`}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`font-sans text-base md:text-lg leading-[1.7] mb-10 flex-1 transition-colors duration-[400ms] ease-out ${
                      theme === "dark"
                        ? "text-gray-400 group-hover:text-gray-300"
                        : "text-stone-500 group-hover:text-stone-600"
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* Button */}
                  <RippleButton
                    className={`cursor-pointer w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[14px] font-sans text-sm font-semibold uppercase tracking-wider transition-all duration-[400ms] ease-out ${
                      service.featured
                        ? theme === "dark"
                          ? "bg-[#d4af37] text-black border border-[#d4af37] hover:bg-[#071B63] hover:text-white hover:border-[#071B63]"
                          : "bg-[#071B63] text-white border border-[#071B63] hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37]"
                        : theme === "dark"
                        ? "bg-transparent text-[#d4af37] border border-gray-800 hover:bg-[#071B63] hover:text-white hover:border-[#071B63]"
                        : "bg-transparent text-[#071B63] border border-stone-200 hover:bg-[#071B63] hover:text-white hover:border-[#071B63]"
                    }`}
                  >
                    {service.button}
                    <ArrowRight className="w-4 h-4 transition-transform duration-[400ms] ease-out group-hover:translate-x-1" />
                  </RippleButton>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] transition-all duration-[400ms] ease-out group-hover:w-3/4 ${
                      service.featured
                        ? "bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
                        : "bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
                    }`}
                  />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
