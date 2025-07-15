"use client";

import { useState } from "react"
import Link from "next/link"
import { BookOpen, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { api_url } from "@/backend_config";


export default function SignupPage() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  console.log({
    username,
    email,
    password,
    agreedToTerms,
  });

  // Here you would typically send the data to your backend API
  fetch("https://opulent-spork-vj9764pvvj6hp49v-8000.app.github.dev/users/signup", {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });



console.log(
JSON.stringify(
  {
      username,
      email,
      password,
      agreedToTerms,
    }
  )
  );

setUsername('');
setEmail('');
setPassword('');
setAgreedToTerms(false);

};


  return ( 

  <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 hero-gradient dot-pattern page-content">
        <Card className="mx-auto max-w-md w-full border-2">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>Enter your details to get started with VocabMarket</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(value) => setAgreedToTerms(!!value)}
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{' '}
                  <Link href="/terms" className="text-orange-500 hover:text-orange-600 hover:underline">
                    Terms of Service
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="btn-orange w-full">
                Sign up
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* ...Google Button and others remain unchanged... */}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-orange-500 hover:text-orange-600 hover:underline">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}

