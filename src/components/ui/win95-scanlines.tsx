"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ScanlinesProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  opacity?: number; // 0 to 1
  animated?: boolean;
  enabled?: boolean;
  ariaLabel?: string;
}

export const Scanlines: React.FC<ScanlinesProps> = ({
  className,
  density = 'medium',
  opacity = 0.15,
  animated = true,
  enabled = true,
  ariaLabel = "Scanlines effect overlay",
}) => {
  if (!enabled) {
    return null;
  }

  // Get density class
  const getDensityClass = () => {
    switch (density) {
      case 'low':
        return 'scanlines-low';
      case 'high':
        return 'scanlines-high';
      case 'medium':
      default:
        return 'scanlines-medium';
    }
  };

  // Custom style for opacity
  const customStyle = {
    '--scanlines-opacity': opacity,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        'scanlines fixed top-0 left-0 w-full h-full pointer-events-none z-[9998] overflow-hidden',
        getDensityClass(),
        animated && 'scanlines-animated',
        className
      )}
      style={customStyle}
      aria-label={ariaLabel}
      role="presentation"
    >
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent 50% to-black/15 51%"
        style={{
          backgroundSize: '100% 4px',
        }}
      />
    </div>
  );
};

export default Scanlines;