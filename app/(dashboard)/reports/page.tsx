"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Download, FileText, Calendar, Filter } from "lucide-react"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days")
  const [selectedFormat, setSelectedFormat] = useState("pdf")

  const reportTypes = [
    {
      id: "transaction-summary",
      name: "Transaction Summary",
      description: "Comprehensive overview of all transactions",
      icon: FileText,
      lastGenerated: "2024-01-15 14:30",
      size: "2.4 MB",
    },
    {
      id: "merchant-performance",
      name: "Merchant Performance",
      description: "Individual merchant analytics and metrics",
      icon: FileText,
      lastGenerated: "2024-01-15 12:15",
      size: "1.8 MB",
    },
    {
      id: "settlement-report",
      name: "Settlement Report",
      description: "Detailed settlement and payout information",
      icon: FileText,
      lastGenerated: "2024-01-14 16:45",
      size: "3.1 MB",
    },
    {
      id: "compliance-report",
      name: "Compliance Report",
      description: "Regulatory compliance and audit trail",
      icon: FileText,
      lastGenerated: "2024-01-14 09:20",
      size: "5.2 MB",
    },
  ]

  const handleGenerateReport = (reportId: string) => {
    console.log(`Generating report: ${reportId}`)
    alert(`Generating ${reportTypes.find((r) => r.id === reportId)?.name}...`)
  }

  const handleDownloadReport = (reportId: string) => {
    console.log(`Downloading report: ${reportId}`)
    alert(`Downloading ${reportTypes.find((r) => r.id === reportId)?.name}...`)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Generate and download comprehensive business reports" />

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Report Configuration</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Time Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f34d11] focus:border-transparent"
              >
                <option value="last-7-days">Last 7 Days</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-90-days">Last 90 Days</option>
                <option value="last-year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline h-4 w-4 mr-1" />
                Format
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f34d11] focus:border-transparent"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline h-4 w-4 mr-1" />
                Filter
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f34d11] focus:border-transparent">
                <option value="all">All Data</option>
                <option value="successful">Successful Only</option>
                <option value="failed">Failed Only</option>
                <option value="pending">Pending Only</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon
          return (
            <Card key={report.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-[#f34d11] bg-opacity-10 rounded-lg">
                      <Icon className="h-6 w-6 text-[#f34d11]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{report.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      <div className="mt-3 space-y-1">
                        <p className="text-xs text-gray-500">Last generated: {report.lastGenerated}</p>
                        <p className="text-xs text-gray-500">Size: {report.size}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleGenerateReport(report.id)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-[#f34d11] border border-[#f34d11] rounded-md hover:bg-[#f34d11] hover:text-white transition-colors"
                  >
                    Generate New
                  </button>
                  <button
                    onClick={() => handleDownloadReport(report.id)}
                    className="px-3 py-2 text-sm font-medium text-white bg-[#f34d11] rounded-md hover:bg-[#d63d0e] transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Transaction Summary - January 2024", date: "2024-01-15", size: "2.4 MB", format: "PDF" },
              { name: "Merchant Performance - Q4 2023", date: "2024-01-10", size: "1.8 MB", format: "Excel" },
              { name: "Settlement Report - December 2023", date: "2024-01-05", size: "3.1 MB", format: "PDF" },
              { name: "Compliance Report - 2023", date: "2024-01-01", size: "5.2 MB", format: "PDF" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-sm text-gray-500">
                      {report.date} • {report.size} • {report.format}
                    </p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-[#f34d11] transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
