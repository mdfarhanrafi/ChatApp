"use client"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MessageSquare, Loader2 } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import AuthImagePattern from "@/components/authImagePatter"
import Loader from "@/components/loader"
import Navbar from "@/components/navbar"

export default function SignIn() {
  const { authUser, isCheckingAuth, isLoggingIn,login,setAuthUser,checkAuth } = useAuthStore()
  
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }
//   useEffect(()=>{
//     checkAuth()
// },[checkAuth])

  useEffect(() => {
    if (!isCheckingAuth && authUser) {
      router.push("/chat")
    }
  }, [authUser, isCheckingAuth, router])
  
  if (isCheckingAuth) {
    return <Loader />
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    const result = await login(formData)

    if (result.status == 200) {
      setAuthUser(result.data)
      router.push('/chat')
    }
  }

  return (
    <div className="min-h-screen bg-green-400 text-white p-4">
      <nav className="flex justify-between items-center p-4">
        <Link href="/" className="flex items-center space-x-2 text-accent">
          <MessageSquare size={24} />
          <span className="text-xl font-semibold">Chatty</span>
        </Link>
        <Link href="/settings" className="text-input-text hover:text-accent">
          Settings
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto mt-8 md:mt-16 grid md:grid-cols-2 gap-12">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="text-accent" size={24} />
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
          </div>
          <p className="text-input-text mb-8">Sign in to continue to Chatty</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-input-text mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-input border-0 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent ${
                  errors.email ? "ring-2 ring-red-500" : ""
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-input-text mb-2">
                Password
              </label>
              <div >
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-input border-0 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent pr-10 ${
                    errors.password ? "ring-2 ring-red-500" : ""
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

           

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-rose-100 hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-input-text">
            Don't have an account?{" "}
            <Link href="/signup" className="text-accent hover:underline">
              Create Account
            </Link>
          </p>
        </div>
        <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
      </div>
    </div>
  )
}

