import Link from "next/link"
import { Menu } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-green-500 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ChatApp
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="#features" className="hover:underline">
            Features
          </Link>
          <Link href="#" className="hover:underline">
            About
          </Link>
          <Link href="#" className="hover:underline">
            Contact
          </Link>
        </nav>
        <button className="md:hidden">
          <Menu size={24} />
        </button>
      </div>
    </header>
  )
}

