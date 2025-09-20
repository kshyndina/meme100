"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number; // milliseconds per character
  delay?: number; // delay before starting (ms)
  cursor?: boolean;
  loop?: boolean;
  pauseDuration?: number; // pause before looping (ms)
  startOnView?: boolean;
  onComplete?: () => void;
  ariaLabel?: string;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
  loop = false,
  pauseDuration = 2000,
  startOnView = false,
  onComplete,
  ariaLabel,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(!startOnView);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle intersection observer for startOnView
  useEffect(() => {
    if (!startOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [startOnView]);

  // Handle typing animation
  useEffect(() => {
    if (!isVisible) return;

    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set initial state
    setDisplayText('');
    setIsTyping(true);
    setIsComplete(false);

    // Start typing after delay
    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0;

      const typeNextCharacter = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
          timeoutRef.current = setTimeout(typeNextCharacter, speed);
        } else {
          // Typing complete
          setIsTyping(false);
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }

          // Handle looping
          if (loop) {
            timeoutRef.current = setTimeout(() => {
              setDisplayText('');
              setIsTyping(true);
              setIsComplete(false);
              currentIndex = 0;
              timeoutRef.current = setTimeout(typeNextCharacter, speed);
            }, pauseDuration);
          }
        }
      };

      typeNextCharacter();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay, loop, pauseDuration, isVisible, onComplete]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'typing-text inline-block font-mono',
        className
      )}
      aria-label={ariaLabel}
      aria-busy={isTyping}
    >
      {displayText}
      {cursor && (
        <span 
          className={cn(
            'inline-block w-2 h-4 bg-current align-middle ml-1',
            isTyping ? 'animate-cursor-blink' : 'opacity-0'
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default TypingText;