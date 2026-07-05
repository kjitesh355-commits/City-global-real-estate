import React, { useEffect, useRef, useState } from "react";
import {
  Building2,
  Users,
  Shield,
  Handshake,
  TrendingUp,
  Heart,
  Star,
  Award,
  Target,
  Lightbulb,
  UserCheck,
  ArrowRight,
  Phone,
  ChevronRight,
  CheckCircle,
  MapPin,
  Clock,
  Gem,
  Eye,
  Zap,
  Briefcase,
} from "lucide-react";
import { GradientBackground } from "../components/ui/gradient-background-4";
import { ScrollReveal, SlideIn, StaggerContainer, StaggerItem } from "../components/ui/scroll-reveal";

interface AboutUsProps {
  theme: "light" | "dark";
  onNavigateHome: () => void;
  onOpenConsultation: () => void;
}

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, ref };
}

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Happy Clients" },
  { icon: Building2, value: 300, suffix: "+", label: "Premium Properties" },
  { icon: Clock, value: 10, suffix: "+", label: "Years Experience" },
  { icon: Star, value: 98, suffix: "%", label: "Client Satisfaction" },
];

const whyChooseUs = [
  { icon: Users, title: "Professional Property Consultants", desc: "Expert advisors with deep knowledge of Dubai's real estate landscape." },
  { icon: Building2, title: "Residential & Commercial Expertise", desc: "Comprehensive solutions for homes, offices, and investment properties." },
  { icon: Gem, title: "Luxury & Off-Plan Specialists", desc: "Exclusive access to premium developments and off-plan opportunities." },
  { icon: Shield, title: "Transparent Transactions", desc: "Clear, honest processes with no hidden fees or surprises." },
  { icon: TrendingUp, title: "Personalized Investment Advice", desc: "Tailored strategies to maximize your return on investment." },
  { icon: Heart, title: "End-to-End Client Support", desc: "From consultation to handover, we're with you every step." },
];

const values = [
  { icon: Shield, title: "Integrity", desc: "We believe honesty and transparency build lasting relationships." },
  { icon: Award, title: "Excellence", desc: "We maintain the highest standards in every transaction." },
  { icon: Lightbulb, title: "Innovation", desc: "Using modern technology and market insights to deliver better experiences." },
  { icon: UserCheck, title: "Client First", desc: "Every recommendation is tailored to our clients' goals and aspirations." },
];

const processSteps = [
  { icon: Phone, title: "Consultation", desc: "Initial discussion to understand your needs" },
  { icon: Building2, title: "Property Selection", desc: "Curated options matching your criteria" },
  { icon: Eye, title: "Market Analysis", desc: "Data-driven insights and valuations" },
  { icon: Handshake, title: "Negotiation", desc: "Expert negotiation for best terms" },
  { icon: CheckCircle, title: "Documentation", desc: "Complete legal and paperwork handling" },
  { icon: Gem, title: "Successful Handover", desc: "Smooth final delivery and support" },
];

export default function AboutUs({ theme, onNavigateHome, onOpenConsultation }: AboutUsProps) {
  const isDark = theme === "dark";
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === "dark" ? "bg-[#07080a] text-white" : "bg-[#fcfbf9] text-[#14161d]"
    }`}>

      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6">
              <Building2 className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                About Our Company
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight mb-6">
              Building Trust Through{" "}
              <span className="text-[#d4af37]">Exceptional</span>{" "}
              Real Estate Experiences
            </h1>

            <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed mb-8">
              Helping buyers, sellers, investors, and tenants discover premium
              opportunities across Dubai and the UAE with transparency, expertise,
              and personalized service.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => { onNavigateHome(); setTimeout(() => document.getElementById("featured-properties")?.scrollIntoView({ behavior: "smooth" }), 100); }}
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d4af37] text-black text-sm font-semibold hover:bg-[#c9a227] transition-colors"
              >
                Explore Properties <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenConsultation}
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Our Experts <Phone className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== COMPANY OVERVIEW ===== */}
      <section className="relative py-20 md:py-28">
        <GradientBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideIn from="left">
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury Office"
                  className="w-full h-[400px] object-cover rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-3xl" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className="text-xs text-white font-medium">Dubai, UAE</span>
                  </div>
                </div>
              </div>
            </SlideIn>

            <SlideIn from="right">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
                  Who We Are
                </h2>
                <div className={`space-y-4 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                  <p>
                    We are a Dubai-based real estate company committed to delivering
                    exceptional property solutions across residential, commercial,
                    luxury, and off-plan developments. Our experienced consultants
                    combine deep market knowledge with a client-first approach to
                    help individuals and investors make confident property decisions.
                  </p>
                  <p>
                    Whether purchasing a dream home, expanding an investment portfolio,
                    or finding the ideal rental property, we provide personalized
                    guidance throughout every stage of the journey.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#07080a] overflow-hidden">
                        <img
                          src={`https://images.unsplash.com/photo-${["1507003211169-0a1dd7228f2d", "1494790108377-be9c29b29330", "1500648767791-00dcc994a43e", "1438761681033-6461ffad8d80"][i - 1]}?auto=format&fit=crop&w=80&h=80&q=80`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Expert Team</p>
                    <p className={`text-xs ${isDark ? "text-gray-500" : "text-stone-400"}`}>50+ professionals across Dubai</p>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="relative py-20 md:py-28">
        <GradientBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Mission & Vision
              </h2>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-stone-500"} max-w-lg mx-auto`}>
                Guided by purpose, driven by excellence.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.1}>
              <div className={`rounded-3xl ${isDark ? "bg-white/5 backdrop-blur-xl border-white/10" : "bg-white/80 backdrop-blur-xl border-stone-200/60 shadow-sm"} border p-8 md:p-10 h-full`}>
                <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-[#d4af37]" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">Our Mission</h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-stone-500"} leading-relaxed`}>
                  To simplify real estate by delivering trusted advice, exclusive
                  opportunities, and personalized solutions that help every client
                  achieve long-term success.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className={`rounded-3xl ${isDark ? "bg-white/5 backdrop-blur-xl border-white/10" : "bg-white/80 backdrop-blur-xl border-stone-200/60 shadow-sm"} border p-8 md:p-10 h-full`}>
                <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-[#d4af37]" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">Our Vision</h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-stone-500"} leading-relaxed`}>
                  To become one of the UAE's most respected real estate companies,
                  recognized for innovation, integrity, transparency, and lasting
                  client relationships.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="relative py-20 md:py-28">
        <GradientBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Why Choose Us
              </h2>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-stone-500"} max-w-lg mx-auto`}>
                Six pillars that define our commitment to excellence.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <div className={`group rounded-3xl ${isDark ? "bg-white/5 border-white/10" : "bg-stone-100/80 border-black/8"} border p-6 transition-all duration-300 hover:border-[#d4af37]/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d4af37]/5 h-full`}>
                    <div className="w-11 h-11 rounded-xl bg-[#d4af37]/10 flex items-center justify-center mb-4 group-hover:bg-[#d4af37]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold mb-2">{item.title}</h3>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-stone-500"} leading-relaxed`}>{item.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== STATISTICS ===== */}
      <section className="relative py-20 md:py-28">
        <GradientBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const { count, ref } = useCountUp(stat.value);
              return (
                <div key={stat.label} ref={ref} className={`text-center p-6 rounded-3xl ${isDark ? "bg-white/5 border-white/10" : "bg-stone-100/80 border-black/8"} border`}>
                  <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div className="font-mono text-3xl md:text-4xl font-bold text-[#d4af37] mb-1">
                    {count}{stat.suffix}
                  </div>
                  <p className={`text-xs ${isDark ? "text-gray-400" : "text-stone-500"}`}>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES ===== */}
      <section className="relative py-20 md:py-28">
        <GradientBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Our Core Values
              </h2>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-stone-500"} max-w-lg mx-auto`}>
                The principles that guide everything we do.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <ScrollReveal key={val.title} delay={i * 0.1}>
                  <div className={`rounded-3xl ${isDark ? "bg-white/5 border-white/10" : "bg-stone-100/80 border-black/8"} border p-6 text-center h-full`}>
                    <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-5">
                      <Icon className="w-7 h-7 text-[#d4af37]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-3">{val.title}</h3>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-stone-500"} leading-relaxed`}>{val.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80"
            alt="Dubai"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Find Your{" "}
              <span className="text-[#d4af37]">Perfect Property</span>?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Whether you're buying, investing, renting, or selling, our
              experienced team is ready to guide you toward the right opportunity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => { onNavigateHome(); setTimeout(() => document.getElementById("featured-properties")?.scrollIntoView({ behavior: "smooth" }), 100); }}
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d4af37] text-black text-sm font-semibold hover:bg-[#c9a227] transition-colors"
              >
                Browse Properties <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenConsultation}
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Schedule Consultation <Phone className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PROCESS TIMELINE ===== */}
      <section className="relative py-20 md:py-28">
        <GradientBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Our Process
              </h2>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-stone-500"} max-w-lg mx-auto`}>
                A streamlined journey from consultation to handover.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <ScrollReveal key={step.title} delay={i * 0.1}>
                    <div className="flex flex-col items-center text-center group">
                      <div className={`relative z-10 w-16 h-16 rounded-full ${isDark ? "bg-white/5 border-white/10" : "bg-stone-100/80 border-black/8"} border flex items-center justify-center mb-4 group-hover:border-[#d4af37]/40 group-hover:bg-[#d4af37]/10 transition-all duration-300`}>
                        <Icon className="w-6 h-6 text-[#d4af37]" />
                      </div>
                      <span className="text-[10px] text-[#d4af37] font-semibold mb-1">Step {i + 1}</span>
                      <h4 className="text-sm font-bold mb-1">{step.title}</h4>
                      <p className={`text-[10px] ${isDark ? "text-gray-500" : "text-stone-400"} leading-relaxed`}>{step.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
