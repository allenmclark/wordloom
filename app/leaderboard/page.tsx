import Link from "next/link"
import { Award, BookOpen, Medal, Search, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">VocabMarket</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-orange-500">
              Home
            </Link>
            <Link href="/practice" className="text-sm font-medium transition-colors hover:text-orange-500">
              Practice
            </Link>
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-orange-500">
              Dashboard
            </Link>
            <Link href="/leaderboard" className="text-sm font-medium text-orange-500">
              Leaderboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <span className="sr-only">User profile</span>
              <div className="rounded-full bg-muted h-8 w-8 flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
            <p className="text-muted-foreground mt-1">See how you rank against other learners</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search users..." className="w-full md:w-[200px] pl-8" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2 bg-gradient-to-b from-amber-50 to-background border-amber-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-amber-100 p-2">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <CardTitle>1st Place</CardTitle>
                <CardDescription>This Week's Champion</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="absolute -top-1 -right-1">
                    <div className="rounded-full bg-amber-500 h-6 w-6 flex items-center justify-center">
                      <Trophy className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="rounded-full bg-muted h-20 w-20 flex items-center justify-center">
                    <span className="text-xl font-bold">SL</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mt-4">Sarah Lee</h3>
                <p className="text-muted-foreground text-sm">Vocabulary Master</p>
                <div className="mt-4 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  3,450 points
                </div>
                <p className="text-xs text-muted-foreground mt-2">45-day streak</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 bg-gradient-to-b from-slate-50 to-background border-slate-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-slate-100 p-2">
                <Medal className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <CardTitle>2nd Place</CardTitle>
                <CardDescription>Runner Up</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="absolute -top-1 -right-1">
                    <div className="rounded-full bg-slate-500 h-6 w-6 flex items-center justify-center">
                      <Medal className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="rounded-full bg-muted h-20 w-20 flex items-center justify-center">
                    <span className="text-xl font-bold">JD</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mt-4">John Doe</h3>
                <p className="text-muted-foreground text-sm">Word Enthusiast</p>
                <div className="mt-4 bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm font-medium">
                  3,120 points
                </div>
                <p className="text-xs text-muted-foreground mt-2">32-day streak</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 bg-gradient-to-b from-orange-50 to-background border-orange-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-orange-100 p-2">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle>3rd Place</CardTitle>
                <CardDescription>Bronze Medalist</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="absolute -top-1 -right-1">
                    <div className="rounded-full bg-orange-500 h-6 w-6 flex items-center justify-center">
                      <Award className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="rounded-full bg-muted h-20 w-20 flex items-center justify-center">
                    <span className="text-xl font-bold">RJ</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mt-4">Robert Johnson</h3>
                <p className="text-muted-foreground text-sm">Vocabulary Builder</p>
                <div className="mt-4 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  2,980 points
                </div>
                <p className="text-xs text-muted-foreground mt-2">28-day streak</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="weekly">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="alltime">All Time</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm">
                View Friends Only
              </Button>
            </div>
            <TabsContent value="weekly" className="mt-6">
              <Card className="border-2">
                <CardContent className="p-6">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-muted">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Rank
                          </th>
                          <th scope="col" className="px-6 py-3">
                            User
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Level
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Words Mastered
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Streak
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Points
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboardData.map((user, index) => (
                          <tr key={index} className={`border-b ${index < 3 ? "bg-muted/30" : ""}`}>
                            <td className="px-6 py-4 font-medium">
                              {index + 1}
                              {index < 3 && (
                                <span className="ml-2">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="rounded-full bg-muted h-8 w-8 flex items-center justify-center">
                                  <span className="text-xs font-medium">{user.initials}</span>
                                </div>
                                <span>{user.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted">{user.level}</span>
                            </td>
                            <td className="px-6 py-4">{user.wordsMastered}</td>
                            <td className="px-6 py-4">{user.streak} days</td>
                            <td className="px-6 py-4 font-bold">{user.points.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="monthly" className="mt-6">
              <Card className="border-2">
                <CardContent className="p-6 flex items-center justify-center h-[300px]">
                  <p className="text-muted-foreground">Monthly leaderboard data would appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="alltime" className="mt-6">
              <Card className="border-2">
                <CardContent className="p-6 flex items-center justify-center h-[300px]">
                  <p className="text-muted-foreground">All-time leaderboard data would appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
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

const leaderboardData = [
  {
    name: "Sarah Lee",
    initials: "SL",
    level: "Master",
    wordsMastered: 520,
    streak: 45,
    points: 3450,
  },
  {
    name: "John Doe",
    initials: "JD",
    level: "Advanced",
    wordsMastered: 480,
    streak: 32,
    points: 3120,
  },
  {
    name: "Robert Johnson",
    initials: "RJ",
    level: "Advanced",
    wordsMastered: 450,
    streak: 28,
    points: 2980,
  },
  {
    name: "Emily Chen",
    initials: "EC",
    level: "Intermediate",
    wordsMastered: 380,
    streak: 21,
    points: 2750,
  },
  {
    name: "Michael Brown",
    initials: "MB",
    level: "Advanced",
    wordsMastered: 410,
    streak: 15,
    points: 2680,
  },
  {
    name: "Jessica Wilson",
    initials: "JW",
    level: "Intermediate",
    wordsMastered: 320,
    streak: 19,
    points: 2540,
  },
  {
    name: "David Kim",
    initials: "DK",
    level: "Advanced",
    wordsMastered: 390,
    streak: 12,
    points: 2490,
  },
  {
    name: "Lisa Garcia",
    initials: "LG",
    level: "Intermediate",
    wordsMastered: 290,
    streak: 25,
    points: 2350,
  },
  {
    name: "James Taylor",
    initials: "JT",
    level: "Beginner",
    wordsMastered: 180,
    streak: 30,
    points: 2100,
  },
  {
    name: "Sophia Martinez",
    initials: "SM",
    level: "Intermediate",
    wordsMastered: 270,
    streak: 14,
    points: 1980,
  },
]
