import { useState } from "react"
import { motion } from "framer-motion"

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {!isOpen && (
        <motion.button 
          id="chatbot-circle"
          onClick={() => setIsOpen(true)} 
          className="w-16 h-16 rounded-full border-2 flex items-center justify-center bg-white"
        >
          O
        </motion.button>
      )}

      {isOpen && (
        <motion.div
          layoutId="chatbot-container"
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
      )}
    </>
  )
}

export default Chatbot
