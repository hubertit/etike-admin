"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { StatsCard } from "@/components/stats-card"
import { mockTransactions, bookingRevenueData } from "@/lib/mock-data"
import { Users, DollarSign, MapPin, Calendar } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function DashboardPage() {
  const recentBookings = mockTransactions.slice(0, 5)

  const areaChartData = {
    series: [
      {
        name: "Booking Revenue",
        data: bookingRevenueData.map((item) => item.revenue),
      },
    ],
    options: {
      chart: {
        type: "area" as const,
        height: 320,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#0f3373"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth" as const,
        width: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      grid: {
        borderColor: "#e7e7e7",
        strokeDashArray: 3,
        row: {
          colors: ["transparent", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: bookingRevenueData.map((item) => item.month),
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "#6b7280",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#6b7280",
            fontSize: "12px",
          },
          formatter: (value: number) => "$" + value.toLocaleString(),
        },
      },
      tooltip: {
        theme: "light",
        y: {
          formatter: (value: number) => "$" + value.toLocaleString(),
        },
      },
      legend: {
        show: false,
      },
    },
  }

  const pieChartData = {
    series: [35, 30, 35],
    options: {
      chart: {
        type: "pie" as const,
        height: 280,
      },
      labels: ["Active & Adventure", "Community & Cultural", "Eco-Tourism"],
      colors: ["#0f3373", "#b42841", "#1e4a8c"],
      dataLabels: {
        enabled: true,
        formatter: (val: number) => Math.round(val) + "%",
        style: {
          fontSize: "12px",
          fontWeight: "600",
          colors: ["#fff"],
        },
        dropShadow: {
          enabled: false,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "0%",
          },
          expandOnClick: false,
        },
      },
      legend: {
        position: "bottom" as const,
        fontSize: "12px",
        fontWeight: "500",
        labels: {
          colors: "#6b7280",
        },
        markers: {
          width: 8,
          height: 8,
          radius: 4,
        },
      },
      tooltip: {
        y: {
          formatter: (val: number) => val + "%",
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 250,
            },
            legend: {
              position: "bottom" as const,
            },
          },
        },
      ],
    },
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Customers"
          value="1,234"
          icon={Users}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          trend={{ value: "5.2%", isPositive: true }}
        />
        <StatsCard
          title="Monthly Revenue"
          value="$67,000"
          icon={DollarSign}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          trend={{ value: "12.3%", isPositive: true }}
        />
        <StatsCard
          title="Active Packages"
          value="47"
          icon={MapPin}
          iconColor="text-[#0f3373]"
          iconBgColor="bg-blue-100"
          trend={{ value: "2.1%", isPositive: true }}
        />
        <StatsCard
          title="Bookings"
          value="12"
          icon={Calendar}
          iconColor="text-yellow-600"
          iconBgColor="bg-yellow-100"
          trend={{ value: "8.7%", isPositive: true }}
        />
      </div>

      {/* Revenue Chart and Tour Package Types */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Revenue Chart - 4/6 width */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Booking Revenue Trend</h3>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Chart
                options={areaChartData.options}
                series={areaChartData.series}
                type="area"
                height="100%"
                width="100%"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tour Package Types Pie Chart - 2/6 width */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Popular Tour Types</h3>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col">
              <div className="flex-1">
                <Chart
                  options={pieChartData.options}
                  series={pieChartData.series}
                  type="pie"
                  height="100%"
                  width="100%"
                />
              </div>

              {/* Summary Stats */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">3</p>
                    <p className="text-xs text-gray-500">Tour Types</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#0f3373]">35%</p>
                    <p className="text-xs text-gray-500">Most Popular</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Tour Package</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>Gorilla Trekking Safari</TableCell>
                  <TableCell>${booking.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell>{booking.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
