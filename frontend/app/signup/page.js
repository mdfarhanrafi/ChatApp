'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {MessageSquare, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import AuthImagePattern from '@/components/authImagePatter'

export default function SignUp() {
  const router = useRouter()
  const { signup, isSigningUp,setAuthUser } = useAuthStore()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
   
    if (!validateForm()) return
    
    const result = await signup(formData)
    if (result.status == 201) {
      setAuthUser(result.data)
      router.push('/chat')
    }
  }

  return (
    <div className="min-h-screen bg-green-500 text-white p-4">
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
            <h1 className="text-2xl font-semibold">Create Account</h1>
          </div>
          <p className="text-input-text mb-8">Get started with your free account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-input-text mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full bg-input border-0 rounded-lg p-3 text-grey focus:ring-2 focus:ring-accent ${
                  errors.fullName ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

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
                className={`w-full bg-input border-0 rounded-lg p-3 text-grey focus:ring-2 focus:ring-accent ${
                  errors.email ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-input-text mb-2">
                Password
              </label>
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-input border-0 rounded-lg p-3 text-grey focus:ring-2 focus:ring-accent pr-10 ${
                    errors.password ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-input-text">
            Already have an account?{' '}
            <Link href="/signin" className="text-accent hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
      </div>
    </div>
  )
}
