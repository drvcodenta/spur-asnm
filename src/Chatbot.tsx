import { useState } from "react"
import { motion } from "framer-motion"
import botLogo from "./assets/bot-logo.png"

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  // Show circle button when closed
  if (!isOpen) {
    return (
      <button 
        id="chatbot-circle"
        onClick={() => setIsOpen(true)} 
        className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-white overflow-hidden"
      >
        <img src={botLogo} alt="Chatbot" className="w-full h-full object-cover" />
      </button>
    )
  }

  // Show chatbot when open (with animation on mount)
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-112.5 h-125 flex flex-col bg-white rounded-lg shadow-2xl"
    >
      {/* Blue Header */}
      <div className="flex gap-3 p-4 bg-blue-600 text-white rounded-lg">
        <button className="text-2xl">←</button>
        <img src={botLogo} alt="Spur" className="w-8 h-8 rounded-full bg-white" />
        <h3 className="flex-1 font-semibold">Spur Support</h3>
        <button className="text-2xl w-8 h-8 rounded-full hover:bg-blue-700 flex items-center justify-center transition" onClick={() => setIsOpen(false)}>✕</button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 bg-gray-50 overflow-auto">
        <div className="flex gap-3">
          <img src={botLogo} alt="Bot" className="w-10 h-10 rounded-full" />
            <div className="bg-white p-3 rounded-lg shadow">
              <p>Hey 👋, how can we help you today?</p>
            </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4">
        <div className="flex items-center gap-2 border-2 border-blue-400 rounded-full px-4 py-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-1 outline-none"
          />
          <button className="bg-blue-500 text-white w-8 h-8 rounded-full">➤</button>
        </div>
      </div>
    </motion.div>
  )
}

export default Chatbot
