import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../esg-reports/ui/card"
import { Badge } from "../esg-reports/ui/badge"
import { Progress } from "../esg-reports/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../esg-reports/ui/tabs"

export function ESGTable() {
  const esgData = [
    {
      tier: "Tier 1",
      title: "Disclosure",
      description: "Disclose current GHG emission levels (Scope 1 & 2) for all vessels and operations",
      strategy: "Initial Assessment - Conduct an initial assessment of current emission sources and levels.",
      progress:
        "Reporting - Report on current emission levels using established methodologies (e.g. IMO DCS, EU MRV). Calculation of Carbon Intensity (CII) and Energy Efficiency Operational Indicator (EEOI).",
      status: "Completed",
      progressValue: 100,
      initiatives: [
        "IMO Data Collection System implementation",
        "EU MRV compliance reporting",
        "CII and EEOI calculations established",
        "Scope 1 & 2 emissions baseline documented",
      ],
    },
    {
      tier: "Tier 2",
      title: "Targeted Reduction",
      description:
        "Disclose current GHG emissions levels and targeted reductions aligned with IMO's GHG reduction strategy (e.g., 2030 and 2040 indicative checkpoints)",
      strategy:
        "Mitigation Planning - Outline plans for emission mitigation within the company, focusing on operational and technical measures.",
      progress: "Documented Initiatives - Document initiatives and progress on operational and technical measures.",
      status: "In Progress",
      progressValue: 68,
      initiatives: [
        "Vessel speed optimization and route planning",
        "Energy-efficient technologies (LED lighting, optimized propulsion)",
        "Alternative fuels exploration (LNG, biofuels, hydrogen, ammonia)",
        "Shore power adoption",
        "Waste heat recovery systems",
        "Optimized cargo loading/unloading procedures",
      ],
    },
    {
      tier: "Tier 3",
      title: "Ambitious Targets & Supply Chain Impact",
      description:
        "Disclose current GHG emission levels and ambitious, industry-leading targets (e.g., net-zero by 2050) including supply chain impact (Scope 3 emissions).",
      strategy:
        "Comprehensive Strategy - Detail comprehensive strategies extending to the entire value chain, including collaboration with suppliers and customers",
      progress:
        "Benchmarking & Innovation - Share detailed progress, including industry benchmarks and participation in innovative projects.",
      status: "Planning",
      progressValue: 25,
      initiatives: [
        "R&D investment for zero-emission technologies",
        "Port collaboration for green infrastructure",
        "Carbon offsetting and in-setting programs",
        "Robust MRV systems for all emission scopes",
        "Supply chain engagement and assessment",
        "Industry benchmark participation",
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Planning":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Tier 1":
        return "bg-green-50 text-green-700 border-green-200"
      case "Tier 2":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Tier 3":
        return "bg-purple-50 text-purple-700 border-purple-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">ESG Environmental Indicators</h2>
        <p className="text-muted-foreground">
          Comprehensive emission management framework aligned with IMO GHG reduction strategy and global ESG standards
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed View</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {esgData.map((item, index) => (
              <Card key={index} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getTierColor(item.tier)}>{item.tier}</Badge>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-3">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{item.progressValue}%</span>
                    </div>
                    <Progress value={item.progressValue} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Key Initiatives:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {item.initiatives.slice(0, 3).map((initiative, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-primary mt-1">•</span>
                          <span>{initiative}</span>
                        </li>
                      ))}
                      {item.initiatives.length > 3 && (
                        <li className="text-primary font-medium">+{item.initiatives.length - 3} more initiatives</li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emission Management - Environmental ("E") Indicator</CardTitle>
              <CardDescription>
                Detailed breakdown of greenhouse gas emissions management across three implementation tiers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground">Tier & Goals</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Strategy</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Progress & Initiatives</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {esgData.map((item, index) => (
                      <tr key={index} className="border-b border-border last:border-b-0">
                        <td className="py-4 px-4 align-top">
                          <div className="space-y-2">
                            <Badge className={getTierColor(item.tier)}>{item.tier}</Badge>
                            <div className="font-medium text-foreground">{item.title}</div>
                            <div className="text-sm text-muted-foreground max-w-xs">{item.description}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-foreground max-w-xs align-top">{item.strategy}</td>
                        <td className="py-4 px-4 align-top">
                          <div className="space-y-3 max-w-sm">
                            <div className="text-sm text-foreground">{item.progress}</div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Implementation Progress</span>
                                <span className="font-medium">{item.progressValue}%</span>
                              </div>
                              <Progress value={item.progressValue} className="h-1.5" />
                            </div>
                            <div className="space-y-1">
                              <h5 className="text-xs font-medium text-foreground">Current Initiatives:</h5>
                              <ul className="text-xs text-muted-foreground space-y-0.5">
                                {item.initiatives.map((initiative, idx) => (
                                  <li key={idx} className="flex items-start gap-1">
                                    <span className="text-primary mt-0.5">•</span>
                                    <span>{initiative}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 align-top">
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}
