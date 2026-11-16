"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

/**
 * Two looks share one API:
 *  - "pills": a segmented control on a raised track (view switchers)
 *  - "line":  underline tabs on a hairline (page sections)
 * TabsList sets the variant; its triggers pick it up through context.
 */
const tabsListVariants = cva("inline-flex items-center text-muted-foreground", {
  variants: {
    variant: {
      pills: "h-11 justify-center gap-1 rounded-xl border border-border bg-secondary/70 p-1",
      line: "h-auto w-full justify-start gap-1 rounded-none border-b border-border bg-transparent p-0",
    },
  },
  defaultVariants: { variant: "pills" },
})

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        pills:
          "h-full rounded-lg px-4 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-[inset_0_1px_0_0_hsl(0_0%_100%/0.06),0_1px_2px_rgb(0_0_0/0.4)]",
        line:
          "-mb-px rounded-none border-b-2 border-transparent px-4 py-3 hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground",
      },
    },
    defaultVariants: { variant: "pills" },
  }
)

type TabsVariant = NonNullable<VariantProps<typeof tabsListVariants>["variant"]>

const TabsVariantContext = React.createContext<TabsVariant>("pills")

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsVariantContext.Provider value={variant ?? "pills"}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  </TabsVariantContext.Provider>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsVariantContext)
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
