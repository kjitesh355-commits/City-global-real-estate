"use client";

import { Button } from "./button";
import { ArrowRight } from "lucide-react";
import createGlobe, { COBEOptions } from "cobe";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";

export default function GlobeFeatureSection({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const isDark = theme !== "light";
  return (
    <section id="globe-section" className={`relative w-full mx-auto overflow-hidden rounded-3xl shadow-md px-6 py-16 md:px-16 md:py-24 transition-colors duration-300 ${isDark ? "bg-white/[0.03] border border-white/10" : "bg-stone-50 border border-stone-200"}`}>
      <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
        <div className="z-10 max-w-xl text-left">
          <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight transition-colors duration-300 ${isDark ? "text-white" : "text-[#1c1917]"}`}>
            Global Reach,{" "}
            <span className="text-[#d4af37]">Local Expertise</span>
          </h1>
          <p className={`mt-4 text-base leading-relaxed transition-colors duration-300 ${isDark ? "text-gray-400" : "text-stone-500"}`}>
            City Global connects investors across 40+ countries to Dubai's most
            exclusive properties. Our AI-powered platform analyzes global market
            trends in real-time.
          </p>
          <Button className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d4af37] text-black px-6 py-2.5 text-sm font-semibold hover:bg-[#c9a227] transition-colors">
            Explore Properties <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative h-[180px] w-full max-w-xl">
          <Globe className="absolute -bottom-20 -right-40 scale-150" />
        </div>
      </div>
    </section>
  );
}

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [212 / 255, 175 / 255, 55 / 255],
  glowColor: [0.15, 0.15, 0.15],
  markers: [
    { location: [25.1972, 55.2744], size: 0.1 },
    { location: [25.1124, 55.1390], size: 0.08 },
    { location: [25.1852, 55.2730], size: 0.06 },
    { location: [25.0784, 55.1390], size: 0.07 },
    { location: [25.1167, 55.2667], size: 0.05 },
    { location: [40.7128, -74.006], size: 0.06 },
    { location: [51.5074, -0.1278], size: 0.05 },
    { location: [48.8566, 2.3522], size: 0.04 },
    { location: [35.6762, 139.6503], size: 0.05 },
    { location: [22.3193, 114.1694], size: 0.06 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const [r, setR] = useState(0);
  const rRef = useRef(0);
  const widthRef = useRef(0);

  useEffect(() => {
    rRef.current = r;
  }, [r]);

  const onResize = () => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    let frameId: number;

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
    });

    const animate = () => {
      if (!pointerInteracting.current) {
        phiRef.current += 0.005;
      }
      globe.update({
        phi: phiRef.current + rRef.current,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });
      frameId = requestAnimationFrame(animate);
    };
    animate();

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(frameId);
      globe.destroy();
    };
  }, []);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
