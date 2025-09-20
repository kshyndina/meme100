"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

function Win95RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}
      {...props}
    />
  )
}

function Win95RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "bg-[#c0c0c0] border-t border-l border-white border-b border-r border-gray-500 text-black focus:outline focus:outline-1 focus:outline-dotted focus:outline-black aspect-square size-4 shrink-0 shadow-none outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black rounded-full -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { Win95RadioGroup, Win95RadioGroupItem }