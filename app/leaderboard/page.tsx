import { Award, Medal, Search, Trophy, Users, Flame, TrendingUp, TrendingDown, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for the current user
const currentUser = {
  id: "user-4",
  name: "Emily Chen",
}

export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8 hero-gradient dot-pattern page-content">
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
            <Button variant="outline" className="btn-orange-outline bg-transparent">
              <Users className="mr-2 h-4 w-4" />
              Invite Friends
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {leaderboardData.slice(0, 3).map((user, index) => (
            <Card
              key={user.id}
              className={cn(
                "border-2 transform transition-transform hover:-translate-y-1",
                index === 0 && "bg-gradient-to-b from-amber-50 to-background border-amber-200",
                index === 1 && "bg-gradient-to-b from-slate-50 to-background border-slate-200",
                index === 2 && "bg-gradient-to-b from-orange-50 to-background border-orange-200",
              )}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div
                  className={cn(
                    "rounded-full p-2",
                    index === 0 && "bg-amber-100",
                    index === 1 && "bg-slate-100",
                    index === 2 && "bg-orange-100",
                  )}
                >
                  {index === 0 && <Trophy className="h-6 w-6 text-amber-600" />}
                  {index === 1 && <Medal className="h-6 w-6 text-slate-600" />}
                  {index === 2 && <Award className="h-6 w-6 text-orange-600" />}
                </div>
                <div>
                  <CardTitle>
                    {index + 1}
                    {index === 0 ? "st" : index === 1 ? "nd" : "rd"} Place
                  </CardTitle>
                  <CardDescription>
                    {index === 0 && "This Week's Champion"}
                    {index === 1 && "Top Runner Up"}
                    {index === 2 && "Bronze Medalist"}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center text-center">
                  <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                    <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mt-4">{user.name}</h3>
                  <p className="text-muted-foreground text-sm">{user.level}</p>
                  <div className="mt-4 bg-muted/50 text-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {user.points.toLocaleString()} points
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span>{user.streak}-day streak</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-orange-500" />
              Weekly Spotlight
            </CardTitle>
            <CardDescription>Users making the biggest moves on the leaderboard this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {weeklyMoversData.map((mover) => (
                <div key={mover.id} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={mover.profileImage || "/placeholder.svg"} alt={mover.name} />
                    <AvatarFallback>
                      {mover.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{mover.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {mover.rankChange > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={cn(mover.rankChange > 0 ? "text-green-600" : "text-red-600")}>
                        {mover.rankChange > 0 ? `+${mover.rankChange}` : mover.rankChange} ranks
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div>
          <Tabs defaultValue="global">
            <TabsList className="grid w-full grid-cols-2 md:w-[300px]">
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
            </TabsList>
            <TabsContent value="global" className="mt-6">
              <LeaderboardTable data={leaderboardData} />
            </TabsContent>
            <TabsContent value="friends" className="mt-6">
              <LeaderboardTable data={friendsData} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function LeaderboardTable({ data }: { data: typeof leaderboardData }) {
  return (
    <Card className="border-2">
      <CardContent className="p-0">
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Words Mastered</TableHead>
                <TableHead>Streak</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user, index) => (
                <TableRow
                  key={user.id}
                  className={cn(user.id === currentUser.id && "bg-orange-50 dark:bg-orange-900/20")}
                >
                  <TableCell className="font-medium">
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full",
                        index < 3 ? "bg-muted font-bold" : "",
                      )}
                    >
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.name}</span>
                          {user.id === currentUser.id && (
                            <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {user.badges.map((badge) => (
                            <Badge key={badge} variant="outline" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.level}</Badge>
                  </TableCell>
                  <TableCell>{user.wordsMastered}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      {user.streak} days
                    </div>
                  </TableCell>
                  <TableCell>{user.accuracy}%</TableCell>
                  <TableCell className="text-right font-bold text-orange-600">{user.points.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

const leaderboardData = [
  {
    id: "user-1",
    name: "Sarah Lee",
    profileImage: "/placeholder.svg?height=40&width=40",
    level: "Master",
    wordsMastered: 520,
    streak: 45,
    points: 3450,
    accuracy: 98,
    badges: ["Streak Champion", "Top 1%"],
  },
  {
    id: "user-2",
    name: "John Doe",
    profileImage: "/placeholder.svg?height=40&width=40",
    level: "Advanced",
    wordsMastered: 480,
    streak: 32,
    points: 3120,
    accuracy: 96,
    badges: ["Word Smith"],
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    profileImage: "/placeholder.svg?height=40&width=40",
    level: "Advanced",
    wordsMastered: 450,
    streak: 28,
    points: 2980,
    accuracy: 97,
    badges: ["Polyglot"],
  },
  {
    id: "user-4",
    name: "Emily Chen",
    profileImage: "/placeholder.svg?height=40&width=40",
    level: "Intermediate",
    wordsMastered: 380,
    streak: 21,
    points: 2750,
    accuracy: 95,
    badges: ["Consistent Learner"],
  },
  {
    id: "user-5",
    name: "Michael Brown",
    profileImage: "/placeholder.svg?height=40&width=40",
    level: "Advanced",
    wordsMastered: 410,
    streak: 15,
    points: 2680,
    accuracy: 94,
    badges: [],
  },
  {
    id: "user-6",
    name: "Jessica Wilson",
    profileImage: "/placeholder.svg?height=40&width=40",
    level: "Intermediate",
    wordsMastered: 320,
    streak: 19,
    points: 2540,
    accuracy: 93,
    badges: ["7-Day Streak"],
  },
  {
    id: "user-7",
    name: "David Kim",
    profileImage: "/placeholder.svg?height=40&width=40",
    level: "Advanced",
    wordsMastered: 390,
    streak: 12,
    points: 2490,
    accuracy: 96,
    badges: [],
  },
  {
    id: "user-8",
    name: "Lisa Garcia",
    profileImage: "/placeholder.svg?height=40&width=40",
    level: "Intermediate",
    wordsMastered: 290,
    streak: 25,
    points: 2350,
    accuracy: 92,
    badges: ["Bookworm"],
  },
  {
    id: "user-9",
    name: "James Taylor",
    profileImage: "/placeholder.svg?height=40&width=40",
    level: "Beginner",
    wordsMastered: 180,
    streak: 30,
    points: 2100,
    accuracy: 90,
    badges: ["30-Day Streak"],
  },
  {
    id: "user-10",
    name: "Sophia Martinez",
    profileImage: "/placeholder.svg?height=40&width=40",
    level: "Intermediate",
    wordsMastered: 270,
    streak: 14,
    points: 1980,
    accuracy: 91,
    badges: [],
  },
]

const friendsData = leaderboardData.filter((u) => ["user-2", "user-4", "user-6", "user-8"].includes(u.id))

const weeklyMoversData = [
  {
    id: "user-9",
    name: "James Taylor",
    profileImage: "/placeholder.svg?height=40&width=40",
    rankChange: 12,
  },
  {
    id: "user-8",
    name: "Lisa Garcia",
    profileImage: "/placeholder.svg?height=40&width=40",
    rankChange: 8,
  },
  {
    id: "user-6",
    name: "Jessica Wilson",
    profileImage: "/placeholder.svg?height=40&width=40",
    rankChange: 5,
  },
  {
    id: "user-1",
    name: "Sarah Lee",
    profileImage: "/placeholder.svg?height=40&width=40",
    rankChange: -1,
  },
]
