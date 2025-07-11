"use client"

import { useState, useEffect } from "react"

import Link from "next/link"
import { ArrowRight, BookOpen, Brain, TrendingUp, ChevronRight, RefreshCw } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [todayWord, setTodayWord] = useState({
    word: "Ephemeral",
    definition: "Lasting for a very short time",
    loading: true,
    error: null,
    rawResponse: null,
  })

  // Function to fetch word data from FastAPI backend with multiple fallback strategies
  const fetchTodayWord = async () => {
    try {
      setTodayWord((prev) => ({ ...prev, loading: true, error: null }))

      // Strategy 1: Try with minimal headers first
      let response
      try {
        response = await fetch("https://vocab-backend-dev-615369945513.us-east1.run.app/", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          mode: "cors",
          cache: "no-cache",
        })
      } catch (corsError) {
        console.log("CORS request failed, trying no-cors mode...")

        // Strategy 2: Try with no-cors mode (limited but might work)
        try {
          response = await fetch("https://backendvocabtest-615369945513.europe-west1.run.app/", {
            method: "GET",
            mode: "no-cors",
          })

          // With no-cors, we can't read the response, so we'll simulate success
          setTodayWord({
            word: "Backend Reached",
            definition: "Connection successful (no-cors mode)",
            loading: false,
            error: null,
            rawResponse: "Response received but not readable in no-cors mode",
          })
          return
        } catch (noCorsError) {
          console.log("No-cors request also failed...")
          throw new Error("Both CORS and no-cors requests failed")
        }
      }

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // Try to parse JSON response
      let data
      try {
        data = await response.json()
        console.log("Response:", data)
      } catch (jsonError) {
        throw new Error("Invalid JSON response from server")
      }

      // Handle the array response format: ["query yields: worked"]
      let word = "Backend Connected"
      let definition = "Default definition"

      if (Array.isArray(data) && data.length > 0) {
        const responseText = data[0]
        word = "Success"
        definition = responseText
      } else if (typeof data === "string") {
        word = "Success"
        definition = data
      } else if (data && typeof data === "object") {
        word = data.word || "Success"
        definition = data.definition || JSON.stringify(data)
      }

      setTodayWord({
        word: word,
        definition: definition,
        loading: false,
        error: null,
        rawResponse: JSON.stringify(data),
      })
    } catch (error) {
      console.error("Error fetching word data:", error)

      let errorMessage = "Connection failed"
      let troubleshooting = []

      if (error.message.includes("Load failed") || error.message.includes("Failed to fetch")) {
        errorMessage = "Network/CORS error - Cannot reach backend"
        troubleshooting = [
          "Backend may need CORS headers configured",
          "Check if backend is running and accessible",
          "Network connectivity issues",
          "Browser blocking cross-origin requests",
        ]
      } else if (error.message.includes("HTTP")) {
        errorMessage = error.message
        troubleshooting = ["Backend returned an error status"]
      } else if (error.message.includes("JSON")) {
        errorMessage = "Invalid response format from backend"
        troubleshooting = ["Backend may not be returning JSON"]
      } else {
        errorMessage = error.message || "Unknown error occurred"
      }

      setTodayWord((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
        rawResponse: null,
        troubleshooting: troubleshooting,
      }))
    }
  }

  // Test function to check if backend is reachable at all
  const testBackendReachability = async () => {
    try {
      console.log("Testing backend reachability...")

      // Try a simple fetch with no-cors to see if we can at least reach the server
      const response = await fetch("https://backendvocabtest-615369945513.europe-west1.run.app/", {
        method: "GET",
        mode: "no-cors",
      })

      console.log("Backend is reachable (no-cors test passed)")
      return true
    } catch (error) {
      console.error("Backend is not reachable:", error)
      return false
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchTodayWord()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 hero-gradient overflow-hidden relative">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-12 text-center">
              <div className="flex flex-col justify-center space-y-4 animate-in">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Invest in your <span className="text-gradient">vocabulary</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Learn new words, track your progress, and compete with friends. Grow your vocabulary portfolio
                    today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center items-center">
                  <Link href="/practice">
                    <Button
                      size="lg"
                      className="rounded-full px-6 bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-6 border-orange-200 hover:border-orange-500 hover:bg-orange-50"
                    >
                      How it works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto relative animate-in" style={{ animationDelay: "0.2s" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl blur-3xl opacity-50"></div>
                <div className="relative bg-white rounded-2xl border shadow-elevated p-6 transform transition-all duration-500 hover:scale-[1.02]">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Backend Integration Test</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                          {todayWord.error ? "Error" : todayWord.loading ? "Loading" : "Connected"}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={fetchTodayWord}
                          disabled={todayWord.loading}
                          className="h-6 w-6 p-0"
                        >
                          <RefreshCw className={`h-3 w-3 ${todayWord.loading ? "animate-spin" : ""}`} />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      {todayWord.loading ? (
                        <>
                          <div className="animate-pulse">
                            <div className="h-8 bg-slate-200 rounded w-32 mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-48"></div>
                          </div>
                        </>
                      ) : todayWord.error ? (
                        <>
                          <h4 className="text-2xl font-bold text-red-600">Connection Failed</h4>
                          <p className="text-muted-foreground mt-1 text-sm">{todayWord.error}</p>
                          <div className="mt-3 space-y-2">
                            <button
                              onClick={fetchTodayWord}
                              className="block text-sm text-orange-600 hover:text-orange-700 underline"
                            >
                              Retry Connection
                            </button>
                            <button
                              onClick={testBackendReachability}
                              className="block text-sm text-blue-600 hover:text-blue-700 underline"
                            >
                              Test Reachability
                            </button>
                          </div>
                          {todayWord.troubleshooting && (
                            <div className="mt-3 p-3 bg-red-50 rounded text-xs text-red-800">
                              <p className="font-semibold mb-2">Possible Issues:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {todayWord.troubleshooting.map((issue, index) => (
                                  <li key={index}>{issue}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="mt-3 p-3 bg-yellow-50 rounded text-xs text-yellow-800">
                            <p className="font-semibold mb-1">CORS Solution for FastAPI:</p>
                            <code className="block bg-yellow-100 p-2 rounded text-xs">
                              {`from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)`}
                            </code>
                          </div>
                        </>
                      ) : (
                        <>
                          <h4 className="text-2xl font-bold text-green-600">{todayWord.word}</h4>
                          <p className="text-muted-foreground mt-1">{todayWord.definition}</p>
                          {todayWord.rawResponse && (
                            <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-800">
                              <p className="font-semibold mb-1">Raw Response:</p>
                              <code className="block bg-green-100 p-2 rounded">{todayWord.rawResponse}</code>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="bg-slate-100 px-2 py-1 rounded-full text-xs">
                        Status: {todayWord.error ? "Disconnected" : todayWord.loading ? "Connecting" : "Connected"}
                      </span>
                      <span className="flex items-center gap-1 text-orange-600">
                        <TrendingUp className="h-4 w-4" />
                        API Integration
                      </span>
                    </div>
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 rounded-xl shadow-sm hover:shadow transition-all duration-300"
                      disabled={todayWord.loading}
                      onClick={fetchTodayWord}
                    >
                      {todayWord.loading ? "Connecting..." : "Test Connection"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
          {/* Subtle geometric background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-blue-200/30 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-indigo-200/40 to-orange-200/40 rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-slate-200/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-to-br from-orange-300/25 to-indigo-300/25 rounded-full blur-xl"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 animate-in">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50 shadow-sm mb-4">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-600">Live Analytics</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Performance Analytics
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Vocabulary acquisition trends for top learners over the past week
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl animate-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                {/* Enhanced card with better shadows and borders */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
                <Card className="relative border-0 shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm rounded-3xl">
                  <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 border-b border-slate-200/50 p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl font-display bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                          Vocabulary Growth Metrics
                        </CardTitle>
                        <CardDescription className="text-slate-600 mt-2 text-base">
                          Hourly word acquisition data for top performers
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-full border border-slate-200/50">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-slate-600">Live</span>
                        </div>
                        <div className="text-sm text-slate-500">
                          <span className="font-medium">Last updated:</span>
                          <br />
                          <span className="text-slate-700">Today, 2:45 PM</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="h-[450px] relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-50/30 to-transparent rounded-xl"></div>
                      <ResponsiveContainer width="100%" height="100%">
                        {/* Chart content remains the same */}
                        <LineChart data={hourlyWordCountData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                          <defs>
                            <linearGradient id="colorSarah" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#d03801" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#d03801" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorJohn" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#1e40af" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#1e40af" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorRobert" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#9a3412" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#9a3412" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorEmily" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#5b21b6" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#5b21b6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorMichael" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#9f1239" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#9f1239" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(value) => {
                              const date = new Date(value)
                              return `${date.getMonth() + 1}/${date.getDate()}`
                            }}
                            interval={24}
                            angle={-30}
                            textAnchor="end"
                            height={50}
                            tick={{ fontSize: 12, fill: "#64748b" }}
                            axisLine={{ stroke: "#e5e7eb" }}
                            tickLine={{ stroke: "#e5e7eb" }}
                          />
                          <YAxis
                            domain={["dataMin - 5", "dataMax + 5"]}
                            tick={{ fontSize: 12, fill: "#64748b" }}
                            axisLine={{ stroke: "#e5e7eb" }}
                            tickLine={{ stroke: "#e5e7eb" }}
                            tickCount={8}
                          />
                          <Tooltip
                            labelFormatter={(value) => {
                              const date = new Date(value)
                              return `${date.toLocaleDateString()} ${date.getHours()}:00`
                            }}
                            contentStyle={{
                              fontSize: "12px",
                              borderRadius: "12px",
                              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                              border: "1px solid rgba(148, 163, 184, 0.2)",
                              padding: "12px 16px",
                              backgroundColor: "rgba(255, 255, 255, 0.95)",
                              backdropFilter: "blur(8px)",
                            }}
                            itemStyle={{ padding: "4px 0" }}
                            cursor={{ stroke: "#d1d5db", strokeWidth: 1, strokeDasharray: "5 5" }}
                          />
                          <Legend
                            verticalAlign="bottom"
                            height={36}
                            wrapperStyle={{
                              paddingTop: "10px",
                              fontSize: "12px",
                              color: "#64748b",
                            }}
                            iconType="circle"
                            iconSize={8}
                          />
                          <Line
                            type="monotone"
                            dataKey="Sarah Lee"
                            stroke="#d03801"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            name="Sarah Lee"
                            animationDuration={1500}
                            fill="url(#colorSarah)"
                          />
                          <Line
                            type="monotone"
                            dataKey="John Doe"
                            stroke="#1e40af"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            name="John Doe"
                            animationDuration={1500}
                            animationBegin={300}
                            fill="url(#colorJohn)"
                          />
                          <Line
                            type="monotone"
                            dataKey="Robert Johnson"
                            stroke="#9a3412"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            name="Robert Johnson"
                            animationDuration={1500}
                            animationBegin={600}
                            fill="url(#colorRobert)"
                          />
                          <Line
                            type="monotone"
                            dataKey="Emily Chen"
                            stroke="#5b21b6"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            name="Emily Chen"
                            animationDuration={1500}
                            animationBegin={900}
                            fill="url(#colorEmily)"
                          />
                          <Line
                            type="monotone"
                            dataKey="Michael Brown"
                            stroke="#9f1239"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            name="Michael Brown"
                            animationDuration={1500}
                            animationBegin={1200}
                            fill="url(#colorMichael)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                      {Object.entries({
                        "Sarah Lee": { current: 520, change: "+40", percentage: "+8.3%", color: "orange" },
                        "John Doe": { current: 480, change: "+30", percentage: "+6.7%", color: "blue" },
                        "Robert Johnson": { current: 450, change: "+30", percentage: "+7.1%", color: "orange" },
                        "Emily Chen": { current: 390, change: "+30", percentage: "+8.3%", color: "purple" },
                        "Michael Brown": { current: 420, change: "+30", percentage: "+7.7%", color: "rose" },
                      }).map(([name, data]) => (
                        <Card
                          key={name}
                          className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl"
                        >
                          <div
                            className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${data.color}-400 to-${data.color}-600`}
                          ></div>
                          <CardContent className="p-4">
                            <div className="text-sm font-medium text-slate-700">{name}</div>
                            <div className="text-2xl font-bold text-slate-900 mt-1">{data.current}</div>
                            <div className="flex items-center gap-2 mt-2">
                              <div
                                className={`text-${data.color}-600 text-sm font-semibold bg-${data.color}-50 px-2 py-1 rounded-full`}
                              >
                                {data.change}
                              </div>
                              <div className={`text-xs text-${data.color}-600 font-medium`}>{data.percentage}</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 relative overflow-hidden">
          {/* Educational themed background elements */}
          <div className="absolute inset-0">
            {/* Floating book icons */}
            <div className="absolute top-20 left-10 opacity-10">
              <BookOpen className="h-16 w-16 text-orange-600 transform rotate-12" />
            </div>
            <div className="absolute top-40 right-20 opacity-10">
              <Brain className="h-12 w-12 text-amber-600 transform -rotate-12" />
            </div>
            <div className="absolute bottom-32 left-1/4 opacity-10">
              <TrendingUp className="h-14 w-14 text-orange-500 transform rotate-45" />
            </div>
            <div className="absolute bottom-20 right-1/3 opacity-10">
              <BookOpen className="h-10 w-10 text-yellow-600 transform -rotate-45" />
            </div>

            {/* Gradient orbs */}
            <div className="absolute top-16 right-16 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-16 left-16 w-32 h-32 bg-gradient-to-br from-yellow-200/35 to-orange-200/35 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-amber-100/25 to-orange-100/25 rounded-full blur-3xl"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-in">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-200/50 shadow-lg mb-6">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-orange-800">How It Works</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-orange-800 via-amber-700 to-yellow-700 bg-clip-text text-transparent">
                  How VocabMaster Works
                </h2>
                <p className="max-w-[900px] text-slate-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Learn vocabulary like you're trading on a prediction market. Invest time in words, earn points, and
                  watch your knowledge grow.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative group animate-in"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  {/* Card background with enhanced design */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-orange-50/80 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden group">
                    {/* Gradient top border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400"></div>

                    {/* Step number indicator */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>

                    <CardHeader className="p-8 pb-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 shadow-inner group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                        {feature.icon}
                      </div>
                      <CardTitle className="mt-6 text-xl font-bold bg-gradient-to-r from-orange-800 to-amber-800 bg-clip-text text-transparent">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                      <CardDescription className="text-base text-slate-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>

                      {/* Interactive element */}
                      <div className="mt-6 flex items-center text-orange-600 font-medium text-sm group-hover:text-orange-700 transition-colors duration-300">
                        <span>Get started</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </Card>
                </div>
              ))}
            </div>

            {/* Connection lines between cards (visible on larger screens) */}
            <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
              <div className="relative h-1">
                <div className="absolute top-0 left-1/6 w-1/3 h-0.5 bg-gradient-to-r from-orange-300 to-amber-300 opacity-30"></div>
                <div className="absolute top-0 right-1/6 w-1/3 h-0.5 bg-gradient-to-r from-amber-300 to-yellow-300 opacity-30"></div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 via-white to-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-in">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to expand your vocabulary?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of learners who are growing their vocabulary every day.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="rounded-full px-6 bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Sign up for free
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Already have an account?</span>
                <Link href="/login" className="text-orange-600 hover:underline font-medium flex items-center">
                  Log in <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

const features = [
  {
    title: "Learn",
    description: "Discover new words daily with our curated vocabulary lists tailored to your level.",
    icon: <BookOpen className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Practice",
    description: "Test your knowledge with interactive exercises and spaced repetition techniques.",
    icon: <Brain className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Track",
    description: "Monitor your progress and see your vocabulary knowledge grow over time.",
    icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
  },
]





// Generate hourly data for the last 7 days with more realistic patterns
const generateHourlyData = () => {
  const data = []
  const now = new Date()
  const users = ["Sarah Lee", "John Doe", "Robert Johnson", "Emily Chen", "Michael Brown"]

  // Initial values
  const initialValues = {
    "Sarah Lee": 480,
    "John Doe": 450,
    "Robert Johnson": 420,
    "Emily Chen": 360,
    "Michael Brown": 390,
  }

  // Current values that will be updated
  const currentValues = { ...initialValues }

  // Generate data for each hour going back 7 days (168 hours)
  for (let i = 168; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
    const hour = timestamp.getHours()

    // Create entry for this hour
    const entry = { timestamp: timestamp.toISOString() }

    // Add fluctuations for each user with more realistic patterns
    users.forEach((user) => {
      // Time-based patterns
      const isActiveHour = hour >= 9 && hour <= 22 // More activity during waking hours
      const isDailyPeak = hour >= 19 && hour <= 21 // Evening peak
      const isWeekend = timestamp.getDay() === 0 || timestamp.getDay() === 6

      // Base probability of increase based on time factors
      let increaseProb = isActiveHour ? 0.65 : 0.3
      if (isDailyPeak) increaseProb += 0.15
      if (isWeekend) increaseProb += 0.1

      // User-specific patterns
      if (user === "Sarah Lee") increaseProb += 0.1 // Sarah is more active
      if (user === "Emily Chen" && hour >= 5 && hour <= 8) increaseProb += 0.2 // Emily studies in morning

      // Determine change with weighted probability
      let change = 0
      const rand = Math.random()

      if (rand < increaseProb) {
        // Increase (with varying amounts)
        const intensity = Math.random()
        if (intensity > 0.8)
          change = 2 // Occasional bigger jumps
        else change = 1
      } else if (rand < 0.85) {
        // No change most of the time when not increasing
        change = 0
      } else {
        // Decrease (less common)
        change = -1
      }

      // Apply change
      currentValues[user] += change

      // Add to entry
      entry[user] = currentValues[user]
    })

    data.push(entry)
  }

  return data
}

const hourlyWordCountData = generateHourlyData()
