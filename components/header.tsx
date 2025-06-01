import Link from "next/link"
import { BookOpen } from "lucide-react"

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
            <button
              className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-orange-200 hover:border-orange-500 hover:bg-orange-50 h-9 px-4 py-2"
              variant="outline"
              size="sm"
            >
              Log in
            </button>
          </Link>
          <Link href="/signup">
            <button
              className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-500 hover:bg-orange-600 text-white shadow-sm h-9 px-4 py-2"
              size="sm"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
