"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Calendar, 
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react"

export default function DashboardPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://api.etike.rw/orders/all_orders.php')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.status === 'success' && result.data?.orders) {
        setOrders(result.data.orders)
      } else {
        throw new Error('Invalid API response format')
      }
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // Filter orders with actual event dates (not TBD) and get recent 5
  const ordersWithEventDates = orders.filter(order => 
    order.items && order.items.some(item => 
      item.event_date && item.event_date !== '1970-01-01'
    )
  )
  
  // If we have orders with event dates, use those; otherwise use all orders
  const recentBookings = ordersWithEventDates.length > 0 
    ? ordersWithEventDates.slice(0, 5)
    : orders.slice(0, 5)

  // Calculate metrics from real data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0)
  const totalBookings = orders.length
  const completedBookings = orders.filter(order => order.order_status === 'CONFIRMED').length
  const pendingBookings = orders.filter(order => order.order_status === 'PENDING').length
  const cancelledBookings = orders.filter(order => order.order_status === 'CANCELLED').length

  // Mock metrics data (keeping some static for demo)
  const metrics = {
    totalRevenue: totalRevenue,
    totalBookings: totalBookings,
    activePackages: 3,
    totalCustomers: 156,
    monthlyGrowth: 12.5,
    bookingGrowth: 8.3,
    customerGrowth: 15.2,
    packageGrowth: 0,
    pendingBookings: pendingBookings,
    completedBookings: completedBookings,
    cancelledBookings: cancelledBookings,
    averageBookingValue: totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0,
    conversionRate: 68.5,
    customerSatisfaction: 4.8
  }

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${metrics.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{metrics.monthlyGrowth}%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Bookings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalBookings}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{metrics.bookingGrowth}%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Packages */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Packages</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.activePackages}</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-500">No change</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Customers */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalCustomers}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{metrics.customerGrowth}%</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Booking Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.completedBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.pendingBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full mr-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.cancelledBookings}</p>
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
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#0f3373]" />
              <span className="ml-2 text-gray-600">Loading orders...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchOrders}
                className="px-4 py-2 bg-[#0f3373] text-white rounded-md hover:bg-[#0a2a5c]"
              >
                Retry
              </button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Code</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Event Date</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((order) => 
                  order.items && order.items.length > 0 ? (
                    order.items.map((item, itemIndex) => (
                      <TableRow key={`${order.order_id}-${item.item_id}`}>
                        <TableCell className="font-medium">
                          {itemIndex === 0 ? order.order_code : ''}
                        </TableCell>
                        <TableCell>
                          {itemIndex === 0 ? (
                            <div>
                              <p className="font-medium">{order.customer.full_name}</p>
                              <p className="text-sm text-gray-500">{order.customer.email}</p>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.package_title}</p>
                            <p className="text-sm text-gray-500">${item.price} each</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.event_date && item.event_date !== '1970-01-01' ? (
                            <p className="text-sm">{new Date(item.event_date).toLocaleDateString()}</p>
                          ) : (
                            <span className="text-gray-400 text-sm">TBD</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">{item.quantity}</p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">${item.subtotal}</p>
                            {itemIndex === 0 && order.items.length > 1 && (
                              <p className="text-sm text-gray-500">Total: ${order.total_amount}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={item.ticket_status.toLowerCase()} />
                        </TableCell>
                        <TableCell>
                          {itemIndex === 0 ? new Date(order.order_date).toLocaleDateString() : ''}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow key={order.order_id}>
                      <TableCell className="font-medium">{order.order_code}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer.full_name}</p>
                          <p className="text-sm text-gray-500">{order.customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-400">No items</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-400 text-sm">-</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-400">-</span>
                      </TableCell>
                      <TableCell>${order.total_amount}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.order_status.toLowerCase()} />
                      </TableCell>
                      <TableCell>
                        {new Date(order.order_date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
