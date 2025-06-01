import Link from "next/link"
import { BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-display font-bold text-orange-500">VocabMaster</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-orange-500 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/practice"
              className="text-sm font-medium transition-colors hover:text-orange-500 relative group"
            >
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
            <Link href="/blog" className="text-sm font-medium text-orange-500 relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500"></span>
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
      <main className="flex-1 container py-12 md:py-16 hero-gradient dot-pattern">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Our Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and stories from the world of vocabulary learning.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="border-2 shadow-card overflow-hidden card-hover animate-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={400}
                height={225}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 text-base line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline" className="w-full rounded-lg btn-orange-outline">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <footer className="border-t py-6 md:py-0 bg-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-orange-500" />
            <p className="text-sm text-muted-foreground">© 2025 VocabMaster. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const blogPosts = [
  {
    title: "The Power of Spaced Repetition in Vocabulary Learning",
    slug: "spaced-repetition",
    date: "May 28, 2025",
    image: "/placeholder.svg?height=225&width=400",
    excerpt:
      "Discover how spaced repetition, a scientifically proven learning technique, can dramatically improve your vocabulary retention and recall. Learn to integrate it into your daily study routine for maximum effectiveness.",
  },
  {
    title: "Why Learning a New Word Every Day Matters",
    slug: "word-a-day",
    date: "May 20, 2025",
    image: "/placeholder.svg?height=225&width=400",
    excerpt:
      "Consistency is key in vocabulary acquisition. This post explores the cumulative benefits of learning just one new word daily and how it can transform your communication skills over time.",
  },
  {
    title: "Beyond Definitions: Understanding Word Nuances",
    slug: "word-nuances",
    date: "May 15, 2025",
    image: "/placeholder.svg?height=225&width=400",
    excerpt:
      "True mastery of vocabulary goes beyond memorizing definitions. Dive into the subtle differences between synonyms, the emotional connotations of words, and how to use them effectively in context.",
  },
  {
    title: "Gamification of Learning: Making Vocabulary Fun",
    slug: "gamification",
    date: "May 10, 2025",
    image: "/placeholder.svg?height=225&width=400",
    excerpt:
      "Explore how game-like elements, points, streaks, and leaderboards can motivate learners and make the process of expanding your vocabulary engaging and enjoyable.",
  },
  {
    title: "The Link Between Vocabulary and Critical Thinking",
    slug: "vocab-critical-thinking",
    date: "May 5, 2025",
    image: "/placeholder.svg?height=225&width=400",
    excerpt:
      "A rich vocabulary isn't just for better communication; it's a powerful tool for enhancing your critical thinking and analytical skills. Learn how expanding your lexicon sharpens your mind.",
  },
  {
    title: "How to Choose the Right Words for Your Goals",
    slug: "choose-words",
    date: "April 28, 2025",
    image: "/placeholder.svg?height=225&width=400",
    excerpt:
      "Whether for academic success, professional advancement, or personal enrichment, selecting the right vocabulary to learn is crucial. This guide helps you prioritize words that align with your specific goals.",
  },
]
