"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Shield, AlertTriangle, Lock, Eye, CheckCircle, XCircle } from "lucide-react"

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)

  const securityEvents = [
    {
      id: 1,
      type: "Login Success",
      user: "admin@ictchamber.rw",
      ip: "192.168.1.100",
      location: "Kigali, Rwanda",
      timestamp: "2024-01-15 14:30:25",
      status: "success",
    },
    {
      id: 2,
      type: "Failed Login Attempt",
      user: "unknown@example.com",
      ip: "45.123.45.67",
      location: "Unknown",
      timestamp: "2024-01-15 13:45:12",
      status: "blocked",
    },
    {
      id: 3,
      type: "Password Change",
      user: "admin@ictchamber.rw",
      ip: "192.168.1.100",
      location: "Kigali, Rwanda",
      timestamp: "2024-01-14 16:20:10",
      status: "success",
    },
    {
      id: 4,
      type: "API Key Generated",
      user: "admin@ictchamber.rw",
      ip: "192.168.1.100",
      location: "Kigali, Rwanda",
      timestamp: "2024-01-14 11:15:30",
      status: "success",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Security" description="Monitor and manage system security settings" />

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Security Score"
          value="98%"
          icon={Shield}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatsCard title="Active Sessions" value="3" icon={Eye} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
        <StatsCard
          title="Failed Attempts"
          value="12"
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBgColor="bg-red-100"
        />
        <StatsCard title="API Keys" value="5" icon={Lock} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  twoFactorEnabled ? "bg-[#f34d11]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-600">Receive security alerts via email</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotifications ? "bg-[#f34d11]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
              </div>
              <button
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  smsAlerts ? "bg-[#f34d11]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    smsAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="w-full px-4 py-2 text-sm font-medium text-white bg-[#f34d11] rounded-md hover:bg-[#d63d0e] transition-colors">
                Update Security Settings
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Active Sessions</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { device: "Chrome on Windows", location: "Kigali, Rwanda", ip: "192.168.1.100", current: true },
                { device: "Safari on iPhone", location: "Kigali, Rwanda", ip: "192.168.1.101", current: false },
                { device: "Firefox on Mac", location: "Kigali, Rwanda", ip: "192.168.1.102", current: false },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{session.device}</p>
                    <p className="text-sm text-gray-600">{session.location}</p>
                    <p className="text-xs text-gray-500">{session.ip}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {session.current && (
                      <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                        Current
                      </span>
                    )}
                    {!session.current && <button className="text-sm text-red-600 hover:text-red-800">Revoke</button>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Events Log */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Security Events</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <div
                  className={`p-2 rounded-full ${
                    event.status === "success"
                      ? "bg-green-100"
                      : event.status === "blocked"
                        ? "bg-red-100"
                        : "bg-yellow-100"
                  }`}
                >
                  {event.status === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : event.status === "blocked" ? (
                    <XCircle className="h-5 w-5 text-red-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{event.type}</h4>
                    <span className="text-sm text-gray-500">{event.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600">{event.user}</p>
                  <p className="text-xs text-gray-500">
                    {event.ip} • {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
