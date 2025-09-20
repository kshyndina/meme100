"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavigationMenuProps {
  items: {
    title: string;
    href: string;
    isActive?: boolean;
  }[];
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Win95NavigationMenu({
  items,
  className,
  orientation = "horizontal",
}: NavigationMenuProps) {
  return (
    <nav
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row space-x-1" : "flex-col space-y-1",
        className
      )}
    >
      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            // Base styles
            "px-3 py-1.5 text-sm font-medium transition-all duration-200",
            // Win95 3D border effect
            "border-2 border-t-white border-l-white border-b-gray-500 border-r-gray-500",
            "bg-[#c0c0c0] text-black",
            // Hover effect
            "hover:bg-[#c0c0c0] hover:border-t-gray-500 hover:border-l-gray-500 hover:border-b-white hover:border-r-white",
            // Active effect
            "active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white active:top-[1px] active:left-[1px]",
            // Focus effect
            "focus:outline focus:outline-1 focus:outline-dotted focus:outline-black",
            // First and last items for horizontal layout
            orientation === "horizontal" && index === 0 && "rounded-l",
            orientation === "horizontal" && index === items.length - 1 && "rounded-r",
            // Active state
            item.isActive && "bg-[#000080] text-white"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

interface NavigationItemProps {
  title: string;
  href: string;
  isActive?: boolean;
  className?: string;
}

export function Win95NavigationItem({
  title,
  href,
  isActive,
  className,
}: NavigationItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        // Base styles
        "px-3 py-1.5 text-sm font-medium transition-all duration-200",
        // Win95 3D border effect
        "border-2 border-t-white border-l-white border-b-gray-500 border-r-gray-500",
        "bg-[#c0c0c0] text-black",
        // Hover effect
        "hover:bg-[#c0c0c0] hover:border-t-gray-500 hover:border-l-gray-500 hover:border-b-white hover:border-r-white",
        // Active effect
        "active:border-t-gray-500 active:border-l-gray-500 active:border-b-white active:border-r-white active:top-[1px] active:left-[1px]",
        // Focus effect
        "focus:outline focus:outline-1 focus:outline-dotted focus:outline-black",
        // Active state
        isActive && "bg-[#000080] text-white",
        className
      )}
    >
      {title}
    </Link>
  );
}