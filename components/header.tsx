import Link from "next/link"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-display font-bold text-orange-500">VocabMarket</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-orange-500 relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/practice" className="text-sm font-medium transition-colors hover:text-orange-500 relative group">
            Practice
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-orange-500 relative group"
          >
            Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/leaderboard"
            className="text-sm font-medium transition-colors hover:text-orange-500 relative group"
          >
            Leaderboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/blog" className="text-sm font-medium transition-colors hover:text-orange-500 relative group">
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" size="sm" className="rounded-full px-4 btn-orange-outline">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="rounded-full px-4 btn-orange">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
