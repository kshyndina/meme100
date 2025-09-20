"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Win95TimestampProps {
  date: string | Date;
  className?: string;
  format?: "short" | "long" | "time";
}

export function Win95Timestamp({ 
  date, 
  className,
  format = "short"
}: Win95TimestampProps) {
  const formatDate = (date: string | Date, format: "short" | "long" | "time") => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    switch (format) {
      case "long":
        return dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      case "time":
        return dateObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      case "short":
      default:
        return dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
    }
  };

  return (
    <time 
      dateTime={typeof date === 'string' ? date : date.toISOString()}
      className={cn(
        "font-win95-ms-sans text-[9px] text-black",
        "bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black",
        "px-2 py-1 shadow-[1px_1px_0_#ffffff,-1px_-1px_0_#000000]",
        className
      )}
    >
      {formatDate(date, format)}
    </time>
  );
}