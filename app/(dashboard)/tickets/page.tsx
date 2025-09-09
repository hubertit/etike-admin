"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/modal"
import { AlertCircle } from "lucide-react"

export default function TicketsPage() {
  const [isModalOpen, setIsModalOpen] = useState(true)

  useEffect(() => {
    // Automatically show the modal when the page loads
    setIsModalOpen(true)
  }, [])

  const handleClose = () => {
    setIsModalOpen(false)
    // Redirect back to dashboard or previous page
    window.history.back()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Modal isOpen={isModalOpen} onClose={handleClose} title="Access Restricted">
        <div className="text-center py-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Not allowed to open the page
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Tickets are coming soon, check back later
          </p>
          <button
            onClick={handleClose}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0f3373] hover:bg-[#0a2a5c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3373]"
          >
            Go Back
          </button>
        </div>
      </Modal>
    </div>
  )
}

