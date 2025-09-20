"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LoadingAnimationProps {
  className?: string;
  progress?: number; // 0 to 100
  text?: string;
  animatedText?: string;
  showPercentage?: boolean;
  speed?: 'slow' | 'medium' | 'fast';
  autoProgress?: boolean;
  onComplete?: () => void;
  ariaLabel?: string;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  className,
  progress = 0,
  text = "Loading...",
  animatedText,
  showPercentage = true,
  speed = 'medium',
  autoProgress = false,
  onComplete,
  ariaLabel = "Loading progress",
}) => {
  const [currentProgress, setCurrentProgress] = useState(progress);
  const [animatedTextIndex, setAnimatedTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Handle auto progression
  useEffect(() => {
    if (!autoProgress) return;

    const getSpeedValue = () => {
      switch (speed) {
        case 'slow':
          return 100;
        case 'fast':
          return 20;
        case 'medium':
        default:
          return 50;
      }
    };

    const interval = setInterval(() => {
      setCurrentProgress(prev => {
        const newProgress = Math.min(prev + 1, 100);
        if (newProgress === 100) {
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }
          clearInterval(interval);
        }
        return newProgress;
      });
    }, getSpeedValue());

    return () => clearInterval(interval);
  }, [autoProgress, speed, onComplete]);

  // Handle animated text
  useEffect(() => {
    if (!animatedText) return;

    const interval = setInterval(() => {
      setAnimatedTextIndex(prev => (prev + 1) % (animatedText.length + 3));
    }, 200);

    return () => clearInterval(interval);
  }, [animatedText]);

  // Get animated text display
  const getAnimatedTextDisplay = () => {
    if (!animatedText) return text;
    
    if (animatedTextIndex < animatedText.length) {
      return animatedText.substring(0, animatedTextIndex + 1);
    } else if (animatedTextIndex < animatedText.length + 1) {
      return animatedText + "|";
    } else if (animatedTextIndex < animatedText.length + 2) {
      return animatedText + " ";
    } else {
      return animatedText;
    }
  };

  return (
    <div 
      className={cn(
        'win95-loading-container relative w-full max-w-md',
        className
      )}
      aria-label={ariaLabel}
      aria-valuenow={currentProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      role="progressbar"
    >
      {/* Win95-style progress bar with 3D borders */}
      <div className="win95-loading relative w-full h-5 bg-[#c0c0c0] border-2 border-[#ffffff] border-b-[#808080] border-r-[#808080] p-px box-border">
        <div 
          className="win95-loading-bar h-full bg-[#000080] relative overflow-hidden"
          style={{ width: `${currentProgress}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-loading-shine" />
        </div>
        
        {/* Loading text */}
        <div className="win95-loading-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-xs font-sans whitespace-nowrap overflow-hidden w-[90%] text-center">
          {getAnimatedTextDisplay()}
          {showPercentage && ` ${currentProgress}%`}
        </div>
      </div>
      
      {/* Win95-style status text */}
      {isComplete && (
        <div className="mt-2 text-xs font-sans text-black">
          Operation completed successfully.
        </div>
      )}
    </div>
  );
};

export default LoadingAnimation;