"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ArrowLeftRight,
  Webhook,
  BarChart3,
  FileText,
  Shield,
  HelpCircle,
  Settings,
  ChevronLeft,
  Zap,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    special: true,
  },
]

const menuGroups = [
  {
    title: "MERCHANTS",
    items: [
      {
        title: "Merchants",
        href: "/merchants",
        icon: Users,
      },
    ],
  },
  {
    title: "PAYMENT PROCESSING",
    items: [
      {
        title: "Gateways",
        href: "/gateways",
        icon: Zap,
      },
      {
        title: "Transactions",
        href: "/transactions",
        icon: CreditCard,
      },
      {
        title: "Settlements",
        href: "/settlements",
        icon: ArrowLeftRight,
      },
      {
        title: "Webhooks",
        href: "/webhooks",
        icon: Webhook,
      },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      {
        title: "Analytics",
        href: "/analytics",
        icon: BarChart3,
      },
      {
        title: "Reports",
        href: "/reports",
        icon: FileText,
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        title: "Security",
        href: "/security",
        icon: Shield,
      },
      {
        title: "Support",
        href: "/support",
        icon: HelpCircle,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn("flex h-screen bg-white border-r border-gray-200 flex-col w-64", className)}>
      {/* Logo and App Name */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0f3373] to-[#0a2a5c]">
        <div className="flex items-center space-x-3">
          <img src="/placeholder-logo.svg" alt="Logo" className="h-8 w-8 rounded bg-white p-1" />
          <span className="text-xl font-bold text-white tracking-wide">Etike</span>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* User Profile */}
      <div className="flex flex-col items-center py-6 border-b border-gray-100">
        <div className="rounded-full bg-gray-100 p-2 mb-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback style={{ backgroundColor: "#0f3373", color: "white" }}>JD</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-base font-semibold text-gray-900">John Doe</p>
        <p className="text-sm text-gray-400">Administrator</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 px-4 pt-6 overflow-y-auto">
        {/* Dashboard Button */}
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-full font-semibold text-sm transition-colors w-full mb-4",
                  isActive ? "bg-[#0f3373] text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
                style={isActive ? { boxShadow: "0 2px 8px 0 rgba(15,51,115,0.08)" } : {}}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </div>
            </Link>
          )
        })}

        {/* Menu Groups */}
        {menuGroups.map((group) => (
          <div key={group.title} className="mt-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">{group.title}</h3>
            <div className="flex flex-col gap-2">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full",
                        isActive ? "bg-[#0f3373] text-white shadow" : "text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}
