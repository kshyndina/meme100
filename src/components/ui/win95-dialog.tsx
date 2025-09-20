"use client";

import React, { useEffect, useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Win95Window } from "./win95-window";

interface Win95DialogProps {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  showCloseButton?: boolean;
  defaultWidth?: number;
  defaultHeight?: number;
}

function Win95Dialog({
  title,
  children,
  open,
  onOpenChange,
  className,
  showCloseButton = true,
  defaultWidth = 400,
  defaultHeight = 300,
}: Win95DialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle focus management for accessibility
  useEffect(() => {
    if (open && contentRef.current) {
      // Focus the first focusable element in the dialog
      const focusableElements = contentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Modal overlay with classic Win95 styling */}
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
          )}
        >
          <Win95Window
            title={title}
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            initialX={0}
            initialY={0}
            closable={showCloseButton}
            minimizable={true}
            maximizable={true}
            resizable={true}
            onClose={() => onOpenChange?.(false)}
            className="relative"
          >
            <div ref={contentRef} className="p-4">
              {children}
            </div>
          </Win95Window>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function Win95DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function Win95DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function Win95DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center mb-4", className)}
      {...props}
    />
  );
}

function Win95DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-4",
        className
      )}
      {...props}
    />
  );
}

function Win95DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg font-bold font-win95-ms-sans", className)}
      {...props}
    />
  );
}

function Win95DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm font-win95-ms-sans", className)}
      {...props}
    />
  );
}

// Win95-styled OK/Cancel buttons
function Win95DialogButton({
  children,
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "default" | "cancel";
}) {
  return (
    <button
      className={cn(
        "bg-[#c0c0c0] text-black border-t border-l border-white border-b border-r border-gray-500 relative active:border-t active:border-l active:border-gray-500 active:border-b active:border-r active:border-white active:top-[1px] active:left-[1px] hover:outline hover:outline-1 hover:outline-black focus:outline focus:outline-1 focus:outline-dotted focus:outline-black h-[22px] px-3 py-0 font-mono text-xs font-normal",
        variant === "cancel" && "ml-2",
        className
      )}
      style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}
      {...props}
    >
      {children}
    </button>
  );
}

export {
  Win95Dialog,
  Win95DialogClose,
  Win95DialogTrigger,
  Win95DialogHeader,
  Win95DialogFooter,
  Win95DialogTitle,
  Win95DialogDescription,
  Win95DialogButton,
};