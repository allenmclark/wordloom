import Link from "next/link"
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Flame,
  TrendingUp,
  Users,
  User,
  Settings,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
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
            <Link href="/dashboard" className="text-sm font-medium text-orange-500">
              Dashboard
            </Link>
            <Link href="/leaderboard" className="text-sm font-medium transition-colors hover:text-orange-500">
              Leaderboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="sr-only">User menu</span>
                  <div className="rounded-full bg-orange-100 h-8 w-8 flex items-center justify-center">
                    <span className="text-sm font-medium text-orange-800">JD</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/user" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your vocabulary learning progress</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/practice">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Practice Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Your Profile</CardTitle>
              <User className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-orange-100 h-12 w-12 flex items-center justify-center">
                  <span className="text-sm font-medium text-orange-800">JD</span>
                </div>
                <div>
                  <div className="font-medium">John Doe</div>
                  <p className="text-xs text-muted-foreground">Advanced Learner</p>
                </div>
                <Link href="/user" className="ml-auto">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-7 mt-6">
          <Card className="border-2 md:col-span-4">
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your vocabulary growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Progress chart visualization would go here</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 md:col-span-3">
            <CardHeader>
              <CardTitle>Mastery Level</CardTitle>
              <CardDescription>Your proficiency by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-muted-foreground">{category.mastery}%</span>
                    </div>
                    <Progress value={category.mastery} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="recent">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="recent">Recent Activity</TabsTrigger>
                <TabsTrigger value="words">Word Collection</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <TabsContent value="recent" className="mt-6">
              <Card className="border-2">
                <CardContent className="p-6">
                  <div className="space-y-8">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`rounded-full p-2 ${activity.iconBg}`}>{activity.icon}</div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="words" className="mt-6">
              <Card className="border-2">
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {recentWords.map((word, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/words/${word.term.toLowerCase()}`}
                            className="hover:text-orange-500 transition-colors"
                          >
                            <h3 className="font-bold">{word.term}</h3>
                          </Link>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${word.status === "Mastered" ? "bg-orange-100 text-orange-800" : "bg-amber-100 text-amber-800"}`}
                          >
                            {word.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{word.definition}</p>
                        <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                          <span>Added {word.added}</span>
                          <Link href={`/words/${word.term.toLowerCase()}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ArrowRight className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="achievements" className="mt-6">
              <Card className="border-2">
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="p-4 border rounded-lg flex items-center gap-4">
                        <div className={`rounded-full p-3 ${achievement.unlocked ? "bg-orange-100" : "bg-muted"}`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{achievement.name}</h3>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          {achievement.unlocked ? (
                            <p className="text-xs text-orange-600 mt-1">Unlocked</p>
                          ) : (
                            <p className="text-xs text-muted-foreground mt-1">{achievement.progress}% complete</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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

const stats = [
  {
    title: "Total Words Learned",
    value: "248",
    description: "+12 from last week",
    icon: <BookOpen className="h-4 w-4 text-orange-500" />,
  },
  {
    title: "Current Streak",
    value: "7 days",
    description: "Keep it up!",
    icon: <Flame className="h-4 w-4 text-orange-500" />,
  },
  {
    title: "Points Earned",
    value: "1,240",
    description: "Rank: Advanced Learner",
    icon: <Award className="h-4 w-4 text-blue-500" />,
  },
  {
    title: "Time Spent",
    value: "24h 35m",
    description: "This month",
    icon: <Clock className="h-4 w-4 text-purple-500" />,
  },
]

const categories = [
  { name: "Business Vocabulary", mastery: 78 },
  { name: "Academic Terms", mastery: 65 },
  { name: "TOEFL Preparation", mastery: 42 },
  { name: "Everyday English", mastery: 91 },
  { name: "Idioms & Phrases", mastery: 53 },
]

const activities = [
  {
    title: "Completed Practice Session",
    description: "You mastered 15 words in 'Business Vocabulary'",
    time: "2 hours ago",
    icon: <BookOpen className="h-4 w-4 text-white" />,
    iconBg: "bg-orange-500",
  },
  {
    title: "Achievement Unlocked",
    description: "7-Day Streak: You've practiced for 7 consecutive days",
    time: "Yesterday",
    icon: <Award className="h-4 w-4 text-white" />,
    iconBg: "bg-blue-500",
  },
  {
    title: "New Word List Added",
    description: "TOEFL Preparation: Advanced Vocabulary",
    time: "2 days ago",
    icon: <Calendar className="h-4 w-4 text-white" />,
    iconBg: "bg-purple-500",
  },
  {
    title: "Joined Group Challenge",
    description: "You joined 'May Vocabulary Marathon'",
    time: "3 days ago",
    icon: <Users className="h-4 w-4 text-white" />,
    iconBg: "bg-orange-500",
  },
]

const recentWords = [
  {
    term: "Ephemeral",
    definition: "Lasting for a very short time",
    status: "Learning",
    added: "2 days ago",
  },
  {
    term: "Paradigm",
    definition: "A typical example or pattern of something",
    status: "Mastered",
    added: "1 week ago",
  },
  {
    term: "Ubiquitous",
    definition: "Present, appearing, or found everywhere",
    status: "Learning",
    added: "3 days ago",
  },
  {
    term: "Pragmatic",
    definition: "Dealing with things sensibly and realistically",
    status: "Mastered",
    added: "2 weeks ago",
  },
  {
    term: "Eloquent",
    definition: "Fluent or persuasive in speaking or writing",
    status: "Mastered",
    added: "1 month ago",
  },
  {
    term: "Ambiguous",
    definition: "Open to more than one interpretation",
    status: "Learning",
    added: "5 days ago",
  },
]

const achievements = [
  {
    name: "Word Collector",
    description: "Learn 100 new words",
    icon: <BookOpen className="h-4 w-4 text-orange-800" />,
    unlocked: true,
    progress: 100,
  },
  {
    name: "Consistency King",
    description: "Practice for 30 consecutive days",
    icon: <Flame className="h-4 w-4 text-orange-800" />,
    unlocked: false,
    progress: 23,
  },
  {
    name: "Perfect Score",
    description: "Get 100% on a practice session",
    icon: <Award className="h-4 w-4 text-blue-800" />,
    unlocked: true,
    progress: 100,
  },
  {
    name: "Vocabulary Master",
    description: "Master 500 words",
    icon: <TrendingUp className="h-4 w-4 text-purple-800" />,
    unlocked: false,
    progress: 49,
  },
  {
    name: "Speed Learner",
    description: "Complete a session in under 5 minutes",
    icon: <Clock className="h-4 w-4 text-red-800" />,
    unlocked: false,
    progress: 80,
  },
  {
    name: "Social Butterfly",
    description: "Invite 5 friends to join",
    icon: <Users className="h-4 w-4 text-indigo-800" />,
    unlocked: false,
    progress: 20,
  },
]
