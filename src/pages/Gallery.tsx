import React from "react";
import { motion } from "motion/react";
import { ScrollReveal } from "../components/ui/scroll-reveal";

interface GalleryProps {
  theme: "light" | "dark";
}

const leftImages = [
  { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&auto=format&fit=crop", name: "Serenia Living Villa", area: "Palm Jumeirah" },
  { src: "https://files.remapp.ae/rem-offplan-v3/project-images/1771137255063-0a0012a9a8ecb181.jpg", name: "Azizi Venice", area: "Dubai South" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&auto=format&fit=crop", name: "One Za'abeel", area: "Downtown Dubai" },
  { src: "https://files.remapp.ae/rem-offplan-v3/project-images/1770989432972-9a7eaf7828d3f560.jpg", name: "Verdana Residence", area: "DIP" },
  { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop", name: "Creek Harbour", area: "Dubai Creek" },
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop", name: "Palm Villa", area: "Palm Jumeirah" },
  { src: "https://files.remapp.ae/rem-offplan-v3/project-images/1771137281599-923a63ca5b4bf504.jpg", name: "Azizi Venice Terrace", area: "Dubai South" },
  { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop", name: "Marina Skyline", area: "Dubai Marina" },
  { src: "https://files.remapp.ae/rem-offplan-v3/project-images/1770989440091-125b915f91a34f27.jpg", name: "Verdana Pool", area: "DIP" },
  { src: "https://images.unsplash.com/photo-1582407947092-03b5dec88daa?w=500&auto=format&fit=crop", name: "Downtown Towers", area: "Downtown Dubai" },
  { src: "https://files.remapp.ae/rem-offplan-v3/project-images/1771137283969-33fa2e79b03e29a0.jpg", name: "Azizi Living Room", area: "Dubai South" },
  { src: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=500&auto=format&fit=crop", name: "Business Bay View", area: "Business Bay" },
];

const centerImages = [
  { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop", name: "Address Residences", area: "Downtown Dubai" },
  { src: "https://files.remapp.ae/rem-offplan-v3/project-images/1771137257994-ff71d5268756fa94.jpg", name: "Azizi Venice Interior", area: "Dubai South" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop", name: "Bugatti Residences", area: "Business Bay" },
];

const rightImages = [
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop", name: "Dubai Hills Mansion", area: "Dubai Hills" },
  { src: "https://files.remapp.ae/rem-offplan-v3/project-images/1771137267712-a8c97c2e7a09cdca.jpg", name: "Azizi Lounge", area: "Dubai South" },
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop", name: "Palm Jumeirah Villa", area: "Palm Jumeirah" },
  { src: "https://files.remapp.ae/rem-offplan-v3/project-images/1770989443233-081eea692ef446df.jpg", name: "Verdana Living", area: "DIP" },
  { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop", name: "Marina Penthouse", area: "Dubai Marina" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&auto=format&fit=crop", name: "One Za'abeel", area: "Downtown" },
  { src: "https://files.remapp.ae/rem-offplan-v3/project-images/1771137289532-b2f295241cd0b559.jpg", name: "Azizi Kitchen", area: "Dubai South" },
  { src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop", name: "JBR Beachfront", area: "JBR" },
  { src: "https://files.remapp.ae/rem-offplan-v3/project-images/1770989446888-ebcd46dc31f56781.jpg", name: "Verdana Bedroom", area: "DIP" },
  { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop", name: "Dubai Night Sky", area: "Dubai" },
  { src: "https://files.remapp.ae/rem-offplan-v3/project-images/1771137292984-357bc253478cc6a4.jpg", name: "Azizi Bathroom", area: "Dubai South" },
  { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&auto=format&fit=crop", name: "City Walk", area: "City Walk" },
];

function GalleryCard({ img, height = "h-80" }: { img: { src: string; name: string; area: string }; height?: string }) {
  return (
    <figure className={`w-full ${height} group relative overflow-hidden rounded-md`}>
      <img
        src={img.src}
        alt={img.name}
        className="transition-all duration-500 w-full h-full align-bottom object-cover group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <figcaption className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white font-serif text-lg font-semibold">{img.name}</p>
        <p className="text-[#d4af37] text-xs tracking-wider uppercase">{img.area}</p>
      </figcaption>
    </figure>
  );
}

export default function Gallery({ theme }: GalleryProps) {
  const isDark = theme === "dark";

  return (
    <section className={`w-full py-20 ${isDark ? "bg-[#07080a]" : "bg-[#fcfbf9]"}`}>
      {/* Section Header */}
      <ScrollReveal>
        <div className="text-center mb-16 px-4">
          <motion.p
            className={`text-xs sm:text-sm tracking-[0.3em] uppercase font-sans font-light mb-4 ${
              isDark ? "text-[#d4af37]/60" : "text-[#c9a84c]/70"
            }`}
          >
            Our Portfolio
          </motion.p>
          <h2
            className={`font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-[#14161d]"
            }`}
          >
            Property{" "}
            <span className="bg-gradient-to-r from-[#c9a84c] via-[#f3e5ab] to-[#c9a84c] bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
        </div>
      </ScrollReveal>

      {/* Masonry Gallery with Sticky Center */}
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Left Column - scrolls normally */}
          <div className="w-full md:w-4/12 flex flex-col gap-2">
            {leftImages.map((img, i) => (
              <GalleryCard key={`left-${i}`} img={img} />
            ))}
          </div>

          {/* Center Column - sticky */}
          <div className="w-full md:w-4/12 md:sticky md:top-0 md:h-screen flex flex-col gap-2 self-start">
            {centerImages.map((img, i) => (
              <GalleryCard key={`center-${i}`} img={img} height="h-[calc(33.33vh-5px)]" />
            ))}
          </div>

          {/* Right Column - scrolls normally */}
          <div className="w-full md:w-4/12 flex flex-col gap-2">
            {rightImages.map((img, i) => (
              <GalleryCard key={`right-${i}`} img={img} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
