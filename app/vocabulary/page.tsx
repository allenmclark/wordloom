"use client"

import { useEffect, useState, useMemo } from "react"
import {
  Search,
  BookOpen,
  List,
  Plus,
  Grid,
  FolderPlus,
  ChevronDown,
  Folder,
  Sparkles,
  Trash2,
  PlusCircle,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

type SearchMode = "standard" | "vector"
type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

// Simulate vector search by calculating semantic similarity
const calculateSemanticSimilarity = (query: string, word: any): number => {
  const queryLower = query.toLowerCase()
  let score = 0
  if (word.from_source.toLowerCase().includes(queryLower) || word.to_target.toLowerCase().includes(queryLower)) {
    score += 100
  }
  const frequencyArray = Array.isArray(word.frequency) ? word.frequency : [word.frequency]
  const matchingTags = frequencyArray.filter(
    (tag: string) => tag.toLowerCase().includes(queryLower) || queryLower.includes(tag.toLowerCase()),
  )
  score += matchingTags.length * 20
  if (word.definition && word.definition.toLowerCase().includes(queryLower)) score += 15
  if (word.part_of_speech && word.part_of_speech.toLowerCase().includes(queryLower)) score += 10
  return score
}

const sampleWordGroups = [
  { id: 1, name: "Travel Essentials", wordCount: 45, isPublic: true, creator: "VocabMarket" },
  { id: 2, name: "Business Spanish", wordCount: 78, isPublic: false, creator: "You" },
  { id: 3, name: "Food & Cooking", wordCount: 56, isPublic: true, creator: "ChefCarlos" },
  { id: 4, name: "Family & Relationships", wordCount: 32, isPublic: false, creator: "You" },
]

const getDifficultyBadge = (difficulty: string): { variant: BadgeVariant; className: string } => {
  switch (difficulty?.toLowerCase()) {
    case "beginner":
      return { variant: "outline", className: "text-blue-600 border-blue-400 bg-blue-50" }
    case "intermediate":
      return { variant: "outline", className: "text-orange-600 border-orange-400 bg-orange-50" }
    case "advanced":
      return { variant: "outline", className: "text-red-600 border-red-400 bg-red-50" }
    default:
      return { variant: "outline", className: "border-slate-300" }
  }
}

export default function VocabularyPage() {
  const [vocabularyData, setVocabularyData] = useState<any[]>([])
  const [wordGroups, setWordGroups] = useState(sampleWordGroups)
  const [isLoading, setIsLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState("")
  const [searchMode, setSearchMode] = useState<SearchMode>("standard")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [selectedWords, setSelectedWords] = useState<Set<number>>(new Set())
  const [activeGroup, setActiveGroup] = useState<number | "all">("all")

  const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")

  const categories = useMemo(() => {
    const cats = Array.from(new Set(vocabularyData.map((word) => word.part_of_speech).filter(Boolean)))
    return ["all", ...cats]
  }, [vocabularyData])

  const difficulties = ["all", "beginner", "intermediate", "advanced"]

  const filteredData = useMemo(() => {
    let filtered = vocabularyData

    if (activeGroup !== "all") {
      const group = wordGroups.find((g) => g.id === activeGroup)
      if (group) {
        // Placeholder logic for showing words in a group
        filtered = vocabularyData.slice(0, group.wordCount)
      }
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((word) => word.part_of_speech === selectedCategory)
    }
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((word) => word.difficulty === selectedDifficulty)
    }
    if (searchTerm.trim()) {
      if (searchMode === "standard") {
        filtered = filtered.filter(
          (word) =>
            word.from_source.toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.to_target.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (word.part_of_speech && word.part_of_speech.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (word.definition && word.definition.toLowerCase().includes(searchTerm.toLowerCase())),
        )
      } else {
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
  }, [searchTerm, searchMode, selectedCategory, selectedDifficulty, vocabularyData, activeGroup, wordGroups])

  const handleWordSelection = (wordId: number, checked: boolean) => {
    const newSelected = new Set(selectedWords)
    if (checked) newSelected.add(wordId)
    else newSelected.delete(wordId)
    setSelectedWords(newSelected)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedWords(new Set(filteredData.map((word) => word.id)))
    } else {
      setSelectedWords(new Set())
    }
  }

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: Date.now(), // Use a more robust ID in production
        name: newGroupName.trim(),
        wordCount: selectedWords.size,
        isPublic: false,
        creator: "You",
      }
      setWordGroups([...wordGroups, newGroup])
      console.log(`Created group "${newGroup.name}" with ${selectedWords.size} words.`)
      setSelectedWords(new Set())
      setShowCreateGroupDialog(false)
      setNewGroupName("")
    }
  }

  const handleAddWordToDeck = (wordId: number, deckId: number) => {
    console.log(`Adding word ${wordId} to deck ${deckId}`)
    // Here you would make an API call to add the word to the deck
  }

  const handleRemoveWordFromDeck = (wordId: number, deckId: number) => {
    console.log(`Removing word ${wordId} from deck ${deckId}`)
    // Here you would make an API call to remove the word from the deck
  }

  useEffect(() => {
    fetch("https://vocab-backend-dev-615369945513.us-east1.run.app/words/100")
      .then((res) => res.json())
      .then((data) => setVocabularyData(data))
      .catch((err) => console.error("Failed to fetch vocabulary:", err))
      .finally(() => setIsLoading(false))
  }, [])

  const isViewingUserDeck = useMemo(() => {
    if (activeGroup === "all") return false
    const group = wordGroups.find((g) => g.id === activeGroup)
    return group?.creator === "You"
  }, [activeGroup, wordGroups])

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading vocabulary explorer...</div>
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50/50">
      {/* Sidebar for Word Groups */}
      <aside className="w-72 border-r bg-white p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Word Decks</h2>
        <Dialog open={showCreateGroupDialog} onOpenChange={setShowCreateGroupDialog}>
          <DialogTrigger asChild>
            <Button className="w-full mb-4 bg-orange-500 hover:bg-orange-600">
              <FolderPlus className="mr-2 h-4 w-4" />
              Create New Deck
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Word Deck</DialogTitle>
              <DialogDescription>
                Create a new deck to organize your vocabulary. You can add the {selectedWords.size} selected words to
                this new deck.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="new-group-name">Deck Name</Label>
              <Input
                id="new-group-name"
                placeholder="e.g., Travel Essentials"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateGroupDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGroup} disabled={!newGroupName.trim()}>
                Create and Add Words
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveGroup("all")}
              className={cn(
                "w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-all",
                activeGroup === "all"
                  ? "bg-orange-100 text-orange-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <BookOpen className="h-4 w-4" />
              <span className="flex-1">All Words</span>
              <Badge variant="secondary">{vocabularyData.length}</Badge>
            </button>

            <Collapsible defaultOpen>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-2 text-sm font-medium hover:bg-gray-100 rounded-md">
                My Decks
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 pl-4">
                {wordGroups
                  .filter((g) => g.creator === "You")
                  .map((group) => (
                    <button
                      key={group.id}
                      onClick={() => setActiveGroup(group.id)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-all",
                        activeGroup === group.id
                          ? "bg-orange-100 text-orange-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                      )}
                    >
                      <Folder className="h-4 w-4" />
                      <span className="flex-1 truncate">{group.name}</span>
                      <Badge variant="secondary">{group.wordCount}</Badge>
                    </button>
                  ))}
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-2 text-sm font-medium hover:bg-gray-100 rounded-md">
                Public Decks
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 pl-4">
                {wordGroups
                  .filter((g) => g.isPublic)
                  .map((group) => (
                    <button
                      key={group.id}
                      onClick={() => setActiveGroup(group.id)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-all",
                        activeGroup === group.id
                          ? "bg-orange-100 text-orange-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                      )}
                    >
                      <Folder className="h-4 w-4" />
                      <span className="flex-1 truncate">{group.name}</span>
                      <Badge variant="secondary">{group.wordCount}</Badge>
                    </button>
                  ))}
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </div>
      </aside>

      {/* Main Content for Vocabulary Exploration */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Vocabulary Explorer</h1>
            <p className="text-muted-foreground">
              Explore the entire vocabulary, create custom decks, and start practicing.
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-8 border-2 border-orange-300/50 bg-gradient-to-br from-white to-orange-50 shadow-lg shadow-orange-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Advanced Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={
                      searchMode === "standard"
                        ? "Search for Spanish or English words..."
                        : "Search by meaning or concept..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 text-base"
                  />
                </div>
                <Select value={searchMode} onValueChange={(value: SearchMode) => setSearchMode(value)}>
                  <SelectTrigger className="w-full md:w-52 h-11">
                    <div className="flex items-center gap-2">
                      {searchMode === "standard" ? (
                        <Search className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-orange-500" />
                      )}
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span>Standard Search</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="vector">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-orange-500" />
                        <span>Semantic Search</span>
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
                      {categories.map((category: string) => (
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
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">
                {filteredData.length} {filteredData.length === 1 ? "word" : "words"} found
              </h2>
              {selectedWords.size > 0 && (
                <Badge variant="default" className="bg-orange-500">
                  {selectedWords.size} selected
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {selectedWords.size > 0 && (
                <Button onClick={() => setShowCreateGroupDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Deck
                </Button>
              )}
              <div className="flex items-center gap-1 bg-white rounded-lg p-1 border">
                <Button
                  variant={viewMode === "cards" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Word Display */}
          {viewMode === "cards" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredData.map((word) => {
                const difficultyBadge = getDifficultyBadge(word.difficulty)
                return (
                  <Card
                    key={word.id}
                    className="relative group flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-300 hover:-translate-y-1 transition-all duration-300"
                  >
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <p className="text-2xl font-bold text-slate-800">{word.from_source}</p>
                        <p className="text-lg text-slate-600">{word.to_target}</p>
                        <p className="text-sm text-slate-500 mt-4 line-clamp-3">{word.definition}</p>
                      </div>
                      <div className="mt-auto pt-4 flex justify-between items-end">
                        <div className="flex flex-wrap gap-2">
                          {word.part_of_speech && (
                            <Badge variant="outline" className="border-slate-300">
                              {word.part_of_speech}
                            </Badge>
                          )}
                          {word.difficulty && (
                            <Badge
                              variant={difficultyBadge.variant}
                              className={cn("font-medium", difficultyBadge.className)}
                            >
                              {word.difficulty}
                            </Badge>
                          )}
                        </div>
                        <Button
                          size="icon"
                          variant="outline"
                          className="bg-orange-500 text-white hover:bg-orange-600 border-orange-600 h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation() // Prevent card click events
                            if (isViewingUserDeck) {
                              handleRemoveWordFromDeck(word.id, activeGroup as number)
                            } else {
                              // In a real app, this would open a dialog to select a deck
                              handleAddWordToDeck(word.id, wordGroups.find((g) => g.creator === "You")?.id || 0)
                            }
                          }}
                        >
                          {isViewingUserDeck ? <Trash2 className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedWords.size === filteredData.length && filteredData.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Spanish</TableHead>
                    <TableHead>English</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Definition</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((word) => (
                    <TableRow key={word.id} data-state={selectedWords.has(word.id) && "selected"}>
                      <TableCell>
                        <Checkbox
                          checked={selectedWords.has(word.id)}
                          onCheckedChange={(checked) => handleWordSelection(word.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{word.from_source}</TableCell>
                      <TableCell>{word.to_target}</TableCell>
                      <TableCell>
                        {word.part_of_speech && <Badge variant="outline">{word.part_of_speech}</Badge>}
                      </TableCell>
                      <TableCell>
                        {word.difficulty && (
                          <Badge
                            variant={getDifficultyBadge(word.difficulty).variant}
                            className={getDifficultyBadge(word.difficulty).className}
                          >
                            {word.difficulty}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground truncate max-w-xs">
                        {word.definition}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
