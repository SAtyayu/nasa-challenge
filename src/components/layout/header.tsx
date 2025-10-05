"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export default function Header({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header className={cn("sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6", className)} {...props}>
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-lg font-semibold md:hidden font-headline text-primary">
        City Insights Hub
      </h1>
    </header>
  )
}
