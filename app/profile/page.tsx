"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Calendar, Crown, Globe, Languages, Save, User, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const [username, setUsername] = useState("JohnLearner")
  const [defaultLanguage, setDefaultLanguage] = useState("en")
  const [nativeLanguage, setNativeLanguage] = useState("en")
  const [isLoading, setIsLoading] = useState(false)

  // Mock user data - in a real app, this would come from your backend
  const userSignupDate = "January 15, 2024"
  const subscriptionTier = "premium" // or "free"

  const handleSaveProfile = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would make an actual API call to update the user profile
    console.log("Saving profile:", {
      username,
      defaultLanguage,
      nativeLanguage,
    })

    setIsLoading(false)
  }

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "pt", label: "Portuguese" },
    { value: "ru", label: "Russian" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    { value: "zh", label: "Chinese" },
    { value: "ar", label: "Arabic" },
    { value: "hi", label: "Hindi" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-slate-50">
      <main className="container py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and language settings</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Profile Overview Card */}
          <Card className="md:col-span-1 border-2">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-orange-600" />
              </div>
              <CardTitle className="text-xl">{username}</CardTitle>
              <CardDescription>Vocabulary Enthusiast</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subscription Status */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200">
                <div className="flex items-center gap-2">
                  {subscriptionTier === "premium" ? (
                    <Crown className="h-5 w-5 text-orange-600" />
                  ) : (
                    <Zap className="h-5 w-5 text-slate-600" />
                  )}
                  <span className="font-medium">{subscriptionTier === "premium" ? "Premium" : "Free"} Plan</span>
                </div>
                <Badge variant={subscriptionTier === "premium" ? "default" : "secondary"}>
                  {subscriptionTier === "premium" ? "Active" : "Basic"}
                </Badge>
              </div>

              {/* Signup Date */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <Calendar className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">{userSignupDate}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600">248</p>
                  <p className="text-xs text-blue-600">Words Learned</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-2xl font-bold text-green-600">7</p>
                  <p className="text-xs text-green-600">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Settings Form */}
          <Card className="md:col-span-2 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your username and language preferences to personalize your learning experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  This will be displayed on leaderboards and in your profile
                </p>
              </div>

              {/* Default Learning Language */}
              <div className="space-y-2">
                <Label htmlFor="default-language" className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Default Learning Language
                </Label>
                <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                  <SelectTrigger id="default-language" className="h-11">
                    <SelectValue placeholder="Select your default learning language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">The primary language you want to learn vocabulary for</p>
              </div>

              {/* Native Language */}
              <div className="space-y-2">
                <Label htmlFor="native-language" className="text-sm font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Native Language
                </Label>
                <Select value={nativeLanguage} onValueChange={setNativeLanguage}>
                  <SelectTrigger id="native-language" className="h-11">
                    <SelectValue placeholder="Select your native language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Your native language for translations and explanations</p>
              </div>

              {/* Language Learning Goals */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Languages className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium text-blue-900">Language Learning Tip</h3>
                </div>
                <p className="text-sm text-blue-700">
                  Setting your native language helps us provide better translations and explanations tailored to your
                  linguistic background.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <Button onClick={handleSaveProfile} disabled={isLoading} className="gap-2">
                <Save className="h-4 w-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Settings Cards */}
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          {/* Subscription Management */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Subscription
              </CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </CardHeader>
            <CardContent>
              {subscriptionTier === "premium" ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <div>
                      <p className="font-medium text-orange-900">Premium Plan</p>
                      <p className="text-sm text-orange-700">$9.99/month</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">Active</Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage Subscription
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div>
                      <p className="font-medium">Free Plan</p>
                      <p className="text-sm text-muted-foreground">Limited features</p>
                    </div>
                    <Badge variant="secondary">Basic</Badge>
                  </div>
                  <Button className="w-full gap-2">
                    <Crown className="h-4 w-4" />
                    Upgrade to Premium
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common profile-related tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                <Link href="/user">
                  <User className="h-4 w-4" />
                  Advanced Settings
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                <Link href="/dashboard">
                  <BookOpen className="h-4 w-4" />
                  View Dashboard
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                <Link href="/practice">
                  <Zap className="h-4 w-4" />
                  Start Learning
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
