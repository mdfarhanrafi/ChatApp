import { MessageSquare, Phone, Video, Lock } from "lucide-react"

const features = [
  {
    icon: <MessageSquare size={40} />,
    title: "Instant Messaging",
    description: "Send and receive messages in real-time with friends and family.",
  },
  {
    icon: <Phone size={40} />,
    title: "Voice Calls",
    description: "Make crystal-clear voice calls to anyone, anywhere in the world.",
  },
  {
    icon: <Video size={40} />,
    title: "Video Chats",
    description: "Connect face-to-face with high-quality video calls.",
  },
  {
    icon: <Lock size={40} />,
    title: "End-to-End Encryption",
    description: "Your conversations are always private and secure.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-green-500 mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

