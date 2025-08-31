"use client"

import { useState } from "react"
import { Button } from "../esg-reports/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../esg-reports/ui/dialog"
import { DatasetUpload } from "./dataset-upload"

export function DashboardHeader() {
  const [isExporting, setIsExporting] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const handleExportData = () => {
    setIsExporting(true)
    // Simulate data export
    setTimeout(() => {
      setIsExporting(false)
      // Create and download a sample CSV
      const csvContent = `Metric,Value,Unit,Change
CO2 Emissions,2847,tonnes CO2e,-12%
Fuel Consumption,1234,tonnes,-8%
Port Electricity,456,MWh,+15%`

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "marine-esg-data.csv"
      a.click()
      window.URL.revokeObjectURL(url)
    }, 1500)
  }

  const scrollToReportGenerator = () => {
    const reportSection = document.getElementById("report-generator")
    if (reportSection) {
      reportSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Marine ESG</h2>
              <p className="text-sm text-muted-foreground">Sustainability Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Manage Data
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Dataset Management</DialogTitle>
                </DialogHeader>
                <DatasetUpload />
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" onClick={handleExportData} disabled={isExporting}>
              {isExporting ? "Exporting..." : "Export Data"}
            </Button>
            <Button size="sm" onClick={scrollToReportGenerator}>
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
