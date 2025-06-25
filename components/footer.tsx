import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t section-background no-fade">
      <p className="text-xs vibrant-text-primary">&copy; 2024 VocabMarket. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:underline underline-offset-4 vibrant-text-primary hover:text-orange-500 transition-colors no-fade"
          href="#"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4 vibrant-text-primary hover:text-orange-500 transition-colors no-fade"
          href="#"
        >
          Privacy
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4 vibrant-text-primary hover:text-orange-500 transition-colors no-fade"
          href="#"
        >
          Contact
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4 vibrant-text-primary hover:text-orange-500 transition-colors no-fade"
          href="#"
        >
          Help
        </Link>
      </nav>
    </footer>
  )
}
