"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  TrendingUp,
  Target,
  BookOpen,
  Clock,
  Award,
  Brain,
  Zap,
  Star,
  Trophy,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Enhanced sample data with more realistic patterns
const weeklyProgressData = [
  { day: "Mon", words: 18, accuracy: 87, time: 32, streak: 1 },
  { day: "Tue", words: 22, accuracy: 91, time: 38, streak: 2 },
  { day: "Wed", words: 15, accuracy: 83, time: 28, streak: 3 },
  { day: "Thu", words: 25, accuracy: 94, time: 42, streak: 4 },
  { day: "Fri", words: 28, accuracy: 89, time: 45, streak: 5 },
  { day: "Sat", words: 20, accuracy: 86, time: 35, streak: 6 },
  { day: "Sun", words: 16, accuracy: 88, time: 30, streak: 7 },
]

const skillsRadarData = [
  { skill: "Vocabulary", current: 85, target: 95 },
  { skill: "Grammar", current: 78, target: 88 },
  { skill: "Listening", current: 82, target: 90 },
  { skill: "Speaking", current: 71, target: 85 },
  { skill: "Reading", current: 89, target: 95 },
  { skill: "Writing", current: 76, target: 88 },
]

const categoryMasteryData = [
  { name: "Verbs", value: 42, color: "#fc4c02", mastered: 168, total: 200 },
  { name: "Nouns", value: 35, color: "#ea580c", mastered: 175, total: 250 },
  { name: "Adjectives", value: 18, color: "#c2410c", mastered: 108, total: 150 },
  { name: "Adverbs", value: 12, color: "#9a3412", mastered: 72, total: 100 },
  { name: "Phrases", value: 8, color: "#7c2d12", mastered: 48, total: 80 },
]

const monthlyTrendData = [
  { month: "Jan", learned: 45, reviewed: 120, accuracy: 82 },
  { month: "Feb", learned: 62, reviewed: 145, accuracy: 85 },
  { month: "Mar", learned: 78, reviewed: 168, accuracy: 88 },
  { month: "Apr", learned: 95, reviewed: 192, accuracy: 91 },
  { month: "May", learned: 110, reviewed: 215, accuracy: 89 },
  { month: "Jun", learned: 125, reviewed: 238, accuracy: 93 },
]

const difficultyProgressData = [
  { level: "Beginner", completed: 95, total: 100, color: "#10b981" },
  { level: "Intermediate", completed: 68, total: 120, color: "#f59e0b" },
  { level: "Advanced", completed: 32, total: 80, color: "#ef4444" },
  { level: "Expert", completed: 8, total: 50, color: "#8b5cf6" },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Enhanced Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Your Learning Journey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your progress, discover insights, and accelerate your Spanish vocabulary mastery
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab - Completely Redesigned */}
          <TabsContent value="overview" className="space-y-8">
            {/* Hero Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Total Vocabulary</p>
                      <p className="text-3xl font-bold">1,847</p>
                      <p className="text-orange-200 text-xs mt-1">+156 this month</p>
                    </div>
                    <BookOpen className="h-12 w-12 text-orange-200" />
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-20">
                    <BookOpen className="h-24 w-24" />
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Current Streak</p>
                      <p className="text-3xl font-bold">12 days</p>
                      <p className="text-green-200 text-xs mt-1">Personal best: 18</p>
                    </div>
                    <Target className="h-12 w-12 text-green-200" />
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-20">
                    <Target className="h-24 w-24" />
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Weekly Accuracy</p>
                      <p className="text-3xl font-bold">91%</p>
                      <p className="text-blue-200 text-xs mt-1">+4% improvement</p>
                    </div>
                    <Trophy className="h-12 w-12 text-blue-200" />
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-20">
                    <Trophy className="h-24 w-24" />
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Study Time</p>
                      <p className="text-3xl font-bold">4.2h</p>
                      <p className="text-purple-200 text-xs mt-1">This week</p>
                    </div>
                    <Clock className="h-12 w-12 text-purple-200" />
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-20">
                    <Clock className="h-24 w-24" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-orange-500" />
                    Weekly Learning Pattern
                  </CardTitle>
                  <CardDescription>Your daily word acquisition and accuracy trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyProgressData}>
                        <defs>
                          <linearGradient id="wordsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fc4c02" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#fc4c02" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="words"
                          stroke="#fc4c02"
                          strokeWidth={3}
                          fill="url(#wordsGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-500" />
                    Vocabulary Categories
                  </CardTitle>
                  <CardDescription>Distribution of your learned words by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryMasteryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {categoryMasteryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name, props) => [
                            `${props.payload.mastered}/${props.payload.total} words`,
                            name,
                          ]}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievement Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Recent Achievements
                  </CardTitle>
                  <CardDescription>Your latest learning milestones and accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="font-semibold text-green-800">Streak Master!</p>
                        <p className="text-sm text-green-600">Maintained 12-day learning streak</p>
                        <p className="text-xs text-green-500">2 hours ago</p>
                      </div>
                      <Badge className="bg-green-500 text-white">+50 XP</Badge>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold text-blue-800">Accuracy Champion</p>
                        <p className="text-sm text-blue-600">Achieved 95% accuracy in Advanced Verbs</p>
                        <p className="text-xs text-blue-500">Yesterday</p>
                      </div>
                      <Badge className="bg-blue-500 text-white">+30 XP</Badge>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-semibold text-purple-800">Category Complete</p>
                        <p className="text-sm text-purple-600">Mastered all Beginner level words</p>
                        <p className="text-xs text-purple-500">3 days ago</p>
                      </div>
                      <Badge className="bg-purple-500 text-white">+100 XP</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-500" />
                    Daily Goals
                  </CardTitle>
                  <CardDescription>Track your daily learning objectives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">New Words</span>
                      <span className="text-sm text-muted-foreground">18/20</span>
                    </div>
                    <Progress value={90} className="h-3" />
                    <p className="text-xs text-green-600 mt-1">Almost there! 2 more to go</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Review Session</span>
                      <span className="text-sm text-muted-foreground">1/1</span>
                    </div>
                    <Progress value={100} className="h-3" />
                    <p className="text-xs text-green-600 mt-1">✓ Completed!</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Practice Time</span>
                      <span className="text-sm text-muted-foreground">32/30 min</span>
                    </div>
                    <Progress value={100} className="h-3" />
                    <p className="text-xs text-green-600 mt-1">✓ Goal exceeded!</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg"
              >
                Continue Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Monthly Learning Trends</CardTitle>
                <CardDescription>Your vocabulary acquisition and review patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="learned" fill="#fc4c02" name="New Words" />
                      <Bar dataKey="reviewed" fill="#10b981" name="Words Reviewed" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {difficultyProgressData.map((level) => {
                const percentage = Math.round((level.completed / level.total) * 100)
                return (
                  <Card key={level.level} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">{level.level} Level</CardTitle>
                      <CardDescription>
                        {level.completed} of {level.total} words mastered
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-2xl font-bold" style={{ color: level.color }}>
                            {percentage}%
                          </span>
                          <Badge style={{ backgroundColor: level.color, color: "white" }}>
                            {level.completed}/{level.total}
                          </Badge>
                        </div>
                        <Progress value={percentage} className="h-3" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Language Skills Assessment</CardTitle>
                <CardDescription>Your proficiency across different language competencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={skillsRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Current Level"
                        dataKey="current"
                        stroke="#fc4c02"
                        fill="#fc4c02"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Target Level"
                        dataKey="target"
                        stroke="#10b981"
                        fill="transparent"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                      />
                      <Tooltip />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Accuracy Trends</CardTitle>
                  <CardDescription>Your performance accuracy over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={weeklyProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="accuracy"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Study Time Distribution</CardTitle>
                  <CardDescription>Daily study time patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="time" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-green-500 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="text-green-700 flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Your Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Excellent consistency with daily practice</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Strong performance in verb conjugations (94%)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Quick learner - above average acquisition rate</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 bg-orange-50/50">
                <CardHeader>
                  <CardTitle className="text-orange-700 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Growth Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Focus more on adjective-noun agreement</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Increase advanced level practice sessions</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Review words more frequently after 1 week</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>Personalized suggestions to optimize your learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-semibold text-blue-800 mb-2">Optimal Study Time</h4>
                    <p className="text-sm text-blue-700">
                      Your peak performance is between 2-4 PM. Schedule intensive sessions during this window.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-semibold text-green-800 mb-2">Spaced Repetition</h4>
                    <p className="text-sm text-green-700">
                      Review words learned 3-5 days ago. Your retention curve shows optimal timing.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-semibold text-purple-800 mb-2">Challenge Level</h4>
                    <p className="text-sm text-purple-700">
                      Ready for more advanced content. Try adding 3-4 expert-level words daily.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
