"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Modal } from "@/components/ui/modal"
import { Plus, Search, Edit, Trash2, MapPin, Calendar, Users, Loader2 } from "lucide-react"

export default function PackagesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingPackage, setEditingPackage] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    poster: "",
    slug: "",
    areas: "",
    food: "",
    drinks: "",
    parking: "",
    businessBox: "",
    requirements: "",
  })

  // Fetch packages from API
  const fetchPackages = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://api.etike.rw/vipPackages/list.php')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.code === 200 && result.status === 'success') {
        // Transform API data to match our format
        const transformedPackages = result.data.map((pkg: any) => ({
          id: pkg.code,
          name: pkg.name,
          description: pkg.description,
          price: parseFloat(pkg.price),
          poster: pkg.poster,
          slug: pkg.slug,
          schedule: pkg.schedule || [],
          areas: pkg.areas || [],
          food: pkg.food || [],
          drinks: pkg.drinks || [],
          parking: pkg.parking || [],
          businessBox: pkg.businessBox || [],
          requirements: pkg.requirements || [],
          status: "active", // Default status
          bookings: Math.floor(Math.random() * 20) + 1, // Random booking count for demo
        }))
        
        setPackages(transformedPackages)
      } else {
        throw new Error('Invalid API response format')
      }
    } catch (err) {
      console.error('Error fetching packages:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch packages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPackages()
  }, [])

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (pkg: any) => {
    setEditingPackage(pkg)
    setFormData({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price.toString(),
      poster: pkg.poster || "",
      slug: pkg.slug || "",
      areas: pkg.areas ? pkg.areas.map((area: any) => area.title).join(", ") : "",
      food: pkg.food ? pkg.food.map((item: any) => item.title).join(", ") : "",
      drinks: pkg.drinks ? pkg.drinks.map((item: any) => item.title).join(", ") : "",
      parking: pkg.parking ? pkg.parking.map((item: any) => item.title).join(", ") : "",
      businessBox: pkg.businessBox ? pkg.businessBox.map((item: any) => item.title).join(", ") : "",
      requirements: pkg.requirements ? pkg.requirements.join(", ") : "",
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
      price: "",
      poster: "",
      slug: "",
      areas: "",
      food: "",
      drinks: "",
      parking: "",
      businessBox: "",
      requirements: "",
    })
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setIsEditMode(false)
    setEditingPackage(null)
    setFormData({
      name: "",
      description: "",
      price: "",
      poster: "",
      slug: "",
      areas: "",
      food: "",
      drinks: "",
      parking: "",
      businessBox: "",
      requirements: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Packages</h1>
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
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#0f3373]" />
              <span className="ml-2 text-gray-600">Loading packages...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchPackages}
                className="px-4 py-2 bg-[#0f3373] text-white rounded-md hover:bg-[#0a2a5c]"
              >
                Retry
              </button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
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
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-600 line-clamp-2">{pkg.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>${pkg.price}</TableCell>
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
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={isEditMode ? "Edit Package" : "Add New Package"}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                required
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                required
                placeholder="e.g., time-trial-experience"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Poster Image URL</label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
              placeholder="https://example.com/image.jpg"
              value={formData.poster}
              onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Areas & Features</label>
            <textarea
              rows={2}
              placeholder="Exclusive VIP zone, View at finish line, etc. (comma separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent resize-none"
              value={formData.areas}
              onChange={(e) => setFormData({ ...formData, areas: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food & Dining</label>
            <textarea
              rows={2}
              placeholder="Welcome coffee, International food festival, etc. (comma separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent resize-none"
              value={formData.food}
              onChange={(e) => setFormData({ ...formData, food: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Drinks & Beverages</label>
            <textarea
              rows={2}
              placeholder="Open bar, Aperitif, etc. (comma separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent resize-none"
              value={formData.drinks}
              onChange={(e) => setFormData({ ...formData, drinks: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parking & Transportation</label>
            <textarea
              rows={2}
              placeholder="Parking included, Transportation, etc. (comma separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent resize-none"
              value={formData.parking}
              onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Box (Optional)</label>
            <textarea
              rows={2}
              placeholder="Private zones, corporate packages, etc. (comma separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent resize-none"
              value={formData.businessBox}
              onChange={(e) => setFormData({ ...formData, businessBox: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (Optional)</label>
            <textarea
              rows={2}
              placeholder="Bring your own bike, cycling experience, etc. (comma separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent resize-none"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
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
