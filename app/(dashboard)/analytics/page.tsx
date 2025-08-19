"use client"

import { PageHeader } from "@/components/page-header"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, MapPin } from "lucide-react"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function AnalyticsPage() {
  const bookingVolumeData = {
    series: [
      {
        name: "Bookings",
        data: [45, 52, 68, 84, 76, 95, 110, 125, 140, 158, 175, 190],
      },
    ],
    options: {
      chart: {
        type: "line" as const,
        height: 350,
        toolbar: { show: false },
      },
      colors: ["#0f3373"],
      stroke: { curve: "smooth" as const, width: 3 },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
      yaxis: {
        title: { text: "Number of Bookings" },
      },
    },
  }

  const customerSegmentData = {
    series: [40, 35, 25],
    options: {
      chart: { type: "donut" as const },
      labels: ["Adventure Seekers", "Cultural Enthusiasts", "Wildlife Lovers"],
      colors: ["#0f3373", "#b42841", "#1e4a8c"],
      legend: { position: "bottom" as const },
    },
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Comprehensive insights and tour performance metrics" />

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
          title="Total Bookings"
          value="1,847"
          icon={MapPin}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          trend={{ value: "8.2%", isPositive: true }}
        />
        <StatsCard
          title="Active Customers"
          value="1,234"
          icon={Users}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
          trend={{ value: "3.1%", isPositive: true }}
        />
        <StatsCard
          title="Satisfaction Rate"
          value="98.7%"
          icon={TrendingUp}
          iconColor="text-[#0f3373]"
          iconBgColor="bg-blue-100"
          trend={{ value: "0.3%", isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Booking Volume Trend</h3>
          </CardHeader>
          <CardContent>
            <Chart options={bookingVolumeData.options} series={bookingVolumeData.series} type="line" height={350} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Customer Segments</h3>
          </CardHeader>
          <CardContent>
            <Chart
              options={customerSegmentData.options}
              series={customerSegmentData.series}
              type="donut"
              height={350}
            />
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Top Destinations</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { region: "Volcanoes National Park", percentage: 45, amount: "203 bookings" },
                { region: "Akagera National Park", percentage: 30, amount: "135 bookings" },
                { region: "Nyungwe Forest", percentage: 25, amount: "112 bookings" },
              ].map((item) => (
                <div key={item.region} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.region}</p>
                    <p className="text-sm text-gray-500">{item.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#0f3373]">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Tour Package Performance</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { method: "Gorilla Trekking", success: "99.2%", volume: "89 tours" },
                { method: "Cultural Village Tour", success: "98.8%", volume: "67 tours" },
                { method: "Wildlife Safari", success: "97.5%", volume: "54 tours" },
              ].map((item) => (
                <div key={item.method} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.method}</p>
                    <p className="text-sm text-gray-500">{item.volume} completed</p>
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
                  type: "High Demand",
                  message: "Gorilla permits selling fast for next month",
                  time: "2 hours ago",
                  severity: "warning",
                },
                {
                  type: "Weather",
                  message: "Clear weather forecast for weekend tours",
                  time: "1 day ago",
                  severity: "info",
                },
                {
                  type: "Booking",
                  message: "Group cancellation for tomorrow's tour",
                  time: "2 days ago",
                  severity: "error",
                },
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
