"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample Spanish-English vocabulary data
const vocabularyData = [
  { id: 1, spanish: "hola", english: "hello", category: "greetings" },
  { id: 2, spanish: "adiós", english: "goodbye", category: "greetings" },
  { id: 3, spanish: "por favor", english: "please", category: "courtesy" },
  { id: 4, spanish: "gracias", english: "thank you", category: "courtesy" },
  { id: 5, spanish: "sí", english: "yes", category: "basic" },
  { id: 6, spanish: "no", english: "no", category: "basic" },
  { id: 7, spanish: "casa", english: "house", category: "nouns" },
  { id: 8, spanish: "perro", english: "dog", category: "animals" },
  { id: 9, spanish: "gato", english: "cat", category: "animals" },
  { id: 10, spanish: "libro", english: "book", category: "nouns" },
  { id: 11, spanish: "agua", english: "water", category: "nouns" },
  { id: 12, spanish: "comida", english: "food", category: "nouns" },
  { id: 13, spanish: "amigo", english: "friend", category: "people" },
  { id: 14, spanish: "familia", english: "family", category: "people" },
  { id: 15, spanish: "tiempo", english: "time/weather", category: "concepts" },
  { id: 16, spanish: "bueno", english: "good", category: "adjectives" },
  { id: 17, spanish: "malo", english: "bad", category: "adjectives" },
  { id: 18, spanish: "grande", english: "big", category: "adjectives" },
  { id: 19, spanish: "pequeño", english: "small", category: "adjectives" },
  { id: 20, spanish: "rápido", english: "fast", category: "adjectives" },
  { id: 21, spanish: "lento", english: "slow", category: "adjectives" },
  { id: 22, spanish: "comer", english: "to eat", category: "verbs" },
  { id: 23, spanish: "beber", english: "to drink", category: "verbs" },
  { id: 24, spanish: "hablar", english: "to speak", category: "verbs" },
  { id: 25, spanish: "escuchar", english: "to listen", category: "verbs" },
]

export default function SpanishEnglishPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [filteredData, setFilteredData] = useState(vocabularyData)

  // Filter data based on search term
  useEffect(() => {
    const filtered = vocabularyData.filter(
      (word) =>
        word.spanish.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }, [searchTerm])

  // Handle row selection
  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredData.map((word) => word.id))
    }
  }

  return (
    <main className="flex flex-col min-h-screen hero-gradient">
      <div className="dot-pattern absolute inset-0"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Spanish-English Vocabulary</h1>

          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search for words in Spanish, English, or by category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">
              {selectedRows.length} of {filteredData.length} words selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={toggleSelectAll}>
                {selectedRows.length === filteredData.length ? "Deselect All" : "Select All"}
              </Button>
              <Button variant="default" size="sm" className="btn-orange" disabled={selectedRows.length === 0}>
                Add Selected to Practice ({selectedRows.length})
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left w-12">
                    <Checkbox
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-3 text-left">Spanish</th>
                  <th className="p-3 text-left">English</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((word) => (
                    <tr
                      key={word.id}
                      className={`border-t border-gray-200 hover:bg-gray-50 ${
                        selectedRows.includes(word.id) ? "bg-orange-50" : ""
                      }`}
                    >
                      <td className="p-3">
                        <Checkbox
                          checked={selectedRows.includes(word.id)}
                          onCheckedChange={() => toggleRowSelection(word.id)}
                        />
                      </td>
                      <td className="p-3 font-medium">{word.spanish}</td>
                      <td className="p-3">{word.english}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {word.category}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-3 text-center text-gray-500">
                      No words found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
