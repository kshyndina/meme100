import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  responsive?: boolean;
}

export const H1: React.FC<TypographyProps> = ({ children, className, responsive = true }) => {
  return (
    <h1 className={cn(
      "font-['Arial_Black'] uppercase tracking-[-0.05em] leading-none",
      "text-shadow-[2px_2px_0_#FF0000,4px_4px_0_#FFFF00]",
      "animate-glitch",
      responsive
        ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        : "text-[72px]",
      className
    )}>
      {children}
    </h1>
  );
};

export const H2: React.FC<TypographyProps> = ({ children, className, responsive = true }) => {
  return (
    <h2 className={cn(
      "font-['Arial'] uppercase tracking-[-0.025em] leading-none",
      "border-b-4 border-black",
      "text-shadow-[1px_1px_0_#00FF00,2px_2px_0_#FF00FF]",
      responsive
        ? "text-3xl sm:text-4xl md:text-5xl pb-1 sm:pb-1.5 md:pb-2"
        : "text-[48px] pb-2",
      className
    )}>
      {children}
    </h2>
  );
};

export const H3: React.FC<TypographyProps> = ({ children, className, responsive = true }) => {
  return (
    <h3 className={cn(
      "font-['Arial'] underline",
      "hover:bg-blue-500 hover:text-white transition-colors duration-200",
      responsive
        ? "text-xl sm:text-2xl md:text-3xl"
        : "text-[24px]",
      className
    )}>
      {children}
    </h3>
  );
};

export const Body: React.FC<TypographyProps> = ({ children, className, responsive = true }) => {
  return (
    <p className={cn(
      "font-['Arial'] leading-normal",
      responsive
        ? "text-sm sm:text-base md:text-lg"
        : "text-[14px]",
      className
    )}>
      {children}
    </p>
  );
};

export const Small: React.FC<TypographyProps> = ({ children, className, responsive = true }) => {
  return (
    <p className={cn(
      "font-['MS_Sans_Serif'] leading-normal",
      responsive
        ? "text-xs sm:text-sm md:text-base"
        : "text-[11px]",
      className
    )}>
      {children}
    </p>
  );
};

export const Tiny: React.FC<TypographyProps> = ({ children, className, responsive = true }) => {
  return (
    <p className={cn(
      "font-['MS_Sans_Serif'] leading-normal",
      responsive
        ? "text-[10px] sm:text-xs md:text-sm"
        : "text-[9px]",
      className
    )}>
      {children}
    </p>
  );
};

// Win95-specific typography components
export const Win95H1: React.FC<TypographyProps> = ({ children, className, responsive = true }) => {
  return (
    <h1 className={cn(
      "font-win95-ms-sans-serif-bold text-black",
      responsive
        ? "text-2xl sm:text-3xl md:text-4xl"
        : "text-[32px]",
      className
    )}>
      {children}
    </h1>
  );
};

export const Win95H2: React.FC<TypographyProps> = ({ children, className, responsive = true }) => {
  return (
    <h2 className={cn(
      "font-win95-ms-sans-serif-bold text-black",
      responsive
        ? "text-xl sm:text-2xl md:text-3xl"
        : "text-[24px]",
      className
    )}>
      {children}
    </h2>
  );
};

export const Win95H3: React.FC<TypographyProps> = ({ children, className, responsive = true }) => {
  return (
    <h3 className={cn(
      "font-win95-ms-sans-serif-bold text-black",
      responsive
        ? "text-lg sm:text-xl md:text-2xl"
        : "text-[18px]",
      className
    )}>
      {children}
    </h3>
  );
};

export const Win95Body: React.FC<TypographyProps> = ({ children, className, responsive = true }) => {
  return (
    <p className={cn(
      "font-win95-ms-sans-serif text-black",
      responsive
        ? "text-sm sm:text-base md:text-lg"
        : "text-[14px]",
      className
    )}>
      {children}
    </p>
  );
};

export const Win95Small: React.FC<TypographyProps> = ({ children, className, responsive = true }) => {
  return (
    <p className={cn(
      "font-win95-ms-sans-serif text-black",
      responsive
        ? "text-xs sm:text-sm md:text-base"
        : "text-[12px]",
      className
    )}>
      {children}
    </p>
  );
};

export const Win95Tiny: React.FC<TypographyProps> = ({ children, className, responsive = true }) => {
  return (
    <p className={cn(
      "font-win95-ms-sans-serif text-black",
      responsive
        ? "text-[10px] sm:text-xs md:text-sm"
        : "text-[10px]",
      className
    )}>
      {children}
    </p>
  );
};