"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu, MountainIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { languages } from "@/lib/languages"

export function Header() {
  const pathname = usePathname()
  const currentLanguage = languages.find((l) => l.code === "es") // Example, should be dynamic

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/word-groups", label: "Word Groups" },
    { href: "/portfolio-map", label: "Portfolio Map" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <MountainIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">VocabMarket</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === href ? "text-foreground" : "text-foreground/60",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" size="icon" variant="ghost">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <MountainIcon className="h-6 w-6" />
              <span className="font-bold">VocabMarket</span>
            </Link>
            <div className="mt-6 grid gap-2 py-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex w-full items-center py-2 text-lg font-semibold",
                    pathname === href ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Image
                  src={`/flags/${currentLanguage?.flag || "es"}.svg`}
                  alt={`${currentLanguage?.name} flag`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Change Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code}>
                  <Link href="#" className="flex items-center">
                    <Image
                      src={`/flags/${lang.flag}.svg`}
                      alt={`${lang.name} flag`}
                      width={20}
                      height={20}
                      className="mr-2 rounded-full"
                    />
                    {lang.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Image src="/placeholder-user.jpg" alt="User avatar" width={32} height={32} className="rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/practice">Practice</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
