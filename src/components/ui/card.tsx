import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Win95Card,
  Win95CardHeader,
  Win95CardFooter,
  Win95CardTitle,
  Win95CardDescription,
  Win95CardContent,
  Win95CardButton,
} from "./win95-card"

function Card({ className, title, children, ...props }: React.ComponentProps<"div"> & {
  title?: string;
}) {
  return (
    <Win95Card
      title={title}
      className={cn("", className)}
      {...props}
    >
      {children}
    </Win95Card>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Win95CardHeader
      className={cn("", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Win95CardTitle
      className={cn("", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Win95CardDescription
      className={cn("", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Win95CardContent
      className={cn("", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Win95CardFooter
      className={cn("", className)}
      {...props}
    />
  )
}

// Export Win95-styled card button for convenience
function CardButton({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Win95CardButton
      className={cn("", className)}
      {...props}
    >
      {children}
    </Win95CardButton>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardButton,
}
