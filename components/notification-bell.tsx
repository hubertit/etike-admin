"use client"

import { useState } from "react"
import { Bell, X } from "lucide-react"

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications] = useState([
    {
      id: 1,
      message: "New merchant registration pending approval",
      time: "5 min ago",
      type: "info",
      unread: true,
    },
    {
      id: 2,
      message: "Settlement completed for TechCorp Solutions",
      time: "1 hour ago",
      type: "success",
      unread: true,
    },
    {
      id: 3,
      message: "Webhook failure detected for E-Shop Plus",
      time: "2 hours ago",
      type: "error",
      unread: false,
    },
    {
      id: 4,
      message: "Monthly booking revenue report is ready",
      time: "1 day ago",
      type: "info",
      unread: false,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#0f3373] rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50 border-l-4 ${
                    notification.type === "error"
                      ? "border-red-400"
                      : notification.type === "success"
                        ? "border-[#0f3373]"
                        : "border-blue-400"
                  } ${notification.unread ? "bg-blue-50/30" : ""}`}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className={`text-sm ${notification.unread ? "font-medium text-gray-900" : "text-gray-700"}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    {notification.unread && <div className="w-2 h-2 bg-[#0f3373] rounded-full mt-2"></div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-gray-100">
              <button className="text-sm text-[#0f3373] hover:text-[#0a2a5c] font-medium">
                View all notifications
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
