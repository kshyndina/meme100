"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Win95CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  shadowColor?: "red" | "yellow" | "green" | "magenta" | "blue" | "black";
  responsive?: boolean;
  gridLayout?: "1" | "2" | "3" | "responsive";
}

function Win95Card({
  title,
  children,
  className,
  hoverEffect = true,
  shadowColor = "black",
  responsive = true,
  gridLayout = "responsive",
}: Win95CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Shadow colors for different screen sizes
  const shadowColors = {
    red: isMobile ? "shadow-[2px_2px_0_#FF0000]" : "shadow-[4px_4px_0_#FF0000]",
    yellow: isMobile ? "shadow-[2px_2px_0_#FFFF00]" : "shadow-[4px_4px_0_#FFFF00]",
    green: isMobile ? "shadow-[2px_2px_0_#00FF00]" : "shadow-[4px_4px_0_#00FF00]",
    magenta: isMobile ? "shadow-[2px_2px_0_#FF00FF]" : "shadow-[4px_4px_0_#FF00FF]",
    blue: isMobile ? "shadow-[2px_2px_0_#0000FF]" : "shadow-[4px_4px_0_#0000FF]",
    black: isMobile ? "shadow-[2px_2px_0_#000000]" : "shadow-[4px_4px_0_#000000]",
  };

  // Touch-friendly hover state
  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
  };

  // Determine grid layout class based on props and screen size
  const getGridLayoutClass = () => {
    if (!responsive) return "";
    
    if (gridLayout === "responsive") {
      return "win95-card-grid-responsive";
    } else if (gridLayout === "1") {
      return "mobile-grid-1 tablet-grid-1 desktop-grid-1";
    } else if (gridLayout === "2") {
      return "mobile-grid-1 tablet-grid-2 desktop-grid-2";
    } else if (gridLayout === "3") {
      return "mobile-grid-1 tablet-grid-2 desktop-grid-3";
    }
    
    return "";
  };

  return (
    <div
      className={cn(
        "bg-[#c0c0c0] border-2 border-[#000000] shadow-[1px_1px_0_#ffffff,-1px_-1px_0_#000000] flex flex-col overflow-hidden transition-all duration-200",
        responsive && "win95-card-responsive",
        getGridLayoutClass(),
        // Hover effects - adjusted for mobile
        hoverEffect && !isMobile &&
          "hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[5px_5px_0_#000000]",
        // Touch-friendly hover state for mobile
        isMobile && hoverEffect && (isHovered || isTouched) &&
          "transform -translate-x-1 -translate-y-1 shadow-[3px_3px_0_#000000]",
        hoverEffect && shadowColors[shadowColor],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Optional Title Bar - Responsive sizing */}
      {title && (
        <div className={cn(
          "bg-gradient-to-r from-[#000080] to-[#1084d0] text-white flex items-center",
          isMobile ? "h-8 px-3" : "h-6 px-2"
        )}>
          <div className={cn(
            "font-win95-ms-sans truncate",
            isMobile ? "text-base" : "text-sm"
          )}>{title}</div>
        </div>
      )}
      
      {/* Content Area - Responsive padding */}
      <div className={cn(
        "bg-white border border-[#808080] border-t-0 border-l-0 border-r-0 flex-1",
        isMobile ? "p-3" : "p-4"
      )}>
        {children}
      </div>
    </div>
  );
}

function Win95CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-2 mb-4", className)}
      {...props}
    />
  );
}

function Win95CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-bold font-win95-ms-sans",
        // Responsive font size
        "text-lg sm:text-xl md:text-lg",
        className
      )}
      {...props}
    />
  );
}

function Win95CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "font-win95-ms-sans",
        // Responsive font size
        "text-sm sm:text-base md:text-sm",
        className
      )}
      {...props}
    />
  );
}

function Win95CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("", className)}
      {...props}
    />
  );
}

function Win95CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center border-t border-[#808080]",
        // Responsive spacing
        "mt-4 pt-2 sm:mt-3 sm:pt-1.5 md:mt-4 md:pt-2",
        className
      )}
      {...props}
    />
  );
}

// Win95-styled button for use in cards
function Win95CardButton({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "bg-[#c0c0c0] border-2 border-[#000000] shadow-[1px_1px_0_#ffffff,-1px_-1px_0_#000000] font-win95-ms-sans",
        // Responsive padding and font size
        "px-4 py-1 text-sm sm:px-3 sm:py-1.5 sm:text-base md:px-4 md:py-1 md:text-sm",
        // Touch-friendly sizing
        "min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px]",
        "hover:bg-[#d4d4d4]",
        "active:shadow-[inset_1px_1px_0_#000000,inset_-1px_-1px_0_#ffffff] active:border-[#ffffff]",
        "focus:outline-none focus:ring-1 focus:ring-[#000000] focus:ring-offset-1",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export {
  Win95Card,
  Win95CardHeader,
  Win95CardFooter,
  Win95CardTitle,
  Win95CardDescription,
  Win95CardContent,
  Win95CardButton,
};