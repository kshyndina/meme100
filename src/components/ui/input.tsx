import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-white border-t border-l border-gray-500 border-b border-r border-white flex h-[22px] w-full min-w-0 px-2 py-0 text-xs shadow-none outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-t focus:border-l focus:border-gray-500 focus:border-b focus:border-r focus:border-white focus:outline focus:outline-1 focus:outline-dotted focus:outline-black",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}
      {...props}
    />
  );
}

export { Input };
