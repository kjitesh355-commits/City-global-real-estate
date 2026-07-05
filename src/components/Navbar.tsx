import React, { useState, useEffect } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { t } from "../utils/translations";
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
  const [scrolled, setScrolled] = useState(false);
  const [selectedLang, setSelectedLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("app-lang") || "en";
    }
    return "en";
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

  const languages = [
    { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇦🇪" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
    { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
    { code: "tl", name: "Tagalog", nativeName: "Tagalog", flag: "🇵🇭" },
    { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" }
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
          ? "bg-[#07080a]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
        : "bg-transparent"
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group shrink-0">
            <img src="/logo-city.png" alt="City Global Real Estate" className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col">
              <span className={`font-serif text-base font-bold tracking-[0.18em] leading-none transition-colors duration-300 ${
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

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
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
                  className={`relative px-3 py-2 font-sans text-[11px] uppercase tracking-[0.12em] font-medium rounded-lg transition-all duration-300 ${
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
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#d4af37]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden xl:flex items-center gap-3">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-sans font-medium transition-all duration-300 ${
                  isDark
                    ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20"
                    : "border-black/10 bg-black/5 text-stone-600 hover:bg-black/10 hover:border-black/20"
                }`}
              >
                <span className="text-sm leading-none">{currentLangObj.flag}</span>
                <span className="uppercase tracking-wider">{currentLangObj.code}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setLangDropdownOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-2xl z-40 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 ${
                    isDark
                      ? "bg-[#0c0d14]/95 border-white/10 text-white"
                      : "bg-white/95 border-black/10 text-stone-800"
                  }`}>
                    <div className="p-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => selectLanguage(lang.code)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs rounded-lg transition-all duration-200 cursor-pointer ${
                            selectedLang === lang.code
                              ? isDark
                                ? "bg-[#d4af37]/15 text-[#d4af37]"
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

            <ThemeToggle size="sm" theme={theme} onToggle={onToggleTheme} />

            <button
              onClick={onOpenConsultation}
              className="cursor-pointer flex items-center gap-2 bg-[#d4af37] text-black font-sans text-[11px] uppercase font-bold tracking-[0.12em] px-5 py-2 rounded-lg hover:bg-[#e7c96a] active:scale-[0.97] transition-all duration-300 shadow-[0_2px_12px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.35)]"
            >
              <Phone className="w-3.5 h-3.5" />
              {t("nav.bookConsultation", selectedLang)}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="xl:hidden flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                className={`cursor-pointer flex items-center gap-1 px-2 py-1.5 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? "border-white/10 bg-white/5 text-gray-300"
                    : "border-black/10 bg-black/5 text-stone-600"
                }`}
              >
                <span className="text-sm leading-none">{currentLangObj.flag}</span>
                <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-200 ${mobileLangOpen ? "rotate-180" : ""}`} />
              </button>

              {mobileLangOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setMobileLangOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-44 rounded-xl border shadow-xl z-40 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 ${
                    isDark
                      ? "bg-[#0c0d14]/95 border-white/10 text-white"
                      : "bg-white/95 border-black/10 text-stone-800"
                  }`}>
                    <div className="p-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            selectLanguage(lang.code);
                            setMobileLangOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs rounded-lg transition-colors cursor-pointer ${
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
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-white hover:bg-white/5"
                  : "text-stone-600 hover:text-stone-900 hover:bg-black/5"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`xl:hidden overflow-hidden transition-all duration-400 ease-out ${
        mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className={`mx-4 mb-4 p-4 rounded-2xl border backdrop-blur-xl ${
          isDark
            ? "bg-[#0c0d14]/95 border-white/10"
            : "bg-white/95 border-black/10 shadow-xl"
        }`}>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-[#d4af37] bg-[#d4af37]/10 font-semibold"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-white/5"
                        : "text-stone-600 hover:text-stone-900 hover:bg-black/5"
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0" />}
                  {t(link.key, selectedLang)}
                </a>
              );
            })}
          </div>

          <div className={`mt-3 pt-3 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang.code)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg border text-[10px] font-sans font-medium transition-all duration-200 cursor-pointer ${
                    selectedLang === lang.code
                      ? isDark
                        ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
                        : "border-[#aa7c11] bg-[#aa7c11]/10 text-[#aa7c11] font-semibold"
                      : isDark
                        ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                        : "border-black/10 bg-black/5 text-stone-600 hover:bg-black/10"
                  }`}
                >
                  <span className="text-xs">{lang.flag}</span>
                  <span className="uppercase tracking-wider">{lang.code}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#d4af37] text-black font-sans text-xs uppercase font-bold tracking-wider py-3 rounded-xl hover:bg-[#e7c96a] transition-all duration-300"
            >
              <Phone className="w-3.5 h-3.5" />
              {t("nav.bookConsultation", selectedLang)}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
