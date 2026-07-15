import React, { useState, useEffect } from "react";
import { Phone, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { t } from "../utils/translations";
import { currencies, CurrencyCode } from "../utils/currency";
import { ThemeToggle } from "./ui/theme-toggle";

interface NavbarProps {
  onOpenConsultation: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  activePage: "home" | "about" | "projects" | "ready" | "rentals" | "blog" | "agents" | "contact";
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateProjects: () => void;
  onNavigateReady: () => void;
  onNavigateRentals: () => void;
  onNavigateBlog: () => void;
  onNavigateAgents: () => void;
  onNavigateContact: () => void;
}

export default function Navbar({ onOpenConsultation, theme, onToggleTheme, activePage, onNavigateHome, onNavigateAbout, onNavigateProjects, onNavigateReady, onNavigateRentals, onNavigateBlog, onNavigateAgents, onNavigateContact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [mobileCurrencyOpen, setMobileCurrencyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedLang, setSelectedLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("app-lang") || "en";
    }
    return "en";
  });
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("app-currency") as CurrencyCode) || "AED";
    }
    return "AED";
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail !== selectedLang) {
        setSelectedLang(customEvent.detail);
      }
    };
    window.addEventListener("lang-change", handleLangChange);
    return () => window.removeEventListener("lang-change", handleLangChange);
  }, [selectedLang]);

  useEffect(() => {
    const handleCurrencyChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail !== selectedCurrency) {
        setSelectedCurrency(customEvent.detail);
      }
    };
    window.addEventListener("currency-change", handleCurrencyChange);
    return () => window.removeEventListener("currency-change", handleCurrencyChange);
  }, [selectedCurrency]);

  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇦🇪" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
    { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
    { code: "tl", name: "Tagalog", nativeName: "Tagalog", flag: "🇵🇭" },
    { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
    { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" }
  ];

  const currentLangObj = languages.find(l => l.code === selectedLang) || languages[0];

  const selectLanguage = (code: string) => {
    setSelectedLang(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("app-lang", code);
      window.dispatchEvent(new CustomEvent("lang-change", { detail: code }));
    }
    setLangDropdownOpen(false);
  };

  const selectCurrency = (code: CurrencyCode) => {
    setSelectedCurrency(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("app-currency", code);
      window.dispatchEvent(new CustomEvent("currency-change", { detail: code }));
    }
    setCurrencyDropdownOpen(false);
    setMobileCurrencyOpen(false);
  };

  const currentCurrencyObj = currencies.find(c => c.code === selectedCurrency) || currencies[0];

  const navLinks = [
    { key: "nav.home", name: "Home", href: "#home", page: "home" as const },
    { key: "nav.about", name: "About Us", href: "#about", page: "about" as const },
    { key: "nav.projects", name: "Projects", href: "#featured-projects", page: "projects" as const },
    { key: "nav.ready", name: "Ready to Move", href: "#categories", page: "ready" as const },
    { key: "nav.rentals", name: "Rentals", href: "#featured-properties", page: "rentals" as const },
    { key: "nav.blogs", name: "Blogs", href: "#blog", page: "blog" as const },
    { key: "nav.agents", name: "Agents", href: "#agents", page: "agents" as const },
    { key: "nav.contact", name: "Contact Us", href: "#contact", page: "contact" as const }
  ];

  const handleNavClick = (link: typeof navLinks[number]) => {
    if (link.page === "home") {
      onNavigateHome();
    } else if (link.page === "about") {
      onNavigateAbout();
    } else if (link.page === "projects") {
      onNavigateProjects();
    } else if (link.page === "ready") {
      onNavigateReady();
    } else if (link.page === "rentals") {
      onNavigateRentals();
    } else if (link.page === "blog") {
      onNavigateBlog();
    } else if (link.page === "agents") {
      onNavigateAgents();
    } else if (link.page === "contact") {
      onNavigateContact();
    }
  };

  const isDark = theme === "dark";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? isDark
          ? "bg-[#07080a]/70 backdrop-blur-2xl border-b border-[#d4af37]/10 shadow-[0_4px_40px_rgba(212,175,55,0.08)]"
          : "bg-white/70 backdrop-blur-2xl border-b border-[#d4af37]/10 shadow-[0_4px_40px_rgba(170,124,17,0.08)]"
        : "bg-transparent"
    }`}>
      {/* Gold accent line at bottom when scrolled */}
      <div className={`absolute bottom-0 left-0 w-full h-[1px] transition-opacity duration-700 ${scrolled ? "opacity-100" : "opacity-0"}`}>
        <div className="h-full bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <img src="/logo-city.png" alt="City Global Real Estate" className="w-14 h-14 object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
              <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDark ? "bg-[#d4af37]/10" : "bg-[#aa7c11]/10"}`} />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-base font-bold tracking-[0.18em] leading-none transition-all duration-300 group-hover:tracking-[0.22em] ${
                isDark ? "text-[#f3e5ab]" : "text-[#aa7c11]"
              }`}>
                CITY GLOBAL
              </span>
              <span className={`font-sans text-[8px] uppercase tracking-[0.35em] font-medium transition-colors duration-300 ${
                isDark ? "text-gray-500" : "text-stone-400"
              }`}>
                Real Estate
              </span>
            </div>
          </a>

          {/* Desktop Nav - Centered */}
          <div className="hidden xl:flex items-center justify-center flex-1 mx-4">
            <div className="flex items-center gap-0">
              {navLinks.map((link) => {
                const isActive = link.page ? link.page === activePage : false;
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={(e) => {
                      if (link.page) {
                        e.preventDefault();
                        handleNavClick(link);
                      }
                    }}
                    className={`relative px-3 py-2 font-sans text-xs uppercase tracking-[0.12em] font-semibold rounded-lg transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? isDark
                          ? "text-[#d4af37] bg-[#d4af37]/10"
                          : "text-[#aa7c11] bg-[#aa7c11]/10"
                        : isDark
                          ? "text-gray-400 hover:text-white hover:bg-white/5"
                          : "text-stone-500 hover:text-stone-900 hover:bg-black/5"
                    }`}
                  >
                    {t(link.key, selectedLang)}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] animate-[expandWidth_0.3s_ease-out_forwards]" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden xl:flex items-center gap-2.5 shrink-0">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`cursor-pointer flex items-center gap-1 px-1.5 py-1 rounded-md border text-[10px] font-sans transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-[#d4af37]/30"
                    : "border-black/10 bg-black/5 text-stone-600 hover:bg-black/10 hover:border-[#aa7c11]/30"
                }`}
              >
                <span className="text-xs leading-none">{currentLangObj.flag}</span>
                <ChevronDown className={`w-2 h-2 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setLangDropdownOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-52 rounded-2xl border shadow-2xl z-40 overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-300 ${
                    isDark
                      ? "bg-[#0c0d14]/95 border-[#d4af37]/15 text-white shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
                      : "bg-white/95 border-[#aa7c11]/10 text-stone-800 shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
                  }`}>
                    <div className="p-1.5">
                      {languages.map((lang, i) => (
                        <button
                          key={lang.code}
                          onClick={() => selectLanguage(lang.code)}
                          style={{ animationDelay: `${i * 30}ms` }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-xs rounded-xl transition-all duration-200 cursor-pointer animate-in fade-in slide-in-from-top-1 ${
                            selectedLang === lang.code
                              ? isDark
                                ? "bg-[#d4af37]/15 text-[#d4af37] shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]"
                                : "bg-[#aa7c11]/10 text-[#aa7c11] font-semibold"
                              : isDark
                                ? "hover:bg-white/5 text-gray-300"
                                : "hover:bg-stone-50 text-stone-600"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base leading-none">{lang.flag}</span>
                            <span className="font-sans font-medium">{lang.nativeName}</span>
                          </div>
                          <span className="font-mono text-[9px] uppercase tracking-wider opacity-40">{lang.code}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Currency */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className={`cursor-pointer flex items-center gap-1 px-1.5 py-1 rounded-md border text-[10px] font-sans transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-[#d4af37]/30"
                    : "border-black/10 bg-black/5 text-stone-600 hover:bg-black/10 hover:border-[#aa7c11]/30"
                }`}
              >
                <span className="text-xs leading-none">{currentCurrencyObj.flag}</span>
                <ChevronDown className={`w-2 h-2 transition-transform duration-200 ${currencyDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {currencyDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setCurrencyDropdownOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-48 rounded-2xl border shadow-2xl z-40 overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-300 ${
                    isDark
                      ? "bg-[#0c0d14]/95 border-[#d4af37]/15 text-white shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
                      : "bg-white/95 border-[#aa7c11]/10 text-stone-800 shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
                  }`}>
                    <div className="p-1.5">
                      {currencies.map((cur, i) => (
                        <button
                          key={cur.code}
                          onClick={() => selectCurrency(cur.code)}
                          style={{ animationDelay: `${i * 30}ms` }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-xs rounded-xl transition-all duration-200 cursor-pointer animate-in fade-in slide-in-from-top-1 ${
                            selectedCurrency === cur.code
                              ? isDark
                                ? "bg-[#d4af37]/15 text-[#d4af37] shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]"
                                : "bg-[#aa7c11]/10 text-[#aa7c11] font-semibold"
                              : isDark
                                ? "hover:bg-white/5 text-gray-300"
                                : "hover:bg-stone-50 text-stone-600"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base leading-none">{cur.flag}</span>
                            <span className="font-sans font-medium">{cur.code}</span>
                          </div>
                          <span className="font-mono text-[9px] tracking-wider opacity-40">{cur.symbol}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <ThemeToggle size="sm" theme={theme} onToggle={onToggleTheme} />

            {/* CTA Button */}
            <button
              onClick={onOpenConsultation}
              className="cursor-pointer relative flex items-center gap-1.5 bg-gradient-to-r from-[#d4af37] via-[#e7c96a] to-[#d4af37] text-black font-sans text-[10px] uppercase font-bold tracking-[0.1em] px-4 py-1.5 rounded-lg hover:shadow-[0_4px_25px_rgba(212,175,55,0.45)] active:scale-[0.97] transition-all duration-300 overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              <Phone className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">{t("nav.bookConsultation", selectedLang)}</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="xl:hidden flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                className={`cursor-pointer flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? "border-white/10 bg-white/5 text-gray-300 hover:border-[#d4af37]/30"
                    : "border-black/10 bg-black/5 text-stone-600 hover:border-[#aa7c11]/30"
                }`}
              >
                <span className="text-sm leading-none">{currentLangObj.flag}</span>
                <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-200 ${mobileLangOpen ? "rotate-180" : ""}`} />
              </button>

              {mobileLangOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setMobileLangOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-48 rounded-2xl border shadow-xl z-40 overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-300 ${
                    isDark
                      ? "bg-[#0c0d14]/95 border-[#d4af37]/15 text-white"
                      : "bg-white/95 border-[#aa7c11]/10 text-stone-800"
                  }`}>
                    <div className="p-1.5">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            selectLanguage(lang.code);
                            setMobileLangOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-xs rounded-xl transition-colors cursor-pointer ${
                            selectedLang === lang.code
                              ? isDark
                                ? "bg-[#d4af37]/15 text-[#d4af37]"
                                : "bg-[#aa7c11]/10 text-[#aa7c11] font-semibold"
                              : isDark
                                ? "hover:bg-white/5"
                                : "hover:bg-stone-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm leading-none">{lang.flag}</span>
                            <span className="font-sans font-medium text-[11px]">{lang.nativeName}</span>
                          </div>
                          <span className="font-mono text-[8px] uppercase tracking-wider opacity-40">{lang.code}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <ThemeToggle size="sm" theme={theme} onToggle={onToggleTheme} />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`relative p-2 rounded-xl transition-all duration-300 overflow-hidden ${
                isDark
                  ? "text-gray-300 hover:text-[#d4af37] hover:bg-[#d4af37]/10 border border-transparent hover:border-[#d4af37]/20"
                  : "text-stone-600 hover:text-[#aa7c11] hover:bg-[#aa7c11]/10 border border-transparent hover:border-[#aa7c11]/20"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`xl:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className={`mx-4 mb-4 p-5 rounded-2xl border backdrop-blur-2xl ${
          isDark
            ? "bg-[#0c0d14]/95 border-[#d4af37]/10 shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_60px_rgba(212,175,55,0.05)]"
            : "bg-white/95 border-[#aa7c11]/10 shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
        }`}>
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const isActive = link.page ? link.page === activePage : false;
              return (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.page) {
                      e.preventDefault();
                      handleNavClick(link);
                    }
                  }}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-sans text-sm tracking-wide transition-all duration-200 animate-in fade-in slide-in-from-left-4 ${
                    isActive
                      ? isDark
                        ? "text-[#d4af37] bg-[#d4af37]/10 font-semibold shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]"
                        : "text-[#aa7c11] bg-[#aa7c11]/10 font-semibold"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-white/5"
                        : "text-stone-600 hover:text-stone-900 hover:bg-black/5"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                  )}
                  {t(link.key, selectedLang)}
                </a>
              );
            })}
          </div>

          <div className={`mt-4 pt-4 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
            <p className={`text-[10px] uppercase tracking-wider font-medium mb-2.5 px-1 ${isDark ? "text-gray-500" : "text-stone-400"}`}>Language</p>
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang.code)}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 px-1 rounded-xl border text-[10px] font-sans font-medium transition-all duration-200 cursor-pointer ${
                    selectedLang === lang.code
                      ? isDark
                        ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                        : "border-[#aa7c11] bg-[#aa7c11]/10 text-[#aa7c11] font-semibold"
                      : isDark
                        ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20"
                        : "border-black/10 bg-black/5 text-stone-600 hover:bg-black/10 hover:border-black/20"
                  }`}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span className="uppercase tracking-wider">{lang.code}</span>
                </button>
              ))}
            </div>

            <p className={`text-[10px] uppercase tracking-wider font-medium mb-2.5 px-1 ${isDark ? "text-gray-500" : "text-stone-400"}`}>Currency</p>
            <div className="grid grid-cols-5 gap-1.5 mb-4">
              {currencies.map((cur) => (
                <button
                  key={cur.code}
                  onClick={() => selectCurrency(cur.code)}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 px-1 rounded-xl border text-[10px] font-sans font-medium transition-all duration-200 cursor-pointer ${
                    selectedCurrency === cur.code
                      ? isDark
                        ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                        : "border-[#aa7c11] bg-[#aa7c11]/10 text-[#aa7c11] font-semibold"
                      : isDark
                        ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20"
                        : "border-black/10 bg-black/5 text-stone-600 hover:bg-black/10 hover:border-black/20"
                  }`}
                >
                  <span className="text-sm">{cur.flag}</span>
                  <span className="uppercase tracking-wider">{cur.code}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37] via-[#e7c96a] to-[#d4af37] text-black font-sans text-xs uppercase font-bold tracking-wider py-3.5 rounded-xl hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)] transition-all duration-300 overflow-hidden group/mbtn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/mbtn:translate-x-[200%] transition-transform duration-700" />
              <Phone className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">{t("nav.bookConsultation", selectedLang)}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
