"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Win95WindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  initialX?: number;
  initialY?: number;
  resizable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  closable?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export function Win95Window({
  title,
  children,
  className,
  defaultWidth = 400,
  defaultHeight = 300,
  initialX = 50,
  initialY = 50,
  resizable = true,
  minimizable = true,
  maximizable = true,
  closable = true,
  onClose,
  onMinimize,
  onMaximize,
}: Win95WindowProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [originalSize, setOriginalSize] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });

  const isMobile = useIsMobile();

  const windowRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  // Removed mobile-specific code as part of making the site static

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.closest(".win95-window-controls")
    ) {
      return;
    }
    // Don't allow dragging when in fullscreen mode
    if (isFullscreen) return;

    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Handle resize start
  const handleResizeMouseDown = (direction: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!resizable || isFullscreen) return;

    setIsResizing(true);
    setResizeDirection(direction);
    resizeStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
  };

  // Handle mouse move for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStartPos.current.x,
          y: e.clientY - dragStartPos.current.y,
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStartPos.current.x;
        const deltaY = e.clientY - resizeStartPos.current.y;

        let newWidth = resizeStartPos.current.width;
        let newHeight = resizeStartPos.current.height;
        let newX = position.x;
        let newY = position.y;

        if (resizeDirection.includes("e")) {
          newWidth = Math.max(200, resizeStartPos.current.width + deltaX);
        }
        if (resizeDirection.includes("w")) {
          newWidth = Math.max(200, resizeStartPos.current.width - deltaX);
          newX = position.x + deltaX;
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(150, resizeStartPos.current.height + deltaY);
        }
        if (resizeDirection.includes("n")) {
          newHeight = Math.max(150, resizeStartPos.current.height - deltaY);
          newY = position.y + deltaY;
        }

        // Special handling for corner resizing to ensure smooth behavior
        if (resizeDirection === "ne") {
          // When resizing from top-right, only adjust height and Y position, not X position
          newWidth = Math.max(200, resizeStartPos.current.width + deltaX);
          newHeight = Math.max(150, resizeStartPos.current.height - deltaY);
          newY = position.y + deltaY;
        } else if (resizeDirection === "nw") {
          // When resizing from top-left, adjust both dimensions and position
          newWidth = Math.max(200, resizeStartPos.current.width - deltaX);
          newHeight = Math.max(150, resizeStartPos.current.height - deltaY);
          newX = position.x + deltaX;
          newY = position.y + deltaY;
        } else if (resizeDirection === "se") {
          // When resizing from bottom-right, only adjust dimensions, not position
          newWidth = Math.max(200, resizeStartPos.current.width + deltaX);
          newHeight = Math.max(150, resizeStartPos.current.height + deltaY);
        } else if (resizeDirection === "sw") {
          // When resizing from bottom-left, adjust width and X position
          newWidth = Math.max(200, resizeStartPos.current.width - deltaX);
          newHeight = Math.max(150, resizeStartPos.current.height + deltaY);
          newX = position.x + deltaX;
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, position, resizeDirection]);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle minimize button
  const handleMinimize = () => {
    if (isMinimized) {
      // Restore window
      setSize(originalSize);
      setIsMinimized(false);
    } else {
      // Store original size and minimize window
      setOriginalSize({ width: size.width, height: size.height });
      setSize({ width: size.width, height: 30 }); // Make window small
      setIsMinimized(true);
    }
    if (onMinimize) onMinimize();
  };

  // Handle maximize button
  const handleMaximize = () => {
    if (isMaximized) {
      // Restore original size
      setSize(originalSize);
      setIsMaximized(false);
    } else {
      // Store original size and double window size
      setOriginalSize({ width: size.width, height: size.height });
      setSize({ width: size.width * 2, height: size.height * 2 });
      setIsMaximized(true);
    }
    if (onMaximize) onMaximize();
  };

  // Handle close button
  const handleClose = () => {
    // Return to homepage
    window.location.href = "/";
    if (onClose) onClose();
  };

  return (
    <div
      ref={windowRef}
      className={cn(
        "bg-[#c0c0c0] border-2 border-[#000000] shadow-[1px_1px_0_#ffffff,-1px_-1px_0_#000000] flex flex-col overflow-hidden",
        isFullscreen
          ? "win95-window-mobile-fullscreen fixed inset-0 w-full h-full z-50 border-none rounded-none"
          : isMobile
            ? "win95-window-mobile-normal"
            : "absolute",
        className
      )}
      style={{
        left: isFullscreen ? 0 : `${position.x}px`,
        top: isFullscreen ? 0 : `${position.y}px`,
        width: isFullscreen ? "100%" : `${size.width}px`,
        height: isFullscreen ? "100%" : `${size.height}px`,
        zIndex: isDragging || isResizing || isFullscreen ? 1000 : 100,
        display: isMinimized && !isFullscreen ? "flex" : "flex",
      }}
    >
      {/* Title Bar */}
      <div
        className={cn(
          "bg-gradient-to-r from-[#000080] to-[#1084d0] text-white flex items-center justify-between px-2 cursor-move select-none",
          "h-6"
        )}
        onMouseDown={handleMouseDown}
      >
        <div className={cn("font-win95-ms-sans truncate", "text-sm")}>
          {title}
        </div>

        {/* Window Controls */}
        <div className="flex win95-window-controls">
          {/* Always show minimize button */}
          <button
            className={cn(
              "bg-[#c0c0c0] border border-[#000000] shadow-[1px_1px_0_#ffffff,-1px_-1px_0_#000000] flex items-center justify-center mx-0.5",
              "w-5 h-5"
            )}
            onClick={handleMinimize}
          >
            <div className={cn("bg-[#000000]", "w-3 h-1")}></div>
          </button>

          <button
            className={cn(
              "bg-[#c0c0c0] border border-[#000000] shadow-[1px_1px_0_#ffffff,-1px_-1px_0_#000000] flex items-center justify-center mx-0.5",
              isMobile ? "w-6 h-6 mobile-touch-friendly" : "w-5 h-5"
            )}
            onClick={handleMaximize}
          >
            <div
              className={cn(
                "border border-[#000000]",
                isMobile ? "w-3 h-3" : "w-2 h-2"
              )}
            ></div>
          </button>

          {/* Always show close button */}
          <button
            className={cn(
              "bg-[#c0c0c0] border border-[#000000] shadow-[1px_1px_0_#ffffff,-1px_-1px_0_#000000] flex items-center justify-center mx-0.5",
              isMobile ? "w-6 h-6 mobile-touch-friendly" : "w-5 h-5"
            )}
            onClick={handleClose}
          >
            <div
              className={cn(
                "bg-[#000000] absolute transform rotate-45",
                isMobile ? "w-4 h-0.5" : "w-3 h-0.5"
              )}
            ></div>
            <div
              className={cn(
                "bg-[#000000] absolute transform -rotate-45",
                isMobile ? "w-4 h-0.5" : "w-3 h-0.5"
              )}
            ></div>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div
        className={cn(
          "flex-1 bg-white border border-[#808080] border-t-0 border-l-0 border-r-0",
          isMobile ? "mobile-scrollable overflow-auto" : "overflow-auto",
          isMinimized && !isFullscreen ? "hidden" : ""
        )}
      >
        {children}
      </div>

      {/* Resize Handles - Hidden on mobile or when in fullscreen */}
      {resizable && !isMobile && !isFullscreen && (
        <>
          {/* Corner resize handles */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={(e) => handleResizeMouseDown("se", e)}
          >
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-[#000000]"></div>
          </div>
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
            onMouseDown={(e) => handleResizeMouseDown("sw", e)}
          >
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-[#000000]"></div>
          </div>
          <div
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"
            onMouseDown={(e) => handleResizeMouseDown("ne", e)}
          >
            <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-[#000000]"></div>
          </div>
          <div
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
            onMouseDown={(e) => handleResizeMouseDown("nw", e)}
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-[#000000]"></div>
          </div>

          {/* Edge resize handles */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-2 cursor-n-resize"
            onMouseDown={(e) => handleResizeMouseDown("n", e)}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-2 cursor-s-resize"
            onMouseDown={(e) => handleResizeMouseDown("s", e)}
          ></div>
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-8 cursor-w-resize"
            onMouseDown={(e) => handleResizeMouseDown("w", e)}
          ></div>
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-8 cursor-e-resize"
            onMouseDown={(e) => handleResizeMouseDown("e", e)}
          ></div>
        </>
      )}
    </div>
  );
}
