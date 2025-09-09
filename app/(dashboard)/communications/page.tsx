"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Modal } from "@/components/ui/modal"
import { Plus, Send, Mail, MessageSquare, Users, Search } from "lucide-react"

export default function CommunicationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("messages")
  const [searchTerm, setSearchTerm] = useState("")
  const [messageData, setMessageData] = useState({
    recipient: "",
    subject: "",
    message: "",
    type: "email",
  })

  // Mock communications data
  const mockMessages = [
    {
      id: "MSG-001",
      recipient: "John Doe",
      email: "john@example.com",
      subject: "Reservation Confirmation - Luxury Suite",
      message: "Thank you for booking with us. Your luxury suite reservation is confirmed...",
      type: "email",
      status: "sent",
      sentDate: "2024-01-15 14:30",
    },
    {
      id: "MSG-002",
      recipient: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "Travel Reminder",
      message: "Your spa & wellness retreat is coming up in 3 days...",
      type: "email",
      status: "sent",
      sentDate: "2024-01-14 10:15",
    },
    {
      id: "MSG-003",
      recipient: "Mike Wilson",
      email: "mike@example.com",
      subject: "Welcome to Etike Hospitality",
      message: "Welcome! We're excited to help you explore Rwanda...",
      type: "email",
      status: "draft",
      sentDate: "2024-01-13 16:45",
    },
  ]

  const mockTemplates = [
    {
      id: "TEMP-001",
      name: "Booking Confirmation",
      subject: "Your booking is confirmed!",
      content: "Thank you for choosing Etike Hospitality. Your reservation details are...",
      category: "booking",
    },
    {
      id: "TEMP-002",
      name: "Travel Reminder",
      subject: "Your trip is coming up!",
      content: "We're excited for your upcoming adventure. Here are some important reminders...",
      category: "reminder",
    },
    {
      id: "TEMP-003",
      name: "Welcome Message",
      subject: "Welcome to Etike Hospitality!",
      content: "Welcome to our hospitality family! We're here to make your stay unforgettable...",
      category: "welcome",
    },
  ]

  const filteredMessages = mockMessages.filter(
    (msg) =>
      msg.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sending message:", messageData)
    setIsModalOpen(false)
    setMessageData({ recipient: "", subject: "", message: "", type: "email" })
  }

  const handleUseTemplate = (template: any) => {
    setMessageData({
      ...messageData,
      subject: template.subject,
      message: template.content,
    })
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0f3373] hover:bg-[#0a2a5c]"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </button>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockMessages.filter((m) => m.status === "sent").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockMessages.filter((m) => m.status === "draft").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Templates</p>
                <p className="text-2xl font-bold text-gray-900">{mockTemplates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Send className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab("messages")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "messages"
                ? "border-[#0f3373] text-[#0f3373]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setSelectedTab("templates")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "templates"
                ? "border-[#0f3373] text-[#0f3373]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Templates
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {selectedTab === "messages" && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-gray-900">{message.subject}</h4>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            message.status === "sent" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {message.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        To: {message.recipient} ({message.email})
                      </p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{message.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{message.sentDate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-[#0f3373]">
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === "templates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTemplates.map((template) => (
            <Card key={template.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{template.subject}</p>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">{template.content}</p>
                    <span className="inline-block px-2 py-1 text-xs font-medium text-[#0f3373] bg-blue-100 rounded-full mt-3">
                      {template.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleUseTemplate(template)}
                  className="w-full mt-4 px-3 py-2 text-sm font-medium text-[#0f3373] border border-[#0f3373] rounded-md hover:bg-[#0f3373] hover:text-white transition-colors"
                >
                  Use Template
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Message">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message Type</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
              value={messageData.type}
              onChange={(e) => setMessageData({ ...messageData, type: e.target.value })}
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
            <input
              type="text"
              required
              placeholder="Customer name or email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
              value={messageData.recipient}
              onChange={(e) => setMessageData({ ...messageData, recipient: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
              value={messageData.subject}
              onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={6}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent resize-none"
              value={messageData.message}
              onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#0f3373] hover:bg-[#0a2a5c] rounded-md"
            >
              Send Message
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
