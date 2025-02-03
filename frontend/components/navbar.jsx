"use client"

import Link from "next/link"
import { MessageSquare, Settings, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const { authUser, logout } = useAuthStore()
  const router= useRouter()
  const handlelogout =()=>{
    logout();
    router.push('/signin')
  }
  const gotoProfile =()=>{
    router.push('/profile')
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#2ECC71] px-4 lg:px-6">
    <div className="flex h-14 items-center justify-between">
      <Link
        className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-white/80"
        href="/"
      >
        <MessageSquare className="h-5 w-5" />
        <span>Chatty</span>
      </Link>
      <nav className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        <Button onClick={gotoProfile} variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
        <Button onClick={handlelogout} variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </nav>
    </div>
  </header>
  )
}

