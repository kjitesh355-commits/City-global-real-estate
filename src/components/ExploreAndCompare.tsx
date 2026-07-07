import React, { useState, useEffect } from "react";
import { t } from "../utils/translations";
import { MapPin, ArrowRight, ArrowLeftRight, Building, ChevronDown, Star, TrendingUp, Maximize2, Home } from "lucide-react";
import { Property } from "../types";
import { Map, MapMarker, MarkerContent, MarkerLabel } from "./ui/mapcn-marker-label";
import { GradientBackground } from "./ui/gradient-background-4";
import { ScrollReveal, SlideIn } from "./ui/scroll-reveal";

interface ExploreAndCompareProps {
  properties: Property[];
  theme: "light" | "dark";
}

interface AreaDetails {
  name: string;
  count: number;
  minPrice: string;
  imgUrl: string;
  lng: number;
  lat: number;
}

export default function ExploreAndCompare({ properties, theme }: ExploreAndCompareProps) {
  const isDark = theme === "dark";
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

  const [selectedArea, setSelectedArea] = useState<string>("Downtown Dubai");

  const areas: { [key: string]: AreaDetails } = {
    "Palm Jumeirah": {
      name: "Palm Jumeirah", count: 84, minPrice: "AED 12.5M",
      imgUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80",
      lng: 55.1390, lat: 25.1124
    },
    "Downtown Dubai": {
      name: "Downtown Dubai", count: 126, minPrice: "AED 1.2M",
      imgUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=80",
      lng: 55.2744, lat: 25.1972
    },
    "Business Bay": {
      name: "Business Bay", count: 95, minPrice: "AED 1.8M",
      imgUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80",
      lng: 55.2730, lat: 25.1852
    },
    "Bluewaters": {
      name: "Bluewaters", count: 42, minPrice: "AED 4.5M",
      imgUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80",
      lng: 55.1228, lat: 25.0792
    },
    "Dubai Hills": {
      name: "Dubai Hills", count: 67, minPrice: "AED 3.8M",
      imgUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=300&q=80",
      lng: 55.2667, lat: 25.1167
    },
    "Dubai Creek Harbour": {
      name: "Dubai Creek Harbour", count: 110, minPrice: "AED 1.5M",
      imgUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80",
      lng: 55.3524, lat: 25.1990
    },
    "JVC": {
      name: "JVC", count: 148, minPrice: "AED 850K",
      imgUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80",
      lng: 55.2078, lat: 25.0600
    },
    "Dubai Marina": {
      name: "Dubai Marina", count: 104, minPrice: "AED 1.9M",
      imgUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80",
      lng: 55.1390, lat: 25.0784
    }
  };

  const activeAreaDetails = areas[selectedArea] || areas["Downtown Dubai"];

  const [viewport, setViewport] = useState({
    center: [55.22, 25.13] as [number, number],
    zoom: 10.3, bearing: 0, pitch: 0
  });

  const handleAreaSelect = (key: string) => {
    setSelectedArea(key);
    const area = areas[key];
    if (area) {
      setViewport({ center: [area.lng, area.lat], zoom: 11.2, bearing: 0, pitch: 0 });
    }
  };

  const [compareId1, setCompareId1] = useState<string>("frond-g-villa");
  const [compareId2, setCompareId2] = useState<string>("address-residences");

  const fallbackProperty: Property = {
    id: "loading", name: "Loading...", area: "Dubai", price: 0, beds: 0, baths: 0, size: 0,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80",
    developer: "City Global", rentalYield: 0, appreciation: 0, capitalGrowth: 0,
    risk: "Low Risk", completion: "Ready", description: "", coordinates: { x: 0, y: 0 }
  };

  const prop1 = properties.find((p) => p.id === compareId1) || properties[0] || fallbackProperty;
  const prop2 = properties.find((p) => p.id === compareId2) || properties[1] || properties[0] || fallbackProperty;

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `AED ${(price / 1000000).toFixed(1)}M`;
    return `AED ${(price / 1000).toFixed(0)}K`;
  };

  const bestYield = prop1.rentalYield > prop2.rentalYield ? prop1 : prop2;
  const yieldDiff = Math.abs(prop1.rentalYield - prop2.rentalYield).toFixed(1);

  return (
    <section id="explore-section" className="relative z-10 w-full py-20 md:py-28 overflow-hidden">
      <GradientBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-wide ${isDark ? "text-white" : "text-[#1c1917]"}`}>
              {t("explore.title", lang)}
            </h2>
            <p className={`text-sm max-w-lg mx-auto leading-relaxed ${isDark ? "text-gray-400" : "text-stone-500"}`}>
              {t("explore.desc", lang)}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ============ MAP COLUMN ============ */}
          <SlideIn from="left">
            <div className="flex flex-col h-full">
              {/* Map Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className={`font-serif text-xl font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-[#1c1917]"}`}>
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                  {t("explore.dubaiMap", lang)}
                </h3>
                <button className={`text-xs transition-colors flex items-center gap-1 hover:text-[#d4af37] ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                  {t("explore.viewAll", lang)} <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Map Container */}
              <div className="relative rounded-2xl overflow-hidden glass h-96 sm:h-[420px]">
                <Map
                  viewport={viewport}
                  onViewportChange={(v) => setViewport(v)}
                  theme={theme}
                  className="w-full h-full"
                >
                  {Object.keys(areas).map((key) => {
                    const area = areas[key];
                    const isSelected = selectedArea === key;
                    return (
                      <MapMarker
                        key={key}
                        longitude={area.lng}
                        latitude={area.lat}
                        onClick={() => handleAreaSelect(key)}
                      >
                        <MarkerContent>
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${
                              isSelected
                                ? "bg-[#d4af37] border-white scale-125"
                                : "bg-[#0c0e14] border-[#d4af37]/60 hover:border-[#d4af37] hover:scale-110"
                            }`} />
                            <MarkerLabel position="bottom">
                              <span className={`text-[9px] px-1.5 py-0.5 rounded transition-all whitespace-nowrap ${
                                isSelected
                                  ? "bg-[#d4af37] text-black font-semibold"
                                  : isDark ? "bg-[#0e1015]/90 text-gray-300 border-white/10" : "bg-white/90 text-stone-700 border-stone-200"
                              }`}>
                                {area.name}
                              </span>
                            </MarkerLabel>
                          </div>
                        </MarkerContent>
                      </MapMarker>
                    );
                  })}
                </Map>

                {/* Floating Area Card */}
                <div className="absolute top-3 left-3 z-30 glass rounded-xl p-3 w-56">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={activeAreaDetails.imgUrl} alt={activeAreaDetails.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left min-w-0">
                      <h4 className="font-serif text-sm font-bold text-[#f3e5ab] truncate">{activeAreaDetails.name}</h4>
                      <p className={`text-[10px] ${isDark ? "text-gray-400" : "text-stone-500"}`}>{activeAreaDetails.count} {t("explore.properties", lang)}</p>
                      <p className="text-[11px] font-semibold text-[#d4af37]">{t("explore.from", lang)} {activeAreaDetails.minPrice}</p>
                    </div>
                  </div>
                </div>

                {/* Area Chips */}
                <div className="absolute bottom-3 left-3 right-3 z-30 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {Object.keys(areas).map((key) => {
                    const area = areas[key];
                    const isActive = selectedArea === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleAreaSelect(key)}
                        className={`flex-shrink-0 text-[9px] px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#d4af37] text-black font-semibold"
                            : isDark ? "glass text-gray-300 hover:text-white" : "bg-stone-100 text-stone-600 hover:text-stone-900"
                        }`}
                      >
                        {area.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </SlideIn>

          {/* ============ COMPARE COLUMN ============ */}
          <SlideIn from="right">
            <div className="flex flex-col h-full">
              {/* Compare Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className={`font-serif text-xl font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-[#1c1917]"}`}>
                  <ArrowLeftRight className="w-5 h-5 text-[#d4af37]" />
                  {t("explore.compareTitle", lang)}
                </h3>
              </div>

              {/* Comparison Panel */}
              <div className="glass rounded-2xl flex flex-col p-5 h-96 sm:h-[420px] justify-between">
                {/* Property Selectors */}
                <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("explore.propertyA", lang)}</label>
                    <div className="relative">
                      <select
                        value={compareId1}
                        onChange={(e) => setCompareId1(e.target.value)}
                        className={`w-full rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-[#d4af37]/50 appearance-none cursor-pointer ${isDark ? "bg-white/[0.03] border border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}
                      >
                        {properties.map(p => (
                          <option key={p.id} value={p.id} className={isDark ? "bg-[#0e1015] text-white" : "bg-white text-stone-900"}>{p.name}</option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#d4af37] text-black text-xs font-bold flex items-center justify-center mb-0.5 shadow-lg shadow-[#d4af37]/20">
                    {t("explore.vs", lang)}
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("explore.propertyB", lang)}</label>
                    <div className="relative">
                      <select
                        value={compareId2}
                        onChange={(e) => setCompareId2(e.target.value)}
                        className={`w-full rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-[#d4af37]/50 appearance-none cursor-pointer ${isDark ? "bg-white/[0.03] border border-white/10 text-white" : "bg-white border-stone-200 text-stone-900"}`}
                      >
                        {properties.map(p => (
                          <option key={p.id} value={p.id} className={isDark ? "bg-[#0e1015] text-white" : "bg-white text-stone-900"}>{p.name}</option>
                        ))}
                      </select>
                      <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none ${isDark ? "text-gray-500" : "text-stone-400"}`} />
                    </div>
                  </div>
                </div>

                {/* Side-by-side Property Cards */}
                <div className="grid grid-cols-2 gap-5 mt-5 flex-1">
                  {/* Left Property */}
                  <div className="flex flex-col">
                    <div className="rounded-xl overflow-hidden mb-3 h-24 relative">
                      <img src={prop1.imageUrl} alt={prop1.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className={`font-serif text-sm font-bold truncate ${isDark ? "text-white" : "text-[#1c1917]"}`}>{prop1.name}</p>
                        <p className={`text-[10px] ${isDark ? "text-gray-300" : "text-stone-600"}`}>{prop1.area}</p>
                      </div>
                    </div>

                    <div className="space-y-2.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("explore.price", lang)}</span>
                        <span className="font-num text-sm font-bold text-[#f3e5ab]">{formatPrice(prop1.price)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("explore.yield", lang)}</span>
                        <span className="font-num text-sm font-bold text-emerald-400">{prop1.rentalYield}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("explore.size", lang)}</span>
                        <span className={`font-num text-xs ${isDark ? "text-gray-300" : "text-stone-600"}`}>{prop1.size.toLocaleString()} {t("explore.sqft", lang)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("explore.config", lang)}</span>
                        <span className={`font-num text-xs ${isDark ? "text-gray-300" : "text-stone-600"}`}>{prop1.beds} Bed / {prop1.baths} Bath</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("explore.status", lang)}</span>
                        <span className="text-xs text-[#d4af37] font-medium">{prop1.completion}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Property */}
                  <div className="flex flex-col">
                    <div className="rounded-xl overflow-hidden mb-3 h-24 relative">
                      <img src={prop2.imageUrl} alt={prop2.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className={`font-serif text-sm font-bold truncate ${isDark ? "text-white" : "text-[#1c1917]"}`}>{prop2.name}</p>
                        <p className={`text-[10px] ${isDark ? "text-gray-300" : "text-stone-600"}`}>{prop2.area}</p>
                      </div>
                    </div>

                    <div className="space-y-2.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("explore.price", lang)}</span>
                        <span className="font-num text-sm font-bold text-[#f3e5ab]">{formatPrice(prop2.price)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("explore.yield", lang)}</span>
                        <span className="font-num text-sm font-bold text-emerald-400">{prop2.rentalYield}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("explore.size", lang)}</span>
                        <span className={`font-num text-xs ${isDark ? "text-gray-300" : "text-stone-600"}`}>{prop2.size.toLocaleString()} {t("explore.sqft", lang)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("explore.config", lang)}</span>
                        <span className={`font-num text-xs ${isDark ? "text-gray-300" : "text-stone-600"}`}>{prop2.beds} Bed / {prop2.baths} Bath</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] uppercase tracking-wider ${isDark ? "text-gray-500" : "text-stone-400"}`}>{t("explore.status", lang)}</span>
                        <span className="text-xs text-[#d4af37] font-medium">{prop2.completion}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Summary Bar */}
                <div className={`mt-3 p-3 rounded-xl flex items-center gap-3 ${isDark ? "bg-white/[0.03] border-white/5" : "bg-stone-50 border-stone-200/60"}`}>
                  <TrendingUp className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <p className={`text-[11px] ${isDark ? "text-gray-400" : "text-stone-500"}`}>
                    <span className={`${isDark ? "text-white" : "text-[#1c1917]"} font-medium`}>{bestYield.name}</span> offers{" "}
                    <span className="text-[#d4af37] font-semibold">{yieldDiff}% {t("explore.higherYield", lang)}</span>
                    {" "}{t("explore.than", lang)} {bestYield.id === prop1.id ? prop2.name : prop1.name}
                  </p>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
