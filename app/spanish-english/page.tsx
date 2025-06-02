"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, BookOpen, User, Settings, LogOut, Sparkles, List, ArrowRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Enhanced Spanish-English vocabulary data with semantic tags
const vocabularyData = [

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
    id: 6,
    spanish: "felicidad",
    english: "happiness",
    category: "emotions",
    difficulty: "intermediate",
    semanticTags: ["emotion", "joy", "contentment", "positive", "wellbeing"],
    definition: "A state of joy and contentment",
    example: "La felicidad es contagiosa.",
    pronunciation: "/fe.li.θiˈðað/",
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
  {
    id: 8,
    spanish: "hogar",
    english: "home",
    category: "nouns",
    difficulty: "intermediate",
    semanticTags: ["dwelling", "family", "comfort", "belonging", "residence"],
    definition: "A place where one lives and feels belonging",
    example: "No hay lugar como el hogar.",
    pronunciation: "/oˈɣar/",
  },
  {
    id: 9,
    spanish: "perro",
    english: "dog",
    category: "animals",
    difficulty: "beginner",
    semanticTags: ["animal", "pet", "companion", "mammal", "loyal"],
    definition: "A domesticated carnivorous mammal",
    example: "Mi perro es muy juguetón.",
    pronunciation: "/ˈpe.ro/",
  },
  {
    id: 10,
    spanish: "gato",
    english: "cat",
    category: "animals",
    difficulty: "beginner",
    semanticTags: ["animal", "pet", "feline", "independent", "mammal"],
    definition: "A small domesticated carnivorous mammal",
    example: "El gato duerme en el sofá.",
    pronunciation: "/ˈɡa.to/",
  },
  {
    id: 11,
    spanish: "libro",
    english: "book",
    category: "objects",
    difficulty: "beginner",
    semanticTags: ["reading", "knowledge", "education", "literature", "learning"],
    definition: "A written or printed work consisting of pages",
    example: "Este libro es muy interesante.",
    pronunciation: "/ˈli.βɾo/",
  },
  {
    id: 12,
    spanish: "conocimiento",
    english: "knowledge",
    category: "concepts",
    difficulty: "advanced",
    semanticTags: ["learning", "wisdom", "education", "understanding", "information"],
    definition: "Facts, information, and skills acquired through experience or education",
    example: "El conocimiento es poder.",
    pronunciation: "/ko.no.θiˈmjen.to/",
  },
  {
    id: 13,
    spanish: "agua",
    english: "water",
    category: "elements",
    difficulty: "beginner",
    semanticTags: ["liquid", "essential", "life", "drink", "nature"],
    definition: "A transparent liquid essential for life",
    example: "Necesito beber agua.",
    pronunciation: "/ˈa.ɣwa/",
  },
  {
    id: 14,
    spanish: "fuego",
    english: "fire",
    category: "elements",
    difficulty: "beginner",
    semanticTags: ["element", "heat", "light", "energy", "danger"],
    definition: "The rapid oxidation of a material producing heat and light",
    example: "El fuego nos da calor.",
    pronunciation: "/ˈfwe.ɣo/",
  },
  {
    id: 15,
    spanish: "tiempo",
    english: "time",
    category: "concepts",
    difficulty: "intermediate",
    semanticTags: ["duration", "moment", "temporal", "clock", "schedule"],
    definition: "The indefinite continued progress of existence",
    example: "No tengo tiempo ahora.",
    pronunciation: "/ˈtjem.po/",
  },
  {
    id: 16,
    spanish: "momento",
    english: "moment",
    category: "concepts",
    difficulty: "intermediate",
    semanticTags: ["time", "instant", "brief", "temporal", "present"],
    definition: "A very brief period of time",
    example: "Espera un momento, por favor.",
    pronunciation: "/mo.ˈmen.to/",
  },
  {
    id: 17,
    spanish: "hermoso",
    english: "beautiful",
    category: "adjectives",
    difficulty: "intermediate",
    semanticTags: ["attractive", "aesthetic", "pleasing", "lovely", "gorgeous"],
    definition: "Pleasing the senses or mind aesthetically",
    example: "Qué hermoso día hace hoy.",
    pronunciation: "/er.ˈmo.so/",
  },
  {
    id: 18,
    spanish: "precioso",
    english: "precious",
    category: "adjectives",
    difficulty: "intermediate",
    semanticTags: ["valuable", "dear", "beautiful", "cherished", "special"],
    definition: "Of great worth; much valued",
    example: "Este anillo es muy precioso.",
    pronunciation: "/pre.ˈθjo.so/",
  },
  {
    id: 19,
    spanish: "caminar",
    english: "to walk",
    category: "verbs",
    difficulty: "beginner",
    semanticTags: ["movement", "exercise", "travel", "locomotion", "pace"],
    definition: "To move at a regular pace by lifting and setting down each foot",
    example: "Me gusta caminar por el parque.",
    pronunciation: "/ka.mi.ˈnar/",
  },
  {
    id: 20,
    spanish: "correr",
    english: "to run",
    category: "verbs",
    difficulty: "beginner",
    semanticTags: ["movement", "speed", "exercise", "fast", "athletics"],
    definition: "To move at a speed faster than a walk",
    example: "Voy a correr en el maratón.",
    pronunciation: "/ko.ˈrer/",
  },
]

type SearchMode = "standard" | "vector"

// Simulate vector search by calculating semantic similarity
const calculateSemanticSimilarity = (query: string, word: any): number => {
  const queryLower = query.toLowerCase()
  let score = 0

  // Direct word match
  if (word.spanish.toLowerCase().includes(queryLower) || word.english.toLowerCase().includes(queryLower)) {
    score += 100
  }

  // Semantic tag matching
  const matchingTags = word.semanticTags.filter(
    (tag: string) => tag.toLowerCase().includes(queryLower) || queryLower.includes(tag.toLowerCase()),
  )
  score += matchingTags.length * 20

  // Definition matching
  if (word.definition.toLowerCase().includes(queryLower)) {
    score += 15
  }

  // Category matching
  if (word.category.toLowerCase().includes(queryLower)) {
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
          word.spanish.includes(relatedWord) ||
          word.english.includes(relatedWord) ||
          word.semanticTags.some((tag: string) => tag.includes(relatedWord))
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

  const categories = useMemo(() => {
    const cats = Array.from(new Set(vocabularyData.map((word) => word.category)))
    return ["all", ...cats]
  }, [])

  const difficulties = ["all", "beginner", "intermediate", "advanced"]

  const filteredData = useMemo(() => {
    let filtered = vocabularyData

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((word) => word.category === selectedCategory)
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
            word.spanish.toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-accent" />
            <span className="text-xl font-display font-bold text-accent">VocabMarket</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="nav-link">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/practice" className="nav-link">
              Practice
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/spanish-english" className="nav-link-active">
              Spanish-English
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500"></span>
            </Link>
            <Link href="/dashboard" className="nav-link">
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/leaderboard" className="nav-link">
              Leaderboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/blog" className="nav-link">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="sr-only">User menu</span>
                  <div className="rounded-full bg-orange-100 h-8 w-8 flex items-center justify-center">
                    <span className="text-sm font-medium text-orange-800">JD</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 overflow-hidden rounded-xl p-1 shadow-elevated">
                <div className="flex items-center gap-2 p-2 border-b mb-1">
                  <div className="rounded-full bg-orange-100 h-10 w-10 flex items-center justify-center">
                    <span className="text-sm font-medium text-orange-800">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg h-10 my-1">
                  <Link href="/user" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg h-10 my-1">
                  <Link href="/user" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center cursor-pointer rounded-lg h-10 my-1 text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8 hero-gradient dot-pattern">
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

          {/* Results Section */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">
                {filteredData.length} {filteredData.length === 1 ? "word" : "words"} found
              </h2>
              {searchTerm && (
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  {searchMode === "standard" ? "Standard" : "Semantic"} search for "{searchTerm}"
                </Badge>
              )}
            </div>
            <Button className="btn-primary btn-sm">
              Add All to Practice
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Word Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.length > 0 ? (
              filteredData.map((word) => (
                <Card key={word.id} className="card-base card-hover">
                  <CardHeader className="card-header">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="card-title text-lg">{word.spanish}</CardTitle>
                        <CardDescription className="card-description text-base font-medium">
                          {word.english}
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
                          {word.category}
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
                      {word.semanticTags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {word.semanticTags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{word.semanticTags.length - 3} more
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
