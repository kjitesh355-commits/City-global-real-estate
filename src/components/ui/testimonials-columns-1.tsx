"use client";
import React from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = React.memo((props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className} style={{ contain: "layout" }}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-8 rounded-2xl border shadow-lg max-w-xs w-full transition-all duration-300 bg-white dark:bg-[#0c0d14] border-stone-200 dark:border-gray-900/60 shadow-stone-100 dark:shadow-black/25 hover:border-[#d4af37]/40 dark:hover:border-[#d4af37]/30" 
                  key={i}
                >
                  <div className="text-xs font-sans font-light leading-relaxed text-stone-600 dark:text-gray-300 italic">
                    "{text}"
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-10 w-10 rounded-full object-cover border border-stone-100 dark:border-gray-800"
                    />
                    <div className="flex flex-col text-left">
                      <div className="font-serif text-xs font-bold text-stone-900 dark:text-white leading-tight">
                        {name}
                      </div>
                      <div className="font-sans text-[10px] uppercase tracking-widest text-stone-400 dark:text-gray-500 leading-none mt-1">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
});
