"use client"

import { PageHeader } from "@/components/page-header"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, CreditCard } from "lucide-react"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function AnalyticsPage() {
  // Sample data for charts
  const transactionVolumeData = {
    series: [
      {
        name: "Transactions",
        data: [120, 150, 180, 200, 170, 220, 250, 280, 300, 320, 350, 380],
      },
    ],
    options: {
      chart: {
        type: "line" as const,
        height: 350,
        toolbar: { show: false },
      },
      colors: ["#f34d11"],
      stroke: { curve: "smooth" as const, width: 3 },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
      yaxis: {
        title: { text: "Number of Transactions" },
      },
    },
  }

  const merchantGrowthData = {
    series: [65, 35],
    options: {
      chart: { type: "donut" as const },
      labels: ["Active Merchants", "Inactive Merchants"],
      colors: ["#f34d11", "#e5e7eb"],
      legend: { position: "bottom" as const },
    },
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Comprehensive insights and performance metrics" />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="$2.4M"
          icon={DollarSign}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          trend={{ value: "12.5%", isPositive: true }}
        />
        <StatsCard
          title="Transaction Volume"
          value="45,231"
          icon={CreditCard}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          trend={{ value: "8.2%", isPositive: true }}
        />
        <StatsCard
          title="Active Merchants"
          value="1,847"
          icon={Users}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
          trend={{ value: "3.1%", isPositive: true }}
        />
        <StatsCard
          title="Success Rate"
          value="98.7%"
          icon={TrendingUp}
          iconColor="text-[#f34d11]"
          iconBgColor="bg-orange-100"
          trend={{ value: "0.3%", isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Transaction Volume Trend</h3>
          </CardHeader>
          <CardContent>
            <Chart
              options={transactionVolumeData.options}
              series={transactionVolumeData.series}
              type="line"
              height={350}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Merchant Status Distribution</h3>
          </CardHeader>
          <CardContent>
            <Chart options={merchantGrowthData.options} series={merchantGrowthData.series} type="donut" height={350} />
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Top Performing Regions</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { region: "North America", percentage: 45, amount: "$1.08M" },
                { region: "Europe", percentage: 30, amount: "$720K" },
                { region: "Asia Pacific", percentage: 25, amount: "$600K" },
              ].map((item) => (
                <div key={item.region} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.region}</p>
                    <p className="text-sm text-gray-500">{item.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#f34d11]">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Payment Method Performance</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { method: "Credit Card", success: "99.2%", volume: "15,234" },
                { method: "Bank Transfer", success: "98.8%", volume: "8,567" },
                { method: "PayPal", success: "97.5%", volume: "5,432" },
              ].map((item) => (
                <div key={item.method} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.method}</p>
                    <p className="text-sm text-gray-500">{item.volume} transactions</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{item.success}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "High Volume",
                  message: "Unusual transaction spike detected",
                  time: "2 hours ago",
                  severity: "warning",
                },
                { type: "System", message: "Scheduled maintenance completed", time: "1 day ago", severity: "info" },
                { type: "Security", message: "Failed login attempts blocked", time: "2 days ago", severity: "error" },
              ].map((alert, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === "error"
                        ? "bg-red-500"
                        : alert.severity === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{alert.type}</p>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                    <p className="text-xs text-gray-400">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
