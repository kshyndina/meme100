"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  frequency?: number; // in seconds
  hoverEffect?: boolean;
  ariaLabel?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  className,
  intensity = "medium",
  frequency = 5,
  hoverEffect = true,
  ariaLabel,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [showInitialGlitch, setShowInitialGlitch] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start glitch animation based on frequency
  useEffect(() => {
    // No initial glitch - disabled completely
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [frequency]);

  // Handle mouse enter/leave for hover effect
  const handleMouseEnter = () => {
    if (hoverEffect) {
      setIsGlitching(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverEffect) {
      setIsGlitching(false);
    }
  };

  // Get intensity class
  const getIntensityClass = () => {
    switch (intensity) {
      case "low":
        return "glitch-text-low";
      case "high":
        return "glitch-text-high";
      case "medium":
      default:
        return "glitch-text-medium";
    }
  };

  // Get text content for data attribute
  const getTextContent = () => {
    if (typeof children === "string") {
      return children;
    }
    if (textRef.current) {
      return textRef.current.textContent || "";
    }
    return "";
  };

  return (
    <span
      ref={textRef}
      className={cn(
        "glitch-text relative inline-block",
        getIntensityClass(),
        false && "glitch",
        hoverEffect && "hover-glitch",
        className
      )}
      data-text={getTextContent()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
    >
      {children}
    </span>
  );
};

export default GlitchText;
