import Link from "next/link"
import { ArrowRight, BookOpen, Brain, TrendingUp, ChevronRight } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-display font-bold">VocabMaster</span>
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
              href="/spanish-english"
              className="text-sm font-medium transition-colors hover:text-orange-500 relative group"
            >
              Spanish-English
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
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4 border-orange-200 hover:border-orange-500 hover:bg-orange-50"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="rounded-full px-4 bg-orange-500 hover:bg-orange-600 shadow-sm hover:shadow">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 hero-gradient overflow-hidden relative">
          <div className="absolute inset-0 dot-pattern opacity-70"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-12 text-center">
              <div className="flex flex-col justify-center space-y-4 animate-in">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Invest in your <span className="text-gradient">vocabulary</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Learn new words, track your progress, and compete with friends. Grow your vocabulary portfolio
                    today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center items-center">
                  <Link href="/practice">
                    <Button
                      size="lg"
                      className="rounded-full px-6 bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-6 border-orange-200 hover:border-orange-500 hover:bg-orange-50"
                    >
                      How it works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto relative animate-in" style={{ animationDelay: "0.2s" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl blur-3xl opacity-50"></div>
                <div className="relative bg-white rounded-2xl border shadow-elevated p-6 transform transition-all duration-500 hover:scale-[1.02]">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Today's Word</h3>
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                        +15 points
                      </span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <h4 className="text-2xl font-bold">Ephemeral</h4>
                      <p className="text-muted-foreground mt-1">Lasting for a very short time</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="bg-slate-100 px-2 py-1 rounded-full text-xs">Difficulty: Medium</span>
                      <span className="flex items-center gap-1 text-orange-600">
                        <TrendingUp className="h-4 w-4" />
                        87% success rate
                      </span>
                    </div>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded-xl shadow-sm hover:shadow transition-all duration-300">
                      Practice Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white relative">
          <div className="absolute inset-0 mesh-pattern opacity-70"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 animate-in">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Performance Analytics</h2>
                <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Vocabulary acquisition trends for top learners over the past week
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl animate-in" style={{ animationDelay: "0.2s" }}>
              <Card className="border-2 shadow-card overflow-hidden">
                <CardHeader className="bg-slate-50 border-b p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-display">Vocabulary Growth Metrics</CardTitle>
                      <CardDescription className="text-slate-500 mt-1">
                        Hourly word acquisition data for top performers
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-500">Last updated:</span>
                      <span className="font-medium">Today, 2:45 PM</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[450px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={hourlyWordCountData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                        <defs>
                          {/* Gradient definitions for each line - more sophisticated colors */}
                          <linearGradient id="colorSarah" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d03801" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#d03801" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorJohn" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1e40af" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#1e40af" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorRobert" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9a3412" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#9a3412" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorEmily" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#5b21b6" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#5b21b6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorMichael" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9f1239" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#9f1239" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis
                          dataKey="timestamp"
                          tickFormatter={(value) => {
                            const date = new Date(value)
                            return `${date.getMonth() + 1}/${date.getDate()}`
                          }}
                          interval={24} // Show one tick per day
                          angle={-30}
                          textAnchor="end"
                          height={50}
                          tick={{ fontSize: 12, fill: "#64748b" }}
                          axisLine={{ stroke: "#e5e7eb" }}
                          tickLine={{ stroke: "#e5e7eb" }}
                        />
                        <YAxis
                          domain={["dataMin - 5", "dataMax + 5"]}
                          tick={{ fontSize: 12, fill: "#64748b" }}
                          axisLine={{ stroke: "#e5e7eb" }}
                          tickLine={{ stroke: "#e5e7eb" }}
                          tickCount={8}
                        />
                        <Tooltip
                          labelFormatter={(value) => {
                            const date = new Date(value)
                            return `${date.toLocaleDateString()} ${date.getHours()}:00`
                          }}
                          contentStyle={{
                            fontSize: "12px",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            border: "none",
                            padding: "10px 14px",
                            backgroundColor: "#ffffff",
                          }}
                          itemStyle={{ padding: "4px 0" }}
                          cursor={{ stroke: "#d1d5db", strokeWidth: 1, strokeDasharray: "5 5" }}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          wrapperStyle={{
                            paddingTop: "10px",
                            fontSize: "12px",
                            color: "#64748b",
                          }}
                          iconType="circle"
                          iconSize={8}
                        />
                        <Line
                          type="monotone"
                          dataKey="Sarah Lee"
                          stroke="#d03801" // More sophisticated orange
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 6, strokeWidth: 0 }}
                          name="Sarah Lee"
                          animationDuration={1500}
                          fill="url(#colorSarah)"
                        />
                        <Line
                          type="monotone"
                          dataKey="John Doe"
                          stroke="#1e40af" // More sophisticated blue
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 6, strokeWidth: 0 }}
                          name="John Doe"
                          animationDuration={1500}
                          animationBegin={300}
                          fill="url(#colorJohn)"
                        />
                        <Line
                          type="monotone"
                          dataKey="Robert Johnson"
                          stroke="#9a3412" // More sophisticated brown
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 6, strokeWidth: 0 }}
                          name="Robert Johnson"
                          animationDuration={1500}
                          animationBegin={600}
                          fill="url(#colorRobert)"
                        />
                        <Line
                          type="monotone"
                          dataKey="Emily Chen"
                          stroke="#5b21b6" // More sophisticated purple
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 6, strokeWidth: 0 }}
                          name="Emily Chen"
                          animationDuration={1500}
                          animationBegin={900}
                          fill="url(#colorEmily)"
                        />
                        <Line
                          type="monotone"
                          dataKey="Michael Brown"
                          stroke="#9f1239" // More sophisticated red
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 6, strokeWidth: 0 }}
                          name="Michael Brown"
                          animationDuration={1500}
                          animationBegin={1200}
                          fill="url(#colorMichael)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                    {Object.entries({
                      "Sarah Lee": { current: 520, change: "+40", percentage: "+8.3%", color: "orange" },
                      "John Doe": { current: 480, change: "+30", percentage: "+6.7%", color: "blue" },
                      "Robert Johnson": { current: 450, change: "+30", percentage: "+7.1%", color: "orange" },
                      "Emily Chen": { current: 390, change: "+30", percentage: "+8.3%", color: "purple" },
                      "Michael Brown": { current: 420, change: "+30", percentage: "+7.7%", color: "rose" },
                    }).map(([name, data]) => (
                      <Card key={name} className={`border border-${data.color}-100 card-hover`}>
                        <CardContent className="p-4">
                          <div className="text-sm font-medium">{name}</div>
                          <div className="text-lg font-bold">{data.current}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`text-${data.color}-600 text-sm font-medium`}>{data.change}</div>
                            <div className={`text-xs text-${data.color}-600`}>{data.percentage}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-in">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How VocabMaster Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Learn vocabulary like you're trading on a prediction market. Invest time in words, earn points, and
                  watch your knowledge grow.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-2 border-muted card-hover animate-in"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 via-white to-slate-50 relative">
          <div className="absolute inset-0 dot-pattern opacity-70"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-in">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to expand your vocabulary?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of learners who are growing their vocabulary every day.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="rounded-full px-6 bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Sign up for free
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Already have an account?</span>
                <Link href="/login" className="text-orange-600 hover:underline font-medium flex items-center">
                  Log in <ChevronRight className="h-3 w-3 ml-1" />
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

const features = [
  {
    title: "Learn",
    description: "Discover new words daily with our curated vocabulary lists tailored to your level.",
    icon: <BookOpen className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Practice",
    description: "Test your knowledge with interactive exercises and spaced repetition techniques.",
    icon: <Brain className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Track",
    description: "Monitor your progress and see your vocabulary knowledge grow over time.",
    icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
  },
]

// Generate hourly data for the last 7 days with more realistic patterns
const generateHourlyData = () => {
  const data = []
  const now = new Date()
  const users = ["Sarah Lee", "John Doe", "Robert Johnson", "Emily Chen", "Michael Brown"]

  // Initial values
  const initialValues = {
    "Sarah Lee": 480,
    "John Doe": 450,
    "Robert Johnson": 420,
    "Emily Chen": 360,
    "Michael Brown": 390,
  }

  // Current values that will be updated
  const currentValues = { ...initialValues }

  // Generate data for each hour going back 7 days (168 hours)
  for (let i = 168; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
    const hour = timestamp.getHours()

    // Create entry for this hour
    const entry = { timestamp: timestamp.toISOString() }

    // Add fluctuations for each user with more realistic patterns
    users.forEach((user) => {
      // Time-based patterns
      const isActiveHour = hour >= 9 && hour <= 22 // More activity during waking hours
      const isDailyPeak = hour >= 19 && hour <= 21 // Evening peak
      const isWeekend = timestamp.getDay() === 0 || timestamp.getDay() === 6

      // Base probability of increase based on time factors
      let increaseProb = isActiveHour ? 0.65 : 0.3
      if (isDailyPeak) increaseProb += 0.15
      if (isWeekend) increaseProb += 0.1

      // User-specific patterns
      if (user === "Sarah Lee") increaseProb += 0.1 // Sarah is more active
      if (user === "Emily Chen" && hour >= 5 && hour <= 8) increaseProb += 0.2 // Emily studies in morning

      // Determine change with weighted probability
      let change = 0
      const rand = Math.random()

      if (rand < increaseProb) {
        // Increase (with varying amounts)
        const intensity = Math.random()
        if (intensity > 0.8)
          change = 2 // Occasional bigger jumps
        else change = 1
      } else if (rand < 0.85) {
        // No change most of the time when not increasing
        change = 0
      } else {
        // Decrease (less common)
        change = -1
      }

      // Apply change
      currentValues[user] += change

      // Add to entry
      entry[user] = currentValues[user]
    })

    data.push(entry)
  }

  return data
}

const hourlyWordCountData = generateHourlyData()
