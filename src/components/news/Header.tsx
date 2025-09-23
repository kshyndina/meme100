"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Win95Window } from "@/components/ui/win95-window";
import {
  Win95NavigationMenu,
  Win95NavigationItem,
} from "@/components/ui/win95-navigation-menu";
// Mobile drawer component removed as part of making the site static
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
// useIsMobile hook removed as part of making the site static

export function Header() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [headerPosition, setHeaderPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchCategories();

    // Position header randomly
    // Calculate random position within visible screen area
    const maxX = Math.floor(window.innerWidth * 0.7); // Max 70% from left
    const maxY = Math.floor(window.innerHeight * 0.6); // Max 60% from top

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setHeaderPosition({
      x: randomX,
      y: randomY,
    });
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

  // Prepare navigation items
  const navItems = [
    { title: "Home", href: "/" },
    ...(!loading && categories.length > 0
      ? categories.map((category) => ({
          title: category,
          href: `/categories/${encodeURIComponent(
            category.toLowerCase().replace(/\s+/g, "-")
          )}`,
        }))
      : []),
  ].filter((item) => item.title && item.href); // Filter out any empty items

  return (
    <>
      {/* Header with Win95Window */}
      <div className="fixed inset-0 pointer-events-none z-50 md:block mobile-header-normal">
        <Win95Window
          title="Header"
          className="w-full pointer-events-auto mobile-header-normal"
          initialX={headerPosition.x}
          initialY={headerPosition.y}
          minimizable={true}
          maximizable={true}
          closable={true}
          resizable={true}
        >
          <div className="flex items-center justify-between p-2 sm:p-3">
            {/* Logo with Win95 styling */}
            <Link
              href="/"
              className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 group relative z-10"
            >
              <img
                src="/meme100_logo.png"
                alt="Memecoin100x Logo"
                className={cn(
                  "border-2 border-t-white border-l-white border-b-gray-500 border-r-gray-500",
                  "h-10 w-auto"
                )}
              />
            </Link>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <Win95NavigationMenu items={navItems} className="flex-1" />
            </div>
          </div>
        </Win95Window>
      </div>
    </>
  );
}

// Helper function for className conditional styling
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
