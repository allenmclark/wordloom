"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Known Words", value: 750, color: "hsl(var(--chart-1))" }, // Orange-ish
  { name: "Unknown Words", value: 250, color: "hsl(var(--chart-2))" }, // Gray-ish
]

export function WordKnowledgeChart() {
  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle>Your Vocabulary Knowledge</CardTitle>
        <CardDescription>Breakdown of words you know vs. don't know</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-6">
        <ChartContainer
          config={{
            "Known Words": {
              label: "Known Words",
              color: "hsl(var(--chart-1))",
            },
            "Unknown Words": {
              label: "Unknown Words",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[250px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<ChartTooltipContent />} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
