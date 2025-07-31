"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  User,
  Globe,
  Calendar,
  Crown,
  Settings,
  Save,
  Loader2,
  Star,
  Target,
  TrendingUp,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { languages, nativeLanguages } from "@/lib/languages"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [userSettings, setUserSettings] = useState({
    username: "john_doe",
    email: "john.doe@example.com",
    defaultLanguage: "es",
    nativeLanguage: "en",
    firstName: "John",
    lastName: "Doe",
    location: "San Francisco, USA",
    showOnLeaderboard: true,
  })

  // Mock user data
  const userData = {
    signupDate: "January 15, 2024",
    subscriptionTier: "Premium",
    wordsLearned: 248,
    currentStreak: 7,
    totalPracticeTime: "24h 15m",
    averageAccuracy: 87,
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    // Show success message (in real app, you'd use a toast)
    alert("Settings saved successfully!")
  }

  const getLanguageDisplay = (code: string, languageList: typeof languages) => {
    const lang = languageList.find((l) => l.code === code)
    return lang ? `${lang.flag} ${lang.name}` : code
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hover:bg-orange-50 hover:border-orange-200 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600 mt-1">Manage your account preferences and learning settings</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-2 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-orange-600" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your basic account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                    <AvatarFallback className="bg-orange-500 text-white text-xl">
                      {userSettings.firstName[0]}
                      {userSettings.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="hover:bg-orange-50 bg-transparent">
                      Change Photo
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={userSettings.firstName}
                      onChange={(e) => setUserSettings((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={userSettings.lastName}
                      onChange={(e) => setUserSettings((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={userSettings.username}
                      onChange={(e) => setUserSettings((prev) => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={userSettings.location}
                      onChange={(e) => setUserSettings((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., San Francisco, USA"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => setUserSettings((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Language Preferences */}
            <Card className="border-2 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-orange-600" />
                  Language Preferences
                </CardTitle>
                <CardDescription>Set your learning and native languages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Default Learning Language</Label>
                    <Select
                      value={userSettings.defaultLanguage}
                      onValueChange={(value) => setUserSettings((prev) => ({ ...prev, defaultLanguage: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">The language you want to learn</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nativeLanguage">Native Language</Label>
                    <Select
                      value={userSettings.nativeLanguage}
                      onValueChange={(value) => setUserSettings((prev) => ({ ...prev, nativeLanguage: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {nativeLanguages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Your native language for translations</p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-orange-600 mt-0.5">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-900">Language Learning Path</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        You're learning {getLanguageDisplay(userSettings.defaultLanguage, languages)} from{" "}
                        {getLanguageDisplay(userSettings.nativeLanguage, nativeLanguages)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="border-2 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>Control how your information is shared</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="showOnLeaderboard" className="font-medium">
                      Show profile on leaderboards
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">Allow other users to see your rank and profile.</p>
                  </div>
                  <Switch
                    id="showOnLeaderboard"
                    checked={userSettings.showOnLeaderboard}
                    onCheckedChange={(checked) => setUserSettings((prev) => ({ ...prev, showOnLeaderboard: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Overview */}
            <Card className="border-2 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Member since</span>
                  </div>
                  <span className="text-sm font-medium">{userData.signupDate}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-600">Subscription</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                    {userData.subscriptionTier}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-orange-600">{userData.wordsLearned}</div>
                      <div className="text-xs text-gray-600">Words Learned</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-orange-600">{userData.currentStreak}</div>
                      <div className="text-xs text-gray-600">Day Streak</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Management */}
            <Card className="border-2 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Crown className="h-5 w-5 text-orange-500" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                  <Crown className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="font-semibold text-orange-900">Premium Plan</div>
                  <div className="text-sm text-orange-700">$30/month</div>
                  <div className="text-xs text-orange-600 mt-1">Next billing: Feb 15, 2024</div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full hover:bg-orange-50 bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Subscription
                  </Button>
                  <Link href="/pricing">
                    <Button variant="outline" className="w-full hover:bg-orange-50 bg-transparent">
                      View All Plans
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card className="border-2 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Accuracy</span>
                    </div>
                    <span className="text-sm font-medium">{userData.averageAccuracy}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Practice Time</span>
                    </div>
                    <span className="text-sm font-medium">{userData.totalPracticeTime}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Current Streak</span>
                    </div>
                    <span className="text-sm font-medium">{userData.currentStreak} days</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full hover:bg-orange-50 bg-transparent">
                  View Detailed Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/word-groups">
                  <Button variant="outline" className="w-full justify-start hover:bg-orange-50 bg-transparent">
                    Manage Word Groups
                  </Button>
                </Link>
                <Link href="/practice">
                  <Button variant="outline" className="w-full justify-start hover:bg-orange-50 bg-transparent">
                    Start Practice Session
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start hover:bg-orange-50 bg-transparent">
                  Export Learning Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
