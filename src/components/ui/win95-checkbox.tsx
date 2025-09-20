"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"

function Win95Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "bg-[#c0c0c0] border-t border-l border-white border-b border-r border-gray-500 data-[state=checked]:bg-[#c0c0c0] data-[state=checked]:text-black focus:outline focus:outline-1 focus:outline-dotted focus:outline-black size-4 shrink-0 shadow-none outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <div className="w-3 h-3 flex items-center justify-center">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Win95Checkbox }