"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { mockWebhooks } from "@/lib/mock-data"
import { TestTube } from "lucide-react"

export default function WebhooksPage() {
  const handleTestPing = (webhookId: number) => {
    console.log(`Testing webhook ${webhookId}...`)
    alert("Test ping sent successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Webhooks</h1>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Registered Webhooks</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>Webhook URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Attempt</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWebhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell className="font-medium">{webhook.merchant}</TableCell>
                  <TableCell className="max-w-xs truncate">{webhook.url}</TableCell>
                  <TableCell>
                    <StatusBadge status={webhook.status} />
                  </TableCell>
                  <TableCell>{webhook.lastAttempt}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleTestPing(webhook.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-[#0f3373] hover:bg-[#0a2a5c]"
                    >
                      <TestTube className="mr-1 h-3 w-3" />
                      Test Ping
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
