import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"

export function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-950 md:px-6">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image src="/placeholder-logo.png" alt="VocabMarket Logo" width={32} height={32} />
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">VocabMarket</span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        <Link
          href="/dashboard"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          Dashboard
        </Link>
        <Link
          href="/practice"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          Practice
        </Link>
        <Link
          href="/leaderboard"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          Leaderboard
        </Link>
        <Link
          href="/portfolio-map"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          Portfolio Map
        </Link>
        <Link
          href="/pricing"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          Pricing
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">Sign In</Link>
        </Button>
        <Button size="sm" asChild className="bg-orange-500 hover:bg-orange-600 text-white">
          <Link href="/signup">Get Started</Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden bg-transparent">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link
                href="/dashboard"
                className="text-lg font-medium hover:text-gray-900 dark:hover:text-gray-50"
                prefetch={false}
              >
                Dashboard
              </Link>
              <Link
                href="/practice"
                className="text-lg font-medium hover:text-gray-900 dark:hover:text-gray-50"
                prefetch={false}
              >
                Practice
              </Link>
              <Link
                href="/leaderboard"
                className="text-lg font-medium hover:text-gray-900 dark:hover:text-gray-50"
                prefetch={false}
              >
                Leaderboard
              </Link>
              <Link
                href="/portfolio-map"
                className="text-lg font-medium hover:text-gray-900 dark:hover:text-gray-50"
                prefetch={false}
              >
                Portfolio Map
              </Link>
              <Link
                href="/pricing"
                className="text-lg font-medium hover:text-gray-900 dark:hover:text-gray-50"
                prefetch={false}
              >
                Pricing
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
