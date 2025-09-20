"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CRTEffectProps {
  className?: string;
  curvature?: 'none' | 'subtle' | 'medium' | 'strong';
  vignette?: number; // 0 to 1
  chromaticAberration?: number; // 0 to 1
  flickerIntensity?: 'none' | 'subtle' | 'medium' | 'strong';
  enabled?: boolean;
  ariaLabel?: string;
}

export const CRTEffect: React.FC<CRTEffectProps> = ({
  className,
  curvature = 'subtle',
  vignette = 0.4,
  chromaticAberration = 0.05,
  flickerIntensity = 'subtle',
  enabled = true,
  ariaLabel = "CRT monitor effect overlay",
}) => {
  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    // Effect disabled completely
    
    return () => {};
  }, []);

  if (!enabled || !showEffect) {
    return null;
  }

  // Get curvature class
  const getCurvatureClass = () => {
    switch (curvature) {
      case 'none':
        return 'crt-curve-none';
      case 'subtle':
        return 'crt-curve-subtle';
      case 'strong':
        return 'crt-curve-strong';
      case 'medium':
      default:
        return 'crt-curve-medium';
    }
  };

  // Get flicker class
  const getFlickerClass = () => {
    switch (flickerIntensity) {
      case 'none':
        return 'crt-flicker-none';
      case 'subtle':
        return 'crt-flicker-subtle';
      case 'strong':
        return 'crt-flicker-strong';
      case 'medium':
      default:
        return 'crt-flicker-medium';
    }
  };

  // Custom style for vignette and chromatic aberration
  const customStyle = {
    '--vignette-opacity': vignette,
    '--chromatic-aberration': chromaticAberration,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        'crt-effect fixed top-0 left-0 w-full h-full pointer-events-none z-[9997] overflow-hidden',
        getCurvatureClass(),
        getFlickerClass(),
        className
      )}
      style={customStyle}
      aria-label={ariaLabel}
      role="presentation"
    >
      {/* CRT lines and RGB effect */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                      linear-gradient(90deg, 
                        rgba(255, 0, 0, ${chromaticAberration}), 
                        rgba(0, 255, 0, ${chromaticAberration * 0.5}), 
                        rgba(0, 0, 255, ${chromaticAberration}))`,
          backgroundSize: '100% 2px, 3px 100%',
        }}
      />
      
      {/* Flicker effect */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-black/10"
        style={{
          animation: flickerIntensity !== 'none' ? 'flicker 0.15s infinite' : 'none',
        }}
      />
      
      {/* Vignette effect */}
      <div 
        className="crt-vignette absolute top-0 left-0 w-full h-full"
        style={{
          boxShadow: `inset 0 0 100px rgba(0, 0, 0, ${vignette})`,
        }}
      />
      
      {/* Curvature container */}
      <div className={cn(
        'crt-curve absolute top-0 left-0 w-full h-full',
        curvature !== 'none' && 'rounded-[10px]'
      )} />
    </div>
  );
};

export default CRTEffect;