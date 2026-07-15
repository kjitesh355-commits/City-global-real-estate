import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useMemo } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const ambientParticles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 0.5 + Math.random() * 1,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 2,
}));

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const subtitleLetters = useMemo(() => "REAL ESTATE".split(""), []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050505" }}
        >
          {/* Ambient gold glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Floating ambient particles */}
          {ambientParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-[#d4af37] pointer-events-none"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Dubai Skyline PNG */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 1.0 }}
            animate={{
              opacity: [0, 1, 1, 0.12],
              scale: [1.0, 1.02, 1.02, 1.02],
            }}
            transition={{
              duration: 1.6,
              times: [0, 0.25, 0.35, 0.5],
              ease: "easeOut",
            }}
          >
            <img
              src="/dubai-skyline.png"
              alt=""
              className="w-[80vw] max-w-[700px] h-auto object-contain"
              style={{
                filter: "sepia(1) hue-rotate(-10deg) saturate(3) drop-shadow(0 0 15px rgba(212,175,55,0.2))",
              }}
            />
          </motion.div>

          {/* Logo: CITY GLOBAL */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight"
            >
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#c9a84c] via-[#f3e5ab] to-[#c9a84c] bg-clip-text text-transparent">
                  CITY GLOBAL
                </span>
                {/* Gold reflection sweep */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  initial={{ backgroundPosition: "-200% 0" }}
                  animate={{ backgroundPosition: "200% 0" }}
                  transition={{ duration: 0.8, delay: 1.0, ease: "easeInOut" }}
                  style={{
                    backgroundImage:
                      "linear-gradient(105deg, transparent 35%, rgba(245,215,110,0.35) 50%, transparent 65%)",
                    backgroundSize: "200% 100%",
                    backgroundRepeat: "no-repeat",
                    mixBlendMode: "overlay",
                  }}
                />
              </span>
            </motion.h1>

            {/* Shimmer line */}
            <motion.div
              className="mt-5 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Subtitle: REAL ESTATE */}
            <motion.div
              className="mt-5 flex justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 1.4 }}
            >
              <motion.p
                className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#d4af37]/50 font-sans font-light"
                initial={{ letterSpacing: "0.1em" }}
                animate={{ letterSpacing: "0.3em" }}
                transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
              >
                {subtitleLetters.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, delay: 1.4 + i * 0.025 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
