"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"

export function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <Link className="flex items-center gap-2 text-lg font-semibold" href="/">
        <span className="text-gradient text-xl font-bold">VocabMarket</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link className="hover:text-orange-500 transition-colors" href="/dashboard">
          Dashboard
        </Link>
        <Link className="hover:text-orange-500 transition-colors" href="/practice">
          Practice
        </Link>
        <Link className="hover:text-orange-500 transition-colors" href="/leaderboard">
          Leaderboard
        </Link>
        <Link className="hover:text-orange-500 transition-colors" href="/blog">
          Blog
        </Link>
        {/* Heatmap link removed as it's now a tab on the dashboard */}
        <Button className="btn-primary ml-4" variant="default">
          Sign Out
        </Button>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col gap-4 p-4">
            <Link className="hover:text-orange-500 transition-colors" href="/dashboard">
              Dashboard
            </Link>
            <Link className="hover:text-orange-500 transition-colors" href="/practice">
              Practice
            </Link>
            <Link className="hover:text-orange-500 transition-colors" href="/leaderboard">
              Leaderboard
            </Link>
            <Link className="hover:text-orange-500 transition-colors" href="/blog">
              Blog
            </Link>
            {/* Heatmap link removed from mobile menu */}
            <Button className="btn-primary mt-4" variant="default">
              Sign Out
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
