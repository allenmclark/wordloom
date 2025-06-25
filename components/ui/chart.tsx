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
import type { TooltipProps as RechartsTooltipProps } from "recharts" // ✅ type-only import
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
  config: ChartConfig
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
          className={cn("flex w-full justify-center text-xs", className)} // 🔸 no aspect-video
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
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
/*                          Inject per–chart CSS vars                         */
/* -------------------------------------------------------------------------- */

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const css = Object.entries(config)
    .map(([k, v]) => `--color-${k}: ${v.color};`)
    .join("")

  return (
    <style
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{ __html: `[data-chart='${id}']{${css}}` }}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                           Re-usable Tooltip shell                          */
/* -------------------------------------------------------------------------- */

export function ChartTooltip(props: React.ComponentProps<typeof RechartsTooltip>) {
  return (
    <RechartsTooltip
      {...props}
      cursor={{ fill: "hsl(var(--muted))" }}
      contentStyle={{
        background: "hsl(var(--background))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 8,
        padding: "0.5rem 0.75rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.04)",
      }}
      labelStyle={{ marginBottom: 4, fontWeight: 500 }}
      itemStyle={{ display: "flex", alignItems: "center", gap: 4 }}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                       Minimal tooltip-content component                    */
/* -------------------------------------------------------------------------- */

export function ChartTooltipContent({
  active,
  payload,
  label,
}: RechartsTooltipProps<number, string>) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-xs shadow-lg">
      {label !== undefined && <div className="mb-1 font-medium text-foreground">{label}</div>}
      <ul className="space-y-0.5">
        {payload.map((item) => (
          <li key={item.dataKey} className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-sm" style={{ background: item.color }} />
            <span className="text-muted-foreground">{item.name}</span>
            <span className="ml-auto font-mono tabular-nums">
              {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                           Convenience re-exports                           */
/* -------------------------------------------------------------------------- */

// consumers can simply `import { LineChart } from "@/components/ui/chart"`
export {
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
}
