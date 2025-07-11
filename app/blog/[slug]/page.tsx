import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { notFound } from "next/navigation"

// Mock blog post data - in a real app, this would come from a CMS or database
const blogPosts = {
  "spaced-repetition": {
    title: "The Power of Spaced Repetition in Vocabulary Learning",
    author: "Dr. Sarah Chen",
    date: "May 28, 2025",
    readTime: "8 min read",
    image: "/placeholder.svg?height=600&width=600&text=Spaced+Repetition",
    content: `
      <p>Spaced repetition is one of the most powerful learning techniques backed by decades of cognitive science research. When it comes to vocabulary acquisition, this method can dramatically improve both retention and recall rates.</p>

      <h2>What is Spaced Repetition?</h2>
      <p>Spaced repetition is a learning technique that involves reviewing information at increasing intervals. Instead of cramming all at once, you review material just as you're about to forget it, strengthening the memory pathway each time.</p>

      <p>The concept was first introduced by Hermann Ebbinghaus in the 1880s through his groundbreaking research on the "forgetting curve." He discovered that we forget information exponentially over time, but each review session slows down this forgetting process.</p>

      <h2>How It Works for Vocabulary Learning</h2>
      <p>When learning new vocabulary, spaced repetition helps move words from short-term to long-term memory through strategic timing:</p>

      <ul>
        <li><strong>Initial Learning:</strong> You encounter a new word and learn its meaning</li>
        <li><strong>First Review:</strong> Review after 1 day to reinforce the connection</li>
        <li><strong>Second Review:</strong> Review after 3 days to strengthen the memory</li>
        <li><strong>Third Review:</strong> Review after 1 week to solidify long-term retention</li>
        <li><strong>Subsequent Reviews:</strong> Continue at increasing intervals (2 weeks, 1 month, etc.)</li>
      </ul>

      <h2>The Science Behind the Method</h2>
      <p>Research shows that spaced repetition leverages several key principles of memory formation:</p>

      <p><strong>The Testing Effect:</strong> Actively recalling information strengthens memory more than passive review. When you try to remember a word's meaning before checking the answer, you're engaging in active retrieval practice.</p>

      <p><strong>Desirable Difficulties:</strong> The slight struggle to remember information actually makes the memory stronger. This is why reviewing just before you forget is more effective than reviewing when the information is still fresh.</p>

      <p><strong>Consolidation:</strong> Each review session helps consolidate the memory, moving it from temporary storage to more permanent neural pathways.</p>

      <h2>Implementing Spaced Repetition in Your Study Routine</h2>
      <p>Here are practical ways to incorporate spaced repetition into your vocabulary learning:</p>

      <h3>1. Use Digital Flashcard Systems</h3>
      <p>Modern spaced repetition software automatically calculates optimal review intervals based on your performance. Popular options include Anki, Quizlet, and integrated features in language learning apps.</p>

      <h3>2. Create a Review Schedule</h3>
      <p>If using physical flashcards or notebooks, create a simple scheduling system:</p>
      <ul>
        <li>Box 1: New words (review daily)</li>
        <li>Box 2: Words learned 1-3 days ago (review every 3 days)</li>
        <li>Box 3: Words learned 1 week ago (review weekly)</li>
        <li>Box 4: Words learned 1 month ago (review monthly)</li>
      </ul>

      <h3>3. Track Your Progress</h3>
      <p>Keep records of which words you're struggling with and which ones you've mastered. This data helps you focus your efforts where they're needed most.</p>

      <h2>Common Mistakes to Avoid</h2>
      <p>While spaced repetition is highly effective, there are some pitfalls to watch out for:</p>

      <p><strong>Over-reviewing:</strong> Reviewing words too frequently can actually be counterproductive. Trust the spacing intervals and resist the urge to review everything daily.</p>

      <p><strong>Passive Recognition:</strong> Simply recognizing a word when you see it isn't enough. Make sure you can actively recall and use the word in context.</p>

      <p><strong>Ignoring Context:</strong> While flashcards are useful, make sure to also encounter words in natural contexts through reading and conversation.</p>

      <h2>Maximizing Your Results</h2>
      <p>To get the most out of spaced repetition for vocabulary learning:</p>

      <ul>
        <li>Be consistent with your review sessions</li>
        <li>Focus on quality over quantity</li>
        <li>Include example sentences and context</li>
        <li>Practice both recognition and production</li>
        <li>Connect new words to words you already know</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Spaced repetition transforms vocabulary learning from a frustrating struggle into an efficient, scientifically-backed process. By understanding and applying these principles, you can dramatically improve your word retention and build a robust vocabulary that serves you for life.</p>

      <p>Remember, the key is consistency and trust in the process. Start small, be patient with yourself, and watch as your vocabulary grows stronger with each strategic review session.</p>
    `,
  },
  "word-a-day": {
    title: "Why Learning a New Word Every Day Matters",
    author: "Michael Rodriguez",
    date: "May 20, 2025",
    readTime: "6 min read",
    image: "/image.png?height=600&width=600&text=Daily+Learning",
    content: `
      <p>The concept of learning one new word every day might seem simple, but its impact on your communication skills, cognitive development, and personal growth is profound. This small daily habit can transform your vocabulary and, by extension, your ability to express complex ideas and connect with others.</p>

      <h2>The Compound Effect of Daily Learning</h2>
      <p>Learning just one word per day equals 365 new words per year. Over five years, that's 1,825 words – enough to significantly expand your active vocabulary and improve your communication in both personal and professional settings.</p>

      <p>But the benefits go beyond simple arithmetic. Each new word you learn creates connections with existing knowledge, forming a rich network of linguistic understanding that enhances your overall language proficiency.</p>

      <h2>Cognitive Benefits</h2>
      <p>Daily vocabulary expansion offers numerous cognitive advantages:</p>

      <h3>Enhanced Neural Plasticity</h3>
      <p>Learning new words stimulates brain plasticity, keeping your mind sharp and adaptable. This daily mental exercise strengthens neural pathways and can help maintain cognitive function as you age.</p>

      <h3>Improved Memory</h3>
      <p>The process of learning and retaining new vocabulary exercises your memory systems, improving both short-term and long-term recall abilities.</p>

      <h3>Better Problem-Solving</h3>
      <p>A richer vocabulary provides more tools for thinking and problem-solving. When you have precise words to describe concepts, you can think about them more clearly and communicate solutions more effectively.</p>

      <h2>Professional and Academic Advantages</h2>
      <p>A strong vocabulary is often associated with intelligence, education, and competence. In professional settings, the ability to articulate ideas clearly and precisely can:</p>

      <ul>
        <li>Improve your credibility in meetings and presentations</li>
        <li>Enhance your writing skills for reports and communications</li>
        <li>Help you understand complex documents and technical materials</li>
        <li>Increase your confidence in professional interactions</li>
      </ul>

      <h2>Creating Your Daily Word Habit</h2>
      <p>Establishing a sustainable daily vocabulary practice requires strategy and consistency:</p>

      <h3>Choose Your Source</h3>
      <p>Select reliable sources for new words:</p>
      <ul>
        <li>Word-of-the-day calendars or apps</li>
        <li>Quality dictionaries with daily features</li>
        <li>Vocabulary-building books</li>
        <li>Educational websites and newsletters</li>
      </ul>

      <h3>Set a Consistent Time</h3>
      <p>Link your vocabulary learning to an existing habit:</p>
      <ul>
        <li>With your morning coffee</li>
        <li>During your commute</li>
        <li>Before checking emails</li>
        <li>As part of your evening routine</li>
      </ul>

      <h3>Go Beyond Definitions</h3>
      <p>For each new word, explore:</p>
      <ul>
        <li>Etymology and word origins</li>
        <li>Multiple definitions and contexts</li>
        <li>Example sentences</li>
        <li>Synonyms and antonyms</li>
        <li>Related words and word families</li>
      </ul>

      <h2>Making Words Stick</h2>
      <p>Learning a word is just the first step. To make it part of your active vocabulary:</p>

      <h3>Use It Immediately</h3>
      <p>Try to use your new word in conversation or writing within 24 hours of learning it. This immediate application helps transfer the word from passive to active vocabulary.</p>

      <h3>Create Personal Connections</h3>
      <p>Connect new words to your experiences, interests, or existing knowledge. Personal associations make words more memorable and meaningful.</p>

      <h3>Review Regularly</h3>
      <p>Implement spaced repetition to review previously learned words. This prevents forgetting and strengthens long-term retention.</p>

      <h2>Overcoming Common Challenges</h2>
      <p>Many people start strong but struggle to maintain their daily word habit. Here's how to overcome common obstacles:</p>

      <h3>Forgetting to Practice</h3>
      <p>Set reminders on your phone or use habit-tracking apps to maintain consistency.</p>

      <h3>Choosing Irrelevant Words</h3>
      <p>Focus on words that are relevant to your interests, profession, or reading materials. Practical relevance increases motivation and retention.</p>

      <h3>Feeling Overwhelmed</h3>
      <p>Start small and be patient. One word per day is manageable and sustainable. Quality over quantity is key.</p>

      <h2>Tracking Your Progress</h2>
      <p>Monitor your vocabulary growth to stay motivated:</p>
      <ul>
        <li>Keep a vocabulary journal</li>
        <li>Use apps that track your learning streaks</li>
        <li>Take periodic vocabulary assessments</li>
        <li>Notice improvements in your reading and writing</li>
      </ul>

      <h2>The Long-Term Impact</h2>
      <p>After months and years of consistent daily vocabulary building, you'll notice:</p>
      <ul>
        <li>Greater confidence in communication</li>
        <li>Improved reading comprehension</li>
        <li>Enhanced writing abilities</li>
        <li>Better performance in academic and professional settings</li>
        <li>Increased enjoyment of literature and complex texts</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Learning one new word every day is a small investment with enormous returns. This simple habit can transform your communication abilities, boost your confidence, and open doors to new opportunities.</p>

      <p>Start today. Choose one word, learn it thoroughly, and use it. Tomorrow, choose another. In a year, you'll be amazed at how much your vocabulary – and your ability to express yourself – has grown.</p>
    `,
  },
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 hero-gradient dot-pattern">
        <div className="container py-8 md:py-12">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="text-slate-600 hover:text-orange-600 p-0">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <Card className="mb-8 border-2 shadow-card overflow-hidden">
            <div className="relative">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-tight mb-4">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 shadow-card">
              <CardContent className="p-8 md:p-12">
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-display prose-headings:text-slate-900
                    prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-orange-600
                    prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-slate-800
                    prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:text-slate-700 prose-ul:mb-4
                    prose-li:mb-2
                    prose-strong:text-slate-900 prose-strong:font-semibold
                    prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
                  "
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            </Card>

            {/* Article Footer */}
            <div className="mt-8 text-center">
              <Link href="/blog">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium">
                  Read More Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Generate static params for known blog posts
export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata for each blog post
export function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    return {
      title: "Blog Post Not Found - VocabMarket",
    }
  }

  return {
    title: `${post.title} - VocabMarket Blog`,
    description: post.content.replace(/<[^>]*>/g, "").substring(0, 160) + "...",
  }
}
