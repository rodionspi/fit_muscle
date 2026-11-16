import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Shared field styling. Exported so Formik's <Field> (and native selects /
 * textareas) can look identical to <Input> without wrapping them.
 */
export const inputClassName =
  "flex h-11 w-full rounded-lg border border-input bg-surface-2 px-3.5 py-2 text-base text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/70 hover:border-muted-foreground/40 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputClassName, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
