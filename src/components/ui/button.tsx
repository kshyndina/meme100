import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-xs font-normal disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#c0c0c0] text-black border-t border-l border-white border-b border-r border-gray-500 relative active:border-t active:border-l active:border-gray-500 active:border-b active:border-r active:border-white active:top-[1px] active:left-[1px] hover:outline hover:outline-1 hover:outline-black focus:outline focus:outline-1 focus:outline-dotted focus:outline-black",
        primary:
          "bg-[#c0c0c0] text-black border-t border-l border-white border-b border-r border-gray-500 border border-black relative active:border-t active:border-l active:border-gray-500 active:border-b active:border-r active:border-white active:top-[1px] active:left-[1px] hover:outline hover:outline-1 hover:outline-black focus:outline focus:outline-1 focus:outline-dotted focus:outline-black",
        destructive:
          "bg-[#c0c0c0] text-black border-t border-l border-white border-b border-r border-gray-500 relative active:border-t active:border-l active:border-gray-500 active:border-b active:border-r active:border-white active:top-[1px] active:left-[1px] hover:outline hover:outline-1 hover:outline-black focus:outline focus:outline-1 focus:outline-dotted focus:outline-black",
        outline:
          "bg-[#c0c0c0] text-black border-t border-l border-white border-b border-r border-gray-500 relative active:border-t active:border-l active:border-gray-500 active:border-b active:border-r active:border-white active:top-[1px] active:left-[1px] hover:outline hover:outline-1 hover:outline-black focus:outline focus:outline-1 focus:outline-dotted focus:outline-black",
        secondary:
          "bg-[#c0c0c0] text-black border-t border-l border-white border-b border-r border-gray-500 relative active:border-t active:border-l active:border-gray-500 active:border-b active:border-r active:border-white active:top-[1px] active:left-[1px] hover:outline hover:outline-1 hover:outline-black focus:outline focus:outline-1 focus:outline-dotted focus:outline-black",
        ghost:
          "bg-transparent text-black border-transparent hover:bg-[#c0c0c0] hover:border-t hover:border-l hover:border-white hover:border-b hover:border-r hover:border-gray-500 relative active:border-t active:border-l active:border-gray-500 active:border-b active:border-r active:border-white active:top-[1px] active:left-[1px] focus:outline focus:outline-1 focus:outline-dotted focus:outline-black",
        link: "text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[22px] px-3 py-0 has-[>svg]:px-2.5",
        sm: "h-[18px] gap-1.5 px-2 has-[>svg]:px-2",
        lg: "h-[26px] px-4 has-[>svg]:px-3",
        icon: "size-[22px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}
      {...props}
    />
  );
}

export { Button, buttonVariants };
