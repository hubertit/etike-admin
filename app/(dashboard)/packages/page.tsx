"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Modal } from "@/components/ui/modal"
import { Plus, Search, Edit, Trash2, MapPin, Calendar, Users } from "lucide-react"

export default function PackagesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingPackage, setEditingPackage] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    destination: "",
    duration: "",
    price: "",
    maxGuests: "",
    category: "",
    inclusions: "",
    exclusions: "",
  })

  const mockPackages = [
    {
      id: "PKG-001",
      name: "Gorilla Trekking Adventure",
      destination: "Volcanoes National Park",
      duration: "3 days",
      price: 1200,
      maxGuests: 8,
      category: "Wildlife",
      status: "active",
      bookings: 15,
      description: "Experience the thrill of encountering mountain gorillas in their natural habitat",
      inclusions: "Park fees, Guide, Transportation, Accommodation",
      exclusions: "International flights, Personal expenses",
    },
    {
      id: "PKG-002",
      name: "Lake Kivu Relaxation",
      destination: "Lake Kivu",
      duration: "2 days",
      price: 450,
      maxGuests: 12,
      category: "Leisure",
      status: "active",
      bookings: 8,
      description: "Unwind by the beautiful shores of Lake Kivu with stunning sunset views",
      inclusions: "Accommodation, Meals, Boat ride, Airport transfer",
      exclusions: "Alcoholic beverages, Spa treatments",
    },
    {
      id: "PKG-003",
      name: "Cultural Heritage Tour",
      destination: "Kigali & Butare",
      duration: "4 days",
      price: 680,
      maxGuests: 15,
      category: "Culture",
      status: "draft",
      bookings: 0,
      description: "Discover Rwanda's rich cultural heritage and historical sites",
      inclusions: "Museum entries, Cultural guide, Transportation, Meals",
      exclusions: "Shopping, Personal guide tips",
    },
  ]

  const filteredPackages = mockPackages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (pkg: any) => {
    setEditingPackage(pkg)
    setFormData({
      name: pkg.name,
      description: pkg.description,
      destination: pkg.destination,
      duration: pkg.duration,
      price: pkg.price.toString(),
      maxGuests: pkg.maxGuests.toString(),
      category: pkg.category,
      inclusions: pkg.inclusions,
      exclusions: pkg.exclusions,
    })
    setIsEditMode(true)
    setIsModalOpen(true)
  }

  const handleDelete = (pkg: any) => {
    if (confirm(`Are you sure you want to delete "${pkg.name}"?`)) {
      console.log("Deleting package:", pkg.id)
      // In real app, this would call API to delete
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditMode) {
      console.log("Updating package:", editingPackage.id, formData)
    } else {
      console.log("Adding package:", formData)
    }
    setIsModalOpen(false)
    setIsEditMode(false)
    setEditingPackage(null)
    setFormData({
      name: "",
      description: "",
      destination: "",
      duration: "",
      price: "",
      maxGuests: "",
      category: "",
      inclusions: "",
      exclusions: "",
    })
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setIsEditMode(false)
    setEditingPackage(null)
    setFormData({
      name: "",
      description: "",
      destination: "",
      duration: "",
      price: "",
      maxGuests: "",
      category: "",
      inclusions: "",
      exclusions: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tour Packages</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0f3373] hover:bg-[#0a2a5c]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Package
        </button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search packages..."
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
                <TableHead>Package Name</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Max Guests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      {pkg.destination}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      {pkg.duration}
                    </div>
                  </TableCell>
                  <TableCell>${pkg.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      {pkg.maxGuests}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={pkg.status} />
                  </TableCell>
                  <TableCell>{pkg.bookings}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="p-1 text-gray-400 hover:text-[#0f3373]"
                        title="Edit package"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Delete package"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={isEditMode ? "Edit Tour Package" : "Add New Tour Package"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                required
                placeholder="e.g., 3 days"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
                value={formData.maxGuests}
                onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select category</option>
              <option value="Wildlife">Wildlife</option>
              <option value="Culture">Culture</option>
              <option value="Adventure">Adventure</option>
              <option value="Leisure">Leisure</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Inclusions</label>
            <textarea
              rows={2}
              placeholder="What's included in this package..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent resize-none"
              value={formData.inclusions}
              onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exclusions</label>
            <textarea
              rows={2}
              placeholder="What's not included..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent resize-none"
              value={formData.exclusions}
              onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#0f3373] hover:bg-[#0a2a5c] rounded-md"
            >
              {isEditMode ? "Update Package" : "Add Package"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
