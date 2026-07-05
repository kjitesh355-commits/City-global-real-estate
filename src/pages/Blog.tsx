import React from "react";
import BlogHero from "../components/BlogHero";

interface BlogProps {
  theme: "light" | "dark";
  onOpenConsultation: () => void;
}

export default function Blog({ theme, onOpenConsultation }: BlogProps) {
  return (
    <div className="min-h-screen">
      <BlogHero theme={theme} />
    </div>
  );
}
