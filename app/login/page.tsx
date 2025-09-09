"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { User, Lock, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = await login(email, password)

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Log In to <span className="text-[#0f3373]">Etike</span>
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              New Here?{" "}
              <button className="text-[#0f3373] hover:text-[#0a2a5c] underline font-medium">Contact admin</button>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-[#0f3373] sm:text-sm"
                  placeholder="Phone or Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-[#0f3373] sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Show Password Toggle */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <span className="mr-2">Show Password</span>
                <div className={`w-3 h-3 rounded-full ${showPassword ? "bg-green-500" : "bg-gray-300"}`}></div>
              </button>
            </div>

            {error && <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</div>}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#0f3373] hover:bg-[#0a2a5c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3373] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </div>

            {/* Keep me logged in */}
            <div className="flex items-center">
              <input
                id="keep-logged-in"
                name="keep-logged-in"
                type="checkbox"
                className="h-4 w-4 text-[#0f3373] focus:ring-[#0f3373] border-gray-300 rounded"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              <label htmlFor="keep-logged-in" className="ml-2 block text-sm text-gray-600">
                Keep me logged in
              </label>
            </div>

            {/* Forgot Password */}
            <div className="text-center">
              <button type="button" className="text-sm text-[#0f3373] hover:text-[#0a2a5c] font-medium">
                Forgot Password?
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-xs text-gray-500 text-center">
            <p>
              © 2025 All Rights Reserved. Etike is a product of <span className="font-medium">TechCorp</span>.{" "}
              <button className="text-[#0f3373] hover:text-[#0a2a5c] underline">Cookie Preferences</button>,{" "}
              <button className="text-[#0f3373] hover:text-[#0a2a5c] underline">Privacy</button>, and{" "}
              <button className="text-[#0f3373] hover:text-[#0a2a5c] underline">Terms</button>.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://res.cloudinary.com/dhwqnur8s/image/upload/v1750079390/premiumride_lngsp9.jpg"
          alt="Etike - Hospitality management platform"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        <div className="absolute bottom-8 left-8 text-white">
          <h3 className="text-2xl font-bold mb-2">Discover Amazing Journeys</h3>
          <p className="text-lg opacity-90">Empowering hospitality professionals to create unforgettable experiences</p>
        </div>
      </div>
    </div>
  )
}
