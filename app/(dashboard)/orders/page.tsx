"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Loader2, RefreshCw } from "lucide-react"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filteredCount, setFilteredCount] = useState(0)

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
        // Filter out orders without customer information and TBD event dates
        const allOrders = result.data.orders
        const ordersWithCustomerInfo = allOrders.filter((order: any) => {
          // Check customer info
          const hasCustomerInfo = order.customer && 
            order.customer.full_name && 
            order.customer.email &&
            order.customer.full_name.trim() !== '' &&
            order.customer.full_name.trim() !== '-' &&
            order.customer.email.trim() !== '' &&
            order.customer.email.trim() !== '-' &&
            order.customer.full_name.trim().length > 1 &&
            order.customer.email.trim().length > 1
          
          if (!hasCustomerInfo) return false
          
          // Check if any item has a valid event date (not TBD)
          if (order.items && order.items.length > 0) {
            return order.items.some((item: any) => 
              item.event_date && 
              item.event_date !== '1970-01-01' && 
              item.event_date.trim() !== ''
            )
          }
          
          return true // If no items, include the order
        })
        setOrders(ordersWithCustomerInfo)
        setFilteredCount(allOrders.length - ordersWithCustomerInfo.length)
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hospitality Bookings</h1>
          {filteredCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {filteredCount} orders with invalid customer info, TBD dates, or missing data were filtered out
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {loading && (
            <div className="flex items-center text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Loading orders...
            </div>
          )}
          {error && (
            <div className="text-sm text-red-600">
              Error: {error}
            </div>
          )}
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="flex items-center px-3 py-2 text-sm bg-[#0f3373] text-white rounded-md hover:bg-[#0a2a5c] disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">All Bookings</h3>
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
                  <TableHead>No</TableHead>
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
                {orders.flatMap((order) => 
                  order.items && order.items.length > 0 ? order.items.map((item: any) => ({ ...item, order })) : [{ order }]
                ).map((item: any, index: number) => {
                  const order = item.order || item
                  const isItem = item.package_title !== undefined
                  
                  return (
                    <TableRow key={isItem ? `${order.order_id}-${item.item_id}` : order.order_id}>
                      <TableCell className="font-medium">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer.full_name}</p>
                          <p className="text-sm text-gray-500">{order.customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{isItem ? item.package_title : 'No items'}</p>
                          {isItem && item.price && <p className="text-sm text-gray-500">${item.price} each</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        {isItem && item.event_date && item.event_date !== '1970-01-01' ? (
                          <p className="text-sm">{new Date(item.event_date).toLocaleDateString()}</p>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{isItem ? item.quantity : '-'}</p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">${isItem ? item.subtotal : order.total_amount}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={(isItem ? item.ticket_status : order.order_status)?.toLowerCase() || 'unknown'} />
                      </TableCell>
                      <TableCell>
                        {new Date(order.order_date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
