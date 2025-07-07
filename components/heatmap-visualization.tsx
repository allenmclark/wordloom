"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp } from "lucide-react"

// Generate sample heatmap data for the past year
const generateHeatmapData = () => {
  const data = []
  const startDate = new Date()
  startDate.setFullYear(startDate.getFullYear() - 1)

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // Simulate activity levels (0-4)
    const activity = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0

    data.push({
      date: date.toISOString().split("T")[0],
      activity,
      words: activity * 5 + Math.floor(Math.random() * 10),
    })
  }

  return data
}

const heatmapData = generateHeatmapData()

const getActivityColor = (level: number) => {
  const colors = [
    "bg-gray-100", // No activity
    "bg-orange-100", // Low activity
    "bg-orange-200", // Medium-low activity
    "bg-orange-400", // Medium-high activity
    "bg-orange-500", // High activity
  ]
  return colors[level] || colors[0]
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function HeatmapVisualization() {
  const totalWords = heatmapData.reduce((sum, day) => sum + day.words, 0)
  const activeDays = heatmapData.filter((day) => day.activity > 0).length
  const currentStreak = calculateCurrentStreak()
  const longestStreak = calculateLongestStreak()

  function calculateCurrentStreak() {
    let streak = 0
    for (let i = heatmapData.length - 1; i >= 0; i--) {
      if (heatmapData[i].activity > 0) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  function calculateLongestStreak() {
    let maxStreak = 0
    let currentStreak = 0

    heatmapData.forEach((day) => {
      if (day.activity > 0) {
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    })

    return maxStreak
  }

  return (
    <div className="space-y-6">
      <div>
        <CardTitle className="flex items-center gap-2 mb-2">
          <Calendar className="h-5 w-5 text-orange-500" />
          Learning Activity Heatmap
        </CardTitle>
        <CardDescription>Your vocabulary learning activity over the past year</CardDescription>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{totalWords}</div>
            <p className="text-sm text-muted-foreground">Total words learned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{activeDays}</div>
            <p className="text-sm text-muted-foreground">Active days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{currentStreak}</div>
            <p className="text-sm text-muted-foreground">Current streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{longestStreak}</div>
            <p className="text-sm text-muted-foreground">Longest streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Month labels */}
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              {months.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="flex gap-1">
              {/* Weekday labels */}
              <div className="flex flex-col gap-1 mr-2">
                {weekdays.map((day, index) => (
                  <div key={day} className="h-3 text-xs text-muted-foreground flex items-center">
                    {index % 2 === 1 ? day.slice(0, 3) : ""}
                  </div>
                ))}
              </div>

              {/* Heatmap cells */}
              <div className="grid grid-cols-53 gap-1">
                {heatmapData.map((day, index) => {
                  const date = new Date(day.date)
                  return (
                    <div
                      key={day.date}
                      className={`w-3 h-3 rounded-sm ${getActivityColor(day.activity)} hover:ring-2 hover:ring-orange-300 cursor-pointer transition-all`}
                      title={`${day.date}: ${day.words} words learned`}
                    />
                  )
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div key={level} className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`} />
                  ))}
                </div>
                <span>More</span>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {Math.round((activeDays / 365) * 100)}% active days
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Best Performing Months</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>March 2024</span>
                <Badge>28 days active</Badge>
              </div>
              <div className="flex justify-between">
                <span>January 2024</span>
                <Badge>25 days active</Badge>
              </div>
              <div className="flex justify-between">
                <span>November 2023</span>
                <Badge>23 days active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Most active day</span>
                <Badge variant="secondary">Tuesday</Badge>
              </div>
              <div className="flex justify-between">
                <span>Least active day</span>
                <Badge variant="secondary">Sunday</Badge>
              </div>
              <div className="flex justify-between">
                <span>Weekend activity</span>
                <Badge variant="secondary">65%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
