"use client"

import * as React from "react"
import {
  CartesianGrid,
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type ChartColor = `hsl(${string})` | `#${string}` | `rgb(${string})`

export interface SeriesConfig {
  label: string
  color: ChartColor
}

export type ChartConfig = Record<string, SeriesConfig>

/* -------------------------------------------------------------------------- */
/*                              Context & Helpers                             */
/* -------------------------------------------------------------------------- */

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | null>(null)

export const useChartConfig = () => {
  const ctx = React.useContext(ChartContext)
  if (!ctx) throw new Error("ChartContext not found")
  return ctx.config
}

/* -------------------------------------------------------------------------- */
/*                              ChartContainer                                */
/* -------------------------------------------------------------------------- */

export interface ChartContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  /** A map of dataKey �� series configuration */
  config: ChartConfig
  /** Your Recharts <LineChart>, <AreaChart>, … */
  children: React.ReactNode
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, children, config, ...props }, ref) => {
    const uniqueId = React.useId()
    const chartId = `chart-${uniqueId.replace(/:/g, "")}`

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          /* Removed `aspect-video` so fixed heights like h-[60px] work */
          className={cn("flex w-full justify-center text-xs", className)}
          {...props}
        >
          {/* Inject CSS variables for series colours */}
          <ChartStyle id={chartId} config={config} />
          {/* Let the caller decide height/width via parent-classes */}
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

/* -------------------------------------------------------------------------- */
/*                             Dynamic CSS-in-JS                              */
/* -------------------------------------------------------------------------- */

interface ChartStyleProps {
  id: string
  config: ChartConfig
}

function ChartStyle({ id, config }: ChartStyleProps) {
  const cssVars = Object.entries(config)
    .map(([key, { color }]) => `--color-${key}: ${color};`)
    .join("")
  return (
    <style
      /* Each chart gets its own scoped CSS variables */
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{
        __html: `[data-chart="${id}"] {${cssVars}}`,
      }}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                           Default Chart Tooltip                            */
/* -------------------------------------------------------------------------- */

export function ChartTooltip(props: React.ComponentProps<typeof RechartsTooltip>) {
  return (
    <RechartsTooltip
      {...props}
      contentStyle={{
        background: "hsl(var(--background))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 8,
        padding: "0.5rem 0.75rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.04)",
      }}
      cursor={{ fill: "hsl(var(--muted))" }}
      labelStyle={{ marginBottom: 4, fontWeight: 500 }}
      itemStyle={{ display: "flex", alignItems: "center", gap: 4 }}
    />
  )
}

/* Convenience re-exports so callers can import everything from "@/components/ui/chart" */
export { LineChart, BarChart, PieChart, AreaChart, CartesianGrid, ResponsiveContainer }
