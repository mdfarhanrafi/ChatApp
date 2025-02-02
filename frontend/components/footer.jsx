import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold">
              ChatApp
            </Link>
            <p className="text-sm mt-2">© 2025 ChatApp. All rights reserved.</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
            <Link href="#" className="hover:text-green-400">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-green-400">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-green-400">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

