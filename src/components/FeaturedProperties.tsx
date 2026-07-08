import React, { useState, useEffect } from "react";
import { Bed, Bath, Maximize2, Heart, Star, Sparkles, RefreshCw, Eye, LayoutGrid, Layers } from "lucide-react";
import { Property } from "../types";
import { CardStack, CardStackItem } from "./ui/card-stack";
import { t } from "../utils/translations";
import { GradientBackground } from "./ui/gradient-background-4";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ui/scroll-reveal";

interface PropertyCardItem extends CardStackItem {
  property: Property;
}

interface FeaturedPropertiesProps {
  properties: Property[];
  aiResults: Property[] | null;
  isAiSearching: boolean;
  aiError: string | null;
  onClearAISearch: () => void;
  onOpen3DModal: (property: Property) => void;
  onPropertyClick: (property: Property) => void;
  theme: "light" | "dark";
}

export default function FeaturedProperties({
  properties,
  aiResults,
  isAiSearching,
  aiError,
  onClearAISearch,
  onOpen3DModal,
  onPropertyClick,
  theme
}: FeaturedPropertiesProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Language State
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
  // Store selected sub-image category for each property
  const [viewCategories, setViewCategories] = useState<{ [propId: string]: string }>({});
  
  // Choose "deck" as default to highlight the immersive premium animation
  const [viewMode, setViewMode] = useState<"grid" | "deck">("deck");

  // Dynamic responsive dimensions for CardStack
  const [containerWidth, setContainerWidth] = useState(520);
  const [containerHeight, setContainerHeight] = useState(320);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setContainerWidth(Math.min(w - 32, 345));
        setContainerHeight(420); // allow slightly taller cards on mobile
      } else if (w < 1024) {
        setContainerWidth(480);
        setContainerHeight(320);
      } else {
        setContainerWidth(600);
        setContainerHeight(340);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleCategorySelect = (propertyId: string, category: string) => {
    setViewCategories(prev => ({ ...prev, [propertyId]: category }));
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(1)}M`;
    }
    return `AED ${price.toLocaleString()}`;
  };

  // Determine what list to display
  const isViewingAI = aiResults !== null || isAiSearching;
  const displayProperties = aiResults !== null ? aiResults : properties.slice(0, 3);

  // Map properties to card stack items
  const cardItems: PropertyCardItem[] = displayProperties.map((p) => ({
    id: p.id,
    title: p.name,
    description: p.description,
    imageSrc: p.imageUrl,
    href: `#property-${p.id}`,
    tag: p.area,
    property: p
  }));

  // Custom luxury renderer for card stack cards
  const renderCustomCard = (item: PropertyCardItem, state: { active: boolean }) => {
    const p = item.property;
    const isFavorite = favorites.includes(p.id);
    const activeCategory = viewCategories[p.id] || "exterior";
    
    let imageSrc = p.imageUrl;
    if (p.views) {
      if (activeCategory === "exterior") imageSrc = p.views.exterior;
      else if (activeCategory === "living") imageSrc = p.views.living;
      else if (activeCategory === "kitchen") imageSrc = p.views.kitchen;
      else if (activeCategory === "bedroom") imageSrc = p.views.bedroom;
      else if (activeCategory === "tour3d") imageSrc = p.views.tour3d;
    }

    return (
      <div 
        className={`relative w-full h-full rounded-xl overflow-hidden flex flex-col sm:flex-row shadow-2xl group text-left transition-all duration-300 cursor-pointer ${
          theme === "dark" ? "bg-[#0e1015] border border-white/10" : "bg-white border-2 border-stone-200/90 shadow-md"
        }`}
        onClick={() => onPropertyClick(p)}
      >
        {/* Left/Top: Image Area */}
        <div className="relative w-full sm:w-1/2 h-44 sm:h-full overflow-hidden flex-shrink-0">
          <img
            src={imageSrc}
            alt={p.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/85 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent sm:hidden" />
          
          {p.popular && (
            <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm">
              {t("prop.popular", lang)}
            </div>
          )}

          {p.matchPercentage !== undefined && (
            <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-emerald-600 to-[#d4af37] text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-md">
              <Sparkles className="w-2.5 h-2.5 text-white" />
              <span>{p.matchPercentage}% {t("prop.match", lang)}</span>
            </div>
          )}
        </div>

        {/* Right/Bottom: Property Details */}
        <div className={`flex-grow p-4 sm:p-5 flex flex-col justify-between transition-colors duration-300 bg-gradient-to-br ${
          theme === "dark" ? "from-[#0e1015] to-[#07080a]" : "from-white to-[#fdfdfc]"
        }`}>
          <div>
            <div className="flex justify-between items-start mb-1">
              <span className={`font-sans text-[9px] uppercase tracking-[0.2em] font-semibold ${
                theme === "dark" ? "text-[#d4af37]" : "text-[#aa7c11]"
              }`}>
                {p.area}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(p.id);
                }}
                className="text-gray-400 hover:text-[#d4af37] transition-colors"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-[#d4af37] text-[#d4af37]" : ""}`} />
              </button>
            </div>
            
            <h4 className={`font-serif text-sm sm:text-base font-bold tracking-wide mb-2 truncate transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-stone-900"
            }`}>
              {p.name}
            </h4>

            {p.aiExplanation ? (
              <p className={`text-[10px] italic font-sans leading-relaxed line-clamp-3 mb-3 p-2 rounded border transition-colors duration-300 ${
                theme === "dark" ? "bg-[#d4af37]/5 border-[#d4af37]/15 text-gray-300" : "bg-[#aa7c11]/5 border-[#aa7c11]/15 text-stone-800"
              }`}>
                "{p.aiExplanation}"
              </p>
            ) : (
              <p className={`text-[10px] font-light leading-relaxed line-clamp-2 mb-3 font-sans transition-colors duration-300 ${
                theme === "dark" ? "text-gray-400" : "text-stone-600"
              }`}>
                {p.description}
              </p>
            )}

            {/* Specs Row */}
            <div className={`grid grid-cols-3 gap-1 py-1.5 mb-3 text-[10px] font-sans transition-colors duration-300`}>
              <div className={`flex items-center gap-1 transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-stone-700"}`}>
                <Bed className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{p.beds} {t("prop.bedsUnit", lang)}</span>
              </div>
              <div className={`flex items-center gap-1 transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-stone-700"}`}>
                <Bath className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{p.baths} {t("prop.bathsUnit", lang)}</span>
              </div>
              <div className={`flex items-center gap-1 truncate transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-stone-700"}`}>
                <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="truncate">{p.size.toLocaleString()} sqft</span>
              </div>
            </div>
          </div>

          {/* Pricing and Action row */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col text-left">
              <span className={`text-[8px] uppercase tracking-wider font-semibold transition-colors duration-300 ${
                theme === "dark" ? "text-gray-500" : "text-stone-400"
              }`}>{t("prop.startingPrice", lang)}</span>
              <span className={`font-num text-sm sm:text-base font-bold leading-none transition-colors duration-300 ${
                theme === "dark" ? "text-[#f3e5ab]" : "text-[#aa7c11]"
              }`}>
                {formatPrice(p.price)}
              </span>
            </div>

            <div className="flex gap-1.5">
              {p.popular && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen3DModal(p);
                  }}
                  className="cursor-pointer bg-[#231f13] hover:bg-[#d4af37] text-[#d4af37] hover:text-black border border-[#d4af37]/30 px-3 py-1 rounded-sm text-[9px] font-sans font-bold uppercase tracking-widest transition-all flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>{t("prop.tour3d", lang)}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="featured-properties" className={`relative z-10 w-full py-16 overflow-hidden transition-colors duration-500 ${
      theme === "dark" ? "" : ""
    }`}>
      <GradientBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      
      {/* Header Row */}
      <ScrollReveal>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          {isViewingAI ? (
            <div className="flex items-center gap-2 mb-2 text-left">
              <Sparkles className="w-5 h-5 text-[#d4af37] animate-pulse" />
              <span className="font-sans text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold">
                {t("prop.aiDiscovery", lang)}
              </span>
            </div>
          ) : (
            <p className="font-sans text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold mb-2 text-left">
              {t("prop.curated", lang)}
            </p>
          )}
          <h2 className={`font-serif text-2xl sm:text-3.5xl font-semibold tracking-wide text-left transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-stone-900"
          }`}>
            {isViewingAI ? t("prop.aiCurated", lang) : t("prop.featured", lang)}
          </h2>
        </div>

        {/* Curation toggle switcher & Reset controller */}
        <div className="flex flex-wrap items-center gap-4 self-start md:self-auto">
          
          {/* Deck / Grid Mode Switcher */}
          <div className={`rounded-full p-1 flex items-center gap-1.5 shadow-xl border transition-colors duration-300 ${
            theme === "dark" ? "bg-[#0e1015]/90 border border-white/10" : "bg-white border-stone-200"
          }`}>
            <button
              onClick={() => setViewMode("deck")}
              className={`cursor-pointer px-4 py-1.5 rounded-full text-[9px] font-sans uppercase font-bold tracking-widest transition-all flex items-center gap-1.5 ${
                viewMode === "deck"
                  ? "bg-[#d4af37] text-black"
                  : (theme === "dark" ? "text-gray-400 hover:text-white" : "text-stone-500 hover:text-stone-900")
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t("prop.fanDeck", lang)}</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`cursor-pointer px-4 py-1.5 rounded-full text-[9px] font-sans uppercase font-bold tracking-widest transition-all flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-[#d4af37] text-black"
                  : (theme === "dark" ? "text-gray-400 hover:text-white" : "text-stone-500 hover:text-stone-900")
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t("prop.gridView", lang)}</span>
            </button>
          </div>

          {isViewingAI ? (
            <button
              onClick={onClearAISearch}
              className="cursor-pointer flex items-center gap-1.5 text-xs text-[#d4af37] hover:text-[#f3e5ab] font-sans border border-[#d4af37]/30 hover:border-[#d4af37] px-4 py-1.5 rounded-full transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t("prop.resetAI", lang)}</span>
            </button>
          ) : (
            <div className="flex items-center gap-6">
              <a href="#all-properties" className={`font-sans text-xs uppercase tracking-widest transition-colors ${
                theme === "dark" ? "text-gray-400 hover:text-[#d4af37]" : "text-stone-500 hover:text-[#aa7c11]"
              }`}>
                {t("prop.viewAll", lang)}
              </a>
            </div>
          )}
        </div>
      </div>
      </ScrollReveal>

      {/* Loading & Error States for AI Search */}
      {isAiSearching && (
        <div className="flex flex-col items-center justify-center py-20 text-center glass rounded-xl border border-[#d4af37]/20">
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37] animate-spin" />
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[#d4af37] animate-pulse" />
          </div>
          <h3 className="font-serif text-lg text-[#f3e5ab] mb-2 font-semibold">{t("prop.consulting", lang)}</h3>
          <p className="font-sans text-xs text-gray-400 max-w-md px-4">
            {t("prop.engineParsing", lang)}
          </p>
        </div>
      )}

      {aiError && (
        <div className="p-6 text-center glass rounded-xl border border-red-900/30 text-gray-300 max-w-xl mx-auto my-10">
          <p className="text-red-400 text-sm mb-4">{aiError}</p>
          <button
            onClick={onClearAISearch}
            className="cursor-pointer bg-red-950/40 hover:bg-red-900/40 border border-red-700/50 text-xs px-4 py-2 rounded-full font-sans transition-all"
          >
            {t("prop.clearSearch", lang)}
          </button>
        </div>
      )}

      {/* Main viewport based on user configuration */}
      {!isAiSearching && !aiError && (
        viewMode === "grid" ? (
          /* Grid of properties (Standard view) */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {displayProperties.map((property) => {
              const isFavorite = favorites.includes(property.id);
              const activeCategory = viewCategories[property.id] || "exterior";
              
              let imageSrc = property.imageUrl;
              if (property.views) {
                if (activeCategory === "exterior") imageSrc = property.views.exterior;
                else if (activeCategory === "living") imageSrc = property.views.living;
                else if (activeCategory === "kitchen") imageSrc = property.views.kitchen;
                else if (activeCategory === "bedroom") imageSrc = property.views.bedroom;
                else if (activeCategory === "tour3d") imageSrc = property.views.tour3d;
              }

              const isPopular = property.popular;

              return (
                <div
                  key={property.id}
                  className={`relative rounded-lg overflow-hidden flex flex-col h-full shadow-xl transition-all duration-500 hover:border-[#d4af37]/40 border cursor-pointer ${
                    theme === "dark"
                      ? `bg-[#0e1015]/90 border border-white/10 ${isPopular ? "gold-border-glow bg-[#121110]" : ""}`
                      : `bg-white border-stone-200/95 ${isPopular ? "gold-border-glow bg-stone-50" : ""}`
                  }`}
                  onClick={() => onPropertyClick(property)}
                >
                  
                  {/* Image & Badges Container */}
                  <div className="relative h-64 overflow-hidden group/img flex-shrink-0">
                    
                    {/* Popular Tag */}
                    {isPopular && (
                      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-[#d4af37] to-[#aa7c11] text-black text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm shadow-md">
                        {t("prop.popular", lang)}
                      </div>
                    )}

                    {/* AI Match Percentage badge */}
                    {property.matchPercentage !== undefined && (
                      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-emerald-600 to-[#d4af37] text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-sm shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-white" />
                        <span>{property.matchPercentage}% {t("prop.match", lang)}</span>
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(property.id)}
                      className={`cursor-pointer absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border hover:border-[#d4af37] hover:text-[#d4af37] flex items-center justify-center text-white transition-all duration-300 ${
                        theme === "dark" ? "border-white/10" : "border-stone-200"
                      }`}
                    >
                      <Heart className={`w-4.5 h-4.5 ${isFavorite ? "fill-[#d4af37] text-[#d4af37]" : ""}`} />
                    </button>

                    {/* Property Image with lazy loading */}
                    <img
                      src={imageSrc}
                      alt={property.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                    />

                    {/* Interactive Sub-Image Buttons OVERLAID */}
                    {property.views && (
                      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-1 px-2">
                        <div className="flex bg-black/60 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/5 gap-1.5 shadow-lg">
                          {[
                            { key: "exterior", label: t("prop.exterior", lang) },
                            { key: "living", label: t("prop.living", lang) },
                            { key: "kitchen", label: t("prop.kitchen", lang) },
                            { key: "bedroom", label: t("prop.bedroom", lang) },
                            { key: "tour3d", label: t("prop.tour3d", lang) }
                          ].map((cat) => (
                            <button
                              key={cat.key}
                              type="button"
                              onClick={() => handleCategorySelect(property.id, cat.key)}
                              className={`cursor-pointer px-2.5 py-1 text-[9px] uppercase tracking-widest rounded-full transition-all font-sans font-medium ${
                                activeCategory === cat.key
                                  ? "bg-[#d4af37] text-black font-semibold"
                                  : "text-gray-300 hover:text-white hover:bg-white/10"
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow text-left">
                    
                    {/* Location Area */}
                    <p className={`font-sans text-[10px] uppercase tracking-[0.2em] font-semibold mb-1 ${
                      theme === "dark" ? "text-[#d4af37]" : "text-[#aa7c11]"
                    }`}>
                      {property.area}
                    </p>

                    {/* Property Title */}
                    <h3 className={`font-serif text-lg font-bold tracking-wide mb-3 transition-colors duration-300 ${
                      theme === "dark" ? "text-white hover:text-[#d4af37]" : "text-stone-900 hover:text-[#aa7c11]"
                    }`}>
                      {property.name}
                    </h3>

                    {/* AI Explanation block */}
                    {property.aiExplanation && (
                      <div className={`p-3 rounded mb-4 text-[11px] italic font-sans leading-relaxed flex gap-2 transition-all ${
                        theme === "dark"
                          ? "bg-[#d4af37]/5 border border-[#d4af37]/20 text-gray-300"
                          : "bg-[#aa7c11]/5 border border-[#aa7c11]/20 text-stone-800"
                      }`}>
                        <Sparkles className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                        <span>{property.aiExplanation}</span>
                      </div>
                    )}

                    {!property.aiExplanation && (
                      <p className={`text-xs font-light line-clamp-2 mb-4 leading-relaxed font-sans transition-colors duration-300 ${
                        theme === "dark" ? "text-gray-400" : "text-stone-600"
                      }`}>
                        {property.description}
                      </p>
                    )}

                    {/* Specs row */}
                    <div className={`grid grid-cols-3 gap-2 py-3 mb-6 font-sans transition-colors duration-300`}>
                      <div className={`flex items-center gap-1.5 text-xs font-light transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-stone-700"}`}>
                        <Bed className="w-4 h-4 text-[#d4af37]" />
                        <span>{property.beds} {t("prop.bedsUnit", lang)}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs font-light transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-stone-700"}`}>
                        <Bath className="w-4 h-4 text-[#d4af37]" />
                        <span>{property.baths} {t("prop.bathsUnit", lang)}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs font-light truncate transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-stone-700"}`}>
                        <Maximize2 className="w-4 h-4 text-[#d4af37]" />
                        <span>{property.size.toLocaleString()} sqft</span>
                      </div>
                    </div>

                    {/* Price and Developer Row */}
                    <div className={`mt-auto flex items-center justify-between pt-4 transition-colors duration-300`}>
                      <div className="flex flex-col">
                        <span className={`font-sans text-[10px] uppercase tracking-wider font-semibold transition-colors duration-300 ${
                          theme === "dark" ? "text-gray-500" : "text-stone-400"
                        }`}>{t("prop.fromPrice", lang)}</span>
                        <span className={`font-serif text-base font-bold tracking-wide transition-colors duration-300 ${
                          theme === "dark" ? "text-[#f3e5ab]" : "text-[#aa7c11]"
                        }`}>{formatPrice(property.price)}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`font-sans text-[10px] uppercase tracking-wider font-semibold transition-colors duration-300 ${
                          theme === "dark" ? "text-gray-500" : "text-stone-400"
                        }`}>{t("prop.developer", lang)}</span>
                        <span className={`font-serif text-xs font-bold tracking-widest transition-colors duration-300 ${
                          theme === "dark" ? "text-gray-300" : "text-stone-700"
                        }`}>{property.developer}</span>
                      </div>
                    </div>

                    {/* 3D Exploration Button */}
                    {isPopular && (
                      <button
                        onClick={() => onOpen3DModal(property)}
                        className={`cursor-pointer mt-5 w-full border font-sans text-xs uppercase font-semibold tracking-widest py-2.5 rounded-sm transition-all flex items-center justify-center gap-2 ${
                          theme === "dark"
                            ? "bg-[#231f13] hover:bg-[#d4af37] text-[#d4af37] hover:text-black border-[#d4af37]/30 hover:border-transparent"
                            : "bg-[#aa7c11]/10 hover:bg-[#aa7c11] text-[#aa7c11] hover:text-white border-[#aa7c11]/30 hover:border-transparent"
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                        <span>{t("prop.explore3d", lang)}</span>
                      </button>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Card Stack Immersive Presentation */
          <div className="flex flex-col items-center justify-center relative min-h-[440px] animate-in fade-in zoom-in-95 duration-500">
            <div className="w-full max-w-3xl px-4">
              <CardStack
                items={cardItems}
                cardWidth={containerWidth}
                cardHeight={containerHeight}
                renderCard={renderCustomCard}
                showDots={true}
                autoAdvance={false}
                loop={true}
                overlap={0.52}
                spreadDeg={32}
              />
            </div>
          </div>
        )
      )}

      {/* Slide Indicators / Guide Accent */}
      {viewMode === "grid" && displayProperties.length > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {displayProperties.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === 0 ? "w-4 bg-[#d4af37]" : "bg-gray-700 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      )}
      </div>
    </section>
  );
}

