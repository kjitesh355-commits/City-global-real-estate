import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Building2,
  Send,
  CheckCircle,
  User,
  MessageSquare,
  Home,
  DollarSign,
  Headphones,
  Shield,
  Handshake,
  Briefcase,
  Car,
  Navigation,
  Landmark,
  Calendar,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/ui/scroll-reveal";
import { GradientBackground } from "../components/ui/gradient-background-4";

interface ContactProps {
  theme: "light" | "dark";
  onOpenConsultation: () => void;
}

const contactCards = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    primary: "Dubai, United Arab Emirates",
    secondary: "Business hours:\nMonday – Saturday | 9:00 AM – 6:00 PM",
    action: "Get Directions",
    actionIcon: Navigation,
  },
  {
    icon: Phone,
    title: "Call Us",
    primary: "+971 4 123 4567",
    secondary: "+971 50 987 6543",
    action: "Call Now",
    actionIcon: Phone,
  },
  {
    icon: Mail,
    title: "Email Us",
    primary: "info@cityglobal.ae",
    secondary: "sales@cityglobal.ae",
    action: "Send Email",
    actionIcon: Send,
  },
  {
    icon: Clock,
    title: "Working Hours",
    primary: "Monday – Friday: 9AM – 6PM",
    secondary: "Saturday: 10AM – 4PM\nSunday: Closed",
    action: "View Calendar",
    actionIcon: Calendar,
  },
];

const serviceOptions = [
  "Buy Property",
  "Rent Property",
  "Sell Property",
  "Investment",
  "Off-Plan Projects",
  "General Inquiry",
];

const budgetRanges = [
  "Under AED 1M",
  "AED 1M – 3M",
  "AED 3M – 5M",
  "AED 5M – 10M",
  "AED 10M – 20M",
  "AED 20M+",
];

const locations = [
  "Downtown Dubai",
  "Palm Jumeirah",
  "Dubai Marina",
  "Business Bay",
  "Dubai Hills Estate",
  "JVC",
  "Arabian Ranches",
  "Other",
];

const whyChoose = [
  { icon: Headphones, title: "Experienced Property Advisors", desc: "Our team of certified professionals brings years of expertise in Dubai's luxury real estate market." },
  { icon: Handshake, title: "Personalized Consultation", desc: "Every client receives tailored guidance based on their unique goals, preferences, and budget." },
  { icon: Shield, title: "Transparent Transactions", desc: "We ensure complete transparency in every deal with clear documentation and honest communication." },
  { icon: Building2, title: "End-to-End Support", desc: "From initial consultation to handover — we guide you through every step of the property journey." },
];

const faqs = [
  {
    q: "How do I schedule a property viewing?",
    a: "Simply contact us via phone, email, or our contact form. Our advisors will arrange a convenient time for you to visit the property, either in person or through a virtual tour.",
  },
  {
    q: "Can international buyers invest in Dubai?",
    a: "Yes! Dubai welcomes international investors. Foreign buyers can purchase freehold properties in designated areas. Our team will guide you through the entire process, including visa requirements and legal documentation.",
  },
  {
    q: "Do you help with mortgages?",
    a: "Absolutely. We work with leading banks and financial institutions in the UAE to help you secure the best mortgage rates. Our advisors will assist with pre-approval, documentation, and the complete application process.",
  },
  {
    q: "What documents are required?",
    a: "For buyers: passport copy, proof of income, bank statements. For renters: passport copy, visa copy, employer letter. Our team will provide a complete checklist based on your specific situation.",
  },
  {
    q: "How long does the buying process take?",
    a: "The typical property purchase in Dubai takes 2-4 weeks from agreement to transfer. Off-plan purchases may have different timelines based on the developer's schedule. We'll keep you informed at every stage.",
  },
];

function FAQItem({ faq, index, theme }: { faq: typeof faqs[0]; index: number; theme: "light" | "dark" }) {
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={false}
      className={`rounded-2xl border transition-all duration-300 ${
        open ? "border-[#d4af37]/30 bg-[#d4af37]/[0.04]" : isDark ? "border-white/10 bg-white/[0.03]" : "border-stone-200 bg-stone-50"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
      >
        <span className={`font-sans text-sm font-medium transition-colors ${open ? "text-[#d4af37]" : isDark ? "text-white" : "text-[#1c1917]"}`}>
          {faq.q}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
          open ? "bg-[#d4af37]/20 rotate-0" : isDark ? "bg-white/5 rotate-0" : "bg-stone-100/80 rotate-0"
        }`}>
          {open ? <Minus className="w-4 h-4 text-[#d4af37]" /> : <Plus className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-stone-500"}`} />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <p className={`font-sans text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-stone-500"}`}>{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Contact({ theme, onOpenConsultation }: ContactProps) {
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "",
    location: "",
    budget: "",
    message: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", service: "", location: "", budget: "", message: "", agree: false });
    }, 4000);
  };

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90"
            alt="Dubai Skyline"
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
                  Contact Our Team
                </span>
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                Let's Help You Find Your{" "}
                <span className="relative inline-block">
                  <span className="text-[#d4af37]">Perfect Property</span>
                  <svg className="absolute -bottom-1 left-0 w-full h-3 text-[#d4af37]/20" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8 C50 2, 150 2, 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <p className={`font-sans text-sm sm:text-base max-w-2xl leading-relaxed mb-8 ${isDark ? "text-gray-300/90" : "text-stone-600/90"}`}>
                Whether you're buying, selling, renting, or investing in Dubai real estate, our experienced advisors are here to answer your questions and provide expert guidance. Reach out today and let us help you take the next step with confidence.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact-form"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#d4af37] text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#e7c96a] transition-all duration-300 shadow-[0_2px_16px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_24px_rgba(212,175,55,0.4)]"
                >
                  <Phone className="w-4 h-4" />
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#"
                  className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 ${isDark ? "bg-white/5" : "bg-stone-100/80"} backdrop-blur-sm ${isDark ? "text-white" : "text-[#1c1917]"} font-sans text-xs font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all duration-300`}
                >
                  <Home className="w-4 h-4" />
                  Browse Properties
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CONTACT INFORMATION CARDS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const ActionIcon = card.actionIcon;
              return (
                <StaggerItem key={card.title}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className={`group rounded-3xl border ${isDark ? "border-white/10" : "border-stone-200"} ${isDark ? "bg-white/[0.04]" : "bg-white"} backdrop-blur-2xl p-6 hover:border-[#d4af37]/30 hover:shadow-[0_8px_30px_rgba(212,175,55,0.06)] transition-all duration-500`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mb-4 group-hover:bg-[#d4af37]/15 transition-colors">
                      <Icon className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <h3 className={`font-serif text-lg font-bold mb-2 ${isDark ? "text-white" : "text-[#1c1917]"}`}>{card.title}</h3>
                    <p className="font-sans text-sm text-[#d4af37] font-medium mb-1">{card.primary}</p>
                    <p className={`font-sans text-xs leading-relaxed whitespace-pre-line mb-4 ${isDark ? "text-gray-400" : "text-stone-500"}`}>{card.secondary}</p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 text-[11px] text-[#d4af37] font-semibold uppercase tracking-wider hover:text-[#e7c96a] transition-colors group/link"
                    >
                      <ActionIcon className="w-3.5 h-3.5" />
                      {card.action}
                      <ChevronRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                    </a>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CONTACT FORM + MAP
      ═══════════════════════════════════════════════════════════════ */}
      <section id="contact-form" className="relative py-16 sm:py-20">
        <GradientBackground />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-[1fr_480px] gap-10 lg:gap-14">

            {/* ── CONTACT FORM ── */}
            <div>
              <ScrollReveal>
                <div className="mb-8">
                  <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
                    Send a Message
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                    Get in <span className="text-[#d4af37]">Touch</span>
                  </h2>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className={`rounded-3xl border ${isDark ? "border-white/10" : "border-stone-200"} ${isDark ? "bg-white/[0.04]" : "bg-white"} backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden`}>
                  {submitted ? (
                    <div className="p-12 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                      </motion.div>
                      <h3 className={`font-serif text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-[#1c1917]"}`}>Message Sent!</h3>
                      <p className={`font-sans text-sm max-w-sm mx-auto ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                      {/* Row 1: Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className={`font-sans text-[10px] uppercase tracking-wider font-semibold ${isDark ? "text-gray-400" : "text-stone-500"}`}>Full Name *</label>
                          <div className="relative">
                            <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="John Doe"
                              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm placeholder-gray-500 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className={`font-sans text-[10px] uppercase tracking-wider font-semibold ${isDark ? "text-gray-400" : "text-stone-500"}`}>Email Address *</label>
                          <div className="relative">
                            <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="john@example.com"
                              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm placeholder-gray-500 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Phone + Subject */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className={`font-sans text-[10px] uppercase tracking-wider font-semibold ${isDark ? "text-gray-400" : "text-stone-500"}`}>Phone Number</label>
                          <div className="relative">
                            <Phone className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+971 50 123 4567"
                              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm placeholder-gray-500 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className={`font-sans text-[10px] uppercase tracking-wider font-semibold ${isDark ? "text-gray-400" : "text-stone-500"}`}>Subject *</label>
                          <div className="relative">
                            <MessageSquare className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                            <input
                              type="text"
                              required
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              placeholder="How can we help?"
                              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm placeholder-gray-500 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Service + Location */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className={`font-sans text-[10px] uppercase tracking-wider font-semibold ${isDark ? "text-gray-400" : "text-stone-500"}`}>Service Required</label>
                          <div className="relative">
                            <Briefcase className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                            <select
                              value={formData.service}
                              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}
                            >
                              <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Select service</option>
                              {serviceOptions.map((s) => (
                                <option key={s} value={s} className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>{s}</option>
                              ))}
                            </select>
                            <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className={`font-sans text-[10px] uppercase tracking-wider font-semibold ${isDark ? "text-gray-400" : "text-stone-500"}`}>Preferred Location</label>
                          <div className="relative">
                            <MapPin className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                            <select
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}
                            >
                              <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Select location</option>
                              {locations.map((l) => (
                                <option key={l} value={l} className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>{l}</option>
                              ))}
                            </select>
                            <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                          </div>
                        </div>
                      </div>

                      {/* Row 4: Budget */}
                      <div className="space-y-1.5">
                        <label className={`font-sans text-[10px] uppercase tracking-wider font-semibold ${isDark ? "text-gray-400" : "text-stone-500"}`}>Budget</label>
                        <div className="relative">
                          <DollarSign className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm appearance-none focus:outline-none focus:border-[#d4af37]/50 transition-all cursor-pointer ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}
                          >
                            <option value="" className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>Select budget range</option>
                            {budgetRanges.map((b) => (
                              <option key={b} value={b} className={isDark ? "bg-[#0B0B0B]" : "bg-white"}>{b}</option>
                            ))}
                          </select>
                          <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label className={`font-sans text-[10px] uppercase tracking-wider font-semibold ${isDark ? "text-gray-400" : "text-stone-500"}`}>Message</label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your requirements..."
                          className={`w-full px-4 py-3 rounded-xl border text-sm placeholder-gray-500 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 transition-all resize-none ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}
                        />
                      </div>

                      {/* Checkbox */}
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.agree}
                          onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                          required
                          className={`mt-0.5 w-4 h-4 rounded border-white/20 text-[#d4af37] focus:ring-[#d4af37]/30 cursor-pointer ${isDark ? "bg-white/5" : "bg-stone-100/80"}`}
                        />
                        <span className={`font-sans text-xs group-hover:text-gray-300 transition-colors ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                          I agree to the <a href="#" className="text-[#d4af37] hover:underline">Privacy Policy</a> and consent to being contacted regarding my inquiry.
                        </span>
                      </label>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#d4af37] text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#e7c96a] active:scale-[0.98] transition-all duration-300 shadow-[0_2px_16px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_24px_rgba(212,175,55,0.4)] cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* ── RIGHT: MAP + OFFICE INFO ── */}
            <div className="space-y-6">
              {/* Map */}
              <ScrollReveal delay={0.2} direction="right">
                <div className={`rounded-3xl overflow-hidden border ${isDark ? "border-white/10" : "border-stone-200"} ${isDark ? "bg-white/[0.04]" : "bg-white"} backdrop-blur-sm shadow-2xl`}>
                  <div className="h-[320px] w-full relative">
                    <iframe
                      title="City Global Real Estate Office"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.7!2d55.27!3d25.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z/MKw1MicMLjAuMCJOIDU1wrAxNiIxMi4wIkU!5e0!3m2!1sen!2sae!4v1"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "grayscale(0.3) contrast(1.1)" }}
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className={`font-sans text-sm font-semibold ${isDark ? "text-white" : "text-[#1c1917]"}`}>City Global Real Estate</p>
                        <p className={`font-sans text-[11px] ${isDark ? "text-gray-400" : "text-stone-500"}`}>Dubai, United Arab Emirates</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold uppercase tracking-wider hover:bg-[#d4af37]/20 transition-all"
                      >
                        <Navigation className="w-3 h-3" />
                        Directions
                      </a>
                      <a
                        href="#"
                        className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider hover:text-white hover:bg-white/10 transition-all ${isDark ? "bg-white/5 border-white/10 text-gray-400" : "bg-stone-100/80 border-stone-200 text-stone-500"}`}
                      >
                        <Car className="w-3 h-3" />
                        Parking
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Nearby Landmarks */}
              <ScrollReveal delay={0.3} direction="right">
                <div className={`rounded-3xl border ${isDark ? "border-white/10" : "border-stone-200"} ${isDark ? "bg-white/[0.04]" : "bg-white"} backdrop-blur-2xl p-6`}>
                  <h4 className={`font-sans text-[10px] uppercase tracking-[0.2em] font-semibold mb-4 ${isDark ? "text-gray-400" : "text-stone-500"}`}>Nearby Landmarks</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Dubai Mall", dist: "5 min drive", icon: Building2 },
                      { name: "Burj Khalifa", dist: "7 min drive", icon: Landmark },
                      { name: "Dubai Marina", dist: "15 min drive", icon: MapPin },
                      { name: "DXB Airport", dist: "20 min drive", icon: Navigation },
                    ].map((lm) => {
                      const Icon = lm.icon;
                      return (
                        <div key={lm.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? "bg-white/5" : "bg-stone-100/80"}`}>
                              <Icon className="w-4 h-4 text-[#d4af37]" />
                            </div>
                            <span className={`font-sans text-sm ${isDark ? "text-white" : "text-[#1c1917]"}`}>{lm.name}</span>
                          </div>
                          <span className={`font-sans text-[11px] ${isDark ? "text-gray-500" : "text-stone-400"}`}>{lm.dist}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY CONTACT US
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
                Why Us
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                Why <span className="text-[#d4af37]">Contact Us</span>
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className={`group rounded-3xl border ${isDark ? "border-white/10" : "border-stone-200"} ${isDark ? "bg-white/[0.04]" : "bg-white"} backdrop-blur-sm p-6 text-center hover:border-[#d4af37]/30 hover:shadow-[0_8px_30px_rgba(212,175,55,0.06)] transition-all duration-500`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#d4af37]/15 transition-colors">
                      <Icon className="w-7 h-7 text-[#d4af37]" />
                    </div>
                    <h3 className={`font-serif text-base font-bold mb-2 group-hover:text-[#d4af37] transition-colors ${isDark ? "text-white" : "text-[#1c1917]"}`}>
                      {item.title}
                    </h3>
                    <p className={`font-sans text-xs leading-relaxed ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                      {item.desc}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20">
        <GradientBackground />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
                FAQ
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                Frequently Asked <span className="text-[#d4af37]">Questions</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <FAQItem faq={faq} index={i} theme={theme} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
