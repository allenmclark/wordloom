"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Calendar, Crown, BookOpen, Target, Flame, ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"

const languages = [
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "nl", name: "Dutch" },
]

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "john_learner",
    defaultLanguage: "es",
    nativeLanguage: "en",
  })

  // Mock user data
  const userData = {
    email: "john@example.com",
    signupDate: "January 15, 2024",
    subscriptionTier: "Premium",
    wordsLearned: 248,
    currentStreak: 7,
    avatar: "JL",
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    // In a real app, you would save to your backend here
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600">Manage your account preferences and learning settings</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-orange-100 h-20 w-20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-800">{userData.avatar}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{formData.username}</CardTitle>
                <CardDescription>{userData.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Joined</span>
                  </div>
                  <span className="text-sm font-medium">{userData.signupDate}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-600">Plan</span>
                  </div>
                  <Badge
                    variant={userData.subscriptionTier === "Premium" ? "default" : "secondary"}
                    className={
                      userData.subscriptionTier === "Premium"
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {userData.subscriptionTier}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Words Learned</span>
                    </div>
                    <span className="text-sm font-medium">{userData.wordsLearned}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-gray-600">Current Streak</span>
                    </div>
                    <span className="text-sm font-medium">{userData.currentStreak} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Crown className="h-5 w-5 text-orange-500" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-orange-900">Premium Plan</span>
                      <Badge className="bg-orange-500 hover:bg-orange-600">Active</Badge>
                    </div>
                    <p className="text-sm text-orange-700">Unlimited access to all features</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/pricing">Manage Subscription</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>Update your profile information and learning preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="Enter your username"
                  />
                  <p className="text-xs text-gray-500">This is how other users will see you on leaderboards</p>
                </div>

                <Separator />

                {/* Language Preferences */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-semibold">Language Preferences</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="defaultLanguage">Default Learning Language</Label>
                      <Select
                        value={formData.defaultLanguage}
                        onValueChange={(value) => handleInputChange("defaultLanguage", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">The language you want to learn by default</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nativeLanguage">Native Language</Label>
                      <Select
                        value={formData.nativeLanguage}
                        onValueChange={(value) => handleInputChange("nativeLanguage", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                          <SelectItem value="pt">Portuguese</SelectItem>
                          <SelectItem value="ru">Russian</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="ko">Korean</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="nl">Dutch</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">Used for translations and explanations</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Save Button */}
                <div className="flex justify-end gap-4">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">Cancel</Link>
                  </Button>
                  <Button onClick={handleSave} disabled={isLoading} className="bg-orange-500 hover:bg-orange-600">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start gap-2 bg-transparent" asChild>
                    <Link href="/user">
                      <User className="h-4 w-4" />
                      Advanced Settings
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-start gap-2 bg-transparent" asChild>
                    <Link href="/dashboard">
                      <BookOpen className="h-4 w-4" />
                      View Dashboard
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
