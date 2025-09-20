"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Win95CategoryBadgeProps {
  children: React.ReactNode;
  className?: string;
  color?: "blue" | "red" | "green" | "yellow" | "purple" | "teal";
}

export function Win95CategoryBadge({ 
  children, 
  className,
  color = "blue"
}: Win95CategoryBadgeProps) {
  const colorStyles = {
    blue: "bg-[#000080] text-white border-[#000080]",
    red: "bg-[#800000] text-white border-[#800000]",
    green: "bg-[#008000] text-white border-[#008000]",
    yellow: "bg-[#808000] text-white border-[#808000]",
    purple: "bg-[#800080] text-white border-[#800080]",
    teal: "bg-[#008080] text-white border-[#008080]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-win95-ms-sans uppercase tracking-wider",
        "border-2 border-t-white border-l-white border-b-black border-r-black",
        "shadow-[1px_1px_0_#ffffff,-1px_-1px_0_#000000]",
        "hover:bg-opacity-90 transition-all duration-200",
        "active:shadow-[inset_1px_1px_0_#000000,inset_-1px_-1px_0_#ffffff]",
        colorStyles[color],
        className
      )}
    >
      {children}
    </span>
  );
}