"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Brain, TrendingUp, Target, Zap, Lightbulb, Rocket, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 hero-gradient-about overflow-hidden relative">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-block rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm border border-orange-200/50">
                  Our Mission
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-900">
                  Making Vocabulary Learning an <span className="text-gradient">Investment in Yourself</span>
                </h1>
                <p className="max-w-2xl text-muted-foreground md:text-xl mx-auto lg:mx-0">
                  At VocabMarket, we believe that building your vocabulary should be as engaging and rewarding as
                  growing a financial portfolio. We've reimagined language learning by blending proven educational
                  techniques with the dynamic, data-driven world of market trading.
                </p>
                <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center lg:justify-start">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="rounded-full px-8 py-6 bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                    >
                      Start Your Portfolio
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-full blur-3xl opacity-70"></div>
                <Image
                  src="/placeholder.svg?width=500&height=500"
                  alt="Abstract network of words"
                  width={500}
                  height={500}
                  className="relative rounded-full shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                The <span className="text-gradient">VocabMarket</span> Method
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We've broken down language mastery into three core pillars, inspired by professional trading strategies.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {howItWorksSteps.map((step, index) => (
                <div
                  key={index}
                  className="grid gap-4 p-6 rounded-2xl bg-slate-50/50 border border-slate-200/80 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-blue-100">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <p className="text-lg text-muted-foreground mb-4">
                Want a deeper dive into our methodology and a step-by-step guide?
              </p>
              <Link href="/how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 py-6 border-orange-200 hover:border-orange-500 hover:bg-white text-lg bg-transparent"
                >
                  Read The Official Playbook
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Our Philosophy Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="relative flex items-center justify-center lg:order-last">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-full blur-3xl opacity-70"></div>
                <Image
                  src="/placeholder.svg?width=500&height=500"
                  alt="Glowing brain"
                  width={500}
                  height={500}
                  className="relative rounded-full shadow-2xl"
                />
              </div>
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm border border-blue-200/50">
                  Our Philosophy
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Powered by Science, Driven by Engagement
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Learning shouldn't be a chore. Our platform is built on a foundation of cognitive science principles,
                  designed to make your study time both effective and enjoyable.
                </p>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Target className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Spaced Repetition & Active Recall</h4>
                      <p className="text-muted-foreground">
                        We use scientifically-backed algorithms to show you words at the perfect time, maximizing
                        retention and moving them from short-term to long-term memory.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Zap className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Gamification & Motivation</h4>
                      <p className="text-muted-foreground">
                        By framing learning as an investment and adding competitive elements like leaderboards, we tap
                        into intrinsic motivators to keep you coming back.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Lightbulb className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Personalized Learning Paths</h4>
                      <p className="text-muted-foreground">
                        Our AI analyzes your performance to create customized practice sessions, focusing on words you
                        struggle with to ensure efficient progress.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center bg-gradient-to-r from-orange-50 to-blue-50 p-10 rounded-2xl border border-slate-200/50">
              <div className="inline-block rounded-full bg-white p-4 shadow-md">
                <Rocket className="h-8 w-8 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Build Your Word Portfolio?</h2>
              <p className="max-w-2xl text-muted-foreground md:text-lg">
                Join thousands of learners who are transforming the way they learn vocabulary. Your journey to mastery
                starts now.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center items-center">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="rounded-full px-8 py-6 bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                  >
                    Sign Up for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/practice">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-6 border-orange-200 hover:border-orange-500 hover:bg-white text-lg bg-transparent"
                  >
                    Try a Practice Session
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0 bg-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-orange-500" />
            <p className="text-sm text-muted-foreground">© 2025 VocabMarket. All rights reserved.</p>
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

const howItWorksSteps = [
  {
    title: "1. Discover & Acquire",
    description:
      "Explore curated word lists like a stock market analyst. 'Invest' your time in new words, adding them to your personal portfolio.",
    icon: <BookOpen className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "2. Practice & Grow",
    description:
      "Engage in adaptive exercises that strengthen your knowledge. Watch the 'value' of your words increase as you master them.",
    icon: <Brain className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "3. Track & Diversify",
    description:
      "Use our analytics dashboard to monitor your portfolio's growth, identify areas for improvement, and diversify your vocabulary.",
    icon: <TrendingUp className="h-6 w-6 text-green-500" />,
  },
]
