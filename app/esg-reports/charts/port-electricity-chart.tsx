"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const yearlyData = {
  "2021": [
    { month: "Jan", consumption: 25, efficiency: 58 },
    { month: "Feb", consumption: 32, efficiency: 62 },
    { month: "Mar", consumption: 28, efficiency: 60 },
    { month: "Apr", consumption: 35, efficiency: 65 },
    { month: "May", consumption: 42, efficiency: 68 },
    { month: "Jun", consumption: 38, efficiency: 66 },
    { month: "Jul", consumption: 45, efficiency: 70 },
    { month: "Aug", consumption: 48, efficiency: 72 },
    { month: "Sep", consumption: 52, efficiency: 75 },
    { month: "Oct", consumption: 49, efficiency: 73 },
    { month: "Nov", consumption: 55, efficiency: 77 },
    { month: "Dec", consumption: 58, efficiency: 80 },
  ],
  "2022": [
    { month: "Jan", consumption: 30, efficiency: 62 },
    { month: "Feb", consumption: 37, efficiency: 66 },
    { month: "Mar", consumption: 33, efficiency: 64 },
    { month: "Apr", consumption: 40, efficiency: 69 },
    { month: "May", consumption: 47, efficiency: 72 },
    { month: "Jun", consumption: 43, efficiency: 70 },
    { month: "Jul", consumption: 50, efficiency: 74 },
    { month: "Aug", consumption: 53, efficiency: 76 },
    { month: "Sep", consumption: 57, efficiency: 79 },
    { month: "Oct", consumption: 54, efficiency: 77 },
    { month: "Nov", consumption: 60, efficiency: 81 },
    { month: "Dec", consumption: 63, efficiency: 84 },
  ],
  "2023": [
    { month: "Jan", consumption: 32, efficiency: 65 },
    { month: "Feb", consumption: 39, efficiency: 69 },
    { month: "Mar", consumption: 35, efficiency: 67 },
    { month: "Apr", consumption: 42, efficiency: 72 },
    { month: "May", consumption: 49, efficiency: 75 },
    { month: "Jun", consumption: 45, efficiency: 73 },
    { month: "Jul", consumption: 52, efficiency: 77 },
    { month: "Aug", consumption: 55, efficiency: 79 },
    { month: "Sep", consumption: 59, efficiency: 82 },
    { month: "Oct", consumption: 56, efficiency: 80 },
    { month: "Nov", consumption: 62, efficiency: 84 },
    { month: "Dec", consumption: 65, efficiency: 87 },
  ],
  "2024": [
    { month: "Jan", consumption: 35, efficiency: 68 },
    { month: "Feb", consumption: 42, efficiency: 72 },
    { month: "Mar", consumption: 38, efficiency: 70 },
    { month: "Apr", consumption: 45, efficiency: 75 },
    { month: "May", consumption: 52, efficiency: 78 },
    { month: "Jun", consumption: 48, efficiency: 76 },
    { month: "Jul", consumption: 55, efficiency: 80 },
    { month: "Aug", consumption: 58, efficiency: 82 },
    { month: "Sep", consumption: 62, efficiency: 85 },
    { month: "Oct", consumption: 59, efficiency: 83 },
    { month: "Nov", consumption: 65, efficiency: 87 },
    { month: "Dec", consumption: 68, efficiency: 90 },
  ],
}

interface PortElectricityChartProps {
  year?: string
}

export function PortElectricityChart({ year = "2024" }: PortElectricityChartProps) {
  const data = yearlyData[year as keyof typeof yearlyData] || yearlyData["2024"]

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                    <div className="grid gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                      </div>
                      {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-sm font-medium">
                            {entry.dataKey === "consumption" ? "Consumption" : "Efficiency"}: {entry.value}
                            {entry.dataKey === "consumption" ? " MWh" : "%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="consumption"
            stroke="hsl(var(--chart-3))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "hsl(var(--chart-3))", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="efficiency"
            stroke="hsl(var(--chart-5))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "hsl(var(--chart-5))", strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, stroke: "hsl(var(--chart-5))", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
