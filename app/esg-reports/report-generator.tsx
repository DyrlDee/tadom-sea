"use client"

import { useState } from "react"
import { Button } from "../esg-reports/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../esg-reports/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../esg-reports/ui/dialog"
import { Badge } from "../esg-reports/ui/badge"
import { CO2EmissionsChart } from "../esg-reports/charts/co2-emissions-chart"
import { FuelConsumptionChart } from "../esg-reports/charts/fuel-consumption-chart"
import { PortElectricityChart } from "../esg-reports/charts/port-electricity-chart"

export function ReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      setReportGenerated(true)
    }, 2000)
  }

  const handleDownloadReport = () => {
    // Create a simple text version of the report for download
    const reportContent = `MARINE ESG SUSTAINABILITY REPORT
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
The maritime industry stands at a critical juncture in its journey toward sustainability. This report presents our comprehensive approach to emission management, demonstrating measurable progress toward environmental stewardship.

KEY METRICS
- CO₂ Emissions: 2,847 tonnes CO₂e (↓ 12% reduction)
- Fuel Efficiency: 23% alternative fuel adoption
- Shore Power: 456 MWh (↑ 15% increase)

SDG ALIGNMENT
Our initiatives align with SDG 9 (Innovation & Infrastructure) and SDG 14 (Life Below Water), demonstrating commitment to sustainable marine operations.

For complete report details, please use the dashboard interface.`

    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "marine-esg-report.txt"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const ESGReport = () => (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Report Header */}
      <div className="text-center space-y-4 border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-balance text-foreground">
          Navigating Towards a Sustainable Horizon: Emission Management in Marine ESG
        </h1>
        <p className="text-lg text-muted-foreground">Aligned with SDG 9 and SDG 14</p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>Generated: {new Date().toLocaleDateString()}</span>
          <Badge variant="outline">ESG Report 2024</Badge>
        </div>
      </div>

      {/* Executive Summary */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Executive Summary</h2>
        <div className="prose prose-sm max-w-none text-foreground">
          <p>
            The maritime industry stands at a critical juncture in its journey toward sustainability. As global trade
            continues to rely heavily on marine transportation, the imperative to manage greenhouse gas emissions has
            never been more urgent. This report presents our comprehensive approach to emission management,
            demonstrating measurable progress toward environmental stewardship while maintaining operational excellence.
          </p>
          <p>
            Our emission management strategy encompasses three progressive tiers: disclosure and baseline establishment,
            targeted reduction initiatives, and ambitious long-term goals including supply chain integration. Through
            systematic implementation of operational improvements and technological innovations, we have achieved a 12%
            reduction in CO₂ emissions year-over-year while increasing operational efficiency.
          </p>
        </div>
      </section>

      {/* Key Metrics Dashboard */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Key Performance Indicators</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">CO₂ Emissions</CardTitle>
              <CardDescription>Annual greenhouse gas emissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2,847 tonnes</div>
              <div className="text-sm text-green-600 font-medium">↓ 12% reduction</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Fuel Efficiency</CardTitle>
              <CardDescription>Alternative fuel adoption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">23%</div>
              <div className="text-sm text-blue-600 font-medium">LNG & biofuel mix</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Shore Power</CardTitle>
              <CardDescription>Port electricity utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">456 MWh</div>
              <div className="text-sm text-orange-600 font-medium">↑ 15% increase</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CO₂ Emissions Trend Analysis</CardTitle>
              <CardDescription>Monthly emissions showing consistent reduction trajectory</CardDescription>
            </CardHeader>
            <CardContent>
              <CO2EmissionsChart />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Consumption by Type</CardTitle>
                <CardDescription>Transition to cleaner fuel alternatives</CardDescription>
              </CardHeader>
              <CardContent>
                <FuelConsumptionChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Port Electricity Usage</CardTitle>
                <CardDescription>Shore power adoption and efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <PortElectricityChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SDG 9 Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">SDG 9: Industry, Innovation and Infrastructure</h2>
        <div className="prose prose-sm max-w-none text-foreground">
          <p>
            Our commitment to SDG 9 is demonstrated through strategic investments in innovative marine technologies and
            sustainable infrastructure development. We have implemented cutting-edge propulsion systems that improve
            fuel efficiency by 15% while reducing maintenance requirements.
          </p>
          <h3 className="text-lg font-semibold mt-6 mb-3">Key Innovations:</h3>
          <ul className="space-y-2">
            <li>
              <strong>Shore Power Infrastructure:</strong> Partnered with 12 major ports to establish reliable shore
              power connections, reducing in-port emissions by 40%
            </li>
            <li>
              <strong>Alternative Fuel Systems:</strong> Retrofitted 60% of our fleet with LNG-compatible engines and
              biofuel blending capabilities
            </li>
            <li>
              <strong>Digital Optimization:</strong> Deployed AI-powered route optimization systems reducing fuel
              consumption by 8% through improved voyage planning
            </li>
            <li>
              <strong>Energy Recovery:</strong> Installed waste heat recovery systems across 45% of vessels, converting
              excess heat into usable electrical power
            </li>
          </ul>
        </div>
      </section>

      {/* SDG 14 Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">SDG 14: Life Below Water</h2>
        <div className="prose prose-sm max-w-none text-foreground">
          <p>
            Protecting marine ecosystems is fundamental to our operational philosophy. Our emission reduction
            initiatives directly contribute to ocean health by minimizing air pollution that affects marine environments
            and reducing the industry's contribution to ocean acidification.
          </p>
          <h3 className="text-lg font-semibold mt-6 mb-3">Marine Protection Initiatives:</h3>
          <ul className="space-y-2">
            <li>
              <strong>Emission Reduction:</strong> 12% decrease in CO₂ emissions directly reduces atmospheric pollution
              affecting ocean chemistry
            </li>
            <li>
              <strong>Ballast Water Management:</strong> 100% compliance with IMO Ballast Water Management Convention
              across all vessels
            </li>
            <li>
              <strong>Fuel Quality:</strong> Transition to low-sulfur fuels and alternative energy sources reduces
              marine air pollution by 25%
            </li>
            <li>
              <strong>Operational Efficiency:</strong> Speed optimization and route planning minimize vessel time at
              sea, reducing overall environmental impact
            </li>
          </ul>
        </div>
      </section>

      {/* ESG Framework */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">ESG Implementation Framework</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tier 1: Disclosure</CardTitle>
              <Badge className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Established comprehensive baseline reporting using IMO DCS and EU MRV methodologies. All Scope 1 and 2
                emissions documented with CII and EEOI calculations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tier 2: Targeted Reduction</CardTitle>
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">68% Complete</Badge>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Implementing operational and technical measures including speed optimization, energy-efficient
                technologies, and alternative fuel adoption aligned with IMO targets.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tier 3: Ambitious Targets</CardTitle>
              <Badge className="bg-purple-50 text-purple-700 border-purple-200">25% Complete</Badge>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Developing comprehensive net-zero strategy including Scope 3 emissions, supply chain engagement, and
                investment in zero-emission technologies.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Conclusion */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Commitment to Sustainable Innovation</h2>
        <div className="prose prose-sm max-w-none text-foreground">
          <p>
            Our journey toward marine sustainability represents more than regulatory compliance—it embodies our
            commitment to responsible stewardship of ocean resources and climate action. The 12% reduction in emissions
            achieved this year demonstrates that environmental responsibility and operational excellence are not
            mutually exclusive but rather complementary objectives.
          </p>
          <p>
            Looking ahead, we remain committed to advancing marine innovation through continued investment in clean
            technologies, strategic partnerships with ports and suppliers, and active participation in industry-wide
            sustainability initiatives. Our roadmap to net-zero emissions by 2050 will require unprecedented
            collaboration across the maritime value chain, and we are prepared to lead this transformation.
          </p>
          <p>
            The integration of SDG 9 and SDG 14 principles into our operational framework ensures that our
            sustainability efforts contribute meaningfully to global climate goals while protecting the marine
            ecosystems upon which our industry depends. Through continued innovation, measurement, and transparent
            reporting, we will navigate toward a truly sustainable horizon for marine transportation.
          </p>
        </div>
      </section>

      {/* Report Footer */}
      <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
        <p>This report was generated using our Marine ESG Dashboard system.</p>
        <p>For questions or additional information, please contact our Sustainability Team.</p>
      </div>
    </div>
  )

  return (
    <section className="space-y-6" id="report-generator">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">ESG Report Generator</h2>
        <p className="text-muted-foreground">
          Generate comprehensive ESG reports aligned with SDG 9 and SDG 14 frameworks
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate ESG Report</CardTitle>
          <CardDescription>
            Create a comprehensive sustainability report including data visualizations, environmental indicators, and
            narrative analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Report Includes:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• CO₂ emissions analysis and trends</li>
                <li>• Fuel consumption metrics</li>
                <li>• Port electricity usage data</li>
                <li>• ESG environmental indicators table</li>
                <li>• SDG alignment narrative</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Report Structure:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Executive Summary</li>
                <li>• SDG 9: Innovation & Infrastructure</li>
                <li>• SDG 14: Life Below Water</li>
                <li>• Sustainability Commitments</li>
                <li>• Future Roadmap</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90"
              onClick={handleGenerateReport}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating Report..." : "Generate ESG Report"}
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" disabled={!reportGenerated}>
                  {reportGenerated ? "View Generated Report" : "Preview Report"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Marine ESG Sustainability Report</DialogTitle>
                  <DialogDescription>
                    Comprehensive emission management report aligned with SDG 9 and SDG 14
                  </DialogDescription>
                </DialogHeader>
                <ESGReport />
                <div className="flex justify-end pt-4 border-t">
                  <Button onClick={handleDownloadReport}>Download Report</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {reportGenerated && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Report Generated Successfully</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your comprehensive ESG report is ready for review and can be exported or shared with stakeholders.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
