"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Win95Window } from "./win95-window";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Win95MobileDrawer({
  isOpen,
  onClose,
  title,
  children,
  className,
}: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scrolling when drawer is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Close drawer on escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer Content */}
      <div
        ref={drawerRef}
        className={cn(
          "relative w-full max-w-md h-full bg-[#c0c0c0] shadow-lg transform transition-transform duration-300 ease-in-out",
          "border-l-2 border-t-0 border-b-0 border-r-0 border-gray-500",
          className
        )}
      >
        <Win95Window
          title={title}
          onClose={onClose}
          minimizable={true}
          maximizable={true}
          closable={true}
          resizable={true}
          initialX={0}
          initialY={0}
          defaultWidth={window.innerWidth}
          defaultHeight={window.innerHeight}
          className="absolute inset-0 w-full h-full"
        >
          <div className="p-4 h-full overflow-y-auto">
            {children}
          </div>
        </Win95Window>
      </div>
    </div>
  );
}

interface DrawerNavigationItemProps {
  title: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function DrawerNavigationItem({
  title,
  href,
  isActive,
  onClick,
  className,
}: DrawerNavigationItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        // Base styles
        "block w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200",
        // Win95 3D border effect
        "border-2 border-t-white border-l-white border-b-gray-500 border-r-gray-500",
        "bg-[#c0c0c0] text-black mb-2",
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
    </a>
  );
}