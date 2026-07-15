import React, { useState, useEffect } from "react";
import { X, Bed, Bath, Maximize2, MapPin, Building, ChevronLeft, ChevronRight, Download, ExternalLink, Phone, Mail, Globe, MapPinOff } from "lucide-react";
import { Property } from "../types";
import { formatPrice as formatPriceCurrency, CurrencyCode } from "../utils/currency";

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
  theme: "light" | "dark";
}

export default function PropertyDetailModal({ property, onClose, theme }: PropertyDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.allImages || [property.imageUrl];

  // Currency State
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("app-currency") as CurrencyCode) || "AED";
    }
    return "AED";
  });

  useEffect(() => {
    const handleCurrencyChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setCurrency(customEvent.detail);
      }
    };
    window.addEventListener("currency-change", handleCurrencyChange);
    return () => window.removeEventListener("currency-change", handleCurrencyChange);
  }, []);

  const formatPrice = (price: number) => {
    return formatPriceCurrency(price, currency);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={onClose}>
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${
          theme === "dark" ? "bg-[#0e1015] border border-white/10" : "bg-white border border-stone-200"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#d4af37] hover:text-black transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Gallery */}
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={property.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#d4af37] hover:text-black transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#d4af37] hover:text-black transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImageIndex ? "bg-[#d4af37] w-4" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Property Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-1">
              {property.area}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {property.name}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Price and Quick Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1">Starting Price</p>
              <p className="font-serif text-2xl font-bold text-[#f3e5ab]">{formatPrice(property.price)}</p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-gray-300">
                <Bed className="w-5 h-5 text-[#d4af37]" />
                <span className="font-sans text-sm">{property.beds} Beds</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Bath className="w-5 h-5 text-[#d4af37]" />
                <span className="font-sans text-sm">{property.baths} Baths</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Maximize2 className="w-5 h-5 text-[#d4af37]" />
                <span className="font-sans text-sm">{property.size.toLocaleString()} sqft</span>
              </div>
            </div>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-white/5" : "bg-stone-100"}`}>
              <p className="font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1">Developer</p>
              <p className="font-sans text-sm font-semibold text-white">{property.developer}</p>
            </div>
            <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-white/5" : "bg-stone-100"}`}>
              <p className="font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1">Completion</p>
              <p className="font-sans text-sm font-semibold text-white">{property.completion}</p>
            </div>
            <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-white/5" : "bg-stone-100"}`}>
              <p className="font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1">Risk Level</p>
              <p className="font-sans text-sm font-semibold text-white">{property.risk}</p>
            </div>
            <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-white/5" : "bg-stone-100"}`}>
              <p className="font-sans text-[10px] uppercase tracking-wider text-gray-500 mb-1">Rental Yield</p>
              <p className="font-sans text-sm font-semibold text-[#d4af37]">{property.rentalYield}%</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-serif text-lg font-bold text-white mb-4">About This Property</h3>
            <p className="font-sans text-sm text-gray-400 leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="mb-8">
              <h3 className="font-serif text-lg font-bold text-white mb-4">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-3 py-1.5 rounded-full text-xs font-sans bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Locations */}
          {property.nearbyLocations && property.nearbyLocations.length > 0 && (
            <div className="mb-8">
              <h3 className="font-serif text-lg font-bold text-white mb-4">Nearby Locations</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.nearbyLocations.map((loc) => (
                  <div
                    key={loc.name}
                    className={`flex items-center gap-3 p-3 rounded-lg ${theme === "dark" ? "bg-white/5" : "bg-stone-100"}`}
                  >
                    <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-white">{loc.name}</p>
                      <p className="font-sans text-[10px] text-gray-500">{loc.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Investment Metrics */}
          <div className="mb-8">
            <h3 className="font-serif text-lg font-bold text-white mb-4">Investment Metrics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg text-center ${theme === "dark" ? "bg-white/5" : "bg-stone-100"}`}>
                <p className="font-sans text-2xl font-bold text-[#d4af37]">{property.rentalYield}%</p>
                <p className="font-sans text-[10px] uppercase tracking-wider text-gray-500">Rental Yield</p>
              </div>
              <div className={`p-4 rounded-lg text-center ${theme === "dark" ? "bg-white/5" : "bg-stone-100"}`}>
                <p className="font-sans text-2xl font-bold text-[#d4af37]">{property.appreciation}%</p>
                <p className="font-sans text-[10px] uppercase tracking-wider text-gray-500">Appreciation</p>
              </div>
              <div className={`p-4 rounded-lg text-center ${theme === "dark" ? "bg-white/5" : "bg-stone-100"}`}>
                <p className="font-sans text-2xl font-bold text-[#d4af37]">{property.capitalGrowth}%</p>
                <p className="font-sans text-[10px] uppercase tracking-wider text-gray-500">Capital Growth</p>
              </div>
            </div>
          </div>

          {/* Developer Info */}
          {property.developerInfo && (
            <div className="mb-8">
              <h3 className="font-serif text-lg font-bold text-white mb-4">About Developer</h3>
              <div className={`p-5 rounded-lg ${theme === "dark" ? "bg-white/5" : "bg-stone-100"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-5 h-5 text-[#d4af37]" />
                  <p className="font-sans text-sm font-semibold text-white">{property.developerInfo.name}</p>
                </div>
                <p className="font-sans text-xs text-gray-400 leading-relaxed mb-4">{property.developerInfo.description}</p>
                <div className="flex flex-wrap gap-4">
                  <a href={`tel:${property.developerInfo.phone}`} className="flex items-center gap-2 text-xs text-[#d4af37] hover:text-[#f3e5ab]">
                    <Phone className="w-3.5 h-3.5" />
                    {property.developerInfo.phone}
                  </a>
                  <a href={`mailto:${property.developerInfo.email}`} className="flex items-center gap-2 text-xs text-[#d4af37] hover:text-[#f3e5ab]">
                    <Mail className="w-3.5 h-3.5" />
                    {property.developerInfo.email}
                  </a>
                  <a href={property.developerInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#d4af37] hover:text-[#f3e5ab]">
                    <Globe className="w-3.5 h-3.5" />
                    Website
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Floor Plans Preview */}
          {property.floorPlanUrl && (
            <div className="mb-8">
              <h3 className="font-serif text-lg font-bold text-white mb-4">Floor Plans</h3>
              <div className={`rounded-lg overflow-hidden border p-6 ${theme === "dark" ? "border-white/10 bg-white/5" : "border-stone-200 bg-stone-50"}`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${theme === "dark" ? "bg-[#d4af37]/10" : "bg-[#aa7c11]/10"}`}>
                    <Download className="w-8 h-8 text-[#d4af37]" />
                  </div>
                  <p className="font-sans text-sm text-gray-300 mb-2">Floor Plans PDF</p>
                  <p className="font-sans text-[10px] text-gray-500 mb-4">Click to view or download the floor plans document</p>
                  <div className="flex gap-3">
                    <a
                      href={property.floorPlanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d4af37] text-black font-sans text-xs font-bold hover:bg-[#f3e5ab] transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View PDF
                    </a>
                    <a
                      href={property.floorPlanUrl}
                      download
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white border border-white/20 font-sans text-xs font-bold hover:bg-white/20 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Brochure Preview */}
          {property.brochureUrl && (
            <div className="mb-8">
              <h3 className="font-serif text-lg font-bold text-white mb-4">Brochure</h3>
              <div className={`rounded-lg overflow-hidden border p-6 ${theme === "dark" ? "border-white/10 bg-white/5" : "border-stone-200 bg-stone-50"}`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${theme === "dark" ? "bg-[#d4af37]/10" : "bg-[#aa7c11]/10"}`}>
                    <Download className="w-8 h-8 text-[#d4af37]" />
                  </div>
                  <p className="font-sans text-sm text-gray-300 mb-2">Project Brochure</p>
                  <p className="font-sans text-[10px] text-gray-500 mb-4">Click to view or download the project brochure</p>
                  <div className="flex gap-3">
                    <a
                      href={property.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d4af37] text-black font-sans text-xs font-bold hover:bg-[#f3e5ab] transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View PDF
                    </a>
                    <a
                      href={property.brochureUrl}
                      download
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white border border-white/20 font-sans text-xs font-bold hover:bg-white/20 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Map Preview */}
          {property.mapUrl && (
            <div className="mb-8">
              <h3 className="font-serif text-lg font-bold text-white mb-4">Location</h3>
              <div className={`rounded-lg overflow-hidden border ${theme === "dark" ? "border-white/10" : "border-stone-200"}`}>
                <iframe
                  src={property.mapUrl.replace("maps?q=", "maps/embed?place=&q=")}
                  className="w-full h-[300px]"
                  title="Location Map"
                  loading="lazy"
                />
              </div>
              <a
                href={property.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-3 text-[#d4af37] hover:text-[#f3e5ab] text-xs font-sans"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open in Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
