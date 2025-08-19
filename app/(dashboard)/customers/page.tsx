"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Mail, Phone, MapPin, Calendar } from "lucide-react"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock customers data
  const mockCustomers = [
    {
      id: "CUST-001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+250 788 123 456",
      location: "Kigali, Rwanda",
      totalBookings: 3,
      totalSpent: 4800,
      lastBooking: "2024-01-15",
      joinDate: "2023-08-15",
      status: "active",
    },
    {
      id: "CUST-002",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 555 234 567",
      location: "New York, USA",
      totalBookings: 1,
      totalSpent: 1800,
      lastBooking: "2024-01-14",
      joinDate: "2024-01-10",
      status: "active",
    },
    {
      id: "CUST-003",
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "+44 20 7123 4567",
      location: "London, UK",
      totalBookings: 2,
      totalSpent: 3240,
      lastBooking: "2024-01-13",
      joinDate: "2023-11-20",
      status: "active",
    },
    {
      id: "CUST-004",
      name: "Emma Brown",
      email: "emma@example.com",
      phone: "+33 1 42 12 34 56",
      location: "Paris, France",
      totalBookings: 1,
      totalSpent: 1200,
      lastBooking: "2024-01-12",
      joinDate: "2024-01-05",
      status: "inactive",
    },
  ]

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleContactCustomer = (customerId: string, method: string) => {
    console.log(`Contacting customer ${customerId} via ${method}`)
    alert(`Opening ${method} for customer ${customerId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{mockCustomers.length}</p>
              <p className="text-sm text-gray-600">Total Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {mockCustomers.filter((c) => c.status === "active").length}
              </p>
              <p className="text-sm text-gray-600">Active Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {mockCustomers.reduce((sum, c) => sum + c.totalBookings, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Bookings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                ${mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Booking</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{customer.email}</p>
                      <p className="text-sm text-gray-500">{customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      {customer.location}
                    </div>
                  </TableCell>
                  <TableCell>{customer.totalBookings}</TableCell>
                  <TableCell>${customer.totalSpent}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      {customer.lastBooking}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleContactCustomer(customer.id, "email")}
                        className="p-1 text-gray-400 hover:text-[#0f3373]"
                        title="Send Email"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleContactCustomer(customer.id, "phone")}
                        className="p-1 text-gray-400 hover:text-[#0f3373]"
                        title="Call Customer"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                    </div>
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
