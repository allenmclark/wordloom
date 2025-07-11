import Link from "next/link"
import { BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-12 md:py-16 hero-gradient-vibrant page-content">
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
      
    </div>
  )
}

const blogPosts = [
  {
    title: "The Power of Spaced Repetition in Vocabulary Learning",
    slug: "spaced-repetition",
    date: "May 28, 2025",
    image: "https://blog.logrocket.com/wp-content/uploads/2021/09/next-js-automatic-image-optimization-next-image.png?height=225&width=400",
    excerpt:
      "Discover how spaced repetition, a scientifically proven learning technique, can dramatically improve your vocabulary retention and recall. Learn to integrate it into your daily study routine for maximum effectiveness.",
  },
  {
    title: "Why Learning a New Word Every Day Matters",
    slug: "word-a-day",
    date: "May 20, 2025",
    image: "/image.png?height=225&width=400",
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
