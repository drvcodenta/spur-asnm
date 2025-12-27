import { useState } from "react"
import { motion } from "framer-motion"

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  // Show circle button when closed
  if (!isOpen) {
    return (
      <button 
        id="chatbot-circle"
        onClick={() => setIsOpen(true)} 
        className="w-16 h-16 rounded-full border-2 flex items-center justify-center bg-white"
      >
        O
      </button>
    )
  }

  // Show chatbot when open (with animation on mount)
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-96 h-125 flex flex-col border bg-white rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h3>Beautiful Chatbot</h3>
        <button className="hover:bg-amber-200" onClick={() => setIsOpen(false)}>✕</button>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <p>Hello! I'm here to help the beautiful Spur team. How can I assist you today?</p>
      </div>

      <input type="text" placeholder="Type your message..." className="w-full p-4 border-t" />
    </motion.div>
  )
}

export default Chatbot
