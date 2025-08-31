"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../esg-reports/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../esg-reports/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../esg-reports/ui/select"
import { CO2EmissionsChart } from "../esg-reports/charts/co2-emissions-chart"
import { FuelConsumptionChart } from "../esg-reports/charts/fuel-consumption-chart"
import { PortElectricityChart } from "../esg-reports/charts/port-electricity-chart"

export function DataVisualizations() {
  const [selectedYear, setSelectedYear] = useState("2024")

  const availableYears = ["2021", "2022", "2023", "2024"]

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Data Visualizations</h2>
          <p className="text-muted-foreground">
            Interactive charts showing trends and patterns in your marine sustainability metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Year:</span>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="emissions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="emissions">CO₂ Emissions</TabsTrigger>
          <TabsTrigger value="fuel">Fuel Consumption</TabsTrigger>
          <TabsTrigger value="electricity">Port Electricity</TabsTrigger>
        </TabsList>

        <TabsContent value="emissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
                CO₂ Emissions Trend - {selectedYear}
              </CardTitle>
              <CardDescription>
                Monthly greenhouse gas emissions showing reduction progress toward IMO targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CO2EmissionsChart year={selectedYear} />
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Current Month:</span>
                  <span className="ml-2 font-medium">1,400 tonnes CO₂e</span>
                </div>
                <div>
                  <span className="text-muted-foreground">YoY Change:</span>
                  <span className="ml-2 font-medium text-green-600">-12% reduction</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fuel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                Fuel Consumption by Type - {selectedYear}
              </CardTitle>
              <CardDescription>Monthly fuel usage breakdown showing transition to cleaner alternatives</CardDescription>
            </CardHeader>
            <CardContent>
              <FuelConsumptionChart year={selectedYear} />
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                  <span>Marine Gas Oil</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                  <span>Bunker Fuel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-5 rounded-full"></div>
                  <span>LNG</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="electricity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                Port Electricity Usage & Efficiency - {selectedYear}
              </CardTitle>
              <CardDescription>Shore power consumption and operational efficiency metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <PortElectricityChart year={selectedYear} />
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                  <span>Consumption (MWh)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-5 rounded-full border-2 border-dashed"></div>
                  <span>Efficiency (%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}
