"use client"
import Link from "next/link"
import { useRouter } from "next/router"

const Header = () => {
  const { pathname } = useRouter()

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="flex">
              <span className="sr-only">Workflow</span>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {/* Desktop navigation links */}
              <Link href="/about" className={`nav-link ${pathname === "/about" ? "nav-link-active" : ""}`}>
                About
              </Link>
              <Link href="/services" className={`nav-link ${pathname === "/services" ? "nav-link-active" : ""}`}>
                Services
              </Link>
              <Link href="/contact" className={`nav-link ${pathname === "/contact" ? "nav-link-active" : ""}`}>
                Contact
              </Link>
              <Link href="/pricing" className={`nav-link ${pathname === "/pricing" ? "nav-link-active" : ""}`}>
                Pricing
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-8">{/* Desktop navigation actions */}</div>
          <div className="flex lg:hidden">{/* Mobile menu button */}</div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {/* Mobile navigation links */}
          <Link
            href="/about"
            className={`block px-3 py-2 text-base font-medium transition-colors ${
              pathname === "/about"
                ? "text-orange-600 bg-orange-50"
                : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
            }`}
          >
            About
          </Link>
          <Link
            href="/services"
            className={`block px-3 py-2 text-base font-medium transition-colors ${
              pathname === "/services"
                ? "text-orange-600 bg-orange-50"
                : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
            }`}
          >
            Services
          </Link>
          <Link
            href="/contact"
            className={`block px-3 py-2 text-base font-medium transition-colors ${
              pathname === "/contact"
                ? "text-orange-600 bg-orange-50"
                : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
            }`}
          >
            Contact
          </Link>
          <Link
            href="/pricing"
            className={`block px-3 py-2 text-base font-medium transition-colors ${
              pathname === "/pricing"
                ? "text-orange-600 bg-orange-50"
                : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
            }`}
          >
            Pricing
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
