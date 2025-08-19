"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { mockSettlements } from "@/lib/mock-data"
import { Download } from "lucide-react"

export default function SettlementsPage() {
  const handleExportReport = () => {
    // Mock export functionality
    console.log("Exporting settlements report...")
    alert("Report exported successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settlements</h1>
        <button
          onClick={handleExportReport}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0f3373] hover:bg-[#0a2a5c]"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </button>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Settlement History</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Settlement ID</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSettlements.map((settlement) => (
                <TableRow key={settlement.id}>
                  <TableCell className="font-medium">{settlement.id}</TableCell>
                  <TableCell>{settlement.merchant}</TableCell>
                  <TableCell>${settlement.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={settlement.status} />
                  </TableCell>
                  <TableCell>{settlement.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
