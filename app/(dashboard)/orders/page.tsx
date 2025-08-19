"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Search, Eye, Download, Calendar, Users, MapPin, X, Phone, Mail, CreditCard } from "lucide-react"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const mockOrders = [
    {
      id: "ORD-001",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "+250 788 123 456",
      packageName: "Gorilla Trekking Adventure",
      destination: "Volcanoes National Park",
      guests: 2,
      totalAmount: 2400,
      bookingDate: "2024-01-15",
      travelDate: "2024-02-20",
      status: "confirmed",
      packagePrice: 1200,
      duration: "3 Days / 2 Nights",
      specialRequests: "Vegetarian meals, early morning pickup",
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
    },
    {
      id: "ORD-002",
      customerName: "Sarah Johnson",
      customerEmail: "sarah@example.com",
      customerPhone: "+250 788 789 012",
      packageName: "Lake Kivu Relaxation",
      destination: "Lake Kivu",
      guests: 4,
      totalAmount: 1800,
      bookingDate: "2024-01-14",
      travelDate: "2024-02-15",
      status: "pending",
      packagePrice: 450,
      duration: "2 Days / 1 Night",
      specialRequests: "None",
      paymentMethod: "PayPal",
      paymentStatus: "Pending",
    },
    {
      id: "ORD-003",
      customerName: "Mike Wilson",
      customerEmail: "mike@example.com",
      customerPhone: "+250 788 345 678",
      packageName: "Cultural Heritage Tour",
      destination: "Kigali & Butare",
      guests: 3,
      totalAmount: 2040,
      bookingDate: "2024-01-13",
      travelDate: "2024-03-10",
      status: "confirmed",
      packagePrice: 680,
      duration: "4 Days / 3 Nights",
      specialRequests: "Wheelchair accessible",
      paymentMethod: "Bank Transfer",
      paymentStatus: "Paid",
    },
    {
      id: "ORD-004",
      customerName: "Emma Brown",
      customerEmail: "emma@example.com",
      customerPhone: "+250 788 901 234",
      packageName: "Gorilla Trekking Adventure",
      destination: "Volcanoes National Park",
      guests: 1,
      totalAmount: 1200,
      bookingDate: "2024-01-12",
      travelDate: "2024-02-25",
      status: "cancelled",
      packagePrice: 1200,
      duration: "3 Days / 2 Nights",
      specialRequests: "None",
      paymentMethod: "Credit Card",
      paymentStatus: "Cancelled",
    },
    {
      id: "ORD-005",
      customerName: "David Martinez",
      customerEmail: "david@example.com",
      customerPhone: "+250 788 567 890",
      packageName: "Lake Kivu Relaxation",
      destination: "Lake Kivu",
      guests: 2,
      totalAmount: 900,
      bookingDate: "2024-01-16",
      travelDate: "2024-02-28",
      status: "confirmed",
      packagePrice: 450,
      duration: "2 Days / 1 Night",
      specialRequests: "None",
      paymentMethod: "PayPal",
      paymentStatus: "Paid",
    },
    {
      id: "ORD-006",
      customerName: "Lisa Chen",
      customerEmail: "lisa@example.com",
      customerPhone: "+250 788 678 901",
      packageName: "Cultural Heritage Tour",
      destination: "Kigali & Butare",
      guests: 1,
      totalAmount: 680,
      bookingDate: "2024-01-17",
      travelDate: "2024-03-05",
      status: "pending",
      packagePrice: 680,
      duration: "4 Days / 3 Nights",
      specialRequests: "None",
      paymentMethod: "Bank Transfer",
      paymentStatus: "Pending",
    },
  ]

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewOrder = (orderId: string) => {
    const order = mockOrders.find((o) => o.id === orderId)
    if (order) {
      setSelectedOrder(order)
      setIsModalOpen(true)
    }
  }

  const handleDownloadInvoice = (orderId: string) => {
    console.log("Downloading invoice for:", orderId)
    alert(`Downloading invoice for ${orderId}`)
  }

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} status to ${newStatus}`)
    alert(`Order ${orderId} status updated to ${newStatus}`)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tour Bookings</h1>
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <p className="font-semibold text-[#0f3373]">{mockOrders.length}</p>
            <p className="text-gray-500">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-[#b42841]">{mockOrders.filter((o) => o.status === "pending").length}</p>
            <p className="text-gray-500">Pending</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search orders, customers, packages..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Tour Package</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Travel Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.packageName}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {order.destination}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      {order.guests}
                    </div>
                  </TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      {order.travelDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewOrder(order.id)}
                        className="p-1 text-gray-400 hover:text-[#0f3373]"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(order.id)}
                        className="p-1 text-gray-400 hover:text-[#0f3373]"
                        title="Download Invoice"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <button onClick={closeModal} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Order ID:</span> {selectedOrder.id}
                    </p>
                    <p>
                      <span className="font-medium">Booking Date:</span> {selectedOrder.bookingDate}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span> <StatusBadge status={selectedOrder.status} />
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      {selectedOrder.customerName}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      {selectedOrder.customerEmail}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      {selectedOrder.customerPhone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Package Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tour Package Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="font-medium text-[#0f3373]">{selectedOrder.packageName}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedOrder.destination}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedOrder.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {selectedOrder.guests} Guest{selectedOrder.guests > 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {/* Travel Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Travel Details</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Travel Date:</span> {selectedOrder.travelDate}
                    </p>
                    <p>
                      <span className="font-medium">Number of Guests:</span> {selectedOrder.guests}
                    </p>
                    <p>
                      <span className="font-medium">Special Requests:</span> {selectedOrder.specialRequests}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Payment Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Package Price:</span> ${selectedOrder.packagePrice} per person
                    </p>
                    <p>
                      <span className="font-medium">Total Amount:</span>{" "}
                      <span className="text-lg font-bold text-[#0f3373]">${selectedOrder.totalAmount}</span>
                    </p>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                      {selectedOrder.paymentMethod} - {selectedOrder.paymentStatus}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => handleDownloadInvoice(selectedOrder.id)}
                  className="flex items-center px-4 py-2 bg-[#0f3373] text-white rounded-md hover:bg-[#0a2a5c] transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
