"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Win95Window } from "@/components/ui/win95-window";
import { Win95NavigationMenu, Win95NavigationItem } from "@/components/ui/win95-navigation-menu";
import { Win95MobileDrawer, DrawerNavigationItem } from "@/components/ui/win95-mobile-drawer";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";

export function Header() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [headerPosition, setHeaderPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchCategories();
    
    // Check if we're on mobile and set header position
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Position header randomly on desktop, fixed on mobile
      if (!mobile) {
        // Calculate random position within visible screen area
        const maxX = Math.floor(window.innerWidth * 0.7); // Max 70% from left
        const maxY = Math.floor(window.innerHeight * 0.6); // Max 60% from top
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        setHeaderPosition({
          x: randomX,
          y: randomY
        });
      } else {
        setHeaderPosition({ x: 0, y: 0 });
      }
    };
    
    // Initial check
    checkIsMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = () => {
    setIsDrawerOpen(false);
  };

  // Prepare navigation items
  const navItems = [
    { title: "Home", href: "/" },
    ...(!loading && categories.length > 0
      ? categories.map(category => ({
          title: category,
          href: `/categories/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, "-"))}`
        }))
      : []
    )
  ].filter(item => item.title && item.href); // Filter out any empty items

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50">
        <Win95Window
          title="Header"
          className="w-full pointer-events-auto"
          initialX={headerPosition.x}
          initialY={headerPosition.y}
          minimizable={true}
          maximizable={true}
          closable={true}
          resizable={true}
          fullscreenOnMobile={true}
        >
            <div className="flex items-center justify-between p-2 sm:p-3">
              {/* Logo with Win95 styling - Responsive sizing */}
              <Link
                href="/"
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 group relative z-10"
              >
                <img
                  src="/memecoin100x_logo.jpg"
                  alt="Memecoin100x Logo"
                  className={cn(
                    "border-2 border-t-white border-l-white border-b-gray-500 border-r-gray-500",
                    isMobile ? "h-8 w-auto" : "h-10 w-auto"
                  )}
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <Win95NavigationMenu
                  items={navItems}
                  className="flex-1"
                />
                
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-2">
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => setIsDrawerOpen(true)}
                  className={cn(
                    "win95-mobile-menu-button",
                    isMobile ? "w-10 h-10" : "w-8 h-8"
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn(
                      "stroke-current",
                      isMobile ? "h-5 w-5" : "h-4 w-4"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </Win95Window>
        </div>

        {/* Mobile Drawer */}
        <Win95MobileDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title="Navigation"
        >
          <div className="flex flex-col space-y-2">
            <DrawerNavigationItem
              title="Home"
              href="/"
              onClick={handleLinkClick}
            />
            
            {!loading && categories.length > 0 && (
              <div className="mt-2">
                <div className="text-xs font-bold text-black mb-2 px-1">CATEGORIES</div>
                {categories.map((category) => (
                  <DrawerNavigationItem
                    key={category}
                    title={category}
                    href={`/categories/${encodeURIComponent(
                      category.toLowerCase().replace(/\s+/g, "-")
                    )}`}
                    onClick={handleLinkClick}
                  />
                ))}
              </div>
            )}
          </div>
        </Win95MobileDrawer>
      </>
  );
}

// Helper function for className conditional styling
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
