"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/practice", label: "Practice" },
    { href: "/spanish-english", label: "Spanish-English" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/blog", label: "Blog" },
  ]

if (true) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-fade">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-orange-500 no-fade" />
          <span className="text-xl font-display font-bold text-orange-500 no-fade">VocabMaster</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative group no-fade ${
                isActive(link.href) ? "text-orange-500 font-semibold" : "text-foreground hover:text-orange-500"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" size="sm" className="rounded-full px-4 vibrant-button-outline no-fade hover:bg-transparent hover:text-orange-500">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="rounded-full px-4 vibrant-button-primary no-fade">
              Sign up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden no-fade"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur no-fade">
          <nav className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm font-medium transition-colors no-fade ${
                  isActive(link.href) ? "text-orange-500 font-semibold" : "text-foreground hover:text-orange-500"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full vibrant-button-outline no-fade">
                  Log in
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full vibrant-button-primary no-fade">
                  Sign up
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

else {

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-fade">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-orange-500 no-fade" />
          <span className="text-xl font-display font-bold text-orange-500 no-fade">VocabMaster</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative group no-fade ${
                isActive(link.href) ? "text-orange-500 font-semibold" : "text-foreground hover:text-orange-500"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" size="sm" className="rounded-full px-4 vibrant-button-outline no-fade hover:bg-transparent hover:text-orange-500">
              Log Out
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="rounded-full px-4 vibrant-button-primary no-fade">
              Sign Out
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden no-fade"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur no-fade">
          <nav className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm font-medium transition-colors no-fade ${
                  isActive(link.href) ? "text-orange-500 font-semibold" : "text-foreground hover:text-orange-500"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full vibrant-button-outline no-fade">
                  Log in
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full vibrant-button-primary no-fade">
                  Sign up
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
}