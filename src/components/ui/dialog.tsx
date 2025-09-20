"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Win95Dialog,
  Win95DialogClose,
  Win95DialogTrigger,
  Win95DialogHeader,
  Win95DialogFooter,
  Win95DialogTitle,
  Win95DialogDescription,
  Win95DialogButton,
} from "./win95-dialog";

function Dialog({
  title = "Dialog",
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & {
  title?: string;
}) {
  return <Win95Dialog title={title} {...props}>{children}</Win95Dialog>;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <Win95DialogTrigger {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <Win95DialogClose {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  title = "Dialog",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  title?: string;
}) {
  return (
    <Win95Dialog
      title={title}
      showCloseButton={showCloseButton}
      className={cn("", className)}
      {...props}
    >
      {children}
    </Win95Dialog>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Win95DialogHeader
      className={cn("", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Win95DialogFooter
      className={cn("", className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <Win95DialogTitle
      className={cn("", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <Win95DialogDescription
      className={cn("", className)}
      {...props}
    />
  );
}

// Export Win95-styled dialog button for convenience
function DialogButton({
  children,
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "default" | "cancel";
}) {
  return (
    <Win95DialogButton
      className={cn("", className)}
      variant={variant}
      {...props}
    >
      {children}
    </Win95DialogButton>
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogButton,
};
