"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Bell,
  BookOpen,
  Camera,
  Check,
  CreditCard,
  Globe,
  Lock,
  LogOut,
  Mail,
  Save,
  Settings,
  User,
  UserCog,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function UserProfilePage() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">VocabMarket</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-orange-500">
              Home
            </Link>
            <Link href="/practice" className="text-sm font-medium transition-colors hover:text-orange-500">
              Practice
            </Link>
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-orange-500">
              Dashboard
            </Link>
            <Link href="/leaderboard" className="text-sm font-medium transition-colors hover:text-orange-500">
              Leaderboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <span className="sr-only">User profile</span>
              <div className="rounded-full bg-orange-100 h-8 w-8 flex items-center justify-center">
                <span className="text-sm font-medium text-orange-800">JD</span>
              </div>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          <Card className="border-2 md:col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="text-lg">John Doe</CardTitle>
              <CardDescription>Advanced Learner</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="rounded-full overflow-hidden h-24 w-24 border-2 border-muted">
                  <img src={profileImage || "/placeholder.svg"} alt="Profile" className="h-full w-full object-cover" />
                </div>
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 rounded-full bg-orange-500 p-1 cursor-pointer"
                >
                  <Camera className="h-4 w-4 text-white" />
                  <input
                    id="profile-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // In a real app, you'd upload this to your server
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            setProfileImage(event.target.result.toString())
                          }
                        }
                        reader.readAsDataURL(e.target.files[0])
                      }
                    }}
                  />
                </label>
              </div>
              <div className="space-y-1">
                <p className="font-medium">john.doe@example.com</p>
                <p className="text-sm text-muted-foreground">Member since January 2025</p>
              </div>
              <div className="mt-6 w-full space-y-2">
                <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-orange-100 p-1.5">
                      <BookOpen className="h-4 w-4 text-orange-800" />
                    </div>
                    <span className="text-sm font-medium">248 Words Learned</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-orange-100 p-1.5">
                      <Check className="h-4 w-4 text-orange-800" />
                    </div>
                    <span className="text-sm font-medium">7-Day Streak</span>
                  </div>
                </div>
              </div>
              <Button variant="destructive" className="mt-6 w-full" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          <div className="md:col-span-3">
            <Tabs defaultValue="profile">
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger value="learning" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Learning</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Privacy</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display name</Label>
                      <Input id="display-name" defaultValue="JohnD" />
                      <p className="text-xs text-muted-foreground">
                        This is the name that will be displayed on the leaderboard and in public areas.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us a bit about yourself..."
                        defaultValue="Language enthusiast passionate about expanding my vocabulary."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="New York, USA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" type="url" placeholder="https://example.com" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="account">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account details and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm new password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Connected Accounts</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="h-6 w-6"
                              fill="currentColor"
                            >
                              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                            </svg>
                            <div>
                              <p className="font-medium">Google</p>
                              <p className="text-xs text-muted-foreground">Connected</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Disconnect
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="h-6 w-6"
                              fill="currentColor"
                            >
                              <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
                            </svg>
                            <div>
                              <p className="font-medium">GitHub</p>
                              <p className="text-xs text-muted-foreground">Not connected</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Connect
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Subscription</h3>
                      <div className="flex items-center justify-between bg-orange-50 p-4 rounded-md border border-orange-100">
                        <div>
                          <p className="font-medium">Premium Plan</p>
                          <p className="text-sm text-muted-foreground">$9.99/month, renews on June 15, 2025</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Danger Zone</h3>
                      <div className="flex items-center justify-between bg-red-50 p-4 rounded-md border border-red-100">
                        <div>
                          <p className="font-medium text-red-800">Delete Account</p>
                          <p className="text-sm text-red-600">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="learning">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Learning Preferences</CardTitle>
                    <CardDescription>Customize your learning experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Language Preferences</h3>
                      <div className="space-y-2">
                        <Label htmlFor="primary-language">Primary language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="primary-language">
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="it">Italian</SelectItem>
                            <SelectItem value="pt">Portuguese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="learning-languages">Languages I'm learning</Label>
                        <div className="flex flex-wrap gap-2">
                          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center">
                            Spanish
                            <button className="ml-2 text-orange-800 hover:text-orange-900">×</button>
                          </div>
                          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center">
                            French
                            <button className="ml-2 text-orange-800 hover:text-orange-900">×</button>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-full">
                            <ArrowRight className="h-3 w-3 mr-1" />
                            Add language
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Daily Goals</h3>
                      <div className="space-y-2">
                        <Label htmlFor="daily-goal">Words per day</Label>
                        <Select defaultValue="10">
                          <SelectTrigger id="daily-goal">
                            <SelectValue placeholder="Select goal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 words</SelectItem>
                            <SelectItem value="10">10 words</SelectItem>
                            <SelectItem value="15">15 words</SelectItem>
                            <SelectItem value="20">20 words</SelectItem>
                            <SelectItem value="25">25 words</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reminder-time">Daily reminder time</Label>
                        <Input id="reminder-time" type="time" defaultValue="08:00" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Learning Style</h3>
                      <div className="space-y-2">
                        <Label>Preferred practice method</Label>
                        <RadioGroup defaultValue="mixed">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="flashcards" id="flashcards" />
                            <Label htmlFor="flashcards">Flashcards</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="multiple-choice" id="multiple-choice" />
                            <Label htmlFor="multiple-choice">Multiple Choice</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fill-in-blank" id="fill-in-blank" />
                            <Label htmlFor="fill-in-blank">Fill in the Blank</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mixed" id="mixed" />
                            <Label htmlFor="mixed">Mixed (Recommended)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Difficulty Settings</h3>
                      <div className="space-y-2">
                        <Label>Word difficulty preference</Label>
                        <RadioGroup defaultValue="adaptive">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="beginner" id="beginner" />
                            <Label htmlFor="beginner">Beginner</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="intermediate" id="intermediate" />
                            <Label htmlFor="intermediate">Intermediate</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="advanced" id="advanced" />
                            <Label htmlFor="advanced">Advanced</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="adaptive" id="adaptive" />
                            <Label htmlFor="adaptive">Adaptive (Adjusts to your level)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Control how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <div className="space-y-4">
                        {[
                          { id: "daily-reminder", label: "Daily practice reminder" },
                          { id: "weekly-summary", label: "Weekly progress summary" },
                          { id: "achievement", label: "Achievement unlocked" },
                          { id: "streak", label: "Streak milestone reached" },
                          { id: "new-features", label: "New features and updates" },
                          { id: "marketing", label: "Marketing and promotional emails" },
                        ].map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <Label htmlFor={item.id} className="flex-1">
                              {item.label}
                            </Label>
                            <Switch id={item.id} defaultChecked={item.id !== "marketing"} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <div className="space-y-4">
                        {[
                          { id: "push-daily", label: "Daily practice reminder" },
                          { id: "push-achievement", label: "Achievement unlocked" },
                          { id: "push-streak", label: "Streak alerts" },
                          { id: "push-leaderboard", label: "Leaderboard position changes" },
                          { id: "push-friend", label: "Friend activity" },
                        ].map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <Label htmlFor={item.id} className="flex-1">
                              {item.label}
                            </Label>
                            <Switch id={item.id} defaultChecked={item.id !== "push-friend"} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Communication Preferences</h3>
                      <div className="space-y-2">
                        <Label>Preferred contact method</Label>
                        <RadioGroup defaultValue="email">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email-contact" />
                            <Label htmlFor="email-contact" className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="push" id="push-contact" />
                            <Label htmlFor="push-contact" className="flex items-center gap-2">
                              <Bell className="h-4 w-4" />
                              Push Notification
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="both" id="both-contact" />
                            <Label htmlFor="both-contact">Both</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Save className="h-4 w-4 mr-2" />
                      Save Notification Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control your privacy and data preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Profile Visibility</h3>
                      <div className="space-y-4">
                        {[
                          { id: "show-profile", label: "Show my profile on leaderboards" },
                          { id: "show-activity", label: "Show my learning activity to others" },
                          { id: "show-stats", label: "Show my statistics to others" },
                          { id: "searchable", label: "Allow others to find me by email or username" },
                        ].map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <Label htmlFor={item.id} className="flex-1">
                              {item.label}
                            </Label>
                            <Switch id={item.id} defaultChecked={item.id !== "searchable"} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Usage</h3>
                      <div className="space-y-4">
                        {[
                          { id: "analytics", label: "Allow anonymous usage data collection to improve the service" },
                          { id: "personalization", label: "Allow personalization based on my learning patterns" },
                          { id: "third-party", label: "Share data with third-party partners" },
                        ].map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <Label htmlFor={item.id} className="flex-1">
                              {item.label}
                            </Label>
                            <Switch id={item.id} defaultChecked={item.id !== "third-party"} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Cookies & Tracking</h3>
                      <div className="space-y-2">
                        <Label>Cookie preferences</Label>
                        <RadioGroup defaultValue="essential">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="essential" id="essential-cookies" />
                            <Label htmlFor="essential-cookies">Essential cookies only</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="functional" id="functional-cookies" />
                            <Label htmlFor="functional-cookies">Functional cookies (Remembers preferences)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="all-cookies" />
                            <Label htmlFor="all-cookies">All cookies (Including analytics and advertising)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Management</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Globe className="h-4 w-4 mr-2" />
                          View Privacy Policy
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Request Data Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Save className="h-4 w-4 mr-2" />
                      Save Privacy Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
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
