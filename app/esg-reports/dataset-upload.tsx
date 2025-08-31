"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../esg-reports/ui/card"
import { Button } from "../esg-reports/ui/button"
import { Input } from "../esg-reports/ui/input"
import { Label } from "../esg-reports/ui/label"
import { Textarea } from "../esg-reports/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../esg-reports/ui/select"
import { Badge } from "../esg-reports/ui/badge"
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react"
import { Progress } from "../esg-reports/ui/progress"

interface UploadedFile {
  id: string
  name: string
  type: string
  size: string
  status: "uploading" | "completed" | "error"
  progress: number
}

export function DatasetUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)

    Array.from(files).forEach((file, index) => {
      const newFile: UploadedFile = {
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        type: file.type.includes("csv") ? "CSV" : file.type.includes("excel") ? "Excel" : "JSON",
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        status: "uploading",
        progress: 0,
      }

      setUploadedFiles((prev) => [...prev, newFile])

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) => {
            if (f.id === newFile.id) {
              const newProgress = Math.min(f.progress + Math.random() * 30, 100)
              return {
                ...f,
                progress: newProgress,
                status: newProgress === 100 ? "completed" : "uploading",
              }
            }
            return f
          }),
        )
      }, 500)

      setTimeout(() => {
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === newFile.id ? { ...f, status: "completed", progress: 100 } : f)),
        )
        setIsUploading(false)
      }, 3000)
    })
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          ESG Dataset Management
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload and manage your maritime ESG data including CO₂ emissions, fuel consumption, and port electricity
          metrics.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataset-type">Dataset Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="co2-emissions">CO₂ Emissions</SelectItem>
                  <SelectItem value="fuel-consumption">Fuel Consumption</SelectItem>
                  <SelectItem value="port-electricity">Port Electricity</SelectItem>
                  <SelectItem value="waste-management">Waste Management</SelectItem>
                  <SelectItem value="water-usage">Water Usage</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive ESG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reporting-period">Reporting Period</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Dataset Description</Label>
            <Textarea
              id="description"
              placeholder="Provide a brief description of the dataset and any relevant context..."
              className="min-h-[80px]"
            />
          </div>

          {/* File Upload Area */}
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <div className="space-y-2">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
              <div>
                <Label htmlFor="file-upload" className="cursor-pointer text-primary hover:text-primary/80">
                  Click to upload files
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".csv,.xlsx,.xls,.json"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <p className="text-sm text-muted-foreground mt-1">or drag and drop CSV, Excel, or JSON files</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: CSV, Excel (.xlsx, .xls), JSON • Max file size: 50MB
              </p>
            </div>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Uploaded Files</h4>
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {file.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{file.size}</span>
                    </div>
                    {file.status === "uploading" && <Progress value={file.progress} className="h-1" />}
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === "completed" && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {file.status === "error" && <AlertCircle className="w-4 h-4 text-red-600" />}
                    <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)} className="h-6 w-6 p-0">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button className="flex-1" disabled={isUploading || uploadedFiles.length === 0}>
            Process Dataset
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Save as Draft
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
