"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeatmapVisualization } from "@/components/heatmap-visualization"
import { WordKnowledgeChart } from "@/components/word-knowledge-chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, TrendingUp, Target, BookOpen, Clock, Award } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

// Sample data for enhanced visualizations
const weeklyProgressData = [
  { day: "Mon", words: 12, accuracy: 85, time: 25 },
  { day: "Tue", words: 15, accuracy: 92, time: 30 },
  { day: "Wed", words: 8, accuracy: 78, time: 20 },
  { day: "Thu", words: 18, accuracy: 88, time: 35 },
  { day: "Fri", words: 22, accuracy: 95, time: 40 },
  { day: "Sat", words: 25, accuracy: 90, time: 45 },
  { day: "Sun", words: 20, accuracy: 87, time: 38 },
]

const categoryData = [
  { name: "Verbs", value: 35, color: "#fc4c02" },
  { name: "Nouns", value: 28, color: "#ea580c" },
  { name: "Adjectives", value: 20, color: "#c2410c" },
  { name: "Adverbs", value: 12, color: "#9a3412" },
  { name: "Others", value: 5, color: "#7c2d12" },
]

const difficultyTrendData = [
  { week: "W1", beginner: 45, intermediate: 25, advanced: 10 },
  { week: "W2", beginner: 40, intermediate: 35, advanced: 15 },
  { week: "W3", beginner: 35, intermediate: 40, advanced: 25 },
  { week: "W4", beginner: 30, intermediate: 45, advanced: 35 },
]

const retentionData = [
  { period: "1 day", retention: 95 },
  { period: "3 days", retention: 87 },
  { period: "1 week", retention: 78 },
  { period: "2 weeks", retention: 65 },
  { period: "1 month", retention: 52 },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Vocabulary Dashboard</h1>
            <p className="text-muted-foreground">Track your learning progress and analyze your vocabulary growth</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-2 border-orange-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Words</CardTitle>
                    <BookOpen className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">1,234</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+12%</span> from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Practice Streak</CardTitle>
                    <Target className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">7 days</div>
                    <p className="text-xs text-muted-foreground">Personal best: 15 days</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">89%</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+3%</span> this week
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                    <Clock className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">2.5h</div>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </CardContent>
                </Card>
              </div>

              {/* Progress and Activity Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Progress</CardTitle>
                    <CardDescription>Your learning activity over the past week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weeklyProgressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="words" stroke="#fc4c02" fill="#fc4c02" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Word Categories</CardTitle>
                    <CardDescription>Distribution of learned words by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity and Goals */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest learning milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Completed "Advanced Verbs" lesson</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                        <Badge variant="secondary">+15 words</Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Achieved 90% accuracy in practice session</p>
                          <p className="text-xs text-muted-foreground">Yesterday</p>
                        </div>
                        <Badge variant="secondary">Milestone</Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Learned 25 new words</p>
                          <p className="text-xs text-muted-foreground">3 days ago</p>
                        </div>
                        <Badge variant="secondary">Daily Goal</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Goals Progress</CardTitle>
                    <CardDescription>Track your learning objectives</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Daily Words</span>
                        <span>18/20</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Weekly Practice</span>
                        <span>5/7 days</span>
                      </div>
                      <Progress value={71} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Monthly Target</span>
                        <span>234/500</span>
                      </div>
                      <Progress value={47} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2">
                  Start Practice Session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Accuracy Trends</CardTitle>
                    <CardDescription>Your performance accuracy over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weeklyProgressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
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

              <Card>
                <CardHeader>
                  <CardTitle>Retention Analysis</CardTitle>
                  <CardDescription>How well you remember words over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={retentionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="retention" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Difficulty Progression</CardTitle>
                  <CardDescription>Your advancement through difficulty levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={difficultyTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="beginner" stackId="1" stroke="#10b981" fill="#10b981" />
                        <Area type="monotone" dataKey="intermediate" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                        <Area type="monotone" dataKey="advanced" stackId="1" stroke="#ef4444" fill="#ef4444" />
                        <Legend />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Velocity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">+15%</div>
                    <p className="text-sm text-muted-foreground">Words per session increase</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Consistency Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">8.5/10</div>
                    <p className="text-sm text-muted-foreground">Practice regularity</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">+23%</div>
                    <p className="text-sm text-muted-foreground">Accuracy improvement</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Heatmap Tab */}
            <TabsContent value="heatmap">
              <Card className="shadow-lg p-6">
                <HeatmapVisualization />
              </Card>
            </TabsContent>

            {/* Knowledge Tab */}
            <TabsContent value="knowledge">
              <WordKnowledgeChart />
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="text-green-700">Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-green-500" />
                        <span>Excellent retention for verbs (92%)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-green-500" />
                        <span>Consistent daily practice</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-green-500" />
                        <span>Strong performance in intermediate level</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <CardTitle className="text-orange-700">Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-orange-500" />
                        <span>Focus more on adjectives (68% accuracy)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-orange-500" />
                        <span>Increase advanced level practice</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-orange-500" />
                        <span>Review words after 1 week more frequently</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Personalized Recommendations</CardTitle>
                  <CardDescription>AI-powered suggestions to optimize your learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Optimal Study Time</h4>
                      <p className="text-sm text-blue-700">
                        Based on your performance data, you learn best between 2-4 PM. Consider scheduling your main
                        practice sessions during this time.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">Spaced Repetition</h4>
                      <p className="text-sm text-green-700">
                        Review words you learned 3-5 days ago. Your retention drops significantly after this period.
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800">Challenge Level</h4>
                      <p className="text-sm text-purple-700">
                        You're ready to increase difficulty. Try adding 2-3 advanced words to your daily practice.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
