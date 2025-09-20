'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the theme context type
interface Win95ThemeContextType {
  isWin95Theme: boolean;
}

// Create the context with a default value
const Win95ThemeContext = createContext<Win95ThemeContextType>({
  isWin95Theme: true,
});

// Custom hook to use the Win95 theme context
export const useWin95Theme = () => useContext(Win95ThemeContext);

interface Win95ThemeProviderProps {
  children: React.ReactNode;
}

export const Win95ThemeProvider: React.FC<Win95ThemeProviderProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsMounted(true);
    
    // Always apply Win95 theme
    document.body.classList.add('win95-brutalist');
    
    // Load the Win95 Brutalist CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/win95-brutalist.css';
    link.id = 'win95-brutalist-stylesheet';
    document.head.appendChild(link);
    
    // Add scanlines effect
    const scanlines = document.createElement('div');
    scanlines.className = 'win95-scanlines';
    scanlines.id = 'win95-scanlines';
    document.body.appendChild(scanlines);
    
    // Clean up function to remove elements when component unmounts
    return () => {
      const existingLink = document.getElementById('win95-brutalist-stylesheet');
      if (existingLink) {
        existingLink.remove();
      }
      
      const existingScanlines = document.getElementById('win95-scanlines');
      if (existingScanlines) {
        existingScanlines.remove();
      }
    };
  }, []);

  // Avoid hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <Win95ThemeContext.Provider value={{ isWin95Theme: true }}>
      {children}
    </Win95ThemeContext.Provider>
  );
};

// Export the context for direct usage if needed
export { Win95ThemeContext };