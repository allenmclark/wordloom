import Link from "next/link"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-accent" />
          <span className="text-xl font-display font-bold text-accent">VocabMarket</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="nav-link">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/practice" className="nav-link">
            Practice
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/spanish-english" className="nav-link">
            Spanish-English
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/dashboard" className="nav-link">
            Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/leaderboard" className="nav-link">
            Leaderboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/blog" className="nav-link">
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button className="btn-outline btn-sm rounded-full px-4">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button className="btn-primary btn-sm rounded-full px-4">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
