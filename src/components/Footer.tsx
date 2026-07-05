import React, { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Building2,
  Phone,
  MessageSquare,
  ShieldCheck,
  Mail,
  Plus,
  ArrowRight,
  Sparkles,
  MapPin,
  Globe,
  Award,
  ChevronRight,
} from "lucide-react";
import { t } from "../utils/translations";
import { FloatingButton, FloatingButtonItem } from "./ui/floating-button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ui/scroll-reveal";

interface FooterProps {
  onOpenConsultation: () => void;
  theme: "light" | "dark";
}

export default function Footer({ onOpenConsultation, theme }: FooterProps) {
  const isDark = theme === "dark";
  const [emailValue, setEmailValue] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue.trim()) return;
    setSubscribed(true);
    setEmailValue("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { label: "nav.home", href: "#home" },
      { label: "nav.buy", href: "#buy" },
      { label: "nav.offplan", href: "#off-plan" },
      { label: "nav.rent", href: "#rent" },
      { label: "nav.about", href: "#about" },
      { label: "nav.contact", href: "#contact" },
    ],
    properties: [
      { label: "footer.apartments", href: "#buy" },
      { label: "footer.villas", href: "#buy" },
      { label: "footer.penthouses", href: "#buy" },
      { label: "footer.townhouses", href: "#buy" },
      { label: "footer.commercial", href: "#buy" },
      { label: "footer.offPlanProj", href: "#off-plan" },
    ],
    services: [
      { label: "footer.investmentAdvisory", href: "#investment" },
      { label: "footer.mortgageSupport", href: "#calculators" },
      { label: "footer.propertyManagement", href: "#management" },
      { label: "footer.goldenVisa", href: "#golden-visa" },
      { label: "footer.afterSales", href: "#after-sales" },
      { label: "footer.roiCalculator", href: "#calculators" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, url: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, url: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer
      id="contact"
      className={`relative z-10 overflow-hidden ${isDark ? "bg-[#090909] text-white" : "bg-stone-50 text-[#1c1917]"}`}
    >
      {/* Top Gold Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent" />

      {/* Premium CTA Banner */}
      <ScrollReveal>
        <div className="relative mx-4 sm:mx-6 lg:mx-12 my-16 rounded-2xl overflow-hidden group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#C9A227]/40 via-[#E7C96A]/60 to-[#C9A227]/40 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 blur-[1px]" />

          <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909]/95 via-[#090909]/80 to-[#090909]/95 z-10" />
            <img
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1500&q=80"
              alt="Dubai Skyline"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-50 scale-105 group-hover:scale-110 transition-transform duration-1000"
            />
          </div>

          <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-14 flex flex-col items-center text-center gap-8">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/5">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C9A227] font-semibold">
                Start Your Investment Journey
              </span>
            </div>

            <div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wide leading-tight">
                {t("footer.readyToInvest", lang)}
              </h3>
              <p className="font-sans text-sm sm:text-base text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                {t("footer.letExpertsHelp", lang)}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center">
              <button
                onClick={onOpenConsultation}
                className="cursor-pointer group/btn flex items-center gap-2 bg-gradient-to-r from-[#C9A227] to-[#E7C96A] text-black font-sans text-xs uppercase font-bold tracking-widest px-8 py-4 rounded-full hover:brightness-110 hover:shadow-[0_0_30px_rgba(201,162,39,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-500"
              >
                {t("nav.consultation", lang)}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>

              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 border border-[#C9A227]/40 text-[#E7C96A] font-sans text-xs uppercase font-semibold tracking-widest px-6 py-4 rounded-full hover:bg-[#C9A227]/10 hover:border-[#C9A227]/60 transition-all duration-500"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t("footer.whatsappUs", lang)}</span>
              </a>

              <a
                href="tel:+971501234567"
                className="flex items-center gap-2.5 border border-white/10 text-gray-400 font-sans text-xs uppercase font-semibold tracking-widest px-6 py-4 rounded-full hover:text-white hover:border-white/30 transition-all duration-500"
              >
                <Phone className="w-4 h-4" />
                <span>{t("footer.callNow", lang)}</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-2">
              {[
                { icon: ShieldCheck, text: "RERA Certified" },
                { icon: Award, text: "10+ Years" },
                { icon: Building2, text: "15,000+ Properties" },
                { icon: Globe, text: "25+ Countries" },
              ].map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12">
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8"
          staggerDelay={0.08}
        >
          {/* Brand Column */}
          <StaggerItem className="lg:col-span-4">
            <div className="flex flex-col gap-6">
              <a href="#home" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A227] to-[#E7C96A] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all duration-500">
                  <Building2 className="w-6 h-6 text-black" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold tracking-[0.15em] text-[#E7C96A] leading-none">
                    CITY GLOBAL
                  </span>
                  <span className={`font-sans text-[9px] uppercase tracking-[0.4em] font-medium ${isDark ? "text-gray-500" : "text-stone-400"}`}>
                    {t("footer.realEstate", lang)}
                  </span>
                </div>
              </a>

              <p className={`font-sans text-sm font-light leading-[1.8] max-w-sm ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                {t("footer.brandDesc", lang)}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center ${isDark ? "border-white/10 text-gray-400" : "border-stone-200 text-stone-500"} hover:text-[#C9A227] hover:border-[#C9A227]/50 hover:bg-[#C9A227]/5 transition-all duration-500`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-3 mt-2">
                <a
                  href="tel:+971501234567"
                  className={`flex items-center gap-3 text-sm ${isDark ? "text-gray-400" : "text-stone-500"} hover:text-[#C9A227] transition-colors duration-300`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? "bg-white/5" : "bg-stone-100"}`}>
                    <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
                  </div>
                  <span className="font-sans">+971 50 123 4567</span>
                </a>
                <a
                  href="mailto:info@cityglobal.ae"
                  className={`flex items-center gap-3 text-sm ${isDark ? "text-gray-400" : "text-stone-500"} hover:text-[#C9A227] transition-colors duration-300`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? "bg-white/5" : "bg-stone-100"}`}>
                    <Mail className="w-3.5 h-3.5 text-[#C9A227]" />
                  </div>
                  <span className="font-sans">info@cityglobal.ae</span>
                </a>
                <div className={`flex items-center gap-3 text-sm ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? "bg-white/5" : "bg-stone-100"}`}>
                    <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                  </div>
                  <span className="font-sans">Dubai, UAE</span>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Quick Links */}
          <StaggerItem className="lg:col-span-2">
            <div className="flex flex-col gap-5">
              <h4 className={`font-serif text-sm font-bold tracking-wider uppercase flex items-center gap-2 ${isDark ? "text-white" : "text-[#1c1917]"}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                {t("footer.quickLinks", lang)}
              </h4>
              <ul className="flex flex-col gap-3">
                {footerLinks.quickLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className={`group flex items-center gap-2 font-sans text-sm ${isDark ? "text-gray-400" : "text-stone-500"} hover:text-[#C9A227] transition-all duration-300`}
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <span>{t(link.label, lang)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* Properties */}
          <StaggerItem className="lg:col-span-2">
            <div className="flex flex-col gap-5">
              <h4 className={`font-serif text-sm font-bold tracking-wider uppercase flex items-center gap-2 ${isDark ? "text-white" : "text-[#1c1917]"}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                {t("footer.properties", lang)}
              </h4>
              <ul className="flex flex-col gap-3">
                {footerLinks.properties.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className={`group flex items-center gap-2 font-sans text-sm ${isDark ? "text-gray-400" : "text-stone-500"} hover:text-[#C9A227] transition-all duration-300`}
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <span>{t(link.label, lang)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* Services */}
          <StaggerItem className="lg:col-span-2">
            <div className="flex flex-col gap-5">
              <h4 className={`font-serif text-sm font-bold tracking-wider uppercase flex items-center gap-2 ${isDark ? "text-white" : "text-[#1c1917]"}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                {t("footer.services", lang)}
              </h4>
              <ul className="flex flex-col gap-3">
                {footerLinks.services.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className={`group flex items-center gap-2 font-sans text-sm ${isDark ? "text-gray-400" : "text-stone-500"} hover:text-[#C9A227] transition-all duration-300`}
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <span>{t(link.label, lang)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* Newsletter */}
          <StaggerItem className="lg:col-span-2">
            <div className="flex flex-col gap-5">
              <h4 className={`font-serif text-sm font-bold tracking-wider uppercase flex items-center gap-2 ${isDark ? "text-white" : "text-[#1c1917]"}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                {t("footer.newsletter", lang)}
              </h4>
              <p className={`font-sans text-sm font-light leading-relaxed ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                {t("footer.newsletterDesc", lang)}
              </p>

              <form
                onSubmit={handleSubscribe}
                className="relative flex flex-col gap-3"
              >
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder={t("footer.emailPlaceholder", lang)}
                    className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A227]/50 focus:ring-1 focus:ring-[#C9A227]/30 transition-all duration-300 font-sans pr-12 ${isDark ? "bg-white/5 border border-white/10 text-white placeholder-gray-500" : "bg-white border border-stone-200 text-stone-900 placeholder-stone-400"}`}
                  />
                  <button
                    type="submit"
                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-gradient-to-r from-[#C9A227] to-[#E7C96A] text-black hover:brightness-110 active:scale-95 flex items-center justify-center transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {subscribed && (
                  <span className="font-sans text-xs text-emerald-400 animate-pulse">
                    {t("footer.subscribeSuccess", lang)}
                  </span>
                )}
              </form>

              {/* App Download */}
              <div className="mt-2">
                <p className={`font-sans text-[10px] uppercase tracking-wider mb-3 ${isDark ? "text-gray-500" : "text-stone-400"}`}>
                  Download Our App
                </p>
                <div className="flex gap-2">
                  <a
                    href="#"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border hover:border-[#C9A227]/40 transition-all duration-300 ${isDark ? "border-white/10" : "border-stone-200"}`}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="flex flex-col">
                      <span className={`text-[8px] leading-none ${isDark ? "text-gray-500" : "text-stone-400"}`}>Download on the</span>
                      <span className={`text-[11px] font-medium leading-tight ${isDark ? "text-white" : "text-stone-900"}`}>App Store</span>
                    </div>
                  </a>
                  <a
                    href="#"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border hover:border-[#C9A227]/40 transition-all duration-300 ${isDark ? "border-white/10" : "border-stone-200"}`}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302c.58.335.58 1.175 0 1.51l-2.302 1.302L15.394 12l2.304-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                    </svg>
                    <div className="flex flex-col">
                      <span className={`text-[8px] leading-none ${isDark ? "text-gray-500" : "text-stone-400"}`}>Get it on</span>
                      <span className={`text-[11px] font-medium leading-tight ${isDark ? "text-white" : "text-stone-900"}`}>Google Play</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Bottom Bar */}
      <div className={`w-full h-[1px] bg-gradient-to-r from-transparent to-transparent ${isDark ? "via-white/10" : "via-stone-200"}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className={`font-sans text-xs ${isDark ? "text-gray-500" : "text-stone-400"}`}>
          &copy; {currentYear} City Global Real Estate. {t("footer.allRightsReserved", lang)}
        </span>

        <div className="flex items-center gap-6">
          <a
            href="#privacy"
            className={`font-sans text-xs hover:text-[#C9A227] transition-colors duration-300 ${isDark ? "text-gray-500" : "text-stone-400"}`}
          >
            {t("footer.privacyPolicy", lang)}
          </a>
          <div className={`w-1 h-1 rounded-full ${isDark ? "bg-gray-700" : "bg-stone-300"}`} />
          <a
            href="#terms"
            className={`font-sans text-xs hover:text-[#C9A227] transition-colors duration-300 ${isDark ? "text-gray-500" : "text-stone-400"}`}
          >
            {t("footer.termsAndConditions", lang)}
          </a>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-26 right-4 sm:right-12 z-40">
        <FloatingButton
          triggerContent={
            <button className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl transition-all hover:scale-110 cursor-pointer">
              <Plus className="w-5 h-5" />
            </button>
          }
        >
          <FloatingButtonItem>
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-11 w-11 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg transition-transform hover:scale-110"
            >
              <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.022-.015-.05-.03-.07-.043l-1.077-.525c-.247-.12-.486-.06-.633.1l-.478.587c-.1.123-.25.196-.4.185-.714-.055-1.56-.34-2.288-.89-.728-.55-1.127-1.12-1.353-1.683-.05-.13-.016-.273.08-.372l.412-.412c.11-.11.16-.255.13-.4l-.313-1.1c-.08-.28-.313-.485-.6-.485-.157 0-.313.06-.432.18l-.515.515c-.485.485-.615 1.21-.328 1.838.682 1.49 1.94 2.82 3.492 3.492.615.265 1.347.15 1.838-.328l.492-.492c.133-.133.316-.2.502-.2.074 0 .15.013.22.043l1.1.472c.28.12.443.376.433.682-.014.307-.21.57-.492.645l-.472.122c-.152.04-.316.03-.466-.026zm-5.47-11.4c-4.962 0-9 4.038-9 9 0 1.58.412 3.12 1.205 4.473l-1.28 4.673 4.793-1.258c1.3.725 2.766 1.11 4.28 1.11 4.964 0 9-4.036 9-9s-4.038-9-9-9zm0 16.5c-1.378 0-2.693-.382-3.83-1.1l-.274-.162-2.843.746.76-2.775-.178-.283C4.846 14.806 4.47 13.434 4.47 12c0-4.152 3.377-7.53 7.53-7.53 4.152 0 7.53 3.378 7.53 7.53 0 4.152-3.378 7.53-7.53 7.53z"/>
              </svg>
            </a>
          </FloatingButtonItem>
          <FloatingButtonItem>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-11 w-11 bg-[#1877f2] hover:bg-[#166fe5] text-white rounded-full shadow-lg transition-transform hover:scale-110"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </FloatingButtonItem>
          <FloatingButtonItem>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-11 w-11 bg-[#0a66c2] hover:bg-[#0958a8] text-white rounded-full shadow-lg transition-transform hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </FloatingButtonItem>
          <FloatingButtonItem>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-11 w-11 bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] hover:opacity-90 text-white rounded-full shadow-lg transition-transform hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </FloatingButtonItem>
        </FloatingButton>
      </div>
    </footer>
  );
}
