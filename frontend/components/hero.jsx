'use client'
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
export default function Hero() {
  const router=useRouter()
  const handleNavigate=()=>{
    router.push('/signin')
  }

  return (
    <section className="bg-green-50 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect with friends instantly</h1>
          <p className="text-xl mb-6">Experience seamless communication with our feature-rich chat app.</p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold flex items-center hover:bg-green-600 transition duration-300" onClick={handleNavigate}>
          
            Get Started
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
        <div className="md:w-1/2">
        <video autoPlay loop muted playsInline className="w-[600px] h-[600px]">
              <source src="/chat.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        </div>
      </div>
    </section>
  )
}

