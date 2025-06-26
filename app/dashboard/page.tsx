"use client"

import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeatmapVisualization } from "@/components/heatmap-visualization"
import { WordKnowledgeChart } from "@/components/word-knowledge-chart"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-background py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
              <TabsTrigger value="knowledge">Word Knowledge</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <Card className="card-base shadow-lg border-2">
                <CardHeader className="card-header">
                  <CardTitle className="card-title">Welcome to your Dashboard!</CardTitle>
                  <CardDescription className="card-description">
                    Manage your vocabulary progress and settings here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="card-content space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="card-base">
                      <CardHeader className="card-header">
                        <CardTitle className="card-title">Words Learned</CardTitle>
                      </CardHeader>
                      <CardContent className="card-content">
                        <p className="stat-number">1,234</p>
                        <p className="stat-label">Total words mastered</p>
                      </CardContent>
                    </Card>
                    <Card className="card-base">
                      <CardHeader className="card-header">
                        <CardTitle className="card-title">Practice Streak</CardTitle>
                      </CardHeader>
                      <CardContent className="card-content">
                        <p className="text-4xl font-bold text-green-600">7 days</p>
                        <p className="stat-label">Current consecutive practice days</p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="card-base">
                    <CardHeader className="card-header">
                      <CardTitle className="card-title">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="card-content">
                      <ul className="space-y-2">
                        <li>Learned "Ephemeral" - 2 hours ago</li>
                        <li>Reviewed 15 words - yesterday</li>
                        <li>Completed "Advanced Verbs" lesson - 3 days ago</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Button className="btn-primary btn-lg">
                    Practice Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="heatmap">
              <Card className="card-base shadow-lg p-6">
                <HeatmapVisualization />
              </Card>
            </TabsContent>
            <TabsContent value="knowledge">
              <WordKnowledgeChart />
            </TabsContent>
          </Tabs>
        </div>
      </main>
   //   <Footer />
    </div>
  )
}
