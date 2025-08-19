"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { mockTransactions, revenueData } from "@/lib/mock-data"
import { Users, DollarSign, CreditCard, Clock } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function DashboardPage() {
  const recentTransactions = mockTransactions.slice(0, 5)

  // Prepare data for Revenue Trend Area Chart
  const areaChartData = {
    series: [
      {
        name: "Revenue",
        data: revenueData.map((item) => item.revenue),
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
      colors: ["#f34d11"],
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
        categories: revenueData.map((item) => item.month),
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

  // Prepare data for Payment Methods Pie Chart
  const pieChartData = {
    series: [45, 25, 20, 10],
    options: {
      chart: {
        type: "pie" as const,
        height: 280,
      },
      labels: ["Credit Card", "Bank Transfer", "PayPal", "Other"],
      colors: ["#f34d11", "#ff6b35", "#ffab00", "#36b9cc"],
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
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Merchants</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$67,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-[#f34d11] bg-opacity-10 rounded-lg">
                <CreditCard className="h-6 w-6 text-[#f34d11]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Transactions Today</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Settlements</p>
                <p className="text-2xl font-bold text-gray-900">$12,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart and Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Revenue Chart - 4/6 width */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Revenue Trend</h3>
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

        {/* Payment Methods Pie Chart - 2/6 width */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
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
                    <p className="text-lg font-bold text-gray-900">4</p>
                    <p className="text-xs text-gray-500">Methods</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#f34d11]">45%</p>
                    <p className="text-xs text-gray-500">Top Method</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.method}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={transaction.status} />
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
