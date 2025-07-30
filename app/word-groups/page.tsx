"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  BookOpen,
  Users,
  Clock,
  Target,
  Star,
  Edit,
  Trash2,
  Play,
  Eye,
  MoreVertical,
  Grid,
  List,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Types for word groups
type WordGroup = {
  id: string
  name: string
  description: string
  theme: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  partOfSpeech: string[]
  wordCount: number
  createdAt: string
  lastPracticed?: string
  averageScore: number
  predictedFamiliarity: number
  isPublic: boolean
  tags: string[]
  color: string
}

type FilterOptions = {
  search: string
  difficulty: string
  partOfSpeech: string
  theme: string
  familiarity: string
  sortBy: string
  viewMode: "grid" | "list"
}

const themes = [
  "Travel & Tourism",
  "Food & Dining",
  "Business & Work",
  "Family & Relationships",
  "Health & Medicine",
  "Education & Learning",
  "Technology",
  "Sports & Recreation",
  "Arts & Culture",
  "Nature & Environment",
  "Shopping & Commerce",
  "Transportation",
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
  Beginner: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Intermediate: "bg-amber-100 text-amber-800 border-amber-200",
  Advanced: "bg-red-100 text-red-800 border-red-200",
}

const themeColors = [
  "bg-orange-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-red-500",
]

export default function WordGroupsPage() {
  const [wordGroups, setWordGroups] = useState<WordGroup[]>([])
  const [filteredGroups, setFilteredGroups] = useState<WordGroup[]>([])
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    difficulty: "all",
    partOfSpeech: "all",
    theme: "all",
    familiarity: "all",
    sortBy: "recent",
    viewMode: "grid",
  })
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    theme: "",
    difficulty: "Beginner" as const,
    partOfSpeech: [] as string[],
    isPublic: false,
    tags: "",
  })

  // Mock data for word groups
  useEffect(() => {
    const mockGroups: WordGroup[] = [
      {
        id: "1",
        name: "Spanish Restaurant Vocabulary",
        description: "Essential words and phrases for dining out in Spanish-speaking countries",
        theme: "Food & Dining",
        difficulty: "Beginner",
        partOfSpeech: ["Nouns", "Verbs"],
        wordCount: 45,
        createdAt: "2024-01-15",
        lastPracticed: "2024-01-28",
        averageScore: 87,
        predictedFamiliarity: 75,
        isPublic: true,
        tags: ["restaurant", "food", "ordering"],
        color: themeColors[0],
      },
      {
        id: "2",
        name: "Business Spanish Essentials",
        description: "Professional vocabulary for business meetings and correspondence",
        theme: "Business & Work",
        difficulty: "Advanced",
        partOfSpeech: ["Nouns", "Adjectives", "Verbs"],
        wordCount: 78,
        createdAt: "2024-01-10",
        lastPracticed: "2024-01-25",
        averageScore: 72,
        predictedFamiliarity: 45,
        isPublic: false,
        tags: ["business", "professional", "meetings"],
        color: themeColors[1],
      },
      {
        id: "3",
        name: "Travel Phrases",
        description: "Must-know phrases for traveling in Spanish-speaking countries",
        theme: "Travel & Tourism",
        difficulty: "Intermediate",
        partOfSpeech: ["Verbs", "Prepositions"],
        wordCount: 32,
        createdAt: "2024-01-20",
        lastPracticed: "2024-01-29",
        averageScore: 91,
        predictedFamiliarity: 85,
        isPublic: true,
        tags: ["travel", "tourism", "phrases"],
        color: themeColors[2],
      },
      {
        id: "4",
        name: "Medical Spanish",
        description: "Healthcare vocabulary for medical professionals and patients",
        theme: "Health & Medicine",
        difficulty: "Advanced",
        partOfSpeech: ["Nouns", "Adjectives"],
        wordCount: 156,
        createdAt: "2024-01-05",
        averageScore: 68,
        predictedFamiliarity: 35,
        isPublic: false,
        tags: ["medical", "healthcare", "symptoms"],
        color: themeColors[3],
      },
      {
        id: "5",
        name: "Family & Relationships",
        description: "Words to describe family members and personal relationships",
        theme: "Family & Relationships",
        difficulty: "Beginner",
        partOfSpeech: ["Nouns", "Adjectives"],
        wordCount: 28,
        createdAt: "2024-01-25",
        lastPracticed: "2024-01-30",
        averageScore: 94,
        predictedFamiliarity: 90,
        isPublic: true,
        tags: ["family", "relationships", "personal"],
        color: themeColors[4],
      },
      {
        id: "6",
        name: "Technology Terms",
        description: "Modern technology vocabulary for the digital age",
        theme: "Technology",
        difficulty: "Intermediate",
        partOfSpeech: ["Nouns", "Verbs"],
        wordCount: 67,
        createdAt: "2024-01-12",
        averageScore: 79,
        predictedFamiliarity: 60,
        isPublic: true,
        tags: ["technology", "digital", "computers"],
        color: themeColors[5],
      },
    ]
    setWordGroups(mockGroups)
    setFilteredGroups(mockGroups)
  }, [])

  // Filter and sort logic
  useEffect(() => {
    let filtered = [...wordGroups]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (group) =>
          group.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          group.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          group.tags.some((tag) => tag.toLowerCase().includes(filters.search.toLowerCase())),
      )
    }

    // Difficulty filter
    if (filters.difficulty !== "all") {
      filtered = filtered.filter((group) => group.difficulty === filters.difficulty)
    }

    // Part of speech filter
    if (filters.partOfSpeech !== "all") {
      filtered = filtered.filter((group) => group.partOfSpeech.includes(filters.partOfSpeech))
    }

    // Theme filter
    if (filters.theme !== "all") {
      filtered = filtered.filter((group) => group.theme === filters.theme)
    }

    // Familiarity filter
    if (filters.familiarity !== "all") {
      if (filters.familiarity === "high") {
        filtered = filtered.filter((group) => group.predictedFamiliarity >= 70)
      } else if (filters.familiarity === "medium") {
        filtered = filtered.filter((group) => group.predictedFamiliarity >= 40 && group.predictedFamiliarity < 70)
      } else if (filters.familiarity === "low") {
        filtered = filtered.filter((group) => group.predictedFamiliarity < 40)
      }
    }

    // Sort
    switch (filters.sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "difficulty":
        const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 }
        filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
        break
      case "familiarity":
        filtered.sort((a, b) => b.predictedFamiliarity - a.predictedFamiliarity)
        break
      case "wordCount":
        filtered.sort((a, b) => b.wordCount - a.wordCount)
        break
    }

    setFilteredGroups(filtered)
  }, [wordGroups, filters])

  const handleCreateGroup = () => {
    const group: WordGroup = {
      id: Date.now().toString(),
      name: newGroup.name,
      description: newGroup.description,
      theme: newGroup.theme,
      difficulty: newGroup.difficulty,
      partOfSpeech: newGroup.partOfSpeech,
      wordCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      averageScore: 0,
      predictedFamiliarity: 0,
      isPublic: newGroup.isPublic,
      tags: newGroup.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      color: themeColors[Math.floor(Math.random() * themeColors.length)],
    }

    setWordGroups([group, ...wordGroups])
    setIsCreateDialogOpen(false)
    setNewGroup({
      name: "",
      description: "",
      theme: "",
      difficulty: "Beginner",
      partOfSpeech: [],
      isPublic: false,
      tags: "",
    })
  }

  const handlePartOfSpeechChange = (pos: string, checked: boolean) => {
    if (checked) {
      setNewGroup((prev) => ({
        ...prev,
        partOfSpeech: [...prev.partOfSpeech, pos],
      }))
    } else {
      setNewGroup((prev) => ({
        ...prev,
        partOfSpeech: prev.partOfSpeech.filter((p) => p !== pos),
      }))
    }
  }

  const getFamiliarityLabel = (familiarity: number) => {
    if (familiarity >= 70) return { label: "High", color: "bg-emerald-100 text-emerald-800" }
    if (familiarity >= 40) return { label: "Medium", color: "bg-amber-100 text-amber-800" }
    return { label: "Low", color: "bg-red-100 text-red-800" }
  }

  const WordGroupCard = ({ group }: { group: WordGroup }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${group.color}`}></div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                {group.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">{group.description}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit Group
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                Preview Words
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Metadata */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={difficultyColors[group.difficulty]}>
              {group.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {group.theme}
            </Badge>
            {group.isPublic && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Users className="h-3 w-3 mr-1" />
                Public
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{group.wordCount}</span>
              <span className="text-gray-600">words</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{group.averageScore}%</span>
              <span className="text-gray-600">avg score</span>
            </div>
          </div>

          {/* Familiarity */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Predicted Familiarity</span>
              <Badge variant="outline" className={getFamiliarityLabel(group.predictedFamiliarity).color}>
                {getFamiliarityLabel(group.predictedFamiliarity).label}
              </Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${group.predictedFamiliarity}%` }}
              ></div>
            </div>
          </div>

          {/* Tags */}
          {group.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {group.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {group.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{group.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Last practiced */}
          {group.lastPracticed && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              Last practiced: {new Date(group.lastPracticed).toLocaleDateString()}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <Link href={`/practice?group=${group.id}`} className="flex-1">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <Play className="h-4 w-4 mr-2" />
                Practice Now
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const WordGroupListItem = ({ group }: { group: WordGroup }) => (
    <Card className="hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className={`w-3 h-3 rounded-full ${group.color}`}></div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{group.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{group.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-medium">{group.wordCount}</div>
              <div className="text-gray-500">words</div>
            </div>
            <div className="text-center">
              <div className="font-medium">{group.averageScore}%</div>
              <div className="text-gray-500">score</div>
            </div>
            <Badge variant="outline" className={difficultyColors[group.difficulty]}>
              {group.difficulty}
            </Badge>
            <Badge variant="outline" className={getFamiliarityLabel(group.predictedFamiliarity).color}>
              {getFamiliarityLabel(group.predictedFamiliarity).label}
            </Badge>
            <Link href={`/practice?group=${group.id}`}>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Play className="h-4 w-4 mr-1" />
                Practice
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Word Groups</h1>
              <p className="text-gray-600 mt-2">Create and organize your vocabulary practice decks</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Group
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Word Group</DialogTitle>
                  <DialogDescription>Set up a new vocabulary deck for your Spanish learning practice</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Group Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Restaurant Vocabulary"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select
                        value={newGroup.theme}
                        onValueChange={(value) => setNewGroup((prev) => ({ ...prev, theme: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          {themes.map((theme) => (
                            <SelectItem key={theme} value={theme}>
                              {theme}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this word group covers..."
                      value={newGroup.description}
                      onChange={(e) => setNewGroup((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Difficulty Level</Label>
                      <Select
                        value={newGroup.difficulty}
                        onValueChange={(value: any) => setNewGroup((prev) => ({ ...prev, difficulty: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        placeholder="e.g., food, dining, restaurant"
                        value={newGroup.tags}
                        onChange={(e) => setNewGroup((prev) => ({ ...prev, tags: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Parts of Speech (select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {partsOfSpeech.map((pos) => (
                        <div key={pos} className="flex items-center space-x-2">
                          <Checkbox
                            id={pos}
                            checked={newGroup.partOfSpeech.includes(pos)}
                            onCheckedChange={(checked) => handlePartOfSpeechChange(pos, checked as boolean)}
                          />
                          <Label htmlFor={pos} className="text-sm">
                            {pos}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="public"
                      checked={newGroup.isPublic}
                      onCheckedChange={(checked) => setNewGroup((prev) => ({ ...prev, isPublic: checked as boolean }))}
                    />
                    <Label htmlFor="public" className="text-sm">
                      Make this group public for other users
                    </Label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateGroup}
                    disabled={!newGroup.name || !newGroup.theme}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Create Group
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{wordGroups.length}</div>
                <div className="text-sm text-gray-600">Total Groups</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {wordGroups.reduce((sum, group) => sum + group.wordCount, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Words</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(wordGroups.reduce((sum, group) => sum + group.averageScore, 0) / wordGroups.length) || 0}%
                </div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {wordGroups.filter((group) => group.lastPracticed).length}
                </div>
                <div className="text-sm text-gray-600">Recently Practiced</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search word groups..."
                    className="pl-10"
                    value={filters.search}
                    onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select
                  value={filters.difficulty}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, difficulty: value }))}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.partOfSpeech}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, partOfSpeech: value }))}
                >
                  <SelectTrigger className="w-[140px]">
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

                <Select
                  value={filters.theme}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, theme: value }))}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Themes</SelectItem>
                    {themes.map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.familiarity}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, familiarity: value }))}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Familiarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="high">High (70%+)</SelectItem>
                    <SelectItem value="medium">Medium (40-70%)</SelectItem>
                    <SelectItem value="low">Low (&lt;40%)</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
                >
                  <SelectTrigger className="w-[140px]">
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

                <div className="flex border rounded-md">
                  <Button
                    variant={filters.viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilters((prev) => ({ ...prev, viewMode: "grid" }))}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={filters.viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilters((prev) => ({ ...prev, viewMode: "list" }))}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Word Groups Display */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Word Groups ({filteredGroups.length})</h2>
          </div>

          {filteredGroups.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No word groups found</h3>
                <p className="text-gray-600 mb-4">
                  {filters.search ||
                  filters.difficulty !== "all" ||
                  filters.partOfSpeech !== "all" ||
                  filters.theme !== "all" ||
                  filters.familiarity !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "Create your first word group to start organizing your vocabulary practice."}
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Group
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {filters.viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGroups.map((group) => (
                    <WordGroupCard key={group.id} group={group} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredGroups.map((group) => (
                    <WordGroupListItem key={group.id} group={group} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to help you get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Star className="h-6 w-6 text-orange-500" />
                <span className="font-medium">Browse Public Groups</span>
                <span className="text-xs text-gray-600">Discover groups created by other users</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Target className="h-6 w-6 text-orange-500" />
                <span className="font-medium">Practice Recommendations</span>
                <span className="text-xs text-gray-600">Get AI-powered practice suggestions</span>
              </Button>
              <Link href="/practice">
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                  <Play className="h-6 w-6 text-orange-500" />
                  <span className="font-medium">Quick Practice</span>
                  <span className="text-xs text-gray-600">Start with random vocabulary</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
