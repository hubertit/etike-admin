"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Zap,
  TrendingUp,
  Clock,
  AlertTriangle,
  Upload,
  ExternalLink,
} from "lucide-react"
import { toast } from "sonner"

// Mock data for gateways
const mockGateways = [
  {
    id: "1",
    name: "Stripe Production",
    provider: "Stripe",
    type: "Credit Card",
    environment: "Production",
    status: "Active",
    successRate: 98.5,
    responseTime: 245,
    dailyVolume: 125000,
    logo: "/placeholder.svg?height=32&width=32&text=Stripe",
    apiKey: "sk_live_***************",
    webhookUrl: "https://api.etike.com/webhooks/stripe",
    configuration: {
      currency: "USD",
      country: "US",
      paymentMethods: ["card", "apple_pay", "google_pay"],
    },
  },
  {
    id: "2",
    name: "Irembopay Rwanda",
    provider: "Irembopay",
    type: "Mobile Money",
    environment: "Production",
    status: "Active",
    successRate: 96.2,
    responseTime: 180,
    dailyVolume: 45000,
    logo: "/placeholder.svg?height=32&width=32&text=Irembopay",
    apiKey: "irb_live_***************",
    webhookUrl: "https://api.etike.com/webhooks/irembopay",
    configuration: {
      currency: "RWF",
      country: "RW",
      paymentMethods: ["mtn_momo", "airtel_money"],
    },
  },
  {
    id: "3",
    name: "MTN Rwanda",
    provider: "MTN Rwanda",
    type: "Mobile Money",
    environment: "Production",
    status: "Maintenance",
    successRate: 94.8,
    responseTime: 320,
    dailyVolume: 78000,
    logo: "/placeholder.svg?height=32&width=32&text=MTN",
    apiKey: "mtn_live_***************",
    webhookUrl: "https://api.etike.com/webhooks/mtn",
    configuration: {
      currency: "RWF",
      country: "RW",
      paymentMethods: ["mtn_momo"],
    },
  },
  {
    id: "4",
    name: "PayPal Sandbox",
    provider: "PayPal",
    type: "Digital Wallet",
    environment: "Sandbox",
    status: "Inactive",
    successRate: 97.1,
    responseTime: 410,
    dailyVolume: 0,
    logo: "/placeholder.svg?height=32&width=32&text=PayPal",
    apiKey: "sb_***************",
    webhookUrl: "https://api.etike.com/webhooks/paypal",
    configuration: {
      currency: "USD",
      country: "US",
      paymentMethods: ["paypal", "venmo"],
    },
  },
]

const providerOptions = [
  { value: "stripe", label: "Stripe", category: "International" },
  { value: "paypal", label: "PayPal", category: "International" },
  { value: "square", label: "Square", category: "International" },
  { value: "authorize-net", label: "Authorize.Net", category: "International" },
  { value: "adyen", label: "Adyen", category: "International" },
  { value: "irembopay", label: "Irembopay", category: "Rwanda" },
  { value: "mtn-rwanda", label: "MTN Rwanda", category: "Rwanda" },
  { value: "airtel-rwanda", label: "Airtel Rwanda", category: "Rwanda" },
  { value: "tigo-rwanda", label: "Tigo Rwanda", category: "Rwanda" },
  { value: "bank-of-kigali", label: "Bank of Kigali", category: "Rwanda" },
  { value: "equity-bank-rwanda", label: "Equity Bank Rwanda", category: "Rwanda" },
  { value: "im-bank-rwanda", label: "I&M Bank Rwanda", category: "Rwanda" },
  { value: "cogebanque", label: "Cogebanque", category: "Rwanda" },
  { value: "bpr-bank", label: "BPR Bank", category: "Rwanda" },
  { value: "urwego-bank", label: "Urwego Bank", category: "Rwanda" },
  { value: "ab-bank-rwanda", label: "AB Bank Rwanda", category: "Rwanda" },
  { value: "access-bank-rwanda", label: "Access Bank Rwanda", category: "Rwanda" },
]

export default function GatewaysPage() {
  const [gateways, setGateways] = useState(mockGateways)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedGateway, setSelectedGateway] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    type: "",
    environment: "Production",
    apiKey: "",
    secretKey: "",
    webhookUrl: "",
    logo: "",
    currency: "USD",
    country: "US",
    paymentMethods: [] as string[],
  })

  const filteredGateways = gateways.filter((gateway) => {
    const matchesSearch =
      gateway.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gateway.provider.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || gateway.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleCreateGateway = () => {
    const newGateway = {
      id: Date.now().toString(),
      name: formData.name,
      provider: formData.provider,
      type: formData.type,
      environment: formData.environment,
      status: "Active",
      successRate: 0,
      responseTime: 0,
      dailyVolume: 0,
      logo: formData.logo || "/placeholder.svg?height=32&width=32&text=" + formData.provider,
      apiKey: formData.apiKey.replace(/.(?=.{4})/g, "*"),
      webhookUrl: formData.webhookUrl,
      configuration: {
        currency: formData.currency,
        country: formData.country,
        paymentMethods: formData.paymentMethods,
      },
    }

    setGateways([...gateways, newGateway])
    setIsCreateModalOpen(false)
    resetForm()
    toast.success("Gateway created successfully!")
  }

  const handleEditGateway = () => {
    const updatedGateways = gateways.map((gateway) =>
      gateway.id === selectedGateway.id
        ? { ...gateway, ...formData, apiKey: formData.apiKey.replace(/.(?=.{4})/g, "*") }
        : gateway,
    )
    setGateways(updatedGateways)
    setIsEditModalOpen(false)
    resetForm()
    toast.success("Gateway updated successfully!")
  }

  const handleDeleteGateway = (id: string) => {
    setGateways(gateways.filter((gateway) => gateway.id !== id))
    toast.success("Gateway deleted successfully!")
  }

  const handleToggleStatus = (id: string) => {
    const updatedGateways = gateways.map((gateway) =>
      gateway.id === id ? { ...gateway, status: gateway.status === "Active" ? "Inactive" : "Active" } : gateway,
    )
    setGateways(updatedGateways)
    toast.success("Gateway status updated!")
  }

  const resetForm = () => {
    setFormData({
      name: "",
      provider: "",
      type: "",
      environment: "Production",
      apiKey: "",
      secretKey: "",
      webhookUrl: "",
      logo: "",
      currency: "USD",
      country: "US",
      paymentMethods: [],
    })
    setSelectedGateway(null)
  }

  const openEditModal = (gateway: any) => {
    setSelectedGateway(gateway)
    setFormData({
      name: gateway.name,
      provider: gateway.provider,
      type: gateway.type,
      environment: gateway.environment,
      apiKey: gateway.apiKey,
      secretKey: "",
      webhookUrl: gateway.webhookUrl,
      logo: gateway.logo,
      currency: gateway.configuration.currency,
      country: gateway.configuration.country,
      paymentMethods: gateway.configuration.paymentMethods,
    })
    setIsEditModalOpen(true)
  }

  const openViewModal = (gateway: any) => {
    setSelectedGateway(gateway)
    setIsViewModalOpen(true)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Credit Card":
        return "bg-blue-100 text-blue-800"
      case "Mobile Money":
        return "bg-purple-100 text-purple-800"
      case "Digital Wallet":
        return "bg-indigo-100 text-indigo-800"
      case "Bank Transfer":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Stats calculations
  const activeGateways = gateways.filter((g) => g.status === "Active").length
  const totalVolume = gateways.reduce((sum, g) => sum + g.dailyVolume, 0)
  const avgSuccessRate = gateways.reduce((sum, g) => sum + g.successRate, 0) / gateways.length
  const maintenanceCount = gateways.filter((g) => g.status === "Maintenance").length

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payment Gateways</h2>
          <p className="text-muted-foreground">Manage your payment gateway integrations and configurations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button
                style={{ backgroundColor: "#f34d11", borderColor: "#f34d11" }}
                className="text-white hover:opacity-90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Gateway
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Payment Gateway</DialogTitle>
                <DialogDescription>Configure a new payment gateway integration for your system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Gateway Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Stripe Production"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider">Provider</Label>
                    <Select
                      value={formData.provider}
                      onValueChange={(value) => setFormData({ ...formData, provider: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">International</div>
                        {providerOptions
                          .filter((p) => p.category === "International")
                          .map((provider) => (
                            <SelectItem key={provider.value} value={provider.value}>
                              {provider.label}
                            </SelectItem>
                          ))}
                        <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase mt-2">Rwanda</div>
                        {providerOptions
                          .filter((p) => p.category === "Rwanda")
                          .map((provider) => (
                            <SelectItem key={provider.value} value={provider.value}>
                              {provider.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Gateway Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                        <SelectItem value="Digital Wallet">Digital Wallet</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="environment">Environment</Label>
                    <Select
                      value={formData.environment}
                      onValueChange={(value) => setFormData({ ...formData, environment: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Production">Production</SelectItem>
                        <SelectItem value="Sandbox">Sandbox</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="logo"
                      placeholder="https://example.com/logo.png"
                      value={formData.logo}
                      onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.logo && (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <img
                        src={formData.logo || "/placeholder.svg"}
                        alt="Logo preview"
                        className="h-8 w-8 object-contain"
                      />
                      <span className="text-sm text-gray-600">Logo preview</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Enter API key"
                      value={formData.apiKey}
                      onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secretKey">Secret Key</Label>
                    <Input
                      id="secretKey"
                      type="password"
                      placeholder="Enter secret key"
                      value={formData.secretKey}
                      onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    placeholder="https://api.etike.com/webhooks/provider"
                    value={formData.webhookUrl}
                    onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => setFormData({ ...formData, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="RWF">RWF - Rwandan Franc</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData({ ...formData, country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="RW">Rwanda</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Configuration (JSON)</Label>
                  <Textarea placeholder='{"additional_settings": "value"}' className="min-h-[80px]" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateGateway}
                  style={{ backgroundColor: "#f34d11", borderColor: "#f34d11" }}
                  className="text-white hover:opacity-90"
                >
                  Create Gateway
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Gateways</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeGateways}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalVolume.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceCount}</div>
            <p className="text-xs text-muted-foreground">Gateways under maintenance</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search gateways..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gateways Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateways</CardTitle>
          <CardDescription>Manage and monitor your payment gateway integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Gateway</th>
                  <th className="text-left py-3 px-4 font-medium">Provider</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Environment</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Success Rate</th>
                  <th className="text-left py-3 px-4 font-medium">Response Time</th>
                  <th className="text-left py-3 px-4 font-medium">Daily Volume</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGateways.map((gateway) => (
                  <tr key={gateway.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={gateway.logo || "/placeholder.svg"}
                          alt={gateway.provider}
                          className="h-8 w-8 rounded object-contain bg-gray-50 p-1"
                        />
                        <div>
                          <div className="font-medium">{gateway.name}</div>
                          <div className="text-sm text-muted-foreground">{gateway.provider}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">{gateway.provider}</td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary" className={getTypeColor(gateway.type)}>
                        {gateway.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={gateway.environment === "Production" ? "default" : "secondary"}>
                        {gateway.environment}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusBadgeColor(gateway.status)}>{gateway.status}</Badge>
                        <Switch
                          checked={gateway.status === "Active"}
                          onCheckedChange={() => handleToggleStatus(gateway.id)}
                          size="sm"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{gateway.successRate}%</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${gateway.successRate}%`,
                              backgroundColor: "#f34d11",
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{gateway.responseTime}ms</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm font-medium">${gateway.dailyVolume.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openViewModal(gateway)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(gateway)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the gateway configuration and
                                remove all associated data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteGateway(gateway.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Gateway Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              {selectedGateway && (
                <>
                  <img
                    src={selectedGateway.logo || "/placeholder.svg"}
                    alt={selectedGateway.provider}
                    className="h-8 w-8 rounded object-contain bg-gray-50 p-1"
                  />
                  <span>{selectedGateway.name}</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>Gateway configuration and performance details</DialogDescription>
          </DialogHeader>
          {selectedGateway && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Provider</Label>
                  <p className="text-sm">{selectedGateway.provider}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Type</Label>
                  <p className="text-sm">{selectedGateway.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Environment</Label>
                  <Badge variant={selectedGateway.environment === "Production" ? "default" : "secondary"}>
                    {selectedGateway.environment}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge className={getStatusBadgeColor(selectedGateway.status)}>{selectedGateway.status}</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Performance Metrics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-2xl font-bold" style={{ color: "#f34d11" }}>
                      {selectedGateway.successRate}%
                    </div>
                    <div className="text-xs text-gray-500">Success Rate</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-2xl font-bold" style={{ color: "#f34d11" }}>
                      {selectedGateway.responseTime}ms
                    </div>
                    <div className="text-xs text-gray-500">Response Time</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-2xl font-bold" style={{ color: "#f34d11" }}>
                      ${selectedGateway.dailyVolume.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Daily Volume</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Configuration</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">API Key</Label>
                    <p className="text-sm font-mono bg-gray-50 p-2 rounded">{selectedGateway.apiKey}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Currency</Label>
                    <p className="text-sm">{selectedGateway.configuration.currency}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-500">Webhook URL</Label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-mono bg-gray-50 p-2 rounded flex-1">{selectedGateway.webhookUrl}</p>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Payment Methods</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGateway.configuration.paymentMethods.map((method: string) => (
                    <Badge key={method} variant="outline">
                      {method.replace("_", " ").toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Gateway Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Payment Gateway</DialogTitle>
            <DialogDescription>Update the gateway configuration and settings.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Gateway Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-provider">Provider</Label>
                <Select
                  value={formData.provider}
                  onValueChange={(value) => setFormData({ ...formData, provider: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">International</div>
                    {providerOptions
                      .filter((p) => p.category === "International")
                      .map((provider) => (
                        <SelectItem key={provider.value} value={provider.value}>
                          {provider.label}
                        </SelectItem>
                      ))}
                    <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase mt-2">Rwanda</div>
                    {providerOptions
                      .filter((p) => p.category === "Rwanda")
                      .map((provider) => (
                        <SelectItem key={provider.value} value={provider.value}>
                          {provider.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-type">Gateway Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                    <SelectItem value="Digital Wallet">Digital Wallet</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-environment">Environment</Label>
                <Select
                  value={formData.environment}
                  onValueChange={(value) => setFormData({ ...formData, environment: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Sandbox">Sandbox</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-logo">Logo URL</Label>
              <div className="flex gap-2">
                <Input
                  id="edit-logo"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-apiKey">API Key</Label>
                <Input
                  id="edit-apiKey"
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-secretKey">Secret Key</Label>
                <Input
                  id="edit-secretKey"
                  type="password"
                  value={formData.secretKey}
                  onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-webhookUrl">Webhook URL</Label>
              <Input
                id="edit-webhookUrl"
                value={formData.webhookUrl}
                onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEditGateway}
              style={{ backgroundColor: "#f34d11", borderColor: "#f34d11" }}
              className="text-white hover:opacity-90"
            >
              Update Gateway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
