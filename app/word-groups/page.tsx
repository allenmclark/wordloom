"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Search,
  Grid3X3,
  List,
  BookOpen,
  Users,
  Star,
  Play,
  Settings,
  TrendingUp,
  Clock,
  Target,
  Brain,
  Globe,
  Utensils,
  Briefcase,
  Heart,
  GraduationCap,
  Laptop,
  Gamepad2,
  Palette,
  Leaf,
  ShoppingBag,
  Car,
} from "lucide-react"

// Sample word groups data
const sampleWordGroups = [
  {
    id: 1,
    name: "Travel Essentials",
    description: "Essential vocabulary for traveling in Spanish-speaking countries",
    wordCount: 45,
    difficulty: "Beginner",
    theme: "Travel",
    partsOfSpeech: ["Nouns", "Verbs", "Adjectives"],
    familiarity: 85,
    lastPracticed: "2 days ago",
    accuracy: 92,
    isPublic: false,
    tags: ["vacation", "airport", "hotel"],
  },
  {
    id: 2,
    name: "Business Spanish",
    description: "Professional vocabulary for workplace communication",
    wordCount: 78,
    difficulty: "Advanced",
    theme: "Business",
    partsOfSpeech: ["Nouns", "Verbs", "Phrases"],
    familiarity: 62,
    lastPracticed: "1 week ago",
    accuracy: 78,
    isPublic: true,
    tags: ["office", "meetings", "presentations"],
  },
  {
    id: 3,
    name: "Food & Cooking",
    description: "Culinary terms and cooking vocabulary",
    wordCount: 56,
    difficulty: "Intermediate",
    theme: "Food",
    partsOfSpeech: ["Nouns", "Verbs", "Adjectives"],
    familiarity: 91,
    lastPracticed: "Yesterday",
    accuracy: 95,
    isPublic: false,
    tags: ["recipes", "ingredients", "restaurant"],
  },
  {
    id: 4,
    name: "Family & Relationships",
    description: "Words related to family members and relationships",
    wordCount: 32,
    difficulty: "Beginner",
    theme: "Family",
    partsOfSpeech: ["Nouns", "Adjectives"],
    familiarity: 96,
    lastPracticed: "3 days ago",
    accuracy: 98,
    isPublic: true,
    tags: ["relatives", "emotions", "social"],
  },
  {
    id: 5,
    name: "Medical Terms",
    description: "Healthcare and medical vocabulary",
    wordCount: 89,
    difficulty: "Advanced",
    theme: "Health",
    partsOfSpeech: ["Nouns", "Verbs", "Adjectives"],
    familiarity: 45,
    lastPracticed: "Never",
    accuracy: 0,
    isPublic: false,
    tags: ["doctor", "symptoms", "treatment"],
  },
  {
    id: 6,
    name: "Technology Terms",
    description: "Modern technology and digital vocabulary",
    wordCount: 67,
    difficulty: "Intermediate",
    theme: "Technology",
    partsOfSpeech: ["Nouns", "Verbs"],
    familiarity: 73,
    lastPracticed: "5 days ago",
    accuracy: 84,
    isPublic: true,
    tags: ["computer", "internet", "software"],
  },
]

const themes = [
  { name: "Travel", icon: Globe, color: "bg-blue-500" },
  { name: "Food", icon: Utensils, color: "bg-green-500" },
  { name: "Business", icon: Briefcase, color: "bg-purple-500" },
  { name: "Family", icon: Heart, color: "bg-pink-500" },
  { name: "Health", icon: Heart, color: "bg-red-500" },
  { name: "Education", icon: GraduationCap, color: "bg-indigo-500" },
  { name: "Technology", icon: Laptop, color: "bg-gray-500" },
  { name: "Sports", icon: Gamepad2, color: "bg-orange-500" },
  { name: "Arts", icon: Palette, color: "bg-yellow-500" },
  { name: "Nature", icon: Leaf, color: "bg-emerald-500" },
  { name: "Shopping", icon: ShoppingBag, color: "bg-cyan-500" },
  { name: "Transportation", icon: Car, color: "bg-slate-500" },
]

const partsOfSpeech = [
  "Nouns",
  "Verbs",
  "Adjectives",
  "Adverbs",
  "Prepositions",
  "Conjunctions",
  "Pronouns",
  "Interjections",
]

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
}

const familiarityColors = (familiarity: number) => {
  if (familiarity >= 70) return "bg-green-500"
  if (familiarity >= 40) return "bg-yellow-500"
  return "bg-red-500"
}

export default function WordGroupsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedTheme, setSelectedTheme] = useState<string>("all")
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("recent")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Filter and sort logic
  const filteredGroups = sampleWordGroups
    .filter((group) => {
      const matchesSearch =
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDifficulty = selectedDifficulty === "all" || group.difficulty === selectedDifficulty
      const matchesTheme = selectedTheme === "all" || group.theme === selectedTheme
      const matchesPartOfSpeech = selectedPartOfSpeech === "all" || group.partsOfSpeech.includes(selectedPartOfSpeech)

      return matchesSearch && matchesDifficulty && matchesTheme && matchesPartOfSpeech
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "difficulty":
          return a.difficulty.localeCompare(b.difficulty)
        case "familiarity":
          return b.familiarity - a.familiarity
        case "wordCount":
          return b.wordCount - a.wordCount
        default:
          return 0 // recent - would need actual dates
      }
    })

  const getThemeIcon = (themeName: string) => {
    const theme = themes.find((t) => t.name === themeName)
    return theme ? theme.icon : BookOpen
  }

  const getThemeColor = (themeName: string) => {
    const theme = themes.find((t) => t.name === themeName)
    return theme ? theme.color : "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Word Groups
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Create and organize custom vocabulary decks for focused Spanish practice sessions
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-2xl font-bold">{sampleWordGroups.length}</div>
                  <p className="text-sm text-muted-foreground">Total Groups</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">
                    {sampleWordGroups.reduce((sum, group) => sum + group.wordCount, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Words</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      sampleWordGroups.reduce((sum, group) => sum + group.accuracy, 0) / sampleWordGroups.length,
                    )}
                    %
                  </div>
                  <p className="text-sm text-muted-foreground">Avg. Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-sm text-muted-foreground">Recently Practiced</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search word groups, descriptions, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
              <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Themes</SelectItem>
                {themes.map((theme) => (
                  <SelectItem key={theme.name} value={theme.name}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPartOfSpeech} onValueChange={setSelectedPartOfSpeech}>
              <SelectTrigger className="w-40 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Part of Speech" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {partsOfSpeech.map((pos) => (
                  <SelectItem key={pos} value={pos}>
                    {pos}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
                <SelectItem value="familiarity">Familiarity</SelectItem>
                <SelectItem value="wordCount">Word Count</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-1">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Create Button */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Word Group</DialogTitle>
                <DialogDescription>Design a custom vocabulary deck for focused practice</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="groupName">Group Name</Label>
                    <Input id="groupName" placeholder="e.g., Travel Essentials" />
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe what this word group covers..." rows={3} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map((theme) => (
                          <SelectItem key={theme.name} value={theme.name.toLowerCase()}>
                            {theme.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="partsOfSpeech">Parts of Speech</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select types" />
                      </SelectTrigger>
                      <SelectContent>
                        {partsOfSpeech.map((pos) => (
                          <SelectItem key={pos} value={pos.toLowerCase()}>
                            {pos}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" placeholder="e.g., vacation, airport, hotel" />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600">Create Group</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Word Groups Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => {
              const ThemeIcon = getThemeIcon(group.theme)
              return (
                <Card
                  key={group.id}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getThemeColor(group.theme)}`}>
                          <ThemeIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                            {group.name}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={difficultyColors[group.difficulty as keyof typeof difficultyColors]}>
                              {group.difficulty}
                            </Badge>
                            {group.isPublic && (
                              <Badge variant="outline" className="text-xs">
                                <Users className="h-3 w-3 mr-1" />
                                Public
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm">{group.description}</CardDescription>

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{group.wordCount} words</span>
                      <span className="text-muted-foreground">
                        {group.lastPracticed === "Never" ? "Not practiced" : `Practiced ${group.lastPracticed}`}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Familiarity</span>
                        <span className="font-medium">{group.familiarity}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${familiarityColors(group.familiarity)}`}
                          style={{ width: `${group.familiarity}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {group.partsOfSpeech.slice(0, 3).map((pos) => (
                        <Badge key={pos} variant="secondary" className="text-xs">
                          {pos}
                        </Badge>
                      ))}
                      {group.partsOfSpeech.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{group.partsOfSpeech.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Practice
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGroups.map((group) => {
              const ThemeIcon = getThemeIcon(group.theme)
              return (
                <Card
                  key={group.id}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${getThemeColor(group.theme)}`}>
                          <ThemeIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{group.name}</h3>
                          <p className="text-muted-foreground">{group.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge className={difficultyColors[group.difficulty as keyof typeof difficultyColors]}>
                              {group.difficulty}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{group.wordCount} words</span>
                            <span className="text-sm text-muted-foreground">{group.familiarity}% familiar</span>
                            <span className="text-sm text-muted-foreground">Last practiced {group.lastPracticed}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                          <Play className="h-4 w-4 mr-2" />
                          Practice
                        </Button>
                        <Button variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No word groups found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or create a new word group to get started
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedDifficulty("all")
                  setSelectedTheme("all")
                  setSelectedPartOfSpeech("all")
                }}
              >
                Clear Filters
              </Button>
              <Button
                className="bg-gradient-to-r from-orange-500 to-orange-600"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Group
              </Button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Browse Public Groups</h3>
              <p className="text-sm text-muted-foreground mb-4">Discover word groups created by the community</p>
              <Button variant="outline" className="w-full bg-transparent">
                Explore Public Groups
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <Brain className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI Recommendations</h3>
              <p className="text-sm text-muted-foreground mb-4">Get personalized word group suggestions</p>
              <Button variant="outline" className="w-full bg-transparent">
                Get Recommendations
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quick Practice</h3>
              <p className="text-sm text-muted-foreground mb-4">Start a mixed practice session with all groups</p>
              <Button variant="outline" className="w-full bg-transparent">
                Start Quick Practice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
