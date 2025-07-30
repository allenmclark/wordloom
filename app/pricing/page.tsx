"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react"
import Link from "next/link"

const pricingTiers = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started with vocabulary learning",
    icon: Star,
    popular: false,
    features: [
      "50 words per day",
      "Basic flashcards",
      "3 languages available",
      "Simple progress tracking",
      "Community support",
      "Mobile app access",
    ],
    limitations: ["Limited daily practice", "Basic features only", "No advanced analytics"],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
  },
  {
    name: "Plus",
    price: 10,
    description: "Ideal for serious learners who want more features",
    icon: Zap,
    popular: true,
    features: [
      "Unlimited daily words",
      "Advanced spaced repetition",
      "12 languages available",
      "Detailed progress analytics",
      "Custom word lists",
      "Audio pronunciations",
      "Offline mode",
      "Priority support",
      "Export progress data",
    ],
    limitations: [],
    buttonText: "Start Plus Trial",
    buttonVariant: "default" as const,
  },
  {
    name: "Pro",
    price: 30,
    description: "For power users and language professionals",
    icon: Crown,
    popular: false,
    features: [
      "Everything in Plus",
      "AI-powered personalization",
      "Advanced learning algorithms",
      "Unlimited languages",
      "Custom difficulty levels",
      "Team collaboration tools",
      "API access",
      "White-label options",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced reporting",
    ],
    limitations: [],
    buttonText: "Start Pro Trial",
    buttonVariant: "default" as const,
  },
]

const faqs = [
  {
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes, both Plus and Pro plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.",
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const getPrice = (basePrice: number) => {
    if (basePrice === 0) return 0
    return billingCycle === "yearly" ? Math.floor(basePrice * 10) : basePrice
  }

  const getSavings = (basePrice: number) => {
    if (basePrice === 0) return 0
    return Math.floor(basePrice * 2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Choose Your Learning Journey</h1>
          <p className="text-xl text-gray-600 mb-8">
            Start free and upgrade as you grow. All plans include our core vocabulary learning features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === "yearly" ? "bg-orange-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === "yearly" ? "text-gray-900" : "text-gray-500"}`}>
              Yearly
            </span>
            {billingCycle === "yearly" && (
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon
            const price = getPrice(tier.price)
            const savings = getSavings(tier.price)

            return (
              <Card
                key={tier.name}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  tier.popular ? "border-orange-500 shadow-lg scale-105" : "border-gray-200 hover:border-orange-300"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <CardHeader className={`text-center ${tier.popular ? "pt-12" : "pt-6"}`}>
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-3 rounded-full ${
                        tier.name === "Free" ? "bg-gray-100" : tier.name === "Plus" ? "bg-orange-100" : "bg-purple-100"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          tier.name === "Free"
                            ? "text-gray-600"
                            : tier.name === "Plus"
                              ? "text-orange-600"
                              : "text-purple-600"
                        }`}
                      />
                    </div>
                  </div>

                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">{tier.description}</CardDescription>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">${price}</span>
                      <span className="text-gray-600">/{billingCycle === "yearly" ? "year" : "month"}</span>
                    </div>
                    {billingCycle === "yearly" && tier.price > 0 && (
                      <p className="text-sm text-green-600 mt-1">Save ${savings}/year</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    className={`w-full mb-6 ${
                      tier.popular
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : tier.buttonVariant === "outline"
                          ? "border-orange-500 text-orange-600 hover:bg-orange-50"
                          : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                    variant={tier.buttonVariant}
                    asChild
                  >
                    <Link href={tier.name === "Free" ? "/signup" : "/signup?plan=" + tier.name.toLowerCase()}>
                      {tier.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <div className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Feature Comparison */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Compare All Features</h2>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900">Features</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Free</th>
                  <th className="text-center p-4 font-semibold text-orange-600">Plus</th>
                  <th className="text-center p-4 font-semibold text-purple-600">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Daily word limit", free: "50 words", plus: "Unlimited", pro: "Unlimited" },
                  { feature: "Languages available", free: "3", plus: "12", pro: "All" },
                  { feature: "Progress analytics", free: "Basic", plus: "Advanced", pro: "Advanced + AI" },
                  { feature: "Offline mode", free: "✗", plus: "✓", pro: "✓" },
                  { feature: "Custom word lists", free: "✗", plus: "✓", pro: "✓" },
                  { feature: "API access", free: "✗", plus: "✗", pro: "✓" },
                  { feature: "Team collaboration", free: "✗", plus: "✗", pro: "✓" },
                  { feature: "Priority support", free: "✗", plus: "✓", pro: "✓" },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="p-4 text-center text-gray-600">{row.free}</td>
                    <td className="p-4 text-center text-gray-600">{row.plus}</td>
                    <td className="p-4 text-center text-gray-600">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-gray-200">
                <CardHeader
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold text-gray-900">{faq.question}</CardTitle>
                    <div className={`transform transition-transform ${expandedFaq === index ? "rotate-180" : ""}`}>
                      <ArrowRight className="h-5 w-5 text-gray-500 rotate-90" />
                    </div>
                  </div>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to accelerate your vocabulary learning?</h2>
            <p className="text-xl mb-8 text-orange-100">
              Join thousands of learners who are already improving their language skills with VocabMaster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
                asChild
              >
                <Link href="/demo">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
