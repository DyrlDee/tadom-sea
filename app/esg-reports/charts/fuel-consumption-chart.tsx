"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const yearlyData = {
  "2021": [
    { month: "Jan", marine: 220, bunker: 180, lng: 20 },
    { month: "Feb", marine: 210, bunker: 175, lng: 25 },
    { month: "Mar", marine: 240, bunker: 200, lng: 30 },
    { month: "Apr", marine: 215, bunker: 185, lng: 35 },
    { month: "May", marine: 200, bunker: 170, lng: 40 },
    { month: "Jun", marine: 195, bunker: 165, lng: 45 },
    { month: "Jul", marine: 210, bunker: 180, lng: 50 },
    { month: "Aug", marine: 190, bunker: 160, lng: 55 },
    { month: "Sep", marine: 185, bunker: 155, lng: 60 },
    { month: "Oct", marine: 180, bunker: 150, lng: 65 },
    { month: "Nov", marine: 175, bunker: 145, lng: 70 },
    { month: "Dec", marine: 170, bunker: 140, lng: 75 },
  ],
  "2022": [
    { month: "Jan", marine: 200, bunker: 160, lng: 35 },
    { month: "Feb", marine: 190, bunker: 155, lng: 40 },
    { month: "Mar", marine: 220, bunker: 175, lng: 45 },
    { month: "Apr", marine: 195, bunker: 165, lng: 50 },
    { month: "May", marine: 180, bunker: 150, lng: 55 },
    { month: "Jun", marine: 175, bunker: 145, lng: 60 },
    { month: "Jul", marine: 190, bunker: 160, lng: 65 },
    { month: "Aug", marine: 170, bunker: 140, lng: 70 },
    { month: "Sep", marine: 165, bunker: 135, lng: 75 },
    { month: "Oct", marine: 160, bunker: 130, lng: 80 },
    { month: "Nov", marine: 155, bunker: 125, lng: 85 },
    { month: "Dec", marine: 150, bunker: 120, lng: 90 },
  ],
  "2023": [
    { month: "Jan", marine: 190, bunker: 140, lng: 50 },
    { month: "Feb", marine: 175, bunker: 130, lng: 55 },
    { month: "Mar", marine: 210, bunker: 150, lng: 60 },
    { month: "Apr", marine: 185, bunker: 135, lng: 65 },
    { month: "May", marine: 170, bunker: 125, lng: 70 },
    { month: "Jun", marine: 165, bunker: 120, lng: 75 },
    { month: "Jul", marine: 180, bunker: 135, lng: 80 },
    { month: "Aug", marine: 160, bunker: 115, lng: 85 },
    { month: "Sep", marine: 155, bunker: 110, lng: 90 },
    { month: "Oct", marine: 150, bunker: 105, lng: 95 },
    { month: "Nov", marine: 145, bunker: 100, lng: 100 },
    { month: "Dec", marine: 140, bunker: 95, lng: 105 },
  ],
  "2024": [
    { month: "Jan", marine: 180, bunker: 120, lng: 45 },
    { month: "Feb", marine: 165, bunker: 110, lng: 50 },
    { month: "Mar", marine: 200, bunker: 140, lng: 55 },
    { month: "Apr", marine: 175, bunker: 125, lng: 60 },
    { month: "May", marine: 160, bunker: 115, lng: 65 },
    { month: "Jun", marine: 155, bunker: 105, lng: 70 },
    { month: "Jul", marine: 170, bunker: 120, lng: 75 },
    { month: "Aug", marine: 150, bunker: 100, lng: 80 },
    { month: "Sep", marine: 145, bunker: 95, lng: 85 },
    { month: "Oct", marine: 140, bunker: 90, lng: 90 },
    { month: "Nov", marine: 135, bunker: 85, lng: 95 },
    { month: "Dec", marine: 130, bunker: 80, lng: 100 },
  ],
}

interface FuelConsumptionChartProps {
  year?: string
}

export function FuelConsumptionChart({ year = "2024" }: FuelConsumptionChartProps) {
  const data = yearlyData[year as keyof typeof yearlyData] || yearlyData["2024"]

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                            {entry.dataKey}: {entry.value} tonnes
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
          <Bar dataKey="marine" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
          <Bar dataKey="bunker" fill="hsl(var(--chart-4))" radius={[2, 2, 0, 0]} />
          <Bar dataKey="lng" fill="hsl(var(--chart-5))" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
