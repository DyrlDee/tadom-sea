import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../esg-reports/ui/card"
import { Progress } from "../esg-reports/ui/progress"

export function MetricsOverview() {
  const metrics = [
    {
      title: "CO₂ Emissions",
      description: "Total greenhouse gas emissions",
      value: "2,847",
      unit: "tonnes CO₂e",
      change: "-12%",
      progress: 68,
      color: "chart-1",
    },
    {
      title: "Fuel Consumption",
      description: "Marine fuel usage",
      value: "1,234",
      unit: "tonnes",
      change: "-8%",
      progress: 45,
      color: "chart-2",
    },
    {
      title: "Port Electricity",
      description: "Shore power consumption",
      value: "456",
      unit: "MWh",
      change: "+15%",
      progress: 82,
      color: "chart-3",
    },
  ]

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Key Metrics</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Last updated: 2 hours ago</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">{metric.title}</CardTitle>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-foreground">{metric.value}</span>
                <span className="text-sm text-muted-foreground">{metric.unit}</span>
                <span
                  className={`text-sm font-medium ${
                    metric.change.startsWith("-") ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {metric.change}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress to target</span>
                  <span className="font-medium">{metric.progress}%</span>
                </div>
                <Progress value={metric.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
