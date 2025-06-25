"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Brain, TrendingUp, Users, Target, Award, BarChart3, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowItWorks() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 hero-gradient overflow-hidden relative min-h-screen">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-16 text-center">
              {/* Hero Header */}
              <div className="flex flex-col justify-center space-y-6 animate-in max-w-4xl">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-200/50 shadow-lg mb-4">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-orange-800">How It Works</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
                    Master vocabulary like a <span className="text-gradient">pro trader</span>
                  </h1>
                  <p className="max-w-3xl text-muted-foreground md:text-xl lg:text-2xl leading-relaxed">
                    VocabMaster transforms vocabulary learning into an engaging, market-inspired experience. Track your
                    progress, compete with friends, and build your word portfolio systematically.
                  </p>
                </div>
              </div>

              {/* Core Process Steps */}
              <div className="w-full max-w-7xl animate-in" style={{ animationDelay: "0.2s" }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                  {coreSteps.map((step, index) => (
                    <div key={index} className="relative group">
                      {/* Connection line (visible on larger screens) */}
                      {index < coreSteps.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 w-6 lg:w-12 h-0.5 bg-gradient-to-r from-orange-300 to-blue-300 opacity-40 z-10"></div>
                      )}

                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <Card className="relative bg-white/95 backdrop-blur-sm rounded-3xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
                          {/* Step number */}
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-bold text-lg">{index + 1}</span>
                          </div>

                          <CardHeader className="pt-12 pb-6 px-8">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-blue-100 shadow-inner mx-auto mb-6 group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                              {step.icon}
                            </div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-800 to-blue-800 bg-clip-text text-transparent">
                              {step.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="px-8 pb-8">
                            <CardDescription className="text-base text-slate-600 leading-relaxed mb-6">
                              {step.description}
                            </CardDescription>
                            <div className="space-y-3">
                              {step.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-3 text-sm">
                                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex-shrink-0"></div>
                                  <span className="text-slate-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="w-full max-w-6xl animate-in" style={{ animationDelay: "0.4s" }}>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                    Why choose <span className="text-gradient">VocabMaster</span>?
                  </h2>
                  <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
                    Experience the most effective and engaging way to expand your vocabulary
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <Card
                      key={index}
                      className="relative bg-white/90 backdrop-blur-sm border border-orange-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden group"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-blue-400"></div>
                      <CardHeader className="p-6 pb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-blue-100 shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                          {benefit.icon}
                        </div>
                        <CardTitle className="text-lg font-semibold text-slate-800">{benefit.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 pt-0">
                        <CardDescription className="text-slate-600 leading-relaxed">
                          {benefit.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div
                className="flex flex-col justify-center space-y-6 animate-in max-w-2xl"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Ready to start your vocabulary journey?
                  </h2>
                  <p className="text-muted-foreground md:text-lg">
                    Join thousands of learners who are already building their word portfolios
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center items-center">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="rounded-full px-8 py-6 bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                    >
                      Start Learning Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/practice">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 py-6 border-orange-200 hover:border-orange-500 hover:bg-orange-50 text-lg"
                    >
                      Try Practice Mode
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span>Already have an account?</span>
                  <Link href="/login" className="text-orange-600 hover:underline font-medium">
                    Log in here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
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

const coreSteps = [
  {
    title: "Discover & Learn",
    description:
      "Explore curated vocabulary lists tailored to your learning level and goals. Each word comes with comprehensive definitions, examples, and pronunciation guides.",
    icon: <BookOpen className="h-8 w-8 text-orange-500" />,
    features: [
      "Daily curated word lists",
      "Contextual examples and usage",
      "Audio pronunciations",
      "Difficulty-based categorization",
    ],
  },
  {
    title: "Practice & Master",
    description:
      "Engage with interactive exercises using spaced repetition techniques. Test your knowledge through various formats including flashcards, quizzes, and contextual challenges.",
    icon: <Brain className="h-8 w-8 text-blue-500" />,
    features: [
      "Spaced repetition algorithm",
      "Multiple exercise formats",
      "Adaptive difficulty adjustment",
      "Immediate feedback and corrections",
    ],
  },
  {
    title: "Track & Compete",
    description:
      "Monitor your vocabulary growth with detailed analytics. Compete with friends and climb leaderboards while building your personal word portfolio.",
    icon: <TrendingUp className="h-8 w-8 text-green-500" />,
    features: [
      "Comprehensive progress tracking",
      "Performance analytics dashboard",
      "Social leaderboards",
      "Achievement badges and milestones",
    ],
  },
]

const benefits = [
  {
    title: "Market-Inspired Learning",
    description:
      "Learn vocabulary like trading stocks - track word values, build portfolios, and watch your knowledge investments grow.",
    icon: <BarChart3 className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Scientifically Proven",
    description:
      "Built on spaced repetition and active recall principles, proven to maximize retention and long-term memory.",
    icon: <Target className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Social Competition",
    description: "Compete with friends, join study groups, and climb leaderboards to stay motivated and engaged.",
    icon: <Users className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Adaptive Learning",
    description: "AI-powered system adapts to your learning pace and style, ensuring optimal challenge and progress.",
    icon: <Zap className="h-6 w-6 text-purple-500" />,
  },
  {
    title: "Time Efficient",
    description:
      "Maximize learning in minimal time with focused sessions designed for busy schedules and consistent progress.",
    icon: <Clock className="h-6 w-6 text-amber-500" />,
  },
  {
    title: "Achievement System",
    description: "Earn badges, unlock achievements, and celebrate milestones as you build your vocabulary mastery.",
    icon: <Award className="h-6 w-6 text-rose-500" />,
  },
]
