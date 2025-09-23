"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "win95-mobile-drawer-backdrop",
          isOpen && "open"
        )}
        onClick={onClose}
      />
      
      {/* Drawer Content */}
      <div
        ref={drawerRef}
        className={cn(
          "win95-mobile-drawer",
          isOpen && "open",
          className
        )}
      >
        {/* Drawer Header */}
        <div className="win95-mobile-drawer-header">
          <div className="win95-mobile-drawer-title">{title}</div>
          <button
            className="win95-mobile-drawer-close"
            onClick={onClose}
          >
            <div className="bg-[#000000] absolute transform rotate-45 w-3 h-0.5"></div>
            <div className="bg-[#000000] absolute transform -rotate-45 w-3 h-0.5"></div>
          </button>
        </div>
        
        {/* Drawer Content */}
        <div className="win95-mobile-drawer-content">
          {children}
        </div>
      </div>
    </>
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
        "win95-mobile-drawer-nav-item",
        isActive && "active",
        className
      )}
    >
      {title}
    </a>
  );
}