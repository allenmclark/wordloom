"use client"

import { Header } from "@/components/header"
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
      <Header />
      <main className="flex-1 bg-background py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {" "}
              {/* Updated grid-cols to 3 */}
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
              <TabsTrigger value="knowledge">Word Knowledge</TabsTrigger> {/* New tab trigger */}
            </TabsList>
            <TabsContent value="dashboard">
              <Card className="bg-card shadow-lg border-2">
                <CardHeader>
                  <CardTitle className="text-gradient">Welcome to your Dashboard!</CardTitle>
                  <CardDescription className="text-foreground">
                    Manage your vocabulary progress and settings here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="text-foreground">Words Learned</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold text-orange-600">1,234</p>
                        <p className="text-sm text-gray-500 text-foreground">Total words mastered</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border">
                      <CardHeader>
                        <CardTitle className="text-foreground">Practice Streak</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold text-green-600">7 days</p>
                        <p className="text-sm text-gray-500 text-foreground">Current consecutive practice days</p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="bg-card border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-gray-700 text-foreground">
                        <li>Learned "Ephemeral" - 2 hours ago</li>
                        <li>Reviewed 15 words - yesterday</li>
                        <li>Completed "Advanced Verbs" lesson - 3 days ago</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Button className="btn-orange">
                    Practice Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="heatmap">
              <Card className="bg-card shadow-lg p-6">
                <HeatmapVisualization />
              </Card>
            </TabsContent>
            <TabsContent value="knowledge">
              {" "}
              {/* New tab content */}
              <WordKnowledgeChart />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
