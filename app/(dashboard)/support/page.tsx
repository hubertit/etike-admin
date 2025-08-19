"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { HelpCircle, MessageCircle, Phone, Mail, Book, Search, ChevronRight } from "lucide-react"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const faqCategories = [
    { id: "all", name: "All Categories" },
    { id: "payments", name: "Payments" },
    { id: "merchants", name: "Merchants" },
    { id: "technical", name: "Technical" },
    { id: "security", name: "Security" },
  ]

  const faqs = [
    {
      id: 1,
      category: "payments",
      question: "How do I process a refund?",
      answer:
        "To process a refund, navigate to the transaction details and click the 'Refund' button. Enter the refund amount and reason, then confirm the action.",
    },
    {
      id: 2,
      category: "merchants",
      question: "How do I add a new merchant?",
      answer:
        "Go to the Merchants page and click 'Add Merchant'. Fill in the required information including business details, contact information, and banking details.",
    },
    {
      id: 3,
      category: "technical",
      question: "What are the API rate limits?",
      answer:
        "The API has a rate limit of 1000 requests per minute per API key. If you exceed this limit, you'll receive a 429 status code.",
    },
    {
      id: 4,
      category: "security",
      question: "How do I enable two-factor authentication?",
      answer:
        "Go to Security settings and toggle on Two-Factor Authentication. Follow the setup instructions to configure your authenticator app.",
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      action: "Start Chat",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      action: "Send Email",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri, 9AM-6PM",
      action: "Call Now",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Support" description="Get help and find answers to your questions" />

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportChannels.map((channel, index) => {
          const Icon = channel.icon
          return (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-[#f34d11] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-[#f34d11]" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                <p className="text-xs text-gray-500 mb-4">{channel.availability}</p>
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-[#f34d11] rounded-md hover:bg-[#d63d0e] transition-colors">
                  {channel.action}
                </button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Knowledge Base */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Knowledge Base</h3>
            <Book className="h-5 w-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search knowledge base..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f34d11] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f34d11] focus:border-transparent"
            >
              {faqCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <details key={faq.id} className="group border border-gray-200 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-[#f34d11]" />
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-gray-600 ml-8">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <HelpCircle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500">No articles found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Recent Support Tickets</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "TICK-001",
                subject: "Payment processing issue",
                status: "Open",
                priority: "High",
                created: "2024-01-15",
                lastUpdate: "2 hours ago",
              },
              {
                id: "TICK-002",
                subject: "API integration question",
                status: "In Progress",
                priority: "Medium",
                created: "2024-01-14",
                lastUpdate: "1 day ago",
              },
              {
                id: "TICK-003",
                subject: "Account verification",
                status: "Resolved",
                priority: "Low",
                created: "2024-01-13",
                lastUpdate: "2 days ago",
              },
            ].map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{ticket.id}</span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        ticket.status === "Open"
                          ? "bg-red-100 text-red-800"
                          : ticket.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {ticket.status}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        ticket.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : ticket.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{ticket.subject}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Created: {ticket.created} • Last update: {ticket.lastUpdate}
                  </p>
                </div>
                <button className="text-[#f34d11] hover:text-[#d63d0e] text-sm font-medium">View Details</button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
