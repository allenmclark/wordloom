"use client"

import Link from "next/link"
import Image from "next/image"
import { BookOpen, BrainCircuit, ClipboardList, LineChart, Rocket, Sparkles, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowItWorksPage() {
  return (
    <div className="bg-slate-50 text-slate-800">
      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm border border-orange-200/50 mb-4">
            The Official Guide
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900">
            The VocabMarket <span className="text-gradient">Playbook</span>
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-muted-foreground">
            From your first word investment to building a diversified language portfolio, here’s everything you need to
            know to master the market.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-orange-600 hover:prose-a:text-orange-700">
          <p className="lead">
            Welcome to VocabMarket! We're excited to have you on board. This guide is designed to be your comprehensive
            manual for navigating the platform. Whether you're a casual learner or a dedicated linguist, you'll find
            everything you need to maximize your learning potential here.
          </p>

          <section id="philosophy">
            <h2>The Philosophy: Why 'Invest' in Words?</h2>
            <p>
              Traditional vocabulary learning can feel like a chore. You memorize lists, you forget them, and the
              process repeats. We knew there had to be a better way. That's why we created VocabMarket, built on a
              simple but powerful metaphor: <strong>learning vocabulary is an investment in yourself.</strong>
            </p>
            <p>
              Every new word you learn is an asset added to your personal portfolio. The more you practice and master
              these words, the more their "value" grows. Your dashboard isn't just a progress tracker; it's your
              personal stock market ticker, showing the returns on your intellectual investment. This approach turns
              learning from a passive task into an active, engaging, and rewarding journey.
            </p>
          </section>

          <section id="getting-started">
            <h2>Your First Day: Getting Started</h2>
            <p>
              Ready to make your first trade? Here’s how to get set up and start building your portfolio in minutes.
            </p>
            <Card className="my-8 bg-white/50 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-xl">
              <div className="relative p-6 border-l-4 border-orange-500">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-3 text-slate-800">
                    <ClipboardList className="h-6 w-6 text-orange-500" />
                    <span>Step 1: Create Your Account & Set Up Your Profile</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-slate-600">
                    Signing up is your ticket to the trading floor. Once you're in, head to your{" "}
                    <Link href="/profile" className="font-semibold">
                      Profile
                    </Link>
                    . Here you can add a profile picture, set your location, and most importantly, decide if you want to
                    appear on the public leaderboards. We respect your privacy, so you're always in control of your
                    visibility.
                  </p>
                </CardContent>
              </div>
            </Card>
            <Card className="my-8 bg-white/50 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-xl">
              <div className="relative p-6 border-l-4 border-blue-500">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-3 text-slate-800">
                    <LineChart className="h-6 w-6 text-blue-500" />
                    <span>Step 2: Understand Your Dashboard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="text-slate-600">
                    Your{" "}
                    <Link href="/dashboard" className="font-semibold">
                      Dashboard
                    </Link>{" "}
                    is your mission control. It gives you a real-time overview of your portfolio's performance. Key
                    metrics include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600">
                    <li>
                      <strong>Portfolio Value:</strong> A composite score reflecting the number of words you're learning
                      and your mastery of them.
                    </li>
                    <li>
                      <strong>Words Mastered:</strong> The total number of words you've successfully moved to your
                      long-term memory.
                    </li>
                    <li>
                      <strong>Learning Activity:</strong> A heatmap showing your practice consistency. Green is good!
                    </li>
                  </ul>
                  <p className="text-slate-600">
                    Don't worry about understanding everything at once. It will become clearer as you start learning.
                  </p>
                </CardContent>
              </div>
            </Card>
            <Card className="my-8 bg-white/50 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-xl">
              <div className="relative p-6 border-l-4 border-green-500">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-3 text-slate-800">
                    <BookOpen className="h-6 w-6 text-green-500" />
                    <span>Step 3: Make Your First Word Investment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-slate-600">
                    You can't grow a portfolio without assets. Head over to the{" "}
                    <Link href="/vocabulary" className="font-semibold">
                      Vocabulary
                    </Link>{" "}
                    page. Think of these as different sectors of the market (e.g., "Business Spanish," "Travel
                    Vocabulary"). Browse the lists, find one that interests you, and start adding words to your
                    portfolio. This is the equivalent of buying your first stocks.
                  </p>
                </CardContent>
              </div>
            </Card>
          </section>

          <section id="core-loop">
            <h2>The Core Loop: Growing Your Portfolio</h2>
            <p>
              Consistent, strategic effort is the key to success in any market. At VocabMarket, our core loop is
              designed to make that effort as efficient and enjoyable as possible.
            </p>
            <Image
              src="/placeholder.svg?width=800&height=200"
              alt="Diagram of the Discover, Practice, Track loop"
              width={800}
              height={200}
              className="rounded-lg my-8 shadow-lg"
            />
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Discover & Acquire:</strong> Continuously explore the <Link href="/vocabulary">Vocabulary</Link>{" "}
                page to find new vocabulary. Diversifying your portfolio by learning words from different topics keeps
                your learning balanced and interesting.
              </li>
              <li>
                <strong>Practice & Grow:</strong> This is where the magic happens. The{" "}
                <Link href="/practice">Practice</Link> page generates personalized quizzes based on your portfolio. Our
                system uses spaced repetition to test you on words right before you're about to forget them,
                dramatically improving retention.
              </li>
              <li>
                <strong>Track & Analyze:</strong> Regularly visit your <Link href="/dashboard">Dashboard</Link> to
                review your progress. Which words are you struggling with? When are you most productive? Use these
                insights to adjust your strategy.
              </li>
            </ol>
          </section>

          <section id="advanced">
            <h2>Advanced Trading: Becoming a Power User</h2>
            <p>Once you've mastered the basics, use these features to take your learning to the next level.</p>
            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="p-6 bg-white/50 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl transition-all hover:shadow-xl">
                <h4 className="font-bold text-xl flex items-center gap-3 text-slate-800">
                  <Sparkles className="h-6 w-6 text-orange-500" />
                  Create Custom Word Decks
                </h4>
                <p className="mt-2 text-slate-600">
                  Don't see a list that fits your needs? Create your own! On the{" "}
                  <Link href="/vocabulary" className="font-semibold">
                    Vocabulary
                  </Link>{" "}
                  page, you can build custom decks from scratch. This is perfect for specific subjects, textbook
                  chapters, or personal interests.
                </p>
              </div>
              <div className="p-6 bg-white/50 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl transition-all hover:shadow-xl">
                <h4 className="font-bold text-xl flex items-center gap-3 text-slate-800">
                  <Users className="h-6 w-6 text-blue-500" />
                  Compete on the Leaderboard
                </h4>
                <p className="mt-2 text-slate-600">
                  Check your rank on the{" "}
                  <Link href="/leaderboard" className="font-semibold">
                    Leaderboard
                  </Link>
                  . Healthy competition can be a powerful motivator. You can also switch to the "Friends" tab to create
                  a more personal competition with people you know.
                </p>
              </div>
            </div>
          </section>

          <section id="science">
            <h2>The Science Behind the Market</h2>
            <p>
              VocabMarket isn't just a fun metaphor; it's built on proven cognitive science principles to ensure your
              time is well spent.
            </p>
            <ul className="space-y-6 mt-6">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Spaced Repetition System (SRS)</h4>
                  <p>
                    This is the core of our practice engine. Instead of cramming, our algorithm schedules reviews at
                    increasing intervals. This technique is scientifically proven to move information from your
                    short-term to your long-term memory with maximum efficiency.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <BrainCircuit className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Active Recall</h4>
                  <p>
                    We prioritize exercises that force you to actively retrieve information from your brain, rather than
                    passively recognizing it. Answering a quiz question is much more powerful for memory formation than
                    simply re-reading a definition.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <div className="mt-20 text-center p-10 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl">
            <Rocket className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold">Ready to build your portfolio?</h2>
            <p className="mt-4 text-lg max-w-xl mx-auto text-muted-foreground">
              You have the playbook. The market is open. Your journey to vocabulary mastery starts now.
            </p>
            <div className="mt-8">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                >
                  Start Trading Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
