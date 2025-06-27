"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Brain, Target, TrendingUp, Award, Clock } from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for knowledge visualization
const knowledgeRadarData = [
  { subject: "Vocabulary", current: 85, target: 90 },
  { subject: "Grammar", current: 78, target: 85 },
  { subject: "Pronunciation", current: 72, target: 80 },
  { subject: "Comprehension", current: 88, target: 92 },
  { subject: "Fluency", current: 75, target: 85 },
  { subject: "Writing", current: 80, target: 88 },
]

const difficultyDistribution = [
  { level: "Beginner", mastered: 450, total: 500, percentage: 90 },
  { level: "Intermediate", mastered: 280, total: 400, percentage: 70 },
  { level: "Advanced", mastered: 120, total: 300, percentage: 40 },
  { level: "Expert", mastered: 25, total: 200, percentage: 12.5 },
]

const categoryMastery = [
  { category: "Verbs", mastered: 180, total: 200, color: "#fc4c02" },
  { category: "Nouns", mastered: 220, total: 250, color: "#ea580c" },
  { category: "Adjectives", mastered: 150, total: 180, color: "#c2410c" },
  { category: "Adverbs", mastered: 80, total: 120, color: "#9a3412" },
  { category: "Prepositions", mastered: 45, total: 60, color: "#7c2d12" },
  { category: "Conjunctions", mastered: 35, total: 40, color: "#431407" },
]

const learningProgressData = [
  { month: "Jan", words: 45, retention: 85 },
  { month: "Feb", words: 62, retention: 87 },
  { month: "Mar", words: 78, retention: 89 },
  { month: "Apr", words: 95, retention: 91 },
  { month: "May", words: 110, retention: 88 },
  { month: "Jun", words: 125, retention: 92 },
]

const memoryStrengthData = [
  { name: "Immediate", value: 95, color: "#10b981" },
  { name: "1 Day", value: 88, color: "#3b82f6" },
  { name: "1 Week", value: 75, color: "#f59e0b" },
  { name: "1 Month", value: 62, color: "#ef4444" },
]

export function WordKnowledgeChart() {
  const totalMastered = categoryMastery.reduce((sum, cat) => sum + cat.mastered, 0)
  const totalWords = categoryMastery.reduce((sum, cat) => sum + cat.total, 0)
  const overallMastery = Math.round((totalMastered / totalWords) * 100)

  return (
    <div className="space-y-6">
      <div>
        <CardTitle className="flex items-center gap-2 mb-2">
          <Brain className="h-5 w-5 text-orange-500" />
          Knowledge Analysis
        </CardTitle>
        <CardDescription>Comprehensive analysis of your vocabulary knowledge and learning patterns</CardDescription>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mastery">Mastery</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-orange-500" />
                  <div>
                    <div className="text-2xl font-bold">{totalMastered}</div>
                    <p className="text-sm text-muted-foreground">Words Mastered</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">{overallMastery}%</div>
                    <p className="text-sm text-muted-foreground">Overall Mastery</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold">+15%</div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-purple-500" />
                  <div>
                    <div className="text-2xl font-bold">A-</div>
                    <p className="text-sm text-muted-foreground">Knowledge Grade</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Knowledge Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Areas</CardTitle>
              <CardDescription>Your proficiency across different language skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={knowledgeRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Current" dataKey="current" stroke="#fc4c02" fill="#fc4c02" fillOpacity={0.3} />
                    <Radar name="Target" dataKey="target" stroke="#10b981" fill="transparent" strokeDasharray="5 5" />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mastery Tab */}
        <TabsContent value="mastery" className="space-y-6">
          {/* Difficulty Levels */}
          <Card>
            <CardHeader>
              <CardTitle>Mastery by Difficulty Level</CardTitle>
              <CardDescription>Your progress across different difficulty levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {difficultyDistribution.map((level) => (
                  <div key={level.level} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{level.level}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {level.mastered}/{level.total}
                        </span>
                        <Badge
                          variant={
                            level.percentage >= 80 ? "default" : level.percentage >= 60 ? "secondary" : "outline"
                          }
                        >
                          {level.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={level.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Mastery */}
          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
              <CardDescription>Mastery levels across word categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryMastery.map((category) => {
                  const percentage = Math.round((category.mastered / category.total) * 100)
                  return (
                    <div key={category.category} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{category.category}</h4>
                        <Badge style={{ backgroundColor: category.color, color: "white" }}>{percentage}%</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {category.mastered} of {category.total} words
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress Over Time</CardTitle>
              <CardDescription>Monthly word acquisition and retention rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={learningProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="words" fill="#fc4c02" />
                    <Line yAxisId="right" type="monotone" dataKey="retention" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Velocity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">125</div>
                <p className="text-sm text-muted-foreground">Words this month</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+20% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">92%</div>
                <p className="text-sm text-muted-foreground">Average retention</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">+3% improvement</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Study Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">8.5</div>
                <p className="text-sm text-muted-foreground">Words per minute</p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">Optimal pace</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Memory Tab */}
        <TabsContent value="memory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Memory Retention Analysis</CardTitle>
              <CardDescription>How well you remember words over different time periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={memoryStrengthData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {memoryStrengthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Memory Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Strong Immediate Recall</h4>
                    <p className="text-sm text-green-700">95% accuracy right after learning</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800">Review Needed</h4>
                    <p className="text-sm text-yellow-700">Memory drops to 62% after 1 month</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Optimal Review Time</h4>
                    <p className="text-sm text-blue-700">Review words after 3-5 days for best retention</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forgetting Curve</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {memoryStrengthData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20">
                          <Progress value={item.value} className="h-2" />
                        </div>
                        <span className="text-sm text-muted-foreground w-10">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
