import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium leading-5 transition-colors [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-primary/30 bg-primary/10 text-emerald-300",
        secondary: "border-border bg-secondary text-secondary-foreground",
        outline: "border-border bg-transparent text-muted-foreground",
        muted: "border-transparent bg-white/[0.06] text-foreground/80",
        info: "border-sky-500/30 bg-sky-500/10 text-sky-300",
        warning: "border-amber-500/30 bg-amber-500/10 text-amber-300",
        danger: "border-red-500/30 bg-red-500/10 text-red-300",
        violet: "border-violet-500/30 bg-violet-500/10 text-violet-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

/** Maps the dataset's difficulty strings to a badge colour. */
export const difficultyVariant = (difficulty: string | undefined): BadgeProps["variant"] => {
  switch ((difficulty ?? "").toLowerCase()) {
    case "beginner":
      return "default"
    case "intermediate":
      return "warning"
    case "advanced":
      return "danger"
    default:
      return "outline"
  }
}

export { Badge, badgeVariants }
