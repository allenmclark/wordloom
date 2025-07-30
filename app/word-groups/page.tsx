"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Search,
  Grid3X3,
  List,
  BookOpen,
  Users,
  Clock,
  Target,
  Brain,
  Zap,
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
  Play,
  Settings,
  TrendingUp,
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
    tags: ["vacation", "airport", "hotel"],
    familiarity: 85,
    lastPracticed: "2 days ago",
    accuracy: 92,
    isPublic: true,
    creator: "VocabMarket",
  },
  {
    id: 2,
    name: "Business Spanish",
    description: "Professional vocabulary for business meetings and presentations",
    wordCount: 78,
    difficulty: "Advanced",
    theme: "Business",
    partsOfSpeech: ["Nouns", "Verbs", "Adjectives", "Adverbs"],
    tags: ["meetings", "presentations", "negotiations"],
    familiarity: 62,
    lastPracticed: "1 week ago",
    accuracy: 78,
    isPublic: false,
    creator: "You",
  },
  {
    id: 3,
    name: "Food & Cooking",
    description: "Culinary terms and cooking vocabulary",
    wordCount: 56,
    difficulty: "Intermediate",
    theme: "Food",
    partsOfSpeech: ["Nouns", "Verbs"],
    tags: ["cooking", "ingredients", "recipes"],
    familiarity: 73,
    lastPracticed: "Yesterday",
    accuracy: 88,
    isPublic: true,
    creator: "ChefCarlos",
  },
  {
    id: 4,
    name: "Family & Relationships",
    description: "Words to describe family members and relationships",
    wordCount: 32,
    difficulty: "Beginner",
    theme: "Family",
    partsOfSpeech: ["Nouns", "Adjectives"],
    tags: ["family", "relationships", "emotions"],
    familiarity: 91,
    lastPracticed: "3 days ago",
    accuracy: 95,
    isPublic: false,
    creator: "You",
  },
  {
    id: 5,
    name: "Medical Terms",
    description: "Healthcare and medical vocabulary",
    wordCount: 67,
    difficulty: "Advanced",
    theme: "Health",
    partsOfSpeech: ["Nouns", "Verbs", "Adjectives"],
    tags: ["doctor", "symptoms", "treatment"],
    familiarity: 45,
    lastPracticed: "Never",
    accuracy: 0,
    isPublic: true,
    creator: "DrMartinez",
  },
  {
    id: 6,
    name: "Technology Terms",
    description: "Modern technology and digital vocabulary",
    wordCount: 89,
    difficulty: "Intermediate",
    theme: "Technology",
    partsOfSpeech: ["Nouns", "Verbs", "Adjectives"],
    tags: ["computers", "internet", "software"],
    familiarity: 68,
    lastPracticed: "5 days ago",
    accuracy: 82,
    isPublic: false,
    creator: "You",
  },
]

const themes = [
  { name: "Travel", icon: Globe, color: "bg-blue-500" },
  { name: "Food", icon: Utensils, color: "bg-orange-500" },
  { name: "Business", icon: Briefcase, color: "bg-gray-600" },
  { name: "Family", icon: Heart, color: "bg-pink-500" },
  { name: "Health", icon: Heart, color: "bg-red-500" },
  { name: "Education", icon: GraduationCap, color: "bg-purple-500" },
  { name: "Technology", icon: Laptop, color: "bg-indigo-500" },
  { name: "Sports", icon: Gamepad2, color: "bg-green-500" },
  { name: "Arts", icon: Palette, color: "bg-yellow-500" },
  { name: "Nature", icon: Leaf, color: "bg-emerald-500" },
  { name: "Shopping", icon: ShoppingBag, color: "bg-teal-500" },
  { name: "Transportation", icon: Car, color: "bg-cyan-500" },
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

const familiarityColors = {
  high: "text-green-600",
  medium: "text-yellow-600",
  low: "text-red-600",
}

export default function WordGroupsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedTheme, setSelectedTheme] = useState<string>("all")
  const [selectedPartsOfSpeech, setSelectedPartsOfSpeech] = useState<string[]>([])
  const [selectedFamiliarity, setSelectedFamiliarity] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("recent")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  // Filter and sort logic
  const filteredGroups = sampleWordGroups
    .filter((group) => {
      const matchesSearch =
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesDifficulty = selectedDifficulty === "all" || group.difficulty === selectedDifficulty
      const matchesTheme = selectedTheme === "all" || group.theme === selectedTheme

      const matchesPartsOfSpeech =
        selectedPartsOfSpeech.length === 0 || selectedPartsOfSpeech.some((pos) => group.partsOfSpeech.includes(pos))

      const matchesFamiliarity =
        selectedFamiliarity === "all" ||
        (selectedFamiliarity === "high" && group.familiarity >= 70) ||
        (selectedFamiliarity === "medium" && group.familiarity >= 40 && group.familiarity < 70) ||
        (selectedFamiliarity === "low" && group.familiarity < 40)

      return matchesSearch && matchesDifficulty && matchesTheme && matchesPartsOfSpeech && matchesFamiliarity
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "difficulty":
          const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case "familiarity":
          return b.familiarity - a.familiarity
        case "wordCount":
          return b.wordCount - a.wordCount
        default:
          return 0 // recent - would need actual dates
      }
    })

  const getFamiliarityLevel = (familiarity: number) => {
    if (familiarity >= 70) return { level: "High", color: "high" }
    if (familiarity >= 40) return { level: "Medium", color: "medium" }
    return { level: "Low", color: "low" }
  }

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
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Word Groups
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create and manage your custom vocabulary decks for targeted Spanish practice
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
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

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
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

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
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

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
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
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Group
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Word Group</DialogTitle>
                    <DialogDescription>Set up a custom vocabulary deck for your Spanish practice</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
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
                      <Textarea id="description" placeholder="Describe what this word group covers..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input id="tags" placeholder="e.g., vacation, airport, hotel" />
                      </div>
                    </div>

                    <div>
                      <Label>Parts of Speech</Label>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {partsOfSpeech.map((pos) => (
                          <div key={pos} className="flex items-center space-x-2">
                            <Checkbox id={pos} />
                            <Label htmlFor={pos} className="text-sm">
                              {pos}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="public" />
                      <Label htmlFor="public">Make this group public</Label>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-orange-500 hover:bg-orange-600">Create Group</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Browse Public Groups
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search word groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-32">
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
                <SelectTrigger className="w-32">
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

              <Select value={selectedFamiliarity} onValueChange={setSelectedFamiliarity}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Familiarity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="high">High (70%+)</SelectItem>
                  <SelectItem value="medium">Medium (40-70%)</SelectItem>
                  <SelectItem value="low">Low (&lt;40%)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
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
          </div>
        </div>

        {/* Word Groups Display */}
        {filteredGroups.length === 0 ? (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No word groups found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or create a new word group to get started.
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Group
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Browse Public Groups
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredGroups.map((group) => {
              const ThemeIcon = getThemeIcon(group.theme)
              const familiarityInfo = getFamiliarityLevel(group.familiarity)

              if (viewMode === "list") {
                return (
                  <Card key={group.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${getThemeColor(group.theme)}`}>
                            <ThemeIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{group.name}</h3>
                            <p className="text-sm text-muted-foreground">{group.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge className={difficultyColors[group.difficulty]}>{group.difficulty}</Badge>
                              <span className="text-sm text-muted-foreground">{group.wordCount} words</span>
                              <span className={`text-sm font-medium ${familiarityColors[familiarityInfo.color]}`}>
                                {group.familiarity}% familiar
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                            <Play className="h-4 w-4 mr-2" />
                            Practice
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              }

              return (
                <Card
                  key={group.id}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${getThemeColor(group.theme)}`}>
                        <ThemeIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        {group.isPublic && <Users className="h-4 w-4 text-gray-400" />}
                        <Badge className={difficultyColors[group.difficulty]}>{group.difficulty}</Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Words</span>
                        <span className="font-medium">{group.wordCount}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Familiarity</span>
                          <span className={`font-medium ${familiarityColors[familiarityInfo.color]}`}>
                            {familiarityInfo.level} ({group.familiarity}%)
                          </span>
                        </div>
                        <Progress value={group.familiarity} className="h-2" />
                      </div>

                      {group.accuracy > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Last Score</span>
                          <span className="font-medium">{group.accuracy}%</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Practiced</span>
                        <span className="font-medium">{group.lastPracticed}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {group.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {group.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{group.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                          <Play className="h-4 w-4 mr-2" />
                          Practice
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2 bg-transparent">
              <Brain className="h-8 w-8 text-orange-500" />
              <span className="font-medium">Get AI Recommendations</span>
              <span className="text-sm text-muted-foreground">Let AI suggest word groups for you</span>
            </Button>

            <Button variant="outline" className="p-6 h-auto flex-col space-y-2 bg-transparent">
              <Zap className="h-8 w-8 text-blue-500" />
              <span className="font-medium">Quick Practice</span>
              <span className="text-sm text-muted-foreground">Start a mixed practice session</span>
            </Button>

            <Button variant="outline" className="p-6 h-auto flex-col space-y-2 bg-transparent">
              <Users className="h-8 w-8 text-green-500" />
              <span className="font-medium">Community Groups</span>
              <span className="text-sm text-muted-foreground">Explore groups from other learners</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
