"use client";


import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Search, BookOpen, Sparkles, List, ArrowRight, Plus, Users, Edit, Grid } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export function Page() {
  const [vocabularyData, setLis] = useState([]);

  useEffect(() => {
    const fetchLis = async () => {
      try {
        const res = await fetch("https://vocab-backend-dev-615369945513.us-east1.run.app/words/20");
        const data = await res.json();
        setLis(data);
      } catch (error) {
        console.error("Failed to fetch vocabulary data:", error);
      }
    };

    fetchLis();
  }, []);



const vocabularyData_null = [
{
id: 1
from_source: "hola",
to_target: "hello",
part_of_speech: "noun",
difficulty: "beginner",
frequency: ["10"],
definition: "A way to greet your friends",
example: "Hello, how are you?",
pronunciation: "hola",
},
  ]



// Enhanced Spanish-English vocabulary data with semantic tags
const vocabularyData_nullify = [
  {
    id: 1,
    spanish: "hola",
    english: "hello",
    category: "greetings",
    difficulty: "beginner",
    semanticTags: ["greeting", "salutation", "welcome", "introduction"],
    definition: "A common greeting used when meeting someone",
    example: "Hola, ¿cómo estás?",
    pronunciation: "/ˈo.la/",
  },
  {
    id: 2,
    spanish: "adiós",
    english: "goodbye",
    category: "greetings",
    difficulty: "beginner",
    semanticTags: ["farewell", "departure", "leaving", "ending"],
    definition: "A farewell expression used when parting",
    example: "Adiós, nos vemos mañana.",
    pronunciation: "/aˈðjos/",
  },
  {
    id: 3,
    spanish: "por favor",
    english: "please",
    category: "courtesy",
    difficulty: "beginner",
    semanticTags: ["politeness", "request", "courtesy", "manners"],
    definition: "A polite expression used when making a request",
    example: "¿Puedes ayudarme, por favor?",
    pronunciation: "/por faˈβor/",
  },
  {
    id: 4,
    spanish: "gracias",
    english: "thank you",
    category: "courtesy",
    difficulty: "beginner",
    semanticTags: ["gratitude", "appreciation", "thanks", "politeness"],
    definition: "An expression of gratitude or appreciation",
    example: "Gracias por tu ayuda.",
    pronunciation: "/ˈɡɾa.θjas/",
  },
  {
    id: 5,
    spanish: "amor",
    english: "love",
    category: "emotions",
    difficulty: "intermediate",
    semanticTags: ["emotion", "affection", "romance", "feeling", "heart"],
    definition: "A deep feeling of affection and care",
    example: "El amor es universal.",
    pronunciation: "/aˈmor/",
  },

  {
    id: 7,
    spanish: "casa",
    english: "house",
    category: "nouns",
    difficulty: "beginner",
    semanticTags: ["building", "home", "dwelling", "residence", "shelter"],
    definition: "A building where people live",
    example: "Mi casa está cerca del parque.",
    pronunciation: "/ˈka.sa/",
  },
  
]

const predefinedGroups = [
  "Daily Practice",
  "Exam Preparation",
  "Conversation Starters",
  "Advanced Vocabulary",
  "Review Later",
]

type SearchMode = "standard" | "vector"

// Simulate vector search by calculating semantic similarity
const calculateSemanticSimilarity = (query: string, word: any): number => {
  const queryLower = query.toLowerCase()
  let score = 0

  // Direct word match
  if (word.from_source.toLowerCase().includes(queryLower) || word.to_target.toLowerCase().includes(queryLower)) {
    score += 100
  }

  // Semantic tag matching
  const matchingTags = word.frequency.filter(
    (tag: string) => tag.toLowerCase().includes(queryLower) || queryLower.includes(tag.toLowerCase()),
  )
  score += matchingTags.length * 20

  // Definition matching
  if (word.definition.toLowerCase().includes(queryLower)) {
    score += 15
  }

  // Category matching
  if (word.part_of_speech.toLowerCase().includes(queryLower)) {
    score += 10
  }

  // Fuzzy matching for similar concepts
  const conceptMap: { [key: string]: string[] } = {
    happy: ["felicidad", "joy", "contentment"],
    sad: ["tristeza", "sorrow", "melancholy"],
    home: ["casa", "hogar", "dwelling"],
    animal: ["perro", "gato", "pet"],
    beautiful: ["hermoso", "precioso", "lovely"],
    move: ["caminar", "correr", "movement"],
    greeting: ["hola", "adiós", "salutation"],
  }

  Object.entries(conceptMap).forEach(([concept, related]) => {
    if (queryLower.includes(concept)) {
      related.forEach((relatedWord) => {
        if (
          word.from_source.includes(relatedWord) ||
          word.to_target.includes(relatedWord) ||
          word.frequency.some((tag: string) => tag.includes(relatedWord))
        ) {
          score += 25
        }
      })
    }
  })

  return score
}

export default function SpanishEnglishPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchMode, setSearchMode] = useState<SearchMode>("standard")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [selectedWords, setSelectedWords] = useState<Set<number>>(new Set())
  const [showGroupDialog, setShowGroupDialog] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")
  const [customGroups, setCustomGroups] = useState<string[]>([])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(vocabularyData.map((word) => word.part_of_speech)))
    return ["all", ...cats]
  }, [])

  const difficulties = ["all", "beginner", "intermediate", "advanced"]

  const filteredData = useMemo(() => {
    let filtered = vocabularyData

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((word) => word.part_of_speech === selectedCategory)
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((word) => word.difficulty === selectedDifficulty)
    }

    // Apply search
    if (searchTerm.trim()) {
      if (searchMode === "standard") {
        filtered = filtered.filter(
          (word) =>
            word.from_source.toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.to_target.toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.part_of_speech.toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.definition.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      } else {
        // Vector search - semantic similarity
        const scoredResults = filtered.map((word) => ({
          ...word,
          similarity: calculateSemanticSimilarity(searchTerm, word),
        }))

        filtered = scoredResults
          .filter((word) => word.similarity > 0)
          .sort((a, b) => b.similarity - a.similarity)
          .map(({ similarity, ...word }) => word)
      }
    }

    return filtered
  }, [searchTerm, searchMode, selectedCategory, selectedDifficulty])

  const handleWordSelection = (wordId: number, checked: boolean) => {
    const newSelected = new Set(selectedWords)
    if (checked) {
      newSelected.add(wordId)
    } else {
      newSelected.delete(wordId)
    }
    setSelectedWords(newSelected)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedWords(new Set(filteredData.map((word) => word.id)))
    } else {
      setSelectedWords(new Set())
    }
  }

  const handleAssignToGroup = () => {
    if (selectedGroup || newGroupName.trim()) {
      const groupName = newGroupName.trim() || selectedGroup
      if (newGroupName.trim() && !customGroups.includes(newGroupName.trim())) {
        setCustomGroups([...customGroups, newGroupName.trim()])
      }
      // Here you would typically save the assignment to your backend
      console.log(`Assigned ${selectedWords.size} words to group: ${groupName}`)
      setSelectedWords(new Set())
      setShowGroupDialog(false)
      setNewGroupName("")
      setSelectedGroup("")
    }
  }

  const allGroups = [...predefinedGroups, ...customGroups]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Spanish-English Dictionary</h1>
            <p className="text-muted-foreground">
              Explore Spanish vocabulary with advanced search capabilities including semantic similarity
            </p>
          </div>

          {/* Enhanced Search Section */}
          <Card className="card-base shadow-lg mb-8">
            <CardHeader className="card-header">
              <CardTitle className="card-title flex items-center gap-2">
                <Search className="h-5 w-5" />
                Advanced Search
              </CardTitle>
              <CardDescription className="card-description">
                Use standard search or AI-powered semantic search to find words by meaning
              </CardDescription>
            </CardHeader>
            <CardContent className="card-content space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={
                      searchMode === "standard"
                        ? "Search for Spanish or English words..."
                        : "Search by meaning or concept (e.g., 'greeting', 'emotion', 'movement')..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Select value={searchMode} onValueChange={(value: SearchMode) => setSearchMode(value)}>
                  <SelectTrigger className="w-full md:w-48 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">
                      <div className="flex items-center gap-2">
                        <List className="h-4 w-4" />
                        Standard Search
                      </div>
                    </SelectItem>
                    <SelectItem value="vector">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Semantic Search
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Difficulties" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty === "all"
                            ? "All Difficulties"
                            : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {searchMode === "vector" && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800">Semantic Search Active</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        Search by concepts and meanings. Try terms like "emotion", "movement", "greeting", or
                        "beautiful" to find semantically related words.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Results Section with View Toggle */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">
                {filteredData.length} {filteredData.length === 1 ? "word" : "words"} found
              </h2>
              {searchTerm && (
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  {searchMode === "standard" ? "Standard" : "Semantic"} search for "{searchTerm}"
                </Badge>
              )}
              {selectedWords.size > 0 && (
                <Badge variant="default" className="bg-orange-500">
                  {selectedWords.size} selected
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-white rounded-lg p-1 border">
                <Button
                  variant={viewMode === "cards" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className={viewMode === "cards" ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  <Grid className="h-4 w-4 mr-1" />
                  Cards
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className={viewMode === "table" ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  <List className="h-4 w-4 mr-1" />
                  Table
                </Button>
              </div>

              {/* Group Management */}
              {selectedWords.size > 0 && (
                <Dialog open={showGroupDialog} onOpenChange={setShowGroupDialog}>
                  <DialogTrigger asChild>
                    <Button className="btn-primary btn-sm">
                      <Users className="mr-2 h-4 w-4" />
                      Assign to Group
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Assign Words to Group</DialogTitle>
                      <DialogDescription>
                        Assign {selectedWords.size} selected words to a group for better organization.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="group-select">Select existing group</Label>
                        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a group..." />
                          </SelectTrigger>
                          <SelectContent>
                            {allGroups.map((group) => (
                              <SelectItem key={group} value={group}>
                                {group}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="new-group">Create new group</Label>
                        <Input
                          id="new-group"
                          placeholder="Enter group name..."
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowGroupDialog(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAssignToGroup}
                        disabled={!selectedGroup && !newGroupName.trim()}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Assign Words
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              <Button className="btn-primary btn-sm">
                Add All to Practice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Conditional Word Display */}
          {viewMode === "cards" ? (
            /* Card View */
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredData.length > 0 ? (
                filteredData.map((word) => (
                  <Card key={word.id} className="card-base card-hover">
                    <CardHeader className="card-header">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="card-title text-lg">{word.from_source}</CardTitle>
                          <CardDescription className="card-description text-base font-medium">
                            {word.to_target}
                          </CardDescription>
                          <p className="text-sm text-muted-foreground mt-1">{word.pronunciation}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              word.difficulty === "beginner"
                                ? "border-green-200 text-green-700"
                                : word.difficulty === "intermediate"
                                  ? "border-yellow-200 text-yellow-700"
                                  : "border-red-200 text-red-700"
                            }`}
                          >
                            {word.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                            {word.part_of_speech}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="card-content">
                      <p className="text-sm mb-3">{word.definition}</p>
                      <div className="bg-slate-50 rounded-lg p-3 mb-3">
                        <p className="text-sm italic">"{word.example}"</p>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {word.frequency.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {word.frequency.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{word.frequency.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button className="btn-primary btn-sm flex-1">Add to Practice</Button>
                        <Button className="btn-outline btn-sm">Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full">
                  <Card className="card-base">
                    <CardContent className="card-content text-center py-12">
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No words found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchMode === "vector"
                          ? "Try different concepts or meanings in your search"
                          : "Try adjusting your search terms or filters"}
                      </p>
                      <Button
                        className="btn-outline btn-sm"
                        onClick={() => {
                          setSearchTerm("")
                          setSelectedCategory("all")
                          setSelectedDifficulty("all")
                        }}
                      >
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ) : (
            /* Table View */
            <Card className="card-base">
              <CardContent className="card-content p-0">
                {filteredData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-orange-100">
                          <TableHead className="w-12">
                            <Checkbox
                              checked={selectedWords.size === filteredData.length && filteredData.length > 0}
                              onCheckedChange={handleSelectAll}
                              aria-label="Select all words"
                            />
                          </TableHead>
                          <TableHead className="font-semibold">Spanish</TableHead>
                          <TableHead className="font-semibold">English</TableHead>
                          <TableHead className="font-semibold">Pronunciation</TableHead>
                          <TableHead className="font-semibold">Category</TableHead>
                          <TableHead className="font-semibold">Difficulty</TableHead>
                          <TableHead className="font-semibold">Definition</TableHead>
                          <TableHead className="font-semibold">Tags</TableHead>
                          <TableHead className="font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.map((word) => (
                          <TableRow
                            key={word.id}
                            className={`border-b border-gray-100 hover:bg-orange-50/50 transition-colors ${
                              selectedWords.has(word.id) ? "bg-orange-50" : ""
                            }`}
                          >
                            <TableCell>
                              <Checkbox
                                checked={selectedWords.has(word.id)}
                                onCheckedChange={(checked) => handleWordSelection(word.id, checked as boolean)}
                                aria-label={`Select ${word.from_source}`}
                              />
                            </TableCell>
                            <TableCell className="font-medium text-orange-700">{word.from_source}</TableCell>
                            <TableCell className="font-medium">{word.to_target}</TableCell>
                            <TableCell className="text-sm text-muted-foreground font-mono">
                              {word.pronunciation}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                                {word.part_of_speech}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  word.difficulty === "beginner"
                                    ? "border-green-200 text-green-700"
                                    : word.difficulty === "intermediate"
                                      ? "border-yellow-200 text-yellow-700"
                                      : "border-red-200 text-red-700"
                                }`}
                              >
                                {word.difficulty}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <p className="text-sm truncate" title={word.definition}>
                                {word.definition}
                              </p>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {word.frequency.slice(0, 2).map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {word.frequency.length > 2 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{word.frequency.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button size="sm" className="btn-primary btn-sm h-8 px-2">
                                  <Plus className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" className="btn-outline btn-sm h-8 px-2">
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No words found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchMode === "vector"
                        ? "Try different concepts or meanings in your search"
                        : "Try adjusting your search terms or filters"}
                    </p>
                    <Button
                      className="btn-outline btn-sm"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("all")
                        setSelectedDifficulty("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <footer className="border-t py-6 md:py-0 bg-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-orange-500" />
            <p className="text-sm text-muted-foreground">© 2025 VocabMarket. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
