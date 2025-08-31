"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const yearlyData = {
  "2021": [
    { month: "Jan", emissions: 2800, target: 2200 },
    { month: "Feb", emissions: 2750, target: 2200 },
    { month: "Mar", emissions: 2900, target: 2200 },
    { month: "Apr", emissions: 2650, target: 2200 },
    { month: "May", emissions: 2600, target: 2200 },
    { month: "Jun", emissions: 2550, target: 2200 },
    { month: "Jul", emissions: 2500, target: 2200 },
    { month: "Aug", emissions: 2450, target: 2200 },
    { month: "Sep", emissions: 2400, target: 2200 },
    { month: "Oct", emissions: 2350, target: 2200 },
    { month: "Nov", emissions: 2300, target: 2200 },
    { month: "Dec", emissions: 2250, target: 2200 },
  ],
  "2022": [
    { month: "Jan", emissions: 2600, target: 2200 },
    { month: "Feb", emissions: 2500, target: 2200 },
    { month: "Mar", emissions: 2700, target: 2200 },
    { month: "Apr", emissions: 2450, target: 2200 },
    { month: "May", emissions: 2350, target: 2200 },
    { month: "Jun", emissions: 2300, target: 2200 },
    { month: "Jul", emissions: 2250, target: 2200 },
    { month: "Aug", emissions: 2200, target: 2200 },
    { month: "Sep", emissions: 2150, target: 2200 },
    { month: "Oct", emissions: 2100, target: 2200 },
    { month: "Nov", emissions: 2050, target: 2200 },
    { month: "Dec", emissions: 2000, target: 2200 },
  ],
  "2023": [
    { month: "Jan", emissions: 2500, target: 2200 },
    { month: "Feb", emissions: 2350, target: 2200 },
    { month: "Mar", emissions: 2600, target: 2200 },
    { month: "Apr", emissions: 2300, target: 2200 },
    { month: "May", emissions: 2200, target: 2200 },
    { month: "Jun", emissions: 2100, target: 2200 },
    { month: "Jul", emissions: 2050, target: 2200 },
    { month: "Aug", emissions: 1950, target: 2200 },
    { month: "Sep", emissions: 1900, target: 2200 },
    { month: "Oct", emissions: 1850, target: 2200 },
    { month: "Nov", emissions: 1750, target: 2200 },
    { month: "Dec", emissions: 1700, target: 2200 },
  ],
  "2024": [
    { month: "Jan", emissions: 2400, target: 2200 },
    { month: "Feb", emissions: 2100, target: 2200 },
    { month: "Mar", emissions: 2800, target: 2200 },
    { month: "Apr", emissions: 2300, target: 2200 },
    { month: "May", emissions: 2000, target: 2200 },
    { month: "Jun", emissions: 1900, target: 2200 },
    { month: "Jul", emissions: 2100, target: 2200 },
    { month: "Aug", emissions: 1800, target: 2200 },
    { month: "Sep", emissions: 1700, target: 2200 },
    { month: "Oct", emissions: 1600, target: 2200 },
    { month: "Nov", emissions: 1500, target: 2200 },
    { month: "Dec", emissions: 1400, target: 2200 },
  ],
}

interface CO2EmissionsChartProps {
  year?: string
}

export function CO2EmissionsChart({ year = "2024" }: CO2EmissionsChartProps) {
  const data = yearlyData[year as keyof typeof yearlyData] || yearlyData["2024"]

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                        <span className="font-bold text-muted-foreground">{payload[0].value} tonnes CO₂e</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="emissions"
            stroke="hsl(var(--chart-1))"
            fillOpacity={1}
            fill="url(#colorEmissions)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
